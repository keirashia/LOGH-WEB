// ================================================================
//  charactersName.js — 인물 다국어 이름
//  경로: src/data/characters/charactersName.js
//  총 560명 | descKr/descEn/descJp
//  수동 입력 예정 (주요 인물 우선)
//  작성: 2026-06-01
// ================================================================
// charCode: "CH_000001",
// scCode: "" 시나리오 코드. 없을 경우 기본값
// lang: "KR" | "EN" | "JP"
// name: ``  캐릭터의 풀네임
// nick: ``  짧은 이름
export const CHAR_NAMES = [
  // D.상클레어
  {
    charCode: "CH_000001",
    scCode: "",
    lang: "En",
    name: "D. Sinclair",
    nick: "Sinclair",
  },
  {
    charCode: "CH_000001",
    scCode: "",
    lang: "Kr",
    name: "D. 싱클레어",
    nick: "싱클레어",
  },
  {
    charCode: "CH_000001",
    scCode: "",
    lang: "Jp",
    name: "D. シンクレア",
    nick: "シンクレア",
  },
];

// export const CHAR_NAMES_MAP = Object.fromEntries(
//   CHAR_NAMES.map((c) => [c.charCode, c])
// );
