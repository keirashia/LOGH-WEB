// 시바 (SHIVA) — 성계 세부맵
// code: 230051 | mapSize: 1000x1000

export const STAR_MAP = {
  id:      'SHIVA',
  code:    '230051',
  nameKr:  '시바',
  nameEn:  'SHIVA',
  mapSize: [1000, 1000],
  nebulae: [
    { x:173, y:277, r:201, color:'rgba(80,40,20,', alpha:0.13 },
    { x:572, y:337, r:207, color:'rgba(80,40,20,', alpha:0.14 },
  ],
  planets: [
    { nameKr:'미트라', nameEn:'', main:true, type:'terrestrial', fortress:null, x:483, y:695, size:42 },
    { nameKr:'지비에', nameEn:'', main:false, type:'terrestrial', fortress:null, x:516, y:304, size:30 },
  ],
};
