// 원본 LOGH IV EX 전술전투 시스템 기반

export const FORMATIONS = {
  DOUBLE_COL:  { id:'DOUBLE_COL',  nameJp:'複縦陣', name:'복종진', icon:'⏸', offMod:1.0, defMod:1.0, range:1, speed:3, desc:'균형 잡힌 기본 진형' },
  DOUBLE_LINE: { id:'DOUBLE_LINE', nameJp:'複横陣', name:'복횡진', icon:'▬', offMod:0.9, defMod:1.2, range:2, speed:2, desc:'넓은 전선, 원거리 공격' },
  RING:        { id:'RING',        nameJp:'輪形陣', name:'윤형진', icon:'◎', offMod:0.8, defMod:1.5, range:1, speed:2, desc:'전방위 방어, 공격 저하' },
  WEDGE:       { id:'WEDGE',       nameJp:'楔形陣', name:'쐐기진', icon:'▲', offMod:1.4, defMod:0.7, range:1, speed:3, desc:'집중 돌파, 방어 취약' },
  CRANE_WING:  { id:'CRANE_WING',  nameJp:'鶴翼陣', name:'학익진', icon:'⌒', offMod:1.2, defMod:0.9, range:2, speed:2, desc:'포위 기동, 사거리 +1' },
  CONE:        { id:'CONE',        nameJp:'錐形陣', name:'추형진', icon:'▽', offMod:1.1, defMod:1.0, range:2, speed:3, desc:'돌파 후 원거리 지원' },
}

export const TERRAIN = {
  SPACE:    { id:'SPACE',    name:'우주',     color:'#06090f', passable:true,  offMod:1.0, defMod:1.0, rangeMod: 0 },
  NEBULA:   { id:'NEBULA',   name:'성운',     color:'#0f0820', passable:true,  offMod:0.8, defMod:0.9, rangeMod:-1 },
  ASTEROID: { id:'ASTEROID', name:'소행성대', color:'#1c1c18', passable:false, offMod:0,   defMod:0,   rangeMod: 0 },
}

export const MAP_W = 20
export const MAP_H = 12
export const CELL_SIZE = 48

// 성운 (중앙 회랑) - 원본 이젤론/아므리차 성역 이미지에서 착안
const NEBULA_SET = new Set([
  '8,3','9,3','10,3','11,3',
  '8,4','9,4','10,4','11,4',
  '8,5','9,5','10,5','11,5',
  '8,6','9,6','10,6',
  '9,7','10,7',
])

// 소행성대 (산발적 장애물)
const ASTEROID_SET = new Set([
  '4,2','15,2',
  '3,9','16,9',
  '6,5','13,6',
  '5,8','14,3',
])

export function buildTacticalMap() {
  const tiles = []
  for (let y = 0; y < MAP_H; y++) {
    for (let x = 0; x < MAP_W; x++) {
      const key = `${x},${y}`
      let terrain = 'SPACE'
      if (ASTEROID_SET.has(key))      terrain = 'ASTEROID'
      else if (NEBULA_SET.has(key))   terrain = 'NEBULA'
      tiles.push({ x, y, terrain })
    }
  }
  return { width: MAP_W, height: MAP_H, tiles }
}
