// ================================================================
//  menuTree.js — StrategyBar 카테고리별 메뉴 트리 정의
//  leaf 항목: { id, label, modal?, action? }
//  group 항목: { id, label, type: "group", items: [...] }
//
//  1ROW (제안 영역): nation | military | domestic | faction
//  2ROW (직접 실행): intel  | personal | social   | info
// ================================================================
export const MENU_TREES = {

  // ── 1ROW ────────────────────────────────────────────────────────

  nation: [
    {
      id: "nation_overview",
      label: "국가 중점",
      type: "group",
      items: [
        { id: "nation_info",  label: "국가정보", modal: "nationInfo" },
        { id: "nation_focus", label: "중점설정", disabled: true },
        { id: "nation_post",  label: "요직",     modal: "nationPost" },
      ],
    },
    {
      id: "nation_summary",
      label: "주요 정보",
      type: "group",
      items: [
        { id: "nation_char",  label: "인물", modal: "charList"  },
        { id: "nation_fleet", label: "함대", modal: "fleetInfo" },
        { id: "nation_star",  label: "성계", modal: "starList"  },
      ],
    },
    {
      id: "nation_budget",
      label: "국가 예산",
      type: "group",
      items: [
        { id: "budget_info",  label: "예산정보", modal: "finance", disabled: true },
        { id: "budget_levy",  label: "임시징세", modal: "tax",     disabled: true },
        { id: "budget_plan",  label: "예산배분", disabled: true },
      ],
    },
    {
      id: "nation_domestic",
      label: "국가 내정",
      type: "group",
      items: [
        { id: "dom_title",    label: "작위수여", disabled: true },
        { id: "dom_pledge",   label: "공약이행", disabled: true },
        { id: "dom_research", label: "연구",     disabled: true },
        { id: "dom_intel",    label: "첩보",     disabled: true },
      ],
    },
    {
      id: "nation_diplomacy",
      label: "국가 외교",
      type: "group",
      items: [
        { id: "dipl_loan", label: "차관", disabled: true },
      ],
    },
  ],

  military: [
    {
      id: "op",
      label: "작전",
      type: "group",
      items: [
        /**
         *  작전 발의 / 작전 수정 → OperationModal.vue
         *
         *  결정권자: (동맹) 통합작전본부장 → 최고평의회
         *           (제국) 통수본부총장 → 재상 → 황제
         *  제안 가능 계급: 중장 이상.
         *  실행 가능 계급: 전 계급
         */
        { id: "op_info",         label: "작전정보",  modal: "operationInfo" },
        { id: "op_propose",      label: "작전제안",  modal: "operation" },
        { id: "fleet_transport", label: "수송",      modal: "fleet" },
      ],
    },
    {
      id: "fleet",
      label: "함대",
      type: "group",
      items: [
        { id: "fleet_info",    label: "함대정보", modal: "fleetInfo" },
        { id: "fleet_form",    label: "함대편성", modal: "fleet" },
        { id: "fleet_reorg",   label: "함대재편", modal: "fleet" },
        { id: "fleet_deploy",  label: "함대 출격", modal: "military" },
        { id: "fleet_disband", label: "함대해산", modal: "fleet" },
      ],
    },
    {
      id: "mil_production",
      label: "생산",
      type: "group",
      items: [
        { id: "ship_build",    label: "함선 생산",   modal: "military" },
        { id: "mil_facility",  label: "시설 건설",   disabled: true },
      ],
    },
    {
      id: "mil_personnel",
      label: "인사",
      type: "group",
      items: [
        { id: "appoint_commander", label: "지휘관 추천", disabled: true },
        { id: "appoint_staff",     label: "참모 추천",   disabled: true },
      ],
    },
    // {
    //   id: "doctrine",
    //   label: "교리",
    //   type: "group",
    //   items: [
    //     { id: "doctrine_maneuver",  label: "기동전",   disabled: true },
    //     { id: "doctrine_attrition", label: "소모전",   disabled: true },
    //     { id: "doctrine_strike",    label: "집중타격", disabled: true },
    //   ],
    // },
    {
      id: "mil_admin",
      label: "군정",
      type: "group",
      items: [
        { id: "mil_conscript", label: "징병안",    disabled: true },
        { id: "mil_reform",    label: "군제 개혁", disabled: true },
        { id: "budget_alloc",  label: "예산 요청", modal: "finance" },
      ],
    },
    {
      id: "train",
      label: "훈련",
      type: "group",
      items: [
        { id: "fleet_train", label: "훈련",   disabled: true },
        { id: "fleet_sim",   label: "모의전", disabled: true },
      ],
    },
  ],

  domestic: [
    {
      id: "planet_group",
      label: "행성",
      type: "group",
      items: [
        { id: "planet_status",   label: "행성 현황", disabled: true },
        { id: "planet_governor", label: "총독 현황", disabled: true },
      ],
    },
    {
      id: "build_group",
      label: "건설",
      type: "group",
      items: [
        { id: "planet_develop", label: "시설 건설",  modal: "build" },
        { id: "ship_design",    label: "함선 설계",  disabled: true },
        { id: "infra",          label: "인프라 확충", disabled: true },
      ],
    },
    {
      id: "economy_group",
      label: "경제",
      type: "group",
      items: [
        { id: "econ_industry", label: "산업 육성", disabled: true },
        { id: "econ_trade",    label: "무역 확대", disabled: true },
      ],
    },
    {
      id: "population_group",
      label: "인구",
      type: "group",
      items: [
        { id: "pop_migrate", label: "이민 정책", disabled: true },
        { id: "pop_edu",     label: "교육 정책", disabled: true },
      ],
    },
    {
      id: "security_group",
      label: "치안",
      type: "group",
      items: [
        { id: "sec_policy", label: "치안 정책",  disabled: true },
        { id: "sec_police", label: "경찰력 증강", disabled: true },
      ],
    },
    {
      id: "research_group",
      label: "연구",
      type: "group",
      items: [
        { id: "research_regime",   label: "체제",     disabled: true },
        { id: "research_idea",     label: "사상",     disabled: true },
        { id: "research_domestic", label: "내정설비", disabled: true },
        { id: "research_mil",      label: "군사설비", disabled: true },
        { id: "research_tactics",  label: "전술연구", disabled: true },
      ],
    },
    {
      id: "finance_group",
      label: "재정",
      type: "group",
      items: [
        { id: "finance_status", label: "재정 현황", modal: "finance" },
        { id: "tax_adjust",     label: "세율 조정", modal: "tax" },
      ],
    },
  ],

  faction: [
    {
      id: "clique_group",
      label: "세력",
      type: "group",
      items: [
        { id: "clique_status", label: "세력",     disabled: true },
        { id: "clique_info",   label: "파벌정보", modal: "cliqueInfo" },
      ],
    },
    {
      id: "support_group",
      label: "지지",
      type: "group",
      items: [
        { id: "faction_influence", label: "영향력 현황", disabled: true },
        { id: "faction_approval",  label: "지지율",      disabled: true },
      ],
    },
    {
      id: "agenda_group",
      label: "의제",
      type: "group",
      items: [
        { id: "faction_demand", label: "현재 요구사항", disabled: true },
        { id: "faction_policy", label: "정책 요구",     disabled: true },
      ],
    },
    {
      id: "vote_group",
      label: "투표",
      type: "group",
      items: [
        { id: "vote_bill",  label: "법안",   disabled: true },
        { id: "vote_op",    label: "작전안", disabled: true },
        { id: "vote_appt",  label: "인사안", disabled: true },
      ],
    },
    {
      id: "politics_group",
      label: "정치",
      type: "group",
      items: [
        { id: "politics_coalition",  label: "연합",  disabled: true },
        { id: "politics_split",      label: "분열",  disabled: true },
        { id: "politics_negotiate",  label: "협상",  disabled: true },
      ],
    },
  ],

  // ── 2ROW ────────────────────────────────────────────────────────

  intel: [
    {
      id: "info_gather",
      label: "정보",
      type: "group",
      items: [
        { id: "intel_spy",     label: "정보수집",   modal: "intel" },
        { id: "intel_counter", label: "방첩망 구축", modal: "intel" },
      ],
    },
    {
      id: "recruit_group",
      label: "포섭",
      type: "group",
      items: [
        { id: "recruit_officer",    label: "장교 포섭",   disabled: true },
        { id: "recruit_politician", label: "정치인 포섭", disabled: true },
      ],
    },
    {
      id: "covert_group",
      label: "공작",
      type: "group",
      items: [
        { id: "intel_special",  label: "특수작전", modal: "intel" },
        { id: "covert_divide",  label: "이간질",   disabled: true },
        { id: "covert_fake",    label: "위장공작", disabled: true },
      ],
    },
    {
      id: "assassin_group",
      label: "암살",
      type: "group",
      items: [
        { id: "assassin_plan", label: "암살 계획", disabled: true },
        { id: "assassin_exec", label: "암살 실행", disabled: true },
      ],
    },
    {
      id: "propaganda_group",
      label: "선전",
      type: "group",
      items: [
        { id: "prop_opinion", label: "여론 조작",   disabled: true },
        { id: "prop_fake",    label: "허위 정보 유포", disabled: true },
      ],
    },
  ],

  personal: [
    {
      id: "profile_group",
      label: "프로필",
      type: "group",
      items: [
        { id: "info_char",  label: "능력치·직책",   modal: "char" },
        { id: "self_train", label: "개인 훈련",      disabled: true },
        { id: "education",  label: "교육",           disabled: true },
      ],
    },
    {
      id: "relation_group",
      label: "관계",
      type: "group",
      items: [
        { id: "relation_friend", label: "친구", disabled: true },
        { id: "relation_enemy",  label: "적대", disabled: true },
        { id: "relation_patron", label: "은인", disabled: true },
      ],
    },
    {
      id: "trait_group",
      label: "특성",
      type: "group",
      items: [
        { id: "trait_view",   label: "트레잇", disabled: true },
        { id: "trait_stance", label: "성향",   disabled: true },
      ],
    },
    {
      id: "career_group",
      label: "경력",
      type: "group",
      items: [
        { id: "career_history",  label: "이력",   disabled: true },
        { id: "career_achieve",  label: "업적",   disabled: true },
      ],
    },
    {
      id: "assets_group",
      label: "자산",
      type: "group",
      items: [
        { id: "assets_money",    label: "재산",   disabled: true },
        { id: "assets_items",    label: "소유물", disabled: true },
      ],
    },
    {
      id: "family_group",
      label: "가문",
      type: "group",
      items: [
        { id: "family_tree",  label: "가계도",    disabled: true },
        { id: "family_blood", label: "혈연관계",  disabled: true },
      ],
    },
    {
      id: "status_group",
      label: "신분",
      type: "group",
      items: [
        { id: "commission", label: "임관 / 퇴역", disabled: true },
        { id: "party",      label: "입당 / 탈당", disabled: true },
      ],
    },
  ],

  social: [
    {
      id: "visit_group",
      label: "방문",
      type: "group",
      items: [
        { id: "social_request", label: "면담 요청", disabled: true },
        { id: "social_visit",   label: "방문",      disabled: true },
      ],
    },
    {
      id: "talk_group",
      label: "대화",
      type: "group",
      items: [
        { id: "social_exchange", label: "의견 교환", disabled: true },
        { id: "social_persuade", label: "설득",      disabled: true },
      ],
    },
    {
      id: "gift_group",
      label: "선물",
      type: "group",
      items: [
        { id: "social_money", label: "자금",  disabled: true },
        { id: "social_item",  label: "물품",  disabled: true },
      ],
    },
    {
      id: "sponsor_group",
      label: "후원",
      type: "group",
      items: [
        { id: "social_polit_sponsor", label: "정치 후원", disabled: true },
        { id: "social_fin_sponsor",   label: "재정 지원", disabled: true },
      ],
    },
    {
      id: "party_group",
      label: "연회",
      type: "group",
      items: [
        { id: "social_party_host",   label: "연회 개최", disabled: true },
        { id: "social_party_invite", label: "초청",      disabled: true },
      ],
    },
    {
      id: "introduce_group",
      label: "소개",
      type: "group",
      items: [
        { id: "social_connect",   label: "인맥 연결", disabled: true },
        { id: "social_recommend", label: "추천",      disabled: true },
      ],
    },
  ],

  info: [
    { id: "news_latest", label: "속보", disabled: true },
    {
      id: "news_politics",
      label: "정치",
      type: "group",
      items: [
        { id: "info_intel",  label: "파벌 동향", modal: "intel" },
        { id: "news_pol",    label: "정치 뉴스", disabled: true },
      ],
    },
    {
      id: "news_military",
      label: "군사",
      type: "group",
      items: [
        { id: "info_fleet",  label: "함대 정보",  modal: "fleet" },
        { id: "news_battle", label: "전투 결과",  disabled: true },
      ],
    },
    {
      id: "news_economy",
      label: "경제",
      type: "group",
      items: [
        { id: "news_econ",   label: "경제 뉴스",  disabled: true },
        { id: "news_market", label: "시장 변화",  disabled: true },
      ],
    },
    {
      id: "news_rumor",
      label: "소문",
      type: "group",
      items: [
        { id: "news_rumor_item",  label: "루머",      disabled: true },
        { id: "news_intel_report", label: "첩보 보고", disabled: true },
      ],
    },
    {
      id: "records_group",
      label: "기록",
      type: "group",
      items: [
        { id: "news_timeline", label: "연표",   disabled: true },
        { id: "news_events",   label: "사건",   disabled: true },
        { id: "info_char",     label: "인물전", modal: "char" },
        { id: "info_star",     label: "성계",   disabled: true },
      ],
    },
  ],
};
