// ================================================================
//  laneData.js — 성계 항로 마스터 (불변)
//  출처: starSystemData.js 각 성계의 '연결:' 주석 전수 추출
//  name   : 항로 고유 명칭. 원작에 명칭이 존재하는 항로만 채움. 빈 값(없음)이 기본.
//  type   : corridor(이제르론 회랑) | phezzan(페잔 회랑) | normal
//  period : 1턴(<200px) | 2턴(<440px) | 3턴(≥440px)
//           corridor 고정=2, phezzan 고정=3
//  stability: corridor=55, phezzan=70, normal=45

//
//  ⚠️ 2026-06-22 변경: 페잔 회랑 양쪽 출구였던 성계 230065(샤텐부르크)/230066(리히텐부르크)를
//    삭제하고, 해당 출구를 가리키는 항로 자체에 이름을 부여하는 방식으로 전환함.
//    (원작 검토 결과 두 곳 모두 행성이 없는 빈 성계였고, "회랑의 출구"라는 지명적 성격이
//    성계보다는 항로 그 자체에 더 부합한다고 판단)
// ================================================================

export const LANES = [
  // ── 이제르론 회랑 (corridor) ──────────────────────────────────
  {
    id: "LANE_001",
    name: "이제르론 회랑(서부 중앙)",
    stars: ["230022", "230055"],
    // type: "corridor", // 불필요값 같아서 삭제해도 될 것 같은데
    period: 2,
    stability: 0, // computed수치로, 연결하는 2개 성계의 안정도를 가져와 평균값
    map: {}, //  2026.06.22 항로내부의 맵 정보. 맵의 크기, 각종 고정 오브젝트 정보가 세팅되어야함.
  }, // ALTENA↔TIAMAT
  {
    id: "LANE_002",
    stars: ["230022", "230060"],
    type: "corridor",
    period: 2,
    stability: 55,
  }, // ALTENA↔VANFLEET
  {
    id: "LANE_003",
    stars: ["230022", "230004"],
    type: "corridor",
    period: 2,
    stability: 55,
  }, // ALTENA↔ARLESHEIM
  {
    id: "LANE_004",
    stars: ["230022", "230003"],
    type: "corridor",
    period: 2,
    stability: 55,
  }, // ALTENA↔AMRITZER

  // ── 페잔 회랑 (phezzan) ───────────────────────────────────────
  // ⚠️ 2026-06-22: 기존 230042↔230065/230066(빈 성계 경유)를 동맹/제국 쪽 인접 성계로 직결하고
  //   회랑 출구의 원작 지명을 name으로 부여함. (LANE_023, LANE_040은 경유 구조 해체로 삭제)
  {
    id: "LANE_005",
    name: "샤텐부르크",
    stars: ["230042", "230007"],
    type: "phezzan",
    period: 3,
    stability: 70,
  }, // PHEZZAN↔BALATROOP. 후일 샤텐부르크 요새가 건설된다.
  {
    id: "LANE_006",
    name: "리히텐부르크",
    stars: ["230042", "230014"],
    type: "phezzan",
    period: 3,
    stability: 70,
  }, // PHEZZAN↔EISENHERZ. 후일 삼원수의 성이 지어지게 된다.

  // ── 일반 항로 (normal) ────────────────────────────────────────
  // 230001 ALMENTFUBEEL
  {
    id: "LANE_007",
    stars: ["230001", "230028"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // ALMENTFUBEEL↔KIFOISER
  {
    id: "LANE_008",
    stars: ["230001", "230048"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // ALMENTFUBEEL↔SCHACHEN

  // 230002 ALTENER
  {
    id: "LANE_009",
    stars: ["230002", "230009"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // ALTENER↔BRUNSCHWEIG
  {
    id: "LANE_010",
    stars: ["230002", "230024"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // ALTENER↔JOTUNHEIM
  {
    id: "LANE_011",
    stars: ["230002", "230038"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // ALTENER↔MARBACH

  // 230003 AMRITZER
  {
    id: "LANE_012",
    stars: ["230003", "230008"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // AMRITZER↔BODEN
  {
    id: "LANE_013",
    stars: ["230003", "230044"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // AMRITZER↔FORGEN

  // 230004 ARLESHEIM
  {
    id: "LANE_014",
    stars: ["230004", "230041"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // ARLESHEIM↔PALANTIA

  // 230005 ASTARTE
  {
    id: "LANE_015",
    stars: ["230005", "230010"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // ASTARTE↔DAGON
  {
    id: "LANE_016",
    stars: ["230005", "230011"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // ASTARTE↔DORIA
  {
    id: "LANE_017",
    stars: ["230005", "230017"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // ASTARTE↔EL-PACIL
  {
    id: "LANE_018",
    stars: ["230005", "230041"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // ASTARTE↔PALANTIA
  {
    id: "LANE_019",
    stars: ["230005", "230060"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // ASTARTE↔VANFLEET

  // 230006 BA'ALAT
  {
    id: "LANE_020",
    stars: ["230006", "230047"],
    type: "normal",
    period: 2,
    stability: 45,
  }, // BAALAT↔RIO-VERDE
  {
    id: "LANE_021",
    stars: ["230006", "230063"],
    type: "normal",
    period: 2,
    stability: 45,
  }, // BAALAT↔KERIM

  // 230007 BALATROOP
  {
    id: "LANE_022",
    stars: ["230007", "230034"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // BALATROOP↔LUNBINI
  // LANE_023 (230007↔230065) 삭제됨: 230042↔230007로 직결(LANE_005, name:'샤텐부르크')되며 불필요

  // 230008 BODEN
  {
    id: "LANE_024",
    stars: ["230008", "230062"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // BODEN↔VILLENSTEIN
  {
    id: "LANE_025",
    stars: ["230008", "230067"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // BODEN↔MÜKKENBERGER
  {
    id: "LANE_086",
    stars: ["230008", "230064"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // BODEN↔BYLOST (신규, 2026-06-22)

  // 230009 BRUNSCHWEIG
  {
    id: "LANE_026",
    stars: ["230009", "230019"],
    type: "normal",
    period: 2,
    stability: 45,
  }, // BRUNSCHWEIG↔FREYA
  {
    id: "LANE_027",
    stars: ["230009", "230028"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // BRUNSCHWEIG↔KIFOISER
  {
    id: "LANE_028",
    stars: ["230009", "230032"],
    type: "normal",
    period: 2,
    stability: 45,
  }, // BRUNSCHWEIG↔LITTENHEIM
  {
    id: "LANE_029",
    stars: ["230009", "230038"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // BRUNSCHWEIG↔MARBACH

  // 230010 DAGON
  {
    id: "LANE_030",
    stars: ["230010", "230016"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // DAGON↔ELGON
  {
    id: "LANE_032",
    stars: ["230010", "230055"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // DAGON↔TIAMAT

  // 230011 DORIA
  {
    id: "LANE_033",
    stars: ["230011", "230016"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // DORIA↔ELGON

  // 230012 ECKHART
  {
    id: "LANE_034",
    stars: ["230012", "230014"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // ECKHART↔EISENHERZ
  {
    id: "LANE_035",
    stars: ["230012", "230015"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // ECKHART↔EISENHUT
  {
    id: "LANE_036",
    stars: ["230012", "230048"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // ECKHART↔SCHACHEN

  // 230013 ELUCERA
  {
    id: "LANE_037",
    stars: ["230013", "230047"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // ELUCERA↔RIO-VERDE
  {
    id: "LANE_038",
    stars: ["230013", "230053"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // ELUCERA↔TANATUS

  // 230014 EISENHERZ
  {
    id: "LANE_039",
    stars: ["230014", "230015"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // EISENHERZ↔EISENHUT
  // LANE_040 (230014↔230066) 삭제됨: 230042↔230014로 직결(LANE_006, name:'리히텐부르크')되며 불필요

  // 230015 EISENHUT
  {
    id: "LANE_041",
    stars: ["230015", "230059"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // EISENHUT↔WARTENBERG

  // 230016 ELGON
  {
    id: "LANE_042",
    stars: ["230016", "230017"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // ELGON↔EL-PACIL
  {
    id: "LANE_043",
    stars: ["230016", "230051"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // ELGON↔SYVA

  // 230018 FIREZARD
  {
    id: "LANE_044",
    stars: ["230018", "230041"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // FIREZARD↔PALANTIA
  {
    id: "LANE_045",
    stars: ["230018", "230068"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // FIREZARD↔FORSETI

  // 230019 FREYA
  {
    id: "LANE_046",
    stars: ["230019", "230050"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // FREYA↔SHANTAU
  {
    id: "LANE_047",
    stars: ["230019", "230058"],
    type: "normal",
    period: 2,
    stability: 45,
  }, // FREYA↔VALHALLA

  // 230020 GANDHALVA
  {
    id: "LANE_048",
    stars: ["230020", "230045"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // GANDHALVA↔LYGALL
  {
    id: "LANE_049",
    stars: ["230020", "230046"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // GANDHALVA↔RANTEMARIO
  {
    id: "LANE_050",
    stars: ["230020", "230057"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // GANDHALVA↔TRIPLA
  {
    id: "LANE_051",
    stars: ["230020", "230061"],
    type: "normal",
    period: 2,
    stability: 45,
  }, // GANDHALVA↔VERMILION

  // 230021 HACHN
  {
    id: "LANE_052",
    stars: ["230021", "230044"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // HACHN↔FORGEN
  {
    id: "LANE_053",
    stars: ["230021", "230048"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // HACHN↔SCHACHEN

  // 230023 JYAMSEED(잠시드)
  {
    id: "LANE_054",
    stars: ["230023", "230046"],
    type: "normal",
    period: 2,
    stability: 45,
  }, // JYAMSEED↔RANTEMARIO
  {
    id: "LANE_055",
    stars: ["230023", "230051"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // JYAMSEED↔SYVA
  {
    id: "LANE_056",
    stars: ["230023", "230063"],
    type: "normal",
    period: 2,
    stability: 45,
  }, // JYAMSEED↔KERIM

  // 230024 JOTUNHEIM
  {
    id: "LANE_057",
    stars: ["230024", "230059"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // JOTUNHEIM↔WARTENBERG

  // 230026 KASTOROP
  {
    id: "LANE_058",
    stars: ["230026", "230039"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // KASTOROP↔MARIENDORF
  {
    id: "LANE_059",
    stars: ["230026", "230058"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // KASTOROP↔VALHALLA

  // 230028 KIFOISER
  {
    id: "LANE_060",
    stars: ["230028", "230050"],
    type: "normal",
    period: 2,
    stability: 45,
  }, // KIFOISER↔SHANTAU
  {
    id: "LANE_061",
    stars: ["230028", "230059"],
    type: "normal",
    period: 2,
    stability: 45,
  }, // KIFOISER↔WARTENBERG

  // 230030 LICHTENLADE
  {
    id: "LANE_062",
    stars: ["230030", "230056"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // LICHTENLADE↔TRABACH
  {
    id: "LANE_063",
    stars: ["230030", "230058"],
    type: "normal",
    period: 2,
    stability: 45,
  }, // LICHTENLADE↔VALHALLA

  // 230032 LITTENHEIM
  {
    id: "LANE_064",
    stars: ["230032", "230050"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // LITTENHEIM↔SHANTAU

  // 230033 ROFORTEN
  {
    id: "LANE_065",
    stars: ["230033", "230047"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // ROFORTEN↔RIO-VERDE
  {
    id: "LANE_066",
    stars: ["230033", "230054"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // ROFORTEN↔TASSILI
  {
    id: "LANE_067",
    stars: ["230033", "230061"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // ROFORTEN↔VERMILION

  // 230034 LUNBINI
  {
    id: "LANE_068",
    stars: ["230034", "230049"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // LUNBINI↔SHANDALUA
  {
    id: "LANE_069",
    stars: ["230034", "230052"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // LUNBINI↔SHUPALA

  // 230035 LYUCAS
  {
    id: "LANE_070",
    stars: ["230035", "230046"],
    type: "normal",
    period: 2,
    stability: 45,
  }, // LYUCAS↔RANTEMARIO
  {
    id: "LANE_071",
    stars: ["230035", "230061"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // LYUCAS↔VERMILION

  // 230037 MARR-ADETTA
  {
    id: "LANE_072",
    stars: ["230037", "230046"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // MARR-ADETTA↔RANTEMARIO
  {
    id: "LANE_073",
    stars: ["230037", "230052"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // MARR-ADETTA↔SHUPALA

  // 230038 MARBACH
  {
    id: "LANE_074",
    stars: ["230038", "230039"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // MARBACH↔MARIENDORF

  // 230043 POLEVIT
  {
    id: "LANE_075",
    stars: ["230043", "230046"],
    type: "normal",
    period: 2,
    stability: 45,
  }, // POLEVIT↔RANTEMARIO
  {
    id: "LANE_076",
    stars: ["230043", "230007"],
    type: "normal",
    period: 2,
    stability: 45,
  }, // POLEVIT↔BALATROOP (구 230065 샤텐부르크 경유 → 직결로 변경, 2026-06-22)

  // 230045 LYGALL
  {
    id: "LANE_077",
    stars: ["230045", "230054"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // LYGALL↔TASSILI
  {
    id: "LANE_078",
    stars: ["230045", "230057"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // LYGALL↔TRIPLA

  // 230047 RIO-VERDE
  {
    id: "LANE_080",
    stars: ["230047", "230053"],
    type: "normal",
    period: 2,
    stability: 45,
  }, // RIO-VERDE↔TANATUS

  // 230049 SHANDALUA
  {
    id: "LANE_081",
    stars: ["230049", "230068"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // SHANDALUA↔FORSETI

  // 230050 SHANTAU
  {
    id: "LANE_082",
    stars: ["230050", "230056"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // SHANTAU↔TRABACH
  {
    id: "LANE_083",
    stars: ["230050", "230062"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // SHANTAU↔VILLENSTEIN

  // 230053 TANATUS
  {
    id: "LANE_085",
    stars: ["230053", "230057"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // TANATUS↔TRIPLA

  // ── 신규 추가 (2026-06-22): 빌로스트 / 야반하르 ────────────────
  // 원작 게임 시나리오 "빌로스트-야반하르 성역 회전"의 무대가 되는 항로.
  {
    id: "LANE_087",
    name: "빌로스트-야반하르 성역",
    stars: ["230064", "230070"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // BYLOST↔YAVANHAR
  {
    id: "LANE_088",
    stars: ["230070", "230062"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // YAVANHAR↔VILLENSTEIN

  // ── 신규 추가 (2026-06-22): 란즈베르크 ──────────────────────────
  {
    id: "LANE_089",
    stars: ["230026", "230071"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // KASTOROP↔LANSBERG
  {
    id: "LANE_090",
    stars: ["230071", "230039"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // LANSBERG↔MARIENDORF

  // ── 신규 추가 (2026-06-22): 오펜하이머 / 히르데스하임 ───────────────
  {
    id: "LANE_091",
    stars: ["230058", "230072"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // VALHALLA↔OPPENHEIMER
  {
    id: "LANE_092",
    stars: ["230072", "230032"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // OPPENHEIMER↔LITTENHEIM
  {
    id: "LANE_093",
    stars: ["230058", "230073"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // VALHALLA↔HILDESHEIM
  {
    id: "LANE_094",
    stars: ["230073", "230026"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // HILDESHEIM↔KASTOROP

  // ── 신규 추가 (2026-06-22): 뤼네부르크 / 하르텐베르크 ───────────────
  {
    id: "LANE_095",
    stars: ["230058", "230074"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // VALHALLA↔LUNEBURG
  {
    id: "LANE_096",
    stars: ["230074", "230038"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // LUNEBURG↔MARBACH
  {
    id: "LANE_097",
    stars: ["230026", "230075"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // KASTOROP↔HARTENBERG
  {
    id: "LANE_098",
    stars: ["230075", "230073"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // HARTENBERG↔HILDESHEIM

  // ── 신규 추가 (2026-06-22): 오등작 귀족 영지 8곳 ───────────────────
  {
    id: "LANE_099",
    stars: ["230058", "230076"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // VALHALLA↔LOHENGRAMM
  {
    id: "LANE_100",
    stars: ["230058", "230077"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // VALHALLA↔KLOPSTOCK
  {
    id: "LANE_101",
    stars: ["230032", "230078"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // LITTENHEIM↔BENEMUNDE
  {
    id: "LANE_102",
    stars: ["230039", "230079"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // MARIENDORF↔GRUNEWALD
  {
    id: "LANE_103",
    stars: ["230058", "230080"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // VALHALLA↔FALSTRONG
  {
    id: "LANE_104",
    stars: ["230014", "230081"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // EISENHERZ↔REMSCHEID
  {
    id: "LANE_107",
    stars: ["230012", "230081"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // ECKHART↔REMSCHEID
  {
    id: "LANE_108",
    stars: ["230042", "230081"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // PHEZZAN↔REMSCHEID
  {
    id: "LANE_105",
    stars: ["230032", "230082"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // LITTENHEIM↔HERXHEIMER
  {
    id: "LANE_106",
    stars: ["230001", "230083"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // ALMENTPUVEL↔EHRENBERG

  // ── 신규 추가 (2026-06-22): 테라(지구) 중심 외전 성계 클러스터 ────
  // 하안-아이젠헤르츠 사이 고립 클러스터. 다른 제국령 lane과는 비연결(요청사항).
  {
    id: "LANE_109",
    stars: ["230069", "230087"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // TERRA↔PROXIMA
  {
    id: "LANE_110",
    stars: ["230069", "230088"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // TERRA↔SIRIUS
  {
    id: "LANE_111",
    stars: ["230069", "230084"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // TERRA↔ALTAIR
  {
    id: "LANE_112",
    stars: ["230069", "230086"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // TERRA↔CANOPUS
  {
    id: "LANE_113",
    stars: ["230069", "230085"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // TERRA↔BETELGEUSE

  // ── 신규 추가 (2026-06-22): 닛슈우히더스 / 파라파라 위치 확정 연결 ──
  {
    id: "LANE_114",
    stars: ["230010", "230093"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // DAGON↔NISHUHIDERS
  {
    id: "LANE_115",
    stars: ["230055", "230093"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // TIAMAT↔NISHUHIDERS
  {
    id: "LANE_116",
    stars: ["230054", "230091"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // TASIRI↔PARAFARA
  {
    id: "LANE_117",
    stars: ["230061", "230090"],
    type: "normal",
    period: 2,
    stability: 45,
  }, // VERMILION↔FORISON
  {
    id: "LANE_118",
    stars: ["230061", "230089"],
    type: "normal",
    period: 1,
    stability: 45,
  }, // VERMILION↔REZAVIK

];
