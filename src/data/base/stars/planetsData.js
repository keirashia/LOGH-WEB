// ================================================================
//  planetsData.js — 행성 마스터 데이터
//  경로: src/data/base/stars/planetsData.js
//  작성/통합: 2026-06-22
//
//  ⚠️ 핵심 변경 요약 (2026-06-22 일괄 작업):
//    - 아래 변경 내용은 planet뿐 아니라 starSystem의 값이 섞여있으니 확인하며 진행해야함.
//    - maps/starMaps.js 흡수, faction/corruption/treasury/pops 필드 신설
//    - pops.unit: 1unit=10만명, econMax 값을 그대로 사용(스케일링 없음). 지구는 나무위키 명시값 직접입력
//    - 샤텐부르크/리히텐부르크 삭제 → laneData.js의 lane 이름으로 전환
//    - 빌로스트/야반하르 독립 성계로 분리신설
//    - 오등작(공작~백작) 귀족 가문 영지 다수 신설(자작/남작은 행성 단위만, 이번 작업 범위 아님)
//    - 뮈켄베르거/케림/포르세티 빈 성계에 행성 보강
//    - REH/FPA 좌표 재배치: FPA 압축(x 56~596), REH 확장(x 700~2050)
//      → VW 1600에서 2100 이상으로 확장 필요 (GalaxyMap.vue 하드코딩값 별도 수정 필요)
//    - 외전/과거시점 성계 10곳 신설(230084~230093): 알타이르/베텔기우스/카노프스/프록시마/시리우스/
//      레자빅/포리슨/파라파라/프레뷔도/닛슈우히더스. 본편(우주력790년대) 시점과 무관, faction=null.
//      좌표는 본편 영역과 겹치지 않는 우하단 별도 구역(x:2150~2350, y:920~970)에 배치.
//      슈바라(SCHWARA)는 별도 성계가 아니라 프레뷔도(230092) 소속 행성으로 등록.
//
//  faction: base 디폴트값. 시나리오 stars/planetData.js(구 planetDetail.js)가 있으면 그쪽 우선.
// 참조 필요 planetDetailTrait.js > 추가해야함. 행성별로 보유한 트레잇코드를 담는다.
// > 트레잇의 상세 내용은 base/trait/stars/traitData.js의 파일명을 starTraitData.js로 변경 후, 사용
// 참조 필요 planetDetailBuilding.js > 추가해야함. 행성별로 보유한 건물코드를 담는다.
// > 건물의 상세 내용은 base/buildingData.js 의 데이터를 참조
// ================================================================

export const PLANETS = [
  // ── 230001 알멘트푸벨 ──────────────────────────────
  {
    code: "230001P01",
    starCode: "230001",
    nameKr: "바텐-도라흐",
    nameEn: "",
    nameJp: "",
    // type: "terrestrial", 삭제. 트레잇으로 이동
    // main: true, 삭제 트레잇으로 이동
    // fortress: null, // 삭제. 트레잇으로 이동
    x: 500,
    y: 500,
    size: 42,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: {
      unit: 2100, //인구수
      econ: [], //위 인구의 econ비율
      idea: [
        {
          code: 240,
          unit: 1638,
        },
      ],
      friend: [], //해당 성계의 친밀도. 국가의 요직 담당자, 성계의 행정관과 가깝지 않을 경우 좋지 않은 이벤트가 발생할 수 있다.
    },
    // _raw: econMax=2100 defCur=3500 defBase=5 garrison=0 support=78
    // [최신시나리오:일치] starCode=230001 name='바텐-도라흐' faction=REH
  },

  // ── 230002 가이에스부르크 ──────────────────────────────
  {
    code: "230002P01",
    starCode: "230002",
    nameKr: "가이에스부르크",
    nameEn: "",
    nameJp: "",
    type: "fortress",
    main: true,
    fortress: "GAISHBURG",
    x: 317,
    y: 572,
    size: 50,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 0, econ: [], idea: [] },
    // _raw: econMax=0 defCur=-15536 defBase=90 garrison=5 support=93 note=FORTRESS_실제econMax0
    // [최신시나리오:일치] starCode=230002 name='가이에스부르크' faction=REH
  },
  {
    code: "230002P02",
    starCode: "230002",
    nameKr: "헷세 카셀",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: false,
    fortress: null,
    x: 682,
    y: 427,
    size: 30,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 0, econ: [], idea: [] },
    // _raw: econMax=0 note=TODO_미수집
    // [최신시나리오:일치] starCode=230002 name='헤세-카셀' faction=REH
  },

  // ── 230003 클라잉겔트 ──────────────────────────────
  {
    code: "230003P01",
    starCode: "230003",
    nameKr: "클라잉겔트",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 787,
    y: 376,
    size: 42,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 750, econ: [], idea: [] },
    // _raw: econMax=750 defCur=3500 defBase=5 garrison=0 support=68
    // [최신시나리오:일치] starCode=230003 name='클라인겔트' faction=REH
  },
  {
    code: "230003P02",
    starCode: "230003",
    nameKr: "도벨그",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: false,
    fortress: null,
    x: 480,
    y: 755,
    size: 26,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 600, econ: [], idea: [] },
    // _raw: econMax=600 defCur=3500 support=68
    // [최신시나리오:일치] starCode=230003 name='도벨그' faction=REH
  },
  {
    code: "230003P03",
    starCode: "230003",
    nameKr: "모르겐",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: false,
    fortress: null,
    x: 241,
    y: 318,
    size: 32,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 750, econ: [], idea: [] },
    // _raw: econMax=750 defCur=3500 support=68
    // [최신시나리오:일치] starCode=230003 name='모르겐' faction=REH
  },

  // ── 230004 탄므즈 ──────────────────────────────
  {
    code: "230004P01",
    starCode: "230004",
    nameKr: "탄므즈",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 500,
    y: 500,
    size: 42,
    faction: "FPA",
    corruption: 0,
    treasury: 0,
    pops: { unit: 150, econ: [], idea: [] },
    // _raw: econMax=150 defCur=1000 defBase=0 garrison=0 support=95
    // [최신시나리오:일치] starCode=230004 name='탄므즈' faction=FPA
  },

  // ── 230005 아트라 하시스 ──────────────────────────────
  {
    code: "230005P01",
    starCode: "230005",
    nameKr: "아트라 하시스",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 398,
    y: 228,
    size: 42,
    faction: "FPA",
    corruption: 0,
    treasury: 0,
    pops: { unit: 45, econ: [], idea: [] },
    // _raw: econMax=45 defCur=1000 defBase=0 garrison=0 support=62
    // [최신시나리오:일치] starCode=230005 name='아트라-하시스' faction=FPA
  },
  {
    code: "230005P02",
    starCode: "230005",
    nameKr: "아스페륀",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: false,
    fortress: null,
    x: 758,
    y: 544,
    size: 25,
    faction: "FPA",
    corruption: 0,
    treasury: 0,
    pops: { unit: 0, econ: [], idea: [] },
    // _raw: econMax=0 note=TODO_미수집
    // [최신시나리오:일치] starCode=230005 name='아스페륀' faction=FPA
  },
  {
    code: "230005P03",
    starCode: "230005",
    nameKr: "우가리트",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: false,
    fortress: null,
    x: 316,
    y: 728,
    size: 25,
    faction: "FPA",
    corruption: 0,
    treasury: 0,
    pops: { unit: 0, econ: [], idea: [] },
    // _raw: econMax=0 note=TODO_미수집
    // [최신시나리오:일치] starCode=230005 name='우가리트' faction=FPA
  },

  // ── 230006 하이네센 ──────────────────────────────
  {
    code: "230006P01",
    starCode: "230006",
    nameKr: "하이네센",
    nameEn: "",
    nameJp: "",
    type: "capital",
    main: true,
    fortress: null,
    x: 527,
    y: 775,
    size: 55,
    faction: "FPA",
    corruption: 0,
    treasury: 0,
    pops: { unit: 9750, econ: [], idea: [] },
    // _raw: econMax=9750 defCur=11000 defBase=20 garrison=18 support=98
    // [최신시나리오:일치] starCode=230006 name='하이네센' faction=FPA
  },
  {
    code: "230006P02",
    starCode: "230006",
    nameKr: "시뤼나갈",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: false,
    fortress: null,
    x: 255,
    y: 376,
    size: 25,
    faction: "FPA",
    corruption: 0,
    treasury: 0,
    pops: { unit: 0, econ: [], idea: [] },
    // _raw: econMax=0 note=TODO_미수집
    // [최신시나리오:일치] starCode=230006 name='테르누젠' faction=FPA
  },
  {
    code: "230006P03",
    starCode: "230006",
    nameKr: "테르누젠",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: false,
    fortress: null,
    x: 724,
    y: 318,
    size: 32,
    faction: "FPA",
    corruption: 0,
    treasury: 0,
    pops: { unit: 0, econ: [], idea: [] },
    // _raw: econMax=0 note=TODO_미수집
    // [최신시나리오:일치] starCode=230006 name='스리나가르' faction=FPA
  },

  // ── 230007 프르샤 스쿠타 ──────────────────────────────
  {
    code: "230007P01",
    starCode: "230007",
    nameKr: "프르샤 스쿠타",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 500,
    y: 500,
    size: 42,
    faction: "FPA",
    corruption: 0,
    treasury: 0,
    pops: { unit: 150, econ: [], idea: [] },
    // _raw: econMax=150 defCur=1000 defBase=0 garrison=0 support=96
    // [최신시나리오:일치] starCode=230007 name='프르샤-스쿠타' faction=FPA
  },

  // ── 230008 보르소른 ──────────────────────────────
  {
    code: "230008P01",
    starCode: "230008",
    nameKr: "보르소른",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 467,
    y: 785,
    size: 42,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 900, econ: [], idea: [] },
    // _raw: econMax=900 defCur=3500 support=75
    // [최신시나리오:일치] starCode=230008 name='보르소른' faction=REH
  },
  {
    code: "230008P02",
    starCode: "230008",
    nameKr: "빌로스트",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: false,
    fortress: null,
    x: 265,
    y: 349,
    size: 26,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 900, econ: [], idea: [] },
    // _raw: econMax=900 defCur=3500 support=75
    // [최신시나리오:일치] starCode=230008 name='빌로스트' faction=REH
  },
  {
    code: "230008P03",
    starCode: "230008",
    nameKr: "알비스",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: false,
    fortress: null,
    x: 728,
    y: 376,
    size: 24,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 900, econ: [], idea: [] },
    // _raw: econMax=900 defCur=3500 support=75
    // [최신시나리오:일치] starCode=230008 name='알비스' faction=REH
  },

  // ── 230009 톤도르프 ──────────────────────────────
  {
    code: "230009P01",
    starCode: "230009",
    nameKr: "톤도르프",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 674,
    y: 588,
    size: 42,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 1800, econ: [], idea: [] },
    // _raw: econMax=1800 defCur=3500 defBase=5 garrison=1 support=83
    // [최신시나리오:일치] starCode=230009 name='톤도르프' faction=REH
  },
  {
    code: "230009P02",
    starCode: "230009",
    nameKr: "베스타란트",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: false,
    fortress: null,
    x: 325,
    y: 411,
    size: 24,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 0, econ: [], idea: [] },
    // _raw: econMax=0 note=TODO_미수집
    // [최신시나리오:일치] starCode=230009 name='베스타란트' faction=REH
  },

  // ── 230010 카프튜랑카 ──────────────────────────────
  {
    code: "230010P01",
    starCode: "230010",
    nameKr: "카프튜랑카",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 500,
    y: 500,
    size: 42,
    faction: "FPA",
    corruption: 0,
    treasury: 0,
    pops: { unit: 150, econ: [], idea: [] },
    // _raw: econMax=150 defCur=1500 defBase=1 garrison=1 support=95
    // [최신시나리오:일치] starCode=230010 name='카프튜랑카' faction=FPA
  },

  // ── 230011 델모퓌라이 ──────────────────────────────
  {
    code: "230011P01",
    starCode: "230011",
    nameKr: "델모퓌라이",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 635,
    y: 641,
    size: 42,
    faction: "FPA",
    corruption: 0,
    treasury: 0,
    pops: { unit: 600, econ: [], idea: [] },
    // _raw: econMax=600 defCur=11000 support=65
    // [최신시나리오:일치] starCode=230011 name='델모퓌라이' faction=FPA
  },
  {
    code: "230011P02",
    starCode: "230011",
    nameKr: "보이오이아",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: false,
    fortress: null,
    x: 364,
    y: 358,
    size: 26,
    faction: "FPA",
    corruption: 0,
    treasury: 0,
    pops: { unit: 600, econ: [], idea: [] },
    // _raw: econMax=600 defCur=3500 defBase=5 garrison=0 support=65
    // [최신시나리오:일치] starCode=230011 name='보이오이아' faction=FPA
  },

  // ── 230012 자크스 코프르크 ──────────────────────────────
  {
    code: "230012P01",
    starCode: "230012",
    nameKr: "자크스 코프르크",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 500,
    y: 500,
    size: 42,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 1200, econ: [], idea: [] },
    // _raw: econMax=1200 defCur=3500 defBase=5 garrison=0 support=63
    // [최신시나리오:일치] starCode=230012 name='자크스-코프르크' faction=REH
  },

  // ── 230013 악타이온 ──────────────────────────────
  {
    code: "230013P01",
    starCode: "230013",
    nameKr: "악타이온",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 500,
    y: 500,
    size: 42,
    faction: "FPA",
    corruption: 0,
    treasury: 0,
    pops: { unit: 2250, econ: [], idea: [] },
    // _raw: econMax=2250 defCur=3500 defBase=5 garrison=0 support=83
    // [최신시나리오:일치] starCode=230013 name='악타이온' faction=FPA
  },

  // ── 230014 베스트파리아 ──────────────────────────────
  {
    code: "230014P01",
    starCode: "230014",
    nameKr: "베스트파리아",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 506,
    y: 695,
    size: 42,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 750, econ: [], idea: [] },
    // _raw: econMax=750 defCur=3500 defBase=5 garrison=0 support=68
    // [최신시나리오:일치] starCode=230014 name='베스트파리아' faction=REH
  },
  {
    code: "230014P02",
    starCode: "230014",
    nameKr: "디사우",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: false,
    fortress: null,
    x: 493,
    y: 304,
    size: 29,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 750, econ: [], idea: [] },
    // _raw: econMax=750 defCur=3500 support=68
    // [최신시나리오:일치] starCode=230014 name='디사우' faction=REH
  },

  // ── 230015 다룸슈타트 ──────────────────────────────
  {
    code: "230015P01",
    starCode: "230015",
    nameKr: "다룸슈타트",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 500,
    y: 500,
    size: 42,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 2400, econ: [], idea: [] },
    // _raw: econMax=2400 defCur=3500 defBase=5 garrison=0 support=74
    // [최신시나리오:일치] starCode=230015 name='다룸슈타트' faction=REH
  },

  // ── 230016 샴프르 ──────────────────────────────
  {
    code: "230016P01",
    starCode: "230016",
    nameKr: "샴프르",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 756,
    y: 584,
    size: 42,
    faction: "FPA",
    corruption: 0,
    treasury: 0,
    pops: { unit: 1500, econ: [], idea: [] },
    // _raw: econMax=1500 defCur=3500 defBase=5 garrison=0 support=76
    // [최신시나리오:일치] starCode=230016 name='샴프르' faction=FPA
  },
  {
    code: "230016P02",
    starCode: "230016",
    nameKr: "보프 마나프",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: false,
    fortress: null,
    x: 284,
    y: 675,
    size: 22,
    faction: "FPA",
    corruption: 0,
    treasury: 0,
    pops: { unit: 900, econ: [], idea: [] },
    // _raw: econMax=900 defCur=3500 support=76
    // [최신시나리오:일치] starCode=230016 name='보프-마나프' faction=FPA
  },
  {
    code: "230016P03",
    starCode: "230016",
    nameKr: "메헤라브",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: false,
    fortress: null,
    x: 455,
    y: 259,
    size: 25,
    faction: "FPA",
    corruption: 0,
    treasury: 0,
    pops: { unit: 1200, econ: [], idea: [] },
    // _raw: econMax=1200 defCur=3500 support=76
    // [최신시나리오:일치] starCode=230016 name='메헤라브' faction=FPA
  },

  // ── 230017 엘 파실 ──────────────────────────────
  {
    code: "230017P01",
    starCode: "230017",
    nameKr: "엘 파실",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 660,
    y: 612,
    size: 42,
    faction: "FPA",
    corruption: 0,
    treasury: 0,
    pops: { unit: 900, econ: [], idea: [] },
    // _raw: econMax=900 defCur=3500 defBase=5 garrison=1 support=73
    // [최신시나리오:일치] starCode=230017 name='엘-파실' faction=FPA
  },
  {
    code: "230017P02",
    starCode: "230017",
    nameKr: "에스트레마도라",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: false,
    fortress: null,
    x: 339,
    y: 387,
    size: 25,
    faction: "FPA",
    corruption: 0,
    treasury: 0,
    pops: { unit: 0, econ: [], idea: [] },
    // _raw: econMax=0 note=TODO_미수집
    // [최신시나리오:일치] starCode=230017 name='에스트레마도라' faction=FPA
  },

  // ── 230018 우가리트 ──────────────────────────────
  {
    code: "230018P01",
    starCode: "230018",
    nameKr: "우가리트",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 357,
    y: 634,
    size: 42,
    faction: "FPA",
    corruption: 0,
    treasury: 0,
    pops: { unit: 150, econ: [], idea: [] },
    // _raw: econMax=150 defCur=1500 defBase=1 garrison=0 support=97
    // [최신시나리오:일치] starCode=230018 name='우가리트' faction=FPA
  },
  {
    code: "230018P02",
    starCode: "230018",
    nameKr: "라트보트",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: false,
    fortress: null,
    x: 642,
    y: 365,
    size: 30,
    faction: "FPA",
    corruption: 0,
    treasury: 0,
    pops: { unit: 150, econ: [], idea: [] },
    // _raw: econMax=150 defCur=1500 support=97
    // [최신시나리오:일치] starCode=230018 name='라트보트' faction=FPA
  },

  // ── 230019 렌텐베르크 ──────────────────────────────
  {
    code: "230019P01",
    starCode: "230019",
    nameKr: "렌텐베르크",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 677,
    y: 582,
    size: 42,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 0, econ: [], idea: [] },
    // _raw: econMax=0 defCur=30000 support=91 note=FORTRESS_실제econMax0
    // [최신시나리오:일치] starCode=230019 name='렌텐베르크' faction=REH
  },
  {
    code: "230019P02",
    starCode: "230019",
    nameKr: "니플헤임",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: false,
    fortress: null,
    x: 322,
    y: 417,
    size: 24,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 2250, econ: [], idea: [] },
    // _raw: econMax=2250 defCur=6000 defBase=10 garrison=0 support=91
    // [최신시나리오:일치] starCode=230019 name='니플헤임' faction=REH
  },

  // ── 230020 우르바시 ──────────────────────────────
  {
    code: "230020P01",
    starCode: "230020",
    nameKr: "우르바시",
    nameEn: "Urvashi",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 319,
    y: 686,
    size: 42,
    faction: "FPA",
    corruption: 0,
    treasury: 0,
    pops: { unit: 1350, econ: [], idea: [] },
    // _raw: econMax=1350 defCur=3500 defBase=5 garrison=0 support=73
    // [최신시나리오:일치] starCode=230020 name='우르바시' faction=FPA
  },
  {
    code: "230020P02",
    starCode: "230020",
    nameKr: "리시",
    nameEn: "Rishi",
    nameJp: "",
    type: "terrestrial",
    main: false,
    fortress: null,
    x: 436,
    y: 262,
    size: 28,
    faction: "FPA",
    corruption: 0,
    treasury: 0,
    pops: { unit: 1350, econ: [], idea: [] },
    // _raw: econMax=1350 defCur=3500 support=73
    // [최신시나리오:일치] starCode=230020 name='프라바스' faction=FPA
  },
  {
    code: "230020P03",
    starCode: "230020",
    nameKr: "푸르나바스",
    nameEn: "Pururavas",
    nameJp: "",
    type: "terrestrial",
    main: false,
    fortress: null,
    x: 790,
    y: 586,
    size: 23,
    faction: "FPA",
    corruption: 0,
    treasury: 0,
    pops: { unit: 0, econ: [], idea: [] },
    // _raw: 원본데이터 없음 note=TODO_미수집_faction은같은성계행성기준추정
  },

  // ── 230021 자르펠트 ──────────────────────────────
  {
    code: "230021P01",
    starCode: "230021",
    nameKr: "자르펠트",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 500,
    y: 500,
    size: 42,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 1500, econ: [], idea: [] },
    // _raw: econMax=1500 defCur=3500 defBase=5 garrison=0 support=62
    // [최신시나리오:일치] starCode=230021 name='자르펠트' faction=REH
  },

  // ── 230022 이제르론 ──────────────────────────────
  {
    code: "230022P01",
    starCode: "230022",
    nameKr: "이제르론",
    nameEn: "",
    nameJp: "",
    type: "fortress",
    main: true,
    fortress: "ISERLOHN",
    x: 500,
    y: 500,
    size: 50,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 0, econ: [], idea: [] },
    // _raw: econMax=0 defCur=-10536 defBase=100 garrison=5 support=93 note=FORTRESS_실제econMax0
    // [최신시나리오:일치] starCode=230022 name='이제르론' faction=REH
  },

  // ── 230023 다프테 잠시드 ──────────────────────────────
  {
    code: "230023P01",
    starCode: "230023",
    nameKr: "다프테 잠시드",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 518,
    y: 695,
    size: 42,
    faction: "FPA",
    corruption: 0,
    treasury: 0,
    pops: { unit: 2250, econ: [], idea: [] },
    // _raw: econMax=2250 defCur=3500 defBase=5 garrison=0 support=88
    // [최신시나리오:일치] starCode=230023 name='다프테-잠시드' faction=FPA
  },
  {
    code: "230023P02",
    starCode: "230023",
    nameKr: "카퍼",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: false,
    fortress: null,
    x: 481,
    y: 304,
    size: 29,
    faction: "FPA",
    corruption: 0,
    treasury: 0,
    pops: { unit: 0, econ: [], idea: [] },
    // _raw: econMax=0 note=TODO_미수집
    // [최신시나리오:일치] starCode=230023 name='카퍼' faction=FPA
  },

  // ── 230024 로스바흐 ──────────────────────────────
  {
    code: "230024P01",
    starCode: "230024",
    nameKr: "로스바흐",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 500,
    y: 500,
    size: 42,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 1800, econ: [], idea: [] },
    // _raw: econMax=1800 defCur=3500 defBase=5 garrison=0 support=73
    // [최신시나리오:일치] starCode=230024 name='로스바흐' faction=REH
  },

  // ── 230025 카프체란카 ──────────────────────────────
  {
    code: "230025P01",
    starCode: "230025",
    nameKr: "카프체란카",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 500,
    y: 500,
    size: 42,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 0, econ: [], idea: [] },
    // _raw: econMax=0 note=게임DB없음_원작소설기준
    // [최신시나리오:일치] starCode=230025 name='' faction=REH
  },

  // ── 230026 케니히그라흐 ──────────────────────────────
  {
    code: "230026P01",
    starCode: "230026",
    nameKr: "케니히그라흐",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 340,
    y: 614,
    size: 42,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 0, econ: [], idea: [] },
    // _raw: econMax=0 note=게임DB없음_원작소설기준
    // [최신시나리오:일치] starCode=230026 name='카스트로프' faction=REH
  },
  {
    code: "230026P02",
    starCode: "230026",
    nameKr: "라파트",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: false,
    fortress: null,
    x: 659,
    y: 385,
    size: 26,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 0, econ: [], idea: [] },
    // _raw: econMax=0 note=게임DB없음_원작소설기준
    // [최신시나리오:일치] starCode=230026 name='라파트' faction=REH
  },

  // ── 230027 네프티스 ──────────────────────────────
  {
    code: "230027P01",
    starCode: "230027",
    nameKr: "네프티스",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 375,
    y: 651,
    size: 42,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 0, econ: [], idea: [] },
    // _raw: econMax=0 note=게임DB없음_원작소설기준
    // [최신시나리오:일치] starCode=230027 name='' faction=REH
  },
  {
    code: "230027P02",
    starCode: "230027",
    nameKr: "이제크온",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: false,
    fortress: null,
    x: 624,
    y: 348,
    size: 23,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 0, econ: [], idea: [] },
    // _raw: 원본데이터 없음 note=TODO_미수집_faction은같은성계행성기준추정
  },

  // ── 230028 가르미슈 ──────────────────────────────
  {
    code: "230028P01",
    starCode: "230028",
    nameKr: "가르미슈",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 555,
    y: 215,
    size: 42,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 0, econ: [], idea: [] },
    // _raw: econMax=0 defCur=30000 support=81 note=FORTRESS_실제econMax0
    // [최신시나리오:일치] starCode=230028 name='가르미슈' faction=REH
  },
  {
    code: "230028P02",
    starCode: "230028",
    nameKr: "스루즈헤임",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: false,
    fortress: null,
    x: 725,
    y: 689,
    size: 31,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 1500, econ: [], idea: [] },
    // _raw: econMax=1500 defCur=6000 defBase=10 garrison=0 support=81
    // [최신시나리오:일치] starCode=230028 name='스루즈헤임' faction=REH
  },
  {
    code: "230028P03",
    starCode: "230028",
    nameKr: "가랴르호른",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: false,
    fortress: null,
    x: 206,
    y: 585,
    size: 26,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 1350, econ: [], idea: [] },
    // _raw: econMax=1350 defCur=6000 support=81
    // [최신시나리오:일치] starCode=230028 name='가랴르호른' faction=REH
  },

  // ── 230029 레그니처 ──────────────────────────────
  {
    code: "230029P01",
    starCode: "230029",
    nameKr: "레그니처",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 500,
    y: 500,
    size: 42,
    faction: "FPA",
    corruption: 0,
    treasury: 0,
    pops: { unit: 0, econ: [], idea: [] },
    // _raw: econMax=0 note=게임DB없음_원작소설기준
    // [최신시나리오:일치] starCode=230029 name='' faction=FPA
  },

  // ── 230030 에르힌겐 ──────────────────────────────
  {
    code: "230030P01",
    starCode: "230030",
    nameKr: "에르힌겐",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 500,
    y: 500,
    size: 42,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 4800, econ: [], idea: [] },
    // _raw: econMax=4800 defCur=3500 defBase=5 garrison=0 support=88
    // [최신시나리오:일치] starCode=230030 name='에르힌겐' faction=REH
  },

  // ── 230031 립슈타트 ──────────────────────────────
  {
    code: "230031P01",
    starCode: "230031",
    nameKr: "립슈타트",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 500,
    y: 500,
    size: 42,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 0, econ: [], idea: [] },
    // _raw: econMax=0 note=게임DB없음_원작소설기준
    // [최신시나리오:일치] starCode=230031 name='' faction=REH
  },

  // ── 230032 퀴스트린 ──────────────────────────────
  {
    code: "230032P01",
    starCode: "230032",
    nameKr: "퀴스트린",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 694,
    y: 521,
    size: 42,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 1800, econ: [], idea: [] },
    // _raw: econMax=1800 defCur=6000 defBase=10 garrison=1 support=78
    // [최신시나리오:일치] starCode=230032 name='퀴스트린' faction=REH
  },
  {
    code: "230032P02",
    starCode: "230032",
    nameKr: "에르뮐",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: false,
    fortress: null,
    x: 305,
    y: 478,
    size: 22,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 0, econ: [], idea: [] },
    // _raw: econMax=0 note=TODO_미수집
    // [최신시나리오:일치] starCode=230032 name='에르뮐' faction=REH
  },

  // ── 230033 키베론 ──────────────────────────────
  {
    code: "230033P01",
    starCode: "230033",
    nameKr: "키베론",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 482,
    y: 695,
    size: 42,
    faction: "FPA",
    corruption: 0,
    treasury: 0,
    pops: { unit: 450, econ: [], idea: [] },
    // _raw: econMax=450 defCur=6000 defBase=10 garrison=0 support=86
    // [최신시나리오:일치] starCode=230033 name='키베론' faction=FPA
  },
  {
    code: "230033P02",
    starCode: "230033",
    nameKr: "루드밀라",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: false,
    fortress: null,
    x: 517,
    y: 304,
    size: 30,
    faction: "FPA",
    corruption: 0,
    treasury: 0,
    pops: { unit: 0, econ: [], idea: [] },
    // _raw: econMax=0 note=TODO_미수집
    // [최신시나리오:일치] starCode=230033 name='루드밀라' faction=FPA
  },

  // ── 230034 카스티리오네 ──────────────────────────────
  {
    code: "230034P01",
    starCode: "230034",
    nameKr: "카스티리오네",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 500,
    y: 500,
    size: 42,
    faction: "FPA",
    corruption: 0,
    treasury: 0,
    pops: { unit: 150, econ: [], idea: [] },
    // _raw: econMax=150 defCur=1500 defBase=1 garrison=0 support=98
    // [최신시나리오:일치] starCode=230034 name='카스티리오네' faction=FPA
  },

  // ── 230035  ──────────────────────────────
  {
    code: "230035P01",
    starCode: "230035",
    nameKr: "",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 500,
    y: 500,
    size: 42,
    faction: "FPA",
    corruption: 0,
    treasury: 0,
    pops: { unit: 2250, econ: [], idea: [] },
    // _raw: econMax=2250 defCur=3500 defBase=5 garrison=0 support=78
    // [최신시나리오:일치] starCode=230035 name='비트리아' faction=FPA
  },

  // ── 230036 비트리아 ──────────────────────────────
  {
    code: "230036P01",
    starCode: "230036",
    nameKr: "비트리아",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 500,
    y: 500,
    size: 42,
    faction: "FPA",
    corruption: 0,
    treasury: 0,
    pops: { unit: 0, econ: [], idea: [] },
    // _raw: econMax=0 note=게임DB없음_원작소설기준
    // [최신시나리오:일치] starCode=230036 name='' faction=FPA
  },

  // ── 230037 파프라비 ──────────────────────────────
  {
    code: "230037P01",
    starCode: "230037",
    nameKr: "파프라비",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 500,
    y: 500,
    size: 42,
    faction: "FPA",
    corruption: 0,
    treasury: 0,
    pops: { unit: 150, econ: [], idea: [] },
    // _raw: econMax=150 defCur=1500 defBase=1 garrison=0 support=97
    // [최신시나리오:일치] starCode=230037 name='파프라비' faction=FPA
  },

  // ── 230038 민덴 ──────────────────────────────
  {
    code: "230038P01",
    starCode: "230038",
    nameKr: "민덴",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 500,
    y: 500,
    size: 42,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 3300, econ: [], idea: [] },
    // _raw: econMax=3300 defCur=3500 defBase=5 garrison=0 support=81
    // [최신시나리오:일치] starCode=230038 name='민덴' faction=REH
  },

  // ── 230039 테레젠슈타트 ──────────────────────────────
  {
    code: "230039P01",
    starCode: "230039",
    nameKr: "테레젠슈타트",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 500,
    y: 500,
    size: 42,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 2700, econ: [], idea: [] },
    // _raw: econMax=2700 defCur=3500 defBase=5 garrison=0 support=86
    // [최신시나리오:일치] starCode=230039 name='테레젠슈타트' faction=REH
  },

  // ── 230040 노이에란트 ──────────────────────────────
  {
    code: "230040P01",
    starCode: "230040",
    nameKr: "노이에란트",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 500,
    y: 500,
    size: 42,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 0, econ: [], idea: [] },
    // _raw: econMax=0 note=게임DB없음_원작소설기준
    // [최신시나리오:일치] starCode=230040 name='' faction=REH
  },

  // ── 230041 케르코포르타 ──────────────────────────────
  {
    code: "230041P01",
    starCode: "230041",
    nameKr: "케르코포르타",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 500,
    y: 500,
    size: 42,
    faction: "FPA",
    corruption: 0,
    treasury: 0,
    pops: { unit: 150, econ: [], idea: [] },
    // _raw: econMax=150 defCur=1500 defBase=1 garrison=0 support=97
    // [최신시나리오:일치] starCode=230041 name='케르코포르타' faction=FPA
  },

  // ── 230042 페잔 ──────────────────────────────
  {
    code: "230042P01",
    starCode: "230042",
    nameKr: "페잔",
    nameEn: "",
    nameJp: "",
    type: "capital",
    main: true,
    fortress: null,
    x: 500,
    y: 500,
    size: 55,
    faction: "PZN",
    corruption: 0,
    treasury: 0,
    pops: { unit: 18000, econ: [], idea: [] },
    // _raw: econMax=18000 defCur=1000 defBase=0 garrison=12 support=100
    // [최신시나리오:일치] starCode=230042 name='페잔' faction=PZN
  },

  // ── 230043 루지아나 ──────────────────────────────
  {
    code: "230043P01",
    starCode: "230043",
    nameKr: "루지아나",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 500,
    y: 500,
    size: 42,
    faction: "FPA",
    corruption: 0,
    treasury: 0,
    pops: { unit: 150, econ: [], idea: [] },
    // _raw: econMax=150 defCur=6000 defBase=10 garrison=0 support=73
    // [최신시나리오:일치] starCode=230043 name='루지아나' faction=FPA
  },

  // ── 230044 루지아나 ──────────────────────────────
  {
    code: "230044P01",
    starCode: "230044",
    nameKr: "루지아나",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 500,
    y: 500,
    size: 42,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 600, econ: [], idea: [] },
    // _raw: econMax=600 defCur=3500 defBase=5 garrison=0 support=70
    // [최신시나리오:일치] starCode=230044 name='하펜' faction=REH
  },

  // ── 230045 마그 토레드 ──────────────────────────────
  {
    code: "230045P01",
    starCode: "230045",
    nameKr: "마그 토레드",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 500,
    y: 500,
    size: 42,
    faction: "FPA",
    corruption: 0,
    treasury: 0,
    pops: { unit: 2400, econ: [], idea: [] },
    // _raw: econMax=2400 defCur=3500 defBase=5 garrison=0 support=72
    // [최신시나리오:일치] starCode=230045 name='마그-토레드' faction=FPA
  },

  // ── 230046 라티고스트 ──────────────────────────────
  {
    code: "230046P01",
    starCode: "230046",
    nameKr: "라티고스트",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 282,
    y: 616,
    size: 42,
    faction: "FPA",
    corruption: 0,
    treasury: 0,
    pops: { unit: 150, econ: [], idea: [] },
    // _raw: econMax=150 defCur=3500 defBase=5 garrison=0 support=84
    // [최신시나리오:일치] starCode=230046 name='라티고스트' faction=FPA
  },
  {
    code: "230046P02",
    starCode: "230046",
    nameKr: "스벤트비트",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: false,
    fortress: null,
    x: 505,
    y: 199,
    size: 28,
    faction: "FPA",
    corruption: 0,
    treasury: 0,
    pops: { unit: 150, econ: [], idea: [] },
    // _raw: econMax=150 defCur=6000 support=84
    // [최신시나리오:일치] starCode=230046 name='스벤트비트' faction=FPA
  },
  {
    code: "230046P03",
    starCode: "230046",
    nameKr: "야로비트",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: false,
    fortress: null,
    x: 745,
    y: 623,
    size: 22,
    faction: "FPA",
    corruption: 0,
    treasury: 0,
    pops: { unit: 150, econ: [], idea: [] },
    // _raw: econMax=150 defCur=3500 support=84
    // [최신시나리오:일치] starCode=230046 name='야로비트' faction=FPA
  },

  // ── 230047 아로요 드 모리노 ──────────────────────────────
  {
    code: "230047P01",
    starCode: "230047",
    nameKr: "아로요 드 모리노",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 330,
    y: 599,
    size: 42,
    faction: "FPA",
    corruption: 0,
    treasury: 0,
    pops: { unit: 2550, econ: [], idea: [] },
    // _raw: econMax=2550 defCur=3500 support=92
    // [최신시나리오:일치] starCode=230047 name='아로요-드-모리노' faction=FPA
  },
  {
    code: "230047P02",
    starCode: "230047",
    nameKr: "카시나",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: false,
    fortress: null,
    x: 669,
    y: 400,
    size: 22,
    faction: "FPA",
    corruption: 0,
    treasury: 0,
    pops: { unit: 2550, econ: [], idea: [] },
    // _raw: econMax=2550 defCur=3500 defBase=5 garrison=0 support=92
    // [최신시나리오:일치] starCode=230047 name='카시나' faction=FPA
  },

  // ── 230048 슈바르츠부르크 ──────────────────────────────
  {
    code: "230048P01",
    starCode: "230048",
    nameKr: "슈바르츠부르크",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 500,
    y: 500,
    size: 42,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 1800, econ: [], idea: [] },
    // _raw: econMax=1800 defCur=3500 defBase=5 garrison=0 support=68
    // [최신시나리오:일치] starCode=230048 name='슈바르츠부르크' faction=REH
  },

  // ── 230049 알에리스 ──────────────────────────────
  {
    code: "230049P01",
    starCode: "230049",
    nameKr: "알에리스",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 500,
    y: 500,
    size: 42,
    faction: "FPA",
    corruption: 0,
    treasury: 0,
    pops: { unit: 150, econ: [], idea: [] },
    // _raw: econMax=150 defCur=1500 defBase=1 garrison=0 support=95
    // [최신시나리오:일치] starCode=230049 name='알에리스' faction=FPA
  },

  // ── 230050 에스링그 ──────────────────────────────
  {
    code: "230050P01",
    starCode: "230050",
    nameKr: "에스링그",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 734,
    y: 427,
    size: 42,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 0, econ: [], idea: [] },
    // _raw: econMax=0 note=TODO_미수집
    // [최신시나리오:일치] starCode=230050 name='에스링그' faction=REH
  },
  {
    code: "230050P02",
    starCode: "230050",
    nameKr: "크네스도르프",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: false,
    fortress: null,
    x: 423,
    y: 734,
    size: 32,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 0, econ: [], idea: [] },
    // _raw: econMax=0 note=TODO_미수집
    // [최신시나리오:일치] starCode=230050 name='크네스도르프' faction=REH
  },
  {
    code: "230050P03",
    starCode: "230050",
    nameKr: "폰트노이",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: false,
    fortress: null,
    x: 330,
    y: 306,
    size: 30,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 1500, econ: [], idea: [] },
    // _raw: econMax=1500 defCur=3500 defBase=5 garrison=0 support=98
    // [최신시나리오:일치] starCode=230050 name='폰트노이' faction=REH
  },

  // ── 230051 미트라 ──────────────────────────────
  {
    code: "230051P01",
    starCode: "230051",
    nameKr: "미트라",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 483,
    y: 695,
    size: 42,
    faction: "FPA",
    corruption: 0,
    treasury: 0,
    pops: { unit: 0, econ: [], idea: [] },
    // _raw: econMax=0 note=TODO_미수집
    // [최신시나리오:일치] starCode=230051 name='미트라' faction=FPA
  },
  {
    code: "230051P02",
    starCode: "230051",
    nameKr: "지비에",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: false,
    fortress: null,
    x: 516,
    y: 304,
    size: 30,
    faction: "FPA",
    corruption: 0,
    treasury: 0,
    pops: { unit: 1800, econ: [], idea: [] },
    // _raw: econMax=1800 defCur=3500 defBase=5 garrison=0 support=79
    // [최신시나리오:일치] starCode=230051 name='지비에' faction=FPA
  },

  // ── 230052 에레키슈갈 ──────────────────────────────
  {
    code: "230052P01",
    starCode: "230052",
    nameKr: "에레키슈갈",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 500,
    y: 500,
    size: 42,
    faction: "FPA",
    corruption: 0,
    treasury: 0,
    pops: { unit: 150, econ: [], idea: [] },
    // _raw: econMax=150 defCur=1500 defBase=1 garrison=0 support=99
    // [최신시나리오:일치] starCode=230052 name='에레키슈갈' faction=FPA
  },

  // ── 230053 에코니아 ──────────────────────────────
  {
    code: "230053P01",
    starCode: "230053",
    nameKr: "에코니아",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 526,
    y: 694,
    size: 42,
    faction: "FPA",
    corruption: 0,
    treasury: 0,
    pops: { unit: 2400, econ: [], idea: [] },
    // _raw: econMax=2400 defCur=3500 defBase=5 garrison=0 support=84
    // [최신시나리오:일치] starCode=230053 name='에코니아' faction=FPA
  },
  {
    code: "230053P02",
    starCode: "230053",
    nameKr: "마스지드",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: false,
    fortress: null,
    x: 473,
    y: 305,
    size: 29,
    faction: "FPA",
    corruption: 0,
    treasury: 0,
    pops: { unit: 2400, econ: [], idea: [] },
    // _raw: econMax=2400 defCur=3500 support=84
    // [최신시나리오:일치] starCode=230053 name='마스지드' faction=FPA
  },

  // ── 230054 파라스 ──────────────────────────────
  {
    code: "230054P01",
    starCode: "230054",
    nameKr: "파라스",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 500,
    y: 500,
    size: 42,
    faction: "FPA",
    corruption: 0,
    treasury: 0,
    pops: { unit: 900, econ: [], idea: [] },
    // _raw: econMax=900 defCur=11000 defBase=20 garrison=0 support=78
    // [최신시나리오:일치] starCode=230054 name='파라스' faction=FPA
  },

  // ── 230055 라므 ──────────────────────────────
  {
    code: "230055P01",
    starCode: "230055",
    nameKr: "라므",
    nameEn: "",
    nameJp: "",
    type: "fortress",
    main: true,
    fortress: "TIAMAT",
    x: 693,
    y: 331,
    size: 50,
    faction: "FPA",
    corruption: 0,
    treasury: 0,
    pops: { unit: 75, econ: [], idea: [] },
    // _raw: econMax=75 defCur=1000 defBase=0 garrison=0 support=65
    // [최신시나리오:일치] starCode=230055 name='라므' faction=FPA
  },
  {
    code: "230055P02",
    starCode: "230055",
    nameKr: "안샤르",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: false,
    fortress: null,
    x: 563,
    y: 764,
    size: 29,
    faction: "FPA",
    corruption: 0,
    treasury: 0,
    pops: { unit: 0, econ: [], idea: [] },
    // _raw: econMax=0 note=TODO_미수집
    // [최신시나리오:일치] starCode=230055 name='안샤르' faction=FPA
  },
  {
    code: "230055P03",
    starCode: "230055",
    nameKr: "레그니처",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: false,
    fortress: null,
    x: 256,
    y: 411,
    size: 25,
    faction: "FPA",
    corruption: 0,
    treasury: 0,
    pops: { unit: 0, econ: [], idea: [] },
    // _raw: econMax=0 note=게임DB없음_원작소설기준
    // [최신시나리오:일치] starCode=230055 name='레그니처' faction=FPA
  },

  // ── 230056 호포키르히 ──────────────────────────────
  {
    code: "230056P01",
    starCode: "230056",
    nameKr: "호포키르히",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 368,
    y: 645,
    size: 42,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 1950, econ: [], idea: [] },
    // _raw: econMax=1950 defCur=3500 defBase=5 garrison=0 support=88
    // [최신시나리오:일치] starCode=230056 name='호포키르히' faction=REH
  },
  {
    code: "230056P02",
    starCode: "230056",
    nameKr: "비텐베르크",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: false,
    fortress: null,
    x: 631,
    y: 354,
    size: 25,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 0, econ: [], idea: [] },
    // _raw: econMax=0 note=TODO_미수집
    // [최신시나리오:일치] starCode=230056 name='비텐베르크' faction=REH
  },

  // ── 230057 팔머랜드 ──────────────────────────────
  {
    code: "230057P01",
    starCode: "230057",
    nameKr: "팔머랜드",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 500,
    y: 500,
    size: 42,
    faction: "FPA",
    corruption: 0,
    treasury: 0,
    pops: { unit: 1800, econ: [], idea: [] },
    // _raw: econMax=1800 defCur=3500 defBase=5 garrison=0 support=81
    // [최신시나리오:일치] starCode=230057 name='팔머랜드' faction=FPA
  },

  // ── 230058 오딘 ──────────────────────────────
  {
    code: "230058P01",
    starCode: "230058",
    nameKr: "오딘",
    nameEn: "",
    nameJp: "",
    type: "capital",
    main: true,
    fortress: null,
    x: 654,
    y: 731,
    size: 55,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 4950, econ: [], idea: [] },
    // _raw: econMax=4950 defCur=3500 defBase=5 garrison=18 support=93
    // [최신시나리오:일치] starCode=230058 name='오딘' faction=REH
  },
  {
    code: "230058P02",
    starCode: "230058",
    nameKr: "아스가르즈",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: false,
    fortress: null,
    x: 258,
    y: 550,
    size: 24,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 1800, econ: [], idea: [] },
    // _raw: econMax=1800 defCur=6000 support=93
    // [최신시나리오:일치] starCode=230058 name='아스가르즈' faction=REH
  },
  {
    code: "230058P03",
    starCode: "230058",
    nameKr: "유그드라실",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: false,
    fortress: null,
    x: 592,
    y: 215,
    size: 31,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 0, econ: [], idea: [] },
    // _raw: econMax=0 note=TODO_미수집
    // [최신시나리오:일치] starCode=230058 name='유그드라실' faction=REH
  },

  // ── 230059 브렌하임 ──────────────────────────────
  {
    code: "230059P01",
    starCode: "230059",
    nameKr: "브렌하임",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 429,
    y: 682,
    size: 42,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 1200, econ: [], idea: [] },
    // _raw: econMax=1200 defCur=3500 defBase=5 garrison=0 support=72
    // [최신시나리오:일치] starCode=230059 name='브렌하임' faction=REH
  },
  {
    code: "230059P02",
    starCode: "230059",
    nameKr: "카르슈타트",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: false,
    fortress: null,
    x: 570,
    y: 317,
    size: 31,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 1200, econ: [], idea: [] },
    // _raw: econMax=1200 defCur=3500 support=72
    // [최신시나리오:일치] starCode=230059 name='카르슈타트' faction=REH
  },

  // ── 230060 카토르브러 ──────────────────────────────
  {
    code: "230060P01",
    starCode: "230060",
    nameKr: "카토르브러",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 500,
    y: 500,
    size: 42,
    faction: "FPA",
    corruption: 0,
    treasury: 0,
    pops: { unit: 150, econ: [], idea: [] },
    // _raw: econMax=150 defCur=1000 defBase=0 garrison=0 support=93
    // [최신시나리오:일치] starCode=230060 name='카토르브러' faction=FPA
  },

  // ── 230061 몽마라유 ──────────────────────────────
  {
    code: "230061P01",
    starCode: "230061",
    nameKr: "몽마라유",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 500,
    y: 500,
    size: 42,
    faction: "FPA",
    corruption: 0,
    treasury: 0,
    pops: { unit: 1200, econ: [], idea: [] },
    // _raw: econMax=1200 defCur=3500 defBase=5 garrison=0 support=79
    // [최신시나리오:일치] starCode=230061 name='몽마라유' faction=FPA
  },

  // ── 230062 레오폴트슈타트 ──────────────────────────────
  {
    code: "230062P01",
    starCode: "230062",
    nameKr: "레오폴트슈타트",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 352,
    y: 629,
    size: 42,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 1800, econ: [], idea: [] },
    // _raw: econMax=1800 defCur=3500 defBase=5 garrison=0 support=81
    // [최신시나리오:일치] starCode=230062 name='레오폴트슈타트' faction=REH
  },
  {
    code: "230062P02",
    starCode: "230062",
    nameKr: "그라츠",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: false,
    fortress: null,
    x: 647,
    y: 370,
    size: 30,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 1500, econ: [], idea: [] },
    // _raw: econMax=1500 defCur=3500 support=81
    // [최신시나리오:일치] starCode=230062 name='그라츠' faction=REH
  },

  // ── 230063 네프티스 ──────────────────────────────
  {
    code: "230063P01",
    starCode: "230063",
    nameKr: "네프티스",
    nameEn: "NEPHTHYS",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 500,
    y: 500,
    size: 42,
    faction: "FPA",
    corruption: 0,
    treasury: 0,
    pops: { unit: 2700, econ: [], idea: [] },
    // _raw: econMax=2700 defCur=6000 defBase=10 garrison=0 support=87
    // [최신시나리오:일치] starCode=230063 name='네프티스' faction=FPA
  },
  {
    code: "230063P02",
    starCode: "230063",
    nameKr: "이제크온",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: false,
    fortress: null,
    x: 500,
    y: 500,
    size: 28,
    faction: "FPA",
    corruption: 0,
    treasury: 0,
    pops: { unit: 0, econ: [], idea: [] },
    // _raw: 원본데이터 없음 note=TODO_미수집
    // [최신시나리오:일치] starCode=230063 name='이제크온' faction=FPA
  },

  // ── 230064 빌로스트 ──────────────────────────────
  {
    code: "230064P01",
    starCode: "230064",
    nameKr: "빌로스트",
    nameEn: "BYLOST",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 500,
    y: 500,
    size: 42,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 0, econ: [], idea: [] },
    // _raw: 원본데이터 없음 note=TODO_미수집_신규성계(빌로스트-야반하르성역분리)
  },

  // ── 230067 뮈켄베르거 ──────────────────────────────
  {
    code: "230067P01",
    starCode: "230067",
    nameKr: "뮈켄베르거",
    nameEn: "MÜKKENBERGER",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 500,
    y: 500,
    size: 42,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 0, econ: [], idea: [] },
    // _raw: 원본데이터 없음 note=TODO_미수집_신규성계(뮈켄베르거변경백가문영지)
    // [최신시나리오:일치] starCode=230067 name='' faction=REH
  },

  // ── 230068 네페르카프타흐 ──────────────────────────────
  {
    code: "230068P01",
    starCode: "230068",
    nameKr: "네페르카프타흐",
    nameEn: "",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 500,
    y: 500,
    size: 42,
    faction: "FPA",
    corruption: 0,
    treasury: 0,
    pops: { unit: 150, econ: [], idea: [] },
    // _raw: econMax=150 defCur=1500 defBase=1 garrison=0 support=96
    // [최신시나리오:일치] starCode=230068 name='' faction=FPA
  },

  // ── 230069 지구 ──────────────────────────────
  {
    code: "230069P01",
    starCode: "230069",
    nameKr: "지구",
    nameEn: "Terra/Earth",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 500,
    y: 500,
    size: 30,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 100, econ: [], idea: [] },
    // _raw: 원본데이터 없음 note=게임DB없음_원작소설기준_인구는나무위키검증(1000만명,우주력8세기말)
    // [최신시나리오:일치] starCode=230069 name='지구' faction=REH
  },

  // ── 230070 야반하르 ──────────────────────────────
  {
    code: "230070P01",
    starCode: "230070",
    nameKr: "야반하르",
    nameEn: "YAVANHAR",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 500,
    y: 500,
    size: 42,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 0, econ: [], idea: [] },
    // _raw: 원본데이터 없음 note=TODO_미수집_신규성계(빌로스트-야반하르성역분리)
  },

  // ── 230071 란즈베르크 ──────────────────────────────
  {
    code: "230071P01",
    starCode: "230071",
    nameKr: "란즈베르크",
    nameEn: "LANSBERG",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 500,
    y: 500,
    size: 42,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 0, econ: [], idea: [] },
    // _raw: 원본데이터 없음 note=TODO_미수집_신규성계(란즈베르크백작가영지)
  },

  // ── 230072 오펜하이머 ──────────────────────────────
  {
    code: "230072P01",
    starCode: "230072",
    nameKr: "오펜하이머",
    nameEn: "OPPENHEIMER",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 500,
    y: 500,
    size: 42,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 0, econ: [], idea: [] },
    // _raw: 원본데이터 없음 note=TODO_미수집_신규성계(오펜하이머백작가영지)
  },

  // ── 230073 히르데스하임 ──────────────────────────────
  {
    code: "230073P01",
    starCode: "230073",
    nameKr: "히르데스하임",
    nameEn: "HILDESHEIM",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 500,
    y: 500,
    size: 42,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 0, econ: [], idea: [] },
    // _raw: 원본데이터 없음 note=TODO_미수집_신규성계(히르데스하임백작가영지)
  },

  // ── 230074 뤼네부르크 ──────────────────────────────
  {
    code: "230074P01",
    starCode: "230074",
    nameKr: "뤼네부르크",
    nameEn: "LÜNEBURG",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 500,
    y: 500,
    size: 48,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 0, econ: [], idea: [] },
    // _raw: 원본데이터 없음 note=TODO_미수집_신규성계(뤼네부르크가문영지,오등작중높은작위)
  },

  // ── 230075 하르텐베르크 ──────────────────────────────
  {
    code: "230075P01",
    starCode: "230075",
    nameKr: "하르텐베르크",
    nameEn: "HARTENBERG",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 500,
    y: 500,
    size: 42,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 0, econ: [], idea: [] },
    // _raw: 원본데이터 없음 note=TODO_미수집_신규성계(하르텐베르크백작가영지)
  },

  // ── 230076 로엔그람 ──────────────────────────────
  {
    code: "230076P01",
    starCode: "230076",
    nameKr: "로엔그람",
    nameEn: "LOHENGRAMM",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 500,
    y: 500,
    size: 42,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 0, econ: [], idea: [] },
    // _raw: 원본데이터 없음 note=TODO_미수집_신규성계(로엔그람가문영지,오등작확인)
  },

  // ── 230077 클롭슈톡 ──────────────────────────────
  {
    code: "230077P01",
    starCode: "230077",
    nameKr: "클롭슈톡",
    nameEn: "KLOPSTOCK",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 500,
    y: 500,
    size: 42,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 0, econ: [], idea: [] },
    // _raw: 원본데이터 없음 note=TODO_미수집_신규성계(클롭슈톡가문영지,오등작확인)
  },

  // ── 230078 베네뮌데 ──────────────────────────────
  {
    code: "230078P01",
    starCode: "230078",
    nameKr: "베네뮌데",
    nameEn: "BENEMÜNDE",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 500,
    y: 500,
    size: 42,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 0, econ: [], idea: [] },
    // _raw: 원본데이터 없음 note=TODO_미수집_신규성계(베네뮌데가문영지,오등작확인)
  },

  // ── 230079 그뤼네발트 ──────────────────────────────
  {
    code: "230079P01",
    starCode: "230079",
    nameKr: "그뤼네발트",
    nameEn: "GRÜNEWALD",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 500,
    y: 500,
    size: 42,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 0, econ: [], idea: [] },
    // _raw: 원본데이터 없음 note=TODO_미수집_신규성계(그뤼네발트가문영지,오등작확인)
  },

  // ── 230080 팔스트롱 ──────────────────────────────
  {
    code: "230080P01",
    starCode: "230080",
    nameKr: "팔스트롱",
    nameEn: "FALSTRONG",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 500,
    y: 500,
    size: 42,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 0, econ: [], idea: [] },
    // _raw: 원본데이터 없음 note=TODO_미수집_신규성계(팔스트롱가문영지,오등작확인)
  },

  // ── 230081 렘샤이트 ──────────────────────────────
  {
    code: "230081P01",
    starCode: "230081",
    nameKr: "렘샤이트",
    nameEn: "REMSCHEID",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 500,
    y: 500,
    size: 42,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 0, econ: [], idea: [] },
    // _raw: 원본데이터 없음 note=TODO_미수집_신규성계(렘샤이트가문영지,오등작확인)
  },

  // ── 230082 헤르크스하이머 ──────────────────────────────
  {
    code: "230082P01",
    starCode: "230082",
    nameKr: "헤르크스하이머",
    nameEn: "HERXHEIMER",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 500,
    y: 500,
    size: 42,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 0, econ: [], idea: [] },
    // _raw: 원본데이터 없음 note=TODO_미수집_신규성계(헤르크스하이머가문영지,오등작확인)
  },

  // ── 230083 에렌베르크 ──────────────────────────────
  {
    code: "230083P01",
    starCode: "230083",
    nameKr: "에렌베르크",
    nameEn: "EHRENBERG",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 500,
    y: 500,
    size: 42,
    faction: "REH",
    corruption: 0,
    treasury: 0,
    pops: { unit: 0, econ: [], idea: [] },
    // _raw: 원본데이터 없음 note=TODO_미수집_신규성계(에렌베르크가문영지,오등작확인)
  },

  // ── 230084 알타이르 ──────────────────────────────
  {
    code: "230084P01",
    starCode: "230084",
    nameKr: "알타이르",
    nameEn: "ALTAIR",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 500,
    y: 500,
    size: 42,
    faction: null,
    corruption: 0,
    treasury: 0,
    pops: { unit: 0, econ: [], idea: [] },
    // _raw: 원본데이터 없음 note=게임DB없음_외전과거시점_faction의미없음
  },

  // ── 230085 베텔기우스 ──────────────────────────────
  {
    code: "230085P01",
    starCode: "230085",
    nameKr: "베텔기우스",
    nameEn: "BETELGEUSE",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 500,
    y: 500,
    size: 42,
    faction: null,
    corruption: 0,
    treasury: 0,
    pops: { unit: 0, econ: [], idea: [] },
    // _raw: 원본데이터 없음 note=게임DB없음_외전과거시점_faction의미없음
  },

  // ── 230086 카노프스 ──────────────────────────────
  {
    code: "230086P01",
    starCode: "230086",
    nameKr: "카노프스",
    nameEn: "CANOPUS",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 500,
    y: 500,
    size: 42,
    faction: null,
    corruption: 0,
    treasury: 0,
    pops: { unit: 0, econ: [], idea: [] },
    // _raw: 원본데이터 없음 note=게임DB없음_외전과거시점_faction의미없음
  },

  // ── 230087 프록시마 ──────────────────────────────
  {
    code: "230087P01",
    starCode: "230087",
    nameKr: "프록시마",
    nameEn: "PROXIMA",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 500,
    y: 500,
    size: 42,
    faction: null,
    corruption: 0,
    treasury: 0,
    pops: { unit: 0, econ: [], idea: [] },
    // _raw: 원본데이터 없음 note=게임DB없음_외전과거시점_faction의미없음
  },

  // ── 230088 론드리나 ──────────────────────────────
  {
    code: "230088P01",
    starCode: "230088",
    nameKr: "론드리나",
    nameEn: "LONDRINA",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 500,
    y: 500,
    size: 42,
    faction: null,
    corruption: 0,
    treasury: 0,
    pops: { unit: 0, econ: [], idea: [] },
    // _raw: 원본데이터 없음 note=게임DB없음_외전과거시점_faction의미없음
  },

  // ── 230089 레자빅 ──────────────────────────────
  {
    code: "230089P01",
    starCode: "230089",
    nameKr: "레자빅",
    nameEn: "REZAVIK",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 500,
    y: 500,
    size: 42,
    faction: null,
    corruption: 0,
    treasury: 0,
    pops: { unit: 0, econ: [], idea: [] },
    // _raw: 원본데이터 없음 note=게임DB없음_외전과거시점_faction의미없음
  },

  // ── 230090 포리슨 ──────────────────────────────
  {
    code: "230090P01",
    starCode: "230090",
    nameKr: "포리슨",
    nameEn: "FORISON",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 500,
    y: 500,
    size: 42,
    faction: null,
    corruption: 0,
    treasury: 0,
    pops: { unit: 0, econ: [], idea: [] },
    // _raw: 원본데이터 없음 note=게임DB없음_외전과거시점_faction의미없음
  },

  // ── 230091 파라파라 ──────────────────────────────
  {
    code: "230091P01",
    starCode: "230091",
    nameKr: "파라파라",
    nameEn: "PARAFARA",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 500,
    y: 500,
    size: 42,
    faction: null,
    corruption: 0,
    treasury: 0,
    pops: { unit: 0, econ: [], idea: [] },
    // _raw: 원본데이터 없음 note=게임DB없음_외전과거시점_faction의미없음
  },

  // ── 230092 슈바라 ──────────────────────────────
  {
    code: "230092P01",
    starCode: "230092",
    nameKr: "슈바라",
    nameEn: "SCHWARA",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 500,
    y: 500,
    size: 42,
    faction: null,
    corruption: 0,
    treasury: 0,
    pops: { unit: 0, econ: [], idea: [] },
    // _raw: 원본데이터 없음 note=게임DB없음_외전과거시점_faction의미없음
  },

  // ── 230093 닛슈우히더스 ──────────────────────────────
  {
    code: "230093P01",
    starCode: "230093",
    nameKr: "닛슈우히더스",
    nameEn: "NISHUHIDERS",
    nameJp: "",
    type: "terrestrial",
    main: true,
    fortress: null,
    x: 500,
    y: 500,
    size: 42,
    faction: "FPA",
    corruption: 0,
    treasury: 0,
    pops: { unit: 0, econ: [], idea: [] },
    // _raw: 원본데이터 없음
  },
];

export const PLANET_MAP = Object.fromEntries(PLANETS.map((p) => [p.code, p]));
