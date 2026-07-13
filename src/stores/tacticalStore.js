import { defineStore } from 'pinia'
import {
  FORMATIONS, FORMATION_OFFSETS, TERRAIN,
  MAP_W, MAP_H, TILE_PX, buildTacticalMap,
} from '@/data/base/tactical/tacticalData'
import { CHARACTERS } from '@/data/masterData'

const BASE_SPEED = 4
const BASE_RANGE = 2
const BASE_SIGHT = 4
const MORALE_ROUT = 15

function rand(lo, hi) { return lo + Math.random() * (hi - lo) }
function manhattan(a, b) { return Math.abs(a.x - b.x) + Math.abs(a.y - b.y) }
function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)) }

function fm(id) {
  return FORMATIONS[id] ?? FORMATIONS['FF_01']
}

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

// BFS — 이동 가능 타일 목록 반환
function bfsMovable(unit, allUnits, tileAt, mapW, mapH) {
  const speed   = unitSpeed(unit)
  const visited = new Map()          // `${x},${y}` → cost
  const queue   = [{ x: unit.x, y: unit.y, cost: 0 }]
  const result  = []
  const blocked = new Set(allUnits.filter(u => u.unitId !== unit.unitId).map(u => `${u.x},${u.y}`))

  visited.set(`${unit.x},${unit.y}`, 0)

  while (queue.length) {
    const cur = queue.shift()
    for (const [dx, dy] of [[1,0],[-1,0],[0,1],[0,-1]]) {
      const nx = cur.x + dx, ny = cur.y + dy
      if (nx < 0 || nx >= mapW || ny < 0 || ny >= mapH) continue
      const key  = `${nx},${ny}`
      const terr = TERRAIN[tileAt(nx, ny)?.terrain ?? 'SPACE']
      if (!terr?.passable) continue
      const moveCost = cur.cost + (1 / (terr.moveMod ?? 1))
      if (moveCost > speed) continue
      if ((visited.get(key) ?? Infinity) <= moveCost) continue
      visited.set(key, moveCost)
      if (!blocked.has(key)) result.push({ x: nx, y: ny })
      queue.push({ x: nx, y: ny, cost: moveCost })
    }
  }
  return result
}

// 진형 오프셋 계산 (방어측은 x 반전)
function formationPos(buIndex, formation, flagship, isAttacker) {
  const offsets = FORMATION_OFFSETS[formation] ?? FORMATION_OFFSETS['FF_01']
  const [dx, dy] = offsets[buIndex] ?? [0, buIndex]
  return {
    x: flagship.x + (isAttacker ? dx : -dx),
    y: flagship.y + dy,
  }
}

// 함대 → BU 엔티티 배열 생성
// fleetIndex/totalFleets: 같은 진영 다중 함대 시 기함 Y 분산 배치
function makeUnits(fleet, faction, isAttacker, mapW, mapH, fleetIndex = 0, totalFleets = 1) {
  const formation = fleet.formation ?? 'FF_01'
  const totalShips = fleet.ships ?? 0
  const buCount = Math.min(8, Math.max(1, Math.ceil(totalShips / 10000) + 1))
  const shipsPerBU = Math.max(100, Math.floor(totalShips / buCount))

  // BU_0 초기 위치 — 다중 함대는 Y축 균등 분산
  const startX = isAttacker
    ? clamp(mapW - 4, 2, mapW - 2)
    : clamp(3, 1, mapW - 3)
  const startY = clamp(
    Math.round(mapH * (fleetIndex + 1) / (totalFleets + 1)),
    2, mapH - 3
  )

  const flagship = { x: startX, y: startY }

  return Array.from({ length: buCount }, (_, i) => {
    const pos = i === 0 ? flagship : formationPos(i, formation, flagship, isAttacker)
    return {
      unitId:        `${fleet.id}_BU_${i}`,
      fleetCode:     fleet.id,
      fleetName:     fleet.name,
      faction,
      role:          i === 0 ? 'flagship' : 'unit',
      buIndex:       i,
      isAttacker,
      commander:     i === 0 ? (fleet.commander ?? null) : null,
      formation,
      ships:         shipsPerBU,
      maxShips:      shipsPerBU,
      morale:        clamp(60 + Math.floor(charStat(fleet.commander) / 100 * 20), 60, 80),
      x:             clamp(pos.x, 0, mapW - 1),
      y:             clamp(pos.y, 0, mapH - 1),
      // 픽셀 좌표 (캔버스 애니메이션용)
      px:            0,
      py:            0,
      targetPx:      0,
      targetPy:      0,
      moving:        false,
      // 턴 상태
      moved:         false,
      attacked:      false,
      status:        'active',     // 'active' | 'routing' | 'destroyed'
      priorityTarget: null,
    }
  })
}

// 픽셀 위치 동기화
function syncPixels(unit) {
  unit.px = unit.x * TILE_PX
  unit.py = unit.y * TILE_PX
  unit.targetPx = unit.px
  unit.targetPy = unit.py
}

export const useTacticalStore = defineStore('tactical', {
  state: () => ({
    active:           false,
    map:              buildTacticalMap(),
    units:            [],
    phase:            'player',
    turn:             1,
    selectedFleet:    null,   // fleetCode
    movableCells:     [],
    attackableCells:  [],
    result:           null,
    context:          null,
    logs:             [],
    animating:        false,
    // ── Fog of War ──
    fowEnabled:       true,
    sightMap:         {},     // { "x,y": true } 아군 시야 내 타일
  }),

  getters: {
    playerFaction:    s => s.context?.playerFaction ?? s.context?.attackerFaction ?? 'REH',
    tileAt:           s => (x, y) => s.map.tiles.find(t => t.x === x && t.y === y) ?? { terrain:'SPACE' },
    unitAt:           s => (x, y) => s.units.find(u => u.x === x && u.y === y) ?? null,
    flagshipOf:       s => fc => s.units.find(u => u.fleetCode === fc && u.role === 'flagship'),
    unitsOfFleet:     s => fc => s.units.filter(u => u.fleetCode === fc),

    isMovable:        s => (x, y) => s.movableCells.some(c => c.x === x && c.y === y),
    isAttackable:     s => (x, y) => s.attackableCells.some(c => c.x === x && c.y === y),
    isTileVisible:    s => (x, y) => !s.fowEnabled || !!s.sightMap[`${x},${y}`],
    isUnitVisible:    s => u => {
      if (u.faction === (s.context?.playerFaction ?? s.context?.attackerFaction)) return true
      return !s.fowEnabled || !!s.sightMap[`${u.x},${u.y}`]
    },

    playerFleets() {
      const fcs = new Set(this.units.filter(u => u.faction === this.playerFaction).map(u => u.fleetCode))
      return [...fcs]
    },
    enemyFleets() {
      const fcs = new Set(this.units.filter(u => u.faction !== this.playerFaction).map(u => u.fleetCode))
      return [...fcs]
    },

    selectedFlagship() {
      if (!this.selectedFleet) return null
      return this.flagshipOf(this.selectedFleet)
    },

    unitGroups() {
      const map = {}
      this.units.forEach(u => {
        if (!map[u.faction]) map[u.faction] = { faction: u.faction, units: 0, ships: 0 }
        map[u.faction].units++
        map[u.faction].ships += u.ships
      })
      return Object.values(map)
    },
  },

  actions: {
    // ── 초기화 ────────────────────────────────────────────────
    initBattle(context) {
      this.$patch({
        active: true, context,
        turn: 1, phase: 'player',
        selectedFleet: null, movableCells: [], attackableCells: [],
        result: null, logs: [], animating: false,
        map: buildTacticalMap(context.locationId ?? null),
      })
      const mapW = this.map.width  ?? MAP_W
      const mapH = this.map.height ?? MAP_H

      const atkTotal = context.attackerFleets.length
      const defTotal = context.defenderFleets.length
      const atkUnits = context.attackerFleets.flatMap((af, i) =>
        makeUnits(af, context.attackerFaction, true, mapW, mapH, i, atkTotal))
      const defUnits = context.defenderFleets.flatMap((df, i) =>
        makeUnits(df, df.faction, false, mapW, mapH, i, defTotal))

      this.units = [...atkUnits, ...defUnits]
      this.units.forEach(syncPixels)
      this._calcSight()

      this._log(`⚔️ 전술전투 개시 — ${context.attackerFleets.map(f=>f.name).join(', ')} vs ${context.defenderFleets.map(f=>f.name).join(', ')}`)
      this._log(`── 1턴 플레이어 페이즈 ──`)
    },

    // ── 함대 선택 ────────────────────────────────────────────
    selectFleet(fleetCode) {
      if (this.phase !== 'player' || this.animating) return
      const flagship = this.flagshipOf(fleetCode)
      if (!flagship || flagship.faction !== this.playerFaction) return
      if (flagship.moved && flagship.attacked) return

      this.selectedFleet = fleetCode
      this._calcMovable()
      this._calcAttackable()
    },

    deselect() {
      this.selectedFleet   = null
      this.movableCells    = []
      this.attackableCells = []
    },

    // ── 기함 이동 → 편대 추종 ────────────────────────────────
    moveFleetTo(tx, ty) {
      if (this.phase !== 'player' || this.animating) return false
      if (!this.selectedFleet) return false
      const flagship = this.flagshipOf(this.selectedFleet)
      if (!flagship || flagship.moved) return false
      if (!this.isMovable(tx, ty)) return false

      const mapW = this.map.width  ?? MAP_W
      const mapH = this.map.height ?? MAP_H
      const fleetUnits = this.unitsOfFleet(this.selectedFleet)

      // BU_0 이동
      flagship.x = tx; flagship.y = ty
      flagship.moved = true
      flagship.targetPx = tx * TILE_PX
      flagship.targetPy = ty * TILE_PX
      flagship.moving = true

      // BU_1~7 편대 추종
      fleetUnits.filter(u => u.role !== 'flagship').forEach(u => {
        const pos = formationPos(u.buIndex, flagship.formation, flagship, flagship.isAttacker)
        u.x = clamp(pos.x, 0, mapW - 1)
        u.y = clamp(pos.y, 0, mapH - 1)
        u.targetPx = u.x * TILE_PX
        u.targetPy = u.y * TILE_PX
        u.moving = true
      })

      this._log(`▶ [${flagship.fleetName}] 기함 → (${tx}, ${ty})`)
      this.movableCells = []
      this._calcAttackable()

      // 이동 후 사거리 내 자동교전 체크
      this._checkAutoEngage(this.selectedFleet)
      this._calcSight()
      return true
    },

    // ── 우선 공격 대상 지정 ──────────────────────────────────
    setPriorityTarget(targetUnitId) {
      if (!this.selectedFleet) return
      const fleetUnits = this.unitsOfFleet(this.selectedFleet)
      fleetUnits.forEach(u => { u.priorityTarget = targetUnitId })
      this._log(`🎯 우선 공격 대상 지정`)
    },

    // ── 자동교전 (이동 후 / 턴 시작 시) ─────────────────────
    _checkAutoEngage(fleetCode) {
      const fleetUnits = this.unitsOfFleet(fleetCode).filter(u => !u.attacked && u.status === 'active')
      for (const atk of fleetUnits) {
        const range = unitRange(atk, (x, y) => this.tileAt(x, y))
        const enemies = this.units.filter(u => u.faction !== atk.faction && u.status === 'active')
        const priorityEnemy = atk.priorityTarget
          ? enemies.find(e => e.unitId === atk.priorityTarget)
          : null
        const inRange = enemies.filter(e => manhattan(atk, e) <= range)
        const target = priorityEnemy && inRange.some(e => e.unitId === priorityEnemy.unitId)
          ? priorityEnemy
          : inRange.length ? inRange.reduce((a, b) => manhattan(atk, a) < manhattan(atk, b) ? a : b) : null
        if (target) {
          this._combat(atk.unitId, target.unitId)
          if (atk.status !== 'destroyed') {
            atk.attacked = true
            atk.priorityTarget = null
          }
        }
      }
      this._checkVictory()
    },

    // ── 수동 공격 (적 유닛 클릭 시) ─────────────────────────
    attackUnit(targetId) {
      if (this.phase !== 'player' || this.animating) return false
      if (!this.selectedFleet) return false
      const target = this.units.find(u => u.unitId === targetId)
      if (!target || target.faction === this.playerFaction) return false
      if (!this.attackableCells.some(c => c.x === target.x && c.y === target.y)) return false

      const atkUnits = this.unitsOfFleet(this.selectedFleet).filter(u => !u.attacked && u.status === 'active')
      atkUnits.forEach(u => {
        const range = unitRange(u, (x, y) => this.tileAt(x, y))
        if (manhattan(u, target) <= range) {
          this._combat(u.unitId, targetId)
          if (u.status !== 'destroyed') { u.attacked = true; u.priorityTarget = null }
        }
      })
      this._calcAttackable()
      this._checkVictory()
      return true
    },

    // ── 턴 종료 ──────────────────────────────────────────────
    endPlayerTurn() {
      if (this.phase !== 'player' || this.animating) return
      this.phase = 'ai'
      this.deselect()
      this._log(`── ${this.turn}턴 종료 ──`)
      this.units.forEach(u => {
        if (u.faction === this.playerFaction) { u.moved = false; u.attacked = false }
      })
      this._aiTurn()
    },

    // ── AI 페이즈 ────────────────────────────────────────────
    _aiTurn() {
      const mapW = this.map.width  ?? MAP_W
      const mapH = this.map.height ?? MAP_H

      const aiFleets = [...new Set(
        this.units
          .filter(u => u.faction !== this.playerFaction && u.status === 'active')
          .map(u => u.fleetCode)
      )]

      for (const fc of aiFleets) {
        if (this.phase === 'result') break
        const flagship = this.flagshipOf(fc)
        if (!flagship || flagship.moved) continue

        const playerUnits = this.units.filter(u => u.faction === this.playerFaction && u.status === 'active')
        if (!playerUnits.length) break

        const nearest = playerUnits.reduce((a, b) => manhattan(flagship, a) < manhattan(flagship, b) ? a : b)
        const range   = unitRange(flagship, (x, y) => this.tileAt(x, y))
        const dist    = manhattan(flagship, nearest)

        if (dist > range) {
          // 기함 이동
          const speed = unitSpeed(flagship)
          const dx = Math.sign(nearest.x - flagship.x)
          const dy = Math.sign(nearest.y - flagship.y)
          const absDx = Math.abs(nearest.x - flagship.x)
          const absDy = Math.abs(nearest.y - flagship.y)
          const dirs = absDx >= absDy
            ? [{ x:dx, y:0 },{ x:0, y:dy },{ x:dx, y:dy }]
            : [{ x:0, y:dy },{ x:dx, y:0 },{ x:dx, y:dy }]

          for (const d of dirs) {
            if (!d.x && !d.y) continue
            const nx = clamp(flagship.x + d.x * speed, 0, mapW - 1)
            const ny = clamp(flagship.y + d.y * speed, 0, mapH - 1)
            const t  = this.tileAt(nx, ny)
            if (TERRAIN[t.terrain]?.passable === false) continue
            if (this.unitAt(nx, ny)?.faction === this.playerFaction) continue
            flagship.x = nx; flagship.y = ny
            flagship.targetPx = nx * TILE_PX; flagship.targetPy = ny * TILE_PX; flagship.moving = true
            flagship.moved = true
            // 편대 추종
            this.unitsOfFleet(fc).filter(u => u.role !== 'flagship').forEach(u => {
              const pos = formationPos(u.buIndex, flagship.formation, flagship, flagship.isAttacker)
              u.x = clamp(pos.x, 0, mapW - 1); u.y = clamp(pos.y, 0, mapH - 1)
              u.targetPx = u.x * TILE_PX; u.targetPy = u.y * TILE_PX; u.moving = true
            })
            break
          }
        } else {
          flagship.moved = true
        }

        this._checkAutoEngage(fc)
      }

      this._checkVictory()

      if (this.phase !== 'result') {
        this.units.forEach(u => {
          if (u.faction !== this.playerFaction) { u.moved = false; u.attacked = false }
        })
        this.turn++
        this.phase = 'player'
        this._calcSight()
        this._log(`── ${this.turn}턴 플레이어 페이즈 ──`)
        // 플레이어 턴 시작 시 자동교전 체크
        for (const fc of this.playerFleets) this._checkAutoEngage(fc)
      }
    },

    // ── 전투 계산 ────────────────────────────────────────────
    _combat(atkId, defId) {
      const atk = this.units.find(u => u.unitId === atkId)
      const def = this.units.find(u => u.unitId === defId)
      if (!atk || !def || atk.status !== 'active' || def.status !== 'active') return

      const atkFm   = fm(atk.formation)
      const defFm   = fm(def.formation)
      const atkStat = charStat(atk.commander) / 100
      const defStat = charStat(def.commander) / 100
      const atkTerr = TERRAIN[this.tileAt(atk.x, atk.y)?.terrain ?? 'SPACE']
      const defTerr = TERRAIN[this.tileAt(def.x, def.y)?.terrain ?? 'SPACE']

      const matchMod = this._matchBonus(atkFm.ffType, defFm.ffType)

      const rawDmg  = atk.ships * 0.15 * atkFm.offMod * (0.7 + atkStat * 0.6) * (atkTerr?.offMod ?? 1) * matchMod * rand(0.85, 1.15)
      const dmg     = Math.max(100, Math.floor(rawDmg * (1 - defFm.defMod * 0.3 * (defTerr?.defMod ?? 1))))
      const counter = Math.max(50,  Math.floor(def.ships * defFm.defMod * (0.7 + defStat * 0.6) * (defTerr?.defMod ?? 1) * 0.06 * rand(0.85, 1.15)))

      def.ships  = Math.max(0, def.ships  - dmg)
      atk.ships  = Math.max(0, atk.ships  - counter)
      def.morale = Math.max(0, def.morale - Math.floor(dmg     / Math.max(1, def.maxShips) * 50))
      atk.morale = Math.max(0, atk.morale - Math.floor(counter / Math.max(1, atk.maxShips) * 25))

      const atkLabel = atk.role === 'flagship' ? `[${atk.fleetName}] 기함` : `[${atk.fleetName}] BU_${atk.buIndex}`
      this._log(`${atkLabel} → ${def.fleetName} BU_${def.buIndex}: -${dmg.toLocaleString()}척 / 반격 -${counter.toLocaleString()}척`)

      if (def.ships  <= 0 || def.morale  <= MORALE_ROUT) this._destroyUnit(def.unitId)
      if (atk.ships  <= 0 || atk.morale  <= MORALE_ROUT) this._destroyUnit(atk.unitId)
    },

    _destroyUnit(unitId) {
      const u = this.units.find(x => x.unitId === unitId)
      if (!u || u.status === 'destroyed') return
      u.status = 'destroyed'
      this._log(`💥 [${u.fleetName}] BU_${u.buIndex} 격파!`)

      // 기함 격파 → 편대 사기 붕괴
      if (u.role === 'flagship') {
        this.unitsOfFleet(u.fleetCode).forEach(bu => {
          if (bu.unitId === unitId) return
          bu.morale = Math.max(0, bu.morale - 40)
          if (bu.morale <= MORALE_ROUT) { bu.status = 'destroyed'; this._log(`💥 [${bu.fleetName}] BU_${bu.buIndex} 패주!`) }
        })
      }

      this.units = this.units.filter(x => x.status !== 'destroyed')
    },

    _matchBonus(atkType, defType) {
      if (atkType === 'ATK' && defType === 'DEF') return 0.85
      if (atkType === 'ATK' && defType === 'MOV') return 1.15
      if (atkType === 'MOV' && defType === 'DEF') return 1.15
      if (atkType === 'ENC' && defType === 'ATK') return 1.15
      if (atkType === 'DEF' && defType === 'ATK') return 1.15
      return 1.0
    },

    // ── 승리 판정 ────────────────────────────────────────────
    _checkVictory() {
      const pShips = this.units.filter(u => u.faction === this.playerFaction).reduce((s, u) => s + u.ships, 0)
      const eShips = this.units.filter(u => u.faction !== this.playerFaction).reduce((s, u) => s + u.ships, 0)
      const initAtk = this.context?.attackerFleets?.reduce((a, f) => a + (f.ships ?? 0), 0) ?? 1
      const initDef = this.context?.defenderFleets?.reduce((a, f) => a + (f.ships ?? 0), 0) ?? 1

      const pGone = this.units.filter(u => u.faction === this.playerFaction).length === 0
      const eGone = this.units.filter(u => u.faction !== this.playerFaction).length === 0

      if (eGone) {
        this.result = { winner: this.playerFaction, attackerLosses: initAtk - pShips, defenderLosses: initDef }
        this.phase  = 'result'
        this._log('🏆 승리! 적 함대 전멸')
      } else if (pGone) {
        const ef = this.units.find(u => u.faction !== this.playerFaction)?.faction
        this.result = { winner: ef, attackerLosses: initAtk, defenderLosses: initDef - eShips }
        this.phase  = 'result'
        this._log('💀 패배')
      }
    },

    // ── 하이라이트 계산 ──────────────────────────────────────
    _calcMovable() {
      const flagship = this.selectedFlagship
      if (!flagship || flagship.moved) { this.movableCells = []; return }
      this.movableCells = bfsMovable(flagship, this.units, (x,y) => this.tileAt(x,y), this.map.width ?? MAP_W, this.map.height ?? MAP_H)
    },

    _calcAttackable() {
      const flagship = this.selectedFlagship
      if (!flagship) { this.attackableCells = []; return }
      const fleetUnits = this.unitsOfFleet(this.selectedFleet).filter(u => !u.attacked && u.status === 'active')
      const cells = new Map()
      for (const u of fleetUnits) {
        const range = unitRange(u, (x, y) => this.tileAt(x, y))
        this.units
          .filter(e => e.faction !== this.playerFaction && e.status === 'active' && manhattan(u, e) <= range)
          .forEach(e => cells.set(`${e.x},${e.y}`, { x: e.x, y: e.y }))
      }
      this.attackableCells = [...cells.values()]
    },

    _log(msg) {
      this.logs.unshift(msg)
      if (this.logs.length > 200) this.logs.pop()
    },

    // ── Fog of War ───────────────────────────────────────────
    toggleFow() {
      this.fowEnabled = !this.fowEnabled
      this._calcSight()
    },

    _calcSight() {
      if (!this.fowEnabled) { this.sightMap = {}; return }
      const mapW = this.map.width  ?? MAP_W
      const mapH = this.map.height ?? MAP_H
      const newMap = {}

      // 아군 유닛별 시야 원 계산
      this.units
        .filter(u => u.faction === this.playerFaction && u.status === 'active')
        .forEach(u => {
          // 기함: 사령관 statInf+statMng 기반 시야 / 일반 부대: BASE_SIGHT
          let radius = BASE_SIGHT
          if (u.role === 'flagship' && u.commander) {
            const c = CHARACTERS?.[u.commander]
            const inf = c?.statInf ?? 50
            const mng = c?.statMng ?? 50
            radius = Math.min(12, BASE_SIGHT + Math.floor(inf / 25) + Math.floor(mng / 25))
          }
          for (let dy = -radius; dy <= radius; dy++) {
            for (let dx = -radius; dx <= radius; dx++) {
              if (dx * dx + dy * dy <= radius * radius) {
                const tx = u.x + dx, ty = u.y + dy
                if (tx >= 0 && tx < mapW && ty >= 0 && ty < mapH)
                  newMap[`${tx},${ty}`] = true
              }
            }
          }
        })
      this.sightMap = newMap
    },
  },
})
