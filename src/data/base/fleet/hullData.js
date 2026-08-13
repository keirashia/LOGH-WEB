// ================================================================
//  hullData.js — 함체 마스터 데이터
//  경로: src/data/base/fleet/hullData.js
//  최종 수정: 2026-08-13
// ================================================================
// hullCode   : HL_${faction}_${typeCode}
// grade      : L(전함급) | M(순양함급) | S(구축함급) | X(항모·수송 특수)
//
// hp         : 내구도
// armor      : 방향별 방어력 (front / side / rear)
// speed      : 전략·전술 이동 속도 (구 engineData 흡수)
// detection  : 탐지 거리 (구 radarData.range 흡수)
// ecm        : 전자전 방해 능력 (구 radarData.ecm 흡수)
//
// slots      : 무장 슬롯
//   weapon   : 선택 장착 무기 슬롯 수 (L=1, M=1, S=2)
//   fixed    : 고정 내장 무기 코드 목록 (항모 전용)
//   (없음)   : 수송함 — 무장 없음
//
// maxSupply  : 최대 물자 탑재량
// buildCost  : 함체 건조비 (크레딧)
// buildTurns : 건조 소요 턴
// cargoAmt   : 수송함 전용 — 화물 용량
// ================================================================

export const HULL_DATA = [

  // ── 은하제국 (REH) ───────────────────────────────────────────

  {
    hullCode:   "HL_REH_BS",
    faction:    "REH",
    grade:      "L",
    shipType:   "battleship",
    name: [{ code: "Kr", context: "제국 전함" }],
    hp:    100,
    armor: { front: 90, side: 70, rear: 40 },
    speed:      5,
    detection:  5,
    ecm:        4,
    slots: { weapon: 1 },
    maxSupply:  1000,
    buildCost:   600,
    buildTurns:    2,
  },

  {
    hullCode:   "HL_REH_FB",
    faction:    "REH",
    grade:      "L",
    shipType:   "fast_battleship",
    name: [{ code: "Kr", context: "제국 고속전함" }],
    hp:     90,
    armor: { front: 80, side: 60, rear: 35 },
    speed:      8,
    detection:  4,
    ecm:        3,
    slots: { weapon: 1 },
    maxSupply:   800,
    buildCost:   700,
    buildTurns:    3,
  },

  {
    hullCode:   "HL_REH_CR",
    faction:    "REH",
    grade:      "M",
    shipType:   "cruiser",
    name: [{ code: "Kr", context: "제국 순양함" }],
    hp:     70,
    armor: { front: 70, side: 55, rear: 30 },
    speed:      6,
    detection:  6,
    ecm:        3,
    slots: { weapon: 1 },
    maxSupply:   600,
    buildCost:   350,
    buildTurns:    1,
  },

  {
    hullCode:   "HL_REH_DS",
    faction:    "REH",
    grade:      "S",
    shipType:   "destroyer",
    name: [{ code: "Kr", context: "제국 구축함" }],
    hp:     40,
    armor: { front: 50, side: 35, rear: 20 },
    speed:      9,
    detection:  7,
    ecm:        5,
    slots: { weapon: 2 },
    maxSupply:   200,
    buildCost:   120,
    buildTurns:    1,
  },

  {
    hullCode:   "HL_REH_CV",
    faction:    "REH",
    grade:      "X",
    shipType:   "carrier",
    name: [{ code: "Kr", context: "제국 항공모함" }],
    hp:     80,
    armor: { front: 60, side: 50, rear: 30 },
    speed:      4,
    detection:  5,
    ecm:        6,
    slots: { fixed: ["WPN_REH_FIGHTER", "WPN_REH_GUNSHIP"] },
    maxSupply:  1200,
    buildCost:   900,
    buildTurns:    4,
  },

  {
    hullCode:   "HL_REH_TR",
    faction:    "REH",
    grade:      "X",
    shipType:   "transport",
    name: [{ code: "Kr", context: "제국 수송함" }],
    hp:     50,
    armor: { front: 30, side: 20, rear: 15 },
    speed:      3,
    detection:  3,
    ecm:        2,
    slots: {},
    maxSupply:  5000,
    buildCost:   200,
    buildTurns:    1,
    cargoAmt:  160000,
  },


  // ── 자유행성동맹 (FPA) ───────────────────────────────────────

  {
    hullCode:   "HL_FPA_BS",
    faction:    "FPA",
    grade:      "L",
    shipType:   "battleship",
    name: [{ code: "Kr", context: "동맹 전함" }],
    hp:    100,
    armor: { front: 85, side: 65, rear: 35 },
    speed:      5,
    detection:  6,
    ecm:        4,
    slots: { weapon: 1 },
    maxSupply:  1000,
    buildCost:   580,
    buildTurns:    2,
  },

  {
    hullCode:   "HL_FPA_CR",
    faction:    "FPA",
    grade:      "M",
    shipType:   "cruiser",
    name: [{ code: "Kr", context: "동맹 순양함" }],
    hp:     70,
    armor: { front: 65, side: 50, rear: 28 },
    speed:      7,
    detection:  6,
    ecm:        3,
    slots: { weapon: 1 },
    maxSupply:   600,
    buildCost:   330,
    buildTurns:    1,
  },

  {
    hullCode:   "HL_FPA_DS",
    faction:    "FPA",
    grade:      "S",
    shipType:   "destroyer",
    name: [{ code: "Kr", context: "동맹 구축함" }],
    hp:     40,
    armor: { front: 45, side: 32, rear: 18 },
    speed:      8,
    detection:  7,
    ecm:        4,
    slots: { weapon: 2 },
    maxSupply:   200,
    buildCost:   110,
    buildTurns:    1,
  },

]

export const HULL_MAP = Object.fromEntries(
  HULL_DATA.map(h => [h.hullCode, h])
)
