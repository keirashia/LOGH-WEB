// SE796_10 아스타테 성역 회전 — 시나리오 시작 직책
// jobCode 우선순위: 직책(JB_M*) > 계급(JB_MR*) > 작위/기타(JB_N*, JB_R*, JB_F* ...)

export const CHAR_JOBS = [

  // ── REH 은하제국 ──────────────────────────────────────────────

  // 라인하르트 폰 뮤젤 — 아스타테 원정군 총사령관
  { charCode: "CH_000064", jobCode: "JB_M001"  }, // 함대사령관
  { charCode: "CH_000064", jobCode: "JB_MR002" }, // 상급대장 (아스타테 승리 후 원수 승진)
  { charCode: "CH_000064", jobCode: "JB_N003"  }, // 백작

  // 빌리바르트 요아힘 폰 메르카츠
  { charCode: "CH_000195", jobCode: "JB_M001"  }, // 함대사령관
  { charCode: "CH_000195", jobCode: "JB_MR001" }, // 원수

  // 슈타덴
  { charCode: "CH_000223", jobCode: "JB_M001"  }, // 함대사령관
  { charCode: "CH_000223", jobCode: "JB_MR003" }, // 대장

  // 아달베르트 폰 파렌하이트
  { charCode: "CH_000233", jobCode: "JB_M001"  }, // 함대사령관
  { charCode: "CH_000233", jobCode: "JB_MR003" }, // 대장

  // 포겔
  { charCode: "CH_000494", jobCode: "JB_M003"  }, // 참모

  // ── FPA 자유행성동맹 ──────────────────────────────────────────

  // 파에타 — 제2분함대 사령관
  { charCode: "CH_000479", jobCode: "JB_M001"  }, // 함대사령관
  { charCode: "CH_000479", jobCode: "JB_MR002" }, // 상급대장

  // 파스톨레 — 제4분함대 사령관
  { charCode: "CH_000478", jobCode: "JB_M001"  }, // 함대사령관
  { charCode: "CH_000478", jobCode: "JB_MR003" }, // 대장

  // 무어 — 제6분함대 사령관
  { charCode: "CH_000139", jobCode: "JB_M001"  }, // 함대사령관
  { charCode: "CH_000139", jobCode: "JB_MR002" }, // 상급대장

  // 양 웬리 — 제2함대 전략고문 (아스타테 당시 준장, 이후 소장 승진)
  { charCode: "CH_000266", jobCode: "JB_M003"  }, // 참모
  { charCode: "CH_000266", jobCode: "JB_MR006" }, // 준장

]
