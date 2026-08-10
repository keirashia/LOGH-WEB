// 경로: src/utils/fleetUtils.js
// ================================================================
//  fleetUtils.js — 함대 데이터 유틸리티
//  수정: 2026-08-06
//
//  ■ 사용 범위
//    공통 (게임 전·후 모두):
//      FLEET_STAT_PAIRS, FLEET_STAT_DEFS, statPct
//      computeFleetStatsByStore()
//    게임 전 전용 (로비·시나리오선택·초기화):
//      buildFleetsMap(), buildCharTraitEffects(), fncGet*(), 마스터 맵(FLAGSHIP_MAP 등)
//      → 인게임 로직에서 호출 금지. 게임 중 함대는 gameStore.fleets[faction]으로 접근.
//
//  ※ 컴포넌트·스토어에서 data 파일을 직접 import 하지 말 것.
//
//  의존 데이터 파일 (외부에서 직접 import 금지):
//    flagshipData.js      → FLAGSHIP_DATA
//    formationData.js     → FORMATION_DATA
//    unitshipData.js      → UNIT_SHIP_DATA
//    charactersTraits.js  → CHAR_TRAITS
//    charTraitData.js     → CHAR_TRAITS_MASTER
// ================================================================

import { FLAGSHIP_DATA }  from '@/data/base/fleet/flagshipData'
import { FORMATION_DATA } from '@/data/base/fleet/formationData'
import { UNIT_SHIP_DATA } from '@/data/base/fleet/unitshipData'
import { CHAR_TRAITS }        from '@/data/base/characters/charactersTraits'
import { CHAR_TRAITS_MASTER } from '@/data/base/trait/chars/charTraitData'

// ================================================================
//  능력치 표시 정의
// ================================================================

const _GOLD = '#c9a84c'

// statCmd·statCsm 포함 10개. 계산 루프용 8개는 _FLEET_STAT_KEYS 참조.
/** 쌍으로 묶인 능력치 정의 (표시 순서) */
export const FLEET_STAT_PAIRS = [
  [['통솔', 'statCmd', _GOLD], ['지휘', 'statCsm', _GOLD]],
  [['공격', 'statAtt', _GOLD], ['방어', 'statDef', _GOLD]],
  [['운영', 'statMng', _GOLD], ['정보', 'statInf', _GOLD]],
  [['육전', 'statGfg', _GOLD], ['공전', 'statAfg', _GOLD]],
  [['기동', 'statFst', _GOLD], ['정치', 'statPlt', _GOLD]],
]

/** 단일 배열 (순회·검색 용도) */
export const FLEET_STAT_DEFS = FLEET_STAT_PAIRS.flat()

/** 능력치 바 퍼센트 계산 (0~100 클램프) */
export function statPct(val) {
  return Math.min(100, Math.max(0, val ?? 0))
}

// ================================================================
//  트레잇 보정 맵 빌더
// ================================================================

/**
 * buildCharTraitEffects(charTraits?, traitMaster?)
 * CHAR_TRAITS × CHAR_TRAITS_MASTER → 인물별 영구 스탯 보정 합산 맵.
 * 기본값으로 base 데이터 사용. gameStore init 시 1회 호출 후 state에 보관.
 *
 * 반환: { [charCode]: { statAtt: N, statCmd: N, ... } }
 * ※ conditionalEffects(트리거 기반)는 포함하지 않음.
 */
export function buildCharTraitEffects(charTraits = CHAR_TRAITS, traitMaster = CHAR_TRAITS_MASTER) {
  const masterMap = Object.fromEntries(traitMaster.map(t => [t.id, t]))
  const result = {}
  for (const entry of charTraits) {
    const master = masterMap[entry.traitCode]
    if (!master?.effects) continue
    const acc = result[entry.charCode] ??= {}
    for (const [key, val] of Object.entries(master.effects)) {
      acc[key] = (acc[key] ?? 0) + val
    }
  }
  return result
}

// ================================================================
//  raw 데이터 re-export
// ================================================================
export { FLAGSHIP_DATA }
export { FORMATION_DATA }
export { UNIT_SHIP_DATA }

// ================================================================
//  pre-built 조회 맵
// ================================================================

/** FLAGSHIP_MAP: { [shipCode]: Flagship } */
export const FLAGSHIP_MAP = Object.fromEntries(FLAGSHIP_DATA.map(f => [f.shipCode, f]))

/** FORMATION_MAP: { [ffCode]: Formation } */
export const FORMATION_MAP = Object.fromEntries(FORMATION_DATA.map(f => [f.ffCode, f]))

/** UNIT_SHIP_MAP: { [shipCode]: UnitShip } */
export const UNIT_SHIP_MAP = Object.fromEntries(UNIT_SHIP_DATA.map(u => [u.shipCode, u]))

// ================================================================
//  함대 초기화 빌더
// ================================================================

/**
 * getFltName(fleet, lang?)
 * fltName 배열에서 지정 언어 context 반환. 없으면 Kr 폴백.
 */
export function getFltName(fleet, lang = 'Kr') {
  if (!Array.isArray(fleet.fltName)) return fleet.fltName ?? ''
  return fleet.fltName.find(n => n.code === lang)?.context
      ?? fleet.fltName.find(n => n.code === 'Kr')?.context
      ?? ''
}

// statCmd·statCsm은 compute 함수에서 별도 처리하므로 제외.
// 표시용 전체 목록은 FLEET_STAT_PAIRS 참조.
const _FLEET_STAT_KEYS = ['statAtt','statDef','statFst','statMng','statInf','statGfg','statAfg','statPlt']

/**
 * computeFleetStats(fleet, charBaseMap)
 * raw fleetData(charList 포함) + charBaseMap 기반 함대 스탯 계산.
 * 초기화·로비 등 게임 시작 전 용도.
 *
 * 규칙:
 *   - 사령관(C): 본인 스탯 cap 없이 그대로 사용
 *   - 부관(O): 각 스탯을 statCsm으로 제한 후 최고값 선택
 *   - 최종: max(사령관 원본, 부관 제한값 최고)
 */
export function computeFleetStats(fleet, charBaseMap = {}) {
  const list = fleet.charList ?? []
  if (!list.length) return null

  const cmdEntry = list.find(c => c.type === 'C' || c.type === 'S')
  const cmdr     = cmdEntry ? charBaseMap[cmdEntry.charCode] : null
  const statCsm  = cmdr?.statCsm ?? 100
  const statCmd  = cmdr?.statCmd ?? 0

  const officers = list
    .filter(c => c.type === 'O')
    .map(c => charBaseMap[c.charCode])
    .filter(Boolean)

  const result = { statCmd, statCsm }
  for (const key of _FLEET_STAT_KEYS) {
    const cmdVal    = cmdr?.[key] ?? 0
    const ofcMax    = officers.length
      ? Math.max(0, ...officers.map(o => Math.min(o[key] ?? 0, statCsm)))
      : 0
    result[key] = Math.max(cmdVal, ofcMax)
  }
  return result
}

/**
 * computeFleetStatsByStore(fleet, characters, traitEffects?)
 * gameStore 형식 함대(commander/officers 문자열) + characters 맵 기반 스탯 계산.
 * 인게임 컴포넌트에서 사용.
 *
 * 규칙: computeFleetStats와 동일
 * traitEffects: buildCharTraitEffects() 결과. 영구 트레잇 보정 적용.
 *   - 사령관: 보정 후 값 그대로 (100 초과 허용)
 *   - 부관:   보정 후 값을 statCsm으로 cap
 *   - conditionalEffects(트리거 기반)는 별도 레이어에서 처리
 * 반환값에 _attr: { [key]: charCode } 포함 — 각 스탯의 기여 인물 코드
 */
export function computeFleetStatsByStore(fleet, characters = {}, traitEffects = {}) {
  if (!fleet) return null

  const cmdrCode  = fleet.commander ?? null
  const cmdr      = cmdrCode ? (characters[cmdrCode] ?? null) : null
  const cmdrBonus = traitEffects[cmdrCode] ?? {}
  const statCmd   = (cmdr?.statCmd ?? 0) + (cmdrBonus.statCmd ?? 0)
  const statCsm   = cmdr
    ? (cmdr.statCsm ?? 100) + (cmdrBonus.statCsm ?? 0)
    : 100

  const officerEntries = (fleet.officers ?? [])
    .map(code => ({ code, char: characters[code] }))
    .filter(e => e.char)

  const result = { statCmd, statCsm }
  const attr   = { statCmd: cmdrCode, statCsm: cmdrCode }

  for (const key of _FLEET_STAT_KEYS) {
    const cmdVal = (cmdr?.[key] ?? 0) + (cmdrBonus[key] ?? 0)

    let bestOfcVal  = 0
    let bestOfcCode = null
    for (const { code, char } of officerEntries) {
      const ofcBonus = traitEffects[code] ?? {}
      const v = Math.min((char[key] ?? 0) + (ofcBonus[key] ?? 0), statCsm)
      if (v > bestOfcVal) { bestOfcVal = v; bestOfcCode = code }
    }

    if (bestOfcVal > cmdVal) {
      result[key] = bestOfcVal
      attr[key]   = bestOfcCode
    } else {
      result[key] = cmdVal
      attr[key]   = cmdrCode
    }
  }

  result._attr = attr
  return result
}

/**
 * getFleetAssignment(charCode, fleetData, lang?)
 * 인물의 함대 직책 라벨 반환
 * 반환 예: "제2함대 사령관", "로엔그람 함대 부관"
 */
export function getFleetAssignment(charCode, fleetData = [], lang = 'Kr') {
  for (const fleet of fleetData) {
    const entry = (fleet.charList ?? []).find(c => c.charCode === charCode)
    if (!entry) continue
    const name  = getFltName(fleet, lang)
    const label = { C: '사령관', O: '부관', S: '사령관' }[entry.type] ?? ''
    return `${name} ${label}`.trim()
  }
  return null
}

/**
 * getCharFleetRole(charCode, fleetData)
 * 인물의 함대 소속 코드 및 역할 타입 반환.
 *
 * @param {string}   charCode
 * @param {object[]} fleetData  FLEET_DATA
 * @returns {{ fltCode: string, type: 'C'|'O'|'S' }|null}
 */
export function getCharFleetRole(charCode, fleetData = []) {
  for (const fleet of fleetData) {
    const entry = (fleet.charList ?? []).find(c => c.charCode === charCode)
    if (entry) return { fltCode: fleet.fltCode, type: entry.type }
  }
  return null
}

/**
 * buildFleetsMap(fleetData)
 * 시나리오 함대 파일 → gameStore.fleets 초기값 생성.
 *
 * @param {object[]} fleetData  FLEET_DATA (함대 목록)
 * @returns {{ [faction: string]: object[] }}
 */
export function buildFleetsMap(fleetData = []) {
  const result = {}
  const sumShips = list => (list ?? []).reduce((s, sh) => s + (sh.shipAmt ?? 0), 0)

  for (const fleet of fleetData) {
    const f = fleet.faction
    if (!result[f]) result[f] = []

    const totalShips = sumShips(fleet.shipList)

    // 모함대에만 분함대 사령관 목록 첨부 (참조용)
    const subCommanders = fleet.parentFlt ? [] : fleetData
      .filter(c => c.parentFlt === fleet.fltCode)
      .flatMap(c =>
        (c.charList ?? [])
          .filter(ch => ch.type === 'S')
          .map(ch => ({ charCode: ch.charCode, fleetName: getFltName(c, 'Kr') }))
      )

    result[f].push({
      id:            fleet.fltCode,
      faction:       f,
      name:          getFltName(fleet, 'Kr'),
      parentFlt:     fleet.parentFlt ?? null,
      location:      fleet.location?.locCode ?? null,
      locPos:        fleet.location?.locPos ?? null,
      formation:     fleet.formationList?.find(ff => ff.useYn)?.ffCode ?? null,
      // 분함대는 type=S가 사령관
      commander:     fleet.charList?.find(c => c.type === 'C' || c.type === 'S')?.charCode ?? null,
      officers:      fleet.charList?.filter(c => c.type === 'O').map(c => c.charCode) ?? [],
      subCommanders,
      ships:         totalShips,
      maxShips:      totalShips,
      upkeep:        Math.ceil(totalShips / 500),
      status:        'standby',
      moral:         100,
      supply:        100,
      moveTurnsLeft: 0,
      moveTarget:    null,
      battleId:      null,
      target:        null,
    })
  }
  return result
}

// ================================================================
//  함대 조회 함수 (시나리오 데이터 인자로 전달)
// ================================================================

/**
 * fncGetFleetsByFaction(faction, fleetData)
 * 세력별 함대 목록 반환 (상위 함대만, parentFlt 없는 것).
 *
 * @param {string}   faction    'REH' | 'FPA' | 'PZN'
 * @param {object[]} fleetData  FLEET_DATA
 */
export function fncGetFleetsByFaction(faction, fleetData = []) {
  if (!faction) return { error: '세력 코드 없음' }
  const list = fleetData.filter(f => f.faction === faction && !f.parentFlt)
  return { data: list.map(f => ({ ...f })) }
}

/**
 * fncGetFleetTraits(fltCode, fleetTraitData)
 * 특정 함대에 부착된 트레잇 목록 반환.
 *
 * @param {string}   fltCode         6자리 기준 코드
 * @param {object[]} fleetTraitData  FLEET_TRAIT_DATA
 */
export function fncGetFleetTraits(fltCode, fleetTraitData = []) {
  if (!fltCode) return { error: '함대 코드 없음' }
  const traits = fleetTraitData.filter(t => t.fltCode === fltCode)
  return { data: traits.map(t => ({ ...t })) }
}

// ================================================================
//  진형 조회 함수
// ================================================================

/**
 * fncGetFormationInfo(ffCode)
 * 진형 마스터 데이터 반환.
 */
export function fncGetFormationInfo(ffCode) {
  const formation = FORMATION_MAP[ffCode] ?? null
  if (!formation) return { error: `진형 코드 없음: ${ffCode}` }
  return { data: { ...formation } }
}

/**
 * fncGetFormationsByType(ffType)
 * 진형 분류(ATK/DEF/MOV/ENC)별 목록 반환.
 *
 * @param {'ATK'|'DEF'|'MOV'|'ENC'} ffType
 */
export function fncGetFormationsByType(ffType) {
  const list = FORMATION_DATA.filter(f => f.ffType === ffType)
  if (!list.length) return { data: [] }
  return { data: list.map(f => ({ ...f })) }
}

// ================================================================
//  함선 제원 조회 함수
// ================================================================

/**
 * fncGetFlagshipInfo(shipCode)
 * 기함 제원 반환.
 */
export function fncGetFlagshipInfo(shipCode) {
  const ship = FLAGSHIP_MAP[shipCode] ?? null
  if (!ship) return { error: `기함 코드 없음: ${shipCode}` }
  return { data: { ...ship } }
}

/**
 * fncGetUnitShipInfo(shipCode)
 * 일반 함선 제원 반환.
 */
export function fncGetUnitShipInfo(shipCode) {
  const ship = UNIT_SHIP_MAP[shipCode] ?? null
  if (!ship) return { error: `함선 코드 없음: ${shipCode}` }
  return { data: { ...ship } }
}
