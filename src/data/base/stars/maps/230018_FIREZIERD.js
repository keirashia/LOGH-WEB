// 파이어져드 (FIREZIERD) — 성계 세부맵
// code: 230018 | mapSize: 1000x1000

export const STAR_MAP = {
  id:      'FIREZIERD',
  code:    '230018',
  name: [
    { code: "Kr", context: "파이어져드" },
    { code: "En", context: "FIREZIERD" },
  ],
  mapSize: [1000, 1000],
  nebulae: [
    { x:206, y:136, r:213, color:'rgba(80,40,20,', alpha:0.09 },
    { x:563, y:745, r:216, color:'rgba(20,60,80,', alpha:0.14 },
  ],
  planets: [
    { name: [{ code: "Kr", context: "우가리트" }], main:true, type:'terrestrial', fortress:null, x:357, y:634, size:42 },
    { name: [{ code: "Kr", context: "라트보트" }], main:false, type:'terrestrial', fortress:null, x:642, y:365, size:30 },
  ],
};
