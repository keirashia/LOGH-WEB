export const FACTIONS = {
  EMPIRE:   { id:'EMPIRE',   name:'은하제국',     nameJp:'銀河帝国',        color:'#c0392b', flag:'⚔️',  ideology:'전제군주제', leader:'REINHARD', currency:'제국 마르크' },
  ALLIANCE: { id:'ALLIANCE', name:'자유행성동맹', nameJp:'自由惑星同盟',    color:'#2980b9', flag:'🛡️', ideology:'민주공화제', leader:'YANG',     currency:'동맹 디나르' },
  PHEZZAN:  { id:'PHEZZAN',  name:'페잔 자치령',  nameJp:'フェザーン自治領',color:'#27ae60', flag:'💰',  ideology:'상업 자치',  leader:'RUBINSKY', currency:'페잔 골드'  },
}

export const CHARACTERS = {
  REINHARD:     { id:'REINHARD',     faction:'EMPIRE',   name:'라인하르트 폰 로엔그람', rank:'원수/제국재상',  military:99, politics:95, intelligence:90, charisma:98, loyalty:100, health:85, portrait:'👑', quote:'나는 우주를 손에 넣을 것이다.' },
  KIRCHEIS:     { id:'KIRCHEIS',     faction:'EMPIRE',   name:'지크프리트 키르히아이스',rank:'상급대장',       military:92, politics:80, intelligence:88, charisma:90, loyalty:100, health:95, portrait:'🌟', quote:'라인하르트 님, 반드시 지켜드리겠습니다.' },
  MITTERMEYER:  { id:'MITTERMEYER',  faction:'EMPIRE',   name:'볼프강 미터마이어',      rank:'상급대장',       military:95, politics:60, intelligence:80, charisma:85, loyalty:95,  health:90, portrait:'⚡', quote:'질풍의 미터마이어, 전진한다!' },
  REUENTHAL:    { id:'REUENTHAL',    faction:'EMPIRE',   name:'오스카 폰 로이엔탈',     rank:'상급대장',       military:95, politics:70, intelligence:85, charisma:80, loyalty:80,  health:90, portrait:'🦅', quote:'나는 반역자가 될 자격도 있다.' },
  BITTENFELD:   { id:'BITTENFELD',   faction:'EMPIRE',   name:'프리츠 비텐펠트',        rank:'대장',           military:88, politics:30, intelligence:55, charisma:75, loyalty:92,  health:95, portrait:'🔥', quote:'흑색창기함대, 돌격!' },
  EISENACH:     { id:'EISENACH',     faction:'EMPIRE',   name:'어네스트 아이제나흐',    rank:'대장',           military:85, politics:40, intelligence:82, charisma:60, loyalty:90,  health:90, portrait:'🤐', quote:'…' },
  OBERSTEIN:    { id:'OBERSTEIN',    faction:'EMPIRE',   name:'파울 폰 오버슈타인',     rank:'군무상서',       military:55, politics:92, intelligence:98, charisma:20, loyalty:85,  health:80, portrait:'🤖', quote:'국가를 위해서는 감정을 배제해야 합니다.' },
  WAHLEN:       { id:'WAHLEN',       faction:'EMPIRE',   name:'어거스트 바렌',          rank:'상급대장',       military:87, politics:45, intelligence:75, charisma:72, loyalty:93,  health:85, portrait:'🛡️', quote:'철벽의 바렌, 맡겨두십시오.' },
  YANG:         { id:'YANG',         faction:'ALLIANCE', name:'양 웬리',                rank:'원수',           military:99, politics:65, intelligence:99, charisma:85, loyalty:95,  health:80, portrait:'🎓', quote:'하아, 최대한 노력해보겠습니다.' },
  FREDERICA:    { id:'FREDERICA',    faction:'ALLIANCE', name:'프레데리카 그린힐',      rank:'소장',           military:65, politics:75, intelligence:85, charisma:80, loyalty:100, health:95, portrait:'💚', quote:'제독님, 지금 상황을 보고드립니다.' },
  ATTENBOROUGH: { id:'ATTENBOROUGH', faction:'ALLIANCE', name:'드와이트 애튼버러',      rank:'중장',           military:88, politics:55, intelligence:80, charisma:82, loyalty:98,  health:90, portrait:'✊', quote:'양 제독은 항상 옳다!' },
  MERKATZ:      { id:'MERKATZ',      faction:'ALLIANCE', name:'윌리발트 폰 메르카츠',   rank:'원수(亡命)',     military:92, politics:50, intelligence:85, charisma:70, loyalty:92,  health:75, portrait:'⚓', quote:'군인으로서의 의무를 다할 뿐이오.' },
  CAZERNE:      { id:'CAZERNE',      faction:'ALLIANCE', name:'알렉스 카젤느',          rank:'중장(후방)',     military:50, politics:88, intelligence:90, charisma:70, loyalty:95,  health:85, portrait:'📋', quote:'보급 없이는 전쟁도 없다.' },
  RUBINSKY:     { id:'RUBINSKY',     faction:'PHEZZAN',  name:'아드리안 루빈스키',      rank:'자치령주',       military:30, politics:99, intelligence:99, charisma:70, loyalty:50,  health:70, portrait:'🕷️', quote:'페잔이 우주의 진정한 지배자가 될 것이오.' },
}

export const STAR_SYSTEMS = [
  { id:'ODIN',         name:'오딘',        faction:'EMPIRE',   type:'capital',  x:320, y:200, population:250, industry:95, defense:90, isGateway:false, fortress:null },
  { id:'GAISHBURG',    name:'가이스부르크',faction:'EMPIRE',   type:'fortress', x:265, y:168, population:60,  industry:70, defense:95, isGateway:false, fortress:'GAISHBURG' },
  { id:'NEUE_LAND',    name:'노이에란트',  faction:'EMPIRE',   type:'frontier', x:390, y:172, population:80,  industry:55, defense:60, isGateway:false, fortress:null },
  { id:'RENTENBERG',   name:'렌텐베르크', faction:'EMPIRE',   type:'normal',   x:350, y:248, population:90,  industry:60, defense:50, isGateway:false, fortress:null },
  { id:'KAPCHE_LANKA', name:'카프체란카', faction:'EMPIRE',   type:'frontier', x:292, y:292, population:40,  industry:35, defense:45, isGateway:false, fortress:null },
  { id:'HEINESSEN',    name:'하이네센',   faction:'ALLIANCE', type:'capital',  x:98,  y:200, population:220, industry:90, defense:85, isGateway:false, fortress:null },
  { id:'TIAMAT',       name:'티아마트',   faction:'ALLIANCE', type:'fortress', x:152, y:163, population:50,  industry:60, defense:85, isGateway:false, fortress:'TIAMAT' },
  { id:'URUVASI',      name:'우르바시',   faction:'ALLIANCE', type:'normal',   x:68,  y:168, population:70,  industry:50, defense:45, isGateway:false, fortress:null },
  { id:'SHAMLUU',      name:'샤므루',     faction:'ALLIANCE', type:'normal',   x:112, y:262, population:60,  industry:45, defense:40, isGateway:false, fortress:null },
  { id:'LEGNICA',      name:'레그니차',   faction:'ALLIANCE', type:'frontier', x:188, y:193, population:55,  industry:40, defense:50, isGateway:false, fortress:null },
  { id:'ISERLOHN',     name:'이젤론',     faction:'EMPIRE',   type:'fortress', x:215, y:210, population:20,  industry:50, defense:99, isGateway:true,  fortress:'ISERLOHN' },
  { id:'PHEZZAN',      name:'페잔',       faction:'PHEZZAN',  type:'capital',  x:210, y:296, population:150, industry:99, defense:60, isGateway:true,  fortress:null },
  { id:'AMLITZER',     name:'아므리차',   faction:null,       type:'contested',x:167, y:212, population:10,  industry:20, defense:20, isGateway:false, fortress:null },
  { id:'VERMILION',    name:'버밀리온',   faction:null,       type:'contested',x:252, y:212, population:10,  industry:20, defense:20, isGateway:false, fortress:null },
]

export const LANES = [
  ['ODIN','GAISHBURG'],['ODIN','NEUE_LAND'],['ODIN','RENTENBERG'],
  ['RENTENBERG','KAPCHE_LANKA'],['KAPCHE_LANKA','ISERLOHN'],
  ['GAISHBURG','VERMILION'],['ISERLOHN','VERMILION'],['ISERLOHN','AMLITZER'],
  ['AMLITZER','LEGNICA'],['AMLITZER','HEINESSEN'],
  ['LEGNICA','TIAMAT'],['HEINESSEN','TIAMAT'],
  ['HEINESSEN','URUVASI'],['HEINESSEN','SHAMLUU'],
  ['PHEZZAN','KAPCHE_LANKA'],['PHEZZAN','SHAMLUU'],
]

export const OPERATION_TYPES = {
  SURRENDER_DEMAND: { id:'SURRENDER_DEMAND', name:'항복 권고',   icon:'📢', successRate:0.30, moraleDmg:5,  defDmg:0  },
  PRECISION_BOMB:   { id:'PRECISION_BOMB',   name:'정밀 폭격',   icon:'🎯', successRate:0.70, moraleDmg:15, defDmg:30 },
  CARPET_BOMB:      { id:'CARPET_BOMB',      name:'무차별 폭격', icon:'💥', successRate:0.88, moraleDmg:30, defDmg:25 },
  GROUND_ASSAULT:   { id:'GROUND_ASSAULT',   name:'육전대 강하', icon:'🪖', successRate:0.75, moraleDmg:20, defDmg:20 },
  OCCUPATION:       { id:'OCCUPATION',       name:'점령',        icon:'🏴', successRate:0.80, moraleDmg:10, defDmg:15 },
  AGITATION:        { id:'AGITATION',        name:'선동 공작',   icon:'📜', successRate:0.40, moraleDmg:20, defDmg:0  },
}

export const FORTRESS_WEAPONS = {
  ISERLOHN: { name:'이젤론 요새', weapon:'투울 함머',           dmgRatio:0.25 },
  GAISHBURG:{ name:'가이스부르크 요새', weapon:'게이에스하켄', dmgRatio:0.22 },
  TIAMAT:   { name:'티아마트 성역', weapon:'아르테미스의 목걸이', dmgRatio:0.18 },
}

export const CONSTRUCTION_TYPES = {
  ARSENAL:  { id:'ARSENAL',  name:'조병창',   icon:'🏭', cost:200, turns:3, effect:{ industry:20 } },
  DEF_BASE: { id:'DEF_BASE', name:'방위기지', icon:'🏰', cost:150, turns:2, effect:{ defense:25 } },
  GARRISON: { id:'GARRISON', name:'주류기지', icon:'🛸', cost:120, turns:2, effect:{ defense:15, industry:5 } },
}

export const SCENARIOS = [
  { id:0, name:'제국의 여명',      year:796, impYear:487, recommend:'EMPIRE',   desc:'라인하르트가 세력을 키우기 시작하는 시점. 키르히아이스와 함께 우주를 정복하라.',                           systems:{ EMPIRE:['ODIN','GAISHBURG','NEUE_LAND','RENTENBERG','KAPCHE_LANKA','ISERLOHN'], ALLIANCE:['HEINESSEN','TIAMAT','URUVASI','SHAMLUU','LEGNICA'], PHEZZAN:['PHEZZAN'] } },
  { id:1, name:'이젤론 함락 직후', year:796, impYear:487, recommend:'ALLIANCE', desc:'양 웬리가 이젤론 요새를 무혈 점령한 직후. 제국과 동맹의 전면전이 임박한 상황.',                           systems:{ EMPIRE:['ODIN','GAISHBURG','NEUE_LAND','RENTENBERG','KAPCHE_LANKA'], ALLIANCE:['HEINESSEN','TIAMAT','URUVASI','SHAMLUU','LEGNICA','ISERLOHN'], PHEZZAN:['PHEZZAN'] } },
  { id:2, name:'아므리차 성역 회전',year:796, impYear:487, recommend:'EMPIRE',   desc:'동맹군의 제국 침공 작전. 역사의 분기점에서 운명을 바꿀 수 있는가.',                                      systems:{ EMPIRE:['ODIN','GAISHBURG','NEUE_LAND','RENTENBERG','KAPCHE_LANKA','ISERLOHN'], ALLIANCE:['HEINESSEN','TIAMAT','URUVASI','SHAMLUU','LEGNICA','AMLITZER'], PHEZZAN:['PHEZZAN'] } },
  { id:3, name:'립슈타트 전역',    year:797, impYear:488, recommend:'EMPIRE',   desc:'제국 내 귀족 연합군과 로엔그람 군의 내전. 라인하르트의 패권 장악이 눈앞에.',                               systems:{ EMPIRE:['ODIN','GAISHBURG','NEUE_LAND','RENTENBERG'], ALLIANCE:['HEINESSEN','TIAMAT','URUVASI','SHAMLUU','LEGNICA','ISERLOHN'], PHEZZAN:['PHEZZAN'] } },
  { id:4, name:'회랑의 전투',      year:799, impYear:490, recommend:'ALLIANCE', desc:'버밀리온 회전 이후 최후의 결전. 양 웬리와 라인하르트의 숙명적 대결.',                                        systems:{ EMPIRE:['ODIN','GAISHBURG','NEUE_LAND','RENTENBERG','KAPCHE_LANKA','ISERLOHN','AMLITZER','VERMILION'], ALLIANCE:['HEINESSEN','TIAMAT','URUVASI','SHAMLUU','LEGNICA'], PHEZZAN:['PHEZZAN'] } },
]

// EVTALK.MSG 원문 대사
export const DIALOGS = {
  TAX: {
    empire: '황공하오나, 민에 대한 조세를 이와 같이 개정하려 하옵니다만, 폐하의 뜻은 어떠하옵니까.',
    emperor: '음. 그리하도록 하라.',
    decree_empire: '황제 폐하의 어명으로, 내기의 조세는 이상과 같이 변경하는 것으로 한다.',
    alliance: (rate) => `자유행성동맹 최고평의회의 결정을 전달한다. 내기의 세율은 ${rate}퍼센트로 결정되었다.`,
  },
  BUDGET: {
    empire: '이번에 국고에 들어온 자금을, 이상과 같이 배분하려 합니다만, 폐하의 뜻은 어떠하옵니까.',
    emperor: '좋아, 그대 마음대로 하라.',
    decree: '황제 폐하의 어명으로, 이 자금은 이상과 같이 배분하는 것으로 한다.',
  },
  APPOINTMENT: {
    empire: '삼장관직을 이상과 같이 임명하고자 합니다만, 어떠하옵니까.',
    emperor: '좋아. 그대 마음대로 하라.',
    decree_empire: '황제 폐하의 어명으로, 삼장관직을 임명한다. 삼가 배명하라.',
    alliance: '군 인사에 관한 최고평의회의 결정을 전달한다. 동맹 헌장에 준하여, 이상의 장관을 지휘관에 임명한다.',
  },
  SORTIE: {
    cmd: '작전의 총지휘는 본직이 맡는다.',
    yang: '하아, 최대한 노력해보겠습니다.',
    eisenach: '…',
  },
  BATTLE: {
    surrender_cmd: (target) => `${target}에 통고한다. 즉시 모든 군사 활동을 중지하고 무장을 해제하라!`,
    surrender_ok:  (target) => `${target}로부터 응답입니다. 즉시 항복 권고에 응하겠다, 관대한 처분을 바란다는 내용입니다.`,
    surrender_no:  (target) => `${target}로부터는 아무런 응답도 없었습니다.`,
    surrender_def: '항복이라고? 웃기지 마라!',
    precision_cmd: (target) => `${target}에 대해 대지공격 개시. 적의 방위시설만을 공격에 집중하라!`,
    precision_ok:  (target) => `${target}의 방위시설을 모두 무력화했습니다. 행성은 우리 것입니다!`,
    carpet_cmd:    (target) => `${target}에 대해 대지공격 개시. 지표의 모든 구조물을 파괴하라!`,
    ground_cmd:    (target) => `${target}에 대해 상륙작전 개시. 신속히 행성 전역을 점령하라!`,
    ground_ok:     (target) => `육전대로부터 보고입니다. 적 지상부대를 격멸하고 ${target}을 점령했다는 내용입니다.`,
    occupy_cmd:    (target) => `${target}에 대해 상륙작전 개시. 적 방위사령부를 점령하여 적의 반격 능력을 봉쇄하라.`,
    occupy_ok:     (target) => `돌격대로부터 보고입니다. 적 방위사령부를 탈취하여 ${target}을 점령했다는 내용입니다.`,
    agitation_cmd: (target) => `${target} 성계에 고한다. 당신들은 자국 군대로부터도 버림받은 것 같다. 그래도 저항을 계속하겠는가?`,
    agitation_ok:  (target) => `공작원으로부터 보고입니다. ${target} 정부는 화평파와 항전파로 나뉘어 격렬히 대립하고 있다는 내용입니다.`,
    fail_generic:  (fleet, target) => `${fleet}의 ${target} 공략작전은 중지한다.`,
    fortress_hit:  (weapon, dmg) => `아군 함대는 ${weapon}의 제사를 받아 ${dmg}척의 손해를 입었습니다!`,
    missile_hit:   (dmg) => `아군 함대는 방공 미사일의 공격을 받아 ${dmg}척의 손해를 입었습니다!`,
  },
}

export const POSTS = {
  EMPIRE:   ['재상','군무상서','통수본부총장','우주함대사령장관','정보국장','국내안전보장국장'],
  ALLIANCE: ['최고평의회의장','통합작전본부장','우주함대사령장관','정보부장','헌병총감'],
  PHEZZAN:  ['자치령주','무역장관','외교장관','정보국장'],
}

// ── 재정 시스템 (EVTALK.MSG 원문 기반) ───────────────────
export const FINANCE = {
  // 예산 항목
  BUDGET_ITEMS: {
    MILITARY:    { id:'MILITARY',    name:'군사비',    icon:'⚔️',  desc:'함대 유지·건조·무장 비용' },
    CONSTRUCTION:{ id:'CONSTRUCTION',name:'건설비',    icon:'🏗️', desc:'성계 기반시설 건설 비용' },
    INTELLIGENCE:{ id:'INTELLIGENCE',name:'정보비',    icon:'🔍',  desc:'첩보·공작 활동 비용' },
    WELFARE:     { id:'WELFARE',     name:'복지비',    icon:'🏥',  desc:'민심 유지·치안 비용' },
    RESERVE:     { id:'RESERVE',     name:'예비비',    icon:'💎',  desc:'긴급 사태 대비 적립금' },
  },

  // 원본 대사 (EVTALK.MSG)
  DIALOGS: {
    // 임시 징수
    EMERGENCY_LEVY: {
      empire_prime: '황공하오나, 반도들의 토벌 비용이 쌓여 통상 예산으로는 모두 충당할 수 없사옵니다. 이에 임시 세금을 부과하지 않으면 아니 됩니다.',
      emperor_reply: '어쩔 수 없구나. 허나, 이런 일이 반복되지 않도록 하라.',
      empire_decree: '황제 폐하의 어명으로, 긴급 재정 충당을 위해 일시적 임시 세금을 부과한다.',
      alliance_council: '자유행성동맹 최고평의회의 결정을 전달한다. 긴급 재정 충당을 위해 임시 세금을 부과한다.',
      success: (amount) => `임시 징수 완료. ${amount.toLocaleString()} 마크를 징수했습니다. 단, 민심이 저하되었습니다.`,
    },
    // 페잔 차관
    LOAN: {
      phezzan_offer: '이번에도 폐하의 나라에 자금을 융자해 드리려 합니다. 페잔은 언제나 제국의 친구입니다.',
      empire_accept: '음. 그대들의 호의를 받아들이도록 하지.',
      alliance_accept: '감사합니다. 동맹은 페잔의 우정을 잊지 않겠습니다.',
      repay_confirm: '확실히 상환분의 자금은 받았습니다. 앞으로도 이런 우호적인 관계를 유지하고 싶군요.',
      default_warning: '상환 기일이 다가왔습니다. 페잔은 약속을 잊지 않습니다.',
      default_penalty: '상환 불능 상태입니다. 페잔은 이에 상응하는 조치를 취하겠습니다.',
    },
    // 예산 배분
    BUDGET: {
      empire_prime: '이번에 국고에 들어온 자금을, 이상과 같이 배분하려 합니다만, 폐하의 뜻은 어떠하옵니까.',
      emperor_reply: '좋아, 그대 마음대로 하라.',
      empire_decree: '황제 폐하의 어명으로, 이 자금은 이상과 같이 배분하는 것으로 한다.',
      alliance_council: '이번 예산은 이상과 같이 배분하는 것으로 최고평의회가 결정하였다.',
      success: '예산 배분이 완료되었습니다.',
    },
  },

  // 차관 조건
  LOAN_TERMS: {
    MIN_AMOUNT:   500,
    MAX_AMOUNT:   5000,
    INTEREST_RATE: 0.05,   // 5% 이자
    REPAY_TURNS:  6,        // 6턴 내 상환
    MORALE_PENALTY: -5,     // 민심 페널티 (전 성계)
  },

  // 임시 징수 조건
  LEVY_TERMS: {
    RATE:           0.3,    // 현재 수입의 30% 추가 징수
    MORALE_PENALTY: -10,    // 민심 페널티 (전 성계)
    COOLDOWN_TURNS: 3,      // 재사용 대기턴
  },
}


// ── 군사 시스템 (EVTALK.MSG 원문 기반) ───────────────────
export const MILITARY = {
  FLEET_SIZES: {
    SMALL:    { id:'SMALL',    name:'소규모',  ships:5000,  cost:100, upkeep:10 },
    MEDIUM:   { id:'MEDIUM',   name:'중규모',  ships:10000, cost:200, upkeep:20 },
    STANDARD: { id:'STANDARD', name:'표준',    ships:15000, cost:300, upkeep:30 },
    LARGE:    { id:'LARGE',    name:'대규모',  ships:20000, cost:400, upkeep:40 },
    FORTRESS: { id:'FORTRESS', name:'요새급',  ships:30000, cost:600, upkeep:60 },
  },
  TRANSPORT_ITEMS: {
    TROOPS:   { id:'TROOPS',   name:'육전대',   icon:'🪖', costPerUnit:5 },
    SUPPLIES: { id:'SUPPLIES', name:'군수물자', icon:'📦', costPerUnit:3 },
    GOLD:     { id:'GOLD',     name:'자금',     icon:'💰', costPerUnit:1 },
  },
  DIALOGS: {
    FORMATION: {
      empire_decree:   (name)           => `황제 폐하의 어명으로, ${name}의 편성을 명한다.`,
      alliance_decree: (name)           => `최고평의회 결정에 따라 ${name}을 편성한다.`,
      success:         (name, ships)    => `${name} 편성 완료. ${ships.toLocaleString()}척 전력 확보.`,
      disband:         (name)           => `${name}을 해산한다. 소속 함선은 예비 전력으로 편입한다.`,
    },
    REORGANIZE: {
      success: (name, before, after) => `${name} 재편성 완료. ${before.toLocaleString()}척 → ${after.toLocaleString()}척`,
    },
    TRANSPORT: {
      order:   (from, to, item) => `${from}에서 ${to}으로 ${item} 수송 작전을 개시한다.`,
      success: (to, item)       => `수송 완료. ${to}에 ${item}이 도착했습니다.`,
      fail:    '수송 함대가 적의 공격을 받아 수송에 실패했습니다.',
    },
    RETREAT: {
      order:    (name)           => `${name}에 즉시 철수 명령을 내린다.`,
      complete: (name, location) => `${name}이 ${location}으로 철수를 완료했습니다.`,
    },
  },
}


// ── 정보·외교 시스템 (EVTALK.MSG 원문 기반) ──────────────
export const INTEL = {
  // 첩보 작전 종류
  OPERATIONS: {
    SPY:       { id:'SPY',       name:'기밀 입수',   icon:'🔍', cost:200, turns:2, successBase:0.60, desc:'적 성계의 방어·자금 정보를 입수합니다.' },
    SABOTAGE:  { id:'SABOTAGE',  name:'시설 파괴',   icon:'💣', cost:300, turns:2, successBase:0.45, desc:'적 성계의 산업·방어 시설을 파괴합니다.' },
    AGITATE:   { id:'AGITATE',   name:'내부 선동',   icon:'📣', cost:250, turns:3, successBase:0.40, desc:'적 성계 민심을 교란하여 반란을 유도합니다.' },
    ASSASSIN:  { id:'ASSASSIN',  name:'요인 암살',   icon:'🗡️', cost:500, turns:3, successBase:0.25, desc:'적 주요 인물을 제거합니다. 발각 시 외교 문제가 됩니다.' },
  },

  // 치안 회복 수준
  SECURITY_LEVELS: {
    PATROL:   { id:'PATROL',   name:'순찰 강화',   cost:100, moraleEffect: 5, defEffect:  5 },
    GARRISON: { id:'GARRISON', name:'수비대 배치', cost:200, moraleEffect: 8, defEffect: 15 },
    LOCKDOWN: { id:'LOCKDOWN', name:'계엄령 선포', cost:350, moraleEffect:-5, defEffect: 25 },
  },

  // 제안 공작 종류
  PROPOSALS: {
    ALLIANCE:   { id:'ALLIANCE',   name:'동맹 제안',   icon:'🤝', cost:400, desc:'페잔에 중립 유지를 요청하거나 동맹 협상을 시도합니다.' },
    TRADE:      { id:'TRADE',      name:'통상 조약',   icon:'📜', cost:300, desc:'교역로 개방으로 수입을 증대합니다.' },
    SURRENDER:  { id:'SURRENDER',  name:'항복 권고',   icon:'🏳️', cost:200, desc:'약세인 적에게 항복을 권고합니다.' },
    DEFECTION:  { id:'DEFECTION',  name:'귀순 공작',   icon:'🌟', cost:600, desc:'적 유능한 장교의 귀순을 유도합니다.' },
  },

  // 원본 대사 (EVTALK.MSG)
  DIALOGS: {
    SPY: {
      empire_order:   (name) => `${name}, 경에게 첩보 작전의 개시를 명하노라.`,
      empire_reply:   '어명을 받들겠사옵니다.',
      alliance_order: (name) => `${name}, 귀관에게 첩보 작전의 개시를 명한다.`,
      alliance_reply: '알겠습니다.',
      start:          '이제부터 첩보 작전을 개시한다.',
      success:        (target) => `첩보원으로부터 보고입니다. ${target} 성계의 기밀 정보를 입수했습니다.`,
      fail:           '첩보원으로부터 보고입니다. 작전은 실패했습니다. 요원이 적에게 발각되었습니다.',
    },
    SECURITY: {
      empire_order:   (name, sys) => `${name}, 경에게 ${sys} 성계의 치안 회복을 명하노라. 어떤 수단을 사용해도 좋다.`,
      empire_reply:   '어명을 받들겠사옵니다.',
      alliance_order: (name, sys) => `${name}, 귀관에게 ${sys} 성계의 치안 회복을 명한다. 어떤 수단을 써도 상관없다.`,
      alliance_reply: '알겠습니다.',
      success:        (sys) => `${sys} 성계의 치안이 회복되었습니다.`,
    },
    PROPOSAL: {
      prime_suggest: '황공하오나 말씀드립니다. 비상시에는 비상의 책략으로 대응하지 않으면 나라를 손상시키게 될 것입니다.',
      advisor_reply: '경의 말은 지당하오. 즉시 폐하께 주상하리다.',
      emperor_ask:   (name) => `${name}이 이와 같이 말하고 있습니다만, 어떻게 하시겠습니까.`,
      emperor_reply: '좋아. 저 자가 하고 싶은 대로 해보게 하라.',
      success:       (target) => `${target}에 대한 제안 공작이 성공했습니다.`,
      fail:          (target) => `${target}에 대한 제안 공작이 실패했습니다.`,
    },
  },
}
