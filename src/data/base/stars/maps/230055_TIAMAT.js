// 티아매트 (TIAMAT) — 성계 세부맵
// code: 230055 | mapSize: 1000x1000

export const STAR_MAP = {
  id:      'TIAMAT',
  code:    '230055',
  name: [
    { code: "Kr", context: "티아매트" },
    { code: "En", context: "TIAMAT" },
  ],
  mapSize: [1000, 1000],
  nebulae: [
    { x:569, y:369, r:174, color:'rgba(20,60,80,', alpha:0.1 },
    { x:900, y:367, r:203, color:'rgba(60,20,80,', alpha:0.09 },
  ],
  planets: [
    { name: [{ code: "Kr", context: "라므" }], main:true, type:'fortress', fortress:'TIAMAT', x:693, y:331, size:50 },
    { name: [{ code: "Kr", context: "안샤르" }], main:false, type:'terrestrial', fortress:null, x:563, y:764, size:29 },
    { name: [{ code: "Kr", context: "레그니처" }], main:false, type:'terrestrial', fortress:null, x:256, y:411, size:25 },
  ],
};
