// ================================================================
//  planetsData.js — 행성 마스터 데이터
//  경로: src/data/base/stars/planetsData.js
//  작성: 2026-06-25 (스키마 2차 개편 — governor/commander/jobs/buildings 구조 변경,
//        name/desc 다국어 배열화)
//
/**
 * @typedef {Object} PlanetPopsEntry
 * @property {number|string} code - economyData.js/ideologyData.js 코드(number) 또는 cliqueData.js id(string)
 * @property {number} unit - 해당 코드에 속하는 인구 단위(1unit=10만명)
 */
/**
 * @typedef {Object} PlanetBuildingDetail
 * @property {string}  b_id      - buildingData.js 참조 코드
 * @property {number}  count     - 보유 개수
 * @property {boolean} active    - 가동 중 여부 (false=자금부족 또는 수동정지)
 * @property {number}  construct - 이미 진행된 건설 턴수 (0=완성)
 */
/**
 * @typedef {Object} PlanetBuildings
 * @property {number} maxSize - 건설 가능 슬롯 총량 (구 행성 직속 size)
 * @property {number} [size]  - ⚠️ computed 전용. details의 count 합계. 데이터에 직접 넣지 말 것.
 * @property {PlanetBuildingDetail[]} details
 */
/**
 * @typedef {Object} PlanetPops
 * @property {number} unit - 행성 총 인구 (1unit=10만명)
 * @property {PlanetPopsEntry[]} econ   - economyData.js 코드 기준 분포
 * @property {PlanetPopsEntry[]} idea   - ideologyData.js 코드 기준 분포
 * @property {PlanetPopsEntry[]} clique - cliqueData.js id 기준 분포
 * @property {PlanetPopsEntry[]} jobs   - planetPopsJob.js code 기준 분포.
 *   buildings.details의 count와 1:1 연동. (unit - jobs합계 = 가용/미배치 인구)
 */
/**
 * @typedef {Object} PlanetAssets
 * @property {number} credit     - 행성 자체 금고 (구 treasury)
 * @property {number} tax        - TODO: 용도 확정 필요
 * @property {number} complain   - 구 vice/corruption(부패도)
 * @property {number} mil_supply - 군사 보급품 (조병창 생산, 함대 유지보수 소모)
 *
 * TODO: assets.ships — 행성 보유 함선 목록 (봉건 영주 보유분 / REH 전용)
 *   구조: Array<{ shipCode: string, amt: number, status: string, fleetId?: string, dest?: string, turnsLeft?: number }>
 *   status 값:
 *     'pool'         — 미편성 가용 함선 (fleet_form 의안으로 차감)
 *     'assigned'     — 특정 함대에 배속 중 (fleetId 필수)
 *     'transit'      — 이동 중 또는 함대 해산 후 귀환 중 (dest, turnsLeft 필수)
 *     'repairing'    — 수리 중 (turnsLeft 필수)
 *     'constructing' — 건조 중 (turnsLeft 필수)
 *   fleet_form 승인 시: status:'pool' 항목 차감 → 새 함대 shipList 생성
 *   fleet_disband 승인 시: assigned → transit(dest=원래 행성, turnsLeft=N) → 귀환 후 pool 복귀
 */
/**
 * @typedef {Object} PlanetNameDescEntry
 * @property {"Kr"|"En"|"Jp"} code
 * @property {string} context
 */
/**
 * @typedef {Object} Planet
 * @property {string} code
 * @property {string} starCode
 * @property {PlanetNameDescEntry[]} name
 * @property {{x:number, y:number}} pos
 * @property {string} planetType - terrestrial|gas|ocean|desert|ice|volcanic|artificial
 * @property {string} faction
 * @property {string} governor  - 내정 담당관 캐릭터 코드(charactersData.js 참조)
 * @property {string} commander - 군사 담당관 캐릭터 코드(charactersData.js 참조)
 * @property {PlanetPops} pops
 * @property {PlanetAssets} assets
 * @property {PlanetBuildings} buildings
 * @property {string[]} traits - starTraitData.js 코드 배열
 * @property {PlanetNameDescEntry[]} desc
 * @property {number} [support] - ⚠️ computed 전용. pops.econ/idea/clique 중 faction
 *   지향 코드와 일치하는 비율을 매 턴 계산. 데이터에 직접 추가하지 말 것.
 */
// ================================================================
// 본문의 TODO 부분은 참조 후 삭제, 그 외의 주석은 참조용 문구이니 삭제금지
// ================================================================
export const PLANETS = [
  {
    code: "230001P01",
    starCode: "230001",
    name: [{ code: "Kr", context: "바텐・도라흐" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 2100,
      econ: [{ code: 60, unit: 1638 }],
      idea: [{ code: 240, unit: 1638 }],
      clique: [
        { code: "CLQ_REH_003", unit: 925 },
        { code: "CLQ_REH_001", unit: 566 },
        { code: "CLQ_REH_002", unit: 122 },
        { code: "CLQ_REH_004", unit: 25 },
      ],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 2000 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 400,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 840,
      details: [{ b_id: "FARM_000", count: 400, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: ["MARQUISATE"],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },
  {
    code: "230001P02",
    starCode: "230001",
    name: [{ code: "Kr", context: "뮤렌" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 700, y: 200 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 800,
      econ: [{ code: 60, unit: 787 }],
      idea: [{ code: 240, unit: 642 }],
      clique: [
        { code: "CLQ_REH_003", unit: 541 },
        { code: "CLQ_REH_001", unit: 173 },
      ],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 760 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 100,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 320,
      details: [{ b_id: "FARM_000", count: 152, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: ["MARQUISATE"],
    /** @설명 */
    desc: [
      {
        code: "Kr",
        context:
          "조산활동과 대륙이동이 활발한 알멘트푸벨의 제 2행성.\n    최근 행성이 어느 정도 안정되기 시작하며 탐험가들이 개척을 시도하고 있다.",
      },
    ],
  },

  // ── 230002_Geiersburg ──
  {
    code: "230002P01",
    starCode: "230002",
    name: [
      { code: "Kr", context: "가이에스부르크" },
      { code: "En", context: "Geiersburg" },
      { code: "Jp", context: "はげたかのしろ" },
    ],
    /** @위치_및_물리적_특성 */
    pos: { x: 317, y: 572 },
    planetType: "artificial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 20,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 20 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 8,
      details: [{ b_id: "FARM_000", count: 4, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: ["DUCHY"],
    /** @설명 */
    desc: [
      {
        code: "Kr",
        context: "직경 45km에 질량 40조 톤을 자랑하는 거대한 인공요새",
      },
    ],
  },
  {
    code: "230002P02",
    starCode: "230002",
    name: [{ code: "Kr", context: "헷세·카셀" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 682, y: 427 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 380,
      econ: [{ code: 60, unit: 296 }],
      idea: [{ code: 240, unit: 296 }],
      clique: [
        { code: "CLQ_REH_003", unit: 167 },
        { code: "CLQ_REH_001", unit: 102 },
        { code: "CLQ_REH_002", unit: 21 },
        { code: "CLQ_REH_004", unit: 6 },
      ],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 361 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 76,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 160,
      details: [{ b_id: "FARM_000", count: 76, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: ["DUCHY"],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230003_Klenigeld ──
  {
    code: "230003P01",
    starCode: "230003",
    name: [
      { code: "Kr", context: "클라인겔트" },
      { code: "En", context: "Klenigeld" },
    ],
    /** @위치_및_물리적_특성 */
    pos: { x: 787, y: 376 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 750,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 715 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 300,
      details: [{ b_id: "FARM_000", count: 143, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },
  {
    code: "230003P02",
    starCode: "230003",
    name: [{ code: "Kr", context: "도벨그" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 480, y: 755 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 600,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 570 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 240,
      details: [{ b_id: "FARM_000", count: 114, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },
  {
    code: "230003P03",
    starCode: "230003",
    name: [{ code: "Kr", context: "모르겐" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 241, y: 318 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 750,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 715 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 300,
      details: [{ b_id: "FARM_000", count: 143, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230004_탄므즈 ──
  {
    code: "230004P01",
    starCode: "230004",
    name: [{ code: "Kr", context: "탄므즈" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "FPA",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 150,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ code: "FARMER", unit: 30 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 60,
      details: [{ id: "FARM_001", count: 1 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230005_아트라 하시스 ──
  {
    code: "230005P01",
    starCode: "230005",
    name: [{ code: "Kr", context: "아트라 하시스" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 398, y: 228 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "FPA",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 45,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ code: "FARMER", unit: 30 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 18,
      details: [{ id: "FARM_001", count: 1 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },
  {
    code: "230005P02",
    starCode: "230005",
    name: [{ code: "Kr", context: "아스페륀" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 758, y: 544 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "FPA",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 30,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ code: "FARMER", unit: 30 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 3,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 12,
      details: [{ id: "FARM_001", count: 1 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },
  {
    code: "230005P03",
    starCode: "230005",
    name: [{ code: "Kr", context: "우가리트" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 316, y: 728 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "FPA",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 20,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ code: "FARMER", unit: 15 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 2,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 8,
      details: [{ id: "FARM_002", count: 1 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230006_하이네센 ──
  {
    code: "230006P01",
    starCode: "230006",
    name: [{ code: "Kr", context: "하이네센" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 527, y: 775 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "FPA",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 9750,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ code: "FARMER", unit: 65 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 3900,
      details: [{ id: "FARM_003", count: 13 }],
    },
    /** @특성 */
    traits: ["MAIN_PLANET", "CAPITAL"],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },
  {
    code: "230006P02",
    starCode: "230006",
    name: [{ code: "Kr", context: "시뤼나갈" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 255, y: 376 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "FPA",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 1200,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ code: "FARMER", unit: 45 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 120,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 480,
      details: [{ id: "FARM_002", count: 3 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },
  {
    code: "230006P03",
    starCode: "230006",
    name: [{ code: "Kr", context: "테르누젠" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 724, y: 318 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "FPA",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 800,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ code: "FARMER", unit: 30 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 80,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 320,
      details: [{ id: "FARM_002", count: 2 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230007_프르샤・스쿠타 ──
  {
    code: "230007P01",
    starCode: "230007",
    name: [{ code: "Kr", context: "프르샤・스쿠타" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "FPA",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 150,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ code: "FARMER", unit: 30 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 60,
      details: [{ id: "FARM_001", count: 1 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230008_보르소른 ──
  {
    code: "230008P01",
    starCode: "230008",
    name: [{ code: "Kr", context: "보르소른" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 467, y: 785 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 900,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 855 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 360,
      details: [{ b_id: "FARM_000", count: 171, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },
  {
    code: "230008P02",
    starCode: "230008",
    name: [{ code: "Kr", context: "빌로스트" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 265, y: 349 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 900,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 855 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 360,
      details: [{ b_id: "FARM_000", count: 171, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },
  {
    code: "230008P03",
    starCode: "230008",
    name: [{ code: "Kr", context: "알비스" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 728, y: 376 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 900,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 855 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 360,
      details: [{ b_id: "FARM_000", count: 171, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230009_톤도르프 ──
  {
    code: "230009P01",
    starCode: "230009",
    name: [{ code: "Kr", context: "톤도르프" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 674, y: 588 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 1800,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 1715 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 720,
      details: [{ b_id: "FARM_000", count: 343, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: ["DUCHY"],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },
  {
    code: "230009P02",
    starCode: "230009",
    name: [
      { code: "Kr", context: "베스터란트" },
      { code: "En", context: "Westerland" },
      { code: "Jp", context: "ヴェスターラント" },
    ],
    /** @위치_및_물리적_특성 */
    pos: { x: 325, y: 411 },
    planetType: "desert",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 20,
      econ: [{ code: 60, unit: 15 }],
      idea: [{ code: 240, unit: 1 }],
      clique: [
        { code: "CLQ_REH_001", unit: 5 },
        { code: "CLQ_REH_002", unit: 4 },
        { code: "CLQ_REH_004", unit: 1 },
      ],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 20 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 60,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 8,
      details: [{ b_id: "FARM_000", count: 4, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: ["DUCHY"],
    /** @설명 */
    desc: [
      {
        code: "Kr",
        context:
          "베스터란트는\n    극도로 건조한 사막행성으로, 바위산과 황회색 사막으로 뒤덮여 있어 사람이 거주하기가 대단히 힘든 환경을 지니고 있다.\n    다만 하얀 염호(鹽湖)로 펼쳐진 표면에 크고 작은 50개의 오아시스가 있고, 이 곳을 중심으로 나름 비옥한 토지가 위치해 있어 무려 200만 명의 주민들이 행성에 거주하고 있다.\n        브라운슈바이크 공작이 가지고 있는 수많은 영지 중 하나이고, 인구도 적고 산업은 없다시피 하며 식량 생산은 자급자족 정도 이루어지는 별 볼일 없는 변경 행성이지만 희귀금속 희토류(希土類) 원소가 다량 매장되어 있어 전략적 가치가 전무하다고 볼 수는 없다.",
      },
    ],
  },

  // ── 230010_카프튜랑카 ──
  {
    code: "230010P01",
    starCode: "230010",
    name: [{ code: "Kr", context: "카프튜랑카" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "FPA",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 150,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ code: "FARMER", unit: 30 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 60,
      details: [{ id: "FARM_001", count: 1 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230011_델모퓌라이 ──
  {
    code: "230011P01",
    starCode: "230011",
    name: [{ code: "Kr", context: "델모퓌라이" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 635, y: 641 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "FPA",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 600,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ code: "FARMER", unit: 90 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 240,
      details: [{ id: "FARM_001", count: 3 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },
  {
    code: "230011P02",
    starCode: "230011",
    name: [{ code: "Kr", context: "보이오이아" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 364, y: 358 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "FPA",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 600,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ code: "FARMER", unit: 90 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 240,
      details: [{ id: "FARM_001", count: 3 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230012_자크스・코프르크 ──
  {
    code: "230012P01",
    starCode: "230012",
    name: [{ code: "Kr", context: "자크스・코프르크" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 1200,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 1145 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 480,
      details: [{ b_id: "FARM_000", count: 229, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230013_악타이온 ──
  {
    code: "230013P01",
    starCode: "230013",
    name: [{ code: "Kr", context: "악타이온" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "FPA",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 2250,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ code: "FARMER", unit: 15 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 900,
      details: [{ id: "FARM_003", count: 3 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230014_베스트파리아 ──
  {
    code: "230014P01",
    starCode: "230014",
    name: [{ code: "Kr", context: "베스트파리아" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 506, y: 695 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 750,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 715 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 300,
      details: [{ b_id: "FARM_000", count: 143, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },
  {
    code: "230014P02",
    starCode: "230014",
    name: [{ code: "Kr", context: "디사우" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 493, y: 304 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 750,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 715 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 300,
      details: [{ b_id: "FARM_000", count: 143, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230015_다룸슈타트 ──
  {
    code: "230015P01",
    starCode: "230015",
    name: [{ code: "Kr", context: "다룸슈타트" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 2400,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 2285 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 960,
      details: [{ b_id: "FARM_000", count: 457, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230016_샴프르 ──
  {
    code: "230016P01",
    starCode: "230016",
    name: [{ code: "Kr", context: "샴프르" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 756, y: 584 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "FPA",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 1500,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ code: "FARMER", unit: 10 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 600,
      details: [{ id: "FARM_003", count: 2 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },
  {
    code: "230016P02",
    starCode: "230016",
    name: [{ code: "Kr", context: "보프・마나프" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 284, y: 675 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "FPA",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 900,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ code: "FARMER", unit: 30 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 360,
      details: [{ id: "FARM_002", count: 2 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },
  {
    code: "230016P03",
    starCode: "230016",
    name: [{ code: "Kr", context: "메헤라브" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 455, y: 259 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "FPA",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 1200,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ code: "FARMER", unit: 45 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 480,
      details: [{ id: "FARM_002", count: 3 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230017_엘・파실 ──
  {
    code: "230017P01",
    starCode: "230017",
    name: [{ code: "Kr", context: "엘・파실" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 660, y: 612 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "FPA",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 900,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ code: "FARMER", unit: 30 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 360,
      details: [{ id: "FARM_002", count: 2 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },
  {
    code: "230017P02",
    starCode: "230017",
    name: [{ code: "Kr", context: "에스트레마도라" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 339, y: 387 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "FPA",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 400,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ code: "FARMER", unit: 60 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 40,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 160,
      details: [{ id: "FARM_001", count: 2 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230018_우가리트 ──
  {
    code: "230018P01",
    starCode: "230018",
    name: [{ code: "Kr", context: "우가리트" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 357, y: 634 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "FPA",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 150,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ code: "FARMER", unit: 30 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 60,
      details: [{ id: "FARM_001", count: 1 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },
  {
    code: "230018P02",
    starCode: "230018",
    name: [{ code: "Kr", context: "라트보트" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 642, y: 365 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "FPA",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 150,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ code: "FARMER", unit: 30 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 60,
      details: [{ id: "FARM_001", count: 1 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230019_렌텐베르크 ──
  {
    code: "230019P01",
    starCode: "230019",
    name: [{ code: "Kr", context: "렌텐베르크" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 677, y: 582 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 280,
      econ: [{ code: 60, unit: 218 }],
      idea: [{ code: 240, unit: 218 }],
      clique: [
        { code: "CLQ_REH_003", unit: 123 },
        { code: "CLQ_REH_001", unit: 75 },
        { code: "CLQ_REH_002", unit: 16 },
        { code: "CLQ_REH_004", unit: 4 },
      ],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 266 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 56,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 118,
      details: [{ b_id: "FARM_000", count: 56, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: ["MARQUISATE"],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },
  {
    code: "230019P02",
    starCode: "230019",
    name: [{ code: "Kr", context: "니플헤임" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 322, y: 417 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 2250,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 2145 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 900,
      details: [{ b_id: "FARM_000", count: 429, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: ["MARQUISATE"],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230020_Urvashi ──
  {
    code: "230020P01",
    starCode: "230020",
    name: [
      { code: "Kr", context: "우르바시" },
      { code: "En", context: "Urvashi" },
    ],
    /** @위치_및_물리적_특성 */
    pos: { x: 319, y: 686 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "FPA",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 1350,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ code: "FARMER", unit: 45 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 540,
      details: [{ id: "FARM_002", count: 3 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },
  {
    code: "230020P02",
    starCode: "230020",
    name: [
      { code: "Kr", context: "리시" },
      { code: "En", context: "Rishi" },
    ],
    /** @위치_및_물리적_특성 */
    pos: { x: 436, y: 262 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "FPA",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 1350,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ code: "FARMER", unit: 45 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 540,
      details: [{ id: "FARM_002", count: 3 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },
  {
    code: "230020P03",
    starCode: "230020",
    name: [
      { code: "Kr", context: "푸르나바스" },
      { code: "En", context: "Pururavas" },
    ],
    /** @위치_및_물리적_특성 */
    pos: { x: 790, y: 586 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "FPA",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 120,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ code: "FARMER", unit: 30 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 12,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 48,
      details: [{ id: "FARM_001", count: 1 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230021_자르펠트 ──
  {
    code: "230021P01",
    starCode: "230021",
    name: [{ code: "Kr", context: "자르펠트" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 1500,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 1430 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 600,
      details: [{ b_id: "FARM_000", count: 286, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230022_이제르론 ──
  {
    code: "230022P01",
    starCode: "230022",
    name: [{ code: "Kr", context: "이제르론" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 20,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 20 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 4,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 10,
      details: [{ b_id: "FARM_000", count: 4, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230023_다프테 잠시드 ──
  {
    code: "230023P01",
    starCode: "230023",
    name: [{ code: "Kr", context: "다프테 잠시드" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 518, y: 695 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "FPA",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 2250,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ code: "FARMER", unit: 15 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 900,
      details: [{ id: "FARM_003", count: 3 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },
  {
    code: "230023P02",
    starCode: "230023",
    name: [{ code: "Kr", context: "카퍼" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 481, y: 304 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "FPA",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 180,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ code: "FARMER", unit: 30 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 18,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 72,
      details: [{ id: "FARM_001", count: 1 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230024_로스바흐 ──
  {
    code: "230024P01",
    starCode: "230024",
    name: [{ code: "Kr", context: "로스바흐" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 1800,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 1715 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 720,
      details: [{ b_id: "FARM_000", count: 343, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230025_카프체란카 ──
  {
    code: "230025P01",
    starCode: "230025",
    name: [{ code: "Kr", context: "카프체란카" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 80,
      econ: [{ code: 60, unit: 62 }],
      idea: [{ code: 240, unit: 62 }],
      clique: [
        { code: "CLQ_REH_003", unit: 35 },
        { code: "CLQ_REH_001", unit: 21 },
        { code: "CLQ_REH_002", unit: 4 },
        { code: "CLQ_REH_004", unit: 2 },
      ],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 76 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 16,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 34,
      details: [{ b_id: "FARM_000", count: 16, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230026_케니히그라흐 ──
  {
    code: "230026P01",
    starCode: "230026",
    name: [{ code: "Kr", context: "케니히그라흐" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 340, y: 614 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 420,
      econ: [{ code: 60, unit: 327 }],
      idea: [{ code: 240, unit: 327 }],
      clique: [
        { code: "CLQ_REH_003", unit: 184 },
        { code: "CLQ_REH_001", unit: 113 },
        { code: "CLQ_REH_002", unit: 24 },
        { code: "CLQ_REH_004", unit: 6 },
      ],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 399 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 84,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 178,
      details: [{ b_id: "FARM_000", count: 84, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: ["DUCHY"],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },
  {
    code: "230026P02",
    starCode: "230026",
    name: [{ code: "Kr", context: "라파트" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 659, y: 385 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 310,
      econ: [{ code: 60, unit: 241 }],
      idea: [{ code: 240, unit: 241 }],
      clique: [
        { code: "CLQ_REH_003", unit: 136 },
        { code: "CLQ_REH_001", unit: 83 },
        { code: "CLQ_REH_002", unit: 17 },
        { code: "CLQ_REH_004", unit: 5 },
      ],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 294 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 62,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 132,
      details: [{ b_id: "FARM_000", count: 62, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: ["DUCHY"],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230027_네프티스 ──
  {
    code: "230027P01",
    starCode: "230027",
    name: [{ code: "Kr", context: "네프티스" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 375, y: 651 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 110,
      econ: [{ code: 60, unit: 85 }],
      idea: [{ code: 240, unit: 85 }],
      clique: [
        { code: "CLQ_REH_003", unit: 48 },
        { code: "CLQ_REH_001", unit: 29 },
        { code: "CLQ_REH_002", unit: 6 },
        { code: "CLQ_REH_004", unit: 2 },
      ],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 104 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 22,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 48,
      details: [{ b_id: "FARM_000", count: 22, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },
  {
    code: "230027P02",
    starCode: "230027",
    name: [{ code: "Kr", context: "이제크온" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 624, y: 348 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 90,
      econ: [{ code: 60, unit: 70 }],
      idea: [{ code: 240, unit: 70 }],
      clique: [
        { code: "CLQ_REH_003", unit: 39 },
        { code: "CLQ_REH_001", unit: 24 },
        { code: "CLQ_REH_002", unit: 5 },
        { code: "CLQ_REH_004", unit: 2 },
      ],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 85 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 18,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 38,
      details: [{ b_id: "FARM_000", count: 18, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230028_가르미슈 ──
  {
    code: "230028P01",
    starCode: "230028",
    name: [{ code: "Kr", context: "가르미슈" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 555, y: 215 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 360,
      econ: [{ code: 60, unit: 280 }],
      idea: [{ code: 240, unit: 280 }],
      clique: [
        { code: "CLQ_REH_003", unit: 158 },
        { code: "CLQ_REH_001", unit: 96 },
        { code: "CLQ_REH_002", unit: 20 },
        { code: "CLQ_REH_004", unit: 6 },
      ],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 342 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 72,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 152,
      details: [{ b_id: "FARM_000", count: 72, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: ["DUCHY"],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },
  {
    code: "230028P02",
    starCode: "230028",
    name: [{ code: "Kr", context: "스루즈헤임" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 725, y: 689 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 1500,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 1430 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 600,
      details: [{ b_id: "FARM_000", count: 286, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: ["DUCHY"],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },
  {
    code: "230028P03",
    starCode: "230028",
    name: [{ code: "Kr", context: "가랴르호른" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 206, y: 585 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 1350,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 1285 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 540,
      details: [{ b_id: "FARM_000", count: 257, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: ["DUCHY"],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230029_레그니처 ──
  {
    code: "230029P01",
    starCode: "230029",
    name: [{ code: "Kr", context: "레그니처" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "FPA",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 100,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ code: "FARMER", unit: 30 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 10,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 40,
      details: [{ id: "FARM_001", count: 1 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230030_에르힌겐 ──
  {
    code: "230030P01",
    starCode: "230030",
    name: [{ code: "Kr", context: "에르힌겐" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 4800,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 4570 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 1920,
      details: [{ b_id: "FARM_000", count: 914, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: ["DUCHY"],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230031_립슈타트 ──
  {
    code: "230031P01",
    starCode: "230031",
    name: [{ code: "Kr", context: "립슈타트" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 190,
      econ: [{ code: 60, unit: 148 }],
      idea: [{ code: 240, unit: 148 }],
      clique: [
        { code: "CLQ_REH_003", unit: 83 },
        { code: "CLQ_REH_001", unit: 51 },
        { code: "CLQ_REH_002", unit: 10 },
        { code: "CLQ_REH_004", unit: 4 },
      ],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 180 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 38,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 80,
      details: [{ b_id: "FARM_000", count: 38, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230032_퀴스트린 ──
  {
    code: "230032P01",
    starCode: "230032",
    name: [{ code: "Kr", context: "퀴스트린" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 694, y: 521 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 1800,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 1715 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 720,
      details: [{ b_id: "FARM_000", count: 343, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: ["MARQUISATE"],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },
  {
    code: "230032P02",
    starCode: "230032",
    name: [{ code: "Kr", context: "에르뮐" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 305, y: 478 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 240,
      econ: [{ code: 60, unit: 187 }],
      idea: [{ code: 240, unit: 187 }],
      clique: [
        { code: "CLQ_REH_003", unit: 105 },
        { code: "CLQ_REH_001", unit: 64 },
        { code: "CLQ_REH_002", unit: 13 },
        { code: "CLQ_REH_004", unit: 5 },
      ],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 228 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 48,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 102,
      details: [{ b_id: "FARM_000", count: 48, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: ["MARQUISATE"],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230033_키베론 ──
  {
    code: "230033P01",
    starCode: "230033",
    name: [{ code: "Kr", context: "키베론" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 482, y: 695 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "FPA",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 450,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ code: "FARMER", unit: 15 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 180,
      details: [{ id: "FARM_002", count: 1 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },
  {
    code: "230033P02",
    starCode: "230033",
    name: [{ code: "Kr", context: "루드밀라" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 517, y: 304 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "FPA",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 280,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ code: "FARMER", unit: 60 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 28,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 112,
      details: [{ id: "FARM_001", count: 2 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230034_카스티리오네 ──
  {
    code: "230034P01",
    starCode: "230034",
    name: [{ code: "Kr", context: "카스티리오네" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "FPA",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 150,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ code: "FARMER", unit: 30 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 60,
      details: [{ id: "FARM_001", count: 1 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230035_ ──
  {
    code: "230035P01",
    starCode: "230035",
    name: [{ code: "Kr", context: "" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "FPA",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 2250,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ code: "FARMER", unit: 15 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 900,
      details: [{ id: "FARM_003", count: 3 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230036_비트리아 ──
  {
    code: "230036P01",
    starCode: "230036",
    name: [{ code: "Kr", context: "비트리아" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "FPA",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 200,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ code: "FARMER", unit: 30 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 20,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 80,
      details: [{ id: "FARM_001", count: 1 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230037_파프라비 ──
  {
    code: "230037P01",
    starCode: "230037",
    name: [{ code: "Kr", context: "파프라비" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "FPA",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 150,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ code: "FARMER", unit: 30 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 60,
      details: [{ id: "FARM_001", count: 1 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230038_민덴 ──
  {
    code: "230038P01",
    starCode: "230038",
    name: [{ code: "Kr", context: "민덴" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 3300,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 3145 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 1320,
      details: [{ b_id: "FARM_000", count: 629, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: ["DUCHY"],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230039_테레젠슈타트 ──
  {
    code: "230039P01",
    starCode: "230039",
    name: [{ code: "Kr", context: "테레젠슈타트" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 2700,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 2570 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 1080,
      details: [{ b_id: "FARM_000", count: 514, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: ["DUCHY"],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230040_노이에란트 ──
  {
    code: "230040P01",
    starCode: "230040",
    name: [{ code: "Kr", context: "노이에란트" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 140,
      econ: [{ code: 60, unit: 109 }],
      idea: [{ code: 240, unit: 109 }],
      clique: [
        { code: "CLQ_REH_003", unit: 61 },
        { code: "CLQ_REH_001", unit: 37 },
        { code: "CLQ_REH_002", unit: 8 },
        { code: "CLQ_REH_004", unit: 3 },
      ],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 133 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 28,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 60,
      details: [{ b_id: "FARM_000", count: 28, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230041_케르코포르타 ──
  {
    code: "230041P01",
    starCode: "230041",
    name: [{ code: "Kr", context: "케르코포르타" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "FPA",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 150,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ code: "FARMER", unit: 30 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 60,
      details: [{ id: "FARM_001", count: 1 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230042_페잔 ──
  {
    code: "230042P01",
    starCode: "230042",
    name: [{ code: "Kr", context: "페잔" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "PZN",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 18000,
      econ: [],
      idea: [],
      clique: [],
      jobs: [],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 7200,
      details: [],
    },
    /** @특성 */
    traits: ["MAIN_PLANET", "CAPITAL"],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230043_루지아나 ──
  {
    code: "230043P01",
    starCode: "230043",
    name: [{ code: "Kr", context: "루지아나" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "FPA",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 150,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ code: "FARMER", unit: 30 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 60,
      details: [{ id: "FARM_001", count: 1 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230044_루지아나 ──
  {
    code: "230044P01",
    starCode: "230044",
    name: [{ code: "Kr", context: "루지아나" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 600,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 570 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 240,
      details: [{ b_id: "FARM_000", count: 114, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230045_마그 토레드 ──
  {
    code: "230045P01",
    starCode: "230045",
    name: [{ code: "Kr", context: "마그 토레드" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "FPA",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 2400,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ code: "FARMER", unit: 20 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 960,
      details: [{ id: "FARM_003", count: 4 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230046_라티고스트 ──
  {
    code: "230046P01",
    starCode: "230046",
    name: [{ code: "Kr", context: "라티고스트" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 282, y: 616 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "FPA",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 150,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ code: "FARMER", unit: 30 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 60,
      details: [{ id: "FARM_001", count: 1 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },
  {
    code: "230046P02",
    starCode: "230046",
    name: [{ code: "Kr", context: "스벤트비트" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 505, y: 199 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "FPA",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 150,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ code: "FARMER", unit: 30 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 60,
      details: [{ id: "FARM_001", count: 1 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },
  {
    code: "230046P03",
    starCode: "230046",
    name: [{ code: "Kr", context: "야로비트" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 745, y: 623 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "FPA",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 150,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ code: "FARMER", unit: 30 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 60,
      details: [{ id: "FARM_001", count: 1 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230047_아로요 드 모리노 ──
  {
    code: "230047P01",
    starCode: "230047",
    name: [{ code: "Kr", context: "아로요 드 모리노" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 330, y: 599 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "FPA",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 2550,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ code: "FARMER", unit: 20 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 1020,
      details: [{ id: "FARM_003", count: 4 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },
  {
    code: "230047P02",
    starCode: "230047",
    name: [{ code: "Kr", context: "카시나" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 669, y: 400 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "FPA",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 2550,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ code: "FARMER", unit: 20 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 1020,
      details: [{ id: "FARM_003", count: 4 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230048_슈바르츠부르크 ──
  {
    code: "230048P01",
    starCode: "230048",
    name: [{ code: "Kr", context: "슈바르츠부르크" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 1800,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 1715 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 720,
      details: [{ b_id: "FARM_000", count: 343, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230049_알에리스 ──
  {
    code: "230049P01",
    starCode: "230049",
    name: [{ code: "Kr", context: "알에리스" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "FPA",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 150,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ code: "FARMER", unit: 30 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 60,
      details: [{ id: "FARM_001", count: 1 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230050_에스링그 ──
  {
    code: "230050P01",
    starCode: "230050",
    name: [{ code: "Kr", context: "에스링그" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 734, y: 427 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 160,
      econ: [{ code: 60, unit: 124 }],
      idea: [{ code: 240, unit: 124 }],
      clique: [
        { code: "CLQ_REH_003", unit: 70 },
        { code: "CLQ_REH_001", unit: 42 },
        { code: "CLQ_REH_002", unit: 9 },
        { code: "CLQ_REH_004", unit: 3 },
      ],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 152 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 32,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 68,
      details: [{ b_id: "FARM_000", count: 32, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },
  {
    code: "230050P02",
    starCode: "230050",
    name: [{ code: "Kr", context: "크네스도르프" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 423, y: 734 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 140,
      econ: [{ code: 60, unit: 109 }],
      idea: [{ code: 240, unit: 109 }],
      clique: [
        { code: "CLQ_REH_003", unit: 61 },
        { code: "CLQ_REH_001", unit: 37 },
        { code: "CLQ_REH_002", unit: 8 },
        { code: "CLQ_REH_004", unit: 3 },
      ],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 133 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 28,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 60,
      details: [{ b_id: "FARM_000", count: 28, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },
  {
    code: "230050P03",
    starCode: "230050",
    name: [{ code: "Kr", context: "폰트노이" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 330, y: 306 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 1500,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 1430 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 600,
      details: [{ b_id: "FARM_000", count: 286, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230051_미트라 ──
  {
    code: "230051P01",
    starCode: "230051",
    name: [{ code: "Kr", context: "미트라" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 483, y: 695 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "FPA",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 320,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ code: "FARMER", unit: 60 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 32,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 128,
      details: [{ id: "FARM_001", count: 2 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },
  {
    code: "230051P02",
    starCode: "230051",
    name: [{ code: "Kr", context: "지비에" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 516, y: 304 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "FPA",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 1800,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ code: "FARMER", unit: 60 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 720,
      details: [{ id: "FARM_002", count: 4 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230052_에레키슈갈 ──
  {
    code: "230052P01",
    starCode: "230052",
    name: [{ code: "Kr", context: "에레키슈갈" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "FPA",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 150,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ code: "FARMER", unit: 30 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 60,
      details: [{ id: "FARM_001", count: 1 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230053_에코니아 ──
  {
    code: "230053P01",
    starCode: "230053",
    name: [{ code: "Kr", context: "에코니아" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 526, y: 694 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "FPA",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 2400,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ code: "FARMER", unit: 20 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 960,
      details: [{ id: "FARM_003", count: 4 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },
  {
    code: "230053P02",
    starCode: "230053",
    name: [{ code: "Kr", context: "마스지드" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 473, y: 305 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "FPA",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 2400,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ code: "FARMER", unit: 20 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 960,
      details: [{ id: "FARM_003", count: 4 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230054_파라스 ──
  {
    code: "230054P01",
    starCode: "230054",
    name: [{ code: "Kr", context: "파라스" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "FPA",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 900,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ code: "FARMER", unit: 30 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 360,
      details: [{ id: "FARM_002", count: 2 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230055_라므 ──
  {
    code: "230055P01",
    starCode: "230055",
    name: [{ code: "Kr", context: "라므" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 693, y: 331 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "FPA",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 75,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ code: "FARMER", unit: 30 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 30,
      details: [{ id: "FARM_001", count: 1 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },
  {
    code: "230055P02",
    starCode: "230055",
    name: [{ code: "Kr", context: "안샤르" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 563, y: 764 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "FPA",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 60,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ code: "FARMER", unit: 30 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 6,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 24,
      details: [{ id: "FARM_001", count: 1 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },
  {
    code: "230055P03",
    starCode: "230055",
    name: [{ code: "Kr", context: "레그니처" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 256, y: 411 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "FPA",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 50,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ code: "FARMER", unit: 30 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 5,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 20,
      details: [{ id: "FARM_001", count: 1 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },
  {
    code: "230055P04",
    starCode: "230055",
    name: [{ code: "Kr", context: "카프체란카" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "FPA",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 45,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ code: "FARMER", unit: 30 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 4,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 18,
      details: [{ id: "FARM_001", count: 1 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230056_호포키르히 ──
  {
    code: "230056P01",
    starCode: "230056",
    name: [{ code: "Kr", context: "호포키르히" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 368, y: 645 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 1950,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 1855 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 780,
      details: [{ b_id: "FARM_000", count: 371, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: ["DUCHY"],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },
  {
    code: "230056P02",
    starCode: "230056",
    name: [{ code: "Kr", context: "비텐베르크" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 631, y: 354 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 290,
      econ: [{ code: 60, unit: 226 }],
      idea: [{ code: 240, unit: 226 }],
      clique: [
        { code: "CLQ_REH_003", unit: 127 },
        { code: "CLQ_REH_001", unit: 78 },
        { code: "CLQ_REH_002", unit: 16 },
        { code: "CLQ_REH_004", unit: 5 },
      ],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 275 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 58,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 122,
      details: [{ b_id: "FARM_000", count: 58, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: ["DUCHY"],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230057_팔머랜드 ──
  {
    code: "230057P01",
    starCode: "230057",
    name: [{ code: "Kr", context: "팔머랜드" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "FPA",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 1800,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ code: "FARMER", unit: 60 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 720,
      details: [{ id: "FARM_002", count: 4 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230058_Odin ──
  {
    code: "230058P01",
    starCode: "230058",
    name: [
      { code: "Kr", context: "오딘" },
      { code: "En", context: "Odin" },
      { code: "Jp", context: "オーディン" },
    ],
    /** @위치_및_물리적_특성 */
    pos: { x: 654, y: 731 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 4950,
      econ: [{ code: 60, unit: 4554 }],
      idea: [{ code: 240, unit: 4500 }],
      clique: [
        { code: "CLQ_REH_001", unit: 4000 },
        { code: "CLQ_REH_002", unit: 300 },
        { code: "CLQ_REH_003", unit: 200 },
        { code: "CLQ_REH_004", unit: 100 },
      ],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 4715 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 50,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 1980,
      details: [{ b_id: "FARM_000", count: 943, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: ["MAIN_PLANET", "CAPITAL", "IMPERIAL_DEMESNE"],
    /** @설명 */
    desc: [
      {
        code: "Kr",
        context:
          "발할라 성계에 위치한 제 3행성. 골덴바움 왕조 은하제국의 수도\n    제국의 영토로 봤을 때, 중심에 속하진 않았으나, 성계의 이름과 행성이 루돌프의 취향에 맞아 수도로 결정되었다.",
      },
    ],
  },
  {
    code: "230058P02",
    starCode: "230058",
    name: [{ code: "Kr", context: "아스가르즈" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 258, y: 550 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 1800,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 1715 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 720,
      details: [{ b_id: "FARM_000", count: 343, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },
  {
    code: "230058P03",
    starCode: "230058",
    name: [{ code: "Kr", context: "유그드라실" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 592, y: 215 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 580,
      econ: [{ code: 60, unit: 452 }],
      idea: [{ code: 240, unit: 452 }],
      clique: [
        { code: "CLQ_REH_003", unit: 255 },
        { code: "CLQ_REH_001", unit: 156 },
        { code: "CLQ_REH_002", unit: 33 },
        { code: "CLQ_REH_004", unit: 8 },
      ],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 551 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 116,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 244,
      details: [{ b_id: "FARM_000", count: 116, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230059_브렌하임 ──
  {
    code: "230059P01",
    starCode: "230059",
    name: [{ code: "Kr", context: "브렌하임" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 429, y: 682 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 1200,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 1145 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 480,
      details: [{ b_id: "FARM_000", count: 229, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: ["DUCHY"],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },
  {
    code: "230059P02",
    starCode: "230059",
    name: [{ code: "Kr", context: "카르슈타트" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 570, y: 317 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 1200,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 1145 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 480,
      details: [{ b_id: "FARM_000", count: 229, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: ["DUCHY"],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230060_카토르브러 ──
  {
    code: "230060P01",
    starCode: "230060",
    name: [{ code: "Kr", context: "카토르브러" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "FPA",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 150,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ code: "FARMER", unit: 30 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 60,
      details: [{ id: "FARM_001", count: 1 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230061_몽마라유 ──
  {
    code: "230061P01",
    starCode: "230061",
    name: [{ code: "Kr", context: "몽마라유" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "FPA",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 1200,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ code: "FARMER", unit: 45 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 480,
      details: [{ id: "FARM_002", count: 3 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230062_레오폴트슈타트 ──
  {
    code: "230062P01",
    starCode: "230062",
    name: [{ code: "Kr", context: "레오폴트슈타트" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 352, y: 629 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 1800,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 1715 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 720,
      details: [{ b_id: "FARM_000", count: 343, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },
  {
    code: "230062P02",
    starCode: "230062",
    name: [{ code: "Kr", context: "그라츠" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 647, y: 370 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 1500,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 1430 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 600,
      details: [{ b_id: "FARM_000", count: 286, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230063_NEPHTHYS ──
  {
    code: "230063P01",
    starCode: "230063",
    name: [
      { code: "Kr", context: "네프티스" },
      { code: "En", context: "NEPHTHYS" },
    ],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "FPA",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 2700,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ code: "FARMER", unit: 20 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 1080,
      details: [{ id: "FARM_003", count: 4 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },
  {
    code: "230063P02",
    starCode: "230063",
    name: [{ code: "Kr", context: "이제크온" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "FPA",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 150,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ code: "FARMER", unit: 30 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 15,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 60,
      details: [{ id: "FARM_001", count: 1 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230064_BYLOST ──
  {
    code: "230064P01",
    starCode: "230064",
    name: [
      { code: "Kr", context: "빌로스트" },
      { code: "En", context: "BYLOST" },
    ],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 100,
      econ: [{ code: 60, unit: 78 }],
      idea: [{ code: 240, unit: 78 }],
      clique: [
        { code: "CLQ_REH_003", unit: 44 },
        { code: "CLQ_REH_001", unit: 26 },
        { code: "CLQ_REH_002", unit: 5 },
        { code: "CLQ_REH_004", unit: 3 },
      ],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 95 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 20,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 42,
      details: [{ b_id: "FARM_000", count: 20, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230065_샤텐부르크 ──
  {
    code: "230065P01",
    starCode: "230065",
    name: [{ code: "Kr", context: "샤텐부르크" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "FPA",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 150,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ code: "FARMER", unit: 30 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 15,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 60,
      details: [{ id: "FARM_001", count: 1 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230067_MÜKKENBERGER ──
  {
    code: "230067P01",
    starCode: "230067",
    name: [
      { code: "Kr", context: "뮈켄베르거" },
      { code: "En", context: "MÜKKENBERGER" },
    ],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 210,
      econ: [{ code: 60, unit: 163 }],
      idea: [{ code: 240, unit: 163 }],
      clique: [
        { code: "CLQ_REH_003", unit: 92 },
        { code: "CLQ_REH_001", unit: 56 },
        { code: "CLQ_REH_002", unit: 12 },
        { code: "CLQ_REH_004", unit: 3 },
      ],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 199 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 42,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 90,
      details: [{ b_id: "FARM_000", count: 42, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230068_네페르카프타흐 ──
  {
    code: "230068P01",
    starCode: "230068",
    name: [{ code: "Kr", context: "네페르카프타흐" }],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "FPA",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 150,
      econ: [],
      idea: [],
      clique: [],
      jobs: [],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 60,
      details: [],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230069_Terra/Earth ──
  {
    code: "230069P01",
    starCode: "230069",
    name: [
      { code: "Kr", context: "지구" },
      { code: "En", context: "Terra/Earth" },
    ],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 100,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 95 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 40,
      details: [{ b_id: "FARM_000", count: 19, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230070_YAVANHAR ──
  {
    code: "230070P01",
    starCode: "230070",
    name: [
      { code: "Kr", context: "야반하르" },
      { code: "En", context: "YAVANHAR" },
    ],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 120,
      econ: [{ code: 60, unit: 93 }],
      idea: [{ code: 240, unit: 93 }],
      clique: [
        { code: "CLQ_REH_003", unit: 52 },
        { code: "CLQ_REH_001", unit: 32 },
        { code: "CLQ_REH_002", unit: 6 },
        { code: "CLQ_REH_004", unit: 3 },
      ],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 114 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 24,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 52,
      details: [{ b_id: "FARM_000", count: 24, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230071_LANSBERG ──
  {
    code: "230071P01",
    starCode: "230071",
    name: [
      { code: "Kr", context: "란즈베르크" },
      { code: "En", context: "LANSBERG" },
    ],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 330,
      econ: [{ code: 60, unit: 257 }],
      idea: [{ code: 240, unit: 257 }],
      clique: [
        { code: "CLQ_REH_003", unit: 145 },
        { code: "CLQ_REH_001", unit: 88 },
        { code: "CLQ_REH_002", unit: 19 },
        { code: "CLQ_REH_004", unit: 5 },
      ],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 313 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 66,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 140,
      details: [{ b_id: "FARM_000", count: 66, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: ["DUCHY"],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230072_OPPENHEIMER ──
  {
    code: "230072P01",
    starCode: "230072",
    name: [
      { code: "Kr", context: "오펜하이머" },
      { code: "En", context: "OPPENHEIMER" },
    ],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 260,
      econ: [{ code: 60, unit: 202 }],
      idea: [{ code: 240, unit: 202 }],
      clique: [
        { code: "CLQ_REH_003", unit: 114 },
        { code: "CLQ_REH_001", unit: 69 },
        { code: "CLQ_REH_002", unit: 14 },
        { code: "CLQ_REH_004", unit: 5 },
      ],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 247 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 52,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 110,
      details: [{ b_id: "FARM_000", count: 52, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: ["MARQUISATE"],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230073_HILDESHEIM ──
  {
    code: "230073P01",
    starCode: "230073",
    name: [
      { code: "Kr", context: "히르데스하임" },
      { code: "En", context: "HILDESHEIM" },
    ],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 150,
      econ: [{ code: 60, unit: 117 }],
      idea: [{ code: 240, unit: 117 }],
      clique: [
        { code: "CLQ_REH_003", unit: 66 },
        { code: "CLQ_REH_001", unit: 40 },
        { code: "CLQ_REH_002", unit: 8 },
        { code: "CLQ_REH_004", unit: 3 },
      ],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 142 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 30,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 64,
      details: [{ b_id: "FARM_000", count: 30, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230074_LÜNEBURG ──
  {
    code: "230074P01",
    starCode: "230074",
    name: [
      { code: "Kr", context: "뤼네부르크" },
      { code: "En", context: "LÜNEBURG" },
    ],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 370,
      econ: [{ code: 60, unit: 288 }],
      idea: [{ code: 240, unit: 288 }],
      clique: [
        { code: "CLQ_REH_003", unit: 162 },
        { code: "CLQ_REH_001", unit: 99 },
        { code: "CLQ_REH_002", unit: 21 },
        { code: "CLQ_REH_004", unit: 6 },
      ],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 351 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 74,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 156,
      details: [{ b_id: "FARM_000", count: 74, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: ["DUCHY"],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230075_HARTENBERG ──
  {
    code: "230075P01",
    starCode: "230075",
    name: [
      { code: "Kr", context: "하르텐베르크" },
      { code: "En", context: "HARTENBERG" },
    ],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 400,
      econ: [{ code: 60, unit: 312 }],
      idea: [{ code: 240, unit: 312 }],
      clique: [
        { code: "CLQ_REH_003", unit: 176 },
        { code: "CLQ_REH_001", unit: 107 },
        { code: "CLQ_REH_002", unit: 23 },
        { code: "CLQ_REH_004", unit: 6 },
      ],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 380 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 80,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 168,
      details: [{ b_id: "FARM_000", count: 80, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: ["DUCHY"],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230076_LOHENGRAMM ──
  {
    code: "230076P01",
    starCode: "230076",
    name: [
      { code: "Kr", context: "로엔그람" },
      { code: "En", context: "LOHENGRAMM" },
    ],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 480,
      econ: [{ code: 60, unit: 374 }],
      idea: [{ code: 240, unit: 374 }],
      clique: [
        { code: "CLQ_REH_003", unit: 211 },
        { code: "CLQ_REH_001", unit: 129 },
        { code: "CLQ_REH_002", unit: 27 },
        { code: "CLQ_REH_004", unit: 7 },
      ],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 456 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 96,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 202,
      details: [{ b_id: "FARM_000", count: 96, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: ["DUCHY"],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230077_KLOPSTOCK ──
  {
    code: "230077P01",
    starCode: "230077",
    name: [
      { code: "Kr", context: "클롭슈톡" },
      { code: "En", context: "KLOPSTOCK" },
    ],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 220,
      econ: [{ code: 60, unit: 171 }],
      idea: [{ code: 240, unit: 171 }],
      clique: [
        { code: "CLQ_REH_003", unit: 96 },
        { code: "CLQ_REH_001", unit: 59 },
        { code: "CLQ_REH_002", unit: 12 },
        { code: "CLQ_REH_004", unit: 4 },
      ],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 209 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 44,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 94,
      details: [{ b_id: "FARM_000", count: 44, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: ["MARQUISATE"],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230078_BENEMÜNDE ──
  {
    code: "230078P01",
    starCode: "230078",
    name: [
      { code: "Kr", context: "베네뮌데" },
      { code: "En", context: "BENEMÜNDE" },
    ],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 130,
      econ: [{ code: 60, unit: 101 }],
      idea: [{ code: 240, unit: 101 }],
      clique: [
        { code: "CLQ_REH_003", unit: 57 },
        { code: "CLQ_REH_001", unit: 34 },
        { code: "CLQ_REH_002", unit: 7 },
        { code: "CLQ_REH_004", unit: 3 },
      ],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 123 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 26,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 56,
      details: [{ b_id: "FARM_000", count: 26, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230079_GRÜNEWALD ──
  {
    code: "230079P01",
    starCode: "230079",
    name: [
      { code: "Kr", context: "그뤼네발트" },
      { code: "En", context: "GRÜNEWALD" },
    ],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 340,
      econ: [{ code: 60, unit: 265 }],
      idea: [{ code: 240, unit: 265 }],
      clique: [
        { code: "CLQ_REH_003", unit: 149 },
        { code: "CLQ_REH_001", unit: 91 },
        { code: "CLQ_REH_002", unit: 19 },
        { code: "CLQ_REH_004", unit: 6 },
      ],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 323 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 68,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 144,
      details: [{ b_id: "FARM_000", count: 68, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: ["DUCHY"],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230080_FALSTRONG ──
  {
    code: "230080P01",
    starCode: "230080",
    name: [
      { code: "Kr", context: "팔스트롱" },
      { code: "En", context: "FALSTRONG" },
    ],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 430,
      econ: [{ code: 60, unit: 335 }],
      idea: [{ code: 240, unit: 335 }],
      clique: [
        { code: "CLQ_REH_003", unit: 189 },
        { code: "CLQ_REH_001", unit: 115 },
        { code: "CLQ_REH_002", unit: 24 },
        { code: "CLQ_REH_004", unit: 7 },
      ],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 408 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 86,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 182,
      details: [{ b_id: "FARM_000", count: 86, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: ["DUCHY"],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230081_REMSCHEID ──
  {
    code: "230081P01",
    starCode: "230081",
    name: [
      { code: "Kr", context: "렘샤이트" },
      { code: "En", context: "REMSCHEID" },
    ],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 160,
      econ: [{ code: 60, unit: 124 }],
      idea: [{ code: 240, unit: 124 }],
      clique: [
        { code: "CLQ_REH_003", unit: 70 },
        { code: "CLQ_REH_001", unit: 42 },
        { code: "CLQ_REH_002", unit: 9 },
        { code: "CLQ_REH_004", unit: 3 },
      ],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 152 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 32,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 68,
      details: [{ b_id: "FARM_000", count: 32, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230082_HERXHEIMER ──
  {
    code: "230082P01",
    starCode: "230082",
    name: [
      { code: "Kr", context: "헤르크스하이머" },
      { code: "En", context: "HERXHEIMER" },
    ],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 230,
      econ: [{ code: 60, unit: 179 }],
      idea: [{ code: 240, unit: 179 }],
      clique: [
        { code: "CLQ_REH_003", unit: 101 },
        { code: "CLQ_REH_001", unit: 61 },
        { code: "CLQ_REH_002", unit: 13 },
        { code: "CLQ_REH_004", unit: 4 },
      ],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 218 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 46,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 98,
      details: [{ b_id: "FARM_000", count: 46, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: ["MARQUISATE"],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230083_EHRENBERG ──
  {
    code: "230083P01",
    starCode: "230083",
    name: [
      { code: "Kr", context: "에렌베르크" },
      { code: "En", context: "EHRENBERG" },
    ],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "REH",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 170,
      econ: [{ code: 60, unit: 132 }],
      idea: [{ code: 240, unit: 132 }],
      clique: [
        { code: "CLQ_REH_003", unit: 74 },
        { code: "CLQ_REH_001", unit: 45 },
        { code: "CLQ_REH_002", unit: 9 },
        { code: "CLQ_REH_004", unit: 4 },
      ],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 161 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 34,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 72,
      details: [{ b_id: "FARM_000", count: 34, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230084_ALTAIR ──
  {
    code: "230084P01",
    starCode: "230084",
    name: [
      { code: "Kr", context: "알타이르" },
      { code: "En", context: "ALTAIR" },
    ],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: null,
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 700,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 200 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 280,
      details: [{ b_id: "FARM_000", count: 4, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230085_BETELGEUSE ──
  {
    code: "230085P01",
    starCode: "230085",
    name: [
      { code: "Kr", context: "베텔기우스" },
      { code: "En", context: "BETELGEUSE" },
    ],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: null,
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 550,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 150 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 220,
      details: [{ b_id: "FARM_000", count: 3, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230086_CANOPUS ──
  {
    code: "230086P01",
    starCode: "230086",
    name: [
      { code: "Kr", context: "카노프스" },
      { code: "En", context: "CANOPUS" },
    ],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: null,
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 550,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 150 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 220,
      details: [{ b_id: "FARM_000", count: 3, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230087_PROXIMA ──
  {
    code: "230087P01",
    starCode: "230087",
    name: [
      { code: "Kr", context: "프록시마" },
      { code: "En", context: "PROXIMA" },
    ],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: null,
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 650,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 200 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 260,
      details: [{ b_id: "FARM_000", count: 4, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230088_LONDRINA ──
  {
    code: "230088P01",
    starCode: "230088",
    name: [
      { code: "Kr", context: "론드리나" },
      { code: "En", context: "LONDRINA" },
    ],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: null,
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 250,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 100 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 100,
      details: [{ b_id: "FARM_000", count: 2, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230089_REZAVIK ──
  {
    code: "230089P01",
    starCode: "230089",
    name: [
      { code: "Kr", context: "레자빅" },
      { code: "En", context: "REZAVIK" },
    ],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "FPA",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 90,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ code: "FARMER", unit: 30 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 9,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 36,
      details: [{ id: "FARM_001", count: 1 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230090_FORISON ──
  {
    code: "230090P01",
    starCode: "230090",
    name: [
      { code: "Kr", context: "포리슨" },
      { code: "En", context: "FORISON" },
    ],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: null,
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 300,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 100 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 120,
      details: [{ b_id: "FARM_000", count: 2, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230091_PARAFARA ──
  {
    code: "230091P01",
    starCode: "230091",
    name: [
      { code: "Kr", context: "파라파라" },
      { code: "En", context: "PARAFARA" },
    ],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: null,
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 450,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 150 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 180,
      details: [{ b_id: "FARM_000", count: 3, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230092_SCHWARA ──
  {
    code: "230092P01",
    starCode: "230092",
    name: [
      { code: "Kr", context: "슈바라" },
      { code: "En", context: "SCHWARA" },
    ],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: null,
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 600,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ job_code: "FARMER", b_id: "FARM_000", unit: 150 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 0,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 240,
      details: [{ b_id: "FARM_000", count: 3, active: true, construct: 0 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },

  // ── 230093_NISHUHIDERS ──
  {
    code: "230093P01",
    starCode: "230093",
    name: [
      { code: "Kr", context: "닛슈우히더스" },
      { code: "En", context: "NISHUHIDERS" },
    ],
    /** @위치_및_물리적_특성 */
    pos: { x: 500, y: 500 },
    planetType: "terrestrial",
    /** @소속_상태 */
    faction: "FPA",
    /** @소속_담당관 */
    governor: "",
    commander: "",
    /** @인구 */
    pops: {
      unit: 110,
      econ: [],
      idea: [],
      clique: [],
      jobs: [{ code: "FARMER", unit: 30 }],
    },
    /** @자원_건설 */
    assets: {
      credit: 11,
      tax: 0,
      complain: 0,
      mil_supply: 0,
    },
    buildings: {
      maxSize: 44,
      details: [{ id: "FARM_001", count: 1 }],
    },
    /** @특성 */
    traits: [],
    /** @설명 */
    desc: [{ code: "Kr", context: "" }],
  },
];

export const PLANET_MAP = Object.fromEntries(PLANETS.map((p) => [p.code, p]));
