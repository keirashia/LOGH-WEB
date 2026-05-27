// 바르텐베르크 (VANDENBERG) — 성계 세부맵
// code: 230059 | mapSize: 1000x1000

export const STAR_MAP = {
  id:      'VANDENBERG',
  code:    '230059',
  nameKr:  '바르텐베르크',
  nameEn:  'VANDENBERG',
  mapSize: [1000, 1000],
  nebulae: [
    { x:471, y:641, r:272, color:'rgba(41,60,120,', alpha:0.15 },
  ],
  planets: [
    { nameKr:'브렌하임', nameEn:'', main:true, type:'terrestrial', fortress:null, x:429, y:682, size:42 },
    { nameKr:'카르슈타트', nameEn:'', main:false, type:'terrestrial', fortress:null, x:570, y:317, size:31 },
  ],
};
