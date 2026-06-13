// ================================================================
//  fleetShipData.js
//  경로: src/data/fleet/SE796/01/fleetShipData.js
//  시나리오: SE796 아스타테 회전 (01)
//  작성: 2026-06-08
//
//  type:
//    F = 기함 (flagship)
//    U = 일반 함선 (unit)
//
//  shipType: unitshipData.js / flagshipData.js 참조 (추후 구현)
//  현재는 임시값 사용
// ================================================================

export const FLEET_SHIP_DATA = [

  // ── FPA0020 자유행성동맹 제2함대 ─────────────────────────────
  // 총 15,000척

  {
    fltCode  : "FPA002",
    type     : "F",
    shipIndex: 1,
    shipAmt  : 1,
    shipType : "Patoroklos",    // 기함 파트로클로스
  },
  {
    fltCode  : "FPA002",
    type     : "U",
    shipIndex: 2,
    shipAmt  : 14999,
    shipType : "warship",
  },

  // ── FPA0040 자유행성동맹 제4함대 ─────────────────────────────
  // 총 12,000척

  {
    fltCode  : "FPA004",
    type     : "F",
    shipIndex: 1,
    shipAmt  : 1,
    shipType : "Leonidas",      // 기함 레오니다스
  },
  {
    fltCode  : "FPA004",
    type     : "U",
    shipIndex: 2,
    shipAmt  : 11999,
    shipType : "warship",
  },

  // ── FPA0060 자유행성동맹 제6함대 ─────────────────────────────
  // 총 13,000척

  {
    fltCode  : "FPA006",
    type     : "F",
    shipIndex: 1,
    shipAmt  : 1,
    shipType : "Pergamonn",     // 기함 페르가몬
  },
  {
    fltCode  : "FPA006",
    type     : "U",
    shipIndex: 2,
    shipAmt  : 12999,
    shipType : "warship",
  },

  // ── REH0040 로엔그람 함대 ─────────────────────────────────────
  // 총 20,000척 (분함대 포함)
  // 기함은 라인하르트 직속 함대에만 배정
  // 분함대별 함선 수는 임의 배분 (원작 미상)

  {
    fltCode  : "REH0040",
    type     : "F",
    shipIndex: 1,
    shipAmt  : 1,
    shipType : "Brunhild",      // 기함 브륀힐트
  },
  {
    fltCode  : "REH0040",
    type     : "U",
    shipIndex: 2,
    shipAmt  : 2999,            // 라인하르트 직속 (임의)
    shipType : "warship",
  },

  // ── REH0041 메르카츠 분함대 ──────────────────────────────────

  {
    fltCode  : "REH0041",
    type     : "U",
    shipIndex: 1,
    shipAmt  : 4000,            // 임의 배분
    shipType : "warship",
  },

  // ── REH0042 슈타덴 분함대 ────────────────────────────────────

  {
    fltCode  : "REH0042",
    type     : "U",
    shipIndex: 1,
    shipAmt  : 3000,            // 임의 배분
    shipType : "warship",
  },

  // ── REH0043 파렌하이트 분함대 ────────────────────────────────

  {
    fltCode  : "REH0043",
    type     : "U",
    shipIndex: 1,
    shipAmt  : 4000,            // 임의 배분
    shipType : "warship",
  },

  // ── REH0044 에를라흐 분함대 (전사) ───────────────────────────

  {
    fltCode  : "REH0044",
    type     : "U",
    shipIndex: 1,
    shipAmt  : 3000,            // 임의 배분
    shipType : "warship",
  },

  // ── REH0045 포겔 분함대 ───────────────────────────────────────

  {
    fltCode  : "REH0045",
    type     : "U",
    shipIndex: 1,
    shipAmt  : 3000,            // 임의 배분
    shipType : "warship",
  },
]
