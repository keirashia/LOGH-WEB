// 아이젠헤르츠 (EISENHERZ) — 성계 세부맵
// code: 230014 | mapSize: 1000x1000

export const STAR_MAP = {
  id:      'EISENHERZ',
  code:    '230014',
  name: [
    { code: "Kr", context: "아이젠헤르츠" },
    { code: "En", context: "EISENHERZ" },
  ],
  mapSize: [1000, 1000],
  nebulae: [
    { x:749, y:146, r:176, color:'rgba(20,80,60,', alpha:0.16 },
    { x:101, y:282, r:211, color:'rgba(80,40,20,', alpha:0.1 },
  ],
  planets: [
    { name: [{ code: "Kr", context: "베스트파리아" }], main:true, type:'terrestrial', fortress:null, x:506, y:695, size:42 },
    { name: [{ code: "Kr", context: "디사우" }], main:false, type:'terrestrial', fortress:null, x:493, y:304, size:29 },
  ],
};
