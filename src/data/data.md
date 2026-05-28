# src/data — 데이터 폴더

## 개요

게임에서 사용하는 모든 마스터/정적 데이터. 크게 **불변 마스터**(stars/, characters/, factions/)와 **시나리오 초기값**(scenarios/)으로 구분된다.

---

## 폴더 구조

```
src/data/
├── masterData.js          ← 호환성 shim (재export 전용)
├── tacticalData.js        ← 전술전투 데이터 (진형 6종, 지형, 맵)
├── stars/                 → stars.md 참조
├── scenarios/             → scenarios.md 참조
├── factions/              → factions.md 참조
├── characters/            → characters.md 참조
└── trait/                 → trait.md 참조
    └── stars/
        └── traitData.js   ← 22개 트레잇
```

---

## masterData.js — 호환성 shim

**직접 수정 금지.** encyclopediaStore.js, ScenarioSelectView.vue 등 구 코드와의 호환성을 위한 재export 파일.

```js
// 내부적으로 새 파일에서 import 후 구 포맷으로 변환해서 재export
import { STAR_SYSTEMS as _NEW } from '@/data/stars/starSystemData.js'
import { LANES as _LANES }     from '@/data/stars/lane.js'

export const STAR_SYSTEMS = _NEW.map(s => ({ id: s.code, name: s.nameKr, ... }))
export const LANES        = _LANES.map(l => [l.stars[0], l.stars[1]])
```

새 코드에서는 직접 `starSystemData.js`, `lane.js` 등을 import할 것.

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

구 id → 새 code 변환은 `src/data/stars/json/code_map.json` 참조.

---

## tacticalData.js

전술전투에서만 사용. 진형 6종, 지형 타입, 맵 빌더 포함.

```js
export { FORMATIONS, TERRAIN_TYPES, buildTacticalMap }
```

---

## TODO

- [ ] starsData.js (LEGACY) 삭제 확인 — encyclopediaStore 등 참조 여부 체크
- [ ] traitData.js — 트레잇 적용 로직(gameStore endTurn) 연결
- [ ] scenarios.js.js — 스토리 이벤트 트리거 조건 정의
