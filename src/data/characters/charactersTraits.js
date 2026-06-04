// ================================================================
//  charactersTraits.js — 인물 트레잇 목록
//  경로: src/data/characters/charactersTraits.js
//  1인 다트레잇 가능 | src/data/trait/chars/charTraitData.js 참조
//  작성: 2026-06-04
// ================================================================
// charCode:     대상 캐릭터 키 (charactersData.js)
// traitCode:    대상 트레잇 키 (charTraitData.js)
// traitExp:     트레잇 경험치
// traitStDate:  취득 턴 (0=처음부터)
// traitEdDate:  종료 턴 (null=영구)
// ================================================================
// 직업 리스트는 제발 charCode, traitCode 순으로 정렬해주세요.

export const CHAR_TRAITS = [
  // 슈타덴
  {
    charCode:    "CH_000223",
    traitCode:   "TRC_U_000223",
    traitExp:    0,
    traitStDate: 0,
    traitEdDate: null,
  },
  {
    charCode:    "CH_000223",
    traitCode:   "TRC_G_001",
    traitExp:    0,
    traitStDate: 0,
    traitEdDate: null,
  },
  {
    charCode:    "CH_000223",
    traitCode:   "TRC_S_001",
    traitExp:    0,
    traitStDate: 0,
    traitEdDate: null,
  },
]
