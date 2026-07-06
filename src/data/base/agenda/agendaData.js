// ================================================================
//  agendaData.js — 의안 시스템 마스터 데이터
//  의안 카테고리, 액션 타입, 세력별 결재 체인 정의
// ================================================================

// ── 의안 카테고리 ─────────────────────────────────────────────────
export const AGENDA_CATEGORIES = {
  military: { label: "군사작전", icon: "⚔️" },
  domestic: { label: "내정", icon: "🏛️" },
  personnel: { label: "인사", icon: "👤" },
  intel: { label: "첩보", icon: "🔍" },
  research: { label: "연구", icon: "🔬" },
  finance: { label: "재정", icon: "💰" },
  diplomacy: { label: "외교", icon: "🤝" },
};

// ── 의안 액션 타입 ────────────────────────────────────────────────
export const AGENDA_ACTIONS = {
  // 군사
  fleet_deploy: { label: "함대 출격", category: "military" },
  fleet_transport: { label: "함대 수송", category: "military" },
  fleet_train: { label: "함대 훈련", category: "military" },
  fleet_reorganize: { label: "함대 재편", category: "military" },
  fleet_disband: { label: "함대 해산", category: "military" },
  op_propose: { label: "작전 발의", category: "military" },
  // 내정
  budget_alloc: { label: "예산 배분", category: "domestic" },
  planet_develop: { label: "행성 개발", category: "domestic" },
  ship_design: { label: "함선 설계", category: "domestic" },
  ship_build: { label: "함선 제작", category: "domestic" },
  // 인사
  appoint: { label: "직위 임명", category: "personnel" },
  dismiss: { label: "직위 해임", category: "personnel" },
  // 첩보
  intel_spy: { label: "첩보 작전", category: "intel" },
  intel_counter: { label: "방첩 작전", category: "intel" },
  intel_special: { label: "특수 작전", category: "intel" },
  // 외교
  war_declare: { label: "전쟁 선포", category: "diplomacy" },
  ceasefire_propose: { label: "휴전 제안", category: "diplomacy" },
  peace_treaty: { label: "강화 조약", category: "diplomacy" },
  alliance_propose: { label: "동맹 제안", category: "diplomacy" },
  alliance_break: { label: "동맹 파기", category: "diplomacy" },
  passage_rights: { label: "통행권 협상", category: "diplomacy" },
  envoy_send: { label: "사절 파견", category: "diplomacy" },
  surrender_accept: { label: "항복 수리", category: "diplomacy" },
  trade_negotiate: { label: "무역 협상", category: "diplomacy" },
  loan_request: { label: "차관 요청", category: "diplomacy" },
  // 연구
  research_regime: { label: "체제 연구", category: "research" },
  research_idea: { label: "사상 연구", category: "research" },
  research_domestic: { label: "내정설비 연구", category: "research" },
  research_mil: { label: "군사설비 연구", category: "research" },
  research_tactics: { label: "전술 연구", category: "research" },
};

// ── 세력별 카테고리별 결재 체인 ────────────────────────────────────
// 앞에서부터 결재 순서. 공석이면 다음 직위로 올라감.
// military_op  = 작전 발의 (통수본부총장/통합작전본부장 라인)
// military_fleet = 함대 투입·편성 (우주함대사령장관 라인)
// military     = 위 둘의 공통 fallback (menuTree의 군사 카테고리 의안 판정용)
export const APPROVAL_CHAINS = {
  REH: {
    military_op:    ["JB_R007", "JB_R002", "JB_R001"], // 통수본부총장→재상→황제
    military_fleet: ["JB_R006", "JB_R002", "JB_R001"], // 우주함대사령장관→재상→황제
    military:       ["JB_R007", "JB_R002", "JB_R001"], // fallback
    domestic:       ["JB_R008", "JB_R002", "JB_R001"], // 군무상서→재상→황제
    personnel:      ["JB_R008", "JB_R002", "JB_R001"],
    finance:        ["JB_R009", "JB_R002", "JB_R001"], // 재무상서→재상→황제
    research:       ["JB_R002", "JB_R001"],             // 장관 없음, 재상 직결
    intel:          ["JB_R011"],                        // 첩보관 단독
    diplomacy:      ["JB_R002", "JB_R001"],
  },
  FPA: {
    military_op:    ["JB_F013", "JB_F002", "JB_F001"], // 통합작전본부장→부의장→의장
    military_fleet: ["JB_F014", "JB_F002", "JB_F001"], // 우주함대사령장관→부의장→의장
    military:       ["JB_F013", "JB_F002", "JB_F001"], // fallback
    domestic:       ["JB_F004", "JB_F002", "JB_F001"], // 국방위원장→부의장→의장
    personnel:      ["JB_F004", "JB_F002", "JB_F001"],
    finance:        ["JB_F011", "JB_F002", "JB_F001"], // 재정위원장→부의장→의장
    research:       ["JB_F002", "JB_F001"],             // 장관 없음, 부의장 직결
    intel:          ["JB_F004", "JB_F002", "JB_F001"],  // 국방위원장→부의장→의장
    diplomacy:      ["JB_F002", "JB_F001"],
  },
  PZN: {
    military_op:    ["JB_P001"],
    military_fleet: ["JB_P001"],
    military:       ["JB_P001"],
    domestic:       ["JB_P001"],
    personnel:      ["JB_P001"],
    finance:        ["JB_P001"],
    research:       ["JB_P001"],
    intel:          ["JB_P001"],
    diplomacy:      ["JB_P001"],
  },
};

// ── 의안 최대 등록 수 ─────────────────────────────────────────────
export const AGENDA_DISPLAY_LIMIT = 10;

// ── 의안 만료 기한 (턴) ───────────────────────────────────────────
export const AGENDA_EXPIRE_TURNS = 10;
