// 간다르바 (GANDHARVA) — 성계 세부맵
// code: 230020 | mapSize: 1000x1000

export const STAR_MAP = {
  id:      'GANDHARVA',
  code:    '230020',
  nameKr:  '간다르바',
  nameEn:  'GANDHARVA',
  mapSize: [1000, 1000],
  nebulae: [
    { x:844, y:871, r:175, color:'rgba(20,80,60,', alpha:0.18 },
  ],
  planets: [
    { nameKr:'우르바시', nameEn:'', main:true, type:'terrestrial', fortress:null, x:319, y:686, size:42 },
    { nameKr:'리시', nameEn:'', main:false, type:'terrestrial', fortress:null, x:436, y:262, size:28 },
    { nameKr:'푸르나바스', nameEn:'', main:false, type:'terrestrial', fortress:null, x:790, y:586, size:23 },
  ],
};
