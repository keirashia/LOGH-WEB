// ================================================================
//  scenarios.js.js — 시나리오 메타 목록
//  id: {우주력연도}_{seq} 
//  implemented: true인 시나리오만 ScenarioSelectView에 표시
// ================================================================

export const SCENARIOS = [
  {
    id:          '796_01',
    name:        '이젤론 함락 직후',
    nameEn:      'After the Fall of Iserlohn',
    year:        796,
    impYear:     487,
    month:       5,
    tags:        ['사실'],
    desc:        '양 웬리의 이젤론 무혈점령 직후. 제국-동맹 전면전 임박.',
    recommend:   ['CH_000266', 'CH_000064'],
    factions:    ['REH', 'FPA', 'PZN'],
    eventId:     '796_EVT_03',
    implemented: true,
  },
  {
    id:          '745_01',
    name:        '제2차 티아마트 회전',
    nameEn:      'Second Battle of Tiamat',
    year:        745,
    impYear:     436,
    month:       12,
    tags:        ['사실', '택틱스'],
    desc:        '730년 마피아 전성기. 브루스 애쉬비 vs 치텐 원수.',
    recommend:   ['CH_000188', 'CH_000397'],
    factions:    ['FPA', 'REH'],
    eventId:     '745_EVT_01',
    implemented: true,
  },
  {
    id:          '640_01',
    name:        '다곤 성역 회전',
    nameEn:      'Battle of Dagon',
    year:        640,
    impYear:     331,
    month:       null,
    tags:        ['사실', '택틱스'],
    desc:        '자유행성동맹과 은하제국의 첫 접촉. 제국-동맹 전쟁의 시작.',
    recommend:   [],
    factions:    ['FPA', 'REH'],
    eventId:     '640_EVT_01',
    implemented: true,
  },
]
