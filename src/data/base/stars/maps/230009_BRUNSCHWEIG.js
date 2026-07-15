// 브라운슈바이크 (BRUNSCHWEIG) — 성계 세부맵
// code: 230009 | mapSize: 1000x1000

export const STAR_MAP = {
  id:      'BRUNSCHWEIG',
  code:    '230009',
  name: [
    { code: "Kr", context: "브라운슈바이크" },
    { code: "En", context: "BRUNSCHWEIG" },
  ],
  mapSize: [1000, 1000],
  nebulae: [
    { x:854, y:194, r:249, color:'rgba(60,20,80,', alpha:0.14 },
  ],
  planets: [
    { name: [{ code: "Kr", context: "톤도르프" }], main:true, type:'terrestrial', fortress:null, x:674, y:588, size:42 },
    { name: [{ code: "Kr", context: "베스타란트" }], main:false, type:'terrestrial', fortress:null, x:325, y:411, size:24 },
  ],
};
