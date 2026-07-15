// 요툰하임 (JOTUNHEIM) — 성계 세부맵
// code: 230024 | mapSize: 1000x1000

export const STAR_MAP = {
  id:      'JOTUNHEIM',
  code:    '230024',
  name: [
    { code: "Kr", context: "요툰하임" },
    { code: "En", context: "JOTUNHEIM" },
  ],
  mapSize: [1000, 1000],
  nebulae: [
    { x:765, y:636, r:160, color:'rgba(20,60,80,', alpha:0.09 },
    { x:766, y:239, r:184, color:'rgba(20,60,80,', alpha:0.12 },
  ],
  planets: [
    { name: [{ code: "Kr", context: "로스바흐" }], main:true, type:'terrestrial', fortress:null, x:500, y:500, size:42 },
  ],
};
