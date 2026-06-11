// 키포이져 (KIPOIZER) — 성계 세부맵
// code: 230028 | mapSize: 1000x1000

export const STAR_MAP = {
  id:      'KIPOIZER',
  code:    '230028',
  nameKr:  '키포이져',
  nameEn:  'KIPOIZER',
  mapSize: [1000, 1000],
  nebulae: [
    { x:660, y:532, r:192, color:'rgba(60,20,80,', alpha:0.17 },
    { x:458, y:434, r:215, color:'rgba(20,80,60,', alpha:0.13 },
  ],
  planets: [
    { nameKr:'가르미슈', nameEn:'', main:true, type:'terrestrial', fortress:null, x:555, y:215, size:42 },
    { nameKr:'스루즈헤임', nameEn:'', main:false, type:'terrestrial', fortress:null, x:725, y:689, size:31 },
    { nameKr:'가랴르호른', nameEn:'', main:false, type:'terrestrial', fortress:null, x:206, y:585, size:26 },
  ],
};
