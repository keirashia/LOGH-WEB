// ================================================================
//  planetPopsJob.js — 행성 인구 직업 마스터 (불변)
//  경로: src/data/base/stars/planetPopsJob.js
//  작성: 2026-06-25
//
//  행성 pops.jobs에 배치되는 인구의 직업 분류 마스터.
//  buildings.details의 건물 슬롯(count)과 1:1로 연동되어, 건물이 늘어나면
//  그만큼의 인구가 해당 직업으로 자동 배치되는 구조.
//    예: FARM_003(농업시설) 21개 → pops.jobs에 FARMER 21 배치
//
//  pops.unit(총 인구) - jobs의 unit 합계 = 가용 인원(미배치, 유휴 인구)
//
//  ⚠️ TODO: 건물 1개당 배치 인구 비율이 전부 1:1(count=unit)로 가정되어 있음.
//    건물 종류에 따라 비율이 다를 수 있는지(예: 광산 1개당 5명 필요)는 추후 검토 필요.
//
//  category: primary(1차산업) | secondary(2차산업) | tertiary(3차산업) | military(군사) | construction(건설)
// ================================================================

export const PLANET_POPS_JOBS = [

  // ── 1차 산업 ──────────────────────────────────────────────
  {
    code: "FARMER",
    nameKr: "농부",
    nameEn: "Farmer",
    nameJp: "農夫",
    category: "primary",
    desc: "농업시설(FARM 계열)에 배치되어 식량을 생산하는 인구.",
    linkedBuildingCategory: "economic", // TODO: buildingData.js의 어떤 건물군과 연동되는지 구체화 필요
  },
  {
    code: "MINER",
    nameKr: "광부",
    nameEn: "Miner",
    nameJp: "鉱夫",
    category: "primary",
    desc: "광산(MINE)에 배치되어 광물 자원을 채굴하는 인구.",
    linkedBuildingCategory: "economic",
  },

  // ── 2차 산업 ──────────────────────────────────────────────
  {
    code: "WORKER",
    nameKr: "노동자",
    nameEn: "Worker",
    nameJp: "労働者",
    category: "secondary",
    desc: "공업단지(FACTORY) 등에 배치되어 공산품을 생산하는 인구.",
    linkedBuildingCategory: "economic",
  },
  {
    code: "ARMORER",
    nameKr: "조병공",
    nameEn: "Armorer",
    nameJp: "兵器工",
    category: "secondary",
    desc: "조병창(ARSENAL)에 배치되어 군수물자(mil_supply)를 생산하는 인구.",
    linkedBuildingCategory: "military",
  },

  // ── 3차 산업 ──────────────────────────────────────────────
  {
    code: "MERCHANT",
    nameKr: "상인",
    nameEn: "Merchant",
    nameJp: "商人",
    category: "tertiary",
    desc: "상업지구(COMMERCIAL_DISTRICT)에 배치되어 무역/상업 활동을 수행하는 인구.",
    linkedBuildingCategory: "economic",
  },
  {
    code: "ADMINISTRATOR",
    nameKr: "행정관",
    nameEn: "Administrator",
    nameJp: "行政官",
    category: "tertiary",
    desc: "행정중심(ADMIN_CENTER)에 배치되어 행성 통치 효율을 보조하는 인구.",
    linkedBuildingCategory: "administrative",
  },
  {
    code: "RESEARCHER",
    nameKr: "연구원",
    nameEn: "Researcher",
    nameJp: "研究員",
    category: "tertiary",
    desc: "연구소(RESEARCH_LAB)에 배치되어 기술 개발을 수행하는 인구.",
    linkedBuildingCategory: "research",
  },

  // ── 군사 ──────────────────────────────────────────────────
  {
    code: "GARRISON",
    nameKr: "수비대원",
    nameEn: "Garrison Trooper",
    nameJp: "守備隊員",
    category: "military",
    desc: "요새(FORTRESS 계열)에 배치되어 행성 방어를 담당하는 인구.",
    linkedBuildingCategory: "military",
  },

  // ── 건설 ──────────────────────────────────────────────────
  {
    code: "BUILDER",
    nameKr: "건설자",
    nameEn: "Builder",
    nameJp: "建設者",
    category: "construction",
    desc: "건설 진행 중(construct > 0)인 건물 슬롯에 임시로 배치되는 인구.\n      건설이 완료되면 해당 건물의 정식 직업(FARMER 등)으로 전환된다.",
    linkedBuildingCategory: null, // 모든 카테고리 건설에 공통 적용
  },

  // ── 미배정 ────────────────────────────────────────────────
  {
    code: "NONE",
    nameKr: "배정없음",
    nameEn: "None",
    nameJp: "未配置",
    category: "none",
    desc: "어떤 건물/직업에도 배치되지 않은 유휴 인구. pops.unit에서 다른 jobs 항목들의\n      unit 합계를 뺀 나머지가 사실상 이 상태와 같으나, 명시적으로 표기가 필요한\n      경우(예: UI 표시, 이벤트 조건)를 위해 코드로 등록함.",
    linkedBuildingCategory: null,
  },

]

export const PLANET_POPS_JOB_MAP = Object.fromEntries(
  PLANET_POPS_JOBS.map((j) => [j.code, j])
)

export const PLANET_POPS_JOB_BY_CATEGORY = PLANET_POPS_JOBS.reduce((acc, j) => {
  (acc[j.category] ??= []).push(j)
  return acc
}, {})
