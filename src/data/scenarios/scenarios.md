# src/data/scenarios — 시나리오 초기값

## 개요

시나리오별 초기 게임 상태. **마스터 데이터(stars/)는 불변**이며, 여기서는 시나리오 시작 시점의 세력 지배/수치만 정의한다.

---

## 파일 구조

```
scenarios/
├── mainStory.js      ← 스토리 이벤트 트리거 조건 (작성 중)
└── S01/
    ├── starDetail.js     ← 시나리오01: 62개 성계 초기값
    └── planetDetail.js   ← 시나리오01: 행성 초기값 (임시 껍데기)
```

---

## S01/starDetail.js

gameStore의 `buildState('S01', playerFaction)`에서 `STAR_SYSTEMS`와 병합해 `game.systems`를 구성.

```js
export const STAR_DETAIL = {
  '230001': { faction: 'REH', morale: 65, tax: 20, traits: [] },
  '230022': { faction: 'REH', morale: 80, tax: 15, traits: ['fortress'] },
  '230042': { faction: 'PZN', morale: 70, tax: 10, traits: ['tradehub'] },
  // ... 62개
}
```

### 병합 로직 (gameStore.buildState)

```js
const d = _DETAIL_MAP[s.code] ?? {}
systems[s.code] = {
  id: s.code, code: s.code,
  name: s.nameKr, nameEn: s.nameEn,
  type: s.type, x: s.x, y: s.y,
  faction: d.faction ?? null,
  morale: d.morale ?? 60,
  tax: d.tax ?? 0,
  traits: d.traits ?? [],
  underConstruction: null,
  ...(_DEFAULTS[s.type] ?? _DEFAULTS.normal),
}
```

---

## 시나리오 추가 방법

1. `scenarios/S0N/starDetail.js` 생성 (STAR_DETAIL 객체, key=code)
2. `scenarios/S0N/planetDetail.js` 생성
3. `gameStore.buildState(scId, pf)` 에서 `scId` 분기 추가

---

## TODO

- [ ] mainStory.js — 스토리 이벤트 트리거 조건 정의 (이벤트 턴, 조건, EVTALK.MSG 연결)
- [ ] planetDetail.js 완성 (현재 빈 껍데기)
- [ ] S02~S10 시나리오 초기값 작성 (원작 G4XSNR01~09.DAT 참조)
- [ ] 시나리오별 초기 함대 편성 데이터 추가
