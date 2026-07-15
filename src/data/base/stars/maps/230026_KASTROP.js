// 카스트로프 (KASTROP) — 성계 세부맵
// code: 230026 | mapSize: 1000x1000

export const STAR_MAP = {
  id:      'KASTROP',
  code:    '230026',
  name: [
    { code: "Kr", context: "카스트로프" },
    { code: "En", context: "KASTROP" },
  ],
  mapSize: [1000, 1000],
  nebulae: [
    { x:753, y:856, r:153, color:'rgba(41,60,120,', alpha:0.13 },
    { x:754, y:637, r:203, color:'rgba(20,80,60,', alpha:0.12 },
  ],
  planets: [
    { name: [{ code: "Kr", context: "케니히그라흐" }], main:true, type:'terrestrial', fortress:null, x:340, y:614, size:42 },
    { name: [{ code: "Kr", context: "라파트" }], main:false, type:'terrestrial', fortress:null, x:659, y:385, size:26 },
  ],
};
