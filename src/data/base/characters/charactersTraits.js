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
  // 무어
  {
    charCode:    "CH_000139",
    traitCode:   "TRC_U_000139",
    traitLv:     0,
    traitExp:    0,
    traitStDate: 0,
    traitEdDate: null,
  },
  // 빌리바르트 요아힘 폰 메르카츠
  {
    charCode:    "CH_000195",
    traitCode:   "TRC_U_000195",
    traitLv:     0,
    traitExp:    0,
    traitStDate: 0,
    traitEdDate: null,
  },
  // 아달베르트 폰 파렌하이트
  {
    charCode:    "CH_000233",
    traitCode:   "TRC_U_000233",
    traitLv:     0,
    traitExp:    0,
    traitStDate: 0,
    traitEdDate: null,
  },
  // 양 웬리
  {
    charCode:    "CH_000266",
    traitCode:   "TRC_U_000266",
    traitLv:     0,
    traitExp:    0,
    traitStDate: 0,
    traitEdDate: null,
  },
  {
    charCode:    "CH_000266",
    traitCode:   "TRC_G_002",
    traitLv:     0,
    traitExp:    0,
    traitStDate: 0,
    traitEdDate: null,
  },
  // 파에타
  {
    charCode:    "CH_000479",
    traitCode:   "TRC_U_000479",
    traitLv:     0,
    traitExp:    0,
    traitStDate: 0,
    traitEdDate: null,
  },
  {
    charCode:    "CH_000479",
    traitCode:   "TRC_G_001",
    traitLv:     0,
    traitExp:    0,
    traitStDate: 0,
    traitEdDate: null,
  },
  // 슈타덴
  {
    charCode:    "CH_000223",
    traitCode:   "TRC_U_000223",
    traitLv:     0,
    traitExp:    0,
    traitStDate: 0,
    traitEdDate: null,
  },
  {
    charCode:    "CH_000223",
    traitCode:   "TRC_G_001",
    traitLv:     0,
    traitExp:    0,
    traitStDate: 0,
    traitEdDate: null,
  },
  {
    charCode:    "CH_000223",
    traitCode:   "TRC_S_001",
    traitLv:     0,
    traitExp:    0,
    traitStDate: 0,
    traitEdDate: null,
  },
  // ── 0617 패치 — TODO 처리 ────────────────────────────────────
  // 더스티 아텐보로
  { charCode: "CH_000043", traitCode: "TRC_U_000043", traitLv: 0, traitExp: 0, traitStDate: 0, traitEdDate: null },
  // 라오
  { charCode: "CH_000060", traitCode: "TRC_G_003", traitLv: 0, traitExp: 0, traitStDate: 0, traitEdDate: null },
  // 무어
  { charCode: "CH_000139", traitCode: "TRC_G_004", traitLv: 0, traitExp: 0, traitStDate: 0, traitEdDate: null },
  { charCode: "CH_000139", traitCode: "TRC_G_005", traitLv: 0, traitExp: 0, traitStDate: 0, traitEdDate: null },
  // 파에타
  { charCode: "CH_000479", traitCode: "TRC_G_004", traitLv: 0, traitExp: 0, traitStDate: 0, traitEdDate: null },
  { charCode: "CH_000479", traitCode: "TRC_G_006", traitLv: 0, traitExp: 0, traitStDate: 0, traitEdDate: null },
  // 포겔
  { charCode: "CH_000494", traitCode: "TRC_G_004", traitLv: 0, traitExp: 0, traitStDate: 0, traitEdDate: null },
  // 플레겔
  { charCode: "CH_000516", traitCode: "TRC_G_004", traitLv: 0, traitExp: 0, traitStDate: 0, traitEdDate: null },
  { charCode: "CH_000516", traitCode: "TRC_G_007", traitLv: 0, traitExp: 0, traitStDate: 0, traitEdDate: null },
  { charCode: "CH_000516", traitCode: "TRC_G_008", traitLv: 0, traitExp: 0, traitStDate: 0, traitEdDate: null },
  { charCode: "CH_000516", traitCode: "TRC_G_009", traitLv: 0, traitExp: 0, traitStDate: 0, traitEdDate: null },
  { charCode: "CH_000516", traitCode: "TRC_G_010", traitLv: 0, traitExp: 0, traitStDate: 0, traitEdDate: null },
  { charCode: "CH_000516", traitCode: "TRC_U_000516", traitLv: 0, traitExp: 0, traitStDate: 0, traitEdDate: null },
  // 한스 디트리히 폰 젝트
  { charCode: "CH_000533", traitCode: "TRC_G_004", traitLv: 0, traitExp: 0, traitStDate: 0, traitEdDate: null },
  { charCode: "CH_000533", traitCode: "TRC_G_007", traitLv: 0, traitExp: 0, traitStDate: 0, traitEdDate: null },
  { charCode: "CH_000533", traitCode: "TRC_G_008", traitLv: 0, traitExp: 0, traitStDate: 0, traitEdDate: null },
  { charCode: "CH_000533", traitCode: "TRC_G_009", traitLv: 0, traitExp: 0, traitStDate: 0, traitEdDate: null },
  { charCode: "CH_000533", traitCode: "TRC_G_010", traitLv: 0, traitExp: 0, traitStDate: 0, traitEdDate: null },
  { charCode: "CH_000533", traitCode: "TRC_U_000533", traitLv: 0, traitExp: 0, traitStDate: 0, traitEdDate: null },
  // 하이드리히 랑
  { charCode: "CH_000527", traitCode: "TRC_U_000527", traitLv: 0, traitExp: 0, traitStDate: 0, traitEdDate: null },
  { charCode: "CH_000527", traitCode: "TRC_G_007", traitLv: 0, traitExp: 0, traitStDate: 0, traitEdDate: null },
  { charCode: "CH_000527", traitCode: "TRC_G_008", traitLv: 0, traitExp: 0, traitStDate: 0, traitEdDate: null },
  { charCode: "CH_000527", traitCode: "TRC_G_011", traitLv: 0, traitExp: 0, traitStDate: 0, traitEdDate: null },
]
