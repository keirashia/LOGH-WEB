import { TACTICAL_MAP_DATA } from '@/data/base/stars/maps/tacticalMapData'
import { FORMATION_DATA } from '@/data/base/fleet/formationData'

// ── 맵 상수 ──────────────────────────────────────────────────
export const MAP_W    = 40    // 기본 맵 너비 (타일)
export const MAP_H    = 24    // 기본 맵 높이 (타일)
export const TILE_PX  = 32    // 타일당 픽셀 크기

// terrain 래스터라이즈용 스케일 (1000×1000 → 타일좌표)
const COORD_SPACE = 1000

// ── 진형 데이터 ──────────────────────────────────────────────
// formationData.js(FORMATION_DATA 배열) → 키맵으로 변환
// offMod/defMod/rangeMod/speedMod/encBonus 전술 수치 추가
const FORMATION_STATS = {
  FF_01: { offMod:0.85, defMod:1.40, rangeMod:0,  speedMod:0.8, encBonus:0.0  },
  FF_02: { offMod:1.20, defMod:0.80, rangeMod:1,  speedMod:1.0, encBonus:0.0  },
  FF_03: { offMod:1.10, defMod:0.75, rangeMod:0,  speedMod:1.3, encBonus:0.0  },
  FF_04: { offMod:1.10, defMod:0.90, rangeMod:1,  speedMod:0.9, encBonus:0.15 },
  FF_05: { offMod:1.00, defMod:0.85, rangeMod:0,  speedMod:0.9, encBonus:0.25 },
  FF_06: { offMod:1.40, defMod:0.70, rangeMod:0,  speedMod:1.1, encBonus:0.0  },
  FF_07: { offMod:0.80, defMod:1.50, rangeMod:-1, speedMod:0.9, encBonus:0.0  },
  FF_08: { offMod:1.30, defMod:0.65, rangeMod:0,  speedMod:1.2, encBonus:0.0  },
  FF_09: { offMod:0.95, defMod:0.90, rangeMod:0,  speedMod:1.4, encBonus:0.05 },
  FF_10: { offMod:0.90, defMod:1.30, rangeMod:0,  speedMod:0.85,encBonus:0.0  },
}

export const FORMATIONS = Object.fromEntries(
  FORMATION_DATA.map(fd => [
    fd.ffCode,
    {
      id:       fd.ffCode,
      ffType:   fd.ffType,
      name:     fd.ffName,
      weight:   fd.weight,
      ...FORMATION_STATS[fd.ffCode],
    }
  ])
)

// ── 진형별 BU_0~7 오프셋 [dx, dy] ────────────────────────────
// BU_0 기준 상대 좌표. 방어측(우→좌 진입)은 x 반전하여 사용.
export const FORMATION_OFFSETS = {
  FF_01: [[0,0],[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[1,-1],[0,-2]],
  FF_02: [[0,0],[-1,0],[1,0],[-2,0],[2,0],[-3,0],[3,0],[-4,0]],
  FF_03: [[0,0],[0,-1],[0,1],[0,-2],[0,2],[0,-3],[0,3],[0,-4]],
  FF_04: [[0,0],[-1,1],[1,1],[-2,2],[2,2],[-1,0],[1,0],[0,1]],
  FF_05: [[0,0],[-2,0],[2,0],[0,-2],[0,2],[-1,-1],[1,-1],[0,1]],
  FF_06: [[0,0],[0,-1],[-1,1],[1,1],[-2,2],[2,2],[0,2],[0,3]],
  FF_07: [[0,0],[-1,0],[1,0],[0,-1],[0,1],[-1,1],[1,1],[0,2]],
  FF_08: [[0,0],[-1,0],[1,0],[-2,0],[2,0],[0,-1],[0,-2],[0,-3]],
  FF_09: [[0,0],[-2,0],[2,0],[0,-2],[0,2],[-1,1],[1,1],[0,-1]],
  FF_10: [[0,0],[-1,0],[1,0],[0,1],[0,-1],[-1,1],[1,1],[0,2]],
}

// ── 지형 정의 ────────────────────────────────────────────────
export const TERRAIN = {
  SPACE:    { id:'SPACE',    name:'우주',     color:'#06090f', passable:true,  offMod:1.0, defMod:1.0, rangeMod: 0, moveMod:1.0 },
  NEBULA:   { id:'NEBULA',   name:'성운',     color:'#0f0820', passable:true,  offMod:0.8, defMod:0.9, rangeMod:-1, moveMod:0.8 },
  ASTEROID: { id:'ASTEROID', name:'소행성대', color:'#1c1c18', passable:true,  offMod:1.0, defMod:1.2, rangeMod: 0, moveMod:0.6 },
  PLANET:   { id:'PLANET',   name:'행성',     color:'#1a0800', passable:false, offMod:0,   defMod:0,   rangeMod: 0, moveMod:0.0 },
}

// ── 작전 목표 정의 ───────────────────────────────────────────
export const OPERATION_OBJECTIVES = [
  {
    code: 'OBJ_ANNIHILATE',
    name: '섬멸',
    desc: '적 함대를 완전히 전멸시킨다.',
    sides: ['attacker', 'defender'],
  },
  {
    code: 'OBJ_SUPPRESS',
    name: '제압',
    desc: '적 전력을 절반 이하로 격감시켜 전의를 꺾는다.',
    sides: ['attacker', 'defender'],
  },
  {
    code: 'OBJ_CAPTURE',
    name: '거점 확보',
    desc: '성계를 점령하고 아군 거점으로 삼는다.',
    sides: ['attacker'],
  },
  {
    code: 'OBJ_DELAY',
    name: '지연',
    desc: '적의 진격을 저지하며 시간을 번다.',
    sides: ['defender'],
  },
  {
    code: 'OBJ_RETREAT',
    name: '퇴각',
    desc: '아군 피해를 최소화하며 전선에서 이탈한다.',
    sides: ['attacker', 'defender'],
  },
]

export const OBJ_MAP = Object.fromEntries(OPERATION_OBJECTIVES.map(o => [o.code, o]))

// ── terrain 래스터라이즈 ──────────────────────────────────────
// STAR_MAP.tactical.terrain(1000×1000 좌표)을 타일 배열로 변환
function setTile(grid, x, y, w, h, typeId) {
  if (x < 0 || x >= w || y < 0 || y >= h) return
  grid[y * w + x] = typeId
}

const TYPE_ID = { planet:3, asteroid:1, nebula:2, debris:1 }
const TYPE_KEY = [null, 'ASTEROID', 'NEBULA', 'PLANET']

export function rasterizeTerrain(terrainObjects, tileW, tileH) {
  const grid = new Uint8Array(tileW * tileH)   // 0=SPACE
  const scaleX = COORD_SPACE / tileW
  const scaleY = COORD_SPACE / tileH
  for (const obj of terrainObjects) {
    const tid = TYPE_ID[obj.type] ?? 0
    if (!tid) continue
    if (obj.type === 'planet') {
      const tx = Math.round(obj.x / scaleX)
      const ty = Math.round(obj.y / scaleY)
      const trx = Math.ceil((obj.r ?? obj.size ?? 20) / scaleX)
      const try_ = Math.ceil((obj.r ?? obj.size ?? 20) / scaleY)
      for (let dy = -try_; dy <= try_; dy++)
        for (let dx = -trx; dx <= trx; dx++)
          if (dx*dx/(trx*trx) + dy*dy/(try_*try_) <= 1)
            setTile(grid, tx+dx, ty+dy, tileW, tileH, tid)
    } else {
      const x0 = Math.floor(obj.x / scaleX)
      const y0 = Math.floor(obj.y / scaleY)
      const x1 = Math.ceil((obj.x + (obj.w ?? 0)) / scaleX)
      const y1 = Math.ceil((obj.y + (obj.h ?? 0)) / scaleY)
      for (let ty = y0; ty < y1; ty++)
        for (let tx = x0; tx < x1; tx++)
          setTile(grid, tx, ty, tileW, tileH, tid)
    }
  }
  return grid
}

// ── 기본 맵 지형 ─────────────────────────────────────────────
const DEFAULT_NEBULA_OBJ    = [{ type:'nebula',   x:200, y:125, w:300, h:187 }]
const DEFAULT_ASTEROID_OBJ  = [
  { type:'asteroid', x:100, y:50,  w:75, h:50  },
  { type:'asteroid', x:800, y:50,  w:75, h:50  },
  { type:'asteroid', x:75,  y:375, w:50, h:42  },
  { type:'asteroid', x:50,  y:792, w:75, h:50  },
  { type:'asteroid', x:800, y:792, w:75, h:50  },
]

// ── buildTacticalMap ──────────────────────────────────────────
export function buildTacticalMap(locationId = null) {
  const mapDef = locationId ? TACTICAL_MAP_DATA[locationId] : null
  const [w, h] = mapDef?.mapSize ?? [MAP_W, MAP_H]

  const terrainObjs = mapDef?.terrain
    ? mapDef.terrain
    : [...DEFAULT_NEBULA_OBJ, ...DEFAULT_ASTEROID_OBJ]

  const raster = rasterizeTerrain(terrainObjs, w, h)

  const tiles = []
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const tid = raster[y * w + x]
      tiles.push({ x, y, terrain: TYPE_KEY[tid] ?? 'SPACE' })
    }
  }
  return { width: w, height: h, tiles }
}
