// ================================================================
//  laneData.js — 성계 항로 마스터 (불변)
//  출처: starSystemData.js 각 성계의 '연결:' 주석 전수 추출
//  type   : corridor(이제르론 회랑) | phezzan(페잔 회랑) | normal
//  period : 1턴(<200px) | 2턴(<440px) | 3턴(≥440px)
//           corridor 고정=2, phezzan 고정=3
//  stability: corridor=55, phezzan=70, normal=45
// ================================================================

export const LANES = [
  // ── 이제르론 회랑 (corridor) ──────────────────────────────────
  { id:'LANE_001', stars:['230022','230055'], type:'corridor', period:2, stability:55 }, // ALTENA↔TIAMAT
  { id:'LANE_002', stars:['230022','230060'], type:'corridor', period:2, stability:55 }, // ALTENA↔VANFLEET
  { id:'LANE_003', stars:['230022','230004'], type:'corridor', period:2, stability:55 }, // ALTENA↔ARLESHEIM
  { id:'LANE_004', stars:['230022','230003'], type:'corridor', period:2, stability:55 }, // ALTENA↔AMRITZER

  // ── 페잔 회랑 (phezzan) ───────────────────────────────────────
  { id:'LANE_005', stars:['230042','230065'], type:'phezzan',  period:3, stability:70 }, // PHEZZAN↔SCHATTENBURG
  { id:'LANE_006', stars:['230042','230066'], type:'phezzan',  period:3, stability:70 }, // PHEZZAN↔LICHTENBERG

  // ── 일반 항로 (normal) ────────────────────────────────────────
  // 230001 ALMENTFUBEEL
  { id:'LANE_007', stars:['230001','230028'], type:'normal', period:1, stability:45 }, // ALMENTFUBEEL↔KIFOISER
  { id:'LANE_008', stars:['230001','230048'], type:'normal', period:1, stability:45 }, // ALMENTFUBEEL↔SCHACHEN

  // 230002 ALTENER
  { id:'LANE_009', stars:['230002','230009'], type:'normal', period:1, stability:45 }, // ALTENER↔BRUNSCHWEIG
  { id:'LANE_010', stars:['230002','230024'], type:'normal', period:1, stability:45 }, // ALTENER↔JOTUNHEIM
  { id:'LANE_011', stars:['230002','230038'], type:'normal', period:1, stability:45 }, // ALTENER↔MARBACH

  // 230003 AMRITZER
  { id:'LANE_012', stars:['230003','230008'], type:'normal', period:1, stability:45 }, // AMRITZER↔BODEN
  { id:'LANE_013', stars:['230003','230044'], type:'normal', period:1, stability:45 }, // AMRITZER↔FORGEN

  // 230004 ARLESHEIM
  { id:'LANE_014', stars:['230004','230041'], type:'normal', period:1, stability:45 }, // ARLESHEIM↔PALANTIA

  // 230005 ASTARTE
  { id:'LANE_015', stars:['230005','230010'], type:'normal', period:1, stability:45 }, // ASTARTE↔DAGON
  { id:'LANE_016', stars:['230005','230011'], type:'normal', period:1, stability:45 }, // ASTARTE↔DORIA
  { id:'LANE_017', stars:['230005','230017'], type:'normal', period:1, stability:45 }, // ASTARTE↔EL-PACIL
  { id:'LANE_018', stars:['230005','230041'], type:'normal', period:1, stability:45 }, // ASTARTE↔PALANTIA
  { id:'LANE_019', stars:['230005','230060'], type:'normal', period:1, stability:45 }, // ASTARTE↔VANFLEET

  // 230006 BA'ALAT
  { id:'LANE_020', stars:['230006','230047'], type:'normal', period:2, stability:45 }, // BAALAT↔RIO-VERDE
  { id:'LANE_021', stars:['230006','230063'], type:'normal', period:2, stability:45 }, // BAALAT↔KERIM

  // 230007 BALATROOP
  { id:'LANE_022', stars:['230007','230034'], type:'normal', period:1, stability:45 }, // BALATROOP↔LUNBINI
  { id:'LANE_023', stars:['230007','230065'], type:'normal', period:1, stability:45 }, // BALATROOP↔SCHATTENBURG

  // 230008 BODEN
  { id:'LANE_024', stars:['230008','230062'], type:'normal', period:1, stability:45 }, // BODEN↔VILLENSTEIN
  { id:'LANE_025', stars:['230008','230067'], type:'normal', period:1, stability:45 }, // BODEN↔MÜKKENBERGER

  // 230009 BRUNSCHWEIG
  { id:'LANE_026', stars:['230009','230019'], type:'normal', period:2, stability:45 }, // BRUNSCHWEIG↔FREYA
  { id:'LANE_027', stars:['230009','230028'], type:'normal', period:1, stability:45 }, // BRUNSCHWEIG↔KIFOISER
  { id:'LANE_028', stars:['230009','230032'], type:'normal', period:2, stability:45 }, // BRUNSCHWEIG↔LITTENHEIM
  { id:'LANE_029', stars:['230009','230038'], type:'normal', period:1, stability:45 }, // BRUNSCHWEIG↔MARBACH

  // 230010 DAGON
  { id:'LANE_030', stars:['230010','230016'], type:'normal', period:1, stability:45 }, // DAGON↔ELGON
  { id:'LANE_031', stars:['230010','230017'], type:'normal', period:2, stability:45 }, // DAGON↔EL-PACIL
  { id:'LANE_032', stars:['230010','230055'], type:'normal', period:1, stability:45 }, // DAGON↔TIAMAT

  // 230011 DORIA
  { id:'LANE_033', stars:['230011','230016'], type:'normal', period:1, stability:45 }, // DORIA↔ELGON

  // 230012 ECKHART
  { id:'LANE_034', stars:['230012','230014'], type:'normal', period:1, stability:45 }, // ECKHART↔EISENHERZ
  { id:'LANE_035', stars:['230012','230015'], type:'normal', period:1, stability:45 }, // ECKHART↔EISENHUT
  { id:'LANE_036', stars:['230012','230048'], type:'normal', period:1, stability:45 }, // ECKHART↔SCHACHEN

  // 230013 ELUCERA
  { id:'LANE_037', stars:['230013','230047'], type:'normal', period:1, stability:45 }, // ELUCERA↔RIO-VERDE
  { id:'LANE_038', stars:['230013','230053'], type:'normal', period:1, stability:45 }, // ELUCERA↔TANATUS

  // 230014 EISENHERZ
  { id:'LANE_039', stars:['230014','230015'], type:'normal', period:1, stability:45 }, // EISENHERZ↔EISENHUT
  { id:'LANE_040', stars:['230014','230066'], type:'normal', period:1, stability:45 }, // EISENHERZ↔LICHTENBERG

  // 230015 EISENHUT
  { id:'LANE_041', stars:['230015','230059'], type:'normal', period:1, stability:45 }, // EISENHUT↔WARTENBERG

  // 230016 ELGON
  { id:'LANE_042', stars:['230016','230017'], type:'normal', period:1, stability:45 }, // ELGON↔EL-PACIL
  { id:'LANE_043', stars:['230016','230051'], type:'normal', period:1, stability:45 }, // ELGON↔SYVA

  // 230018 FIREZARD
  { id:'LANE_044', stars:['230018','230041'], type:'normal', period:1, stability:45 }, // FIREZARD↔PALANTIA
  { id:'LANE_045', stars:['230018','230068'], type:'normal', period:1, stability:45 }, // FIREZARD↔FORSETI

  // 230019 FREYA
  { id:'LANE_046', stars:['230019','230050'], type:'normal', period:1, stability:45 }, // FREYA↔SHANTAU
  { id:'LANE_047', stars:['230019','230058'], type:'normal', period:2, stability:45 }, // FREYA↔VALHALLA

  // 230020 GANDHALVA
  { id:'LANE_048', stars:['230020','230045'], type:'normal', period:1, stability:45 }, // GANDHALVA↔LYGALL
  { id:'LANE_049', stars:['230020','230046'], type:'normal', period:1, stability:45 }, // GANDHALVA↔RANTEMARIO
  { id:'LANE_050', stars:['230020','230057'], type:'normal', period:1, stability:45 }, // GANDHALVA↔TRIPLA
  { id:'LANE_051', stars:['230020','230061'], type:'normal', period:2, stability:45 }, // GANDHALVA↔VERMILION

  // 230021 HACHN
  { id:'LANE_052', stars:['230021','230044'], type:'normal', period:1, stability:45 }, // HACHN↔FORGEN
  { id:'LANE_053', stars:['230021','230048'], type:'normal', period:1, stability:45 }, // HACHN↔SCHACHEN

  // 230023 JYAMSEED(잠시드)
  { id:'LANE_054', stars:['230023','230046'], type:'normal', period:2, stability:45 }, // JYAMSEED↔RANTEMARIO
  { id:'LANE_055', stars:['230023','230051'], type:'normal', period:1, stability:45 }, // JYAMSEED↔SYVA
  { id:'LANE_056', stars:['230023','230063'], type:'normal', period:2, stability:45 }, // JYAMSEED↔KERIM

  // 230024 JOTUNHEIM
  { id:'LANE_057', stars:['230024','230059'], type:'normal', period:1, stability:45 }, // JOTUNHEIM↔WARTENBERG

  // 230026 KASTOROP
  { id:'LANE_058', stars:['230026','230039'], type:'normal', period:1, stability:45 }, // KASTOROP↔MARIENDORF
  { id:'LANE_059', stars:['230026','230058'], type:'normal', period:1, stability:45 }, // KASTOROP↔VALHALLA

  // 230028 KIFOISER
  { id:'LANE_060', stars:['230028','230050'], type:'normal', period:2, stability:45 }, // KIFOISER↔SHANTAU
  { id:'LANE_061', stars:['230028','230059'], type:'normal', period:2, stability:45 }, // KIFOISER↔WARTENBERG

  // 230030 LICHTENLADE
  { id:'LANE_062', stars:['230030','230056'], type:'normal', period:1, stability:45 }, // LICHTENLADE↔TRABACH
  { id:'LANE_063', stars:['230030','230058'], type:'normal', period:2, stability:45 }, // LICHTENLADE↔VALHALLA

  // 230032 LITTENHEIM
  { id:'LANE_064', stars:['230032','230050'], type:'normal', period:1, stability:45 }, // LITTENHEIM↔SHANTAU

  // 230033 ROFORTEN
  { id:'LANE_065', stars:['230033','230047'], type:'normal', period:1, stability:45 }, // ROFORTEN↔RIO-VERDE
  { id:'LANE_066', stars:['230033','230054'], type:'normal', period:1, stability:45 }, // ROFORTEN↔TASSILI
  { id:'LANE_067', stars:['230033','230061'], type:'normal', period:1, stability:45 }, // ROFORTEN↔VERMILION

  // 230034 LUNBINI
  { id:'LANE_068', stars:['230034','230049'], type:'normal', period:1, stability:45 }, // LUNBINI↔SHANDALUA
  { id:'LANE_069', stars:['230034','230052'], type:'normal', period:1, stability:45 }, // LUNBINI↔SHUPALA

  // 230035 LYUCAS
  { id:'LANE_070', stars:['230035','230046'], type:'normal', period:2, stability:45 }, // LYUCAS↔RANTEMARIO
  { id:'LANE_071', stars:['230035','230061'], type:'normal', period:1, stability:45 }, // LYUCAS↔VERMILION

  // 230037 MARR-ADETTA
  { id:'LANE_072', stars:['230037','230046'], type:'normal', period:1, stability:45 }, // MARR-ADETTA↔RANTEMARIO
  { id:'LANE_073', stars:['230037','230052'], type:'normal', period:1, stability:45 }, // MARR-ADETTA↔SHUPALA

  // 230038 MARBACH
  { id:'LANE_074', stars:['230038','230039'], type:'normal', period:1, stability:45 }, // MARBACH↔MARIENDORF

  // 230043 POLEVIT
  { id:'LANE_075', stars:['230043','230046'], type:'normal', period:2, stability:45 }, // POLEVIT↔RANTEMARIO
  { id:'LANE_076', stars:['230043','230065'], type:'normal', period:2, stability:45 }, // POLEVIT↔SCHATTENBURG

  // 230045 LYGALL
  { id:'LANE_077', stars:['230045','230054'], type:'normal', period:1, stability:45 }, // LYGALL↔TASSILI
  { id:'LANE_078', stars:['230045','230057'], type:'normal', period:1, stability:45 }, // LYGALL↔TRIPLA

  // 230047 RIO-VERDE
  { id:'LANE_080', stars:['230047','230053'], type:'normal', period:2, stability:45 }, // RIO-VERDE↔TANATUS

  // 230049 SHANDALUA
  { id:'LANE_081', stars:['230049','230068'], type:'normal', period:1, stability:45 }, // SHANDALUA↔FORSETI

  // 230050 SHANTAU
  { id:'LANE_082', stars:['230050','230056'], type:'normal', period:1, stability:45 }, // SHANTAU↔TRABACH
  { id:'LANE_083', stars:['230050','230062'], type:'normal', period:1, stability:45 }, // SHANTAU↔VILLENSTEIN

  // 230053 TANATUS
  { id:'LANE_085', stars:['230053','230057'], type:'normal', period:1, stability:45 }, // TANATUS↔TRIPLA

]
