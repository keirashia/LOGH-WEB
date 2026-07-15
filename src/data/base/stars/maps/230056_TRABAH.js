// 트라바흐 (TRABAH) — 성계 세부맵
// code: 230056 | mapSize: 1000x1000

export const STAR_MAP = {
  id:      'TRABAH',
  code:    '230056',
  name: [
    { code: "Kr", context: "트라바흐" },
    { code: "En", context: "TRABAH" },
  ],
  mapSize: [1000, 1000],
  nebulae: [
    { x:515, y:551, r:214, color:'rgba(20,60,80,', alpha:0.14 },
    { x:285, y:485, r:267, color:'rgba(80,40,20,', alpha:0.13 },
  ],
  planets: [
    { name: [{ code: "Kr", context: "호포키르히" }], main:true, type:'terrestrial', fortress:null, x:368, y:645, size:42 },
    { name: [{ code: "Kr", context: "비텐베르크" }], main:false, type:'terrestrial', fortress:null, x:631, y:354, size:25 },
  ],
};
