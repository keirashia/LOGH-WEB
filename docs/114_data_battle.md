# 전투 시스템 설계
> 분류: 시스템 로직
> 경로: `docs/114_data_battle.md`
> 상위: [100_DATA.md](100_DATA.md)
> 최종 수정: 2026-06-27
> 상태: 🔄 설계 중

---

## 개요

전투는 **전략전투(자동 해결)**와 **전술전투(그리드 인터랙션)** 두 레이어로 구분한다.

```
플레이어가 함대 출격 → 목표 성계에 적 함대 있음?
  YES → 전술전투 (TacticalView, 플레이어 직접 조작)
  NO  → 전략전투 (gameStore._battle(), 자동 해결)
```

두 레이어 모두 **함대 전투력(Fleet Combat Stats)** 을 공통 입력으로 사용한다.

---

## 1. 함대 전투력 계산 (Fleet Combat Stats)

### 1-1. 기반 스탯

`fleetCharacterData.js` C/O/S 계층 + `charactersData.js` 인물 스탯을 합산해 함대 1개의 전투력을 결정한다.

| 항목 | 설명 | 결정 방식 |
|---|---|---|
| `cmd` | 통솔 — 전반적 전투 효율 기준 | 사령관(C)의 `statCmd` 고정 |
| `csm` | 카리스마 — 사기 상한 결정 | 사령관(C)의 `statCsm` 고정 |
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
  csm: 80,      // 사령관 카리스마 (상한값)
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

### 4-1. 진형 통합

`tacticalData.js`의 6종 진형(DOUBLE_COL 등) 대신 `formationData.js`의 FF_01~FF_10을 사용.  
유닛 생성 시 해당 함대의 초기 진형(`fleetFormationData.js`)을 그대로 사용.

```js
// makeSquadrons() 변경점
formation: fleetFormation?.ffCode ?? 'FF_01'   // 기존: 'DOUBLE_COL'
```

### 4-2. 전투 계산 (`_combat`)

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

### 4-3. 사기(Morale) 시스템

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

### 4-4. 이동력 계산

```
speed = Math.max(1, Math.round(BASE_SPEED * formation.speedMod * (fleetStats.fst / 100 + 0.5)))
// BASE_SPEED = 4 (grid 칸)
```

> [DESIGN] BASE_SPEED 값 확정 필요.

### 4-5. 사거리 계산

```
range = BASE_RANGE + formation.rangeMod + terrainRangeMod
// BASE_RANGE = 2
```

### 4-6. AI 행동 원칙

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

- [ ] **진형 수치 확정** (offMod/defMod 등 표 2-2)
- [ ] **상성 보너스 수치** (±15% 초안, 조정 필요)
- [ ] **기동력 BASE_SPEED 값** (현행 formation.speed 방식에서 통합 여부)
- [ ] **포위 보너스 계산 방식** (인접 유닛 수 기준 or 고정값)
- [ ] **사기 붕괴 임계값** (15 초안)
- [ ] **전략전투 손실 계수** (0.05/0.15 초안)
- [ ] **tacticalData.js 6종 진형 완전 제거 or 병행 유지**
- [ ] **분함대(S) 전술전투 참여 방식** (독립 유닛 vs 상위 함대에 합산)
- [ ] **AI 진형 선택 로직 구체화**
