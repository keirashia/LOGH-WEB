# 게임 초기화 데이터 설계
> 분류: 데이터
> 경로: `docs/110_data_init.md`
> 상위: [100_DATA.md](100_DATA.md)
> 최종 수정: 2026-06-19

---

## 1. 개요

시나리오 선택 후 `game.startGame(scId, playerFaction)` 호출 시  
시나리오 파일 기반의 초기 게임 상태를 구성한다.

현재 `buildState()`는 일부 데이터를 하드코딩하거나 전체 마스터 데이터를 무차별 로드한다.  
이를 **시나리오별 파일 기반**으로 전환하는 것이 목표.

---

## 2. 데이터 소스 맵

### 2-1. 국가 (Faction)

| 항목 | 소스 | 비고 |
|---|---|---|
| 세력 목록 | `src/data/masterData.js` → `FACTIONS` | REH / FPA / PZN 고정 |
| 초기 자금 | `src/data/scenario/{scId}/scenarioDesc.js` | 시나리오별 설정 (TODO) |
| 초기 자원 | 동일 | TODO |

현재: `resources`를 `gameStore.js` 내부 하드코딩으로 설정 중.

---

### 2-2. 성계 + 행성 (Star Systems)

| 항목 | 소스 | 비고 |
|---|---|---|
| 성계 기본 정보 | `src/data/base/stars/starSystemData.js` | 62개, code/name/x/y/type |
| 시나리오별 초기값 | `src/data/scenario/{scId}/starDetail.js` | faction / morale / tax / traits 등 |

현재: `_SCENARIO_DETAIL_MAP`으로 매핑 후 merge — **사용 중**.

---

### 2-3. 함대 (Fleet)

| 항목 | 소스 | 비고 |
|---|---|---|
| 함대 목록 | `src/data/scenario/{scId}/fleet/fleetData.js` | fltCode / faction / fltName / fltLoc |
| 함선 수 | `src/data/scenario/{scId}/fleet/fleetShipData.js` | shipAmt 합산 → 초기 ships |
| 지휘관/부관 | `src/data/scenario/{scId}/fleet/fleetCharacterData.js` | type: C(사령관) / O(부관) / S(분함대장) |

현재: `gameStore.js` 내부 하드코딩 (E_1ST, A_13TH 등) — **교체 필요**.

**변환 규칙**
```
fleetData (fltCode, fltName, faction, fltLoc)
  + fleetShipData (fltCode, shipAmt 합산)
  + fleetCharacterData (type=C → commander)
  ↓
gameStore.fleets[faction][] = {
  id:        fltCode,
  name:      fltName,
  faction:   faction,
  commander: charCode (type=C인 인물),
  officers:  [charCode, ...] (type=O),
  ships:     shipAmt 합산,
  maxShips:  동일,
  location:  fltLoc (starCode),
  status:    'standby',
  target:    null,
  upkeep:    Math.floor(ships / 500),
}
```

---

### 2-4. 인물 (Character)

| 항목 | 소스 | 비고 |
|---|---|---|
| 전체 마스터 | `src/data/base/characters/charactersData.js` → `CHAR_BASE` | 전체 인물 |
| 시나리오 등장 인물 | `src/data/scenario/{scId}/charList.js` | charCode 목록 |

현재: `CHAR_BASE` 전체를 `characters[c.code]`에 로드 — **필터링 필요**.

**변환 규칙**
```
charList[].charCode 에 해당하는 CHAR_BASE 항목만 추출
  ↓
gameStore.characters[charCode] = {
  ...CHAR_BASE_MAP[charCode],
  currentPost: null,      // 초기 직위 없음 (TODO: 시나리오 오버라이드)
  currentPost: jobCode,   // charList에 초기 직위 명시 시 적용
  isDead: false,
}
```

---

## 3. 시나리오 파일 로드 흐름

```
startGame(scId, playerFaction)
  │
  ├── 1. scenarioData.js → 시나리오 메타 (year, month 등)
  ├── 2. starSystemData + starDetail[scId] → systems{}
  ├── 3. CHAR_BASE + charList[scId] → characters{}
  ├── 4. fleetData + fleetShipData + fleetCharacterData → fleets{}
  └── 5. (TODO) scenarioDesc → resources 초기값
```

---

## 4. preloadScenario — 사전 캐시 패턴

### 목적

`ScenarioDetailView` 진입 시 바로 파일을 로드해 두고, 실제 `startGame` 호출 시 캐시를 재사용한다.  
로드가 완료되기 전까지 시작 버튼을 비활성화하고 로딩 UI를 표시한다.

### 흐름

```
ScenarioDetailView onMounted
  └── game.preloadScenario(scId)
        ├── _preloadedScId === scId 이면 즉시 반환 (캐시 히트)
        └── 아니면 _loadScenarioFiles(scId) 실행 → _preloadedScId / _preloadedData 에 저장

startGame(scId, pf, charCode)
  └── _preloadedScId === scId 이면 _preloadedData 재사용, 아니면 재요청
```

### 단계별 로드 순서 (설계 목표)

```
 1. base/stars/starSystemData.js         (STAR_SYSTEMS) 조회·무결성 검증
 2. {scId}/stars/starSystemData.js       시나리오별 성계 오버라이드 조회
 3. 실제 성계 상태 완성                   base + 시나리오 병합
 4. base/stars/planetsData.js            행성 조회·무결성 검증
 5. {scId}/stars/planetsData.js          시나리오별 행성 오버라이드 조회
 6. 실제 행성 상태 완성                   base + 시나리오 병합
 7. base/characters/charactersData.js    시나리오 YMD 기준 인물 필터링·무결성 검증
 8. {scId}/characters/charactersData.js  시나리오 등장 인물 오버라이드 조회
 9. 실제 인물 상태 완성                   base + 시나리오 병합
10. 추가 인물 등장 옵션 Y/N 처리           7~9 결과물에 merge
11. 이번 시나리오 등장 인물 최종 확정
12. {scId}/fleet/fleetData.js            함대 데이터 조회·무결성 검증
13. 인물·성계·함대 3요소 완성 → buildState 준비 완료
```

> 7~9에서 인물 데이터를 참조할 때 직업(jobData) / 트레잇(charTraitData)도 함께 로드.  
> 6-1(faction 상태: idea/econ/파벌 등) 생성은 설계 중.

### 로딩 UI

- preload 시작 시 시작 버튼 **비활성화** + 게이지 표시 (좌→우)
- 단계마다 현재 로드 중인 데이터 명칭 표시
- 완료 전까지 시나리오 배경 화면을 유저에게 노출

### 검토 항목

- [ ] `charactersData.js` (CHAR_LIST) — `ScenarioCharSelectView`에서 별도 동적 import 중. 프리로드에 포함할지 결정
- [ ] `scenarioDesc.js` (DESC) — `scenarioData.js` 정적 import로 이미 포함됨. 중복 로드 없음 확인
- [ ] `planetDetail.js` — 현재 로드 목록 미포함. 필요 여부 확인
- [ ] variant 전환(◁▷) 시 다른 scId로 이동하면 캐시 초기화 후 재로드 필요

---

## 5. 시나리오 파일 import 등록 방식

현재 `gameStore.js` 내부에 시나리오별 starDetail을 `_SCENARIO_DETAIL_MAP`으로 수동 등록.  
함대/인물도 동일 패턴으로 확장 예정:

```js
// gameStore.js 상단
import { FLEET_DATA as _FD_SE796_10, ... } from '@/data/scenario/SE796/10/fleet/fleetData'
import { FLEET_SHIP_DATA as _FSD_SE796_10 } from '@/data/scenario/SE796/10/fleet/fleetShipData'
import { FLEET_CHARACTER_DATA as _FCD_SE796_10 } from '@/data/scenario/SE796/10/fleet/fleetCharacterData'
import { CHAR_LIST as _CL_SE796_10 } from '@/data/scenario/SE796/10/charList'

const _SCENARIO_FLEET_MAP = {
  'SE796_10': { fleet: _FD_SE796_10, ship: _FSD_SE796_10, char: _FCD_SE796_10 },
  ...
}
const _SCENARIO_CHAR_MAP = {
  'SE796_10': _CL_SE796_10,
  ...
}
```

---

## 6. 저장 방식 ✅ 확정: Pinia persist

| 방식 | 장점 | 단점 |
|---|---|---|
| `localStorage` | 간단, 오프라인 | 용량 제한 (~5MB), 기기 종속 |
| **Pinia persist 플러그인** | **자동화, 코드 최소화, 스토어 구조 유지** | localStorage 의존 |
| LOGH_API (Phase 3) | 서버 저장, 멀티 기기 | 구현 비용 높음 |

**Phase 1~2**: `pinia-plugin-persistedstate` 사용 (`persist: true` 한 줄로 적용)  
**Phase 3**: persist 옵션 비활성화 후 LOGH_API 저장으로 교체 예정

저장 대상:
- `gameStore.$state` 전체 (turn, systems, characters, fleets, resources, log, agendas)
- 저장 트리거: 턴 종료 시 자동 저장 + 수동 저장 버튼
- 슬롯: 자동 1개 + 수동 3개 (미정)
- 로그는 최근 200건만 유지 (localStorage 5MB 제한 대응)

> 보안: localStorage는 평문 JSON — 클라이언트 위변조 가능하나 싱글플레이 범위에서는 허용.  
> Phase 3 멀티플레이 시 서버 검증 필수.

---

## 7. TODO

| 우선순위 | 항목 |
|---|---|
| 🔴 | `buildState()` 내 함대 하드코딩 → fleetData 기반으로 교체 |
| 🔴 | `buildState()` 내 characters → charList 필터링 적용 |
| 🟡 | `_SCENARIO_FLEET_MAP` / `_SCENARIO_CHAR_MAP` 등록 구조 추가 |
| 🟡 | `fltLoc` 빈 값 → 시나리오별 성계 코드 입력 |
| 🟡 | `resources` 초기값 → scenarioDesc에서 로드 |
| 🟢 | 저장/불러오기 — pinia-plugin-persistedstate 설치 및 gameStore에 persist 적용 |
| 🟢 | 시나리오 charOverride (시나리오별 인물 이름/파벌 오버라이드) |
