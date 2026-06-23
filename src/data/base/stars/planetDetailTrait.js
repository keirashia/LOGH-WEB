// ================================================================
//  planetDetailTrait.js — 행성별 트레잇 부착 데이터 (불변 기본값)
//  경로: src/data/base/stars/planetDetailTrait.js
//
//  트레잇 마스터: src/data/base/trait/stars/starTraitData.js (STAR_TRAITS)
//
//  스키마:
//    planetCode  — planetsData.js code (예: "230001P01")
//    traitId     — starTraitData.js STAR_TRAITS[].id
//    traitStDate — 부착 턴 (0 = 시나리오 시작부터)
//    traitEdDate — 만료 턴 (null = 영구)
//
//  시나리오별 오버라이드:
//    src/data/scenario/{id}/stars/planetDetailTrait.js
// ================================================================

export const PLANET_TRAITS = [

  // ── 오딘 (230058P01) — 제국 수도 ────────────────────────────
  { planetCode: "230058P01", traitId: "ANCIENT_CAPITAL",   traitStDate: 0, traitEdDate: null },
  { planetCode: "230058P01", traitId: "IMPERIAL_HERITAGE", traitStDate: 0, traitEdDate: null },

  // ── 하이네센 (230006P01) — 동맹 수도 ────────────────────────
  { planetCode: "230006P01", traitId: "FRONTIER_SPIRIT",   traitStDate: 0, traitEdDate: null },
  { planetCode: "230006P01", traitId: "TRADE_HUB",         traitStDate: 0, traitEdDate: null },

  // ── 페잔 (230042P01) — 자치령 수도 ──────────────────────────
  { planetCode: "230042P01", traitId: "STRATEGIC_POSITION", traitStDate: 0, traitEdDate: null },
  { planetCode: "230042P01", traitId: "TRADE_HUB",          traitStDate: 0, traitEdDate: null },

]
