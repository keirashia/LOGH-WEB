// ================================================================
//  hullData.js — 함체 마스터 데이터
//  경로: src/data/base/fleet/hullData.js
// ================================================================
// hullCode   : HL_${faction}_${typeCode}
//
// hp         : 내구도
// armor      : 방향별 방어력 (front / side / rear)
// slots      : 장착 슬롯
//   weapon   : 무기 슬롯 수 (0~4) — 무기 외 보급시설·수리시설도 장착 가능
//   engine   : 엔진 슬롯 (1 고정)
//   radar    : 레이더 슬롯 (1 고정)
// maxSupply  : 최대 물자 탑재량
// crew       : 승무원 수 (100단위 근사값)
// buildCost  : 함체 건조비 (크레딧)
// buildTurns : 함체 건조 소요 턴 (전체 함선 buildTurns 기준)
// cargoAmt   : 수송함 전용 — 화물 용량
// ================================================================

export const HULL_DATA = [

  // ── 은하제국 (REH) ───────────────────────────────────────────

  {
    hullCode:   "HL_REH_BS",
    faction:    "REH",
    shipType:   "battleship",
    name: [{ code: "Kr", context: "제국 전함 함체" }],
    hp:    100,
    armor: { front: 90, side: 70, rear: 40 },
    slots: { weapon: 4, engine: 1, radar: 1 },
    maxSupply:  1000,
    crew:        700,
    buildCost:   600,
    buildTurns:    2,
  },

  {
    hullCode:   "HL_REH_FB",
    faction:    "REH",
    shipType:   "fast_battleship",
    name: [{ code: "Kr", context: "제국 고속전함 함체" }],
    hp:     90,
    armor: { front: 80, side: 60, rear: 35 },
    slots: { weapon: 3, engine: 1, radar: 1 },
    maxSupply:   800,
    crew:        700,
    buildCost:   700,
    buildTurns:    3,
  },

  {
    hullCode:   "HL_REH_CR",
    faction:    "REH",
    shipType:   "cruiser",
    name: [{ code: "Kr", context: "제국 순양함 함체" }],
    hp:     70,
    armor: { front: 70, side: 55, rear: 30 },
    slots: { weapon: 2, engine: 1, radar: 1 },
    maxSupply:   600,
    crew:        700,
    buildCost:   350,
    buildTurns:    1,
  },

  {
    hullCode:   "HL_REH_DS",
    faction:    "REH",
    shipType:   "destroyer",
    name: [{ code: "Kr", context: "제국 구축함 함체" }],
    hp:     40,
    armor: { front: 50, side: 35, rear: 20 },
    slots: { weapon: 1, engine: 1, radar: 1 },
    maxSupply:   200,
    crew:        100,
    buildCost:   120,
    buildTurns:    1,
  },

  {
    hullCode:   "HL_REH_CV",
    faction:    "REH",
    shipType:   "carrier",
    name: [{ code: "Kr", context: "제국 항공모함 함체" }],
    hp:     80,
    armor: { front: 60, side: 50, rear: 30 },
    slots: { weapon: 1, engine: 1, radar: 1 },
    maxSupply:  1200,
    crew:       1900,
    buildCost:   900,
    buildTurns:    4,
  },

  {
    hullCode:   "HL_REH_TR",
    faction:    "REH",
    shipType:   "transport",
    name: [{ code: "Kr", context: "제국 수송함 함체" }],
    hp:     50,
    armor: { front: 30, side: 20, rear: 15 },
    slots: { weapon: 0, engine: 1, radar: 1 },
    maxSupply:  5000,
    crew:        100,
    buildCost:   200,
    buildTurns:    1,
    cargoAmt:  160000,
  },


  // ── 자유행성동맹 (FPA) ───────────────────────────────────────

  {
    hullCode:   "HL_FPA_BS",
    faction:    "FPA",
    shipType:   "battleship",
    name: [{ code: "Kr", context: "동맹 전함 함체" }],
    hp:    100,
    armor: { front: 85, side: 65, rear: 35 },
    slots: { weapon: 4, engine: 1, radar: 1 },
    maxSupply:  1000,
    crew:        700,
    buildCost:   580,
    buildTurns:    2,
  },

  {
    hullCode:   "HL_FPA_CR",
    faction:    "FPA",
    shipType:   "cruiser",
    name: [{ code: "Kr", context: "동맹 순양함 함체" }],
    hp:     70,
    armor: { front: 65, side: 50, rear: 28 },
    slots: { weapon: 2, engine: 1, radar: 1 },
    maxSupply:   600,
    crew:        400,
    buildCost:   330,
    buildTurns:    1,
  },

  {
    hullCode:   "HL_FPA_DS",
    faction:    "FPA",
    shipType:   "destroyer",
    name: [{ code: "Kr", context: "동맹 구축함 함체" }],
    hp:     40,
    armor: { front: 45, side: 32, rear: 18 },
    slots: { weapon: 1, engine: 1, radar: 1 },
    maxSupply:   200,
    crew:        200,
    buildCost:   110,
    buildTurns:    1,
  },

]

export const HULL_MAP = Object.fromEntries(
  HULL_DATA.map(h => [h.hullCode, h])
)
