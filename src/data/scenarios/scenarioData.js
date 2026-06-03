// ================================================================
//  scenario.js — 시나리오 메타 목록
//  id: {우주력연도}_{seq}
//  impYear는 year - 309 로 계산 (SE → IC 변환)
//
//  desc 인터페이스: { index, bg, char, charName, text, effect, libs }
//    bg       : 배경 이미지 파일명 (image 필드도 하위 호환 유지)
//    char     : 캐릭터 스프라이트 파일명 (없으면 나레이션 모드)
//    charName : 대화 화자 이름
// ================================================================
/** 
    id: id값(PK) 및 시나리오 상세 폴더 위치    
    yearType : 연도 타입( )
    year: 시작연도
    month: 시작월
    nameKr: 시나리오명
    nameEn: 시나리오명
    nameJp: 시나리오명
    tags: [] 형태로 저장. 사실|가상, 전략|전술|혼합, 초심자추천|숙련자추천
    factions: [] 형태로 저장. 등장국가
    useYn : boolean 형태로 저장. T면 선택 가능하고, F이면 연표에는 나오나 실제 플레이는 불가함.
    (T일 경우 다음 화면 진입 / F일 경우 다음 시나리오로 이동 )
    openPt: 해당 시나리오의 활성화에 필요한 포인트(0이면 상시 활성화)
    desc : [] 형태로 저장. 해당 시나리오 선택 시, 팝업으로 해당 시나리오를 설명한다.
 */

export const SCENARIOS = [
  /** @서력 (AD) */
  // A.D 2039 - 13일 전쟁
  {
    yearType: "AD",
    year: 2039,
    month: 1,
    id: "AD2039_1",
    nameKr: "13일 전쟁",
    nameEn: "Thirteen Day War",
    nameJp: "十三日戦争",
    tags: ["사실"],
    factions: [],
    useYn: false,
    appearances: ["은하영웅전설 6권 <비상편> 서장 <지구쇠망의 기록>"],
    desc: [
      {
        index: 1,
        image: "01.webp",
        text: `서기 21세기.
        아직 지구를 벗어나지 못하고 있는 인류사회는 북방연합국가와 3대륙 합중국이라는 두 강대국이 양분하고 있었다.
        전쟁이 발발한 원인에 대해서는 명확한 기술이 없지만 2039년, 양국은 전쟁에 돌입했다.`,
        effect: "fade",
        libs: [],
      },
      {
        index: 2,
        image: "02.webp",
        text: `두 나라는 상대국의 대도시는 물론이고 약소국에도 마구잡이로 열핵병기를 퍼부었다.
        약소국에 있는 자원들이 적국에 이용될 수 있다는 이유였다.
        13일간 벌어진 대규모 핵전쟁은 두 나라 뿐만 아니라 인류 자체를 파멸로 밀어넣었고,
        전쟁을 벌인 두 전범국은 물론 전쟁에 휘말려든 수많은 약소국들이 길동무가 되어 사라졌다.
        겨우 몇몇 나라만이 전쟁에서 간신히 살아남을 수 있었다.`,
        effect: "fade",
        libs: [],
      },
      {
        index: 3,
        image: "03.webp",
        text: `그러나 여기서 끝이 아니었다.
        열핵병기를 집중적으로 맞은 양국 대도시는 방사능에 오염되었으며 인구수는 10억까지 감소했고 농공생산력은 급격히 무너졌다.
        이후 인류는 질서를 잃고 90년 전쟁이라는 대혼란기를 맞이했다.`,
        effect: "fade",
        libs: [],
      },
    ],
  },
  // A.D 2039 ~ 2129 - 90년 전쟁
  {
    yearType: "AD",
    year: 2039,
    month: 1,
    id: "AD2039_2",
    nameKr: "90년 전쟁",
    nameEn: "",
    nameJp: "90年戦争",
    tags: ["사실"],
    factions: [],
    useYn: false,
    appearances: ["은하영웅전설 6권 <비상편> 서장 <지구쇠망의 기록>"],
    desc: [
      {
        index: 1,
        image: "",
        text: `수천 년간 발전과 번영을 거듭하던 인류 문명이 한줌의 잿더미로 돌아가는 데는 단 13일밖에 필요하지 않았다.
        인류사회를 주름잡던 두 초강대국 북방연합국가&3대륙 합중국간 벌어진 핵전쟁은 양국의 공멸은 물론 수많은 약소국의 멸망과 함께 끝났다.`,
        effect: "slide",
        tags: [],
      },
      {
        index: 2,
        image: "",
        text: `그러나 전쟁의 악영향은 두 나라가 사라진 뒤에도 남아 있었다.
        수많은 사람들이 죽어 세계 인구는 10억으로 감소하고 농업생산력도 '통한의 일격'을 받았을 뿐만 아니라 수많은 주권국가들이 소멸했다.
        거의 모든 인류가 절멸된 상황에서도 남은 사람들은 내분과 내전을 일삼았으며 전쟁 초기에 평화와 사랑을 전파해야 할 종교단체들은 사병을 양성하고 이교도 여자와 아이들을 신의 이름으로 살육하는 만행을 저질렀다.
        특히 북방연합국가가 붕괴한 후 북아메리카 대륙에서 할거한 군소 교단국가들은 과거 번영했던 북아메리카 대륙을 초토화시키고 사람들 마음속에 미신과 배타성의 병원균을 퍼트려, 이미 전란에 지친 사람들의 심신을 더욱 피폐하게 만들었다.`,
        effect: "fade",
        tags: [],
      },
      {
        index: 3,
        image: "",
        text: `1세기에 가까운 전란은 역으로 사람들에게 전 인류를 아우르는 통일정부의 수립을 열망하게 했고,
        마침내 서기 2129년, 오스트레일리아 대륙 동북부에 위치한 도시 브리즈번을 수도로 전 인류를 통합한 지구통일정부가 건국되었다.
        브리즈번이 수도로 채택된 이유는 남반구에 위치해서 전란의 피해가 적었고 
        지상 최대 경제권에 속한 데다가 광대한 자원을 갖추고 양대 전범국으로부터 떨어져 있었기 때문이다.
        몇몇 사람들은 통일정부의 수립에 대해 "전란이 사라지면 내란이 일어날 뿐이지."라고 비관적인 의견을 내었지만 대다수의 인류는 그 말을 듣지 않았다.`,
        effect: "fade",
        tags: [],
      },
      {
        index: 3,
        image: "",
        text: `전란에 지친 사람들은 이제 주권국가들에 의해 벌어진 피터지는 전쟁이 영원히 사라졌다고 믿어 의심치 않았다.
        새 질서가 건설되자 사람들은 열광적으로 문명을 재건하여 황야를 녹지대로 바꾸고 도시를 건설했으며 우주로 뻗어나갔다.
        남은 인류가 하나로 뭉치며 완전히 종식되었다.`,
        effect: "fade",
        tags: ["지구통일정부"],
      },
    ],
  },
  // A.D 2166 - 목성의 위성 이오에 개발 기지 건설.
  {
    yearType: "AD",
    year: 2166,
    month: 1,
    id: "AD2166_1",
    nameKr: "목성 개발",
    nameEn: "",
    nameJp: "",
    tags: ["사실"],
    factions: [],
    useYn: false,
    appearances: ["은하영웅전설 6권 <비상편> 서장 <지구쇠망의 기록>"],
    desc: [
      {
        index: 1,
        image: "",
        text: `수천 년간 발전과 번영을 거듭하던 인류 문명이 한줌의 잿더미로 돌아가는 데는 단 13일밖에 필요하지 않았다.
          인류사회를 주름잡던 두 초강대국 북방연합국가&3대륙 합중국간 벌어진 핵전쟁은 양국의 공멸은 물론 수많은 약소국의 멸망과 함께 끝났다.`,
        effect: "fade",
        tags: ["13일 전쟁"],
      },
      {
        index: 2,
        image: "",
        text: `그러나 전쟁의 악영향은 두 나라가 사라진 뒤에도 남아 있었다.
          수많은 사람들이 죽어 세계 인구는 10억으로 감소하고 농업생산력도 '통한의 일격'을 받았을 뿐만 아니라 수많은 주권국가들이 소멸했다.
          거의 모든 인류가 절멸된 상황에서도 남은 사람들은 내분과 내전을 일삼았으며 전쟁 초기에 평화와 사랑을 전파해야 할 종교단체들은 사병을 양성하고 이교도 여자와 아이들을 신의 이름으로 살육하는 만행을 저질렀다.
          특히 북방연합국가가 붕괴한 후 북아메리카 대륙에서 할거한 군소 교단국가들은 과거 번영했던 북아메리카 대륙을 초토화시키고 사람들 마음속에 미신과 배타성의 병원균을 퍼트려, 이미 전란에 지친 사람들의 심신을 더욱 피폐하게 만들었다.`,
        effect: "fade",
        tags: [],
      },
      {
        index: 3,
        image: "",
        text: `1세기에 가까운 전란은 역으로 사람들에게 전 인류를 아우르는 통일정부의 수립을 열망하게 했고,
          서기 2129년 오스트레일리아 대륙의 브리즈번에 지구통일정부가 수립.
          남은 인류가 하나로 뭉치며 완전히 종식되었다.
          몇몇 사람들은 통일정부의 수립에 대해 "전란이 사라지면 내란이 일어날 뿐이지."라고 비관적인 의견을 내었지만 대다수의 인류는 그 말을 듣지 않았다.`,
        effect: "fade",
        tags: ["지구통일정부"],
      },
    ],
  },
  // A.D 2180
  { yearType:"AD", year:2180, month:1, id:"AD2180_1", nameKr:"명왕성 탐사단 파견", nameEn:"", nameJp:"",
    tags:["사실"], factions:[], useYn:false, openPt:0,
    appearances:[],
    desc:[{ index:1, image:"", text:"지구통일정부는 태양계 내 탐사를 지속하여 명왕성에 탐사단을 파견하였다.", effect:"fade", libs:[] }] },

  // A.D 2253
  { yearType:"AD", year:2253, month:1, id:"AD2253_1", nameKr:"알파 센타우리 탐사", nameEn:"", nameJp:"",
    tags:["사실"], factions:[], useYn:false, openPt:0,
    appearances:[],
    desc:[{ index:1, image:"", text:"인류 최초로 태양계 외부 항성계인 알파 센타우리에 탐사대가 파견되었다. 인류의 우주 진출이 태양계를 벗어나는 역사적 첫 걸음이었다.", effect:"fade", libs:[] }] },

  // A.D 2360
  { yearType:"AD", year:2360, month:1, id:"AD2360_1", nameKr:"초광속 항행기술 발명", nameEn:"", nameJp:"",
    tags:["사실"], factions:[], useYn:false, openPt:0,
    appearances:[],
    desc:[{ index:1, image:"", text:"초광속 항행기술이 발명되어 인류의 우주 진출 속도가 비약적으로 향상되었다. 이 기술은 이후 인류가 은하 전역으로 뻗어나가는 토대가 되었다.", effect:"fade", libs:[] }] },

  // A.D 2391
  { yearType:"AD", year:2391, month:1, id:"AD2391_1", nameKr:"초광속 항행 상용화", nameEn:"", nameJp:"",
    tags:["사실"], factions:[], useYn:false, openPt:0,
    appearances:[],
    desc:[{ index:1, image:"", text:"초광속 항행기술이 상용화되어 성간 이민과 교역이 본격적으로 시작되었다.", effect:"fade", libs:[] }] },

  // A.D 2402
  { yearType:"AD", year:2402, month:1, id:"AD2402_1", nameKr:"카노프스 행성 발견", nameEn:"", nameJp:"",
    tags:["사실"], factions:[], useYn:false, openPt:0,
    appearances:[],
    desc:[{ index:1, image:"", text:"카노프스 성계에서 인류가 거주할 수 있는 행성이 발견되었다. 이는 태양계 외부 첫 이민 계획의 출발점이 되었다.", effect:"fade", libs:[] }] },

  // A.D 2404
  { yearType:"AD", year:2404, month:1, id:"AD2404_1", nameKr:"제1차 항성이민단 파견", nameEn:"", nameJp:"",
    tags:["사실"], factions:[], useYn:false, openPt:0,
    appearances:[],
    desc:[{ index:1, image:"", text:"카노프스 성계를 목적지로 인류 최초의 항성이민단이 파견되었다. 이 사건은 성간 문명 시대의 개막을 알렸다.", effect:"fade", libs:[] }] },

  // A.D 2682
  { yearType:"AD", year:2682, month:1, id:"AD2682_1", nameKr:"식민성 요구사항 제출", nameEn:"", nameJp:"",
    tags:["사실"], factions:[], useYn:false, openPt:0,
    appearances:[],
    desc:[{ index:1, image:"", text:"식민성 주민들이 지구통일정부에 내정간섭 금지와 군비 축소를 요구하는 청원서를 제출하였다. 이것이 시리우스 전역의 발단이 되었다.", effect:"fade", libs:[] }] },

  // A.D 2689 - 시리우스 전역
  { yearType:"AD", year:2689, month:1, id:"AD2689_1", nameKr:"시리우스 전역", nameEn:"", nameJp:"",
    tags:["사실"], factions:[], useYn:false, openPt:0,
    appearances:[],
    desc:[{ index:1, image:"", text:"식민성과 지구통일정부 사이의 갈등이 마침내 무력충돌로 번져 시리우스 전역이 발발하였다. 이 전쟁은 2704년까지 15년간 지속되었다.", effect:"fade", libs:[] }] },

  // A.D 2689 - 지구통일정부 시리우스 점령
  { yearType:"AD", year:2689, month:1, id:"AD2689_2", nameKr:"시리우스 성계 점령", nameEn:"", nameJp:"",
    tags:["사실"], factions:[], useYn:false, openPt:0,
    appearances:[],
    desc:[{ index:1, image:"", text:"지구통일정부군이 시리우스 성계를 군사적으로 점령하였다. 식민성에 대한 지구의 억압은 더욱 거세졌다.", effect:"fade", libs:[] }] },

  // A.D 2690 - 블러디 나이트
  { yearType:"AD", year:2690, month:1, id:"AD2690_1", nameKr:"블러디 나이트", nameEn:"Bloody Night", nameJp:"",
    tags:["사실"], factions:[], useYn:false, openPt:0,
    appearances:[],
    desc:[{ index:1, image:"", text:"지구교 광신도들에 의한 대규모 학살 사건. 수많은 무고한 시민이 희생되었으며, 이 사건은 지구교의 극단성을 전 인류에게 각인시켰다.", effect:"fade", libs:[] }] },

  // A.D 2691 - 라그랑 그룹 출범
  { yearType:"AD", year:2691, month:1, id:"AD2691_1", nameKr:"라그랑 그룹 출범", nameEn:"", nameJp:"",
    tags:["사실"], factions:[], useYn:false, openPt:0,
    appearances:[],
    desc:[{ index:1, image:"", text:"지구통일정부에 대항하는 식민성 측의 정치결사 라그랑 그룹이 출범하였다.", effect:"fade", libs:[] }] },

  // A.D 2703 - 제2차 베가 회전
  { yearType:"AD", year:2703, month:1, id:"AD2703_1", nameKr:"제2차 베가 회전", nameEn:"", nameJp:"",
    tags:["사실"], factions:[], useYn:false, openPt:0,
    appearances:[],
    desc:[{ index:1, image:"", text:"베가 성계에서 지구통일정부군과 식민성 연합군 사이에 대규모 함대 전투가 벌어졌다.", effect:"fade", libs:[] }] },

  // A.D 2704 - 지구통일정부 붕괴
  { yearType:"AD", year:2704, month:1, id:"AD2704_1", nameKr:"지구통일정부 붕괴", nameEn:"", nameJp:"",
    tags:["사실"], factions:[], useYn:false, openPt:0,
    appearances:[],
    desc:[{ index:1, image:"", text:"시리우스 전역의 패배로 지구통일정부가 마침내 붕괴하였다. 수백 년간 인류를 통치했던 지구 중심 질서가 종언을 고했다.", effect:"fade", libs:[] }] },

  // A.D 2706 - 암살 사건
  { yearType:"AD", year:2706, month:1, id:"AD2706_1", nameKr:"식민성 지도자 암살", nameEn:"", nameJp:"",
    tags:["사실"], factions:[], useYn:false, openPt:0,
    appearances:[],
    desc:[{ index:1, image:"", text:"칼레 팔름그렌 병사 후 졸리오 프랑쿠르와 차오 유이룽이 연달아 암살되었다. 라그랑 그룹의 지도부가 급격히 약화되었다.", effect:"fade", libs:[] }] },

  // A.D 2707 - 라그랑 그룹 붕괴
  { yearType:"AD", year:2707, month:1, id:"AD2707_1", nameKr:"라그랑 그룹 붕괴", nameEn:"", nameJp:"",
    tags:["사실"], factions:[], useYn:false, openPt:0,
    appearances:[],
    desc:[{ index:1, image:"", text:"윈슬로 케네스 타운젠트의 암살로 라그랑 그룹이 완전히 붕괴하였다. 이후 인류는 새로운 질서를 모색하게 된다.", effect:"fade", libs:[] }] },

  /** @우주력 (SE) */
  // SE 001
  { yearType:"SE", year:1, month:1, id:"SE001_1", nameKr:"은하연방 건국", nameEn:"Founding of the Galactic Federation", nameJp:"",
    tags:["사실"], factions:[], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"우주력 1년, 서기 2801년. 지구통일정부의 붕괴 이후 혼란을 수습한 인류는 마침내 은하연방을 건국하였다. 새로운 인류 공동체의 출발점이었다.", effect:"fade", libs:[] }] },

  // SE 106
  { yearType:"SE", year:106, month:1, id:"SE106_1", nameKr:"우주해적 토벌작전 시작", nameEn:"", nameJp:"",
    tags:["사실"], factions:[], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"은하연방은 성간 항로를 위협하는 우주해적 세력에 대한 대규모 토벌작전을 개시하였다.", effect:"fade", libs:[] }] },

  // SE 108
  { yearType:"SE", year:108, month:1, id:"SE108_1", nameKr:"우주해적 토벌작전 종료", nameEn:"", nameJp:"",
    tags:["사실"], factions:[], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"2년에 걸친 우주해적 토벌작전이 종료되었다. 성간 항로의 안전이 확보되었으나, 이 전쟁은 은하연방 군부의 영향력 확대를 가져왔다.", effect:"fade", libs:[] }] },

  // SE 296
  { yearType:"SE", year:296, month:1, id:"SE296_1", nameKr:"루돌프 폰 골덴바움 퇴역", nameEn:"", nameJp:"",
    tags:["사실"], factions:[], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"전쟁 영웅 루돌프 폰 골덴바움이 군에서 퇴역하여 정계에 투신하였다. 그의 정치적 야망이 본격적으로 시작된 순간이었다.", effect:"fade", libs:[] }] },

  // SE 310
  { yearType:"SE", year:310, month:1, id:"SE310_1", nameKr:"은하제국 건국", nameEn:"Founding of the Galactic Empire", nameJp:"銀河帝国建国",
    tags:["사실"], factions:["REH"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"루돌프 폰 골덴바움이 은하연방을 전복하고 스스로 루돌프 대제에 즉위하여 은하제국을 건국하였다. 제국력 원년의 시작이다.", effect:"fade", libs:[] }] },

  // SE 318
  { yearType:"SE", year:318, month:1, id:"SE318_1", nameKr:"열악유전자 배제법 선포", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"루돌프 대제는 열악유전자 배제법을 선포하고 제국의회를 해산하였다. 독재 체제가 완성되고 수많은 사람들이 '열악한 유전자'를 이유로 탄압받았다.", effect:"fade", libs:[] }] },

  // SE 319
  { yearType:"SE", year:319, month:1, id:"SE319_1", nameKr:"사회질서유지국 설립", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"루돌프 대제는 사회질서유지국(社会秩序維持局)을 설립하여 반체제 인사들을 탄압하는 비밀경찰 조직을 강화하였다.", effect:"fade", libs:[] }] },

  // SE 351
  { yearType:"SE", year:351, month:1, id:"SE351_1", nameKr:"루돌프 대제 사망", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"루돌프 대제가 사망하고 지기스문트 1세가 즉위하였다. 대제의 사망 소식에 각지에서 공화주의자들의 반란이 들불처럼 번졌으나 진압되었다.", effect:"fade", libs:[] }] },

  // SE 433
  { yearType:"SE", year:433, month:1, id:"SE433_1", nameKr:"에크하르트 백작의 반란", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"에크하르트 백작이 반란을 일으켜 공위(空位) 140일의 혼란이 발생하였다. 제국 황실의 권위가 크게 실추되었다.", effect:"fade", libs:[] }] },

  // SE 453
  { yearType:"SE", year:453, month:1, id:"SE453_1", nameKr:"율리우스 황제 독살", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"율리우스 황제가 독살되고 칼 대공이 유폐되었다. 제국 내부의 권력 암투가 극에 달하였다.", effect:"fade", libs:[] }] },

  // SE 469
  { yearType:"SE", year:469, month:1, id:"SE469_1", nameKr:"지기스문트 2세 폐위", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"지기스문트 2세가 폐위되었다. 이는 이후 '장정 1만 광년'을 촉발하는 정치적 격변의 일부였다.", effect:"fade", libs:[] }] },

  // SE 473
  { yearType:"SE", year:473, month:1, id:"SE473_1", nameKr:"장정 1만 광년 시작", nameEn:"The Long March", nameJp:"",
    tags:["사실"], factions:["REH"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"제국의 탄압을 피해 공화주의자들이 이끄는 수백만 명의 피난민들이 이제르론 회랑을 통해 탈출을 시작하였다. 역사는 이것을 '장정 1만 광년'이라 부른다.", effect:"fade", libs:[] }] },

  // SE 527
  { yearType:"SE", year:527, month:1, id:"SE527_1", nameKr:"자유행성동맹 건국", nameEn:"Founding of the Free Planets Alliance", nameJp:"自由惑星同盟建国",
    tags:["사실"], factions:["REH", "FPA"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"54년에 걸친 장정 끝에 이제르론 회랑 너머에 자유행성동맹이 건국되었다. 제국과 대립하는 또 하나의 인류 국가가 탄생한 것이다.", effect:"fade", libs:[] }] },

  // SE 562
  { yearType:"SE", year:562, month:1, id:"SE562_1", nameKr:"린더호프 후작의 반란", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH", "FPA"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"린더호프 후작이 반란을 일으켜 트라바흐 성역에서 회전이 벌어졌고, 아우구스트 2세가 암살되었다. 제국과 동맹 간의 긴장은 계속 높아졌다.", effect:"fade", libs:[] }] },

  // SE 640
  { yearType:"SE", year:640, month:1, id:"SE640_1", nameKr:"다곤 성역 회전", nameEn:"Battle of Dagon", nameJp:"ダゴン星域会戦",
    tags:["사실"], factions:["REH", "FPA"], useYn:false, openPt:0, appearances:[],
    desc: [] },

  // SE 646
  { yearType:"SE", year:646, month:1, id:"SE646_1", nameKr:"막시밀리안 요제프 2세 즉위", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH", "FPA"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"막시밀리안 요제프 2세가 즉위하고 검붉은 6년이 종료되었다. 제국과 동맹 사이에 소강 상태가 찾아왔다.", effect:"fade", libs:[] }] },

  // SE 668
  { yearType:"SE", year:668, month:1, id:"SE668_1", nameKr:"코르넬리우스 1세 친정", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH", "FPA"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"코르넬리우스 1세가 직접 군을 이끌고 친정에 나섰다.", effect:"fade", libs:[] }] },

  // SE 682
  { yearType:"SE", year:682, month:1, id:"SE682_1", nameKr:"페잔 자치령 창건", nameEn:"Founding of the Phezzan Dominion", nameJp:"フェザーン自治領創建",
    tags:["사실"], factions:["REH", "FPA", "PHZ"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"제국과 동맹 사이의 요충지에 페잔 자치령이 창건되었다. 이후 페잔은 양국의 중개무역으로 막대한 부를 축적하며 독자적인 영향력을 행사하게 된다.", effect:"fade", libs:[] }] },

  // SE 696
  { yearType:"SE", year:696, month:1, id:"SE696_1", nameKr:"샨달라 성역 회전", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH", "FPA", "PHZ"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"샨달라 성역에서 제국군과 동맹군 사이에 회전이 벌어졌다.", effect:"fade", libs:[] }] },

  // SE 717
  { yearType:"SE", year:717, month:1, id:"SE717_1", nameKr:"텔레만 제독 부하 반란", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH", "FPA", "PHZ"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"텔레만 제독 휘하 병사들이 반란을 일으키는 사건이 발생하였다.", effect:"fade", libs:[] }] },

  // SE 728
  { yearType:"SE", year:728, month:1, id:"SE728_1", nameKr:"지크마이스터 제독 망명", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH", "FPA", "PHZ"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"지크마이스터 제독이 동맹으로 망명하는 사건이 발생하였다. 포르세티 성역에서 관련 회전이 벌어졌다.", effect:"fade", libs:[] }] },

  // SE 738
  { yearType:"SE", year:738, month:1, id:"SE738_1", nameKr:"파이어저드 성역 회전", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH", "FPA", "PHZ"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"파이어저드 성역에서 제국군과 동맹군 사이에 회전이 벌어졌다.", effect:"fade", libs:[] }] },

  // SE 742
  { yearType:"SE", year:742, month:1, id:"SE742_1", nameKr:"드라고니아 성역 회전", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH", "FPA", "PHZ"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"드라고니아 성역에서 회전이 벌어졌다.", effect:"fade", libs:[] }] },

  // SE 745
  { yearType:"SE", year:745, month:1, id:"SE745_1", nameKr:"제2차 티아마트 회전", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH", "FPA", "PHZ"], useYn:false, openPt:0, appearances:[],
    desc: [] },

  // SE 751
  { yearType:"SE", year:751, month:1, id:"SE751_1", nameKr:"팔란티아 회전", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH", "FPA", "PHZ"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"팔란티아에서 회전이 벌어지고, 미켈젠 제독 암살사건이 발생하였다.", effect:"fade", libs:[] }] },

  // SE 763
  { yearType:"SE", year:763, month:1, id:"SE763_1", nameKr:"이제르론 요새 기공", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH", "FPA", "PHZ"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"이제르론 회랑의 요충지에 은하제국이 대요새 이제르론의 건설을 시작하였다. 이 요새는 동맹과의 전쟁에서 결정적인 역할을 하게 된다.", effect:"fade", libs:[] }] },

  // SE 765
  { yearType:"SE", year:765, month:1, id:"SE765_1", nameKr:"프리드리히 4세 즉위", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH", "FPA", "PHZ"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"프리드리히 4세가 은하제국의 황제로 즉위하였다. 그의 치세에 라인하르트 폰 뮈젤이 등장하여 제국의 역사를 바꾸게 된다.", effect:"fade", libs:[] }] },

  // SE 767
  { yearType:"SE", year:767, month:1, id:"SE767_1", nameKr:"이제르론 요새 완공", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH", "FPA", "PHZ"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"4년의 공사 끝에 이제르론 요새가 완공되었다. 이제르론 회랑의 제국 측 입구를 완전히 장악한 이 요새는 이후 동맹군에게 거대한 장벽이 되었다.", effect:"fade", libs:[] }] },

  // SE 788, RC 479, A.D 3588 - 엘 파실 전투
  {
    yearType: "SE",
    year: 788,
    month: 5,
    id: "SE788_1",
    nameKr: "엘 파실 전투",
    nameEn: "Battle of El Facil",
    nameJp: "",
    tags: ["사실"],
    factions: ["FPA", "REH", "PHZ"],
    useYn: true,
    openPt: 0,
    appearances: ["은하영웅전설 1권 <여명편>", "은하영웅전설 외전 <나선미궁>"],
    desc: [
      {
        index: 1,
        image: "",
        text: `우주력 788년, 제국력 479년 표준력 5월
        엘 파실 성계. 이곳은 자유행성동맹의 이제르론 회랑 방면 변방 성계 중 하나로 
        행성에 약 300만 명 정도의 시민과 이들이 거주하는 대규모 거주 구역.
        그리고 행성을 방위하는 약 1천 척의 주둔함대와 함대 사령부 및 군 관련 시설들이 존재하고 있었다.`,
        effect: "fade",
        libs: ["ST_230017:엘 파실"],
      },
      {
        index: 2,
        image: "",
        text: `엘 파실 성계는 지리적으로 은하제국과의 접경지역에 위치해 있어 이따금 경비함대가 제국군과 접촉하는 일이 있었는데,
        사건이 벌어진 당일에 무려 1천 척에 달하는 제국 함대가 행성으로 접근하고 있다는 사실이 엘 파실 동맹 주둔함대사령부에 보고되었다. `,
        effect: "fade",
        libs: ["ST_230017:엘 파실"],
      },
      {
        index: 3,
        image: "",
        text: `보고를 받아든 엘 파실 주둔함대 사령관 아서 린치 소장은 즉시 전 함정 1천여척을 출격시켜 대응.
        양국의 함대는 엘 파실 행성에서 약간 떨어진 성역에서 마주하여 교전을 개시하였다.`,
        effect: "fade",
        libs: ["CH_000240:아서 린치"],
      },
      {
        index: 4,
        image: "",
        text: `사건 자체는 동맹-제국 사이 일어난 수많은 분쟁 중의 하나일 뿐이지만,
        훗날 어떤 결과를 불러올 것인가. 그것은 아직 알 수 없는 일이다.`,
        effect: "fade",
        libs: [],
      },
    ],
  },
  // SE 790
  { yearType:"SE", year:790, month:1, id:"SE790_1", nameKr:"에코니아 포로수용소 사건", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH","FPA","PHZ"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"에코니아 포로수용소에서 사건이 발생하였다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:790, month:1, id:"SE790_2", nameKr:"앤드류 포크 사관학교 수석 졸업", nameEn:"", nameJp:"",
    tags:["사실"], factions:["FPA"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"앤드류 포크가 동맹 사관학교를 수석으로 졸업하였다.", effect:"fade", libs:[] }] },

  // SE 791
  { yearType:"SE", year:791, month:1, id:"SE791_1", nameKr:"라인하르트 1차 암살미수", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH","FPA","PHZ"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"라인하르트 폰 뮈젤에 대한 첫 번째 암살 시도가 발생하였으나 미수에 그쳤다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:791, month:1, id:"SE791_2", nameKr:"하멜른 2호 조난사건", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH","FPA","PHZ"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"하멜른 2호 조난사건이 발생하였다.", effect:"fade", libs:[] }] },

  // SE 792
  { yearType:"SE", year:792, month:1, id:"SE792_1", nameKr:"라인하르트 2차 암살미수", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH","FPA","PHZ"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"라인하르트 폰 뮈젤에 대한 두 번째 암살 시도가 발생하였으나 미수에 그쳤다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:792, month:1, id:"SE792_2", nameKr:"아를레스하임 성역 회전", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH","FPA","PHZ"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"아를레스하임 성역에서 제국군과 동맹군 사이에 회전이 벌어졌다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:792, month:1, id:"SE792_3", nameKr:"제5차 이제르론 공방전", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH","FPA","PHZ"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"다섯 번째 이제르론 공방전이 벌어졌다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:792, month:1, id:"SE792_4", nameKr:"라인하르트 3차 암살미수", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH","FPA","PHZ"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"라인하르트 폰 뮈젤에 대한 세 번째 암살 시도가 발생하였으나 미수에 그쳤다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:792, month:1, id:"SE792_5", nameKr:"지향성 제플입자 탈환작전", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH","FPA","PHZ"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"지향성 제플입자 발생기 탈환 작전이 전개되었다.", effect:"fade", libs:[] }] },

  // SE 793
  { yearType:"SE", year:793, month:1, id:"SE793_1", nameKr:"은하제국 유년학교 살인사건", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"은하제국 유년학교에서 살인사건이 발생하였다.", effect:"fade", libs:[] }] },

  // SE 794
  { yearType:"SE", year:794, month:1, id:"SE794_1", nameKr:"반플리트 성역 회전", nameEn:"Battle of Van-Fleet", nameJp:"",
    tags:["사실"], factions:["REH","FPA","PHZ"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"반플리트 성역에서 대규모 함대 회전이 벌어졌다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:794, month:1, id:"SE794_2", nameKr:"제6차 이제르론 공방전", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH","FPA","PHZ"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"여섯 번째 이제르론 공방전이 벌어졌다.", effect:"fade", libs:[] }] },

  // SE 795
  { yearType:"SE", year:795, month:1, id:"SE795_1", nameKr:"제3차 티아마트 회전", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH","FPA","PHZ"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"티아마트 성역에서 세 번째 대규모 회전이 벌어졌다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:795, month:1, id:"SE795_2", nameKr:"클롭슈톡 사건", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"클롭슈톡 후작과 관련된 사건이 발생하였다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:795, month:1, id:"SE795_3", nameKr:"베네뮌데 후작부인 사건", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"베네뮌데 후작부인이 안네로제에게 자객을 보내는 사건이 발생하였다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:795, month:1, id:"SE795_4", nameKr:"그랜드 캐널 사건", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH","FPA","PHZ"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"그랜드 캐널에서 사건이 발생하였다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:795, month:1, id:"SE795_5", nameKr:"레그니처 상공 조우전", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH","FPA","PHZ"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"레그니처 성계 상공에서 제국군과 동맹군이 조우하여 전투가 벌어졌다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:795, month:1, id:"SE795_6", nameKr:"제4차 티아마트 회전", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH","FPA","PHZ"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"티아마트 성역에서 네 번째 대규모 회전이 벌어졌다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:795, month:1, id:"SE795_7", nameKr:"사이옥신 마약 사건", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH","FPA","PHZ"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"사이옥신 마약과 관련된 사건이 발생하였다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:795, month:1, id:"SE795_8", nameKr:"정전", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH","FPA","PHZ"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"제국과 동맹 사이에 일시적인 정전이 성립되었다.", effect:"fade", libs:[] }] },

  // SE 796
  { yearType:"SE", year:796, month:2, id:"SE796_1", nameKr:"아스타테 회전", nameEn:"Battle of Astarte", nameJp:"アスターテ会戦",
    tags:["사실","초심자추천"], factions:["REH","FPA","PHZ"], useYn:false, openPt:0,
    appearances:["은하영웅전설 1권 <여명편>"],
    desc: [] },
  { yearType:"SE", year:796, month:2, id:"SE796_2", nameKr:"양 웬리 관사 침입사건", nameEn:"", nameJp:"",
    tags:["사실"], factions:["FPA"], useYn:false, openPt:0, appearances:["은하영웅전설 1권 <여명편>"],
    desc:[{ index:1, image:"", text:"양 웬리 준장의 관사에 침입 사건이 발생하였다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:796, month:5, id:"SE796_3", nameKr:"제7차 이제르론 공방전", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH","FPA","PHZ"], useYn:false, openPt:0, appearances:["은하영웅전설 1권 <여명편>"],
    desc:[{ index:1, image:"", text:"양 웬리가 트로이의 목마 작전으로 이제르론 요새를 무혈 함락하는 데 성공하였다. 동맹 역사상 최초의 이제르론 점령이었다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:796, month:1, id:"SE796_4", nameKr:"카스트로프 동란", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH"], useYn:false, openPt:0, appearances:["은하영웅전설 2권 <야망편>"],
    desc:[{ index:1, image:"", text:"카스트로프 공작이 반란을 일으켰으나 라인하르트 폰 로엔그람에 의해 진압되었다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:796, month:1, id:"SE796_5", nameKr:"제임스 손다이크 암살사건", nameEn:"", nameJp:"",
    tags:["사실"], factions:["FPA"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"제임스 손다이크 암살사건이 발생하였다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:796, month:8, id:"SE796_6", nameKr:"제국령 침공작전", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH","FPA","PHZ"], useYn:false, openPt:0, appearances:["은하영웅전설 2권 <야망편>"],
    desc:[{ index:1, image:"", text:"동맹이 4천만의 대군을 이끌고 제국령으로 침공을 감행하였다. 그러나 보급선 문제와 라인하르트의 청야전술로 군은 점점 피폐해져 갔다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:796, month:10, id:"SE796_7", nameKr:"암릿처 회전", nameEn:"Battle of Amritsar", nameJp:"アムリッツァ会戦",
    tags:["사실"], factions:["REH","FPA","PHZ"], useYn:false, openPt:0, appearances:["은하영웅전설 2권 <야망편>"],
    desc:[{ index:1, image:"", text:"암릿처 성역에서 라인하르트의 반격으로 동맹군이 궤멸적인 패배를 당하였다. 30만 척 중 살아 돌아온 것은 3분의 1에도 못 미쳤다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:796, month:1, id:"SE796_8", nameKr:"유령 소동", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"유령 소동이 발생하였다.", effect:"fade", libs:[] }] },

  // SE 797
  { yearType:"SE", year:797, month:1, id:"SE797_1", nameKr:"이제르론 헌병대장 인질사건", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH","FPA","PHZ"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"이제르론 헌병대장이 인질로 잡히는 사건이 발생하였다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:797, month:1, id:"SE797_2", nameKr:"동맹·제국 포로교환", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH","FPA","PHZ"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"동맹과 제국 사이에 포로교환이 이루어졌다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:797, month:1, id:"SE797_3", nameKr:"돌튼 사건", nameEn:"", nameJp:"",
    tags:["사실"], factions:["FPA"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"돌튼 사건이 발생하였다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:797, month:1, id:"SE797_4", nameKr:"립슈타트 전역", nameEn:"Lippstadt War", nameJp:"リップシュタット戦役",
    tags:["사실"], factions:["REH"], useYn:false, openPt:0, appearances:["은하영웅전설 3권 <자복편>"],
    desc:[{ index:1, image:"", text:"브라운슈바이크 공작을 중심으로 한 구 귀족 연합이 립슈타트 동맹을 결성하여 라인하르트에게 반기를 들었다. 제국 내전의 서막이었다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:797, month:1, id:"SE797_5", nameKr:"슈바르첸 관저 습격사건", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"슈바르첸 관저가 습격당하는 사건이 발생하였다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:797, month:1, id:"SE797_6", nameKr:"알테너 회전", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"알테너에서 제국 내전 관련 회전이 벌어졌다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:797, month:1, id:"SE797_7", nameKr:"렌텐베르크 요새 공방전", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"렌텐베르크 요새를 둘러싸고 제국 내전 중 공방전이 벌어졌다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:797, month:1, id:"SE797_8", nameKr:"키포이저 성역 회전", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"키포이저 성역에서 회전이 벌어졌다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:797, month:1, id:"SE797_9", nameKr:"샨타우 성역 회전", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"샨타우 성역에서 회전이 벌어졌다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:797, month:1, id:"SE797_10", nameKr:"제1차 가이에스부르크 공방전", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"가이에스부르크 요새를 둘러싸고 첫 번째 공방전이 벌어졌다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:797, month:1, id:"SE797_11", nameKr:"베스터란트 학살사건", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH"], useYn:false, openPt:0, appearances:["은하영웅전설 3권 <자복편>"],
    desc:[{ index:1, image:"", text:"베스터란트 행성에서 구 귀족 연합에 의한 대규모 학살이 자행되었다. 라인하르트는 이 사건을 묵인하여 구 귀족의 명분을 완전히 무너뜨렸다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:797, month:1, id:"SE797_12", nameKr:"제2차 가이에스부르크 공방전", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"가이에스부르크 요새를 둘러싸고 두 번째 공방전이 벌어졌다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:797, month:1, id:"SE797_13", nameKr:"키르히아이스 사망", nameEn:"Death of Kircheis", nameJp:"キルヒアイスの死",
    tags:["사실"], factions:["REH"], useYn:false, openPt:0, appearances:["은하영웅전설 3권 <자복편>"],
    desc:[{ index:1, image:"", text:"라인하르트 폰 로엔그람에 대한 암살 시도를 막아내다가 지크프리트 키르히아이스가 전사하였다. 라인하르트 최대의 비극이었다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:797, month:1, id:"SE797_14", nameKr:"구국군사회의 쿠데타", nameEn:"Coup d'état of the National Salvation Military Council", nameJp:"",
    tags:["사실"], factions:["FPA"], useYn:false, openPt:0, appearances:["은하영웅전설 3권 <자복편>"],
    desc:[{ index:1, image:"", text:"트류니히트 정권에 반발한 군부가 구국군사회의를 결성하여 쿠데타를 일으켰다. 양 웬리는 이제르론에서 무혈로 이를 진압하였다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:797, month:1, id:"SE797_15", nameKr:"쿠브르슬리 암살미수", nameEn:"", nameJp:"",
    tags:["사실"], factions:["FPA"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"쿠브르슬리 대장에 대한 암살 미수 사건이 발생하였다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:797, month:1, id:"SE797_16", nameKr:"행성 샴풀 해방전", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH","FPA","PHZ"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"행성 샴풀 해방전이 전개되었다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:797, month:1, id:"SE797_17", nameKr:"도리아 성역 회전", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH","FPA","PHZ"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"도리아 성역에서 회전이 벌어졌다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:797, month:1, id:"SE797_18", nameKr:"스타디움 학살 사건", nameEn:"", nameJp:"",
    tags:["사실"], factions:["FPA"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"스타디움에서 대규모 학살 사건이 발생하였다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:797, month:1, id:"SE797_19", nameKr:"하이네센 공방전", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH","FPA","PHZ"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"동맹 수도 하이네센을 둘러싸고 공방전이 벌어졌다.", effect:"fade", libs:[] }] },

  // SE 798
  { yearType:"SE", year:798, month:1, id:"SE798_1", nameKr:"회랑의 조우전", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH","FPA","PHZ"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"이제르론 회랑에서 제국군과 동맹군이 조우하여 전투가 벌어졌다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:798, month:1, id:"SE798_2", nameKr:"사문회", nameEn:"", nameJp:"",
    tags:["사실"], factions:["FPA"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"양 웬리에 대한 사문회(査問会)가 열렸다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:798, month:1, id:"SE798_3", nameKr:"제8차 이제르론 공방전", nameEn:"Fortress vs Fortress", nameJp:"",
    tags:["사실"], factions:["REH","FPA","PHZ"], useYn:false, openPt:0, appearances:["은하영웅전설 5권 <풍운편>"],
    desc:[{ index:1, image:"", text:"요새 대 요새 전투. 가이에스부르크 요새가 이제르론 요새를 공격하였으나 양 웬리의 전술로 격퇴되었다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:798, month:1, id:"SE798_4", nameKr:"황제 납치 사건", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH","PHZ"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"프리드리히 4세가 납치되는 사건이 발생하였다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:798, month:8, id:"SE798_5", nameKr:"은하제국 정통정부 수립", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH","FPA","PHZ"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"리히텐라데 후작을 수반으로 하는 은하제국 정통정부가 수립되었다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:798, month:1, id:"SE798_6", nameKr:"제1차 라그나뢰크 작전", nameEn:"Operation Ragnarök", nameJp:"",
    tags:["사실"], factions:["REH","FPA","PHZ"], useYn:false, openPt:0, appearances:["은하영웅전설 5권 <풍운편>"],
    desc:[{ index:1, image:"", text:"라인하르트가 동맹 정복을 목표로 라그나뢰크 작전을 개시하였다. 페잔 회랑을 통한 기습 침공으로 동맹은 큰 충격을 받았다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:798, month:1, id:"SE798_7", nameKr:"제9차 이제르론 공방전", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH","FPA","PHZ"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"아홉 번째 이제르론 공방전이 벌어졌다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:798, month:1, id:"SE798_8", nameKr:"페잔 점령 작전", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH","PHZ"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"제국군이 페잔 자치령을 점령하였다. 페잔의 중립은 종언을 고하고 제국의 영토로 편입되었다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:798, month:1, id:"SE798_9", nameKr:"율리안 민츠의 페잔 탈출", nameEn:"", nameJp:"",
    tags:["사실"], factions:["FPA","PHZ"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"양 웬리의 양자 율리안 민츠가 제국군의 페잔 점령 와중에 탈출에 성공하였다.", effect:"fade", libs:[] }] },

  // SE 799
  { yearType:"SE", year:799, month:2, id:"SE799_1", nameKr:"제1차 란테마리오 성역 회전", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH","FPA","PHZ"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"란테마리오 성역에서 제국군과 동맹군 사이에 첫 번째 대규모 회전이 벌어졌다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:799, month:2, id:"SE799_2", nameKr:"양 웬리 원수 등극", nameEn:"", nameJp:"",
    tags:["사실"], factions:["FPA"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"우주력 799년 2월 13일, 양 웬리가 동맹군 원수로 등극하였다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:799, month:1, id:"SE799_3", nameKr:"수송선단 습격전", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH","FPA","PHZ"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"수송선단에 대한 습격전이 전개되었다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:799, month:1, id:"SE799_4", nameKr:"라이가르 성역 회전", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH","FPA","PHZ"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"라이가르 성역에서 회전이 벌어졌다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:799, month:1, id:"SE799_5", nameKr:"타실리 성역 회전", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH","FPA","PHZ"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"타실리 성역에서 회전이 벌어졌다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:799, month:4, id:"SE799_6", nameKr:"버밀리온 성역 회전", nameEn:"Battle of Vermilion", nameJp:"バーミリオン星域会戦",
    tags:["사실","초심자추천"], factions:["REH","FPA","PHZ"], useYn:false, openPt:0,
    appearances:["은하영웅전설 6권 <비상편>"],
    desc:[{ index:1, image:"", text:"버밀리온 성역에서 양 웬리와 라인하르트가 마침내 직접 맞붙었다. 양 웬리가 라인하르트의 기함을 코너에 몰아가는 순간, 바라트 화약 체결 소식이 전해지며 동맹군은 철수를 명령받았다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:799, month:6, id:"SE799_7", nameKr:"바라트 화약", nameEn:"Treaty of Barat", nameJp:"",
    tags:["사실"], factions:["REH","FPA","PHZ"], useYn:false, openPt:0, appearances:["은하영웅전설 6권 <비상편>"],
    desc:[{ index:1, image:"", text:"동맹이 사실상의 항복문서인 바라트 화약에 서명하였다. 자유행성동맹은 제국의 속국으로 전락하였다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:799, month:6, id:"SE799_8", nameKr:"골덴바움 왕조 멸망", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"우주력 799년 6월 20일, 490년간 은하제국을 지배해온 골덴바움 왕조가 공식적으로 멸망하였다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:799, month:6, id:"SE799_9", nameKr:"로엔그람 왕조 건국", nameEn:"Founding of the Lohengramm Dynasty", nameJp:"",
    tags:["사실"], factions:["REH"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"우주력 799년 6월 22일, 라인하르트 폰 로엔그람이 카이저로 즉위하며 새로운 로엔그람 왕조가 건국되었다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:799, month:1, id:"SE799_10", nameKr:"큄멜 사건", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH","FPA","PHZ"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"큄멜 사건이 발생하였다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:799, month:1, id:"SE799_11", nameKr:"양 웬리 모살미수사건", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH","FPA","PHZ"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"양 웬리 원수에 대한 암살 시도가 발생하였으나 미수에 그쳤다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:799, month:8, id:"SE799_12", nameKr:"엘 파실 독립정부 수립", nameEn:"", nameJp:"",
    tags:["사실"], factions:["FPA"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"우주력 799년 8월 13일, 엘 파실에 독립정부가 수립되었다. 바라트 화약 체제에 반발하는 세력이 결집하였다.", effect:"fade", libs:["ST_230017:엘 파실"] }] },
  { yearType:"SE", year:799, month:1, id:"SE799_13", nameKr:"지구교 본거지 토벌작전", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH","FPA","PHZ"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"제국군이 지구교의 본거지를 토벌하는 작전을 전개하였다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:799, month:1, id:"SE799_14", nameKr:"제2차 라그나뢰크 작전", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH","FPA","PHZ"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"라인하르트가 두 번째 라그나뢰크 작전을 개시하였다.", effect:"fade", libs:[] }] },

  // SE 800
  { yearType:"SE", year:800, month:1, id:"SE800_1", nameKr:"제10차 이제르론 공방전", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH","FPA","PHZ"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"열 번째 이제르론 공방전이 벌어졌다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:800, month:1, id:"SE800_2", nameKr:"마르 아데타 성역 회전", nameEn:"Battle of Marr-Adetta", nameJp:"",
    tags:["사실"], factions:["REH","FPA","PHZ"], useYn:false, openPt:0, appearances:["은하영웅전설 8권 <난리편>"],
    desc:[{ index:1, image:"", text:"마르 아데타 성역에서 비텐펠트와 동맹군 사이에 회전이 벌어졌다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:800, month:1, id:"SE800_3", nameKr:"겨울장미원의 칙령", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"겨울장미원에서 칙령이 발포되었다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:800, month:1, id:"SE800_4", nameKr:"로이엔탈 원수 탄핵사건", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"로이엔탈 원수에 대한 탄핵이 제기되는 사건이 발생하였다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:800, month:1, id:"SE800_5", nameKr:"하이네센 대화재", nameEn:"", nameJp:"",
    tags:["사실"], factions:["FPA"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"동맹 수도 하이네센에서 대화재가 발생하였다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:800, month:1, id:"SE800_6", nameKr:"페잔 폭탄테러사건", nameEn:"", nameJp:"",
    tags:["사실"], factions:["PHZ"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"페잔에서 폭탄 테러 사건이 발생하였다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:800, month:1, id:"SE800_7", nameKr:"회랑 전투", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH","FPA","PHZ"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"이제르론 회랑에서 전투가 벌어졌다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:800, month:6, id:"SE800_8", nameKr:"양 웬리 암살사건", nameEn:"Assassination of Yang Wen-li", nameJp:"ヤン・ウェンリー暗殺事件",
    tags:["사실"], factions:["REH","FPA","PHZ"], useYn:false, openPt:0,
    appearances:["은하영웅전설 8권 <난리편>"],
    desc:[{ index:1, image:"", text:"은하 최고의 전략가 양 웬리 원수가 지구교 자객의 손에 암살당하였다. 그의 죽음은 이제르론 공화정부의 구성원들에게 큰 충격을 주었다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:800, month:6, id:"SE800_9", nameKr:"엘 파실 독립정부 해산", nameEn:"", nameJp:"",
    tags:["사실"], factions:["FPA"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"우주력 800년 6월 6일, 엘 파실 독립정부가 해산하였다.", effect:"fade", libs:["ST_230017:엘 파실"] }] },
  { yearType:"SE", year:800, month:8, id:"SE800_10", nameKr:"이제르론 공화정부 수립", nameEn:"", nameJp:"",
    tags:["사실"], factions:["FPA"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"우주력 800년 8월 8일, 양 웬리의 뜻을 이어받은 율리안 민츠를 중심으로 이제르론 공화정부가 수립되었다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:800, month:1, id:"SE800_11", nameKr:"라인하르트 2차 암살미수", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH","PHZ"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"라인하르트 폰 로엔그람에 대한 두 번째 암살 시도가 발생하였으나 미수에 그쳤다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:800, month:1, id:"SE800_12", nameKr:"응웬 킴 호아 광장 사건", nameEn:"", nameJp:"",
    tags:["사실"], factions:["FPA"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"응웬 킴 호아 광장에서 사건이 발생하였다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:800, month:1, id:"SE800_13", nameKr:"노이에란트 전역", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH","FPA","PHZ"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"노이에란트 성역에서 전역이 전개되었다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:800, month:1, id:"SE800_14", nameKr:"우르바시 사건", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"우르바시 사건이 발생하였다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:800, month:1, id:"SE800_15", nameKr:"제2차 란테마리오 회전", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH","FPA","PHZ"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"란테마리오 성역에서 두 번째 대규모 회전이 벌어졌다.", effect:"fade", libs:[] }] },

  // SE 801
  { yearType:"SE", year:801, month:1, id:"SE801_1", nameKr:"하이네센 동란", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH","FPA","PHZ"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"하이네센에서 동란이 발생하였다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:801, month:1, id:"SE801_2", nameKr:"제11차 이제르론 공방전", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH","FPA","PHZ"], useYn:false, openPt:0, appearances:["은하영웅전설 10권 <낙일편>"],
    desc:[{ index:1, image:"", text:"열한 번째 이제르론 공방전이 벌어졌다. 율리안이 이끄는 이제르론 공화정부군과 제국군 사이의 최후의 전투였다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:801, month:1, id:"SE801_3", nameKr:"오베르슈타인의 풀베기", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"오베르슈타인이 로이엔탈과 관련하여 풀베기(숙청)를 단행하였다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:801, month:1, id:"SE801_4", nameKr:"라그풀 교도소 폭동사건", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH","FPA","PHZ"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"라그풀 교도소에서 폭동 사건이 발생하였다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:801, month:1, id:"SE801_5", nameKr:"호랑가시나무관 습격사건", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH","FPA","PHZ"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"호랑가시나무관이 습격당하는 사건이 발생하였다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:801, month:1, id:"SE801_6", nameKr:"시바 성역 회전", nameEn:"Battle of Shiva", nameJp:"シバ星域会戦",
    tags:["사실"], factions:["REH","FPA","PHZ"], useYn:false, openPt:0, appearances:["은하영웅전설 10권 <낙일편>"],
    desc:[{ index:1, image:"", text:"시바 성역에서 제국군과 이제르론 공화정부군 사이의 마지막 대회전이 벌어졌다. 이 전투로 은하영웅전설의 대단원의 막이 내려졌다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:801, month:1, id:"SE801_7", nameKr:"루빈스키의 불 축제", nameEn:"", nameJp:"",
    tags:["사실"], factions:["PHZ"], useYn:false, openPt:0, appearances:[],
    desc:[{ index:1, image:"", text:"전 페잔 자치령주 루빈스키가 최후의 공작을 벌인 사건이다.", effect:"fade", libs:[] }] },
  { yearType:"SE", year:801, month:1, id:"SE801_8", nameKr:"벨제데 임시 황궁 습격사건", nameEn:"", nameJp:"",
    tags:["사실"], factions:["REH","PHZ"], useYn:false, openPt:0, appearances:["은하영웅전설 10권 <낙일편>"],
    desc:[{ index:1, image:"", text:"라인하르트가 머무는 벨제데 임시 황궁이 습격당하는 사건이 발생하였다.", effect:"fade", libs:[] }] },
];
