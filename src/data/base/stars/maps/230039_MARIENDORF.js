// 마린도르프 (MARIENDORF) — 성계 세부맵
// code: 230039 | mapSize: 1000x1000

export const STAR_MAP = {
  id:      'MARIENDORF',
  code:    '230039',
  name: [
    { code: "Kr", context: "마린도르프" },
    { code: "En", context: "MARIENDORF" },
  ],
  mapSize: [1000, 1000],
  nebulae: [
    { x:833, y:754, r:206, color:'rgba(80,40,20,', alpha:0.14 },
  ],
  planets: [
    { name: [{ code: "Kr", context: "테레젠슈타트" }], main:true, type:'terrestrial', fortress:null, x:500, y:500, size:42 },
  ],
};
