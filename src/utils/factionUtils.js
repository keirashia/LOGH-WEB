// 경로: src/utils/factionUtils.js
// ================================================================
//  factionUtils.js — 국가(faction) 데이터 유틸리티
//  수정: 2026-06-28
//
//  ■ 사용 범위
//    게임 전 (로비·시나리오선택·초기화):
//      buildFactionsMap(), fncGet*(), 맵·상수 사용 가능.
//    게임 중:
//      gameStore.state(factions, resources 등)만 사용.
//      이 파일의 함수·맵을 인게임 로직에서 호출하지 말 것.
//      → 게임 중 국가 정보는 gameStore.factions[factionId]로 접근.
//      → 게임 중 자원·함대 등 가변 상태는 gameStore.resources / gameStore.fleets.
//
//  ※ JS 데이터 파일은 게임 초기값 전용. 시나리오 파일을 반영한 store가 정답.
//  ※ 컴포넌트·스토어에서 data 파일을 직접 import 하지 말 것.
//
//  의존 데이터 파일 (외부에서 직접 import 금지):
//    factionsData.js  → FACTIONS_LIST (default export, 배열)
//    factionName.js   → FACTION_NAMES
// ================================================================

import FACTIONS_RAW      from '@/data/base/factions/factionsData'
import { FACTION_NAMES } from '@/data/base/factions/factionName'

// ================================================================
//  raw 데이터 re-export
// ================================================================
export { FACTION_NAMES }

/** FACTIONS_LIST: Faction[] — 전체 국가 배열 */
export const FACTIONS_LIST = FACTIONS_RAW

/**
 * FACTION_MAP: { [factionId]: Faction }
 * masterData.js의 FACTIONS와 동일한 구조.
 * gameStore 등 기존 코드의 FACTIONS 대체 대상.
 */
export const FACTION_MAP = Object.fromEntries(FACTIONS_RAW.map(f => [f.id, f]))

/**
 * FACTION_NAMES_MAP: { [factionId]: { Kr, En, Jp } }
 * 언어별 이름을 한 번에 조회하기 위한 중첩 맵.
 */
export const FACTION_NAMES_MAP = (() => {
  const map = {}
  for (const n of FACTION_NAMES) {
    ;(map[n.factionId] ??= {})[n.lang] = n
  }
  return map
})()

// ================================================================
//  다국어 이름 접근자
// ================================================================

/**
 * factionName(factionId, lang?)
 * 국가 풀네임 반환. 없으면 factionId 그대로 반환.
 */
export function factionName(factionId, lang = 'Kr') {
  return FACTION_NAMES_MAP[factionId]?.[lang]?.name
      ?? FACTION_NAMES_MAP[factionId]?.['Kr']?.name
      ?? factionId
}

/**
 * factionShortName(factionId, lang?)
 * 국가 약칭(shortName) 반환. 없으면 factionId 반환.
 */
export function factionShortName(factionId, lang = 'Kr') {
  return FACTION_NAMES_MAP[factionId]?.[lang]?.shortName
      ?? FACTION_NAMES_MAP[factionId]?.['Kr']?.shortName
      ?? factionId
}

// ================================================================
//  활성 국가 필터링
// ================================================================

/**
 * isActiveAt(faction, yearType, year)
 * 특정 연도에 해당 국가가 활성 상태인지 판정.
 * period[0] = 창건년, period[1] = 멸망년 (빈 문자열 = 제한 없음).
 *
 * @param {object} faction  FACTIONS_LIST 엔트리
 * @param {'SE'|'AD'|'RC'} yearType
 * @param {number} year
 */
export function isActiveAt(faction, yearType, year) {
  if (faction.periodType && faction.periodType !== yearType) return false
  const [start, end] = faction.period ?? ['', '']
  if (start && Number(start) > year) return false
  if (end   && Number(end)   < year) return false
  return true
}

/**
 * getActiveFactions(yearType, year)
 * 시나리오 시점에 활성 상태인 국가 목록 반환.
 *
 * @param {'SE'|'AD'|'RC'} yearType
 * @param {number} year
 * @returns {Faction[]}
 */
export function getActiveFactions(yearType, year) {
  return FACTIONS_RAW.filter(f => isActiveAt(f, yearType, year))
}

// ================================================================
//  초기화 빌더
// ================================================================

/**
 * buildFactionsMap(factionIds, scenarioFactionData?)
 * 게임 시작 시 gameStore.factions{} 초기값 생성.
 *
 * @param {string[]} factionIds          scenario.factions (예: ["REH", "FPA", "PZN"])
 * @param {object}   [scenarioFactionData={}]
 *   시나리오별 국가 오버라이드 (현재 TODO — scenarioDesc에서 추출 예정).
 *   형태: { [factionId]: { gold?: number, ... } }
 *
 * @returns {{ [factionId: string]: object }}
 *
 * 반환 필드:
 *   id, color, currency, flag
 *   ideology, economy  (factionsData.js 파생)
 *   nameKr, shortNameKr, nameEn, shortNameEn, nameJp, shortNameJp
 *   gold               (초기 자금 — 현재 기본값, 추후 scenarioFactionData 연동)
 */
export function buildFactionsMap(factionIds = [], scenarioFactionData = {}) {
  const result = {}
  for (const id of factionIds) {
    const base = FACTION_MAP[id]
    if (!base) continue
    const sc = scenarioFactionData[id] ?? {}

    result[id] = {
      // 기본 마스터 데이터
      id:       base.id,
      color:    base.color    ?? '',
      flag:     base.flag     ?? '',
      currency: base.currency ?? '',
      ideology: base.ideology ?? null,
      economy:  base.economy  ?? null,
      // 다국어 이름 (평면화)
      nameKr:      factionName(id, 'Kr'),
      shortNameKr: factionShortName(id, 'Kr'),
      nameEn:      factionName(id, 'En'),
      shortNameEn: factionShortName(id, 'En'),
      nameJp:      factionName(id, 'Jp'),
      shortNameJp: factionShortName(id, 'Jp'),
      // 초기 자금 (TODO: scenarioDesc에서 로드)
      gold: sc.gold ?? _DEFAULT_GOLD[id] ?? 3000,
    }
  }
  return result
}

// 시나리오 데이터 미구현 동안의 임시 기본 자금
const _DEFAULT_GOLD = {
  REH: 5000,
  FPA: 4500,
  PZN: 8000,
}

// ================================================================
//  국가 조회 함수
// ================================================================

/**
 * fncGetFactionInfo(factionId)
 * 국가 마스터 데이터 반환 (이념·경제체제·regime 포함).
 */
export function fncGetFactionInfo(factionId) {
  const faction = FACTION_MAP[factionId] ?? null
  if (!faction) return { error: `국가 코드 없음: ${factionId}` }
  return {
    data: {
      ...faction,
      nameKr:      factionName(factionId, 'Kr'),
      shortNameKr: factionShortName(factionId, 'Kr'),
    },
  }
}

/**
 * fncGetFactionsByPeriod(yearType, year)
 * 특정 시점에 활성 상태인 국가 목록 반환 (이름 포함).
 */
export function fncGetFactionsByPeriod(yearType, year) {
  const list = getActiveFactions(yearType, year)
  if (!list.length) return { data: [] }
  return {
    data: list.map(f => ({
      ...f,
      nameKr:      factionName(f.id, 'Kr'),
      shortNameKr: factionShortName(f.id, 'Kr'),
    })),
  }
}
