# 전투 시스템 설계
> 분류: 시스템 로직
> 경로: `docs/114_data_battle.md`
> 상위: [100_DATA.md](100_DATA.md)
> 최종 수정: 2026-07-05
> 상태: 🔄 설계 중 (아래 "현재 구현"은 이미 동작 중인 단순 버전, 그 이하 0~7절은 향후 부대 시스템 개편 설계)

---

## 현재 구현 (단순 버전, 부대 시스템 적용 전)

`tacticalStore.js` 기준. 아래 §0~7의 부대(部隊)/9×9 포진/FF_01~10 개편은 아직 미적용이며,
현재는 **함대 = 편대(Squadron) 1~3개** 단위로 단순화된 전투가 실제로 동작한다.

### 조우 감지 → 전술턴 큐 등록
- `gameStore._fleetMove()`에서 이동 완료 함대의 도착 위치에 타 세력 함대가 있으면 조우 성립
- 조우 목록을 성계 ID 순으로 정렬해 `_pendingBattles` 배열에 push (여러 건 순차 처리)
- `GameView.vue`가 큐를 watch: 플레이어 인물이 없으면 confirm(네=상세 전투 / 아니오=자동 해결) 노출

### 편대(Squadron) 생성 — `makeSquadrons(fleet)`
| 함선 수 | 편대 수 |
|---|---|
| ≥ 12,000 | 3 (전위/중위/후위) |
| ≥ 6,000 | 2 |
| < 6,000 | 1 |

- 공격측은 맵 우측(`x = MAP_W-2`), 방어측은 좌측(`x = 1`)에 배치
- 초기 사기 80, 초기 진형 `DOUBLE_COL` 고정 (`tacticalData.js`의 `FORMATIONS`, FF_01~10 아님)

### 턴 진행 — 3페이즈
1. **player**: `selectUnit` → 이동 가능 칸(`_calcMovable`, Manhattan ≤ 진형 speed)/공격 가능 칸(`_calcAttackable`, 진형 range 기준) 계산 → `moveUnit`/`attackUnit`/`changeFormation` → [턴종료] 또는 전 유닛 행동 완료 시 `endPlayerTurn()`
2. **ai**: `_aiTurn()` — 20% 확률 진형 변경 → 가장 가까운 플레이어 유닛 탐색 → 사거리 내면 공격, 밖이면 최단 이동 후 재확인 → 완료 시 다음 턴 player 페이즈로
3. **result**: `_checkVictory()` — 적 유닛 전멸 시 공격측 승리, 플레이어 유닛 전멸 시 방어측 승리

### 전투 해결 — `_combat(atkId, defId)`
```js
dmg     = max(100, floor(atk.ships * atkFm.offMod * atkStatBonus * atkTerrainMod * rand(0.85,1.15) * 0.15
                          - def.ships * defFm.defMod * defStatBonus * defTerrainMod * 0.04))
counter = max(50,  floor(def.ships * defFm.defMod * defStatBonus * defTerrainMod * rand(0.85,1.15) * 0.06))
// statBonus = commander 있으면 0.7 + military/100*0.6, 없으면 1.0
// moraleDmg = floor(dmg또는counter / maxShips * (피격측 기준 50 또는 반격측 25))
// ships<=0 또는 morale<=10 이면 유닛 격파(배열에서 제거)
```

### 전투 결과 반영 — `gameStore.applyBattleResult(result)`
- **승리**: 공격 함대 위치=목표 성계로 갱신, 방어 함대들에 손실을 균등 분배(잔여 ≤1000이면 해산), 목표 성계 점령(faction 변경 + defense/morale 감소)
- **패배**: 공격 함대는 가장 가까운 아군 성계로 철수, 손실 적용
- 처리 후 `_pendingBattles.shift()` → 큐가 비면 `gameStore._finishTurn()` 호출 (턴 흐름은 [108_data_turns.md](108_data_turns.md) 참조)

### 자동 해결 — `autoResolveBattle()`
전술 화면 없이 전투력(함선 수 × 지휘관 보정 × 난수)만으로 승패/손실률을 즉시 산출 후 `applyBattleResult()` 호출.

### 결정: 전술 전용 하단바(`TacticalBar.vue`) 신설 보류
이동/공격은 지도 셀 클릭 기반 UX이고 진형변경은 선택 유닛 좌측 패널에 있어, 별도 하단바로 쪼개면
이미 동작하는 전술 UI에 회귀 위험만 생기고 실익이 없다고 판단 (2026-07-04). 기능은 이미 100% 동작 중이며,
컴포넌트 명명 일치가 목적일 때만 재검토. `CharInfoPanel` 교체 여부 결정도 동일 사유 — [208_screen_components.md](208_screen_components.md#전술뷰tacticalview와의-관계--교체-대신-별도-패널-신설-결정) 참조.

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

```
att_final = (officer.statAtt > commander.statAtt) ? officer.statAtt : commander.statAtt
def_final = (officer.statDef > commander.statDef) ? officer.statDef : commander.statDef
fst_final = (officer.statFst > commander.statFst) ? officer.statFst : commander.statFst
// 단, 각 값은 statCsm을 초과할 수 없음
att_final = Math.min(att_final, commander.statCsm)
```

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

## 4. 전술전투 개편 (`tacticalStore`)

적 방어 함대가 있을 때 TacticalView로 전환.

### 4-0. 전술 맵 구조

- **맵 크기: 256 × 256 그리드** (원작 128×128 기준, 웹 구현 시 2배 확장)
- 셀 크기: 구현 시 결정
- 항로 전투: `lane.map` 사용 / 성계 전투: `starSystem.map` 사용 (동일 스키마)
- `map` 필드는 **Base 데이터** (`starSystemData.js` / `laneData.js`) 에 정의 — 시나리오 무관 불변

#### 렌더링 아키텍처 — Canvas 2D + 스크롤 뷰포트 + 미니맵

```
TacticalView.vue
├── <canvas ref="mainCanvas" />   ← 전술 뷰포트 (화면에 보이는 영역만 렌더)
├── <canvas ref="miniCanvas" />   ← 미니맵 (전체 맵 축소 표시)
└── tacticalStore (Pinia)         ← 맵 상태, 유닛 위치 관리

풀맵(256×256)은 메모리에만 존재.
카메라 이동 시 뷰포트(~24×16 타일)만 재렌더 → 256×256도 부하 없음.
```

원작 DOS 전투 화면 구조를 그대로 계승 (좌: 전술 뷰포트 / 우상단: 미니맵 / 우하단: 유닛 정보).

#### map 스키마

```js
// starSystemData.js 및 laneData.js 공통 구조
map: {
  terrain: [
    // 행성 (통행 불가 원형 오브젝트)
    { type: 'planet', label: '아트라-하시스', x: 32, y: 48, r: 4 },

    // 소행성대 (이동 패널티, 방어 보너스)
    { type: 'asteroid', x: 60, y: 30, w: 12, h: 8 },

    // 성운 (사거리 감소, 이동 패널티)
    { type: 'nebula', x: 80, y: 70, w: 20, h: 15 },

    // 잔해 (경엄폐, 약한 방어 보너스)
    { type: 'debris', x: 45, y: 90, w: 6, h: 6 },
  ]
}
// terrain 미정의 시 → 128×128 빈 공간으로 처리
```

#### terrain 타입별 전술 효과

| type | 통행 | 이동력 | 사거리 | 방어 |
|---|---|---|---|---|
| `planet` | 중심 r 이내 불가 | - | -1 (행성 뒤) | +방어막 역할 |
| `asteroid` | 가능 | ×0.6 | 0 | +20% |
| `nebula` | 가능 | ×0.8 | -1 | 0 |
| `debris` | 가능 | ×0.9 | 0 | +10% |

### 4-1. 부대(部隊) 구조 — 개별 엔티티 방식 (안 B)

전술 맵의 기본 단위는 **부대(部隊)** 다. 함대는 부대들의 집합이며, 각 부대는 맵 위의 독립 유닛으로 개별 이동·전투한다.

```
함대 = 기함부대(BU_0) + 제1~7부대(BU_1 ~ BU_7)   (최대 8 부대)
```

#### 부대당 함선 수 (함선 타입 기준)

| 함선 타입 | 부대당 척수 |
|---|---|
| 전함(BS) · 공작함(WS) · 수송함(TR) · 기함 | 1,000 |
| 순양함(CR) · 강습양륙함(AL) | 2,000 |

> 총 함선 수 = 각 부대 척수의 합산.  
> 진형(FF)에 따라 편성 함선 타입이 달라지므로 총 척수는 함대마다 다르다.

#### 부대 데이터 스키마

```js
// 전술전투 생성 시 makeSquadrons()에서 생성
{
  unitId:    'FPA0020_BU_0',   // 함대코드_BU_인덱스
  fleetCode: 'FPA0020',
  faction:   'FPA',
  label:     '기함부대',        // '기함부대' | '제N부대'
  shipType:  'BS',             // BS | CR | WS | AL | TR
  ships:     1000,             // 현재 함선 수
  maxShips:  1000,             // 최대 함선 수 (초기값)
  formation: 'FF_02',          // 소속 함대의 현재 진형
  morale:    75,               // 현재 사기 (0~100)
  x: 10, y: 20,               // 전술 맵 좌표
}
```

### 4-2. 9×9 포진 규칙

- **완편(8 부대) 함대**는 초기 배치 시 **9×9 그리드 영역** 내에 부대를 배치
- 9×9 내 부대 위치는 **진형(FF)** 에 따라 결정됨

| 진형 | 배치 패턴 |
|---|---|
| FF_02 횡렬진 | 부대 가로 1열 배치 (전열 집중) |
| FF_03 종렬진 | 부대 세로 1열 배치 (돌파 특화) |
| FF_04 학익진 | 중앙+양익 U형 배치 |
| FF_05 포위진 | 외곽 포위 원형 배치 |
| FF_01/07/10 방어형 | 밀집 정방형 배치 |
| FF_06 쐐기진 | 역삼각형(선봉 집중) 배치 |
| FF_08 돌격진 | 선두 밀집 + 후위 집중 |
| FF_09 기동진 | 분산 배치 (사방 기동 대응) |

> [DESIGN] 각 진형의 9×9 내 좌표 매핑 테이블은 `tacticalData.js`에 정의.

### 4-3. 기함부대(BU_0) 격파 조건

기함부대가 격파(ships ≤ 0)되면 해당 함대 전체가 붕괴한다.

```
BU_0 격파
  → 사령관 전사/도주 이벤트 발생
  → 소속 BU_1~7 의 morale -= 40 (즉시)
  → morale ≤ 15 인 부대 → 패주(제거)
  → 나머지 부대도 다음 턴 이내 패주 확정
```

### 4-4. 진형 통합

`tacticalData.js`의 6종 진형(DOUBLE_COL 등) 대신 `formationData.js`의 FF_01~FF_10을 사용.  
유닛 생성 시 해당 함대의 초기 진형(`fleetFormationData.js`)을 그대로 사용.

```js
// makeSquadrons() 변경점
formation: fleetFormation?.ffCode ?? 'FF_01'   // 기존: 'DOUBLE_COL'
```

### 4-5. 전투 계산 (`_combat`)

```
// 공격 배율
atkBase = atkFleetStats.att / 100           // 0~1
atkFm   = FORMATION_MAP[atk.formation].offMod
atkTerr = TERRAIN[atkTile.terrain].offMod
dmgMult = atkBase * atkFm * atkTerr

// 방어 배율
defBase = defFleetStats.def / 100
defFm   = FORMATION_MAP[def.formation].defMod
defTerr = TERRAIN[defTile.terrain].defMod

// 상성
matchBonus = getMatchBonus(atkFm.ffType, defFm.ffType)   // -0.15 / 0 / +0.15

// 데미지
rawDmg = atk.ships * 0.15 * dmgMult * matchBonus * rand(0.85, 1.15)
reduced = rawDmg * (1 - defBase * defFm)
dmg    = Math.max(100, Math.floor(reduced))

// 포위 보너스 (ENC 진형이고 적보다 아군 유닛이 인접 많을 때)
encBonus = atkFm.encBonus * getEncirclementCount(atk, def)
dmg = Math.floor(dmg * (1 + encBonus))

// 반격
counter = Math.max(50, Math.floor(def.ships * defFm.defMod * defBase * 0.06 * rand(0.85, 1.15)))
```

### 4-6. 사기(Morale) 시스템

```
// 초기 사기
morale = 60 + (fleetStats.cmd / 100) * 20   // 60~80 범위
// 상한
moraleMax = fleetStats.csm

// 사기 감소 (피격 시)
morale -= Math.floor(dmgRatio * 50)   // dmgRatio = dmg / maxShips

// 붕괴 조건
if (morale <= 15) → 패주 처리 (유닛 제거)
```

> [DESIGN] 사기 붕괴 임계값 (15) 조정 가능.

### 4-7. 이동력 계산

```
speed = Math.max(1, Math.round(BASE_SPEED * formation.speedMod * (fleetStats.fst / 100 + 0.5)))
// BASE_SPEED = 4 (grid 칸)
```

> [DESIGN] BASE_SPEED 값 확정 필요.

### 4-8. 사거리 계산

```
range = BASE_RANGE + formation.rangeMod + terrainRangeMod
// BASE_RANGE = 2
```

### 4-9. AI 행동 원칙

| 조건 | AI 행동 |
|---|---|
| 적이 사거리 내 | 즉시 공격 |
| `fst` 높음 (≥70) | 기동진/종렬진 선호 |
| `def` 높음 (≥70) | 방진/원형진 선호 |
| `att` 높음 (≥70) | 쐐기진/돌격진 선호 |
| 수적 열세 (아군<적 50%) | 원형진으로 전환 |
| 포위 가능 | 학익진/포위진 시도 |

---

## 5. 전투 결과 반영 (`applyBattleResult`)

```
전술전투 종료
  → result = { winner, attackerLosses, defenderLosses, moraleDmg? }
  → gameStore.applyBattleResult(result)
    ├─ 승리: 공격함대 목표 성계로 이동, 방어함대 손실 적용
    └─ 패배: 공격함대 원위치 복귀, 손실 적용
```

### 5-1. 방어 함대 손실 분배 (다수 vs 다수)

```
perFleet = defenderLosses / defenderFleets.length
각 방어 함대에 균등 분배 (현행 유지)
```

> [DESIGN] 집중 타격 시나리오(특정 함대 집중 공격)는 향후 구현 고려.

### 5-2. 괴멸 조건

```
남은 함선 ≤ 1000 → 해당 함대 해산 (배열에서 제거)
```

---

## 6. 파일 변경 계획

| 파일 | 변경 내용 |
|---|---|
| `src/utils/battleUtils.js` | **신규** — computeFleetStats(), getMatchBonus() 등 공통 함수 |
| `src/data/base/fleet/formationData.js` | offMod/defMod/rangeMod/speedMod/encBonus 필드 추가 |
| `src/data/base/tactical/tacticalData.js` | FF_01~FF_10 기반으로 FORMATIONS 재정의 (또는 formationData import) |
| `src/stores/tacticalStore.js` | 진형 통합, _combat 재작성, 이동/사거리 계산 개선 |
| `src/stores/gameStore.js` | _battle() 개선 (computeFleetStats 사용) |

---

## 7. TODO (설계 결정 필요)

### 확정된 사항
- [x] **전술전투 방식**: 안 B — 부대 개별 엔티티 (기함부대+제1~7부대)
- [x] **전술 맵 크기**: 256×256 (원작 128 기준, 웹 2배 확장)
- [x] **렌더링 방식**: Canvas 2D + 스크롤 뷰포트 + 미니맵
- [x] **9×9 포진**: 완편 함대 초기 배치 영역 9×9
- [x] **부대당 척수**: 함선 타입 기준 (전함/공작함/수송함 1,000 / 순양함/강습양륙함 2,000)
- [x] **기함부대 격파**: 함대 붕괴 트리거
- [x] **성계 전술 맵**: `starSystemData.js`에 `map.terrain` 정의 (Base 데이터, 시나리오 무관)
- [x] **terrain 타입 4종**: `planet` / `asteroid` / `nebula` / `debris`
- [x] **아스타테 맵 초안**: 행성 3개 배치 (아트라-하시스/아스페륀/우가리트)

### 미결 항목
- [ ] **진형별 9×9 좌표 매핑** — 각 FF 진형에서 BU_0~7 배치 좌표 정의 (`tacticalData.js`)
- [ ] **진형 전환 시 부대 재배치** — 전환 딜레이(weight) 동안 임시 배치 처리 방식
- [ ] **부대 독립 이동 vs 편대 이동** — 개별 명령 vs 함대 단위 이동 UI 결정
- [ ] **진형 수치 확정** (offMod/defMod 등 표 2-2)
- [ ] **상성 보너스 수치** (±15% 초안, 조정 필요)
- [ ] **기동력 BASE_SPEED 값**
- [ ] **포위 보너스 계산 방식** (인접 유닛 수 기준 or 고정값)
- [ ] **사기 붕괴 임계값** (15 초안)
- [ ] **전략전투 손실 계수** (0.05/0.15 초안)
- [ ] **tacticalData.js 6종 진형 완전 제거 or 병행 유지**
- [ ] **분함대(S) 전술전투 참여 방식** (독립 유닛 vs 상위 함대에 합산)
- [ ] **AI 진형 선택 로직 구체화**
- [ ] **주요 성계 terrain 데이터 입력** (티아메트, 암릿처, 이제르론 등)
