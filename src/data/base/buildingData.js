// ================================================================
//  buildingData.js — 건물 마스터 (불변)
//  경로: src/data/base/buildingData.js
//  작성: 2026-06-24 / 전면 개편: 2026-06-25
//
//  행성에 건설 가능한 건물 목록. planetsData.js의 구 type/fortress 필드를
//  대체하는 체계 중 "시설물" 쪽을 담당한다(정체성/성향 쪽은
//  trait/stars/starTraitData.js가 담당 — 예: MAIN_PLANET).
//
//  ⚠️ 2026-06-25 개편 내역:
//    1) name/desc 다국어 배열화. nameKr/nameEn/nameJp(분리 필드) →
//       name: [{ code:"Kr", context }, { code:"En", context }, { code:"Jp", context }]
//       (desc도 동일 구조). 이번 작업에서는 한국어(Kr)만 실제로 채우고
//       En/Jp는 context:"" 상태로 자리만 만들어둠. (planetsData.js의 name/desc와
//       동일 패턴 — 통일성 유지)
//    2) reqPop 신규 추가. 이 건물 1개가 가동되기 위해 필요한 인구(직업별).
//       planetPopsJob.js의 code를 참조하며, { code, unit } 형태로 여러 직업이
//       섞일 수 있음(예: 조병창은 조병공+노동자 둘 다 필요할 수 있음).
//       건물 1개당 필요량이며, 행성의 buildings.details에 등록된 개수(count)만큼
//       곱해서 pops.jobs 필요량을 산출한다.
//    3) buildRequire 신규 추가. 건설 선행조건(예: 특정 faction만 건설 가능,
//       최소 인구 등). 이번 작업에서는 전부 빈 객체({})로 비워두고 보류.
//    4) 경제(economic)/행정(administrative)/연구(research) 계열 건물을 5단계로
//       확장. 농업시설을 기준 샘플로 먼저 설계했던 것을 광산/공업/상업/행정/연구
//       5개 계열 전체에 동일하게 적용함. 단계가 오를수록:
//         - buildCost 증가 (약 2.5배수)
//         - buildTime 증가
//         - maxCount 감소 (자동화·고급화로 희소해짐)
//         - reqPop은 감소(자동화로 인력 절감), effects는 강화
//       군사(military) 계열(요새/조병창/조선소)은 이번 개편에서 단일 등급으로
//       유지하되, 추후 같은 단계 확장 규칙을 적용할 수 있도록 id에 _001
//       시퀀스를 미리 붙여둠(예: FORTRESS_001).
//    5) 고유 시설(buildable:false, 원작에 이미 존재하는 특정 건물)은 id에
//       시퀀스를 붙이지 않음(단일 존재이므로). 이번 작업에서 지구교 비밀 지부
//       (EAT_BASE)는 "여러 행성에 설치 가능한 비고유 시설"로 재분류하여
//       시퀀스(_001)를 부여하고, 큄멜 저택(QUEMMEL_RESIDENCE)은 "단일 고유
//       시설"로 유지함.
//
//  id 명명 규칙:
//    일반(단계형): {분류}_{seq 3자리}   예) FARM_001, MINE_003, FORTRESS_001
//    고유(단일):   {고유명}             예) ISERLOHN_FORTRESS, QUEMMEL_RESIDENCE
//
//  category:
//    military       — 군사 시설 (요새, 조병창, 조선소, 비노출 첩보시설)
//    economic       — 경제 시설 (농업, 광업, 공업, 상업)
//    administrative — 행정 시설 (통치 효율)
//    research       — 연구 시설 (기술 개발)
//
//  effects 키: starTraitData.js와 동일 체계 사용
//    population, industry, defense, morale, tax (수치 보정, 절대값)
//    food           식량 생산량 (FARM 계열)
//    incomeBonus    수입 보정 (배율, 예: 0.1 = +10%, -1.0 = 전면 중단)
//    buildSpeed     건설 속도 보정 (다른 건물에 대한, 턴)
//
//  reqPop:  [{ code(planetPopsJob.js 참조), unit }] — 건물 1개당 필요 인구(직업별)
//  product: 이 건물이 "생산"하는 자원 태그 배열. effects의 키 중 실제 생산물에
//           해당하는 것만 포함(food/industry/mil_supply 등). defense/morale/
//           incomeBonus/buildSpeed처럼 보정·방어 성격의 effects는 생산이 아니므로
//           product에서 제외하고 빈 배열로 둠. 행성 트레잇의 비율 보정(예: "식량
//           생산률 +5%")을 적용할 때, product에 해당 자원이 포함된 건물만 골라
//           정확히 타겟팅하기 위해 사용. (2026-06-25 신규 추가)
//  buildRequire: 건설 선행조건 (현재 전부 빈 객체, 보류)
//  buildCost: 건설 비용 (assets.credit 소비량)
//  buildTime: 건설 기간 (턴)
//  maxCount:  같은 행성에 동시 보유 가능한 최대 개수
//  buildable: true  → 플레이어가 credit을 소모해 신규 건설 가능한 일반 건물
//             false → 건설 불가능한 고유 시설. 원작에 이미 존재하는 특정 행성에만
//                      등록되며, 새로 지을 수 없음. (예: 이제르론 요새, 큄멜 저택)
//                      파괴 시 복구 불가 또는 별도 메커니즘(탈취 등)으로만 소유권 이전.
//  slotCost: 이 건물 1개가 planetsData.js의 buildings.maxSize(건설 슬롯 총량) 중
//            차지하는 슬롯 수. 일반 건물은 1. 비노출 시설은 0(슬롯 미점유).
//  hidden:   true → 플레이어/적국 양쪽에 비노출되는 은밀 시설. false → 일반 공개 시설.
//
//  ⚠️ TODO: buildCost/buildTime/maxCount/effects 수치는 전부 1차 설계치(임시값).
//    credit 시스템이 본격적으로 가동되기 전까지는 자리만 채운 상태이며, 추후
//    경제 밸런스 조정 단계에서 재산정 필요.
// ================================================================

/**
 * @typedef {Object} BuildingNameDescEntry
 * @property {"Kr"|"En"|"Jp"} code
 * @property {string} context
 */
/**
 * @typedef {Object} BuildingReqPopEntry
 * @property {string} code - planetPopsJob.js 참조 코드
 * @property {number} unit - 건물 1개당 필요 인구(unit)
 */
/**
 * @typedef {Object} Building
 * @property {string} id
 * @property {BuildingNameDescEntry[]} name
 * @property {string} category - military|economic|administrative|research
 * @property {string[]} product - 생산 자원 태그 (food/industry/mil_supply 등, 보정성 effects는 제외)
 * @property {BuildingNameDescEntry[]} desc
 * @property {Object} effects
 * @property {BuildingReqPopEntry[]} reqPop
 * @property {Object} buildRequire - 현재 항상 빈 객체(보류)
 * @property {number|null} buildCost
 * @property {number|null} buildTime
 * @property {number} maxCount
 * @property {boolean} buildable
 * @property {number} slotCost
 * @property {boolean} hidden
 */

function nm(kr) {
  return [
    { code: "Kr", context: kr },
    { code: "En", context: "" },
    { code: "Jp", context: "" },
  ];
}

export const BUILDINGS = [
  // ════════════════════════════════════════════════════════════
  //  경제(economic) — 농업 6단계 (0~5단계)
  //  FOOD 생산지.
  //  매 턴 pops.unit 1당 food 1 생산 및 소모
  //  남는 food는 1당 해당 행성의 credit +1, 5당 1의 pops.unit +1
  //  부족 food는 1당 해당 행성의 credit -5, credit이 부족할 경우 5당 1의 pops.unit -1
  //
  //  ⚠️ 2026-06-25 재구성: maxSize(슬롯 총량)를 pops.unit 비례로 재계산하면서,
  //    슬롯 1개당 흡수 가능한 인구(reqPop)를 등급 간 격차가 크게 나도록 재설계함.
  //    낮은 등급은 많은 인구를 먹는 대신 슬롯이 적어도 인구를 빠르게 수용할 수 있고,
  //    높은 등급은 적은 인구로 같은 슬롯에서 훨씬 큰 효율(food)을 낸다.
  //    0단계(화전)는 slotCost:0인 예외 — 행성 개발 극초기에 슬롯 제약 없이
  //    인구를 우선 식량 생산에 돌릴 수 있도록 하기 위함(개발 전 단계의 임시방편).
  // ════════════════════════════════════════════════════════════
  {
    id: "FARM_000",
    name: [{ code: "Kr", context: "화전 농경지" }],
    category: "economic",
    product: ["food"],
    desc: [
      {
        code: "Kr",
        context: `가장 원시적인 식량 생산 방식. 맨땅에 불을 놓아 경작하는 화전 농법으로, 
        자급자족이 가능한 정도의 식량만 생산 가능하다.`,
      },
    ],
    effects: { food: 50 },
    reqPop: [{ code: "FARMER", unit: 50 }],
    buildRequire: {},
    buildCost: 0,
    buildTime: 1,
    maxCount: 500,
    buildable: true,
    slotCost: 0,
    hidden: false,
  },
  {
    id: "FARM_001",
    name: nm("관개 농경지"),
    category: "economic",
    product: ["food"],
    desc: nm(
      "수로를 통해 물을 끌어와 경작하는 농업시설. 화전 방식보다 안정적인 생산량을 보인다."
    ),
    effects: { food: 150 },
    reqPop: [{ code: "FARMER", unit: 30 }],
    buildRequire: {},
    buildCost: 300,
    buildTime: 2,
    maxCount: 80,
    buildable: true,
    slotCost: 1,
    hidden: false,
  },
  {
    id: "FARM_002",
    name: nm("재래식 농업시설"),
    category: "economic",
    product: ["food"],
    desc: nm(
      "인류가 지구에 있을 무렵, 중-근대 시대에 사용했던 농기구를 활용한 전통적 농업 방식."
    ),
    effects: { food: 200 },
    reqPop: [{ code: "FARMER", unit: 15 }],
    buildRequire: {},
    buildCost: 700,
    buildTime: 4,
    maxCount: 60,
    buildable: true,
    slotCost: 1,
    hidden: false,
  },
  {
    id: "FARM_003",
    name: nm("기계화 농업시설"),
    category: "economic",
    product: ["food"],
    desc: nm(
      "농기계를 도입한 현대적 농업시설. 재래식 대비 훨씬 적은 인력으로 많은 식량을 생산한다."
    ),
    effects: { food: 500 },
    reqPop: [{ code: "FARMER", unit: 5 }],
    buildRequire: {},
    buildCost: 1500,
    buildTime: 7,
    maxCount: 40,
    buildable: true,
    slotCost: 1,
    hidden: false,
  },
  {
    id: "FARM_004",
    name: nm("생명공학 농장"),
    category: "economic",
    product: ["food"],
    desc: nm(
      "유전자 조작 작물과 수경재배 기술을 적용한 농장. 환경 제약 없이 대량 생산이 가능하다."
    ),
    effects: { food: 500 },
    reqPop: [{ code: "FARMER", unit: 2 }],
    buildRequire: {},
    buildCost: 3500,
    buildTime: 12,
    maxCount: 15,
    buildable: true,
    slotCost: 1,
    hidden: false,
  },
  {
    id: "FARM_005",
    name: nm("완전자동화 농장"),
    category: "economic",
    product: ["food"],
    desc: nm(
      "로봇과 AI로 전 공정이 자동화된 최첨단 농장. 최소한의 관리 인력만으로 막대한 식량을 생산한다."
    ),
    effects: { food: 1000 },
    reqPop: [{ code: "FARMER", unit: 1 }],
    buildRequire: {},
    buildCost: 9000,
    buildTime: 18,
    maxCount: 5,
    buildable: true,
    slotCost: 1,
    hidden: false,
  },

  // ════════════════════════════════════════════════════════════
  //  경제(economic) — 광산 5단계
  // ════════════════════════════════════════════════════════════
  {
    id: "MINE_001",
    name: nm("노천 채굴장"),
    category: "economic",
    product: ["industry"],
    desc: nm("지표면을 직접 파헤쳐 광물을 채취하는 원시적인 채굴 시설."),
    effects: { industry: 8 },
    reqPop: [{ code: "MINER", unit: 2 }],
    buildRequire: {},
    buildCost: 400,
    buildTime: 2,
    maxCount: 60,
    buildable: true,
    slotCost: 1,
    hidden: false,
  },
  {
    id: "MINE_002",
    name: nm("수직 광산"),
    category: "economic",
    product: ["industry"],
    desc: nm(
      "지하 깊은 곳까지 갱도를 뚫어 채굴하는 광산. 노천 채굴보다 채굴량이 많다."
    ),
    effects: { industry: 20 },
    reqPop: [{ code: "MINER", unit: 2 }],
    buildRequire: {},
    buildCost: 1000,
    buildTime: 4,
    maxCount: 45,
    buildable: true,
    slotCost: 1,
    hidden: false,
  },
  {
    id: "MINE_003",
    name: nm("기계화 광산"),
    category: "economic",
    product: ["industry"],
    desc: nm(
      "중장비와 채굴 로봇을 도입한 광산. 적은 인력으로 훨씬 많은 자원을 채취한다."
    ),
    effects: { industry: 50, incomeBonus: 0.05 },
    reqPop: [{ code: "MINER", unit: 1 }],
    buildRequire: {},
    buildCost: 2500,
    buildTime: 8,
    maxCount: 25,
    buildable: true,
    slotCost: 1,
    hidden: false,
  },
  {
    id: "MINE_004",
    name: nm("심부 자원 채굴단지"),
    category: "economic",
    product: ["industry"],
    desc: nm("행성 핵 인근의 고밀도 자원층까지 도달하는 대규모 채굴단지."),
    effects: { industry: 110, incomeBonus: 0.1 },
    reqPop: [{ code: "MINER", unit: 1 }],
    buildRequire: {},
    buildCost: 6000,
    buildTime: 13,
    maxCount: 10,
    buildable: true,
    slotCost: 1,
    hidden: false,
  },
  {
    id: "MINE_005",
    name: nm("전자동 채굴 콤플렉스"),
    category: "economic",
    product: ["industry"],
    desc: nm(
      "드릴 로봇과 자동 운반 시스템으로 무인 운영되는 최첨단 채굴 단지."
    ),
    effects: { industry: 220, incomeBonus: 0.15 },
    reqPop: [{ code: "MINER", unit: 1 }],
    buildRequire: {},
    buildCost: 15000,
    buildTime: 19,
    maxCount: 3,
    buildable: true,
    slotCost: 1,
    hidden: false,
  },

  // ════════════════════════════════════════════════════════════
  //  경제(economic) — 공업단지 5단계
  // ════════════════════════════════════════════════════════════
  {
    id: "FACTORY_001",
    name: nm("수공업 작업장"),
    category: "economic",
    product: ["industry"],
    desc: nm("장인들이 손으로 물건을 만드는 소규모 작업장."),
    effects: { industry: 10 },
    reqPop: [{ code: "WORKER", unit: 2 }],
    buildRequire: {},
    buildCost: 500,
    buildTime: 2,
    maxCount: 60,
    buildable: true,
    slotCost: 1,
    hidden: false,
  },
  {
    id: "FACTORY_002",
    name: nm("경공업 공장"),
    category: "economic",
    product: ["industry"],
    desc: nm("증기·전력 기관을 도입한 초기 산업화 단계의 공장."),
    effects: { industry: 25 },
    reqPop: [{ code: "WORKER", unit: 2 }],
    buildRequire: {},
    buildCost: 1300,
    buildTime: 5,
    maxCount: 45,
    buildable: true,
    slotCost: 1,
    hidden: false,
  },
  {
    id: "FACTORY_003",
    name: nm("자동화 공업단지"),
    category: "economic",
    product: ["industry"],
    desc: nm("컨베이어 벨트와 자동화 설비를 갖춘 현대적 공업단지."),
    effects: { industry: 55, incomeBonus: 0.1 },
    reqPop: [{ code: "WORKER", unit: 1 }],
    buildRequire: {},
    buildCost: 3200,
    buildTime: 9,
    maxCount: 25,
    buildable: true,
    slotCost: 1,
    hidden: false,
  },
  {
    id: "FACTORY_004",
    name: nm("로봇 생산 콤플렉스"),
    category: "economic",
    product: ["industry"],
    desc: nm("산업용 로봇이 주력 노동력인 대규모 생산 콤플렉스."),
    effects: { industry: 120, incomeBonus: 0.15 },
    reqPop: [{ code: "WORKER", unit: 1 }],
    buildRequire: {},
    buildCost: 7800,
    buildTime: 14,
    maxCount: 10,
    buildable: true,
    slotCost: 1,
    hidden: false,
  },
  {
    id: "FACTORY_005",
    name: nm("초정밀 무인 생산단지"),
    category: "economic",
    product: ["industry"],
    desc: nm("나노 단위 정밀 제조까지 가능한 완전 무인 생산단지."),
    effects: { industry: 240, incomeBonus: 0.2 },
    reqPop: [{ code: "WORKER", unit: 1 }],
    buildRequire: {},
    buildCost: 19000,
    buildTime: 20,
    maxCount: 3,
    buildable: true,
    slotCost: 1,
    hidden: false,
  },

  // ════════════════════════════════════════════════════════════
  //  경제(economic) — 상업지구 5단계
  // ════════════════════════════════════════════════════════════
  {
    id: "COMMERCIAL_001",
    name: nm("시장 거리"),
    category: "economic",
    product: [],
    desc: nm("상인들이 좌판을 펴고 물건을 파는 소박한 시장 거리."),
    effects: { incomeBonus: 0.02 },
    reqPop: [{ code: "MERCHANT", unit: 2 }],
    buildRequire: {},
    buildCost: 600,
    buildTime: 2,
    maxCount: 99,
    buildable: true,
    slotCost: 1,
    hidden: false,
  },
  {
    id: "COMMERCIAL_002",
    name: nm("상점가"),
    category: "economic",
    product: [],
    desc: nm("상설 점포들이 줄지어 늘어선 상업 구역."),
    effects: { incomeBonus: 0.04 },
    reqPop: [{ code: "MERCHANT", unit: 2 }],
    buildRequire: {},
    buildCost: 1500,
    buildTime: 4,
    maxCount: 80,
    buildable: true,
    slotCost: 1,
    hidden: false,
  },
  {
    id: "COMMERCIAL_003",
    name: nm("상업지구"),
    category: "economic",
    product: [],
    desc: nm(
      "무역과 상업 활동이 본격적으로 이루어지는 구역. 페잔처럼 무역 중심지인 행성에 다수 건설된다."
    ),
    effects: { incomeBonus: 0.08 },
    reqPop: [{ code: "MERCHANT", unit: 1 }],
    buildRequire: {},
    buildCost: 3700,
    buildTime: 8,
    maxCount: 45,
    buildable: true,
    slotCost: 1,
    hidden: false,
  },
  {
    id: "COMMERCIAL_004",
    name: nm("금융 중심지"),
    category: "economic",
    product: [],
    desc: nm("은행과 거대 상사들이 집결한 금융 중심지. 막대한 자본이 오간다."),
    effects: { incomeBonus: 0.14 },
    reqPop: [{ code: "MERCHANT", unit: 1 }],
    buildRequire: {},
    buildCost: 9000,
    buildTime: 13,
    maxCount: 15,
    buildable: true,
    slotCost: 1,
    hidden: false,
  },
  {
    id: "COMMERCIAL_005",
    name: nm("은하 무역 허브"),
    category: "economic",
    product: [],
    desc: nm("은하 전역의 물류와 자본이 집중되는 초거대 무역 허브."),
    effects: { incomeBonus: 0.22 },
    reqPop: [{ code: "MERCHANT", unit: 1 }],
    buildRequire: {},
    buildCost: 22000,
    buildTime: 20,
    maxCount: 5,
    buildable: true,
    slotCost: 1,
    hidden: false,
  },

  // ════════════════════════════════════════════════════════════
  //  행정(administrative) — 5단계
  // ════════════════════════════════════════════════════════════
  {
    id: "ADMIN_001",
    name: nm("촌장 관사"),
    category: "administrative",
    product: [],
    desc: nm("마을 단위의 소박한 행정 시설."),
    effects: { morale: 1 },
    reqPop: [{ code: "ADMINISTRATOR", unit: 2 }],
    buildRequire: {},
    buildCost: 400,
    buildTime: 2,
    maxCount: 1,
    buildable: true,
    slotCost: 1,
    hidden: false,
  },
  {
    id: "ADMIN_002",
    name: nm("지방 행정청"),
    category: "administrative",
    product: [],
    desc: nm("지역 단위의 행정 업무를 처리하는 관청."),
    effects: { morale: 2 },
    reqPop: [{ code: "ADMINISTRATOR", unit: 2 }],
    buildRequire: {},
    buildCost: 1100,
    buildTime: 4,
    maxCount: 1,
    buildable: true,
    slotCost: 1,
    hidden: false,
  },
  {
    id: "ADMIN_003",
    name: nm("행정중심"),
    category: "administrative",
    product: [],
    desc: nm(
      "행성 통치 효율을 높이는 본격적인 행정 시설. 부패도 누적을 억제하는 효과가 있다."
    ),
    effects: { morale: 4 },
    reqPop: [{ code: "ADMINISTRATOR", unit: 1 }],
    buildRequire: {},
    buildCost: 2800,
    buildTime: 8,
    maxCount: 1,
    buildable: true,
    slotCost: 1,
    hidden: false,
  },
  {
    id: "ADMIN_004",
    name: nm("총독부"),
    category: "administrative",
    product: [],
    desc: nm("행성 전체를 총괄하는 고위 행정 기관."),
    effects: { morale: 7 },
    reqPop: [{ code: "ADMINISTRATOR", unit: 1 }],
    buildRequire: {},
    buildCost: 6500,
    buildTime: 13,
    maxCount: 1,
    buildable: true,
    slotCost: 1,
    hidden: false,
  },
  {
    id: "ADMIN_005",
    name: nm("중앙 통치기구"),
    category: "administrative",
    product: [],
    desc: nm("국가 차원의 통치 기능까지 일부 수행하는 최고위 행정 기구."),
    effects: { morale: 12 },
    reqPop: [{ code: "ADMINISTRATOR", unit: 1 }],
    buildRequire: {},
    buildCost: 16000,
    buildTime: 19,
    maxCount: 1,
    buildable: true,
    slotCost: 1,
    hidden: false,
  },

  // ════════════════════════════════════════════════════════════
  //  연구(research) — 5단계
  // ════════════════════════════════════════════════════════════
  {
    id: "RESEARCH_001",
    name: nm("서당"),
    category: "research",
    product: [],
    desc: nm(
      "기초적인 학문을 가르치고 연구하는 소규모 시설. TODO: 연구 시스템 자체가 아직 미설계."
    ),
    effects: {},
    reqPop: [{ code: "RESEARCHER", unit: 2 }],
    buildRequire: {},
    buildCost: 500,
    buildTime: 2,
    maxCount: 1,
    buildable: true,
    slotCost: 1,
    hidden: false,
  },
  {
    id: "RESEARCH_002",
    name: nm("학당"),
    category: "research",
    product: [],
    desc: nm("체계적인 교육과 연구를 수행하는 중규모 학술 시설."),
    effects: {},
    reqPop: [{ code: "RESEARCHER", unit: 2 }],
    buildRequire: {},
    buildCost: 1400,
    buildTime: 5,
    maxCount: 1,
    buildable: true,
    slotCost: 1,
    hidden: false,
  },
  {
    id: "RESEARCH_003",
    name: nm("연구소"),
    category: "research",
    product: [],
    desc: nm("기술 개발을 수행하는 본격적인 연구 시설."),
    effects: {},
    reqPop: [{ code: "RESEARCHER", unit: 1 }],
    buildRequire: {},
    buildCost: 3600,
    buildTime: 9,
    maxCount: 1,
    buildable: true,
    slotCost: 1,
    hidden: false,
  },
  {
    id: "RESEARCH_004",
    name: nm("국립 연구원"),
    category: "research",
    product: [],
    desc: nm("국가 차원에서 지원하는 대규모 연구원."),
    effects: {},
    reqPop: [{ code: "RESEARCHER", unit: 1 }],
    buildRequire: {},
    buildCost: 8800,
    buildTime: 14,
    maxCount: 1,
    buildable: true,
    slotCost: 1,
    hidden: false,
  },
  {
    id: "RESEARCH_005",
    name: nm("첨단 과학 연구단지"),
    category: "research",
    product: [],
    desc: nm("은하 최고 수준의 인력과 설비가 집결한 첨단 연구단지."),
    effects: {},
    reqPop: [{ code: "RESEARCHER", unit: 1 }],
    buildRequire: {},
    buildCost: 21000,
    buildTime: 20,
    maxCount: 1,
    buildable: true,
    slotCost: 1,
    hidden: false,
  },

  // ════════════════════════════════════════════════════════════
  //  군사(military) — 단일 등급 (추후 단계 확장 가능하도록 seq만 부여)
  // ════════════════════════════════════════════════════════════
  {
    id: "FORTRESS_001",
    name: nm("요새"),
    category: "military",
    product: [],
    desc: nm(
      "행성 궤도에 건설하는 대규모 군사 요새. 방어력이 크게 상승하나 민간 경제활동이 제한된다."
    ),
    effects: { defense: 80, incomeBonus: -1.0 },
    reqPop: [{ code: "GARRISON", unit: 5 }],
    buildRequire: {},
    buildCost: 50000,
    buildTime: 12,
    maxCount: 1,
    buildable: true,
    slotCost: 1,
    hidden: false,
  },
  {
    id: "ARSENAL_001",
    name: nm("조병창"),
    category: "military",
    product: ["industry"],
    desc: nm(
      "함선 무장과 군수물자를 생산하는 시설. 주둔 함대의 보급 효율을 높인다."
    ),
    effects: { defense: 15, industry: 20 },
    reqPop: [
      { code: "ARMORER", unit: 3 },
      { code: "WORKER", unit: 2 },
    ],
    buildRequire: {},
    buildCost: 20000,
    buildTime: 8,
    maxCount: 1,
    buildable: true,
    slotCost: 1,
    hidden: false,
  },
  {
    id: "SHIPYARD_001",
    name: nm("조선소"),
    category: "military",
    product: ["industry"],
    desc: nm(
      "함선을 건조하는 시설. 보유 시 해당 행성에서 신규 함선 건조가 가능해진다."
    ),
    effects: { industry: 30, buildSpeed: -1 },
    reqPop: [{ code: "WORKER", unit: 4 }],
    buildRequire: {},
    buildCost: 30000,
    buildTime: 10,
    maxCount: 1,
    buildable: true,
    slotCost: 1,
    hidden: false,
  },

  // ════════════════════════════════════════════════════════════
  //  군사(military) — 비노출, 비고유 (여러 행성에 설치 가능, seq 부여)
  // ════════════════════════════════════════════════════════════
  {
    id: "EAT_BASE_001",
    name: nm("지구교 비밀 지부"),
    category: "military", // TODO: 카테고리 적합성 재검토 필요(첩보/종교 성격 혼재)
    product: [],
    desc: nm(
      "지구교가 행성 내에 은밀히 설치한 비밀 거점. 비노출 시설로 건설 슬롯을 소모하지 않는다.\n      효과: 5턴마다 행성 pops의 1unit이 15%(*2) 확률로 idea=300(신정정치/테라이즘)으로 변환된다."
    ),
    effects: {}, // TODO: 정형화된 effects 키로 표현하기 어려운 확률적/주기적 효과. 별도 이벤트 로직으로 구현 필요.
    reqPop: [],
    buildRequire: {},
    buildCost: null, // TODO: 지구교 측 자금으로 건설되는 것으로 추정, 플레이어 건설 대상 아님
    buildTime: null,
    maxCount: 1,
    buildable: false, // 일반 플레이어가 건설할 수 없음. 지구교 세력의 별도 메커니즘으로 설치
    slotCost: 0,
    hidden: true,
  },

  // ════════════════════════════════════════════════════════════
  //  특수(고유, 건설 불가능, 원작에 이미 존재하는 단일 시설 — seq 없음)
  // ════════════════════════════════════════════════════════════
  {
    id: "ISERLOHN_FORTRESS",
    name: nm("이제르론 요새"),
    category: "military",
    product: [],
    desc: nm(
      "이제르론 회랑에 위치한 난공불락의 인공 요새. 직경 60km, 요새주포 '뇌신의 망치(トゥール・ハンマー)' 보유."
    ),
    effects: { defense: 999, incomeBonus: -1.0 },
    reqPop: [],
    buildRequire: {},
    buildCost: null,
    buildTime: null,
    maxCount: 1,
    buildable: false,
    slotCost: 1,
    hidden: false,
  },
  {
    id: "GAIESBURG_FORTRESS",
    name: nm("가이에스부르크 요새"),
    category: "military",
    product: [],
    desc: nm(
      "은하제국의 군사 거점으로 건설된 인공 요새. 직경 45km. 리프슈타트 전역 당시 이동 요새로 개조되어 이제르론 공략에 투입되었다."
    ),
    effects: { defense: 900, incomeBonus: -1.0 },
    reqPop: [],
    buildRequire: {},
    buildCost: null,
    buildTime: null,
    maxCount: 1,
    buildable: false,
    slotCost: 1,
    hidden: false,
  },
  {
    id: "GARMISCH_FORTRESS",
    name: nm("가르미슈 요새"),
    category: "military",
    product: [],
    desc: nm(
      "제국 영내의 군사 거점. 구형 인공천체. 리프슈타트 전역 당시 문벌귀족연합의 거점 중 하나였다."
    ),
    effects: { defense: 400, incomeBonus: -1.0 },
    reqPop: [],
    buildRequire: {},
    buildCost: null,
    buildTime: null,
    maxCount: 1,
    buildable: false,
    slotCost: 1,
    hidden: false,
  },
  {
    id: "RENTENBERG_FORTRESS",
    name: nm("렌텐베르크 요새"),
    category: "military",
    product: [],
    desc: nm(
      "제국 영내의 군사 거점. 소행성을 깎아 만든 시설로, 표준적인 요새 규모를 갖춘다. 요새주포 없음(작중 설정 반영)."
    ),
    effects: { defense: 400, incomeBonus: -1.0 },
    reqPop: [],
    buildRequire: {},
    buildCost: null,
    buildTime: null,
    maxCount: 1,
    buildable: false,
    slotCost: 1,
    hidden: false,
  },
  {
    id: "QUEMMEL_RESIDENCE",
    name: nm("큄멜 저택"),
    category: "military", // TODO: 카테고리 적합성 재검토 필요
    product: [],
    desc: nm(
      "지구교 관련 인물의 저택으로 위장된 비밀시설. 비노출, 건설 슬롯 미점유.\n      효과: 같은 행성의 EAT_BASE 주기를 5턴에서 3턴으로 단축시킨다."
    ),
    effects: {}, // TODO: EAT_BASE와 연동되는 효과. 별도 로직으로 구현 필요.
    reqPop: [],
    buildRequire: {},
    buildCost: null,
    buildTime: null,
    maxCount: 1,
    buildable: false,
    slotCost: 0,
    hidden: true,
  },
];

export const BUILDING_MAP = Object.fromEntries(BUILDINGS.map((b) => [b.id, b]));

export const BUILDING_BY_CATEGORY = BUILDINGS.reduce((acc, b) => {
  (acc[b.category] ??= []).push(b);
  return acc;
}, {});
