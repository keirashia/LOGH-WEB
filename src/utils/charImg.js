// ================================================================
//  charImg.js — 인물 이미지 경로 헬퍼
//
//  파일명 규칙: {CHA_IMG}{VERSION}_{PART}.png
//    VERSION : O(구 은영전) | T(타츠하라 코믹스) | F(후지사키 류 코믹스) | N(신 은영전)
//    PART    : H(머리) | U(상체) | A(전신)
//
//  예시: CH_0000010O_H.png
// ================================================================

export const IMG_VERSION = { O: 'O', T: 'T', F: 'F', N: 'N' }
export const IMG_PART    = { H: 'H', U: 'U', A: 'A' }

export function charImgSrc(imgCode, version = 'O', part = 'H') {
  if (!imgCode) return ''
  return `/img/characters/${imgCode}${version}_${part}.png`
}
