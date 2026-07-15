// 마르바흐 (MARBACH) — 성계 세부맵
// code: 230038 | mapSize: 1000x1000

export const STAR_MAP = {
  id:      'MARBACH',
  code:    '230038',
  name: [
    { code: "Kr", context: "마르바흐" },
    { code: "En", context: "MARBACH" },
  ],
  mapSize: [1000, 1000],
  nebulae: [
    { x:533, y:820, r:262, color:'rgba(41,60,120,', alpha:0.14 },
  ],
  planets: [
    { name: [{ code: "Kr", context: "민덴" }], main:true, type:'terrestrial', fortress:null, x:500, y:500, size:42 },
  ],
};
