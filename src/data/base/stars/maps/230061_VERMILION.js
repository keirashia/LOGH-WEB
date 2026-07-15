// 버밀리온 (VERMILION) — 성계 세부맵
// code: 230061 | mapSize: 1000x1000

export const STAR_MAP = {
  id:      'VERMILION',
  code:    '230061',
  name: [
    { code: "Kr", context: "버밀리온" },
    { code: "En", context: "VERMILION" },
  ],
  mapSize: [1000, 1000],
  nebulae: [
    { x:308, y:485, r:224, color:'rgba(80,40,20,', alpha:0.12 },
  ],
  planets: [
    { name: [{ code: "Kr", context: "몽마라유" }], main:true, type:'terrestrial', fortress:null, x:500, y:500, size:42 },
  ],
};
