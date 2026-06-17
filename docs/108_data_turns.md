# 턴 시스템 설계
> 분류: 데이터
> 경로: `docs/108_data_turns.md`
> 상위: [100_DATA.md](100_DATA.md)
> 최종 수정: 2026-06-17

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

## TODO

- [ ] `gameStore` — `day`, `subTurn`, `hourStep` 상태 추가
- [ ] `gameStore` — `nextTurn()` → `nextDay()` + `nextSubTurn()` 분리
- [ ] `gameStore` — 전략 턴 종료 시 교전 탐지 (`_resolveBattles()`)
- [ ] `gameStore` — 전투 종료 후 `_advanceDay()` 연결
- [ ] `ScenarioOptionsView` — hourStep 선택 UI (3/4/6/8/12/24h)
- [ ] `GameDateDisplay` — 전투 중 서브턴 시각 반영
