// ================================================================
//  menuTree.js — BottomBar 카테고리별 메뉴 트리 정의
//  leaf 항목: { id, label, modal?, action? }
//  parent 항목: { id, label, children: [...] }
// ================================================================
// 2026.06.16 수정사항 존재함. (diff 분석하여 적용해야함)
export const MENU_TREES = {
  military: [
    {
      id: "op_propose",
      label: "작전 발의",
      children: [
        /** 작전 발의 / 작전 수정
         *  결정권자: (동맹) 통합작전본부장 -> 최고평의회
         *          (제국) 통수본부총장 -> 재상 -> 황제
         *  제안 가능 계급: 중장 이상.
         *  실행 가능 계급: 전 계급
         *  효과 : 특정 성계에 공격/방어 작전을 수립한다.
         *  `````
         *    승인자 : [이름] 친밀도의 근사치 수락확률 (이름 영역은 버튼형으로 표시, 버튼 클릭 시 결정권자 + 중장 이상 인물의 리스트 팝업이 노출. 결정권자의 경우 직접 결재. 중장 이상의 인물의 경우 해당 인물이 결정권자에게 제안하는 방식으로 진행)
         *    작전명 : ${성계명} ${공격 혹은 방어}작전이 표시
         *    출격함대 : n함대 (1~해당 국가의 최대 함대수로 선택 가능)
         *    작전기간 : n개월 (1~12)
         *    작전종료 : n년 n월 n일 (작전기간에 따라 표시)
         *    작전예산 : 0 (모든 개발 완료 후, 추가 개발 컨텐츠에서 진행 예정)
         *    보안도 : 0 (이벤트 트리거 a의 발생 확률을 노출)
         *
         *    [결정/제안] : 하단 실행 버튼. 승인자가 결정권자와 같으면 결정, 그 외면 제안으로 표시
         *  `````
         *  [결정/제안] 버튼 누를 경우, operationData.js에 데이터 적재.
         *  이후 턴 종료 시, 공통 이벤트로 승인자는 제안자와의 친밀도에 따라 턴 종료시 수락, 이후 결제 라인을 거쳐 처리
         *  공격작전의 경우 수락 확률에 기본 -10%
         *  방어작전의 경우 수락 확률에 기본 +10%,
         *  모두 완료 시, 타국에 이벤트 트리거(a) 발생. 자국에 이벤트 트리거(b)와 이벤트 트리거(c) 발생
         *
         *  > 이벤트 트리거(a) : 다음 턴 시작 시 발생하며, 50%(정보담당관의 inf차이만큼 % 보정)의 확률로
         *                    해당 작전의 누설 여부 체크
         *  > 이벤트 트리거(b) : 다음 턴 시작부터 해당 국가는 해당 성계에 ㅁ 표시가 n개월 동안 표시되며, 해당 성계에 함대 출격이 가능함.
         *                   해당 국가의 인물(NPC포함)은 [함대 출격]을 제안하기 시작함.
         *  > 이벤트 트리거(c) : 방어 작전의 경우 발생.
         */
        { id: "", label: "작전 제안", modal: "military" },
        /** 함대 출격
         *
         */
        { id: "fleet_deploy", label: "함대 출격", modal: "military" },
        { id: "fleet_transport", label: "수송", modal: "fleet" },
      ],
    },
    {
      id: "fleet_manage",
      label: "함대관리",
      children: [
        { id: "fleet_form", label: "편성 / 재편", modal: "fleet" },
        { id: "fleet_disband", label: "함대 해산", modal: "fleet" },
      ],
    },
    { id: "fleet_train", label: "훈련", disabled: true },
    { id: "fleet_sim", label: "모의", disabled: true },
  ],

  domestic: [
    { id: "budget_alloc", label: "예산 배분", modal: "finance" },
    { id: "planet_develop", label: "행성 개발", modal: "build" },
    { id: "ship_design", label: "함선 설계", disabled: true },
    { id: "ship_build", label: "함선 제작", modal: "military" },
  ],

  personnel: [
    { id: "appoint_admin", label: "내정 인사", modal: "char" },
    { id: "appoint_mil", label: "군사 인사", modal: "char" },
  ],

  intel: [
    { id: "intel_spy", label: "첩보", modal: "intel" },
    { id: "intel_counter", label: "방첩", modal: "intel" },
    { id: "intel_special", label: "특수", modal: "intel" },
  ],

  research: [
    { id: "research_regime", label: "체제", disabled: true },
    { id: "research_idea", label: "사상", disabled: true },
    { id: "research_domestic", label: "내정설비", disabled: true },
    { id: "research_mil", label: "군사설비", disabled: true },
    { id: "research_tactics", label: "전술연구", disabled: true },
  ],

  finance: [
    { id: "finance_status", label: "재정 현황", modal: "finance" },
    { id: "tax_adjust", label: "세율 조정", modal: "tax" },
  ],

  personal: [
    { id: "news", label: "뉴스", disabled: true },
    { id: "commission", label: "임관 / 퇴역", disabled: true },
    { id: "party", label: "입당 / 탈당", disabled: true },
    { id: "self_train", label: "개인 훈련", disabled: true },
    { id: "education", label: "교육", disabled: true },
  ],

  info: [
    { id: "info_char", label: "👤 인물", modal: "char" },
    { id: "info_fleet", label: "🚀 함대", modal: "fleet" },
    { id: "info_intel", label: "🔍 세력", modal: "intel" },
    { id: "info_star", label: "🌌 성계", disabled: true },
  ],
};
