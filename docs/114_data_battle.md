# 전투 시스템 설계
> 분류: 시스템 로직
> 경로: `docs/114_data_battle.md`
> 상위: [100_DATA.md](100_DATA.md)
> 최종 수정: 2026-07-15
> 상태: 🔄 구현 진행 중 (아래 "구현 현황" 참조 — §0~7은 전체 설계 목표)

---

## 구현 현황 (2026-07-15 기준)

### ✅ 구현 완료

| 항목 | 파일 | 설계 섹션 |
|---|---|---|
| BU 엔티티 스키마 (unitId / role / ships / morale / x,y / formation 등) | `tacticalStore.js` | §4-1 |
| `makeUnits()` — 기함 Y 분산 + BU_1~7 진형 오프셋 배치 | `tacticalStore.js` | §4-2 |
| BFS 이동 범위 계산 (`_calcMovable`) | `tacticalStore.js` | §4-3 |
| 기함 이동 → BU_1~7 편대 추종 (`moveFleetTo`) | `tacticalStore.js` | §4-3 |
| 전투 계산 (`_combat`) — 진형·지형·진형 상성 보정 포함 | `tacticalStore.js` | §4-4 |
| 우선 공격 대상 지정 (`priorityTarget`) | `tacticalStore.js` | §4-4 |
| 기함 격파 → 편대 사기 붕괴 체인 | `tacticalStore.js` | §4-5 |
| 사기 시스템 + MORALE_ROUT 패주 | `tacticalStore.js` | §4-6 |
| Fog of War + 시야 원 계산 (`_calcSight`, 토글 가능) | `tacticalStore.js` | §4-P2 |
| AI 턴 — 최근접 접근 + 자동교전 | `tacticalStore.js` | §4-9 단순 버전 |
| 승패 판정 (`_checkVictory`) + 손실 계산 | `tacticalStore.js` | §5 |
| 자동 해결 (`autoResolveBattle`) | `gameStore.js` | §3 |
| Canvas 2D 메인 뷰포트 (유닛·지형·하이라이트) | `TacticalView.vue` | §4-0 |
| 미니맵 + 뷰포트 rect 표시 | `TacticalView.vue` | §4-0 |
| 뷰포트 스크롤 / 줌 / 리사이즈 | `TacticalView.vue` | §4-0 |
| 총사령관 결정 (`resolveSupremeCommander`) | `battleUtils.js` | §4-P1 |
| 진형 수치 — offMod/defMod/rangeMod/speedMod/encBonus | `tacticalData.js` | §2-2 |
| 진형 오프셋 테이블 (FF_01~FF_10) | `tacticalData.js` | §4-2 |
| terrain 래스터라이즈 + 타일 배열 (`buildTacticalMap`) | `tacticalData.js` | §4-0 |

### ❌ 미구현 (개편 코딩 대상)

| 항목 | 위치 | 설계 섹션 |
|---|---|---|
| `computeFleetStats()` — cmd/att/def/fst/mng 산출 | `battleUtils.js` | §1 |
| `getMatchBonus()` — tacticalStore 내부 → battleUtils 이전 | `battleUtils.js` | §4-4 |
| A* 경로탐색 | `tacticalPathfinder.js` 신규 | §4-3 |
| 포위 보너스 (`encircclementCount`) | `tacticalStore` | §4-4 |
| **페이즈 상태 머신 개편** | `tacticalStore` + `TacticalView` | §4 전반 |
| P1 시작 페이즈 UI | `TacticalView` | §4-P1 |
| P2 명령 예약 모델 + 시각화 | `TacticalView` + `tacticalStore` | §4-P2 |
| P3 수행 패스 분리 (이동→공격 순차) | `tacticalStore` | §4-P3 |
| 전투 진입 다이얼로그 개선 | `GameView.vue` | §0 |
| 관전 모드 (AI vs AI 자동 진행) | `TacticalView` | §0-8 |
| 전투 결과 화면 | `TacticalView` | §5 |
| 작전 목표 → AI 행동 원칙 연동 | `tacticalStore` | §4-P1, §4-9 |

---

### 페이즈 상태 머신 — 현재 vs 목표

```
현재:  player ──→ ai ──→ player  (즉시 실행 모델)
                    └──→ result

목표:  start ──→ order ──→ execute ──→ start
                                └──→ result
```

| 현재 `phase` | 역할 | 목표 `phase` |
|---|---|---|
| `'player'` | 플레이어 명령 즉시 실행 | `'start'` (P1) + `'order'` (P2) 로 분리 |
| `'ai'` | AI 행동 | `'execute'` (P3) 로 통합 |
| `'result'` | 전투 종료 | 유지 |

---

### 결정: 전술 전용 하단바(`TacticalBar.vue`) 신설 보류
이동/공격은 지도 셀 클릭 기반 UX이고 진형변경은 선택 유닛 좌측 패널에 있어, 별도 하단바로 쪼개면
이미 동작하는 전술 UI에 회귀 위험만 생기고 실익이 없다고 판단 (2026-07-04).
컴포넌트 명명 일치가 목적일 때만 재검토.

---

## 개요

조우가 발생하면 **무조건 전술전투(TacticalView)** 로 진입한다. 자동 해결은 없다.

```
적대 함대 조우 감지 (성계 or 항로)
  → 전술전투 (TacticalView)
      플레이어 관여 시: 플레이어가 한쪽 진영 조작
      AI vs AI 시     : 양측 모두 AI 조작 (관전 or 결과 확인)
```

전투는 **작전(Operation)** 단위로 편성된다. 공격/방어 모두 작전을 통해 복수 함대를 투입한다.

두 레이어 모두 **함대 전투력(Fleet Combat Stats)** 을 공통 입력으로 사용한다.

---

## 0. 전투 발생 조건 (Encounter Trigger)

### 0-1. 조우 정의

**적대국의 함대가 같은 성계 또는 같은 항로에 존재할 때** 전투가 발생한다.

```
조우 = (함대A.faction) 적대 (함대B.faction)
     AND ( 함대A.location === 함대B.location       // 성계 조우
           OR 함대A.currentLane === 함대B.currentLane // 항로 조우
         )
```

### 0-2. 성계 조우 (System Encounter)

| 케이스 | 설명 |
|---|---|
| 아군 출격 → 적 주둔 성계 진입 | 아군이 공격측 |
| 적 함대 → 아군 주둔 성계 진입 | 아군이 방어측 (AI 턴 처리 중 발생) |

> 성계에 적 함대가 있는 한 동시 주둔 불가. 전투가 끝날 때까지 양측 모두 `engaged` 상태.

### 0-3. 항로 조우 (Lane Encounter)

함대는 **국경지(국경 성계 간 항로)** 에서만 이동 가능하므로 항로 차단 케이스는 발생하지 않는다.

| 케이스 | 설명 |
|---|---|
| 아군 이동 중 → 같은 항로에 적 이동 중 | 역방향 조우. `fst` 높은 쪽이 공격측 |
| 아군 이동 중 → 목표 성계 도착 시 적 있음 | 성계 조우로 처리 |

항로 전투는 해당 항로의 **lane.map** 을 전술 지도로 사용한다.

### 0-4. 함대 이동 상태 (fleet.status 확장)

현재 `standby` / `deployed` 2종에서 `moving` / `engaged` 추가.

| status | 의미 |
|---|---|
| `standby` | 성계 주둔 대기 중 |
| `moving` | 항로 이동 중 |
| `engaged` | 전투 중 (전투 종료 전까지 다른 명령 불가) |

```js
// moving 상태 추가 필드
fleet = {
  status:       'moving',
  location:     '230005',     // 출발 성계 (이동 중에도 유지)
  destination:  '230022',     // 목표 성계 코드
  currentLane:  'LANE_001',   // 현재 이동 중인 항로 ID
  laneProgress: 1,            // 현재 이동 경과 턴 (1 ~ lane.period)
}
```

### 0-5. 조우 감지 타이밍

조우는 **전략 페이즈(Strategic Phase)** 에서 발생한다.  
플레이어가 전략 맵에서 함대(작전 소속)를 이동시키고, 이동 중 또는 도착 시 적 함대와 같은 위치에 놓이면 전투 성립.

```
전략 페이즈 중:
  1. 플레이어 작전 실행 → 함대 이동
  2. 이동 경로(항로) 또는 도착 성계에 적 함대 존재?
     YES → 전투 성립, TacticalView 진입
  3. AI 턴: AI 함대 이동 처리 → 동일 방식으로 조우 검사
```

---

### 0-B. 전투 진입 준비 흐름

전술전투(`TacticalView`) 진입 직전에 순서대로 처리.

```
1. 시간 세팅: battleDate = currentDate, battleTime = { hour: 0, minute: 0 }

2. 전력 정보 수집
   아군: 참전 함대 목록 + 함선 수 공개
   적군: 첩보(intel) 여부에 따라 분기
         intel 확보 → 적 함대 수, 함선 수 공개
         intel 미달 → 함대 수·함선 수 모두 "???" 표시

3. 양국 작전(Operation) 정보 수집
   전략 턴에서 수립된 operation 참조 (§0-7)
   적국 작전: intel 확보 시 공개, 미달 시 은닉

4. 함대 초기 배치 (§4-2 makeUnits)

5. §4-P1 시작 페이즈(작전 회의) 진입
```

#### 첩보(Intel) 판정

```js
// operation.intel: 전략 턴에서 첩보 활동으로 적 작전이 노출됐는지 여부
const isIntelAvailable = operation.intel?.[enemyFaction] ?? false

// 표시 처리
fleetDisplay = isIntelAvailable
  ? { count: enemyFleets.length, ships: enemyFleets.map(f => f.ships) }
  : { count: '???', ships: '???' }
```

> 첩보 값은 전략 페이즈의 정보전 구현 시 채워짐. 현재는 `false` 기본값 (미구현).

---

### 0-C. 전투 시간 체계

전술전투는 **연·월·일·시·분** 단위로 시간을 관리한다.

```js
// tacticalStore 상태
battleDate   = { year, month, day }  // 전략 페이즈 currentDate에서 복사
battleTime   = { hour: 0, minute: 0 }  // 전투 시작 시 00:00으로 초기화
```

#### 분(Minute) — [>> 진행] 1회 = 1분

플레이어가 [>> 진행] 버튼을 누를 때마다 **1분 경과**.  
P2(명령)에서 예약된 이동·공격이 1회 수행되며, 60번의 진행으로 1시간이 쌓인다.

```
[>> 진행] 클릭
  → P3(수행 페이즈) 실행 1회
  → battleTime.minute += 1
  → minute === 60 ? → 시간 처리 (아래)
                   : P2(명령 페이즈)로 복귀
```

#### 시(Hour) — 60분마다 P1 재진입

1시간이 쌓이면 P1 시작 페이즈(작전 회의)로 돌아가 목표 재검토.

```
minute === 60:
  battleTime.hour += 1
  battleTime.minute = 0
  → hour === 24 ? → 전투 일시 중단 (아래)
                 : P1(시작 페이즈) 재진입
```

#### 24시 — 전투 중단 → 전략 페이즈 → 재개

자정(00:00)이 되면 전투를 **일시 중단**하고 전략 페이즈를 1회 처리한 뒤 전투를 이어서 진행.

```
hour === 24:
  1. 전술전투 상태 저장 (tacticalStore 유지)
  2. battleDate += 1일, battleTime = { hour: 0, minute: 0 }
  3. 전략 페이즈 실행 (보급·AI 행동 등 일반 턴과 동일)
  4. 전략 페이즈 종료 → 전술전투 재개 (P1 시작 페이즈로)
```

> 전투가 종료(승패 확정)되면 이 사이클은 종료됨.

### 0-6. 선제권 (First Move)

전술전투에서 **유닛 행동 순서**를 결정한다.

- 각 함대(유닛)의 `cmd(통솔) + fst(기동)` 합산값을 기준으로 계산
- 높은 순서대로 행동 (진영 무관, 유닛 단위 정렬)
- 동점 시 처리 방식 → **§1. 함대 전투력 계산** 에서 상세 정의

### 0-7. 작전(Operation) 편성

**전략 페이즈에서 사전 편성**. 플레이어가 전략 맵에서 참여 함대를 묶어 작전을 구성한 뒤 이동 명령을 내린다.

```js
operation = {
  opId:         'OP_001',
  faction:      'REH',
  role:         'attack',                          // 'attack' | 'defense'
  fleets:       ['REH0040', 'REH0041', 'REH0042'], // 참여 함대 코드 목록
  targetLane:   'LANE_001',                        // 항로 조우 시
  targetSystem: '230022',                          // 목표 성계 (성계 조우 시)
}
```

- 전술전투에서 작전 소속 함대들은 **같은 진영 유닛**으로 등장
- 방어 작전도 동일 구조 (수비 함대 복수 배정 가능)
- 작전 편성 UI는 `docs/210_screen_battle.md`에서 설계

### 0-8. AI vs AI 전투 처리

- AI vs AI 조우도 전술전투 로직을 **완전히 수행**
- 플레이어는 **관전(실시간 진행 확인)** 또는 **결과창(즉시 종료)** 중 선택
- 선택 UI는 전투 진입 직전에 표시

### 0-9. 미결 설계 항목

- [ ] **작전 편성 UI 흐름** — `docs/210_screen_battle.md` 작성 필요
- [ ] **선제권 동점 처리** — §1 함대 전투력 계산에서 정의

---

## 1. 함대 전투력 계산 (Fleet Combat Stats)

### 1-1. 기반 스탯

`fleetCharacterData.js` C/O/S 계층 + `charactersData.js` 인물 스탯을 합산해 함대 1개의 전투력을 결정한다.

| 항목 | 설명 | 결정 방식 |
|---|---|---|
| `cmd` | 통솔 — 전반적 전투 효율 기준 | 사령관(C)의 `statCmd` 고정 |
| `csm` | 지휘 — 사기 상한 결정 | 사령관(C)의 `statCsm` 고정 |
| `att` | 공격성 — 공격 데미지 배율 | 소속 인원 최고값, `csm` 상한 |
| `def` | 방어성 — 피해 감소율 | 소속 인원 최고값, `csm` 상한 |
| `fst` | 기동성 — 이동력/회피 | 소속 인원 최고값, `csm` 상한 |
| `mng` | 행정 — 보급/회복 관련 | 소속 인원 최고값, `csm` 상한 |

> `statMng`, `statInf`, `statGfg`, `statAfg`, `statPlt`는 전투에서 직접 사용하지 않거나 특수 규칙으로만 사용.

### 1-2. 부관(O) 보정 규칙

- **사령관(C)**: 본인 스탯을 cap 없이 그대로 사용
- **부관(O)**: 각 스탯을 `statCsm`으로 제한한 뒤, 전원 최고값 선택
- **최종값**: `max(사령관 원본, 부관 제한값 중 최고)`

```
// 사령관은 cap 없음
cmd_att = commander.statAtt

// 부관 기여: 각자 statCsm으로 제한 후 max 선택
ofc_att = max(...officers.map(o => min(o.statAtt, statCsm)))

// 최종
att_final = max(cmd_att, ofc_att)
```

> 결과: 사령관의 높은 전투력은 그대로 반영되고, 부관은 사령관이 약한 영역을 statCsm 한도 내에서 보완한다.

### 1-3. 함대 전투력 객체 (산출값)

```js
// computeFleetStats(fleet, characters, fleetCharData) 함수 반환값
{
  cmd: 85,      // 사령관 통솔
  csm: 80,      // 사령관 지휘 (상한값)
  att: 78,      // 최종 공격성
  def: 72,      // 최종 방어성
  fst: 68,      // 최종 기동성
  mng: 55,      // 최종 행정
}
```

이 함수는 `src/utils/battleUtils.js`에 구현한다.

---

## 2. 진형 시스템 (FF_01 ~ FF_10)

### 2-1. 전술 수치 추가

`formationData.js`의 각 항목에 아래 전술 수치 필드를 추가한다.  
기존 `weight(delay)` 테이블은 **진형 전환 시간** 으로 유지.

```js
{
  ffCode: "FF_01",
  ffType: "DEF",
  ffName: "방진",
  // ── 전술 수치 (신규) ──
  offMod:   0.90,   // 공격력 배율
  defMod:   1.25,   // 방어력 배율
  rangeMod: 0,      // 사거리 보정 (+1 / 0 / -1)
  speedMod: 0.75,   // 이동력 배율 (grid speed에 곱함)
  encBonus: 0,      // 포위 보너스 (학익/포위진 전용, 0~1)
  // ... 기존 weight, effect, desc 유지
}
```

### 2-2. 진형별 수치 제안

> [DESIGN] 아래 수치는 초안. 밸런스 조정 후 확정.

| ffCode | 이름 | offMod | defMod | rangeMod | speedMod | encBonus |
|---|---|---|---|---|---|---|
| FF_01 | 방진 | 0.90 | 1.25 | 0 | 0.75 | 0 |
| FF_02 | 횡렬진 | 1.15 | 0.80 | +1 | 0.90 | 0 |
| FF_03 | 종렬진 | 1.10 | 0.80 | 0 | 1.30 | 0 |
| FF_04 | 학익진 | 1.10 | 0.90 | +1 | 1.00 | 0.4 |
| FF_05 | 포위진 | 1.20 | 0.75 | 0 | 0.80 | 0.6 |
| FF_06 | 쐐기진 | 1.35 | 0.65 | 0 | 1.10 | 0 |
| FF_07 | 원형진 | 0.75 | 1.40 | 0 | 0.70 | 0 |
| FF_08 | 돌격진 | 1.25 | 0.65 | 0 | 1.40 | 0 |
| FF_09 | 기동진 | 0.95 | 0.85 | 0 | 1.60 | 0 |
| FF_10 | 방어진 | 0.85 | 1.35 | 0 | 0.85 | 0 |

### 2-3. 진형 상성 (ffType 기반)

| 공격 진형 | 유리한 상대 | 불리한 상대 |
|---|---|---|
| ATK (횡렬/쐐기/돌격) | DEF | ENC |
| DEF (방진/원형/방어) | ENC | MOV |
| MOV (종렬/기동) | ATK | DEF |
| ENC (학익/포위) | MOV | ATK |

상성 보너스: `+15%` 공격력 / 페널티: `-15%` 공격력  

> [DESIGN] 상성 보너스 수치 확정 필요.

---

## 3. 전략전투 자동 해결 (`_battle`)

방어 함대가 없을 때 (단순 성계 공략 시) 적용.  
현재 `gameStore._battle()`를 개선한다.

### 3-1. 입력

```
fleet:  공격 함대 (ships, commander, formation)
target: 목표 성계 (defense, morale, fortress?)
opType: 작전 타입 (SURRENDER_DEMAND / PRECISION_BOMB / ...)
```

### 3-2. 계산 흐름

```
1. fleetStats = computeFleetStats(fleet)
2. successChance = opType.baseRate
               + (fleetStats.cmd / 100) * 0.20   // 통솔 보정
               + (fleetStats.att / 100) * 0.10   // 공격성 보정
               - (target.defense / 100) * 0.30   // 방어력 페널티
   → clamp(0.05, 0.95)

3. 요새 반격 (target.fortress 있으면):
   fortDmg = fleet.ships * FORTRESS_WEAPONS[target.fortress].dmgRatio
   fleet.ships -= fortDmg

4. roll = Math.random()
   if roll < successChance → 성공 처리
   else                    → 실패 처리
```

### 3-3. 성공/실패 손실 계산

```
성공 시 아군 손실:  Math.floor(fleet.ships * 0.05 * (1 - fleetStats.def/100))
실패 시 아군 손실:  Math.floor(fleet.ships * 0.15 * (1 - fleetStats.def/100))
```

> [DESIGN] 손실 계수(0.05 / 0.15) 조정 가능.

---

## 4. 전술전투 — Canvas 기반 턴제 RTS

적 방어 함대가 있을 때 `TacticalView`로 진입. 전투는 **3개 페이즈** 구조로 진행되며, 시간은 **시·분** 단위로 흐른다.

```
전투 시작 (00:00) ──────────────────────────────────────────
│
├─ [P1 시작 페이즈]  ← 매 정시(hour 시작)마다 1회
│    총사령관 결정(최초 1회) → 작전 회의 → 함대 회의
│
└─ [P2+P3 반복 루프]  ← 매 분(minute)마다 1회
     P2: 색적 → 이동 셀·진형·대기 명령 예약
     P3: [>> 진행] 클릭 → 이동·공격 수행 → +1분
         minute = 60 → P1 재진입 (+1시간)
         hour   = 24 → 전투 중단 → 전략 페이즈 → 재개
                     → 승패 확정 시 → 전투 종료
```

---

### 4-P1. 시작 페이즈 (Start Phase)

전술 맵 진입 직전에 처리. 캔버스 렌더링 시작 전에 완료.

#### 총사령관 결정

참전 함대 사령관 중 **군사 계급(military_rank)** 이 가장 높은 인물이 총사령관.

```
계급 우선순위 (JB_MR001 = 최고):
  JB_MR001 원수 > JB_MR002 상급대장 > JB_MR003 대장
  > JB_MR004 중장 > JB_MR005 소장 > JB_MR006 준장

동일 계급 시: jobExp 높은 쪽 우선

아스타테 예시:
  FPA002(파에타) — JB_MR004, exp:900  ← 총사령관
  FPA004(파스톨레) — JB_MR004, exp:600
  FPA006(무어)   — JB_MR004, exp:300
```

```js
// battleUtils.js — resolveSupremeCommander(fleets, characters)
const RANK_ORDER = ['JB_MR001','JB_MR002','JB_MR003','JB_MR004','JB_MR005','JB_MR006']

function resolveSupremeCommander(fleets, characters) {
  let best = null
  for (const fleet of fleets) {
    const char = characters[fleet.commander]
    if (!char) continue
    const rankJob = (char.jobs ?? []).find(j => RANK_ORDER.includes(j.jobCode))
    if (!rankJob) continue
    const pri = RANK_ORDER.indexOf(rankJob.jobCode)
    if (!best || pri < best.pri || (pri === best.pri && rankJob.jobExp > best.exp))
      best = { fleetCode: fleet.id, charCode: fleet.commander, pri, exp: rankJob.jobExp }
  }
  return best   // { fleetCode, charCode, pri, exp }
}
```

#### 작전 회의 (Operation Council)

총사령관 + 참전 함대 사령관이 함께 작전 목표를 협의.

```
단계 1 — 기존 목표 연속 여부 확인
  전략 턴에 작전목표가 이미 수립된 경우:
    총사령관이 "기존 목표 유지"를 선택하면 → 즉시 확정, 이하 절차 생략
    선택 안 하면 → 제안 절차 진행

단계 2 — 함대 사령관 1인 1제안
  순서: 총사령관 제외, 각 함대 사령관 순서대로
  AI 사령관 → 함대 스탯·상황에 따라 자동 제안
  플레이어 사령관 → 직접 선택 (§4-P1 작전목표 표 참조)
  총사령관 마지막으로 제안

단계 3 — 총사령관 최종 확정
  제안된 전체 목표 목록 중 1개 선택
  총사령관 = 플레이어 → 직접 선택
  총사령관 = AI       → 자동 선택 (가장 높은 빈도·우선도)
  → operationObjective 확정 (§4-9 AI 행동 원칙에 반영)
```

#### 함대 회의 (Fleet Council)

작전 회의 완료 후, 각 함대별로 내부 운용 방침 결정.  
계층을 한 단계 하향하여 동일한 구조로 진행.

```
  역할 대응:
    작전 회의 총사령관  → 함대 사령관(C)
    작전 회의 함대사령관 → 각 함대의 부관/참모(O)

단계 1 — 참모(O) 1인 1제안
  각 부관이 함대 운용 세부 목표를 1개씩 제안
  (세부 목표 = 진형 선택·이동 우선도·공격 우선 대상 등)

단계 2 — 함대 사령관(C) 최종 확정
  플레이어 함대: 참모 제안 확인 후 직접 선택
  AI 함대:       전 과정 자동 처리 (결과만 로그에 기록)
  → 해당 함대의 AI 행동 세부 파라미터로 반영
```

> 함대 회의의 세부 목표 목록은 `210_screen_battle.md` UI 설계 시 확정.

#### 총사령관 작전 목표 코드표

총사령관(플레이어 또는 AI)이 최종 작전 목표를 결정. **AI 행동 원칙(§4-9)** 에만 영향.

| 구분 | 목표코드 | 명칭 | AI 행동 우선순위 |
|---|---|---|---|
| 공격측 | `OP_PLANET_CAPTURE` | 행성점령 | 행성 방향 이동 우선, 교전 회피 가능 |
| 공격측 | `OP_FLEET_ATTACK` | 함대공격 | 적 함대 우선 공격 |
| 공격측 | `OP_MOVE` | 이동 | 교전 회피, 맵 횡단 이동 |
| 공격측 | `OP_STANDBY` | 대기 | 제자리 유지, 사거리 내 자동교전만 |
| 방어측 | `OP_PLANET_DEFENSE` | 행성방어 | 행성 주위 방어 포지션 유지 |
| 방어측 | `OP_FLEET_ESCORT` | 함대호위 | 보호 대상 인접 유지 |
| 방어측 | `OP_MOVE` | 이동 | 철수 방향 이동, 교전 회피 |
| 방어측 | `OP_STANDBY` | 대기 | 제자리 유지, 사거리 내 자동교전만 |

> 적극성(proactive) 필드 연계는 추후 구현 (LOGH VI 참조).

---

### 4-P2. 색적·명령 페이즈 (Detection & Orders Phase)

매 턴 1페이즈 직후 진행. **먼저 색적(시야 계산)을 수행**하고, **그 결과를 바탕으로 명령을 입력**한다.

#### 색적 (Detection) — 시야 반경 계산

페이즈 시작 시 가장 먼저 자동 수행.  
각 함대 기함(BU_0)을 기준으로 원형 시야를 계산.

```js
// 시야 반경 (타일)
// inf: 함대 사령관 statInf (0~100)
// mng: 함대 전투력 mng (0~100)
const BASE_SIGHT = 4
sight = BASE_SIGHT + Math.floor(inf / 25) + Math.floor(mng / 25)
// 범위: 4(최솟값) ~ 12(최댓값)
```

| 단계 | 처리 |
|---|---|
| 시야 내 적 BU | 명령 대상으로 지정 가능, 맵에 표시 |
| 시야 외 적 BU | Fog of War — 숨김 (현재는 테스트용으로 항상 표시) |

> fog of war는 구현 완료 후 활성화. 현재 `SHOW_ALL = true` 플래그로 항상 표시.

#### 함대 명령 입력 (Orders)

**명령 단위: 함대(Fleet) 기준**

| 명령 | 내용 |
|---|---|
| `MOVE` | 기함(BU_0) 이동 목표 타일 지정 → BU_1~7 진형 추종 |
| `FORMATION` | 진형 변경 지정 (다음 수행 페이즈에서 적용) |
| `STANDBY` | 이동 없이 사거리 내 자동 공격만 |

**플레이어 입력 흐름**

```
색적 완료 후 플레이어 조작 시작:

1. 아군 함대 클릭 → 이동 가능 범위 하이라이트
2. 목적지 타일 클릭 → fleet.pendingMove = {x, y} 저장 (즉시 실행 아님)
3. [선택] 진형 선택 UI → fleet.pendingFormation = 'FF_xx' 저장
4. 또는 대기 선택 → fleet.pendingStandby = true
5. [>>진행] 버튼 클릭 → 3페이즈(수행)로 진입
```

**AI 함대**: §4-9 AI 행동 원칙 + 작전 목표에 따라 자동으로 `pendingMove` / `pendingFormation` 결정.

> 현재 구현(선택→즉시 이동)에서 **선택→명령 예약→일괄 수행** 모델로 전환.

#### 작전 목표 가이드 표시

작전 회의(§4-P1)에서 총사령관이 확정한 `operationObjective`에 목표 대상(행성·위치)이 존재할 경우,  
맵 위에 **흐린 화살표 선**으로 목표 방향을 표시하여 가이드 제공.

```
표시 조건:
  operationObjective = OP_PLANET_CAPTURE  → 목표 행성 타일까지 화살표
  operationObjective = OP_PLANET_DEFENSE  → 수비 행성 타일까지 화살표
  operationObjective = OP_FLEET_ATTACK    → 가장 가까운 적 BU_0 방향 화살표
  operationObjective = OP_MOVE / OP_STANDBY → 화살표 없음

렌더링:
  기함(BU_0) → 목표 지점까지 Canvas 점선 화살표
  색상: rgba(212, 170, 96, 0.25) — 골드, 흐리게
  스타일: setLineDash([6, 4]), lineWidth 1.5, 화살촉 포함
  목표 지점 하이라이트: 원형 glow (반경 3타일, 낮은 불투명도)
```

---

### 4-P3. 수행 페이즈 (Execution Phase)

명령 페이즈에서 플레이어가 **[>> 진행]** 버튼을 클릭하면 수행 페이즈로 전환.  
2페이즈에서 예약된 모든 명령을 **이니셔티브 순서**에 따라 일괄 실행.

#### 이동 패스 (Move Pass)

이니셔티브 큐 순서대로 각 유닛의 `pendingMove`를 실행.

```js
// 이니셔티브 큐 (§4-7 동일)
queue = allActiveUnits.sort((a,b) => (statsOf(b).cmd + statsOf(b).fst) - (statsOf(a).cmd + statsOf(a).fst))

// 이동 패스
for (const unit of queue) {
  if (!unit.pendingMove) continue
  // 기함(BU_0)이면: 목적지로 이동 후 BU_1~7 진형 재배치
  // 일반부대(BU_1~7): 기함 완료 후 진형 오프셋 위치로 이동
  unit.moved = true
  unit.pendingMove = null
}
```

#### 공격 패스 (Attack Pass)

이동 패스 완료 후, 동일 이니셔티브 큐 순서로 각 유닛의 `pendingAttack`을 실행.

```js
for (const unit of queue) {
  if (unit.attacked) continue
  const target = unit.pendingAttack
    ?? autoSelectTarget(unit)   // 사거리 내 최근접 적 자동 선택
  if (!target) continue
  _combat(unit.unitId, target)
  unit.attacked = true
  unit.pendingAttack = null
}
```

#### 턴 마무리

```
1. 승패 체크 (_checkVictory)
2. 모든 unit.moved = false, unit.attacked = false 리셋
3. 사기 붕괴 유닛 제거
4. 1페이즈(시작)로 복귀 → 다음 턴
```

---

### 4-0. 전술 맵 구조

#### 좌표계
- **256×256 타일 격자** — 유닛은 정수 타일 좌표(x, y)에 snap
- `STAR_MAP.mapSize: [1000, 1000]` 은 **성계 시각 맵 캔버스 크기**로만 사용 (전술 전용 아님)
- terrain 객체의 좌표(1000×1000 공간) → 256×256 타일로 **래스터라이즈** (scale = 1000/256)

#### 렌더링 아키텍처 — Canvas 2D + 스크롤 뷰포트 + 미니맵

```
TacticalView.vue
├── <canvas ref="mainCanvas" />     ← 전술 뷰포트 (rAF 루프, 카메라 scroll/zoom)
├── <canvas ref="miniCanvas" />     ← 미니맵 (256×256 축소, 뷰포트 rect 표시)
├── <div class="hud" />             ← HTML overlay (유닛 정보, 버튼)
└── tacticalStore (Pinia)           ← 전체 상태

풀맵(256×256)은 메모리 타일 배열로만 존재.
카메라(camera.x, camera.y)가 이동하면 뷰포트 영역만 재렌더 → 성능 부담 없음.
```

원작 DOS 전투 화면 계승: 좌측 뷰포트 / 우상단 미니맵 / 우하단 유닛 정보.

#### STAR_MAP terrain 스키마 (성계 맵 파일에 정의)

```js
// stars/maps/230005_ASTADE.js — STAR_MAP.tactical.terrain
tactical: {
  terrain: [
    // 행성: 원형, r = 타일 반지름 (1000좌표계 기준)
    { type: 'planet',   label: '아트라-하시스', x: 398, y: 228, r: 42 },
    { type: 'planet',   label: '아스페륀',       x: 758, y: 544, r: 25 },
    { type: 'planet',   label: '우가리트',        x: 316, y: 728, r: 25 },
    // 소행성대: 직사각형 (이동 패널티, 방어 +20%)
    { type: 'asteroid', x: 100, y: 80,  w: 60, h: 40 },
    // 성운: 직사각형 (사거리 -1, 이동 ×0.8)
    { type: 'nebula',   x: 500, y: 400, w: 120, h: 90 },
    // 잔해: 직사각형 (방어 +10%)
    { type: 'debris',   x: 200, y: 600, w: 40, h: 30 },
  ]
}
// terrain 미정의 시 → 256×256 빈 우주 공간
```

> 기존 `STAR_MAP.tactical.planet/nebula/asteroid` 타일셋 방식은 이 스키마로 교체.

#### terrain → 타일 래스터라이즈 (`rasterizeTerrain`)

```js
// initBattle() 호출 시 1회 수행
const SCALE = 1000 / 256  // ≈ 3.906
function rasterizeTerrain(terrainObjects) {
  const grid = new Uint8Array(256 * 256)  // 0=space, 1=planet, 2=asteroid, 3=nebula, 4=debris
  for (const obj of terrainObjects) {
    if (obj.type === 'planet') {
      // 원형 채우기
      const tx = Math.round(obj.x / SCALE), ty = Math.round(obj.y / SCALE)
      const tr = Math.ceil(obj.r / SCALE)
      for (let dy = -tr; dy <= tr; dy++)
        for (let dx = -tr; dx <= tr; dx++)
          if (dx*dx + dy*dy <= tr*tr) setTile(grid, tx+dx, ty+dy, 1)
    } else {
      // 직사각형 채우기
      const typeId = { asteroid:2, nebula:3, debris:4 }[obj.type] ?? 0
      const x0 = Math.floor(obj.x / SCALE), y0 = Math.floor(obj.y / SCALE)
      const x1 = Math.ceil((obj.x + obj.w) / SCALE)
      const y1 = Math.ceil((obj.y + obj.h) / SCALE)
      for (let y = y0; y < y1; y++)
        for (let x = x0; x < x1; x++)
          setTile(grid, x, y, typeId)
    }
  }
  return grid
}
```

#### terrain 타입별 전술 효과

| type | 통행 | 이동력 | 사거리 | 방어 |
|---|---|---|---|---|
| `planet`   | 불가 (원형 영역) | — | — | — |
| `asteroid` | 가능 | ×0.6 | 0 | +20% |
| `nebula`   | 가능 | ×0.8 | −1 | 0 |
| `debris`   | 가능 | ×0.9 | 0 | +10% |

---

### 4-1. 부대(部隊) 구조

전술 맵의 기본 단위는 **부대(BU)**. 함대 = 기함부대(BU_0) + 제1~7부대(BU_1~BU_7), 최대 8개.

#### 분함대(parentFlt) 처리 규칙

분함대(`parentFlt != null`, 예: REH041~045)는 **전략 레이어에서 상위 함대에 완전 합산**되며 전술전투에는 독립 BU세트로 참여하지 않는다.

| 레이어 | 처리 방식 |
|---|---|
| 전략 (`gameStore.fleets`) | `buildFleetsMap`에서 `parentFlt != null`은 skip → 상위 함대 `ships`에 합산 |
| 분함대 사령관 | 상위 함대 `subCommanders[]`에 기록 (메르카츠 등) |
| 전술 (`tacticalStore.units`) | 상위 함대의 BU세트로만 표현 (별도 BU세트 없음) |

```
아스타테 전투 참전 구조:
  공격측(FPA): FPA002(제2, 15,000) · FPA004(제4, 15,000) · FPA006(제6, 15,000)
               → 3개 함대 × 각 BU세트
  방어측(REH): REH004(로엔그람, 4,000 + 분함대 5×4,000 = 24,000)
               → 1개 함대 BU세트
```

#### 부대 데이터 스키마

```js
{
  unitId:    'FPA002_BU_0',   // 함대코드_BU_인덱스
  fleetCode: 'FPA002',
  fleetName: '제2함대',
  faction:   'FPA',
  role:      'flagship',      // 'flagship' | 'unit'
  buIndex:   0,               // 0=기함, 1~7=일반부대
  shipType:  'BS',            // BS | CR | WS | AL | TR
  ships:     1000,
  maxShips:  1000,
  formation: 'FF_02',         // 소속 함대의 현재 진형
  morale:    75,
  x: 10, y: 20,              // 타일 좌표 (정수)
  // 렌더링용 (캔버스 픽셀 보간 — 애니메이션)
  px: 480.0, py: 960.0,      // 픽셀 위치 (x * TILE_PX, y * TILE_PX)
  // 턴 상태
  moved:    false,
  attacked: false,
  status:   'active',         // 'active' | 'routing' | 'destroyed'
  // 우선 공격 대상 (플레이어 지정)
  priorityTarget: null,       // unitId or null
}
```

#### 부대당 함선 수

| 함선 타입 | 부대당 척수 |
|---|---|
| 전함(BS) · 공작함(WS) · 수송함(TR) | 1,000 |
| 순양함(CR) · 강습양륙함(AL) | 2,000 |

---

### 4-2. 초기 배치 — 9×9 포진

완편(8부대) 함대 배치 시 기함 위치를 기준으로 **9×9 영역** 안에 진형 오프셋으로 배치.

#### 다중 함대 기함 Y 분산 배치

같은 진영에 N개 함대가 참전할 경우, 기함(BU_0)을 Y축 균등 분할로 배치한다.

```js
// makeUnits(fleet, faction, isAttacker, mapW, mapH, fleetIndex, totalFleets)
const startX = isAttacker ? mapW - 4 : 3
const startY = Math.round(mapH * (fleetIndex + 1) / (totalFleets + 1))

// 예) FPA 3개 함대, mapH=24
// FPA002 (index=0): y = round(24 * 1/4) = 6
// FPA004 (index=1): y = round(24 * 2/4) = 12
// FPA006 (index=2): y = round(24 * 3/4) = 18
```

BU_1~7 위치는 기함 위치 기준 `FORMATION_OFFSETS`로 계산.

#### 진형 오프셋 테이블 (BU_0 기준 [dx, dy])

> 공격측(우측 진입): 오프셋 x 방향 반전 적용.

```js
// tacticalData.js에 정의
FORMATION_OFFSETS = {
  FF_01: [[0,0],[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[1,-1],[0,-2]],  // 방진 — 밀집 정방형
  FF_02: [[0,0],[-1,0],[1,0],[-2,0],[2,0],[-3,0],[3,0],[-4,0]],   // 횡렬진 — 가로 1열
  FF_03: [[0,0],[0,-1],[0,1],[0,-2],[0,2],[0,-3],[0,3],[0,-4]],    // 종렬진 — 세로 1열
  FF_04: [[0,0],[-1,1],[1,1],[-2,2],[2,2],[-1,0],[1,0],[0,1]],    // 학익진 — U형
  FF_05: [[0,0],[-2,0],[2,0],[0,-2],[0,2],[-1,-1],[1,-1],[0,0]],  // 포위진 — 외곽 원형
  FF_06: [[0,0],[0,-1],[-1,1],[1,1],[-2,2],[2,2],[0,2],[0,3]],    // 쐐기진 — 역삼각형
  FF_07: [[0,0],[-1,0],[1,0],[0,-1],[0,1],[-1,1],[1,1],[0,2]],    // 원형진 — 밀집
  FF_08: [[0,0],[-1,0],[1,0],[-2,0],[2,0],[0,-1],[0,-2],[0,-3]], // 돌격진 — 선두 집중
  FF_09: [[0,0],[-2,0],[2,0],[0,-2],[0,2],[-1,1],[1,1],[0,-1]],  // 기동진 — 분산
  FF_10: [[0,0],[-1,0],[1,0],[0,1],[0,-1],[-1,1],[1,1],[0,2]],   // 방어진 — 후방 밀집
}
```

---

### 4-3. 이동 시스템 — 기함 지정 이동 + 편대 추종

#### 이동 흐름

```
1. 플레이어가 아군 함대(기함 BU_0)를 선택
2. 이동 가능 타일 하이라이트 표시 (BFS, speed 칸 이내, 장애물·적 점유 제외)
3. 목적지 타일 클릭
4. BU_0 → 목적지로 이동 (A* pathfinding)
5. BU_1~7 → BU_0 도착 위치 + FORMATION_OFFSETS[formation] 으로 각자 이동
6. 이동 애니메이션 재생 (픽셀 보간, rAF 루프)
7. 이동 완료 후 사거리 내 적 자동교전 체크
```

#### 이동력 계산

```js
speed = Math.max(1, Math.round(BASE_SPEED * formation.speedMod * (fleetStats.fst / 100 + 0.5)))
// BASE_SPEED = 4
// asteroid/nebula 타일 통과 시 이동력 소모 추가 (×1/terrainMoveMod)
```

#### 이동 애니메이션

- `px, py` 픽셀 좌표를 목표 픽셀 좌표로 **smooth 보간** (easeInOut cubic)
- 속도: 타일당 약 150ms 소요 기준
- 이니셔티브 큐 순서대로 유닛 이동 — 동시에 여러 유닛이 겹쳐 이동 가능
- 애니메이션 중 플레이어 입력 차단
- 모든 유닛 이동 완료 후 → 공격 패스 진행

```js
// easeInOut cubic 보간
function easeInOutCubic(t) {
  return t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3) / 2
}
// rAF 루프에서: progress = elapsed / duration, t = easeInOutCubic(progress)
unit.px = startPx + (targetPx - startPx) * t
unit.py = startPy + (targetPy - startPy) * t
```

---

### 4-4. 교전 시스템 — 자동교전 + 우선 대상 지정

#### 자동교전 흐름

```
이동 완료 or 공격 가능 상태 진입 시:
  1. 사거리 내 적 유닛 탐색
  2. priorityTarget 지정 있으면 → 해당 적 우선 공격
  3. 없으면 → 가장 가까운(Manhattan) 적 자동 선택
  4. _combat(atk, def) 실행
  5. 피격 적이 사거리 내 반격 가능 시 counter 실행
```

#### 우선 대상 지정 (플레이어)

```
플레이어가 적 유닛 우클릭(or 롱탭) → priorityTarget 설정
다음 공격 행동 1회에 한해 해당 유닛 우선 공격 후 초기화
```

#### 전투 계산 (`_combat`)

```js
// 공격력
atkBase = fleetStats[atkFleet].att / 100
atkFm   = FORMATIONS[atk.formation].offMod
atkTerr = TERRAIN_EFFECT[tileAt(atk)].offMod
matchMod = getMatchBonus(FORMATIONS[atk.formation].ffType, FORMATIONS[def.formation].ffType)
// +0.15 / 0 / -0.15

rawDmg  = atk.ships * 0.15 * atkBase * atkFm * atkTerr * matchMod * rand(0.85, 1.15)
// 방어 감소
defBase = fleetStats[defFleet].def / 100
defFm   = FORMATIONS[def.formation].defMod
defTerr = TERRAIN_EFFECT[tileAt(def)].defMod
dmg     = Math.max(100, Math.floor(rawDmg * (1 - defBase * defFm * defTerr)))

// 포위 보너스 (ENC 진형 + 인접 아군 수)
encBonus = FORMATIONS[atk.formation].encBonus * encirclementCount(atk, def)
dmg = Math.floor(dmg * (1 + encBonus))

// 반격
counter = Math.max(50, Math.floor(def.ships * defBase * defFm * defTerr * 0.06 * rand(0.85, 1.15)))
```

---

### 4-5. 기함부대(BU_0) 격파 조건

```
BU_0 격파 (ships ≤ 0 or morale ≤ 15)
  → 사령관 전사/도주 이벤트
  → 소속 BU_1~7: morale -= 40
  → morale ≤ 15 인 부대 → 패주 제거
  → 나머지도 다음 턴 이내 패주 확정
```

---

### 4-6. 사기(Morale) 시스템

```js
// 초기 사기
morale    = 60 + (fleetStats.cmd / 100) * 20   // 60~80
moraleMax = fleetStats.csm                       // 상한

// 피격 시 감소
morale -= Math.floor((dmg / unit.maxShips) * 50)

// 붕괴
if (morale <= 15) → 패주(제거)
```

---

### 4-7. 이니셔티브 (행동 순서)

```js
// 각 BU 행동 순서 = (fleetStats.cmd + fleetStats.fst) 내림차순
// 동점: fleetStats.cmd 높은 쪽 우선 → 그래도 동점: 공격측 우선
initiativeQueue = allUnits
  .filter(u => u.status === 'active')
  .sort((a, b) => (statsOf(b).cmd + statsOf(b).fst) - (statsOf(a).cmd + statsOf(a).fst))
```

---

### 4-8. 사거리 계산

```js
range = BASE_RANGE + FORMATIONS[unit.formation].rangeMod + TERRAIN_EFFECT[tileAt(unit)].rangeMod
// BASE_RANGE = 2
```

---

### 4-9. AI 행동 원칙

| 조건 | AI 행동 |
|---|---|
| 적이 사거리 내 | 즉시 공격 |
| 사거리 밖 | 가장 가까운 적 방향으로 이동 후 재확인 |
| `fst` ≥ 70 | 기동진(FF_09) / 종렬진(FF_03) 선호 |
| `def` ≥ 70 | 방진(FF_01) / 원형진(FF_07) 선호 |
| `att` ≥ 70 | 쐐기진(FF_06) / 돌격진(FF_08) 선호 |
| 아군 < 적 50% | 원형진(FF_07)으로 전환 |
| 포위 가능 | 학익진(FF_04) / 포위진(FF_05) 시도 |

AI 이동 애니메이션: 플레이어 이동과 동일한 픽셀 보간 적용.

---

## 5. 전투 결과 반영 (`applyBattleResult`)

```
전술전투 종료
  → result = { winner, attackerLosses, defenderLosses }
  → gameStore.applyBattleResult(result)
    ├─ 승리: 공격함대 목표 성계로 이동, 방어함대 손실 적용
    └─ 패배: 공격함대 근접 아군 성계로 철수, 손실 적용
```

### 5-1. 손실 분배

```js
// 각 함대의 최초 함선 수 비율로 총 손실 분배 (비례 분배)
perFleet = totalLoss * (fleet.initShips / totalInitShips)
```

### 5-2. 괴멸 조건

```
함대 잔여 함선 ≤ 1000 → 해산 (배열 제거)
```

---

## 6. 파일 변경 계획

| 파일 | 상태 | 변경 내용 |
|---|---|---|
| `src/views/game/TacticalView.vue` | 전면 재작성 | Canvas 2D + 뷰포트 + 미니맵 |
| `src/stores/tacticalStore.js` | 전면 재작성 | BU 엔티티, 이니셔티브, 이동/교전 로직 |
| `src/utils/battleUtils.js` | 신규 | `computeFleetStats()`, `getMatchBonus()`, `rasterizeTerrain()` |
| `src/utils/tacticalPathfinder.js` | 신규 | BFS(이동 범위) + A*(경로 탐색) |
| `src/data/base/tactical/tacticalData.js` | 수정 | FF_01~10 FORMATIONS, FORMATION_OFFSETS, TERRAIN_EFFECT |
| `src/data/base/stars/maps/230005_ASTADE.js` | 수정 | `tactical.terrain` 스키마를 객체 배열로 교체 |
| `src/data/base/fleet/formationData.js` | 수정 | offMod/defMod/rangeMod/speedMod/encBonus 추가 |
| `src/stores/gameStore.js` | 수정 | `_battle()` 개선 (computeFleetStats 사용) |

---

## 7. TODO

### 확정된 사항
- [x] **전술전투 방식**: 부대 개별 엔티티 (BU_0 기함 + BU_1~7)
- [x] **전술 맵 크기**: 256×256 타일 격자
- [x] **렌더링 방식**: Canvas 2D + 스크롤 뷰포트 + 미니맵 (성계 뷰와 동일 패턴)
- [x] **좌표계**: 타일 기반 (유닛 = 정수 타일 좌표 snap)
- [x] **STAR_MAP.mapSize**: 성계 시각 맵 캔버스 크기 전용 (전술 맵 크기와 무관)
- [x] **terrain 스키마**: 객체 배열 (planet=원형, asteroid/nebula/debris=직사각형, 1000×1000 좌표계)
- [x] **terrain 타입 4종**: `planet` / `asteroid` / `nebula` / `debris`
- [x] **9×9 포진**: 기함 기준 오프셋 배치
- [x] **이동 방식**: 기함(BU_0) 목적지 클릭 → BU_1~7 진형 오프셋으로 자동 추종
- [x] **교전 방식**: 사거리 내 자동교전 + 우선 대상 수동 지정 가능
- [x] **애니메이션**: 이동 픽셀 보간 (플레이어·AI 공통)
- [x] **유닛 시각**: 텍스트 라벨 (이후 스프라이트 교체 예정)
- [x] **부대당 척수**: 전함/공작함/수송함 1,000 / 순양함/강습양륙함 2,000
- [x] **기함부대 격파**: 함대 붕괴 트리거
- [x] **아스타테 terrain**: 행성 3개 (아트라-하시스/아스페륀/우가리트), 성운 1개
- [x] **래스터라이즈**: terrain 객체 → 256×256 타일 배열 변환 (`rasterizeTerrain`)
- [x] **다중 함대 배치**: `makeUnits(fleetIndex, totalFleets)`로 기함 Y 균등 분산 (§4-2 참조)
- [x] **분함대 합산**: `buildFleetsMap`에서 parentFlt 제외, 상위 함대 ships에 합산
- [x] **시작 페이즈 구조**: 총사령관 결정 + 작전 목표 설정 (§4-P1)
- [x] **총사령관 결정 로직**: `military_rank` jobCode 우선, 동급 시 jobExp 비교
- [x] **작전 목표 8종**: 공격/방어 각 4종 (행성점령/함대공격/이동/대기)
- [x] **파에타 총사령관**: JB_MR004 exp:900 (파스톨레:600, 무어:300)
- [x] **전투 진입 준비 흐름 (§0-B)**: 시간 세팅 → 전력 수집 → 함대 배치 순서 확정
- [x] **첩보(intel) 시스템 설계**: intel 확보 시 적 함대 수·함선 수 공개, 미달 시 "???" 처리
- [x] **작전 회의 구조**: 기존목표 연속 → 1인1제안 → 총사령관 확정 (3단계)
- [x] **함대 회의 구조**: 작전 회의와 동일 로직, 계층 1단계 하향 (사령관→참모)

### 미결 항목
- [ ] **진형 수치 확정** (offMod/defMod/rangeMod/speedMod/encBonus 표 2-2)
- [ ] **진형 전환 처리** — 전환 딜레이(weight)·부대 재배치 방식
- [ ] **상성 보너스 수치** (±15% 초안, 조정 필요)
- [ ] **BASE_SPEED 확정** (4 초안)
- [ ] **BASE_RANGE 확정** (2 초안)
- [ ] **포위 보너스 계산** (인접 아군 유닛 수 기준)
- [ ] **사기 붕괴 임계값** (15 초안)
- [ ] **전략전투 손실 계수** (0.05/0.15 초안)
- [x] **분함대(S) 전술전투 참여 방식** — 전략 레이어에서 상위 함대에 합산, 전술 BU세트 미분리 (§4-1 참조)
- [ ] **주요 성계 terrain 입력** (티아메트, 암릿처, 이제르론 등)
- [ ] **TILE_PX(타일 픽셀 크기) 확정** — 뷰포트 가시 타일 수 결정
- [x] **2페이즈 설계 (§4-P2)**: 색적(시야반경) + 함대 명령 입력 (선택→예약→확정 모델)
- [x] **3페이즈 설계 (§4-P3)**: 이동 패스 → 공격 패스 (각각 이니셔티브 순서)
- [x] **명령 종류 확정**: MOVE(이동 셀 지정) / FORMATION(진형 지정) / STANDBY(대기)
- [x] **작전 목표 가이드 화살표**: 점선 골드 화살표, rgba(212,170,96,0.25), setLineDash([6,4])
- [x] **진행 버튼**: 기존 "턴종료" → ">> 진행" (수행 페이즈 전환 트리거)
- [x] **이동 애니메이션**: easeInOutCubic smooth 보간 (이동 완료 후 공격 패스)
- [x] **전투 시간 체계**: battleTime { hour, minute } — 1분 = 진행 1회, 60분 = 1시간(P1재진입), 24시 = 전략 페이즈 후 재개
- [x] **전투 시간 표시**: 연·월·일·시·분 단위 HUD 표시
- [ ] **색적 수치 확정** — `BASE_SIGHT=4`, `inf/25 + mng/25` 공식 (초안)
- [ ] **fog of war 구현** — 현재 `SHOW_ALL=true`로 우회
- [ ] **선택→예약 모델 구현** — tacticalStore 페이즈 관리 전환 (player→order→execute)
- [ ] **시작 페이즈 UI** — `210_screen_battle.md` 에서 설계 (OperationBriefingModal 재설계)
- [ ] **작전 회의 UI**: 전력 현황(첩보 마스킹) + 제안 목록 + 총사령관 선택 화면
- [ ] **함대 회의 UI**: 참모 제안 + 함대사령관 선택 화면 (함대별 순차 진행)
- [ ] **intel 필드 구현** — operation.intel 전략 페이즈 정보전 연동 (추후)
- [ ] **적극성(proactive) 연계** — LOGH VI 참조, 추후 구현
