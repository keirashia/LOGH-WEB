// ================================================================
//  SE796_0211_010/charactersJobs.js — 시나리오 직업 오버라이드
//  베이스(charactersJobs.js)를 덮어쓸 캐릭터만 등록.
//  등록되지 않은 캐릭터는 베이스 직업을 그대로 사용.
// ================================================================

export const CHAR_JOBS = [

  // 양 웬리: 아스타테 회전 당시 제2함대 소장/전략고문
  // 함대사령관 역할은 fleetCharacterData.js에서 파생되므로 여기서는 계급·신분만 등록
  { charCode: "CH_000266", jobCode: "JB_MR005", jobLevel: 0, jobExp: 0, jobStDate: 0, jobEdDate: 0 },
  { charCode: "CH_000266", jobCode: "JB_C001",  jobLevel: 0, jobExp: 0, jobStDate: 0, jobEdDate: 0 },

]
