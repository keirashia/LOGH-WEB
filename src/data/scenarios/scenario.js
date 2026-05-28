// ================================================================
//  scenario.js — 시나리오 메타 목록
//  id: {우주력연도}_{seq}  (seq: 01=정사, 02+=가상/분기)
//  impYear는 year - 309 로 계산 (SE → IC 변환)
// ================================================================

export const SCENARIOS = [
  {
    id:       '796_01',
    name:     '이젤론 함락 직후',
    nameEn:   'After the Fall of Iserlohn',
    year:     796,
    month:    5,
    tags:     ['사실'],
    desc:     '양 웬리의 이젤론 무혈점령 직후. 제국-동맹 전면전 임박.',
    factions: ['REH', 'FPA', 'PZN'],
  },
  {
    id:       '745_01',
    name:     '제2차 티아마트 회전',
    nameEn:   'Second Battle of Tiamat',
    year:     745,
    month:    12,
    tags:     ['사실', '택틱스'],
    desc:     '730년 마피아 전성기. 브루스 애쉬비 vs 치텐 원수.',
    factions: ['FPA', 'REH'],
  },
  {
    id:       '640_01',
    name:     '다곤 성역 회전',
    nameEn:   'Battle of Dagon',
    year:     640,
    month:    null,
    tags:     ['사실', '택틱스'],
    desc:     '자유행성동맹과 은하제국의 첫 접촉. 제국-동맹 전쟁의 시작.',
    factions: ['FPA', 'REH'],
  },
]
