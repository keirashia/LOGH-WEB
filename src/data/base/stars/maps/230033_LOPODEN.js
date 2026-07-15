// 로포덴 (LOPODEN) — 성계 세부맵
// code: 230033 | mapSize: 1000x1000

export const STAR_MAP = {
  id:      'LOPODEN',
  code:    '230033',
  name: [
    { code: "Kr", context: "로포덴" },
    { code: "En", context: "LOPODEN" },
  ],
  mapSize: [1000, 1000],
  nebulae: [
    { x:818, y:722, r:178, color:'rgba(41,60,120,', alpha:0.09 },
    { x:120, y:547, r:269, color:'rgba(20,80,60,', alpha:0.13 },
  ],
  planets: [
    { name: [{ code: "Kr", context: "키베론" }], main:true, type:'terrestrial', fortress:null, x:482, y:695, size:42 },
    { name: [{ code: "Kr", context: "루드밀라" }], main:false, type:'terrestrial', fortress:null, x:517, y:304, size:30 },
  ],
};
