// 트리폴라 (TRIPOLA) — 성계 세부맵
// code: 230057 | mapSize: 1000x1000

export const STAR_MAP = {
  id:      'TRIPOLA',
  code:    '230057',
  name: [
    { code: "Kr", context: "트리폴라" },
    { code: "En", context: "TRIPOLA" },
  ],
  mapSize: [1000, 1000],
  nebulae: [
    { x:624, y:626, r:272, color:'rgba(41,60,120,', alpha:0.14 },
  ],
  planets: [
    { name: [{ code: "Kr", context: "팔머랜드" }], main:true, type:'terrestrial', fortress:null, x:500, y:500, size:42 },
  ],
};
