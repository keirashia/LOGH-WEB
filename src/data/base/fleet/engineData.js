// ================================================================
//  engineData.js — 함선 엔진 마스터 데이터
//  경로: src/data/base/fleet/engineData.js
// ================================================================
// engineCode   : ENG_${faction}_${typeCode}
//
// speed        : 이동 속도 (전략·전술 통합)
// power        : 출력 용량 (무기·레이더 시스템 지원)
// equippableBy : 장착 가능 hullCode 배열 (hullData.js 참조)
// buildCost    : 엔진 건조비 (크레딧)
// buildTurns   : 엔진 건조 소요 턴
// ================================================================

export const ENGINE_DATA = [

  // ── 은하제국 (REH) ───────────────────────────────────────────

  {
    engineCode:   "ENG_REH_BS",
    faction:      "REH",
    name: [{ code: "Kr", context: "제국 전함 엔진" }],
    speed:        5,
    power:      100,
    equippableBy: ["HL_REH_BS"],
    buildCost:  150,
    buildTurns:   1,
  },

  {
    engineCode:   "ENG_REH_FB",
    faction:      "REH",
    name: [{ code: "Kr", context: "제국 고속전함 엔진" }],
    speed:        8,
    power:      110,
    equippableBy: ["HL_REH_FB"],
    buildCost:  200,
    buildTurns:   1,
  },

  {
    engineCode:   "ENG_REH_CR",
    faction:      "REH",
    name: [{ code: "Kr", context: "제국 순양함 엔진" }],
    speed:        6,
    power:       80,
    equippableBy: ["HL_REH_CR"],
    buildCost:  100,
    buildTurns:   1,
  },

  {
    engineCode:   "ENG_REH_DS",
    faction:      "REH",
    name: [{ code: "Kr", context: "제국 구축함 엔진" }],
    speed:        9,
    power:       60,
    equippableBy: ["HL_REH_DS"],
    buildCost:   80,
    buildTurns:   1,
  },

  {
    engineCode:   "ENG_REH_CV",
    faction:      "REH",
    name: [{ code: "Kr", context: "제국 항공모함 엔진" }],
    speed:        4,
    power:       70,
    equippableBy: ["HL_REH_CV"],
    buildCost:  120,
    buildTurns:   1,
  },

  {
    engineCode:   "ENG_REH_TR",
    faction:      "REH",
    name: [{ code: "Kr", context: "제국 수송함 엔진" }],
    speed:        3,
    power:       40,
    equippableBy: ["HL_REH_TR"],
    buildCost:   60,
    buildTurns:   1,
  },


  // ── 자유행성동맹 (FPA) ───────────────────────────────────────

  {
    engineCode:   "ENG_FPA_BS",
    faction:      "FPA",
    name: [{ code: "Kr", context: "동맹 전함 엔진" }],
    speed:        5,
    power:       95,
    equippableBy: ["HL_FPA_BS"],
    buildCost:  140,
    buildTurns:   1,
  },

  {
    engineCode:   "ENG_FPA_CR",
    faction:      "FPA",
    name: [{ code: "Kr", context: "동맹 순양함 엔진" }],
    speed:        7,
    power:       75,
    equippableBy: ["HL_FPA_CR"],
    buildCost:   95,
    buildTurns:   1,
  },

  {
    engineCode:   "ENG_FPA_DS",
    faction:      "FPA",
    name: [{ code: "Kr", context: "동맹 구축함 엔진" }],
    speed:        8,
    power:       55,
    equippableBy: ["HL_FPA_DS"],
    buildCost:   75,
    buildTurns:   1,
  },

]

export const ENGINE_MAP = Object.fromEntries(
  ENGINE_DATA.map(e => [e.engineCode, e])
)
