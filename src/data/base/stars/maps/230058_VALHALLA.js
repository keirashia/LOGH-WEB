// 발할라 (VALHALLA) — 성계 세부맵
// code: 230058 | mapSize: 1000x1000

export const STAR_MAP = {
  id:      'VALHALLA',
  code:    '230058',
  nameKr:  '발할라',
  nameEn:  'VALHALLA',
  mapSize: [1000, 1000],
  nebulae: [
    { x:589, y:852, r:230, color:'rgba(60,20,80,', alpha:0.14 },
    { x:566, y:247, r:156, color:'rgba(20,80,60,', alpha:0.14 },
  ],
  planets: [
    { nameKr:'오딘', nameEn:'', main:true, type:'capital', fortress:null, x:654, y:731, size:55 },
    { nameKr:'아스가르즈', nameEn:'', main:false, type:'terrestrial', fortress:null, x:258, y:550, size:24 },
    { nameKr:'유그드라실', nameEn:'', main:false, type:'terrestrial', fortress:null, x:592, y:215, size:31 },
  ],
};
