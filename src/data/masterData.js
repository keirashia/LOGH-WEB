import { CHAR_BASE as CHARACTERS_DATA } from '@/data/base/characters/charactersData.js'
import FACTIONS_DATA from '@/data/base/factions/factionsData.js'
import { SCENARIOS as _SCENARIOS } from '@/data/scenario/scenarioData.js'

export { _SCENARIOS as SCENARIOS }

export const CHARACTERS = CHARACTERS_DATA
export const FACTIONS = Object.fromEntries(FACTIONS_DATA.map(f => [f.id, f]))

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


// EVTALK.MSG 원문 대사
export const DIALOGS = {
  TAX: {
    REH: '황공하오나, 민에 대한 조세를 이와 같이 개정하려 하옵니다만, 폐하의 뜻은 어떠하옵니까.',
    emperor: '음. 그리하도록 하라.',
    decree_empire: '황제 폐하의 어명으로, 내기의 조세는 이상과 같이 변경하는 것으로 한다.',
    FPA: (rate) => `자유행성동맹 최고평의회의 결정을 전달한다. 내기의 세율은 ${rate}퍼센트로 결정되었다.`,
  },
  BUDGET: {
    REH: '이번에 국고에 들어온 자금을, 이상과 같이 배분하려 합니다만, 폐하의 뜻은 어떠하옵니까.',
    emperor: '좋아, 그대 마음대로 하라.',
    decree: '황제 폐하의 어명으로, 이 자금은 이상과 같이 배분하는 것으로 한다.',
  },
  APPOINTMENT: {
    REH: '삼장관직을 이상과 같이 임명하고자 합니다만, 어떠하옵니까.',
    emperor: '좋아. 그대 마음대로 하라.',
    decree_empire: '황제 폐하의 어명으로, 삼장관직을 임명한다. 삼가 배명하라.',
    FPA: '군 인사에 관한 최고평의회의 결정을 전달한다. 동맹 헌장에 준하여, 이상의 장관을 지휘관에 임명한다.',
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
  REH:   ['재상','군무상서','통수본부총장','우주함대사령장관','정보국장','국내안전보장국장'],
  FPA: ['최고평의회의장','통합작전본부장','우주함대사령장관','정보부장','헌병총감'],
  PZN:  ['자치령주','무역장관','외교장관','정보국장'],
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
    ALLIANCE: { id:'ALLIANCE', name:'동맹 제안', icon:'🤝', cost:400, desc:'페잔에 중립 유지를 요청하거나 동맹 협상을 시도합니다.' },
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
