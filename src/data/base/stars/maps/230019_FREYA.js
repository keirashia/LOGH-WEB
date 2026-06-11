// 프레이아 (FREYA) — 성계 세부맵
// code: 230019 | mapSize: 1000x1000

export const STAR_MAP = {
  id:      'FREYA',
  code:    '230019',
  nameKr:  '프레이아',
  nameEn:  'FREYA',
  mapSize: [1000, 1000],
  nebulae: [
    { x:258, y:794, r:163, color:'rgba(41,60,120,', alpha:0.15 },
    { x:152, y:862, r:157, color:'rgba(60,20,80,', alpha:0.18 },
  ],
  planets: [
    { nameKr:'렌텐베르크', nameEn:'', main:true, type:'terrestrial', fortress:null, x:677, y:582, size:42 },
    { nameKr:'니플헤임', nameEn:'', main:false, type:'terrestrial', fortress:null, x:322, y:417, size:24 },
  ],
};
