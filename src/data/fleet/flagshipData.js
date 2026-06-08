// ================================================================
//  flagshipData.js
//  경로: src/data/fleet/flagshipData.js
//  작성: 2026-06-08
// ================================================================

// 수기 작성본. 추후 fleetData.md파일에 업데이트 해야함.
// 임의 작성본으로 key val은 상황에 맞춰서 처리 필요함
// 해당 값은 코드, faction코드값만 가지며, 시스템의 언어에 따라, flagShipDetailData.js의 값을 가지고 와서, 이 js를 처리한다.

export const FLAGSHIP_DATA = [
  {
    shipCode: "FS_000001",
    faction: "FPA",
    // shipName: "레오니다스",
    // --> flagShipDetailData.js에서 shipCode, lang, type : NAME 으로 가져온다.
    // useYn : true
    // --> flagShipDetailData.js에서 shipCode, lang, type : USE, 시나리오코드로 가져온다.
    // effect: `소속 함대의 전함의 공격력 +5%, 기동력 -5%`,
    // --> flagShipDetailData.js에서 shipCode, lang, type : EFCT 으로 가져온다.
    // desc: `아이아스급 대형 전함. 거대한 크기가 특징으로, 함선 자체의 능력은 동맹군의 정규함대 기함과 같다.
    // 원작에서의 선주는 파스톨레로, SE796년 2월 11일. 아스타테 회전에서 격침당했다.`,
    // --> flagShipDetailData.js에서 shipCode, lang, type : DESC 으로 가져온다.
  },
];
