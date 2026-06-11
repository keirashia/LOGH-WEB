// 타시리 (TASIRI) — 성계 세부맵
// code: 230054 | mapSize: 1000x1000

export const STAR_MAP = {
  id:      'TASIRI',
  code:    '230054',
  nameKr:  '타시리',
  nameEn:  'TASIRI',
  mapSize: [1000, 1000],
  nebulae: [
    { x:213, y:769, r:188, color:'rgba(20,60,80,', alpha:0.12 },
    { x:496, y:526, r:243, color:'rgba(80,40,20,', alpha:0.09 },
  ],
  planets: [
    { nameKr:'파라스', nameEn:'', main:true, type:'terrestrial', fortress:null, x:500, y:500, size:42 },
  ],
};
