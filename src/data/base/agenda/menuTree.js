// ================================================================
//  menuTree.js — BottomBar 카테고리별 메뉴 트리 정의
//  leaf 항목: { id, label, modal?, action? }
//  parent 항목: { id, label, children: [...] }
// ================================================================

export const MENU_TREES = {

  military: [
    {
      id: 'op_propose', label: '작전 발의',
      children: [
        { id: 'fleet_deploy',    label: '함대 출격', modal: 'military' },
        { id: 'fleet_transport', label: '수송',      modal: 'fleet'    },
      ],
    },
    {
      id: 'fleet_manage', label: '함대관리',
      children: [
        { id: 'fleet_form',    label: '편성 / 재편', modal: 'fleet' },
        { id: 'fleet_disband', label: '함대 해산',   modal: 'fleet' },
      ],
    },
    { id: 'fleet_train',  label: '훈련', disabled: true },
    { id: 'fleet_sim',    label: '모의', disabled: true },
  ],

  domestic: [
    { id: 'budget_alloc',  label: '예산 배분',   modal: 'finance'  },
    { id: 'planet_develop',label: '행성 개발',   modal: 'build'    },
    { id: 'ship_design',   label: '함선 설계',   disabled: true    },
    { id: 'ship_build',    label: '함선 제작',   modal: 'military' },
  ],

  personnel: [
    { id: 'appoint_admin', label: '내정 인사', modal: 'char' },
    { id: 'appoint_mil',   label: '군사 인사', modal: 'char' },
  ],

  intel: [
    { id: 'intel_spy',     label: '첩보',   modal: 'intel' },
    { id: 'intel_counter', label: '방첩',   modal: 'intel' },
    { id: 'intel_special', label: '특수',   modal: 'intel' },
  ],

  research: [
    { id: 'research_regime',   label: '체제',      disabled: true },
    { id: 'research_idea',     label: '사상',      disabled: true },
    { id: 'research_domestic', label: '내정설비',  disabled: true },
    { id: 'research_mil',      label: '군사설비',  disabled: true },
    { id: 'research_tactics',  label: '전술연구',  disabled: true },
  ],

  finance: [
    { id: 'finance_status', label: '재정 현황',  modal: 'finance' },
    { id: 'tax_adjust',     label: '세율 조정',  modal: 'tax'     },
  ],

  personal: [
    { id: 'news',          label: '뉴스',      disabled: true },
    { id: 'commission',    label: '임관 / 퇴역', disabled: true },
    { id: 'party',         label: '입당 / 탈당', disabled: true },
    { id: 'self_train',    label: '개인 훈련',  disabled: true },
    { id: 'education',     label: '교육',      disabled: true },
  ],

  info: [
    { id: 'info_char',  label: '👤 인물', modal: 'char'  },
    { id: 'info_fleet', label: '🚀 함대', modal: 'fleet' },
    { id: 'info_intel', label: '🔍 세력', modal: 'intel' },
    { id: 'info_star',  label: '🌌 성계', disabled: true },
  ],
}
