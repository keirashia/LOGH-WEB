// 팔란티아 (PALANTIA) — 성계 세부맵
// code: 230041 | mapSize: 1000x1000

export const STAR_MAP = {
  id:      'PALANTIA',
  code:    '230041',
  name: [
    { code: "Kr", context: "팔란티아" },
    { code: "En", context: "PALANTIA" },
  ],
  mapSize: [1000, 1000],
  nebulae: [
    { x:654, y:172, r:219, color:'rgba(20,60,80,', alpha:0.14 },
  ],
  planets: [
    { name: [{ code: "Kr", context: "케르코포르타" }], main:true, type:'terrestrial', fortress:null, x:500, y:500, size:42 },
  ],
};
