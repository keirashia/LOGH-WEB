// ================================================================
//  menuTree.js — BottomBar 카테고리별 메뉴 트리 정의
//  leaf 항목: { id, label, modal?, action? }
//  parent 항목: { id, label, children: [...] }
//  group 항목: { id, label, type: "group", items: [...] }
// ================================================================
export const MENU_TREES = {
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
         *  효과: 특정 성계에 공격/방어 작전을 수립한다.
         *
         *  승인자 : [이름] 친밀도 근사치 수락확률 표시 버튼
         *           클릭 시 결정권자 + 중장 이상 인물 리스트 팝업 노출
         *           결정권자 → 직접 결재 / 중장급 → 결정권자에게 제안
         *  작전명 : ${성계명} ${공격 혹은 방어}작전
         *  출격함대: n함대 (1 ~ 해당 국가 최대 함대수)
         *  작전기간: n개월 (1 ~ 12)
         *  작전종료: n년 n월 n일 (자동 계산)
         *  작전예산: 0 (추후 구현)
         *  보안도  : 0 (이벤트 트리거 a 발생 확률)
         *
         *  [결정/제안] 버튼: 승인자 == 결정권자 → "결정", 그 외 → "제안"
         *
         *  제출 시 → operationData.js에 적재
         *  턴 종료 시 공통 이벤트로 친밀도 기반 수락/거절 처리
         *    - 공격작전: 수락률 기본 -10%
         *    - 방어작전: 수락률 기본 +10%
         *  완료 시 이벤트 트리거:
         *    (a) 적국 누설 50% 체크 (정보관 inf 보정)
         *    (b) 자국 해당 성계에 ㅁ 표시 n개월 + 함대 출격 가능
         *    (c) 방어작전 전용 트리거
         */
        { id: "op_propose",      label: "작전제안",  modal: "operation" },
        { id: "fleet_transport", label: "수송",      modal: "fleet" },
      ],
    },
    {
      id: "fleet",
      label: "함대",
      type: "group",
      items: [
        { id: "fleet_form",    label: "함대편성", modal: "fleet" },
        { id: "fleet_reorg",   label: "함대재편", modal: "fleet" },
        { id: "fleet_deploy",  label: "함대 출격", modal: "military" },
        { id: "fleet_disband", label: "함대해산", modal: "fleet" },
      ],
    },
    {
      id: "ship",
      label: "함선",
      type: "group",
      items: [
        { id: "",    label: "함선설계", modal: "fleet" },
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
    { id: "budget_alloc",   label: "예산 배분", modal: "finance" },
    { id: "planet_develop", label: "행성 개발", modal: "build" },
    { id: "ship_design",    label: "함선 설계", disabled: true },
    { id: "ship_build",     label: "함선 제작", modal: "military" },
  ],

  personnel: [
    { id: "appoint_admin", label: "내정 인사", modal: "char" },
    { id: "appoint_mil",   label: "군사 인사", modal: "char" },
  ],

  intel: [
    { id: "intel_spy",     label: "첩보", modal: "intel" },
    { id: "intel_counter", label: "방첩", modal: "intel" },
    { id: "intel_special", label: "특수", modal: "intel" },
  ],

  research: [
    { id: "research_regime",   label: "체제",     disabled: true },
    { id: "research_idea",     label: "사상",     disabled: true },
    { id: "research_domestic", label: "내정설비", disabled: true },
    { id: "research_mil",      label: "군사설비", disabled: true },
    { id: "research_tactics",  label: "전술연구", disabled: true },
  ],

  finance: [
    { id: "finance_status", label: "재정 현황", modal: "finance" },
    { id: "tax_adjust",     label: "세율 조정", modal: "tax" },
  ],

  personal: [
    { id: "news",       label: "뉴스",       disabled: true },
    { id: "commission", label: "임관 / 퇴역", disabled: true },
    { id: "party",      label: "입당 / 탈당", disabled: true },
    { id: "self_train", label: "개인 훈련",   disabled: true },
    { id: "education",  label: "교육",        disabled: true },
  ],

  info: [
    { id: "info_char",  label: "👤 인물", modal: "char" },
    { id: "info_fleet", label: "🚀 함대", modal: "fleet" },
    { id: "info_intel", label: "🔍 세력", modal: "intel" },
    { id: "info_star",  label: "🌌 성계", disabled: true },
  ],
};
