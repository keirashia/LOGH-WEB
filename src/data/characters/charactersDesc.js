// ================================================================
//  charDesc.js — 인물 다국어 설명
//  경로: src/data/characters/charDesc.js
//  총 560명 | descKr/descEn/descJp
//  수동 입력 예정 (주요 인물 우선)
//  작성: 2026-06-01
// ================================================================
// charCode: "CH_000001",
// lang: "KR" | "EN" | "JP"
// scCode: "" 시나리오 코드. 없을 경우 기본값
// desc: `` 내용
export const CHAR_DESC = [
  {
    charCode: "CH_000001",
    lang: "KR",
    scCode: "",
    desc: `명망높은 역사가이자 역사 다큐멘터리 해설가로 은하제국, 자유행성동맹의 역사에 해박하다.
    언변이 좋아 대중들로부터 많은 사랑을 받고 있다.`,
  },
];

// export const CHAR_DESC_MAP = Object.fromEntries(
//   CHAR_DESC.map((c) => [c.CHA_CODE, c])
// );
