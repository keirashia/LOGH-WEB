// 뤼카스 성역 (LUYKAS_FPA) — 성계 세부맵
// code: 230036 | mapSize: 1000x1000

export const STAR_MAP = {
  id:      'LUYKAS_FPA',
  code:    '230036',
  name: [
    { code: "Kr", context: "뤼카스 성역" },
    { code: "En", context: "LUYKAS_FPA" },
  ],
  mapSize: [1000, 1000],
  nebulae: [
    { x:571, y:663, r:238, color:'rgba(60,20,80,', alpha:0.12 },
    { x:724, y:447, r:278, color:'rgba(60,20,80,', alpha:0.1 },
  ],
  planets: [
    { name: [{ code: "Kr", context: "비트리아" }], main:true, type:'terrestrial', fortress:null, x:500, y:500, size:42 },
  ],
};
