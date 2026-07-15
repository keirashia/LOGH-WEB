// 키포이져 (KIPOIZER) — 성계 세부맵
// code: 230028 | mapSize: 1000x1000

export const STAR_MAP = {
  id:      'KIPOIZER',
  code:    '230028',
  name: [
    { code: "Kr", context: "키포이져" },
    { code: "En", context: "KIPOIZER" },
  ],
  mapSize: [1000, 1000],
  nebulae: [
    { x:660, y:532, r:192, color:'rgba(60,20,80,', alpha:0.17 },
    { x:458, y:434, r:215, color:'rgba(20,80,60,', alpha:0.13 },
  ],
  planets: [
    { name: [{ code: "Kr", context: "가르미슈" }], main:true, type:'terrestrial', fortress:null, x:555, y:215, size:42 },
    { name: [{ code: "Kr", context: "스루즈헤임" }], main:false, type:'terrestrial', fortress:null, x:725, y:689, size:31 },
    { name: [{ code: "Kr", context: "가랴르호른" }], main:false, type:'terrestrial', fortress:null, x:206, y:585, size:26 },
  ],
};
