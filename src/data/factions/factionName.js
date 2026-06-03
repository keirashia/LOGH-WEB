// ================================================================
//  factionName.js — 세력 다국어 이름
//  경로: src/data/factions/factionName.js
//  작성: 2026-06-03
//  순서: factionsData.js 기준
// ================================================================
// factionId : factionsData.js의 id 값
// lang      : "Kr" | "En" | "Jp"
// name      : 풀네임
// shortName : 게임 내 짧은 표기

export const FACTION_NAMES = [

  // ── AD 시대 ────────────────────────────────────────────────

  // 북방연합국가 (NOC)
  { factionId: 'NOC', lang: 'Kr', name: '북방연합국가',  shortName: '북방연합'   },
  { factionId: 'NOC', lang: 'En', name: 'Northern Condominium',       shortName: 'N.Condominium'   },
  { factionId: 'NOC', lang: 'Jp', name: 'ノーザン・コンドミニアム',  shortName: 'N.コンドミニアム' },

  // 3대륙 합중국 (USE)
  { factionId: 'USE', lang: 'Kr', name: '3대륙 합중국',  shortName: '합중국'     },
  { factionId: 'USE', lang: 'En', name: 'United States of Eurafrica', shortName: 'USE'            },
  { factionId: 'USE', lang: 'Jp', name: 'ユナイテッド・ステーツ・オブ・ユーラブリカ', shortName: 'ユーラブリカ' },

  // 지구통일정부 (GBG)
  { factionId: 'GBG', lang: 'Kr', name: '지구통일정부',  shortName: '통일정부'   },
  { factionId: 'GBG', lang: 'En', name: 'Global Government',          shortName: 'Global Gov.'    },
  { factionId: 'GBG', lang: 'Jp', name: '地球統一政府',  shortName: '統一政府'   },

  // 시리우스 성계 정부 (SIR)
  { factionId: 'SIR', lang: 'Kr', name: '시리우스 성계 정부', shortName: '시리우스'  },
  { factionId: 'SIR', lang: 'En', name: 'Sirius Star System Government', shortName: 'Sirius Gov.'  },
  { factionId: 'SIR', lang: 'Jp', name: 'シリウス星系政府',   shortName: 'シリウス'  },

  // 은하연방 (GAF)
  { factionId: 'GAF', lang: 'Kr', name: '은하연방',          shortName: '은하연방'  },
  { factionId: 'GAF', lang: 'En', name: 'Galactic Federation',         shortName: 'G.Federation'   },
  { factionId: 'GAF', lang: 'Jp', name: '銀河連邦',          shortName: '銀河連邦'  },

  // ── RC / SE 시대 ───────────────────────────────────────────

  // 은하제국 골덴바움 왕조 (REH)
  { factionId: 'REH', lang: 'Kr', name: '은하제국',       shortName: '제국'      },
  { factionId: 'REH', lang: 'En', name: 'Galactic Empire',             shortName: 'Empire'         },
  { factionId: 'REH', lang: 'Jp', name: '銀河帝国',       shortName: '帝国'      },

  // 립슈타트 귀족연합 (LIP)
  { factionId: 'LIP', lang: 'Kr', name: '립슈타트 귀족연합', shortName: '립슈타트' },
  { factionId: 'LIP', lang: 'En', name: 'Lippstadtische Liga',         shortName: 'Liga'           },
  { factionId: 'LIP', lang: 'Jp', name: 'リップシュタット連盟', shortName: 'リップシュタット' },

  // 은하제국 정통정부 (LGT — TODO: id 미정, 임시)
  { factionId: 'LGT', lang: 'Kr', name: '은하제국 정통정부', shortName: '정통정부' },
  { factionId: 'LGT', lang: 'En', name: 'Galactic Empire (Legitimität)', shortName: 'Legitimität'  },
  { factionId: 'LGT', lang: 'Jp', name: '銀河帝国正統政府', shortName: '正統政府' },

  // 은하제국 로엔그람 왕조 (NRH)
  { factionId: 'NRH', lang: 'Kr', name: '은하제국 로엔그람 왕조', shortName: '로엔그람' },
  { factionId: 'NRH', lang: 'En', name: 'Galactic Empire (Lohengramm-Dynastie)', shortName: 'Lohengramm' },
  { factionId: 'NRH', lang: 'Jp', name: '銀河帝国ローエングラム王朝', shortName: 'ローエングラム' },

  // 자유행성동맹 (FPA)
  { factionId: 'FPA', lang: 'Kr', name: '자유행성동맹',   shortName: '동맹'      },
  { factionId: 'FPA', lang: 'En', name: 'Free Planets Alliance',       shortName: 'Alliance'       },
  { factionId: 'FPA', lang: 'Jp', name: '自由惑星同盟',   shortName: '同盟'      },

  // 구국군사회의 (SMC)
  { factionId: 'SMC', lang: 'Kr', name: '구국군사회의',   shortName: '구국회의'  },
  { factionId: 'SMC', lang: 'En', name: 'National Salvation Military Council', shortName: 'NSMC'   },
  { factionId: 'SMC', lang: 'Jp', name: '救国軍事会議',   shortName: '救国会議'  },

  // 엘 파실 독립정부 (TODO: id 미정 — factionId 확정 후 수정)
  { factionId: '', lang: 'Kr', name: '엘 파실 독립정부',  shortName: '엘 파실'   },
  { factionId: '', lang: 'En', name: 'El Facil Independent Government', shortName: 'El Facil'      },
  { factionId: '', lang: 'Jp', name: 'エル・ファシル独立政府', shortName: 'エル・ファシル' },

  // 이제르론 공화정부 (TODO: id 미정 — factionId 확정 후 수정)
  { factionId: '', lang: 'Kr', name: '이제르론 공화정부', shortName: '이제르론'  },
  { factionId: '', lang: 'En', name: 'Iserlohn Republic',               shortName: 'Iserlohn Rep.'  },
  { factionId: '', lang: 'Jp', name: 'イゼルローン共和政府', shortName: 'イゼルローン' },

  // 바라트 성계 자치령 (TODO: id 미정 — factionId 확정 후 수정)
  { factionId: '', lang: 'Kr', name: '바라트 성계 자치령', shortName: '바라트'   },
  { factionId: '', lang: 'En', name: 'Baarat Autonomous Region',        shortName: 'Baarat'         },
  { factionId: '', lang: 'Jp', name: 'バーラト星系自治領', shortName: 'バーラト' },

  // 페잔 자치령 (PZN)
  { factionId: 'PZN', lang: 'Kr', name: '페잔 자치령',    shortName: '페잔'      },
  { factionId: 'PZN', lang: 'En', name: 'Phezzan Dominion',             shortName: 'Phezzan'        },
  { factionId: 'PZN', lang: 'Jp', name: 'フェザーン自治領', shortName: 'フェザーン' },

  // 지구교 (EAT)
  { factionId: 'EAT', lang: 'Kr', name: '지구교',         shortName: '지구교'    },
  { factionId: 'EAT', lang: 'En', name: 'Earth Cult',                   shortName: 'Earth Cult'     },
  { factionId: 'EAT', lang: 'Jp', name: '地球教',         shortName: '地球教'    },

  // ── factionsData.js 미등록 ────────────────────────────────

  // 라그랑그룹 (RAG)
  { factionId: 'RAG', lang: 'Kr', name: '라그랑그룹',     shortName: '라그랑'    },
  { factionId: 'RAG', lang: 'En', name: 'Lagrange Group',               shortName: 'Lagrange'       },
  { factionId: 'RAG', lang: 'Jp', name: 'ラグランスグループ', shortName: 'ラグラン' },

]
