// 포레비트 (PHOREVIT) — 성계 세부맵
// code: 230043 | mapSize: 1000x1000

export const STAR_MAP = {
  id:      'PHOREVIT',
  code:    '230043',
  name: [
    { code: "Kr", context: "포레비트" },
    { code: "En", context: "PHOREVIT" },
  ],
  mapSize: [1000, 1000],
  nebulae: [
    { x:403, y:456, r:216, color:'rgba(20,60,80,', alpha:0.13 },
    { x:434, y:132, r:257, color:'rgba(20,80,60,', alpha:0.08 },
  ],
  planets: [
    { name: [{ code: "Kr", context: "루지아나" }], main:true, type:'terrestrial', fortress:null, x:500, y:500, size:42 },
  ],
};
