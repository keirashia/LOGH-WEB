// 카스트로프 (KASTROP) — 성계 세부맵
// code: 230026 | mapSize: 1000x1000

export const STAR_MAP = {
  id:      'KASTROP',
  code:    '230026',
  nameKr:  '카스트로프',
  nameEn:  'KASTROP',
  mapSize: [1000, 1000],
  nebulae: [
    { x:753, y:856, r:153, color:'rgba(41,60,120,', alpha:0.13 },
    { x:754, y:637, r:203, color:'rgba(20,80,60,', alpha:0.12 },
  ],
  planets: [
    { nameKr:'케니히그라흐', nameEn:'', main:true, type:'terrestrial', fortress:null, x:340, y:614, size:42 },
    { nameKr:'라파트', nameEn:'', main:false, type:'terrestrial', fortress:null, x:659, y:385, size:26 },
  ],
};
