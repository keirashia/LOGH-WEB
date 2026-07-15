// src/utils/battleUtils.js
// 전투 유틸리티 — 전략/전술 양 레이어에서 공통 사용

/**
 * computeFleetStats(fleet, characters)
 * fleet.commander(C)와 fleet.officers[](O) 기반 전투력 산출.
 *
 * 규칙:
 *  - cmd: 사령관 statCmd 고정
 *  - csm: 사령관 statCsm (상한값)
 *  - att/def/fst/mng/inf: max(사령관, 부관 중 최고) → min(결과, csm)
 */
export function computeFleetStats(fleet, characters) {
  const char = characters?.[fleet?.commander]
  if (!char) return { cmd:50, csm:50, att:50, def:50, fst:50, mng:50, inf:50 }

  const cmd = char.statCmd ?? 50
  const csm = char.statCsm ?? 50
  const cap = v => Math.min(v ?? 50, csm)

  let att = cap(char.statAtt ?? 50)
  let def = cap(char.statDef ?? 50)
  let fst = cap(char.statFst ?? 50)
  let mng = cap(char.statMng ?? 50)
  let inf = cap(char.statInf ?? 50)

  for (const offCode of (fleet.officers ?? [])) {
    const off = characters?.[offCode]
    if (!off) continue
    att = Math.min(Math.max(att, off.statAtt ?? 0), csm)
    def = Math.min(Math.max(def, off.statDef ?? 0), csm)
    fst = Math.min(Math.max(fst, off.statFst ?? 0), csm)
    mng = Math.min(Math.max(mng, off.statMng ?? 0), csm)
    inf = Math.min(Math.max(inf, off.statInf ?? 0), csm)
  }

  return { cmd, csm, att, def, fst, mng, inf }
}

// 계급 코드 우선순위 (낮은 인덱스 = 높은 계급)
const RANK_ORDER = [
  'JB_MR001', // 원수
  'JB_MR002', // 상급대장
  'JB_MR003', // 대장
  'JB_MR004', // 중장
  'JB_MR005', // 소장
  'JB_MR006', // 준장
]

/**
 * resolveSupremeCommander(fleets, characters)
 * 참전 함대 사령관 중 총사령관 charCode 반환.
 *
 * 결정 규칙:
 *   1. military_rank 계급 높은 쪽 우선 (JB_MR001 > JB_MR006)
 *   2. 동일 계급 시 jobExp 높은 쪽 우선
 *
 * @param {object[]} fleets     _snapFleet() 반환 배열
 * @param {object}   characters gameStore.characters 맵
 * @returns {string|null}       총사령관 charCode (없으면 null)
 */
export function resolveSupremeCommander(fleets, characters) {
  let best = null
  for (const fleet of fleets) {
    const char = characters[fleet.commander]
    if (!char) continue
    const rankJob = (char.jobs ?? []).find(j => RANK_ORDER.includes(j.jobCode))
    if (!rankJob) continue
    const pri = RANK_ORDER.indexOf(rankJob.jobCode)
    if (
      !best ||
      pri < best.pri ||
      (pri === best.pri && rankJob.jobExp > best.exp)
    ) {
      best = { fleetCode: fleet.id, charCode: fleet.commander, pri, exp: rankJob.jobExp }
    }
  }
  return best?.charCode ?? null
}
