// 경로: src/utils/charUtils.js
// ================================================================
//  charUtils.js — 인물 데이터 유틸리티 함수
//  경로: src/utils/charUtils.js
//  작성: 2026-06-16 / 수정: 2026-06-22 (friend 원형 좌표계 반영)
//
//  의존성:
//    CHAR_BASE_MAP  ← charactersData.js
//    CHAR_TRAITS    ← charactersTraits.js
//    CHAR_JOBS      ← charactersJobs.js
//    TRAIT_MASTER   ← charTraitData.js
//    JOB_DATA       ← jobData.js
//    AGENDA_ACTIONS ← agendaData.js (추후)
// ================================================================

import { CHAR_BASE, CHAR_BASE_MAP } from '@/data/base/characters/charactersData'
import { CHAR_JOBS }                from '@/data/base/characters/charactersJobs'
import { CHAR_TRAITS_MASTER }       from '@/data/base/trait/chars/charTraitData'
import { CHAR_TRAITS }              from '@/data/base/characters/charactersTraits'
import { JOB_DATA }                 from '@/data/base/jobs/jobData'

// ── friend 좌표계 ────────────────────────────────────────────────
// friend는 0~299의 "원형(순환) 좌표"이다. 299 다음은 다시 0으로 돌아간다.
// 두 인물 간 거리는 단순 절대값 차이가 아니라, 원을 양 방향으로 돌았을 때
// 더 짧은 쪽 거리로 계산한다 (예: 10과 295는 거리 15로 매우 가까운 관계).
const FRIEND_RANGE = 300 // 0~299, 총 300개의 좌표

// ── 친밀도 등급 기준 (원형 거리 기준, 0~150 범위) ─────────────────
// 라인하르트(150)-브라운슈바이크(50), 라인하르트(150)-리텐하임(250),
// 양웬리(145)-트류니히트(245) → 모두 순환거리 100, 모두 '상극'이어야 하므로
// hostile 구간이 100부터 시작하도록 설계.
const FRIENDSHIP_GRADES = [
  { max:  30, grade: 'close',        labelKr: '절친',   labelEn: 'Close'        },
  { max:  60, grade: 'friendly',     labelKr: '친함',   labelEn: 'Friendly'     },
  { max:  90, grade: 'neutral',      labelKr: '보통',   labelEn: 'Neutral'      },
  { max:  99, grade: 'uncomfortable',labelKr: '불편함', labelEn: 'Uncomfortable'},
  { max: Infinity, grade: 'hostile', labelKr: '상극',   labelEn: 'Hostile'      },
]

/**
 * getCircularDiff(a, b)
 * 0~299 원형 좌표계에서 두 값 사이의 최短(원을 양방향으로 돌았을 때 더 짧은 쪽) 거리를 계산.
 *
 * @param {number} a
 * @param {number} b
 * @returns {number} 0 ~ 150 사이의 거리값
 *
 * @example
 * getCircularDiff(10, 295)  // → 15  (10→0→295 방향이 더 짧음)
 * getCircularDiff(150, 50)  // → 100
 */
function getCircularDiff(a, b) {
  const diff = Math.abs(a - b)
  return Math.min(diff, FRIEND_RANGE - diff)
}

// ================================================================
//  캐릭터 조회
// ================================================================

/**
 * fncGetCharInfo(charCode, scCode?)
 * 인물 기본 데이터 반환. 시나리오 코드가 있으면 오버라이드 적용(추후 구현).
 *
 * @param {string} charCode  인물 코드 (예: 'CH_000064')
 * @param {string} [scCode]  시나리오 코드 (예: 'SE796_0211_001')
 * @returns {{ data: object }|{ error: string }}
 */
export function fncGetCharInfo(charCode, scCode = null) {
  const base = CHAR_BASE_MAP[charCode] ?? null
  if (!base) return { error: `인물 코드 없음: ${charCode}` }

  // TODO: scCode가 있으면 시나리오 오버라이드 merge
  // const override = fncGetScenarioCharOverride(scCode, charCode)
  // const data = override ? { ...base, ...override } : base

  return { data: { ...base } }
}

/**
 * fncGetCharsByFaction(factionCode, scCode?)
 * 세력별 인물 목록 반환.
 *
 * @param {string} factionCode  세력 코드 (예: 'FPA', 'REH', 'PZN')
 * @param {string} [scCode]     시나리오 코드
 * @returns {{ data: object[] }|{ error: string }}
 */
export function fncGetCharsByFaction(factionCode, scCode = null) {
  if (!factionCode) return { error: '세력 코드 없음' }

  const list = CHAR_BASE.filter(c => c.faction === factionCode)
  if (!list.length) return { error: `세력 인물 없음: ${factionCode}` }

  return { data: list.map(c => ({ ...c })) }
}

/**
 * fncGetCharTraits(charCode)
 * 인물에 할당된 트레잇 목록 반환 (마스터 데이터 포함).
 *
 * @param {string} charCode  인물 코드
 * @returns {{ data: object[] }|{ error: string }}
 */
export function fncGetCharTraits(charCode) {
  const assigns = CHAR_TRAITS.filter(t => t.charCode === charCode)
  if (!assigns.length) return { data: [] }

  const traitMap = Object.fromEntries(CHAR_TRAITS_MASTER.map(t => [t.id, t]))

  const data = assigns.map(a => ({
    ...a,
    master: traitMap[a.traitCode] ?? null,
  }))

  return { data }
}

/**
 * fncGetCharJobs(charCode)
 * 인물에 할당된 직업 목록 반환 (마스터 데이터 포함).
 *
 * @param {string} charCode  인물 코드
 * @returns {{ data: object[] }|{ error: string }}
 */
export function fncGetCharJobs(charCode) {
  const assigns = CHAR_JOBS.filter(j => j.charCode === charCode)
  if (!assigns.length) return { data: [] }

  const jobMap = Object.fromEntries(JOB_DATA.map(j => [j.id, j]))

  const data = assigns.map(a => ({
    ...a,
    master: jobMap[a.jobCode] ?? null,
  }))

  return { data }
}

// ================================================================
//  함대 조회
// ================================================================

/**
 * fncGetFleetChars(fltCode, fleetCharData)
 * 특정 함대 소속 인물 목록 반환 (사령관/부관/분함대장).
 *
 * @param {string}   fltCode        함대 코드 (예: 'FPA0020')
 * @param {object[]} fleetCharData  시나리오별 fleetCharacterData
 * @returns {{ data: object[] }|{ error: string }}
 */
export function fncGetFleetChars(fltCode, fleetCharData = []) {
  if (!fltCode) return { error: '함대 코드 없음' }

  const members = fleetCharData.filter(f => f.fltCode === fltCode)
  if (!members.length) return { data: [] }

  const data = members.map(m => ({
    ...m,
    charInfo: CHAR_BASE_MAP[m.charCode] ?? null,
  }))

  return { data }
}

/**
 * fncGetCharFleet(charCode, fleetCharData)
 * 인물이 속한 함대 코드 반환.
 *
 * @param {string}   charCode       인물 코드
 * @param {object[]} fleetCharData  시나리오별 fleetCharacterData
 * @returns {{ data: object }|{ error: string }}
 */
export function fncGetCharFleet(charCode, fleetCharData = []) {
  const entry = fleetCharData.find(f => f.charCode === charCode)
  if (!entry) return { error: `함대 미배속: ${charCode}` }

  return { data: { ...entry } }
}

// ================================================================
//  직업 / 트레잇 조회
// ================================================================

/**
 * fncGetJobInfo(jobCode)
 * 직업 마스터 데이터 반환.
 *
 * @param {string} jobCode  직업 코드 (예: 'JB_M001')
 * @returns {{ data: object }|{ error: string }}
 */
export function fncGetJobInfo(jobCode) {
  const job = JOB_DATA.find(j => j.id === jobCode)
  if (!job) return { error: `직업 코드 없음: ${jobCode}` }

  return { data: { ...job } }
}

/**
 * fncGetTraitInfo(traitCode)
 * 트레잇 마스터 데이터 반환.
 *
 * @param {string} traitCode  트레잇 코드 (예: 'TRC_U_000064')
 * @returns {{ data: object }|{ error: string }}
 */
export function fncGetTraitInfo(traitCode) {
  const trait = CHAR_TRAITS_MASTER.find(t => t.id === traitCode)
  if (!trait) return { error: `트레잇 코드 없음: ${traitCode}` }

  return { data: { ...trait } }
}

// ================================================================
//  거버넌스
// ================================================================

/**
 * fncGetDecisionChain(factionCode, actionType)
 * 의사결정 결재 체인 반환.
 * agendaData.js의 APPROVAL_CHAINS 기반.
 *
 * @param {string} factionCode  세력 코드 (예: 'FPA', 'REH', 'PZN')
 * @param {string} actionType   행동 타입 (예: 'war_declare', 'fleet_deploy')
 * @returns {{ data: { chain: string[], jobInfos: object[] } }|{ error: string }}
 *
 * TODO: agendaData.js import 필요
 */
export function fncGetDecisionChain(factionCode, actionType) {
  // TODO: import { APPROVAL_CHAINS } from '@/data/base/agenda/agendaData'
  // const chains = APPROVAL_CHAINS[factionCode]
  // if (!chains) return { error: `세력 결재 체인 없음: ${factionCode}` }
  // const chain = chains[actionType] ?? chains['default'] ?? []
  // const jobInfos = chain.map(jobCode => JOB_DATA.find(j => j.id === jobCode) ?? { id: jobCode })
  // return { data: { chain, jobInfos } }

  return { error: 'TODO: agendaData import 필요' }
}

// ================================================================
//  친밀도 계산
// ================================================================

/**
 * fncGetFriendship(charCodeA, charCodeB)
 * 두 인물 간 friend 좌표의 원형(순환) 거리를 계산하고 관계 등급을 반환.
 *
 * friend는 0~299의 원형 좌표계이다 (299 다음은 0으로 순환).
 * 따라서 단순 절대값 차이가 아니라, 원을 양방향으로 돌았을 때 더 짧은 쪽
 * 거리(getCircularDiff)로 관계의 가까움/멈을 판정한다.
 *
 * @param {string} charCodeA  인물 A 코드
 * @param {string} charCodeB  인물 B 코드
 * @returns {{
 *   data: {
 *     charCodeA: string,
 *     charCodeB: string,
 *     friendA:   number,
 *     friendB:   number,
 *     diff:      number,   // 원형 순환거리 (0~150)
 *     grade:     string,
 *     labelKr:   string,
 *     labelEn:   string,
 *   }
 * }|{ error: string }}
 *
 * @example
 * fncGetFriendship('CH_000064', 'CH_000388')
 * // → { data: { diff: 2, grade: 'close', labelKr: '절친', ... } }
 *
 * fncGetFriendship('CH_000064', 'CH_000306')
 * // 라인하르트(150) vs 브라운슈바이크(50) → 순환거리 100 → 상극
 */
export function fncGetFriendship(charCodeA, charCodeB) {
  const charA = CHAR_BASE_MAP[charCodeA]
  const charB = CHAR_BASE_MAP[charCodeB]

  if (!charA) return { error: `인물 코드 없음: ${charCodeA}` }
  if (!charB) return { error: `인물 코드 없음: ${charCodeB}` }

  const friendA = Number(charA.friend) || 0
  const friendB = Number(charB.friend) || 0
  const diff    = getCircularDiff(friendA, friendB)

  const grade = FRIENDSHIP_GRADES.find(g => diff <= g.max)

  return {
    data: {
      charCodeA,
      charCodeB,
      friendA,
      friendB,
      diff,
      grade:   grade.grade,
      labelKr: grade.labelKr,
      labelEn: grade.labelEn,
    },
  }
}
