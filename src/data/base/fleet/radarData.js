// ================================================================
//  radarData.js — 함선 레이더 마스터 데이터
//  경로: src/data/base/fleet/radarData.js
// ================================================================
// radarCode    : RDR_${faction}_${typeCode}
//
// range        : 탐지 거리
// ecm          : 전자전 방해 능력
// equippableBy : 장착 가능 hullCode 배열 (hullData.js 참조)
// buildCost    : 레이더 건조비 (크레딧)
// buildTurns   : 레이더 건조 소요 턴
// ================================================================

export const RADAR_DATA = [

  // ── 은하제국 (REH) ───────────────────────────────────────────

  {
    radarCode:    "RDR_REH_BS",
    faction:      "REH",
    name: [{ code: "Kr", context: "제국 전함 레이더" }],
    range:        5,
    ecm:          4,
    equippableBy: ["HL_REH_BS"],
    buildCost:   50,
    buildTurns:   1,
  },

  {
    radarCode:    "RDR_REH_FB",
    faction:      "REH",
    name: [{ code: "Kr", context: "제국 고속전함 레이더" }],
    range:        4,
    ecm:          3,
    equippableBy: ["HL_REH_FB"],
    buildCost:   40,
    buildTurns:   1,
  },

  {
    radarCode:    "RDR_REH_CR",
    faction:      "REH",
    name: [{ code: "Kr", context: "제국 순양함 레이더" }],
    range:        6,
    ecm:          3,
    equippableBy: ["HL_REH_CR"],
    buildCost:   45,
    buildTurns:   1,
  },

  {
    radarCode:    "RDR_REH_DS",
    faction:      "REH",
    name: [{ code: "Kr", context: "제국 구축함 레이더" }],
    range:        7,
    ecm:          5,
    equippableBy: ["HL_REH_DS"],
    buildCost:   55,
    buildTurns:   1,
  },

  {
    radarCode:    "RDR_REH_CV",
    faction:      "REH",
    name: [{ code: "Kr", context: "제국 항공모함 레이더" }],
    range:        5,
    ecm:          6,
    equippableBy: ["HL_REH_CV"],
    buildCost:   60,
    buildTurns:   1,
  },

  {
    radarCode:    "RDR_REH_TR",
    faction:      "REH",
    name: [{ code: "Kr", context: "제국 수송함 레이더" }],
    range:        3,
    ecm:          2,
    equippableBy: ["HL_REH_TR"],
    buildCost:   20,
    buildTurns:   1,
  },


  // ── 자유행성동맹 (FPA) ───────────────────────────────────────

  {
    radarCode:    "RDR_FPA_BS",
    faction:      "FPA",
    name: [{ code: "Kr", context: "동맹 전함 레이더" }],
    range:        6,
    ecm:          4,
    equippableBy: ["HL_FPA_BS"],
    buildCost:   55,
    buildTurns:   1,
  },

  {
    radarCode:    "RDR_FPA_CR",
    faction:      "FPA",
    name: [{ code: "Kr", context: "동맹 순양함 레이더" }],
    range:        6,
    ecm:          3,
    equippableBy: ["HL_FPA_CR"],
    buildCost:   45,
    buildTurns:   1,
  },

  {
    radarCode:    "RDR_FPA_DS",
    faction:      "FPA",
    name: [{ code: "Kr", context: "동맹 구축함 레이더" }],
    range:        7,
    ecm:          4,
    equippableBy: ["HL_FPA_DS"],
    buildCost:   50,
    buildTurns:   1,
  },

]

export const RADAR_MAP = Object.fromEntries(
  RADAR_DATA.map(r => [r.radarCode, r])
)
