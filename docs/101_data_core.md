# src/data — 데이터 폴더 / 코드 체계
> 분류: 데이터
> 경로: `docs/101_data_core.md`
> 상위: [100_DATA.md](100_DATA.md)
> 최종 수정: 2026-06-17

## 개요

게임에서 사용하는 모든 마스터/정적 데이터. 크게 **불변 마스터**(stars/, characters/, factions/)와 **시나리오 초기값**(scenarios/)으로 구분된다.

---

## 폴더 구조

```
src/data/
├── masterData.js          ← 게임 상수 집합
├── base/                  ← 불변 마스터 데이터
│   ├── stars/             → 102_data_stars.md
│   │   ├── starSystemData.js
│   │   ├── laneData.js
│   │   ├── planetsData.js
│   │   ├── code_map.json
│   │   └── maps/          ← 62개 성계 세부맵 + starMaps.js
│   ├── factions/          → 104_data_factions.md
│   │   ├── factionsData.js
│   │   └── factionName.js
│   ├── characters/        → 105_data_characters.md
│   │   ├── charactersData.js
│   │   ├── charactersJobs.js
│   │   └── charactersTraits.js
│   ├── fleet/             → 106_data_fleet.md
│   │   ├── formationData.js
│   │   ├── flagshipData.js
│   │   └── unitshipData.js
│   ├── regime/
│   │   ├── ideologyData.js
│   │   ├── economyData.js
│   │   └── regimeData.js
│   ├── jobs/
│   │   └── jobData.js
│   ├── agenda/
│   │   ├── agendaData.js
│   │   └── menuTree.js
│   ├── tactical/
│   │   └── (전술전투 데이터)
│   └── trait/
│       └── traitData.js   ← 22개 트레잇
└── scenario/              → 103_data_scenarios.md
    ├── scenarioData.js
    ├── SE640/01/
    ├── SE745/01/
    └── SE796/01/, 10/, ...
```

---

## masterData.js — 게임 상수 모음

각 서브폴더 데이터를 재export하거나, 인라인 상수를 정의하는 집합 파일.  
**STAR_SYSTEMS / LANES는 제거됨** — 직접 `starSystemData.js`, `laneData.js`를 import할 것.

```js
export { SCENARIOS }              // @/data/scenario/scenarioData.js
export { CHARACTERS }             // @/data/base/characters/charactersData.js (CHAR_BASE)
export { FACTIONS }               // @/data/base/factions/factionsData.js

// 인라인 상수
export { OPERATION_TYPES, FORTRESS_WEAPONS, CONSTRUCTION_TYPES }
export { DIALOGS, POSTS }
export { FINANCE, MILITARY, INTEL }
```

---

## 코드 체계

```
성계 코드: 230001 ~ 230062  (6자리, 알파벳 ABC순)
행성 코드: {starCode}P{seq}  (예: 230006P01)

230001=ALMENTPUVEL  230002=ALTENER    230003=AMLITZER
230004=ARESHYUM     230005=ASTADE     230006=BAARAT
230007=BARATULF     230008=BODEN      230009=BRUNSCHWEIG
230010=DAGON        230011=DOSORIA    230012=ECKHART
...
230058=VALHALLA     230059=VANDENBERG 230060=VANFLEET
230061=VERMILION    230062=VILLENSTEIN
```

구 id → 새 code 변환은 `src/data/base/stars/code_map.json` 참조.

---

## src/data/base/tactical/ — 전술전투 데이터

전술전투에서만 사용. 진형 6종(`formationData.js` → [106_data_fleet.md](106_data_fleet.md) 참조), 지형 타입, 맵 빌더 포함.

```js
export { TERRAIN, HAZARD_TYPES, buildTacticalMap }
```

---

## TODO

- [ ] starsData.js (LEGACY) 삭제 확인 — encyclopediaStore 등 참조 여부 체크
- [ ] traitData.js — 트레잇 적용 로직(gameStore endTurn) 연결
- [ ] scenarios.js.js — 스토리 이벤트 트리거 조건 정의
