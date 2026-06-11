// 리텐하임 (LITTENHEIM) — 성계 세부맵
// code: 230032 | mapSize: 1000x1000

export const STAR_MAP = {
  id:      'LITTENHEIM',
  code:    '230032',
  nameKr:  '리텐하임',
  nameEn:  'LITTENHEIM',
  mapSize: [1000, 1000],
  nebulae: [
    { x:317, y:596, r:153, color:'rgba(20,80,60,', alpha:0.16 },
    { x:577, y:866, r:258, color:'rgba(41,60,120,', alpha:0.17 },
  ],
  planets: [
    { nameKr:'퀴스트린', nameEn:'', main:true, type:'terrestrial', fortress:null, x:694, y:521, size:42 },
    { nameKr:'에르뮐', nameEn:'', main:false, type:'terrestrial', fortress:null, x:305, y:478, size:22 },
  ],
};
