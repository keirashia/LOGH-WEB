// 다곤 (DAGON) — 성계 세부맵
// code: 230010 | mapSize: 1000x1000

export const STAR_MAP = {
  id:      'DAGON',
  code:    '230010',
  name: [
    { code: "Kr", context: "다곤" },
    { code: "En", context: "DAGON" },
  ],
  mapSize: [1000, 1000],
  nebulae: [
    { x:234, y:427, r:272, color:'rgba(20,60,80,', alpha:0.17 },
    { x:312, y:170, r:211, color:'rgba(41,60,120,', alpha:0.09 },
  ],
  planets: [
    { name: [{ code: "Kr", context: "카프튜랑카" }], main:true, type:'terrestrial', fortress:null, x:500, y:500, size:42 },
  ],
};
