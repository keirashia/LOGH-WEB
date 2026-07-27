// ================================================================
//  SE796_0211_010 / opProposeData.js — 시나리오 시작 시 확정 작전
//  게임 초기화 단계에서 game.agendas 에 status:"approved" 로 주입됨
//
//  ── intel 필드 설명 ───────────────────────────────────────────
//  intel.hasIntel  : 아군이 적 전력 정보를 사전 확보했는지 여부.
//                    true → OperationBriefingModal 에서 적 함대 편제 공개.
//                    false → ??? 표시 (기본값).
//
//  intel.expiresAt : 첩보 유효 턴 번호 (null = 만료 없음).
//                    시나리오 초기값은 null 고정.
//                    launchIntelOp(SPY) 성공 시 turn+3 으로 설정됨.
//
//  intel.exposed   : 적이 이 작전을 탐지했는가 (방첩 실패 시 true).
//                    현재 미구현 — 향후 적 AI 선제 반응 트리거에 활용 예정.
//
//  ── 연동 흐름 ─────────────────────────────────────────────────
//  opProposeData.intel
//    → buildInitialAgendas() → agenda.payload.intel
//    → _pendingBattles[n].hasIntel  (_hasIntel(systemId) 로 실시간 판정)
//    → OperationBriefingModal.enemyVisible
// ================================================================

export const OP_PROPOSE_DATA = [
  // ── 은하제국 — 아스타테 공격작전 ────────────────────────────────
  {
    faction:    "REH",
    opType:     "attack",
    targetStar: "230005",
    targetName: "아스타테",
    fleetCount: 1,
    fleetIds:   ["REH004", "REH041", "REH042", "REH043", "REH044", "REH045"],
    period:     30,
    intel: { hasIntel: false, expiresAt: null, exposed: false },
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

    intel: { hasIntel: false, expiresAt: null, exposed: false },
  },
]
