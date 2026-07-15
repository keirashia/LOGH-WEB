// 밴플리트 (VANFLEET) — 성계 세부맵
// code: 230060 | mapSize: 1000x1000

export const STAR_MAP = {
  id:      'VANFLEET',
  code:    '230060',
  name: [
    { code: "Kr", context: "밴플리트" },
    { code: "En", context: "VANFLEET" },
  ],
  mapSize: [1000, 1000],
  nebulae: [
    { x:196, y:443, r:219, color:'rgba(80,40,20,', alpha:0.12 },
  ],
  planets: [
    { name: [{ code: "Kr", context: "카토르브러" }], main:true, type:'terrestrial', fortress:null, x:500, y:500, size:42 },
  ],
};
