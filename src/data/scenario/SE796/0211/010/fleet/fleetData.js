// ================================================================
//  fleetData.js
//  경로: src/data/scenario/SE796/0211/010/fleet/fleetData.js
//  시나리오: SE796 아스타테 회전 (01)
//  작성: 2026-06-08
//
//  fltName  : [{ code, context }] — 다국어 함대명 (context = 함대 고유명칭)
//  fltFullName : computed 대응 표시용 풀네임 (faction명 + context)
//  location : 함대 현재 위치 (locCode, locPos, direction)
//  stats    : 함대 능력치 (사령관 기준값, 부관 보정 별도 적용)
//  characterList : 이 함대 소속 인물 목록 (fleetCharacterData.js와 병행)
//  shipList      : 이 함대 함선 구성 (fleetShipData.js와 병행)
//  formationList : 보유 방진 목록 (현재 사용 방진 포함)
// ================================================================

export const FLEET_DATA = [

  // ── 자유행성동맹 (FPA) ───────────────────────────────────────
  // 사령관 쿠브르슬리
  {
    fltCode: "FPA0010",
    faction: "FPA",
    fltNum: "001",
    fltName: [{ code: "Kr", context: "제1함대" }],
    fltFullName: "자유행성동맹 제1함대",
    parentFlt: null,
    location: {
      locCode: "230006",        // 바라트 성계
      locPos: { x: 527, y: 775 }, // 하이네센 행성
      direction: 12,            // 현재 바라보고 있는 방향(시계 기준)
    },
    stats: {
      supply: 1000,
      moral: 100,
      statCmd: 83,
      statCsm: 75,
      statAtt: 70,
      statDef: 73,
      statFst: 64,
      statMng: 81,
      statInf: 72,
      statGfg: 50,
      statAfg: 72,
      statPlt: 50,
    },
    characterList: [
      {
        fltCode: "FPA0010",
        charCode: "CH_000443",  // 쿠브르슬리
        type: "C",
        stDate: "0",
        proactive: 100,
      },
    ],
    shipList: [
      {
        fltCode: "FPA0010",
        type: "F",
        shipIndex: 1,
        shipCode: "",
        shipAmt: 1000,
      },
    ],
    formationList: [
      { ffCode: "FF_01", useYn: true },
      { ffCode: "FF_07", useYn: false },
    ],
    stratageList: [],
  },

  // 사령관 파에타 / 부관 양 웬리(전략고문)
  {
    fltCode: "FPA0020",
    faction: "FPA",
    fltNum: "002",
    fltName: [{ code: "Kr", context: "제2함대" }],
    fltFullName: "자유행성동맹 제2함대",
    parentFlt: null,
  },

  // 사령관 르페브르
  {
    fltCode: "FPA0030",
    faction: "FPA",
    fltNum: "003",
    fltName: [{ code: "Kr", context: "제3함대" }],
    fltFullName: "자유행성동맹 제3함대",
    parentFlt: null,
  },

  // 사령관 파스톨레 / 부관 피셔
  {
    fltCode: "FPA0040",
    faction: "FPA",
    fltNum: "004",
    fltName: [{ code: "Kr", context: "제4함대" }],
    fltFullName: "자유행성동맹 제4함대",
    parentFlt: null,
  },

  // 사령관 뷰코크 / 부관 파이펠
  {
    fltCode: "FPA0050",
    faction: "FPA",
    fltNum: "005",
    fltName: [{ code: "Kr", context: "제5함대" }],
    fltFullName: "자유행성동맹 제5함대",
    parentFlt: null,
  },

  // 사령관 무어 / 부관 랍
  {
    fltCode: "FPA0060",
    faction: "FPA",
    fltNum: "006",
    fltName: [{ code: "Kr", context: "제6함대" }],
    fltFullName: "자유행성동맹 제6함대",
    parentFlt: null,
  },

  // 사령관 호우드
  {
    fltCode: "FPA0070",
    faction: "FPA",
    fltNum: "007",
    fltName: [{ code: "Kr", context: "제7함대" }],
    fltFullName: "자유행성동맹 제7함대",
    parentFlt: null,
  },

  // 사령관 애플턴
  {
    fltCode: "FPA0080",
    faction: "FPA",
    fltNum: "008",
    fltName: [{ code: "Kr", context: "제8함대" }],
    fltFullName: "자유행성동맹 제8함대",
    parentFlt: null,
  },

  // 사령관 알 살렘
  {
    fltCode: "FPA0090",
    faction: "FPA",
    fltNum: "009",
    fltName: [{ code: "Kr", context: "제9함대" }],
    fltFullName: "자유행성동맹 제9함대",
    parentFlt: null,
  },

  // 사령관 우란푸
  {
    fltCode: "FPA0100",
    faction: "FPA",
    fltNum: "010",
    fltName: [{ code: "Kr", context: "제10함대" }],
    fltFullName: "자유행성동맹 제10함대",
    parentFlt: null,
  },

  // 사령관 루글랑주
  {
    fltCode: "FPA0110",
    faction: "FPA",
    fltNum: "011",
    fltName: [{ code: "Kr", context: "제11함대" }],
    fltFullName: "자유행성동맹 제11함대",
    parentFlt: null,
  },

  // 사령관 보로딘
  {
    fltCode: "FPA0120",
    faction: "FPA",
    fltNum: "012",
    fltName: [{ code: "Kr", context: "제12함대" }],
    fltFullName: "자유행성동맹 제12함대",
    parentFlt: null,
  },

  // ── 은하제국 (REH) ───────────────────────────────────────────

  // 함대 - 뮈켄베르거
  {
    fltCode: "REH0010",
    faction: "REH",
    fltNum: "001",
    fltName: [{ code: "Kr", context: "뮈켄베르거 함대" }],
    fltFullName: "뮈켄베르거 함대",
    parentFlt: null,
  },

  // 함대 - 로엔그람 (총사령관 라인하르트 폰 뮤젤 / 부관 키르히아이스)
  {
    fltCode: "REH0040",
    faction: "REH",
    fltNum: "004",
    fltName: [{ code: "Kr", context: "로엔그람 함대" }],
    fltFullName: "로엔그람 함대",
    parentFlt: null,
  },

  // 분함대 - 메르카츠
  {
    fltCode: "REH0041",
    faction: "REH",
    fltNum: "002",
    fltName: [{ code: "Kr", context: "메르카츠 분함대" }],
    fltFullName: "로엔그람 함대 메르카츠 분함대",
    parentFlt: "REH0040",
  },

  // 분함대 — 슈타덴
  {
    fltCode: "REH0042",
    faction: "REH",
    fltNum: "003",
    fltName: [{ code: "Kr", context: "슈타덴 분함대" }],
    fltFullName: "로엔그람 함대 슈타덴 분함대",
    parentFlt: "REH0040",
  },

  // 분함대 — 파렌하이트
  {
    fltCode: "REH0043",
    faction: "REH",
    fltNum: "004",
    fltName: [{ code: "Kr", context: "파렌하이트 분함대" }],
    fltFullName: "로엔그람 함대 파렌하이트 분함대",
    parentFlt: "REH0040",
  },

  // 분함대 — 에를라흐
  {
    fltCode: "REH0044",
    faction: "REH",
    fltNum: "005",
    fltName: [{ code: "Kr", context: "에를라흐 분함대" }],
    fltFullName: "로엔그람 함대 에를라흐 분함대",
    parentFlt: "REH0040",
  },

  // 분함대 — 포겔
  {
    fltCode: "REH0045",
    faction: "REH",
    fltNum: "006",
    fltName: [{ code: "Kr", context: "포겔 분함대" }],
    fltFullName: "로엔그람 함대 포겔 분함대",
    parentFlt: "REH0040",
  },

  // 그 외.
  // 이젤론 주둔함대 미터마이어함대 로이엔탈함대 슈바르츠란첸라이터 등 제국 후방에 존재하는 함대
];

export const FLEET_MAP = Object.fromEntries(
  FLEET_DATA.map((f) => [f.fltCode, f])
);
