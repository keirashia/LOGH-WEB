// 잠시드 (JAMSID) — 성계 세부맵
// code: 230023 | mapSize: 1000x1000

export const STAR_MAP = {
  id:      'JAMSID',
  code:    '230023',
  nameKr:  '잠시드',
  nameEn:  'JAMSID',
  mapSize: [1000, 1000],
  nebulae: [
    { x:350, y:485, r:249, color:'rgba(80,40,20,', alpha:0.15 },
  ],
  planets: [
    { nameKr:'다프테 잠시드', nameEn:'', main:true, type:'terrestrial', fortress:null, x:518, y:695, size:42 },
    { nameKr:'카퍼', nameEn:'', main:false, type:'terrestrial', fortress:null, x:481, y:304, size:29 },
  ],
};
