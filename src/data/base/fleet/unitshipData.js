// ================================================================
//  unitshipData.js — 완성 함선 마스터 데이터
//  경로: src/data/base/fleet/unitshipData.js
//  최종 수정: 2026-08-13
// ================================================================
// 함선 = 함체(hull) + 무기(weapons) 조합.
// 엔진·레이더는 hull에 내장 (engineData/radarData 폐지).
//
//   hull    → hullData.js    (HL_${faction}_${typeCode})
//   weapons → weaponData.js  (WPN_${faction}_${type}_${grade})
//             hull.grade 매칭 무기만 장착 가능
//             항모(CV)는 [] — hull.slots.fixed에 고정 무장 정의됨
//
// buildCost  : hull + weapons 합산 건조비
// buildTurns : hull 기준 건조 소요 턴
// upkeep     : 턴당 유지비 (크레딧)
// ================================================================

export const UNIT_SHIP_DATA = [

  // ── 은하제국 (REH) ───────────────────────────────────────────

  {
    shipCode:   "US_REH_BS",
    faction:    "REH",
    shipType:   "battleship",
    name: [{ code: "Kr", context: "제국 전함" }],
    hull:       "HL_REH_BS",
    weapons:    ["WPN_REH_BEAM_L"],   // grade L, slot 1
    buildCost:   680,   // 600 + 80
    buildTurns:    2,
    upkeep:        8,
  },

  {
    shipCode:   "US_REH_FB",
    faction:    "REH",
    shipType:   "fast_battleship",
    name: [{ code: "Kr", context: "제국 고속전함" }],
    hull:       "HL_REH_FB",
    weapons:    ["WPN_REH_BEAM_L"],   // grade L, slot 1
    buildCost:   780,   // 700 + 80
    buildTurns:    3,
    upkeep:        9,
  },

  {
    shipCode:   "US_REH_CR",
    faction:    "REH",
    shipType:   "cruiser",
    name: [{ code: "Kr", context: "제국 순양함" }],
    hull:       "HL_REH_CR",
    weapons:    ["WPN_REH_BEAM_M"],   // grade M, slot 1
    buildCost:   405,   // 350 + 55
    buildTurns:    1,
    upkeep:        5,
  },

  {
    shipCode:   "US_REH_DS",
    faction:    "REH",
    shipType:   "destroyer",
    name: [{ code: "Kr", context: "제국 구축함" }],
    hull:       "HL_REH_DS",
    weapons:    ["WPN_REH_BEAM_S", "WPN_REH_MISSILE_S"],  // grade S, slot 2
    buildCost:   190,   // 120 + 30 + 40
    buildTurns:    1,
    upkeep:        2,
  },

  {
    shipCode:   "US_REH_CV",
    faction:    "REH",
    shipType:   "carrier",
    name: [{ code: "Kr", context: "제국 항공모함" }],
    hull:       "HL_REH_CV",
    weapons:    [],     // hull.slots.fixed = [WPN_REH_FIGHTER, WPN_REH_GUNSHIP]
    buildCost:   900,   // hull 단독 (함재기는 hull 비용에 포함)
    buildTurns:    4,
    upkeep:       12,
  },

  {
    shipCode:   "US_REH_TR",
    faction:    "REH",
    shipType:   "transport",
    name: [{ code: "Kr", context: "제국 수송함" }],
    hull:       "HL_REH_TR",
    weapons:    [],     // 무장 없음
    buildCost:   200,
    buildTurns:    1,
    upkeep:        3,
  },


  // ── 자유행성동맹 (FPA) ───────────────────────────────────────

  {
    shipCode:   "US_FPA_BS",
    faction:    "FPA",
    shipType:   "battleship",
    name: [{ code: "Kr", context: "동맹 전함" }],
    hull:       "HL_FPA_BS",
    weapons:    ["WPN_FPA_BEAM_L"],   // grade L, slot 1 (기본 장착)
    buildCost:   655,   // 580 + 75
    buildTurns:    2,
    upkeep:        8,
  },

  {
    shipCode:   "US_FPA_CR",
    faction:    "FPA",
    shipType:   "cruiser",
    name: [{ code: "Kr", context: "동맹 순양함" }],
    hull:       "HL_FPA_CR",
    weapons:    ["WPN_FPA_BEAM_M"],   // grade M, slot 1 (기본 장착)
    buildCost:   380,   // 330 + 50
    buildTurns:    1,
    upkeep:        5,
  },

  {
    shipCode:   "US_FPA_DS",
    faction:    "FPA",
    shipType:   "destroyer",
    name: [{ code: "Kr", context: "동맹 구축함" }],
    hull:       "HL_FPA_DS",
    weapons:    ["WPN_FPA_BEAM_S", "WPN_FPA_MISSILE_S"],  // grade S, slot 2
    buildCost:   173,   // 110 + 28 + 35
    buildTurns:    1,
    upkeep:        2,
  },

]

export const UNIT_SHIP_MAP = Object.fromEntries(
  UNIT_SHIP_DATA.map(s => [s.shipCode, s])
)
