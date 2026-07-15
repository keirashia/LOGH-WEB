// 바라트 (BAARAT) — 성계 세부맵
// code: 230006 | mapSize: 1000x1000

export const STAR_MAP = {
  id:      'BAARAT',
  code:    '230006',
  name: [
    { code: "Kr", context: "바라트" },
    { code: "En", context: "BAARAT" },
  ],
  mapSize: [1000, 1000],
  nebulae: [
    { x:242, y:372, r:246, color:'rgba(60,20,80,', alpha:0.17 },
  ],
  planets: [
    { name: [{ code: "Kr", context: "하이네센" }], main:true, type:'capital', fortress:null, x:527, y:775, size:55 },
    { name: [{ code: "Kr", context: "시뤼나갈" }], main:false, type:'terrestrial', fortress:null, x:255, y:376, size:25 },
    { name: [{ code: "Kr", context: "테르누젠" }], main:false, type:'terrestrial', fortress:null, x:724, y:318, size:32 },
  ],
};
