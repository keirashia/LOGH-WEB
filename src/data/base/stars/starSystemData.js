// ================================================================
//  starSystemData.js — 성계 마스터 (불변)
//  code: 230001~ (ABC순, unique key)
//  행성 코드: {code}P01~P99
//  mapSize: 1600x1000 기준 (v2 좌표) --> 제거
//  nameEn: gineipaedia.com 위키 공식 영문명 기준
//  isGateway 제거 → lane type(corridor/phezzan)으로 판단
//  fortress 제거  → planetsData.fortress 속성으로 판단
// ================================================================

/** 1. 보로노이 다이어그램으로 영역 표시, 해당 영역은 소속국가의 색상으로 채운다.
 *  다이어그램의 각 영역별 경계선은 인접 영역이 동일 국가인 경우, 해당 국가색보다 약간 얇은 라인으로 표시(얇게)
 *  다이어그램의 각 영역별 경계선은 인접 영역이 다른 국가인 경우, 해당 국가색보다 각 국가색으로 2줄 표시하고 강조 효과
 */

/** 2.
 *  위치 :
 *  연결 :
 *  행성 :
 * 위와 비슷한 패턴의 주석을 참조하여, 'x, y 전부 개선', 'lane.js 수정','/maps/폴더 내의 행성 수정 또는 생성'
 * */

export const STAR_SYSTEMS = [
  /** 위치 : 은하맵 기준 70vw 55vh
   *  연결 : 230048_SHACHEN(7시 방향)
   *        230028_KIPOIZER(4시 방향)
   *  행성 :  */
  {
    code: "230001",
    nameKr: "알멘트푸벨",
    nameEn: "ALMENTPUVEL",
    nameJp: "",
    x: 1040,
    y: 410,
    type: "normal",
    desc: "제국 서북부 성계.",
  },

  /** 위치 : 중앙 기준 3시 방향에 위치 vh로 따지면 55% 정도 vw는 70%정도
   *  연결 : 230009_BRUNSCHWEIG(11시)
   *        230024_JOTUNHEIM(8시)
   *        230038_MARBACH(2시)
   *  행성 : 가이에스부르크 > 인공요새.
   *        헤세-카셀 > 알테너 성계의 중심행성. 가이에스부르크로 물자를 조달하기 위한 농업시설과 소규모 조병창이 있다. */
  {
    code: "230002",
    nameKr: "알테너",
    nameEn: "ALTENA",
    nameJp: "",
    x: 1250,
    y: 640,
    type: "fortress",
    desc: "가이에스부르크 요새가 위치한 성계.",
  },

  /** 위치 : 12시 방면에 위치 (y축은 vh 80%정도, x축은 이제르론 + 5%정도)
   *  연결 : 230022_ISERLOHN(9시)
   *        230008_BODEN(2시)
   *        230044_FORGEN(5시)
   *  행성 : 클라인겔트 > 클라인겔트 자작의 영지.
   *        도벨그
   *        모르겐  */
  {
    code: "230003",
    nameKr: "암릿처",
    nameEn: "AMRITSAR",
    nameJp: "",
    x: 975,
    y: 250,
    type: "",
    desc: `이제르론 회랑의 제국측 입구에 위치한 성계. 이제르론 요새 건설 전까지는 주요 분쟁 지역 중 하나였으나 요새 건설 이후 안정기를 겪고 있다.`,
  },

  /** 위치 : 은하맵 기준 45vw 70vh
   *  연결 : 230022_ISERLOHN(2시)
   *        230041_PALANTIA(10시)
   *  행성 : 탄므즈 >
   */
  {
    code: "230004",
    nameKr: "아레스하임",
    nameEn: "ARLESHEIM", // ARESHYUM -> ARLESHEIM으로 변경
    nameJp: "",
    x: 700,
    y: 405,
    type: "contested",
    desc: "이제르론 회랑 인근 동맹령 성계",
  },

  /** 위치 : 은하맵 기준 40vw 75vh
   *  연결 : 230010_DAGON(12) 230011_DORIA(9) 230017_EL-PACIL(7) 팔란티아(6) 벤플리트(4)
   *  행성 : 아트라 하시스 >
   *        아스페륀
   *        우가리트
   */
  {
    code: "230005",
    nameKr: "아스타테",
    nameEn: "ASTARTE",
    nameJp: "",
    x: 725,
    y: 205,
    type: "contested",
    desc: "아스타테 회전이 벌어진 성계.",
  },

  /** 위치 : 맵 10시 끝에 위치
   *  연결 : 230047_RIOPUERDE / 230063_KERIM
   *  행성 : 하이네센, 테르누젠, 스리나가르(시뤼나갈에서 변경) */
  {
    code: "230006",
    nameKr: "바라트",
    nameEn: "BA'ALAT",
    nameJp: "",
    x: 110,
    y: 500,
    type: "capital",
    desc: "자유행성동맹의 수도 성계. 하이네센을 중심으로 세 개의 행성이 있다.",
  },

  /** 위치 : 은하맵 기준 40vw 20vh
   *  연결 : 샤텐부르크(3), 룬비니(10)
   *  행성 : 프르샤 스쿠타 >
   */
  {
    code: "230007",
    nameKr: "바라투르프",
    nameEn: "BALATROOP", // BARATULF -> BALATROOP
    nameJp: "",
    x: 640,
    y: 730,
    type: "neutral",
    desc: "동맹 남방의 거점 성계. 페잔회랑으로 진입하기 위한 주요 길목 중 하나이다.",
  },

  /** 위치 : y 90vh, x 65vw
   *  연결 : 뮈켄베르거(6시) 암릿처(7시) 빌렌슈타인(5시)
   *  행성 : 보르소른
   *        빌로스트> 보덴 성계의 최동부 성계. 빌렌슈타인 성계의 야반하르 행성과 연결되어있다.
   *        알비스
   *        단크
   */
  {
    code: "230008",
    nameKr: "보덴",
    nameEn: "BODEN",
    nameJp: "",
    x: 1050,
    y: 185,
    type: "neutral",
    desc: "중립 성계.",
  },

  /** 위치 : 은하맵 기준 x : 80vw y : 45vh 정도?
   *  연결 : 230028_KIFOISER(11시)
   *        230002_ALTENER(5시)
   *        230038_MARBACH(4시)
   *        230019_FREYA(1시)
   *        230032_LITTENHEIM(12시)
   *  행성 : 톤도로프
   *        베스타란트 > 인구 200만명의 극도로 건조한 사막행성으로 사람이 거주하기 대단히 힘든 환경이다. 희귀금속이 많은 지역 */
  {
    code: "230009",
    nameKr: "브라운슈바이크",
    nameEn: "BRUNSCHWEIG",
    nameJp: "",
    x: 1190,
    y: 500,
    type: "noble",
    desc: "브라운슈바이크 공작령의 중심 성계",
  },

  /** 위치 : y 90vh, x 65vw
   *  연결 : 뮈켄베르거(6시) 암릿처(7시) 빌렌슈타인(5시)
   *  행성 : 카프튜랑카
   */
  {
    code: "230010",
    nameKr: "다곤",
    nameEn: "DAGON",
    nameJp: "",
    x: 620,
    y: 105,
    type: "normal",
    desc: "제1차 티아마트 회전이 벌어진 성계.",
  },

  /** 위치 : 은하맵 기준 35vw 75vh
   *  연결 : 엘곤(9) 아스타테(3)
   *  행성 : 델모퓌라이
   *        보이오이아
   */
  {
    code: "230011",
    nameKr: "도리아",
    nameEn: "DORIA",
    nameJp: "",
    x: 575,
    y: 300,
    type: "neutral",
    desc: "아스타테 성계에서 본격적인 동맹령으로 진입하기 위한 주요 기점",
  },

  /** 위치 : 은하맵 기준 65vw 30vh
   *  연결 : 샤헨(1) 아이젠헤르트(7)
   *  행성 : 자크스 코프르크
   */
  {
    code: "230012",
    nameKr: "에크하르트",
    nameEn: "ECKHART",
    nameJp: "",
    x: 880,
    y: 645,
    type: "neutral",
    desc: "자크스 코프르크의 단일 행성 성계. 페잔과의 통로 인근에 위치하고 있다.",
  },

  /** 위치 : 은하맵 기준 5vw 25vh
   *  연결 : 리오-베르데(1) 타나투스(5)
   *  행성 : 악타이온
   */
  {
    code: "230013",
    nameKr: "엘류세라", // 에뤼세라 -> 엘류세라
    nameEn: "ECRUSHYLA",
    nameJp: "",
    x: 125,
    y: 685,
    type: "neutral",
    desc: "동맹 서부 성계.",
  },

  /** 위치 : 은하맵 기준 65vw 10vh
   *  연결 : 230066_LICHTENBERG(11)
   *        230012_ECKHART(1)
   *        230015_EISENHUT(2)
   *  행성 : 베스트파리아
   *        디사우
   */
  {
    code: "230014",
    nameKr: "아이젠헤르츠",
    nameEn: "EISENHERZ",
    nameJp: "",
    x: 860,
    y: 790,
    type: "normal",
    desc: "제국 북부 공업 성계.",
  },

  /** 위치 : 은하맵 기준 68vw 5vh
   *  연결 : 230066_LICHTENBERG(11)
   *        230012_ECKHART(1)
   *        230015_EISENHUT(2)
   *  행성 : 다룸슈타트
   */
  {
    code: "230015",
    nameKr: "아이젠후트",
    nameEn: "EISENHUT",
    nameJp: "",
    x: 1065,
    y: 755,
    type: "normal",
    desc: "제국 중부 성계.",
  },

  /** 위치 : 은하맵 기준 30vw 90vh
   *  연결 : 230051_SHIVA(6)
   *        230010_DAGON(2)
   *        230011_DORIA(4)
   *        230017_EL-PACIL(5)
   *  행성 : 샴프르
   *        보프-마나프
   *        메헤라브
   */
  {
    code: "230016",
    nameKr: "엘곤",
    nameEn: "ELGON",
    nameJp: "",
    x: 500,
    y: 120,
    type: "neutral",
    desc: "동맹 북부 중립 성계.",
  },

  /** 위치 : 은하맵 기준 35vw 85vh
   *  연결 : 230010_DAGON()
   *        아스타테
   *  행성 : 엘-파실
   *        에스트레마도라
   */
  {
    code: "230017",
    nameKr: "엘-파실",
    nameEn: "EL-PACIL",
    nameJp: "",
    x: 455,
    y: 430,
    type: "normal",
    desc: "양 웬리가 탈출 작전을 이끈 성계.",
  },
  {
    code: "230018",
    nameKr: "파이어져드",
    nameEn: "Phiazard",
    nameJp: "",
    x: 605,
    y: 555,
    type: "neutral",
    desc: "서방 중립 성계.",
  },

  /** 위치 : 은하맵 기준 75vw 55vh
   *  연결 : 발할라(5시) 브라운슈바이크(7) 샨타우(11)
   *  행성 : 렌텐베르크
   *        니플헤임
   */
  {
    code: "230019",
    nameKr: "프레이아",
    nameEn: "FREYA",
    nameJp: "",
    x: 1260,
    y: 370,
    type: "normal",
    desc: "발할라 성계로 가는 입구. 렌텐베르크 요새가 존재한다.",
  },

  /** 위치 : y 30vh, x 20vw
   *  연결 : 트리플라(6) 라이갈(9) 버밀리온 12 란테마리오 4
   *  행성 : 우르바시 > 인구 10만명의 서늘한 기후가 특징인 행성. 과거 행성개발기업에서 개발을 추진하였으나 실패하여 현재는 버려진 상태이다.
   *        프라바스 >
   */
  {
    code: "230020",
    nameKr: "간다르바",
    nameEn: "GANDHARVA",
    nameJp: "",
    x: 410,
    y: 635,
    type: "normal",
    desc: "동맹 남부 성계의 주요 거점 성계.",
  },
  {
    code: "230021",
    nameKr: "하안",
    nameEn: "HAN",
    nameJp: "",
    x: 935,
    y: 385,
    type: "neutral",
    desc: "회랑 인근 중립 성계.",
  },
  /** 위치 : 12시 방면에 위치 (y축은 vh 80%정도)
   *  연결 : 티아메트 / 벤플리트 / 아레스하임 (왼쪽으로 위부터) , 암릿쳐 (오른쪽)
   *  행성 : 이제르론 */
  {
    code: "230022",
    nameKr: "이제르론",
    nameEn: "ISERLOHN",
    nameJp: "",
    x: 920,
    y: 295,
    type: "fortress",
    desc: "이제르론 요새. 토르 해머를 보유한 회랑의 열쇠. 양 웬리가 무혈점령한 난공불락의 요새.",
  },
  {
    code: "230023",
    nameKr: "잠시드",
    nameEn: "JAMSID",
    nameJp: "",
    x: 380,
    y: 320,
    type: "neutral",
    desc: "동맹 중부 중립 성계.",
  },
  {
    code: "230024",
    nameKr: "요툰하임",
    nameEn: "JOTUNHEIM",
    nameJp: "",
    x: 980,
    y: 825,
    type: "normal",
    desc: "제국 남부 성계.",
  },
  {
    code: "230025",
    nameKr: "카프체란카",
    nameEn: "KAPCHE_LANKA",
    nameJp: "",
    x: 1140,
    y: 810,
    type: "frontier",
    desc: "이제르론 회랑 인근 제국 변경 성계.",
  },

  /** 위치 : 3시 방면에 위치 (x축은 95vh y축은 vh 35%정도 )
   *  연결 : 발할라(11시) 마린도르프(7시)
   *  행성 : 카스트로프 > 카스트로프의 제 2성계. 수도행성으로 소수의 귀족들이 화려한 생활을 하고 있다.
   *        라파트 > 카스트로프의 제 1성계. 농업행성으로 많은 곡물이 생성되나, 가혹한 수탈로 인해 식량 사정은 썩 좋지 못하다
   *        케니히그라흐 > 카스트로프와 인접한 위성. 카스트로프 동란기엔 아르테미스의 목걸이가 설치되었던 곳이다. */
  {
    code: "230026",
    nameKr: "카스트로프",
    nameEn: "CASTROP",
    nameJp: "",
    x: 1460,
    y: 510,
    type: "noble",
    desc: "카스트로프 공작령.",
  },

  {
    code: "230027",
    nameKr: "케륨",
    nameEn: "KERUM",
    nameJp: "",
    x: 1080,
    y: 580,
    type: "neutral",
    desc: "동방 중립 성계.",
  },

  /** 위치 : 은하맵 기준 x : 75vw y : 50vh 정도?
   *  연결 : 브라운슈바이크(5) 샨타우(1) 바르텐부르크(6) 알멘트푸벨(10)
   *  행성 : 가르미슈
   *        스루즈헤임
   *        가랴르호른 */
  {
    code: "230028",
    nameKr: "키포이져",
    nameEn: "KIFOISER", // KYFFHAUSER가 아니라 KIFOISER로 변경
    nameJp: "",
    x: 1095,
    y: 460,
    type: "neutral",
    desc: "브리운슈바이크 공작령의 영향권에 있는 성계이다.",
  },

  {
    code: "230029",
    nameKr: "레그니차",
    nameEn: "LEGNICA",
    nameJp: "",
    x: 600,
    y: 400,
    type: "frontier",
    desc: "동맹 전선 성계. 이젤론 회랑에 인접.",
  },
  {
    code: "230030",
    nameKr: "리히텐라데",
    nameEn: "LICHTENLADE",
    nameJp: "",
    x: 1355,
    y: 220,
    type: "noble",
    desc: "리히텐라데 공작령.",
  },
  {
    code: "230031",
    nameKr: "립슈타트",
    nameEn: "LIPPSTADT",
    nameJp: "",
    x: 1300,
    y: 480,
    type: "noble",
    desc: "립슈타트 회의가 열린 제국 귀족 성계.",
  },
  {
    code: "230032",
    nameKr: "리텐하임",
    nameEn: "LITTENHEIM",
    nameJp: "",
    x: 1160,
    y: 410,
    type: "noble",
    desc: "리텐하임 후작령. 립슈타트 전역의 주요 거점.",
  },
  {
    code: "230033",
    nameKr: "로포덴",
    nameEn: "LOPODEN",
    nameJp: "",
    x: 155,
    y: 445,
    type: "normal",
    desc: "동맹 중부 성계.",
  },
  {
    code: "230034",
    nameKr: "룬비니",
    nameEn: "LUNVINI",
    nameJp: "",
    x: 590,
    y: 660,
    type: "normal",
    desc: "동맹 남부 성계.",
  },
  {
    code: "230035",
    nameKr: "뤼카스",
    nameEn: "LYUCAS", // Lycus --> LYUCAS
    nameJp: "",
    x: 1500,
    y: 260,
    type: "normal",
    desc: "제국 내 산업 성계.",
  },
  {
    code: "230036",
    nameKr: "뤼카스 성역",
    nameEn: "LUYKAS_FPA",
    nameJp: "",
    x: 245,
    y: 520,
    type: "normal",
    desc: "동맹 서부 성계.",
  },

  {
    code: "230037",
    nameKr: "마르-아데타", // (말 아데타 X 마르-아데타로 확정)
    nameEn: "MARR-ADETTA",
    nameJp: "",
    x: 515,
    y: 560,
    type: "contested",
    desc: "마르 아데타 회전의 격전지.",
  },
  {
    code: "230038",
    nameKr: "마르바흐",
    nameEn: "MARBACH",
    nameJp: "",
    x: 1220,
    y: 715,
    type: "normal",
    desc: "제국 내 농업 성계.",
  },
  {
    code: "230039",
    nameKr: "마린도르프",
    nameEn: "MARIENDORF",
    nameJp: "",
    x: 1295,
    y: 590,
    type: "noble",
    desc: "마린도르프 백작령. 힐데가르트의 출신 성계.",
  },
  {
    code: "230040",
    nameKr: "노이에란트",
    nameEn: "NEUE_LAND",
    nameJp: "",
    x: 1540,
    y: 140,
    type: "frontier",
    desc: "제국 변경 성계. 과거 전투의 흔적이 남아있다.",
  },
  {
    code: "230041",
    nameKr: "팔란티아",
    nameEn: "PALANTIA",
    nameJp: "",
    x: 695,
    y: 320,
    type: "neutral",
    desc: "중립 성계. 인근.",
  },

  /** 위치 : 6시 방면에 위치 (y축은 vh 30%정도)
   *  연결 : 230065_SCHATTENBURG (왼쪽) , 230014_EISENHERZ (오른쪽)
   *  행성 : 페잔 */
  {
    code: "230042",
    nameKr: "페잔",
    nameEn: "PHEZZAN",
    nameJp: "フェザーン",
    x: 830,
    y: 700,
    type: "capital",
    desc: "페잔 자치령 수도. 제국과 동맹 사이의 무역 중심지. 페잔 회랑의 열쇠.",
  },
  {
    code: "230043",
    nameKr: "포레비트",
    nameEn: "PHOREVIT",
    nameJp: "",
    x: 720,
    y: 910,
    type: "neutral",
    desc: "페잔 남방 중립 성계.",
  },
  {
    code: "230044",
    nameKr: "포르겐",
    nameEn: "FORGEN", // 230044_PORGEN은 잘못되었음. FORGEN이 맞음
    nameJp: "",
    x: 1055,
    y: 265,
    type: "neutral",
    desc: "제국 북방 중립 성계.",
  },
  {
    code: "230045",
    nameKr: "라이갈",
    nameEn: "Raigarh",
    nameJp: "",
    x: 290,
    y: 635,
    type: "neutral",
    desc: "동맹 남부 중립 성계.",
  },

  /** 위치 : 은하맵 기준 30vw 20vh
   *  연결 : 230043_PHOREVIT(5)
   *        230037_MARR-ADETTA(1)
   *        230064_JAMZID(11~12)
   *        230020_GANDHARVA(9~10)
   *        230035_LYUCAS (11)
   *  행성 : 라티고스트
   *        스벤트비트
   *        야로비트
   */
  {
    code: "230046",
    nameKr: "란테마리오",
    nameEn: "RANTEMARIO",
    nameJp: "",
    x: 365,
    y: 660,
    type: "normal",
    desc: "동맹 남서부 성계. 란테마리오 회전의 격전지.",
  },

  /** 위치 : 은하맵 기준 15vw 45vh
   *  연결 : 바라트
   *        타나투스
   *        엘류세라
   *  행성 : 아로요-드-모리노
   *        카시나
   */
  {
    code: "230047",
    nameKr: "리오-베르데",
    nameEn: "RIO-VERDE",
    nameJp: "",
    x: 140,
    y: 610,
    type: "normal",
    desc: "동맹 남부 성계.",
  },
  {
    code: "230048",
    nameKr: "샤헨",
    nameEn: "SHACHEN",
    nameJp: "",
    x: 1010,
    y: 500,
    type: "normal",
    desc: "제국 서북부 성계.",
  },
  {
    code: "230049",
    nameKr: "샨다르아",
    nameEn: "SHANDARA",
    nameJp: "",
    x: 650,
    y: 605,
    type: "normal",
    desc: "동맹 남부 성계.",
  },
  {
    code: "230050",
    nameKr: "샨다우",
    nameEn: "SHANDOW",
    nameJp: "",
    x: 1130,
    y: 440,
    type: "normal",
    desc: "제국 중부 성계.",
  },
  {
    code: "230051",
    nameKr: "시바",
    nameEn: "SHIVA",
    nameJp: "",
    x: 920,
    y: 570,
    type: "contested",
    desc: "회랑 남방 성계.",
  },
  {
    code: "230052",
    nameKr: "슈팔라",
    nameEn: "SPAHLA",
    nameJp: "",
    x: 530,
    y: 475,
    type: "neutral",
    desc: "중립 성계.",
  },

  {
    code: "230053",
    nameKr: "타나투스",
    nameEn: "Thanatos",
    nameJp: "",
    x: 170,
    y: 750,
    type: "normal",
    desc: "동맹 포로수용소 에코니아가 있는 성계.",
  },
  {
    code: "230054",
    nameKr: "타시리",
    nameEn: "TASIRI",
    nameJp: "",
    x: 260,
    y: 590,
    type: "neutral",
    desc: "동맹 남서부 중립 성계.",
  },
  {
    code: "230055",
    nameKr: "티아매트",
    nameEn: "Tiamat",
    nameJp: "",
    x: 830,
    y: 105,
    type: "fortress",
    desc: "티아마트 성역. 아르테미스의 목걸이 방위 위성군을 보유.",
  },

  /** 위치 : 은하맵 기준 85vw 88vh
   *  연결 : 샨타우(7시) 리히텐라데(5시)
   *  행성 : 호포키르히
   *        비텐베르크
   */
  {
    code: "230056",
    nameKr: "트라바흐",
    nameEn: "TRABAH",
    nameJp: "",
    x: 1240,
    y: 215,
    type: "neutral",
    desc: "제국 북방 외곽에 존재하는 성계.",
  },

  {
    code: "230057",
    nameKr: "트리폴라",
    nameEn: "Tripura",
    nameJp: "",
    x: 245,
    y: 790,
    type: "neutral",
    desc: "동맹 남방 중립 성계.",
  },

  /** 위치 : 3시 방면에 위치 (x축은 90vh y축은 vh 45%정도 )
   *  연결 : 리히텐라데(12시), 프레이야(10시), 카스트로프(5시)
   *  행성 : 오딘 > 발할라 성계에 위치한 3행성. 은하제국의 수도.
   *        아스가르즈 > 발할라 성계에 위치한 2행성.
   *        유그드라실 > 발할라 성계에 위치한 1행성. */
  {
    code: "230058",
    nameKr: "발할라",
    nameEn: "VALHALLA",
    nameJp: "ヴァルハラ",
    x: 1390,
    y: 415,
    type: "capital",
    desc: "은하제국의 수도 성계. 오딘을 중심으로 세 개의 행성이 있다.",
  },

  {
    code: "230059",
    nameKr: "바르텐베르크",
    nameEn: "VANDENBERG",
    nameJp: "",
    x: 1025,
    y: 565,
    type: "normal",
    desc: "제국 남부 성계.",
  },
  {
    code: "230060",
    nameKr: "밴플리트",
    nameEn: "Van-Fleet",
    nameJp: "",
    x: 830,
    y: 215,
    type: "contested",
    desc: "제국·동맹 양측의 쟁탈전이 벌어진 분쟁 성계.",
  },
  {
    code: "230061",
    nameKr: "버밀리온",
    nameEn: "Vermilion",
    nameJp: "",
    x: 275,
    y: 390,
    type: "contested",
    desc: "버밀리온 성역. 라인하르트와 양 웬리의 숙명적 결전지.",
  },
  {
    code: "230062",
    nameKr: "빌렌슈타인",
    nameEn: "VILLENSTEIN",
    nameJp: "",
    x: 1130,
    y: 205,
    type: "normal",
    desc: "제국 동부 성계.",
  },
  {
    code: "230063",
    nameKr: "케림",
    nameEn: "KERIM",
    nameJp: "",
    x: 245,
    y: 210,
    type: "normal",
    desc: "",
  },
  /** 위치 : 6시 방면에 위치 (y축은 vh 20%정도)
   *  연결 : 케림 란테마리오 뤼카스 말아데타
   *  행성 : */
  {
    code: "230064",
    nameKr: "잠지드",
    nameEn: "JAMZID",
    nameJp: "",
    x: 340,
    y: 430,
    type: "normal",
    desc: `페잔 회랑과 자유행성동맹의 수도인 하이네센을 잇는 교통의 요지로, 대규모 조선 시설인 잠시드 중앙 조선소가 유명하다.`,
  },

  /** 구현 보류 — lane.js 연결 없음. 추후 페잔 회랑 상세화 시 구현 예정
  // {
  //   code: "230065",
  //   nameKr: "샤텐부르크",
  //   nameEn: "SCHATTENBURG",
  //   nameJp: "",
  //   x: 0,
  //   y: 0,
  //   type: "normal",
  //   desc: `페잔 회랑의 자유행성동맹쪽 출구. 후일 샤텐부르크 요새가 건설된다.`,
  // },
  */

  /** 구현 보류 — lane.js 연결 없음. 추후 페잔 회랑 상세화 시 구현 예정
  // {
  //   code: "230066",
  //   nameKr: "리히텐부르크",
  //   nameEn: "LICHTENBERG",
  //   nameJp: "",
  //   x: 0,
  //   y: 0,
  //   type: "normal",
  //   desc: `페잔 회랑의 은하제국쪽 출구. 후일 삼원수의 성이 지어지게 된다.`,
  // },
  */

  /** 구현 보류 — lane.js 연결 없음 + 코드 중복(230066). 추후 별도 코드 부여 예정
  // {
  //   code: "230066",
  //   nameKr: "테라",
  //   nameEn: "TERRA",
  //   nameJp: "",
  //   x: 0,
  //   y: 0,
  //   type: "normal",
  //   desc: `인류의 요람.`,
  // },
  */

  /** 구현 보류 — lane.js 연결 없음. 추후 제국 북부 상세화 시 구현 예정
  // {
  //   code: "230067",
  //   nameKr: "뮈켄베르거",
  //   nameEn: "MÜKKENBERGER",
  //   nameJp: "",
  //   x: 0,
  //   y: 0,
  //   type: "normal",
  //   desc: "제국 북동부 지역에서 가장 거대한 성계.",
  // },
  */

  /** 구현 필요 없음. 추후 구현 예정이니 주석만 유지할 것
  // {
  //   code: "",
  //   nameKr: "리겔",
  //   nameEn: "RIGEL",
  //   nameJp: "",
  //   x: 0,
  //   y: 0,
  //   type: "normal",
  //   desc: `오리온 자리에 위치한 항성계로 루돌프 폰 골덴바움의 첫 임지였다.`,
  // },
  */
  /** 구현 필요 없음. 추후 구현 예정이니 주석만 유지할 것
  // {
  //   code: "",
  //   nameKr: "알데바란",
  //   nameEn: "Aldebaran",
  //   nameJp: "",
  //   x: 0,
  //   y: 0,
  //   type: "normal",
  //   desc: `은하연방의 수도성계`,
  // },
  */
];