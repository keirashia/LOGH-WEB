// ================================================================
//  flagshipData.js — 기함 제원 마스터 데이터
//  경로: src/data/fleet/flagshipData.js
//  작성: 2026-06-10
//  출처: Gineipaedia (gineipaedia.com)
// ================================================================
// shipCode:  FS_${NAME}
// shipType:  command_battleship
// faction:   REH(제국) | FPA(동맹)
// length / width / height : 미터
// crew:      승무원 수
// ucFrom:    취역 UC 연도
// ucTo:      퇴역/격침 UC 연도 (운용 중이면 null)
// status:    active | decommissioned | destroyed
// weapons[]:
//   wType   : beam | electron_beam | railgun | missile | laser | fighter
//   caliber : cm (null = 불명)
//   count   : 문/기
//   pos     : fwd(전방) | side(좌우현 합산) | port(좌현) | stbd(우현) | lnc(발사기)
// ================================================================

export const FLAGSHIP_DATA = [

  // ────────────────────────────────────────────────────────────
  //  제국 (REH)
  // ────────────────────────────────────────────────────────────

  // ref: https://gineipaedia.com/wiki/Br%C3%BCnhild
  {
    shipCode: "FS_BRUNHILD",
    faction: "REH",
    shipType: "command_battleship",
    name: [
      { code: "Kr", context: "브륀힐트" },
      { code: "En", context: "Brünhild" },
      { code: "Jp", context: "ブリュンヒルト" },
    ],
    length: 1007,
    width: 264,
    height: 273,
    crew: 1171,
    ucFrom: 795,
    ucTo: 801,
    status: "decommissioned",
    commander: "CH_000064", // 라인하르트 폰 로엔그람
    weapons: [
      { wType: "beam",         name: "25cm 중성자 빔포", caliber: 25,  count: 16, pos: "fwd"  },
      { wType: "railgun",      name: "12cm 레일건",      caliber: 12,  count: 8,  pos: "mix"  },
      { wType: "electron_beam",name: "6cm 전자 빔포",    caliber: 6,   count: 8,  pos: "mix"  },
      { wType: "missile",      name: "미사일 발사기",    caliber: null, count: null, pos: "lnc" },
      { wType: "laser",        name: "레이저",           caliber: null, count: null, pos: "mix" },
    ],
    armor: {
      note: "빔 편향·확산 특수 장갑 코팅, 실험적 프로토타입 — 대량생산 비용 무시 설계",
    },
    note: "라인하르트 함대 기함. 새로운 장갑 이론 기반 특수 코팅 탑재. 라인하르트 사망 후 운용 해제.",
  },

  // ref: https://gineipaedia.com/wiki/Barbarossa
  {
    shipCode: "FS_BARBAROSSA",
    faction: "REH",
    shipType: "command_battleship",
    name: [
      { code: "Kr", context: "바르바로사" },
      { code: "En", context: "Barbarossa" },
      { code: "Jp", context: "バルバロッサ" },
    ],
    length: 986,
    width: 257,
    height: 231,
    crew: 945,
    ucFrom: null,
    ucTo: 797,
    status: "decommissioned",
    commander: "CH_000388", // 지크프리트 키르히아이스
    weapons: [
      { wType: "beam", name: "전방 대형 빔포", caliber: null, count: 6,  pos: "fwd"  },
      { wType: "beam", name: "측면 포",        caliber: null, count: 42, pos: "side" }, // 좌21 + 우21
    ],
    armor: null,
    note: "키르히아이스 함대 기함. 실험적 설계, 신형 입자 가속기 기술 + 향상된 기동성. 797 UC 오딘 영구 정박 기념함으로 보존.",
  },

  // ref: https://gineipaedia.com/wiki/Beowulf
  {
    shipCode: "FS_BEOWULF",
    faction: "REH",
    shipType: "command_battleship",
    name: [
      { code: "Kr", context: "비오울프" },
      { code: "En", context: "Beowulf" },
      { code: "Jp", context: "人狼" },
    ],
    length: 988,
    width: 242,
    height: 248,
    crew: 954,
    ucFrom: null,
    ucTo: null,
    status: "active",
    commander: null, // 미터마이어 (charCode 미입력)
    weapons: [
      { wType: "beam", name: "전방 포탑", caliber: null, count: 6,  pos: "fwd"  },
      { wType: "beam", name: "측면 포탑", caliber: null, count: 40, pos: "side" }, // 좌20 + 우20
    ],
    armor: null,
    note: "미터마이어 함대 기함. 직선적 함체 라인. 트리스탄과 유사 설계, 함미 폐열 처리용 레이저 시스템 탑재.",
  },

  // ref: https://gineipaedia.com/wiki/Tristan
  {
    shipCode: "FS_TRISTAN",
    faction: "REH",
    shipType: "command_battleship",
    name: [
      { code: "Kr", context: "트리스탄" },
      { code: "En", context: "Tristan" },
      { code: "Jp", context: "トリスタン" },
    ],
    length: 979,
    width: 242,
    height: 235,
    crew: 944,
    ucFrom: 796,
    ucTo: 800,
    status: "decommissioned",
    commander: null, // 로이엔탈 (charCode 미입력)
    weapons: [
      { wType: "beam", name: "측면 전방 포탑", caliber: null, count: 26, pos: "side" }, // 포트13 + 스타보드13
    ],
    armor: {
      note: "브륀힐트와 동일한 첨단 곡선 장갑 원리 + 지향성 전자기장 빔 공격 소산",
    },
    note: "로이엔탈 함대 기함. 비오울프와 유사 설계이나 함수 전방 포 없음, 측면 전방포 의존. 800 UC 퇴역.",
  },

  // ────────────────────────────────────────────────────────────
  //  동맹 (FPA)
  // ────────────────────────────────────────────────────────────

  // ref: https://gineipaedia.com/wiki/Hyperion
  {
    shipCode: "FS_HYPERION",
    faction: "FPA",
    shipType: "command_battleship",
    name: [
      { code: "Kr", context: "히페리온" },
      { code: "En", context: "Hyperion" },
      { code: "Jp", context: "ヒューベリオン" },
    ],
    length: 911,
    width: 70,
    height: 284,
    crew: 915,
    pennant: "144M",
    ucFrom: 796,
    ucTo: 801,
    status: "destroyed",
    commander: "CH_000266", // 양 웬리
    weapons: [
      { wType: "beam",    name: "전방 포",    caliber: null, count: 32, pos: "fwd"  },
      { wType: "beam",    name: "측면 포",    caliber: null, count: 80, pos: "side" }, // 좌40 + 우40
      { wType: "fighter", name: "스파르타니안", caliber: null, count: 24, pos: null  },
    ],
    armor: null,
    note: "양 웬리 함대 기함. 796 UC 취역. 801 UC 6월 1일 시바 전투에서 격침. 이후 메르카츠 지휘.",
  },

  // ref: https://gineipaedia.com/wiki/Leonidas
  {
    shipCode: "FS_LEONIDAS",
    faction: "FPA",
    shipType: "command_battleship",
    name: [
      { code: "Kr", context: "레오니다스" },
      { code: "En", context: "Leonidas" },
      { code: "Jp", context: "レオニダス" },
    ],
    length: 1159,
    width: 72,
    height: 358,
    crew: 1226,
    pennant: "401",
    ucFrom: null,
    ucTo: 796,
    status: "destroyed",
    commander: "CH_000478", // 파스톨레
    weapons: [
      { wType: "beam", name: "전방 포", caliber: null, count: 40, pos: "fwd"  },
      { wType: "beam", name: "측면 포", caliber: null, count: 134, pos: "side" }, // 좌67 + 우67
    ],
    armor: null,
    note: "파스톨레 제4함대 기함. 아약스급. 796 UC 아스타테 회전에서 함교 피격 격침, 파스톨레 전사.",
  },

  // ref: https://gineipaedia.com/wiki/Leonidas_II
  {
    shipCode: "FS_LEONIDAS_II",
    faction: "FPA",
    shipType: "command_battleship",
    name: [
      { code: "Kr", context: "레오니다스 II" },
      { code: "En", context: "Leonidas II" },
      { code: "Jp", context: "レオニダスII" },
    ],
    length: 1159,
    width: 72,
    height: 358,
    crew: 1226,
    ucFrom: null,
    ucTo: 797,
    status: "destroyed",
    commander: null, // 르그랑주 (charCode 미입력)
    weapons: [
      { wType: "beam", name: "전방 포", caliber: null, count: 40,  pos: "fwd"  },
      { wType: "beam", name: "측면 포", caliber: null, count: 130, pos: "side" }, // 좌65 + 우65
    ],
    armor: null,
    note: "르그랑주 제11함대 기함. 아약스급. 제3차 티아마트 해전 이후 취역. 797 UC 도리아 성역 해전에서 격침.",
  },

]

export const FLAGSHIP_MAP = Object.fromEntries(
  FLAGSHIP_DATA.map(s => [s.shipCode, s])
)
