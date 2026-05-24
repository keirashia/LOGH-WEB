import { defineStore } from 'pinia'
import { TACTICAL_MAP, TACTICAL_UNITS } from '@/data/tacticalData'

function makeSampleMap() {
  const w = 12, h = 8
  const tiles = []
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      tiles.push({ x, y, terrain: (x + y) % 6 === 0 ? 'mountain' : (x + y) % 5 === 0 ? 'water' : 'plain' })
    }
  }
  return { width: w, height: h, tiles }
}

function terrainCost(terrain, unit) {
  switch (terrain) {
    case 'water': return unit && unit.type === 'naval' ? 1 : 99
    case 'mountain': return 2
    default: return 1
  }
}

export const useTacticalStore = defineStore('tactical', {
  state: () => ({
    map: TACTICAL_MAP || makeSampleMap(),
    units: TACTICAL_UNITS || [
      { id: 'u1', name: 'Imperial Squadron', faction: 'EMPIRE', x: 2, y: 3, hp: 100, moves: 3, attack: 30, defense: 10, type: 'space' },
      { id: 'u2', name: 'Alliance Fleet', faction: 'ALLIANCE', x: 9, y: 4, hp: 90, moves: 3, attack: 28, defense: 12, type: 'space' },
    ],
    selectedUnit: null,
    turn: 'EMPIRE',
    logs: [],
  }),

  getters: {
    unitById: (s) => (id) => s.units.find(u => u.id === id),
    unitsByFaction: (s) => (f) => s.units.filter(u => u.faction === f),
    tilesGrid: (s) => s.map.tiles,
  },

  actions: {
    loadMap(mapObj) {
      this.map = mapObj
    },
    selectUnit(id) {
      const u = this.units.find(x => x.id === id)
      if (u) this.selectedUnit = id
      else this.selectedUnit = null
    },
    moveSelectedTo(tx, ty) {
      if (!this.selectedUnit) return false
      const u = this.units.find(x => x.id === this.selectedUnit)
      if (!u) return false
      const tile = this.map.tiles.find(t => t.x === tx && t.y === ty)
      if (!tile) { this.logs.push('범위를 벗어났습니다.'); return false }

      // movement cost is Manhattan distance but accounting for terrain cost on destination
      const dist = Math.abs(u.x - tx) + Math.abs(u.y - ty)
      const moveCost = dist * terrainCost(tile.terrain, u)
      if (moveCost > u.moves) { this.logs.push(`이동 불가: 범위 초과 (${moveCost} > ${u.moves})`); return false }
      if (tile.terrain === 'water' && u.type !== 'naval') { this.logs.push('이동 불가: 물(해역)'); return false }
      u.x = tx; u.y = ty
      u.moves = Math.max(0, u.moves - moveCost)
      this.logs.push(`${u.name} 이동 → (${tx},${ty}) (소모: ${moveCost})`)
      return true
    },
    moveSelectedBy(dx, dy){
      if(!this.selectedUnit) return false
      const u = this.units.find(x=>x.id===this.selectedUnit)
      if(!u) return false
      const tx = u.x + dx, ty = u.y + dy
      return this.moveSelectedTo(tx, ty)
    },
    attack(targetId) {
      if (!this.selectedUnit) return false
      const attacker = this.units.find(x => x.id === this.selectedUnit)
      const target = this.units.find(x => x.id === targetId)
      if (!attacker || !target) return false
      const dist = Math.abs(attacker.x - target.x) + Math.abs(attacker.y - target.y)
      if (dist > 1) { this.logs.push('사거리 밖입니다.'); return false }

      // simple combat formula: base = attack - defense + rand
      const variance = Math.floor(Math.random() * 11) - 5 // -5..+5
      let dmg = Math.max(5, attacker.attack - target.defense + variance)
      target.hp = Math.max(0, target.hp - dmg)
      this.logs.push(`${attacker.name} → ${target.name} : -${dmg} HP`)
      if (target.hp === 0) {
        this.units = this.units.filter(u => u.id !== targetId)
        this.logs.push(`${target.name} 격파!`)
      }
      return true
    },
    endTurn() {
      this.turn = this.turn === 'EMPIRE' ? 'ALLIANCE' : 'EMPIRE'
      this.logs.push(`턴 전환: ${this.turn}`)
      // refresh moves
      this.units.forEach(u => u.moves = 3)
    },
  }
})
