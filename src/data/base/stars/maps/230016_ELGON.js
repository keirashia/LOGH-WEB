// 엘곤 (ELGON) — 성계 세부맵
// code: 230016 | mapSize: 1000x1000

export const STAR_MAP = {
  id:      'ELGON',
  code:    '230016',
  name: [
    { code: "Kr", context: "엘곤" },
    { code: "En", context: "ELGON" },
  ],
  mapSize: [1000, 1000],
  nebulae: [
    { x:626, y:281, r:179, color:'rgba(60,20,80,', alpha:0.18 },
    { x:623, y:692, r:260, color:'rgba(80,40,20,', alpha:0.16 },
  ],
  planets: [
    { name: [{ code: "Kr", context: "샴프르" }], main:true, type:'terrestrial', fortress:null, x:756, y:584, size:42 },
    { name: [{ code: "Kr", context: "보프 마나프" }], main:false, type:'terrestrial', fortress:null, x:284, y:675, size:22 },
    { name: [{ code: "Kr", context: "메헤라브" }], main:false, type:'terrestrial', fortress:null, x:455, y:259, size:25 },
  ],
};
