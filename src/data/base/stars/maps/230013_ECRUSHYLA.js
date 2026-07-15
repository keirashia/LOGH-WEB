// 에뤼세라 (ECRUSHYLA) — 성계 세부맵
// code: 230013 | mapSize: 1000x1000

export const STAR_MAP = {
  id:      'ECRUSHYLA',
  code:    '230013',
  name: [
    { code: "Kr", context: "에뤼세라" },
    { code: "En", context: "ECRUSHYLA" },
  ],
  mapSize: [1000, 1000],
  nebulae: [
    { x:610, y:718, r:241, color:'rgba(60,20,80,', alpha:0.1 },
  ],
  planets: [
    { name: [{ code: "Kr", context: "악타이온" }], main:true, type:'terrestrial', fortress:null, x:500, y:500, size:42 },
  ],
};
