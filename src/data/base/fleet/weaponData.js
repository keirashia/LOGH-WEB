// ================================================================
//  weaponData.js — 함선 무기 마스터 데이터
//  경로: src/data/base/fleet/weaponData.js
// ================================================================
// weaponCode   : WPN_${faction}_${typeCode}
//   faction    : REH | FPA | PZN | CMN(공용)
//
// type         : beam | electron_beam | railgun | missile | laser
//                fighter | gunship
// equippableBy : 장착 가능 hullCode 배열 (hullData.js 참조)
//                함체 선택 후 해당 목록 내 무기만 설치 가능
// power        : 화력 (유닛 전투력 합산 시 무기별 기여값)
// range        : 사거리
// supply       : 전투 1회당 소모 물자
// slots        : 장착에 필요한 weapon 슬롯 수
// buildCost    : 무기 건조비 (크레딧)
// buildTurns   : 무기 건조 소요 턴
//
// TODO: grade — "L"(대형/전함급) | "M"(중형/순양함급) | "S"(소형/구축함급)
//       같은 무기 타입이라도 함급별로 스펙 상이 (예: 전함용 미사일 런처)
//       grade 도입 시 weaponCode에 _L / _M / _S 접미사 추가 예정
// ================================================================

export const WEAPON_DATA = [

  // ── 은하제국 (REH) ───────────────────────────────────────────

  {
    weaponCode:   "WPN_REH_BEAM",
    faction:      "REH",
    name: [{ code: "Kr", context: "중성자 빔포" }],
    type:         "beam",
    equippableBy: ["HL_REH_BS", "HL_REH_FB", "HL_REH_CR", "HL_REH_DS"],
    power:   80,
    range:    4,
    supply:   5,
    slots:    1,
    buildCost:  80,
    buildTurns:  1,
  },

  {
    weaponCode:   "WPN_REH_MISSILE",
    faction:      "REH",
    name: [{ code: "Kr", context: "미사일 런처" }],
    type:         "missile",
    equippableBy: ["HL_REH_BS", "HL_REH_CR", "HL_REH_DS"],
    power:   60,
    range:    5,
    supply:   8,
    slots:    1,
    buildCost:  70,
    buildTurns:  1,
  },

  {
    weaponCode:   "WPN_REH_FIGHTER",
    faction:      "REH",
    name: [{ code: "Kr", context: "발키리" }],
    type:         "fighter",
    equippableBy: ["HL_REH_BS", "HL_REH_FB", "HL_REH_CR", "HL_REH_DS", "HL_REH_CV"],
    power:   40,
    range:    2,
    supply:   3,
    slots:    1,
    buildCost:  60,
    buildTurns:  1,
  },

  {
    weaponCode:   "WPN_REH_GUNSHIP",
    faction:      "REH",
    name: [{ code: "Kr", context: "건십" }],
    type:         "gunship",
    equippableBy: ["HL_REH_CV"],
    power:   50,
    range:    2,
    supply:   4,
    slots:    1,
    buildCost:  70,
    buildTurns:  1,
  },


  // ── 자유행성동맹 (FPA) ───────────────────────────────────────

  {
    weaponCode:   "WPN_FPA_BEAM",
    faction:      "FPA",
    name: [{ code: "Kr", context: "중성자 빔포" }],
    type:         "beam",
    equippableBy: ["HL_FPA_BS", "HL_FPA_CR", "HL_FPA_DS"],
    power:   75,
    range:    4,
    supply:   5,
    slots:    1,
    buildCost:  75,
    buildTurns:  1,
  },

  {
    weaponCode:   "WPN_FPA_ELECTRON_BEAM",
    faction:      "FPA",
    name: [{ code: "Kr", context: "전자 빔포" }],
    type:         "electron_beam",
    equippableBy: ["HL_FPA_BS", "HL_FPA_CR"],
    power:   70,
    range:    3,
    supply:   4,
    slots:    1,
    buildCost:  80,
    buildTurns:  1,
  },

  {
    weaponCode:   "WPN_FPA_RAILGUN",
    faction:      "FPA",
    name: [{ code: "Kr", context: "레일건" }],
    type:         "railgun",
    equippableBy: ["HL_FPA_BS", "HL_FPA_CR"],
    power:   65,
    range:    6,
    supply:   6,
    slots:    1,
    buildCost:  90,
    buildTurns:  1,
  },

  {
    weaponCode:   "WPN_FPA_MISSILE",
    faction:      "FPA",
    name: [{ code: "Kr", context: "미사일 런처" }],
    type:         "missile",
    equippableBy: ["HL_FPA_BS", "HL_FPA_CR", "HL_FPA_DS"],
    power:   55,
    range:    5,
    supply:   8,
    slots:    1,
    buildCost:  65,
    buildTurns:  1,
  },

  {
    weaponCode:   "WPN_FPA_LASER",
    faction:      "FPA",
    name: [{ code: "Kr", context: "레이저" }],
    type:         "laser",
    equippableBy: ["HL_FPA_CR", "HL_FPA_DS"],
    power:   30,
    range:    1,
    supply:   2,
    slots:    1,
    buildCost:  40,
    buildTurns:  1,
  },

  {
    weaponCode:   "WPN_FPA_FIGHTER",
    faction:      "FPA",
    name: [{ code: "Kr", context: "스파르타니안" }],
    type:         "fighter",
    equippableBy: ["HL_FPA_BS", "HL_FPA_CR", "HL_FPA_DS"],
    power:   35,
    range:    2,
    supply:   3,
    slots:    1,
    buildCost:  55,
    buildTurns:  1,
  },

]

export const WEAPON_MAP = Object.fromEntries(
  WEAPON_DATA.map(w => [w.weaponCode, w])
)
