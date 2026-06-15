// ================================================================
//  starSystemData.js — 성계 마스터 (불변)
//  code: 230001~ (ABC순으로 최초값 생성, 이후 추가순, unique key)
//  행성 코드: {code}P01~P99
// ================================================================

/** TODO
 *  위치 : x축 y축 (%단위)
 *  연결 : 연결성계(현 위치 기준으로 n시 방향)
 *  행성 : 해당 성계 내 보유 행성
 *
 *  위와 비슷한 패턴의 주석을 참조하여, 'x, y 전부 개선', 'lane.js 수정','/maps/폴더 내의 행성 수정 또는 생성'
 * */

/** TODO
 * alias : []
 * 검색어 리스트. 한영일 모두 포함되어 들어감
 * */

// export const
// 이 위치에 추가 기능 생성. 성계 데이터 getter

export const STAR_SYSTEMS = [
  /** 230001_ALMENTFUBEEL
   *  위치 : 70 45
   *  연결 : 230048_SCHACHEN(7)
   *        230028_KIPOIZER(4)
   *  행성 : 바텐-도라흐 */
  {
    code: "230001",
    nameKr: "알멘트푸벨",
    nameEn: "ALMENTFUBEEL",
    nameJp: "",
    alias:    ["알멘트푸벨", "Almentfubeel", "ALMENTFUBEEL"],
    x: 1120,
    y: 450,
    desc: "제국 서북부 성계.",
  },
  /** 230002_ALTENER
   *  위치 : 85 85
   *  연결 : 230009_BRUNSCHWEIG(11)
   *        230024_JOTUNHEIM(8)
   *        230038_MARBACH(2)
   *  행성 : 가이에스부르크 > 인공요새.
   *        헤세-카셀 > 알테너 성계의 중심행성. 가이에스부르크로 물자를 조달하기 위한 농업시설과 소규모 조병창이 있다. */
  {
    code: "230002",
    nameKr: "알테너",
    nameEn: "ALTENER",
    nameJp: "",
    alias:    ["알테너", "Altener", "ALTENER", "알테나", "Altena", "가이에스부르크"],
    x: 1360,
    y: 850,
    desc: "가이에스부르크 요새가 위치한 성계.",
  },
  /** 230003_AMRITZER
   *  위치 : 62 23
   *  연결 : 230022_ALTENA(9)
   *        230008_BODEN(2)
   *        230044_FORGEN(5)
   *  행성 : 클라인겔트 > 클라인겔트 자작의 영지.
   *        도벨그
   *        모르겐  */
  {
    code: "230003",
    nameKr: "암릿처",
    nameEn: "AMRITZER",
    nameJp: "",
    alias:    ["암릿처", "Amritsar", "AMRITSAR", "암릿자", "Amlitzer"],
    x: 992,
    y: 230,
    desc: `이제르론 회랑의 제국측 입구에 위치한 성계. 이제르론 요새 건설 전까지는 주요 분쟁 지역 중 하나였으나 요새 건설 이후 안정기를 겪고 있다.`,
  },
  /** 230004_ARLESHEIM
   *  위치 : 48 34
   *  연결 : 230022_ALTENA(2)
   *        230041_PALANTIA(10)
   *  행성 : 탄므즈 >
   */
  {
    code: "230004",
    nameKr: "아레스하임",
    nameEn: "ARLESHEIM",
    nameJp: "",
    alias:    ["아레스하임", "Arlesheim", "ARLESHEIM", "알레스하임", "알레스하임 성역"],
    x: 768,
    y: 340,
    desc: "이제르론 회랑 인근 동맹령 성계",
  },
  /** 230005_ASTARTE
   *  위치 : 43 20
   *  연결 : 230010_DAGON(12)
   *        230011_DORIA(9)
   *        230017_EL-PACIL(7)
   *        230041_PALANTIA(6)
   *        230060_VANFLEET(4)
   *  행성 : 아트라-하시스
   *        아스페륀
   *        우가리트
   */
  {
    code: "230005",
    nameKr: "아스타테",
    nameEn: "ASTARTE",
    nameJp: "",
    alias:    ["아스타테", "Astarte", "ASTARTE", "아스타데", "Astate", "아스타테 성역"],
    x: 688,
    y: 200,
    desc: `자유행성동맹의 북동부 성계군의 중심 성계. 지리적 위치로 인해 수많은 격전이 벌어진 장소이다.`,
  },
  /** 230006_BAALAT
   *  위치 : 33 05
   *  연결 : 230047_RIOPUERDE
   *        230063_KERIM
   *  행성 : 하이네센
   *        테르누젠
   *        스리나가르(시뤼나갈에서 변경) */
  {
    code: "230006",
    nameKr: "바라트",
    nameEn: "BA'ALAT",
    nameJp: "",
    alias:    ["바라트", "Ballat", "BALLAT", "BA'ALAT", "바알라트", "바라트 성계"],
    x: 80,
    y: 330,
    desc: "자유행성동맹의 수도 성계. 하이네센을 중심으로 세 개의 행성이 있다.",
  },
  /** 230007_BALATROOP
   *  위치 : 42 79
   *  연결 : 230065_SCHATTENBURG(3)
   *        230034_LUNBINI(10)
   *  행성 : 프르샤-스쿠타
   */
  {
    code: "230007",
    nameKr: "바라투르프",
    nameEn: "BALATROOP",
    nameJp: "",
    alias:    ["바라투르프", "Balatroop", "BALATROOP", "바라트루프"],
    x: 620,
    y: 810,
    desc: "동맹 남방의 거점 성계. 페잔회랑으로 진입하기 위한 주요 길목 중 하나이다.",
  },
  /** 230008_BODEN
   *  위치 : 68 13
   *  연결 : 230067_MUKKENBERGER(6)
   *        230003_AMRITZER(7)
   *        230062_VILLENSTEIN(5)
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
    alias:    ["보덴", "Boden", "BODEN"],
    x: 1088,
    y: 130,
    desc: `이제르른 회랑으로 진입하기 위한 주요 성계 중 하나`,
  },
  /** 230009_BRUNSCHWEIG
   *  위치 : 83 66
   *  연결 : 230028_KIFOISER(11시)
   *        230002_ALTENER(5시)
   *        230038_MARBACH(4시)
   *        230019_FREYA(1시)
   *        230032_LITTENHEIM(12시)
   *  행성 : 톤도르프 > 인구 50만명의 주요 도시. 인구는 적지만 고위 문벌 귀족과 시종들만 거주하는 호화도시로 은하제국 내 문화예술의 중심지이다.
   *        베스타란트 > 인구 200만명의 극도로 건조한 사막행성으로 사람이 거주하기 대단히 힘든 환경이다. 희귀금속이 많은 지역 */
  {
    code: "230009",
    nameKr: "브라운슈바이크",
    nameEn: "BRUNSCHWEIG",
    nameJp: "",
    alias:    ["브라운슈바이크", "Brunschweig", "BRUNSCHWEIG", "Braunschweig"],
    x: 1328,
    y: 660,
    desc: "브라운슈바이크 공작령의 중심 성계",
  },
  /** 230010_DAGON
   *  위치 : 41 06
   *  연결 : 230016_ELGON(8)
   *        230005_ASTARTE(6)
   *        230055_TIAMAT(4)
   *  행성 : 카프튜랑카
   */
  {
    code: "230010",
    nameKr: "다곤",
    nameEn: "DAGON",
    nameJp: "",
    alias:    ["다곤", "Dagon", "DAGON", "다곤 성역", "다곤 성계", "Dagon Starfield"],
    x: 656,
    y: 60,
    desc: "아스타테 성계 주변의 외곽 성계.",
  },
  /** 230011_DORIA
   *  위치 : 38 13
   *  연결 : 230016_ELGON(9)
   *        230005_ASTARTE(3)
   *  행성 : 델모퓌라이
   *        보이오이아
   */
  {
    code: "230011",
    nameKr: "도리아",
    nameEn: "DORIA",
    nameJp: "",
    alias:    ["도리아", "Doria", "DORIA", "도리아 성역"],
    x: 608,
    y: 130,
    desc: "아스타테 성계에서 본격적인 동맹령으로 진입하기 위한 주요 기점",
  },
  /** 230012_ECKHART
   *  위치 : 64 75
   *  연결 : 230048_SCHACHEN(1)
   *        230014_EISENHERZ(7)
   *  행성 : 자크스-코프르크
   */
  {
    code: "230012",
    nameKr: "에크하르트",
    nameEn: "ECKHART",
    nameJp: "",
    alias:    ["에크하르트", "Eckhart", "ECKHART"],
    x: 1025,
    y: 800,
    desc: "자크스-코프르크의 단일 행성 성계. 페잔과의 통로 인근에 위치하고 있다.",
  },
  /** 230013_ELUCERA
   *  위치 : 03 72
   *  연결 : 230047_RIO-VERDE(1)
   *        230053_TANATUS(5)
   *  행성 : 악타이온
   */
  {
    code: "230013",
    nameKr: "엘류세라",
    nameEn: "ELUCERA",
    nameJp: "",
    alias:    ["엘류세라", "Elucera", "ELUCERA", "엘류셀러", "엘류셀러 성역"],
    x: 48,
    y: 720,
    desc: "동맹 서부 성계.",
  },
  /** 230014_EISENHERZ
   *  위치 : 60 90
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
    alias:    ["아이젠헤르츠", "Eisenherz", "EISENHERZ"],
    x: 960,
    y: 900,
    desc: "페잔 회랑의 은하제국 쪽 출구에 위치한 성계.",
  },
  /** 230015_EISENHUT
   *  위치 : 68 85
   *  연결 : 230012_ECKHART(11)
   *        230014_EISENHERZ(7)
   *        230059_WARTENBERG(1)
   *  행성 : 다룸슈타트
   */
  {
    code: "230015",
    nameKr: "아이젠후트",
    nameEn: "EISENHUT",
    nameJp: "",
    alias:    ["아이젠후트", "Eisenhut", "EISENHUT", "Eishnhut"],
    x: 1088,
    y: 850,
    desc: "제국 남방에 위치한 성계.",
  },
  /** 230016_ELGON
   *  위치 : 32 13
   *  연결 : 230051_SYVA(6)
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
    alias:    ["엘곤", "Elgon", "ELGON"],
    x: 512,
    y: 130,
    desc: `동맹의 북부와 중앙을 잇는 중요한 거점 성계. 다수의 번영한 행성들이 존재하고 있다.`,
  },
  /** 230017_EL-PACIL
   *  위치 : 35 30
   *  연결 : 230010_DAGON(11)
   *        230005_ASTARTE(2)
   *  행성 : 엘-파실
   *        에스트레마도라
   */
  {
    code: "230017",
    nameKr: "엘-파실",
    nameEn: "EL-PACIL",
    nameJp: "",
    alias:    ["엘-파실", "El Facil", "ELFACIL", "El-Facil", "엘 파실", "엘파실", "엘 파실 성역"],
    x: 560,
    y: 300,
    desc: "동맹의 북부에 위치한 성계",
  },
  /** 230018_FIREZARD
   *  위치 : 42 50
   *  연결 : 230041_PALANTIA(12)
   *        230068_FORSETI(4)
   *  행성 : 우가리트
   *        라트보트
   */
  {
    code: "230018",
    nameKr: "파이어자드",
    nameEn: "FIREZARD",
    nameJp: "",
    alias:    ["파이어져드", "Firezard", "FIREZARD", "파이어자드"],
    x: 672,
    y: 500,
    desc: "동맹의 북부와 남부를 이어주는 주요 거점 행성.",
  },
  /** 230019_FREYA
   *  위치 : 88 40
   *  연결 : 230058_VALHALLA(5)
   *        230009_BRUNSCHWEIG(7)
   *        230050_SHANTAU(11)
   *  행성 : 렌텐베르크
   *        니플헤임
   */
  {
    code: "230019",
    nameKr: "프레이아",
    nameEn: "FREYA",
    nameJp: "",
    alias:    ["프레야", "Freya", "FREYA", "Freva"],
    x: 1408,
    y: 400,
    desc: "발할라 성계로 가는 입구. 렌텐베르크 요새가 존재한다.",
  },
  /** 230020_GANDHALVA
   *  위치 : 22 70
   *  연결 : 230057_TRIPLA(6)
   *        230045_LYGALL(9)
   *        230061_VERMILION(12)
   *        230046_RANTEMARIO(4)
   *  행성 : 우르바시 > 인구 10만명의 서늘한 기후가 특징인 행성. 과거 행성개발기업에서 개발을 추진하였으나 실패하여 현재는 버려진 상태이다.
   *        프라바스
   */
  {
    code: "230020",
    nameKr: "간다르바",
    nameEn: "GANDHALVA",
    nameJp: "",
    alias:    ["간다르바", "Gandhalva", "GANDHALVA", "간달바", "Gandharva", "간다르바 성계"],
    x: 352,
    y: 700,
    desc: "동맹 남부 성계의 주요 거점 성계.",
  },
  /** 230021_HACHN
   *  위치 : 60 47
   *  연결 : 230044_FORGEN(1)
   *        230048_SCHACHEN(4)
   *  행성 : 자르펠트
   */
  {
    code: "230021",
    nameKr: "하안",
    nameEn: "HACHN",
    nameJp: "",
    alias:    ["하안", "Hachn", "HACHN"],
    x: 960,
    y: 470,
    desc: "이제르론 회랑 인근 외곽 성계",
  },
  /** 230022_ALTENA
   *  위치 : 55 30
   *  연결 : 230055_TIAMAT(11)
   *        230060_VANFLEET(9)
   *        230004_ARLESHEIM(7)
   *        230003_AMRITZER(1)
   *  행성 : 이제르론
   */
  {
    code: "230022",
    nameKr: "알테나",
    nameEn: "ALTENA",
    nameJp: "",
    alias:    ["알테나", "Altena", "ALTENA", "이제르론", "이젤론", "Iserlohn", "ISERLOHN", "이제르론 요새", "알테나 성계"],
    x: 880,
    y: 300,
    desc: `은하제국과 자유행성동맹간 거대한 항행불가 지역인 사르갓소 지역의 틈새에 존재하는 성역
    인공천체인 이제르론 요새가 유명하여 이제르론 성계라고도 불린다.`,
  },
  /** 230023_JYAMSEED
   *  위치 : 23 40
   *  연결 : 230063_KERIM(11)
   *        230046_RANTEMARIO(5)
   *        230051_SYVA(1)
   *  행성 : 다프테-잠시드
   *        카퍼
   */
  {
    code: "230023",
    nameKr: "잠시드",
    nameEn: "JYAMSEED",
    nameJp: "",
    alias:    ["잠시드", "Jyamseed", "JYAMSEED", "잠지드", "잠시드 성역", "Jamsid"],
    x: 368,
    y: 400,
    desc: ``,
  },
  /** 230024_JOTUNHEIM
   *  위치 : 78 90
   *  연결 : 230059_WARTENBERG(11)
   *        230002_ALTENER 1
   *  행성 : 로스바흐
   */
  {
    code: "230024",
    nameKr: "요툰하임",
    nameEn: "JOTUNHEIM",
    nameJp: "",
    alias:    ["요툰하임", "Jotunheim", "JOTUNHEIM"],
    x: 1248,
    y: 900,
    desc: `은하제국의 최남단에 위치한 성계`,
  },
  /** 230026_KASTOROP
   *  위치 : 98 65
   *  연결 : 230058_VALHALLA(11시)
   *        230039_MARIENDORF(7시)
   *  행성 : 카스트로프 > 카스트로프의 제 2 행성. 성계 내 최대의 행성으로 소수의 귀족들이 화려한 생활을 하고 있다.
   *        라파트 > 카스트로프의 제 1 행성. 농업행성으로 많은 곡물이 생성되나, 가혹한 수탈로 인해 식량 사정은 썩 좋지 못하다
   *        케니히그라흐 > 카스트로프 행성과 인접한 위성. 행성을 보호하기 위한 아르테미스의 목걸이가 설치되어 있다. */
  {
    code: "230026",
    nameKr: "카스트로프",
    nameEn: "KASTOROP",
    nameJp: "",
    alias:    ["카스트로프", "Kastorop", "KASTOROP", "Castrop", "카스트로프 성계"],
    x: 1568,
    y: 650,
    desc: "카스트로프 공작령.",
  },
  /** 230028_KIFOISER
   *  위치 : 77 55
   *  연결 : 230009_BRUNSCHWEIG(5)
   *        230050_SHANTAU(1)
   *        230059_WARTENBERG(6)
   *        230001_ALMENTFUBEEL(10)
   *  행성 : 가르미슈
   *        스루즈헤임
   *        가랴르호른 */
  {
    code: "230028",
    nameKr: "키포이져",
    nameEn: "KIFOISER",
    nameJp: "",
    alias:    ["키포이져", "Kifoiser", "KIFOISER", "키포이저", "Kifoizer", "Kythhäuser"],
    x: 1232,
    y: 550,
    desc: "브리운슈바이크 공작령의 영향권에 있는 성계이다.",
  },
  /** 230030_LICHTENLADE
   *  위치 : 94 28
   *  연결 : 230056_TRABACH(11)
   *        230058_VALHALLA(6)
   *  행성 : 에르힌겐 */
  {
    code: "230030",
    nameKr: "리히텐라데",
    nameEn: "LICHTENLADE",
    nameJp: "",
    alias:    ["리히텐라데", "Lichtenlade", "LICHTENLADE", "리히텐라드"],
    x: 1504,
    y: 280,
    desc: "",
  },
  /** 230032_LITTENHEIM
   *  위치 : 83 45
   *  연결 : 230050_SHANTAU(12)
   *        230009_BRUNSCHWEIG(6)
   *  행성 : 퀴스트린
   *        에르뮐 */
  {
    code: "230032",
    nameKr: "리텐하임",
    nameEn: "LITTENHEIM",
    nameJp: "",
    alias:    ["리텐하임", "Littenheim", "LITTENHEIM"],
    x: 1328,
    y: 450,
    desc: "",
  },
  /** 230033_ROFORTEN
   *  위치 : 11 50
   *  연결 : 230061_VERMILION(2)
   *        230054_TASSILI(4)
   *        230047_RIO-VERDE(7)
   *  행성 : 키베론
   *        루드밀라 */
  {
    code: "230033",
    nameKr: "로포덴",
    nameEn: "ROFORTEN",
    nameJp: "",
    alias:    ["로포덴", "Roforten", "ROFORTEN", "로포턴"],
    x: 176,
    y: 500,
    desc: "동맹 중부 성계.",
  },
  /** 230034_LUNBINI
   *  위치 : 35 65
   *  연결 : 230052_SHUPALA(11)
   *        230049_SHANDALUA(2)
   *        230007_BALATROOP(4)
   *  행성 : 카스티리오네 */
  {
    code: "230034",
    nameKr: "룬비니",
    nameEn: "LUNBINI",
    nameJp: "",
    alias:    ["룬비니", "Lunbini", "LUNBINI", "룸비니", "Lumbini"],
    x: 560,
    y: 650,
    desc: "동맹 남부 성계.",
  },
  /** 230035_LYUCAS
   *  위치 : 20 55
   *  연결 : 230061_VERMILION(11)
   *        230046_RANTEMARIO(4)
   *  행성 : 비트리아 */
  {
    code: "230035",
    nameKr: "뤼카스",
    nameEn: "LYUCAS",
    nameJp: "",
    alias:    ["뤼카스", "Lyucas", "LYUCAS", "류카스", "Luykas", "뤼카스 성계"],
    x: 320,
    y: 550,
    desc: "",
  },
  /** 230037_MARR-ADETTA
   *  위치 : 30 65
   *  연결 : 230052_SHUPALA(1)
   *        230046_RANTEMARIO(6)
   *  행성 : 파프라비 */
  {
    code: "230037",
    nameKr: "마르-아데타",
    nameEn: "MARR-ADETTA",
    nameJp: "",
    alias:    ["마르-아데타", "Marr-Adetta", "MARR-ADETTA", "마르 아데타", "마르아데타", "Mal Adetta", "마르 아데타 성역"],
    x: 480,
    y: 650,
    desc: ``,
  },
  /** 230038_MARBACH
   *  위치 : 90 70
   *  연결 : 230009_BRUNSCHWEIG(11)
   *        230002_ALTENER(7)
   *        230039_MARIENDORF(4)
   *  행성 : 민덴 */
  {
    code: "230038",
    nameKr: "마르바흐",
    nameEn: "MARBACH",
    nameJp: "",
    alias:    ["마르바흐", "Marbach", "MARBACH"],
    x: 1440,
    y: 700,
    desc: "",
  },
  /** 230039_MARIENDORF
   *  위치 : 94 80
   *  연결 : 230026_KASTOROP(1)
   *        230038_MARBACH(11)
   *  행성 : 테레젠슈타트 */
  {
    code: "230039",
    nameKr: "마린도르프",
    nameEn: "MARIENDORF",
    nameJp: "",
    alias:    ["마린도르프", "Mariendorf", "MARIENDORF"],
    x: 1504,
    y: 800,
    desc: "마린도르프 백작령",
  },
  /** 230041_PALANTIA
   *  위치 : 43 35
   *  연결 : 230005_ASTARTE(12)
   *        230004_ARLESHEIM(4)
   *        230018_FIREZARD(7)
   *  행성 : 케르코포르타 */
  {
    code: "230041",
    nameKr: "팔란티아",
    nameEn: "PALANTIA",
    nameJp: "",
    alias:    ["팔란티아", "Palantia", "PALANTIA", "Palntia"],
    x: 688,
    y: 350,
    desc: `자유행성동맹의 북부지역과 남부지역을 연결하는 위치에 존재하는 성계.`,
  },
  /** 230042_PHEZZAN
   *  위치 : 53 75
   *  연결 : 230065_SCHATTENBURG(3)
   *        230066_LICHTENBERG(9)
   *  행성 : 페잔 */
  {
    code: "230042",
    nameKr: "페잔",
    nameEn: "PHEZZAN",
    nameJp: "フェザーン",
    alias:    ["페잔", "Phezzan", "PHEZZAN", "페샨", "Phessan", "페잔 자치령"],
    x: 848,
    y: 740,
    desc: "페잔 자치령 수도. 제국과 동맹 사이의 무역 중심지. 페잔 회랑의 열쇠.",
  },
  /** 230043_POLEVIT
   *  위치 : 38 95
   *  연결 : 230065_SCHATTENBURG(2)
   *        230046_RANTEMARIO(10)
   *  행성 : 루지아나 */
  {
    code: "230043",
    nameKr: "포레비트",
    nameEn: "POLEVIT",
    nameJp: "",
    alias:    ["포레비트", "Polevit", "POLEVIT", "Porevit", "포레비토 성역"],
    x: 608,
    y: 950,
    desc: "페잔 남방 중립 성계.",
  },
  /** 230044_FORGEN
   *  위치 : 66 35
   *  연결 : 230003_AMRITZER(11)
   *        230021_HACHN(7)
   *  행성 : 하펜 */
  {
    code: "230044",
    nameKr: "포르겐",
    nameEn: "FORGEN",
    nameJp: "",
    alias:    ["포르겐", "Forgen", "FORGEN"],
    x: 1056,
    y: 350,
    desc: "제국 북방 성계.",
  },
  /** 230045_LYGALL
   *  위치 : 14 75
   *  연결 : 230054_TASSILI(12)
   *        230020_GANDHALVA(1)
   *        230057_TRIPLA(4)
   *  행성 : 마그-토레드 */
  {
    code: "230045",
    nameKr: "라이갈",
    nameEn: "LYGALL",
    nameJp: "",
    alias:    ["라이갈", "Lygall", "LYGALL", "라이갈 성역"],
    x: 224,
    y: 750,
    desc: "동맹 남서부 성계.",
  },

  /** 230046_RANTEMARIO
   *  위치 : 28 78
   *  연결 : 230043_POLEVIT(5)
   *        230037_MARR-ADETTA(1)
   *        230023_JYAMSEED(잠시드)(11)
   *        230020_GANDHALVA(10)
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
    alias:    ["란테마리오", "Rantemario", "RANTEMARIO", "란테마리오 성역"],
    x: 448,
    y: 780,
    desc: "동맹 남서부 성계. 란테마리오 회전의 격전지.",
  },
  /** 230047_RIO-VERDE
   *  위치 : 8 61
   *  연결 : 230006_BAALAT(11)
   *        230033_ROFORTEN(1)
   *        230053_TANATUS(5)
   *        230013_ELUCERA(7)
   *  행성 : 아로요-드-모리노
   *        카시나
   */
  {
    code: "230047",
    nameKr: "리오-베르데",
    nameEn: "RIO-VERDE",
    nameJp: "",
    alias:    ["리오-베르데", "Rio Verde", "RIO-VERDE", "리오베르데", "Rio-Verde", "리오 베르데 성역"],
    x: 128,
    y: 610,
    desc: "동맹 남부 성계.",
  },
  /** 230048_SCHACHEN
   *  위치 : 66 60
   *  연결 : 230021_HACHN(11)
   *        230001_ALMENTFUBEEL(1)
   *        230012_ECKHART(7)
   *  행성 : 슈바르츠부르크
   */
  {
    code: "230048",
    nameKr: "샤헨",
    nameEn: "SCHACHEN",
    nameJp: "",
    alias:    ["샤헨", "Schachen", "SCHACHEN"],
    x: 1056,
    y: 600,
    desc: "제국 서북부 성계.",
  },
  /** 230049_SHANDALUA
   *  위치 : 44 65
   *  연결 : 230068_FORSETI(1)
   *        230034_LUNBINI(8)
   *  행성 : 알에리스
   */
  {
    code: "230049",
    nameKr: "샨다르아",
    nameEn: "SHANDALUA",
    nameJp: "",
    alias:    ["샨다르아", "Shandaula", "SHANDAULA", "샨달루아", "Shandalua", "샨달루아 성역"],
    x: 704,
    y: 650,
    desc: "동맹 남부 성계.",
  },
  /** 230050_SHANTAU
   *  위치 : 81 30
   *  연결 : 230062_VILLENSTEIN(11)
   *        230056_TRABACH(2)
   *        230032_LITTENHEIM(6)
   *        230028_KIFOISER(7)
   *  행성 : 에스링그
   *        크네스도르프
   *        폰트노이
   */
  {
    code: "230050",
    nameKr: "샨타우",
    nameEn: "SHANTAU",
    nameJp: "",
    alias:    ["샨타우", "Shantau", "SHANTAU", "샨다우"],
    x: 1296,
    y: 300,
    desc: "제국 중부 성계.",
  },

  /** 230051_SYVA
   *  위치 : 30 30
   *  연결 : 엘곤(12)
   *        230023_JYAMSEED(잠시드)(8)
   *  행성 : 미트라
   *        지비에
   */
  {
    code: "230051",
    nameKr: "시바",
    nameEn: "SYVA",
    nameJp: "",
    alias:    ["시바", "Syva", "SYVA", "시바 성계", "Shiva", "희바"],
    x: 480,
    y: 300,
    desc: "회랑 남방 성계.",
  },
  /** 230052_SHUPALA
   *  위치 : 35 55
   *  연결 : 230037_마르-아데타(7)
   *        230034_LUNBINI(6)
   *  행성 : 에레키슈갈
   */
  {
    code: "230052",
    nameKr: "슈팔라",
    nameEn: "SHUPALA",
    nameJp: "",
    alias:    ["슈팔라", "Shupala", "SHUPALA", "슈파라"],
    x: 560,
    y: 550,
    desc: `자유행성동맹의 남부에 위치한 성계`,
  },
  /** 230053_TANATUS
   *  위치 : 10 85
   *  연결 : 230047_RIO-VERDE(12)
   *        230013_ELUCERA(10)
   *        230057_TRIPLA(3)
   *  행성 : 에코니아> 녹지화 테라포밍을 계획했으나 경제적 어려움으로 중단되어 10만여명 정도가 거주중인 사막형 행성
   *        마스지드
   */
  {
    code: "230053",
    nameKr: "타나투스",
    nameEn: "TANATUS",
    nameJp: "",
    alias:    ["타나투스", "Tanatus", "TANATUS", "타나토스", "Thanatos", "타나토스 성계"],
    x: 160,
    y: 850,
    desc: "동맹 포로수용소 에코니아가 있는 성계.",
  },
  /** 230054_TASSILI
   *  위치 : 15 60
   *  연결 : 230045_LYGALL(6)
   *        230033_ROFORTEN(11)
   *  행성 : 파라스
   */
  {
    code: "230054",
    nameKr: "타실리",
    nameEn: "TASSILI",
    nameJp: "",
    alias:    ["타시리", "Tassili", "TASSILI", "탓시리", "탓시리 성역"],
    x: 240,
    y: 600,
    desc: "동맹 남서부 성계.",
  },
  /** 230055_TIAMAT
   *  위치 : 48 13
   *  연결 : 230010_DAGON(10)
   *        230022_ALTENA(4)
   *  행성 : 라므
   *        안샤르
   *        레그니처
   *        카프체란카
   */
  {
    code: "230055",
    nameKr: "티아메트",
    nameEn: "TIAMAT",
    nameJp: "",
    alias:    ["티아메트", "Tiamat", "TIAMAT", "티아마트", "티아매트", "티아마트 성역"],
    x: 768,
    y: 130,
    desc: "티아메트 성역",
  },

  /** 230056_TRABACH
   *  위치 : 88 14
   *  연결 : 230050_SHANTAU(7)
   *        230030_LICHTENLADE(5)
   *  행성 : 호포키르히
   *        비텐베르크
   */
  {
    code: "230056",
    nameKr: "트라바흐",
    nameEn: "TRABACH",
    nameJp: "",
    alias:    ["트라바흐", "Trabach", "TRABACH"],
    x: 1408,
    y: 140,
    desc: "제국 북방 외곽에 존재하는 성계.",
  },
  /** 230057_TRIPLA
   *  위치 : 20 85
   *  연결 : 230020_GANDHALVA(1)
   *        230053_TANATUS(9)
   *        230045_LYGALL(10)
   *  행성 : 팔머랜드
   */
  {
    code: "230057",
    nameKr: "트리플라",
    nameEn: "TRIPLA",
    nameJp: "",
    alias:    ["트리폴라", "Tripla", "TRIPLA", "트리플러", "Tripler", "트리플러 성역"],
    x: 320,
    y: 850,
    desc: "동맹 남방 성계.",
  },
  /** 230058_VALHALLA
   *  위치 : 94 58
   *  연결 : 230030_LICHTENLADE(12)
   *        230019_FREYA(10)
   *        230026_KASTOROP(5)
   *  행성 : 오딘 > 발할라 성계에 위치한 3행성. 은하제국의 수도.
   *        아스가르즈 > 발할라 성계에 위치한 2행성.
   *        유그드라실 > 발할라 성계에 위치한 1행성. */
  {
    code: "230058",
    nameKr: "발할라",
    nameEn: "VALHALLA",
    nameJp: "ヴァルハラ",
    alias:    ["발할라", "Valhalla", "VALHALLA", "왈할라", "Walhalla", "발할라 성계"],
    x: 1504,
    y: 580,
    desc: "은하제국의 수도 성계. 오딘을 중심으로 세 개의 행성이 있다.",
  },
  /** 230059_WARTENBERG
   *  위치 : 75 80
   *  연결 : 230028_KIFOISER(12)
   *        230024_JOTUNHEIM(5)
   *        230015_EISENHUT(7)
   *  행성 : 브렌하임
   *        카르슈타트 */
  {
    code: "230059",
    nameKr: "바르텐베르크",
    nameEn: "WARTENBERG",
    nameJp: "",
    alias:    ["바르텐베르크", "Wartenberg", "WARTENBERG"],
    x: 1200,
    y: 800,
    desc: "제국 남부 성계.",
  },
  /** 230060_VANFLEET
   *  위치 : 48 25
   *  연결 : 230022_ALTENA(3)
   *        230005_ASTARTE(9)
   *  행성 : 카토르브러 */
  {
    code: "230060",
    nameKr: "밴플리트",
    nameEn: "VANFLEET",
    nameJp: "",
    alias:    ["밴플리트", "Vanfleet", "VANFLEET", "반플리트", "Van-Fleet", "반플리트 4-2"],
    x: 768,
    y: 250,
    desc: "제국·동맹 양측의 쟁탈전이 벌어진 분쟁 성계.",
  },
  /** 230061_VERMILION
   *  위치 : 15 40
   *  연결 : 230035_LYUCAS(4)
   *        230033_ROFORTEN(7)
   *        230020_GANDHALVA(5)
   *  행성 : 몽마라유 */
  {
    code: "230061",
    nameKr: "버밀리온",
    nameEn: "VERMILION",
    nameJp: "",
    alias:    ["버밀리온", "Vermilion", "VERMILION", "바미리온", "버밀리온 성역"],
    x: 240,
    y: 400,
    desc: "버밀리온 성역.",
  },
  /** 230062_VILLENSTEIN
   *  위치 : 75 20
   *  연결 : 230050_SHANTAU(4)
   *        230008_BODEN(11)
   *  행성 : 레오폴트슈타트
   *        그라츠
   *        야반하르 */
  {
    code: "230062",
    nameKr: "빌렌슈타인",
    nameEn: "VILLENSTEIN",
    nameJp: "",
    alias:    ["빌렌슈타인", "Villenstein", "VILLENSTEIN", "빌렌스타인", "Vilenstein"],
    x: 1200,
    y: 200,
    desc: "제국 동부 성계.",
  },
  /** 230063_KERIM
   *  위치 : 15 20
   *  연결 : 230023_JYAMSEED(잠시드)(4)
   *        230006_BAALAT(7)
   *  행성 : 네프티스
   *        이제크온
   */
  {
    code: "230063",
    nameKr: "케림",
    nameEn: "KERIM",
    nameJp: "",
    alias:    ["케림", "Kerim", "KERIM", "케륨", "케리므", "케림 성역"],
    x: 240,
    y: 200,
    desc: "",
  },
  /** 230065_SCHATTENBURG
   *  위치 : 50 75
   *  연결 : 230007_BALATROOP(9)
   *        230043_POLEVIT(7)
   *        230042_PHEZZAN(3)
   *  행성 : ''
   */
  {
    code: "230065",
    nameKr: "샤텐부르크",
    nameEn: "SCHATTENBURG",
    nameJp: "",
    alias:    ["샤텐부르크", "Schattenburg", "SCHATTENBURG"],
    x: 718,
    y: 750,
    desc: `페잔 회랑의 자유행성동맹쪽 출구. 후일 샤텐부르크 요새가 건설된다.`,
  },

  /** 230066_LICHTENBERG
   *  위치 : 55 75
   *  연결 : 230014_EISENHERZ(5)
   *        230042_PHEZZAN(9)
   *  행성 : ''
   */
  {
    code: "230066",
    nameKr: "리히텐부르크",
    nameEn: "LICHTENBERG",
    nameJp: "",
    alias:    ["리히텐부르크", "Lichtenberg", "LICHTENBERG"],
    x: 960,
    y: 750,
    desc: `페잔 회랑의 은하제국쪽 출구. 후일 삼원수의 성이 지어지게 된다.`,
  },
  /** 230069_TERRA
   *  위치 : 75 37
   *  연결 : 연결행성 없음 (추후 구현 예정)
   *  행성 : 지구
   */
  {
    code: "230069",
    nameKr: "테라",
    nameEn: "TERRA",
    nameJp: "",
    alias:    ["테라", "Terra", "TERRA", "지구", "Earth"],
    x: 1408,
    y: 250,
    desc: `인류의 요람.`,
  },
  /** 230067_MUKKENBERGER
   *  위치 : 68 20
   *  연결 : 230008_BODEN(12)
   *  행성 : 지구
   */
  {
    code: "230067",
    nameKr: "뮈켄베르거",
    nameEn: "MÜKKENBERGER",
    nameJp: "",
    alias:    ["뮈켄베르거", "Muckenberger", "MUCKENBERGER", "Mükkenberger"],
    x: 1100,
    y: 215,
    desc: "제국 북동부 지역에서 가장 거대한 성계.",
  },
  // */

  //
  /** 230068_FORSETI
   *  위치 : 50 55
   *  연결 : 230018_FIREZARD(10)
   *        230049_SHANDALUA(7)
   *  행성 : ?
   */
  {
    code: "230068",
    nameKr: "포르세티",
    nameEn: "FORSETI",
    nameJp: "",
    alias:    ["포르세티", "Forseti", "FORSETI", "Folseti"],
    x: 762,
    y: 565,
    desc: "동맹 남부의 변방성계",
  },
  // /** 구현 필요 없음. 추후 구현 예정이니 주석만 유지할 것
  // // {
  // //   code: "",
  // //   nameKr: "리겔",
  // //   nameEn: "RIGEL",
  // //   nameJp: "",
  // //   x: 0,
  // //   y: 0,
  // //   type: "normal",
  // //   desc: `오리온 자리에 위치한 항성계로 루돌프 폰 골덴바움의 첫 임지였다.`,
  // // },
  // */
  // /** 구현 필요 없음. 추후 구현 예정이니 주석만 유지할 것
  // // {
  // //   code: "",
  // //   nameKr: "알데바란",
  // //   nameEn: "Aldebaran",
  // //   nameJp: "",
  // //   x: 0,
  // //   y: 0,
  // //   type: "normal",
  // //   desc: `은하연방의 수도성계`,
  // // },
  // */
  // ================================================================
  // 미등록 성계 (나무위키 세계관 문서 참조, 추후 추가 검토)
  // ================================================================

  // 제국 영역
  // { code: "230???", nameKr: "알타이르 성계",    nameEn: "ALTAIR",      desc: "알타이르 제7행성 존재" },
  // { code: "230???", nameKr: "베텔기우스 성계",   nameEn: "BETELGEUSE",  desc: "루돌프 폰 골덴바움 우주해적 소탕 지역" },
  // { code: "230???", nameKr: "카노프스 성계",     nameEn: "CANOPUS",     desc: "소설 6권 언급" },
  // { code: "230???", nameKr: "프록시마 성계",     nameEn: "PROXIMA",     desc: "제5행성 프로세르피 존재" },
  // { code: "230???", nameKr: "시리우스 성계",     nameEn: "SIRIUS",      desc: "라그랑 그룹 본거지, 제6행성 론드리나" },

  // 동맹 영역
  // { code: "230???", nameKr: "레자빅 성계",      nameEn: "REZAVIK",     desc: "동맹 성계" },
  // { code: "230???", nameKr: "슈바라 성계",      nameEn: "SCHWARA",     desc: "JL-77 기지 설치" },
  // { code: "230???", nameKr: "포리슨 성역",      nameEn: "FORISON",     desc: "다얀 칸 기지 소재지" },
  // { code: "230???", nameKr: "파라파라 성역",     nameEn: "PARAFARA",    desc: "동맹 성역" },
  // { code: "230???", nameKr: "프레뷔도 성역",     nameEn: "PREVDO",      desc: "가스행성 4개, 슬라브 군신명" },
  // { code: "230???", nameKr: "닛슈우히더스 성역",  nameEn: "NISHUHIDERS", desc: "제1행성만 언급" },

];

// ================================================================
//  OBSTACLES — 갤럭시맵/전술맵 장애물 마스터
//  type: SARGASSO / BLACKHOLE / MINEFIELD / ION_STORM / GRAVITY_WELL
//  points: 갤럭시맵 폴리곤 좌표 (viewBox 1600x1000 기준)
//  starCode: null = 성계 간 공간 / 성계코드 = 전술맵 소속 성계
//  효과(fstMod/dmgPerPhase 등)는 tacticalData.js OBSTACLE_TYPES 참조
// ================================================================

export const OBSTACLES = [

  // ── 사르갓소 지대 ─────────────────────────────────────────────
  // 이제르론 회랑(y:220~380)과 페잔 회랑(y:680~820) 두 통로만 개방
  // 3개 구역으로 분리 렌더링 (SVG path hole 대신 분리 폴리곤 사용)

  {
    id:       'SARGASSO_TOP',
    type:     'SARGASSO',
    starCode: null,
    desc:     '사르갓소 지대 상단 (이제르론 회랑 위)',
    // 이제르론 회랑 상단 ~ y:0
    points: [
      [780,0],[800,80],[790,160],[810,220],
      [945,220],[955,160],[940,80],[960,0],
    ],
    color: { fill:'#230f0a', outline:'#5a2819' },
  },
  {
    id:       'SARGASSO_MID',
    type:     'SARGASSO',
    starCode: null,
    desc:     '사르갓소 지대 중단 (이제르론~페잔 회랑 사이)',
    // 이제르론 회랑 하단 ~ 페잔 회랑 상단
    points: [
      [810,380],[795,460],[785,540],[800,620],[815,680],
      [955,680],[940,620],[950,540],[960,460],[945,380],
    ],
    color: { fill:'#230f0a', outline:'#5a2819' },
  },
  {
    id:       'SARGASSO_BOT',
    type:     'SARGASSO',
    starCode: null,
    desc:     '사르갓소 지대 하단 (페잔 회랑 아래)',
    // 페잔 회랑 하단 ~ y:1000
    points: [
      [815,820],[800,900],[790,1000],
      [960,1000],[945,900],[955,820],
    ],
    color: { fill:'#230f0a', outline:'#5a2819' },
  },

]

// ── starDetail.js에서 추가할 시나리오별 장애물 ──────────────────
// OBSTACLE_DETAIL = [
//   {
//     id:       'MINEFIELD_VANFLEET',
//     type:     'MINEFIELD',
//     starCode: '230060',   // 밴플리트 성계 전술맵
//     points:   [...],      // 전술맵 타일 좌표
//     color:    { fill:'#1a1a0a', outline:'#4a4a15' },
//   },
// ]
