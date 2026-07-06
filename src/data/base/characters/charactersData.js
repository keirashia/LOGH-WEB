// 경로: src/data/base/characters/charactersData.js
// ================================================================
//  charactersData.js
//  경로: src/data/characters/charactersData.js
//  작성: 2026-05-29 (TN_CHAR_A_INFO.xlsx 기반)
//  수정: 2026-06-12 데이터 1차 마이그레이션 완료.
//  수정: 2026-06-23 데이터 추가
// ================================================================

// 아래 주석에 TODO가 있는 항목(인물)은 변동이 있는 항목이니 체크해야함. 수정 완료 후 주석에서 TODO 부분은 삭제
// 단 다른 시리즈에서의 능력치와 같은 참고형 영역은 유지가 필요함

// ================================================================
//  연관 데이터 파일 (TODO 처리 시 반드시 함께 참조/수정)
//  - 직업(JOBS) 마스터    : src/data/base/jobs/jobData.js
//  - 직업(JOBS) 할당      : src/data/base/characters/charactersJobs.js
//  - 트레잇(TRAITS) 마스터 : src/data/base/trait/chars/charTraitData.js
//  - 트레잇(TRAITS) 할당   : src/data/base/characters/charactersTraits.js
//
//  인물 항목의 TODO에 JOBS/TRAITS 추가가 명시된 경우,
//  위 4개 파일 중 해당하는 파일에 마스터 등록 + 할당을 함께 처리해야 함.
//  (예: JOBS만 적혀있으면 jobData.js 확인 후 charactersJobs.js에 할당,
//       TRAITS가 적혀있으면 charTraitData.js에 마스터 등록 후 charactersTraits.js에 할당)
// ================================================================

// 주석 부분은 확인 후 삭제할것 (참조용임)
// TODO가 붙은 내역은 확인 후 삭제해도 됨.

/**
 * searchKeys 로직 체크
 *  : searchKeys는 개편된 name의 Kr, En, Jp를 merge후, string을 ' ', '・'으로 split하여 처리하는 것이 맞는지? 아니라면 해당 로직으로 수정하는 것이 맞는 것 같음
 */

export const CHAR_BASE = [
  // D. 싱클레어
  {
    // — 기본
    code: "CH_000001",
    name: [
      { code: "Kr", context: "D. 싱클레어" },
      { code: "En", context: "D. Sinclair" },
      { code: "Jp", context: "D. シンクレア" },
    ],
    nick: [
      { code: "Kr", context: "싱클레어" },
      { code: "En", context: "Sinclair" },
      { code: "Jp", context: "シンクレア" },
    ],
    searchKeys: [],
    birth: "SE|743.05.14",
    death: "SE|801.07.26",
    // — 성향
    faction: "FPA", // 자유행성동맹
    idea: "100", // 자유민주공화국
    econ: "100", // 자본주의
    brave: "25",
    moral: "88",
    friend: "120",
    // — 능력치
    statCmd: 10,
    statCsm: 65,
    statAtt: 5,
    statDef: 5,
    statFst: 15,
    statMng: 76,
    statInf: 74,
    statGfg: 5,
    statAfg: 5,
    statPlt: 75,
    // — 기타
    loc: "230006P01",
    point: "150",
    desc: [
      {
        code: "Kr",
        context:
          "명망높은 역사가이자 역사 다큐멘터리 해설가. 언변이 좋아 대중들로부터 많은 사랑을 받고 있다.",
      },
    ],
    // — 직업
    // 시민(JB_C001) LV0
    // 학자(JB_C003) LV0
    // — 트레잇
  },
  // E.J. 맥켄지
  {
    // — 기본
    code: "CH_000002",
    name: [
      { code: "Kr", context: "E.J. 맥켄지" },
      { code: "En", context: "E.J. Mackenzie" },
      { code: "Jp", context: "E.J. マッケンジー" },
    ],
    nick: [
      { code: "Kr", context: "맥켄지" },
      { code: "En", context: "Mackenzie" },
      { code: "Jp", context: "マッケンジー" },
    ],
    searchKeys: [],
    birth: "SE|749.08.01",
    death: "SE|801.07.26",
    // — 성향
    faction: "FPA",
    idea: "100", // 자유민주공화국
    econ: "100", // 자본주의
    brave: "25",
    moral: "88",
    friend: "120",
    // — 능력치
    statCmd: 10,
    statCsm: 65,
    statAtt: 5,
    statDef: 5,
    statFst: 15,
    statMng: 50,
    statInf: 88,
    statGfg: 5,
    statAfg: 5,
    statPlt: 75,
    // — 기타
    loc: "230006P01",
    point: "150",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  // J. 깁슨
  {
    // — 기본
    code: "CH_000003",
    name: [
      { code: "Kr", context: "J. 깁슨" },
      { code: "En", context: "J. Gibson" },
      { code: "Jp", context: "J・ギブソン" },
    ],
    nick: [
      { code: "Kr", context: "깁슨" },
      { code: "En", context: "Gibson" },
      { code: "Jp", context: "ギブソン" },
    ],
    searchKeys: [],
    birth: "SE|763.02.13",
    death: "SE|801.07.26",
    // — 성향
    faction: "FPA",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 10,
    statCsm: 65,
    statAtt: 5,
    statDef: 5,
    statFst: 15,
    statMng: 50,
    statInf: 88,
    statGfg: 5,
    statAfg: 5,
    statPlt: 75,
    // — 기타
    loc: "230006P01",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000004",
    name: [
      { code: "Kr", context: "가짜 총대주교" },
      { code: "En", context: "Fake Grand Bishop" },
      { code: "Jp", context: "偽総大主教" },
    ],
    nick: [
      { code: "Kr", context: "총대주교" },
      { code: "En", context: "Grand Bishop" },
      { code: "Jp", context: "総大主教" },
    ],
    searchKeys: [
      "가짜 대주교",
      "가짜 총대주교",
      "대역",
      "꼭두각시 대주교",
      "Fake Grand Bishop",
      "偽総大主教",
    ],
    birth: "SE|731.01.01",
    death: "SE|801.",
    // — 성향
    faction: "EAT", // 지구교
    idea: "300", // 신정정치(테라이즘)
    econ: "160", // 통제경제
    brave: "10", // 세뇌된 정신이상자, 자의식 없음
    moral: "30",
    friend: "10",
    // — 능력치 (세뇌된 대역 — 실권은 드 빌리에가 행사, 본인 능력치는 매우 낮게 책정)
    statCmd: 1,
    statCsm: 35,
    statAtt: 1,
    statDef: 1,
    statFst: 1,
    statMng: 5,
    statInf: 50, // 종교적 상징성으로 인한 영향력만 유지
    statGfg: 1,
    statAfg: 1,
    statPlt: 5,
    // — 기타
    point: "-",
    desc: [
      {
        code: "Kr",
        context:
          "진짜 총대주교가 사망한 뒤, 부주교 드 빌리에가 그 영향력 손실을 우려해 세뇌시켜 옹립한 대역.\n    망상에 빠진 정신이상자로 자의식이 거의 없으며, 실질적인 교단 운영은 전적으로 드 빌리에가 좌우한다.",
      },
      {
        code: "En",
        context:
          "After the death of the real Grand Bishop, Archbishop De Villie, fearing the loss of the Church's influence, brainwashed a delusional man to take his place as a figurehead. With virtually no sense of self left, the impostor serves purely as a religious symbol while De Villie wields all real authority over the Church.",
      },
      {
        code: "Jp",
        context:
          "本物の総大主教の死後、その影響力の喪失を恐れた副主教ドゥ・ヴィリエが洗脳して立てた替え玉。妄想に取り憑かれた精神異常者で自我はほとんど残っておらず、教団の実質的な運営はすべてドゥ・ヴィリエが握っている。宗教的象徴としてのみ機能する。",
      },
    ],
    // — 직업
    // — 트레잇
    // 우주의 장막(TRC_U_000004) LV0
  },
  {
    // — 기본
    code: "CH_000005",
    name: [
      { code: "Kr", context: "게르하르트 폰 슈퇴거" },
      { code: "En", context: "Gerhard von Staeger" },
      { code: "Jp", context: "ゲアハルト・フォン・シュテーガー" },
    ],
    nick: [
      { code: "Kr", context: "슈퇴거" },
      { code: "En", context: "Staeger" },
      { code: "Jp", context: "シュテーガー" },
    ],
    searchKeys: [],
    birth: "SE|740.",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  // 겔라흐 Gerlach/Gerlache ・ ゲルラッハ
  {
    // — 기본
    code: "CH_000006",
    name: [
      { code: "Kr", context: "겔라흐" },
      { code: "En", context: "Gerlache" },
      { code: "Jp", context: "ゲルラッハ" },
    ],
    nick: [
      { code: "Kr", context: "겔라흐" },
      { code: "En", context: "Gerlache" },
      { code: "Jp", context: "ゲルラッハ" },
    ],
    searchKeys: [],
    nickFn: ["Gerlach", "겔라하", "게를라흐"],
    birth: "SE|735.08.14",
    death: "",
    // — 성향
    faction: "REH", // 은하제국
    idea: "270", // 전제군주제
    econ: "140", // 혼합경제
    brave: "25", // 신중
    moral: "52",
    friend: "108",
    // — 능력치
    statCmd: 3,
    statCsm: 62,
    statAtt: 2,
    statDef: 4,
    statFst: 2,
    statMng: 82,
    statInf: 65,
    statGfg: 2,
    statAfg: 2,
    statPlt: 78,
    // — 기타
    loc: "230058P01",
    point: "0",
    desc: [
      { code: "Kr", context: "자작 귀족 출신으로 궁정 내각의 일원." },
      {
        code: "En",
        context:
          "Imperial Minister of Finance under Kaiser Friedrich IV. A Viscount and member of the court cabinet. He was replaced by Eugen Richter following the fall of the Goldenbaum Dynasty.",
      },
      {
        code: "Jp",
        context:
          "フリードリヒ4世治下の帝国財務尚書。子爵貴族出身で宮廷内閣の一員。ゴールデンバウム王朝崩壊後にオイゲン・リヒターに交代させられた。",
      },
    ],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000007",
    name: [
      { code: "Kr", context: "고드윈" },
      { code: "En", context: "Godwin" },
      { code: "Jp", context: "ゴドウィン" },
    ],
    nick: [
      { code: "Kr", context: "고드윈" },
      { code: "En", context: "Godwin" },
      { code: "Jp", context: "ゴドウィン" },
    ],
    searchKeys: [],
    birth: "SE|742.07.22",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "-",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000008",
    name: [
      { code: "Kr", context: "골트슈미트" },
      { code: "En", context: "Goldschmidt" },
      { code: "Jp", context: "ゴルトシュミット" },
    ],
    nick: [
      { code: "Kr", context: "골트슈미트" },
      { code: "En", context: "Goldschmidt" },
      { code: "Jp", context: "ゴルトシュミット" },
    ],
    searchKeys: [],
    birth: "SE|757.05.08",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "100",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000009",
    name: [
      { code: "Kr", context: "폴터마이스터" },
      { code: "En", context: "Foltermeister" },
    ],
    nick: [
      { code: "Kr", context: "폴터마이스터" },
      { code: "En", context: "Foltermeister" },
    ],
    searchKeys: [],
    birth: "SE|757.01.01",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "X",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000010",
    name: [
      { code: "Kr", context: "고틀리프 폰 잉골슈타트" },
      { code: "Jp", context: "ゴットリーブ・フォン・インゴルシュタット" },
    ],
    nick: [
      { code: "Kr", context: "잉골슈타트" },
      { code: "Jp", context: "インゴルシュタット" },
    ],
    searchKeys: [],
    birth: "SE|590.07.11",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000011",
    name: [{ code: "Kr", context: "구스타프 폰 골덴바움" }],
    nick: [{ code: "Kr", context: "구스타프" }],
    searchKeys: [],
    birth: "SE|617.08.03",
    death: "SE|646.08.01",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "X",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000012",
    name: [{ code: "Kr", context: "구즈만" }],
    nick: [{ code: "Kr", context: "구즈만" }],
    searchKeys: [],
    birth: "SE|757.05.08",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000013",
    name: [{ code: "Kr", context: "구텐존" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "SE|757.03.12",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000014",
    name: [
      { code: "Kr", context: "굿윈" },
      { code: "En", context: "Goodwin" },
    ],
    nick: [
      { code: "Kr", context: "굿윈" },
      { code: "En", context: "Goodwin" },
    ],
    searchKeys: [],
    birth: "SE|752.07.19",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000015",
    name: [
      { code: "Kr", context: "귄터 키슬링" },
      { code: "En", context: "Günter Kißling" },
      { code: "Jp", context: "ギュンター・キスリング" },
    ],
    nick: [
      { code: "Kr", context: "키슬링" },
      { code: "En", context: "Kißling" },
      { code: "Jp", context: "キスリング" },
    ],
    searchKeys: [],
    birth: "SE|770.05.11",
    death: "",
    // — 성향
    faction: "REH",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "230058P01", // 오딘
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000016",
    name: [{ code: "Kr", context: "그나이스터" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000017",
    name: [
      { code: "Kr", context: "그레고르 폰 뮈켄베르거" },
      { code: "En", context: "Gregor von Mückenberger" },
      { code: "Jp", context: "グレゴール・フォン・ミュッケンベルガー" },
    ],
    nick: [
      { code: "Kr", context: "뮈켄베르거" },
      { code: "En", context: "Mückenberger" },
      { code: "Jp", context: "ミュッケンベルガー" },
    ],
    searchKeys: [],
    birth: "SE|738.11.19",
    death: "",
    // — 성향
    faction: "REH", // 은하제국
    idea: "270", // 전제군주제
    econ: "140", // 혼합경제
    brave: "60", // 일반
    moral: "72",
    friend: "115",
    // — 능력치
    statCmd: 89,
    statCsm: 78,
    statAtt: 58,
    statDef: 60,
    statFst: 63,
    statMng: 30,
    statInf: 35,
    statGfg: 71,
    statAfg: 83,
    statPlt: 88,
    // — 기타
    loc: "230058P01", // 오딘
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "프리드리히 4세 치하 제국 우주함대사령장관. 3장관 중 실질적 군사 지휘권을 보유한 최고위직. 라인하르트 폰 뮤젤의 급속한 성장을 경계했으나 막을 수 없었다. 립슈타트 반란 이후 강제 퇴역하였다.",
      },
      {
        code: "En",
        context:
          "Space Fleet Commander in Chief under Kaiser Friedrich IV, the most senior of the three Imperial military chiefs with actual field command authority. He viewed Reinhard von Lohengramm's rise with wariness but was powerless to stop it. Forced into retirement following the Lippstadt Rebellion.",
      },
      {
        code: "Jp",
        context:
          "フリードリヒ4世治下の宇宙艦隊司令長官。三長官の中で実質的な軍事指揮権を持つ最高位職。ラインハルト・フォン・ミューゼルの台頭を警戒したが阻めなかった。リップシュタット叛乱後に強制退役した。",
      },
    ],
    // — 직업
    // 우주함대사령장관(JB_R006) LV0
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000018",
    name: [
      { code: "Kr", context: "그레고르 폰 크룸바흐" },
      { code: "En", context: "Gregor von Krumbach" },
      { code: "Jp", context: "グレゴール・フォン・クルムバッハ" },
    ],
    nick: [
      { code: "Kr", context: "크룸바흐" },
      { code: "En", context: "Krumbach" },
      { code: "Jp", context: "クルムバッハ" },
    ],
    searchKeys: [],
    birth: "SE|760.02.08",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000019",
    name: [
      { code: "Kr", context: "그레드윈 스코트" },
      { code: "Jp", context: "グレドウィン・スコット" },
    ],
    nick: [
      { code: "Kr", context: "스코트" },
      { code: "Jp", context: "スコット" },
    ],
    searchKeys: [],
    birth: "SE|746.03.08",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000020",
    name: [
      { code: "Kr", context: "그레브너" },
      { code: "En", context: "Gräbner" },
      { code: "Jp", context: "グレーブナー" },
    ],
    nick: [
      { code: "Kr", context: "그레브너" },
      { code: "En", context: "Gräbner" },
      { code: "Jp", context: "グレーブナー" },
    ],
    searchKeys: [],
    birth: "SE|754.06.17",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000021",
    name: [{ code: "Kr", context: "그레이엄 에버드 노엘베이커" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000022",
    name: [
      { code: "Kr", context: "그레첸 폰 에어푸르트" },
      { code: "Jp", context: "グレーチェン・フォン・エアフルト" },
    ],
    nick: [
      { code: "Kr", context: "그레첸" },
      { code: "Jp", context: "グレーチェン" },
    ],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000023",
    name: [{ code: "Kr", context: "그로브너" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000024",
    name: [
      { code: "Kr", context: "그로테발" },
      { code: "En", context: "Grohtewal" },
    ],
    nick: [{ code: "En", context: "Grohtewal" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000025",
    name: [{ code: "Kr", context: "그뢰브너" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000026",
    name: [
      { code: "Kr", context: "그뤼네만" },
      { code: "En", context: "Grunemann" },
      { code: "Jp", context: "グリューネマン" },
    ],
    nick: [
      { code: "Kr", context: "그뤼네만" },
      { code: "En", context: "Grunemann" },
      { code: "Jp", context: "グリューネマン" },
    ],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000027",
    name: [{ code: "Kr", context: "그리스" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000028",
    name: [{ code: "Kr", context: "글레이저" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000029",
    name: [{ code: "Kr", context: "글레저" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000030",
    name: [
      { code: "Kr", context: "글룩" },
      { code: "En", context: "Gruck" },
      { code: "Jp", context: "グルック" },
    ],
    nick: [
      { code: "Kr", context: "글룩" },
      { code: "En", context: "Gruck" },
      { code: "Jp", context: "グルック" },
    ],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000031",
    name: [
      { code: "Kr", context: "나이세바흐" },
      { code: "En", context: "Neisebach" },
    ],
    nick: [{ code: "En", context: "Neisebach" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000032",
    name: [
      { code: "Kr", context: "나이트하르트 뮐러" },
      { code: "En", context: "Neidhart Müller" },
      { code: "Jp", context: "ナイトハルト・ミュラー" },
    ],
    nick: [
      { code: "Kr", context: "뮐러" },
      { code: "En", context: "Müller" },
      { code: "Jp", context: "ミュラー" },
    ],
    searchKeys: [
      "뮐러",
      "뮬러",
      "뮈러",
      "나이트하르트",
      "나이트할트",
      "Muller",
      "Mueller",
      "ミューラー",
    ],
    birth: "SE|771.05.22",
    death: "",
    // — 성향
    faction: "REH", // 은하제국
    idea: "240", // 전제군주제
    econ: "140", // 혼합경제
    brave: "82",
    moral: "85",
    friend: "150",
    // — 능력치
    statCmd: 85,
    statCsm: 82,
    statAtt: 75,
    statDef: 92,
    statFst: 78,
    statMng: 78,
    statInf: 72,
    statGfg: 80,
    statAfg: 82,
    statPlt: 75,
    // — 기타
    loc: "230058P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "로엔그람 제독단 최연소 제독. '철벽 뮐러'라는 별명처럼 뛰어난 방어 능력과 냉정한 판단력을 겸비한 균형형 지휘관. 베르밀리온 성전에서 라인하르트를 위기에서 구해낸 것으로 유명하며, 양 웬리 진영과의 교섭 역할도 자주 맡았다.",
      },
      {
        code: "En",
        context:
          "The youngest admiral in Lohengramm's admiralty. True to his nickname \"Iron Wall Müller,\" he is a well-rounded commander with outstanding defensive ability and calm judgment. Renowned for saving Reinhard from destruction at the Battle of Vermilion, he also frequently served as Reinhard's envoy to Yang Wen-li's faction.",
      },
      {
        code: "Jp",
        context:
          "ローエングラム提督団最年少の提督。「鉄壁ミュラー」の異名通り、優れた防御能力と冷静な判断力を兼ね備えたバランス型指揮官。バーミリオン星域会戦でラインハルトを危機から救ったことで知られ、ヤン・ウェンリー陣営との交渉役も度々務めた。",
      },
    ],
    // — 직업
    // 평민(JB_N007) LV0
    // 준장(JB_MR006) LV0
    // — 트레잇
    // 철벽(TRC_U_000032) LV0
  },
  {
    // — 기본
    code: "CH_000033",
    name: [
      { code: "Kr", context: "나폴레옹 앙트완느 드 오르테르" },
      { code: "En", context: "Napoleon Antoine de Hautetaire" },
      { code: "Jp", context: "ナポレオン・アントワーヌ・ド・オットテール" },
    ],
    nick: [
      { code: "Kr", context: "오르테르" },
      { code: "En", context: "Hautetaire" },
      { code: "Jp", context: "オットテール" },
    ],
    searchKeys: [],
    birth: "SE|771.07.28",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000034",
    name: [
      { code: "Kr", context: "네그로폰테" },
      { code: "En", context: "Negroponte" },
      { code: "Jp", context: "ネグロポンティ" },
    ],
    nick: [
      { code: "Kr", context: "네그로폰테" },
      { code: "En", context: "Negroponte" },
      { code: "Jp", context: "ネグロポンティ" },
    ],
    searchKeys: [],
    birth: "SE|747.05.10",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "260",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000035",
    name: [{ code: "Kr", context: "네이스미스 워드" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000036",
    name: [{ code: "Kr", context: "노이케른" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000037",
    name: [
      { code: "Kr", context: "놀덴" },
      { code: "En", context: "Norden" },
      { code: "Jp", context: "ノルデン" },
    ],
    nick: [
      { code: "Kr", context: "놀덴" },
      { code: "En", context: "Norden" },
      { code: "Jp", context: "ノルデン" },
    ],
    searchKeys: [],
    birth: "SE|763.08.08",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000038",
    name: [{ code: "Kr", context: "니멜러" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000039",
    name: [
      { code: "Kr", context: "니콜라스 볼텍" },
      { code: "En", context: "Nikolas Boltik" },
      { code: "Jp", context: "ニコラス・ボルテック" },
    ],
    nick: [
      { code: "Kr", context: "볼텍" },
      { code: "En", context: "Boltik" },
      { code: "Jp", context: "ボルテック" },
    ],
    searchKeys: ["볼테크"],
    // ? ~ SE 800. 7. (??세)
    birth: "SE|756.05.11",
    death: "SE|800.07.20",
    // — 성향
    faction: "PZN",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "230042P01", // 페잔
    point: "0",
    desc: [{ code: "Kr", context: `` }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000040",
    name: [{ code: "Kr", context: "니콜스키" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000041",
    name: [
      { code: "Kr", context: "닐슨" },
      { code: "En", context: "Nilsson" },
      { code: "Jp", context: "ニルソン" },
    ],
    nick: [
      { code: "Kr", context: "닐슨" },
      { code: "En", context: "Nilsson" },
      { code: "Jp", context: "ニルソン" },
    ],
    searchKeys: [],
    birth: "SE|744.09.30",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000042",
    name: [{ code: "Kr", context: "단크" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  // 더스티 아텐보로 Dusty Attenborough · ダスティ·アッテンボロー
  {
    // — 기본
    code: "CH_000043",
    name: [
      { code: "Kr", context: "더스티 아텐보로" },
      { code: "En", context: "Dusty Attenborough" },
      { code: "Jp", context: "ダスティ・アッテンボロー" },
    ],
    nick: [
      { code: "Kr", context: "아텐보로" },
      { code: "En", context: "Attenborough" },
      { code: "Jp", context: "アッテンボロー" },
    ],
    searchKeys: ["아텐보로", "어텐보로", "Attemborough", "Attenborough"],
    birth: "SE|769.11.23",
    death: "",
    // — 성향
    faction: "FPA", // 자유행성동맹
    idea: "100", // 자유민주공화국
    econ: "100", // 시장경제
    brave: "80",
    moral: "82",
    friend: "170",
    // — 능력치
    statCmd: 74,
    statCsm: 76,
    statAtt: 89,
    statDef: 82,
    statFst: 86,
    statMng: 45,
    statInf: 59,
    statGfg: 50,
    statAfg: 81,
    statPlt: 75,
    // — 기타
    loc: "230006P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "자유행성동맹 소속의 군인. \n    재치와 과단성을 자랑하는 명장으로 빠른 기동력을 앞세운 허를 찌르는 날카로운 공격이 주특기.\n    사회에 대한 불평불만이 많고 독설가이며 전쟁을 싫어하지만 뛰어난 재능을 가지고 있다.",
      },
    ],
    // — 직업
    // — 트레잇
    // 허허실실의 귀재(TRC_U_000043) LV0
  },
  {
    // — 기본
    code: "CH_000044",
    name: [
      { code: "Kr", context: "데그스비" },
      { code: "En", context: "Degsby" },
      { code: "Jp", context: "デグスビイ" },
    ],
    nick: [
      { code: "Kr", context: "데그스비" },
      { code: "En", context: "Degsby" },
      { code: "Jp", context: "デグスビイ" },
    ],
    searchKeys: [],
    birth: "SE|777.01.07",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000045",
    name: [
      { code: "Kr", context: "데슈" },
      { code: "En", context: "Desch" },
      { code: "Jp", context: "デッシュ" },
    ],
    nick: [
      { code: "Kr", context: "데슈" },
      { code: "En", context: "Desch" },
      { code: "Jp", context: "デッシュ" },
    ],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000046",
    name: [
      { code: "Kr", context: "도로테아 폰 샤프하우젠" },
      { code: "En", context: "Dorothea von Schaffhausen" },
      { code: "Jp", context: "ドロテーア・フォン・シャフハウゼン" },
    ],
    nick: [
      { code: "Kr", context: "도로테아" },
      { code: "En", context: "Dorothea von Schaffhausen" },
      { code: "Jp", context: "ドロテーア" },
    ],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000047",
    name: [
      { code: "Kr", context: "도미니크 생 피에르" },
      { code: "En", context: "Dominique Saint-Pierré" },
      { code: "Jp", context: "ドミニク・サン・ピエール" },
    ],
    nick: [
      { code: "Kr", context: "도미니크" },
      { code: "En", context: "Dominique" },
      { code: "Jp", context: "ドミニク" },
    ],
    searchKeys: [],
    birth: "SE|768.03.24",
    death: "",
    // — 성향
    faction: "PZN", // 페잔 자치령
    idea: "150", // 귀족제
    econ: "220", // 국가자본주의
    brave: "72", // 용맹
    moral: "55",
    friend: "130",
    // — 능력치
    statCmd: 4,
    statCsm: 88,
    statAtt: 3,
    statDef: 5,
    statFst: 5,
    statMng: 65,
    statInf: 78,
    statGfg: 3,
    statAfg: 3,
    statPlt: 82,
    // — 기타
    loc: "230042P01", // 페잔
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "페잔의 가수이자 댄서. 아드리안 루빈스키의 오랜 연인. 루빈스키의 야망과 계략을 가까이서 지켜본 인물로, 페잔의 몰락과 함께 공범으로 체포됐다.",
      },
      {
        code: "En",
        context:
          "A Fezzani singer and dancer and the long-time companion of Adrian Rubinsky. She witnessed his ambitions and schemes at close range, and was arrested as an accomplice following the fall of Fezzan.",
      },
      {
        code: "Jp",
        context:
          "ペザンの歌手兼ダンサー。アドリアン・ルビンスキーの長年の恋人。ルビンスキーの野望と謀略を間近で見届けた人物で、ペザン崩壊とともに共犯者として逮捕された。",
      },
    ],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000048",
    name: [
      { code: "Kr", context: "도슨" },
      { code: "En", context: "Dawson" },
      { code: "Jp", context: "ドーソン" },
    ],
    nick: [
      { code: "En", context: "Dawson" },
      { code: "Jp", context: "ドーソン" },
    ],
    searchKeys: [],
    birth: "SE|740.11.29",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "252",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000049",
    name: [{ code: "Kr", context: "도우멕" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000050",
    name: [{ code: "Kr", context: "돌프 자이데룬" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000051",
    name: [
      { code: "Kr", context: "드 빌리에" },
      { code: "En", context: "De Villie" },
      { code: "Jp", context: "ドゥ・ヴィリエ" },
    ],
    nick: [
      { code: "Kr", context: "드 빌리에" },
      { code: "En", context: "De Villie" },
      { code: "Jp", context: "ヴィリエ" },
    ],
    searchKeys: [
      "드빌리에",
      "드 빌리에",
      "비예",
      "De Villie",
      "Devilier",
      "ヴィリエ",
    ],
    birth: "",
    death: "SE|801.",
    // — 성향
    faction: "EAT", // 지구교
    idea: "300", // 신정정치(테라이즘)
    econ: "160", // 통제경제
    brave: "55",
    moral: "10", // 신념 없이 권력만을 추구하는 냉혹한 모략가
    friend: "20",
    // — 능력치 (지구교의 실권자. 모략·정보·정치공작에 특화된 흑막형 캐릭터)
    statCmd: 15,
    statCsm: 55,
    statAtt: 5,
    statDef: 8,
    statFst: 8,
    statMng: 68,
    statInf: 92,
    statGfg: 5,
    statAfg: 5,
    statPlt: 90,
    // — 기타
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "지구교의 부주교이자 실질적 실권자. 테라이즘의 교리를 믿지 않으며 오직 권력 그 자체를 추구하는 냉혹한 모략가다. 총대주교의 사망을 은폐하고 세뇌시킨 대역을 옹립해 교단을 장악했으며, 제국과 동맹 양국 내부에 깊이 침투해 전쟁을 부추기는 공작을 주도한다.",
      },
      {
        code: "En",
        context:
          "Archbishop and de facto ruler of the Terraist Church. Unlike the Grand Bishop, he holds no genuine faith in Terraist doctrine and is driven purely by a hunger for power. He concealed the Grand Bishop's death and installed a brainwashed impostor in his place to seize control of the Church, and orchestrates covert operations deeply embedded within both the Empire and the Alliance to keep the war between them burning.",
      },
      {
        code: "Jp",
        context:
          "地球教の副主教であり実質的な実権者。テライズムの教義を信じておらず、ただ権力そのものを追い求める冷徹な策謀家である。総大主教の死を隠蔽し洗脳した替え玉を立てて教団を掌握し、帝国・同盟両国内部に深く浸透して戦争を煽る工作を主導する。",
      },
    ],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000052",
    name: [{ code: "Kr", context: "드레벤츠" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000053",
    name: [{ code: "Kr", context: "드로먼" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000054",
    name: [{ code: "Kr", context: "드로이젠" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  // D.그린힐
  {
    // — 기본
    code: "CH_000055",
    name: [
      { code: "Kr", context: "드와이트 그린힐" },
      { code: "En", context: "Dwight Greenhill" },
      { code: "Jp", context: "ドワイト・グリーンヒル" },
    ],
    nick: [
      { code: "Kr", context: "D.그린힐" },
      { code: "En", context: "D.Greenhill" },
      { code: "Jp", context: "D.グリーンヒル" },
    ],
    searchKeys: [],
    birth: "SE|745.04.03",
    death: "SE|797.08.30",
    // — 성향
    faction: "FPA", // 자유행성동맹
    idea: "100", // 자유민주공화국
    econ: "100", // 자본주의
    brave: "25", // 신중
    moral: "80",
    friend: "285",
    // — 능력치
    statCmd: 81,
    statCsm: 84,
    statAtt: 48,
    statDef: 60,
    statFst: 46,
    statMng: 93,
    statInf: 88,
    statGfg: 71,
    statAfg: 73,
    statPlt: 95,
    // — 기타
    loc: "230006P01",
    point: "150",
    desc: [
      {
        code: "Kr",
        context:
          "자유행성동맹 통합작전본부 부본부장. 프레데리카 그린힐의 부친. 뛰어난 운영·정보 능력을 지닌 행정형 제독으로, 정치공작에도 발군의 재능을 보인다.",
      },
      {
        code: "En",
        context:
          "Deputy Chief of the Free Planets Alliance Joint Operations Headquarters and father of Frederica Greenhill. An administrative admiral with outstanding operational and intelligence abilities, and exceptional aptitude for political maneuvering.",
      },
      {
        code: "Jp",
        context:
          "自由惑星同盟統合作戦本部副本部長。フレデリカ・グリーンヒルの父。優れた運営・情報能力を持つ行政型提督で、政治工作にも卓越した才能を発揮する。",
      },
    ],
    // — 직업
    // 시민(JB_C001) LV0
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000056",
    name: [{ code: "Kr", context: "디터스도르프" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000057",
    name: [{ code: "Kr", context: "디트리히 자우켄" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000058",
    name: [{ code: "Kr", context: "딕켈" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000059",
    name: [{ code: "Kr", context: "라베나르트" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  // 라오 Lao ラオ
  {
    // — 기본
    code: "CH_000060",
    name: [
      { code: "Kr", context: "라오" },
      { code: "En", context: "Lao" },
      { code: "Jp", context: "ラオ" },
    ],
    nick: [
      { code: "Kr", context: "라오" },
      { code: "En", context: "Lao" },
      { code: "Jp", context: "ラオ" },
    ],
    searchKeys: [],
    birth: "SE|765.04.09",
    death: "",
    // — 성향
    faction: "FPA", // 자유행성동맹
    idea: "100", // 자유민주공화국
    econ: "100", // 시장경제
    brave: "72",
    moral: "78",
    friend: "130",
    // — 능력치
    statCmd: 65,
    statCsm: 72,
    statAtt: 65,
    statDef: 62,
    statFst: 70,
    statMng: 68,
    statInf: 72,
    statGfg: 62,
    statAfg: 65,
    statPlt: 68,
    // — 기타
    loc: "230006P01",
    point: "0",
    desc: [{ code: "Kr", context: "자유행성동맹 소속의 군인" }],
    // — 직업
    // — 트레잇
    // 충실한 보좌관(TRC_G_003) LV0
  },
  // 라우디츠 Rauditz · ラウヂィッツ
  {
    // — 기본
    code: "CH_000061",
    name: [
      { code: "Kr", context: "라우디츠" },
      { code: "En", context: "Rauditz" },
      { code: "Jp", context: "ラウヂィッツ" },
    ],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: ["하우디츠"],
    birth: "",
    death: "SE|797.07.26", // 리텐하임과 동시 사망
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000062",
    name: [{ code: "Kr", context: "라이너 블룸하르트" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000063",
    name: [{ code: "Kr", context: "라이오넬 모톤" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  // Reinhard von Lohengramm · ラインハルト・フォン・ローエングラム
  {
    // — 기본
    code: "CH_000064",
    name: [
      { code: "Kr", context: "라인하르트 폰 로엔그람" },
      { code: "En", context: "Reinhard von Lohengramm" },
      { code: "Jp", context: "ラインハルト・フォン・ローエングラム" },
    ],
    nick: [
      { code: "Kr", context: "라인하르트" },
      { code: "En", context: "Reinhard" },
      { code: "Jp", context: "ラインハルト" },
    ],
    searchKeys: [],
    birth: "SE|776.03.14",
    death: "SE|801.07.26",
    // — 성향
    faction: "REH",
    idea: "270",
    econ: "180",
    brave: "80",
    moral: "75",
    friend: "150",
    // — 능력치
    statCmd: 97,
    statCsm: 98,
    statAtt: 95,
    statDef: 91,
    statFst: 71,
    statMng: 57,
    statInf: 74,
    statGfg: 75,
    statAfg: 91,
    statPlt: 72,
    // — 기타
    loc: "230058P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "은하제국의 군사 천재. 누나 안네로제가 황제의 후궁으로 끌려간 것에 분노하여 제국의 정점을 향한 야망을 품는다.",
      },
      {
        code: "En",
        context:
          "Military genius of the Galactic Empire. Driven by rage over his sister Annerose being taken as the Emperor's concubine, he harbors ambitions to reach the pinnacle of the empire.",
      },
      {
        code: "Jp",
        context:
          "銀河帝国の軍事天才。姉アンネローゼが皇帝の後宮に召し上げられたことへの憤りを胸に、帝国の頂点へと野望を燃やす",
      },
    ],
    // — 직업
    // 함대사령관(JB_M001) LV0
    // 상급대장(JB_MR002) LV0
    // 백작(JB_N003) LV0
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000065",
    name: [
      { code: "Kr", context: "라자르 로보스" },
      { code: "En", context: "Lassalle Lobos" },
      { code: "Jp", context: "ラザール・ロボス" },
    ],
    nick: [
      { code: "Kr", context: "로보스" },
      { code: "En", context: "Lobos" },
      { code: "Jp", context: "ロボス" },
    ],
    searchKeys: [],
    birth: "SE|740.09.14",
    death: "SE|796.",
    // — 성향
    faction: "FPA", // 자유행성동맹
    idea: "100", // 자유민주공화국
    econ: "100", // 자본주의
    brave: "60", // 일반
    moral: "55",
    friend: "205",
    // — 능력치
    statCmd: 80,
    statCsm: 75,
    statAtt: 72,
    statDef: 80,
    statFst: 58,
    statMng: 55,
    statInf: 52,
    statGfg: 60,
    statAfg: 79,
    statPlt: 68,
    // — 기타
    loc: "230006P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "자유행성동맹 우주함대 총사령관. 앤드류 포크의 제국 침공 계획을 승인하고 원정군 최고사령관을 맡았으나, 보급 위기 속에서도 후퇴 명령을 거부하는 무능함을 드러냈다. 아무리트사 성전 참패의 최고 책임자.",
      },
      {
        code: "En",
        context:
          "Supreme Commander of the Free Planets Star Fleet. He approved Andrew Falk's invasion plan and assumed command of the expeditionary force, but proved incapable by refusing retreat orders even as the supply crisis deepened. He bears ultimate responsibility for the catastrophic defeat at the Battle of Amritsar.",
      },
      {
        code: "Jp",
        context:
          "自由惑星同盟宇宙艦隊総司令官。アンドリュー・フォークの帝国侵攻計画を承認し遠征軍最高司令官を務めたが、補給危機の中でも撤退命令を拒否する無能さを露呈した。アムリッツァ星域会戦大敗の最高責任者。",
      },
    ],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000066",
    name: [{ code: "Kr", context: "라첼" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000067",
    name: [{ code: "Kr", context: "라프트" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000068",
    name: [{ code: "Kr", context: "라프트(로젠리터)" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000069",
    name: [{ code: "Kr", context: "랄프 슈마허" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000070",
    name: [{ code: "Kr", context: "랄프 칼센" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000071",
    name: [{ code: "Kr", context: "람스도르프" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000072",
    name: [{ code: "Kr", context: "랑 호" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000073",
    name: [{ code: "Kr", context: "램지 워츠" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000074",
    name: [{ code: "Kr", context: "레머" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000075",
    name: [{ code: "Kr", context: "레오노라 폰 로이엔탈" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000076",
    name: [{ code: "Kr", context: "레오폴트 라프" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000077",
    name: [{ code: "Kr", context: "레오폴트 슈마허" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000078",
    name: [{ code: "Kr", context: "레온하르트 폰 골덴바움 1세" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000079",
    name: [{ code: "Kr", context: "레온하르트 폰 골덴바움 2세" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000080",
    name: [
      { code: "Kr", context: "레이몬도 토리아티" },
      { code: "En", context: "Raymond Tolliarty" },
      { code: "Jp", context: "レイモンド・トリアッティ" },
    ],
    nick: [
      { code: "Kr", context: "토리아티" },
      { code: "En", context: "Tolliarty" },
      { code: "Jp", context: "トリアッティ" },
    ],
    searchKeys: [
      "레이먼드",
      "레이몬도",
      "톨리아티",
      "토리아티",
      "Tolliarty",
      "Tolliati",
      "トリアッティ",
    ],
    birth: "",
    death: "",
    // — 성향
    faction: "FPA", // 자유행성동맹
    idea: "100", // 자유민주공화국
    econ: "100", // 자본주의
    brave: "45",
    moral: "30",
    // friend: 트류니히트(245) 파벌 정치가 — 가까운 거리(80%)
    friend: "215",
    // — 능력치
    statCmd: 8,
    statCsm: 42,
    statAtt: 3,
    statDef: 5,
    statFst: 5,
    statMng: 35,
    statInf: 55,
    statGfg: 2,
    statAfg: 3,
    statPlt: 50,
    // — 기타
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "（OVA 오리지널 등장인물) 트류니히트 파벌의 정치가. 테르누젠 보궐선거에 출마했다. 반전시민연합 선거본부 폭탄 테러로 상대 후보 제임스 손다이크가 사망하자, 뒤를 이어 출마한 제시카 에드워즈에게 밀려 낙선했다.",
      },
      {
        code: "En",
        context:
          "(OVA-original character) A politician of the Trünicht faction who ran in the Terneuzen by-election. After his original opponent James Sondheik was killed in a bombing of the anti-war citizens' coalition campaign office, he lost the race to Sondheik's replacement, Jessica Edwards.",
      },
      {
        code: "Jp",
        context:
          "（OVAオリジナルキャラクター）トリューニヒト派の政治家。テルヌーゼン補欠選挙に出馬した。反戦市民連合選挙事務所爆破テロで対立候補のジェームズ・ソーンダイクが死亡すると、その後を継いで出馬したジェシカ・エドワーズに敗れた。",
      },
    ],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000081",
    name: [{ code: "Kr", context: "렘라" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000082",
    name: [
      { code: "Kr", context: "로열 샌포드" },
      { code: "En", context: "Royal Sanford" },
      { code: "Jp", context: "ロイヤル・サンフォード" },
    ],
    nick: [
      { code: "Kr", context: "샌포드" },
      { code: "En", context: "Sanford" },
      { code: "Jp", context: "サンフォード" },
    ],
    searchKeys: ["로열", "로얄", "셴포드", "샌포드", "Sanford", "サンフォード"],
    birth: "SE|738.04.22",
    death: "SE|796.",
    // — 성향
    faction: "FPA", // 자유행성동맹
    idea: "100", // 자유민주공화국
    econ: "100", // 자본주의
    brave: "60", // 일반
    moral: "48",
    friend: "105",
    // — 능력치
    statCmd: 4,
    statCsm: 72,
    statAtt: 3,
    statDef: 5,
    statFst: 3,
    statMng: 78,
    statInf: 58,
    statGfg: 3,
    statAfg: 3,
    statPlt: 85,
    // — 기타
    loc: "230006P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "자유행성동맹 최고평의회 의장. 지지율 만회를 위해 제국령 침공 작전을 승인한 인물. 참담한 패전의 책임을 지고 내각 전원과 함께 사퇴했다.",
      },
      {
        code: "En",
        context:
          "Supreme Chairman of the Free Planets Alliance High Council. He approved the invasion of Imperial territory in a bid to reverse flagging approval ratings, and resigned along with the entire cabinet following the catastrophic defeat.",
      },
      {
        code: "Jp",
        context:
          "自由惑星同盟最高評議会議長。支持率挽回のために帝国領侵攻作戦を承認した人物。惨敗の責任を取り内閣全員とともに辞任した。",
      },
    ],
    // — 직업
    // 최고평의회의장(JB_F001) LV0
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000083",
    name: [{ code: "Kr", context: "로이슈너" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000084",
    name: [{ code: "Kr", context: "로이슈너(로젠리터)" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000085",
    name: [{ code: "Kr", context: "로자라인 폰 크로이처" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000086",
    name: [
      { code: "Kr", context: "로크웰" },
      { code: "En", context: "Rockwell" },
      { code: "Jp", context: "ロックウェル" },
    ],
    nick: [
      { code: "Kr", context: "로크웰" },
      { code: "En", context: "Rockwell" },
      { code: "Jp", context: "ロックウェル" },
    ],
    searchKeys: ["록웰", "로크웰", "Rockwell", "ロックウェル"],
    birth: "",
    death: "SE|799.",
    // — 성향
    faction: "FPA", // 자유행성동맹
    idea: "100", // 자유민주공화국
    econ: "100", // 자본주의
    brave: "40",
    moral: "15",
    friend: "268", // 트류니히트(245) 파벌 일원, 사문회 참여 — 가까운 거리(85%)
    // — 능력치
    statCmd: 5,
    statCsm: 35,
    statAtt: 2,
    statDef: 3,
    statFst: 2,
    statMng: 32,
    statInf: 58,
    statGfg: 2,
    statAfg: 2,
    statPlt: 48,
    // — 기타
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          '트류니히트 파벌의 일원으로 사문회에 사문위원 자격으로 참여했다. 마르 아데타 성역 회전 이후 자기보신을 위해 조안 레벨로를 살해하고 라인하르트를 찾아갔으나, "수치도 모르는 이족보행 하이에나" 취급을 받으며 처형당했다.',
      },
      {
        code: "En",
        context:
          'A member of the Trünicht faction who participated in the inquiry committee as an examiner. Following the Battle of Mar-Adetta, he murdered João Rebelo for his own self-preservation and sought out Reinhard von Lohengramm, but was branded a "shameless, two-legged hyena" and executed.',
      },
      {
        code: "Jp",
        context:
          "トリューニヒト派の一員として査問会に査問委員として参加した。マル・アデッタ星域会戦後、自己保身のためジョアン・レベロを殺害してラインハルトのもとを訪ねたが、「恥知らずな二足歩行のハイエナ」と一蹴され処刑された。",
      },
    ],
    // — 직업
    // — 트레잇
    // 이족보행 하이에나(TRC_U_000086)
  },
  {
    // — 기본
    code: "CH_000087",
    name: [{ code: "Kr", context: "롤프 오토 브라우히치" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000088",
    name: [{ code: "Kr", context: "루글랑주" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  // 루돌프 폰 골덴바움 Rudolf von Goldenbaum · ルドルフ・フォン・ゴールデンバウム
  {
    // — 기본
    code: "CH_000089",
    name: [{ code: "Kr", context: "루돌프 폰 골덴바움" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "SE|268.01.07", // 268 확실
    death: "SE|351", // 351 확실(83세)
    // — 성향
    faction: "REH",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [
      {
        code: "Kr",
        context: `루돌프 대제로 불리는 골덴바움조 은하제국을 건국한 초대 황제.
        은하연방의 군인 출신으로 이후 정치계에 입문하여 독재를 거쳐 제국을 건설한다.
        강철거인이라는 별명이 있을 정도로 위풍당당한 거구를 지녔으며, 풍채에 걸맞는 뛰어난 능력을 지녔다.`,
      },
    ],
    // — 직업
    // 황제
    //
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000090",
    name: [{ code: "Kr", context: "루이 마셴고" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000091",
    name: [{ code: "Kr", context: "루이 헤름" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000092",
    name: [{ code: "Kr", context: "루이시코프" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000093",
    name: [
      { code: "Kr", context: "루퍼트 케셀링크" },
      { code: "En", context: "Rupert Kesserling" },
      { code: "Jp", context: "ルパート・ケッセルリンク" },
    ],
    nick: [
      { code: "Kr", context: "케셀링크" },
      { code: "En", context: "Kesserling" },
      { code: "Jp", context: "ケッセルリンク" },
    ],
    searchKeys: [],
    birth: "SE|774.09.18",
    death: "SE|799.",
    // — 성향
    faction: "PZN", // 페잔 자치령
    idea: "150", // 귀족제
    econ: "220", // 국가자본주의
    brave: "45", // 냉정
    moral: "22",
    friend: "70",
    // — 능력치
    statCmd: 5,
    statCsm: 72,
    statAtt: 3,
    statDef: 5,
    statFst: 4,
    statMng: 78,
    statInf: 85,
    statGfg: 3,
    statAfg: 3,
    statPlt: 88,
    // — 기타
    loc: "230042P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "아드리안 루빈스키의 서자이자 비서. 아버지의 정치 음모를 실행하는 야심 찬 마키아벨리스트. 속으로는 루빈스키를 몰아내고 자치령주 자리를 차지하려 했으나, 루빈스키에게 발각되어 제국의 페잔 침공 당일 밤 살해당했다.",
      },
      {
        code: "En",
        context:
          "Illegitimate son and secretary of Adrian Rubinsky. A highly ambitious Machiavellian who executed his father's political schemes while secretly plotting to overthrow him and seize the position of Landesherr. His ambitions were fully known to Rubinsky, who had him killed on the night of the Imperial invasion of Fezzan.",
      },
      {
        code: "Jp",
        context:
          "アドリアン・ルビンスキーの庶子にして秘書。父の政治的陰謀を実行する野心的なマキャベリスト。内心ではルビンスキーを追い落とし自治領主の座を狙っていたが、ルビンスキーに看破され帝国のペザン侵攻当夜に殺害された。",
      },
    ],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000094",
    name: [{ code: "Kr", context: "룸프" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  // 르페브르 Lefebvre · ルフェーブル
  {
    // — 기본
    code: "CH_000574",
    name: [
      { code: "Kr", context: "르페브르" },
      { code: "En", context: "Lefebvre" },
      { code: "Jp", context: "ルフェーブル" },
    ],
    nick: [{ code: "Kr", context: "르페브르" }],
    searchKeys: ["루페브르"],
    birth: "",
    death: "SE|796.10.12",
    // — 성향
    faction: "FPA", // 자유행성동맹
    idea: "100", // 자유민주공화국
    econ: "100", // 시장경제
    brave: "60",
    moral: "75",
    friend: "170", // 145 양 245 트류니히트
    // — 능력치
    // 은하영웅전설 4 통솔74 / 운영23 / 정보52 / 기동64 / 공격81 / 방어73 / 육전67 / 공전86
    // 은하영웅전설 6 통솔 80/지휘 72/공격 70/방어 82/기동 64
    statCmd: 77,
    statCsm: 72,
    statAtt: 76,
    statDef: 78,
    statFst: 64,
    statMng: 23,
    statInf: 52,
    statGfg: 67,
    statAfg: 86,
    statPlt: 22,
    // — 기타
    loc: "230006P01", // 하이네센
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          `자유행성동맹군 중장.
          제3함대 사령관으로 동맹군 일선 제독 중 뷰코크 다음으로 고령의 노장이다.
          원숙한 용병술을 바탕으로 방어전에 특화된 우수한 지휘관으로 평가받는다.`,
          //  제국령 침공작전 도중 아우구스트 자무엘 바렌 함대의 공격을 받아 기함 쿠 쿨린이 소행성에 충돌하여 전사했다.
      },
    ],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000095",
    name: [{ code: "Kr", context: "리방와" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000096",
    name: [{ code: "Kr", context: "리스너" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000097",
    name: [{ code: "Kr", context: "리첼" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000098",
    name: [{ code: "Kr", context: "리하르트 폰 골덴바움 1세" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000099",
    name: [{ code: "Kr", context: "리하르트 폰 골덴바움 2세" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000100",
    name: [{ code: "Kr", context: "리하르트 폰 골덴바움 3세" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000101",
    name: [{ code: "Kr", context: "리하르트 폰 그림멜스하우젠" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000102",
    name: [
      { code: "Kr", context: "오이겐 리처" },
      { code: "En", context: "Eugen Richter" },
      { code: "Jp", context: "オイゲン・リヒター" },
    ],
    nick: [
      { code: "Kr", context: "리처" },
      { code: "En", context: "Richter" },
      { code: "Jp", context: "リヒター" },
    ],
    searchKeys: [],
    birth: "SE|750.04.22",
    death: "",
    // — 성향
    faction: "REH", // 은하제국
    idea: "240", // 전제군주제
    econ: "140", // 혼합경제
    brave: "25", // 신중
    moral: "62",
    friend: "112",
    // — 능력치
    statCmd: 3,
    statCsm: 60,
    statAtt: 2,
    statDef: 4,
    statFst: 2,
    statMng: 80,
    statInf: 68,
    statGfg: 2,
    statAfg: 2,
    statPlt: 72,
    // — 기타
    loc: "230058P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "겔라흐의 후임 제국 재무장관. 골덴바움 왕조 붕괴 후 로엔그람 체제에서 재무장관직을 이어받았다.",
      },
      {
        code: "En",
        context:
          "Imperial Minister of Finance, succeeding Gerlach after the fall of the Goldenbaum Dynasty under the Lohengramm administration.",
      },
      {
        code: "Jp",
        context:
          "ゲルラッハの後任の帝国財務尚書。ゴールデンバウム王朝崩壊後、ローエングラム体制で財務尚書職を引き継いだ。",
      },
    ],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000103",
    name: [{ code: "Kr", context: "링 파오" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000104",
    name: [{ code: "Kr", context: "마누엘 후안 파트리시오" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000105",
    name: [{ code: "Kr", context: "마렌치오" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000106",
    name: [{ code: "Kr", context: "마론" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000107",
    name: [{ code: "Kr", context: "마르가르테 폰 헤르크스하이머" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000108",
    name: [{ code: "Kr", context: "마르비히" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000109",
    name: [{ code: "Kr", context: "마르크그라프" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000110",
    name: [{ code: "Kr", context: "마르틴 부크홀츠" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000111",
    name: [{ code: "Kr", context: "마르틴 오토 폰 지크마이스터" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000112",
    name: [{ code: "Kr", context: "마리네스크" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000113",
    name: [{ code: "Kr", context: "마리네티" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000114",
    name: [{ code: "Kr", context: "마리넨스크" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000115",
    name: [{ code: "Kr", context: "마리노" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000116",
    name: [{ code: "Kr", context: "마리카 폰 포이에르바흐" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000117",
    name: [{ code: "Kr", context: "마스카니" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000118",
    name: [{ code: "Kr", context: "마이어호펜" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000119",
    name: [{ code: "Kr", context: "마이포허" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000120",
    name: [{ code: "Kr", context: "마인호프" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000121",
    name: [{ code: "Kr", context: "마인홉프" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000122",
    name: [{ code: "Kr", context: "마크달레나 폰 베스트팔레" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000123",
    name: [{ code: "Kr", context: "마테오" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000124",
    name: [{ code: "Kr", context: "마트하프" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000125",
    name: [{ code: "Kr", context: "막시밀리안 요제프 폰 골덴바움 1세" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000126",
    name: [{ code: "Kr", context: "막시밀리안 요제프 폰 골덴바움 2세" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000127",
    name: [{ code: "Kr", context: "막시밀리안 폰 카스트로프" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000128",
    name: [{ code: "Kr", context: "만프레트 폰 골덴바움 1세" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000129",
    name: [{ code: "Kr", context: "만프레트 폰 골덴바움 2세" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  // 말콤 와이드본 Malcolm Wideborn · マルコム・ワイドボーン
  {
    // — 기본
    code: "CH_000130",
    name: [{ code: "Kr", context: "말콤 와이드본" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "SE|767.03.10",
    death: "SE|794.11.06",
    // — 성향
    faction: "FPA",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [
      {
        code: "Kr",
        context: `자유행성동맹 소속의 군인. 10년만에 나온 수재라는 평을 듣고 있으며, `,
      },
    ],
    // — 직업
    // 대령
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000131",
    name: [{ code: "Kr", context: "매튜슨" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000132",
    name: [{ code: "Kr", context: "메이어" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000133",
    name: [{ code: "Kr", context: "모르간" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000134",
    name: [{ code: "Kr", context: "모르트" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000135",
    name: [{ code: "Kr", context: "모리츠 폰 하제" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000136",
    name: [{ code: "Kr", context: "몬타크" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000137",
    name: [{ code: "Kr", context: "몽샤르망" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000138",
    name: [{ code: "Kr", context: "무라이" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  // 무어 Moore · ムーア
  {
    // — 기본
    code: "CH_000139",
    name: [
      { code: "Kr", context: "무어" },
      { code: "En", context: "Moore" },
      { code: "Jp", context: "ムーア" },
    ],
    nick: [
      { code: "Kr", context: "무어" },
      { code: "En", context: "Moore" },
      { code: "Jp", context: "ムーア" },
    ],
    searchKeys: [],
    birth: "",
    death: "SE|796.02.11",
    // — 성향
    faction: "FPA",
    idea: "100", // 통제 자유경제 선호하는 것으로
    econ: "140", // 살아있었으면 아마 구국군사회의 참가했을 것으로 보임
    brave: "80", // 용맹 좀 더 높게
    moral: "65", // 더 낮게
    friend: "120", // 양웬리와는 극상성의 성격으로 보임.
    // — 능력치
    statCmd: 68,
    statCsm: 62,
    statAtt: 78,
    statDef: 48,
    statFst: 70,
    statMng: 38,
    statInf: 42,
    statGfg: 65,
    statAfg: 75,
    statPlt: 30,
    // — 기타
    loc: "230006P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "자유행성동맹 소속의 사령관. 호탕하고 거친 성격으로 유명하다.\n    참모의 조언을 무시하는 독단적 성격도 있지만, 엄격한 군율을 세우는데 능해 뛰어난 사령관 중 하나로 평가받고 있다.",
      },
    ],
    // — 직업
    // 함대사령관(JB_M001) LV0
    // 중장(JB_MR004) LV0
    // — 트레잇
    // 독불장군(TRC_U_000139) LV0
    // 독선(TRC_G_004) LV0
    // 엄격한 군율(TRC_G_005) LV0
  },
  {
    // — 기본
    code: "CH_000140",
    name: [{ code: "Kr", context: "문가이" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000141",
    name: [{ code: "Kr", context: "미리암 로자스" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000142",
    name: [{ code: "Kr", context: "미셸 슈프란" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000143",
    name: [{ code: "Kr", context: "미첼 슈마허" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000144",
    name: [{ code: "Kr", context: "미하엘 지기스문트 폰 카이저링" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000145",
    name: [{ code: "Kr", context: "미하일로프" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000146",
    name: [{ code: "Kr", context: "바겐자일" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000147",
    name: [{ code: "Kr", context: "바그너" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000148",
    name: [
      { code: "Kr", context: "바그다쉬" },
      { code: "En", context: "Baghdash" },
      { code: "Jp", context: "バグダッシュ" },
    ],
    nick: [
      { code: "Kr", context: "바그다쉬" },
      { code: "En", context: "Baghdash" },
      { code: "Jp", context: "バグダッシュ" },
    ],
    searchKeys: [],
    birth: "SE|762.08.17",
    death: "",
    // — 성향
    faction: "FPA", // 자유행성동맹
    idea: "35", // 인민공화국
    econ: "100", // 시장경제
    brave: "70",
    moral: "55",
    friend: "100",
    // — 능력치
    statCmd: 52,
    statCsm: 60,
    statAtt: 48,
    statDef: 55,
    statFst: 58,
    statMng: 65,
    statInf: 90,
    statGfg: 45,
    statAfg: 50,
    statPlt: 68,
    // — 기타
    loc: "230006P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "동맹 정보부 출신 장교. 국가구제군 쿠데타에 가담했다가 양 웬리의 설득으로 귀순하여 쿠데타의 제국 배후를 폭로하는 방송을 감행했다. 이후 양 함대의 정보장교로 활동하며 이젤론 탈환 작전에도 참여했다.",
      },
      {
        code: "En",
        context:
          "A former Alliance intelligence officer who participated in the National Salvation Military Council coup, then defected to Yang Wen-li's side and made a public broadcast exposing the Empire's covert involvement behind the coup. He subsequently served as an intelligence officer for Yang's fleet, including the operation to retake Iserlohn.",
      },
      {
        code: "Jp",
        context:
          "同盟情報部出身の将校。国家救済軍クーデターに加担した後、ヤン・ウェンリーの説得で帰順し、クーデターの帝国関与を暴露する放送を敢行した。以後ヤン艦隊の情報将校として活動し、イゼルローン奪還作戦にも参加した。",
      },
    ],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000149",
    name: [{ code: "Kr", context: "바렌코프" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000150",
    name: [{ code: "Kr", context: "바르텐베르크" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000151",
    name: [{ code: "Kr", context: "바운즈골" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000152",
    name: [{ code: "Kr", context: "바이츠" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000153",
    name: [{ code: "Kr", context: "발둥" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000154",
    name: [{ code: "Kr", context: "발레리 린 피츠시몬즈" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000155",
    name: [{ code: "Kr", context: "발렌타인 카우프" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000156",
    name: [
      { code: "Kr", context: "발터 폰 쇤코프" },
      { code: "En", context: "Walter von Schönkopf" },
      { code: "Jp", context: "ワルター・フォン・シェーンコップ" },
    ],
    nick: [
      { code: "Kr", context: "쇤코프" },
      { code: "En", context: "Schönkopf" },
      { code: "Jp", context: "シェーンコップ" },
    ],
    searchKeys: [],
    birth: "SE|765.07.28",
    death: "SE|801.06.01",
    // — 성향
    faction: "FPA", // 자유행성동맹
    idea: "100", // 자유민주공화국
    econ: "100", // 시장경제
    brave: "80",
    moral: "72",
    friend: "155",
    // — 능력치
    statCmd: 38,
    statCsm: 75,
    statAtt: 30,
    statDef: 37,
    statFst: 20,
    statMng: 15,
    statInf: 50,
    statGfg: 100,
    statAfg: 60,
    statPlt: 20,
    // — 기타
    loc: "230006P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "로젠리터 연대장. 제국 귀족 출신 망명자 집단인 로젠리터를 이끄는 동맹 최강의 육전 전문가. 뛰어난 검술과 육탄전 능력으로 이젤론 요새 점령을 비롯한 수많은 작전의 핵심을 담당했다. 바람둥이로 유명하며 카테로제 폰 크로이처의 생부다.",
      },
      {
        code: "En",
        context:
          "Commander of the Rosen Ritter. The Alliance's foremost ground warfare specialist, leading a regiment of Imperial exile descendants. His exceptional swordsmanship and close-combat ability made him the linchpin of numerous operations including the capture of Iserlohn Fortress. Notorious as a womaniser, he is the biological father of Katerose von Kreutzer.",
      },
      {
        code: "Jp",
        context:
          "ローゼンリッター連隊長。帝国貴族出身の亡命者集団ローゼンリッターを率いる同盟最強の陸戦専門家。優れた剣術と格闘能力でイゼルローン要塞占領をはじめ数多くの作戦の中核を担った。プレイボーイとして有名で、カーテローゼ・フォン・クロイツェルの実父である。",
      },
    ],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000157",
    name: [{ code: "Kr", context: "버나비 코스테아" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000158",
    name: [{ code: "Kr", context: "베르너 알트린겐" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000159",
    name: [{ code: "Kr", context: "베른하르트 슈나이더" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000160",
    name: [{ code: "Kr", context: "베른하임" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000161",
    name: [{ code: "Kr", context: "베스트팔레" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000162",
    name: [{ code: "Kr", context: "베이" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "290",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000163",
    name: [{ code: "Kr", context: "베크만" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000164",
    name: [{ code: "Kr", context: "벤첸 폰 하셀바크" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000165",
    name: [{ code: "Kr", context: "보네" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "268",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000166",
    name: [{ code: "Kr", context: "보든" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000167",
    name: [{ code: "Kr", context: "보라이넨" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000168",
    name: [{ code: "Kr", context: "보렌" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000169",
    name: [{ code: "Kr", context: "보로딘" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000170",
    name: [{ code: "Kr", context: "보리스 코네프" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000171",
    name: [{ code: "Kr", context: "보우멜" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000172",
    name: [{ code: "Kr", context: "볼리" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000173",
    name: [
      { code: "Kr", context: "볼프강 미터마이어" },
      { code: "En", context: "Wolfgang Mittermeyer" },
      { code: "Jp", context: "ウォルフガング・ミッターマイヤー" },
    ],
    nick: [
      { code: "Kr", context: "미터마이어" },
      { code: "En", context: "Mittermeyer" },
      { code: "Jp", context: "ミッターマイヤー" },
    ],
    searchKeys: [],
    birth: "SE|768.08.30",
    // — 성향
    faction: "REH",
    idea: "240",
    econ: "140",
    brave: "80",
    moral: "90",
    friend: "180",
    // — 능력치
    statCmd: 94,
    statCsm: 88,
    statAtt: 92,
    statDef: 80,
    statFst: 97,
    statMng: 72,
    statInf: 65,
    statGfg: 78,
    statAfg: 85,
    statPlt: 70,
    // — 기타
    loc: "230058P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "라인하르트 폰 뮤젤 휘하 제국군 최강의 제독 중 한 명. '질풍 늑대'라는 별명처럼 압도적인 기동력으로 전장을 누비며, 로이엔탈과 함께 '쌍벽'으로 불린다. 평민 출신으로 귀족 사회의 부조리에 맞서는 강직한 도덕관념을 지녔다.",
      },
      {
        code: "En",
        context:
          'One of the most formidable admirals under Reinhard von Lohengramm. Known as the "Gale Wolf" for his overwhelming speed and mobility in battle, he forms the "Twin Pillars" together with Reuenthal. A man of strong moral conviction, he stands firm against the corruption of the Imperial aristocracy despite his commoner birth.',
      },
      {
        code: "Jp",
        context:
          "ラインハルト・フォン・ミューゼル麾下の帝国軍最強の提督の一人。「疾風ウォルフ」の異名通り、圧倒的な機動力で戦場を席巻し、ロイエンタールとともに「双璧」と称される。平民出身ながら貴族社会の理不尽に真っ向から立ち向かう、強固な道徳観念の持ち主。",
      },
    ],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000174",
    name: [
      { code: "Kr", context: "부시아스 아둘라" },
      { code: "En", context: "Busias Adoula" },
    ],
    nick: [{ code: "Kr", context: "아둘라" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000175",
    name: [{ code: "Kr", context: "부크스테퓌데" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000176",
    name: [{ code: "Kr", context: "뷔르거" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000177",
    name: [{ code: "Kr", context: "뷰링그" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000178",
    name: [{ code: "Kr", context: "뷰젠휘터" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000179",
    name: [{ code: "Kr", context: "뷰트네" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000180",
    name: [{ code: "Kr", context: "뷰포트" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000181",
    name: [{ code: "Kr", context: "브래드조" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000182",
    name: [{ code: "Kr", context: "브레첼리" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000183",
    name: [{ code: "Kr", context: "브레츠엘리" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000184",
    name: [{ code: "Kr", context: "브렌타노" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000185",
    name: [{ code: "Kr", context: "브론즈" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000186",
    name: [{ code: "Kr", context: "브루노 폰 질버베르히" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  // 브루노 폰 크납슈타인 Bruno von Knappstein[DVD판]/Bruno von Knapfstein[LD판]
  // ブルーノ・フォン・クナップシュタイン
  {
    // — 기본
    code: "CH_000187",
    name: [{ code: "Kr", context: "브루노 폰 크납슈타인" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000188",
    name: [{ code: "Kr", context: "브루스 애쉬비" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  // 브룩도르프 Bruckdorf[DVD판]/Bruckdolf[LD판] · ブルックドルフ
  {
    // — 기본
    code: "CH_000189",
    name: [{ code: "Kr", context: "브룩도르프" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: ["부룩도르프"],
    birth: "SE|759",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000190",
    name: [{ code: "Kr", context: "비네티" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000191",
    name: [{ code: "Kr", context: "비로라이넨" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000192",
    name: [{ code: "Kr", context: "비올라" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000193",
    name: [{ code: "Kr", context: "비츠" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000194",
    name: [{ code: "Kr", context: "비토리오 디 베르티니" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  // 빌리바르트 요아힘 폰 메르카츠 WilIibard Joachim von Merkatz · ウィリバルト・ヨアヒム・フォン・メルカッツ
  {
    // — 기본
    code: "CH_000195",
    name: [
      { code: "Kr", context: "빌리바르트 요아힘 폰 메르카츠" },
      { code: "En", context: "WilIibard Joachim von Merkatz" },
      { code: "Jp", context: "ウィリバルト・ヨアヒム・フォン・メルカッツ" },
    ],
    nick: [
      { code: "Kr", context: "메르카츠" },
      { code: "En", context: "Merkatz" },
      { code: "Jp", context: "メルカッツ" },
    ],
    searchKeys: [],
    birth: "SE|738.04.28",
    death: "SE|801.06.01",
    // — 성향
    faction: "REH",
    idea: "230", // 매우 강력한 군주제 지지
    econ: "180",
    brave: "45", //
    moral: "90",
    friend: "130",
    // — 능력치
    statCmd: 88,
    statCsm: 75,
    statAtt: 82,
    statDef: 90,
    statFst: 68,
    statMng: 78,
    statInf: 72,
    statGfg: 78,
    statAfg: 85,
    statPlt: 55,
    // — 기타
    loc: "230058P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "은하제국이 자랑하는 노련한 명장.\n    말단 하급 귀족 출신이지만, 수십 년의 실전 경험을 보유한 뛰어난 지휘관으로, 견실하고 허점없이 합리적인 군사운용으로 유명하다.\n    다만, 고지식하고 융통성이 없는 성격 탓에 정치나 모략에는 서툰 편.",
      },
    ],
    // — 직업
    // 함대사령관(JB_M001) LV0
    // 상급대장(JB_MR002) LV0
    // — 트레잇
    // 노장의 진수(TRC_U_000195) LV0
  },
  {
    // — 기본
    code: "CH_000196",
    name: [{ code: "Kr", context: "빌헬름 폰 골덴바움 1세" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000197",
    name: [{ code: "Kr", context: "빌헬름 폰 골덴바움 2세" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000198",
    name: [
      { code: "Kr", context: "빌헬름 폰 리텐하임" },
      { code: "En", context: "Wilhelm von Littenheim" },
      { code: "Jp", context: "ウィルヘルム・フォン・リッテンハイム" },
    ],
    nick: [
      { code: "Kr", context: "리텐하임" },
      { code: "En", context: "Littenheim" },
      { code: "Jp", context: "リッテンハイム" },
    ],
    searchKeys: [],
    birth: "SE|747.11.08",
    death: "SE|797.07.",
    // — 성향
    faction: "REH", // 은하제국
    idea: "290", // 신성군주제
    econ: "180", // 국가자본주의
    brave: "25", // 신중
    moral: "38",
    // friend: 라인하르트(150)와 원형(0~299) 순환거리 110차(상극) / 브라운슈바이크(40)와는 80차(불편함, 같은 진영이라 약간 가깝게)
    friend: "260",
    // — 능력치
    statCmd: 25,
    statCsm: 72,
    statAtt: 22,
    statDef: 28,
    statFst: 20,
    statMng: 48,
    statInf: 42,
    statGfg: 18,
    statAfg: 22,
    statPlt: 78,
    // — 기타
    loc: "230058P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "골덴바움 왕조 최대 문벌귀족 후작. 황제 프리드리히 4세의 사위로 딸 사비네의 황위 계승을 획책하며 브라운슈바이크와 함께 립슈타트 동맹을 이끌었다. 실질적인 군사적 재능이 없어 키르히아이스에게 패배하고 부하의 자폭 테러로 사망했다.",
      },
      {
        code: "En",
        context:
          "An Imperial Marquis and son-in-law of Kaiser Friedrich IV, he co-led the Lippstadt Alliance alongside Duke Braunschweig in an attempt to place his daughter Sabine on the throne. Lacking any real martial talent, he was defeated by Siegfried Kircheis and was killed by a suicide attack from one of his own resentful subordinates.",
      },
      {
        code: "Jp",
        context:
          "ゴールデンバウム王朝の有力門閥貴族侯爵。皇帝フリードリヒ4世の義息子で、娘ザービネの皇位継承を目指しブラウンシュヴァイクとともにリップシュタット同盟を率いた。実質的な軍事的才能を持たずキルヒアイスに敗北し、部下の自爆テロで死亡した。",
      },
    ],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000199",
    name: [
      { code: "Kr", context: "빌헬름 폰 뮈켄베르거" },
      { code: "En", context: "Wilhelm von Muckenburger" },
      { code: "Jp", context: "ヴィルヘルム・フォン・ミュッケンベルガー" },
    ],
    nick: [
      { code: "Kr", context: "W.뮈켄베르거" },
      { code: "En", context: "W.Muckenburger" },
      { code: "Jp", context: "W.ミュッケンベルガー" },
    ],
    searchKeys: [],
    birth: "SE|705.04.12",
    death: "SE|770.",
    // — 성향
    faction: "REH", // 은하제국
    idea: "270", // 전제군주제
    econ: "140", // 혼합경제
    brave: "60", // 일반
    moral: "68",
    friend: "110",
    // — 능력치
    statCmd: 55,
    statCsm: 60,
    statAtt: 42,
    statDef: 48,
    statFst: 38,
    statMng: 45,
    statInf: 40,
    statGfg: 35,
    statAfg: 38,
    statPlt: 62,
    // — 기타
    loc: "230058P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "그레고르 폰 뮈켄베르거의 부친. 작중 이미 사망한 인물로 직접 등장하지 않는다.",
      },
      {
        code: "En",
        context:
          "Father of Gregor von Mückenberger. Deceased prior to the events of the story and does not appear directly.",
      },
      {
        code: "Jp",
        context:
          "グレゴール・フォン・ミュッケンベルガーの父。作中ではすでに死亡しており、直接登場しない。",
      },
    ],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000200",
    name: [{ code: "Kr", context: "빌헬름 폰 클롭슈톡" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000201",
    name: [{ code: "Kr", context: "빌헬미" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000202",
    name: [
      { code: "Kr", context: "사비네 폰 리텐하임" },
      { code: "En", context: "Sabine von Littenheim" },
      { code: "Jp", context: "ザービネ・フォン・リッテンハイム" },
    ],
    nick: [
      { code: "Kr", context: "사비네" },
      { code: "En", context: "Sabine" },
      { code: "Jp", context: "ザービネ" },
    ],
    searchKeys: [],
    birth: "SE|782.04.08",
    death: "",
    // — 성향
    faction: "REH", // 은하제국
    idea: "270", // 전제군주제
    econ: "140", // 혼합경제
    brave: "58", // 일반
    moral: "62",
    friend: "115",
    // — 능력치
    statCmd: 2,
    statCsm: 65,
    statAtt: 2,
    statDef: 3,
    statFst: 2,
    statMng: 30,
    statInf: 38,
    statGfg: 2,
    statAfg: 2,
    statPlt: 42,
    // — 기타
    loc: "230058P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "빌헬름 폰 리텐하임의 딸. 796년 황위 계승 후보로 내세워졌으나 에르빈 요제프 2세에게 황위를 빼앗겼다. 립슈타트 내전 이후 행방 불명.",
      },
      {
        code: "En",
        context:
          "Daughter of Marquis Wilhelm von Littenheim. Put forward as a claimant to the throne after Kaiser Friedrich IV's death but passed over in favour of Erwin Josef II. Her fate following the Lippstadt Rebellion is unknown.",
      },
      {
        code: "Jp",
        context:
          "ヴィルヘルム・フォン・リッテンハイムの娘。フリードリヒ4世崩御後に皇位継承候補として擁立されたがエルウィン・ヨーゼフ2世に皇位を奪われた。リップシュタット内乱後は行方不明。",
      },
    ],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000203",
    name: [{ code: "Kr", context: "산도르 아랄콘" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000204",
    name: [{ code: "Kr", context: "살레 아지스 셰이클리" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000205",
    name: [{ code: "Kr", context: "색스" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000206",
    name: [{ code: "Kr", context: "샤논" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000207",
    name: [{ code: "Kr", context: "샤를로트 필리스 카젤느" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000208",
    name: [{ code: "Kr", context: "샤미쇼" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000209",
    name: [{ code: "Kr", context: "샤이드" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000210",
    name: [{ code: "Kr", context: "샤토르프" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000211",
    name: [{ code: "Kr", context: "샤톨프" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000212",
    name: [{ code: "Kr", context: "샤헨" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000213",
    name: [{ code: "Kr", context: "샨파크" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000214",
    name: [{ code: "Kr", context: "세바스티안 폰 뮈젤" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000215",
    name: [{ code: "Kr", context: "순 수울즈콰리터" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000216",
    name: [{ code: "Kr", context: "쉴러" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000217",
    name: [{ code: "Kr", context: "슈라이어" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000218",
    name: [{ code: "Kr", context: "슈리터" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000219",
    name: [{ code: "Kr", context: "슈무데" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000220",
    name: [{ code: "Kr", context: "슈미트" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000221",
    name: [{ code: "Kr", context: "슈미트린" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000222",
    name: [{ code: "Kr", context: "슈바메르" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  // 슈타덴 Staaden ・ シュターデン
  {
    // — 기본
    code: "CH_000223",
    name: [
      { code: "Kr", context: "슈타덴" },
      { code: "En", context: "Staden" },
      { code: "Jp", context: "シュターデン" },
    ],
    nick: [
      { code: "Kr", context: "슈타덴" },
      { code: "En", context: "Staden" },
      { code: "Jp", context: "シュターデン" },
    ],
    searchKeys: [],
    birth: "SE|751.03.18",
    death: "SE|802.05.29",
    // — 성향
    faction: "REH",
    idea: "230",
    econ: "60",
    brave: "25",
    moral: "50",
    friend: "95",
    // — 능력치
    statCmd: 81,
    statCsm: 49,
    statAtt: 72,
    statDef: 68,
    statFst: 43,
    statMng: 84,
    statInf: 51,
    statGfg: 52,
    statAfg: 68,
    statPlt: 28,
    // — 기타
    loc: "230058P01",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // 함대사령관(JB_M001) LV0
    // 중장(JB_MR004) LV0
    // 남작(JB_N005) LV0
    // — 트레잇
    // 이론무쌍(TRC_U_000223) LV0
    // 현실부정(TRC_G_001) LV0
    // 위경련(TRC_S_001) LV0
  },
  {
    // — 기본
    code: "CH_000224",
    name: [
      { code: "Kr", context: "슈타인호프" },
      { code: "En", context: "Steinhof" },
      { code: "Jp", context: "シュタインホフ" },
    ],
    nick: [
      { code: "Kr", context: "슈타인호프" },
      { code: "En", context: "Steinhof" },
      { code: "Jp", context: "シュタインホフ" },
    ],
    searchKeys: [],
    birth: "SE|728.09.24",
    death: "",
    // — 성향
    faction: "REH", // 은하제국
    idea: "270", // 전제군주제
    econ: "140", // 혼합경제
    brave: "60", // 일반
    moral: "68",
    friend: "112",
    // — 능력치
    statCmd: 58,
    statCsm: 70,
    statAtt: 43,
    statDef: 47,
    statFst: 43,
    statMng: 93,
    statInf: 90,
    statGfg: 38,
    statAfg: 42,
    statPlt: 85,
    // — 기타
    loc: "230058P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "프리드리히 4세 치하 제국군 3장관 중 통수본부총장. 군사 행정에 특화된 관료형 장성으로, 립슈타트 반란 이후 강제 퇴역하였다.",
      },
      {
        code: "En",
        context:
          "Chief of the Supreme Command Headquarters and one of the three Imperial military chiefs of staff under Kaiser Friedrich IV. A bureaucratic general specialising in military administration, he was forced into retirement following the Lippstadt Rebellion.",
      },
      {
        code: "Jp",
        context:
          "フリードリヒ4世治下の帝国軍三長官の一人、統帥本部総長。軍事行政に特化した官僚型将帥で、リップシュタット叛乱後に強制退役した。",
      },
    ],
    // — 직업
    // 통수본부총장(JB_R007) LV0
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000225",
    name: [{ code: "Kr", context: "슈타펜 폰 바르트바펠" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000226",
    name: [{ code: "Kr", context: "슐리터" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000227",
    name: [{ code: "Kr", context: "슐츠" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000228",
    name: [{ code: "Kr", context: "슘무데" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000229",
    name: [{ code: "Kr", context: "스퍼리어" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  // 시드니 시톨레   Sidney Sitolet[소설]/Sidney Sithole[LD판] シドニー・シトレ
  {
    // — 기본
    code: "CH_000230",
    name: [
      { code: "Kr", context: "시드니 시톨레" },
      { code: "En", context: "Sidney Sithole" },
      { code: "Jp", context: "シドニー・シトレ" },
    ],
    nick: [
      { code: "Kr", context: "시톨레" },
      { code: "En", context: "Sithole" },
      { code: "Jp", context: "シトレ" },
    ],
    searchKeys: ["시틀레이", "시토레", "Sitolet"],
    birth: "SE|737.07.23", // 737년 확실
    death: "",
    // — 성향
    faction: "FPA", // 자유행성동맹
    idea: "100", // 자유민주공화국
    econ: "100", // 시장경제
    brave: "78",
    moral: "85",
    friend: "155",
    // — 능력치
    statCmd: 82,
    statCsm: 80,
    statAtt: 70,
    statDef: 75,
    statFst: 65,
    statMng: 88,
    statInf: 85,
    statGfg: 68,
    statAfg: 72,
    statPlt: 82,
    // — 기타
    loc: "230006P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "자유행성동맹 통합작전본부장. 제5차 이젤론 공방전에서 '평행추격' 전술로 이젤론 요새에 가장 근접했던 제독이자 양 웬리의 후원자. 정치적 압력과 군 내부의 모순 속에서도 원칙을 지키며 양 웬리를 지원했다.",
      },
    ],
    // — 직업
    // 통합작전본부장
    // 원수
    // 시민
    // — 트레잇
    //
  },
  {
    // — 기본
    code: "CH_000231",
    name: [
      { code: "Kr", context: "싱클레어 셀레브레제" },
      { code: "En", context: "Sinclair Cerebrese" },
    ],
    nick: [{ code: "Kr", context: "셀레브레제" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000232",
    name: [{ code: "Kr", context: "아놀드 F. 버지" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  // 아달베르트 폰 파렌하이트 Adalbert von Fahrenheit ·アーダルベルト・フォン・ファーレンハイト
  {
    // — 기본
    code: "CH_000233",
    name: [
      { code: "Kr", context: "아달베르트 폰 파렌하이트" },
      { code: "En", context: "Adalbert von Fahrenheit" },
      { code: "Jp", context: "アーダルベルト・フォン・ファーレンハイト" },
    ],
    nick: [
      { code: "Kr", context: "파렌하이트" },
      { code: "En", context: "Fahrenheit" },
      { code: "Jp", context: "ファーレンハイト" },
    ],
    searchKeys: [],
    birth: "SE|765",
    death: "SE|800.04.30",
    // — 성향
    faction: "REH",
    idea: "260",
    econ: "180",
    brave: "90",
    moral: "70",
    friend: "130",
    // — 능력치
    statCmd: 80,
    statCsm: 72,
    statAtt: 88,
    statDef: 72,
    statFst: 85,
    statMng: 58,
    statInf: 60,
    statGfg: 72,
    statAfg: 88,
    statPlt: 42,
    // — 기타
    loc: "230058P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "가난한 하급 귀족 출신이나 무수한 실전에서 화려한 공적을 쌓아 31세에 소장이 된 장성.",
      },
    ],
    // — 직업
    // 함대사령관(JB_M001) LV0
    // 대장(JB_MR003) LV0
    // — 트레잇
    // 돌격본능(TRC_U_000233) LV0
  },
  {
    // — 기본
    code: "CH_000234",
    name: [
      { code: "Kr", context: "아드리안 루빈스키" },
      { code: "En", context: "Adrian Rubinsky" },
      { code: "Jp", context: "アドリアン・ルビンスキー" },
    ],
    nick: [
      { code: "Kr", context: "루빈스키" },
      { code: "En", context: "Rubinsky" },
      { code: "Jp", context: "ルビンスキー" },
    ],
    searchKeys: [],
    birth: "SE|745.07.19",
    death: "SE|800.",
    // — 성향
    faction: "PZN", // 페잔 자치령
    idea: "150", // 귀족제
    econ: "220", // 국가자본주의
    brave: "45", // 냉정
    moral: "30",
    friend: "80",
    // — 능력치
    statCmd: 10,
    statCsm: 88,
    statAtt: 5,
    statDef: 8,
    statFst: 5,
    statMng: 95,
    statInf: 92,
    statGfg: 5,
    statAfg: 5,
    statPlt: 98,
    // — 기타
    loc: "230042P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "페잔 자치령의 제5대 자치령주. '페잔의 흑여우'라 불리는 책략가로 제국과 동맹 양쪽을 조종하며 페잔의 금융 지배를 꿈꿨다. 지구교와도 깊이 연루되어 있으며 은하 정치의 막후 실력자.",
      },
      {
        code: "En",
        context:
          'The fifth Landesherr of the Dominion of Fezzan, nicknamed the "Black Fox of Fezzan." A consummate schemer who manipulated both the Empire and the Alliance while dreaming of Fezzan\'s financial domination of the galaxy. Deeply entangled with the Terraist Church, he was the shadow power behind galactic politics.',
      },
      {
        code: "Jp",
        context:
          "ペザン自治領第5代自治領主。「ペザンの黒狐」と称される策謀家で、帝国と同盟の両方を操りながらペザンの金融支配を夢見た。地球教とも深く関わり、銀河政治の黒幕的存在。",
      },
    ],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000235",
    name: [{ code: "Kr", context: "아르투르 폰 슈트라이트" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000236",
    name: [{ code: "Kr", context: "아멜리에 폰 브라운슈바이크" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000237",
    name: [{ code: "Kr", context: "아벤 토르토" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000238",
    name: [{ code: "Kr", context: "아벤트 폰 클라인겔트" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000239",
    name: [{ code: "Kr", context: "아사도라 샤르티앙" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000240",
    name: [{ code: "Kr", context: "아서 린치" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000241",
    name: [
      { code: "Kr", context: "아우구스트 자무엘 바렌" },
      { code: "En", context: "August Samuel Wahlen" },
      { code: "Jp", context: "アウグスト・ザムエル・ワーレン" },
    ],
    nick: [
      { code: "Kr", context: "바렌" },
      { code: "En", context: "Wahlen" },
      { code: "Jp", context: "ワーレン" },
    ],
    searchKeys: [],
    birth: "SE|767.06.14",
    death: "",
    // — 성향
    faction: "REH", // 은하제국
    idea: "240", // 전제군주제
    econ: "140", // 혼합경제
    brave: "85",
    moral: "83",
    friend: "148",
    // — 능력치
    statCmd: 83,
    statCsm: 80,
    statAtt: 82,
    statDef: 78,
    statFst: 80,
    statMng: 72,
    statInf: 68,
    statGfg: 78,
    statAfg: 80,
    statPlt: 72,
    // — 기타
    loc: "230058P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "라인하르트 폰 뮤젤 제독단의 균형형 제독. 테라 공략 중 테러리스트에게 독침을 맞아 왼팔을 잃고 의수를 달았다. 충직하고 안정적인 지휘로 제국군 내에서 신뢰받는 중견 제독이다.",
      },
      {
        code: "En",
        context:
          "A well-rounded admiral in Reinhard's admiralty. He lost his left arm to a poisoned knife during the assault on Terra and replaced it with a prosthetic. Known for his loyal and steady command, he is a trusted senior officer within the Imperial Fleet.",
      },
      {
        code: "Jp",
        context:
          "ラインハルト提督団のバランス型提督。テラ攻略中にテロリストの毒針で左腕を失い義手を装着した。忠実で安定した指揮により帝国軍内で信頼される中堅提督である。",
      },
    ],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000242",
    name: [{ code: "Kr", context: "아우구스트 폰 골덴바움 1세" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000243",
    name: [{ code: "Kr", context: "아우구스트 폰 골덴바움 2세" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000244",
    name: [{ code: "Kr", context: "아이헨도르프" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000245",
    name: [
      { code: "Kr", context: "안네로제 폰 그뤼네발트" },
      { code: "En", context: "Annerose von Grünewald" },
      { code: "Jp", context: "アンネローゼ・フォン・グリューネワルト" },
    ],
    nick: [
      { code: "Kr", context: "안네로제" },
      { code: "En", context: "Annerose" },
      { code: "Jp", context: "アンネローゼ" },
    ],
    // 그뤼네발트는 황제로부터 작위(백작가)를 하사받은 이후의 성. 결혼 전 본성 "뮤젤"은 검색용 키로만 등록
    searchKeys: [
      "안네로제",
      "안네로제 폰 뮤젤",
      "뮤젤",
      "그뤼네발트",
      "Annerose",
      "Mussel",
      "Gruenewald",
      "アンネローゼ",
    ],
    birth: "SE|771.06.26",
    death: "",
    // — 성향
    // brave: 전투/정치와 무관한 은둔형 인물 → 신중~냉정 구간으로 하향
    // friend: 프리드리히4세(95)~라인하르트(150) 사이, 라인하르트와 절친이 되도록 책정
    faction: "REH", // 은하제국
    idea: "270", // 신성군주제
    econ: "140", // 혼합경제
    brave: "35",
    moral: "92",
    friend: "135",
    // — 능력치
    // statCsm: 주변 인물(라인하르트·키르히아이스 등)에게 강한 정서적 영향력을 미치는 점을 반영해 상향
    // statPlt: 정치에 전혀 관여하지 않는 은둔형 캐릭터라 대폭 하향
    statCmd: 5,
    statCsm: 55,
    statAtt: 5,
    statDef: 10,
    statFst: 5,
    statMng: 45,
    statInf: 60,
    statGfg: 5,
    statAfg: 5,
    statPlt: 15,
    // — 기타
    loc: "230058P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "라인하르트 폰 뮤젤의 누나. 황제 프리드리히 4세의 후궁으로 끌려가 동생의 야망을 촉발시킨 인물. 정치나 전쟁과는 거리를 두고 조용히 살아가지만, 라인하르트에게 있어 가장 소중한 존재다.",
      },
      {
        code: "En",
        context:
          "The elder sister of Reinhard von Lohengramm. Taken as a consort by Kaiser Friedrich IV, her fate became the catalyst for Reinhard's ambitions. She lives quietly apart from politics and war, yet remains the most precious person in Reinhard's life.",
      },
      {
        code: "Jp",
        context:
          "ラインハルト・フォン・ミューゼルの姉。フリードリヒ4世の後宮に召し上げられ、弟の野望を触発した人物。政治や戦争とは距離を置き静かに暮らすが、ラインハルトにとって最も大切な存在である。",
      },
    ],
    // — 직업
    // 백작(JB_N003) LV0
    // — 트레잇
    // 영원한 안식처(TRC_U_000245) LV0
  },
  {
    // — 기본
    code: "CH_000246",
    name: [{ code: "Kr", context: "안드라슈" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000247",
    name: [
      { code: "Kr", context: "안스바흐" },
      { code: "En", context: "Ansbach" },
      { code: "Jp", context: "アンスバッハ" },
    ],
    nick: [
      { code: "Kr", context: "안스바흐" },
      { code: "En", context: "Ansbach" },
      { code: "Jp", context: "アンスバッハ" },
    ],
    searchKeys: [],
    birth: "SE|758.06.22",
    death: "SE|797.",
    // — 성향
    faction: "REH", // 은하제국
    idea: "240", // 전제군주제
    econ: "140", // 혼합경제
    brave: "80", // 용맹
    moral: "78",
    friend: "140",
    // — 능력치
    statCmd: 35,
    statCsm: 62,
    statAtt: 55,
    statDef: 52,
    statFst: 48,
    statMng: 58,
    statInf: 65,
    statGfg: 70,
    statAfg: 45,
    statPlt: 60,
    // — 기타
    loc: "230058P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "오토 폰 브라운슈바이크 공작의 부관. 주군에 대한 충성심이 강하나 웨스터란트 핵폭격 결정에 강하게 반대하다 투옥됐다. 결국 주군의 비겁한 행동에 환멸을 느끼고 직접 독을 먹여 브라운슈바이크를 살해했다.",
      },
      {
        code: "En",
        context:
          "Aide to Duke Otto von Braunschweig. A man of strong loyalty to his lord, he was imprisoned after vocally opposing Braunschweig's decision to use nuclear weapons on Westerland. Ultimately disillusioned by his lord's cowardice, he personally administered the poison that killed Braunschweig.",
      },
      {
        code: "Jp",
        context:
          "オットー・フォン・ブラウンシュヴァイク公爵の副官。主君への忠誠心は強いが、ウェスターランドへの核爆撃決定に強く反対し投獄された。最終的に主君の臆病な行動に幻滅し、自ら毒を盛ってブラウンシュヴァイクを殺害した。",
      },
    ],
    // — 직업
    // — 트레잇
  },
  // https://gineipaedia.com/wiki/Antonel_Yanosher
  {
    // — 기본
    code: "CH_000248",
    name: [{ code: "Kr", context: "안토네르 야노슈" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "FPA",
    idea: "30",
    econ: "140",
    brave: "65",
    moral: "75",
    friend: "115",
    // — 능력치
    statCmd: 20,
    statCsm: 60,
    statAtt: 5,
    statDef: 5,
    statFst: 45,
    statMng: 75,
    statInf: 90,
    statGfg: 5,
    statAfg: 10,
    statPlt: 20,
    // — 기타
    loc: "230006P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "워프 기술을 발견·개발한 전설적인 과학자. 우주항행부 소속 연구팀을 이끌며 항성간 워프 항법을 실용화했고, 그 업적은 이후 인류의 은하 진출을 가능하게 한 초석이 됐다.",
      },
      {
        code: "En",
        context:
          "Legendary scientist who discovered and developed Warp technology. Leading the Ministry of Space research team, he made interstellar warp navigation practical — an achievement that laid the foundation for all of humanity's expansion into the galaxy.",
      },
      {
        code: "Jp",
        context:
          "ワープ技術を発見・開発した伝説的な科学者。宇宙省の研究チームを率いて恒星間ワープ航法を実用化し、その功績は後に人類の銀河進出を可能にした礎となった。",
      },
    ],
    // — 직업
    // 학자(JB_C003) LV0
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000249",
    name: [{ code: "Kr", context: "안톤 페르너" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000250",
    name: [
      { code: "Kr", context: "안톤 힐머 폰 샤프트" },
      { code: "En", context: "Anton Hilmer von Schaft" },
      { code: "Jp", context: "アントン・ヒルマー・フォン・シャフト" },
    ],
    nick: [
      { code: "Kr", context: "샤프트" },
      { code: "En", context: "Schaft" },
      { code: "Jp", context: "シャフト" },
    ],
    searchKeys: [],
    birth: "SE|748.09.15",
    death: "",
    // — 성향
    faction: "REH", // 은하제국
    idea: "240", // 전제군주제
    econ: "140", // 혼합경제
    brave: "45", // 냉정
    moral: "38",
    friend: "88",
    // — 능력치
    statCmd: 5,
    statCsm: 58,
    statAtt: 3,
    statDef: 5,
    statFst: 3,
    statMng: 72,
    statInf: 88,
    statGfg: 3,
    statAfg: 3,
    statPlt: 75,
    // — 기타
    loc: "230058P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "공학·철학 박사 학위를 보유한 제국 과학기술감찰총감. 페잔의 사주를 받아 가이에스부르크 요새 기동화 계획을 추진하여 제8차 이젤론 공방전을 일으켰으나, 패전 후 루빈스키의 명으로 증거가 제공되어 부패·횡령·군사기밀 누설 혐의로 체포됐다.",
      },
      {
        code: "En",
        context:
          "Inspector General of the Imperial Science and Technology Division, holding doctoral degrees in both engineering and philosophy. Acting under covert direction from Fezzan, he devised and implemented the plan to mobilise Geiersburg Fortress, triggering the Eighth Battle of Iserlohn. After the Imperial defeat, Rubinsky had evidence of his crimes handed over to the Empire and he was arrested on charges of corruption, embezzlement, and betrayal of military secrets.",
      },
      {
        code: "Jp",
        context:
          "工学・哲学の博士号を持つ帝国科学技術監察総監。ペザンの指示のもとでガイエスブルク要塞機動化計画を立案・実行し第8次イゼルローン攻防戦を引き起こした。敗戦後、ルビンスキーの命で証拠が帝国に渡され、腐敗・横領・軍事機密漏洩の容疑で逮捕された。",
      },
    ],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000251",
    name: [
      { code: "Kr", context: "알 살렘" },
      { code: "En", context: "Al-Salem" },
    ],
    nick: [{ code: "Kr", context: "알 살렘" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  // https://gineipaedia.com/wiki/Arle_Heinessen
  {
    // — 기본
    code: "CH_000252",
    name: [{ code: "Kr", context: "알레 하이네센" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "FPA",
    idea: "20",
    econ: "140",
    brave: "85",
    moral: "90",
    friend: "120",
    // — 능력치
    statCmd: 58,
    statCsm: 92,
    statAtt: 12,
    statDef: 18,
    statFst: 30,
    statMng: 82,
    statInf: 85,
    statGfg: 10,
    statAfg: 15,
    statPlt: 25,
    // — 기타
    loc: "230006P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "자유행성동맹의 정신적 시조. 은하제국의 혹성 알타이르 VII에서 농노로 태어나, 스스로 설계한 거대 드라이아이스 우주선으로 40만 명의 동포를 이끌고 이젤론 회랑을 돌파해 은하계 끝자락에 자유로운 공화국의 씨앗을 뿌렸다. 이젤론 통과 도중 사망했지만 그의 이름은 행성 '하이네센'과 동맹 그 자체에 영원히 새겨졌다.",
      },
      {
        code: "En",
        context:
          "The spiritual forefather of the Free Planets Alliance. Born a serf on the Imperial planet Altair VII, he engineered a fleet of massive dry-ice ships, led 400,000 people through the Iserlohn Corridor, and planted the seeds of a free republic at the galaxy's edge. He died during the passage, but his name lives on in the planet Heinessen and the Alliance itself.",
      },
      {
        code: "Jp",
        context:
          "自由惑星同盟の精神的な始祖。銀河帝国の惑星アルタイルⅦで農奴として生まれ、自ら設計した巨大なドライアイス製宇宙船で40万人の同胞を率いてイゼルローン回廊を突破し、銀河の果てに自由な共和国の種をまいた。回廊通過中に死亡したが、その名は惑星ハイネセンと同盟そのものに永遠に刻まれている。",
      },
    ],
    // — 직업
    // 시민(JB_C001) LV0
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000253",
    name: [{ code: "Kr", context: "알렉산드르 바르트하우저" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000254",
    name: [
      { code: "Kr", context: "알렉산드르 뷰코크" },
      { code: "En", context: "Alexandre Bewcock" },
      { code: "Jp", context: "アレクサンドル・ビュコック" },
    ],
    nick: [
      { code: "Kr", context: "뷰코크" },
      { code: "En", context: "Bewcock" },
      { code: "Jp", context: "ビュコック" },
    ],
    searchKeys: [],
    birth: "SE|726.12.08",
    death: "SE|800.06.19",
    // — 성향
    faction: "FPA", // 자유행성동맹
    idea: "100", // 자유민주공화국
    econ: "100", // 시장경제
    brave: "80",
    moral: "92",
    friend: "170",
    // — 능력치
    statCmd: 88,
    statCsm: 85,
    statAtt: 78,
    statDef: 82,
    statFst: 70,
    statMng: 80,
    statInf: 78,
    statGfg: 72,
    statAfg: 80,
    statPlt: 82,
    // — 기타
    loc: "230006P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "자유행성동맹 최고의 노장. 사병으로 입대하여 원수까지 오른 입지전적 인물로, 수십 년의 전장 경험과 강직한 인품으로 양 웬리를 비롯한 동맹 장교들의 존경을 받았다. 란테마리오 성전에서 패배 후 최후의 저항을 이끌다 전사했다.",
      },
      {
        code: "En",
        context:
          "The Alliance's greatest veteran admiral. Enlisting as a common soldier and rising to Fleet Admiral through decades of combat, he earned the respect of Yang Wen-li and all Alliance officers through his battlefield experience and uncompromising integrity. He died leading a last stand after defeat at the Battle of Rantemario.",
      },
      {
        code: "Jp",
        context:
          "自由惑星同盟最高の老将。一兵卒として入隊し元帥にまで上り詰めた立志伝中の人物で、数十年の実戦経験と剛直な人品によりヤン・ウェンリーをはじめ同盟将校たちから尊敬された。ランテマリオ星域会戦で敗北後、最後の抵抗を率いて戦死した。",
      },
    ],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000255",
    name: [
      { code: "Kr", context: "알렉스 카젤느" },
      { code: "En", context: "Alex Cazerne" },
      { code: "Jp", context: "アレックス・キャゼルヌ" },
    ],
    nick: [
      { code: "Kr", context: "카젤느" },
      { code: "En", context: "Cazerne" },
      { code: "Jp", context: "キャゼルヌ" },
    ],
    searchKeys: [],
    birth: "SE|761.05.01",
    death: "",
    // — 성향
    faction: "FPA", // 자유행성동맹
    idea: "100", // 자유민주공화국
    econ: "100", // 자본주의
    brave: "25", // 신중
    moral: "85",
    friend: "150",
    // — 능력치
    statCmd: 35,
    statCsm: 70,
    statAtt: 25,
    statDef: 31,
    statFst: 6,
    statMng: 100,
    statInf: 50,
    statGfg: 40,
    statAfg: 55,
    statPlt: 65,
    // — 기타
    loc: "230006P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "자유행성동맹 최고의 보급/행정 전문가. 양 웬리의 절친한 친구이자 13함대의 후방을 책임진 핵심 참모. 전투보다 물자 조달과 병참 운영에 천재적인 재능을 발휘하며, 율리안 민츠를 양 웬리에게 배정한 인물이기도 하다.",
      },
      {
        code: "En",
        context:
          "The Free Planets Alliance's foremost logistics and administrative specialist. A close friend of Yang Wen-li and the key staff officer responsible for the 13th Fleet's rear operations. A genius in supply and logistics rather than combat, he was also the one who assigned Julian Mintz to Yang Wen-li.",
      },
      {
        code: "Jp",
        context:
          "自由惑星同盟最高の補給・行政の専門家。ヤン・ウェンリーの親友にして第13艦隊の後方を担う中核参謀。戦闘よりも物資調達と兵站運営に天才的な才能を発揮し、ユリアン・ミンツをヤン・ウェンリーに配属した人物でもある。",
      },
    ],
    // — 직업
    // — 트레잇
  },
  // 알프레드 로자스 Alfred Rosas · アルフレッド・ローザス
  {
    // — 기본
    code: "CH_000256",
    name: [
      { code: "Kr", context: "알프레드 로자스" },
      { code: "En", context: "Alfred Rosas" },
      { code: "Jp", context: "アルフレッド・ローザス" },
    ],
    nick: [
      { code: "Kr", context: "로자스" },
      { code: "En", context: "Rosas" },
      { code: "Jp", context: "ローザス" },
    ],
    searchKeys: [
      "알프레드",
      "알프렛",
      "로자스",
      "로저스",
      "Alfred",
      "Rosas",
      "ローザス",
    ],
    birth: "SE|710.06.23", // 710 확실
    death: "SE|788.10.01", // 788.10 확실 (양 웬리 인터뷰 직후 수면제 과다복용으로 사망, 자살 추정)
    // — 성향
    faction: "FPA", // 자유행성동맹
    idea: "100", // 자유민주공화국
    econ: "100", // 자본주의
    brave: "45", // 본인 평가상 "지휘관으로서는 평균보다 조금 나은 수준"
    moral: "75",
    friend: "120",
    // — 능력치 (애시비 함대 참모장 — 조율형 캐릭터, 지휘보다 운영/통솔 보좌에 특화)
    statCmd: 58,
    statCsm: 62,
    statAtt: 45,
    statDef: 50,
    statFst: 42,
    statMng: 80,
    statInf: 65,
    statGfg: 38,
    statAfg: 40,
    statPlt: 55,
    // — 기타
    loc: "",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "730년 마피아의 일원. \n    다른 730마피아의 일원에 비해 뛰어난 인재는 아니었으며, 실제 지휘관으로서는 능력은 평균보다 조금 나은 수준이었다.\n    여러 인재들이 모인 장소에서 의견을 취합하고 갈등을 해소시키는데에 매우 능해 오랜 기간 우주함대 총참모장으로 혁혁한 공을 세웠다.",
      },
      {
        code: "En",
        context:
          "A member of the Year 730 Mafia. Though not as gifted as his fellow Mafia members, and only slightly above average as a commander in his own right, he excelled at listening to strong personalities and reconciling their differing opinions, allowing him to serve with great distinction as Chief of Staff of the Space Fleet for many years.",
      },
      {
        code: "Jp",
        context:
          "730年マフィアの一員。他の730マフィアの仲間に比べ際立った才能の持ち主ではなく、自身が指揮官として見れば平均よりやや上程度の能力であった。しかし様々な人材が集う場で意見を取りまとめ対立を解消することに非常に長け、長年にわたり宇宙艦隊総参謀長として赫々たる功績を残した。",
      },
    ],
    // — 직업
    // — 트레잇
    // 은퇴(군)(TRC_G_012) LV0
    // 조율자(TRC_G_013) LV5
    // 참모(TRC_G_014) LV5
  },
  // 알프레트 폰 란즈베르크 Alfred von Landsberg/Alfred von Lansberg ・ アルフレット・フォン・ランズベルク
  // TODO
  {
    // — 기본
    code: "CH_000257",
    name: [
      { code: "Kr", context: "알프레트 폰 란즈베르크" },
      { code: "En", context: "Alfred von Landsberg" },
      { code: "Jp", context: "アルフレット・フォン・ランズベルク" },
    ],
    nick: [
      { code: "Kr", context: "란즈베르크" },
      { code: "En", context: "Landsberg" },
      { code: "Jp", context: "ランズベルク" },
    ],
    searchKeys: ["Lansberg"],
    birth: "SE|772.04.10",
    death: "SE|804.07.22", // 798년 슈마허와 함께 어린 황제 유괴 후 동맹 망명, 이후 정신착란으로 체포(사망일 불명)
    // — 성향
    // 립슈타트 패전 후 페잔 망명, 798년 페잔의 사주로 황제 유괴극에 가담한 낭만적 귀족.
    // 자신의 역사 서술(립슈타트 전사)이 너무 주관적이라는 이유로 출판이 거절될 정도로 신념이 확고함
    faction: "REH",
    idea: "270",
    econ: "150",
    brave: "35",
    moral: "62",
    friend: "75",
    // — 능력치 (귀족 시인 출신, 야전 지휘 경험은 거의 없는 인물)
    statCmd: 22,
    statCsm: 58,
    statAtt: 15,
    statDef: 18,
    statFst: 20,
    statMng: 35,
    statInf: 65,
    statGfg: 10,
    statAfg: 12,
    statPlt: 40,
    // — 기타
    loc: "230058P01", // 오딘
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "5대째 이어진 제국 명문 귀족가의 백작. 립슈타트 동맹에 가담했으나 슈타덴의 오딘 침공 계획에는 동의만 하고 직접 참전하지는 않았다. 패전 후 페잔으로 망명해 시와 소설을 쓰며 지냈는데, 자신이 쓴 「립슈타트 전사」가 지나치게 주관적이고 낭만적이라는 이유로 출판을 거절당했다. 798년 페잔의 사주를 받아 레오폴트 슈마허와 함께 어린 황제 에르빈 요제프 2세를 유괴해 동맹으로 도주했다.",
      },
    ],
    // — 직업
    // — 트레잇
    // 감탄의 극치(TRC_U_000257) LV0
    // 기사도(TRC_G_016) LV4
    // 선량함(TRC_G_017) LV3
  },
  {
    // — 기본
    code: "CH_000258",
    name: [{ code: "Kr", context: "알프레트 그릴파르처" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000259",
    name: [{ code: "Kr", context: "알프레트 알로이스 빈클러" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000260",
    name: [{ code: "Kr", context: "암살자" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000261",
    name: [{ code: "Kr", context: "암스도르프" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000262",
    name: [{ code: "Kr", context: "애플턴" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  // 앤드류 포크 Andrew Falk · アンドリュー・フォーク
  // TODO
  {
    // — 기본
    code: "CH_000263",
    name: [
      { code: "Kr", context: "앤드류 포크" },
      { code: "En", context: "Andrew Falk" },
      { code: "Jp", context: "アンドリュー・フォーク" },
    ],
    nick: [
      { code: "Kr", context: "포크" },
      { code: "En", context: "Falk" },
      { code: "Jp", context: "フォーク" },
    ],
    searchKeys: [
      "앤드류",
      "포크",
      "Andrew",
      "Falk",
      "アンドリュー",
      "フォーク",
    ],
    birth: "SE|770.11.30",
    death: "SE|800.06.01",
    // — 성향
    // idea: 살아있었으면 아마 구국군사회의(NSMC) 참가했을 것으로 보이는 권위주의적 성향 반영
    faction: "FPA", // 자유행성동맹
    idea: "30",
    econ: "160", // 통제경제
    brave: "42", // 용맹치 낮음
    moral: "40",
    friend: "215",
    // — 능력치
    statCmd: 25,
    statCsm: 54,
    statAtt: 52,
    statDef: 55,
    statFst: 25,
    statMng: 70,
    statInf: 89, // 정보 공작 음모에 능함
    statGfg: 65,
    statAfg: 22,
    statPlt: 87,
    // — 기타
    loc: "230006P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "자유행성동맹 소속의 군인.\n    국방사관학교를 수석으로 졸업한 인재로, 실전경험이 없으며 보급,훈련 등의 군사작전의 세부사항을 짜는데는 매우 허술하지만\n    전체적인 큰 그림을 입안하고 이를 관철시킬 정치적 모략에 매우 능하다는 평을 받고 있다.",
      },
    ],
    // — 직업
    // — 트레잇
    // 재앙을 기획하는 자(TRC_U_000263) LV0
    // 전환장애(TRC_G_018) LV4
    // 참모(TRC_G_014) LV1
  },
  {
    // — 기본
    code: "CH_000264",
    name: [{ code: "Kr", context: "야마무라" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000265",
    name: [{ code: "Kr", context: "야콥 하우프트만" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  // 양 웬리 Yang Wen-li · ヤン・ウェンリー
  {
    // — 기본
    code: "CH_000266",
    name: [
      { code: "Kr", context: "양 웬리" },
      { code: "En", context: "Yang Wen-li" },
      { code: "Jp", context: "ヤン・ウェンリー" },
    ],
    nick: [
      { code: "Kr", context: "양" },
      { code: "En", context: "Yang" },
      { code: "Jp", context: "ヤン" },
    ],
    searchKeys: ["양", "얀", "웬리"],
    birth: "SE|767.04.04", // 확실
    death: "SE|800.06.01", // 확실
    // — 성향
    faction: "FPA",
    idea: "80",
    econ: "140",
    brave: "45",
    moral: "85",
    friend: "145",
    // — 능력치
    statCmd: 100,
    statCsm: 100,
    statAtt: 95,
    statDef: 100,
    statFst: 62,
    statMng: 51,
    statInf: 80,
    statGfg: 49,
    statAfg: 77,
    statPlt: 70,
    // — 기타
    loc: "230006P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "은하역사상 손꼽히는 전략가.\n    역사학자를 꿈꿨으나 생활고로 사관학교에 입학한 이후 군인의 삶을 걷는다.\n    전쟁을 혐오하면서도 부하들의 생명을 지키기 위해 전장에서 불패의 전술을 구사하며 '마법사 양'이라는 명성을 얻는다.",
      },
      {
        code: "En",
        context:
          'One of the greatest strategists in galactic history. Though he dreamed of becoming a historian, financial hardship led him to the officer academy and a life in the military. Despising war yet fighting to protect his soldiers, he employs undefeated tactics and earns the name "Yang the Magician."',
      },
      {
        code: "Jp",
        context:
          "銀河史上屈指の戦略家。歴史家を夢見ていたが、生活苦から士官学校へ入学し軍人の道を歩む。戦争を憎みながらも部下の命を守るため戦場で不敗の戦術を駆使し、「魔術師ヤン」の名声を得る。",
      },
    ],
    // 트레잇
    // 기적의 양(고유)
    // 불패의 마술사 (고유)
    // 역사학자 lv1 :
    //

    // 직업
    // 준장
    // 시민
    // — 직업
    // 함대사령관(JB_M001) LV0
    // 소장(JB_MR005) LV0
    // — 트레잇
    // 마법사(TRC_U_000266) LV0
    // 전쟁 혐오(TRC_G_002) LV0
  },
  {
    // — 기본
    code: "CH_000267",
    name: [{ code: "Kr", context: "양 타이론" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000268",
    name: [{ code: "Kr", context: "에더" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000269",
    name: [{ code: "Kr", context: "에드먼드 메서스미스" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  // 에드윈 피셔 Edwin Fischer · エドウィン・フィッシャー
  // TODO
  {
    // — 기본
    code: "CH_000270",
    name: [
      { code: "Kr", context: "에드윈 피셔" },
      { code: "En", context: "Edwin Fischer" },
      { code: "Jp", context: "エドウィン・フィッシャー" },
    ],
    nick: [
      { code: "Kr", context: "피셔" },
      { code: "En", context: "Fischer" },
      { code: "Jp", context: "フィッシャー" },
    ],
    searchKeys: [],
    birth: "SE|762.04.11",
    death: "SE|800.05.15", // 확실
    // — 성향
    faction: "FPA", // 자유행성동맹
    idea: "100", // 자유민주공화국
    econ: "100", // 시장경제
    brave: "75",
    moral: "80",
    friend: "150",
    /** @능력치
     *  4| 통솔 56 공격 72 방어 59 기동 100 운영 41 정보 45 육전 55 공전 72
     *  6| 통솔 56 지휘 62 공격 66 방어 63 기동 100 운영 37 정보 32
     *  > 통솔은 좀 더 높아도 될 것 같음. 기동은 100이 맞다고 생각.
     */
    statCmd: 75,
    statCsm: 82,
    statAtt: 68,
    statDef: 72,
    statFst: 88,
    statMng: 78,
    statInf: 70,
    statGfg: 72,
    statAfg: 75,
    statPlt: 75,
    // — 기타
    loc: "230006P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "자유행성동맹 소속의 군인.\n    함대운용을 실전에서 완벽하게 구현하는 달인으로, 다소 과묵하고 침착한 성격이다.",
      },
    ],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000271",
    name: [
      { code: "Kr", context: "에렌베르크" },
      { code: "En", context: "Ehrenberg" },
      { code: "Jp", context: "エーレンベルク" },
    ],
    nick: [
      { code: "Kr", context: "에렌베르크" },
      { code: "En", context: "Ehrenberg" },
      { code: "Jp", context: "エーレンベルク" },
    ],
    searchKeys: [],
    birth: "SE|730.05.12",
    death: "",
    // — 성향
    faction: "REH", // 은하제국
    idea: "270", // 전제군주제
    econ: "140", // 혼합경제
    brave: "60", // 일반
    moral: "65",
    friend: "110",
    // — 능력치
    statCmd: 50,
    statCsm: 72,
    statAtt: 32,
    statDef: 24,
    statFst: 21,
    statMng: 62,
    statInf: 52,
    statGfg: 45,
    statAfg: 21,
    statPlt: 88,
    // — 기타
    loc: "230058P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "프리드리히 4세 치하 제국군 3장관 중 군무상서. 라인하르트 폰 뮤젤의 세력 확장에 반발한 구체제 귀족 세력의 일원으로, 립슈타트 반란 당시 비텐펠트에게 체포되어 강제 퇴역당했다.",
      },
      {
        code: "En",
        context:
          "Minister of Military Affairs and one of the three Imperial military chiefs of staff under Kaiser Friedrich IV. A member of the old guard who resisted Reinhard von Lohengramm's rise, he was captured by Bittenfeld during the Lippstadt Rebellion and forced into retirement.",
      },
      {
        code: "Jp",
        context:
          "フリードリヒ4世治下の帝国軍三長官の一人、軍務尚書。ラインハルト・フォン・ミューゼルの台頭に反発した旧体制貴族勢力の一員で、リップシュタット叛乱時にビッテンフェルトに捕縛され強制退役させられた。",
      },
    ],
    // — 직업
    // 군무상서(JB_R008) LV0
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000272",
    name: [
      { code: "Kr", context: "에르네스트 메크링거" },
      { code: "En", context: "Ernest Mecklinger" },
      { code: "Jp", context: "エルネスト・メックリンガー" },
    ],
    nick: [
      { code: "Kr", context: "메크링거" },
      { code: "En", context: "Mecklinger" },
      { code: "Jp", context: "メックリンガー" },
    ],
    searchKeys: [],
    birth: "SE|766.10.05",
    death: "",
    // — 성향
    faction: "REH", // 은하제국
    idea: "240", // 전제군주제
    econ: "140", // 혼합경제
    brave: "25",
    moral: "82",
    friend: "145",
    // — 능력치
    statCmd: 80,
    statCsm: 82,
    statAtt: 70,
    statDef: 78,
    statFst: 72,
    statMng: 80,
    statInf: 78,
    statGfg: 70,
    statAfg: 75,
    statPlt: 85,
    // — 기타
    loc: "230058P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "'예술가 제독'이라 불리는 제국군 후방 사령관. \n    군사적 능력과 예술적 소양을 겸비한 지휘관으로 평가받고 있다.",
      },
      {
        code: "En",
        context:
          'Known as the "Artistic Admiral," Mecklinger served as rear forces commander and former chief of staff under Reinhard. A commander who combined military skill with genuine artistic sensibility, he was recommended for promotion to Fleet Admiral by Reinhard on his deathbed.',
      },
      {
        code: "Jp",
        context:
          "「芸術家提督」と称される帝国軍後方司令官。軍事的能力と芸術的素養を兼ね備えた指揮官で、ラインハルトの参謀長を歴任。ラインハルトの臨終の際に元帥への昇進を推薦された。",
      },
    ],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000273",
    name: [{ code: "Kr", context: "에르빈 요제프 폰 골덴바움 1세" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000274",
    name: [{ code: "Kr", context: "에르빈 요제프 폰 골덴바움 2세" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000275",
    name: [{ code: "Kr", context: "에른스트 팔스트롱" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000276",
    name: [{ code: "Kr", context: "에른스트 폰 아이제나흐" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000277",
    name: [{ code: "Kr", context: "에리히 폰 골덴바움 1세" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000278",
    name: [{ code: "Kr", context: "에리히 폰 골덴바움 2세" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000279",
    name: [{ code: "Kr", context: "에리히 폰 발부르크" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000280",
    name: [{ code: "Kr", context: "에리히 폰 하르텐베르크" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000281",
    name: [{ code: "Kr", context: "에머슨" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000282",
    name: [{ code: "Kr", context: "에밀 폰 레켄도르프" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000283",
    name: [{ code: "Kr", context: "에밀 폰 젤레" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000284",
    name: [{ code: "Kr", context: "에밀리히" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }], // 에멜리히
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000285",
    name: [{ code: "Kr", context: "에반젤린 미터마이어" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000286",
    name: [{ code: "Kr", context: "에벤스" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000287",
    name: [{ code: "Kr", context: "에크하르트" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000288",
    name: [{ code: "Kr", context: "엔디 듀크레이" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000289",
    name: [{ code: "Kr", context: "엔리케 마르티노 보르헤스" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "298",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  // 엘라흐 Elrach ・ エルラッハ
  {
    // — 기본
    code: "CH_000290",
    name: [
      { code: "Kr", context: "엘라흐" },
      { code: "En", context: "Elrach" },
      { code: "Jp", context: "エルラッハ" },
    ],
    nick: [
      { code: "Kr", context: "엘라흐" },
      { code: "En", context: "Elrach" },
      { code: "Jp", context: "エルラッハ" },
    ],
    searchKeys: [],
    birth: "",
    death: "SE|796.02.11",
    // — 성향
    faction: "REH",
    idea: "250",
    econ: "180",
    brave: "75",
    moral: "62",
    friend: "110",
    // — 능력치
    statCmd: 62,
    statCsm: 52,
    statAtt: 68,
    statDef: 58,
    statFst: 65,
    statMng: 45,
    statInf: 48,
    statGfg: 55,
    statAfg: 65,
    statPlt: 35,
    // — 기타
    loc: "230058P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "은하제국의 함대 지휘관. 아스타테 회전에서 라인하르트 함대의 분함대 사령관으로 참전했으나 전투 중 전사했다.",
      },
      {
        code: "En",
        context:
          "A fleet commander of the Galactic Empire. He participated in the Battle of Astarte as a sub-fleet commander under Reinhard's fleet, but was killed in action during the engagement.",
      },
      {
        code: "Jp",
        context:
          "銀河帝国の艦隊指揮官。アスターテ会戦ではラインハルト艦隊の分艦隊司令官として参戦したが、戦闘中に戦死した。",
      },
    ],
    // — 직업
    // 함대사령관(JB_M001) LV0
    // 중장(JB_MR004) LV0
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000291",
    name: [{ code: "Kr", context: "엘리자베트 폰 뤼네부르크" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000292",
    name: [
      { code: "Kr", context: "엘리자베트 폰 브라운슈바이크" },
      { code: "En", context: "Elisabeth von Braunschweig" },
      { code: "Jp", context: "エリザベート・フォン・ブラウンシュヴァイク" },
    ],
    nick: [
      { code: "Kr", context: "엘리자베트" },
      { code: "En", context: "Elisabeth" },
      { code: "Jp", context: "エリザベート" },
    ],
    searchKeys: [],
    birth: "SE|780.06.12",
    death: "",
    // — 성향
    faction: "REH", // 은하제국
    idea: "270", // 전제군주제
    econ: "140", // 혼합경제
    brave: "60", // 일반
    moral: "65",
    friend: "120",
    // — 능력치
    statCmd: 2,
    statCsm: 70,
    statAtt: 2,
    statDef: 3,
    statFst: 2,
    statMng: 35,
    statInf: 42,
    statGfg: 2,
    statAfg: 2,
    statPlt: 48,
    // — 기타
    loc: "230058P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "오토 폰 브라운슈바이크의 딸. 796년 프리드리히 4세 붕어 후 황위 계승 후보로 내세워졌으나 에르빈 요제프 2세에게 황위를 빼앗겼다. 립슈타트 내전 이후 행방 불명.",
      },
      {
        code: "En",
        context:
          "Daughter of Duke Otto von Braunschweig. Put forward as a claimant to the throne after Kaiser Friedrich IV's death in 796 UC, but the throne went to Erwin Josef II instead. Her fate following the Lippstadt Rebellion is unknown.",
      },
      {
        code: "Jp",
        context:
          "オットー・フォン・ブラウンシュヴァイクの娘。796年フリードリヒ4世崩御後に皇位継承候補として擁立されたが、エルウィン・ヨーゼフ2世に皇位を奪われた。リップシュタット内乱後は行方不明。",
      },
    ],
    // — 직업
    // — 트레잇
  },
  // 엘리자베트 폰 카스트로프 Elisabeth von Castrop ・ オイゲン・フォン・カストロプ
  {
    // — 기본
    code: "CH_000293",
    name: [
      { code: "Kr", context: "엘리자베트 폰 카스트로프" },
      { code: "En", context: "Elisabeth von Castrop" },
      { code: "Jp", context: "オイゲン・フォン・カストロプ" },
    ],
    nick: [
      { code: "Kr", context: "E. 카스트로프" },
      { code: "En", context: "E. Castrop" },
      { code: "Jp", context: "E. カストロプ" },
    ],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000294",
    name: [{ code: "Kr", context: "엘프리데 폰 콜라우슈" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000295",
    name: [{ code: "Kr", context: "엣킨스" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000296",
    name: [{ code: "Kr", context: "오르탕스 밀베르 카젤느" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000297",
    name: [{ code: "Kr", context: "오브리 코크란" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000298",
    name: [{ code: "Kr", context: "오스마이어" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000299",
    name: [{ code: "Kr", context: "오스만" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000300",
    name: [{ code: "Kr", context: "오스발트 폰 뮌처" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000301",
    name: [
      { code: "Kr", context: "오스카 폰 로이엔탈" },
      { code: "En", context: "Oskar von Reuenthal" },
      { code: "Jp", context: "オスカー・フォン・ロイエンタール" },
    ],
    nick: [
      { code: "Kr", context: "로이엔탈" },
      { code: "En", context: "Reuenthal" },
      { code: "Jp", context: "ロイエンタール" },
    ],
    searchKeys: [],
    birth: "SE|767.10.26",
    death: "SE|800.12.16",
    // — 성향
    faction: "REH", // 은하제국
    idea: "240", // 전제군주제
    econ: "140", // 혼합경제
    brave: "45",
    moral: "72",
    friend: "160",
    // — 능력치
    statCmd: 96,
    statCsm: 92,
    statAtt: 90,
    statDef: 88,
    statFst: 88,
    statMng: 85,
    statInf: 78,
    statGfg: 82,
    statAfg: 88,
    statPlt: 80,
    // — 기타
    loc: "230058P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "라인하르트 다음가는 전략 능력을 지닌 제국군 최고의 제독. 이색동공을 가졌으며, 미터마이어와 함께 '쌍벽'으로 불린다. 야망과 반골 기질을 내면에 품고 있으며, 결국 라인하르트에게 반란을 일으켰다가 전사한다.",
      },
      {
        code: "En",
        context:
          'The finest Imperial admiral second only to Reinhard in strategic ability. Known for his heterochromia, he forms the "Twin Pillars" with Mittermeyer. Harbouring deep ambition and a rebellious spirit within, he ultimately rises in insurrection against Kaiser Reinhard, only to fall in battle.',
      },
      {
        code: "Jp",
        context:
          "ラインハルトに次ぐ戦略能力を持つ帝国最高の提督。左右色の異なる瞳を持ち、ミッターマイヤーとともに「双璧」と呼ばれる。内に野望と反骨心を秘め、最終的にラインハルトへの叛乱を起こして戦死する。",
      },
    ],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000302",
    name: [{ code: "Kr", context: "오이겐" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000303",
    name: [{ code: "Kr", context: "오이겐 리쳐" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  // 오이겐 폰 카스트로프 Eugen von Castrop ・ オイゲン・フォン・カストロプ
  {
    // — 기본
    code: "CH_000304",
    name: [
      { code: "Kr", context: "오이겐 폰 카스트로프" },
      { code: "En", context: "Eugen von Castrop" },
      { code: "Jp", context: "オイゲン・フォン・カストロプ" },
    ],
    nick: [
      { code: "Kr", context: "Eug. 카스트로프" },
      { code: "En", context: "Eug. Castrop" },
      { code: "Jp", context: "Eug. カストロプ" },
    ],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000305",
    name: [{ code: "Kr", context: "오토 뵐러" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000306",
    name: [
      { code: "Kr", context: "오토 폰 브라운슈바이크" },
      { code: "En", context: "Otto von Braunschweig" },
      { code: "Jp", context: "オットー・フォン・ブラウンシュヴァイク" },
    ],
    nick: [
      { code: "Kr", context: "브라운슈바이크" },
      { code: "En", context: "Braunschweig" },
      { code: "Jp", context: "ブラウンシュヴァイク" },
    ],
    searchKeys: [],
    birth: "SE|745.03.18",
    death: "SE|797.09.",
    // — 성향
    faction: "REH", // 은하제국
    idea: "290", // 신성군주제
    econ: "180", // 국가자본주의
    brave: "72", // 용맹
    moral: "42",
    // friend: 라인하르트(150)와 원형(0~299) 순환거리 110차(상극) / 리텐하임(260)과는 80차(불편함, 같은 진영이라 약간 가깝게)
    friend: "40",
    // — 능력치
    statCmd: 42,
    statCsm: 78,
    statAtt: 38,
    statDef: 35,
    statFst: 30,
    statMng: 55,
    statInf: 48,
    statGfg: 32,
    statAfg: 35,
    statPlt: 82,
    // — 기타
    loc: "230058P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "골덴바움 왕조 최대 문벌귀족 공작. 황제 프리드리히 4세의 사위로 딸 엘리자베트의 황위 계승을 획책하며 립슈타트 동맹을 주도했다. 리텐하임과 대립하면서도 연합하여 라인하르트에 맞섰으나 패배하고 측근 안스바흐에게 독살당했다.",
      },
      {
        code: "En",
        context:
          "The most powerful high noble Duke of the Goldenbaum Dynasty and son-in-law of Kaiser Friedrich IV. He led the Lippstadt Alliance in an attempt to place his daughter Elisabeth on the throne, forming a fragile coalition with his rival Marquis Littenheim against Reinhard von Lohengramm. Defeated in the civil war, he was poisoned by his own aide Ansbach.",
      },
      {
        code: "Jp",
        context:
          "ゴールデンバウム王朝最大の門閥貴族公爵。皇帝フリードリヒ4世の義息子で、娘エリザベートの皇位継承を画策しリップシュタット同盟を主導した。宿敵リッテンハイムと連合してラインハルトに対抗したが敗北し、側近アンスバッハに毒殺された。",
      },
    ],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000307",
    name: [{ code: "Kr", context: "오토 프랑크 폰 반샤페" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000308",
    name: [{ code: "Kr", context: "오토프리트 폰 골덴바움 1세" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000309",
    name: [{ code: "Kr", context: "오토프리트 폰 골덴바움 2세" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000310",
    name: [{ code: "Kr", context: "오토프리트 폰 골덴바움 3세" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000311",
    name: [{ code: "Kr", context: "오토프리트 폰 골덴바움 4세" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000312",
    name: [{ code: "Kr", context: "오토프리트 폰 골덴바움 5세" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000313",
    name: [{ code: "Kr", context: "오토하인츠 폰 골덴바움 1세" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000314",
    name: [{ code: "Kr", context: "오토하인츠 폰 골덴바움 2세" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000315",
    name: [{ code: "Kr", context: "오펜하이머" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000316",
    name: [{ code: "Kr", context: "오프레서" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000317",
    name: [{ code: "Kr", context: "오히긴스" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000318",
    name: [{ code: "Kr", context: "올라우" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000319",
    name: [{ code: "Kr", context: "올레빈스키" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000320",
    name: [{ code: "Kr", context: "올리비에 포플랭" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000321",
    name: [{ code: "Kr", context: "요아힘 폰 노이에슈타우펜" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000322",
    name: [{ code: "Kr", context: "요안느 폰 클롭슈톡" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000323",
    name: [{ code: "Kr", context: "요운존" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000324",
    name: [{ code: "Kr", context: "요크브" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000325",
    name: [{ code: "Kr", context: "요펜 폰 렘샤이트" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000326",
    name: [{ code: "Kr", context: "요한 디트리히 폰 아이젠푸트" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000327",
    name: [{ code: "Kr", context: "요한나 폰 바젤" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000328",
    name: [{ code: "Kr", context: "요함 고트홀프 폰 베르츠" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000329",
    name: [
      { code: "Kr", context: "욥 트류니히트" },
      { code: "En", context: "Job Trunicht" },
      { code: "Jp", context: "ヨブ・トリューニヒト" },
    ],
    nick: [
      { code: "Kr", context: "트류니히트" },
      { code: "En", context: "Trunicht" },
      { code: "Jp", context: "トリューニヒト" },
    ],
    searchKeys: [],
    birth: "SE|748.06.12",
    death: "SE|800.12.16",
    // — 성향
    faction: "FPA", // 자유행성동맹
    idea: "100", // 자유민주공화국
    econ: "100", // 자본주의
    brave: "60", // 일반
    moral: "8",
    // friend: 양 웬리(145)와 순환거리 100(상극) / 라인하르트(150)와 순환거리 95(매우 혐오하지만 극상은 아님)
    friend: "245",
    // — 능력치
    statCmd: 3,
    statCsm: 90,
    statAtt: 2,
    statDef: 3,
    statFst: 2,
    statMng: 90,
    statInf: 10,
    statGfg: 2,
    statAfg: 2,
    statPlt: 98,
    // — 기타
    loc: "230006P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "자유행성동맹의 정치가. 부패하고 무능한 행정으로 동맹 몰락의 한 원인이 된 최고평의회 의장. 공포 정치와 선동으로 권력을 유지했으며 제국에 항복 후에도 생존을 위해 지구교, 제국과 거래하는 등 철저한 기회주의자다.",
      },
      {
        code: "En",
        context:
          "An Alliance politician and penultimate head of state whose corrupt and incompetent administration was one of the contributing factors to the fall of the Alliance. He maintained power through fear and demagoguery, and after surrendering to the Empire continued to survive through dealings with the Church of Terra and the New Galactic Empire — a consummate opportunist to the last.",
      },
      {
        code: "Jp",
        context:
          "自由惑星同盟の政治家。腐敗した無能な行政で同盟崩壊の一因となった最高評議会議長。恐怖政治と扇動で権力を維持し、帝国への降伏後も地球教・帝国と取引するなど徹底した機会主義者。",
      },
    ],
    // — 직업
    // 국방위원장(JB_F002) LV0
    // — 트레잇
    // 민주주의의 어둠(TRC_U_000329) LV0
  },
  {
    // — 기본
    code: "CH_000330",
    name: [{ code: "Kr", context: "우노" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000331",
    name: [{ code: "Kr", context: "우드" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000332",
    name: [{ code: "Kr", context: "우드 디터 훔멜" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  // 우란푸 Uranff · ウランフ · 伍蘭夫(오란부)
  {
    // — 기본
    code: "CH_000333",
    name: [{ code: "Kr", context: "우란푸" }],
    nick: [{ code: "Kr", context: "우란푸" }],
    searchKeys: ["우람프", "울람프", "오란부"],
    birth: "SE|755.08.27",
    death: "SE|796.10.10",
    // — 성향
    faction: "FPA",
    idea: "",
    econ: "",
    brave: "80",
    moral: "",
    friend: "",
    // — 능력치
    // 4 통솔 84 공격 94 방어 75 기동 76 운영 39 정보 57 육전 73 공전 94
    // 6 통솔 92 지휘 85 공격 93 방어 80 기동 82 운영 50 정보 55.
    statCmd: 88,
    statCsm: 85,
    statAtt: 94,
    statDef: 78,
    statFst: 89,
    statMng: 50,
    statInf: 56,
    statGfg: 76,
    statAfg: 94,
    statPlt: 42,
    // — 기타
    loc: "230006P01", // 하이네센
    point: "0",
    desc: [
      {
        code: "Kr",
        context: `자유행성동맹 소속의 군인.
        보로딘과 함께 수위를 다투는 명장으로, 평시엔 겸손하고 침착한 인격자인 동시에 전시엔 공격적인 맹장으로 통한다.
        함대의 운용 뿐 아니라 뛰어난 전략적 통찰과 넓은 시야까지 보유한 완성형 지휘관이라는 평가.`,
      },
    ],
    // — 직업
    // — 트레잇
    // 기마민족의 후예(고유) :
  },
  {
    // — 기본
    code: "CH_000334",
    name: [{ code: "Kr", context: "울렌부르크" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000335",
    name: [
      { code: "Kr", context: "울리히 케슬러" },
      { code: "En", context: "Ulrich Kesler" },
      { code: "Jp", context: "ウルリッヒ・ケスラー" },
    ],
    nick: [
      { code: "Kr", context: "케슬러" },
      { code: "En", context: "Kesler" },
      { code: "Jp", context: "ケスラー" },
    ],
    searchKeys: [],
    birth: "SE|765.11.08",
    death: "",
    // — 성향
    faction: "REH", // 은하제국
    idea: "240", // 전제군주제
    econ: "140", // 혼합경제
    brave: "72",
    moral: "88",
    friend: "130",
    // — 능력치
    statCmd: 72,
    statCsm: 70,
    statAtt: 60,
    statDef: 75,
    statFst: 58,
    statMng: 88,
    statInf: 85,
    statGfg: 55,
    statAfg: 58,
    statPlt: 80,
    // — 기타
    loc: "230058P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "법무 장교 출신으로 제국군 헌병총감을 역임한 행정형 제독. 전장보다 치안 유지와 사법 개혁에서 두각을 나타낸다. 로엔그람 제독단 중 함대를 직접 지휘한 횟수가 가장 적지만, 제국 내부 질서 유지의 핵심 역할을 담당했다.",
      },
      {
        code: "En",
        context:
          "An administrative admiral who rose from a legal advocate background to serve as Chief of the Imperial Military Police. More distinguished for his law enforcement and judicial reforms than battlefield command, he was the least active fleet commander among Lohengramm's admirals, yet played a crucial role in maintaining internal order within the Empire.",
      },
      {
        code: "Jp",
        context:
          "法務将校出身で帝国軍憲兵総監を務めた行政型提督。戦場よりも治安維持と司法改革において頭角を現す。ローエングラム提督団の中で艦隊を直接指揮した回数は最も少ないが、帝国内部秩序維持の中核を担った。",
      },
    ],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000336",
    name: [{ code: "Kr", context: "워렌 휴즈" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000337",
    name: [
      { code: "Kr", context: "원수" },
      { code: "En", context: "Admiral" },
    ],
    nick: [{ code: "Kr", context: "원수" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000338",
    name: [
      { code: "Kr", context: "월터 아이랜즈" },
      { code: "En", context: "Walter Islands" },
      { code: "Jp", context: "ウォルター・アイランズ" },
    ],
    nick: [
      { code: "Kr", context: "아이랜즈" },
      { code: "En", context: "Islands" },
      { code: "Jp", context: "アイランズ" },
    ],
    searchKeys: [
      "윌터",
      "아이랜즈",
      "아일랜즈",
      "아이란즈",
      "Islands",
      "アイランズ",
    ],
    birth: "",
    death: "",
    // — 성향
    faction: "FPA", // 자유행성동맹
    idea: "100", // 자유민주공화국
    econ: "100", // 자본주의
    brave: "45",
    moral: "30",
    // friend: 트류니히트(245)에게 뇌물로 국방위원장직을 얻은 초기엔 충성파였으나,
    // 위기 상황에서 트류니히트와 결별하고 항전을 주장하다 부패 폭로당함 — 친함 정도로 다소 거리를 둠
    friend: "275",
    // — 능력치
    // 초기엔 사리사욕에 몰두한 3류 정치인이었으나, 페잔 강점 이후 위기 상황에서 각성하여
    // 통합작전본부에 전폭적 지지를 보내고 양 웬리의 작전을 승인하는 등 유능한 지도자로 거듭남을 반영
    statCmd: 25,
    statCsm: 60,
    statAtt: 10,
    statDef: 20,
    statFst: 15,
    statMng: 58,
    statInf: 52,
    statGfg: 12,
    statAfg: 15,
    statPlt: 45,
    // — 기타
    loc: "",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "자유행성동맹 국방위원장. 네그로폰테의 사임 이후 트류니히트에게 은제 화병을 뇌물로 바쳐 자리를 차지했다. 초기엔 사리사욕에 몰두한 3류 정치인이었으나, 페잔 강점으로 제국군의 본격 침공이 시작되자 돌변하여 통합작전본부에 전폭적인 지지를 보내고 양 웬리의 작전을 승인했다. 베르밀리온 전투 패배 후 항전을 주장하다 트류니히트에게 부패 사실을 폭로당하며 정치 인생을 마쳤다.",
      },
      {
        code: "En",
        context:
          "Alliance Secretary of Defence who bribed Trünicht with a silver vase to obtain the post after Negroponte's resignation. Initially a self-admitted third-rate politician focused on personal enrichment, he transformed during the Imperial invasion following the annexation of Fezzan, throwing his full political support behind the Joint Operations Headquarters and approving Yang Wen-li's strategy. After the defeat at Vermillion, he argued for continued resistance but was exposed by Trünicht for his earlier corruption, ending his political career.",
      },
      {
        code: "Jp",
        context:
          "自由惑星同盟国防委員長。ネグロポンテの辞任後、トリューニヒトに銀の花瓶を賄賂として贈り地位を得た。当初は私利私欲にまみれた三流政治家であったが、ペザン強占により帝国軍の本格侵攻が始まると一変し、統合作戦本部を全面的に支持しヤン・ウェンリーの作戦を承認した。ヴァーミリオン会戦の敗北後は抗戦を主張したが、トリューニヒトに過去の腐敗を暴露され政治生命を終えた。",
      },
    ],
    // — 직업
    // — 트레잇
    // 각성한 책임감(TRC_U_000338) LV0
  },
  {
    // — 기본
    code: "CH_000339",
    name: [{ code: "Kr", context: "웨버" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000340",
    name: [{ code: "Kr", context: "위르겐 오퍼 폰 페크니츠" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000341",
    name: [{ code: "Kr", context: "윈 판덴베르크" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  // https://gineipaedia.com/wiki/Winslow_Kennes_Townshent
  {
    // — 기본
    code: "CH_000342",
    name: [{ code: "Kr", context: "윈슬로 케네스 타운젠트" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000343",
    name: [{ code: "Kr", context: "윌" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  // 윌렘 홀랜드 Willem Holland · ウィレム・ホーランド
  // TODO 260629
  {
    // — 기본
    code: "CH_000344",
    name: [{ code: "Kr", context: "윌렘 홀랜드" }],
    nick: [{ code: "Kr", context: "홀랜드" }],
    searchKeys: ["홀란드"],
    // SE 763 ~ SE 795. 2. 6. (32세)
    birth: "763.12.15",
    death: "795.02.06",
    // — 성향
    faction: "FPA",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "230006P01", // 하이네센
    point: "0",
    desc: [
      {
        code: "Kr",
        context: `자유행성동맹 소속의 군인.
      브루스 애쉬비의 재림이라고 불리는 맹장으로, 뛰어난 능력을 가졌지만 그 능력 이상으로 비대한 자신감과 공명심, 오만함을 가지고 있다.
      795년 2월. 제 3차 티아마트 회전에서 32세의 나이로 전사`,
      }, // 796.02
    ],
    // — 직업
    // 중장
    // 시민
    // — 트레잇
    // 맹렬한 돌진 LV3 : 교전 시 공격 + 10(*3), 매 공격 후, 공격력이 -50+(5*3)씩 감소. 공격을 하지 않은 경우 공격력이 10(*3)씩 회복
    // 오만함 LV2 : 다른 인물과의 친밀도 보정 -10(*2)
  },
  {
    // — 기본
    code: "CH_000345",
    name: [{ code: "Kr", context: "윌리스 워릭" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000346",
    name: [{ code: "Kr", context: "윌리엄 오데츠" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "275",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000347",
    name: [{ code: "Kr", context: "윌마 반 크로프트" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000348",
    name: [{ code: "Kr", context: "유르겐스" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000349",
    name: [{ code: "Kr", context: "유스프 토패롤" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000350",
    name: [
      { code: "Kr", context: "율리안 민츠" },
      { code: "En", context: "Julian Mintz" },
      { code: "Jp", context: "ユリアン・ミンツ" },
    ],
    nick: [
      { code: "Kr", context: "율리안" },
      { code: "En", context: "Julian" },
      { code: "Jp", context: "ユリアン" },
    ],
    searchKeys: [],
    birth: "SE|782.03.25",
    death: "",
    // — 성향
    faction: "FPA", // 자유행성동맹
    idea: "100", // 자유민주공화국
    econ: "100", // 시장경제
    brave: "85",
    moral: "92",
    friend: "165",
    // — 능력치
    statCmd: 8,
    statCsm: 7,
    statAtt: 6,
    statDef: 6,
    statFst: 7,
    statMng: 7,
    statInf: 8,
    statGfg: 72,
    statAfg: 55,
    statPlt: 8,
    // — 기타
    loc: "230006P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "양 웬리의 양자. 트래버스법에 따라 양 웬리의 보호 아래 성장하며 뛰어난 전술 감각과 외교적 수완을 익혔다. 스파르타니안 조종사로도 두각을 나타내며 양 함대의 차세대 기대주로 여겨진다.",
      },
      {
        code: "En",
        context:
          "The adopted ward of Yang Wen-li. Raised under Yang's guardianship through the Travers Act, he developed exceptional tactical instincts and diplomatic skill. A gifted Spartanian pilot, he is regarded as the most promising of the next generation in Yang's fleet.",
      },
      {
        code: "Jp",
        context:
          "ヤン・ウェンリーの養子。トラバース法によりヤンの保護のもとで成長し、優れた戦術センスと外交的手腕を身につけた。スパルタニアンパイロットとしても頭角を現し、ヤン艦隊の次世代の期待の星と見なされている。",
      },
    ],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000351",
    name: [{ code: "Kr", context: "율리우스 엘스하이머" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000352",
    name: [{ code: "Kr", context: "율리우스 폰 골덴바움" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000353",
    name: [
      { code: "Kr", context: "응웬 반 티우" },
      { code: "En", context: "Nguyen Van Hugh" },
    ],
    nick: [{ code: "Kr", context: "응웬 반 티우" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000354",
    name: [{ code: "Kr", context: "응웬 킴 호아" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000355",
    name: [{ code: "Kr", context: "이반 코네프" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000356",
    name: [{ code: "Kr", context: "이븐 셸머" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }], // 이븐 샤마
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000357",
    name: [{ code: "Kr", context: "이블린 돌튼" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  // https://gineipaedia.com/wiki/Ion_Fazekath_(person)
  {
    // — 기본
    code: "CH_000358",
    name: [{ code: "Kr", context: "이온 파제카스" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "30",
    moral: "70",
    friend: "",
    // — 능력치
    statCmd: 5,
    statCsm: 30,
    statAtt: 5,
    statDef: 5,
    statFst: 20,
    statMng: 5,
    statInf: 25,
    statGfg: 5,
    statAfg: 5,
    statPlt: 10,
    // — 기타
    loc: "",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "알타이르 VII의 아이. 얼음을 깎아 장난감 보트를 만들어 놀던 모습이 알레 하이네센의 눈에 띄어, 드라이아이스로 우주선을 건조한다는 착상의 계기가 됐다. 그의 이름은 하이네센이 최초로 완성한 거대 우주선에 붙여져 역사에 남았다.",
      },
      {
        code: "En",
        context:
          "A child on Altair VII. His habit of carving ice boats caught the eye of Arle Heinessen, inspiring the idea of building spacecraft from dry ice. His name was bestowed on the first massive vessel Heinessen completed, earning him a place in history.",
      },
      {
        code: "Jp",
        context:
          "アルタイルⅦの子供。氷を削って手製のボートを作って遊ぶ姿がアーレ・ハイネセンの目に留まり、ドライアイスで宇宙船を建造するという発想のきっかけとなった。その名はハイネセンが完成させた最初の巨大宇宙船に冠され、歴史に刻まれた。",
      },
    ],
    // — 직업
    // 시민(JB_C001) LV0
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000359",
    name: [{ code: "Kr", context: "이자크 켐프" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000360",
    name: [{ code: "Kr", context: "이자크 페르난트 폰 트루나이젠" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000361",
    name: [{ code: "Kr", context: "임마만" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000362",
    name: [{ code: "Kr", context: "자니엘" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000363",
    name: [{ code: "Kr", context: "자와프" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000364",
    name: [{ code: "Kr", context: "자이데룬" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000365",
    name: [{ code: "Kr", context: "잔더스" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000366",
    name: [{ code: "Kr", context: "잠" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000367",
    name: [{ code: "Kr", context: "잠체스키" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  // 장 로베르 랍 Jean Robert Lapp · ジャン・ロベール・ラップ
  {
    // — 기본
    code: "CH_000368",
    name: [
      { code: "Kr", context: "장 로베르 랍" },
      { code: "En", context: "Jean Robert Lapp" },
      { code: "Jp", context: "ジャン・ロベール・ラップ" },
    ],
    nick: [
      { code: "Kr", context: "랍" },
      { code: "En", context: "Lapp" },
      { code: "Jp", context: "ラップ" },
    ],
    searchKeys: [
      "잔",
      "쟝",
      "장",
      "로베르",
      "로벨",
      "러프",
      "랏프",
      "랩",
      "라프",
    ],
    birth: "SE|767.03.29",
    death: "SE|796.02.11",
    // — 성향
    faction: "FPA",
    idea: "145",
    econ: "100",
    brave: "55",
    moral: "72",
    friend: "100",
    // — 능력치
    statCmd: 80,
    statCsm: 78,
    statAtt: 80,
    statDef: 80,
    statFst: 78,
    statMng: 75,
    statInf: 78,
    statGfg: 76,
    statAfg: 78,
    statPlt: 77,
    // — 기타
    loc: "230006P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "자유행성동맹 소속의 군인. 집단을 지도하는 역량과 인격을 갖추어 훌륭한 지휘관이 될 것이라는 평가를 받고 있다.\n    높은 군사적 식견과 능력도 가지고 있어, 그와 사관학교 동기인 양 웬리는 동기 중 가장 출세할 사람이라고 생각했다.",
      },
    ],
    // 사망 이후 시나리오에선 desc에 추가 '아스타테 회전에서 전사. 이후 양 웬리는 그의 이른 죽음을 두고두고 안타까워했다.'
    // — 직업
    // 참모(JB_M003) LV0
    // 소령(JB_MR009) LV0
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000369",
    name: [{ code: "Kr", context: "제노" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000370",
    name: [{ code: "Kr", context: "제닝스" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000371",
    name: [
      { code: "Kr", context: "제시카 에드워즈" },
      { code: "En", context: "Jessica Edwards" },
      { code: "Jp", context: "ジェシカ・エドワーズ" },
    ],
    nick: [
      { code: "Kr", context: "제시카" },
      { code: "En", context: "Jessica" },
      { code: "Jp", context: "ジェシカ" },
    ],
    searchKeys: [],
    birth: "SE|768.04.15",
    death: "SE|797.06.22",
    // — 성향
    faction: "FPA", // 자유행성동맹
    idea: "30", // 민주공화제
    econ: "100", // 자본주의
    brave: "80",
    moral: "98",
    friend: "160",
    // — 능력치
    statCmd: 3,
    statCsm: 45,
    statAtt: 4,
    statDef: 6,
    statFst: 2,
    statMng: 42,
    statInf: 63,
    statGfg: 3,
    statAfg: 4,
    statPlt: 60,
    // — 기타
    loc: "230006P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "자유행성동맹의 반전운동가. 양 웬리의 사관학교 동창이자 절친한 친구인 진 로베르 랍의 연인. 전쟁으로 연인을 잃은 뒤 반전 평화운동에 헌신하며 욥 트류니히트의 선동 정치에 정면으로 맞섰다.",
      },
      {
        code: "En",
        context:
          "A pacifist activist of the Free Planets Alliance and the partner of Jean Robert Lapp, a close friend of Yang Wen-li. After losing her lover to war, she devoted herself to the anti-war peace movement and openly confronted the demagogic politics of Job Trunicht.",
      },
      {
        code: "Jp",
        context:
          "自由惑星同盟の反戦運動家。ヤン・ウェンリーの士官学校同窓で親友のジャン・ロベール・ラップの恋人。戦争で恋人を失った後、反戦平和運動に身を捧げ、ヨブ・トリューニヒトの扇動政治に真っ向から立ち向かった。",
      },
    ],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000372",
    name: [{ code: "Kr", context: "제이시" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000373",
    name: [
      { code: "Kr", context: "제임스 손다이크" },
      { code: "En", context: "James Thorndike" },
      { code: "Jp", context: "ジェイムズ・ソーンダイク" },
    ],
    nick: [
      { code: "Kr", context: "손다이크" },
      { code: "En", context: "Thorndike" },
      { code: "Jp", context: "ソーンダイク" },
    ],
    searchKeys: [
      "제임스",
      "손다이크",
      "토른디크",
      "토르다이크",
      "James",
      "Thorndike",
      "ソーンダイク",
    ],
    birth: "",
    death: "SE|796.",
    // — 성향
    faction: "FPA", // 자유행성동맹
    idea: "100", // 자유민주공화국
    econ: "100", // 자본주의
    brave: "55",
    moral: "88",
    // friend: 반전시민연합 후보로 평화주의 노선의 상징적 인물. 양 웬리/시톨레 등 양심파와 가까운 위치
    friend: "148",
    // — 능력치
    statCmd: 3,
    statCsm: 65,
    statAtt: 2,
    statDef: 3,
    statFst: 2,
    statMng: 45,
    statInf: 60,
    statGfg: 2,
    statAfg: 2,
    statPlt: 38,
    // — 기타
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "테르누젠 보궐선거에 출마한 반전시민연합 후보. 친전파 후보 레이몬도 토리아티와 맞섰으나, 선거 직전 반전시민연합 선거본부에서 발생한 폭탄 테러로 살해당했다. 그의 죽음은 오히려 여론을 반전 쪽으로 돌려, 뒤를 이어 출마한 제시카 에드워즈가 압도적인 득표율로 당선되는 계기가 되었다.",
      },
      {
        code: "En",
        context:
          "Citizens' Anti-War Union candidate in the Terneuzen by-election. He ran against the pro-war candidate Raymond Tolliarty, but was murdered in a bombing of the Citizens' Anti-War Union's campaign office shortly before the election. His death swung public opinion sharply against the war, paving the way for his successor, Jessica Edwards, to win the seat in a landslide.",
      },
      {
        code: "Jp",
        context:
          "テルヌーゼン補欠選挙に出馬した反戦市民連合の候補者。親戦派候補のレイモンド・トリアッティと対立したが、選挙直前に反戦市民連合選挙事務所で発生した爆弾テロにより殺害された。その死はむしろ世論を反戦へと大きく動かし、後を継いで出馬したジェシカ・エドワーズが圧倒的な得票率で当選するきっかけとなった。",
      },
    ],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000374",
    name: [{ code: "Kr", context: "제페르트" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "REH",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000375",
    name: [{ code: "Kr", context: "제프린" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000376",
    name: [{ code: "Kr", context: "조세프 마사릭" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000377",
    name: [
      { code: "Kr", context: "조안 레벨로" },
      { code: "En", context: "João Rebelo" },
      { code: "Jp", context: "ジョアン・レベロ" },
    ],
    nick: [
      { code: "Kr", context: "레벨로" },
      { code: "En", context: "Rebelo" },
      { code: "Jp", context: "レベロ" },
    ],
    searchKeys: [
      "조안",
      "죠안",
      "죤",
      "레벨로",
      "레베로",
      "João",
      "Rebelo",
      "レベロ",
    ],
    birth: "SE|741.09.14",
    death: "SE|800.",
    // — 성향
    faction: "FPA", // 자유행성동맹
    idea: "100", // 자유민주공화국 (기존 80은 오타로 판단되어 수정)
    econ: "100", // 자본주의
    brave: "45", // 냉정
    moral: "82",
    friend: "140",
    // — 능력치
    statCmd: 5,
    statCsm: 75,
    statAtt: 3,
    statDef: 6,
    statFst: 4,
    statMng: 88,
    statInf: 72,
    statGfg: 3,
    statAfg: 3,
    statPlt: 82,
    // — 기타
    loc: "230006P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "자유행성동맹 최고평의회 재정위원장. 양식 있는 화평파 정치인으로 제국령 침공 작전에 반대했다.\n    이후 최고평의회 의장까지 올랐으나 제국의 침공 앞에 속수무책으로 동맹을 잃었다.",
      },
      {
        code: "En",
        context:
          "Secretary of the Treasury of the Free Planets Alliance High Council. \n    A principled peace-faction politician who opposed the Imperial invasion. He later rose to Supreme Chairman but was powerless to prevent the Alliance's fall to the Empire.",
      },
      {
        code: "Jp",
        context:
          "自由惑星同盟最高評議会財政委員長。良識ある和平派政治家で帝国領侵攻作戦に反対した\n    後に最高評議会議長にまで昇り詰めたが、帝国の侵攻を前に為す術なく同盟を失った。",
      },
    ],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000378",
    name: [{ code: "Kr", context: "존 드링커 코프" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000379",
    name: [{ code: "Kr", context: "존 마틴" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000380",
    name: [{ code: "Kr", context: "존넨펠스" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  // https://gineipaedia.com/wiki/Joliot_Frankul
  {
    // — 기본
    code: "CH_000381",
    name: [{ code: "Kr", context: "졸리오 프랑쿠르" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "FPA",
    idea: "40",
    econ: "140",
    brave: "90",
    moral: "70",
    friend: "120",
    // — 능력치
    statCmd: 88,
    statCsm: 72,
    statAtt: 90,
    statDef: 68,
    statFst: 82,
    statMng: 60,
    statInf: 80,
    statGfg: 62,
    statAfg: 88,
    statPlt: 55,
    // — 기타
    loc: "230006P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "시리우스 공화국의 군사 천재. 지구교를 상징하는 지구연방에 맞선 흑색함대의 공동 창설자이자 국방장관. 6,000척으로 2만 척의 적 함대를 격파한 베가 성계 전투 등 수많은 전공을 쌓았으나, 권력욕으로 쿠데타를 일으켰다가 실패해 처형됐다.",
      },
      {
        code: "En",
        context:
          "Military genius of the Sirius Republic and co-founder of the Black Fleet. As Minister of Defense, he crushed a 20,000-strong enemy fleet with only 6,000 ships at the Second Battle of Vega. He later attempted a military coup against Prime Minister Townshent but was executed for his failure.",
      },
      {
        code: "Jp",
        context:
          "シリウス共和国の軍事天才。黒色艦隊の共同創設者にして国防大臣。第二次ベガ星域会戦では6,000隻で2万隻の敵艦隊を撃破するなど多くの戦功を挙げた。しかし権力欲からタウンシェント首相にクーデターを起こし、失敗して処刑された。",
      },
    ],
    // — 직업
    // 함대사령관(JB_M001) LV0
    // 원수(JB_MR001) LV0
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000382",
    name: [{ code: "Kr", context: "좀바르트" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000383",
    name: [{ code: "Kr", context: "주산나 폰 베네뮌데" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000384",
    name: [
      { code: "Kr", context: "지구교 총대주교" },
      { code: "En", context: "Grand Bishop" },
      { code: "Jp", context: "総大主教" },
    ],
    nick: [
      { code: "Kr", context: "총대주교" },
      { code: "En", context: "Grand Bishop" },
      { code: "Jp", context: "総大主教" },
    ],
    searchKeys: ["총대주교", "대주교", "교주", "Grand Bishop", "総大主教"],
    birth: "",
    death: "SE|796.", // 796년 이전 사망(드 빌리에가 사망을 은폐하고 가짜로 대체, CH_000004 참조)
    // — 성향
    faction: "EAT", // 지구교
    idea: "300", // 신정정치(테라이즘)
    econ: "160", // 통제경제
    brave: "20",
    moral: "70", // 광신적이나 본인은 진심으로 신념을 믿는 인물
    friend: "10",
    // — 능력치
    statCmd: 2,
    statCsm: 60,
    statAtt: 1,
    statDef: 2,
    statFst: 1,
    statMng: 50,
    statInf: 78,
    statGfg: 1,
    statAfg: 1,
    statPlt: 70,
    // — 기타
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "지구교의 수장이자 테라(지구)의 실질적 통치자. 광신적이지만 진심으로 테라이즘의 교리를 믿는 인물로, 매일 신도들에게 직접 영적 지도를 베풀었다. 796년 죽음을 맞이했으나, 부주교 드 빌리에가 그 영향력을 우려해 사망 사실을 은폐하고 세뇌시킨 대역(가짜 총대주교, CH_000004)으로 교체했다.",
      },
      {
        code: "En",
        context:
          "Supreme head of the Terraist Church and effective ruler of the planet Terra. Though fanatical, he was a genuine believer in Terraist doctrine and personally provided daily spiritual guidance to devout followers. He died around 796 UC, but Archbishop De Villie, fearing the loss of his influence, concealed his death and replaced him with a brainwashed impostor (the Fake Grand Bishop, CH_000004).",
      },
      {
        code: "Jp",
        context:
          "地球教の首長であり、テラ（地球）の実質的な統治者。狂信的だが本人は心からテライズムの教義を信じ、毎日信徒に直接霊的指導を与えていた。796年頃に死去したが、その影響力の喪失を恐れた副主教ドゥ・ヴィリエが死を隠蔽し、洗脳した替え玉（偽総大主教、CH_000004）に置き換えた。",
      },
    ],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000385",
    name: [{ code: "Kr", context: "지기스문트 폰 골덴바움 1세" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000386",
    name: [{ code: "Kr", context: "지기스문트 폰 골덴바움 2세" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000387",
    name: [{ code: "Kr", context: "지크베르트 자이틀리츠" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  // 지크프리트 키르히아이스
  {
    // — 기본
    code: "CH_000388",
    name: [
      { code: "Kr", context: "지크프리트 키르히아이스" },
      { code: "En", context: "Siegfried Kircheis" },
      { code: "Jp", context: "ジークフリート・キルヒアイス" },
    ],
    nick: [
      { code: "Kr", context: "키르히아이스" },
      { code: "Jp", context: "キルヒアイス" },
    ],
    searchKeys: [],
    birth: "SE|776.03.18",
    death: "SE|796.12.05",
    // — 성향
    faction: "REH",
    idea: "270",
    econ: "180",
    brave: "45",
    moral: "90",
    friend: "148",
    // — 능력치
    statCmd: 93,
    statCsm: 88,
    statAtt: 91,
    statDef: 85,
    statFst: 80,
    statMng: 75,
    statInf: 82,
    statGfg: 78,
    statAfg: 85,
    statPlt: 70,
    // — 기타
    loc: "230058P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "라인하르트 폰 뮤젤의 절친한 친구이자 가장 신뢰하는 부관. 탁월한 전술 능력과 높은 도덕성을 겸비한 인물로, 라인하르트의 야망을 함께 지지하며 제국 최강의 함대를 이끌었다. SE796년 말, 쿠데타 음모에 맞서다 총격을 받고 전사했다.",
      },
      {
        code: "En",
        context:
          "Reinhard's closest friend and most trusted adjutant. Possessing both exceptional tactical ability and high moral character, he stood by Reinhard's ambitions and commanded a powerful fleet. He was shot and killed late in SE796 while opposing a coup attempt.",
      },
      {
        code: "Jp",
        context:
          "ラインハルト・フォン・ミューゼルの親友で最も信頼する副官。卓越した戦術能力と高い道徳性を兼ね備え、ラインハルトの野望を支えながら帝国最強の艦隊を率いた。SE796年末、クーデター陰謀に抗して銃撃を受け戦死した。",
      },
    ],
    // — 직업
    // 함대사령관(JB_M001) LV0
    // 중장(JB_MR004) LV0
    // — 트레잇
  },
  // https://gineipaedia.com/wiki/Chao_Yuiling
  {
    // — 기본
    code: "CH_000389",
    name: [
      { code: "Kr", context: "차오 유이룽" },
      { code: "En", context: "Chao Yuiling" },
      { code: "Jp", context: "チャオ・ユイロン" },
    ],
    nick: [
      { code: "Kr", context: "차오 유이룽" },
      { code: "En", context: "Chao" },
      { code: "Jp", context: "チャオ・ユイロン" },
    ],
    searchKeys: [],
    birth: "AD|2672",
    death: "AD|2706",
    // — 성향
    faction: "SIR",
    idea: "35",
    econ: "140",
    brave: "80",
    moral: "72",
    friend: "125",
    // — 능력치
    statCmd: 42,
    statCsm: 65,
    statAtt: 25,
    statDef: 30,
    statFst: 65,
    statMng: 82,
    statInf: 95,
    statGfg: 18,
    statAfg: 22,
    statPlt: 30,
    // — 기타
    loc: "",
    point: "2000",
    desc: [
      {
        code: "Kr",
        context:
          "시리우스 공화국의 비밀공작국장. 음악 작곡을 전공하던 청년이 가족을 지구연방군에게 잃은 후 반지구 운동에 합류해 탁월한 정보 조작과 선전 공작으로 흑색함대의 승리를 음지에서 지지했다. 전후 고향에 음악학교를 세웠으나, 독재자로 변한 동료에게 처형됐다.",
      },
      {
        code: "En",
        context:
          "Director of Covert Affairs for the Sirius Republic. A music composition student who lost his family to the UEG military and joined the Anti-Earth Movement, he supported the Black Fleet's victories through brilliant intelligence manipulation and propaganda. After the war he founded a music conservatory on his home planet but was executed by a former ally turned dictator.",
      },
      {
        code: "Jp",
        context:
          "シリウス共和国の秘密工作局長。音楽作曲を専攻していた青年が地球連邦軍に家族を奪われ反地球運動に加わり、卓越した情報操作と宣伝工作で黒色艦隊の勝利を陰から支えた。戦後は故郷に音楽学校を設立したが、独裁者へと変貌した元同志によって処刑された。",
      },
    ],
    // — 직업
    // 참모(JB_M003) LV0
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000390",
    name: [{ code: "Kr", context: "차오 퐁" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000391",
    name: [{ code: "Kr", context: "창 타오" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000392",
    name: [{ code: "Kr", context: "체이스" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000393",
    name: [{ code: "Kr", context: "체임버라인" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000394",
    name: [{ code: "Kr", context: "첸" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000395",
    name: [{ code: "Kr", context: "첼벨" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  // 춘우 지엔 Chung Wu-Cheng · チュン・ウー・チェン
  // TODO
  {
    // — 기본
    code: "CH_000396",
    name: [
      { code: "Kr", context: "춘우 지엔" },
      { code: "En", context: "Chung Wu-Cheng" },
      { code: "Jp", context: "チュン・ウー・チェン" },
    ],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [
      "춘우",
      "지엔",
      "순우건",
      "춘",
      "우",
      "첸",
      "츙",
      "쳉",
      "Chung",
      "Wu-Cheng",
    ],
    // SE 761 ~ SE 800. 1. 16.(39세)
    birth: "SE|761.08.08", // 761 확실
    death: "SE|800.01.16", // 800.01 확실
    // — 성향
    // 796년 2월(아스타테 시점) 사관학교 교수로 재직 중 — 군 복귀(798.5)는 시나리오 오버라이드로 처리
    faction: "FPA",
    idea: "100",
    econ: "100",
    brave: "40",
    moral: "78",
    friend: "165",
    // — 능력치 (4시트: 통솔68/운영90/정보84/기동43/공격31/방어80/육전37/공전60 기준 환산)
    statCmd: 68,
    statCsm: 60,
    statAtt: 31,
    statDef: 80,
    statFst: 43,
    statMng: 90,
    statInf: 84,
    statGfg: 37,
    statAfg: 60,
    statPlt: 45,
    // — 기타
    loc: "",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "자유행성동맹의 군인. 798년 5월경까지 사관학교 교수로 재직했다. 이후 군에 복귀해 뷰코크 휘하 참모장으로 란테마리오 회전에 참전했으며, 패전이 확실해지자 뷰코크가 자결하려는 것을 권총의 탄창을 미리 제거해 막았다. 바알라트 조약 체결 후 뷰코크가 퇴역하자 임시로 우주함대사령장관 직을 대행했으며, 이후 레벨로 의장의 요청으로 정식 사령장관이 되어 동맹군 최후의 함대를 지휘했다.",
      },
      {
        code: "En",
        context:
          "An officer of the Free Planets Alliance. He served as a professor at the Officers' Academy until around May 798 UC. He later returned to military service as Chief of Staff under Admiral Bewcock during the Battle of Rantemario, and when defeat became inevitable, he prevented Bewcock from taking his own life by having removed the clip from his weapon beforehand. After the Treaty of Ba'alat, when Bewcock retired, Chung served as interim Space Fleet Commander, and was later asked by Chairman Rebelo to take official command, leading the Alliance's last fleet.",
      },
      {
        code: "Jp",
        context:
          "自由惑星同盟の軍人。798年5月頃まで士官学校教授として在職した。後に軍に復帰しビュコック提督の下で参謀長としてランテマリオ会戦に参戦、敗戦が確実となるとビュコックが自決しようとするのを事前に銃の弾倉を抜いておくことで阻止した。バーラト条約締結後にビュコックが退役すると臨時で宇宙艦隊司令長官代理を務め、後にレベロ議長の要請で正式な司令長官となり同盟軍最後の艦隊を指揮した。",
      },
    ],
    // — 직업
    // 시민(JB_C001) LV0
    // 중령(JB_MR008) LV0
    // — 트레잇
    // 은퇴(군)(TRC_G_012) LV0
    // 참모(TRC_G_014) LV5
  },
  {
    // — 기본
    code: "CH_000397",
    name: [{ code: "Kr", context: "치텐" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000398",
    name: [
      { code: "Kr", context: "카르나프" },
      { code: "En", context: "Carnap" },
    ],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    //은하제국의 군인으로, 최종 계급은 중장.
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000399",
    name: [{ code: "Kr", context: "카르나프" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "REH",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // 정통정부의 내각서기관장. 남작. OVA 성우는 후쿠다 노부야키. 제국군이 침공하자 내각회의에 출석하여 라트부르흐, 렘샤이트와 정통정부의 미래를 논했으나 답을 얻지 못하고 도망쳤다. 은하제국군의 제독 카르나프와는 동명이인.
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000400",
    name: [{ code: "Kr", context: "카르테나" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }], // 카르테너: 자작. 시종차장으로 베네뮌데 후작부인 사건 궁정재판에 참석하였다.
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000401",
    name: [{ code: "Kr", context: "카를로스 실바" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000402",
    name: [{ code: "Kr", context: "카스퍼 린츠" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000403",
    name: [{ code: "Kr", context: "카스퍼 폰 골덴바움" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000404",
    name: [{ code: "Kr", context: "카이트" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000405",
    name: [{ code: "Kr", context: "카테로제 폰 크로이처" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000406",
    name: [{ code: "Kr", context: "카테리네 켓헨 폰 페크니츠" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000407",
    name: [{ code: "Kr", context: "카퍼필드" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000408",
    name: [
      { code: "Kr", context: "카플랑" },
      { code: "En", context: "Kaplan" },
      { code: "Jp", context: "カプラン" },
    ],
    nick: [
      { code: "Kr", context: "카플랑" },
      { code: "En", context: "Kaplan" },
      { code: "Jp", context: "カプラン" },
    ],
    searchKeys: [],
    birth: "SE|750.11.03",
    death: "",
    // — 성향
    faction: "FPA", // 자유행성동맹
    idea: "100", // 자유민주공화국
    econ: "100", // 자본주의
    brave: "58", // 일반
    moral: "65",
    friend: "268",
    // — 능력치
    statCmd: 3,
    statCsm: 55,
    statAtt: 2,
    statDef: 4,
    statFst: 2,
    statMng: 70,
    statInf: 62,
    statGfg: 2,
    statAfg: 2,
    statPlt: 65,
    // — 기타
    loc: "230006P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "자유행성동맹 최고평의회 서기. 평의회 행정 및 의사록 관리를 담당하는 실무형 관료.",
      },
      {
        code: "En",
        context:
          "Chief Clerk of the Free Planets Alliance High Council. A practical bureaucrat responsible for council administration and the management of minutes.",
      },
      {
        code: "Jp",
        context:
          "自由惑星同盟最高評議会書記。評議会の行政および議事録管理を担う実務型官僚。",
      },
    ],
    // — 직업
    // — 트레잇
  },
  // 칼 구스타프 켐프 Karl Gustav Kempff ·カール・グスタフ・ケンプ
  // TODO
  {
    // — 기본
    code: "CH_000409",
    name: [
      { code: "Kr", context: "칼 구스타프 켐프" },
      { code: "En", context: "Karl Gustav Kempff" },
      { code: "Jp", context: "カール・グスタフ・ケンプ" },
    ],
    nick: [
      { code: "Kr", context: "켐프" },
      { code: "En", context: "Kempff" },
      { code: "Jp", context: "ケンプ" },
    ],
    searchKeys: ["켄프"],
    // SE 762. 8. 19.~ SE 798. 5. ?? (36세)
    birth: "SE|762.08.19",
    death: "SE|798.05.07",
    // — 성향
    faction: "REH",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    // 4 소장 통솔 90 운영 20 정보 36 기동 84공격 96 방어 78 육전 80 공전 100
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 100,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // 소장 : 군사직
    // 평민 : 제국 시민
    // — 트레잇
    // 환상의 격추왕(고유) : 함대기 타입의 공격 시, 피해량 + 15%
  },
  {
    // — 기본
    code: "CH_000410",
    name: [{ code: "Kr", context: "칼 로베르토 슈타인메츠" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "REH",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000411",
    name: [{ code: "Kr", context: "칼 마티아스 폰 포르겐" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000412",
    name: [{ code: "Kr", context: "칼 브라케" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  // 칼 에두아르트 바이어라인 Karl Edward Bayerlein · カール・エドワルド・バイエルライン
  {
    // — 기본
    code: "CH_000413",
    name: [{ code: "Kr", context: "칼 에두아르트 바이어라인" }],
    nick: [{ code: "Kr", context: "바이어라인" }],
    searchKeys: ["에드왈드", "바이엘라인", "바이에르라인"],
    birth: "",
    death: "",
    // — 성향
    faction: "REH",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000414",
    name: [{ code: "Kr", context: "칼 폰 데어 데켄" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000415",
    name: [{ code: "Kr", context: "칼 폰 라이프아이젠" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000416",
    name: [{ code: "Kr", context: "칼 폰 클라인겔트" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000417",
    name: [{ code: "Kr", context: "칼 프란츠 켐프" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000418",
    name: [{ code: "Kr", context: "칼 하인츠 켈트링" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000419",
    name: [{ code: "Kr", context: "칼레 윌록" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  // https://gineipaedia.com/wiki/Carle_Palmgren
  {
    // — 기본
    code: "CH_000420",
    name: [{ code: "Kr", context: "칼레 팔름그렌" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "FPA",
    idea: "25",
    econ: "140",
    brave: "80",
    moral: "85",
    friend: "120",
    // — 능력치
    statCmd: 62,
    statCsm: 88,
    statAtt: 30,
    statDef: 42,
    statFst: 40,
    statMng: 85,
    statInf: 80,
    statGfg: 20,
    statAfg: 35,
    statPlt: 35,
    // — 기타
    loc: "230006P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          '시리우스 공화국 초대 수상이자 지구-시리우스 전쟁의 영웅. 카리스마 넘치는 지도자로 식민지 세계를 규합해 지구연방에 맞선 반지구 운동을 이끌었다. 안정적인 민주 정부를 꿈꿨으나 "앞으로 5년만 더"를 바라던 중 심장마비로 급서해, 그 죽음이 이후 3세기에 걸친 혼란의 씨앗이 됐다.',
      },
      {
        code: "En",
        context:
          'First Premier of the Sirius Republic and hero of the Earth–Sirius War. A charismatic visionary who united the colony worlds against the Earth United Government, he dreamed of building a stable democracy but died of a sudden heart attack while lamenting he needed "five more years" — a death whose consequences echoed across three centuries.',
      },
      {
        code: "Jp",
        context:
          "シリウス共和国初代首相にして地球・シリウス戦争の英雄。カリスマ的な指導者として植民地世界をまとめ地球連邦に抗する反地球運動を牽引した。安定した民主政府を夢見たが、「あと5年の命があれば」と嘆きながら心臓発作で急死し、その死が以後3世紀にわたる混乱の種となった。",
      },
    ],
    // — 직업
    // 최고평의회의장(JB_F001) LV0
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000421",
    name: [{ code: "Kr", context: "칼텐보른" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000422",
    name: [{ code: "Kr", context: "캄후버" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000423",
    name: [{ code: "Kr", context: "캐봇" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000424",
    name: [{ code: "Kr", context: "코널리" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000425",
    name: [{ code: "Kr", context: "코네프" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000426",
    name: [{ code: "Kr", context: "코넬 영블러드" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000427",
    name: [
      { code: "Kr", context: "코넬리아 윈저" },
      { code: "En", context: "Cornelia Windsor" },
      { code: "Jp", context: "コーネリア・ウィンザー" },
    ],
    nick: [
      { code: "Kr", context: "윈저" },
      { code: "En", context: "Windsor" },
      { code: "Jp", context: "ウィンザー" },
    ],
    searchKeys: [],
    birth: "SE|745.02.17",
    death: "",
    // — 성향
    faction: "FPA", // 자유행성동맹
    idea: "110", // 온건군주제
    econ: "100", // 자본주의
    brave: "60", // 일반
    moral: "52",
    friend: "112",
    // — 능력치
    statCmd: 4,
    statCsm: 68,
    statAtt: 3,
    statDef: 5,
    statFst: 3,
    statMng: 75,
    statInf: 65,
    statGfg: 3,
    statAfg: 3,
    statPlt: 72,
    // — 기타
    loc: "230006P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "자유행성동맹 최고평의회 정보교통위원장. 뇌물수수 혐의로 실각했다. 샌포드 내각의 부패를 상징하는 인물 중 하나.",
      },
      {
        code: "En",
        context:
          "Secretary of Transportation of the Free Planets Alliance High Council. She was forced out of office on bribery charges, becoming one of the symbols of the Sanford Administration's corruption.",
      },
      {
        code: "Jp",
        context:
          "自由惑星同盟最高評議会情報交通委員長。収賄容疑で失脚した。サンフォード内閣の腐敗を象徴する人物の一人。",
      },
    ],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000428",
    name: [{ code: "Kr", context: "코란듀" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000429",
    name: [
      { code: "Kr", context: "코르넬리아스 루츠" },
      { code: "En", context: "Cornelius Lutz" },
      { code: "Jp", context: "コルネリアス・ルッツ" },
    ],
    nick: [
      { code: "Kr", context: "루츠" },
      { code: "En", context: "Lutz" },
      { code: "Jp", context: "ルッツ" },
    ],
    searchKeys: [],
    birth: "SE|764.03.19",
    death: "SE|800.07.14",
    // — 성향
    faction: "REH", // 은하제국
    idea: "240", // 전제군주제
    econ: "140", // 혼합경제
    brave: "80",
    moral: "82",
    friend: "145",
    // — 능력치
    statCmd: 80,
    statCsm: 78,
    statAtt: 75,
    statDef: 82,
    statFst: 72,
    statMng: 75,
    statInf: 70,
    statGfg: 72,
    statAfg: 78,
    statPlt: 72,
    // — 기타
    loc: "230058P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "라인하르트 폰 뮤젤 제독단의 균형형 제독. 이젤론 요새 사령관을 역임하며 요새 방어의 핵심을 맡았으나, 양 웬리의 책략에 속아 요새를 내주는 실책을 범했다. 우루바시에서 라인하르트를 노린 암살 기도 현장에서 전사했다.",
      },
      {
        code: "En",
        context:
          "A well-rounded admiral in Reinhard's admiralty who served as commander of Iserlohn Fortress. Despite being a capable commander, he was deceived by Yang Wen-li's stratagem and lost the fortress. He died at Uruvasi during a large-scale assassination attempt targeting Reinhard.",
      },
      {
        code: "Jp",
        context:
          "ラインハルト提督団のバランス型提督。イゼルローン要塞司令官を歴任し要塞防衛の中核を担ったが、ヤン・ウェンリーの策略に嵌まり要塞を奪われる失態を犯した。ウルヴァシーでラインハルトを狙った暗殺計画の現場で戦死した。",
      },
    ],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000430",
    name: [{ code: "Kr", context: "코르넬리아스 폰 골덴바움 1세" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000431",
    name: [{ code: "Kr", context: "코르넬리아스 폰 골덴바움 2세" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000432",
    name: [{ code: "Kr", context: "코르프트" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000433",
    name: [{ code: "Kr", context: "코젤" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000434",
    name: [{ code: "Kr", context: "콘라드 하인츠 폰 로엔그람" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000435",
    name: [{ code: "Kr", context: "콘라트 린저" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000436",
    name: [{ code: "Kr", context: "콘라트 폰 모데르" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000437",
    name: [{ code: "Kr", context: "콜드웰" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000438",
    name: [{ code: "Kr", context: "콜린즈" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000439",
    name: [{ code: "Kr", context: "콜뷔츠" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000440",
    name: [{ code: "Kr", context: "쿠르트" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000441",
    name: [{ code: "Kr", context: "쿠르트 징푸버" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000442",
    name: [{ code: "Kr", context: "쿠를리히" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000443",
    name: [{ code: "Kr", context: "쿠브르슬리" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000444",
    name: [{ code: "Kr", context: "쿨리히" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000445",
    name: [{ code: "Kr", context: "크라이머" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000446",
    name: [{ code: "Kr", context: "크라이버" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000447",
    name: [{ code: "Kr", context: "크라젠" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000448",
    name: [{ code: "Kr", context: "크라프" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000449",
    name: [{ code: "Kr", context: "크래프트" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000450",
    name: [{ code: "Kr", context: "크레랑보" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000451",
    name: [{ code: "Kr", context: "크로네거" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000452",
    name: [{ code: "Kr", context: "크루젠슈테른" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000453",
    name: [{ code: "Kr", context: "크리스찬" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  // https://gineipaedia.com/wiki/Christpher_Wood
  {
    // — 기본
    code: "CH_000454",
    name: [{ code: "Kr", context: "크리스토퍼 우드" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "FPA",
    idea: "45",
    econ: "140",
    brave: "82",
    moral: "78",
    friend: "120",
    // — 능력치
    statCmd: 82,
    statCsm: 75,
    statAtt: 78,
    statDef: 72,
    statFst: 75,
    statMng: 65,
    statInf: 70,
    statGfg: 58,
    statAfg: 78,
    statPlt: 48,
    // — 기타
    loc: "230006P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          '은하연방 함대 제독. 미쉘 퀴프렌과 함께 특수 해적 토벌 부대를 지휘하여 은하계를 어지럽히던 해적 세력을 대부분 소탕했다. "유능한 적과 무능한 아군을 동시에 상대하며 싸웠다"는 말을 남긴 것으로 유명하며, 전역 후 의원이 되어 반부패 운동에 앞장섰다. 훗날 루돌프 폰 골덴바움이 해적을 소탕했을 때 그의 환생으로 불릴 만큼 영웅으로 칭송받는다.',
      },
      {
        code: "En",
        context:
          'Admiral of the Galactic Federation. Together with Michel Cuffren, he commanded a special anti-piracy task force that eliminated most of the pirate threat destabilizing the galaxy. Famous for his remark "I had competent enemies in front of me and incompetent allies behind me, and had to fight both at once," he later entered parliament as an anti-corruption advocate and became so legendary that Rudolf von Goldenbaum was called his reincarnation.',
      },
      {
        code: "Jp",
        context:
          "銀河連邦の艦隊提督。ミシェル・キュフランとともに特別海賊討伐艦隊を指揮し、銀河系を乱す海賊勢力のほとんどを掃討した。「有能な敵と無能な味方の双方と戦わねばならなかった」という言葉で知られ、退役後は議会に転身して反腐敗運動を率いた。後にルドルフ・フォン・ゴールデンバウムが海賊を討伐した際、彼の生まれ変わりと称されるほどの英雄として語り継がれている。",
      },
    ],
    // — 직업
    // 함대사령관(JB_M001) LV0
    // 원수(JB_MR001) LV0
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000455",
    name: [{ code: "Kr", context: "크리스토프 디켈" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000456",
    name: [{ code: "Kr", context: "크리스토프 폰 미켈젠" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000457",
    name: [{ code: "Kr", context: "크리스토프 폰 바젤" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000458",
    name: [{ code: "Kr", context: "크리스토프 폰 쾨펜힐러" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000459",
    name: [{ code: "Kr", context: "크리스티네 폰 리텐하임" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000460",
    name: [{ code: "Kr", context: "클라라" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000461",
    name: [{ code: "Kr", context: "클라리벨 폰 뮈젤" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  // 클라우스 폰 리히텐라데 Klaus von Lichtenlade · クラウス・フォン・リヒテンラーデ
  {
    // — 기본
    code: "CH_000462",
    name: [
      { code: "Kr", context: "클라우스 폰 리히텐라데" },
      { code: "En", context: "Klaus von Lichtenlade" },
      { code: "Jp", context: "クラウス・フォン・リヒテンラーデ" },
    ],
    nick: [
      { code: "Kr", context: "리히텐라데" },
      { code: "En", context: "Lichtenlade" },
      { code: "Jp", context: "リヒテンラーデ" },
    ],
    searchKeys: ["클라우스", "리히텐라데"],
    birth: "SE|721.11.28", // 721 확정
    death: "SE|797.09.18", // 797 확정 09.09 키르히아이스 사망 이후 근시일내 (76세)
    // — 성향
    faction: "REH", // 은하제국
    idea: "270", // 전제군주제
    econ: "140", // 혼합경제
    brave: "25", // 신중
    moral: "55",
    friend: "100",
    // — 능력치
    statCmd: 10,
    statCsm: 68,
    statAtt: 4,
    statDef: 16,
    statFst: 6,
    statMng: 100,
    statInf: 82,
    statGfg: 17,
    statAfg: 9,
    statPlt: 90,
    // — 기타
    loc: "230058P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "프리드리히 4세 치하 제국재상. 궁정 귀족 출신으로 군사력 없이 정치력만으로 권세를 유지했다. 프리드리히 4세 붕어 후 라인하르트와 손잡고 에르빈 요제프 2세를 옹립했으나, 립슈타트 전역 종전 후 라인하르트에게 체포되어 자결했다.",
      },
      {
        code: "En",
        context:
          "Imperial Prime Minister under Kaiser Friedrich IV. A court noble who maintained power through political acumen alone, with no military force of his own. After Friedrich IV's death he allied with Reinhard to place Erwin Josef II on the throne, but was arrested by Reinhard's forces after the Lippstadt Rebellion and forced to commit suicide.",
      },
      {
        code: "Jp",
        context:
          "フリードリヒ4世治下の帝国宰相。宮廷貴族出身で軍事力なく政治力のみで権勢を保った。フリードリヒ4世崩御後、ラインハルトと組んでエルウィン・ヨーゼフ2世を擁立したが、リップシュタット戦役終結後にラインハルトに逮捕され自決した。",
      },
    ],
    // 트레잇

    // 직업
    // 제국재상 대리 : 재상과 동일한 트레잇에 명칭이 약간 다름
    // 후작
    // — 직업
    // 제국재상(JB_R002) LV0
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000463",
    name: [{ code: "Kr", context: "클라이스트" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000464",
    name: [{ code: "Kr", context: "클라인겔트" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000465",
    name: [{ code: "Kr", context: "클레멘테" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000466",
    name: [{ code: "Kr", context: "클로드 몽테이유" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000467",
    name: [{ code: "Kr", context: "키르만제프" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000468",
    name: [{ code: "Kr", context: "킹스톤" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000469",
    name: [{ code: "Kr", context: "테레제 바그너" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000470",
    name: [{ code: "Kr", context: "테오도르 폰 뤼케" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000471",
    name: [{ code: "Kr", context: "토니오" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000472",
    name: [{ code: "Kr", context: "토드" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000473",
    name: [{ code: "Kr", context: "토마 폰 슈토크하우젠" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000474",
    name: [{ code: "Kr", context: "트래버스" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000475",
    name: [{ code: "Kr", context: "파르크비츠" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000476",
    name: [{ code: "Kr", context: "파른지츠" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000477",
    name: [{ code: "Kr", context: "파센하임" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  // 파스톨레 Pastolle · パストーレ
  {
    // — 기본
    code: "CH_000478",
    name: [
      { code: "Kr", context: "파스톨레" },
      { code: "En", context: "Pastolle" },
      { code: "Jp", context: "パストーレ" },
    ],
    nick: [
      { code: "Kr", context: "파스톨레" },
      { code: "En", context: "Pastolle" },
      { code: "Jp", context: "パストーレ" },
    ],
    searchKeys: ["파스토레", "파스트레이", "파스톨"],
    birth: "",
    death: "SE|796.02.11",
    // — 성향
    faction: "FPA",
    idea: "100",
    econ: "140",
    brave: "65",
    moral: "68",
    friend: "110",
    // — 능력치
    // 무어(통솔68/공격78)·파에타(통솔65/공격60)와 동급의 맹장군이되,
    // "국지전 돌파에 가장 능숙"하다는 평가를 반영해 셋 중 가장 높은 수치로 책정
    statCmd: 70,
    statCsm: 55,
    statAtt: 80,
    statDef: 66,
    statFst: 62,
    statMng: 45,
    statInf: 48,
    statGfg: 56,
    statAfg: 78,
    statPlt: 35,
    // — 기타
    loc: "230006P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "자유행성동맹 제4함대 사령관. 광범위한 영역에서의 전략을 생각하고 읽는 능력은 부족하나, 국지적 단위에서의 공방과 돌파에는 매우 능숙한 전술가이다.\n    무수한 전역에서 선봉을 맡아 많은 성과를 거둔 맹장으로 동맹군 내에서도 많은 신뢰를 받고 있다.",
      },
    ],
    // — 직업
    // 함대사령관(JB_M001) LV0
    // 중장(JB_MR004) LV0
    // — 트레잇
  },
  // 파에타 Paeta · パエッタ
  {
    // — 기본
    code: "CH_000479",
    name: [
      { code: "Kr", context: "파에타" },
      { code: "En", context: "Paeta" },
      { code: "Jp", context: "パエッタ" },
    ],
    nick: [
      { code: "Kr", context: "파에타" },
      { code: "En", context: "Paeta" },
      { code: "Jp", context: "パエッタ" },
    ],
    searchKeys: [],
    birth: "",
    death: "SE|801.04.16", // 라그풀 교도소 폭동사건에 사망 확실
    // — 성향
    faction: "FPA",
    idea: "100",
    econ: "140",
    brave: "65",
    moral: "72",
    friend: "115",
    /** 능력치
     *  4 통솔 83 공격 82 방어 79 기동 72 운영 56 정보 58 육전 60 공전 80
     *  6 통솔 52 지휘 67 공격 71 방어 72 기동 58 운영 39 정보 52
     */
    statCmd: 65,
    statCsm: 58,
    statAtt: 60,
    statDef: 63,
    statFst: 55,
    statMng: 52,
    statInf: 55,
    statGfg: 58,
    statAfg: 62,
    statPlt: 45,
    // — 기타
    loc: "230006P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "자유행성동맹 소속의 사령관. \n    역전의 용장이자 유능한 전술가라는 평을 들었지만 다소 독선적이고 성급한 성격을 가지고 있다.",
      },
    ],
    // — 직업
    // 함대사령관(JB_M001) LV0
    // 중장(JB_MR004) LV0
    // — 트레잇
    // 원칙고수(TRC_U_000479) LV0
    // 현실부정(TRC_G_001) LV0
    // 독선(TRC_G_004) LV0
    // 행운(TRC_G_006) LV0
  },
  {
    // — 기본
    code: "CH_000480",
    name: [{ code: "Kr", context: "파우만" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000481",
    name: [
      { code: "Kr", context: "파울 폰 오베르슈타인" },
      { code: "En", context: "Paul von Oberstein" },
      { code: "Jp", context: "パウル・フォン・オーベルシュタイン" },
    ],
    nick: [
      { code: "Kr", context: "오베르슈타인" },
      { code: "En", context: "Oberstein" },
      { code: "Jp", context: "オーベルシュタイン" },
    ],
    searchKeys: [
      "파울",
      "오베르슈타인",
      "오버슈타인",
      "Paul",
      "Oberstein",
      "パウル",
      "オーベルシュタイン",
    ],
    birth: "SE|761.03.17",
    death: "SE|801.07.26",
    // — 성향
    faction: "REH", // 은하제국
    idea: "240", // 전제군주제
    econ: "140", // 혼합경제
    brave: "45",
    moral: "60",
    friend: "40",
    // — 능력치
    statCmd: 55,
    statCsm: 60,
    statAtt: 45,
    statDef: 50,
    statFst: 40,
    statMng: 98,
    statInf: 95,
    statGfg: 30,
    statAfg: 35,
    statPlt: 90,
    // — 기타
    loc: "230058P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "라인하르트 폰 뮤젤의 핵심 참모. 의안을 가진 냉혹한 전략가로, 목적을 위해서라면 수단을 가리지 않는 철저한 합리주의자다. 골덴바움 왕조 타도와 로엔그람 체제 확립을 위해 암약하며, 제국군 내에서도 기피 대상이지만 라인하르트에게는 없어서는 안 될 존재다.",
      },
      {
        code: "En",
        context:
          "The core strategist of Reinhard von Lohengramm. A ruthless rationalist with artificial eyes who stops at nothing to achieve his ends. He works in the shadows to bring down the Goldenbaum Dynasty and establish the Lohengramm regime — feared and despised within the Imperial military, yet indispensable to Reinhard.",
      },
      {
        code: "Jp",
        context:
          "ラインハルト・フォン・ミューゼルの中枢参謀。義眼を持つ冷酷な戦略家で、目的のためには手段を選ばない徹底した合理主義者。ゴールデンバウム王朝打倒とローエングラム体制確立のために暗躍し、帝国軍内でも忌避される存在だが、ラインハルトには欠かせない人物である。",
      },
    ],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000482",
    name: [{ code: "Kr", context: "파울루스" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000483",
    name: [{ code: "Kr", context: "파이펠" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000484",
    name: [{ code: "Kr", context: "파커스트" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000485",
    name: [{ code: "Kr", context: "파트릭켄" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000486",
    name: [{ code: "Kr", context: "팔켄호른" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000487",
    name: [{ code: "Kr", context: "팡 추링" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000488",
    name: [{ code: "Kr", context: "패트릭 아텐보로" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000489",
    name: [{ code: "Kr", context: "페간" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000490",
    name: [{ code: "Kr", context: "페르난데스" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000491",
    name: [{ code: "Kr", context: "페르데베르트" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000492",
    name: [{ code: "Kr", context: "페이건" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000493",
    name: [{ code: "Kr", context: "펠릭스 미터마이어" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  // 포겔 Fogel ・ フォーゲル
  {
    // — 기본
    code: "CH_000494",
    name: [
      { code: "Kr", context: "포겔" },
      { code: "En", context: "Fogel" },
      { code: "Jp", context: "フォーゲル" },
    ],
    nick: [
      { code: "Kr", context: "포겔" },
      { code: "En", context: "Fogel" },
      { code: "Jp", context: "フォーゲル" },
    ],
    birth: "",
    death: "",
    searchKeys: ["포겔"],
    // — 성향
    // 라인하르트의 각개격파 작전을 비웃고 소극적으로 행동해 아스타테에서 진급하지 못함.
    // 배속 초기부터 악감정을 보인 점에 근거해 립슈타트 전역 당시 귀족연합 가담으로 설계 (idea/econ 상향, friend 하향)
    faction: "REH",
    idea: "280",
    econ: "190",
    brave: "55",
    moral: "48",
    friend: "150",
    // — 능력치
    statCmd: 62,
    statCsm: 55,
    statAtt: 65,
    statDef: 60,
    statFst: 60,
    statMng: 48,
    statInf: 50,
    statGfg: 55,
    statAfg: 65,
    statPlt: 38,
    // — 기타
    loc: "230058P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "은하제국의 함대 지휘관. 아스타테 회전에서 라인하르트 함대의 분함대 사령관으로 참전했다.",
      },
    ],
    // — 직업
    // 소장(JB_MR005) LV0
    // — 트레잇
    // 독선(TRC_G_004) LV0
  },
  {
    // — 기본
    code: "CH_000495",
    name: [{ code: "Kr", context: "폰 로이엔탈" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000496",
    name: [{ code: "Kr", context: "폰 벤드링" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000497",
    name: [{ code: "Kr", context: "폰 켈트링" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000498",
    name: [{ code: "Kr", context: "폰 헤르크스하이머" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000499",
    name: [{ code: "Kr", context: "폴카 악셀 폰 뷔로" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000500",
    name: [{ code: "Kr", context: "폴커" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000501",
    name: [{ code: "Kr", context: "표도르 파트리체프" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000502",
    name: [{ code: "Kr", context: "푸세네거" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000503",
    name: [{ code: "Kr", context: "프란체시쿠 롬스키" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000504",
    name: [{ code: "Kr", context: "프란츠 발리먼트" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000505",
    name: [
      { code: "Kr", context: "프란츠 폰 마린도르프" },
      { code: "En", context: "Franz von Mariendorf" },
      { code: "Jp", context: "フランツ・フォン・マリーンドルフ" },
    ],
    nick: [
      { code: "Kr", context: "마린도르프" },
      { code: "En", context: "Mariendorf" },
      { code: "Jp", context: "マリーンドルフ" },
    ],
    searchKeys: [],
    birth: "SE|742.08.11",
    death: "",
    // — 성향
    faction: "REH", // 은하제국
    idea: "240", // 전제군주제
    econ: "140", // 혼합경제
    brave: "25", // 신중
    moral: "82",
    friend: "145",
    // — 능력치
    statCmd: 8,
    statCsm: 65,
    statAtt: 3,
    statDef: 6,
    statFst: 3,
    statMng: 85,
    statInf: 72,
    statGfg: 3,
    statAfg: 3,
    statPlt: 78,
    // — 기타
    loc: "230058P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "마린도르프 백작가의 당주이자 힐데가르트 폰 마린도르프의 부친. 딸의 판단을 신뢰하여 라인하르트 폰 뮤젤을 지지하는 결단을 내렸으며, 제국 내 온건한 귀족 세력의 대표적 인물이다.",
      },
      {
        code: "En",
        context:
          "Count of the Mariendorf family and father of Hildegard von Mariendorf. Trusting his daughter's judgment, he made the pivotal decision to support Reinhard von Lohengramm, making him a representative figure of the moderate noble faction within the Empire.",
      },
      {
        code: "Jp",
        context:
          "マリーンドルフ伯爵家の当主にしてヒルデガルド・フォン・マリーンドルフの父。娘の判断を信頼してラインハルト・フォン・ミューゼルを支持する決断を下し、帝国内の穏健貴族勢力を代表する人物。",
      },
    ],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000506",
    name: [
      { code: "Kr", context: "프레데리카 그린힐" },
      { code: "En", context: "Frederica Greenhill" },
      { code: "Jp", context: "フレデリカ・グリーンヒル" },
    ],
    nick: [
      { code: "Kr", context: "프레데리카" },
      { code: "En", context: "Frederica" },
      { code: "Jp", context: "フレデリカ" },
    ],
    searchKeys: [],
    birth: "SE|774.09.03",
    death: "",
    // — 성향
    faction: "FPA", // 자유행성동맹
    idea: "100", // 자유민주공화국
    econ: "100", // 시장경제
    brave: "80",
    moral: "90",
    friend: "160",
    // — 능력치
    statCmd: 45,
    statCsm: 90,
    statAtt: 40,
    statDef: 55,
    statFst: 50,
    statMng: 82,
    statInf: 95,
    statGfg: 35,
    statAfg: 40,
    statPlt: 85,
    // — 기타
    loc: "230006P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "양 웬리의 부관이자 아내. 사관학교 차석 졸업의 수재로 완전 기억력을 지녀 양 함대 운영의 핵심 역할을 담당했다. 양의 전략을 누구보다 깊이 이해하며 후에 이젤론 공화국의 정신적 지주가 된다.",
      },
      {
        code: "En",
        context:
          "Yang Wen-li's adjutant and wife. A brilliant officer who graduated second from the Alliance Academy, she possesses eidetic memory and served as a cornerstone of the 13th Fleet's operations. Understanding Yang's strategies more deeply than anyone, she later became a spiritual pillar of the Iserlohn Republic.",
      },
      {
        code: "Jp",
        context:
          "ヤン・ウェンリーの副官にして妻。士官学校次席卒業の秀才で完全記憶力を持ち、ヤン艦隊運営の中核を担った。ヤンの戦略を誰よりも深く理解し、後にイゼルローン共和国の精神的支柱となる。",
      },
    ],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000507",
    name: [{ code: "Kr", context: "프레드릭 재스퍼" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000508",
    name: [{ code: "Kr", context: "프레벨" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000509",
    name: [{ code: "Kr", context: "프레스부르크" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000510",
    name: [{ code: "Kr", context: "프로리안" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000511",
    name: [{ code: "Kr", context: "프리드리히 폰 골덴바움 1세" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000512",
    name: [{ code: "Kr", context: "프리드리히 폰 골덴바움 2세" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000513",
    name: [{ code: "Kr", context: "프리드리히 폰 골덴바움 3세" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000514",
    name: [
      { code: "Kr", context: "프리드리히 폰 골덴바움 4세" },
      { code: "En", context: "Friedrich von Goldenbaum IV" },
      { code: "Jp", context: "フリードリヒ・フォン・ゴールデンバウム4世" },
    ],
    nick: [
      { code: "Kr", context: "프리드리히 4세" },
      { code: "En", context: "Friedrich IV" },
      { code: "Jp", context: "フリードリヒ4世" },
    ],
    searchKeys: [],
    birth: "SE|733.06.18",
    death: "SE|796.10.12",
    // — 성향
    faction: "REH", // 은하제국
    idea: "270", // 전제군주제
    econ: "140", // 혼합경제
    brave: "25", // 신중
    moral: "45",
    friend: "95",
    // — 능력치
    statCmd: 2,
    statCsm: 72,
    statAtt: 2,
    statDef: 3,
    statFst: 2,
    statMng: 55,
    statInf: 48,
    statGfg: 2,
    statAfg: 2,
    statPlt: 65,
    // — 기타
    loc: "230058P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "골덴바움 왕조 제36대 황제. '재의 황제'로 불리는 무능한 군주로 정치에 무관심하고 향락에 빠진 채 제국을 방치했다. 안네로제 폰 그뤼네발트를 후궁으로 들이며 라인하르트의 야망에 불을 지폈다. 796년 심장마비로 붕어하며 골덴바움 왕조 몰락의 도화선이 됐다.",
      },
      {
        code: "En",
        context:
          "The 36th Kaiser of the Goldenbaum Dynasty, known as the \"Kaiser of the Ashes.\" An indolent ruler who showed little interest in governance and allowed the Empire to drift while pursuing personal pleasure. By taking Annerose von Grünewald as his concubine, he ignited Reinhard von Lohengramm's ambitions. His death from a heart attack in 796 UC set off the chain of events that led to the dynasty's collapse.",
      },
      {
        code: "Jp",
        context:
          "ゴールデンバウム王朝第36代皇帝。「灰燼の皇帝」と呼ばれる無能な君主で、政治に無関心のまま享楽に耽り帝国を放置した。アンネローゼ・フォン・グリューネワルトを後宮に迎えることでラインハルトの野望に火を付けた。796年の心臓発作による崩御がゴールデンバウム王朝崩壊の導火線となった。",
      },
    ],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000515",
    name: [
      { code: "Kr", context: "프리츠 요제프 비텐펠트" },
      { code: "En", context: "Fritz Joseph Bittenfeld" },
      { code: "Jp", context: "フリッツ・ヨーゼフ・ビッテンフェルト" },
    ],
    nick: [
      { code: "Kr", context: "비텐펠트" },
      { code: "En", context: "Bittenfeld" },
      { code: "Jp", context: "ビッテンフェルト" },
    ],
    searchKeys: [],
    birth: "SE|767.09.11",
    death: "",
    // — 성향
    faction: "REH", // 은하제국
    idea: "240", // 전제군주제
    econ: "140", // 혼합경제
    brave: "95",
    moral: "78",
    friend: "140",
    // — 능력치
    statCmd: 82,
    statCsm: 78,
    statAtt: 97,
    statDef: 55,
    statFst: 90,
    statMng: 50,
    statInf: 45,
    statGfg: 85,
    statAfg: 88,
    statPlt: 52,
    // — 기타
    loc: "230058P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "흑색창기병대를 이끄는 제국군 최강의 공격형 제독. 불 같은 성격과 압도적인 돌격전술로 유명하며, 사령관으로서의 신중함보다는 전장의 기세를 중시한다. 무모함으로 인해 수차례 위기를 자초하기도 하지만, 그 화력과 돌진력은 제국군 내에서도 독보적이다.",
      },
      {
        code: "En",
        context:
          "Commander of the Black Lancers, the most powerful offensive fleet in the Imperial Navy. Renowned for his fiery temperament and overwhelming assault tactics, he values battlefield momentum over the caution expected of a commander. His recklessness has brought him close to court-martial more than once, yet his firepower and charge are unmatched in the Empire.",
      },
      {
        code: "Jp",
        context:
          "黒色槍騎兵隊を率いる帝国軍最強の攻撃型提督。激しい気性と圧倒的な突撃戦術で知られ、指揮官としての慎重さより戦場の勢いを重んじる。無謀さから幾度も危機を招くが、その火力と突進力は帝国軍内でも独歩の存在である。",
      },
    ],
    // — 직업
    // — 트레잇
  },
  // 플레겔 Flegel · フレーゲル
  {
    // — 기본
    code: "CH_000516",
    name: [
      { code: "Kr", context: "플레겔" },
      { code: "En", context: "Flegel" },
      { code: "Jp", context: "フレーゲル" },
    ],
    nick: [
      { code: "Kr", context: "플레겔" },
      { code: "En", context: "Flegel" },
      { code: "Jp", context: "フレーゲル" },
    ],
    searchKeys: ["플레겔", "프레겔"],
    birth: "SE|771.01.07",
    death: "SE|797.09.23",
    // — 성향
    // 문벌귀족 출신 정치군인. 군사공작(원작자료 8000) 비중이 매우 높은 모략형 캐릭터로 설계
    faction: "REH",
    idea: "270",
    econ: "150",
    brave: "30",
    moral: "35",
    friend: "120",
    // — 능력치
    // 4EX(통솔19/운영8/정보36/공전39)·6(통솔37/지휘41/공격33/방어50)·5(통솔34/돌진성향) 자료를 종합해
    // "지휘 전반은 평범~저조하나 정보/내정공작에 특화"된 수치로 환산
    statCmd: 35,
    statCsm: 30,
    statAtt: 33,
    statDef: 48,
    statFst: 38,
    statMng: 42,
    statInf: 70,
    statGfg: 28,
    statAfg: 36,
    statPlt: 65,
    // — 기타
    loc: "230058P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "은하제국의 함대 지휘관. 남작가 출신으로 아스타테 회전 당시 오딘에 머물렀다. 문벌귀족 특유의 혈통의식이 강하고 모략과 정치공작에 능하다.",
      },
      {
        code: "En",
        context:
          "A fleet officer of the Galactic Empire. Born into a Baron's house, he remained on Odin during the Battle of Astarte. Strongly conscious of his noble lineage, he is skilled in political intrigue and scheming.",
      },
      {
        code: "Jp",
        context:
          "銀河帝国の艦隊指揮官。男爵家出身でアスターテ会戦当時はオーディンに留まっていた。門閥貴族特有の血統意識が強く、謀略と政治工作に長けている。",
      },
    ],
    // — 직업
    // — 트레잇
    // 독선(TRC_G_004) LV0
    // 모략의 대가(TRC_G_007) LV0
    // 아른거리는 그림자(TRC_G_008) LV0
    // 고귀한 혈통(TRC_G_009) LV0
    // 문벌 귀족(TRC_G_010) LV0
    // 꽃밭을 망치는 해조(TRC_U_000516) LV0
  },
  {
    // — 기본
    code: "CH_000517",
    name: [{ code: "Kr", context: "피아 폰 클라인겔트" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000518",
    name: [{ code: "Kr", context: "피아츠이" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000519",
    name: [{ code: "Kr", context: "피터" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000520",
    name: [{ code: "Kr", context: "필즈" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000521",
    name: [{ code: "Kr", context: "하르바흐" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000522",
    name: [{ code: "Kr", context: "하르스터" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000523",
    name: [{ code: "Kr", context: "하르트만 베르트람" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000524",
    name: [{ code: "Kr", context: "하우슈르도" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000525",
    name: [{ code: "Kr", context: "하우저 폰 슈타이어마르크" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000526",
    name: [{ code: "Kr", context: "하우프트" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  // 하이드리히 랑 Heydrich Lang · ハイドリッヒ・ラング
  {
    // — 기본
    code: "CH_000527",
    name: [
      { code: "Kr", context: "하이드리히 랑" },
      { code: "En", context: "Heydrich Lang" },
      { code: "Jp", context: "ハイドリッヒ・ラング" },
    ],
    nick: [
      { code: "Kr", context: "랑" },
      { code: "En", context: "Lang" },
      { code: "Jp", context: "ラング" },
    ],
    searchKeys: ["랭"],
    birth: "SE|754.05.24",
    death: "SE|801.05.18",
    // — 성향
    // 정치경찰(사회질서유지국/내무안전부) 수장. "51 중 26을 잡으면 51을, 나아가 100을 지배한다"는
    // 소수지배론을 신봉하는 모략가로, 정보/정치공작 특화 수치로 설계
    faction: "REH",
    idea: "260",
    econ: "160",
    brave: "20",
    moral: "32",
    friend: "125",
    // — 능력치
    statCmd: 8,
    statCsm: 45,
    statAtt: 5,
    statDef: 10,
    statFst: 8,
    statMng: 62,
    statInf: 85,
    statGfg: 5,
    statAfg: 5,
    statPlt: 88,
    // — 기타
    loc: "230058P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          '골덴바움 왕조 사회질서유지국(이후 내무안전부) 국장. 비밀경찰 조직의 수장으로 "51 중 26을 확보하면 51을, 나아가 100을 지배할 수 있다"는 소수지배론을 신봉하는 모략가다. 온화한 외모와 어울리지 않게 음험한 정치공작에 능하며, 로엔그람 왕조 출범 이후에도 자리를 보전한 몇 안 되는 구체제 관료다.',
      },
      {
        code: "En",
        context:
          "Director of the Department of Social Discipline (later the Internal Security Department) under the Goldenbaum Dynasty. As chief of the Empire's secret police, he is a calculating schemer who subscribes to the theory that control of a minority within a majority secures control of the whole. Despite his disarmingly gentle appearance, he is highly skilled in covert political manoeuvring, and was one of the few officials of the old regime to retain his post after the rise of the Lohengramm Dynasty.",
      },
      {
        code: "Jp",
        context:
          "ゴールデンバウム王朝社会秩序維持局（後の内務安全部）局長。秘密警察組織の長として「51のうち26を確保すれば51を、さらに100を支配できる」という少数支配論を信奉する策謀家である。穏やかな外見に似合わず陰険な政治工作に長け、ローエングラム王朝成立後も地位を保った数少ない旧体制官僚の一人。",
      },
    ],
    // — 직업
    // 평민(JB_N007) LV0
    // — 트레잇
    // 소수의 지배(TRC_U_000527) LV0
    // 모략의 대가(TRC_G_007) LV0
    // 아른거리는 그림자(TRC_G_008) LV0
    // 청렴함(TRC_G_011) LV0
  },
  {
    // — 기본
    code: "CH_000528",
    name: [{ code: "Kr", context: "하인리히 람베르츠" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000529",
    name: [{ code: "Kr", context: "하인리히 폰 큄멜" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000530",
    name: [{ code: "Kr", context: "하젠그레이버" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000531",
    name: [{ code: "Kr", context: "하테" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000532",
    name: [{ code: "Kr", context: "하펜" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  // 한스 디트리히 폰 젝트 Hans Dietrich Von Seeckt ・ ハンス・ディートリッヒ・フォン・ゼークト
  {
    // — 기본
    code: "CH_000533",
    name: [
      { code: "Kr", context: "한스 디트리히 폰 젝트" },
      { code: "En", context: "Hans Dietrich Von Seeckt" },
      { code: "Jp", context: "ハンス・ディートリッヒ・フォン・ゼークト" },
    ],
    nick: [
      { code: "Kr", context: "젝트" },
      { code: "En", context: "Seeckt" },
      { code: "Jp", context: "ゼークト" },
    ],
    searchKeys: ["한스", "디트리히", "젝트", "제크트"],
    birth: "SE|746.03.08",
    death: "SE|796.05.14",
    // — 성향
    // 남작가 출신. 가문의 격을 중시하는 독선적 지휘관으로, 부하를 가볍게 여겨 희생시키는
    // 평가(나무위키: "자존심 때문에 부하를 개죽음시킨 졸장")를 moral/friend 페널티로 반영
    faction: "REH",
    idea: "270",
    econ: "150",
    brave: "55",
    moral: "30",
    friend: "135",
    // — 능력치
    // 4(통솔72/공격76/방어79/공전75)·6(통솔65/지휘55/공격72/방어71) 자료를 종합한 평균치
    statCmd: 68,
    statCsm: 50,
    statAtt: 74,
    statDef: 75,
    statFst: 64,
    statMng: 36,
    statInf: 18,
    statGfg: 48,
    statAfg: 75,
    statPlt: 40,
    // — 기타
    loc: "230058P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "은하제국의 함대 지휘관. 남작가 출신으로 아스타테 회전 당시 이젤론 요새 주둔함대 사령관을 맡았다. 토마 폰 슈토크하우젠과 함께 이젤론을 양분하여 지휘했다. 가문의 격을 중시하는 독선적인 성격으로, 자존심을 앞세워 부하를 희생시키는 졸장으로도 평가받는다.",
      },
      {
        code: "En",
        context:
          "A fleet officer of the Galactic Empire. Born into a Baron's house, he commanded the garrisoned fleet of Iserlohn Fortress during the Battle of Astarte, splitting command of the fortress with Thoma von Stockhausen. A self-important commander who prized his noble status, he is also remembered as a mediocre officer who sacrificed his subordinates out of wounded pride.",
      },
      {
        code: "Jp",
        context:
          "銀河帝国の艦隊指揮官。男爵家出身でアスターテ会戦当時はイゼルローン要塞駐留艦隊司令官を務めた。トーマ・フォン・シュトックハウゼンとともにイゼルローンの指揮を二分した。家門の格を重んじる独善的な性格で、自尊心のために部下を犠牲にした凡将としても評される。",
      },
    ],
    // — 직업
    // — 트레잇
    // 독선(TRC_G_004) LV0
    // 모략의 대가(TRC_G_007) LV0
    // 아른거리는 그림자(TRC_G_008) LV0
    // 고귀한 혈통(TRC_G_009) LV0
    // 문벌 귀족(TRC_G_010) LV0
    // 꽃밭을 망치는 해조(TRC_U_000533) LV0
  },
  {
    // — 기본
    code: "CH_000534",
    name: [{ code: "Kr", context: "한스 스텔처" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000535",
    name: [{ code: "Kr", context: "한스 에두아르트 베르겐그륀" }],
    nick: [{ code: "Kr", context: "베르겐그륀" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000536",
    name: [{ code: "Kr", context: "할바슈타트" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000537",
    name: [{ code: "Kr", context: "핫산 엘 사이드" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000538",
    name: [{ code: "Kr", context: "핸슬로우" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000539",
    name: [{ code: "Kr", context: "햄디 애슈르" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000540",
    name: [{ code: "Kr", context: "허즐릿" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000541",
    name: [{ code: "Kr", context: "헤르만 폰 뤼네부르크" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000542",
    name: [{ code: "Kr", context: "헤르만 폰 켈트링" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000543",
    name: [{ code: "Kr", context: "헤르베르트" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000544",
    name: [{ code: "Kr", context: "헬더" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "REH",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // 카프체란카 주둔기지의 대령.
    // — 직업
    // — 트레잇
  },
  // 헬무트 렌넨캄프 Helmut Lennenkampf · ヘルムート・レンネンカンプ
  // TODO
  {
    // — 기본
    code: "CH_000545",
    name: [
      { code: "Kr", context: "헬무트 렌넨캄프" },
      { code: "En", context: "Helmut Lennenkampf" },
      { code: "Jp", context: "ヘルムート・レンネンカンプ" },
    ],
    nick: [
      { code: "Kr", context: "렌넨캄프" },
      { code: "En", context: "Lennenkampf" },
      { code: "Jp", context: "レンネンカンプ" },
    ],
    searchKeys: [],
    birth: "SE|763.06.23", // 763 확실
    death: "SE|799.07.01", // 799.07 확실 (36세 사망)
    // — 성향
    faction: "REH",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    // 4|  통솔 85 운영 45 정보 52 기동 62공격 74 방어 84 육전 72 공전 85 정치공작 8000(+12) 정보공작 2000(+8) 군사공작 2000(+28)
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000546",
    name: [{ code: "Kr", context: "헬무트 폰 골덴바움" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000547",
    name: [{ code: "Kr", context: "호르스트 슐러" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000548",
    name: [{ code: "Kr", context: "호르스트 진처" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000549",
    name: [{ code: "Kr", context: "호르터" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000550",
    name: [{ code: "Kr", context: "호우드" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000551",
    name: [{ code: "Kr", context: "호프마이스터" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000552",
    name: [{ code: "Kr", context: "호프만" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000553",
    name: [{ code: "Kr", context: "홀츠바우아" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000554",
    name: [
      { code: "Kr", context: "황 루이" },
      { code: "En", context: "Huang Rui" },
      { code: "Jp", context: "ファン・ルイ" },
    ],
    nick: [
      { code: "Kr", context: "황 루이" },
      { code: "En", context: "Huang Rui" },
      { code: "Jp", context: "ファン・ルイ" },
    ],
    searchKeys: [],
    birth: "SE|743.06.08",
    death: "",
    // — 성향
    faction: "FPA", // 자유행성동맹
    idea: "80", // 자유민주공화국
    econ: "100", // 자본주의
    brave: "45", // 냉정
    moral: "85",
    friend: "138",
    // — 능력치
    statCmd: 4,
    statCsm: 72,
    statAtt: 3,
    statDef: 5,
    statFst: 3,
    statMng: 82,
    statInf: 70,
    statGfg: 3,
    statAfg: 3,
    statPlt: 78,
    // — 기타
    loc: "230006P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "자유행성동맹 최고평의회 인적자원위원장. 레벨로와 함께 제국령 침공 작전에 반대한 화평파. 전쟁이 사회 구조를 무너뜨릴 것이라 경고했으나 받아들여지지 않았다.",
      },
      {
        code: "En",
        context:
          "Secretary of Human Resources of the Free Planets Alliance High Council. A peace-faction member alongside Rebelo who opposed the Imperial invasion, warning that continued war would unravel the social fabric of the Alliance — a warning that went unheeded.",
      },
      {
        code: "Jp",
        context:
          "自由惑星同盟最高評議会人的資源委員長。レベロとともに帝国領侵攻作戦に反対した和平派。戦争が社会構造を崩壊させると警告したが受け入れられなかった。",
      },
    ],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000555",
    name: [{ code: "Kr", context: "후겐베르히" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000556",
    name: [{ code: "Kr", context: "후머" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000557",
    name: [{ code: "Kr", context: "휴 외르스테드" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000558",
    name: [{ code: "Kr", context: "히스" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000559",
    name: [
      { code: "Kr", context: "힐데가르트 폰 마린도르프" },
      { code: "En", context: "Hildegard von Mariendorf" },
      { code: "Jp", context: "ヒルデガルド・フォン・マリーンドルフ" },
    ],
    nick: [
      { code: "Kr", context: "힐데" },
      { code: "En", context: "Hilde" },
      { code: "Jp", context: "ヒルデ" },
    ],
    searchKeys: [],
    birth: "SE|777.03.28",
    death: "",
    // — 성향
    faction: "REH", // 은하제국
    idea: "240", // 전제군주제
    econ: "140", // 혼합경제
    brave: "45",
    moral: "90",
    friend: "165",
    // — 능력치
    statCmd: 20,
    statCsm: 75,
    statAtt: 10,
    statDef: 30,
    statFst: 15,
    statMng: 95,
    statInf: 92,
    statGfg: 15,
    statAfg: 15,
    statPlt: 90,
    // — 기타
    loc: "230058P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "마린도르프 백작가의 외동딸. 라인하르트 폰 뮤젤의 야망을 일찍이 간파하고 자진하여 그의 책사가 된 탁월한 정치 전략가. 라인하르트 사후 신은하제국의 섭정 황후로서 제국을 이끌었다.",
      },
    ],
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000560",
    name: [{ code: "Kr", context: "힐데스하임" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  // ── 창작 인물: 최고평의회 미공개 평의원 ─────────────────────────
  {
    // — 기본
    code: "CH_000561",
    name: [
      { code: "Kr", context: "리처드 호프만" },
      { code: "En", context: "Richard Hoffmann" },
      { code: "Jp", context: "リチャード・ホフマン" },
    ],
    nick: [
      { code: "Kr", context: "호프만" },
      { code: "En", context: "Hoffmann" },
      { code: "Jp", context: "ホフマン" },
    ],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "FPA",
    idea: "100", // 공화주의
    econ: "120", // 혼합경제
    brave: "55",
    moral: "65",
    friend: "120",
    // — 능력치
    statCmd: 5,
    statCsm: 55,
    statAtt: 5,
    statDef: 5,
    statFst: 10,
    statMng: 75,
    statInf: 78,
    statGfg: 5,
    statAfg: 5,
    statPlt: 80,
    // — 기타
    loc: "230006P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "자유행성동맹 최고평의회 부의장. 행정 경험이 풍부한 노련한 정치인으로, 의장 부재 시 평의회를 주재한다.",
      },
      {
        code: "En",
        context:
          "Vice Chairman of the Free Planets Alliance Supreme Council. A seasoned politician with extensive administrative experience, who presides over the Council in the Chairman's absence.",
      },
      {
        code: "Jp",
        context:
          "自由惑星同盟最高評議会副議長。豊富な行政経験を持つ老練な政治家で、議長不在時に評議会を主宰する。",
      },
    ],
    // — 직업
    // 최고평의회부의장(JB_F013) LV0
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000562",
    name: [
      { code: "Kr", context: "에릭 발렌타인" },
      { code: "En", context: "Eric Valentine" },
      { code: "Jp", context: "エリック・バレンタイン" },
    ],
    nick: [
      { code: "Kr", context: "발렌타인" },
      { code: "En", context: "Valentine" },
      { code: "Jp", context: "バレンタイン" },
    ],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "FPA",
    idea: "100",
    econ: "100", // 시장경제
    brave: "50",
    moral: "60",
    friend: "105",
    // — 능력치
    statCmd: 5,
    statCsm: 50,
    statAtt: 5,
    statDef: 5,
    statFst: 10,
    statMng: 70,
    statInf: 65,
    statGfg: 5,
    statAfg: 5,
    statPlt: 72,
    // — 기타
    loc: "230006P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "자유행성동맹 최고평의회 천연자원위원장. 자원 배분 및 환경 정책을 총괄한다.",
      },
      {
        code: "En",
        context:
          "Chairman of the Natural Resources Committee of the Free Planets Alliance Supreme Council. Oversees resource allocation and environmental policy.",
      },
      {
        code: "Jp",
        context:
          "自由惑星同盟最高評議会天然資源委員長。資源配分と環境政策を統括する。",
      },
    ],
    // — 직업
    // 천연자원위원장(JB_F005) LV0
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000563",
    name: [
      { code: "Kr", context: "클로드 모리스" },
      { code: "En", context: "Claude Morris" },
      { code: "Jp", context: "クロード・モリス" },
    ],
    nick: [
      { code: "Kr", context: "모리스" },
      { code: "En", context: "Morris" },
      { code: "Jp", context: "モリス" },
    ],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "FPA",
    idea: "100",
    econ: "120",
    brave: "50",
    moral: "62",
    friend: "110",
    // — 능력치
    statCmd: 5,
    statCsm: 55,
    statAtt: 5,
    statDef: 5,
    statFst: 10,
    statMng: 72,
    statInf: 68,
    statGfg: 5,
    statAfg: 5,
    statPlt: 70,
    // — 기타
    loc: "230006P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "자유행성동맹 최고평의회 경제개발위원장. 동맹 경제 성장 및 산업 육성 정책을 담당한다.",
      },
      {
        code: "En",
        context:
          "Chairman of the Economic Development Committee of the Free Planets Alliance Supreme Council. Responsible for economic growth and industrial development policy.",
      },
      {
        code: "Jp",
        context:
          "自由惑星同盟最高評議会経済開発委員長。同盟の経済成長と産業育成政策を担当する。",
      },
    ],
    // — 직업
    // 경제개발위원장(JB_F007) LV0
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000564",
    name: [
      { code: "Kr", context: "앤서니 버클리" },
      { code: "En", context: "Anthony Berkley" },
      { code: "Jp", context: "アンソニー・バークリー" },
    ],
    nick: [
      { code: "Kr", context: "버클리" },
      { code: "En", context: "Berkley" },
      { code: "Jp", context: "バークリー" },
    ],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "FPA",
    idea: "100",
    econ: "120",
    brave: "48",
    moral: "70",
    friend: "115",
    // — 능력치
    statCmd: 5,
    statCsm: 52,
    statAtt: 5,
    statDef: 5,
    statFst: 10,
    statMng: 68,
    statInf: 62,
    statGfg: 5,
    statAfg: 5,
    statPlt: 65,
    // — 기타
    loc: "230006P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "자유행성동맹 최고평의회 지역사회개발위원장. 각 성계의 도시 개발 및 복지 정책을 담당한다.",
      },
      {
        code: "En",
        context:
          "Chairman of the Community Development Committee of the Free Planets Alliance Supreme Council. Responsible for urban development and welfare policy across star systems.",
      },
      {
        code: "Jp",
        context:
          "自由惑星同盟最高評議会地域社会開発委員長。各星系の都市開発と福祉政策を担当する。",
      },
    ],
    // — 직업
    // 지역사회개발위원장(JB_F008) LV0
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000565",
    name: [
      { code: "Kr", context: "헤르만 크라우스" },
      { code: "En", context: "Hermann Kraus" },
      { code: "Jp", context: "ヘルマン・クラウス" },
    ],
    nick: [
      { code: "Kr", context: "크라우스" },
      { code: "En", context: "Kraus" },
      { code: "Jp", context: "クラウス" },
    ],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "FPA",
    idea: "100",
    econ: "120",
    brave: "52",
    moral: "72",
    friend: "100",
    // — 능력치
    statCmd: 5,
    statCsm: 52,
    statAtt: 5,
    statDef: 5,
    statFst: 10,
    statMng: 70,
    statInf: 70,
    statGfg: 5,
    statAfg: 5,
    statPlt: 68,
    // — 기타
    loc: "230006P01",
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "자유행성동맹 최고평의회 법질서위원장. 동맹 내 사법 및 치안 관련 정책을 총괄한다.",
      },
      {
        code: "En",
        context:
          "Chairman of the Law and Order Committee of the Free Planets Alliance Supreme Council. Oversees judicial and public security policy within the Alliance.",
      },
      {
        code: "Jp",
        context:
          "自由惑星同盟最高評議会法秩序委員長。同盟内の司法と治安関連政策を統括する。",
      },
    ],
    // — 직업
    // 법질서위원장(JB_F004) LV0
    // — 트레잇
  },
  // 리버모어 Livermore
  {
    // — 기본
    code: "CH_000566",
    name: [
      { code: "Kr", context: "리버모어" },
      { code: "En", context: "Livermore" },
      { code: "Jp", context: "リバモア" },
    ],
    nick: [
      { code: "Kr", context: "리버모어" },
      { code: "En", context: "Livermore" },
      { code: "Jp", context: "リバモア" },
    ],
    searchKeys: ["리버모어", "Livermore", "リバモア"],
    birth: "",
    death: "",
    // — 성향
    faction: "FPA", // 자유행성동맹
    idea: "100", // 자유민주공화국
    econ: "100", // 자본주의
    brave: "50",
    moral: "35",
    // friend: 트류니히트(245)와 70% 가까움(거리45), 양 웬리(145)와는 약 50%(거리75) — 트류니히트 쪽으로 기운 양다리 인물
    friend: "220",
    // — 능력치
    statCmd: 20,
    statCsm: 45,
    statAtt: 15,
    statDef: 18,
    statFst: 15,
    statMng: 65,
    statInf: 55,
    statGfg: 10,
    statAfg: 12,
    statPlt: 60,
    // — 기타
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "자유행성동맹군 인사국장. 뷰코크의 평가에 따르면 트류니히트 파벌에 약 70% 가담한 것으로 알려져 있다.",
      },
      {
        code: "En",
        context:
          "Director of the Personnel Bureau of the Free Planets Alliance Armed Forces. According to Admiral Bucock's assessment, he is regarded as roughly 70% aligned with the Trünicht faction.",
      },
      {
        code: "Jp",
        context:
          "自由惑星同盟軍人事局長。ビュコック提督の評によれば、トリューニヒト派閥に約70%加担していると見られている。",
      },
    ],
    // — 직업
    // — 트레잇
  },
  // 에이런 두멕 Aulnay Doumec
  {
    // — 기본
    code: "CH_000567",
    name: [
      { code: "Kr", context: "에이런 두멕" },
      { code: "En", context: "Aulnay Doumec" },
      { code: "Jp", context: "オルネ・ドゥーメック" },
    ],
    nick: [
      { code: "Kr", context: "두멕" },
      { code: "En", context: "Doumec" },
      { code: "Jp", context: "ドゥーメック" },
    ],
    searchKeys: ["두멕", "도우멕", "Doumec", "ドゥーメック"],
    birth: "",
    death: "",
    // — 성향
    faction: "FPA", // 자유행성동맹
    idea: "100", // 자유민주공화국
    econ: "100", // 자본주의
    brave: "30",
    moral: "20",
    // friend: 트류니히트(245)의 최측근으로 정적/언론 공격을 전담 — 매우 가까운 거리(95%)
    friend: "238",
    // — 능력치
    statCmd: 5,
    statCsm: 38,
    statAtt: 2,
    statDef: 5,
    statFst: 3,
    statMng: 40,
    statInf: 72,
    statGfg: 2,
    statAfg: 3,
    statPlt: 75,
    // — 기타
    point: "0",
    desc: [
      {
        code: "Kr",
        context:
          "본래 소설가였으나 정치평론가를 거쳐 정계에 입문했다. 욥 트류니히트의 측근으로서 트류니히트의 정적과 언론기관을 공격하는 역할을 맡았다.",
      },
      {
        code: "En",
        context:
          "Originally a novelist, he entered politics after a stint as a political commentator. As a close associate of Job Trünicht, he was tasked with attacking Trünicht's political rivals and hostile media outlets.",
      },
      {
        code: "Jp",
        context:
          "元は小説家であったが、政治評論家を経て政界に入った。ヨブ・トリューニヒトの側近として、トリューニヒトの政敵やマスコミを攻撃する役割を担った。",
      },
    ],
    // — 직업
    // — 트레잇
  },
  // 라트부르흐 Radbruch
  {
    // — 기본
    code: "CH_000568",
    name: [
      { code: "Kr", context: "라트부르흐" },
      { code: "En", context: "Radbruch" },
    ],
    nick: [
      { code: "Kr", context: "라트부르흐" },
      { code: "En", context: "Radbruch" },
    ],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "REH",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    point: "0",
    desc: [{ code: "Kr", context: "골덴바움조 은하제국 남작." }],
    // 후일 정통정부의 내부상서로 취임. 제국군이 침공하자 도주
    // — 직업
    // — 트레잇
  },
  // 셰츨러
  {
    // — 기본
    code: "CH_000568",
    name: [{ code: "Kr", context: "셰츨러" }],
    nick: [{ code: "Kr", context: "셰츨러" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "REH",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    point: "0",
    desc: [{ code: "Kr", context: "골덴바움조 은하제국 자작." }],
    // 정통정부의 재무상서. 제국군이 침공하자 헬더와 함께 도주
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000569",
    name: [{ code: "Kr", context: "헬더" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "REH",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    //정통정부의 사법상서. 자작. 제국군이 침공하자 셰츨러와 함께 가장 먼저 도망쳤다.
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000570",
    name: [{ code: "Kr", context: "호징거" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "REH",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    //정통정부의 궁내상서. 남작. OVA 성우는 나토리 유키마사. 제국군이 침공하자 술에 취한 채로 내각회의에 출석하여 참석자들에게 독설을 퍼부었다. 마찬가지로 다음 날 도망쳤다.
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000571",
    name: [{ code: "Kr", context: "호덴" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "REH",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    //후작. 궁내성 고등참사관으로 베네뮌데 후작부인 사건 궁정재판에 참석하였다.
    // — 직업
    // — 트레잇
  },
  {
    // — 기본
    code: "CH_000572",
    name: [{ code: "Kr", context: "올렌부르크" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "REH",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
  // 플레겔 (내무상서)
  {
    // — 기본
    code: "CH_000573",
    name: [{ code: "Kr", context: "플레겔" }],
    nick: [{ code: "Kr", context: "" }],
    searchKeys: [],
    birth: "",
    death: "",
    // — 성향
    faction: "REH",
    idea: "",
    econ: "",
    brave: "",
    moral: "",
    friend: "",
    // — 능력치
    statCmd: 0,
    statCsm: 0,
    statAtt: 0,
    statDef: 0,
    statFst: 0,
    statMng: 0,
    statInf: 0,
    statGfg: 0,
    statAfg: 0,
    statPlt: 0,
    // — 기타
    loc: "",
    point: "0",
    desc: [{ code: "Kr", context: "" }],
    // — 직업
    // — 트레잇
  },
];

// ================================================================
// DB 미등록 인물 — gineipaedia URL만 기록 (캐릭터 코드 없음)
// https://gineipaedia.com/wiki/Arnold_F._Bach
// https://gineipaedia.com/wiki/Crayambo
// https://gineipaedia.com/wiki/Hassan_el-Sayyid
// https://gineipaedia.com/wiki/Joseph_Massalich
// https://gineipaedia.com/wiki/Michel_Cuffren
// ================================================================

export const CHAR_BASE_MAP = Object.fromEntries(
  CHAR_BASE.map((c) => [c.code, c])
);
