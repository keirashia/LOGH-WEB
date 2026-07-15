// 슈팔라 (SPAHLA) — 성계 세부맵
// code: 230052 | mapSize: 1000x1000

export const STAR_MAP = {
  id:      'SPAHLA',
  code:    '230052',
  name: [
    { code: "Kr", context: "슈팔라" },
    { code: "En", context: "SPAHLA" },
  ],
  mapSize: [1000, 1000],
  nebulae: [
    { x:601, y:761, r:200, color:'rgba(20,60,80,', alpha:0.14 },
    { x:381, y:219, r:178, color:'rgba(41,60,120,', alpha:0.1 },
  ],
  planets: [
    { name: [{ code: "Kr", context: "에레키슈갈" }], main:true, type:'terrestrial', fortress:null, x:500, y:500, size:42 },
  ],
};
