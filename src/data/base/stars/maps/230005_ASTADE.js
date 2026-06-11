// 아스타데 (ASTADE) — 성계 세부맵
// code: 230005 | mapSize: 1000x1000

export const STAR_MAP = {
  id:      'ASTADE',
  code:    '230005',
  nameKr:  '아스타데',
  nameEn:  'ASTADE',
  mapSize: [1000, 1000],
  nebulae: [
    { x:296, y:557, r:175, color:'rgba(20,80,60,', alpha:0.09 },
  ],
  planets: [
    { nameKr:'아트라 하시스', nameEn:'', main:true, type:'terrestrial', fortress:null, x:398, y:228, size:42 },
    { nameKr:'아스페륀', nameEn:'', main:false, type:'terrestrial', fortress:null, x:758, y:544, size:25 },
    { nameKr:'우가리트', nameEn:'', main:false, type:'terrestrial', fortress:null, x:316, y:728, size:25 },
  ],
};
