// 간다르바 (GANDHARVA) — 성계 세부맵
// code: 230020 | mapSize: 1000x1000

export const STAR_MAP = {
  id:      'GANDHARVA',
  code:    '230020',
  name: [
    { code: "Kr", context: "간다르바" },
    { code: "En", context: "GANDHARVA" },
  ],
  mapSize: [1000, 1000],
  nebulae: [
    { x:844, y:871, r:175, color:'rgba(20,80,60,', alpha:0.18 },
  ],
  planets: [
    { name: [{ code: "Kr", context: "우르바시" }], main:true, type:'terrestrial', fortress:null, x:319, y:686, size:42 },
    { name: [{ code: "Kr", context: "리시" }], main:false, type:'terrestrial', fortress:null, x:436, y:262, size:28 },
    { name: [{ code: "Kr", context: "푸르나바스" }], main:false, type:'terrestrial', fortress:null, x:790, y:586, size:23 },
  ],
};
