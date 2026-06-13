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

  // 오스카 폰 로이엔탈
  {
    charCode: "CH_000301",
    traitCode: "TRC_U_000301",
    traitLv: 0,
    traitExp: 0,
    traitStDate: 0,
    traitEdDate: null,
  },
  // 파울 폰 오베르슈타인
  {
    charCode: "CH_000481",
    traitCode: "TRC_U_000481",
    traitLv: 0,
    traitExp: 0,
    traitStDate: 0,
    traitEdDate: null,
  },
  // 프리츠 요제프 비텐펠트
  {
    charCode: "CH_000515",
    traitCode: "TRC_U_000515",
    traitLv: 0,
    traitExp: 0,
    traitStDate: 0,
    traitEdDate: null,
  },
  // 나이트하르트 뮐러
  {
    charCode: "CH_000032",
    traitCode: "TRC_U_000032",
    traitLv: 0,
    traitExp: 0,
    traitStDate: 0,
    traitEdDate: null,
  },
  // 울리히 케슬러
  {
    charCode: "CH_000335",
    traitCode: "TRC_U_000335",
    traitLv: 0,
    traitExp: 0,
    traitStDate: 0,
    traitEdDate: null,
  },
  // 코르넬리아스 루츠
  {
    charCode: "CH_000429",
    traitCode: "TRC_U_000429",
    traitLv: 0,
    traitExp: 0,
    traitStDate: 0,
    traitEdDate: null,
  },
  // 알렉산드르 뷰코크
  {
    charCode: "CH_000254",
    traitCode: "TRC_U_000254",
    traitLv: 0,
    traitExp: 0,
    traitStDate: 0,
    traitEdDate: null,
  },
  // 시드니 시톨레
  {
    charCode: "CH_000230",
    traitCode: "TRC_U_000230",
    traitLv: 0,
    traitExp: 0,
    traitStDate: 0,
    traitEdDate: null,
  },
  // 에드윈 피셔
  {
    charCode: "CH_000270",
    traitCode: "TRC_U_000270",
    traitLv: 0,
    traitExp: 0,
    traitStDate: 0,
    traitEdDate: null,
  },
  // 프레데리카 그린힐
  {
    charCode: "CH_000506",
    traitCode: "TRC_U_000506",
    traitLv: 0,
    traitExp: 0,
    traitStDate: 0,
    traitEdDate: null,
  },
  // 바그다쉬
  {
    charCode: "CH_000148",
    traitCode: "TRC_U_000148",
    traitLv: 0,
    traitExp: 0,
    traitStDate: 0,
    traitEdDate: null,
  },
  // 아우구스트 자무엘 바렌
  {
    charCode: "CH_000241",
    traitCode: "TRC_U_000241",
    traitLv: 0,
    traitExp: 0,
    traitStDate: 0,
    traitEdDate: null,
  },
  // 에르네스트 메크링거
  {
    charCode: "CH_000272",
    traitCode: "TRC_U_000272",
    traitLv: 0,
    traitExp: 0,
    traitStDate: 0,
    traitEdDate: null,
  },
  // 힐데가르트 폰 마린도르프
  {
    charCode: "CH_000559",
    traitCode: "TRC_U_000559",
    traitLv: 0,
    traitExp: 0,
    traitStDate: 0,
    traitEdDate: null,
  },
  // 더스티 아텐보로
  { charCode: "CH_000043", traitCode: "TRC_U_000043", traitLv: 0, traitExp: 0, traitStDate: 0, traitEdDate: null },
  // 발터 폰 쇤코프
  { charCode: "CH_000156", traitCode: "TRC_U_000156", traitLv: 0, traitExp: 0, traitStDate: 0, traitEdDate: null },
  // 알렉스 카젤느
  { charCode: "CH_000255", traitCode: "TRC_U_000255", traitLv: 0, traitExp: 0, traitStDate: 0, traitEdDate: null },
  // 드와이트 그린힐
  { charCode: "CH_000055", traitCode: "TRC_U_000055", traitLv: 0, traitExp: 0, traitStDate: 0, traitEdDate: null },
  // 제시카 에드워즈
  { charCode: "CH_000371", traitCode: "TRC_U_000371", traitLv: 0, traitExp: 0, traitStDate: 0, traitEdDate: null },
  // 볼프강 미터마이어
  {
    charCode: "CH_000173",
    traitCode: "TRC_U_000173",
    traitLv: 0,
    traitExp: 0,
    traitStDate: 0,
    traitEdDate: null,
  },
];

export const CHAR_TRAIT_MAP = Object.fromEntries(
  CHAR_TRAITS_MASTER.map((t) => [t.id, t])
);

// ================================================================
//  캐릭터-트레잇 할당 목록 (구 charactersTraits.js)
//  charCode:     대상 캐릭터 키 (charactersData.js)
//  traitCode:    대상 트레잇 키 (CHAR_TRAITS_MASTER)
//  traitStDate:  취득 턴 (0=처음부터)
//  traitEdDate:  종료 턴 (null=영구)
// ================================================================

export const CHAR_TRAITS = [
  // 무어
  {
    charCode: "CH_000139",
    traitCode: "TRC_U_000139",
    traitLv: 0,
    traitExp: 0,
    traitStDate: 0,
    traitEdDate: null,
  },
  // 빌리바르트 요아힘 폰 메르카츠
  {
    charCode: "CH_000195",
    traitCode: "TRC_U_000195",
    traitLv: 0,
    traitExp: 0,
    traitStDate: 0,
    traitEdDate: null,
  },
  // 아달베르트 폰 파렌하이트
  {
    charCode: "CH_000233",
    traitCode: "TRC_U_000233",
    traitLv: 0,
    traitExp: 0,
    traitStDate: 0,
    traitEdDate: null,
  },
  // 양 웬리
  {
    charCode: "CH_000266",
    traitCode: "TRC_U_000266",
    traitLv: 0,
    traitExp: 0,
    traitStDate: 0,
    traitEdDate: null,
  },
  {
    charCode: "CH_000266",
    traitCode: "TRC_G_002",
    traitLv: 0,
    traitExp: 0,
    traitStDate: 0,
    traitEdDate: null,
  },
  // 파에타
  {
    charCode: "CH_000479",
    traitCode: "TRC_U_000479",
    traitLv: 0,
    traitExp: 0,
    traitStDate: 0,
    traitEdDate: null,
  },
  {
    charCode: "CH_000479",
    traitCode: "TRC_G_001",
    traitLv: 0,
    traitExp: 0,
    traitStDate: 0,
    traitEdDate: null,
  },
  // 슈타덴
  {
    charCode: "CH_000223",
    traitCode: "TRC_U_000223",
    traitLv: 0,
    traitExp: 0,
    traitStDate: 0,
    traitEdDate: null,
  },
  {
    charCode: "CH_000223",
    traitCode: "TRC_G_001",
    traitLv: 0,
    traitExp: 0,
    traitStDate: 0,
    traitEdDate: null,
  },
  {
    charCode: "CH_000223",
    traitCode: "TRC_S_001",
    traitLv: 0,
    traitExp: 0,
    traitStDate: 0,
    traitEdDate: null,
  },
];
