// 알멘트푸벨 (ALMENTPUVEL) — 성계 세부맵
// code: 230001 | mapSize: 1000x1000

export const STAR_MAP = {
  id:      'ALMENTPUVEL',
  code:    '230001',
  name: [
    { code: "Kr", context: "알멘트푸벨" },
    { code: "En", context: "ALMENTPUVEL" },
  ],
  mapSize: [1000, 1000],
  nebulae: [
    { x:840, y:516, r:231, color:'rgba(20,60,80,', alpha:0.08 },
  ],
  planets: [
    { name: [{ code: "Kr", context: "바텐 도라흐" }], main:true, type:'terrestrial', fortress:null, x:500, y:500, size:42 },
  ],
};
