// 립슈타트 (LIPPSTADT) — 성계 세부맵
// code: 230031 | mapSize: 1000x1000

export const STAR_MAP = {
  id:      'LIPPSTADT',
  code:    '230031',
  name: [
    { code: "Kr", context: "립슈타트" },
    { code: "En", context: "LIPPSTADT" },
  ],
  mapSize: [1000, 1000],
  nebulae: [
    { x:818, y:821, r:191, color:'rgba(41,60,120,', alpha:0.17 },
  ],
  planets: [
    { name: [{ code: "Kr", context: "립슈타트" }], main:true, type:'terrestrial', fortress:null, x:500, y:500, size:42 },
  ],
};
