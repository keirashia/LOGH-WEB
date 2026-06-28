// 경로: src/utils/charUtils.js
// ================================================================
//  charUtils.js — 인물 데이터 유틸리티
//  수정: 2026-06-28
//
//  ■ 사용 범위
//    게임 전 (로비·백과사전·인물선택·초기화):
//      buildCharactersMap(), fncGet*(), 맵·상수 사용 가능.
//    게임 중:
//      gameStore.state(characters, fleets, systems 등)만 사용.
//      이 파일의 함수·맵을 인게임 로직에서 호출하지 말 것.
//      → 게임 중 인물 정보는 gameStore.characters[charCode]로 접근.
//
//  ※ 함대 관련 함수는 fleetUtils.js로 분리됨.
//  ※ 컴포넌트에서 data 파일을 직접 import 하지 말 것.
//
//  의존 데이터 파일 (외부에서 직접 import 금지):
//    charactersData.js   → CHAR_BASE, CHAR_BASE_MAP
//    charactersJobs.js   → CHAR_JOBS
//    charactersTraits.js → CHAR_TRAITS
//    charTraitData.js    → CHAR_TRAITS_MASTER, CHAR_TRAIT_MAP
//    jobData.js          → JOBS, JOB_MAP
// ================================================================

import { CHAR_BASE, CHAR_BASE_MAP }           from '@/data/base/characters/charactersData'
import { CHAR_JOBS }                           from '@/data/base/characters/charactersJobs'
import { CHAR_TRAITS }                         from '@/data/base/characters/charactersTraits'
import { CHAR_TRAITS_MASTER, CHAR_TRAIT_MAP }  from '@/data/base/trait/chars/charTraitData'
import { JOBS, JOB_MAP }                       from '@/data/base/jobs/jobData'

// ================================================================
//  raw 데이터 re-export
//  컴포넌트에서 배열·맵이 필요하면 여기서 가져갈 것
// ================================================================
export { CHAR_BASE, CHAR_BASE_MAP }
export { CHAR_JOBS }
export { CHAR_TRAITS }
export { CHAR_TRAITS_MASTER, CHAR_TRAIT_MAP }
export { JOBS, JOB_MAP }

// ================================================================
//  다국어 name/nick/desc 접근자
// ================================================================

/**
 * charName(char, lang?)
 * name 배열에서 지정 언어의 context를 반환. 없으면 Kr, 그것도 없으면 code 반환.
 * @param {object} char  CHAR_BASE 엔트리
 * @param {'Kr'|'En'|'Jp'} [lang='Kr']
 */
export function charName(char, lang = 'Kr') {
  return char?.name?.find(e => e.code === lang)?.context
      ?? char?.name?.find(e => e.code === 'Kr')?.context
      ?? char?.code
      ?? ''
}

/**
 * charNick(char, lang?)
 * nick 배열에서 지정 언어의 context를 반환.
 */
export function charNick(char, lang = 'Kr') {
  return char?.nick?.find(e => e.code === lang)?.context
      ?? char?.nick?.find(e => e.code === 'Kr')?.context
      ?? ''
}

/**
 * charDesc(char, lang?)
 * desc 배열에서 지정 언어의 context를 반환.
 */
export function charDesc(char, lang = 'Kr') {
  return char?.desc?.find(e => e.code === lang)?.context
      ?? char?.desc?.find(e => e.code === 'Kr')?.context
      ?? ''
}

// ================================================================
//  pre-built 조회 맵 (컴포넌트 렌더링용)
// ================================================================

/**
 * CHAR_NAMES_MAP
 * { [charCode]: { name, nick, searchTokens } }
 * searchTokens: name+nick 전 언어 context + searchKeys, 검색 필터링에 활용
 */
export const CHAR_NAMES_MAP = Object.fromEntries(
  CHAR_BASE.map(c => [c.code, {
    name:  charName(c),
    nick:  charNick(c),
    searchTokens: [
      ...(c.name      ?? []).map(e => e.context),
      ...(c.nick      ?? []).map(e => e.context),
      ...(c.searchKeys ?? []),
    ].filter(Boolean),
  }])
)

/**
 * CHAR_JOB_LABEL_MAP
 * { [charCode]: string } — 인물의 첫 번째 직업 한국어 이름 (없으면 '')
 * jobStDate 기준 오름차순 정렬 후 첫 항목 사용
 */
export const CHAR_JOB_LABEL_MAP = (() => {
  const grouped = {}
  for (const j of CHAR_JOBS) {
    if (!grouped[j.charCode]) grouped[j.charCode] = []
    grouped[j.charCode].push(j)
  }
  return Object.fromEntries(
    CHAR_BASE.map(c => {
      const jobs = grouped[c.code] ?? []
      jobs.sort((a, b) => a.jobStDate - b.jobStDate)
      const primary = jobs[0]
      return [c.code, primary ? (JOB_MAP[primary.jobCode]?.nameKr ?? '') : '']
    })
  )
})()

/**
 * CHAR_UNIQUE_TRAIT_MAP
 * { [charCode]: string } — 인물의 고유(TRC_U_) 트레잇 한국어 이름 (없으면 '')
 * charactersTraits.js 실제 할당 기반
 */
export const CHAR_UNIQUE_TRAIT_MAP = (() => {
  const map = {}
  for (const a of CHAR_TRAITS) {
    if (!a.traitCode.startsWith('TRC_U_') || map[a.charCode]) continue
    const master = CHAR_TRAIT_MAP[a.traitCode]
    if (master) map[a.charCode] = master.nameKr
  }
  return map
})()

// ================================================================
//  초기화 빌더
// ================================================================

/**
 * buildCharactersMap(options)
 * 게임 시작 시 characters{} 초기값을 생성한다.
 *
 * @param {object}   [options]
 * @param {object[]|null} [options.charList]        시나리오 CHAR_LIST (null이면 전체 CHAR_BASE 사용)
 * @param {object[]|null} [options.scenarioCharJobs] 시나리오별 직업 오버라이드 (null이면 base CHAR_JOBS만 사용)
 * @param {object[]}      [options.fleetCharData]   시나리오 FLEET_CHARACTER_DATA (소속 함대 연계)
 * @param {object[]}      [options.cliqueData]      시나리오 CLIQUE_DATA (소속 파벌 연계)
 *
 * @returns {{ [charCode: string]: object }}
 */
export function buildCharactersMap({
  charList        = null,
  scenarioCharJobs = null,
  fleetCharData   = [],
  cliqueData      = [],
} = {}) {
  // 1. 직업 소스: 시나리오 override → base CHAR_JOBS 보완
  const overriddenCodes = scenarioCharJobs?.length
    ? new Set(scenarioCharJobs.map(j => j.charCode))
    : null
  const jobSrc = overriddenCodes
    ? [...scenarioCharJobs, ...CHAR_JOBS.filter(j => !overriddenCodes.has(j.charCode))]
    : CHAR_JOBS

  // 2. 직업 맵: { [charCode]: jobEntry[] }  (jobStDate 오름차순 유지)
  const jobsByChar = {}
  for (const j of jobSrc) {
    ;(jobsByChar[j.charCode] ??= []).push(j)
  }

  // 3. 트레잇 맵: { [charCode]: traitEntry[] }
  const traitsByChar = {}
  for (const t of CHAR_TRAITS) {
    ;(traitsByChar[t.charCode] ??= []).push(t)
  }

  // 4. 소속 함대 맵: { [charCode]: fltCode(6자리) }
  const fleetByChar = {}
  for (const fc of fleetCharData) {
    if (!fleetByChar[fc.charCode]) fleetByChar[fc.charCode] = fc.fltCode
  }

  // 5. 소속 파벌 맵: { [charCode]: cliqueId }
  const cliqueByChar = {}
  for (const cl of cliqueData) {
    for (const charCode of (cl.members ?? [])) {
      if (!cliqueByChar[charCode]) cliqueByChar[charCode] = cl.id
    }
  }

  // 6. 인물 필터링 (charList 지정 시 해당 코드만)
  const charListSet = charList?.length
    ? new Set(charList.map(c => c.charCode))
    : null
  const source = charListSet
    ? CHAR_BASE.filter(c => charListSet.has(c.code))
    : CHAR_BASE

  // 7. 인물별 초기 상태 구성
  const characters = {}
  for (const c of source) {
    const jobs         = jobsByChar[c.code]   ?? []
    const traits       = traitsByChar[c.code] ?? []
    const currentPost  = jobs[0]?.jobCode ?? null
    const currentPosts = jobs.map(j => j.jobCode)

    characters[c.code] = {
      ...c,
      currentPost,
      currentPosts,
      jobs,
      traits,
      fleetCode: fleetByChar[c.code]  ?? null,
      cliqueId:  cliqueByChar[c.code] ?? null,
      isDead:    false,
    }
  }
  return characters
}

// ================================================================
//  캐릭터 조회 함수
// ================================================================

/**
 * fncGetCharInfo(charCode)
 * 인물 기본 데이터 반환.
 */
export function fncGetCharInfo(charCode) {
  const base = CHAR_BASE_MAP[charCode] ?? null
  if (!base) return { error: `인물 코드 없음: ${charCode}` }
  return { data: { ...base } }
}

/**
 * fncGetCharsByFaction(factionCode)
 * 세력별 인물 목록 반환.
 */
export function fncGetCharsByFaction(factionCode) {
  if (!factionCode) return { error: '세력 코드 없음' }
  const list = CHAR_BASE.filter(c => c.faction === factionCode)
  if (!list.length) return { error: `세력 인물 없음: ${factionCode}` }
  return { data: list.map(c => ({ ...c })) }
}

/**
 * fncGetCharTraits(charCode)
 * 인물에 할당된 트레잇 목록 반환 (마스터 데이터 포함).
 */
export function fncGetCharTraits(charCode) {
  const assigns = CHAR_TRAITS.filter(t => t.charCode === charCode)
  if (!assigns.length) return { data: [] }
  return {
    data: assigns.map(a => ({
      ...a,
      master: CHAR_TRAIT_MAP[a.traitCode] ?? null,
    })),
  }
}

/**
 * fncGetCharJobs(charCode)
 * 인물에 할당된 직업 목록 반환 (마스터 데이터 포함).
 */
export function fncGetCharJobs(charCode) {
  const assigns = CHAR_JOBS.filter(j => j.charCode === charCode)
  if (!assigns.length) return { data: [] }
  return {
    data: assigns.map(a => ({
      ...a,
      master: JOB_MAP[a.jobCode] ?? null,
    })),
  }
}

// ================================================================
//  직업 / 트레잇 조회
// ================================================================

/**
 * fncGetJobInfo(jobCode)
 * 직업 마스터 데이터 반환.
 */
export function fncGetJobInfo(jobCode) {
  const job = JOB_MAP[jobCode] ?? null
  if (!job) return { error: `직업 코드 없음: ${jobCode}` }
  return { data: { ...job } }
}

/**
 * fncGetTraitInfo(traitCode)
 * 트레잇 마스터 데이터 반환.
 */
export function fncGetTraitInfo(traitCode) {
  const trait = CHAR_TRAIT_MAP[traitCode] ?? null
  if (!trait) return { error: `트레잇 코드 없음: ${traitCode}` }
  return { data: { ...trait } }
}

// ================================================================
//  친밀도 계산
// ================================================================

// friend는 0~299 원형 좌표계. 299 다음은 0으로 순환.
const FRIEND_RANGE = 300

const FRIENDSHIP_GRADES = [
  { max:  20, grade: 'close',   labelKr: '친밀', labelEn: 'Close'    },
  { max:  40, grade: 'friendly',labelKr: '우호', labelEn: 'Friendly' },
  { max:  60, grade: 'neutral', labelKr: '보통', labelEn: 'Neutral'  },
  { max:  80, grade: 'distant', labelKr: '소원함',labelEn: 'Distant' },
  { max: 100, grade: 'hostile', labelKr: '상극', labelEn: 'Hostile'  },
  { max: Infinity, grade: 'disgust', labelKr: '혐오', labelEn: 'Disgust' },
]

function getCircularDiff(a, b) {
  const diff = Math.abs(a - b)
  return Math.min(diff, FRIEND_RANGE - diff)
}

/**
 * fncGetFriendship(charCodeA, charCodeB)
 * 두 인물 간 friend 원형 거리 계산 및 관계 등급 반환.
 */
export function fncGetFriendship(charCodeA, charCodeB) {
  const charA = CHAR_BASE_MAP[charCodeA]
  const charB = CHAR_BASE_MAP[charCodeB]
  if (!charA) return { error: `인물 코드 없음: ${charCodeA}` }
  if (!charB) return { error: `인물 코드 없음: ${charCodeB}` }

  const friendA = Number(charA.friend) || 0
  const friendB = Number(charB.friend) || 0
  const diff    = getCircularDiff(friendA, friendB)
  const grade   = FRIENDSHIP_GRADES.find(g => diff <= g.max)

  return {
    data: { charCodeA, charCodeB, friendA, friendB, diff,
            grade: grade.grade, labelKr: grade.labelKr, labelEn: grade.labelEn },
  }
}

// ================================================================
//  클리크(파벌) 조회
// ================================================================

/**
 * fncGetCharClique(charCode, cliqueData)
 * 인물이 소속된 클리크 정보 반환.
 * cliqueData는 시나리오별 파일에서 인자로 전달.
 */
export function fncGetCharClique(charCode, cliqueData = []) {
  if (!charCode) return { error: '인물 코드 없음' }
  const clique = cliqueData.find(c => c.members.includes(charCode))
  if (!clique) return { error: `소속 클리크 없음: ${charCode}` }
  return {
    data: {
      ...clique,
      isLeader:  clique.leader  === charCode,
      isFounder: clique.founder === charCode,
    },
  }
}

/**
 * fncGetCliqueMembers(cliqueId, cliqueData)
 * 클리크 소속 인물 전체 목록(인물 기본정보 포함) 반환.
 */
export function fncGetCliqueMembers(cliqueId, cliqueData = []) {
  const clique = cliqueData.find(c => c.id === cliqueId)
  if (!clique) return { error: `클리크 코드 없음: ${cliqueId}` }
  return {
    data: clique.members.map(charCode => ({
      charCode,
      charInfo:  CHAR_BASE_MAP[charCode] ?? null,
      isLeader:  clique.leader  === charCode,
      isFounder: clique.founder === charCode,
    })),
  }
}

// ================================================================
//  거버넌스
// ================================================================

/**
 * fncGetDecisionChain(factionCode, actionType)
 * 의사결정 결재 체인 반환.
 * TODO: agendaData.js import 필요
 */
export function fncGetDecisionChain(factionCode, actionType) {
  return { error: 'TODO: agendaData import 필요' }
}
