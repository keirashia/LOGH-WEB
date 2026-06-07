# 턴 시스템 설계 (ternsScreen)

## 개요

LOGH-WEB의 시간 단위 체계. 플레이어가 게임 시작 시 "1턴의 길이"를 설정하여
게임 속도(턴당 시간 스케일)를 조절한다.

---

## 시간 단위 계층

```
우주력 년도
  └─ 월 (1~12)
       └─ 일 (1~30, 게임 단순화)
            └─ 서브턴 (1일을 hourStep으로 나눈 단위)
                  └─ 시 (0, hourStep, 2×hourStep, ...)
```

---

## hourStep 옵션

| 옵션 | 1턴 = | 하루 서브턴 수 | 비고 |
|------|--------|----------------|------|
| 24h  | 1일    | 1              | 기본값, 현재 구현 |
| 12h  | 반나절 | 2              | 빠른 전술 대응 |
| 8h   | 8시간  | 3              | 교전 단위 |
| 6h   | 6시간  | 4              | 소규모 기동 |
| 4h   | 4시간  | 6              | 세밀한 함대 제어 |
| 3h   | 3시간  | 8              | 최고 세밀도 |

> 24의 약수만 허용: 1, 2, 3, 4, 6, 8, 12, 24 (3h 미만은 미지원)

---

## 날짜/시각 표시 (`GameDateDisplay.vue`)

```
우주력 796년 (제국력 487년)      ← date-year (10px, --tg)
2월 14일  06시                   ← date-detail (13px, --t1) + date-hour (--tg)
```

- `game.year` / `game.impYear` / `game.month` / `game.day`
- `game.subTurn` : 현재 서브턴 카운터 (전체 누적)
- `game.hourStep` : 서브턴당 실시간 시간(h), 기본 24
- `currentHour = (subTurn % (24/hourStep)) × hourStep`

---

## gameStore 확장 계획

```js
// 추가 예정 상태 (초기값)
hourStep:  24,     // 옵션: 3 | 4 | 6 | 8 | 12 | 24
subTurn:   0,      // 전체 서브턴 누적 카운터
day:       1,      // 현재 일 (1~30)
```

### nextSubTurn() 로직

```js
nextSubTurn() {
  this.subTurn++
  const stepsPerDay = 24 / this.hourStep

  if (this.subTurn % stepsPerDay === 0) {
    // 하루 경과
    this.day++
    if (this.day > 30) {
      this.day = 1
      this.month++
      if (this.month > 12) {
        this.month = 1
        this.year++
        this.impYear++
      }
    }
  }

  // 기존 nextTurn()의 월별 처리(징세 등)는
  // subTurn % stepsPerDay === 0 && day === 1 조건으로 이동 예정
}
```

---

## 관련 컴포넌트/스토어

| 파일 | 역할 |
|------|------|
| `src/components/game/GameDateDisplay.vue` | 날짜/시각 표시 컴포넌트 |
| `src/stores/gameStore.js` | year/impYear/month/day/subTurn/hourStep 상태 |
| `src/views/lobby/scenario/ScenarioOptionsView.vue` | hourStep 옵션 선택 UI (예정) |

---

## TODO

- [ ] `gameStore`에 `day`, `subTurn`, `hourStep` 상태 추가
- [ ] `nextTurn()` → `nextSubTurn()` 로 교체 (월별 이벤트 조건 이동)
- [ ] `ScenarioOptionsView`에 hourStep 선택 UI 추가 (3/4/6/8/12/24h)
- [ ] `GameDateDisplay` props로 `align` 지원 (right/left/center)
- [ ] 전술 전투 시간 연동 (서브턴 = 교전 라운드와 매핑 여부 검토)
