// ================================================================
//  buildingData.js — 건물 마스터 (불변)
//  경로: src/data/base/buildingData.js
//  작성: 2026-06-24
//
//  행성에 건설 가능한 건물 목록. planetsData.js의 type/fortress 필드를
//  대체하는 체계 중 "시설물" 쪽 절반을 담당 (정체성/성향 쪽은
//  trait/stars/starTraitData.js가 담당 — 예: MAIN_PLANET).
//
//  요새(FORTRESS)도 고유 건물이 아니라 "건설 가능한 건물 카테고리"로 설계함.
//  즉 가이에스부르크/이제르론처럼 이미 존재하는 요새뿐 아니라, 플레이어가
//  임의의 행성에 새로 요새를 건설할 수 있음.
//
//  category:
//    military       — 군사 시설 (요새, 조병창, 조선소)
//    economic       — 경제 시설 (농업, 광업, 공업)
//    administrative — 행정 시설 (통치 효율)
//    research       — 연구 시설 (기술 개발)
//
//  effects 키: starTraitData.js와 동일 체계 사용
//    population, industry, defense, morale, tax (수치 보정, 절대값)
//    incomeBonus    수입 보정 (배율, 예: 0.1 = +10%, -1.0 = 전면 중단)
//    buildSpeed     건설 속도 보정 (다른 건물에 대한, 턴)
//
//  buildCost: 건설 비용 (treasury 소비량)
//  buildTime: 건설 기간 (턴)
//  maxCount:  같은 행성에 동시 보유 가능한 최대 개수
//  buildable: true  → 플레이어가 treasury를 소모해 신규 건설 가능한 일반 건물
//             false → 건설 불가능한 고유 시설. 원작에 이미 존재하는 특정 행성에만
//                      등록되며, 새로 지을 수 없음. (예: 이제르론 요새, 가이에스부르크 요새)
//                      파괴 시 복구 불가 또는 별도 메커니즘(탈취 등)으로만 소유권 이전.
//
//  ⚠️ TODO: buildCost/buildTime 수치는 전부 임시값. treasury 시스템이
//    본격적으로 가동되기 전까지는 자리만 채운 상태이며, 추후 경제 밸런스
//    조정 단계에서 재산정 필요. (2026-06-24, 요청에 따라 우선 구조만 확정)
// ================================================================

export const BUILDINGS = [

  // ── 군사 (military) ──────────────────────────────────────
  {
    id: "FORTRESS",
    nameKr: "요새",
    nameEn: "Fortress",
    nameJp: "要塞",
    category: "military",
    desc: "행성 궤도에 건설하는 대규모 군사 요새. 방어력이 크게 상승하나 민간 경제활동이 제한된다.",
    effects: {
      defense: 80,
      incomeBonus: -1.0, // TODO: 수치 임시값. 가이에스부르크/이제르론 등 기존 요새 사례 참고하여 전면 중단으로 설정
    },
    buildCost: 50000, // TODO: 임시값, 경제 밸런스 조정 단계에서 재산정
    buildTime: 12,    // TODO: 임시값
    maxCount: 1,
    buildable: true,
  },
  {
    id: "ARSENAL",
    nameKr: "조병창",
    nameEn: "Arsenal",
    nameJp: "兵器廠",
    category: "military",
    desc: "함선 무장과 군수물자를 생산하는 시설. 주둔 함대의 보급 효율을 높인다.",
    effects: {
      defense: 15,
      industry: 20, // TODO: 임시값
    },
    buildCost: 20000, // TODO: 임시값
    buildTime: 8,     // TODO: 임시값
    maxCount: 1,
    buildable: true,
  },
  {
    id: "SHIPYARD",
    nameKr: "조선소",
    nameEn: "Shipyard",
    nameJp: "造船所",
    category: "military",
    desc: "함선을 건조하는 시설. 보유 시 해당 행성에서 신규 함선 건조가 가능해진다.",
    effects: {
      industry: 30, // TODO: 임시값
      buildSpeed: -1, // 다른 건물 건설 속도 1턴 단축 (조선 인프라 공유 효과로 설정, TODO 검토 필요)
    },
    buildCost: 30000, // TODO: 임시값
    buildTime: 10,    // TODO: 임시값
    maxCount: 1,
    buildable: true,
  },

  // ── 경제 (economic) ──────────────────────────────────────
  {
    id: "FARM",
    nameKr: "농업시설",
    nameEn: "Farm",
    nameJp: "農業施設",
    category: "economic",
    desc: "식량을 생산하여 인구 부양력을 높인다.",
    effects: {
      population: 10, // TODO: 임시값
    },
    buildCost: 5000,  // TODO: 임시값
    buildTime: 4,     // TODO: 임시값
    maxCount: 3,
    buildable: true,
  },
  {
    id: "MINE",
    nameKr: "광산",
    nameEn: "Mine",
    nameJp: "鉱山",
    category: "economic",
    desc: "광물 자원을 채굴하여 산업 생산에 투입한다.",
    effects: {
      industry: 15, // TODO: 임시값
      incomeBonus: 0.1, // TODO: 임시값
    },
    buildCost: 8000,  // TODO: 임시값
    buildTime: 5,     // TODO: 임시값
    maxCount: 2,
    buildable: true,
  },
  {
    id: "FACTORY",
    nameKr: "공업단지",
    nameEn: "Factory",
    nameJp: "工業地帯",
    category: "economic",
    desc: "공산품을 생산하는 산업 시설. 행성 전체 산업력을 끌어올린다.",
    effects: {
      industry: 25, // TODO: 임시값
      incomeBonus: 0.15, // TODO: 임시값
    },
    buildCost: 15000, // TODO: 임시값
    buildTime: 6,     // TODO: 임시값
    maxCount: 2,
    buildable: true,
  },
  {
    id: "COMMERCIAL_DISTRICT",
    nameKr: "상업지구",
    nameEn: "Commercial District",
    nameJp: "商業地区",
    category: "economic",
    desc: "무역과 상업 활동이 이루어지는 구역. 페잔처럼 무역 중심지인 행성에 다수 건설된다.",
    effects: {
      incomeBonus: 0.05, // TODO: 임시값. 건물 1개당 보정치이므로 다수 보유 시 합산 적용 방식 추후 확정 필요
    },
    buildCost: 6000,  // TODO: 임시값
    buildTime: 3,     // TODO: 임시값
    maxCount: 99,     // 페잔처럼 다수 보유 가능한 건물 (다른 건물들보다 큰 한도)
    buildable: true,
  },

  // ── 행정 (administrative) ────────────────────────────────
  {
    id: "ADMIN_CENTER",
    nameKr: "행정중심",
    nameEn: "Administrative Center",
    nameJp: "行政中心",
    category: "administrative",
    desc: "행성 통치 효율을 높이는 행정 시설. 부패도 누적을 억제하는 효과가 있다.",
    effects: {
      morale: 5, // TODO: 임시값
      // TODO: corruption 억제 효과는 별도 설계 필요 (planetsData.js의 corruption 필드와 연동)
    },
    buildCost: 12000, // TODO: 임시값
    buildTime: 6,     // TODO: 임시값
    maxCount: 1,
    buildable: true,
  },

  // ── 연구 (research) ──────────────────────────────────────
  {
    id: "RESEARCH_LAB",
    nameKr: "연구소",
    nameEn: "Research Lab",
    nameJp: "研究所",
    category: "research",
    desc: "기술 개발을 수행하는 시설. TODO: 기술/연구 시스템 자체가 아직 미설계 상태로,\n      현재는 자리만 채운 건물.",
    effects: {
      // TODO: 연구 포인트 생산 등 effects는 기술 시스템 설계 후 확정
    },
    buildCost: 18000, // TODO: 임시값
    buildTime: 8,     // TODO: 임시값
    maxCount: 1,
    buildable: true,
  },

  // ── 특수 (건설 불가능, 원작 고유 시설) ───────────────────
  // 이미 존재하는 특정 행성에만 등록되며, 신규 건설 불가.
  {
    id: "ISERLOHN_FORTRESS",
    nameKr: "이제르론 요새",
    nameEn: "Iserlohn Fortress",
    nameJp: "イゼルローン要塞",
    category: "military",
    desc: "이제르론 회랑에 위치한 난공불락의 인공 요새. 직경 60km, 요새주포 '뇌신의 망치(トゥール・ハンマー)' 보유.",
    effects: {
      defense: 999, // TODO: 임시값. 일반 FORTRESS(80)와의 격차 비율은 추후 밸런스 조정 단계에서 재검토
      incomeBonus: -1.0,
    },
    buildCost: null,
    buildTime: null,
    maxCount: 1,
    buildable: false,
  },
  {
    id: "GAIESBURG_FORTRESS",
    nameKr: "가이에스부르크 요새",
    nameEn: "Gaiesburg Fortress",
    nameJp: "ガイエスブルク要塞",
    category: "military",
    desc: "은하제국의 군사 거점으로 건설된 인공 요새. 직경 45km. 리프슈타트 전역 당시 이동 요새로 개조되어 이제르론 공략에 투입되었다.",
    effects: {
      defense: 900, // TODO: 임시값
      incomeBonus: -1.0,
    },
    buildCost: null,
    buildTime: null,
    maxCount: 1,
    buildable: false,
  },
  {
    id: "GARMISCH_FORTRESS",
    nameKr: "가르미슈 요새",
    nameEn: "Garmisch Fortress",
    nameJp: "ガルミッシュ要塞",
    category: "military",
    desc: "제국 영내의 군사 거점. 구형 인공천체. 리프슈타트 전역 당시 문벌귀족연합의 거점 중 하나였다.",
    effects: {
      defense: 400, // TODO: 임시값. 요새주포 없음(작중 설정 반영)
      incomeBonus: -1.0,
    },
    buildCost: null,
    buildTime: null,
    maxCount: 1,
    buildable: false,
  },
  {
    id: "RENTENBERG_FORTRESS",
    nameKr: "렌텐베르크 요새",
    nameEn: "Rentenberg Fortress",
    nameJp: "レンテンベルク要塞",
    category: "military",
    desc: "제국 영내의 군사 거점. 소행성을 깎아 만든 시설로, 표준적인 요새 규모를 갖춘다. 요새주포 없음(작중 설정 반영).",
    effects: {
      defense: 400, // TODO: 임시값
      incomeBonus: -1.0,
    },
    buildCost: null,
    buildTime: null,
    maxCount: 1,
    buildable: false,
  },

]

export const BUILDING_MAP = Object.fromEntries(BUILDINGS.map((b) => [b.id, b]))

export const BUILDING_BY_CATEGORY = BUILDINGS.reduce((acc, b) => {
  (acc[b.category] ??= []).push(b)
  return acc
}, {})
