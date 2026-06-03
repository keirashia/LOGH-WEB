// ================================================================
//  charImg.js — 인물 이미지 경로 헬퍼
//
//  파일명 규칙: {CHA_IMG}{VERSION}_{PART}.{EXT}
//    VERSION : O(구 은영전) | N(신 은영전) | T(타츠하라 코믹스) | F(후지사키 류 코믹스)
//    PART    : H(머리) | U(상체) | A(전신) | C(컷인)
//    EXT     : png → webp → jpg 순으로 탐색
//
//  탐색 순서: O_H.png → O_H.webp → O_H.jpg → N_H.png → ... → F_H.jpg → PLACEHOLDER
//
//  ※ O 버전 파일명은 구 게임 기준 7자리 코드 사용 (예: CH_0000010O_H.png)
//     해당 imgCode가 없으면 N 버전부터 매칭됨
// ================================================================

export const IMG_VERSION = { O: 'O', N: 'N', T: 'T', F: 'F' }
export const IMG_PART    = { H: 'H', U: 'U', A: 'A' }

export const CHAR_PLACEHOLDER = '/img/characters/CH_0000000.png'

const VERSIONS = ['O', 'N', 'T', 'F']
const EXTS     = ['png', 'webp', 'jpg']
const TOTAL    = VERSIONS.length * EXTS.length  // 12

// 초기 src: O_H.png 부터 시작
export function charImgSrc(imgCode, version = 'O', part = 'H') {
  if (!imgCode) return CHAR_PLACEHOLDER
  return `/img/characters/${imgCode}${version}_${part}.png`
}

// @error 핸들러: O→N→T→F 버전 순, 각 버전마다 png→webp→jpg 탐색
// 사용법: @error="handleCharImgError($event, c.code)"
//
// attempt 0 = charImgSrc (O_H.png)
// attempt 1 = O_H.webp
// attempt 2 = O_H.jpg
// attempt 3 = N_H.png
// attempt 4 = N_H.webp  ← webp 파일 있는 캐릭터는 여기서 매칭
// ...
// attempt 12 = CHAR_PLACEHOLDER
// attempt 13+ = display:none
export function handleCharImgError(e, imgCode, part = 'H') {
  const target  = e.target
  const attempt = (parseInt(target.dataset.imgAttempt) || 0) + 1
  target.dataset.imgAttempt = attempt

  if (attempt < TOTAL) {
    const vIdx = Math.floor(attempt / EXTS.length)
    const eIdx = attempt % EXTS.length
    target.src = `/img/characters/${imgCode}${VERSIONS[vIdx]}_${part}.${EXTS[eIdx]}`
  } else if (attempt === TOTAL) {
    target.src = CHAR_PLACEHOLDER
  } else {
    target.style.display = 'none'
  }
}
