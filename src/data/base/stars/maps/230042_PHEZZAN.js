// 페잔 (PHEZZAN) — 성계 세부맵
// code: 230042 | mapSize: 1000x1000

export const STAR_MAP = {
  id:      'PHEZZAN',
  code:    '230042',
  name: [
    { code: "Kr", context: "페잔" },
    { code: "En", context: "PHEZZAN" },
  ],
  mapSize: [1000, 1000],
  nebulae: [
    { x:839, y:803, r:167, color:'rgba(20,60,80,', alpha:0.1 },
  ],
  planets: [
    { name: [{ code: "Kr", context: "페잔" }], main:true, type:'capital', fortress:null, x:500, y:500, size:55 },
  ],
};
