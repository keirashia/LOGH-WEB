// 포르겐 (PORGEN) — 성계 세부맵
// code: 230044 | mapSize: 1000x1000

export const STAR_MAP = {
  id:      'PORGEN',
  code:    '230044',
  name: [
    { code: "Kr", context: "포르겐" },
    { code: "En", context: "PORGEN" },
  ],
  mapSize: [1000, 1000],
  nebulae: [
    { x:491, y:722, r:174, color:'rgba(20,80,60,', alpha:0.09 },
  ],
  planets: [
    { name: [{ code: "Kr", context: "루지아나" }], main:true, type:'terrestrial', fortress:null, x:500, y:500, size:42 },
  ],
};
