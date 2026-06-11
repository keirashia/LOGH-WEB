// ================================================================
//  lane.js — 항로 마스터
//  stars: [starCode_A, starCode_B]
//  type: 'corridor' | 'phezzan' | 'normal'
// ================================================================

export const LANES = [

  // ── 이제르론 회랑 ──────────────────────────────────────────────
  { id:'LANE_001', stars:['230022','230060'], type:'corridor', period:2, stability:55 }, // ISERLOHN-VANFLEET
  { id:'LANE_002', stars:['230022','230041'], type:'corridor', period:2, stability:55 }, // ISERLOHN-PALNTIA
  { id:'LANE_003', stars:['230022','230005'], type:'corridor', period:2, stability:55 }, // ISERLOHN-ASTATE
  { id:'LANE_004', stars:['230022','230062'], type:'corridor', period:2, stability:55 }, // ISERLOHN-VILENSTEIN

  // ── 페잔 회랑 ─────────────────────────────────────────────────
  { id:'LANE_005', stars:['230042','230007'], type:'phezzan',  period:3, stability:70 }, // PHEZZAN-BARATULF
  { id:'LANE_006', stars:['230042','230049'], type:'phezzan',  period:3, stability:70 }, // PHEZZAN-SHANDALUA
  { id:'LANE_007', stars:['230042','230018'], type:'phezzan',  period:3, stability:70 }, // PHEZZAN-FIREZARD
  { id:'LANE_008', stars:['230042','230012'], type:'phezzan',  period:3, stability:70 }, // PHEZZAN-ECKHART
  { id:'LANE_009', stars:['230042','230014'], type:'phezzan',  period:3, stability:70 }, // PHEZZAN-EISENHERZ
  { id:'LANE_010', stars:['230042','230025'], type:'phezzan',  period:3, stability:70 }, // PHEZZAN-KAPCHE_LANKA
  { id:'LANE_011', stars:['230042','230043'], type:'phezzan',  period:3, stability:65 }, // PHEZZAN-PHOREVIT
  { id:'LANE_012', stars:['230042','230027'], type:'phezzan',  period:3, stability:65 }, // PHEZZAN-KERUM

  // ── 동맹 북부 ─────────────────────────────────────────────────
  { id:'LANE_013', stars:['230010','230016'], type:'normal',   period:1, stability:60 }, // DAGON-ELGON
  { id:'LANE_014', stars:['230010','230055'], type:'normal',   period:1, stability:55 }, // DAGON-TIAMAT
  { id:'LANE_015', stars:['230016','230011'], type:'normal',   period:1, stability:60 }, // ELGON-DORIA
  { id:'LANE_016', stars:['230016','230063'], type:'normal',   period:1, stability:60 }, // ELGON-KERIM
  { id:'LANE_017', stars:['230055','230060'], type:'normal',   period:1, stability:55 }, // TIAMAT-VANFLEET
  { id:'LANE_018', stars:['230055','230005'], type:'normal',   period:1, stability:55 }, // TIAMAT-ASTATE
  { id:'LANE_019', stars:['230005','230060'], type:'normal',   period:1, stability:50 }, // ASTATE-VANFLEET
  { id:'LANE_020', stars:['230005','230041'], type:'normal',   period:1, stability:50 }, // ASTATE-PALNTIA
  { id:'LANE_021', stars:['230011','230041'], type:'normal',   period:1, stability:55 }, // DORIA-PALNTIA
  { id:'LANE_022', stars:['230011','230005'], type:'normal',   period:1, stability:50 }, // DORIA-ASTATE

  // ── 동맹 서부·케림 라인 ──────────────────────────────────────
  { id:'LANE_023', stars:['230063','230061'], type:'normal',   period:1, stability:60 }, // KERIM-VERMILION
  { id:'LANE_024', stars:['230063','230023'], type:'normal',   period:1, stability:60 }, // KERIM-잠시드
  { id:'LANE_025', stars:['230063','230006'], type:'normal',   period:1, stability:60 }, // KERIM-BARAT
  { id:'LANE_026', stars:['230023','230061'], type:'normal',   period:1, stability:55 }, // 잠시드-VERMILION
  { id:'LANE_027', stars:['230023','230017'], type:'normal',   period:1, stability:55 }, // 잠시드-ELFACIL
  { id:'LANE_028', stars:['230023','230011'], type:'normal',   period:1, stability:55 }, // 잠시드-DORIA
  { id:'LANE_029', stars:['230061','230033'], type:'normal',   period:1, stability:55 }, // VERMILION-ROFORTEN
  { id:'LANE_030', stars:['230033','230036'], type:'normal',   period:1, stability:60 }, // ROFORTEN-LYUCAS
  { id:'LANE_031', stars:['230036','230054'], type:'normal',   period:1, stability:60 }, // LYUCAS-TASSILI
  { id:'LANE_032', stars:['230036','230017'], type:'normal',   period:1, stability:55 }, // LYUCAS-ELFACIL
  { id:'LANE_033', stars:['230006','230047'], type:'normal',   period:1, stability:60 }, // BARAT-RIOVERDE
  { id:'LANE_034', stars:['230047','230054'], type:'normal',   period:1, stability:60 }, // RIOVERDE-TASSILI
  { id:'LANE_035', stars:['230047','230013'], type:'normal',   period:1, stability:60 }, // RIOVERDE-ELUCERA
  { id:'LANE_036', stars:['230054','230045'], type:'normal',   period:1, stability:55 }, // TASSILI-LYGALL
  { id:'LANE_037', stars:['230054','230020'], type:'normal',   period:1, stability:55 }, // TASSILI-GANDHALVA
  { id:'LANE_038', stars:['230013','230053'], type:'normal',   period:1, stability:60 }, // ELUCERA-TANATUS
  { id:'LANE_039', stars:['230053','230057'], type:'normal',   period:1, stability:60 }, // TANATUS-TRIPLA
  { id:'LANE_040', stars:['230057','230046'], type:'normal',   period:1, stability:55 }, // TRIPLA-RANTEMARIO

  // ── 동맹 중부·남부 ────────────────────────────────────────────
  { id:'LANE_041', stars:['230045','230020'], type:'normal',   period:1, stability:55 }, // LYGALL-GANDHALVA
  { id:'LANE_042', stars:['230045','230046'], type:'normal',   period:1, stability:55 }, // LYGALL-RANTEMARIO
  { id:'LANE_043', stars:['230020','230034'], type:'normal',   period:1, stability:55 }, // GANDHALVA-LUNBINI
  { id:'LANE_044', stars:['230046','230034'], type:'normal',   period:1, stability:55 }, // RANTEMARIO-LUNBINI
  { id:'LANE_045', stars:['230034','230049'], type:'normal',   period:1, stability:50 }, // LUNBINI-SHANDALUA
  { id:'LANE_046', stars:['230034','230007'], type:'normal',   period:1, stability:50 }, // LUNBINI-BARATULF
  { id:'LANE_047', stars:['230049','230007'], type:'normal',   period:1, stability:50 }, // SHANDALUA-BARATULF
  { id:'LANE_048', stars:['230049','230037'], type:'normal',   period:1, stability:45 }, // SHANDALUA-MALAD
  { id:'LANE_049', stars:['230049','230018'], type:'normal',   period:1, stability:50 }, // SHANDALUA-FIREZARD
  { id:'LANE_050', stars:['230017','230052'], type:'normal',   period:1, stability:55 }, // ELFACIL-SHUPALA
  { id:'LANE_051', stars:['230052','230037'], type:'normal',   period:1, stability:50 }, // SHUPALA-MALAD
  { id:'LANE_052', stars:['230052','230029'], type:'normal',   period:1, stability:50 }, // SHUPALA-LEGNICA
  { id:'LANE_053', stars:['230037','230018'], type:'normal',   period:1, stability:45 }, // MALAD-FIREZARD
  { id:'LANE_054', stars:['230029','230004'], type:'normal',   period:1, stability:45 }, // LEGNICA-ARLESHEIM
  { id:'LANE_055', stars:['230018','230012'], type:'normal',   period:1, stability:45 }, // FIREZARD-ECKHART
  { id:'LANE_056', stars:['230004','230021'], type:'normal',   period:1, stability:50 }, // ARLESHEIM-HAN
  { id:'LANE_057', stars:['230004','230052'], type:'normal',   period:1, stability:45 }, // ARLESHEIM-SHUPALA

  // ── 잠지드 연결 (케림-란테마리오 라인) ───────────────────────
  { id:'LANE_058', stars:['230064','230063'], type:'normal',   period:1, stability:55 }, // JAMZID-KERIM
  { id:'LANE_059', stars:['230064','230046'], type:'normal',   period:1, stability:55 }, // JAMZID-RANTEMARIO

  // ── 이제르론 남방 ─────────────────────────────────────────────
  { id:'LANE_060', stars:['230022','230051'], type:'normal',   period:1, stability:45 }, // ISERLOHN-SHIVA
  { id:'LANE_061', stars:['230051','230012'], type:'normal',   period:1, stability:45 }, // SHIVA-ECKHART
  { id:'LANE_062', stars:['230051','230059'], type:'normal',   period:1, stability:45 }, // SHIVA-WARTENBERG

  // ── 제국 북부 ─────────────────────────────────────────────────
  { id:'LANE_063', stars:['230060','230003'], type:'normal',   period:1, stability:50 }, // VANFLEET-AMLITZER
  { id:'LANE_064', stars:['230003','230062'], type:'normal',   period:1, stability:50 }, // AMLITZER-VILENSTEIN
  { id:'LANE_065', stars:['230003','230050'], type:'normal',   period:1, stability:50 }, // AMLITZER-SHANTAU
  { id:'LANE_066', stars:['230003','230044'], type:'normal',   period:1, stability:50 }, // AMLITZER-FORGEN
  { id:'LANE_067', stars:['230003','230008'], type:'normal',   period:1, stability:55 }, // AMLITZER-BODEN
  { id:'LANE_068', stars:['230008','230062'], type:'normal',   period:1, stability:55 }, // BODEN-VILENSTEIN
  { id:'LANE_069', stars:['230062','230056'], type:'normal',   period:1, stability:55 }, // VILENSTEIN-TRABACH
  { id:'LANE_070', stars:['230056','230030'], type:'normal',   period:1, stability:55 }, // TRABACH-LICHTENLADE
  { id:'LANE_071', stars:['230030','230019'], type:'normal',   period:1, stability:55 }, // LICHTENLADE-FREYA
  { id:'LANE_072', stars:['230030','230035'], type:'normal',   period:1, stability:55 }, // LICHTENLADE-LYCUS
  { id:'LANE_073', stars:['230035','230040'], type:'normal',   period:1, stability:60 }, // LYCUS-NEUE_LAND

  // ── 제국 중부 ─────────────────────────────────────────────────
  { id:'LANE_074', stars:['230044','230050'], type:'normal',   period:1, stability:55 }, // FORGEN-SHANTAU
  { id:'LANE_075', stars:['230044','230001'], type:'normal',   period:1, stability:55 }, // FORGEN-ALMENTFUBEEL
  { id:'LANE_076', stars:['230050','230001'], type:'normal',   period:1, stability:55 }, // SHANTAU-ALMENTFUBEEL
  { id:'LANE_077', stars:['230001','230032'], type:'normal',   period:1, stability:60 }, // ALMENTFUBEEL-LITTENHEIM
  { id:'LANE_078', stars:['230001','230048'], type:'normal',   period:1, stability:60 }, // ALMENTFUBEEL-SCHACHEN
  { id:'LANE_079', stars:['230001','230021'], type:'normal',   period:1, stability:55 }, // ALMENTFUBEEL-HAN
  { id:'LANE_080', stars:['230032','230009'], type:'normal',   period:1, stability:60 }, // LITTENHEIM-BRUNSCHWEIG
  { id:'LANE_081', stars:['230032','230019'], type:'normal',   period:1, stability:60 }, // LITTENHEIM-FREYA
  { id:'LANE_082', stars:['230009','230048'], type:'normal',   period:1, stability:55 }, // BRUNSCHWEIG-SCHACHEN
  { id:'LANE_083', stars:['230009','230028'], type:'normal',   period:1, stability:55 }, // BRUNSCHWEIG-KIFOISER
  { id:'LANE_084', stars:['230009','230026'], type:'normal',   period:1, stability:60 }, // BRUNSCHWEIG-KASTROP
  { id:'LANE_085', stars:['230009','230058'], type:'normal',   period:1, stability:60 }, // BRUNSCHWEIG-WALHALLA
  { id:'LANE_086', stars:['230019','230058'], type:'normal',   period:1, stability:60 }, // FREYA-WALHALLA
  { id:'LANE_087', stars:['230058','230026'], type:'normal',   period:1, stability:60 }, // WALHALLA-KASTROP
  { id:'LANE_088', stars:['230058','230039'], type:'normal',   period:1, stability:60 }, // WALHALLA-MARIENDORF
  { id:'LANE_089', stars:['230058','230031'], type:'normal',   period:1, stability:65 }, // WALHALLA-LIPPSTADT
  { id:'LANE_090', stars:['230026','230039'], type:'normal',   period:1, stability:60 }, // KASTROP-MARIENDORF
  { id:'LANE_091', stars:['230039','230002'], type:'normal',   period:1, stability:60 }, // MARIENDORF-ALTENER
  { id:'LANE_092', stars:['230039','230038'], type:'normal',   period:1, stability:60 }, // MARIENDORF-MARBACH
  { id:'LANE_093', stars:['230002','230038'], type:'normal',   period:1, stability:60 }, // ALTENER-MARBACH
  { id:'LANE_094', stars:['230048','230028'], type:'normal',   period:1, stability:55 }, // SCHACHEN-KIFOISER
  { id:'LANE_095', stars:['230048','230021'], type:'normal',   period:1, stability:55 }, // SCHACHEN-HAN
  { id:'LANE_096', stars:['230048','230012'], type:'normal',   period:1, stability:50 }, // SCHACHEN-ECKHART
  { id:'LANE_097', stars:['230048','230059'], type:'normal',   period:1, stability:55 }, // SCHACHEN-WARTENBERG
  { id:'LANE_098', stars:['230028','230059'], type:'normal',   period:1, stability:55 }, // KIFOISER-WARTENBERG
  { id:'LANE_099', stars:['230059','230012'], type:'normal',   period:1, stability:50 }, // WARTENBERG-ECKHART
  { id:'LANE_100', stars:['230059','230038'], type:'normal',   period:1, stability:55 }, // WARTENBERG-MARBACH
  { id:'LANE_101', stars:['230031','230019'], type:'normal',   period:1, stability:65 }, // LIPPSTADT-FREYA

  // ── 제국 남부 ─────────────────────────────────────────────────
  { id:'LANE_102', stars:['230038','230024'], type:'normal',   period:1, stability:55 }, // MARBACH-JOTUNHEIM
  { id:'LANE_103', stars:['230038','230015'], type:'normal',   period:1, stability:55 }, // MARBACH-EISENHUT
  { id:'LANE_104', stars:['230014','230015'], type:'normal',   period:1, stability:55 }, // EISENHERZ-EISENHUT
  { id:'LANE_105', stars:['230015','230024'], type:'normal',   period:1, stability:55 }, // EISENHUT-JOTUNHEIM
  { id:'LANE_106', stars:['230025','230015'], type:'normal',   period:1, stability:50 }, // KAPCHE_LANKA-EISENHUT
  { id:'LANE_107', stars:['230027','230015'], type:'normal',   period:1, stability:50 }, // KERUM-EISENHUT
  { id:'LANE_108', stars:['230027','230012'], type:'normal',   period:1, stability:50 }, // KERUM-ECKHART
];
