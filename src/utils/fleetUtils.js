// 경로: src/utils/fleetUtils.js
// ================================================================
//  fleetUtils.js — 함대 데이터 유틸리티
//  수정: 2026-07-02
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
// ================================================================

import { FLAGSHIP_DATA }  from '@/data/base/fleet/flagshipData'
import { FORMATION_DATA } from '@/data/base/fleet/formationData'
import { UNIT_SHIP_DATA } from '@/data/base/fleet/unitshipData'

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

/**
 * computeFleetStats(fleet, charBaseMap)
 * charList + charBaseMap 기반 함대 스탯 계산
 * 규칙:
 *   1. type=C 사령관 statCmd/statCsm 고정 (상한 미적용)
 *   2. 전원(C+O) 각 스탯 max 선택
 *   3. 각 스탯 = Math.min(선택값, statCsm)
 */
export function computeFleetStats(fleet, charBaseMap = {}) {
  const list = fleet.charList ?? []
  if (!list.length) return null

  const cmdEntry = list.find(c => c.type === 'C')
  const cmdr     = cmdEntry ? charBaseMap[cmdEntry.charCode] : null
  const statCsm  = cmdr?.statCsm ?? 100
  const statCmd  = cmdr?.statCmd ?? 0

  const KEYS = ['statAtt','statDef','statFst','statMng','statInf','statGfg','statAfg','statPlt']
  const chars = list.map(c => charBaseMap[c.charCode]).filter(Boolean)

  const result = { statCmd, statCsm }
  for (const key of KEYS) {
    const maxVal = Math.max(0, ...chars.map(c => c[key] ?? 0))
    result[key] = Math.min(maxVal, statCsm)
  }
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
    if (fleet.parentFlt) continue            // 분함대 제외 (상위 함대로 관리)
    const f = fleet.faction
    if (!result[f]) result[f] = []

    // 분함대(parentFlt로 이 함대를 가리키는 하위 함대) 함선 수를 상위 함대에 합산
    const childShips = fleetData
      .filter(c => c.parentFlt === fleet.fltCode)
      .reduce((s, c) => s + sumShips(c.shipList), 0)
    const totalShips = sumShips(fleet.shipList) + childShips

    result[f].push({
      // 불변값
      id:            fleet.fltCode,
      faction:       f,
      name:          getFltName(fleet, 'Kr'),
      parentFlt:     fleet.parentFlt ?? null,
      location:      fleet.location?.locCode ?? null,
      formation:     fleet.formationList?.find(ff => ff.useYn)?.ffCode ?? null,
      commander:     fleet.charList?.find(c => c.type === 'C')?.charCode ?? null,
      officers:      fleet.charList?.filter(c => c.type === 'O').map(c => c.charCode) ?? [],
      // shipList 파생
      ships:         totalShips,
      maxShips:      totalShips,
      upkeep:        Math.ceil(totalShips / 500),
      // 런타임 변동값 초기값
      status:        'standby',
      moral:         100,
      supply:        100,
      moveTurnsLeft: 0,
      moveTarget:    null,
      battleId:      null,
      target:        null,
      stats:         null,   // computeFleetStats() lazy 캐시
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
