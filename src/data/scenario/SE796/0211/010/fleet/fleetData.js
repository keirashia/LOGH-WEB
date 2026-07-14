// ================================================================
//  fleetData.js
//  경로: src/data/scenario/SE796/0211/010/fleet/fleetData.js
//  시나리오: SE796 아스타테 회전 (01)
//  작성: 2026-06-08
//  수정: 2026-07-02 — charList/shipList 통합 스키마 전환, fltCode 6자리화
//
//  fltName  : [{ code, context }] — 다국어 함대명 (context = 함대 고유명칭)
//  location : 함대 현재 위치 (locCode, locPos, direction)
//  charList : 이 함대 소속 인물 목록 (type: C=사령관/O=부관/S=분함대 사령관)
//  shipList : 이 함대 함선 구성 (fltCode는 조인 키, type: F=기함/U=일반함선)
//  formationList : 보유 방진 목록 (현재 사용 방진 포함)
// ================================================================
export const FLEET_DATA = [
  // ── 자유행성동맹 (FPA) ───────────────────────────────────────
// 1 쿠브르슬리
// 2 파에타
// 3 르페브르
// 4 파스톨레
// 5 알렉산드르 뷰코크
// 6 무어
// 7 호우드
// 8 애플턴
// 9 알 살렘
// 10 우란푸
// 11 루글랑주
// 12 보로딘

  // 사령관 쿠브르슬리
  {
    fltCode: "FPA001",
    faction: "FPA",
    fltNum: "001",
    fltName: [{ code: "Kr", context: "제1함대" }],
    parentFlt: null,
    charList: [
      {
        charCode: "CH_000443",  // 쿠브르슬리
        type: "C",
        stDate: "0",
        proactive: 100,
      },
    ],
    shipList: [
      {
        fltCode: "FPA001",
        shipIndex: 1,
        type: "F",
        shipCode: "",
        shipAmt: 15000,
      },
    ],
    location: {
      locCode: "230006",
      locPos: { x: 527, y: 775 },
      direction: 12,
    },
    formationList: [
      { ffCode: "FF_01", useYn: true },
    ],
    stratageList: [],
  },

  // 사령관 파에타 / 부관 양 웬리(전략고문), 아텐보로, 라오
  // 시나리오 시작 시점에 이미 아스타테(230005)에서 REH004(로엔그람 함대)와 조우한 상태로 배치 (2026-07-05 결정)
  {
    fltCode: "FPA002",
    faction: "FPA",
    fltNum: "002",
    fltName: [{ code: "Kr", context: "제2함대" }],
    parentFlt: null,
    charList: [
      {
        charCode: "CH_000479",  // 파에타
        type: "C",
        stDate: "0",
        proactive: 100,
      },
      {
        charCode: "CH_000266",  // 양 웬리
        type: "O",
        stDate: "0",
        proactive: 50,
      },
      {
        charCode: "CH_000043",  // 아텐보로
        type: "O",
        stDate: "0",
        proactive: 50,
      },
      {
        charCode: "CH_000060",  // 라오
        type: "O",
        stDate: "0",
        proactive: 50,
      },
      {
        charCode: "CH_000320",  // 올리비에 포플랭
        type: "O",
        stDate: "0",
        proactive: 50,
      },
      {
        charCode: "CH_000355",  // 이반 코네프
        type: "O",
        stDate: "0",
        proactive: 50,
      },
    ],
    shipList: [
      {
        fltCode: "FPA002",
        shipIndex: 1,
        type: "F",
        shipCode: "",
        shipAmt: 15000,
      },
    ],
    location: {
      locCode: "230005",
      locPos: { x: 259, y: 161 },
      direction: 12,
    },
    formationList: [
      { ffCode: "FF_01", useYn: true },
    ],
    stratageList: [],
  },

  // 사령관 르페브르
  {
    fltCode: "FPA003",
    faction: "FPA",
    fltNum: "003",
    fltName: [{ code: "Kr", context: "제3함대" }],
    parentFlt: null,
    charList: [
      {
        charCode: "CH_000574",  // 르페브르
        type: "C",
        stDate: "0",
        proactive: 100,
      },
    ],
    shipList: [
      {
        fltCode: "FPA003",
        shipIndex: 1,
        type: "F",
        shipCode: "",
        shipAmt: 15000,
      },
    ],
    location: {
      locCode: "230006",
      locPos: { x: 527, y: 775 },
      direction: 12,
    },
    formationList: [
      { ffCode: "FF_01", useYn: true },
    ],
    stratageList: [],
  },

  // 사령관 파스톨레 / 부관 피셔
  {
    fltCode: "FPA004",
    faction: "FPA",
    fltNum: "004",
    fltName: [{ code: "Kr", context: "제4함대" }],
    parentFlt: null,
    charList: [
      {
        charCode: "CH_000478",  // 파스톨레
        type: "C",
        stDate: "0",
        proactive: 100,
      },
      {
        charCode: "CH_000270",  // 피셔
        type: "O",
        stDate: "0",
        proactive: 50,
      },
    ],
    shipList: [
      {
        fltCode: "FPA004",
        shipIndex: 1,
        type: "F",
        shipCode: "",
        shipAmt: 15000,
      },
    ],
    location: {
      locCode: "230005",        // 아스타테
      locPos: { x: 194, y: 58 },
      direction: 12,
    },
    formationList: [
      { ffCode: "FF_01", useYn: true },
    ],
    stratageList: [],
  },

  // 사령관 뷰코크 / 부관 파이펠
  {
    fltCode: "FPA005",
    faction: "FPA",
    fltNum: "005",
    fltName: [{ code: "Kr", context: "제5함대" }],
    parentFlt: null,
    charList: [
      {
        charCode: "CH_000254",  // 뷰코크
        type: "C",
        stDate: "0",
        proactive: 100,
      },
      {
        charCode: "CH_000483",  // 파이펠
        type: "O",
        stDate: "0",
        proactive: 50,
      },
    ],
    shipList: [
      {
        fltCode: "FPA005",
        shipIndex: 1,
        type: "F",
        shipCode: "",
        shipAmt: 15000,
      },
    ],
    location: {
      locCode: "230006",
      locPos: { x: 527, y: 775 },
      direction: 12,
    },
    formationList: [
      { ffCode: "FF_01", useYn: true },
    ],
    stratageList: [],
  },

  // 사령관 무어 / 부관 랍
  {
    fltCode: "FPA006",
    faction: "FPA",
    fltNum: "006",
    fltName: [{ code: "Kr", context: "제6함대" }],
    parentFlt: null,
    charList: [
      {
        charCode: "CH_000139",  // 무어
        type: "C",
        stDate: "0",
        proactive: 100,
      },
      {
        charCode: "CH_000368",  // 장 로베르 랍
        type: "O",
        stDate: "0",
        proactive: 50,
      },
    ],
    shipList: [
      {
        fltCode: "FPA006",
        shipIndex: 1,
        type: "F",
        shipCode: "",
        shipAmt: 15000,
      },
    ],
    location: {
      locCode: "230005",        // 아스타테
      locPos: { x: 152, y: 78 },
      direction: 12,
    },
    formationList: [
      { ffCode: "FF_01", useYn: true },
    ],
    stratageList: [],
  },

  // 사령관 호우드
  {
    fltCode: "FPA007",
    faction: "FPA",
    fltNum: "007",
    fltName: [{ code: "Kr", context: "제7함대" }],
    parentFlt: null,
    charList: [
      {
        charCode: "CH_000550",  // 호우드
        type: "C",
        stDate: "0",
        proactive: 100,
      },
    ],
    shipList: [
      {
        fltCode: "FPA007",
        shipIndex: 1,
        type: "F",
        shipCode: "",
        shipAmt: 15000,
      },
    ],
    location: {
      locCode: "230006",
      locPos: { x: 527, y: 775 },
      direction: 12,
    },
    formationList: [
      { ffCode: "FF_01", useYn: true },
    ],
    stratageList: [],
  },

  // 사령관 애플턴
  {
    fltCode: "FPA008",
    faction: "FPA",
    fltNum: "008",
    fltName: [{ code: "Kr", context: "제8함대" }],
    parentFlt: null,
    charList: [
      {
        charCode: "CH_000262",  // 애플턴
        type: "C",
        stDate: "0",
        proactive: 100,
      },
    ],
    shipList: [
      {
        fltCode: "FPA008",
        shipIndex: 1,
        type: "F",
        shipCode: "",
        shipAmt: 15000,
      },
    ],
    location: {
      locCode: "230006",
      locPos: { x: 527, y: 775 },
      direction: 12,
    },
    formationList: [
      { ffCode: "FF_01", useYn: true },
    ],
    stratageList: [],
  },

  // 사령관 알 살렘
  {
    fltCode: "FPA009",
    faction: "FPA",
    fltNum: "009",
    fltName: [{ code: "Kr", context: "제9함대" }],
    parentFlt: null,
    charList: [
      {
        charCode: "CH_000251",  // 알 살렘
        type: "C",
        stDate: "0",
        proactive: 100,
      },
    ],
    shipList: [
      {
        fltCode: "FPA009",
        shipIndex: 1,
        type: "F",
        shipCode: "",
        shipAmt: 15000,
      },
    ],
    location: {
      locCode: "230006",
      locPos: { x: 527, y: 775 },
      direction: 12,
    },
    formationList: [
      { ffCode: "FF_01", useYn: true },
    ],
    stratageList: [],
  },

  // 사령관 우란푸
  {
    fltCode: "FPA010",
    faction: "FPA",
    fltNum: "010",
    fltName: [{ code: "Kr", context: "제10함대" }],
    parentFlt: null,
    charList: [
      {
        charCode: "CH_000333",  // 우란푸
        type: "C",
        stDate: "0",
        proactive: 100,
      },
    ],
    shipList: [
      {
        fltCode: "FPA010",
        shipIndex: 1,
        type: "F",
        shipCode: "",
        shipAmt: 15000,
      },
    ],
    location: {
      locCode: "230006",
      locPos: { x: 527, y: 775 },
      direction: 12,
    },
    formationList: [
      { ffCode: "FF_01", useYn: true },
    ],
    stratageList: [],
  },

  // 사령관 루글랑주
  {
    fltCode: "FPA011",
    faction: "FPA",
    fltNum: "011",
    fltName: [{ code: "Kr", context: "제11함대" }],
    parentFlt: null,
    charList: [
      {
        charCode: "CH_000088",  // 루글랑주
        type: "C",
        stDate: "0",
        proactive: 100,
      },
    ],
    shipList: [
      {
        fltCode: "FPA011",
        shipIndex: 1,
        type: "F",
        shipCode: "",
        shipAmt: 15000,
      },
    ],
    location: {
      locCode: "230006",
      locPos: { x: 527, y: 775 },
      direction: 12,
    },
    formationList: [
      { ffCode: "FF_01", useYn: true },
    ],
    stratageList: [],
  },

  // 사령관 보로딘
  {
    fltCode: "FPA012",
    faction: "FPA",
    fltNum: "012",
    fltName: [{ code: "Kr", context: "제12함대" }],
    parentFlt: null,
    charList: [
      {
        charCode: "CH_000169",  // 보로딘
        type: "C",
        stDate: "0",
        proactive: 100,
      },
    ],
    shipList: [
      {
        fltCode: "FPA012",
        shipIndex: 1,
        type: "F",
        shipCode: "",
        shipAmt: 15000,
      },
    ],
    location: {
      locCode: "230006",
      locPos: { x: 527, y: 775 },
      direction: 12,
    },
    formationList: [
      { ffCode: "FF_01", useYn: true },
    ],
    stratageList: [],
  },

  // ── 은하제국 (REH) ───────────────────────────────────────────
  // 이제르론 주둔함대

  
  // 함대 - 로엔그람 (총사령관 라인하르트 폰 뮤젤 / 부관 키르히아이스)
  {
    fltCode: "REH004",
    faction: "REH",
    fltNum: "004",
    fltName: [{ code: "Kr", context: "로엔그람 함대" }],
    parentFlt: null,
    charList: [
      {
        charCode: "CH_000064",  // 라인하르트 폰 뮤젤
        type: "C",
        stDate: "0",
        proactive: 100,
      },
      {
        charCode: "CH_000388",  // 지크프리트 키르히아이스
        type: "O",
        stDate: "0",
        proactive: 50,
      },
    ],
    shipList: [
      {
        fltCode: "REH004",
        shipIndex: 1,
        type: "F",
        shipCode: "",
        shipAmt: 4000,
      },
    ],
    location: {
      locCode: "230005",        // 아스타테 (회전 발발 성계)
      locPos: { x: 194, y: 71 },
      direction: 12,
    },
    formationList: [
      { ffCode: "FF_01", useYn: true },
    ],
    stratageList: [],
  },

  // 분함대 - 메르카츠 (키르히아이스는 REH004 소속이므로 중복 제거)
  {
    fltCode: "REH041",
    faction: "REH",
    fltNum: "002",
    fltName: [{ code: "Kr", context: "메르카츠 분함대" }],
    parentFlt: "REH004",
    charList: [
      {
        charCode: "CH_000195",  // 메르카츠
        type: "S",
        stDate: "0",
        proactive: 100,
      },
    ],
    shipList: [
      {
        fltCode: "REH041",
        shipIndex: 1,
        type: "F",
        shipCode: "",
        shipAmt: 4000,
      },
    ],
    formationList: [
      { ffCode: "FF_01", useYn: true },
    ],
    stratageList: [],
  },

  // 분함대 — 슈타덴
  {
    fltCode: "REH042",
    faction: "REH",
    fltNum: "003",
    fltName: [{ code: "Kr", context: "슈타덴 분함대" }],
    parentFlt: "REH004",
    charList: [
      {
        charCode: "CH_000223",  // 슈타덴
        type: "S",
        stDate: "0",
        proactive: 100,
      },
    ],
    shipList: [
      {
        fltCode: "REH042",
        shipIndex: 1,
        type: "F",
        shipCode: "",
        shipAmt: 4000,
      },
    ],
    formationList: [
      { ffCode: "FF_01", useYn: true },
    ],
    stratageList: [],
  },

  // 분함대 — 파렌하이트
  {
    fltCode: "REH043",
    faction: "REH",
    fltNum: "004",
    fltName: [{ code: "Kr", context: "파렌하이트 분함대" }],
    parentFlt: "REH004",
    charList: [
      {
        charCode: "CH_000233",  // 파렌하이트
        type: "S",
        stDate: "0",
        proactive: 100,
      },
    ],
    shipList: [
      {
        fltCode: "REH043",
        shipIndex: 1,
        type: "F",
        shipCode: "",
        shipAmt: 4000,
      },
    ],
    formationList: [
      { ffCode: "FF_01", useYn: true },
    ],
    stratageList: [],
  },

  // 분함대 — 에를라흐
  {
    fltCode: "REH044",
    faction: "REH",
    fltNum: "005",
    fltName: [{ code: "Kr", context: "에를라흐 분함대" }],
    parentFlt: "REH004",
    charList: [
      {
        charCode: "CH_000290",  // 에를라흐
        type: "S",
        stDate: "0",
        proactive: 100,
      },
    ],
    shipList: [
      {
        fltCode: "REH044",
        shipIndex: 1,
        type: "F",
        shipCode: "",
        shipAmt: 4000,
      },
    ],
    formationList: [
      { ffCode: "FF_01", useYn: true },
    ],
    stratageList: [],
  },

  // 분함대 — 포겔
  {
    fltCode: "REH045",
    faction: "REH",
    fltNum: "006",
    fltName: [{ code: "Kr", context: "포겔 분함대" }],
    parentFlt: "REH004",
    charList: [
      {
        charCode: "CH_000494",  // 포겔
        type: "S",
        stDate: "0",
        proactive: 100,
      },
    ],
    shipList: [
      {
        fltCode: "REH045",
        shipIndex: 1,
        type: "F",
        shipCode: "",
        shipAmt: 4000,
      },
    ],
    formationList: [
      { ffCode: "FF_01", useYn: true },
    ],
    stratageList: [],
  },

];

export const FLEET_MAP = Object.fromEntries(
  FLEET_DATA.map((f) => [f.fltCode, f])
);
