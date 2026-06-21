// 에크하르트 (ECKHART) — 성계 세부맵
// code: 230012 | mapSize: 1000x1000

export const STAR_MAP = {
  id:      'ECKHART',
  code:    '230012',
  nameKr:  '에크하르트',
  nameEn:  'ECKHART',
  mapSize: [1000, 1000],
  nebulae: [
    { x:155, y:789, r:269, color:'rgba(41,60,120,', alpha:0.1 },
    { x:505, y:808, r:198, color:'rgba(60,20,80,', alpha:0.15 },
  ],
  planets: [
    { nameKr:'자크스 코프르크', nameEn:'', main:true, type:'terrestrial', fortress:null, x:500, y:500, size:42 },
  ],
};
