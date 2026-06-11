// 엘 파실 (ELPACIL) — 성계 세부맵
// code: 230017 | mapSize: 1000x1000

export const STAR_MAP = {
  id:      'ELPACIL',
  code:    '230017',
  nameKr:  '엘 파실',
  nameEn:  'ELPACIL',
  mapSize: [1000, 1000],
  nebulae: [
    { x:411, y:378, r:251, color:'rgba(20,60,80,', alpha:0.15 },
    { x:287, y:754, r:196, color:'rgba(41,60,120,', alpha:0.08 },
  ],
  planets: [
    { nameKr:'엘 파실', nameEn:'', main:true, type:'terrestrial', fortress:null, x:660, y:612, size:42 },
    { nameKr:'에스트레마도라', nameEn:'', main:false, type:'terrestrial', fortress:null, x:339, y:387, size:25 },
  ],
};
