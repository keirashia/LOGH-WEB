# src/data/scenarios — 시나리오 데이터

## 개요

시나리오별 성계/행성/함대 초기값을 관리한다.
불변 마스터(starSystemData, planetsData)와 결합하여 게임 초기 상태를 구성.

---

## 파일 구조

```
src/data/scenarios/
├── scenarios.md      ← 이 파일
├── scenarios.js.js      ← 시나리오 메타 목록
└── {연도}_{seq}/
    ├── starDetail.js     성계 초기값 (faction/morale/tax/traits)
    ├── planetDetail.js   행성 초기값 (임시 빈 배열)
    └── fleetDetail.js    함대 초기값 (미구현)
```

---

## 시나리오 코드 체계

```
{연도}_{seq}

연도: 우주력(SE) 기준
seq:  01 = 정사, 02+ = 가상/분기 

예시:
  796_01   SE 796 정사 — 이젤론 함락 직후  ✅ 구현
  745_01   SE 745 정사 — 제2차 티아마트 회전
  640_01   SE 640 정사 — 다곤 성역 회전
```
---

## scenarios.js.js 스키마

```js
export const SCENARIOS = [
  {
    id:          '796_01',
    name:        '이젤론 함락 직후',
    nameEn:      'After the Fall of Iserlohn',
    year:        796,
    impYear:     487,
    month:       5,
    tags:        ['사실'],           // 사실 / 가상 / 택틱스
    desc:        '시나리오 설명',
    recommend:   ['CH_000266', 'CH_000064'],  // 추천 인물 코드
    factions:    ['REH', 'FPA', 'PZN'],       // 선택 가능 세력
    eventId:     '796_EVT_03',
    implemented: true,                         // false면 선택 화면에서 숨김
  },
]
```

---

## starDetail.js 스키마

```js
export const STAR_DETAIL = [
  {
    code:    '230058',      // starSystemData.code
    faction: 'REH',         // REH / FPA / PZN / null
    morale:  85,
    tax:     30,
    traits: [
      { traitId: 'IMPERIAL_HERITAGE', startTurn: 0, endTurn: null },
    ],
  },
]
```

### gameStore.buildState 병합 로직

```js
const d = _DETAIL_MAP[s.code] || {}
systems[s.code] = {
  id: s.code, code: s.code,
  name: s.nameKr, nameEn: s.nameEn,
  type: s.type, x: s.x, y: s.y,
  faction: d.faction ?? null,
  morale:  d.morale  ?? 60,
  tax:     d.tax     ?? 0,
  traits:  d.traits  ?? [],
  ...(_DEFAULTS[s.type] ?? _DEFAULTS.normal),
}
```

---

## planetDetail.js 스키마

```js
export const PLANET_DETAIL = [
  {
    code:       '230058P01',
    faction:    'REH',
    population: 100,
    industry:   50,
    defense:    45,
    morale:     85,
    tax:        30,
    traits:     [],
  },
]
```

---

## 구현 현황

| 코드 | 제목 | 상태 |
|---|---|---|
| `796_01` | 이젤론 함락 직후 | ✅ starDetail 완성, planetDetail 임시 |
| `745_01` | 제2차 티아마트 회전 | ⬜ 미구현 |
| `640_01` | 다곤 성역 회전 | ⬜ 미구현 |

---

## 설계 결정 이력

| 날짜 | 결정 |
|---|---|
| 2026-05-26 | 시나리오 폴더 S01/ 도입 |
| 2026-05-28 | 시나리오 코드 {연도}_{seq} 확정, S01/ → 796_01/ 변경 |
| 2026-05-28 | scenarios.js.js 새 스키마 (implemented, factions, recommend, tags) |
| 2026-05-28 | SCENARIOS masterData.js 제거 → scenarios.js.js 단일 공급원 |

---

## TODO

- [ ] 796_01/fleetDetail.js 작성 (함대 초기 배치)
- [ ] 796_01/charDetail.js 작성 (등장 인물)
- [ ] 796_01/planetDetail.js 완성 (현재 빈 배열)
- [ ] 745_01/, 640_01/ 시나리오 전체 작성
- [ ] eventData.js 생성 (연도별 사건 목록 — scenarioData.md 참조)


### 구현 예정 연도별 사건 목록

| 연도 | 사건 수 | 주요 사건 |
|---|---|---|
| 640 | 1 | 다곤 성역 회전 |
| 745 | 1 | 제2차 티아마트 회전 |
| 788 | 2 | 엘 파실 전투, 에코니아 포로수용소 |
| 794 | 1 | 밴플리트 성역 회전 |
| 795 | 5 | 제3차 티아마트, 클롭슈톡, 베네뮌데 등 |
| 796 | 8 | 아스타테, 이젤론 공방전, 카스트로프, 제국령 침공, 암릿처 등 |
| 797 | 10 | 립슈타트 전역, 베스터란트, 구국군사회의 쿠데타 등 |
| 798 | 8 | 요새 대 요새, 라그나뢰크, 페잔 점령 등 |
| 799 | 8 | 란테마리오, 버밀리온, 바라트 화약 등 |
| 800 | 9 | 마르 아데타, 양 웬리 암살, 노이에란트 등 |
| 801 | 5 | 시바 성역 회전 등 |

---
