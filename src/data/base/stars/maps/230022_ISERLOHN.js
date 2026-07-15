// 이제르론 (ISERLOHN) — 성계 세부맵
// code: 230022 | mapSize: 1000x1000

export const STAR_MAP = {
  id:      'ISERLOHN',
  code:    '230022',
  name: [
    { code: "Kr", context: "이제르론" },
    { code: "En", context: "ISERLOHN" },
  ],
  mapSize: [1000, 1000],
  nebulae: [
    { x:508, y:413, r:153, color:'rgba(80,40,20,', alpha:0.11 },
  ],
  planets: [
    { name: [{ code: "Kr", context: "이제르론" }], main:true, type:'fortress', fortress:'ISERLOHN', x:500, y:500, size:50 },
  ],
};
