// 잠시드 (JAMSID) — 성계 세부맵
// code: 230023 | mapSize: 1000x1000

export const STAR_MAP = {
  id:      'JAMSID',
  code:    '230023',
  name: [
    { code: "Kr", context: "잠시드" },
    { code: "En", context: "JAMSID" },
  ],
  mapSize: [1000, 1000],
  nebulae: [
    { x:350, y:485, r:249, color:'rgba(80,40,20,', alpha:0.15 },
  ],
  planets: [
    { name: [{ code: "Kr", context: "다프테 잠시드" }], main:true, type:'terrestrial', fortress:null, x:518, y:695, size:42 },
    { name: [{ code: "Kr", context: "카퍼" }], main:false, type:'terrestrial', fortress:null, x:481, y:304, size:29 },
  ],
};
