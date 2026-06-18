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
//    statMng, statInf, statGfg, statAfg, statMmp
//
//  permanent: true = 영구 / false = 임시 (traitEdDate로 소멸)
// ================================================================
// ... 데이터가 혼재되어있으니, 각 파일에 맞게 확인 후 등록해야함.

export const CHAR_TRAITS_MASTER = [
  // ── 고유 트레잇 (unique) ──────────────────────────────────────
  {
    id: "TRC_U_000139",
    nameKr: "독불장군",
    nameEn: "One-Man Army",
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
    id: "TRC_U_000195",
    nameKr: "노장의 진수",
    nameEn: "Old Guard's Pinnacle",
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
    id: "TRC_U_000233",
    nameKr: "돌격본능",
    nameEn: "Assault Instinct",
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
    id: "TRC_U_000266",
    nameKr: "마법사",
    nameEn: "The Magician",
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
    id: "TRC_U_000479",
    nameKr: "원칙고수",
    nameEn: "By the Book",
    rarity: "unique",
    desc: "교과서적 전술을 고집하는 원칙주의자. 방어 운용은 안정적이지만 임기응변이 부족해 예상치 못한 상황에서 대응이 늦다.",
    permanent: true,
    effects: {
      statDef: 5,
      statFst: -5,
    },
  },
  {
    id: "TRC_U_000223",
    nameKr: "이론무쌍",
    nameEn: "Master Theorist",
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
    id: "TRC_U_000301",
    nameKr: "금은요동",
    nameEn: "Gold and Silver Unrest",
    rarity: "unique",
    desc: "이색동공이 상징하듯 충성과 야망 사이에서 흔들리는 이중적 내면. 전략 판단과 지휘 능력이 극대화되지만, 특정 조건에서 반골 기질이 발동할 수 있다.",
    permanent: true,
    effects: { statCmd: 5, statMng: 8, statInf: 5 },
  },
  {
    id: "TRC_U_000481",
    nameKr: "의안",
    nameEn: "Artificial Eyes",
    rarity: "unique",
    desc: "의안으로 감정을 드러내지 않는 냉철한 시선. 어떤 상황에서도 흔들리지 않는 분석력과 정보 판단력을 발휘한다.",
    permanent: true,
    effects: { statInf: 8, statMng: 6, statMmp: 5 },
  },
  {
    id: "TRC_U_000515",
    nameKr: "흑색창기병",
    nameEn: "Black Lancer",
    rarity: "unique",
    desc: "흑색창기병대의 수장답게 무한한 공격 본능을 지닌 돌격형 지휘관. 공격력과 기동력이 극대화되지만 방어 판단과 전략적 운영이 현저히 저하된다.",
    permanent: true,
    effects: { statAtt: 8, statFst: 5, statDef: -8, statMng: -5 },
  },
  {
    id: "TRC_U_000032",
    nameKr: "철벽",
    nameEn: "Iron Wall",
    rarity: "unique",
    desc: "철저한 방어 태세와 냉정한 판단력으로 전선을 지키는 수비형 지휘관. 방어 능력이 극대화된다.",
    permanent: true,
    effects: { statDef: 10, statCsm: 5 },
  },
  {
    id: "TRC_U_000335",
    nameKr: "철의 법전",
    nameEn: "Iron Code",
    rarity: "unique",
    desc: "법무 장교 출신답게 규율과 질서를 최우선으로 하는 행정형 지휘관. 운영 및 정보 능력이 극대화되지만 직접 전투 능력은 저하된다.",
    permanent: true,
    effects: { statMng: 8, statInf: 5, statAtt: -5 },
  },
  {
    id: "TRC_U_000429",
    nameKr: "요새의 방패",
    nameEn: "Fortress Shield",
    rarity: "unique",
    desc: "이젤론 요새 사령관 경력에서 비롯된 방어 특화 능력. 방어와 운영 능력이 높지만 기동성이 낮다.",
    permanent: true,
    effects: { statDef: 8, statMng: 5, statFst: -5 },
  },
  {
    id: "TRC_U_000254",
    nameKr: "노병의 기개",
    nameEn: `Veteran's Spirit`,
    rarity: "unique",
    desc: "수십 년의 전장 경험에서 우러나오는 불굴의 의지. 지휘와 사기 능력이 극대화되지만 기동성은 떨어진다.",
    permanent: true,
    effects: { statCmd: 5, statMmp: 8, statFst: -5 },
  },
  {
    id: "TRC_U_000230",
    nameKr: "평행추격",
    nameEn: "Parallel Pursuit",
    rarity: "unique",
    desc: "독창적인 추격 전술로 적의 허를 찌르는 전략가. 지휘와 정보 능력이 향상된다.",
    permanent: true,
    effects: { statCmd: 5, statInf: 5, statDef: 3 },
  },
  {
    id: "TRC_U_000270",
    nameKr: "완벽한 기동",
    nameEn: "Perfect Manoeuvre",
    rarity: "unique",
    desc: "전장에서 함대 기동을 완벽히 구현하는 운동 전문가. 기동성과 참모 능력이 극대화된다.",
    permanent: true,
    effects: { statFst: 8, statCsm: 5 },
  },
  {
    id: "TRC_U_000506",
    nameKr: "완전기억",
    nameEn: "Eidetic Memory",
    rarity: "unique",
    desc: "모든 것을 완벽히 기억하는 능력으로 정보 처리와 참모 역할을 극대화한다.",
    permanent: true,
    effects: { statInf: 10, statCsm: 5 },
  },
  {
    id: "TRC_U_000148",
    nameKr: "이중첩자",
    nameEn: "Double Agent",
    rarity: "unique",
    desc: "양쪽 진영을 넘나든 경력에서 비롯된 탁월한 정보 수집 능력. 정보력이 극대화되지만 신뢰도에 페널티가 있다.",
    permanent: true,
    effects: { statInf: 10, statMmp: 5 },
  },
  {
    id: "TRC_U_000241",
    nameKr: "의수의 투지",
    nameEn: "Prosthetic Resolve",
    rarity: "unique",
    desc: "전장에서 팔을 잃고도 굴하지 않는 불굴의 투지. 공격 능력이 향상된다.",
    permanent: true,
    effects: { statAtt: 5, statBrave: 5 },
  },
  {
    id: "TRC_U_000272",
    nameKr: "예술가의 혼",
    nameEn: "Artistic Soul",
    rarity: "unique",
    desc: "예술적 감성으로 전장을 바라보는 독창적 지휘관. 사기와 정보 능력이 향상된다.",
    permanent: true,
    effects: { statMmp: 8, statInf: 5 },
  },
  {
    id: "TRC_U_000559",
    nameKr: "전략적 통찰",
    nameEn: "Strategic Insight",
    rarity: "unique",
    desc: "탁월한 정치적 직관과 전략적 사고로 상황을 꿰뚫어 보는 능력. 운영과 정보 능력이 극대화된다.",
    permanent: true,
    effects: { statMng: 8, statInf: 6 },
  },

  {
    id: "TRC_U_000173",
    nameKr: "질풍",
    nameEn: "Gale",
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
    id: "TRC_U_000006",
    nameKr: "제국의 금고",
    nameEn: "Imperial Treasury",
    rarity: "unique",
    desc: "제국 재정을 총괄하는 재무장관. 운영과 정치공작 능력이 향상된다.",
    permanent: true,
    effects: { statMng: 8, statMmp: 6 },
  },
  {
    id: "TRC_U_000250",
    nameKr: "페잔의 앞잡이",
    nameEn: `Fezzan's Pawn`,
    rarity: "unique",
    desc: "페잔의 사주를 받아 제국 내부를 교란하는 정보 조작 전문가. 정보 능력이 높지만 발각 시 치명적인 페널티를 받는다.",
    permanent: true,
    effects: { statInf: 10, statMng: 5 },
    conditionalEffects: [
      {
        // TODO: exposed_as_spy — 첩보 발각 조건 (masterData.js)
        trigger: "exposed_as_spy",
        effects: { statMmp: -30, statCsm: -20 },
      },
    ],
  },
  {
    id: "TRC_U_000306",
    nameKr: "최대 문벌",
    nameEn: "Greatest Noble House",
    rarity: "unique",
    desc: "골덴바움 왕조 최대 문벌귀족의 수장. 카리스마와 정치공작이 향상되나 군사적 판단력이 저하된다.",
    permanent: true,
    effects: { statCsm: 10, statMmp: 8, statCmd: -10 },
  },
  {
    id: "TRC_U_000198",
    nameKr: "허울뿐인 야망",
    nameEn: "Hollow Ambition",
    rarity: "unique",
    desc: "군사적 재능 없이 야망만 큰 귀족. 정치공작은 높지만 전투 능력 전반이 크게 저하된다.",
    permanent: true,
    effects: { statMmp: 8, statCmd: -15, statAtt: -10 },
  },
  // 프리드리히 4세 트레잇
  {
    id: "TRC_U_000514",
    nameKr: "재의 황제",
    nameEn: "Kaiser of the Ashes",
    rarity: "unique",
    desc: "정사에 무관심하고 향락에 빠진 군주. 모든 통치 능력이 크게 저하되지만, 특정 조건에서 잠재된 통찰력이 깨어난다.",
    permanent: true,
    effects: { statMng: -20, statInf: -15, statMmp: -15, statCsm: -10 },
    conditionalEffects: [
      {
        // TODO: IF 시나리오 전용 — 이벤트로 TRC_U_000514_B로 교체
        trigger: "scenario_if_enlightened",
        effects: { statMng: 20, statInf: 15, statMmp: 15, statCsm: 10 },
      },
    ],
  },
  {
    id: "TRC_U_000514_B",
    nameKr: "일명견인",
    nameEn: "One Cry That Shakes the World",
    nameJp: "一鳴驚人",
    rarity: "unique",
    desc: "3년간 울지 않은 새가 한 번 울면 천하를 놀라게 한다. 오랜 방관과 침묵 속에 제국의 본질을 통찰한 군주가 마침내 날개를 펼친다. 초장왕이 3년의 무위 끝에 패업을 이루었듯, 잠든 사자의 각성은 주변 모든 것을 뒤흔든다.",
    permanent: true,
    effects: { statMng: 25, statInf: 20, statMmp: 20, statCsm: 15 },
  },
  {
    id: "TRC_U_000247",
    nameKr: "배신의 충의",
    nameEn: "Loyal Betrayal",
    rarity: "unique",
    desc: "주군에 대한 충성과 도덕적 신념 사이에서 갈등하는 무인. 육전 능력이 높으며 주군이 비도덕적 행동을 취할 때 반발 트리거가 발동한다.",
    permanent: true,
    effects: { statGfg: 8, statAtt: 5 },
    conditionalEffects: [
      {
        // TODO: lord_immoral_act — 주군의 비도덕적 행동 트리거 (masterData.js)
        trigger: "lord_immoral_act",
        effects: { statMmp: -20 },
      },
    ],
  },
  {
    id: "TRC_U_000093",
    nameKr: "독사의 야망",
    nameEn: `Viper's Ambition`,
    rarity: "unique",
    desc: "아버지를 능가하려는 냉혹한 야망. 정보와 정치공작이 극대화되지만 도덕 수치가 낮고 발각 시 치명적 페널티를 받는다.",
    permanent: true,
    effects: { statInf: 8, statMmp: 10 },
    conditionalEffects: [
      {
        trigger: "exposed_as_spy",
        effects: { statMmp: -30, statCsm: -25 },
      },
    ],
  },
  {
    id: "TRC_U_000263",
    nameKr: "재앙의 기획자",
    nameEn: "Architect of Disaster",
    rarity: "unique",
    desc: "뛰어난 두뇌를 가졌으나 현실을 외면하는 야망가. 운영 능력이 높지만 전황이 불리해질수록 판단력이 급격히 저하된다.",
    permanent: true,
    effects: { statMng: 8 },
    conditionalEffects: [
      {
        trigger: "battle_disadvantaged",
        effects: { statMng: -20, statInf: -15 },
      },
    ],
  },
  // ── 공통 트레잇 (general) ─────────────────────────────────────
  {
    id: "TRC_G_001",
    nameKr: "현실부정",
    nameEn: "Reality Denial",
    rarity: "uncommon",
    desc: "불리한 상황을 이론이나 기대에 맞지 않는다며 인정하지 않는 경향. 위기 상황에서 판단이 늦어지고 정보를 왜곡해 해석한다.",
    permanent: true,
    effects: {},
  },
  {
    id: "TRC_G_002",
    nameKr: "전쟁 혐오",
    nameEn: "War-Weary",
    rarity: "uncommon",
    desc: "전쟁을 인류 최악의 행위로 여기며 승리보다 자국민의 생명을 우선시한다. 불필요한 교전을 피하려 하며, 전투 개시 판단에서 소극적인 반응을 보인다.",
    permanent: true,
    effects: {},
  },

  // ── 상태 트레잇 (status) ──────────────────────────────────────
  {
    id: "TRC_S_001",
    nameKr: "위경련",
    nameEn: "Gastric Spasms",
    rarity: "common",
    desc: "만성 위경련을 앓고 있다. 전투 중 스트레스가 극에 달하면 증세가 악화되어 지휘 판단에 지장을 초래한다.",
    permanent: true,
    effects: {},
  },
];

export const CHAR_TRAIT_MAP = Object.fromEntries(
  CHAR_TRAITS_MASTER.map((t) => [t.id, t])
);
