// Sample tactical map and units for development
const width = 12, height = 8
const tiles = []
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const t = (x + y) % 7 === 0 ? 'mountain' : (x + y) % 5 === 0 ? 'water' : 'plain'
    tiles.push({ x, y, terrain: t })
  }
}

export const TACTICAL_MAP = { width, height, tiles }

export const TACTICAL_UNITS = [
  { id: 'u1', name: 'Imperial Squadron', faction: 'EMPIRE', x: 2, y: 3, hp: 100, moves: 3, attack: 30, defense: 10, type: 'space' },
  { id: 'u2', name: 'Alliance Fleet', faction: 'ALLIANCE', x: 9, y: 4, hp: 90, moves: 3, attack: 28, defense: 12, type: 'space' },
  { id: 'n1', name: 'Neutral Transport', faction: 'NEUTRAL', x:5, y:2, hp:50, moves:2, attack:5, defense:2, type:'naval' }
]

export default { TACTICAL_MAP, TACTICAL_UNITS }
