# src/data/scenarios — 시나리오 데이터

## 개요

시나리오별 성계/행성/함대 초기값을 관리한다.
불변 마스터(starSystemData, planetsData)와 결합하여 게임 초기 상태를 구성.

---

## 파일 구조

```
src/data/scenarios/
├── scenarioData.md   ← 이 파일
├── scenario.js       ← 시나리오 메타 목록
├── eventData.js      ← 연도별 역사 사건 목록
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

예시:
  796_01   SE 796 정사 — 이젤론 함락 직후  ✅ 구현
  745_01   SE 745 정사 — 제2차 티아마트 회전
  640_01   SE 640 정사 — 다곤 성역 회전
```

---

## scenario.js 스키마

`impYear`는 `year - 309`로 화면에서 계산 (SE → IC 변환).

```js
export const SCENARIOS = [
  {
    id: "796_01",
    name: "이젤론 함락 직후",
    nameEn: "After the Fall of Iserlohn",
    year: 796,
    month: 5,
    tags: ["사실"], // 사실 / 가상 / 택틱스
    desc: "시나리오 설명",
    factions: ["REH", "FPA", "PZN"], // 선택 가능 세력
  },
];
```

---

## starDetail.js 스키마

```js
export const STAR_DETAIL = [
  {
    code: "230058", // starSystemData.code
    faction: "REH", // REH / FPA / PZN / null
    morale: 85,
    tax: 30,
    traits: [{ traitId: "IMPERIAL_HERITAGE", startTurn: 0, endTurn: null }],
  },
];
```

### gameStore.buildState 병합 로직

```js
const d = _DETAIL_MAP[s.code] || {};
systems[s.code] = {
  id: s.code,
  code: s.code,
  name: s.nameKr,
  nameEn: s.nameEn,
  type: s.type,
  x: s.x,
  y: s.y,
  faction: d.faction ?? null,
  morale: d.morale ?? 60,
  tax: d.tax ?? 0,
  traits: d.traits ?? [],
  ...(_DEFAULTS[s.type] ?? _DEFAULTS.normal),
};
```

---

## planetDetail.js 스키마

```js
export const PLANET_DETAIL = [
  {
    code: "230058P01",
    faction: "REH",
    population: 100,
    industry: 50,
    defense: 45,
    morale: 85,
    tax: 30,
    traits: [],
  },
];
```

---

## 구현 현황

| 코드     | 제목                | 상태                                  |
| -------- | ------------------- | ------------------------------------- |
| `796_01` | 이젤론 함락 직후    | ✅ starDetail 완성, planetDetail 임시 |
| `745_01` | 제2차 티아마트 회전 | ⬜ 미구현                             |
| `640_01` | 다곤 성역 회전      | ⬜ 미구현                             |

---

## 설계 결정 이력

| 날짜       | 결정                                                   |
| ---------- | ------------------------------------------------------ |
| 2026-05-28 | 시나리오 코드 {연도}\_{seq} 확정, S01/ → 796_01/ 변경  |
| 2026-05-28 | scenario.js 새 스키마 (factions, tags, desc)           |
| 2026-05-28 | SCENARIOS masterData.js 제거 → scenario.js 단일 공급원 |
| 2026-05-28 | impYear 필드 제거, year - 309 로 화면 계산으로 전환    |
| 2026-05-28 | recommend, eventId, implemented 필드 제거              |
| 2026-05-28 | eventData.js 뼈대 생성 (SE 640–801, 58개 사건)         |

---

## TODO

- [ ] 796_01/fleetDetail.js 작성 (함대 초기 배치)
- [ ] 796_01/charDetail.js 작성 (등장 인물)
- [ ] 796_01/planetDetail.js 완성 (현재 빈 배열)
- [ ] 745_01/, 640_01/ 시나리오 전체 작성
- [ ] eventData.js 내용 채우기 (뼈대 생성 완료, 미입력 항목 상세화)

---

---

## scenario.js 최신 스키마 (2026-05-29 기준)

```js
{
  yearType:    "AD" | "SE" | "RC",  // 연도 체계
  year:        796,
  month:       5,
  id:          "796_01",            // {yearType}{year}_{seq} or {연도}_{seq}
  nameKr:      "이젤론 함락 직후",
  nameEn:      "After the Fall of Iserlohn",
  nameJp:      "",
  tags:        ["사실", "초심자추천"],
  factions:    ["REH", "FPA", "PZN"],
  useYn:       true,
  openPt:      0,                   // 0=무료, N=포인트 필요
  appearances: ["은하영웅전설 1권"],  // 출전 서술
  desc: [                           // 상세 페이지 배열
    {
      index:  1,
      image:  "796_01_01.webp",     // 없으면 "" → 그라디언트 대체
      text:   "...",
      effect: "fade",               // fade / slide
      libs:   ["ST_230022:이젤론", "CH_000266:양 웬리"],
                                    // ST_=성계 / CH_=인물 사전 팝업
    },
  ],
}
```

### libs 접두사 규칙
```
ST_{starCode}:{표시명}   성계 사전 팝업
CH_{chaCode}:{표시명}    인물 사전 팝업
```

### 하단 버튼 분기 로직
```
useYn: false             → [다음 시나리오 →]
useYn: true
  openPt: 0              → [▶ 시작]
  openPt > 0
    구매완료             → [▶ 시작]
    미구매               → [🔒 {openPt}P로 구매]
```

### 설계 결정 (2026-05-29 추가)
| 날짜 | 결정 |
|---|---|
| 2026-05-29 | desc[] scenario.js에 통합 (eventData 분리 유지) |
| 2026-05-29 | libs 필드: ST_/CH_ 접두사 사전 팝업 연동 |
| 2026-05-29 | openPt: 포인트 잠금해제 (TBL_USER_ITEM 구매 확인) |
| 2026-05-29 | tags: 사실/가상/택틱스 + 초심자/숙련자추천 추가 |
| 2026-05-29 | useYn: false → 상세 열람만 가능, 게임 진입 불가 |
