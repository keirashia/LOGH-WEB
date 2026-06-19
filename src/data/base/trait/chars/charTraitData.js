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
  {
    id: "TRC_U_000043",
    nameKr: "허허실실의 귀재",
    nameEn: "Master of Feint and Deception",
    nameJp: "虚々実々の名手",
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
    id: "TRC_U_000527",
    nameKr: "소수의 지배",
    nameEn: "Rule of the Minority",
    nameJp: "少数支配",
    rarity: "unique",
    desc: "다수란 결국 소수의 결집으로 좌우된다는 지배 이론을 신봉하는 모략가. 성계 방위사령관·행정관으로 부임할 경우, 매월 시작일에 해당 성계 인구 1을 현 국가 체제와 동일한 idea로 변경시킨다.",
    permanent: true,
    effects: { statInf: 5, statMmp: 5 },
    conditionalEffects: [
      {
        // TODO: is_governor_or_defender — 방위사령관/행정관 역할 조건, 매월 1일 트리거 (masterData.js)
        trigger: "monthly_governor_tick",
        effects: { ideaConvertPop: 1 },
      },
    ],
  },
  {
    id: "TRC_U_000516",
    nameKr: "꽃밭을 망치는 해조",
    nameEn: "Blight Upon the Garden",
    nameJp: "花畑を荒らす害鳥",
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
    id: "TRC_U_000533",
    nameKr: "꽃밭을 망치는 해조",
    nameEn: "Blight Upon the Garden",
    nameJp: "花畑を荒らす害鳥",
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
  {
    id: "TRC_G_003",
    nameKr: "충실한 보좌관",
    nameEn: "Loyal Aide",
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
    nameKr: "독선",
    nameEn: "Self-Reliant Command",
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
    nameKr: "엄격한 군율",
    nameEn: "Strict Discipline",
    rarity: "uncommon",
    desc: "엄격한 군율로 부대를 통제하는 지휘관. 함대 사령관으로 배속될 경우, 해당 함대의 방어력과 사기가 향상되지만 병사들과의 친밀도 형성은 어려워진다.",
    permanent: true,
    effects: {},
    conditionalEffects: [
      {
        // TODO: is_fleet_commander — 함대 사령관(C) 역할 조건 (masterData.js)
        trigger: "is_fleet_commander",
        effects: { statDef: 8, statMmp: 8, statCsm: -10 },
      },
    ],
  },
  {
    id: "TRC_G_006",
    nameKr: "행운",
    nameEn: "Fortune's Favor",
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
    nameKr: "모략의 대가",
    nameEn: "Master Schemer",
    rarity: "uncommon",
    desc: "은밀한 제안과 모략에 능숙한 인물. 제안·모략 실행 시 상대의 수락 확률에 보너스를 받는다.",
    permanent: true,
    effects: { statMmp: 6 },
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
    nameKr: "아른거리는 그림자",
    nameEn: "Lurking Shadow",
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
    nameKr: "고귀한 혈통",
    nameEn: "Noble Lineage",
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
    nameKr: "문벌 귀족",
    nameEn: "House of Old Nobility",
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
    nameKr: "청렴함",
    nameEn: "Incorruptible",
    rarity: "uncommon",
    desc: "뇌물과 회유에 흔들리지 않는 강직한 성품. 모략의 대상이 되었을 때 상대의 성공 확률이 감소한다.",
    permanent: true,
    effects: { statMmp: -5 },
    conditionalEffects: [
      {
        // TODO: agenda_target — 모략의 대상이 되는 시점 (masterData.js)
        trigger: "agenda_target",
        effects: { successRatePenalty: -15 },
      },
    ],
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
