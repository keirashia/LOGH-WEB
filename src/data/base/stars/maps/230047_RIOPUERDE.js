// 리오 베르데 (RIOPUERDE) — 성계 세부맵
// code: 230047 | mapSize: 1000x1000

export const STAR_MAP = {
  id:      'RIOPUERDE',
  code:    '230047',
  nameKr:  '리오 베르데',
  nameEn:  'RIOPUERDE',
  mapSize: [1000, 1000],
  nebulae: [
    { x:681, y:546, r:169, color:'rgba(20,80,60,', alpha:0.09 },
  ],
  planets: [
    { nameKr:'아로요 드 모리노', nameEn:'', main:true, type:'terrestrial', fortress:null, x:330, y:599, size:42 },
    { nameKr:'카시나', nameEn:'', main:false, type:'terrestrial', fortress:null, x:669, y:400, size:22 },
  ],
};
