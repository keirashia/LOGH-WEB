// ================================================================
//  lane.js — 항로 마스터 (불변)
//  stars: [starCode_A, starCode_B] (새 6자리 code 체계)
//  DB: TBL_LANE + TBL_LANE_STAR(Junction) + VW_LANE(View)
//  고립 성계 7개 추후 수기 수정 예정:
//  MARBACH(230038), LUYKAS_FPA(230036), ARESHYUM(230004),
//  BARATULF(230007), FIREZIERD(230018), HAN(230021), PORGEN(230044)
// ================================================================

export const LANES = [
  { id:'LANE_001', stars:['230001','230022'], type:'corridor', period:2, stability:55 },
  { id:'LANE_002', stars:['230003','230022'], type:'corridor', period:2, stability:55 },
  { id:'LANE_003', stars:['230022','230024'], type:'corridor', period:2, stability:55 },
  { id:'LANE_004', stars:['230022','230025'], type:'corridor', period:2, stability:55 },
  { id:'LANE_005', stars:['230022','230061'], type:'corridor', period:2, stability:55 },
  { id:'LANE_006', stars:['230025','230042'], type:'phezzan', period:3, stability:70 },
  { id:'LANE_007', stars:['230041','230042'], type:'phezzan', period:3, stability:70 },
  { id:'LANE_008', stars:['230042','230043'], type:'phezzan', period:3, stability:70 },
  { id:'LANE_009', stars:['230042','230046'], type:'phezzan', period:3, stability:70 },
  { id:'LANE_010', stars:['230042','230049'], type:'phezzan', period:3, stability:70 },
  { id:'LANE_011', stars:['230042','230054'], type:'phezzan', period:3, stability:70 },
  { id:'LANE_012', stars:['230001','230048'], type:'normal', period:1, stability:70 },
  { id:'LANE_013', stars:['230002','230024'], type:'normal', period:1, stability:70 },
  { id:'LANE_014', stars:['230002','230048'], type:'normal', period:1, stability:70 },
  { id:'LANE_015', stars:['230002','230061'], type:'normal', period:2, stability:40 },
  { id:'LANE_016', stars:['230003','230005'], type:'normal', period:1, stability:40 },
  { id:'LANE_017', stars:['230003','230013'], type:'normal', period:1, stability:40 },
  { id:'LANE_018', stars:['230003','230029'], type:'normal', period:1, stability:40 },
  { id:'LANE_019', stars:['230003','230052'], type:'normal', period:1, stability:40 },
  { id:'LANE_020', stars:['230005','230013'], type:'normal', period:1, stability:40 },
  { id:'LANE_021', stars:['230006','230016'], type:'normal', period:1, stability:60 },
  { id:'LANE_022', stars:['230006','230020'], type:'normal', period:2, stability:85 },
  { id:'LANE_023', stars:['230006','230033'], type:'normal', period:1, stability:85 },
  { id:'LANE_024', stars:['230006','230034'], type:'normal', period:2, stability:85 },
  { id:'LANE_025', stars:['230006','230047'], type:'normal', period:1, stability:85 },
  { id:'LANE_026', stars:['230006','230049'], type:'normal', period:2, stability:85 },
  { id:'LANE_027', stars:['230008','230011'], type:'normal', period:1, stability:60 },
  { id:'LANE_028', stars:['230008','230037'], type:'normal', period:2, stability:40 },
  { id:'LANE_029', stars:['230008','230052'], type:'normal', period:1, stability:60 },
  { id:'LANE_030', stars:['230009','230058'], type:'normal', period:1, stability:85 },
  { id:'LANE_031', stars:['230009','230059'], type:'normal', period:1, stability:70 },
  { id:'LANE_032', stars:['230010','230017'], type:'normal', period:1, stability:70 },
  { id:'LANE_033', stars:['230010','230055'], type:'normal', period:1, stability:70 },
  { id:'LANE_034', stars:['230011','230041'], type:'normal', period:1, stability:60 },
  { id:'LANE_035', stars:['230011','230045'], type:'normal', period:1, stability:60 },
  { id:'LANE_036', stars:['230012','230022'], type:'normal', period:2, stability:60 },
  { id:'LANE_037', stars:['230013','230029'], type:'normal', period:1, stability:60 },
  { id:'LANE_038', stars:['230014','230024'], type:'normal', period:2, stability:70 },
  { id:'LANE_039', stars:['230014','230035'], type:'normal', period:1, stability:70 },
  { id:'LANE_040', stars:['230014','230048'], type:'normal', period:2, stability:70 },
  { id:'LANE_041', stars:['230015','230032'], type:'normal', period:1, stability:70 },
  { id:'LANE_042', stars:['230015','230050'], type:'normal', period:2, stability:70 },
  { id:'LANE_043', stars:['230017','230029'], type:'normal', period:2, stability:60 },
  { id:'LANE_044', stars:['230019','230026'], type:'normal', period:2, stability:70 },
  { id:'LANE_045', stars:['230019','230058'], type:'normal', period:2, stability:85 },
  { id:'LANE_046', stars:['230019','230059'], type:'normal', period:1, stability:70 },
  { id:'LANE_047', stars:['230020','230055'], type:'normal', period:2, stability:70 },
  { id:'LANE_048', stars:['230022','230023'], type:'normal', period:2, stability:60 },
  { id:'LANE_049', stars:['230025','230026'], type:'normal', period:1, stability:60 },
  { id:'LANE_050', stars:['230025','230056'], type:'normal', period:1, stability:60 },
  { id:'LANE_051', stars:['230025','230059'], type:'normal', period:2, stability:60 },
  { id:'LANE_052', stars:['230027','230028'], type:'normal', period:1, stability:60 },
  { id:'LANE_053', stars:['230027','230054'], type:'normal', period:1, stability:60 },
  { id:'LANE_054', stars:['230028','230051'], type:'normal', period:1, stability:40 },
  { id:'LANE_055', stars:['230029','230037'], type:'normal', period:1, stability:40 },
  { id:'LANE_056', stars:['230029','230055'], type:'normal', period:2, stability:60 },
  { id:'LANE_057', stars:['230030','230058'], type:'normal', period:1, stability:85 },
  { id:'LANE_058', stars:['230031','230058'], type:'normal', period:1, stability:85 },
  { id:'LANE_059', stars:['230032','230050'], type:'normal', period:1, stability:70 },
  { id:'LANE_060', stars:['230032','230058'], type:'normal', period:1, stability:85 },
  { id:'LANE_061', stars:['230033','230034'], type:'normal', period:2, stability:70 },
  { id:'LANE_062', stars:['230033','230055'], type:'normal', period:2, stability:70 },
  { id:'LANE_063', stars:['230035','230040'], type:'normal', period:1, stability:60 },
  { id:'LANE_064', stars:['230035','230058'], type:'normal', period:1, stability:85 },
  { id:'LANE_065', stars:['230039','230058'], type:'normal', period:1, stability:85 },
  { id:'LANE_066', stars:['230045','230049'], type:'normal', period:2, stability:60 },
  { id:'LANE_067', stars:['230046','230049'], type:'normal', period:1, stability:70 },
  { id:'LANE_068', stars:['230046','230057'], type:'normal', period:1, stability:60 },
  { id:'LANE_069', stars:['230049','230053'], type:'normal', period:2, stability:70 },
  { id:'LANE_070', stars:['230053','230060'], type:'normal', period:1, stability:40 },
  { id:'LANE_071', stars:['230056','230059'], type:'normal', period:2, stability:60 },
  { id:'LANE_072', stars:['230058','230062'], type:'normal', period:1, stability:85 },

  // ── 고립 성계 연결 (수기 수정) ─────────────────────────────────────────────
  // 230004 아레스하임 (390,155) — 회랑 인근 분쟁 성계
  { id:'LANE_073', stars:['230004','230003'], type:'normal',   period:1, stability:45 },
  { id:'LANE_074', stars:['230004','230012'], type:'normal',   period:2, stability:50 },

  // 230007 바라투르프 (200,380) — 동맹 남방 중립
  { id:'LANE_075', stars:['230007','230046'], type:'normal',   period:1, stability:60 },
  { id:'LANE_076', stars:['230007','230053'], type:'normal',   period:2, stability:55 },

  // 230018 파이어져드 (290,440) — 페잔 서방 중립
  { id:'LANE_077', stars:['230018','230044'], type:'normal',   period:1, stability:55 },
  { id:'LANE_078', stars:['230018','230043'], type:'normal',   period:1, stability:50 },
  { id:'LANE_079', stars:['230018','230041'], type:'normal',   period:1, stability:55 },

  // 230021 하안 (450,430) — 페잔 남동방 중립
  { id:'LANE_080', stars:['230021','230042'], type:'phezzan',  period:3, stability:65 },
  { id:'LANE_081', stars:['230021','230054'], type:'normal',   period:1, stability:55 },

  // 230036 뤼카스 성역 (95,345) — 동맹 서부
  { id:'LANE_082', stars:['230036','230016'], type:'normal',   period:1, stability:60 },
  { id:'LANE_083', stars:['230036','230046'], type:'normal',   period:1, stability:60 },

  // 230038 마르바흐 (595,170) — 제국 농업 성계
  { id:'LANE_084', stars:['230038','230014'], type:'normal',   period:1, stability:70 },
  { id:'LANE_085', stars:['230038','230030'], type:'normal',   period:1, stability:70 },

  // 230044 포르겐 (260,410) — 동맹 남방 중립
  { id:'LANE_086', stars:['230044','230045'], type:'normal',   period:1, stability:55 },
];
