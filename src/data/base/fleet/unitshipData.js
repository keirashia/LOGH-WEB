// ================================================================
//  unitshipData.js — 일반 함선 제원 마스터 데이터
//  경로: src/data/fleet/unitshipData.js
//  작성: 2026-06-10
//  출처: Gineipaedia (gineipaedia.com) 788 UC era 기준
// ================================================================
// shipCode:  US_${faction}_${typeCode}
//   faction  : REH(제국) | FPA(동맹) | PZN(페잔)
//   typeCode : BS(전함) | FB(고속전함) | CR(순양함) | DS(구축함)
//              CV(항공모함) | TR(수송함)
// shipType:  battleship | fast_battleship | cruiser | destroyer | carrier | transport
// era:       UC(우주력) 연대 기준
// length / width / height : 미터
// crew:      승무원 수
// weapons[]:
//   wType   : beam | electron_beam | railgun | missile | laser | fighter | gunship
//   caliber : cm (null = 불명)
//   count   : 문/기/기
//   pos     : fwd(전방) | side(좌우현 합산) | port(좌현) | stbd(우현) | lnc(발사기) | mix(혼재)
// armor:
//   layers      : 장갑 층수
//   thickMain   : mm (함교·엔진)
//   thickSide   : mm (선체 측면 평균)
// canLandAtmo:  대기권 착륙 가능 여부
// cargoM3:      수송함 화물 용량 (㎥)
// ================================================================

export const UNIT_SHIP_DATA = [

  // ────────────────────────────────────────────────────────────
  //  제국 (REH)
  // ────────────────────────────────────────────────────────────

  // ref: https://gineipaedia.com/wiki/Imperial_battleship_(788_UC_era)
  {
    shipCode: "US_REH_BS",
    faction: "REH",
    shipType: "battleship",
    era: 788,
    name: [
      { code: "Kr", context: "제국 전함" },
      { code: "En", context: "Imperial Battleship (788 UC era)" },
      { code: "Jp", context: "帝国戦艦" },
    ],
    length: 677,
    width: 179,
    height: 228,
    crew: 726,
    weapons: [
      { wType: "beam",    name: "중성자 빔포",    caliber: null, count: 6,  pos: "fwd"  },
      { wType: "beam",    name: "측면 빔포",      caliber: null, count: 44, pos: "side" }, // 좌현22 + 우현22
      { wType: "missile", name: "미사일 런처",    caliber: null, count: 8,  pos: "lnc"  },
      { wType: "fighter", name: "발키리",         caliber: null, count: 48, pos: null   }, // 좌우 나셀 각 24기
    ],
    armor: {
      layers: 8,
      thickMain: 5000,
      thickSide: 750,
      note: "단결정 금속층 + 폼 세라믹층 교대 구조",
    },
    buildMonths: { min: 4, max: 6 },
    totalBuilt: 200000,
    canLandAtmo: true,
  },

  // ref: https://gineipaedia.com/wiki/Imperial_fast_battleship_(788_UC_era)
  {
    shipCode: "US_REH_FB",
    faction: "REH",
    shipType: "fast_battleship",
    era: 788,
    name: [
      { code: "Kr", context: "제국 고속전함" },
      { code: "En", context: "Imperial Fast Battleship (788 UC era)" },
      { code: "Jp", context: "帝国高速戦艦" },
    ],
    length: 712,
    width: 152,
    height: 219,
    crew: 745,
    weapons: [
      { wType: "beam",    name: "전방 주포 (대구경 장거리)",   caliber: null, count: 6,  pos: "fwd"  },
      { wType: "beam",    name: "전방 주포 (중구경 중단거리)", caliber: null, count: 6,  pos: "fwd"  },
      { wType: "beam",    name: "측면 빔포",                   caliber: null, count: 12, pos: "side" }, // 좌6 + 우6
      { wType: "fighter", name: "발키리",                      caliber: null, count: 6,  pos: null   }, // 좌우 각 3기
    ],
    armor: null,
    buildMonths: null,
    totalBuilt: null,
    canLandAtmo: null,
    note: "5기 엔진 탑재, 별도 원자로로 주포 지원",
  },

  // ref: https://gineipaedia.com/wiki/Imperial_cruiser_(788_UC_era)
  {
    shipCode: "US_REH_CR",
    faction: "REH",
    shipType: "cruiser",
    era: 788,
    name: [
      { code: "Kr", context: "제국 순양함" },
      { code: "En", context: "Imperial Cruiser (788 UC era)" },
      { code: "Jp", context: "帝国巡洋艦" },
    ],
    length: 576,
    width: 141,
    height: 144,
    crew: 670,
    weapons: [
      { wType: "beam",    name: "전방 중성자 빔포", caliber: null, count: 6,  pos: "fwd"  },
      { wType: "beam",    name: "측면 포",          caliber: null, count: 22, pos: "side" }, // 좌11 + 우11
      { wType: "missile", name: "미사일",            caliber: null, count: 2,  pos: "lnc"  },
      { wType: "fighter", name: "발키리",            caliber: null, count: 6,  pos: null   },
    ],
    armor: null,
    buildMonths: null,
    totalBuilt: null,
    canLandAtmo: null,
  },

  // ref: https://gineipaedia.com/wiki/Imperial_destroyer_(788_UC_era)
  {
    shipCode: "US_REH_DS",
    faction: "REH",
    shipType: "destroyer",
    era: 788,
    name: [
      { code: "Kr", context: "제국 구축함" },
      { code: "En", context: "Imperial Destroyer (788 UC era)" },
      { code: "Jp", context: "帝国駆逐艦" },
    ],
    length: 170,
    width: 38,
    height: 47,
    crew: 16,
    weapons: [
      { wType: "beam",    name: "전방 빔포",   caliber: null, count: 52, pos: "fwd" }, // 4셀 × 13문
      { wType: "missile", name: "미사일 런처", caliber: null, count: 26, pos: "lnc" },
      { wType: "fighter", name: "발키리",      caliber: null, count: 2,  pos: null  },
    ],
    armor: null,
    buildMonths: null,
    totalBuilt: null,
    canLandAtmo: null,
  },

  // ref: https://gineipaedia.com/wiki/Imperial_carrier_(788_UC_era)
  {
    shipCode: "US_REH_CV",
    faction: "REH",
    shipType: "carrier",
    era: 788,
    name: [
      { code: "Kr", context: "제국 항공모함" },
      { code: "En", context: "Imperial Carrier (788 UC era)" },
      { code: "Jp", context: "帝国空母" },
    ],
    length: 1110,
    width: 230,
    height: 320,
    crew: 1879,
    weapons: [
      { wType: "beam",    name: "빔 캐논 (단거리 저위력)", caliber: null, count: 16,  pos: "fwd" },
      { wType: "fighter", name: "발키리",                  caliber: null, count: 120, pos: null  },
      { wType: "gunship", name: "건십 (발키리 대체)",       caliber: null, count: 32,  pos: null  },
    ],
    armor: null,
    buildMonths: null,
    totalBuilt: null,
    canLandAtmo: null,
    note: "상부 대형 박스형 격납 모듈, 수송함급 엔진, 발키리 120기 or 건십 32대 선택 운용",
  },

  // ref: https://gineipaedia.com/wiki/Imperial_transport_(788_UC_era)
  {
    shipCode: "US_REH_TR",
    faction: "REH",
    shipType: "transport",
    era: 788,
    name: [
      { code: "Kr", context: "제국 수송함" },
      { code: "En", context: "Imperial Transport (788 UC era)" },
      { code: "Jp", context: "帝国輸送艦" },
    ],
    length: 968,
    width: 521,
    height: 537,
    crew: 36,
    weapons: [
      { wType: "beam", name: "소구경 빔포 (함수)", caliber: null, count: 12, pos: "fwd" },
    ],
    armor: null,
    buildMonths: null,
    totalBuilt: null,
    canLandAtmo: true,
    cargoM3: 160000000,
    note: "순양함 전체 수납 가능, 5.4G 화물 무손 가속, 300km 간격 연결 화물열차 형성 (수십 척 총 10,000km)",
  },

  // ────────────────────────────────────────────────────────────
  //  동맹 (FPA)
  // ────────────────────────────────────────────────────────────

  // ref: https://gineipaedia.com/wiki/Alliance_battleship_(788_UC_era)
  {
    shipCode: "US_FPA_BS",
    faction: "FPA",
    shipType: "battleship",
    era: 788,
    name: [
      { code: "Kr", context: "동맹 전함" },
      { code: "En", context: "Alliance Battleship (788 UC era)" },
      { code: "Jp", context: "同盟戦艦" },
    ],
    length: 624,
    width: 65,
    height: 136.5,
    crew: 660,
    weapons: [
      { wType: "beam",         name: "20cm 중성자 빔포", caliber: 20,  count: 8,  pos: "fwd"  },
      { wType: "electron_beam",name: "15cm 전자 빔포",   caliber: 15,  count: 22, pos: "side" },
      { wType: "railgun",      name: "12cm 레일건",      caliber: 12,  count: 6,  pos: "mix"  },
      { wType: "missile",      name: "미사일 런처",      caliber: null, count: 12, pos: "lnc" },
      { wType: "laser",        name: "레이저 (단장)",    caliber: null, count: 22, pos: "mix"  },
      { wType: "laser",        name: "레이저 (쌍장)",    caliber: null, count: 10, pos: "mix"  },
      { wType: "fighter",      name: "스파르타니안",     caliber: null, count: 12, pos: null   },
    ],
    armor: null,
    buildMonths: { min: 4, max: 6 },
    totalBuilt: 200000,
    canLandAtmo: false,
    note: "직사각형 박스형 함수, 단일 후부 엔진, 대기권 진입 불가",
  },

  // ref: https://gineipaedia.com/wiki/Alliance_cruiser_(788_UC_era)
  {
    shipCode: "US_FPA_CR",
    faction: "FPA",
    shipType: "cruiser",
    era: 788,
    name: [
      { code: "Kr", context: "동맹 순양함" },
      { code: "En", context: "Alliance Cruiser (788 UC era)" },
      { code: "Jp", context: "同盟巡洋艦" },
    ],
    length: 372,
    width: 94.5,
    height: 74,
    crew: 393,
    weapons: [
      { wType: "beam",    name: "12cm 중성자 빔포", caliber: 12, count: 6, pos: "fwd"  },
      { wType: "railgun", name: "4cm 레일건",       caliber: 4,  count: 2, pos: "mix"  },
      { wType: "missile", name: "미사일 런처",      caliber: null, count: 8, pos: "lnc" },
      { wType: "fighter", name: "스파르타니안",     caliber: null, count: 3, pos: null  },
    ],
    armor: null,
    buildMonths: { min: 1, max: 2 },
    totalBuilt: null,
    canLandAtmo: null,
    note: "표준 모듈형 부품 구성, 빠른 건조 속도",
  },

  // ref: https://gineipaedia.com/wiki/Alliance_destroyer_(788_UC_era)
  {
    shipCode: "US_FPA_DS",
    faction: "FPA",
    shipType: "destroyer",
    era: 788,
    name: [
      { code: "Kr", context: "동맹 구축함" },
      { code: "En", context: "Alliance Destroyer (788 UC era)" },
      { code: "Jp", context: "同盟駆逐艦" },
    ],
    length: 208,
    width: 44.5,
    height: 47,
    crew: 164,
    weapons: [
      { wType: "beam",    name: "전방 빔포",               caliber: null, count: 6,    pos: "fwd" },
      { wType: "missile", name: "미사일",                  caliber: null, count: null, pos: "lnc" },
      { wType: "laser",   name: "5.5cm 레이저 (근접방어)", caliber: 5.5,  count: 14,   pos: "mix" },
    ],
    armor: null,
    buildMonths: null,
    totalBuilt: null,
    canLandAtmo: null,
    note: "동급 최소 워프 가능 동맹함, 박스형 함수 + 단일 주 엔진",
  },

]

export const UNIT_SHIP_MAP = Object.fromEntries(
  UNIT_SHIP_DATA.map(s => [s.shipCode, s])
)
