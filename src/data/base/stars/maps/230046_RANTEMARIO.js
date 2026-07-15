// 란테마리오 (RANTEMARIO) — 성계 세부맵
// code: 230046 | mapSize: 1000x1000

export const STAR_MAP = {
  id:      'RANTEMARIO',
  code:    '230046',
  name: [
    { code: "Kr", context: "란테마리오" },
    { code: "En", context: "RANTEMARIO" },
  ],
  mapSize: [1000, 1000],
  nebulae: [
    { x:179, y:291, r:155, color:'rgba(80,40,20,', alpha:0.1 },
  ],
  planets: [
    { name: [{ code: "Kr", context: "라티고스트" }], main:true, type:'terrestrial', fortress:null, x:282, y:616, size:42 },
    { name: [{ code: "Kr", context: "스벤트비트" }], main:false, type:'terrestrial', fortress:null, x:505, y:199, size:28 },
    { name: [{ code: "Kr", context: "야로비트" }], main:false, type:'terrestrial', fortress:null, x:745, y:623, size:22 },
  ],
};
