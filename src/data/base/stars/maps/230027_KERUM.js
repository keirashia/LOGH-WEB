// 케륨 (KERUM) — 성계 세부맵
// code: 230027 | mapSize: 1000x1000

export const STAR_MAP = {
  id:      'KERUM',
  code:    '230027',
  name: [
    { code: "Kr", context: "케륨" },
    { code: "En", context: "KERUM" },
  ],
  mapSize: [1000, 1000],
  nebulae: [
    { x:245, y:239, r:239, color:'rgba(60,20,80,', alpha:0.15 },
  ],
  planets: [
    { name: [{ code: "Kr", context: "네프티스" }], main:true, type:'terrestrial', fortress:null, x:375, y:651, size:42 },
    { name: [{ code: "Kr", context: "이제크온" }], main:false, type:'terrestrial', fortress:null, x:624, y:348, size:23 },
  ],
};
