// ================================================================
//  unitshipData.js — 완성 함선 마스터 데이터
//  경로: src/data/base/fleet/unitshipData.js
// ================================================================
// 함선 = 함체(hull) + 무기(weapons[]) + 엔진(engine) + 레이더(radar) 조합.
// 각 컴포넌트 코드는 해당 데이터 파일 참조:
//   hull    → hullData.js    (HL_${faction}_${typeCode})
//   weapons → weaponData.js  (WPN_${faction}_${typeCode})
//   engine  → engineData.js  (ENG_${faction}_${typeCode})
//   radar   → radarData.js   (RDR_${faction}_${typeCode})
//
// buildCost  : 전체 컴포넌트 합산 건조비 (크레딧)
// buildTurns : 함체 기준 건조 소요 턴
// upkeep     : 턴당 유지비 (크레딧)
// ================================================================

export const UNIT_SHIP_DATA = [

  // ── 은하제국 (REH) ───────────────────────────────────────────

  {
    shipCode:  "US_REH_BS",
    faction:   "REH",
    shipType:  "battleship",
    name: [{ code: "Kr", context: "제국 전함" }],
    hull:      "HL_REH_BS",
    weapons:   ["WPN_REH_BEAM", "WPN_REH_MISSILE"],
    engine:    "ENG_REH_BS",
    radar:     "RDR_REH_BS",
    buildCost:  950,   // 600+150+50+80+70
    buildTurns:   2,
    upkeep:       8,
  },

  {
    shipCode:  "US_REH_FB",
    faction:   "REH",
    shipType:  "fast_battleship",
    name: [{ code: "Kr", context: "제국 고속전함" }],
    hull:      "HL_REH_FB",
    weapons:   ["WPN_REH_BEAM"],
    engine:    "ENG_REH_FB",
    radar:     "RDR_REH_FB",
    buildCost: 1020,   // 700+200+40+80
    buildTurns:   3,
    upkeep:       9,
  },

  {
    shipCode:  "US_REH_CR",
    faction:   "REH",
    shipType:  "cruiser",
    name: [{ code: "Kr", context: "제국 순양함" }],
    hull:      "HL_REH_CR",
    weapons:   ["WPN_REH_BEAM", "WPN_REH_MISSILE"],
    engine:    "ENG_REH_CR",
    radar:     "RDR_REH_CR",
    buildCost:  645,   // 350+100+45+80+70
    buildTurns:   1,
    upkeep:       5,
  },

  {
    shipCode:  "US_REH_DS",
    faction:   "REH",
    shipType:  "destroyer",
    name: [{ code: "Kr", context: "제국 구축함" }],
    hull:      "HL_REH_DS",
    weapons:   ["WPN_REH_BEAM", "WPN_REH_MISSILE"],
    engine:    "ENG_REH_DS",
    radar:     "RDR_REH_DS",
    buildCost:  405,   // 120+80+55+80+70
    buildTurns:   1,
    upkeep:       2,
  },

  {
    shipCode:  "US_REH_CV",
    faction:   "REH",
    shipType:  "carrier",
    name: [{ code: "Kr", context: "제국 항공모함" }],
    hull:      "HL_REH_CV",
    weapons:   ["WPN_REH_FIGHTER"],
    engine:    "ENG_REH_CV",
    radar:     "RDR_REH_CV",
    buildCost: 1140,   // 900+120+60+60
    buildTurns:   4,
    upkeep:      12,
  },

  {
    shipCode:  "US_REH_TR",
    faction:   "REH",
    shipType:  "transport",
    name: [{ code: "Kr", context: "제국 수송함" }],
    hull:      "HL_REH_TR",
    weapons:   [],
    engine:    "ENG_REH_TR",
    radar:     "RDR_REH_TR",
    buildCost:  280,   // 200+60+20
    buildTurns:   1,
    upkeep:       3,
  },


  // ── 자유행성동맹 (FPA) ───────────────────────────────────────

  {
    shipCode:  "US_FPA_BS",
    faction:   "FPA",
    shipType:  "battleship",
    name: [{ code: "Kr", context: "동맹 전함" }],
    hull:      "HL_FPA_BS",
    weapons:   ["WPN_FPA_BEAM", "WPN_FPA_RAILGUN", "WPN_FPA_MISSILE"],
    engine:    "ENG_FPA_BS",
    radar:     "RDR_FPA_BS",
    buildCost: 1005,   // 580+140+55+75+90+65
    buildTurns:   2,
    upkeep:       8,
  },

  {
    shipCode:  "US_FPA_CR",
    faction:   "FPA",
    shipType:  "cruiser",
    name: [{ code: "Kr", context: "동맹 순양함" }],
    hull:      "HL_FPA_CR",
    weapons:   ["WPN_FPA_BEAM", "WPN_FPA_RAILGUN", "WPN_FPA_MISSILE"],
    engine:    "ENG_FPA_CR",
    radar:     "RDR_FPA_CR",
    buildCost:  700,   // 330+95+45+75+90+65
    buildTurns:   1,
    upkeep:       5,
  },

  {
    shipCode:  "US_FPA_DS",
    faction:   "FPA",
    shipType:  "destroyer",
    name: [{ code: "Kr", context: "동맹 구축함" }],
    hull:      "HL_FPA_DS",
    weapons:   ["WPN_FPA_BEAM", "WPN_FPA_MISSILE"],
    engine:    "ENG_FPA_DS",
    radar:     "RDR_FPA_DS",
    buildCost:  375,   // 110+75+50+75+65
    buildTurns:   1,
    upkeep:       2,
  },

]

export const UNIT_SHIP_MAP = Object.fromEntries(
  UNIT_SHIP_DATA.map(s => [s.shipCode, s])
)
