// 경로: src/data/base/trait/chars/charTraitData.js
// ================================================================
//  charTraitData.js — 인물 트레잇 마스터
//  경로: src/data/base/trait/chars/charTraitData.js
//
//  ID 네이밍 규칙:
//    TRC_{TYPE}_{CODE}
//    TRC  = Trait Character
//    TYPE = U(고유/Unique) | G(공통/General) | S(상태/Status)
//    CODE = U 타입: 대상 캐릭터 6자리 번호 (예: 000223)
//           G·S 타입: 순번 3자리 (예: 001)
//
//  rarity: common / uncommon / rare / unique
//
//  effects 키 (능력치 보정, 절대값):
//    statCmd, statCsm, statAtt, statDef, statFst,
//    statMng, statInf, statGfg, statAfg, statPlt
//
//  permanent: true = 영구 / false = 임시 (traitEdDate로 소멸)
// ================================================================
// ... 데이터가 혼재되어있으니, 각 파일에 맞게 확인 후 등록해야함.

export const CHAR_TRAITS_MASTER = [

  {
    id: "TRC_U_000004",
    name: [
      { code: "Kr", context: "우주의 장막" },
      { code: "En", context: "Veil of the Cosmos" },
      { code: "Jp", context: "宇宙の帳" },
    ],
    rarity: "unique",
    desc: "신앙적 권위 뒤에 모든 것을 감추는 존재. 이 인물이 소속된 파벌의 정보는 외부에 노출되지 않는다.",
    permanent: true,
    effects: {},
    conditionalEffects: [
      {
        // TODO: clique_info_hidden — 소속 클리크 정보 비공개 처리 (masterData.js / cliqueData.js 연동)
        trigger: "clique_info_visibility",
        effects: { hideCliqueInfo: true },
      },
    ],
  },

  {
    id: "TRC_U_000006",
    name: [
      { code: "Kr", context: "제국의 금고" },
      { code: "En", context: "Imperial Treasury" },
    ],
    rarity: "unique",
    desc: "제국 재정을 총괄하는 재무장관. 운영과 정치공작 능력이 향상된다.",
    permanent: true,
    effects: { statMng: 8, statPlt: 6 },
  },

  {
    id: "TRC_U_000032",
    name: [
      { code: "Kr", context: "철벽" },
      { code: "En", context: "Iron Wall" },
      { code: "Jp", context: "鉄壁" },
    ],
    rarity: "unique",
    desc: "철저한 방어 태세와 냉정한 판단력으로 전선을 지키는 수비형 지휘관. 방어 능력이 극대화되며, 전황이 불리한 상황에서도 쉽게 무너지지 않는다.",
    permanent: true,
    effects: { statDef: 10, statCsm: 5 },
    conditionalEffects: [
      {
        // TODO: battle_disadvantaged — 전황 불리 조건 (masterData.js)
        trigger: "battle_disadvantaged",
        effects: { statDef: 15, statFst: 5 },
      },
    ],
  },

  {
    id: "TRC_U_000043",
    name: [
      { code: "Kr", context: "허허실실의 귀재" },
      { code: "En", context: "Master of Feint and Deception" },
      { code: "Jp", context: "虚々実々の名手" },
    ],
    rarity: "unique",
    desc: "허와 실을 넘나드는 기만전술의 달인. 기동력과 공격력이 향상되며, 수적으로 열세인 상황에서 더욱 날카로운 기습 능력을 발휘한다.",
    permanent: true,
    effects: { statFst: 5, statAtt: 5 },
    conditionalEffects: [
      {
        // TODO: fleet_outnumbered — 아군 함대 수 < 적 함대 수 조건 (masterData.js)
        trigger: "fleet_outnumbered",
        effects: { statFst: 8, statAtt: 8, zocIgnore: true },
      },
    ],
  },

  {
    id: "TRC_U_000086",
    name: [
      { code: "Kr", context: "이족보행 하이에나" },
      { code: "En", context: "Two-Legged Hyena" },
      { code: "Jp", context: "二足歩行のハイエナ" },
    ],
    rarity: "unique",
    desc: "자신의 안위를 위해 동료마저 배신하는 자. 위기 상황에서 배신 행동의 성공률이 높아지지만, 발각 시 평판이 극단적으로 추락한다.",
    permanent: true,
    effects: { statPlt: 10, moral: -20 },
  },

  {
    id: "TRC_U_000093",
    name: [
      { code: "Kr", context: "독사의 야망" },
      { code: "En", context: "Viper's Ambition" },
    ],
    rarity: "unique",
    desc: "아버지를 능가하려는 냉혹한 야망. 정보와 정치공작이 극대화되지만 도덕 수치가 낮고 발각 시 치명적 페널티를 받는다.",
    permanent: true,
    effects: { statInf: 8, statPlt: 10 },
    conditionalEffects: [
      {
        trigger: "exposed_as_spy",
        effects: { statPlt: -30, statCsm: -25 },
      },
    ],
  },

  // ── 고유 트레잇 (unique) ──────────────────────────────────────
  {
    id: "TRC_U_000139",
    name: [
      { code: "Kr", context: "독불장군" },
      { code: "En", context: "One-Man Army" },
    ],
    rarity: "unique",
    desc: "참모의 조언을 무시하고 무모한 정면 돌격을 감행하는 경향. 압도적인 공격력을 발휘하지만 방어 판단과 전략적 운영이 극도로 저하된다.",
    permanent: true,
    effects: {
      statAtt: 8,
      statDef: -12,
      statMng: -8,
    },
  },

  {
    id: "TRC_U_000148",
    name: [
      { code: "Kr", context: "이중첩자" },
      { code: "En", context: "Double Agent" },
    ],
    rarity: "unique",
    desc: "양쪽 진영을 넘나든 경력에서 비롯된 탁월한 정보 수집 능력. 정보력이 극대화되지만 신뢰도에 페널티가 있다.",
    permanent: true,
    effects: { statInf: 10, statPlt: 5 },
  },

  {
    id: "TRC_U_000173",
    name: [
      { code: "Kr", context: "질풍" },
      { code: "En", context: "Gale" },
    ],
    rarity: "unique",
    desc: "압도적인 기동력으로 전장의 흐름을 바꾸는 속전속결형 지휘관. 기동 및 공격 능력이 극대화되지만 장기 소모전에서는 이점이 줄어든다.",
    permanent: true,
    effects: {
      statFst: 10,
      statAtt: 5,
      statDef: -3,
    },
  },

  {
    id: "TRC_U_000195",
    name: [
      { code: "Kr", context: "노장의 진수" },
      { code: "En", context: "Old Guard's Pinnacle" },
    ],
    rarity: "unique",
    desc: "수십 년의 실전 경험으로 단련된 노련한 지휘 능력. 수세에 몰린 상황에서도 냉철하게 병력을 운용하여 피해를 최소화한다.",
    permanent: true,
    effects: {
      statCmd: 5,
      statDef: 8,
      statMng: 5,
    },
  },

  {
    id: "TRC_U_000198",
    name: [
      { code: "Kr", context: "허울뿐인 야망" },
      { code: "En", context: "Hollow Ambition" },
    ],
    rarity: "unique",
    desc: "군사적 재능 없이 야망만 큰 귀족. 정치공작은 높지만 전투 능력 전반이 크게 저하된다.",
    permanent: true,
    effects: { statPlt: 8, statCmd: -15, statAtt: -10 },
  },

  {
    id: "TRC_U_000223",
    name: [
      { code: "Kr", context: "이론무쌍" },
      { code: "En", context: "Master Theorist" },
    ],
    rarity: "unique",
    desc: "전술·전략 이론에 정통하여 운영 및 정보 분석에서 탁월한 능력을 발휘한다. 그러나 이론에 의존하는 경향으로 기동 판단이 굳어지기 쉽다.",
    permanent: true,
    effects: {
      statMng: 8,
      statInf: 5,
      statFst: -5,
    },
  },

  {
    id: "TRC_U_000230",
    name: [
      { code: "Kr", context: "평행추격" },
      { code: "En", context: "Parallel Pursuit" },
    ],
    rarity: "unique",
    desc: "독창적인 추격 전술로 적의 허를 찌르는 전략가. 지휘와 정보 능력이 향상된다.",
    permanent: true,
    effects: { statCmd: 5, statInf: 5, statDef: 3 },
  },

  {
    id: "TRC_U_000233",
    name: [
      { code: "Kr", context: "돌격본능" },
      { code: "En", context: "Assault Instinct" },
    ],
    rarity: "unique",
    desc: "선제 돌격을 본능처럼 구사하는 공격형 지휘관. 기동력과 공격력이 극대화되지만 수비적 상황에서 불리하다.",
    permanent: true,
    effects: {
      statAtt: 10,
      statFst: 8,
      statDef: -5,
    },
  },

  {
    id: "TRC_U_000241",
    name: [
      { code: "Kr", context: "의수의 투지" },
      { code: "En", context: "Prosthetic Resolve" },
    ],
    rarity: "unique",
    desc: "전장에서 팔을 잃고도 굴하지 않는 불굴의 투지. 공격 능력이 향상된다.",
    permanent: true,
    effects: { statAtt: 5, statBrave: 5 },
  },

  {
    id: "TRC_U_000245",
    name: [
      { code: "Kr", context: "영원한 안식처" },
      { code: "En", context: "Eternal Sanctuary" },
      { code: "Jp", context: "永遠の安らぎ" },
    ],
    rarity: "unique",
    desc: "가장 가까운 이에게 평온과 위로를 주는 존재. 라인하르트 폰 로엔그람의 정신적 지주로서, 그와 관련된 인물의 사기와 안정에 긍정적인 영향을 미친다.",
    permanent: true,
    effects: { statCsm: 5 },
    conditionalEffects: [
      {
        // TODO: reinhard_morale_support — 라인하르트(CH_000064) 사기/멘탈 관련 체크 시점 (masterData.js)
        trigger: "reinhard_morale_support",
        effects: { reinhardMmpBonus: 10 },
      },
    ],
  },

  {
    id: "TRC_U_000247",
    name: [
      { code: "Kr", context: "배신의 충의" },
      { code: "En", context: "Loyal Betrayal" },
    ],
    rarity: "unique",
    desc: "주군에 대한 충성과 도덕적 신념 사이에서 갈등하는 무인. 육전 능력이 높으며 주군이 비도덕적 행동을 취할 때 반발 트리거가 발동한다.",
    permanent: true,
    effects: { statGfg: 8, statAtt: 5 },
    conditionalEffects: [
      {
        // TODO: lord_immoral_act — 주군의 비도덕적 행동 트리거 (masterData.js)
        trigger: "lord_immoral_act",
        effects: { statPlt: -20 },
      },
    ],
  },

  {
    id: "TRC_U_000250",
    name: [
      { code: "Kr", context: "페잔의 앞잡이" },
      { code: "En", context: "Fezzan's Pawn" },
    ],
    rarity: "unique",
    desc: "페잔의 사주를 받아 제국 내부를 교란하는 정보 조작 전문가. 정보 능력이 높지만 발각 시 치명적인 페널티를 받는다.",
    permanent: true,
    effects: { statInf: 10, statMng: 5 },
    conditionalEffects: [
      {
        // TODO: exposed_as_spy — 첩보 발각 조건 (masterData.js)
        trigger: "exposed_as_spy",
        effects: { statPlt: -30, statCsm: -20 },
      },
    ],
  },

  {
    id: "TRC_U_000254",
    name: [
      { code: "Kr", context: "노병의 기개" },
      { code: "En", context: "Veteran's Spirit" },
    ],
    rarity: "unique",
    desc: "수십 년의 전장 경험에서 우러나오는 불굴의 의지. 지휘와 사기 능력이 극대화되지만 기동성은 떨어진다.",
    permanent: true,
    effects: { statCmd: 5, statPlt: 8, statFst: -5 },
  },

  {
    id: "TRC_U_000257",
    name: [
      { code: "Kr", context: "감탄의 극치" },
      { code: "En", context: "Pinnacle of Admiration" },
      { code: "Jp", context: "感嘆の極み" },
    ],
    rarity: "unique",
    desc: "자신이 믿는 낭만과 신념을 현실보다 우선시하는 인물. 한번 정해진 신념(idea)은 외부 요인에 의해 변경되지 않는다.",
    permanent: true,
    effects: {},
    conditionalEffects: [
      {
        // TODO: idea_change_attempt — idea 변경 시도 시점 개입 (masterData.js)
        trigger: "idea_change_attempt",
        effects: { ideaLocked: true },
      },
    ],
  },

  {
    id: "TRC_U_000263",
    name: [
      { code: "Kr", context: "재앙을 기획하는 자" },
      { code: "En", context: "Architect of Calamity" },
      { code: "Jp", context: "災厄を企てる者" },
    ],
    rarity: "unique",
    desc: "상황에 따라 자유롭게 입장을 바꾸는 정치적 유연성. 모든 제안·음모 실행 시 상대의 수락률과 성공률에 보너스를 받는다.",
    permanent: true,
    effects: {},
    conditionalEffects: [
      {
        trigger: "agenda_propose",
        effects: { acceptRateBonus: 10, successRateBonus: 10 },
      },
    ],
  },

  {
    id: "TRC_U_000266",
    name: [
      { code: "Kr", context: "마법사" },
      { code: "En", context: "The Magician" },
    ],
    rarity: "unique",
    desc: "역사에 대한 해박한 지식과 직관으로 적의 의도를 꿰뚫고 기상천외한 전략으로 승리를 쟁취한다. 은하역사상 최고의 수비형 전략가.",
    permanent: true,
    effects: {
      statCmd: 5,
      statDef: 8,
      statInf: 5,
    },
  },

  {
    id: "TRC_U_000270",
    name: [
      { code: "Kr", context: "완벽한 기동" },
      { code: "En", context: "Perfect Manoeuvre" },
    ],
    rarity: "unique",
    desc: "전장에서 함대 기동을 완벽히 구현하는 운동 전문가. 기동성과 참모 능력이 극대화된다.",
    permanent: true,
    effects: { statFst: 8, statCsm: 5 },
  },

  {
    id: "TRC_U_000272",
    name: [
      { code: "Kr", context: "예술가의 혼" },
      { code: "En", context: "Artistic Soul" },
    ],
    rarity: "unique",
    desc: "예술적 감성으로 전장을 바라보는 독창적 지휘관. 사기와 정보 능력이 향상된다.",
    permanent: true,
    effects: { statPlt: 8, statInf: 5 },
  },

  {
    id: "TRC_U_000301",
    name: [
      { code: "Kr", context: "금은요동" },
      { code: "En", context: "Gold and Silver Unrest" },
    ],
    rarity: "unique",
    desc: "이색동공이 상징하듯 충성과 야망 사이에서 흔들리는 이중적 내면. 전략 판단과 지휘 능력이 극대화되지만, 특정 조건에서 반골 기질이 발동할 수 있다.",
    permanent: true,
    effects: { statCmd: 5, statMng: 8, statInf: 5 },
  },

  {
    id: "TRC_U_000306",
    name: [
      { code: "Kr", context: "최대 문벌" },
      { code: "En", context: "Greatest Noble House" },
    ],
    rarity: "unique",
    desc: "골덴바움 왕조 최대 문벌귀족의 수장. 지휘와 정치공작이 향상되나 군사적 판단력이 저하된다.",
    permanent: true,
    effects: { statCsm: 10, statPlt: 8, statCmd: -10 },
  },

  {
    id: "TRC_U_000325",
    name: [
      { code: "Kr", context: "하얀 여우" },
      { code: "En", context: "White Fox" },
      { code: "Jp", context: "白い狐" },
    ],
    rarity: "unique",
    desc: "겉으로는 점잖은 백작 귀족이지만 제국 전역의 첩보망을 손에 쥔 그림자. 대 동맹·대 페잔 정보공작을 총괄하며 정보력과 정치공작이 극대화된다.",
    permanent: true,
    effects: { statInf: 10, statPlt: 8 },
  },

  {
    id: "TRC_U_000329",
    name: [
      { code: "Kr", context: "민주주의의 어둠" },
      { code: "En", context: "Darkness of Democracy" },
      { code: "Jp", context: "民主主義の闇" },
    ],
    rarity: "unique",
    desc: "공포로 권력을 유지하는 노회한 정치가. 비밀경찰(애국기사단)을 통해 정적을 탄압하며, 위기 상황에서도 권력 보전을 최우선으로 행동한다. 정치공작과 정보 능력이 크게 향상되나, 군사적 위기 대응력은 떨어진다.",
    permanent: true,
    effects: { statInf: 12, statPlt: 15, statCmd: -10 },
  },

  {
    id: "TRC_U_000335",
    name: [
      { code: "Kr", context: "철의 법전" },
      { code: "En", context: "Iron Code" },
    ],
    rarity: "unique",
    desc: "법무 장교 출신답게 규율과 질서를 최우선으로 하는 행정형 지휘관. 운영 및 정보 능력이 극대화되지만 직접 전투 능력은 저하된다.",
    permanent: true,
    effects: { statMng: 8, statInf: 5, statAtt: -5 },
  },

  {
    id: "TRC_U_000338",
    name: [
      { code: "Kr", context: "각성한 책임감" },
      { code: "En", context: "Awakened Sense of Duty" },
      { code: "Jp", context: "覚醒した責任感" },
    ],
    rarity: "unique",
    desc: "평소엔 사리사욕에 충실하나, 진짜 위기가 닥치면 숨겨진 능력이 발휘되는 인물. 국가 위기 시 통솔력과 운영 능력이 크게 향상된다.",
    permanent: true,
    effects: {},
    conditionalEffects: [
      {
        // TODO: nation_crisis — 국가 위기(수도 위협/대규모 패전 등) 조건 (masterData.js)
        trigger: "nation_crisis",
        effects: { statCmd: 20, statMng: 15, statPlt: -10 },
      },
    ],
  },

  {
    id: "TRC_U_000429",
    name: [
      { code: "Kr", context: "요새의 방패" },
      { code: "En", context: "Fortress Shield" },
    ],
    rarity: "unique",
    desc: "이젤론 요새 사령관 경력에서 비롯된 방어 특화 능력. 방어와 운영 능력이 높지만 기동성이 낮다.",
    permanent: true,
    effects: { statDef: 8, statMng: 5, statFst: -5 },
  },

  {
    id: "TRC_U_000479",
    name: [
      { code: "Kr", context: "원칙고수" },
      { code: "En", context: "By the Book" },
    ],
    rarity: "unique",
    desc: "교과서적 전술을 고집하는 원칙주의자. 방어 운용은 안정적이지만 임기응변이 부족해 예상치 못한 상황에서 대응이 늦다.",
    permanent: true,
    effects: {
      statDef: 5,
      statFst: -5,
    },
  },

  {
    id: "TRC_U_000481",
    name: [
      { code: "Kr", context: "의안" },
      { code: "En", context: "Artificial Eyes" },
    ],
    rarity: "unique",
    desc: "의안으로 감정을 드러내지 않는 냉철한 시선. 어떤 상황에서도 흔들리지 않는 분석력과 정보 판단력을 발휘한다.",
    permanent: true,
    effects: { statInf: 8, statMng: 6, statPlt: 5 },
  },

  {
    id: "TRC_U_000506",
    name: [
      { code: "Kr", context: "완전기억" },
      { code: "En", context: "Eidetic Memory" },
    ],
    rarity: "unique",
    desc: "모든 것을 완벽히 기억하는 능력으로 정보 처리와 참모 역할을 극대화한다.",
    permanent: true,
    effects: { statInf: 10, statCsm: 5 },
  },

  // 프리드리히 4세 트레잇
  {
    id: "TRC_U_000514",
    name: [
      { code: "Kr", context: "재의 황제" },
      { code: "En", context: "Kaiser of the Ashes" },
    ],
    rarity: "unique",
    desc: "정사에 무관심하고 향락에 빠진 군주. 모든 통치 능력이 크게 저하되지만, 특정 조건에서 잠재된 통찰력이 깨어난다.",
    permanent: true,
    effects: { statMng: -20, statInf: -15, statPlt: -15, statCsm: -10 },
    conditionalEffects: [
      {
        // TODO: IF 시나리오 전용 — 이벤트로 TRC_U_000514_B로 교체
        trigger: "scenario_if_enlightened",
        effects: { statMng: 20, statInf: 15, statPlt: 15, statCsm: 10 },
      },
    ],
  },

  {
    id: "TRC_U_001514",
    name: [
      { code: "Kr", context: "일명견인" },
      { code: "En", context: "One Cry That Shakes the World" },
      { code: "Jp", context: "一鳴驚人" },
    ],
    rarity: "unique",
    desc: "3년간 울지 않은 새가 한 번 울면 천하를 놀라게 한다. 오랜 방관과 침묵 속에 제국의 본질을 통찰한 군주가 마침내 날개를 펼친다. 초장왕이 3년의 무위 끝에 패업을 이루었듯, 잠든 사자의 각성은 주변 모든 것을 뒤흔든다.",
    permanent: true,
    effects: { statMng: 25, statInf: 20, statPlt: 20, statCsm: 15 },
  },

  {
    id: "TRC_U_000515",
    name: [
      { code: "Kr", context: "흑색창기병" },
      { code: "En", context: "Black Lancer" },
    ],
    rarity: "unique",
    desc: "흑색창기병대의 수장답게 무한한 공격 본능을 지닌 돌격형 지휘관. 공격력과 기동력이 극대화되지만 방어 판단과 전략적 운영이 현저히 저하된다.",
    permanent: true,
    effects: { statAtt: 8, statFst: 5, statDef: -8, statMng: -5 },
  },

  {
    id: "TRC_U_000516",
    name: [
      { code: "Kr", context: "꽃밭을 망치는 해조" },
      { code: "En", context: "Blight Upon the Garden" },
      { code: "Jp", context: "花畑を荒らす害鳥" },
    ],
    rarity: "unique",
    desc: "신생 로엔그람 정권 출범 초기부터 라인하르트에게 강한 악감정을 드러낸 인물. 라인하르트 폰 로엔그람과의 관계가 극단적으로 악화되어 있다.",
    permanent: true,
    effects: {},
    conditionalEffects: [
      {
        // TODO: relation_fixed — 특정 인물 간 고정 관계 보정 (masterData.js)
        trigger: "relation_calc_vs_CH_000064",
        effects: { friendBonus: -100 },
      },
    ],
  },

  {
    id: "TRC_U_000527",
    name: [
      { code: "Kr", context: "소수의 지배" },
      { code: "En", context: "Rule of the Minority" },
      { code: "Jp", context: "少数支配" },
    ],
    rarity: "unique",
    desc: "다수란 결국 소수의 결집으로 좌우된다는 지배 이론을 신봉하는 모략가. 성계 방위사령관·행정관으로 부임할 경우, 매월 시작일에 해당 성계 인구 1을 현 국가 체제와 동일한 idea로 변경시킨다.",
    permanent: true,
    effects: { statInf: 5, statPlt: 5 },
    conditionalEffects: [
      {
        // TODO: is_governor_or_defender — 방위사령관/행정관 역할 조건, 매월 1일 트리거 (masterData.js)
        trigger: "monthly_governor_tick",
        effects: { ideaConvertPop: 1 },
      },
    ],
  },

  {
    id: "TRC_U_000533",
    name: [
      { code: "Kr", context: "꽃밭을 망치는 해조" },
      { code: "En", context: "Blight Upon the Garden" },
      { code: "Jp", context: "花畑を荒らす害鳥" },
    ],
    rarity: "unique",
    desc: "신생 로엔그람 정권 출범 초기부터 라인하르트에게 강한 악감정을 드러낸 인물. 라인하르트 폰 로엔그람과의 관계가 극단적으로 악화되어 있다.",
    permanent: true,
    effects: {},
    conditionalEffects: [
      {
        trigger: "relation_calc_vs_CH_000064",
        effects: { friendBonus: -100 },
      },
    ],
  },

  {
    id: "TRC_U_000559",
    name: [
      { code: "Kr", context: "전략적 통찰" },
      { code: "En", context: "Strategic Insight" },
    ],
    rarity: "unique",
    desc: "탁월한 정치적 직관과 전략적 사고로 상황을 꿰뚫어 보는 능력. 운영과 정보 능력이 극대화된다.",
    permanent: true,
    effects: { statMng: 8, statInf: 6 },
  },

  {
    id: "TRC_U_000550",
    name: [
      { code: "Kr", context: "후위의 방패" },
      { code: "En", context: "Rearguard Shield" },
    ],
    rarity: "unique",
    desc: "아군이 압도적으로 불리한 상황에서 자신의 피해를 무릅쓰고 적을 향해 돌격, 아군의 퇴각로를 열어준다. 운영·방어 능력이 향상되며, 아군 함대 위기 시 공격력이 급등하는 대신 자함 피해가 증가한다.",
    permanent: true,
    effects: { statMng: 6, statDef: 3 },
    conditionalEffects: [
      {
        // TODO: ally_fleet_critical — 아군 함대가 위기(전력 50% 이하) 상태일 때 트리거
        trigger: "ally_fleet_critical",
        effects: { statAtt: 15, selfDamageMult: 1.5 },
      },
    ],
  },

  {
    id: "TRC_G_001",
    name: [
      { code: "Kr", context: "현실부정" },
      { code: "En", context: "Reality Denial" },
    ],
    rarity: "uncommon",
    desc: "불리한 상황을 이론이나 기대에 맞지 않는다며 인정하지 않는 경향. 위기 상황에서 판단이 늦어지고 정보를 왜곡해 해석한다.",
    permanent: true,
    effects: {},
  },

  {
    id: "TRC_G_002",
    name: [
      { code: "Kr", context: "전쟁 혐오" },
      { code: "En", context: "War-Weary" },
    ],
    rarity: "uncommon",
    desc: "전쟁을 인류 최악의 행위로 여기며 승리보다 자국민의 생명을 우선시한다. 불필요한 교전을 피하려 하며, 전투 개시 판단에서 소극적인 반응을 보인다.",
    permanent: true,
    effects: {},
  },

  {
    id: "TRC_G_003",
    name: [
      { code: "Kr", context: "충실한 보좌관" },
      { code: "En", context: "Loyal Aide" },
    ],
    rarity: "common",
    desc: "사령관을 가까이서 보좌하며 지휘 체계를 안정시키는 인물. 부관으로 배속된 함대의 사령관 효과를 증폭시킨다.",
    permanent: true,
    effects: { statMng: 5, statInf: 5 },
    conditionalEffects: [
      {
        // TODO: is_adjutant — 부관(O) 역할로 함대 배속 시 조건 (masterData.js)
        trigger: "is_adjutant",
        effects: { statCmd: 5 },
      },
    ],
  },

  {
    id: "TRC_G_004",
    name: [
      { code: "Kr", context: "독선" },
      { code: "En", context: "Self-Reliant Command" },
    ],
    rarity: "uncommon",
    desc: "다른 이의 의견을 듣지 않고 자신의 판단만을 믿는 사령관. 함대 사령관으로 배속될 경우, 해당 함대는 부관·분함대장 등 다른 인물의 보정 효과를 받지 않는다.",
    permanent: true,
    effects: {},
    conditionalEffects: [
      {
        // TODO: is_fleet_commander — 함대 사령관(C) 역할 조건 (masterData.js)
        trigger: "is_fleet_commander",
        effects: { fleetIgnoreOtherBonus: true },
      },
    ],
  },

  {
    id: "TRC_G_005",
    name: [
      { code: "Kr", context: "엄격한 군율" },
      { code: "En", context: "Strict Discipline" },
    ],
    rarity: "uncommon",
    desc: "엄격한 군율로 부대를 통제하는 지휘관. 함대 사령관으로 배속될 경우, 해당 함대의 방어력과 사기가 향상되지만 병사들과의 친밀도 형성은 어려워진다.",
    permanent: true,
    effects: {},
    conditionalEffects: [
      {
        // TODO: is_fleet_commander — 함대 사령관(C) 역할 조건 (masterData.js)
        trigger: "is_fleet_commander",
        effects: { statDef: 8, statPlt: 8, statCsm: -10 },
      },
    ],
  },

  {
    id: "TRC_G_006",
    name: [
      { code: "Kr", context: "행운" },
      { code: "En", context: "Fortune's Favor" },
    ],
    rarity: "rare",
    desc: "수많은 격전을 거치고도 살아남는 불가사의한 운. 전투 중 사망 판정에서 제외된다 (중상/포로 등으로 대체).",
    permanent: true,
    effects: {},
    conditionalEffects: [
      {
        // TODO: battle_death_check — 전투 사망 판정 시점 개입 조건 (masterData.js)
        trigger: "battle_death_check",
        effects: { deathImmune: true },
      },
    ],
  },

  {
    id: "TRC_G_007",
    name: [
      { code: "Kr", context: "모략의 대가" },
      { code: "En", context: "Master Schemer" },
    ],
    rarity: "uncommon",
    desc: "은밀한 제안과 모략에 능숙한 인물. 제안·모략 실행 시 상대의 수락 확률에 보너스를 받는다.",
    permanent: true,
    effects: { statPlt: 6 },
    conditionalEffects: [
      {
        // TODO: agenda_propose — 제안/모략 실행 판정 시점 (masterData.js)
        trigger: "agenda_propose",
        effects: { acceptRateBonus: 15 },
      },
    ],
  },

  {
    id: "TRC_G_008",
    name: [
      { code: "Kr", context: "아른거리는 그림자" },
      { code: "En", context: "Lurking Shadow" },
    ],
    rarity: "uncommon",
    desc: "배후에서 은밀히 움직이는 자. 제안·모략 실행 시 발각되지 않도록 보안도에 보너스를 받는다.",
    permanent: true,
    effects: { statInf: 6 },
    conditionalEffects: [
      {
        // TODO: agenda_propose — 제안/모략 실행 판정 시점 (masterData.js)
        trigger: "agenda_propose",
        effects: { securityBonus: 15 },
      },
    ],
  },

  {
    id: "TRC_G_009",
    name: [
      { code: "Kr", context: "고귀한 혈통" },
      { code: "En", context: "Noble Lineage" },
    ],
    rarity: "common",
    desc: "명문 귀족가의 혈통을 이어받은 자. 매월 1일마다 군사 경험치를 획득한다.",
    permanent: true,
    effects: {},
    conditionalEffects: [
      {
        // TODO: monthly_tick — 매월 1일 트리거 (masterData.js)
        trigger: "monthly_tick",
        effects: { milExpGain: 5 },
      },
    ],
  },

  {
    id: "TRC_G_010",
    name: [
      { code: "Kr", context: "문벌 귀족" },
      { code: "En", context: "House of Old Nobility" },
    ],
    rarity: "common",
    desc: "문벌귀족으로서의 동류의식이 강하다. 동일 트레잇 보유자와의 관계는 우호적이나, 미보유자에게는 배타적인 태도를 보인다.",
    permanent: true,
    effects: {},
    conditionalEffects: [
      {
        // TODO: relation_calc — 두 인물 간 관계치 계산 시점 (masterData.js)
        trigger: "relation_calc_same_trait",
        effects: { friendBonus: 20 },
      },
      {
        trigger: "relation_calc_diff_trait",
        effects: { friendBonus: -20 },
      },
    ],
  },

  {
    id: "TRC_G_011",
    name: [
      { code: "Kr", context: "청렴함" },
      { code: "En", context: "Incorruptible" },
    ],
    rarity: "uncommon",
    desc: "뇌물과 회유에 흔들리지 않는 강직한 성품. 모략의 대상이 되었을 때 상대의 성공 확률이 감소한다.",
    permanent: true,
    effects: { statPlt: -5 },
    conditionalEffects: [
      {
        // TODO: agenda_target — 모략의 대상이 되는 시점 (masterData.js)
        trigger: "agenda_target",
        effects: { successRatePenalty: -15 },
      },
    ],
  },

  // ── 공통 트레잇 (general) ─────────────────────────────────────
  {
    id: "TRC_G_012",
    name: [
      { code: "Kr", context: "은퇴(군)" },
      { code: "En", context: "Retired (Military)" },
    ],
    rarity: "common",
    desc: "군에서 은퇴한 인물. 더 이상 현역 군무에 종사하지 않는다.",
    permanent: true,
    effects: {},
  },

  {
    id: "TRC_G_013",
    name: [
      { code: "Kr", context: "조율자" },
      { code: "En", context: "Mediator" },
    ],
    rarity: "uncommon",
    desc: "강한 개성을 가진 인재들 사이의 의견을 조율하고 갈등을 해소하는 데 능숙하다. 소속 파벌/함대 내 다른 인물과의 친밀도 계산 시 보정을 받는다. (레벨별 보정 적용)",
    permanent: true,
    effects: {},
    conditionalEffects: [
      {
        // TODO: same_group_friend_calc — 동일 소속(파벌/함대) 인물 간 친밀도 계산 시점 (masterData.js)
        // 레벨(LV)별 보정값: LV1~5 → friendBonus 3 * LV
        trigger: "same_group_friend_calc",
        effects: { friendBonus: 3 }, // LV1 기준, 레벨별 배수는 traitLv로 곱연산
      },
    ],
  },

  {
    id: "TRC_G_014",
    name: [
      { code: "Kr", context: "참모" },
      { code: "En", context: "Chief of Staff" },
    ],
    rarity: "uncommon",
    desc: "지휘관을 보좌하는 데 특화된 참모형 인재. 소속 파벌리더/함대사령관의 지휘·통솔력에 보정을 부여한다. (레벨별 보정 적용)",
    permanent: true,
    effects: {},
    conditionalEffects: [
      {
        // TODO: leader_stat_boost — 소속 파벌리더/함대사령관 스탯 보정 시점 (masterData.js)
        // 레벨(LV)별 보정값: LV1~5 → statCmd/statCsm +1 * LV
        trigger: "leader_stat_boost",
        effects: { leaderStatCmd: 1, leaderStatCsm: 1 }, // LV1 기준
      },
    ],
  },

  {
    id: "TRC_G_015",
    name: [
      { code: "Kr", context: "은퇴(정계)" },
      { code: "En", context: "Retired (Politics)" },
    ],
    rarity: "common",
    desc: "정계에서 은퇴한 인물. 더 이상 공직에 종사하지 않는다.",
    permanent: true,
    effects: {},
  },

  {
    id: "TRC_G_016",
    name: [
      { code: "Kr", context: "기사도" },
      { code: "En", context: "Chivalry" },
    ],
    rarity: "uncommon",
    desc: "명예와 의리를 중시하는 귀족적 품성. moral에 레벨별 보정을 받는다.",
    permanent: true,
    effects: { moral: 2 }, // LV1 기준, 레벨별 배수는 traitLv로 곱연산
  },

  {
    id: "TRC_G_017",
    name: [
      { code: "Kr", context: "선량함" },
      { code: "En", context: "Kindness" },
    ],
    rarity: "common",
    desc: "온화하고 너그러운 성품. 다른 인물과의 친밀도 계산 시 레벨별 보정을 받는다.",
    permanent: true,
    effects: {},
    conditionalEffects: [
      {
        // TODO: friend_calc_general — 일반 친밀도 계산 시점 (masterData.js)
        trigger: "friend_calc_general",
        effects: { friendBonus: 3 }, // LV1 기준
      },
    ],
  },

  {
    id: "TRC_G_018",
    name: [
      { code: "Kr", context: "전환장애" },
      { code: "En", context: "Conversion Disorder" },
    ],
    rarity: "rare",
    desc: "극심한 스트레스 상황에서 정신적 압박이 신체 기능 저하로 전환되는 증세. 전투 참여 중 아군이 불리할 때, 전투 종료 시까지 매 턴 모든 능력치가 누적 감소한다. (레벨별 최대 누적치 적용)",
    permanent: true,
    effects: {},
    conditionalEffects: [
      {
        // TODO: battle_disadvantaged_per_turn — 전투 중 아군 불리 시 매 턴 트리거 (masterData.js)
        // 레벨(LV)별 최대 누적치: 10 * LV
        trigger: "battle_disadvantaged_per_turn",
        effects: { allStatPenaltyPerTurn: -10, maxStack: 10 }, // LV1 기준, LV4면 maxStack 40
      },
    ],
  },

  // ── 상태 트레잇 (status) ──────────────────────────────────────
  {
    id: "TRC_S_001",
    name: [
      { code: "Kr", context: "위경련" },
      { code: "En", context: "Gastric Spasms" },
    ],
    rarity: "common",
    desc: "만성 위경련을 앓고 있다. 전투 중 스트레스가 극에 달하면 증세가 악화되어 지휘 판단에 지장을 초래한다.",
    permanent: true,
    effects: {},
  },
];

export const CHAR_TRAIT_MAP = Object.fromEntries(
  CHAR_TRAITS_MASTER.map((t) => [t.id, t])
);
