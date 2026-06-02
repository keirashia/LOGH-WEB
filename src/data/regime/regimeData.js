// ================================================================
//  regimeData.js — 정치/경제 체제 조합 → 국가 타이틀
//  경로: src/data/regime/regimeData.js
//  입력: ideologyCode + economyCode
//  출력: factionTitle / leaderTitle / 게임 수치 보정
//  작성: 2026-06-01
// ================================================================

export const REGIMES = [

  // ── 공화 + 자본주의 계열 ──────────────────────────────────────
  {
    ideologyRange: [100, 100],   // 민주공화제
    economyRange:  [100, 140],   // 자본주의~혼합경제
    factionTitle:  { kr: '자유민주공화국', en: 'Liberal Democratic Republic', jp: '自由民主共和国' },
    leaderTitle:   { kr: '대통령', en: 'President', jp: '大統領' },
    taxRate:       { min: 10, max: 40 },
    growth:        +0.1,
    loyalty:       +0.1,
    military:      0,
  },
  {
    ideologyRange: [115, 130],   // 신대통령제~대통령독재
    economyRange:  [100, 180],   // 자본주의~국가자본주의
    factionTitle:  { kr: '대통령 공화국', en: 'Presidential Republic', jp: '大統領共和国' },
    leaderTitle:   { kr: '대통령', en: 'President', jp: '大統領' },
    taxRate:       { min: 20, max: 55 },
    growth:        0,
    loyalty:       0,
    military:      +0.1,
  },

  // ── 공화 + 사회주의/공산주의 계열 ────────────────────────────
  {
    ideologyRange: [35, 35],     // 민주집중제
    economyRange:  [260, 300],   // 계획경제~공산주의
    factionTitle:  { kr: '인민공화국', en: "People's Republic", jp: '人民共和国' },
    leaderTitle:   { kr: '서기장', en: 'General Secretary', jp: '書記長' },
    taxRate:       { min: 50, max: 90 },
    growth:        -0.1,
    loyalty:       +0.2,
    military:      +0.2,
  },
  {
    ideologyRange: [145, 160],   // 일당독재~군정
    economyRange:  [220, 300],   // 사회주의~공산주의
    factionTitle:  { kr: '혁명공화국', en: 'Revolutionary Republic', jp: '革命共和国' },
    leaderTitle:   { kr: '혁명위원장', en: 'Revolutionary Chairman', jp: '革命委員長' },
    taxRate:       { min: 40, max: 85 },
    growth:        -0.1,
    loyalty:       +0.1,
    military:      +0.3,
  },

  // ── 혼합 체제 ─────────────────────────────────────────────────
  {
    ideologyRange: [180, 180],   // 혼합체제
    economyRange:  [100, 180],   // 자본주의~국가자본주의
    factionTitle:  { kr: '자치령', en: 'Autonomous Dominion', jp: '自治領' },
    leaderTitle:   { kr: '총독', en: 'Governor', jp: '総督' },
    taxRate:       { min: 15, max: 50 },
    growth:        +0.2,
    loyalty:       +0.1,
    military:      -0.1,
  },

  // ── 군주 + 자본주의/혼합 계열 ────────────────────────────────
  {
    ideologyRange: [195, 225],   // 근대군주제~입헌군주제
    economyRange:  [100, 180],   // 자본주의~국가자본주의
    factionTitle:  { kr: '입헌왕국', en: 'Constitutional Kingdom', jp: '立憲王国' },
    leaderTitle:   { kr: '국왕', en: 'King', jp: '国王' },
    taxRate:       { min: 20, max: 50 },
    growth:        +0.1,
    loyalty:       +0.1,
    military:      +0.1,
  },

  // ── 군주 + 중상주의/봉건 계열 ────────────────────────────────
  {
    ideologyRange: [225, 240],   // 입헌군주제~전제군주제
    economyRange:  [60, 140],    // 봉건경제~혼합경제
    factionTitle:  { kr: '제국', en: 'Empire', jp: '帝国' },
    leaderTitle:   { kr: '황제', en: 'Kaiser', jp: '皇帝' },
    taxRate:       { min: 30, max: 70 },
    growth:        0,
    loyalty:       0,
    military:      +0.2,
  },
  {
    ideologyRange: [240, 255],   // 전제군주제~절대왕정
    economyRange:  [60, 140],    // 봉건경제~혼합경제
    factionTitle:  { kr: '전제 제국', en: 'Absolute Empire', jp: '専制帝国' },
    leaderTitle:   { kr: '황제', en: 'Kaiser', jp: '皇帝' },
    taxRate:       { min: 30, max: 80 },
    growth:        -0.1,
    loyalty:       -0.1,
    military:      +0.3,
  },

  // ── 신성/극단 군주 계열 ───────────────────────────────────────
  {
    ideologyRange: [255, 285],   // 절대왕정~황제독재
    economyRange:  [60, 180],    // 봉건~국가자본주의
    factionTitle:  { kr: '신성제국', en: 'Sacred Empire', jp: '神聖帝国' },
    leaderTitle:   { kr: '신성황제', en: 'Sacred Kaiser', jp: '神聖皇帝' },
    taxRate:       { min: 40, max: 90 },
    growth:        -0.2,
    loyalty:       -0.1,
    military:      +0.3,
  },
  {
    ideologyRange: [285, 300],   // 황제독재~신성황제
    economyRange:  [20, 300],    // 전 범위
    factionTitle:  { kr: '신권제국', en: 'Theocratic Empire', jp: '神権帝国' },
    leaderTitle:   { kr: '신황', en: 'God-Emperor', jp: '神皇' },
    taxRate:       { min: 50, max: 100 },
    growth:        -0.2,
    loyalty:       +0.2,
    military:      +0.2,
  },

  // ── 신권 계열 (지구교 등) ─────────────────────────────────────
  {
    ideologyRange: [85, 85],     // 신권정치
    economyRange:  [20, 300],    // 전 범위
    factionTitle:  { kr: '신정국가', en: 'Theocracy', jp: '神政国家' },
    leaderTitle:   { kr: '총대주교', en: 'Patriarch', jp: '総大主教' },
    taxRate:       { min: 30, max: 70 },
    growth:        0,
    loyalty:       +0.3,
    military:      +0.1,
  },

  // ── 기본값 (매칭 없을 경우) ───────────────────────────────────
  {
    ideologyRange: [0, 300],
    economyRange:  [0, 300],
    factionTitle:  { kr: '국가', en: 'State', jp: '国家' },
    leaderTitle:   { kr: '지도자', en: 'Leader', jp: '指導者' },
    taxRate:       { min: 20, max: 60 },
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
