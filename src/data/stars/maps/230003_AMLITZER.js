// 암릿처 (AMLITZER) — 성계 세부맵
// code: 230003 | mapSize: 1000x1000

export const STAR_MAP = {
  id:      'AMLITZER',
  code:    '230003',
  nameKr:  '암릿처',
  nameEn:  'AMLITZER',
  mapSize: [1000, 1000],
  nebulae: [
    { x:876, y:346, r:206, color:'rgba(80,40,20,', alpha:0.13 },
  ],
  planets: [
    { nameKr:'클라잉겔트', nameEn:'', main:true, type:'terrestrial', fortress:null, x:787, y:376, size:42 },
    { nameKr:'도벨그', nameEn:'', main:false, type:'terrestrial', fortress:null, x:480, y:755, size:26 },
    { nameKr:'모르겐', nameEn:'', main:false, type:'terrestrial', fortress:null, x:241, y:318, size:32 },
  ],
};
