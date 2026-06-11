// ================================================================
//  jobData.js — 직업 마스터 데이터
//  경로: src/data/jobs/jobData.js
//  설계: jobs.md 참조
//  작성: 2026-05-29
// ================================================================

export const JOBS = [

  // ── 군사직 (military) ─────────────────────────────────────────
  {
    id: 'JB_M001', nameKr: '함대사령관', nameEn: 'Fleet Commander',
    category: 'military', faction: null,
    effects: { CMD: 5 },
    canCommand: true, canGovern: false,
    expToNext: null, nextJob: null,
    desc: '함대를 지휘하는 사령관.',
  },
  {
    id: 'JB_M002', nameKr: '부관', nameEn: 'Adjutant',
    category: 'military', faction: null,
    effects: {},
    canCommand: false, canGovern: false,
    expToNext: 500, nextJob: 'JB_M001',
    desc: '사령관을 보좌하는 부관.',
  },
  {
    id: 'JB_M003', nameKr: '참모', nameEn: 'Staff Officer',
    category: 'military', faction: null,
    effects: { INF: 5, MNG: 5 },
    canCommand: false, canGovern: false,
    expToNext: null, nextJob: null,
    desc: '내정·정보 보조를 담당하는 참모.',
  },
  {
    id: 'JB_M004', nameKr: '요새사령관', nameEn: 'Fortress Commander',
    category: 'military', faction: null,
    effects: { DEF: 10 },
    canCommand: true, canGovern: false,
    expToNext: null, nextJob: null,
    desc: '요새 방어를 지휘하는 사령관.',
  },
  {
    id: 'JB_M005', nameKr: '육전대장', nameEn: 'Ground Forces Commander',
    category: 'military', faction: null,
    effects: { GFG: 10 },
    canCommand: true, canGovern: false,
    expToNext: null, nextJob: null,
    desc: '행성 점령전을 지휘하는 장군.',
  },
  {
    id: 'JB_M006', nameKr: '우주함대사령장관', nameEn: 'Space Fleet Commander in Chief',
    category: 'military', faction: 'FPA',
    effects: { CMD: 10 },
    canCommand: true, canGovern: false,
    expToNext: null, nextJob: null,
    desc: '자유행성동맹 우주함대 최고 지휘관.',
  },
  {
    id: 'JB_M007', nameKr: '제국군원수', nameEn: 'Imperial Marshal',
    category: 'military', faction: 'REH',
    effects: { CMD: 10 },
    canCommand: true, canGovern: false,
    expToNext: null, nextJob: null,
    desc: '은하제국 최고위 군인.',
  },

  // ── 귀족직 (noble) — REH 전용 ──────────────────────────────────
  {
    id: 'JB_N001', nameKr: '공작', nameEn: 'Duke',
    category: 'noble', faction: 'REH',
    effects: { MMP: 10 },
    canCommand: true, canGovern: true,
    expToNext: null, nextJob: null,
    desc: '제국 최고위 귀족.',
  },
  {
    id: 'JB_N002', nameKr: '후작', nameEn: 'Marquis',
    category: 'noble', faction: 'REH',
    effects: { MMP: 7 },
    canCommand: true, canGovern: true,
    expToNext: null, nextJob: null,
    desc: '',
  },
  {
    id: 'JB_N003', nameKr: '백작', nameEn: 'Count',
    category: 'noble', faction: 'REH',
    effects: { MMP: 5 },
    canCommand: true, canGovern: true,
    expToNext: null, nextJob: null,
    desc: '',
  },
  {
    id: 'JB_N004', nameKr: '자작', nameEn: 'Viscount',
    category: 'noble', faction: 'REH',
    effects: { MMP: 3 },
    canCommand: true, canGovern: true,
    expToNext: null, nextJob: null,
    desc: '',
  },
  {
    id: 'JB_N005', nameKr: '남작', nameEn: 'Baron',
    category: 'noble', faction: 'REH',
    effects: { MMP: 2 },
    canCommand: false, canGovern: true,
    expToNext: null, nextJob: null,
    desc: '',
  },
  {
    id: 'JB_N006', nameKr: '기사', nameEn: 'Knight',
    category: 'noble', faction: 'REH',
    effects: {},
    canCommand: false, canGovern: false,
    expToNext: null, nextJob: null,
    desc: '',
  },

  // ── 제국 정치직 (political) — REH 전용 ─────────────────────────
  {
    id: 'JB_R001', nameKr: '황제', nameEn: 'Kaiser',
    category: 'political', faction: 'REH',
    effects: { MMP: 20, CSM: 10 },
    canCommand: false, canGovern: true,
    expToNext: null, nextJob: null,
    desc: '은하제국 황제.',
  },
  {
    id: 'JB_R002', nameKr: '제국재상', nameEn: 'Imperial Chancellor',
    category: 'political', faction: 'REH',
    effects: { MMP: 15 },
    canCommand: false, canGovern: true,
    expToNext: null, nextJob: null,
    desc: '제국 최고 행정직.',
  },
  {
    id: 'JB_R003', nameKr: '내무상서', nameEn: 'Minister of Interior',
    category: 'political', faction: 'REH',
    effects: { MNG: 10 },
    canCommand: false, canGovern: true,
    expToNext: null, nextJob: null,
    desc: '',
  },
  {
    id: 'JB_R004', nameKr: '군무상서', nameEn: 'Minister of Military Affairs',
    category: 'political', faction: 'REH',
    effects: { MMP: 10, CMD: 5 },
    canCommand: false, canGovern: true,
    expToNext: null, nextJob: null,
    desc: '',
  },
  {
    id: 'JB_R005', nameKr: '헌병총감', nameEn: 'Inspector General',
    category: 'political', faction: 'REH',
    effects: { INF: 10 },
    canCommand: false, canGovern: true,
    expToNext: null, nextJob: null,
    desc: '',
  },

  // ── 동맹 정치직 (political) — FPA 전용 ─────────────────────────
  {
    id: 'JB_F001', nameKr: '최고평의회의장', nameEn: 'Chairman of the High Council',
    category: 'political', faction: 'FPA',
    effects: { MMP: 20, CSM: 10 },
    canCommand: false, canGovern: true,
    expToNext: null, nextJob: null,
    desc: '자유행성동맹 최고 정치직.',
  },
  {
    id: 'JB_F002', nameKr: '국방위원장', nameEn: 'Chairman of Defense Committee',
    category: 'political', faction: 'FPA',
    effects: { MMP: 10, CMD: 5 },
    canCommand: false, canGovern: true,
    expToNext: null, nextJob: null,
    desc: '',
  },
  {
    id: 'JB_F003', nameKr: '각료', nameEn: 'Cabinet Member',
    category: 'political', faction: 'FPA',
    effects: { MMP: 5 },
    canCommand: false, canGovern: true,
    expToNext: null, nextJob: null,
    desc: '',
  },

  // ── 페잔직 (political) — PZN 전용 ──────────────────────────────
  {
    id: 'JB_P001', nameKr: '자치령총독', nameEn: 'Autonomous Governor',
    category: 'political', faction: 'PZN',
    effects: { MNG: 15, MMP: 10 },
    canCommand: false, canGovern: true,
    expToNext: null, nextJob: null,
    desc: '페잔 자치령 최고직.',
  },
  {
    id: 'JB_P002', nameKr: '페잔대리인', nameEn: 'Fezzan Agent',
    category: 'political', faction: 'PZN',
    effects: { INF: 10, MNG: 5 },
    canCommand: false, canGovern: false,
    expToNext: null, nextJob: null,
    desc: '페잔의 정보·외교 요원.',
  },

  // ── 종교직 (religious) — EAT 전용 ──────────────────────────────
  {
    id: 'JB_E001', nameKr: '총대주교', nameEn: 'Patriarch',
    category: 'religious', faction: 'EAT',
    effects: { CSM: 10 },
    canCommand: false, canGovern: false,
    expToNext: null, nextJob: null,
    desc: '지구교 최고직.',
  },
  {
    id: 'JB_E002', nameKr: '사제', nameEn: 'Priest',
    category: 'religious', faction: 'EAT',
    effects: {},
    canCommand: false, canGovern: false,
    expToNext: null, nextJob: null,
    desc: '',
  },

  // ── 군사 계급 (military_rank) ─────────────────────────────────
  {
    id: 'JB_MR001', nameKr: '원수', nameEn: 'Fleet Admiral',
    category: 'military_rank', faction: null,
    effects: { CMD: 8 },
    canCommand: true, canGovern: false,
    expToNext: null, nextJob: null,
    desc: '',
  },
  {
    id: 'JB_MR002', nameKr: '상급대장', nameEn: 'Senior Admiral',
    category: 'military_rank', faction: null,
    effects: { CMD: 6 },
    canCommand: true, canGovern: false,
    expToNext: null, nextJob: null,
    desc: '',
  },
  {
    id: 'JB_MR003', nameKr: '대장', nameEn: 'Admiral',
    category: 'military_rank', faction: null,
    effects: { CMD: 4 },
    canCommand: true, canGovern: false,
    expToNext: null, nextJob: null,
    desc: '',
  },
  {
    id: 'JB_MR004', nameKr: '중장', nameEn: 'Vice Admiral',
    category: 'military_rank', faction: null,
    effects: { CMD: 2 },
    canCommand: true, canGovern: false,
    expToNext: null, nextJob: null,
    desc: '',
  },
  {
    id: 'JB_MR005', nameKr: '소장', nameEn: 'Rear Admiral',
    category: 'military_rank', faction: null,
    effects: {},
    canCommand: true, canGovern: false,
    expToNext: null, nextJob: null,
    desc: '',
  },
  {
    id: 'JB_MR006', nameKr: '준장', nameEn: 'Commodore',
    category: 'military_rank', faction: null,
    effects: {},
    canCommand: false, canGovern: false,
    expToNext: null, nextJob: null,
    desc: '',
  },

  // ── 일반직 (civilian) ──────────────────────────────────────────
  {
    id: 'JB_C001', nameKr: '시민', nameEn: 'Civilian',
    category: 'civilian', faction: null,
    effects: {},
    canCommand: false, canGovern: false,
    expToNext: null, nextJob: null,
    desc: '',
  },
  {
    id: 'JB_C002', nameKr: '상인', nameEn: 'Merchant',
    category: 'civilian', faction: null,
    effects: { MNG: 5 },
    canCommand: false, canGovern: false,
    expToNext: null, nextJob: null,
    desc: '',
  },
  {
    id: 'JB_C003', nameKr: '학자', nameEn: 'Scholar',
    category: 'civilian', faction: null,
    effects: { INF: 5 },
    canCommand: false, canGovern: false,
    expToNext: null, nextJob: null,
    desc: '',
  },
]

// 빠른 조회
export const JOB_MAP = Object.fromEntries(JOBS.map(j => [j.id, j]))
export const JOBS_BY_CATEGORY = JOBS.reduce((acc, j) => {
  acc[j.category] = acc[j.category] || []
  acc[j.category].push(j)
  return acc
}, {})
