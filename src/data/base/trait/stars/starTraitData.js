// ================================================================
//  starTraitData.js — 성계/행성 트레잇 마스터 (불변)
//  경로: src/data/base/trait/stars/starTraitData.js
//
//  category:
//    environment — 지형/자연환경 (주로 영구)
//    history     — 역사적 사건 결과 (영구/임시 혼재)
//    event       — 게임 중 이벤트로 부착 (주로 임시)
//    political   — 정치/사회 상황 (임시)
//    military    — 군사 상황 (임시)
//
//  target: 'planet' | 'star' | 'both'
//
//  effects 키:
//    population, industry, defense, morale, tax (수치 보정, 절대값)
//    incomeBonus    수입 보정 (배율, 예: 0.1 = +10%)
//    buildSpeed     건설 속도 보정 (턴, 예: -1 = 1턴 단축)
//
//  eventChance: { 이벤트ID: 확률 보정 (예: 0.1 = +10%) }
//  factionBonus: { 파벌ID: 지지율 보정 }
//
//  permanent: true  → 영구 (expiresAt 무시)
//             false → 임시 (expiresAt 턴수로 소멸)
// ================================================================

export const STAR_TRAITS = [

  // ── 환경 트레잇 (영구) ───────────────────────────────────
  {
    id:        'FERTILE_SOIL',
    name: [
      { code: "Kr", context: "비옥한 토지" },
      { code: "En", context: "Fertile Soil" },
    ],
    category:  'environment',
    target:    'planet',
    icon:      '🌾',
    rarity:    'common',
    desc:      [{ code: "Kr", context: `풍요로운 토양으로 농업 생산성이 높고 인구가 빠르게 증가한다.` }],
    permanent: true,
    effects: {
      population: 20,
      morale:      5,
      incomeBonus: 0.05,
    },
    eventChance:  { EVT_FAMINE: -0.15 },
    factionBonus: { REFORMIST: 5 },
  },
  {
    id:        'MINERAL_RICH',
    name: [
      { code: "Kr", context: "풍부한 광물" },
      { code: "En", context: "Mineral Rich" },
    ],
    category:  'environment',
    target:    'planet',
    icon:      '⛏️',
    rarity:    'uncommon',
    desc:      [{ code: "Kr", context: `지하자원이 풍부하여 중공업 발전에 유리하다.` }],
    permanent: true,
    effects: {
      industry:    25,
      incomeBonus:  0.10,
    },
    eventChance:  { EVT_LABOR_DISPUTE: 0.10 },
    factionBonus: { MILITARIST: 5, INDUSTRIALIST: 10 },
  },
  {
    id:        'NATURAL_FORTRESS',
    name: [
      { code: "Kr", context: "천연 요새" },
      { code: "En", context: "Natural Fortress" },
    ],
    category:  'environment',
    target:    'planet',
    icon:      '🏔️',
    rarity:    'uncommon',
    desc:      [{ code: "Kr", context: `험준한 지형으로 방어에 유리하다. 공략하기 매우 어렵다.` }],
    permanent: true,
    effects: {
      defense:     30,
      population: -10,
      industry:   -10,
    },
    eventChance:  { EVT_SIEGE: -0.20 },
    factionBonus: { MILITARIST: 10 },
  },
  {
    id:        'STRATEGIC_POSITION',
    name: [
      { code: "Kr", context: "전략적 요충지" },
      { code: "En", context: "Strategic Position" },
    ],
    category:  'environment',
    target:    'star',
    icon:      '🌀',
    rarity:    'rare',
    desc:      [{ code: "Kr", context: `항로의 교차점에 위치하여 모든 방면의 통행을 통제할 수 있다.` }],
    permanent: true,
    effects: {
      incomeBonus: 0.15,
      defense:     10,
    },
    eventChance:  { EVT_TRADE_DISPUTE: 0.10 },
    factionBonus: { MERCHANT: 15 },
  },
  {
    id:        'HARSH_ENVIRONMENT',
    name: [
      { code: "Kr", context: "가혹한 환경" },
      { code: "En", context: "Harsh Environment" },
    ],
    category:  'environment',
    target:    'planet',
    icon:      '🌪️',
    rarity:    'common',
    desc:      [{ code: "Kr", context: `극한의 기후와 환경으로 생활이 어렵다.` }],
    permanent: true,
    effects: {
      population: -15,
      morale:     -10,
      industry:   -10,
    },
    eventChance:  { EVT_MIGRATION: 0.15 },
    factionBonus: {},
  },
  {
    id:        'OCEANIC_WORLD',
    name: [
      { code: "Kr", context: "해양 행성" },
      { code: "En", context: "Oceanic World" },
    ],
    category:  'environment',
    target:    'planet',
    icon:      '🌊',
    rarity:    'uncommon',
    desc:      [{ code: "Kr", context: `광대한 바다로 뒤덮인 행성. 수산업과 해상 교역이 발달해 있다.` }],
    permanent: true,
    effects: {
      population:  10,
      incomeBonus:  0.08,
      defense:     -5,
    },
    eventChance:  {},
    factionBonus: { MERCHANT: 10 },
  },

  // ── 역사 트레잇 (영구) ───────────────────────────────────
  {
    id:        'ANCIENT_CAPITAL',
    name: [
      { code: "Kr", context: "유서 깊은 수도" },
      { code: "En", context: "Ancient Capital" },
    ],
    category:  'history',
    target:    'star',
    icon:      '🏛️',
    rarity:    'rare',
    desc:      [{ code: "Kr", context: `오랜 역사를 가진 문명의 중심지. 문화적 영향력이 광범위하게 퍼져 있다.` }],
    permanent: true,
    effects: {
      morale:      15,
      incomeBonus:  0.10,
    },
    eventChance:  { EVT_CULTURAL_REVIVAL: 0.20 },
    factionBonus: { TRADITIONALIST: 15, REFORMIST: -5 },
  },
  {
    id:        'MILITARY_TRADITION',
    name: [
      { code: "Kr", context: "군사적 전통" },
      { code: "En", context: "Military Tradition" },
    ],
    category:  'history',
    target:    'both',
    icon:      '⚔️',
    rarity:    'uncommon',
    desc:      [{ code: "Kr", context: `오랜 전쟁의 역사 속에서 강력한 군사 문화가 뿌리내렸다.` }],
    permanent: true,
    effects: {
      defense:     20,
      morale:       5,
      population:  -5,
    },
    eventChance:  { EVT_COUP: 0.10 },
    factionBonus: { MILITARIST: 20, PACIFIST: -10 },
  },
  {
    id:        'TRADE_HUB',
    name: [
      { code: "Kr", context: "무역 중심지" },
      { code: "En", context: "Trade Hub" },
    ],
    category:  'history',
    target:    'star',
    icon:      '💹',
    rarity:    'uncommon',
    desc:      [{ code: "Kr", context: `오래 전부터 상업 중심지로 발전해 교역이 활발하다.` }],
    permanent: true,
    effects: {
      industry:    15,
      incomeBonus:  0.20,
    },
    eventChance:  { EVT_MERCHANT_GUILD: 0.15 },
    factionBonus: { MERCHANT: 20, MILITARIST: -5 },
  },
  {
    id:        'IMPERIAL_HERITAGE',
    name: [
      { code: "Kr", context: "제국의 유산" },
      { code: "En", context: "Imperial Heritage" },
    ],
    category:  'history',
    target:    'both',
    icon:      '👑',
    rarity:    'rare',
    desc:      [{ code: "Kr", context: `제국 황가와 깊은 역사적 연관을 가진 성계. 황제에 대한 충성심이 강하다.` }],
    permanent: true,
    effects: {
      morale:      20,
    },
    eventChance:  { EVT_NOBLE_UPRISING: -0.20 },
    factionBonus: { IMPERIALIST: 25, REPUBLICAN: -15 },
  },
  {
    id:        'FRONTIER_SPIRIT',
    name: [
      { code: "Kr", context: "개척자 정신" },
      { code: "En", context: "Frontier Spirit" },
    ],
    category:  'history',
    target:    'both',
    icon:      '🚀',
    rarity:    'common',
    desc:      [{ code: "Kr", context: `변경 지대에서 살아남은 개척자들의 강인한 정신이 뿌리내렸다.` }],
    permanent: true,
    effects: {
      defense:     10,
      morale:       5,
      industry:     5,
    },
    eventChance:  { EVT_INDEPENDENCE_MOVEMENT: 0.10 },
    factionBonus: { AUTONOMIST: 15 },
  },

  // ── 이벤트 트레잇 (임시) ─────────────────────────────────
  {
    id:        'WAR_SCAR',
    name: [
      { code: "Kr", context: "전쟁의 상흔" },
      { code: "En", context: "War Scar" },
    ],
    category:  'event',
    target:    'both',
    icon:      '💥',
    rarity:    'common',
    desc:      [{ code: "Kr", context: `최근 전투로 인해 기반시설이 파괴되고 민심이 흉흉하다.` }],
    permanent: false,
    effects: {
      population: -20,
      industry:   -20,
      defense:    -15,
      morale:     -25,
    },
    eventChance:  { EVT_REBELLION: 0.20, EVT_PLAGUE: 0.10 },
    factionBonus: { PACIFIST: 15, MILITARIST: -10 },
  },
  {
    id:        'OCCUPATION',
    name: [
      { code: "Kr", context: "점령지" },
      { code: "En", context: "Under Occupation" },
    ],
    category:  'event',
    target:    'both',
    icon:      '🏴',
    rarity:    'common',
    desc:      [{ code: "Kr", context: `적군에게 점령된 상태. 저항운동이 활발하고 치안이 불안정하다.` }],
    permanent: false,
    effects: {
      morale:     -30,
      industry:   -15,
      tax:        -10,
    },
    eventChance:  { EVT_RESISTANCE: 0.30, EVT_REBELLION: 0.25 },
    factionBonus: { NATIONALIST: 30 },
  },
  {
    id:        'PROSPERITY',
    name: [
      { code: "Kr", context: "번영의 시대" },
      { code: "En", context: "Prosperity" },
    ],
    category:  'event',
    target:    'both',
    icon:      '✨',
    rarity:    'uncommon',
    desc:      [{ code: "Kr", context: `평화와 안정 속에서 경제가 번창하고 민심이 안정되어 있다.` }],
    permanent: false,
    effects: {
      population:  15,
      industry:    15,
      morale:      20,
      incomeBonus:  0.15,
    },
    eventChance:  { EVT_GOLDEN_AGE: 0.10 },
    factionBonus: { REFORMIST: 10, MERCHANT: 10 },
  },
  {
    id:        'PLAGUE',
    name: [
      { code: "Kr", context: "역병" },
      { code: "En", context: "Plague" },
    ],
    category:  'event',
    target:    'planet',
    icon:      '☣️',
    rarity:    'uncommon',
    desc:      [{ code: "Kr", context: `원인불명의 역병이 퍼져 인구가 급감하고 있다.` }],
    permanent: false,
    effects: {
      population: -30,
      morale:     -20,
      industry:   -10,
    },
    eventChance:  { EVT_FAMINE: 0.15, EVT_REBELLION: 0.10 },
    factionBonus: {},
  },
  {
    id:        'BLOCKADE',
    name: [
      { code: "Kr", context: "봉쇄" },
      { code: "En", context: "Blockade" },
    ],
    category:  'event',
    target:    'star',
    icon:      '🚫',
    rarity:    'common',
    desc:      [{ code: "Kr", context: `항로가 봉쇄되어 물자 공급이 차단된 상태. 경제와 민심에 심각한 타격을 주고 있다.` }],
    permanent: false,
    effects: {
      industry:   -20,
      morale:     -15,
      incomeBonus: -0.30,
    },
    eventChance:  { EVT_FAMINE: 0.20, EVT_SURRENDER: 0.15 },
    factionBonus: { PACIFIST: 20 },
  },

  // ── 정치 트레잇 (영구/임시 혼재) ─────────────────────────
  {
    id:        'MAIN_PLANET',
    name: [
      { code: "Kr", context: "주요 행성" },
      { code: "En", context: "Main Planet" },
    ],
    category:  'political',
    target:    'planet',
    icon:      '⭐',
    rarity:    'common',
    desc:      [{ code: "Kr", context: `소속 성계의 행정·치안의 중심지로 기능하는 행성이다. (구 planetsData.js의 main:true 필드 이전)` }],
    permanent: true,
    effects: {},
    eventChance:  {},
    factionBonus: {},
  },
  {
    id:        'CAPITAL',
    name: [
      { code: "Kr", context: "수도" },
      { code: "En", context: "Capital" },
    ],
    category:  'political',
    target:    'planet',
    icon:      '👑',
    rarity:    'rare',
    desc:      [{ code: "Kr", context: `국가의 수도로 기능하는 행성이다. 국가당 1곳만 존재하며, 정부 기관과 통치 기반이 집중되어 있다.` }],
    permanent: true,
    effects: {},
    eventChance:  {},
    factionBonus: {},
  },
  {
    id:        'IMPERIAL_DEMESNE',
    name: [
      { code: "Kr", context: "황제직할령" },
      { code: "En", context: "Imperial Demesne" },
    ],
    category:  'political',
    target:    'planet',
    icon:      '🏛️',
    rarity:    'rare',
    desc:      [{ code: "Kr", context: `황제(군주)가 직접 영유하는 영지. 별도의 귀족 영주 없이 국가가 직접 통치한다.` }],
    permanent: true,
    effects: {},
    eventChance:  {},
    factionBonus: {},
  },
  {
    id:        'DUCHY',
    name: [
      { code: "Kr", context: "공작령" },
      { code: "En", context: "Duchy" },
    ],
    category:  'political',
    target:    'planet',
    icon:      '🎖️',
    rarity:    'rare',
    desc:      [{ code: "Kr", context: `공작 작위를 가진 귀족의 영지.` }],
    permanent: true,
    effects: {},
    eventChance:  {},
    factionBonus: {},
  },
  {
    id:        'MARQUISATE',
    name: [
      { code: "Kr", context: "후작령" },
      { code: "En", context: "Marquisate" },
    ],
    category:  'political',
    target:    'planet',
    icon:      '🎖️',
    rarity:    'uncommon',
    desc:      [{ code: "Kr", context: `후작 작위를 가진 귀족의 영지.` }],
    permanent: true,
    effects: {},
    eventChance:  {},
    factionBonus: {},
  },
  {
    id:        'COUNTY',
    name: [
      { code: "Kr", context: "백작령" },
      { code: "En", context: "County" },
    ],
    category:  'political',
    target:    'planet',
    icon:      '🎖️',
    rarity:    'uncommon',
    desc:      [{ code: "Kr", context: `백작 작위를 가진 귀족의 영지.` }],
    permanent: true,
    effects: {},
    eventChance:  {},
    factionBonus: {},
  },
  {
    id:        'VISCOUNTY',
    name: [
      { code: "Kr", context: "자작령" },
      { code: "En", context: "Viscounty" },
    ],
    category:  'political',
    target:    'planet',
    icon:      '🎖️',
    rarity:    'common',
    desc:      [{ code: "Kr", context: `자작 작위를 가진 귀족의 영지.` }],
    permanent: true,
    effects: {},
    eventChance:  {},
    factionBonus: {},
  },
  {
    id:        'BARONY',
    name: [
      { code: "Kr", context: "남작령" },
      { code: "En", context: "Barony" },
    ],
    category:  'political',
    target:    'planet',
    icon:      '🎖️',
    rarity:    'common',
    desc:      [{ code: "Kr", context: `남작 작위를 가진 귀족의 영지.` }],
    permanent: true,
    effects: {},
    eventChance:  {},
    factionBonus: {},
  },
  {
    id:        'MILITARIST_SURGE',
    name: [
      { code: "Kr", context: "군국주의 열풍" },
      { code: "En", context: "Militarist Surge" },
    ],
    category:  'political',
    target:    'both',
    icon:      '🎖️',
    rarity:    'common',
    desc:      [{ code: "Kr", context: `잇따른 전쟁으로 군사력 강화를 요구하는 여론이 들끓고 있다.` }],
    permanent: false,
    effects: {
      defense:  10,
      tax:       5,
      morale:   -5,
    },
    eventChance:  { EVT_COUP: 0.15, EVT_CONSCRIPTION: 0.20 },
    factionBonus: { MILITARIST: 25, PACIFIST: -20 },
  },
  {
    id:        'REFORM_MOVEMENT',
    name: [
      { code: "Kr", context: "개혁 운동" },
      { code: "En", context: "Reform Movement" },
    ],
    category:  'political',
    target:    'both',
    icon:      '📜',
    rarity:    'uncommon',
    desc:      [{ code: "Kr", context: `기존 체제에 반발하는 개혁 세력이 성장하고 있다.` }],
    permanent: false,
    effects: {
      morale:    -5,
      incomeBonus: -0.05,
    },
    eventChance:  { EVT_COUP: 0.20, EVT_REFORM: 0.25 },
    factionBonus: { REFORMIST: 30, TRADITIONALIST: -20 },
  },
  {
    id:        'NOBLE_DOMINANCE',
    name: [
      { code: "Kr", context: "귀족 지배" },
      { code: "En", context: "Noble Dominance" },
    ],
    category:  'political',
    target:    'star',
    icon:      '🏰',
    rarity:    'uncommon',
    desc:      [{ code: "Kr", context: `강력한 귀족 세력이 성계 행정을 장악하고 있다.` }],
    permanent: false,
    effects: {
      defense:     10,
      tax:         -5,
      incomeBonus: -0.10,
    },
    eventChance:  { EVT_NOBLE_UPRISING: 0.15, EVT_LIPPSTADT: 0.10 },
    factionBonus: { IMPERIALIST: 10, TRADITIONALIST: 20, REFORMIST: -20 },
  },

  // ── 군사 트레잇 (임시) ───────────────────────────────────
  {
    id:        'FORTIFIED',
    name: [
      { code: "Kr", context: "요새화" },
      { code: "En", context: "Fortified" },
    ],
    category:  'military',
    target:    'both',
    icon:      '🛡️',
    rarity:    'common',
    desc:      [{ code: "Kr", context: `집중적인 군사 투자로 방어 시설이 강화되어 있다.` }],
    permanent: false,
    effects: {
      defense:     25,
      industry:    -5,
      incomeBonus: -0.05,
    },
    eventChance:  {},
    factionBonus: { MILITARIST: 10 },
  },
  {
    id:        'DEVASTATED',
    name: [
      { code: "Kr", context: "초토화" },
      { code: "En", context: "Devastated" },
    ],
    category:  'military',
    target:    'both',
    icon:      '🔥',
    rarity:    'common',
    desc:      [{ code: "Kr", context: `무차별 폭격으로 지표면의 시설 대부분이 파괴되었다.` }],
    permanent: false,
    effects: {
      population: -40,
      industry:   -40,
      defense:    -30,
      morale:     -35,
    },
    eventChance:  { EVT_REBELLION: 0.30, EVT_EXODUS: 0.20 },
    factionBonus: { PACIFIST: 30, MILITARIST: -20 },
  },
  {
    id:        'GARRISON_CITY',
    name: [
      { code: "Kr", context: "주둔 도시" },
      { code: "En", context: "Garrison City" },
    ],
    category:  'military',
    target:    'planet',
    icon:      '🪖',
    rarity:    'common',
    desc:      [{ code: "Kr", context: `대규모 주둔군이 배치되어 치안이 안정되나 민간 경제는 위축되어 있다.` }],
    permanent: false,
    effects: {
      defense:     20,
      morale:       5,
      industry:   -10,
      incomeBonus: -0.08,
    },
    eventChance:  { EVT_REBELLION: -0.20 },
    factionBonus: { MILITARIST: 15, MERCHANT: -10 },
  },
]

// ── 트레잇 유틸 ──────────────────────────────────────────────
export const TRAIT_MAP = Object.fromEntries(
  STAR_TRAITS.map(t => [t.id, t])
)

// 카테고리별 분류
export const TRAIT_BY_CATEGORY = STAR_TRAITS.reduce((acc, t) => {
  if (!acc[t.category]) acc[t.category] = []
  acc[t.category].push(t)
  return acc
}, {})

// 대상별 분류
export const TRAIT_BY_TARGET = STAR_TRAITS.reduce((acc, t) => {
  const targets = t.target === 'both' ? ['planet', 'star'] : [t.target]
  targets.forEach(tgt => {
    if (!acc[tgt]) acc[tgt] = []
    acc[tgt].push(t)
  })
  return acc
}, {})
