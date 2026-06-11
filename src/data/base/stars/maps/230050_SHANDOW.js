// 샨다우 (SHANDOW) — 성계 세부맵
// code: 230050 | mapSize: 1000x1000

export const STAR_MAP = {
  id:      'SHANDOW',
  code:    '230050',
  nameKr:  '샨다우',
  nameEn:  'SHANDOW',
  mapSize: [1000, 1000],
  nebulae: [
    { x:888, y:104, r:256, color:'rgba(41,60,120,', alpha:0.08 },
  ],
  planets: [
    { nameKr:'에스링그', nameEn:'', main:true, type:'terrestrial', fortress:null, x:734, y:427, size:42 },
    { nameKr:'크네스도르프', nameEn:'', main:false, type:'terrestrial', fortress:null, x:423, y:734, size:32 },
    { nameKr:'폰트노이', nameEn:'', main:false, type:'terrestrial', fortress:null, x:330, y:306, size:30 },
  ],
};
