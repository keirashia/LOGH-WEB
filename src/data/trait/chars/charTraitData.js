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
