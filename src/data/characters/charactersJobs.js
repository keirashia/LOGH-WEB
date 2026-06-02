// ================================================================
//  charJobs.js — 인물 직업 기본값
//  경로: src/data/characters/charJobs.js
//  1인 다직업 가능 | jobData.js 참조
//  주요 인물 796_01 기준 입력, 나머지 빈 배열
//  작성: 2026-05-29
// ================================================================
// charCode: "", 대상 캐릭터 키 (charactersData.js)
// jobCode: "", 대상 직업 키 (jobsData.js)
// jobLevel: 0, 직업의 레벨
// jobExp: 0, 직업의 경험치
// jobStDate: 0, 직업의 시작턴
// jobEdDate: 0, 직업의 종료턴
export const CHAR_JOBS = [
  {
    charCode: "CH_000001",
    jobCode: "JB_C001",
    jobLevel: 0,
    jobExp: 0,
    jobStDate: 0,
    jobEdDate: 0,
  },
  {
    charCode: "CH_000001",
    jobCode: "JB_C003",
    jobLevel: 0,
    jobExp: 0,
    jobStDate: 0,
    jobEdDate: 0,
  },
];

export const CHAR_JOBS_MAP = Object.fromEntries(
  CHAR_JOBS.map((c) => [c.charCode, c])
);
