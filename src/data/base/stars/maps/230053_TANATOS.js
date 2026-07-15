// 타나투스 (TANATOS) — 성계 세부맵
// code: 230053 | mapSize: 1000x1000

export const STAR_MAP = {
  id:      'TANATOS',
  code:    '230053',
  name: [
    { code: "Kr", context: "타나투스" },
    { code: "En", context: "TANATOS" },
  ],
  mapSize: [1000, 1000],
  nebulae: [
    { x:349, y:513, r:241, color:'rgba(41,60,120,', alpha:0.15 },
    { x:255, y:740, r:229, color:'rgba(60,20,80,', alpha:0.12 },
  ],
  planets: [
    { name: [{ code: "Kr", context: "에코니아" }], main:true, type:'terrestrial', fortress:null, x:526, y:694, size:42 },
    { name: [{ code: "Kr", context: "마스지드" }], main:false, type:'terrestrial', fortress:null, x:473, y:305, size:29 },
  ],
};
