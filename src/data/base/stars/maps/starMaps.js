// ================================================================
//  starMaps.js — 성계 세부맵 데이터
//  경로: src/data/stars/maps/starMaps.js
//  mapSize: 1000x1000 통일
//  행성 배치: 원형 균등 배치 (seed = code 기반, 항상 동일)
//  bgStars/nebulae: seed 기반 고정 배경
// ================================================================

export const STAR_MAPS = [
  {
    id:      'ALMENTPUVEL',
    code:    '230001',
    name: [
      { code: "Kr", context: "알멘트푸벨" },
      { code: "En", context: "ALMENTPUVEL" },
    ],
    mapSize: [1000, 1000],
    nebulae: [{ x:840, y:516, r:231, color:'rgba(20,60,80,', alpha:0.08 }],
    planets: [
      { name: [{ code: "Kr", context: "바텐 도라흐" }], main:true, type:'terrestrial', fortress:null, x:500, y:500, size:42 }
    ],
  },
  {
    id:      'ALTENER',
    code:    '230002',
    name: [
      { code: "Kr", context: "알테너" },
      { code: "En", context: "ALTENER" },
    ],
    mapSize: [1000, 1000],
    nebulae: [{ x:251, y:829, r:221, color:'rgba(80,40,20,', alpha:0.17 }],
    planets: [
      { name: [{ code: "Kr", context: "가이에스부르크" }], main:true, type:'fortress', fortress:'GAISHBURG', x:317, y:572, size:50 },
      { name: [{ code: "Kr", context: "헷세 카셀" }], main:false, type:'terrestrial', fortress:null, x:682, y:427, size:30 }
    ],
  },
  {
    id:      'AMLITZER',
    code:    '230003',
    name: [
      { code: "Kr", context: "암릿처" },
      { code: "En", context: "AMLITZER" },
    ],
    mapSize: [1000, 1000],
    nebulae: [{ x:876, y:346, r:206, color:'rgba(80,40,20,', alpha:0.13 }],
    planets: [
      { name: [{ code: "Kr", context: "클라잉겔트" }], main:true, type:'terrestrial', fortress:null, x:787, y:376, size:42 },
      { name: [{ code: "Kr", context: "도벨그" }], main:false, type:'terrestrial', fortress:null, x:480, y:755, size:26 },
      { name: [{ code: "Kr", context: "모르겐" }], main:false, type:'terrestrial', fortress:null, x:241, y:318, size:32 }
    ],
  },
  {
    id:      'ARESHYUM',
    code:    '230004',
    name: [
      { code: "Kr", context: "아레스하임" },
      { code: "En", context: "ARESHYUM" },
    ],
    mapSize: [1000, 1000],
    nebulae: [{ x:610, y:535, r:157, color:'rgba(20,60,80,', alpha:0.1 }],
    planets: [
      { name: [{ code: "Kr", context: "탄므즈" }], main:true, type:'terrestrial', fortress:null, x:500, y:500, size:42 }
    ],
  },
  {
    id:      'ASTADE',
    code:    '230005',
    name: [
      { code: "Kr", context: "아스타데" },
      { code: "En", context: "ASTADE" },
    ],
    mapSize: [1000, 1000],
    nebulae: [{ x:296, y:557, r:175, color:'rgba(20,80,60,', alpha:0.09 }],
    planets: [
      { name: [{ code: "Kr", context: "아트라 하시스" }], main:true, type:'terrestrial', fortress:null, x:398, y:228, size:42 },
      { name: [{ code: "Kr", context: "아스페륀" }], main:false, type:'terrestrial', fortress:null, x:758, y:544, size:25 },
      { name: [{ code: "Kr", context: "우가리트" }], main:false, type:'terrestrial', fortress:null, x:316, y:728, size:25 }
    ],
  },
  {
    id:      'BAARAT',
    code:    '230006',
    name: [
      { code: "Kr", context: "바라트" },
      { code: "En", context: "BAARAT" },
    ],
    mapSize: [1000, 1000],
    nebulae: [{ x:242, y:372, r:246, color:'rgba(60,20,80,', alpha:0.17 }],
    planets: [
      { name: [{ code: "Kr", context: "하이네센" }], main:true, type:'capital', fortress:null, x:527, y:775, size:55 },
      { name: [{ code: "Kr", context: "시뤼나갈" }], main:false, type:'terrestrial', fortress:null, x:255, y:376, size:25 },
      { name: [{ code: "Kr", context: "테르누젠" }], main:false, type:'terrestrial', fortress:null, x:724, y:318, size:32 }
    ],
  },
  {
    id:      'BARATULF',
    code:    '230007',
    name: [
      { code: "Kr", context: "바라투르프" },
      { code: "En", context: "BARATULF" },
    ],
    mapSize: [1000, 1000],
    nebulae: [{ x:441, y:571, r:174, color:'rgba(20,80,60,', alpha:0.11 }, { x:390, y:465, r:228, color:'rgba(20,80,60,', alpha:0.09 }],
    planets: [
      { name: [{ code: "Kr", context: "프르샤 스쿠타" }], main:true, type:'terrestrial', fortress:null, x:500, y:500, size:42 }
    ],
  },
  {
    id:      'BODEN',
    code:    '230008',
    name: [
      { code: "Kr", context: "보덴" },
      { code: "En", context: "BODEN" },
    ],
    mapSize: [1000, 1000],
    nebulae: [{ x:492, y:190, r:243, color:'rgba(80,40,20,', alpha:0.17 }, { x:781, y:642, r:215, color:'rgba(20,60,80,', alpha:0.1 }],
    planets: [
      { name: [{ code: "Kr", context: "보르소른" }], main:true, type:'terrestrial', fortress:null, x:467, y:785, size:42 },
      { name: [{ code: "Kr", context: "빌로스트" }], main:false, type:'terrestrial', fortress:null, x:265, y:349, size:26 },
      { name: [{ code: "Kr", context: "알비스" }], main:false, type:'terrestrial', fortress:null, x:728, y:376, size:24 }
    ],
  },
  {
    id:      'BRUNSCHWEIG',
    code:    '230009',
    name: [
      { code: "Kr", context: "브라운슈바이크" },
      { code: "En", context: "BRUNSCHWEIG" },
    ],
    mapSize: [1000, 1000],
    nebulae: [{ x:854, y:194, r:249, color:'rgba(60,20,80,', alpha:0.14 }],
    planets: [
      { name: [{ code: "Kr", context: "톤도르프" }], main:true, type:'terrestrial', fortress:null, x:674, y:588, size:42 },
      { name: [{ code: "Kr", context: "베스타란트" }], main:false, type:'terrestrial', fortress:null, x:325, y:411, size:24 }
    ],
  },
  {
    id:      'DAGON',
    code:    '230010',
    name: [
      { code: "Kr", context: "다곤" },
      { code: "En", context: "DAGON" },
    ],
    mapSize: [1000, 1000],
    nebulae: [{ x:234, y:427, r:272, color:'rgba(20,60,80,', alpha:0.17 }, { x:312, y:170, r:211, color:'rgba(41,60,120,', alpha:0.09 }],
    planets: [
      { name: [{ code: "Kr", context: "카프튜랑카" }], main:true, type:'terrestrial', fortress:null, x:500, y:500, size:42 }
    ],
  },
  {
    id:      'DOSORIA',
    code:    '230011',
    name: [
      { code: "Kr", context: "도리아" },
      { code: "En", context: "DOSORIA" },
    ],
    mapSize: [1000, 1000],
    nebulae: [{ x:248, y:619, r:156, color:'rgba(80,40,20,', alpha:0.13 }, { x:572, y:373, r:191, color:'rgba(20,80,60,', alpha:0.16 }],
    planets: [
      { name: [{ code: "Kr", context: "델모퓌라이" }], main:true, type:'terrestrial', fortress:null, x:635, y:641, size:42 },
      { name: [{ code: "Kr", context: "보이오이아" }], main:false, type:'terrestrial', fortress:null, x:364, y:358, size:26 }
    ],
  },
  {
    id:      'ECKHART',
    code:    '230012',
    name: [
      { code: "Kr", context: "에크하르트" },
      { code: "En", context: "ECKHART" },
    ],
    mapSize: [1000, 1000],
    nebulae: [{ x:155, y:789, r:269, color:'rgba(41,60,120,', alpha:0.1 }, { x:505, y:808, r:198, color:'rgba(60,20,80,', alpha:0.15 }],
    planets: [
      { name: [{ code: "Kr", context: "자크스 코프르크" }], main:true, type:'terrestrial', fortress:null, x:500, y:500, size:42 }
    ],
  },
  {
    id:      'ECRUSHYLA',
    code:    '230013',
    name: [
      { code: "Kr", context: "에뤼세라" },
      { code: "En", context: "ECRUSHYLA" },
    ],
    mapSize: [1000, 1000],
    nebulae: [{ x:610, y:718, r:241, color:'rgba(60,20,80,', alpha:0.1 }],
    planets: [
      { name: [{ code: "Kr", context: "악타이온" }], main:true, type:'terrestrial', fortress:null, x:500, y:500, size:42 }
    ],
  },
  {
    id:      'EISENHERZ',
    code:    '230014',
    name: [
      { code: "Kr", context: "아이젠헤르츠" },
      { code: "En", context: "EISENHERZ" },
    ],
    mapSize: [1000, 1000],
    nebulae: [{ x:749, y:146, r:176, color:'rgba(20,80,60,', alpha:0.16 }, { x:101, y:282, r:211, color:'rgba(80,40,20,', alpha:0.1 }],
    planets: [
      { name: [{ code: "Kr", context: "베스트파리아" }], main:true, type:'terrestrial', fortress:null, x:506, y:695, size:42 },
      { name: [{ code: "Kr", context: "디사우" }], main:false, type:'terrestrial', fortress:null, x:493, y:304, size:29 }
    ],
  },
  {
    id:      'EISENHUT',
    code:    '230015',
    name: [
      { code: "Kr", context: "아이젠후트" },
      { code: "En", context: "EISENHUT" },
    ],
    mapSize: [1000, 1000],
    nebulae: [{ x:394, y:623, r:267, color:'rgba(20,80,60,', alpha:0.15 }, { x:156, y:739, r:242, color:'rgba(20,60,80,', alpha:0.14 }],
    planets: [
      { name: [{ code: "Kr", context: "다룸슈타트" }], main:true, type:'terrestrial', fortress:null, x:500, y:500, size:42 }
    ],
  },
  {
    id:      'ELGON',
    code:    '230016',
    name: [
      { code: "Kr", context: "엘곤" },
      { code: "En", context: "ELGON" },
    ],
    mapSize: [1000, 1000],
    nebulae: [{ x:626, y:281, r:179, color:'rgba(60,20,80,', alpha:0.18 }, { x:623, y:692, r:260, color:'rgba(80,40,20,', alpha:0.16 }],
    planets: [
      { name: [{ code: "Kr", context: "샴프르" }], main:true, type:'terrestrial', fortress:null, x:756, y:584, size:42 },
      { name: [{ code: "Kr", context: "보프 마나프" }], main:false, type:'terrestrial', fortress:null, x:284, y:675, size:22 },
      { name: [{ code: "Kr", context: "메헤라브" }], main:false, type:'terrestrial', fortress:null, x:455, y:259, size:25 }
    ],
  },
  {
    id:      'ELPACIL',
    code:    '230017',
    name: [
      { code: "Kr", context: "엘 파실" },
      { code: "En", context: "ELPACIL" },
    ],
    mapSize: [1000, 1000],
    nebulae: [{ x:411, y:378, r:251, color:'rgba(20,60,80,', alpha:0.15 }, { x:287, y:754, r:196, color:'rgba(41,60,120,', alpha:0.08 }],
    planets: [
      { name: [{ code: "Kr", context: "엘 파실" }], main:true, type:'terrestrial', fortress:null, x:660, y:612, size:42 },
      { name: [{ code: "Kr", context: "에스트레마도라" }], main:false, type:'terrestrial', fortress:null, x:339, y:387, size:25 }
    ],
  },
  {
    id:      'FIREZIERD',
    code:    '230018',
    name: [
      { code: "Kr", context: "파이어져드" },
      { code: "En", context: "FIREZIERD" },
    ],
    mapSize: [1000, 1000],
    nebulae: [{ x:206, y:136, r:213, color:'rgba(80,40,20,', alpha:0.09 }, { x:563, y:745, r:216, color:'rgba(20,60,80,', alpha:0.14 }],
    planets: [
      { name: [{ code: "Kr", context: "우가리트" }], main:true, type:'terrestrial', fortress:null, x:357, y:634, size:42 },
      { name: [{ code: "Kr", context: "라트보트" }], main:false, type:'terrestrial', fortress:null, x:642, y:365, size:30 }
    ],
  },
  {
    id:      'FREYA',
    code:    '230019',
    name: [
      { code: "Kr", context: "프레이아" },
      { code: "En", context: "FREYA" },
    ],
    mapSize: [1000, 1000],
    nebulae: [{ x:258, y:794, r:163, color:'rgba(41,60,120,', alpha:0.15 }, { x:152, y:862, r:157, color:'rgba(60,20,80,', alpha:0.18 }],
    planets: [
      { name: [{ code: "Kr", context: "렌텐베르크" }], main:true, type:'terrestrial', fortress:null, x:677, y:582, size:42 },
      { name: [{ code: "Kr", context: "니플헤임" }], main:false, type:'terrestrial', fortress:null, x:322, y:417, size:24 }
    ],
  },
  {
    id:      'GANDHARVA',
    code:    '230020',
    name: [
      { code: "Kr", context: "간다르바" },
      { code: "En", context: "GANDHARVA" },
    ],
    mapSize: [1000, 1000],
    nebulae: [{ x:844, y:871, r:175, color:'rgba(20,80,60,', alpha:0.18 }],
    planets: [
      { name: [{ code: "Kr", context: "우르바시" }], main:true, type:'terrestrial', fortress:null, x:319, y:686, size:42 },
      { name: [{ code: "Kr", context: "리시" }], main:false, type:'terrestrial', fortress:null, x:436, y:262, size:28 },
      { name: [{ code: "Kr", context: "푸르나바스" }], main:false, type:'terrestrial', fortress:null, x:790, y:586, size:23 }
    ],
  },
  {
    id:      'HAN',
    code:    '230021',
    name: [
      { code: "Kr", context: "하안" },
      { code: "En", context: "HAN" },
    ],
    mapSize: [1000, 1000],
    nebulae: [{ x:487, y:723, r:211, color:'rgba(20,80,60,', alpha:0.09 }],
    planets: [
      { name: [{ code: "Kr", context: "자르펠트" }], main:true, type:'terrestrial', fortress:null, x:500, y:500, size:42 }
    ],
  },
  {
    id:      'ISERLOHN',
    code:    '230022',
    name: [
      { code: "Kr", context: "이제르론" },
      { code: "En", context: "ISERLOHN" },
    ],
    mapSize: [1000, 1000],
    nebulae: [{ x:508, y:413, r:153, color:'rgba(80,40,20,', alpha:0.11 }],
    planets: [
      { name: [{ code: "Kr", context: "이제르론" }], main:true, type:'fortress', fortress:'ISERLOHN', x:500, y:500, size:50 }
    ],
  },
  {
    id:      'JAMSID',
    code:    '230023',
    name: [
      { code: "Kr", context: "잠시드" },
      { code: "En", context: "JAMSID" },
    ],
    mapSize: [1000, 1000],
    nebulae: [{ x:350, y:485, r:249, color:'rgba(80,40,20,', alpha:0.15 }],
    planets: [
      { name: [{ code: "Kr", context: "다프테 잠시드" }], main:true, type:'terrestrial', fortress:null, x:518, y:695, size:42 },
      { name: [{ code: "Kr", context: "카퍼" }], main:false, type:'terrestrial', fortress:null, x:481, y:304, size:29 }
    ],
  },
  {
    id:      'JOTUNHEIM',
    code:    '230024',
    name: [
      { code: "Kr", context: "요툰하임" },
      { code: "En", context: "JOTUNHEIM" },
    ],
    mapSize: [1000, 1000],
    nebulae: [{ x:765, y:636, r:160, color:'rgba(20,60,80,', alpha:0.09 }, { x:766, y:239, r:184, color:'rgba(20,60,80,', alpha:0.12 }],
    planets: [
      { name: [{ code: "Kr", context: "로스바흐" }], main:true, type:'terrestrial', fortress:null, x:500, y:500, size:42 }
    ],
  },
  {
    id:      'KAPCHE_LANKA',
    code:    '230025',
    name: [
      { code: "Kr", context: "카프체란카" },
      { code: "En", context: "KAPCHE_LANKA" },
    ],
    mapSize: [1000, 1000],
    nebulae: [{ x:398, y:122, r:248, color:'rgba(80,40,20,', alpha:0.1 }, { x:840, y:620, r:187, color:'rgba(80,40,20,', alpha:0.17 }],
    planets: [
      { name: [{ code: "Kr", context: "카프체란카" }], main:true, type:'terrestrial', fortress:null, x:500, y:500, size:42 }
    ],
  },
  {
    id:      'KASTROP',
    code:    '230026',
    name: [
      { code: "Kr", context: "카스트로프" },
      { code: "En", context: "KASTROP" },
    ],
    mapSize: [1000, 1000],
    nebulae: [{ x:753, y:856, r:153, color:'rgba(41,60,120,', alpha:0.13 }, { x:754, y:637, r:203, color:'rgba(20,80,60,', alpha:0.12 }],
    planets: [
      { name: [{ code: "Kr", context: "케니히그라흐" }], main:true, type:'terrestrial', fortress:null, x:340, y:614, size:42 },
      { name: [{ code: "Kr", context: "라파트" }], main:false, type:'terrestrial', fortress:null, x:659, y:385, size:26 }
    ],
  },
  {
    id:      'KERUM',
    code:    '230027',
    name: [
      { code: "Kr", context: "케륨" },
      { code: "En", context: "KERUM" },
    ],
    mapSize: [1000, 1000],
    nebulae: [{ x:245, y:239, r:239, color:'rgba(60,20,80,', alpha:0.15 }],
    planets: [
      { name: [{ code: "Kr", context: "네프티스" }], main:true, type:'terrestrial', fortress:null, x:375, y:651, size:42 },
      { name: [{ code: "Kr", context: "이제크온" }], main:false, type:'terrestrial', fortress:null, x:624, y:348, size:23 }
    ],
  },
  {
    id:      'KIPOIZER',
    code:    '230028',
    name: [
      { code: "Kr", context: "키포이져" },
      { code: "En", context: "KIPOIZER" },
    ],
    mapSize: [1000, 1000],
    nebulae: [{ x:660, y:532, r:192, color:'rgba(60,20,80,', alpha:0.17 }, { x:458, y:434, r:215, color:'rgba(20,80,60,', alpha:0.13 }],
    planets: [
      { name: [{ code: "Kr", context: "가르미슈" }], main:true, type:'terrestrial', fortress:null, x:555, y:215, size:42 },
      { name: [{ code: "Kr", context: "스루즈헤임" }], main:false, type:'terrestrial', fortress:null, x:725, y:689, size:31 },
      { name: [{ code: "Kr", context: "가랴르호른" }], main:false, type:'terrestrial', fortress:null, x:206, y:585, size:26 }
    ],
  },
  {
    id:      'LEGNICA',
    code:    '230029',
    name: [
      { code: "Kr", context: "레그니차" },
      { code: "En", context: "LEGNICA" },
    ],
    mapSize: [1000, 1000],
    nebulae: [{ x:562, y:335, r:174, color:'rgba(41,60,120,', alpha:0.15 }, { x:880, y:895, r:191, color:'rgba(80,40,20,', alpha:0.13 }],
    planets: [
      { name: [{ code: "Kr", context: "레그니처" }], main:true, type:'terrestrial', fortress:null, x:500, y:500, size:42 }
    ],
  },
  {
    id:      'LICHTENLADE',
    code:    '230030',
    name: [
      { code: "Kr", context: "리히텐라데" },
      { code: "En", context: "LICHTENLADE" },
    ],
    mapSize: [1000, 1000],
    nebulae: [{ x:245, y:584, r:246, color:'rgba(20,60,80,', alpha:0.1 }, { x:375, y:176, r:280, color:'rgba(41,60,120,', alpha:0.09 }],
    planets: [
      { name: [{ code: "Kr", context: "에르힌겐" }], main:true, type:'terrestrial', fortress:null, x:500, y:500, size:42 }
    ],
  },
  {
    id:      'LIPPSTADT',
    code:    '230031',
    name: [
      { code: "Kr", context: "립슈타트" },
      { code: "En", context: "LIPPSTADT" },
    ],
    mapSize: [1000, 1000],
    nebulae: [{ x:818, y:821, r:191, color:'rgba(41,60,120,', alpha:0.17 }],
    planets: [
      { name: [{ code: "Kr", context: "립슈타트" }], main:true, type:'terrestrial', fortress:null, x:500, y:500, size:42 }
    ],
  },
  {
    id:      'LITTENHEIM',
    code:    '230032',
    name: [
      { code: "Kr", context: "리텐하임" },
      { code: "En", context: "LITTENHEIM" },
    ],
    mapSize: [1000, 1000],
    nebulae: [{ x:317, y:596, r:153, color:'rgba(20,80,60,', alpha:0.16 }, { x:577, y:866, r:258, color:'rgba(41,60,120,', alpha:0.17 }],
    planets: [
      { name: [{ code: "Kr", context: "퀴스트린" }], main:true, type:'terrestrial', fortress:null, x:694, y:521, size:42 },
      { name: [{ code: "Kr", context: "에르뮐" }], main:false, type:'terrestrial', fortress:null, x:305, y:478, size:22 }
    ],
  },
  {
    id:      'LOPODEN',
    code:    '230033',
    name: [
      { code: "Kr", context: "로포덴" },
      { code: "En", context: "LOPODEN" },
    ],
    mapSize: [1000, 1000],
    nebulae: [{ x:818, y:722, r:178, color:'rgba(41,60,120,', alpha:0.09 }, { x:120, y:547, r:269, color:'rgba(20,80,60,', alpha:0.13 }],
    planets: [
      { name: [{ code: "Kr", context: "키베론" }], main:true, type:'terrestrial', fortress:null, x:482, y:695, size:42 },
      { name: [{ code: "Kr", context: "루드밀라" }], main:false, type:'terrestrial', fortress:null, x:517, y:304, size:30 }
    ],
  },
  {
    id:      'LUNVINI',
    code:    '230034',
    name: [
      { code: "Kr", context: "룬비니" },
      { code: "En", context: "LUNVINI" },
    ],
    mapSize: [1000, 1000],
    nebulae: [{ x:748, y:436, r:219, color:'rgba(41,60,120,', alpha:0.14 }],
    planets: [
      { name: [{ code: "Kr", context: "카스티리오네" }], main:true, type:'terrestrial', fortress:null, x:500, y:500, size:42 }
    ],
  },
  {
    id:      'LUYKAS',
    code:    '230035',
    name: [
      { code: "Kr", context: "뤼카스" },
      { code: "En", context: "LUYKAS" },
    ],
    mapSize: [1000, 1000],
    nebulae: [{ x:263, y:735, r:167, color:'rgba(20,80,60,', alpha:0.15 }, { x:723, y:619, r:273, color:'rgba(20,60,80,', alpha:0.1 }],
    planets: [
      { name: [{ code: "Kr", context: "비트리아" }], main:true, type:'terrestrial', fortress:null, x:500, y:500, size:42 }
    ],
  },
  {
    id:      'LUYKAS_FPA',
    code:    '230036',
    name: [
      { code: "Kr", context: "뤼카스 성역" },
      { code: "En", context: "LUYKAS_FPA" },
    ],
    mapSize: [1000, 1000],
    nebulae: [{ x:571, y:663, r:238, color:'rgba(60,20,80,', alpha:0.12 }, { x:724, y:447, r:278, color:'rgba(60,20,80,', alpha:0.1 }],
    planets: [
      { name: [{ code: "Kr", context: "비트리아" }], main:true, type:'terrestrial', fortress:null, x:500, y:500, size:42 }
    ],
  },
  {
    id:      'MARADEITA',
    code:    '230037',
    name: [
      { code: "Kr", context: "마르 아데타" },
      { code: "En", context: "MARADEITA" },
    ],
    mapSize: [1000, 1000],
    nebulae: [{ x:795, y:124, r:232, color:'rgba(41,60,120,', alpha:0.13 }],
    planets: [
      { name: [{ code: "Kr", context: "파프라비" }], main:true, type:'terrestrial', fortress:null, x:500, y:500, size:42 }
    ],
  },
  {
    id:      'MARBACH',
    code:    '230038',
    name: [
      { code: "Kr", context: "마르바흐" },
      { code: "En", context: "MARBACH" },
    ],
    mapSize: [1000, 1000],
    nebulae: [{ x:533, y:820, r:262, color:'rgba(41,60,120,', alpha:0.14 }],
    planets: [
      { name: [{ code: "Kr", context: "민덴" }], main:true, type:'terrestrial', fortress:null, x:500, y:500, size:42 }
    ],
  },
  {
    id:      'MARIENDORF',
    code:    '230039',
    name: [
      { code: "Kr", context: "마린도르프" },
      { code: "En", context: "MARIENDORF" },
    ],
    mapSize: [1000, 1000],
    nebulae: [{ x:833, y:754, r:206, color:'rgba(80,40,20,', alpha:0.14 }],
    planets: [
      { name: [{ code: "Kr", context: "테레젠슈타트" }], main:true, type:'terrestrial', fortress:null, x:500, y:500, size:42 }
    ],
  },
  {
    id:      'NEUE_LAND',
    code:    '230040',
    name: [
      { code: "Kr", context: "노이에란트" },
      { code: "En", context: "NEUE_LAND" },
    ],
    mapSize: [1000, 1000],
    nebulae: [{ x:832, y:330, r:215, color:'rgba(20,80,60,', alpha:0.17 }, { x:711, y:229, r:165, color:'rgba(20,60,80,', alpha:0.12 }],
    planets: [
      { name: [{ code: "Kr", context: "노이에란트" }], main:true, type:'terrestrial', fortress:null, x:500, y:500, size:42 }
    ],
  },
  {
    id:      'PALANTIA',
    code:    '230041',
    name: [
      { code: "Kr", context: "팔란티아" },
      { code: "En", context: "PALANTIA" },
    ],
    mapSize: [1000, 1000],
    nebulae: [{ x:654, y:172, r:219, color:'rgba(20,60,80,', alpha:0.14 }],
    planets: [
      { name: [{ code: "Kr", context: "케르코포르타" }], main:true, type:'terrestrial', fortress:null, x:500, y:500, size:42 }
    ],
  },
  {
    id:      'PHEZZAN',
    code:    '230042',
    name: [
      { code: "Kr", context: "페잔" },
      { code: "En", context: "PHEZZAN" },
    ],
    mapSize: [1000, 1000],
    nebulae: [{ x:839, y:803, r:167, color:'rgba(20,60,80,', alpha:0.1 }],
    planets: [
      { name: [{ code: "Kr", context: "페잔" }], main:true, type:'capital', fortress:null, x:500, y:500, size:55 }
    ],
  },
  {
    id:      'PHOREVIT',
    code:    '230043',
    name: [
      { code: "Kr", context: "포레비트" },
      { code: "En", context: "PHOREVIT" },
    ],
    mapSize: [1000, 1000],
    nebulae: [{ x:403, y:456, r:216, color:'rgba(20,60,80,', alpha:0.13 }, { x:434, y:132, r:257, color:'rgba(20,80,60,', alpha:0.08 }],
    planets: [
      { name: [{ code: "Kr", context: "루지아나" }], main:true, type:'terrestrial', fortress:null, x:500, y:500, size:42 }
    ],
  },
  {
    id:      'PORGEN',
    code:    '230044',
    name: [
      { code: "Kr", context: "포르겐" },
      { code: "En", context: "PORGEN" },
    ],
    mapSize: [1000, 1000],
    nebulae: [{ x:491, y:722, r:174, color:'rgba(20,80,60,', alpha:0.09 }],
    planets: [
      { name: [{ code: "Kr", context: "루지아나" }], main:true, type:'terrestrial', fortress:null, x:500, y:500, size:42 }
    ],
  },
  {
    id:      'RAIGAR',
    code:    '230045',
    name: [
      { code: "Kr", context: "라이갈" },
      { code: "En", context: "RAIGAR" },
    ],
    mapSize: [1000, 1000],
    nebulae: [{ x:497, y:164, r:193, color:'rgba(20,80,60,', alpha:0.13 }],
    planets: [
      { name: [{ code: "Kr", context: "마그 토레드" }], main:true, type:'terrestrial', fortress:null, x:500, y:500, size:42 }
    ],
  },
  {
    id:      'RANTEMARIO',
    code:    '230046',
    name: [
      { code: "Kr", context: "란테마리오" },
      { code: "En", context: "RANTEMARIO" },
    ],
    mapSize: [1000, 1000],
    nebulae: [{ x:179, y:291, r:155, color:'rgba(80,40,20,', alpha:0.1 }],
    planets: [
      { name: [{ code: "Kr", context: "라티고스트" }], main:true, type:'terrestrial', fortress:null, x:282, y:616, size:42 },
      { name: [{ code: "Kr", context: "스벤트비트" }], main:false, type:'terrestrial', fortress:null, x:505, y:199, size:28 },
      { name: [{ code: "Kr", context: "야로비트" }], main:false, type:'terrestrial', fortress:null, x:745, y:623, size:22 }
    ],
  },
  {
    id:      'RIOPUERDE',
    code:    '230047',
    name: [
      { code: "Kr", context: "리오 베르데" },
      { code: "En", context: "RIOPUERDE" },
    ],
    mapSize: [1000, 1000],
    nebulae: [{ x:681, y:546, r:169, color:'rgba(20,80,60,', alpha:0.09 }],
    planets: [
      { name: [{ code: "Kr", context: "아로요 드 모리노" }], main:true, type:'terrestrial', fortress:null, x:330, y:599, size:42 },
      { name: [{ code: "Kr", context: "카시나" }], main:false, type:'terrestrial', fortress:null, x:669, y:400, size:22 }
    ],
  },
  {
    id:      'SHACHEN',
    code:    '230048',
    name: [
      { code: "Kr", context: "샤헨" },
      { code: "En", context: "SHACHEN" },
    ],
    mapSize: [1000, 1000],
    nebulae: [{ x:485, y:893, r:186, color:'rgba(80,40,20,', alpha:0.17 }, { x:460, y:185, r:276, color:'rgba(60,20,80,', alpha:0.09 }],
    planets: [
      { name: [{ code: "Kr", context: "슈바르츠부르크" }], main:true, type:'terrestrial', fortress:null, x:500, y:500, size:42 }
    ],
  },
  {
    id:      'SHANDARA',
    code:    '230049',
    name: [
      { code: "Kr", context: "샨다르아" },
      { code: "En", context: "SHANDARA" },
    ],
    mapSize: [1000, 1000],
    nebulae: [{ x:131, y:740, r:241, color:'rgba(20,80,60,', alpha:0.14 }, { x:358, y:293, r:155, color:'rgba(20,60,80,', alpha:0.15 }],
    planets: [
      { name: [{ code: "Kr", context: "알에리스" }], main:true, type:'terrestrial', fortress:null, x:500, y:500, size:42 }
    ],
  },
  {
    id:      'SHANDOW',
    code:    '230050',
    name: [
      { code: "Kr", context: "샨다우" },
      { code: "En", context: "SHANDOW" },
    ],
    mapSize: [1000, 1000],
    nebulae: [{ x:888, y:104, r:256, color:'rgba(41,60,120,', alpha:0.08 }],
    planets: [
      { name: [{ code: "Kr", context: "에스링그" }], main:true, type:'terrestrial', fortress:null, x:734, y:427, size:42 },
      { name: [{ code: "Kr", context: "크네스도르프" }], main:false, type:'terrestrial', fortress:null, x:423, y:734, size:32 },
      { name: [{ code: "Kr", context: "폰트노이" }], main:false, type:'terrestrial', fortress:null, x:330, y:306, size:30 }
    ],
  },
  {
    id:      'SHIVA',
    code:    '230051',
    name: [
      { code: "Kr", context: "시바" },
      { code: "En", context: "SHIVA" },
    ],
    mapSize: [1000, 1000],
    nebulae: [{ x:173, y:277, r:201, color:'rgba(80,40,20,', alpha:0.13 }, { x:572, y:337, r:207, color:'rgba(80,40,20,', alpha:0.14 }],
    planets: [
      { name: [{ code: "Kr", context: "미트라" }], main:true, type:'terrestrial', fortress:null, x:483, y:695, size:42 },
      { name: [{ code: "Kr", context: "지비에" }], main:false, type:'terrestrial', fortress:null, x:516, y:304, size:30 }
    ],
  },
  {
    id:      'SPAHLA',
    code:    '230052',
    name: [
      { code: "Kr", context: "슈팔라" },
      { code: "En", context: "SPAHLA" },
    ],
    mapSize: [1000, 1000],
    nebulae: [{ x:601, y:761, r:200, color:'rgba(20,60,80,', alpha:0.14 }, { x:381, y:219, r:178, color:'rgba(41,60,120,', alpha:0.1 }],
    planets: [
      { name: [{ code: "Kr", context: "에레키슈갈" }], main:true, type:'terrestrial', fortress:null, x:500, y:500, size:42 }
    ],
  },
  {
    id:      'TANATOS',
    code:    '230053',
    name: [
      { code: "Kr", context: "타나투스" },
      { code: "En", context: "TANATOS" },
    ],
    mapSize: [1000, 1000],
    nebulae: [{ x:349, y:513, r:241, color:'rgba(41,60,120,', alpha:0.15 }, { x:255, y:740, r:229, color:'rgba(60,20,80,', alpha:0.12 }],
    planets: [
      { name: [{ code: "Kr", context: "에코니아" }], main:true, type:'terrestrial', fortress:null, x:526, y:694, size:42 },
      { name: [{ code: "Kr", context: "마스지드" }], main:false, type:'terrestrial', fortress:null, x:473, y:305, size:29 }
    ],
  },
  {
    id:      'TASIRI',
    code:    '230054',
    name: [
      { code: "Kr", context: "타시리" },
      { code: "En", context: "TASIRI" },
    ],
    mapSize: [1000, 1000],
    nebulae: [{ x:213, y:769, r:188, color:'rgba(20,60,80,', alpha:0.12 }, { x:496, y:526, r:243, color:'rgba(80,40,20,', alpha:0.09 }],
    planets: [
      { name: [{ code: "Kr", context: "파라스" }], main:true, type:'terrestrial', fortress:null, x:500, y:500, size:42 }
    ],
  },
  {
    id:      'TIAMAT',
    code:    '230055',
    name: [
      { code: "Kr", context: "티아매트" },
      { code: "En", context: "TIAMAT" },
    ],
    mapSize: [1000, 1000],
    nebulae: [{ x:569, y:369, r:174, color:'rgba(20,60,80,', alpha:0.1 }, { x:900, y:367, r:203, color:'rgba(60,20,80,', alpha:0.09 }],
    planets: [
      { name: [{ code: "Kr", context: "라므" }], main:true, type:'fortress', fortress:'TIAMAT', x:693, y:331, size:50 },
      { name: [{ code: "Kr", context: "안샤르" }], main:false, type:'terrestrial', fortress:null, x:563, y:764, size:29 },
      { name: [{ code: "Kr", context: "레그니처" }], main:false, type:'terrestrial', fortress:null, x:256, y:411, size:25 }
    ],
  },
  {
    id:      'TRABAH',
    code:    '230056',
    name: [
      { code: "Kr", context: "트라바흐" },
      { code: "En", context: "TRABAH" },
    ],
    mapSize: [1000, 1000],
    nebulae: [{ x:515, y:551, r:214, color:'rgba(20,60,80,', alpha:0.14 }, { x:285, y:485, r:267, color:'rgba(80,40,20,', alpha:0.13 }],
    planets: [
      { name: [{ code: "Kr", context: "호포키르히" }], main:true, type:'terrestrial', fortress:null, x:368, y:645, size:42 },
      { name: [{ code: "Kr", context: "비텐베르크" }], main:false, type:'terrestrial', fortress:null, x:631, y:354, size:25 }
    ],
  },
  {
    id:      'TRIPOLA',
    code:    '230057',
    name: [
      { code: "Kr", context: "트리폴라" },
      { code: "En", context: "TRIPOLA" },
    ],
    mapSize: [1000, 1000],
    nebulae: [{ x:624, y:626, r:272, color:'rgba(41,60,120,', alpha:0.14 }],
    planets: [
      { name: [{ code: "Kr", context: "팔머랜드" }], main:true, type:'terrestrial', fortress:null, x:500, y:500, size:42 }
    ],
  },
  {
    id:      'VALHALLA',
    code:    '230058',
    name: [
      { code: "Kr", context: "발할라" },
      { code: "En", context: "VALHALLA" },
    ],
    mapSize: [1000, 1000],
    nebulae: [{ x:589, y:852, r:230, color:'rgba(60,20,80,', alpha:0.14 }, { x:566, y:247, r:156, color:'rgba(20,80,60,', alpha:0.14 }],
    planets: [
      { name: [{ code: "Kr", context: "오딘" }], main:true, type:'capital', fortress:null, x:654, y:731, size:55 },
      { name: [{ code: "Kr", context: "아스가르즈" }], main:false, type:'terrestrial', fortress:null, x:258, y:550, size:24 },
      { name: [{ code: "Kr", context: "유그드라실" }], main:false, type:'terrestrial', fortress:null, x:592, y:215, size:31 }
    ],
  },
  {
    id:      'VANDENBERG',
    code:    '230059',
    name: [
      { code: "Kr", context: "바르텐베르크" },
      { code: "En", context: "VANDENBERG" },
    ],
    mapSize: [1000, 1000],
    nebulae: [{ x:471, y:641, r:272, color:'rgba(41,60,120,', alpha:0.15 }],
    planets: [
      { name: [{ code: "Kr", context: "브렌하임" }], main:true, type:'terrestrial', fortress:null, x:429, y:682, size:42 },
      { name: [{ code: "Kr", context: "카르슈타트" }], main:false, type:'terrestrial', fortress:null, x:570, y:317, size:31 }
    ],
  },
  {
    id:      'VANFLEET',
    code:    '230060',
    name: [
      { code: "Kr", context: "밴플리트" },
      { code: "En", context: "VANFLEET" },
    ],
    mapSize: [1000, 1000],
    nebulae: [{ x:196, y:443, r:219, color:'rgba(80,40,20,', alpha:0.12 }],
    planets: [
      { name: [{ code: "Kr", context: "카토르브러" }], main:true, type:'terrestrial', fortress:null, x:500, y:500, size:42 }
    ],
  },
  {
    id:      'VERMILION',
    code:    '230061',
    name: [
      { code: "Kr", context: "버밀리온" },
      { code: "En", context: "VERMILION" },
    ],
    mapSize: [1000, 1000],
    nebulae: [{ x:308, y:485, r:224, color:'rgba(80,40,20,', alpha:0.12 }],
    planets: [
      { name: [{ code: "Kr", context: "몽마라유" }], main:true, type:'terrestrial', fortress:null, x:500, y:500, size:42 }
    ],
  },
  {
    id:      'VILLENSTEIN',
    code:    '230062',
    name: [
      { code: "Kr", context: "빌렌슈타인" },
      { code: "En", context: "VILLENSTEIN" },
    ],
    mapSize: [1000, 1000],
    nebulae: [{ x:815, y:285, r:261, color:'rgba(41,60,120,', alpha:0.18 }],
    planets: [
      { name: [{ code: "Kr", context: "레오폴트슈타트" }], main:true, type:'terrestrial', fortress:null, x:352, y:629, size:42 },
      { name: [{ code: "Kr", context: "그라츠" }], main:false, type:'terrestrial', fortress:null, x:647, y:370, size:30 }
    ],
  },
];

// 빠른 조회용 Map
export const STAR_MAP_BY_ID   = Object.fromEntries(STAR_MAPS.map(m => [m.id,   m]))
export const STAR_MAP_BY_CODE = Object.fromEntries(STAR_MAPS.map(m => [m.code, m]))