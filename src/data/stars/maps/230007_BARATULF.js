// 바라투르프 (BARATULF) — 성계 세부맵
// code: 230007 | mapSize: 1000x1000

export const STAR_MAP = {
  id:      'BARATULF',
  code:    '230007',
  nameKr:  '바라투르프',
  nameEn:  'BARATULF',
  mapSize: [1000, 1000],
  nebulae: [
    { x:441, y:571, r:174, color:'rgba(20,80,60,', alpha:0.11 },
    { x:390, y:465, r:228, color:'rgba(20,80,60,', alpha:0.09 },
  ],
  planets: [
    { nameKr:'프르샤 스쿠타', nameEn:'', main:true, type:'terrestrial', fortress:null, x:500, y:500, size:42 },
  ],
};
