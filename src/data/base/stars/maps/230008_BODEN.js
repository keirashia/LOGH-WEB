// 보덴 (BODEN) — 성계 세부맵
// code: 230008 | mapSize: 1000x1000

export const STAR_MAP = {
  id:      'BODEN',
  code:    '230008',
  name: [
    { code: "Kr", context: "보덴" },
    { code: "En", context: "BODEN" },
  ],
  mapSize: [1000, 1000],
  nebulae: [
    { x:492, y:190, r:243, color:'rgba(80,40,20,', alpha:0.17 },
    { x:781, y:642, r:215, color:'rgba(20,60,80,', alpha:0.1 },
  ],
  planets: [
    { name: [{ code: "Kr", context: "보르소른" }], main:true, type:'terrestrial', fortress:null, x:467, y:785, size:42 },
    { name: [{ code: "Kr", context: "빌로스트" }], main:false, type:'terrestrial', fortress:null, x:265, y:349, size:26 },
    { name: [{ code: "Kr", context: "알비스" }], main:false, type:'terrestrial', fortress:null, x:728, y:376, size:24 },
  ],
};
