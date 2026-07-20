import { defineStore } from 'pinia'
import {
  FORMATIONS, FORMATION_OFFSETS, TERRAIN,
  MAP_W, MAP_H, TILE_PX, buildTacticalMap,
} from '@/data/base/tactical/tacticalData'
import { CHARACTERS_MAP as CHARACTERS } from '@/data/masterData'
import { astar } from '@/utils/tacticalPathfinder'
import { computeFleetStats } from '@/utils/battleUtils'
import { useGameStore } from '@/stores/gameStore'
import router from '@/router/index.js'

const BASE_SPEED  = 4
const BASE_RANGE  = 2
const BASE_SIGHT  = 4
const MORALE_ROUT = 15

function rand(lo, hi)   { return lo + Math.random() * (hi - lo) }
function manhattan(a,b) { return Math.abs(a.x-b.x) + Math.abs(a.y-b.y) }
function clamp(v,lo,hi) { return Math.max(lo, Math.min(hi, v)) }
function fm(id)         { return FORMATIONS[id] ?? FORMATIONS['FF_01'] }

function charStat(charCode) {
  const c = CHARACTERS?.[charCode]
  return c ? (c.statCmd ?? 50) : 50
}

function unitSpeed(unit) {
  const f = fm(unit.formation)
  return Math.max(1, Math.round(BASE_SPEED * f.speedMod))
}

function unitRange(unit, tileAt) {
  const f    = fm(unit.formation)
  const terr = TERRAIN[tileAt(unit.x, unit.y)?.terrain ?? 'SPACE']
  return Math.max(1, BASE_RANGE + f.rangeMod + (terr?.rangeMod ?? 0))
}

// BFS — 이동 가능 타일 목록 (현재 위치 기준)
function bfsMovable(unit, allUnits, tileAt, mapW, mapH) {
  const speed   = unitSpeed(unit)
  const visited = new Map()
  const queue   = [{ x: unit.x, y: unit.y, cost: 0 }]
  const result  = []
  const blocked = new Set(
    allUnits.filter(u => u.unitId !== unit.unitId && u.status === 'active').map(u => `${u.x},${u.y}`)
  )
  visited.set(`${unit.x},${unit.y}`, 0)
  while (queue.length) {
    const cur = queue.shift()
    for (const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]) {
      const nx = cur.x+dx, ny = cur.y+dy
      if (nx<0||nx>=mapW||ny<0||ny>=mapH) continue
      const key  = `${nx},${ny}`
      const terr = TERRAIN[tileAt(nx,ny)?.terrain ?? 'SPACE']
      if (!terr?.passable) continue
      const moveCost = cur.cost + (1/(terr.moveMod ?? 1))
      if (moveCost > speed) continue
      if ((visited.get(key) ?? Infinity) <= moveCost) continue
      visited.set(key, moveCost)
      if (!blocked.has(key)) result.push({ x:nx, y:ny })
      queue.push({ x:nx, y:ny, cost:moveCost })
    }
  }
  return result
}

// 진형 오프셋 계산 (방어측은 x 반전)
function formationPos(buIndex, formation, flagship, isAttacker) {
  const offsets = FORMATION_OFFSETS[formation] ?? FORMATION_OFFSETS['FF_01']
  const [dx,dy] = offsets[buIndex] ?? [0, buIndex]
  return { x: flagship.x + (isAttacker ? dx : -dx), y: flagship.y + dy }
}

// 함대 → BU 엔티티 배열 생성
function makeUnits(fleet, faction, isAttacker, mapW, mapH, fleetIndex=0, totalFleets=1) {
  const formation  = fleet.formation ?? 'FF_01'
  const totalShips = fleet.ships ?? 0
  const buCount    = Math.min(8, Math.max(1, Math.ceil(totalShips/10000)+1))
  const shipsPerBU = Math.max(100, Math.floor(totalShips/buCount))

  const lp = fleet.locPos
  const hasLocPos = lp && (lp.x>0 || lp.y>0)
  const startX = hasLocPos
    ? clamp(lp.x, 1, mapW-2)
    : isAttacker ? clamp(mapW-4, 2, mapW-2) : clamp(3, 1, mapW-3)
  const startY = hasLocPos
    ? clamp(lp.y, 1, mapH-2)
    : clamp(Math.round(mapH*(fleetIndex+1)/(totalFleets+1)), 2, mapH-3)

  const flagship = { x:startX, y:startY }

  return Array.from({ length:buCount }, (_,i) => {
    const pos = i===0 ? flagship : formationPos(i, formation, flagship, isAttacker)
    return {
      unitId:           `${fleet.id}_BU_${i}`,
      fleetCode:        fleet.id,
      fleetName:        fleet.name,
      faction,
      role:             i===0 ? 'flagship' : 'unit',
      buIndex:          i,
      isAttacker,
      commander:        i===0 ? (fleet.commander ?? null) : null,
      formation,
      ships:            shipsPerBU,
      maxShips:         shipsPerBU,
      morale:           clamp(60 + Math.floor(charStat(fleet.commander)/100*20), 60, 80),
      x:                clamp(pos.x, 0, mapW-1),
      y:                clamp(pos.y, 0, mapH-1),
      px: 0, py: 0, targetPx: 0, targetPy: 0,
      moving:           false,
      moved:            false,
      attacked:         false,
      status:           'active',
      priorityTarget:   null,
      // ── P2 명령 예약 ──
      pendingMove:      null,   // { x, y } or null
      pendingFormation: null,   // 'FF_xx' or null
      pendingStandby:   false,
    }
  })
}

function syncPixels(unit) {
  unit.px = unit.x * TILE_PX
  unit.py = unit.y * TILE_PX
  unit.targetPx = unit.px
  unit.targetPy = unit.py
}

export const useTacticalStore = defineStore('tactical', {
  state: () => ({
    active:             false,
    map:                buildTacticalMap(),
    units:              [],
    // ── 페이즈: 'start' | 'order' | 'execute' | 'result'
    phase:              'start',
    // ── 전투 시간
    battleTime:         { hour: 0, minute: 0 },
    // ── 작전 목표
    operationObjective: null,
    // ── 선택 / 하이라이트
    selectedFleet:      null,
    movableCells:       [],
    attackableCells:    [],
    // ── 결과
    result:             null,
    context:            null,
    logs:               [],
    animating:          false,
    // ── Fog of War
    fowEnabled:         true,
    sightMap:           {},
    // ── 함대별 전술 역할 (fleetId → role code)
    fleetRoles:         {},
  }),

  getters: {
    playerFaction: s => s.context?.playerFaction ?? s.context?.attackerFaction ?? 'REH',
    tileAt: (s) => {
      const w = s.map.width ?? 40
      const grid = Object.create(null)
      s.map.tiles.forEach(t => { grid[t.x + t.y*w] = t })
      return (x,y) => grid[x + y*w] ?? { terrain:'SPACE' }
    },
    unitAt:       s => (x,y) => s.units.find(u => u.x===x && u.y===y) ?? null,
    flagshipOf:   s => fc => s.units.find(u => u.fleetCode===fc && u.role==='flagship'),
    unitsOfFleet: s => fc => s.units.filter(u => u.fleetCode===fc),
    isMovable:    s => (x,y) => s.movableCells.some(c => c.x===x && c.y===y),
    isAttackable: s => (x,y) => s.attackableCells.some(c => c.x===x && c.y===y),
    isTileVisible:  s => (x,y) => !s.fowEnabled || !!s.sightMap[`${x},${y}`],
    isUnitVisible:  s => u => {
      if (u.faction === (s.context?.playerFaction ?? s.context?.attackerFaction)) return true
      return !s.fowEnabled || !!s.sightMap[`${u.x},${u.y}`]
    },
    playerFleets() {
      const fcs = new Set(this.units.filter(u=>u.faction===this.playerFaction).map(u=>u.fleetCode))
      return [...fcs]
    },
    enemyFleets() {
      const fcs = new Set(this.units.filter(u=>u.faction!==this.playerFaction).map(u=>u.fleetCode))
      return [...fcs]
    },
    selectedFlagship() {
      if (!this.selectedFleet) return null
      return this.flagshipOf(this.selectedFleet)
    },
    unitGroups() {
      const map = {}
      this.units.forEach(u => {
        if (!map[u.faction]) map[u.faction] = { faction:u.faction, units:0, ships:0 }
        map[u.faction].units++
        map[u.faction].ships += u.ships
      })
      return Object.values(map)
    },
    visibleUnitGroups() {
      const map = {}
      this.units.filter(u=>this.isUnitVisible(u)).forEach(u => {
        if (!map[u.faction]) map[u.faction] = { faction:u.faction, units:0, ships:0 }
        map[u.faction].units++
        map[u.faction].ships += u.ships
      })
      return Object.values(map)
    },
    // 현재 시간 문자열 (HH:MM)
    timeLabel() {
      const h = String(this.battleTime.hour).padStart(2,'0')
      const m = String(this.battleTime.minute).padStart(2,'0')
      return `${h}:${m}`
    },
  },

  actions: {
    // ── 초기화 ────────────────────────────────────────────────
    initBattle(context) {
      this.$patch({
        active: true, context,
        phase: 'start',
        battleTime: { hour:0, minute:0 },
        operationObjective: null,
        pauseForStrategic: false,
        selectedFleet: null, movableCells:[], attackableCells:[],
        result: null, logs:[], animating: false,
        map: buildTacticalMap(context.locationId ?? null),
      })
      const mapW = this.map.width  ?? MAP_W
      const mapH = this.map.height ?? MAP_H
      const atkTotal = context.attackerFleets.length
      const defTotal = context.defenderFleets.length
      const atkUnits = context.attackerFleets.flatMap((af,i) =>
        makeUnits(af, context.attackerFaction, true,  mapW, mapH, i, atkTotal))
      const defUnits = context.defenderFleets.flatMap((df,i) =>
        makeUnits(df, df.faction,              false, mapW, mapH, i, defTotal))
      this.units = [...atkUnits, ...defUnits]
      this.units.forEach(syncPixels)
      this._calcSight()
      this._log(`⚔️ 전술전투 개시`)
    },

    // ── 함대별 전술 역할 저장 ─────────────────────────────────
    setFleetRoles(roles) {
      this.fleetRoles = { ...roles }
    },

    // ── 작전 목표 확정 → P2 진입 ──────────────────────────────
    confirmObjective(code) {
      this.operationObjective = code ?? this.operationObjective
      this.phase = 'order'
      this._calcSight()
      this._log(`📋 작전 목표: [${this.operationObjective}]`)
      this._log(`── P2 명령 페이즈 ${this.timeLabel} ──`)
    },

    // ── 함대 선택 (P2에서만) ──────────────────────────────────
    selectFleet(fleetCode) {
      if (this.phase !== 'order' || this.animating) return
      const flagship = this.flagshipOf(fleetCode)
      if (!flagship || flagship.faction !== this.playerFaction) return
      this.selectedFleet = fleetCode
      this._calcMovable()
      this._calcAttackable()
    },

    deselect() {
      this.selectedFleet   = null
      this.movableCells    = []
      this.attackableCells = []
    },

    // ── 함대 지휘권 체크 ───────────────────────────────────────
    // playerCharCode가 설정된 경우 해당 캐릭터가 사령관인 함대만 직접 명령 가능.
    // playerCharCode가 null이면 아군 함대 전체 제어 가능(자유 모드).
    canCommand(fleetCode) {
      const flagship = this.flagshipOf(fleetCode)
      if (!flagship || flagship.faction !== this.playerFaction) return false
      const game = useGameStore()
      if (game.playerCharCode && flagship.commander !== game.playerCharCode) return false
      return true
    },

    // ── 이동 명령 예약 ─────────────────────────────────────────
    setPendingMove(tx, ty) {
      if (this.phase !== 'order' || this.animating) return false
      if (!this.selectedFleet) return false
      if (!this.canCommand(this.selectedFleet)) return false
      const flagship = this.flagshipOf(this.selectedFleet)
      if (!flagship) return false
      if (!this.isMovable(tx, ty)) return false
      flagship.pendingMove    = { x:tx, y:ty }
      flagship.pendingStandby = false
      this._log(`📌 [${flagship.fleetName}] 이동 예약 (${tx},${ty})`)
      return true
    },

    // ── 진형 변경 예약 ─────────────────────────────────────────
    setPendingFormation(fleetCode, ffCode) {
      if (this.phase !== 'order') return
      const fc = fleetCode ?? this.selectedFleet
      if (!this.canCommand(fc)) return
      const flagship = this.flagshipOf(fc)
      if (!flagship) return
      flagship.pendingFormation = ffCode
      this._log(`🔷 [${flagship.fleetName}] 진형 예약: ${FORMATIONS[ffCode]?.name ?? ffCode}`)
    },

    // ── 대기 명령 ──────────────────────────────────────────────
    setStandby(fleetCode) {
      if (this.phase !== 'order') return
      const fc = fleetCode ?? this.selectedFleet
      if (!this.canCommand(fc)) return
      const flagship = this.flagshipOf(fc)
      if (!flagship) return
      flagship.pendingMove    = null
      flagship.pendingStandby = true
      this._log(`⏸ [${flagship.fleetName}] 대기`)
    },

    // ── 우선 공격 대상 ──────────────────────────────────────────
    setPriorityTarget(targetUnitId) {
      if (!this.selectedFleet) return
      if (!this.canCommand(this.selectedFleet)) return
      this.unitsOfFleet(this.selectedFleet).forEach(u => { u.priorityTarget = targetUnitId })
      this._log(`🎯 우선 대상 지정`)
    },

    // ── [>> 진행] — P3 수행 페이즈 실행 ──────────────────────────
    executePhase() {
      if (this.phase !== 'order' || this.animating) return
      this.deselect()
      this.phase = 'execute'

      // AI 명령 예약
      this._setAIPendingOrders()

      // 이동 패스
      this._executeMovePass()

      // 공격 패스
      this._executeAttackPass()

      // 승패 체크
      this._checkVictory()
      if (this.phase === 'result') return

      // 시간 +10분
      this.battleTime.minute += 10
      while (this.battleTime.minute >= 60) {
        this.battleTime.minute -= 60
        this.battleTime.hour++
      }

      const totalMin = this.battleTime.hour * 60 + this.battleTime.minute

      // 24시 → 전략 페이즈 진입
      if (totalMin >= 24 * 60) {
        this._resetTurnState()
        this._log(`🌙 자정 도달 — 전략 페이즈 복귀`)
        const game = useGameStore()
        game.pauseTacticalForStrategic({
          units:              JSON.parse(JSON.stringify(this.units)),
          battleTime:         { hour: 0, minute: 0 },
          operationObjective: this.operationObjective,
          logs:               [...this.logs],
          fowEnabled:         this.fowEnabled,
          fleetRoles:         { ...this.fleetRoles },
        })
        this.active = false
        router.push('/game')
        return
      }

      // 회의 간격 체크 (tacticalPhase 옵션: detail=60분, normal=120분, simple=240분)
      const game = useGameStore()
      const INTERVAL = { detail: 60, normal: 120, simple: 240 }[game.tacticalPhase ?? 'normal']
      if (totalMin % INTERVAL === 0) {
        this._resetTurnState()
        this.phase = 'start'
        this._log(`── P1 시작 페이즈 ${this.timeLabel} ──`)
        return
      }

      // P2 명령 페이즈 계속
      this._resetTurnState()
      this.phase = 'order'
      this._calcSight()
      this._log(`── P2 명령 페이즈 ${this.timeLabel} ──`)
    },

    // ── 전략 페이즈 후 스냅샷 복원 (TacticalView.onMounted에서 호출) ─
    restoreSnapshot(snapshot, ctx) {
      const units = snapshot.units.map(u => ({
        ...u,
        moving: false, moved: false, attacked: false,
        pendingMove: null, pendingFormation: null, pendingStandby: false,
        px: u.x * TILE_PX, py: u.y * TILE_PX,
        targetPx: u.x * TILE_PX, targetPy: u.y * TILE_PX,
      }))
      this.$patch({
        active:             true,
        context:            ctx,
        units,
        phase:              'start',
        battleTime:         { hour: 0, minute: 0 },
        operationObjective: snapshot.operationObjective,
        selectedFleet:      null,
        movableCells:       [],
        attackableCells:    [],
        result:             null,
        logs:               snapshot.logs ?? [],
        animating:          false,
        fowEnabled:         snapshot.fowEnabled ?? true,
        sightMap:           {},
        fleetRoles:         snapshot.fleetRoles ?? {},
      })
      this._calcSight()
      this._log('── 재개: 새 날 전투 ──')
    },

    _resetTurnState() {
      this.units.forEach(u => {
        u.moved           = false
        u.attacked        = false
        u.pendingMove     = null
        u.pendingFormation = null
        u.pendingStandby  = false
      })
    },

    // ── AI 명령 예약 ────────────────────────────────────────────
    _setAIPendingOrders() {
      const mapW = this.map.width  ?? MAP_W
      const mapH = this.map.height ?? MAP_H
      const aiFleets = [...new Set(
        this.units.filter(u => u.faction!==this.playerFaction && u.status==='active').map(u=>u.fleetCode)
      )]
      for (const fc of aiFleets) {
        const flagship = this.flagshipOf(fc)
        if (!flagship) continue
        const playerUnits = this.units.filter(u => u.faction===this.playerFaction && u.status==='active')
        if (!playerUnits.length) continue
        const nearest = playerUnits.reduce((a,b) => manhattan(flagship,a)<manhattan(flagship,b)?a:b)
        const range   = unitRange(flagship, (x,y)=>this.tileAt(x,y))
        const dist    = manhattan(flagship, nearest)
        if (dist > range) {
          const speed = unitSpeed(flagship)
          const dx = Math.sign(nearest.x - flagship.x)
          const dy = Math.sign(nearest.y - flagship.y)
          const absDx = Math.abs(nearest.x - flagship.x)
          const absDy = Math.abs(nearest.y - flagship.y)
          const dirs = absDx >= absDy ? [{x:dx,y:0},{x:0,y:dy}] : [{x:0,y:dy},{x:dx,y:0}]
          for (const d of dirs) {
            if (!d.x && !d.y) continue
            const nx = clamp(flagship.x + d.x*speed, 0, mapW-1)
            const ny = clamp(flagship.y + d.y*speed, 0, mapH-1)
            const t  = this.tileAt(nx, ny)
            if (TERRAIN[t.terrain]?.passable === false) continue
            if (this.unitAt(nx,ny)?.faction === this.playerFaction) continue
            flagship.pendingMove = { x:nx, y:ny }
            flagship.pendingStandby = false
            break
          }
        } else {
          flagship.pendingStandby = true
        }
      }
    },

    // ── 이동 패스 (이니셔티브 순서) ───────────────────────────────
    _executeMovePass() {
      const mapW = this.map.width  ?? MAP_W
      const mapH = this.map.height ?? MAP_H
      const queue = this._initiativeQueue()

      for (const unit of queue) {
        if (unit.role !== 'flagship') continue

        // 진형 변경 적용
        if (unit.pendingFormation && unit.pendingFormation !== unit.formation) {
          const prev = unit.formation
          unit.formation = unit.pendingFormation
          this.unitsOfFleet(unit.fleetCode).filter(u=>u.role!=='flagship').forEach(u => {
            u.formation = unit.pendingFormation
          })
          this._log(`🔷 [${unit.fleetName}] ${FORMATIONS[prev]?.name}→${FORMATIONS[unit.pendingFormation]?.name}`)
        }

        if (unit.pendingStandby || !unit.pendingMove) {
          unit.moved = true
          continue
        }

        const { x:tx, y:ty } = unit.pendingMove
        const speed = unitSpeed(unit)
        // A* 경로 탐색
        const otherUnits = this.units.filter(u => u.fleetCode!==unit.fleetCode && u.status==='active')
        const path = astar(unit.x, unit.y, tx, ty, speed,
          (x,y)=>this.tileAt(x,y), mapW, mapH, otherUnits, unit.unitId)
        const dest = path ? { x:tx, y:ty } : { x:unit.x, y:unit.y }

        // 기함 이동
        unit.x       = dest.x; unit.y       = dest.y
        unit.targetPx = dest.x * TILE_PX
        unit.targetPy = dest.y * TILE_PX
        unit.moving  = true
        unit.moved   = true

        // BU_1~7 편대 추종
        this.unitsOfFleet(unit.fleetCode).filter(u=>u.role!=='flagship').forEach(u => {
          const pos = formationPos(u.buIndex, unit.formation, unit, unit.isAttacker)
          u.x = clamp(pos.x, 0, mapW-1); u.y = clamp(pos.y, 0, mapH-1)
          u.targetPx = u.x * TILE_PX; u.targetPy = u.y * TILE_PX; u.moving = true
        })
        this._log(`▶ [${unit.fleetName}] → (${dest.x},${dest.y})`)
      }
      this._calcSight()
    },

    // ── 공격 패스 (이니셔티브 순서) ───────────────────────────────
    _executeAttackPass() {
      const queue = this._initiativeQueue()
      for (const unit of queue) {
        if (unit.attacked || unit.status!=='active') continue
        const range   = unitRange(unit, (x,y)=>this.tileAt(x,y))
        const enemies = this.units.filter(u => u.faction!==unit.faction && u.status==='active')
        const inRange = enemies.filter(e => manhattan(unit,e) <= range)
        if (!inRange.length) continue
        const priority = unit.priorityTarget
          ? inRange.find(e => e.unitId===unit.priorityTarget)
          : null
        const target = priority ?? inRange.reduce((a,b) => manhattan(unit,a)<manhattan(unit,b)?a:b)
        this._combat(unit.unitId, target.unitId)
        if (unit.status!=='destroyed') { unit.attacked=true; unit.priorityTarget=null }
      }
    },

    // 이니셔티브 큐: statCmd 내림차순, 동점 시 공격측 우선
    _initiativeQueue() {
      return [...this.units]
        .filter(u => u.status==='active')
        .sort((a,b) => {
          const sa = charStat(a.commander), sb = charStat(b.commander)
          if (sb !== sa) return sb - sa
          if (a.isAttacker && !b.isAttacker) return -1
          if (!a.isAttacker &&  b.isAttacker) return  1
          return 0
        })
    },

    // ── 전투 계산 ─────────────────────────────────────────────
    _combat(atkId, defId) {
      const atk = this.units.find(u=>u.unitId===atkId)
      const def = this.units.find(u=>u.unitId===defId)
      if (!atk||!def||atk.status!=='active'||def.status!=='active') return

      const atkFm   = fm(atk.formation)
      const defFm   = fm(def.formation)
      const atkStat = charStat(atk.commander)/100
      const defStat = charStat(def.commander)/100
      const atkTerr = TERRAIN[this.tileAt(atk.x,atk.y)?.terrain ?? 'SPACE']
      const defTerr = TERRAIN[this.tileAt(def.x,def.y)?.terrain ?? 'SPACE']
      const matchMod = this._matchBonus(atkFm.ffType, defFm.ffType)

      const rawDmg  = atk.ships * 0.15 * atkFm.offMod * (0.7+atkStat*0.6) * (atkTerr?.offMod??1) * matchMod * rand(0.85,1.15)
      const dmg     = Math.max(100, Math.floor(rawDmg * (1 - defFm.defMod*0.3*(defTerr?.defMod??1))))
      const counter = Math.max(50,  Math.floor(def.ships * defFm.defMod * (0.7+defStat*0.6) * (defTerr?.defMod??1) * 0.06 * rand(0.85,1.15)))

      def.ships  = Math.max(0, def.ships  - dmg)
      atk.ships  = Math.max(0, atk.ships  - counter)
      def.morale = Math.max(0, def.morale - Math.floor(dmg    /Math.max(1,def.maxShips)*50))
      atk.morale = Math.max(0, atk.morale - Math.floor(counter/Math.max(1,atk.maxShips)*25))

      this._log(`[${atk.fleetName}]→[${def.fleetName}] -${dmg.toLocaleString()}척 / 반격 -${counter.toLocaleString()}척`)
      if (def.ships<=0||def.morale<=MORALE_ROUT) this._destroyUnit(def.unitId)
      if (atk.ships<=0||atk.morale<=MORALE_ROUT) this._destroyUnit(atk.unitId)
    },

    _destroyUnit(unitId) {
      const u = this.units.find(x=>x.unitId===unitId)
      if (!u||u.status==='destroyed') return
      u.status = 'destroyed'
      this._log(`💥 [${u.fleetName}] BU_${u.buIndex} 격파!`)
      if (u.role==='flagship') {
        this.unitsOfFleet(u.fleetCode).forEach(bu => {
          if (bu.unitId===unitId) return
          bu.morale = Math.max(0, bu.morale-40)
          if (bu.morale<=MORALE_ROUT) { bu.status='destroyed'; this._log(`💥 [${bu.fleetName}] BU_${bu.buIndex} 패주!`) }
        })
      }
      this.units = this.units.filter(x=>x.status!=='destroyed')
    },

    // 진형 상성 보정 (설계: ATK>DEF>ENC>MOV>ATK)
    _matchBonus(atkType, defType) {
      const adv  = { ATK:'DEF', DEF:'ENC', MOV:'ATK', ENC:'MOV' }
      const disadv = { ATK:'ENC', DEF:'MOV', MOV:'DEF', ENC:'ATK' }
      if (adv[atkType]    === defType) return 1.15
      if (disadv[atkType] === defType) return 0.85
      return 1.0
    },

    // ── 승리 판정 ──────────────────────────────────────────────
    _checkVictory() {
      const pShips = this.units.filter(u=>u.faction===this.playerFaction).reduce((s,u)=>s+u.ships,0)
      const eShips = this.units.filter(u=>u.faction!==this.playerFaction).reduce((s,u)=>s+u.ships,0)
      const initAtk = this.context?.attackerFleets?.reduce((a,f)=>a+(f.ships??0),0) ?? 1
      const initDef = this.context?.defenderFleets?.reduce((a,f)=>a+(f.ships??0),0) ?? 1
      const pGone = !this.units.some(u=>u.faction===this.playerFaction)
      const eGone = !this.units.some(u=>u.faction!==this.playerFaction)
      if (eGone) {
        this.result = { winner:this.playerFaction, attackerLosses:initAtk-pShips, defenderLosses:initDef }
        this.phase  = 'result'
        this._log('🏆 승리! 적 함대 전멸')
      } else if (pGone) {
        const ef = this.units.find(u=>u.faction!==this.playerFaction)?.faction
        this.result = { winner:ef, attackerLosses:initAtk, defenderLosses:initDef-eShips }
        this.phase  = 'result'
        this._log('💀 패배')
      }
    },

    // ── 하이라이트 계산 ────────────────────────────────────────
    _calcMovable() {
      const flagship = this.selectedFlagship
      if (!flagship) { this.movableCells=[]; return }
      this.movableCells = bfsMovable(
        flagship, this.units, (x,y)=>this.tileAt(x,y),
        this.map.width??MAP_W, this.map.height??MAP_H
      )
    },

    _calcAttackable() {
      const flagship = this.selectedFlagship
      if (!flagship) { this.attackableCells=[]; return }
      const fleetUnits = this.unitsOfFleet(this.selectedFleet).filter(u=>u.status==='active')
      const cells = new Map()
      for (const u of fleetUnits) {
        const range = unitRange(u, (x,y)=>this.tileAt(x,y))
        this.units
          .filter(e=>e.faction!==this.playerFaction && e.status==='active' && manhattan(u,e)<=range)
          .forEach(e=>cells.set(`${e.x},${e.y}`,{x:e.x,y:e.y}))
      }
      this.attackableCells = [...cells.values()]
    },

    _log(msg) {
      this.logs.unshift(msg)
      if (this.logs.length>200) this.logs.pop()
    },

    // ── Fog of War ─────────────────────────────────────────────
    toggleFow() {
      this.fowEnabled = !this.fowEnabled
      this._calcSight()
    },

    _calcSight() {
      if (!this.fowEnabled) { this.sightMap={}; return }
      const mapW = this.map.width  ?? MAP_W
      const mapH = this.map.height ?? MAP_H
      const newMap = {}
      this.units
        .filter(u=>u.faction===this.playerFaction && u.status==='active')
        .forEach(u => {
          let radius = BASE_SIGHT
          if (u.role==='flagship' && u.commander) {
            const c = CHARACTERS?.[u.commander]
            const inf = c?.statInf ?? 50
            const mng = c?.statMng ?? 50
            radius = Math.min(12, BASE_SIGHT + Math.floor(inf/25) + Math.floor(mng/25))
          }
          for (let dy=-radius; dy<=radius; dy++)
            for (let dx=-radius; dx<=radius; dx++)
              if (dx*dx+dy*dy<=radius*radius) {
                const tx=u.x+dx, ty=u.y+dy
                if (tx>=0&&tx<mapW&&ty>=0&&ty<mapH) newMap[`${tx},${ty}`]=true
              }
        })
      this.sightMap = newMap
    },
  },
})
