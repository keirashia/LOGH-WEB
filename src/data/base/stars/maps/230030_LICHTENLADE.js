// 리히텐라데 (LICHTENLADE) — 성계 세부맵
// code: 230030 | mapSize: 1000x1000

export const STAR_MAP = {
  id:      'LICHTENLADE',
  code:    '230030',
  name: [
    { code: "Kr", context: "리히텐라데" },
    { code: "En", context: "LICHTENLADE" },
  ],
  mapSize: [1000, 1000],
  nebulae: [
    { x:245, y:584, r:246, color:'rgba(20,60,80,', alpha:0.1 },
    { x:375, y:176, r:280, color:'rgba(41,60,120,', alpha:0.09 },
  ],
  planets: [
    { name: [{ code: "Kr", context: "에르힌겐" }], main:true, type:'terrestrial', fortress:null, x:500, y:500, size:42 },
  ],
};
