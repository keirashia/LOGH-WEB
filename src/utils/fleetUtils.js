// 경로: src/utils/fleetUtils.js
// ================================================================
//  fleetUtils.js — 함대 데이터 유틸리티
//  수정: 2026-06-28
//
//  ■ 사용 범위
//    게임 전 (로비·시나리오선택·초기화):
//      buildFleetsMap(), fncGet*(), 마스터 맵 사용 가능.
//    게임 중:
//      gameStore.state(fleets, systems 등)만 사용.
//      이 파일의 함수·맵을 인게임 로직에서 호출하지 말 것.
//      → 게임 중 함대 정보는 gameStore.fleets[faction]으로 접근.
//
//  ※ 컴포넌트·스토어에서 data 파일을 직접 import 하지 말 것.
//
//  의존 데이터 파일 (외부에서 직접 import 금지):
//    flagshipData.js   → FLAGSHIP_DATA
//    formationData.js  → FORMATION_DATA
//    unitshipData.js   → UNIT_SHIP_DATA
//    charactersData.js → CHAR_BASE_MAP (인물 정보 연계용)
// ================================================================

import { FLAGSHIP_DATA }  from '@/data/base/fleet/flagshipData'
import { FORMATION_DATA } from '@/data/base/fleet/formationData'
import { UNIT_SHIP_DATA } from '@/data/base/fleet/unitshipData'
import { CHAR_BASE_MAP }  from '@/data/base/characters/charactersData'

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
 * buildFleetsMap(fleetData, fleetCharData, fleetShipData)
 * 시나리오 함대 파일 3종 → gameStore.fleets 초기값 생성.
 *
 * fltCode 불일치 규칙:
 *   fleetData    → 7자리 (예: FPA0020)
 *   fleetCharData, fleetShipData → 6자리 (예: FPA002)
 *   → fltCode.slice(0, 6)으로 매핑
 *
 * @param {object[]} fleetData       FLEET_DATA (함대 목록)
 * @param {object[]} fleetCharData   FLEET_CHARACTER_DATA (지휘관/부관)
 * @param {object[]} fleetShipData   FLEET_SHIP_DATA (함선 수)
 * @returns {{ REH: object[], FPA: object[], PZN: object[] }}
 */
export function buildFleetsMap(fleetData = [], fleetCharData = [], fleetShipData = []) {
  const result = { REH: [], FPA: [], PZN: [] }
  if (!fleetData.length) return result

  for (const fleet of fleetData) {
    if (fleet.parentFlt) continue
    if (!result[fleet.faction]) continue

    const baseCode    = fleet.fltCode.slice(0, 6)
    const commander   = fleetCharData.find(fc => fc.fltCode === baseCode && fc.type === 'C')
    const officers    = fleetCharData.filter(fc => fc.fltCode === baseCode && fc.type === 'O').map(fc => fc.charCode)
    const totalShips  = fleetShipData
      .filter(fs => fs.fltCode === baseCode)
      .reduce((sum, s) => sum + (s.shipAmt || 0), 0)

    result[fleet.faction].push({
      id:        fleet.fltCode,
      name:      fleet.fltFullName ?? (Array.isArray(fleet.fltName) ? fleet.fltName.find(n => n.code === 'Kr')?.context : fleet.fltName) ?? '',
      commander: commander?.charCode ?? null,
      officers,
      ships:     totalShips,
      maxShips:  totalShips,
      location:  fleet.location ?? fleet.fltLoc ?? null,
      status:    'standby',
      target:    null,
      upkeep:    Math.ceil(totalShips / 500),
    })
  }
  return result
}

// ================================================================
//  함대 조회 함수 (시나리오 데이터 인자로 전달)
// ================================================================

/**
 * fncGetFleetChars(fltCode, fleetCharData)
 * 특정 함대 소속 인물 목록 반환 (사령관 C / 부관 O / 분함대장 S).
 * 인물 기본 정보(charInfo) 포함.
 *
 * @param {string}   fltCode        6자리 기준 코드 (예: "FPA002")
 * @param {object[]} fleetCharData  FLEET_CHARACTER_DATA
 */
export function fncGetFleetChars(fltCode, fleetCharData = []) {
  if (!fltCode) return { error: '함대 코드 없음' }
  const members = fleetCharData.filter(f => f.fltCode === fltCode)
  if (!members.length) return { data: [] }
  return {
    data: members.map(m => ({
      ...m,
      charInfo: CHAR_BASE_MAP[m.charCode] ?? null,
    })),
  }
}

/**
 * fncGetCharFleet(charCode, fleetCharData)
 * 인물이 속한 함대 코드 및 역할 반환.
 *
 * @param {string}   charCode
 * @param {object[]} fleetCharData  FLEET_CHARACTER_DATA
 */
export function fncGetCharFleet(charCode, fleetCharData = []) {
  const entry = fleetCharData.find(f => f.charCode === charCode)
  if (!entry) return { error: `함대 미배속: ${charCode}` }
  return { data: { ...entry } }
}

// type → 역할 레이블
const _FLEET_TYPE_ROLE = { C: '사령관', O: '부관', S: '분함대 사령관' }

/**
 * getCharFleetRole(charCode, fleetData, fleetCharData, lang?)
 * 인물의 함대 역할 레이블 반환. (예: "제2함대 사령관", "로엔그람 함대 부관")
 * fleetCharData.fltCode는 6자리, fleetData.fltCode는 7자리이므로 startsWith로 매핑.
 *
 * @param {string}   charCode
 * @param {object[]} fleetData       FLEET_DATA
 * @param {object[]} fleetCharData   FLEET_CHARACTER_DATA
 * @param {'Kr'}     [lang='Kr']
 * @returns {string|null}  역할 레이블. 미배속이면 null.
 */
export function getCharFleetRole(charCode, fleetData = [], fleetCharData = [], lang = 'Kr') {
  const entry = fleetCharData.find(fc => fc.charCode === charCode)
  if (!entry) return null
  const fleet = fleetData.find(f => f.fltCode.startsWith(entry.fltCode))
  if (!fleet) return null
  const ctx = Array.isArray(fleet.fltName)
    ? fleet.fltName.find(n => n.code === lang)?.context ?? fleet.fltFullName ?? ''
    : fleet.fltFullName ?? fleet.fltName ?? ''
  const role = _FLEET_TYPE_ROLE[entry.type] ?? entry.type
  return `${ctx} ${role}`
}

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
 * fncGetFleetShips(fltCode, fleetShipData)
 * 특정 함대의 함선 구성 반환 (6자리 코드 기준).
 *
 * @param {string}   fltCode        6자리 기준 코드
 * @param {object[]} fleetShipData  FLEET_SHIP_DATA
 */
export function fncGetFleetShips(fltCode, fleetShipData = []) {
  if (!fltCode) return { error: '함대 코드 없음' }
  const ships = fleetShipData.filter(s => s.fltCode === fltCode)
  if (!ships.length) return { data: [] }
  const total = ships.reduce((sum, s) => sum + (s.shipAmt || 0), 0)
  return { data: ships.map(s => ({ ...s })), total }
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
