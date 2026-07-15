// 아레스하임 (ARESHYUM) — 성계 세부맵
// code: 230004 | mapSize: 1000x1000

export const STAR_MAP = {
  id:      'ARESHYUM',
  code:    '230004',
  name: [
    { code: "Kr", context: "아레스하임" },
    { code: "En", context: "ARESHYUM" },
  ],
  mapSize: [1000, 1000],
  nebulae: [
    { x:610, y:535, r:157, color:'rgba(20,60,80,', alpha:0.1 },
  ],
  planets: [
    { name: [{ code: "Kr", context: "탄므즈" }], main:true, type:'terrestrial', fortress:null, x:500, y:500, size:42 },
  ],
};
