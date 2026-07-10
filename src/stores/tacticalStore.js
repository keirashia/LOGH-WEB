import { defineStore } from 'pinia'
import { FORMATIONS, TERRAIN, MAP_W, MAP_H, buildTacticalMap } from '@/data/base/tactical/tacticalData'
import { CHARACTERS } from '@/data/masterData'

function fm(id)            { return FORMATIONS[id] || FORMATIONS.DOUBLE_COL }
function manhattan(a, b)   { return Math.abs(a.x - b.x) + Math.abs(a.y - b.y) }
function rand(lo, hi)      { return lo + Math.random() * (hi - lo) }

// fleet → 전술 편대 배열 생성
function makeSquadrons(fleet, faction, isAttacker) {
  const sqCount = fleet.ships >= 12000 ? 3 : fleet.ships >= 6000 ? 2 : 1
  const shipsEa = Math.floor(fleet.ships / sqCount)
  return Array.from({ length: sqCount }, (_, i) => ({
    id:        `${fleet.id}_sq${i}`,
    name:      sqCount === 1 ? fleet.name : `${fleet.name} ${['전위','중위','후위'][i]}`,
    faction,
    fleetId:   fleet.id,
    commander: i === 0 ? fleet.commander : null,
    ships:     shipsEa,
    maxShips:  shipsEa,
    formation: 'DOUBLE_COL',
    morale:    80,
    // 공격측: 오른쪽, 방어측: 왼쪽
    x:         isAttacker ? MAP_W - 2 - (i % 2) : 1 + (i % 2),
    y:         Math.min(MAP_H - 2, Math.max(1, 2 + i * 3)),
    moved:     false,
    attacked:  false,
  }))
}

export const useTacticalStore = defineStore('tactical', {
  state: () => ({
    active:          false,
    map:             buildTacticalMap(),
    units:           [],
    phase:           'player',    // 'player' | 'ai' | 'result'
    turn:            1,
    selectedId:      null,
    movableCells:    [],
    attackableCells: [],
    result:          null,        // { winner, attackerLosses, defenderLosses }
    context:         null,
    logs:            [],
  }),

  getters: {
    playerFaction:   s => s.context?.playerFaction ?? s.context?.attackerFaction ?? 'REH',
    selectedUnit:    s => s.units.find(u => u.id === s.selectedId) || null,
    playerUnits:     s => s.units.filter(u => u.faction === (s.context?.attackerFaction || 'REH')),
    enemyUnits:      s => s.units.filter(u => u.faction !== (s.context?.attackerFaction || 'REH')),
    tileAt:          s => (x, y) => s.map.tiles.find(t => t.x === x && t.y === y) || { terrain:'SPACE' },
    unitAt:          s => (x, y) => s.units.find(u => u.x === x && u.y === y) || null,
    isMovable:       s => (x, y) => s.movableCells.some(c => c.x === x && c.y === y),
    isAttackable:    s => (x, y) => s.attackableCells.some(c => c.x === x && c.y === y),
  },

  actions: {
    // ── 전투 초기화 ──────────────────────────────────────────
    initBattle(context) {
      this.$patch({
        active: true, context,
        turn: 1, phase: 'player',
        selectedId: null, movableCells: [], attackableCells: [],
        result: null, logs: [],
        map: buildTacticalMap(),
      })
      this.units = [
        ...context.attackerFleets.flatMap(af => makeSquadrons(af, context.attackerFaction, true)),
        ...context.defenderFleets.flatMap(df => makeSquadrons(df, df.faction, false)),
      ]
      const atkNames = context.attackerFleets.map(f => f.name).join(', ')
      const defNames = context.defenderFleets.map(f => f.name).join(', ')
      this._log(`⚔️ 전술전투 개시`)
      this._log(`  공격: ${atkNames}  /  방어: ${defNames}`)
      this._log(`── 1턴 플레이어 페이즈 ──`)
    },

    // ── 선택 / 해제 ──────────────────────────────────────────
    selectUnit(id) {
      if (this.phase !== 'player') return
      const u = this.units.find(x => x.id === id)
      if (!u || u.faction !== this.playerFaction) return
      this.selectedId = id
      this._calcMovable(id)
      this._calcAttackable(id)
    },

    deselect() {
      this.selectedId = null
      this.movableCells = []
      this.attackableCells = []
    },

    // ── 이동 ────────────────────────────────────────────────
    moveUnit(tx, ty) {
      const u = this.units.find(x => x.id === this.selectedId)
      if (!u || u.moved) return false
      if (!this.movableCells.some(c => c.x === tx && c.y === ty)) return false
      if (this.unitAt(tx, ty)) return false

      u.x = tx; u.y = ty; u.moved = true
      this._calcAttackable(u.id)
      this.movableCells = []
      this._log(`▶ ${u.name} → (${tx}, ${ty})`)
      return true
    },

    // ── 공격 ────────────────────────────────────────────────
    attackUnit(targetId) {
      const atk = this.units.find(x => x.id === this.selectedId)
      if (!atk || atk.attacked) return false
      const tgt = this.units.find(u => u.id === targetId)
      if (!tgt || tgt.faction === this.playerFaction) return false
      if (!this.attackableCells.some(c => c.x === tgt.x && c.y === tgt.y)) {
        this._log('사거리 밖입니다.'); return false
      }
      this._combat(atk.id, tgt.id)
      const stillSelected = this.units.find(u => u.id === this.selectedId)
      if (stillSelected) {
        stillSelected.attacked = true
        this._calcAttackable(stillSelected.id)
      }
      this.attackableCells = []
      this._checkVictory()
      return true
    },

    // ── 진형 변경 ────────────────────────────────────────────
    changeFormation(unitId, formId) {
      const u = this.units.find(x => x.id === unitId)
      if (!u || u.faction !== this.playerFaction || !FORMATIONS[formId]) return
      const prev = u.formation
      u.formation = formId
      if (u.id === this.selectedId) {
        this._calcMovable(u.id)
        this._calcAttackable(u.id)
      }
      this._log(`${u.name}: ${FORMATIONS[prev].name} → ${FORMATIONS[formId].name}`)
    },

    // ── 턴 종료 ──────────────────────────────────────────────
    endPlayerTurn() {
      if (this.phase !== 'player') return
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
      const aiIds = this.units
        .filter(u => u.faction !== this.playerFaction)
        .map(u => u.id)

      for (const aid of aiIds) {
        if (this.phase === 'result') break

        const enemy = this.units.find(u => u.id === aid)
        if (!enemy) continue

        const targets = this.units.filter(u => u.faction === this.playerFaction)
        if (!targets.length) break

        // 20% 확률 진형 변경
        if (Math.random() < 0.2) {
          const fmKeys = Object.keys(FORMATIONS)
          enemy.formation = fmKeys[Math.floor(Math.random() * fmKeys.length)]
        }

        const f        = fm(enemy.formation)
        const tile     = this.tileAt(enemy.x, enemy.y)
        const range    = Math.max(1, f.range + (TERRAIN[tile.terrain]?.rangeMod || 0))
        const speed    = f.speed
        const nearest  = targets.reduce((a, b) => manhattan(enemy, a) <= manhattan(enemy, b) ? a : b)
        const dist     = manhattan(enemy, nearest)

        if (dist <= range) {
          this._combat(enemy.id, nearest.id)
        } else {
          // 최단거리 이동
          const steps = Math.min(speed, dist - 1)
          const dx    = Math.sign(nearest.x - enemy.x)
          const dy    = Math.sign(nearest.y - enemy.y)
          const absDx = Math.abs(nearest.x - enemy.x)
          const absDy = Math.abs(nearest.y - enemy.y)

          const dirs = absDx >= absDy
            ? [{ x:dx, y:0 }, { x:0, y:dy }, { x:dx, y:dy }]
            : [{ x:0, y:dy }, { x:dx, y:0 }, { x:dx, y:dy }]

          for (const dir of dirs) {
            if (!dir.x && !dir.y) continue
            const nx = Math.max(0, Math.min(MAP_W - 1, enemy.x + dir.x * steps))
            const ny = Math.max(0, Math.min(MAP_H - 1, enemy.y + dir.y * steps))
            const t  = this.tileAt(nx, ny)
            if (TERRAIN[t.terrain]?.passable === false) continue
            if (this.unitAt(nx, ny)) continue
            enemy.x = nx; enemy.y = ny
            break
          }

          // 이동 후 사거리 재확인
          const freshNearest = this.units.find(u => u.id === nearest.id)
          if (freshNearest && manhattan(enemy, freshNearest) <= range) {
            this._combat(enemy.id, freshNearest.id)
          }
        }
      }

      this._checkVictory()

      if (this.phase !== 'result') {
        this.units.forEach(u => {
          if (u.faction !== this.playerFaction) { u.moved = false; u.attacked = false }
        })
        this.turn++
        this.phase = 'player'
        this._log(`── ${this.turn}턴 플레이어 페이즈 ──`)
      }
    },

    // ── 전투 해결 ────────────────────────────────────────────
    _combat(atkId, defId) {
      const atk = this.units.find(u => u.id === atkId)
      const def = this.units.find(u => u.id === defId)
      if (!atk || !def) return

      const atkFm    = fm(atk.formation)
      const defFm    = fm(def.formation)
      const atkChar  = CHARACTERS?.[atk.commander]
      const defChar  = CHARACTERS?.[def.commander]
      const atkStatB = atkChar ? (0.7 + (atkChar.statCmd ?? 50) / 100 * 0.6) : 1.0
      const defStatB = defChar ? (0.7 + (defChar.statCmd ?? 50) / 100 * 0.6) : 1.0
      const atkTerr  = TERRAIN[this.tileAt(atk.x, atk.y).terrain]?.offMod ?? 1.0
      const defTerr  = TERRAIN[this.tileAt(def.x, def.y).terrain]?.defMod ?? 1.0

      // 공격: 아군 함선 15% 기준, 적 방어로 일부 상쇄
      const dmg     = Math.max(100, Math.floor(
        atk.ships * atkFm.offMod * atkStatB * atkTerr * rand(0.85, 1.15) * 0.15
        - def.ships * defFm.defMod * defStatB * defTerr * 0.04
      ))
      // 반격: 방어측 6% 수준
      const counter = Math.max(50, Math.floor(
        def.ships * defFm.defMod * defStatB * defTerr * rand(0.85, 1.15) * 0.06
      ))

      def.ships  = Math.max(0, def.ships  - dmg)
      atk.ships  = Math.max(0, atk.ships  - counter)
      def.morale = Math.max(0, def.morale - Math.floor(dmg     / Math.max(1, def.maxShips) * 50))
      atk.morale = Math.max(0, atk.morale - Math.floor(counter / Math.max(1, atk.maxShips) * 25))

      const atkLabel = atkChar?.name || atk.name
      this._log(`${atkLabel} [${FORMATIONS[atk.formation].name}] → ${def.name}: -${dmg.toLocaleString()}척 / 반격 -${counter.toLocaleString()}척`)

      // 격파 / 사기 붕괴
      if (def.ships <= 0 || def.morale <= 10) {
        this._log(`💥 ${def.name} 격파!`)
        this.units = this.units.filter(u => u.id !== def.id)
      }
      if (atk.ships <= 0 || atk.morale <= 10) {
        this._log(`💥 ${atk.name} 격파!`)
        this.units = this.units.filter(u => u.id !== atk.id)
        if (this.selectedId === atk.id) this.selectedId = null
      }
    },

    // ── 승리 판정 ────────────────────────────────────────────
    _checkVictory() {
      const pUnits = this.units.filter(u => u.faction === this.playerFaction)
      const eUnits = this.units.filter(u => u.faction !== this.playerFaction)

      const initAtk  = this.context?.attackerFleets?.reduce((a, f) => a + f.ships, 0) ?? 1
      const initDef  = this.context?.defenderFleets?.reduce((a, f) => a + f.ships, 0) ?? 1
      const remAtk   = pUnits.reduce((a, u) => a + u.ships, 0)
      const remDef   = eUnits.reduce((a, u) => a + u.ships, 0)

      if (eUnits.length === 0) {
        this.result = { winner: this.playerFaction, attackerLosses: initAtk - remAtk, defenderLosses: initDef }
        this.phase  = 'result'
        this._log(`🏆 승리! 적 함대 전멸`)
      } else if (pUnits.length === 0) {
        this.result = { winner: eUnits[0].faction, attackerLosses: initAtk, defenderLosses: initDef - remDef }
        this.phase  = 'result'
        this._log(`💀 패배`)
      }
    },

    // ── 하이라이트 계산 ──────────────────────────────────────
    _calcMovable(uid) {
      const u = this.units.find(x => x.id === uid)
      if (!u || u.moved) { this.movableCells = []; return }
      const speed = fm(u.formation).speed
      const cells = []
      for (let y = 0; y < MAP_H; y++) {
        for (let x = 0; x < MAP_W; x++) {
          const d = manhattan(u, { x, y })
          if (d === 0 || d > speed) continue
          const tile = this.tileAt(x, y)
          if (TERRAIN[tile.terrain]?.passable === false) continue
          if (this.unitAt(x, y)) continue
          cells.push({ x, y })
        }
      }
      this.movableCells = cells
    },

    _calcAttackable(uid) {
      const u = this.units.find(x => x.id === uid)
      if (!u) { this.attackableCells = []; return }
      const f     = fm(u.formation)
      const tile  = this.tileAt(u.x, u.y)
      const range = Math.max(1, f.range + (TERRAIN[tile.terrain]?.rangeMod || 0))
      this.attackableCells = this.units
        .filter(e => e.faction !== this.playerFaction && manhattan(u, e) <= range)
        .map(e => ({ x: e.x, y: e.y }))
    },

    _log(msg) {
      this.logs.unshift(msg)
      if (this.logs.length > 200) this.logs.pop()
    },
  },
})
