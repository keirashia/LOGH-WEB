// src/utils/charValueLabel.js
// 성격(brave) / 이념(idea) / 경제(econ) / 친화(friend) 수치 → 표시 텍스트 변환 유틸리티
// 게임 내에서 이 네 필드는 수치 대신 텍스트 레이블로 표시한다.

import { IDEOLOGY_DATA } from '@/data/base/regime/ideologyData.js'
import { ECONOMY_DATA }  from '@/data/base/regime/economyData.js'

const BRAVE_LABELS = [
  { max: 20,  text: '신중' },
  { max: 40,  text: '냉정' },
  { max: 60,  text: '일반' },
  { max: 80,  text: '용맹' },
  { max: 100, text: '돌진' },
]

/** 수치(0~100)를 성격 텍스트로 변환 */
export function braveLabel(v) {
  const n = Number(v ?? 0)
  return (BRAVE_LABELS.find(l => n < l.max) ?? BRAVE_LABELS[BRAVE_LABELS.length - 1]).text
}

/** code 배열에서 가장 가까운 항목의 name을 반환 */
function closestLabel(data, v) {
  const n = Number(v ?? 0)
  if (!data.length) return '-'
  let best = data[0]
  let bestDiff = Math.abs(n - best.code)
  for (const item of data) {
    const diff = Math.abs(n - item.code)
    if (diff < bestDiff) { bestDiff = diff; best = item }
  }
  return best.name
}

/** 이념 코드 → 이념명 (ideologyData.js 기준) */
export function ideaLabel(v) {
  return closestLabel(IDEOLOGY_DATA, v)
}

/** 경제 코드 → 경제체제명 (economyData.js 기준) */
export function econLabel(v) {
  return closestLabel(ECONOMY_DATA, v)
}

// ── 친화(friend) ────────────────────────────────────────────────
// friend는 0~299 원형 좌표계. 두 값의 원형 거리(0~150)로 관계 등급을 결정.
const FRIEND_RANGE = 300

const FRIENDSHIP_GRADES = [
  { max:  20, grade: 'close',    label: '친밀' },
  { max:  40, grade: 'friendly', label: '우호' },
  { max:  60, grade: 'neutral',  label: '보통' },
  { max:  80, grade: 'distant',  label: '소원함' },
  { max: 100, grade: 'hostile',  label: '상극' },
  { max: Infinity, grade: 'disgust', label: '혐오' },
]

function circularDiff(a, b) {
  const diff = Math.abs(a - b)
  return Math.min(diff, FRIEND_RANGE - diff)
}

/**
 * friendGrade(v, playerV)
 * 대상 friend 값과 플레이어 friend 값의 원형 거리로 관계 등급 반환.
 * @returns {{ label, grade, diff, charVal, playerVal }}
 */
export function friendGrade(v, playerV) {
  const charVal   = Number(v       ?? 0)
  const playerVal = Number(playerV ?? 0)
  const diff      = circularDiff(charVal, playerVal)
  const entry     = FRIENDSHIP_GRADES.find(g => diff <= g.max) ?? FRIENDSHIP_GRADES[FRIENDSHIP_GRADES.length - 1]
  return { label: entry.label, grade: entry.grade, diff, charVal, playerVal }
}
