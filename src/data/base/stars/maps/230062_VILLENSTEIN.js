// 빌렌슈타인 (VILLENSTEIN) — 성계 세부맵
// code: 230062 | mapSize: 1000x1000

export const STAR_MAP = {
  id:      'VILLENSTEIN',
  code:    '230062',
  name: [
    { code: "Kr", context: "빌렌슈타인" },
    { code: "En", context: "VILLENSTEIN" },
  ],
  mapSize: [1000, 1000],
  nebulae: [
    { x:815, y:285, r:261, color:'rgba(41,60,120,', alpha:0.18 },
  ],
  planets: [
    { name: [{ code: "Kr", context: "레오폴트슈타트" }], main:true, type:'terrestrial', fortress:null, x:352, y:629, size:42 },
    { name: [{ code: "Kr", context: "그라츠" }], main:false, type:'terrestrial', fortress:null, x:647, y:370, size:30 },
  ],
};
