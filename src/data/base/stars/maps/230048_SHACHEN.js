// 샤헨 (SHACHEN) — 성계 세부맵
// code: 230048 | mapSize: 1000x1000

export const STAR_MAP = {
  id:      'SHACHEN',
  code:    '230048',
  name: [
    { code: "Kr", context: "샤헨" },
    { code: "En", context: "SHACHEN" },
  ],
  mapSize: [1000, 1000],
  nebulae: [
    { x:485, y:893, r:186, color:'rgba(80,40,20,', alpha:0.17 },
    { x:460, y:185, r:276, color:'rgba(60,20,80,', alpha:0.09 },
  ],
  planets: [
    { name: [{ code: "Kr", context: "슈바르츠부르크" }], main:true, type:'terrestrial', fortress:null, x:500, y:500, size:42 },
  ],
};
