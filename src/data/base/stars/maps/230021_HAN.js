// 하안 (HAN) — 성계 세부맵
// code: 230021 | mapSize: 1000x1000

export const STAR_MAP = {
  id:      'HAN',
  code:    '230021',
  name: [
    { code: "Kr", context: "하안" },
    { code: "En", context: "HAN" },
  ],
  mapSize: [1000, 1000],
  nebulae: [
    { x:487, y:723, r:211, color:'rgba(20,80,60,', alpha:0.09 },
  ],
  planets: [
    { name: [{ code: "Kr", context: "자르펠트" }], main:true, type:'terrestrial', fortress:null, x:500, y:500, size:42 },
  ],
};
