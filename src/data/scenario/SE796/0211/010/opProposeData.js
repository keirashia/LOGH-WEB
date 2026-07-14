// ================================================================
//  SE796_0211_010 / opProposeData.js — 시나리오 시작 시 확정 작전
//  게임 초기화 단계에서 game.agendas 에 status:"approved" 로 주입됨
// ================================================================

export const OP_PROPOSE_DATA = [
  // ── 은하제국 — 아스타테 공격작전 ────────────────────────────────
  {
    faction:    "REH",
    opType:     "attack",
    targetStar: "230005",
    targetName: "아스타테",
    fleetCount: 1,
    fleetIds:   ["REH004"],
    period:     30,
    notes:      "라인하르트 폰 뮤젤 원수 지휘. 분산 배치된 동맹 함대를 각개격파한다.",
  },

  // ── 자유행성동맹 — 아스타테 방어작전 ───────────────────────────
  {
    faction:    "FPA",
    opType:     "defense",
    targetStar: "230005",
    targetName: "아스타테",
    fleetCount: 3,
    fleetIds:   ["FPA002", "FPA004", "FPA006"],
    period:     30,
    notes:      "제2·제4·제6함대 투입. 이제르론 회랑 방면 제국군 침공을 저지한다.",
  },
]
