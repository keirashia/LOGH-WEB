# 게임 초기화 데이터 설계
> 분류: 데이터
> 경로: `docs/110_data_init.md`
> 상위: [100_DATA.md](100_DATA.md)
> 최종 수정: 2026-06-28

---

## 1. 개요

시나리오 선택 후 `game.startGame(scId, playerFaction, charCode)` 호출 시  
시나리오 파일 기반의 초기 게임 상태를 구성한다.

**현재 구현 상태:** `import.meta.glob` 기반 동적 로드로 전환 완료.  
`buildState()`는 성계·행성·함대·인물직업을 시나리오 파일 기반으로 병합하며,  
인물 목록 필터링·자원 초기값·Pinia persist는 미구현.

---

## 2. 전체 초기화 흐름

```
main.js
  └─ useAuthStore().initTempCode()   ← localStorage tempCode 복원/생성

라우터 /game 가드
  └─ game.initialized === false → /title 리다이렉트

게임 시작 경로:
  ScenarioSelectView
    → ScenarioDetailView   onMounted: game.preloadScenario(scId)
      → ScenarioCharSelectView   onNext: game.startGame(scId, faction, charCode) → /game
```

### startGame() 내부 순서

```
startGame(scId, pf, charCode)
  │
  ├── 1. _preloadedScId === scId 이면 _preloadedData 재사용
  │        아니면 _loadScenarioFiles(scId) 비동기 로드
  │
  ├── 2. buildState(scId, pf, extraData) 호출
  │
  ├── 3. Object.assign(this.$state, { initialized: true, ...fresh })
  │
  └── 4. if (charCode) this.playerCharCode = charCode
```

---

## 3. 데이터 소스 맵

### 3-1. 국가 (Faction)

| 항목 | 소스 | 상태 |
|---|---|---|
| 세력 목록 | `masterData.js → FACTIONS` | ✅ 사용 중 |
| 초기 자금 | `gameStore.js` 하드코딩 (REH:5000, FPA:4500, PZN:8000) | ⚠️ 하드코딩 |
| 초기 자원 | 동일 | TODO: scenarioDesc 연동 |

---

### 3-2. 성계 + 행성 (Star Systems)

| 항목 | 소스 | 상태 |
|---|---|---|
| 성계 기본 정보 | `base/stars/starSystemData.js → STAR_SYSTEMS` | ✅ 사용 중 |
| 행성 기본 정보 | `base/stars/planetsData.js → PLANETS` | ✅ 사용 중 |
| 시나리오 성계 오버라이드 | `scenario/{y}/{m}/{s}/stars/starDetail.js` | ✅ 사용 중 |
| 시나리오 행성 파벌 | `scenario/{y}/{m}/{s}/stars/planetDetail.js` | ✅ 사용 중 |
| 레인 / 장애물 | `base/stars/laneData.js`, starSystemData | ✅ 사용 중 |

**성계 faction 결정 로직:** 해당 성계 행성들의 faction 다수결. 동률이면 `null`.

**미구현 필드 (TODO):**
- `fortress` — 현재 `null` 고정. `planetDetailTrait.js`에 FORTIFIED 트레잇 구현 후 트레잇 기반으로 재구현 필요.
- `planetDetailTrait` / `Building` — 행성 트레잇·건물 데이터 구조 미구현.

---

### 3-3. 함대 (Fleet) ✅ 완료

| 항목 | 소스 | 상태 |
|---|---|---|
| 함대 목록 | `scenario/{y}/{m}/{s}/fleet/fleetData.js` | ✅ 사용 중 |
| 함선 수 | `scenario/{y}/{m}/{s}/fleet/fleetShipData.js` | ✅ shipAmt 합산 |
| 지휘관 | `scenario/{y}/{m}/{s}/fleet/fleetCharacterData.js` | ✅ type=C |
| 함대 트레잇 | `scenario/{y}/{m}/{s}/fleet/fleetTraitData.js` | ⚠️ 로드하나 buildState에서 미사용 |

**변환 규칙 (현재 구현)**
```
fleetData (fltCode, fltName, faction, fltLoc)  — parentFlt 있는 하위함대 제외
  + fleetShipData (fltCode 기준 shipAmt 합산)
  + fleetCharacterData (type=C → commander)
  ↓
gameStore.fleets[faction][] = {
  id:        fltCode,
  name:      fltName,
  commander: charCode (type=C),
  ships:     shipAmt 합산,
  maxShips:  ships와 동일,
  location:  fltLoc || null,
  status:    'standby',
  target:    null,
  upkeep:    Math.ceil(ships / 500),
}
```

**미구현:** `officers` 필드 (type=O 부관 목록) — 현재 사령관만 포함.

---

### 3-4. 인물 (Character)

| 항목 | 소스 | 상태 |
|---|---|---|
| 전체 인물 마스터 | `masterData.js → CHARACTERS` | ✅ 전체 로드 중 |
| 시나리오 등장 인물 | `scenario/{y}/{m}/{s}/characters/charactersData.js` | ⚠️ CharSelectView 전용, buildState 미연동 |
| 직업 기본값 | `base/characters/charactersJobs.js` | ✅ 사용 중 |
| 시나리오별 직업 오버라이드 | `scenario/{y}/{m}/{s}/characters/charactersJobs.js` | ✅ 사용 중 |

**현재 동작:** `CHARACTERS` 전체를 `characters[c.code]`에 로드. 시나리오별 charList 필터링 미적용.

**직업 오버라이드 패턴 (구현됨):**
```
charJobs (시나리오 직업) + BASE_CHAR_JOBS (기본 직업)
  → 시나리오 직업이 있는 charCode는 시나리오 값 우선
  → _initPostMap[charCode] = 첫 번째 jobCode
  → _initPostsMap[charCode] = 직업 코드 배열
```

---

## 4. 파일 로드 방식 — import.meta.glob

`gameStore.js` 상단에 glob 패턴으로 일괄 등록, 시나리오 ID를 경로로 변환해 동적 로드:

```js
const _GLOB_STAR_DETAIL   = import.meta.glob('/src/data/scenario/*/*/*/stars/starDetail.js')
const _GLOB_PLANET_DETAIL = import.meta.glob('/src/data/scenario/*/*/*/stars/planetDetail.js')
const _GLOB_CHAR_JOBS     = import.meta.glob('/src/data/scenario/*/*/*/characters/charactersJobs.js')
const _GLOB_FLEET_DATA    = import.meta.glob('/src/data/scenario/*/*/*/fleet/fleetData.js')
const _GLOB_FLEET_CHAR    = import.meta.glob('/src/data/scenario/*/*/*/fleet/fleetCharacterData.js')
const _GLOB_FLEET_SHIP    = import.meta.glob('/src/data/scenario/*/*/*/fleet/fleetShipData.js')
const _GLOB_FLEET_TRAIT   = import.meta.glob('/src/data/scenario/*/*/*/fleet/fleetTraitData.js')

// scId 'SE796_01_ASTARTE' → [y,m,s] 분리 → base 경로 조립
async function _loadScenarioFiles(scId) {
  const [y, m, s] = scId.split('_')
  const base = `/src/data/scenario/${y}/${m}/${s}`
  // 7개 파일 Promise.all 병렬 로드
}
```

파일이 없으면 `null`을 반환하며 `buildState`에서 기본값으로 대체.

---

## 5. preloadScenario — 사전 캐시 패턴

```
ScenarioDetailView onMounted (시나리오 unlock 상태인 경우)
  └── game.preloadScenario(scId)
        ├── _preloadedScId === scId → 즉시 반환 (캐시 히트)
        └── 아니면 _loadScenarioFiles(scId) 실행
              → this._preloadedScId = scId
              → this._preloadedData = { starDetail, planetDetail, charJobs,
                                         fleetData, fleetCharData, fleetShipData, fleetTraitData }

startGame(scId, pf, charCode)
  └── _preloadedScId === scId → _preloadedData 재사용
        아니면 _loadScenarioFiles(scId) 재호출
```

**미구현:** preload 진행 중 시작 버튼 비활성화 / 로딩 UI.

---

## 6. 저장 방식 ✅ 확정: Pinia persist

| 방식 | 장점 | 단점 |
|---|---|---|
| **Pinia persist 플러그인** | 자동화, 코드 최소화, 스토어 구조 유지 | localStorage 의존 |
| LOGH_API (Phase 3) | 서버 저장, 멀티 기기 | 구현 비용 높음 |

**Phase 1~2:** `pinia-plugin-persistedstate` 사용 (`persist: true` 한 줄로 적용)  
**Phase 3:** persist 옵션 비활성화 후 LOGH_API 저장으로 교체 예정

저장 대상:
- `gameStore.$state` 전체 (turn, systems, characters, fleets, resources, log, agendas)
- 저장 트리거: 턴 종료 시 자동 저장 + 수동 저장 버튼
- 슬롯: 자동 1개 + 수동 3개 (미정)
- 로그는 최근 200건만 유지 (localStorage 5MB 제한 대응)

**현재:** 미구현. 새로고침 시 게임 상태 소실.

---

## 7. 알려진 버그

| 항목 | 위치 | 내용 |
|---|---|---|
| `require()` 사용 | `gameStore.js` 다수 action | Vite ESM 환경에서 `require` 미지원 → 런타임 오류. `FINANCE` / `MILITARY` / `INTEL` 을 최상단 import로 전환 필요 |
| `lobbyStore.loadUnlocks()` 미호출 | `main.js` | 앱 시작 시 unlock 데이터 복원 안 됨 → 구매한 시나리오가 잠금 상태로 표시될 수 있음 |
| `ScenarioOptionsView.onNext()` 라우트 오류 | `ScenarioOptionsView.vue` | "다음" 버튼이 `scenario-char` 대신 `scenario-detail`로 이동 (역방향) |
| `fleetTraitData` 미사용 | `gameStore.js buildState` | 파일은 로드하나 `buildState` destructuring에서 누락 |

---

## 8. TODO

| 우선순위 | 항목 |
|---|---|
| 🔴 | `require()` → 최상단 `import` 전환 (`FINANCE`, `MILITARY`, `INTEL`) |
| 🔴 | `main.js`에 `lobbyStore.loadUnlocks()` 추가 |
| 🔴 | `ScenarioOptionsView.onNext()` 라우트 수정 (`scenario-char`로) |
| 🟡 | `buildState()` 내 characters → charList 필터링 적용 |
| 🟡 | `fleetTraitData` buildState에 연동 |
| 🟡 | `officers` 필드 추가 (type=O 부관 목록) |
| 🟡 | `resources` 초기값 → scenarioDesc 파일에서 로드 |
| 🟡 | `fltLoc` 빈 값 → 시나리오별 기본 성계 코드 입력 |
| 🟢 | Pinia persist 저장/불러오기 구현 |
| 🟢 | preload 중 시작 버튼 비활성화 + 로딩 UI |
| 🟢 | `planetDetailTrait` / `Building` 구현 후 `fortress` 필드 재구현 |
