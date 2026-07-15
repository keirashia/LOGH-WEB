// 알테너 (ALTENER) — 성계 세부맵
// code: 230002 | mapSize: 1000x1000

export const STAR_MAP = {
  id:      'ALTENER',
  code:    '230002',
  name: [
    { code: "Kr", context: "알테너" },
    { code: "En", context: "ALTENER" },
  ],
  mapSize: [1000, 1000],
  nebulae: [
    { x:251, y:829, r:221, color:'rgba(80,40,20,', alpha:0.17 },
  ],
  planets: [
    { name: [{ code: "Kr", context: "가이에스부르크" }], main:true, type:'fortress', fortress:'GAISHBURG', x:317, y:572, size:50 },
    { name: [{ code: "Kr", context: "헷세 카셀" }], main:false, type:'terrestrial', fortress:null, x:682, y:427, size:30 },
  ],
};
