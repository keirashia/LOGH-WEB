# 턴 시스템 설계
> 분류: 데이터
> 경로: `docs/108_data_turns.md`
> 상위: [100_DATA.md](100_DATA.md)
> 최종 수정: 2026-07-05

## 개요

- **전략 턴 1턴 = 1일** (전략맵 명령 단위, 고정)
- **1년 = 365일** (월별 실제 일수 적용: 31/28/31/30/31/30/31/31/30/31/30/31, 윤년 미적용)
- **전투는 전략 턴 종료 시점에 발생** (하루가 끝날 때 교전 탐지 → 전투 화면 진입)
- **전투 내부는 서브턴으로 진행** (hourStep 옵션에 따라 1일을 N라운드로 분할)

---

## 턴 흐름

```
[ 전략 턴 시작 (day N) ]
  ├─ 플레이어 명령 입력 (함대 이동 / 건조 / 외교 등)
  ├─ AI 행동
  └─ 전략 턴 종료
       ├─ 교전 없음 → day N+1, 징세/이벤트 처리
       └─ 교전 있음 → 전투 진입 (서브턴 × N) → 종료 → day N+1
```

---

## hourStep 옵션 (전투 서브턴 단위)

| hourStep | 전투 1라운드 = | 하루 라운드 수 |
|----------|----------------|----------------|
| 24h      | 1일 (즉결)     | 1 (기본값)     |
| 12h      | 반나절         | 2              |
| 8h       | 8시간          | 3              |
| 6h       | 6시간          | 4              |
| 4h       | 4시간          | 6              |
| 3h       | 3시간          | 8              |

> 24의 약수만 허용: 3, 4, 6, 8, 12, 24

---

## 날짜/시각 표시

```
우주력 796년 (제국력 487년)
2월 14일  06시
```

- 전략맵 : 시각 = `00시` 고정
- 전투 중 : 시각 = `subTurn × hourStep`

---

## 관련 파일

| 파일 | 역할 |
|------|------|
| `src/components/game/GameDateDisplay.vue` | 날짜/시각 표시 컴포넌트 |
| `src/stores/gameStore.js` | 시간 상태 관리 |
| `src/views/lobby/scenario/ScenarioOptionsView.vue` | hourStep 선택 UI |
| `src/views/game/TacticalView.vue` | 전투 화면, 서브턴 진행 |

---

## 현재 구현 (실제 코드 기준, hourStep 도입 전)

위 hourStep 서브턴 설계는 아직 미구현이며, 현재는 **턴 = 1일 고정**으로 아래처럼 동작한다.

### 턴의 시작
- `GameView.vue` 마운트 시 `game.initialized` 확인 (false면 `/game` 라우터 가드가 `/title`로 리다이렉트)
- 전략턴 화면: `GalaxyMap.vue` 은하계 지도 + `GameHud.vue`(년/월/일, 턴 수 HUD) 노출

### 게임 시작 시점의 강제 조우 (`gameStore._checkInitialEncounters()`, 2026-07-05 신규)
- `startGame()` 마지막 단계에서 호출 — 시나리오 데이터가 플레이어 세력 함대를 처음부터 적 함대와
  같은 성계에 배치해뒀다면(예: SE796_0211_010 아스타테의 FPA002/REH004) 1턴 시작과 동시에 `_pendingBattles`에 등록
- 시나리오 무관 범용 로직 — `fleetData.js`의 `location.locCode`만으로 결정되므로 특정 시나리오에 하드코딩되지 않음
- `GameView.vue`의 `_pendingBattles` watcher는 `{ immediate: true }`로 등록해야 함 — 컴포넌트가 마운트되기
  **이전**(스토어 초기화 시점)에 이미 큐가 채워지는 경우가 있어, 일반 `watch`(값이 "변경"될 때만 발화)로는
  이 최초 진입 조우를 감지하지 못하는 타이밍 버그가 있었음. `ctx._notified` 플래그로 중복 확인창 방지.

### 전략턴 → `StrategyBar.vue`(구 BottomBar) [턴종료] 클릭 시
1. 이번 턴 전략 활동 여부(`game._turnActionTaken`)에 따라 confirm 메시지 분기
   - 없음: `이번 턴에는 전략 활동 이력이 없습니다. 전략 턴을 종료할까요?`
   - 있음: `전략 턴을 종료할까요?`
2. [턴종료] 확정 시 `gameStore.endTurn()` 실행

### `endTurn()` 실행 순서 (`gameStore.js`)
```
_processAgendas()  의안 처리(결재권자 politics/10 = 동시 처리 수)
_income()          수입 = population × tax% × industry% × 10, 함대 유지비 차감
_supply()          함대 보급 갱신 (아군 성계 +10%, 적/항로 -5%, resupply 상태 +20%)
_fleetMove()        moving 상태 함대 moveTurnsLeft-- → 0 되면 도착 처리
                    도착 지점에 적 함대 있으면 _pendingBattles 큐에 등록(성계 ID 순 정렬)
_morale()          사기 증감
_construct()       건설 turnsLeft-- → 0 되면 효과 반영
_events()          10% 확률 랜덤 이벤트 로그
_ai()              AI 세력 수입 처리 + 12% 확률 함대 공략 시도
→ _pendingBattles가 비어 있으면 곧바로 _finishTurn() 호출
   (비어 있지 않으면 전술턴이 모두 처리될 때까지 날짜 증가 보류)
```

### `_finishTurn()` — 턴의 종료
- `day++` → 월별 실제 일수(윤년 미적용) 초과 시 `month++` → 12 초과 시 `year++`/`impYear++`
- `turn++`
- `_victory()`: 성계 70% 이상 점유 세력 있으면 `gameOver = true`
- `game.addLog()`로 턴 시작 로그 기록, `_turnActionTaken = false`로 초기화

### 전술턴 진입 판정 (`GameView.vue`가 `game._pendingBattles.length`를 watch, `immediate:true`)
- 플레이어 인물이 교전 함대(사령관/부관/분함대사령관 — `commander`/`officers`/`subCommanders`)에 있으면 confirm 없이 곧바로 `/game/tactical` 이동
- 없으면 confirm 모달(`이번 턴 교전 발생. 상세 전투를 보시겠어요?`) → [네] 상세 진입 / [아니오] `autoResolveBattle()`로 즉시 결과만 산출
- 전술턴(또는 자동 해결) 종료 후 `gameStore.applyBattleResult(result)` → `_pendingBattles.shift()` → 큐가 비면 `_finishTurn()` 호출

> 전술전투 자체의 세부 로직(부대 생성, 전투 공식, AI 페이즈)은 [114_data_battle.md](114_data_battle.md)의 "현재 구현" 절 참조.

---

## TODO

- [ ] `gameStore` — `day`, `subTurn`, `hourStep` 상태 추가
- [ ] `gameStore` — `nextTurn()` → `nextDay()` + `nextSubTurn()` 분리
- [ ] `gameStore` — 전략 턴 종료 시 교전 탐지 (`_resolveBattles()`)
- [ ] `gameStore` — 전투 종료 후 `_advanceDay()` 연결
- [ ] `ScenarioOptionsView` — hourStep 선택 UI (3/4/6/8/12/24h)
- [ ] `GameDateDisplay` — 전투 중 서브턴 시각 반영
