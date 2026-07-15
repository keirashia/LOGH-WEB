// 노이에란트 (NEUE_LAND) — 성계 세부맵
// code: 230040 | mapSize: 1000x1000

export const STAR_MAP = {
  id:      'NEUE_LAND',
  code:    '230040',
  name: [
    { code: "Kr", context: "노이에란트" },
    { code: "En", context: "NEUE_LAND" },
  ],
  mapSize: [1000, 1000],
  nebulae: [
    { x:832, y:330, r:215, color:'rgba(20,80,60,', alpha:0.17 },
    { x:711, y:229, r:165, color:'rgba(20,60,80,', alpha:0.12 },
  ],
  planets: [
    { name: [{ code: "Kr", context: "노이에란트" }], main:true, type:'terrestrial', fortress:null, x:500, y:500, size:42 },
  ],
};
