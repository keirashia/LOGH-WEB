// ================================================================
//  weaponData.js — 함선 무기 마스터 데이터
//  경로: src/data/base/fleet/weaponData.js
//  최종 수정: 2026-08-13
// ================================================================
// weaponCode : WPN_${faction}_${type}_${grade}
//              특수무기(함재기 등): WPN_${faction}_${type}
//
// grade      : L(전함급) | M(순양함급) | S(구축함급) | 없음(특수)
//              함체 grade와 매칭하여 장착 가능 여부 판정 (equippableBy 폐지)
//
// type       : beam | electron_beam | railgun | missile | laser
//              fighter | gunship
//
// 전투 스탯 3종:
//   power    : 공격력
//   range    : 사거리
//   supply   : 전투 1회당 소모 물자
//
// buildCost  : 무기 건조비 (크레딧)
// ================================================================

export const WEAPON_DATA = [

  // ── 은하제국 (REH) — L등급 (전함·고속전함) ──────────────────

  {
    weaponCode: "WPN_REH_BEAM_L",
    faction:    "REH",
    grade:      "L",
    type:       "beam",
    name: [{ code: "Kr", context: "중성자 빔포 (대형)" }],
    power:   90,
    range:    4,
    supply:   7,
    buildCost:  80,
  },

  {
    weaponCode: "WPN_REH_MISSILE_L",
    faction:    "REH",
    grade:      "L",
    type:       "missile",
    name: [{ code: "Kr", context: "미사일 런처 (대형)" }],
    power:   65,
    range:    6,
    supply:  10,
    buildCost:  90,
  },

  // ── 은하제국 (REH) — M등급 (순양함) ────────────────────────

  {
    weaponCode: "WPN_REH_BEAM_M",
    faction:    "REH",
    grade:      "M",
    type:       "beam",
    name: [{ code: "Kr", context: "중성자 빔포 (중형)" }],
    power:   60,
    range:    3,
    supply:   5,
    buildCost:  55,
  },

  {
    weaponCode: "WPN_REH_MISSILE_M",
    faction:    "REH",
    grade:      "M",
    type:       "missile",
    name: [{ code: "Kr", context: "미사일 런처 (중형)" }],
    power:   45,
    range:    5,
    supply:   7,
    buildCost:  65,
  },

  // ── 은하제국 (REH) — S등급 (구축함) ────────────────────────

  {
    weaponCode: "WPN_REH_BEAM_S",
    faction:    "REH",
    grade:      "S",
    type:       "beam",
    name: [{ code: "Kr", context: "중성자 빔포 (소형)" }],
    power:   36,
    range:    3,
    supply:   3,
    buildCost:  30,
  },

  {
    weaponCode: "WPN_REH_MISSILE_S",
    faction:    "REH",
    grade:      "S",
    type:       "missile",
    name: [{ code: "Kr", context: "미사일 런처 (소형)" }],
    power:   28,
    range:    5,
    supply:   4,
    buildCost:  40,
  },

  // ── 은하제국 (REH) — 특수 (항모 고정 무장) ──────────────────

  {
    weaponCode: "WPN_REH_FIGHTER",
    faction:    "REH",
    grade:      null,
    type:       "fighter",
    name: [{ code: "Kr", context: "발키리" }],
    power:   50,
    range:    3,
    supply:   4,
    buildCost:  60,
  },

  {
    weaponCode: "WPN_REH_GUNSHIP",
    faction:    "REH",
    grade:      null,
    type:       "gunship",
    name: [{ code: "Kr", context: "건십" }],
    power:   60,
    range:    2,
    supply:   5,
    buildCost:  70,
  },


  // ── 자유행성동맹 (FPA) — L등급 (전함) ──────────────────────

  {
    weaponCode: "WPN_FPA_BEAM_L",
    faction:    "FPA",
    grade:      "L",
    type:       "beam",
    name: [{ code: "Kr", context: "중성자 빔포 (대형)" }],
    power:   85,
    range:    4,
    supply:   7,
    buildCost:  75,
  },

  {
    weaponCode: "WPN_FPA_ELECTRON_L",
    faction:    "FPA",
    grade:      "L",
    type:       "electron_beam",
    name: [{ code: "Kr", context: "전자 빔포 (대형)" }],
    power:   78,
    range:    3,
    supply:   6,
    buildCost:  85,
  },

  {
    weaponCode: "WPN_FPA_RAILGUN_L",
    faction:    "FPA",
    grade:      "L",
    type:       "railgun",
    name: [{ code: "Kr", context: "레일건 (대형)" }],
    power:   72,
    range:    7,
    supply:   8,
    buildCost: 100,
  },

  {
    weaponCode: "WPN_FPA_MISSILE_L",
    faction:    "FPA",
    grade:      "L",
    type:       "missile",
    name: [{ code: "Kr", context: "미사일 런처 (대형)" }],
    power:   60,
    range:    6,
    supply:  10,
    buildCost:  85,
  },

  // ── 자유행성동맹 (FPA) — M등급 (순양함) ────────────────────

  {
    weaponCode: "WPN_FPA_BEAM_M",
    faction:    "FPA",
    grade:      "M",
    type:       "beam",
    name: [{ code: "Kr", context: "중성자 빔포 (중형)" }],
    power:   56,
    range:    4,
    supply:   5,
    buildCost:  50,
  },

  {
    weaponCode: "WPN_FPA_ELECTRON_M",
    faction:    "FPA",
    grade:      "M",
    type:       "electron_beam",
    name: [{ code: "Kr", context: "전자 빔포 (중형)" }],
    power:   52,
    range:    3,
    supply:   4,
    buildCost:  60,
  },

  {
    weaponCode: "WPN_FPA_RAILGUN_M",
    faction:    "FPA",
    grade:      "M",
    type:       "railgun",
    name: [{ code: "Kr", context: "레일건 (중형)" }],
    power:   48,
    range:    6,
    supply:   5,
    buildCost:  70,
  },

  {
    weaponCode: "WPN_FPA_MISSILE_M",
    faction:    "FPA",
    grade:      "M",
    type:       "missile",
    name: [{ code: "Kr", context: "미사일 런처 (중형)" }],
    power:   40,
    range:    5,
    supply:   7,
    buildCost:  60,
  },

  // ── 자유행성동맹 (FPA) — S등급 (구축함) ────────────────────

  {
    weaponCode: "WPN_FPA_BEAM_S",
    faction:    "FPA",
    grade:      "S",
    type:       "beam",
    name: [{ code: "Kr", context: "중성자 빔포 (소형)" }],
    power:   34,
    range:    3,
    supply:   3,
    buildCost:  28,
  },

  {
    weaponCode: "WPN_FPA_MISSILE_S",
    faction:    "FPA",
    grade:      "S",
    type:       "missile",
    name: [{ code: "Kr", context: "미사일 런처 (소형)" }],
    power:   25,
    range:    5,
    supply:   4,
    buildCost:  35,
  },

  {
    weaponCode: "WPN_FPA_LASER_S",
    faction:    "FPA",
    grade:      "S",
    type:       "laser",
    name: [{ code: "Kr", context: "레이저" }],
    power:   32,
    range:    2,
    supply:   2,
    buildCost:  25,
  },

  // ── 자유행성동맹 (FPA) — 특수 (항모 고정 무장) ──────────────

  {
    weaponCode: "WPN_FPA_FIGHTER",
    faction:    "FPA",
    grade:      null,
    type:       "fighter",
    name: [{ code: "Kr", context: "스파르타니안" }],
    power:   40,
    range:    3,
    supply:   3,
    buildCost:  55,
  },

]

export const WEAPON_MAP = Object.fromEntries(
  WEAPON_DATA.map(w => [w.weaponCode, w])
)
