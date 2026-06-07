// ================================================================
//  charTraitData.js — 인물 트레잇 마스터
//  경로: src/data/trait/chars/charTraitData.js
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

export const CHAR_TRAITS_MASTER = [

  // ── 고유 트레잇 (unique) ──────────────────────────────────────
  {
    id:        'TRC_U_000139',
    nameKr:    '독불장군',
    nameEn:    'One-Man Army',
    rarity:    'unique',
    desc:      '참모의 조언을 무시하고 무모한 정면 돌격을 감행하는 경향. 압도적인 공격력을 발휘하지만 방어 판단과 전략적 운영이 극도로 저하된다.',
    permanent: true,
    effects: {
      statAtt:  8,
      statDef: -12,
      statMng:  -8,
    },
  },
  {
    id:        'TRC_U_000195',
    nameKr:    '노장의 진수',
    nameEn:    "Old Guard's Pinnacle",
    rarity:    'unique',
    desc:      '수십 년의 실전 경험으로 단련된 노련한 지휘 능력. 수세에 몰린 상황에서도 냉철하게 병력을 운용하여 피해를 최소화한다.',
    permanent: true,
    effects: {
      statCmd:  5,
      statDef:  8,
      statMng:  5,
    },
  },
  {
    id:        'TRC_U_000233',
    nameKr:    '돌격본능',
    nameEn:    'Assault Instinct',
    rarity:    'unique',
    desc:      '선제 돌격을 본능처럼 구사하는 공격형 지휘관. 기동력과 공격력이 극대화되지만 수비적 상황에서 불리하다.',
    permanent: true,
    effects: {
      statAtt: 10,
      statFst:  8,
      statDef: -5,
    },
  },
  {
    id:        'TRC_U_000266',
    nameKr:    '마법사',
    nameEn:    'The Magician',
    rarity:    'unique',
    desc:      '역사에 대한 해박한 지식과 직관으로 적의 의도를 꿰뚫고 기상천외한 전략으로 승리를 쟁취한다. 은하역사상 최고의 수비형 전략가.',
    permanent: true,
    effects: {
      statCmd:  5,
      statDef:  8,
      statInf:  5,
    },
  },
  {
    id:        'TRC_U_000479',
    nameKr:    '원칙고수',
    nameEn:    'By the Book',
    rarity:    'unique',
    desc:      '교과서적 전술을 고집하는 원칙주의자. 방어 운용은 안정적이지만 임기응변이 부족해 예상치 못한 상황에서 대응이 늦다.',
    permanent: true,
    effects: {
      statDef:  5,
      statFst: -5,
    },
  },
  {
    id:        'TRC_U_000223',
    nameKr:    '이론무쌍',
    nameEn:    'Master Theorist',
    rarity:    'unique',
    desc:      '전술·전략 이론에 정통하여 운영 및 정보 분석에서 탁월한 능력을 발휘한다. 그러나 이론에 의존하는 경향으로 기동 판단이 굳어지기 쉽다.',
    permanent: true,
    effects: {
      statMng:  8,
      statInf:  5,
      statFst: -5,
    },
  },

  // ── 공통 트레잇 (general) ─────────────────────────────────────
  {
    id:        'TRC_G_001',
    nameKr:    '현실부정',
    nameEn:    'Reality Denial',
    rarity:    'uncommon',
    desc:      '불리한 상황을 이론이나 기대에 맞지 않는다며 인정하지 않는 경향. 위기 상황에서 판단이 늦어지고 정보를 왜곡해 해석한다.',
    permanent: true,
    effects: {},
  },
  {
    id:        'TRC_G_002',
    nameKr:    '전쟁 혐오',
    nameEn:    'War-Weary',
    rarity:    'uncommon',
    desc:      '전쟁을 인류 최악의 행위로 여기며 승리보다 자국민의 생명을 우선시한다. 불필요한 교전을 피하려 하며, 전투 개시 판단에서 소극적인 반응을 보인다.',
    permanent: true,
    effects: {},
  },

  // ── 상태 트레잇 (status) ──────────────────────────────────────
  {
    id:        'TRC_S_001',
    nameKr:    '위경련',
    nameEn:    'Gastric Spasms',
    rarity:    'common',
    desc:      '만성 위경련을 앓고 있다. 전투 중 스트레스가 극에 달하면 증세가 악화되어 지휘 판단에 지장을 초래한다.',
    permanent: true,
    effects: {},
  },

]

export const CHAR_TRAIT_MAP = Object.fromEntries(
  CHAR_TRAITS_MASTER.map(t => [t.id, t])
)
