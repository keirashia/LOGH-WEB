// 아스타데 (ASTADE) — 성계 세부맵
// code: 230005

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
  tactical: {
    terrain: [
      // 행성 (1000×1000 좌표계, r = 반지름)
      { type:'planet', label:'아트라-하시스', x:398, y:228, r:42 },
      { type:'planet', label:'아스페륀',      x:758, y:544, r:25 },
      { type:'planet', label:'우가리트',      x:316, y:728, r:25 },
      // 성운 (nebulae 데이터 기반 bounding box)
      { type:'nebula', x:121, y:382, w:350, h:350 },
      // 소행성대 — 네 모서리 + 중앙 좌측
      { type:'asteroid', x:20,  y:60,  w:120, h:80  },
      { type:'asteroid', x:860, y:60,  w:120, h:80  },
      { type:'asteroid', x:75,  y:392, w:80,  h:60  },
      { type:'asteroid', x:20,  y:740, w:120, h:80  },
      { type:'asteroid', x:860, y:740, w:120, h:80  },
    ],
  },
};
