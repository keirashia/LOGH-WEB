// ================================================================
//  fleetData.js
//  경로: src/data/fleet//fleetData.js
//  시나리오: SE796 아스타테 회전 (01)
//  작성: 2026-06-08
// ================================================================

export const FLEET_DATA = [
  // 수정 fltCode : nation + fltNum + seq 조합으로 사용. 0이 본함대
  // fltLoc : 시나리오 코드가 아니라, 현재 위치한 성계 또는 레인
  //  >> 위 수정사항 md파일 반영 후 이 주석은 삭제

  // ── 자유행성동맹 (FPA) ───────────────────────────────────────
  // 사령관 쿠브르슬리
  {
    fltCode: "FPA0010",
    faction: "FPA",
    fltNum: "001",
    fltName: "자유행성동맹 제1함대",
    fltLoc: "", // 하이네센
    parentFlt: null,
  },
  // 사령관 파에타
  // 부관 양 아텐보로 라오
  {
    fltCode: "FPA0020",
    faction: "FPA",
    fltNum: "002",
    fltName: "자유행성동맹 제2함대",
    fltLoc: "", // 아스타테
    parentFlt: null,
  },
  // 사령관 르페브르
  {
    fltCode: "FPA0030",
    faction: "FPA",
    fltNum: "003",
    fltName: "자유행성동맹 제3함대",
    fltLoc: "", // 하이네센
    parentFlt: null,
  },
  // 사령관 파스톨레
  // 부관 피셔
  {
    fltCode: "FPA0040",
    faction: "FPA",
    fltNum: "004",
    fltName: "자유행성동맹 제4함대",
    fltLoc: "", // 아스타테
    parentFlt: null,
  },
  // 사령관 뷰코크
  // 부관 파이펠
  {
    fltCode: "FPA0050",
    faction: "FPA",
    fltNum: "005",
    fltName: "자유행성동맹 제5함대",
    fltLoc: "", // 하이네센
    parentFlt: null,
  },
  // 사령관 무어
  // 부관 랍
  {
    fltCode: "FPA0060",
    faction: "FPA",
    fltNum: "006",
    fltName: "자유행성동맹 제6함대",
    fltLoc: "", // 하이네센
    parentFlt: null,
  },
  // 사령관 호우드
  {
    fltCode: "FPA0070",
    faction: "FPA",
    fltNum: "007",
    fltName: "자유행성동맹 제7함대",
    fltLoc: "", // 하이네센
    parentFlt: null,
  },
  // 사령관 애플턴
  {
    fltCode: "FPA0080",
    faction: "FPA",
    fltNum: "008",
    fltName: "자유행성동맹 제8함대",
    fltLoc: "", // 하이네센
    parentFlt: null,
  },
  // 사령관 알 살렘
  {
    fltCode: "FPA0090",
    faction: "FPA",
    fltNum: "009",
    fltName: "자유행성동맹 제9함대",
    fltLoc: "", // 하이네센
    parentFlt: null,
  },
  // 사령관 우란푸
  {
    fltCode: "FPA0100",
    faction: "FPA",
    fltNum: "010",
    fltName: "자유행성동맹 제10함대",
    fltLoc: "", // 하이네센
    parentFlt: null,
  },
  // 사령관 루글랑주
  {
    fltCode: "FPA0110",
    faction: "FPA",
    fltNum: "011",
    fltName: "자유행성동맹 제11함대",
    fltLoc: "", // 하이네센
    parentFlt: null,
  },
  // 사령관 보로딘
  {
    fltCode: "FPA0120",
    faction: "FPA",
    fltNum: "012",
    fltName: "자유행성동맹 제12함대",
    fltLoc: "", // 하이네센
    parentFlt: null,
  },
  // ── 은하제국 (REH) ───────────────────────────────────────────
  // 함대 - 뮈켄베르거
  {
    fltCode: "REH0010",
    faction: "REH",
    fltNum: "001",
    fltName: "뮈켄베르거 함대",
    fltLoc: "", // 발할라
    parentFlt: null,
  },

  // 함대 - 로엔그람
  {
    fltCode: "REH0040",
    faction: "REH",
    fltNum: "001",
    fltName: "로엔그람 함대",
    fltLoc: "", // 아스타테
    parentFlt: null,
  },
  // 분함대 - 메르카츠
  {
    fltCode: "REH0041",
    faction: "REH",
    fltNum: "002",
    fltName: "로엔그람 함대 메르카츠 분함대",
    fltLoc: "", // 아스타테
    parentFlt: "REH004",
  },
  // 분함대 — 슈타덴
  {
    fltCode: "REH0042",
    faction: "REH",
    fltNum: "003",
    fltName: "로엔그람 함대 슈타덴 분함대",
    fltLoc: "", // 아스타테
    parentFlt: "REH004",
  },
  // 분함대 — 파렌하이트
  {
    fltCode: "REH0043",
    faction: "REH",
    fltNum: "004",
    fltName: "로엔그람 함대 파렌하이트 분함대",
    fltLoc: "",
    parentFlt: "REH004",
  },
  // 분함대 — 에를라흐
  {
    fltCode: "REH0044",
    faction: "REH",
    fltNum: "005",
    fltName: "로엔그람 함대 에를라흐 분함대",
    fltLoc: "", // 아스타테
    parentFlt: "REH004",
  },
  // 분함대 — 포겔
  {
    fltCode: "REH0045",
    faction: "REH",
    fltNum: "006",
    fltName: "로엔그람 함대 포겔 분함대",
    fltLoc: "", // 아스타테
    parentFlt: "REH004",
  },
  // 그 외.
  // 이젤론 주둔함대 미터마이어함대 로이엔탈함대 슈바르츠란첸라이터 등 제국 후방에 존재하는 함대
];

export const FLEET_MAP = Object.fromEntries(
  FLEET_DATA.map((f) => [f.fltCode, f])
);
