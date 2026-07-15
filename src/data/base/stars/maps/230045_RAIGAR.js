// 라이갈 (RAIGAR) — 성계 세부맵
// code: 230045 | mapSize: 1000x1000

export const STAR_MAP = {
  id:      'RAIGAR',
  code:    '230045',
  name: [
    { code: "Kr", context: "라이갈" },
    { code: "En", context: "RAIGAR" },
  ],
  mapSize: [1000, 1000],
  nebulae: [
    { x:497, y:164, r:193, color:'rgba(20,80,60,', alpha:0.13 },
  ],
  planets: [
    { name: [{ code: "Kr", context: "마그 토레드" }], main:true, type:'terrestrial', fortress:null, x:500, y:500, size:42 },
  ],
};
