// 뤼카스 (LUYKAS) — 성계 세부맵
// code: 230035 | mapSize: 1000x1000

export const STAR_MAP = {
  id:      'LUYKAS',
  code:    '230035',
  nameKr:  '뤼카스',
  nameEn:  'LUYKAS',
  mapSize: [1000, 1000],
  nebulae: [
    { x:263, y:735, r:167, color:'rgba(20,80,60,', alpha:0.15 },
    { x:723, y:619, r:273, color:'rgba(20,60,80,', alpha:0.1 },
  ],
  planets: [
    { nameKr:'비트리아', nameEn:'', main:true, type:'terrestrial', fortress:null, x:500, y:500, size:42 },
  ],
};
