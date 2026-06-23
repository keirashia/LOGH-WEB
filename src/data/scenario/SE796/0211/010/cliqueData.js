// 경로: src/data/scenario/SE796/0211/010/cliqueData.js
// ================================================================
//  cliqueData.js — 시나리오 796_01 파벌(clique) 인스턴스
//  경로: src/data/scenario/SE796/0211/010/cliqueData.js
//  작성: 2026-06-23 (재작성 — 2026-06-19 빈 틀 이후 첫 실데이터 반영)
//  시나리오: 이젤론 함락 직후 (우주력 796년)
//
//  ※ 네이밍: "faction"은 국가, "clique"는 국가 내부 파벌을 의미.
//
//  스키마:
//    id        : clique 고유 ID
//    name      : 파벌 표시명. 자유 입력, 최대 20자, 사용자가 언제든 수정 가능.
//                생성 시 기본값은 "[창설자명] 파벌" 형태를 권장하나 강제는 아님.
//    founder   : 창설자 charCode. 불변(역사적 기록, 리더가 바뀌어도 변경되지 않음).
//    leader    : 현재 리더 charCode. 분쟁 이벤트(신규가입자 statCsm이 기존 leader와
//                근접/초과)로만 교체됨 — 자동 갱신 금지. (이벤트 발생조건/판정 로직은 TODO)
//
//    tender    : 파벌의 현재 정치적 위치. { econ, idea, friend }
//                - econ/idea  : economyData.js/ideologyData.js 코드와 같은 척도의 연속값
//                  (코드표에 정확히 존재하지 않는 값도 가능 — 척도 위의 한 지점일 뿐)
//                - friend     : 리더의 friend 값
//                생성 시점에는 창설자(=리더) 1인의 값과 동일하게 시작.
//                멤버가 늘어나면 "멤버 평균값"이 새로운 목표가 되고, tender는 매 턴
//                ±1씩 그 목표를 향해 수렴한다(즉시 반영 아님). 목표는 멤버 변화마다 재계산.
//
//    members   : 소속 인물 charCode 배열. 생성 시 창설자 1명으로 시작.
//                가입은 초대(리더→대상) 또는 가입요청(대상→리더)으로 이루어지며,
//                후보자의 econ/idea/friend 중 하나라도 파벌 tender와의 차이가 100 이상이면
//                ("혐오" 상태로 간주) 가입 불가.
//
//    level     : 파벌 레벨. 1~10.
//    exp       : 누적 경험치. 매 턴 += memberCount.
//                (레벨별 필요 경험치 테이블, 레벨업 시 스킬트리/효과 부여 방식은
//                 TODO — 게임 본체 완성 후 확장개발 단계에서 설계)
//
//  ⚠️ 제거된 필드(설계 검토 후 불필요 판단):
//    power  — 파벌의 실질적 권력은 별도 저장하지 않고, 전국 행성(planetsData.js)의
//             pops.friend 분포 중 해당 clique를 지지하는 unit 합계를 매번 집계해서
//             computed/getter로 산출하는 구조로 변경 (행성 corruption 집계와 동일 패턴).
//             ※ 행성 pops.friend 필드 자체는 아직 TODO 상태(코드체계 미정) — 이 clique들이
//                완성되면 friend 배열의 code 후보로 사용될 예정.
//    nation — founder(또는 leader)의 charactersData.js상 faction으로 충분히 판단 가능하여 중복 제거.
//    type   — cliqueTypeData.js 분류(POWER_STRUGGLE 등)를 생성 시점에 강제 지정하지 않기로
//             결정. 필요 시 추후 파생적으로 분류하거나 표시용 태그로만 활용 검토.
//
//  본 파일 데이터는 charactersData.js(2026-06-23 자, friend 76/565명 보강분 기준)의
//  faction/idea/econ/friend 값을 그대로 가져와 창설 시점 tender로 채움.
//
//  관련 파일 위치 (base):
//    src/data/base/factions/cliqueTypeData.js     — 파벌 유형 마스터 (현재 미사용, type 필드 제거로 참고용)
//    src/data/base/characters/charactersData.js   — 창설자/멤버의 faction/idea/econ/friend 출처
//    src/data/base/regime/ideologyData.js         — idea 코드 척도 기준점 (코드 외 값도 허용)
//    src/data/base/regime/economyData.js          — econ 코드 척도 기준점 (코드 외 값도 허용)
//    src/data/base/stars/planetsData.js           — pops.friend(TODO)와 연동될 예정,
//                                                     완성되면 clique.id가 friend 배열의 code로 사용됨
// ================================================================

export const CLIQUE_DATA = [

  // ── 황제 충성파 ──────────────────────────────────────────────
  // 프리드리히 폰 골덴바움 4세(CH_000514) 본인을 구심점으로 하는 황제파.
  // 시나리오 시점(SE796 0211 기준)에는 생존해 있으나 1096.10.12 사망 예정 — 이후 리더 교체
  // 이벤트(또는 파벌 해체)가 필요할 것으로 보임. TODO.
  {
    id: "CLQ_REH_001",
    name: "황제 충성파",
    founder: "CH_000514", // 프리드리히 폰 골덴바움 4세
    leader: "CH_000514",
    tender: {
      econ: 140,   // 혼합경제
      idea: 270,   // (전제군주제 240 기준 +30 지점)
      friend: 95,
    },
    members: ["CH_000514"],
    level: 1,
    exp: 0,
  },

  // ── 브라운슈바이크 지지파 ────────────────────────────────────
  {
    id: "CLQ_REH_002",
    name: "브라운슈바이크 지지파",
    founder: "CH_000306", // 오토 폰 브라운슈바이크
    leader: "CH_000306",
    tender: {
      econ: 180,   // 국가자본주의
      idea: 290,   // (전제군주제 240 기준 +50 지점)
      // friend: 라인하르트와 원형거리 110(상극) / 리텐하임과는 80(불편함, 같은 진영이라 약간 가깝게) — 85 → 40
      friend: 40,
    },
    members: ["CH_000306"],
    level: 1,
    exp: 0,
  },

  // ── 리텐하임 지지파 ──────────────────────────────────────────
  {
    id: "CLQ_REH_003",
    name: "리텐하임 지지파",
    founder: "CH_000198", // 빌헬름 폰 리텐하임
    leader: "CH_000198",
    tender: {
      econ: 180,   // 국가자본주의
      idea: 290,
      // friend: 라인하르트와 원형거리 110(상극) / 브라운슈바이크와는 80(불편함, 같은 진영이라 약간 가깝게) — 80 → 260
      friend: 260,
    },
    members: ["CH_000198"],
    level: 1,
    exp: 0,
  },

  // ── 로엔그람 지지파 ──────────────────────────────────────────
  {
    id: "CLQ_REH_004",
    name: "로엔그람 지지파",
    founder: "CH_000064", // 라인하르트 폰 로엔그람
    leader: "CH_000064",
    tender: {
      econ: 60,    // 봉건경제
      idea: 240,   // 전제군주제 (REH 국가 지향값과 일치)
      friend: 150,
    },
    members: ["CH_000064"],
    level: 1,
    exp: 0,
  },

  // ── 트류니히트 파벌 (동맹) ───────────────────────────────────
  // 유일하게 FPA(자유행성동맹) 소속 파벌. 다른 4개는 모두 REH(제국) 소속.
  {
    id: "CLQ_FPA_001",
    name: "트류니히트 파벌",
    founder: "CH_000329", // 욥 트류니히트
    leader: "CH_000329",
    tender: {
      econ: 100,   // 자본주의
      idea: 100,   // 민주공화제
      // friend: 0625 캐릭터팀 friend 좌표계 개편(0~299 원형) 반영 — 20 → 245로 갱신
      friend: 245,
    },
    members: ["CH_000329"],
    level: 1,
    exp: 0,
  },


  // ── 군부 양심파 (동맹) ───────────────────────────────────────
  // 시드니 시톨레를 구심점으로 하는 동맹 군부 내 원칙주의자 그룹.
  // 정치적 압력과 군 내부 모순 속에서도 원칙을 지키며 양 웬리 같은 인재를 지원하는 노선.
  {
    id: "CLQ_FPA_002",
    name: "군부 양심파",
    founder: "CH_000230", // 시드니 시톨레
    leader: "CH_000230",
    tender: {
      econ: 100,   // 시장경제
      idea: 100,   // 자유민주공화국
      friend: 155,
    },
    members: ["CH_000230"],
    level: 1,
    exp: 0,
  },


  // ── 의장파 (동맹) ────────────────────────────────────────────
  // 로열 샌포드(최고평의회 의장)를 구심점으로 하는 현 행정부 주류 세력.
  // 지지율 만회를 위해 제국령 침공 작전을 승인한 책임을 지고 있음.
  {
    id: "CLQ_FPA_003",
    name: "의장파",
    founder: "CH_000082", // 로열 샌포드
    leader: "CH_000082",
    tender: {
      econ: 100,   // 자본주의
      idea: 100,   // 자유민주공화국
      friend: 105,
    },
    members: ["CH_000082"],
    level: 1,
    exp: 0,
  },


  // ── 현실파 (동맹) ────────────────────────────────────────────
  // 조안 레벨로를 구심점으로 하는 동맹 정계 내 현실주의 노선.
  // 제국에 대한 온건론이 아니라, 동맹의 내부 사정(국력 소모)을 고려해
  // 제국령 침공 작전에 반대했던 재정·내정 중심 정치인 그룹.
  {
    id: "CLQ_FPA_004",
    name: "현실파",
    founder: "CH_000377", // 조안 레벨로
    leader: "CH_000377",
    tender: {
      econ: 100,   // 자본주의
      idea: 100,   // 자유민주공화국
      friend: 140,
    },
    members: ["CH_000377"],
    level: 1,
    exp: 0,
  },


  // ── 반전시민연합 (동맹) ──────────────────────────────────────
  // 제임스 손다이크를 구심점으로 하는 테르누젠 지역 반전 시민단체.
  // 손다이크가 선거 직전 폭탄 테러로 사망한 뒤, 그의 뜻을 이어 출마한
  // 제시카 에드워즈가 압도적 득표로 당선되며 리더직을 승계한다 (TODO: 승계 이벤트).
  {
    id: "CLQ_FPA_005",
    name: "반전시민연합",
    founder: "CH_000373", // 제임스 손다이크
    leader: "CH_000373",
    tender: {
      econ: 100,   // 자본주의
      idea: 100,   // 자유민주공화국
      friend: 148,
    },
    members: ["CH_000373"],
    level: 1,
    exp: 0,
  },


  // ── 국민평의회의 (동맹) ──────────────────────────────────────
  // 레이몬도 토리아티가 소속된 친전파 정당. 테르누젠 보궐선거에서
  // 반전시민연합 후보(제임스 손다이크 → 제시카 에드워즈)와 맞섰다.
  // 트류니히트 본인의 소속 정당은 공개된 바 없어, 트류니히트 파벌(클리크)과는 별개로 관리.
  {
    id: "CLQ_FPA_006",
    name: "국민평의회의",
    founder: "CH_000080", // 레이몬도 토리아티
    leader: "CH_000080",
    tender: {
      econ: 100,   // 자본주의
      idea: 100,   // 자유민주공화국
      friend: 215,
    },
    members: ["CH_000080"],
    level: 1,
    exp: 0,
  },


  // ── 지구교 (EAT) ─────────────────────────────────────────────
  // 명목상 리더는 가짜 총대주교(CH_000004)이나, 실권은 부주교 드 빌리에(CH_000051)가
  // 전적으로 행사한다. founder는 원 총대주교(CH_000384, 이미 사망)로 기록 — 역사적 창설자 불변 규칙에 따름.
  // 제국/동맹 양국 내부에 깊이 침투해 있는 비밀결사 성격의 클리크.
  {
    id: "CLQ_EAT_001",
    name: "지구교",
    founder: "CH_000384", // 지구교 총대주교(원, 사망)
    leader: "CH_000004",  // 가짜 총대주교(명목상 리더)
    tender: {
      econ: 160,   // 통제경제
      idea: 300,   // 신정정치(테라이즘)
      friend: 10,
    },
    members: ["CH_000004"],
    level: 1,
    exp: 0,
  },

]

export const CLIQUE_MAP = Object.fromEntries(
  CLIQUE_DATA.map((c) => [c.id, c])
)

// ── 가입 가능 여부 판정 유틸 ───────────────────────────────────
// candidate: { idea, econ, friend } 형태 (charactersData.js 값을 숫자로 변환해 전달)
// 반환: true(가입 가능) / false(거부 — 혐오 상태)
export function canJoinClique(clique, candidate) {
  const t = clique.tender
  if (Math.abs(t.econ - candidate.econ) >= 100) return false
  if (Math.abs(t.idea - candidate.idea) >= 100) return false
  if (Math.abs(t.friend - candidate.friend) >= 100) return false
  return true
}
