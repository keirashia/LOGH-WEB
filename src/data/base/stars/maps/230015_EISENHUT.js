// 아이젠후트 (EISENHUT) — 성계 세부맵
// code: 230015 | mapSize: 1000x1000

export const STAR_MAP = {
  id:      'EISENHUT',
  code:    '230015',
  name: [
    { code: "Kr", context: "아이젠후트" },
    { code: "En", context: "EISENHUT" },
  ],
  mapSize: [1000, 1000],
  nebulae: [
    { x:394, y:623, r:267, color:'rgba(20,80,60,', alpha:0.15 },
    { x:156, y:739, r:242, color:'rgba(20,60,80,', alpha:0.14 },
  ],
  planets: [
    { name: [{ code: "Kr", context: "다룸슈타트" }], main:true, type:'terrestrial', fortress:null, x:500, y:500, size:42 },
  ],
};
