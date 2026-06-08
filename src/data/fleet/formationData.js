// ================================================================
// ffType (진형 분류)
//
// ATK : 공격형
// DEF : 방어형
// MOV : 기동형
// ENC : 포위형
//
// [ATK] FF_02, FF_06, FF_08
// [DEF] FF_01, FF_07, FF_10
// [MOV] FF_03, FF_09
// [ENC] FF_04, FF_05
// ================================================================

// ================================================================
//  formationData.js
//  경로: src/data/fleet/formationData.js
//  작성: 2026-06-08
// ================================================================

// 수기 작성본. 추후 fleetData.md파일에 업데이트 해야함.

export const FORMATION_DATA = [
  // 방진
  {
    ffCode: "FF_01", // fleetFormation code
    ffType: "DEF", // formation type
    ffName: "방진",
    // --> formationDetailData.js에서 ffCode, lang, type : NAME 으로 가져온다.
    weight: [
      { target: "FF_01", delay: 0 },
      { target: "FF_02", delay: 90 },
      { target: "FF_03", delay: 110 },
      { target: "FF_04", delay: 140 },
      { target: "FF_05", delay: 180 },
      { target: "FF_06", delay: 150 },
      { target: "FF_07", delay: 40 },
      { target: "FF_08", delay: 170 },
      { target: "FF_09", delay: 220 },
      { target: "FF_10", delay: 30 },
    ],
    // --> 고정값. 교전 중 진형 변경 시, 걸리는 시간으로, 해당 delay 해당 함대의 지휘+기동...에 영향을 받는다.(세부수치는 추후 구현하며 밸런스 조절하자.)
    effect: `매턴 소속 함대의 공격력 +3%(최대 9%)
     매턴 소속 함대의 방어력 +4%(최대 12%)
     매턴 소속 인원의 적극성 +5
     매턴 소속 함대의 기동력 -7%(최대 21%)`,
    // --> formationDetailData.js에서 shipCode, lang, type : EFCT 으로 가져온다.
    desc: `균형잡힌 기본 전형으로 포위에 강하고, 안정적인 전투가 가능하나, 기동성이 부족하다.
    진형의 외곽으로 방어력이 높은 함선들이 배치되고, 중앙으로 갈 수록 방어력이 낮은 함선들이 배치된다.`,
    // --> formationDetailData.js에서 ffCode, lang, type : DESC 으로 가져온다.
  },
  // 횡렬진
  {
    ffCode: "FF_02", // fleetFormation code
    ffType: "ATK", // formation type
    ffName: "횡렬진",
    // --> formationDetailData.js에서 ffCode, lang, type : NAME 으로 가져온다.
    weight: [
      { target: "FF_01", delay: 90 },
      { target: "FF_02", delay: 0 },
      { target: "FF_03", delay: 140 },
      { target: "FF_04", delay: 160 },
      { target: "FF_05", delay: 200 },
      { target: "FF_06", delay: 110 },
      { target: "FF_07", delay: 130 },
      { target: "FF_08", delay: 90 },
      { target: "FF_09", delay: 170 },
      { target: "FF_10", delay: 120 },
    ],
    // --> 고정값. 교전 중 진형 변경 시, 걸리는 시간으로, 해당 delay 해당 함대의 지휘+기동...에 영향을 받는다.(세부수치는 추후 구현하며 밸런스 조절하자.)
    effect: `매턴 소속 함대의 공격력 +3%(최대 9%)
    매턴 소속 함대의 사정거리 +5%(최대 20%)
    매턴 소속 함대의 방어력 -10%(최대 30%)`,
    // --> formationDetailData.js에서 shipCode, lang, type : EFCT 으로 가져온다.
    desc: `전면 화력 집중을 중시한 형태로 순간적으로 적의 전열을 붕괴시킬 수 있으나, 측면의 공격에 취약하다.
    진형의 중앙으로 공격력이 높은 함선들이 배치되고, 외곽으로 갈 수록 공격력이 낮은 함선들이 배치된다.`,
    // --> formationDetailData.js에서 ffCode, lang, type : DESC 으로 가져온다.
  },
  // 종렬진
  {
    ffCode: "FF_03", // fleetFormation code
    ffType: "MOV", // formation type
    ffName: "종렬진",
    // --> formationDetailData.js에서 ffCode, lang, type : NAME 으로 가져온다.
    weight: [
      { target: "FF_01", delay: 110 },
      { target: "FF_02", delay: 140 },
      { target: "FF_03", delay: 0 },
      { target: "FF_04", delay: 180 },
      { target: "FF_05", delay: 220 },
      { target: "FF_06", delay: 100 },
      { target: "FF_07", delay: 150 },
      { target: "FF_08", delay: 80 },
      { target: "FF_09", delay: 160 },
      { target: "FF_10", delay: 140 },
    ],
    // --> 고정값. 교전 중 진형 변경 시, 걸리는 시간으로, 해당 delay 해당 함대의 지휘+기동...에 영향을 받는다.(세부수치는 추후 구현하며 밸런스 조절하자.)
    effect: `매턴 소속 함대의 공격력 +5%(최대 20%)
    매턴 소속 함대의 기동력 +5%(최대 25%)
    매턴 공격시 상대 함대의 적극성 -5
    매턴 소속 함대의 방어력 -10%(최대 30%)`,
    // --> formationDetailData.js에서 shipCode, lang, type : EFCT 으로 가져온다.
    desc: ``,
    // --> formationDetailData.js에서 ffCode, lang, type : DESC 으로 가져온다.
  },
  // 학익진
  {
    ffCode: "FF_04", // fleetFormation code
    ffType: "ENC", // formation type
    ffName: "학익진",
    // --> formationDetailData.js에서 ffCode, lang, type : NAME 으로 가져온다.
    weight: [
      { target: "FF_01", delay: 140 },
      { target: "FF_02", delay: 160 },
      { target: "FF_03", delay: 180 },
      { target: "FF_04", delay: 0 },
      { target: "FF_05", delay: 70 },
      { target: "FF_06", delay: 120 },
      { target: "FF_07", delay: 170 },
      { target: "FF_08", delay: 140 },
      { target: "FF_09", delay: 110 },
      { target: "FF_10", delay: 180 },
    ],
    // --> 고정값. 교전 중 진형 변경 시, 걸리는 시간으로, 해당 delay 해당 함대의 지휘+기동...에 영향을 받는다.(세부수치는 추후 구현하며 밸런스 조절하자.)
    effect: ``,
    // --> formationDetailData.js에서 shipCode, lang, type : EFCT 으로 가져온다.
    desc: ``,
    // --> formationDetailData.js에서 ffCode, lang, type : DESC 으로 가져온다.
  },
  // 포위진
  {
    ffCode: "FF_05", // fleetFormation code
    ffType: "ENC", // formation type
    ffName: "포위진",
    // --> formationDetailData.js에서 ffCode, lang, type : NAME 으로 가져온다.
    weight: [
      { target: "FF_01", delay: 180 },
      { target: "FF_02", delay: 200 },
      { target: "FF_03", delay: 220 },
      { target: "FF_04", delay: 70 },
      { target: "FF_05", delay: 0 },
      { target: "FF_06", delay: 160 },
      { target: "FF_07", delay: 130 },
      { target: "FF_08", delay: 180 },
      { target: "FF_09", delay: 140 },
      { target: "FF_10", delay: 170 },
    ],
    // --> 고정값. 교전 중 진형 변경 시, 걸리는 시간으로, 해당 delay 해당 함대의 지휘+기동...에 영향을 받는다.(세부수치는 추후 구현하며 밸런스 조절하자.)
    effect: ``,
    // --> formationDetailData.js에서 shipCode, lang, type : EFCT 으로 가져온다.
    desc: ``,
    // --> formationDetailData.js에서 ffCode, lang, type : DESC 으로 가져온다.
  },
  // 쐐기진
  {
    ffCode: "FF_06", // fleetFormation code
    ffType: "ATK", // formation type
    ffName: "쐐기진",
    // --> formationDetailData.js에서 ffCode, lang, type : NAME 으로 가져온다.
    weight: [
      { target: "FF_01", delay: 150 },
      { target: "FF_02", delay: 110 },
      { target: "FF_03", delay: 100 },
      { target: "FF_04", delay: 120 },
      { target: "FF_05", delay: 160 },
      { target: "FF_06", delay: 0 },
      { target: "FF_07", delay: 190 },
      { target: "FF_08", delay: 40 },
      { target: "FF_09", delay: 70 },
      { target: "FF_10", delay: 170 },
    ],
    // --> 고정값. 교전 중 진형 변경 시, 걸리는 시간으로, 해당 delay 해당 함대의 지휘+기동...에 영향을 받는다.(세부수치는 추후 구현하며 밸런스 조절하자.)
    effect: ``,
    // --> formationDetailData.js에서 shipCode, lang, type : EFCT 으로 가져온다.
    desc: ``,
    // --> formationDetailData.js에서 ffCode, lang, type : DESC 으로 가져온다.
  },
  // 원형진
  {
    ffCode: "FF_07", // fleetFormation code
    ffType: "DEF", // formation type
    ffName: "원형진",
    // --> formationDetailData.js에서 ffCode, lang, type : NAME 으로 가져온다.
    weight: [
      { target: "FF_01", delay: 40 },
      { target: "FF_02", delay: 130 },
      { target: "FF_03", delay: 150 },
      { target: "FF_04", delay: 170 },
      { target: "FF_05", delay: 130 },
      { target: "FF_06", delay: 190 },
      { target: "FF_07", delay: 0 },
      { target: "FF_08", delay: 220 },
      { target: "FF_09", delay: 240 },
      { target: "FF_10", delay: 50 },
    ],
    // --> 고정값. 교전 중 진형 변경 시, 걸리는 시간으로, 해당 delay 해당 함대의 지휘+기동...에 영향을 받는다.(세부수치는 추후 구현하며 밸런스 조절하자.)
    effect: ``,
    // --> formationDetailData.js에서 shipCode, lang, type : EFCT 으로 가져온다.
    desc: ``,
    // --> formationDetailData.js에서 ffCode, lang, type : DESC 으로 가져온다.
  },
  // 돌격진
  {
    ffCode: "FF_08", // fleetFormation code
    ffType: "ATK", // formation type
    ffName: "돌격진",
    // --> formationDetailData.js에서 ffCode, lang, type : NAME 으로 가져온다.
    weight: [
      { target: "FF_01", delay: 170 },
      { target: "FF_02", delay: 90 },
      { target: "FF_03", delay: 80 },
      { target: "FF_04", delay: 140 },
      { target: "FF_05", delay: 180 },
      { target: "FF_06", delay: 40 },
      { target: "FF_07", delay: 220 },
      { target: "FF_08", delay: 0 },
      { target: "FF_09", delay: 60 },
      { target: "FF_10", delay: 190 },
    ],
    // --> 고정값. 교전 중 진형 변경 시, 걸리는 시간으로, 해당 delay 해당 함대의 지휘+기동...에 영향을 받는다.(세부수치는 추후 구현하며 밸런스 조절하자.)
    effect: ``,
    // --> formationDetailData.js에서 shipCode, lang, type : EFCT 으로 가져온다.
    desc: ``,
    // --> formationDetailData.js에서 ffCode, lang, type : DESC 으로 가져온다.
  },
  // 기동진
  {
    ffCode: "FF_09", // fleetFormation code
    ffType: "MOV", // formation type
    ffName: "기동진",
    // --> formationDetailData.js에서 ffCode, lang, type : NAME 으로 가져온다.
    weight: [
      { target: "FF_01", delay: 220 },
      { target: "FF_02", delay: 170 },
      { target: "FF_03", delay: 160 },
      { target: "FF_04", delay: 110 },
      { target: "FF_05", delay: 140 },
      { target: "FF_06", delay: 70 },
      { target: "FF_07", delay: 240 },
      { target: "FF_08", delay: 60 },
      { target: "FF_09", delay: 0 },
      { target: "FF_10", delay: 230 },
    ],
    // --> 고정값. 교전 중 진형 변경 시, 걸리는 시간으로, 해당 delay 해당 함대의 지휘+기동...에 영향을 받는다.(세부수치는 추후 구현하며 밸런스 조절하자.)
    effect: ``,
    // --> formationDetailData.js에서 shipCode, lang, type : EFCT 으로 가져온다.
    desc: ``,
    // --> formationDetailData.js에서 ffCode, lang, type : DESC 으로 가져온다.
  },
  // 방어진
  {
    ffCode: "FF_10", // fleetFormation code
    ffType: "DEF", // formation type
    ffName: "방어진",
    // --> formationDetailData.js에서 ffCode, lang, type : NAME 으로 가져온다.
    weight: [
      { target: "FF_01", delay: 30 },
      { target: "FF_02", delay: 120 },
      { target: "FF_03", delay: 140 },
      { target: "FF_04", delay: 180 },
      { target: "FF_05", delay: 170 },
      { target: "FF_06", delay: 170 },
      { target: "FF_07", delay: 50 },
      { target: "FF_08", delay: 190 },
      { target: "FF_09", delay: 230 },
      { target: "FF_10", delay: 0 },
    ],
    // --> 고정값. 교전 중 진형 변경 시, 걸리는 시간으로, 해당 delay 해당 함대의 지휘+기동...에 영향을 받는다.(세부수치는 추후 구현하며 밸런스 조절하자.)
    effect: ``,
    // --> formationDetailData.js에서 shipCode, lang, type : EFCT 으로 가져온다.
    desc: ``,
    // --> formationDetailData.js에서 ffCode, lang, type : DESC 으로 가져온다.
  },
];
