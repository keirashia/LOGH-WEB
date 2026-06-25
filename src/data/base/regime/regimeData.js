// ================================================================
//  regimeData.js — 정치/경제 체제 조합 → 국가 타이틀
//  경로: src/data/base/regime/regimeData.js
//  입력: ideologyCode + economyCode
//  출력: factionTitle / leaderTitle / 게임 수치 보정 / taxType
//  작성: 2026-06-01 / 개편: 2026-06-24
//
//  ⚠️ 2026-06-24 개편 내역:
//    1) taxType 필드 신규 추가. 국가의 징세 메커니즘을 구분.
//       - 'feudal'      : 봉건형. 행성 세금분이 그 행성 pops.clique 지지 비율대로
//                         쪼개져 각 clique의 homeworld(cliqueData.js 참조) 금고에 누적.
//                         미지지 비율분은 소멸. (제국형 다단계 영주 상납을 clique
//                         지지율로 단순화하여 표현)
//       - 'centralized' : 중앙집권형. 행성 세금분이 clique 분배 없이 국가 중앙금고로
//                         직접 귀속. (동맹형)
//    2) ideologyRange 경계값 중복 제거. 기존에는 225/240/255/285 같은 경계값이
//       인접한 두 구간에 동시 포함되어 있었음(예: [195,225]와 [225,240] 둘 다 225 포함).
//       Array.find()가 첫 매칭만 반환해 실질적 오류는 없었으나, 명확성을 위해
//       각 구간의 시작점을 +1 하여 경계 중복을 제거함.
//    3) IDEOLOGY_DATA에 정의되어 있으나 REGIMES에서 매칭되지 않던 8개 이념
//       (1 무정부상태/8 아나키즘/15 직접민주주의/22 협동조합주의/42 기술관료제/
//        50 과두제/58 기업국가/70 귀족공화제) 에 대한 REGIMES 항목 신규 추가.
//       (※ economy 8개 코드는 기존부터 전부 매칭되어 있어 추가 작업 불필요)
// ================================================================

export const REGIMES = [

  // ── 무질서/과도기 계열 (신규 보강) ──────────────────────────────
  {
    ideologyRange: [1, 1],       // 무정부 상태
    economyRange:  [20, 300],    // 전 범위 (경제체제 자체가 안정적으로 정의되지 않는 상태)
    factionTitle:  { kr: '무정부 지대', en: 'Anarchic Zone', jp: '無政府地帯' },
    leaderTitle:   { kr: '군벌', en: 'Warlord', jp: '軍閥' },
    taxRate:       { min: 0, max: 30 },
    taxType:       'centralized',
    growth:        -0.2,
    loyalty:       -0.2,
    military:      -0.1,
  },
  {
    ideologyRange: [8, 8],       // 아나키즘
    economyRange:  [20, 300],
    factionTitle:  { kr: '자유연합체', en: 'Anarchist Federation', jp: '自由連合体' },
    leaderTitle:   { kr: '대표자', en: 'Delegate', jp: '代表者' },
    taxRate:       { min: 0, max: 20 },
    taxType:       'centralized',
    growth:        -0.1,
    loyalty:       0,
    military:      -0.2,
  },

  // ── 공화 + 직접민주/협동조합 계열 (신규 보강) ────────────────────
  {
    ideologyRange: [15, 15],     // 직접민주주의
    economyRange:  [20, 220],    // 자급자족~사회주의
    factionTitle:  { kr: '시민평의회', en: "Citizens' Council", jp: '市民評議会' },
    leaderTitle:   { kr: '평의장', en: 'Council Chair', jp: '評議長' },
    taxRate:       { min: 10, max: 35 },
    taxType:       'centralized',
    growth:        0.05,
    loyalty:       0.1,
    military:      -0.1,
  },
  {
    ideologyRange: [22, 22],     // 협동조합주의
    economyRange:  [20, 220],
    factionTitle:  { kr: '협동조합연방', en: 'Cooperative Federation', jp: '協同組合連邦' },
    leaderTitle:   { kr: '연방의장', en: 'Federal Chair', jp: '連邦議長' },
    taxRate:       { min: 15, max: 40 },
    taxType:       'centralized',
    growth:        0.05,
    loyalty:       0.1,
    military:      -0.1,
  },

  // ── 공화 + 자본주의 계열 ──────────────────────────────────────
  {
    ideologyRange: [100, 100],   // 민주공화제
    economyRange:  [100, 140],   // 자본주의~혼합경제
    factionTitle:  { kr: '자유민주공화국', en: 'Liberal Democratic Republic', jp: '自由民主共和国' },
    leaderTitle:   { kr: '대통령', en: 'President', jp: '大統領' },
    taxRate:       { min: 10, max: 40 },
    taxType:       'centralized',
    growth:        0.1,
    loyalty:       0.1,
    military:      0,
  },
  {
    ideologyRange: [115, 130],   // 신대통령제~대통령독재
    economyRange:  [100, 180],   // 자본주의~국가자본주의
    factionTitle:  { kr: '대통령 공화국', en: 'Presidential Republic', jp: '大統領共和国' },
    leaderTitle:   { kr: '대통령', en: 'President', jp: '大統領' },
    taxRate:       { min: 20, max: 55 },
    taxType:       'centralized',
    growth:        0,
    loyalty:       0,
    military:      0.1,
  },

  // ── 공화 + 기술관료/과두/기업 계열 (신규 보강) ───────────────────
  {
    ideologyRange: [42, 42],     // 기술관료제
    economyRange:  [100, 260],   // 자본주의~계획경제
    factionTitle:  { kr: '기술관료국', en: 'Technocracy', jp: 'テクノクラシー' },
    leaderTitle:   { kr: '수석기사장', en: 'Chief Technocrat', jp: '首席技師長' },
    taxRate:       { min: 25, max: 55 },
    taxType:       'centralized',
    growth:        0.15,
    loyalty:       0,
    military:      0,
  },
  {
    ideologyRange: [50, 50],     // 과두제
    economyRange:  [60, 220],    // 봉건경제~사회주의
    factionTitle:  { kr: '과두공화국', en: 'Oligarchic Republic', jp: '寡頭共和国' },
    leaderTitle:   { kr: '원로회 의장', en: 'Chairman of the Council', jp: '元老会議長' },
    taxRate:       { min: 25, max: 60 },
    taxType:       'feudal',
    growth:        0,
    loyalty:       -0.1,
    military:      0.1,
  },
  {
    ideologyRange: [58, 58],     // 기업국가
    economyRange:  [100, 180],   // 자본주의~국가자본주의
    factionTitle:  { kr: '기업연합체', en: 'Corporate Conglomerate', jp: '企業連合体' },
    leaderTitle:   { kr: '최고경영자', en: 'Chief Executive', jp: '最高経営責任者' },
    taxRate:       { min: 15, max: 45 },
    taxType:       'centralized',
    growth:        0.2,
    loyalty:       -0.1,
    military:      -0.1,
  },
  {
    ideologyRange: [70, 70],     // 귀족공화제
    economyRange:  [60, 180],    // 봉건경제~국가자본주의
    factionTitle:  { kr: '귀족공화국', en: 'Aristocratic Republic', jp: '貴族共和国' },
    leaderTitle:   { kr: '집정관', en: 'Consul', jp: '執政官' },
    taxRate:       { min: 25, max: 55 },
    taxType:       'feudal',
    growth:        0,
    loyalty:       0,
    military:      0.1,
  },

  // ── 공화 + 사회주의/공산주의 계열 ────────────────────────────
  {
    ideologyRange: [35, 35],     // 민주집중제
    economyRange:  [260, 300],   // 계획경제~공산주의
    factionTitle:  { kr: '인민공화국', en: "People's Republic", jp: '人民共和国' },
    leaderTitle:   { kr: '서기장', en: 'General Secretary', jp: '書記長' },
    taxRate:       { min: 50, max: 90 },
    taxType:       'centralized',
    growth:        -0.1,
    loyalty:       0.2,
    military:      0.2,
  },
  {
    ideologyRange: [145, 160],   // 일당독재~군정
    economyRange:  [220, 300],   // 사회주의~공산주의
    factionTitle:  { kr: '혁명공화국', en: 'Revolutionary Republic', jp: '革命共和国' },
    leaderTitle:   { kr: '혁명위원장', en: 'Revolutionary Chairman', jp: '革命委員長' },
    taxRate:       { min: 40, max: 85 },
    taxType:       'centralized',
    growth:        -0.1,
    loyalty:       0.1,
    military:      0.3,
  },

  // ── 혼합 체제 ─────────────────────────────────────────────────
  {
    ideologyRange: [180, 180],   // 혼합체제
    economyRange:  [100, 180],   // 자본주의~국가자본주의
    factionTitle:  { kr: '자치령', en: 'Autonomous Dominion', jp: '自治領' },
    leaderTitle:   { kr: '총독', en: 'Governor', jp: '総督' },
    taxRate:       { min: 15, max: 50 },
    taxType:       'centralized',
    growth:        0.2,
    loyalty:       0.1,
    military:      -0.1,
  },

  // ── 군주 + 자본주의/혼합 계열 ────────────────────────────────
  {
    ideologyRange: [195, 225],   // 근대군주제~입헌군주제
    economyRange:  [100, 180],   // 자본주의~국가자본주의
    factionTitle:  { kr: '입헌왕국', en: 'Constitutional Kingdom', jp: '立憲王国' },
    leaderTitle:   { kr: '국왕', en: 'King', jp: '国王' },
    taxRate:       { min: 20, max: 50 },
    taxType:       'centralized',
    growth:        0.1,
    loyalty:       0.1,
    military:      0.1,
  },

  // ── 군주 + 중상주의/봉건 계열 ────────────────────────────────
  {
    ideologyRange: [226, 240],   // 입헌군주제 초과~전제군주제 (경계값 중복 제거: 225→226)
    economyRange:  [60, 140],    // 봉건경제~혼합경제
    factionTitle:  { kr: '제국', en: 'Empire', jp: '帝国' },
    leaderTitle:   { kr: '황제', en: 'Kaiser', jp: '皇帝' },
    taxRate:       { min: 30, max: 70 },
    taxType:       'feudal',
    growth:        0,
    loyalty:       0,
    military:      0.2,
  },
  {
    ideologyRange: [241, 255],   // 전제군주제 초과~절대왕정 (경계값 중복 제거: 240→241)
    economyRange:  [60, 140],    // 봉건경제~혼합경제
    factionTitle:  { kr: '전제 제국', en: 'Absolute Empire', jp: '専制帝国' },
    leaderTitle:   { kr: '황제', en: 'Kaiser', jp: '皇帝' },
    taxRate:       { min: 30, max: 80 },
    taxType:       'feudal',
    growth:        -0.1,
    loyalty:       -0.1,
    military:      0.3,
  },

  // ── 신성/극단 군주 계열 ───────────────────────────────────────
  {
    ideologyRange: [256, 285],   // 절대왕정 초과~황제독재 (경계값 중복 제거: 255→256)
    economyRange:  [60, 180],    // 봉건~국가자본주의
    factionTitle:  { kr: '신성제국', en: 'Sacred Empire', jp: '神聖帝国' },
    leaderTitle:   { kr: '신성황제', en: 'Sacred Kaiser', jp: '神聖皇帝' },
    taxRate:       { min: 40, max: 90 },
    taxType:       'feudal',
    growth:        -0.2,
    loyalty:       -0.1,
    military:      0.3,
  },
  {
    ideologyRange: [286, 300],   // 황제독재 초과~신성황제 (경계값 중복 제거: 285→286)
    economyRange:  [20, 300],    // 전 범위
    factionTitle:  { kr: '신권제국', en: 'Theocratic Empire', jp: '神権帝国' },
    leaderTitle:   { kr: '신황', en: 'God-Emperor', jp: '神皇' },
    taxRate:       { min: 50, max: 100 },
    taxType:       'feudal',
    growth:        -0.2,
    loyalty:       0.2,
    military:      0.2,
  },

  // ── 신권 계열 (지구교 등) ─────────────────────────────────────
  {
    ideologyRange: [85, 85],     // 신권정치
    economyRange:  [20, 300],    // 전 범위
    factionTitle:  { kr: '신정국가', en: 'Theocracy', jp: '神政国家' },
    leaderTitle:   { kr: '총대주교', en: 'Patriarch', jp: '総大主교' },
    taxRate:       { min: 30, max: 70 },
    taxType:       'centralized',
    growth:        0,
    loyalty:       0.3,
    military:      0.1,
  },

  // ── 기본값 (매칭 없을 경우) ───────────────────────────────────
  {
    ideologyRange: [0, 300],
    economyRange:  [0, 300],
    factionTitle:  { kr: '국가', en: 'State', jp: '国家' },
    leaderTitle:   { kr: '지도자', en: 'Leader', jp: '指導者' },
    taxRate:       { min: 20, max: 60 },
    taxType:       'centralized',
    growth:        0,
    loyalty:       0,
    military:      0,
    isDefault:     true,
  },
]

// 조합 조회 유틸
export function getRegime(ideologyCode, economyCode) {
  return REGIMES.find(r =>
    !r.isDefault &&
    ideologyCode >= r.ideologyRange[0] &&
    ideologyCode <= r.ideologyRange[1] &&
    economyCode  >= r.economyRange[0]  &&
    economyCode  <= r.economyRange[1]
  ) || REGIMES.find(r => r.isDefault)
}

export const REGIME_MAP = REGIMES.filter(r => !r.isDefault)
