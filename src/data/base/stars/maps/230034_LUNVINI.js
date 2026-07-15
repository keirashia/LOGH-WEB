// 룬비니 (LUNVINI) — 성계 세부맵
// code: 230034 | mapSize: 1000x1000

export const STAR_MAP = {
  id:      'LUNVINI',
  code:    '230034',
  name: [
    { code: "Kr", context: "룬비니" },
    { code: "En", context: "LUNVINI" },
  ],
  mapSize: [1000, 1000],
  nebulae: [
    { x:748, y:436, r:219, color:'rgba(41,60,120,', alpha:0.14 },
  ],
  planets: [
    { name: [{ code: "Kr", context: "카스티리오네" }], main:true, type:'terrestrial', fortress:null, x:500, y:500, size:42 },
  ],
};
