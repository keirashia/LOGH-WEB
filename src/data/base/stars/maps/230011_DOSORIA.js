// 도리아 (DOSORIA) — 성계 세부맵
// code: 230011 | mapSize: 1000x1000

export const STAR_MAP = {
  id:      'DOSORIA',
  code:    '230011',
  name: [
    { code: "Kr", context: "도리아" },
    { code: "En", context: "DOSORIA" },
  ],
  mapSize: [1000, 1000],
  nebulae: [
    { x:248, y:619, r:156, color:'rgba(80,40,20,', alpha:0.13 },
    { x:572, y:373, r:191, color:'rgba(20,80,60,', alpha:0.16 },
  ],
  planets: [
    { name: [{ code: "Kr", context: "델모퓌라이" }], main:true, type:'terrestrial', fortress:null, x:635, y:641, size:42 },
    { name: [{ code: "Kr", context: "보이오이아" }], main:false, type:'terrestrial', fortress:null, x:364, y:358, size:26 },
  ],
};
