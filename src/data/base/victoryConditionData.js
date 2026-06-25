// ================================================================
//  victoryConditionData.js — 세력 흡수 승리조건 마스터
//  경로: src/data/base/victoryConditionData.js
//  작성: 2026-06-25
//
//  특정 세력(지구교·페잔 등)이 행성/국가 단위의 idea 분포를 점진적으로
//  잠식하여 일정 임계값을 초과했을 때 트리거되는 흡수 승리조건.
//
//  연동 파일:
//    - buildingData.js     : EAT_BASE_001(비밀지부), QUEMMEL_RESIDENCE 효과와 직결
//    - ideologyData.js     : triggerIdea 코드 기준
//    - regimeData.js       : idea=300 → [286,300] 구간("신권제국")에 포함
//    - planetsData.js      : pops.idea 배열에서 triggerIdea 비율 산출
//
//  ⚠️ TODO 목록:
//    [A] scope 판정 단위 미결정:
//        "planet" — 행성별 개별 판정. 한 행성의 idea 비율이 threshold를 넘으면 그 행성만 흡수.
//        "nation" — 국가 전체 판정. 국가 내 모든 행성의 평균 비율이 threshold를 넘으면 국가 전체 흡수.
//        현재 "planet"으로 가설정. 결정 후 수정 필요.
//
//    [B] EAT triggerIdea 85 vs 300 역할 분리:
//        idea=85(신권정치)는 regimeData.js IDEOLOGY 레벨의 체제 코드.
//        idea=300(신정정치/테라이즘)은 pops 개인/집단 차원의 테라이즘 침투도.
//        현재 설계에서는 300을 "테라이즘 침투 지표"로 사용하고,
//        85는 별도로 사용하지 않음. 최종 확정 전까지 이 구조를 유지.
//
//    [C] PZN(페잔) 흡수조건 미설계:
//        과거 논의에서 "idea=180(혼합체제) 비율이 임계값 초과 시 경제적 흡수"가 언급됐으나,
//        EAT_BASE_001에 해당하는 페잔 전용 침투 메커니즘(건물/이벤트)이 아직 설계되지 않음.
//        설계 확정 후 PZN 항목 작성 필요.
//
//    [D] effect 세부 정의 미결정:
//        "absorb" 트리거 이후의 실제 게임 효과(정치적 흡수 이벤트 트리거, 파벌 전환,
//        소득 귀속 변경 등)는 이벤트/로직 레이어에서 구현. 이 파일은 조건 판정만 담당.
// ================================================================

/**
 * @typedef {Object} VictoryCondition
 * @property {string}          id          - 조건 식별자
 * @property {string}          faction     - 흡수를 시도하는 세력 코드 (factionsData.js 참조)
 * @property {number}          triggerIdea - pops.idea 배열에서 비율을 산출할 idea 코드
 * @property {number}          threshold   - 흡수 트리거 임계값 (0~1, 해당 idea 비율)
 * @property {"planet"|"nation"} scope     - 판정 단위
 * @property {string}          effect      - 트리거 이벤트 종류 식별자
 */

export const VICTORY_CONDITIONS = [

  // ── 지구교(EAT) — 테라이즘 침투에 의한 행성 흡수 ────────────────
  {
    id: "VC_EAT_ABSORB",
    faction: "EAT",
    triggerIdea: 300,       // 신정정치(테라이즘). EAT_BASE_001의 변환 목표값과 일치.
    threshold: 0.3,          // 행성 pops 중 idea=300 비율이 30% 초과 시 트리거.
    scope: "planet",         // ⚠️ TODO[A]: planet | nation 미결정. 현재 planet 가설정.
    effect: "absorb",        // ⚠️ TODO[D]: 이벤트 로직 미구현. 트리거 식별자만 확보.
  },

  // ── 페잔(PZN) — 경제적 침투에 의한 흡수 ────────────────────────
  // ⚠️ TODO[C]: 침투 메커니즘(건물/이벤트) 미설계. 플레이스홀더만 등록.
  // {
  //   id: "VC_PZN_ABSORB",
  //   faction: "PZN",
  //   triggerIdea: 180,       // 혼합체제. 페잔 영향력 지표로 가설정.
  //   threshold: 0.4,
  //   scope: "planet",
  //   effect: "absorb",
  // },

]

export const VICTORY_CONDITION_MAP = Object.fromEntries(
  VICTORY_CONDITIONS.map((vc) => [vc.id, vc])
)
