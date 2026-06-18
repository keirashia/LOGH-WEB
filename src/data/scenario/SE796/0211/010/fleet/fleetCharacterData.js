// ================================================================
//  fleetCharacterData.js
//  경로: src/data/fleet/SE796/01/fleetCharacterData.js
//  시나리오: SE796 아스타테 회전 (01)
//  작성: 2026-06-08
//
//  type:
//    C = 사령관 (함대 능력치 기준값)
//    O = 부관   (스탯 보정 적용)
//    S = 분함대 사령관 (상위 함대 소속, 독립 행동 가능)
//
//  parentFlt:
//    S 타입의 경우 상위 함대 코드 지정 (full fltCode 형식)
//    null이면 독립 함대
// ================================================================

export const FLEET_CHARACTER_DATA = [

  // ── FPA0020 자유행성동맹 제2함대 ─────────────────────────────

  {
    fltCode  : "FPA002",
    charCode : "CH_000479",   // 파에타
    type     : "C",
    parentFlt: null,
    stDate   : "0",
  },
  {
    fltCode  : "FPA002",
    charCode : "CH_000266",   // 양 웬리 (전략고문 → 부관으로 처리)
    type     : "O",
    parentFlt: null,
    stDate   : "0",
  },

  // ── FPA0040 자유행성동맹 제4함대 ─────────────────────────────

  {
    fltCode  : "FPA004",
    charCode : "CH_000478",   // 파스톨레
    type     : "C",
    parentFlt: null,
    stDate   : "0",
  },

  // ── FPA0060 자유행성동맹 제6함대 ─────────────────────────────

  {
    fltCode  : "FPA006",
    charCode : "CH_000139",   // 무어
    type     : "C",
    parentFlt: null,
    stDate   : "0",
  },
  {
    fltCode  : "FPA006",
    charCode : "CH_000368",   // 장 로베르 랍
    type     : "O",
    parentFlt: null,
    stDate   : "0",
  },

  // ── REH0040 로엔그람 함대 (총사령관) ─────────────────────────

  {
    fltCode  : "REH0040",
    charCode : "CH_000064",   // 라인하르트 폰 뮤젤
    type     : "C",
    parentFlt: null,
    stDate   : "0",
  },
  {
    fltCode  : "REH0040",
    charCode : "CH_000388",   // 지크프리트 키르히아이스
    type     : "O",
    parentFlt: null,
    stDate   : "0",
  },

  // ── REH0041 메르카츠 분함대 ──────────────────────────────────

  {
    fltCode  : "REH0041",
    charCode : "CH_000195",   // 빌리바르트 요아힘 폰 메르카츠
    type     : "S",
    parentFlt: "REH0040",
    stDate   : "0",
  },

  // ── REH0042 슈타덴 분함대 ────────────────────────────────────

  {
    fltCode  : "REH0042",
    charCode : "CH_000223",   // 슈타덴
    type     : "S",
    parentFlt: "REH0040",
    stDate   : "0",
  },

  // ── REH0043 파렌하이트 분함대 ────────────────────────────────

  {
    fltCode  : "REH0043",
    charCode : "CH_000233",   // 아달베르트 폰 파렌하이트
    type     : "S",
    parentFlt: "REH0040",
    stDate   : "0",
  },

  // ── REH0044 에를라흐 분함대 ──────────────────────────────────

  {
    fltCode  : "REH0044",
    charCode : "CH_000290",   // 에를라흐
    type     : "S",
    parentFlt: "REH0040",
    stDate   : "0",
  },

  // ── REH0045 포겔 분함대 ───────────────────────────────────────

  {
    fltCode  : "REH0045",
    charCode : "CH_000494",   // 포겔
    type     : "S",
    parentFlt: "REH0040",
    stDate   : "0",
  },
]
