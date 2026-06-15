// ================================================================
//  agendaData.js — 의안 시스템 마스터 데이터
//  의안 카테고리, 액션 타입, 세력별 결재 체인 정의
// ================================================================

// ── 의안 카테고리 ─────────────────────────────────────────────────
export const AGENDA_CATEGORIES = {
  military:  { label: '군사작전', icon: '⚔️' },
  domestic:  { label: '내정',    icon: '🏛️' },
  personnel: { label: '인사',    icon: '👤' },
  intel:     { label: '첩보',    icon: '🔍' },
  research:  { label: '연구',    icon: '🔬' },
}

// ── 의안 액션 타입 ────────────────────────────────────────────────
export const AGENDA_ACTIONS = {
  // 군사
  fleet_deploy:     { label: '함대 출격',   category: 'military'  },
  fleet_transport:  { label: '함대 수송',   category: 'military'  },
  fleet_train:      { label: '함대 훈련',   category: 'military'  },
  fleet_reorganize: { label: '함대 재편',   category: 'military'  },
  fleet_disband:    { label: '함대 해산',   category: 'military'  },
  op_propose:       { label: '작전 발의',   category: 'military'  },
  // 내정
  budget_alloc:     { label: '예산 배분',   category: 'domestic'  },
  planet_develop:   { label: '행성 개발',   category: 'domestic'  },
  ship_design:      { label: '함선 설계',   category: 'domestic'  },
  ship_build:       { label: '함선 제작',   category: 'domestic'  },
  // 인사
  appoint:          { label: '직위 임명',   category: 'personnel' },
  dismiss:          { label: '직위 해임',   category: 'personnel' },
  // 첩보
  intel_spy:        { label: '첩보 작전',   category: 'intel'     },
  intel_counter:    { label: '방첩 작전',   category: 'intel'     },
  intel_special:    { label: '특수 작전',   category: 'intel'     },
  // 연구
  research_regime:  { label: '체제 연구',   category: 'research'  },
  research_idea:    { label: '사상 연구',   category: 'research'  },
  research_domestic:{ label: '내정설비 연구', category: 'research' },
  research_mil:     { label: '군사설비 연구', category: 'research' },
  research_tactics: { label: '전술 연구',   category: 'research'  },
}

// ── 세력별 카테고리별 결재 체인 ────────────────────────────────────
// 앞에서부터 결재 순서. 공석이면 다음 직위로 올라감.
// REH 군사: 3장관 협의(군무상서+통수본부총장+우주함대사령장관) → 재상 → 황제
export const APPROVAL_CHAINS = {
  REH: {
    military:  ['JB_R004', 'JB_R007', 'JB_R006', 'JB_R002', 'JB_R001'],
    domestic:  ['JB_R003', 'JB_R002', 'JB_R001'],
    personnel: ['JB_R002', 'JB_R001'],
    intel:     ['JB_R005', 'JB_R002'],
    research:  ['JB_R003', 'JB_R002'],
  },
  FPA: {
    // 동맹: 관련 위원장 → 의장 (투표는 추후 구현)
    military:  ['JB_F002', 'JB_F001'],
    domestic:  ['JB_F007', 'JB_F001'],
    personnel: ['JB_F006', 'JB_F001'],
    intel:     ['JB_F004', 'JB_F001'],
    research:  ['JB_F009', 'JB_F001'],
  },
  PZN: {
    // 페잔: 자치령총독 단독 즉시 결정
    military:  ['JB_P001'],
    domestic:  ['JB_P001'],
    personnel: ['JB_P001'],
    intel:     ['JB_P001'],
    research:  ['JB_P001'],
  },
}

// ── 의안 최대 등록 수 ─────────────────────────────────────────────
export const AGENDA_DISPLAY_LIMIT = 10

// ── 의안 만료 기한 (턴) ───────────────────────────────────────────
export const AGENDA_EXPIRE_TURNS = 10
