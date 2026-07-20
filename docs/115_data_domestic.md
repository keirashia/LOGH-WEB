# 내정 시스템 — 수입·식량·건물
> 분류: 데이터
> 경로: `docs/115_data_domestic.md`
> 상위: [100_DATA.md](100_DATA.md)
> 최종 수정: 2026-07-20

---

## 개요

내정 시스템은 행성(`planetsData.js`) 단위로 운영된다.  
성계(star system)는 세력 판별 및 세율 보관 용도이며, 실제 생산·소비는 행성 레벨에서 계산한다.

**관련 파일**

| 파일 | 역할 |
|---|---|
| `src/data/base/buildingData.js` | 건물 마스터 (effects, reqPop, buildCost 등) |
| `src/data/base/stars/planetsData.js` | 행성 마스터 (pops, assets, buildings) |
| `src/data/scenario/*/stars/planetDetail.js` | 시나리오 행성 초기 overrides (faction 등) |
| `src/data/scenario/*/stars/starDetail.js` | 성계 초기값 (morale, tax, traits) |
| `src/stores/gameStore.js` | `_income()` / `_food()` / `_construct()` 액션 |

---

## 1. 수입 계산 (`_income`)

### 1-1. 계산 단위

턴마다 세력별로 전체 행성의 수입을 합산해 `resources[faction].gold`에 반영한다.

```
totalIncome[faction] = Σ (per planet where planet.faction === faction)
  planetIncome = floor( pops.unit × BASE_POP_INCOME × incomeMultiplier × (sys.tax / 100) )
```

| 변수 | 값 | 설명 |
|---|---|---|
| `BASE_POP_INCOME` | `1` | 인구 1unit당 기본 수입 (조정 가능) |
| `sys.tax` | `0~100` | 성계 세율 (starDetail.js 설정, REH 28~30%, FPA 33~35%, PZN 20%) |
| `incomeMultiplier` | `max(0, 1 + Σ bonuses)` | 활성 건물 incomeBonus 합산 |

### 1-2. `incomeMultiplier` 계산

```
incomeMultiplier = 1.0
for each detail d in planet.buildings.details where d.active === true:
  bld = BUILDING_MAP[d.b_id]
  if bld.effects.incomeBonus != null:
    incomeMultiplier += bld.effects.incomeBonus × d.count
incomeMultiplier = max(0, incomeMultiplier)
```

**주요 건물 incomeBonus:**

| 건물 | incomeBonus (1개당) |
|---|---|
| COMMERCIAL_001 (시장 거리) | +0.02 |
| COMMERCIAL_002 (상점가) | +0.04 |
| COMMERCIAL_003 (상업지구) | +0.08 |
| COMMERCIAL_004 (금융 중심지) | +0.14 |
| COMMERCIAL_005 (은하 무역 허브) | +0.22 |
| MINE_003 (기계화 광산) | +0.05 |
| MINE_004 (심부 자원 채굴단지) | +0.10 |
| MINE_005 (전자동 채굴 콤플렉스) | +0.15 |
| FACTORY_003 (자동화 공업단지) | +0.10 |
| FACTORY_004 (로봇 생산 콤플렉스) | +0.15 |
| FACTORY_005 (초정밀 무인 생산단지) | +0.20 |
| FORTRESS_001 (요새) | **-1.0** (수입 전면 차단) |

### 1-3. 함대 유지비 차감

```
upkeep[faction] = Σ fleet.upkeep  (fleetUtils: ceil(ships / 500))
gold = max(0, gold + totalIncome - upkeep)
```

---

## 2. 식량 계산 (`_food`)

### 2-1. 식량 생산 (staffing 기반)

```
jobMap = { [b_id]: { [job_code]: unit } }  // planet.pops.jobs에서 구성

for each detail d in planet.buildings.details where d.active === true:
  bld = BUILDING_MAP[d.b_id]
  if bld.effects.food == null: skip

  reqFarmer = bld.reqPop.find(r => r.code === 'FARMER')?.unit ?? 0
  if reqFarmer === 0:
    staffed = d.count  // 인력 불필요 건물 (자동화 등)
  else:
    farmersAvail = jobMap[d.b_id]?.['FARMER'] ?? 0
    staffed = min(floor(farmersAvail / reqFarmer), d.count)

  foodProd += bld.effects.food × staffed
```

### 2-2. 식량 소비

```
foodConsume = planet.pops.unit  (1 unit = 1 food/turn)
balance = foodProd - foodConsume
```

### 2-3. 흑자/적자 처리

| 상황 | 처리 |
|---|---|
| `balance >= 0` (흑자) | `planet.assets.credit += balance` |
| `balance < 0` (적자) | `planet.assets.credit -= abs(balance) × FOOD_DEFICIT_COST` |
| credit 소진 후 추가 적자 | `planet.pops.unit -= floor(remainingDeficit / FOOD_POP_DECAY)` |

**상수 (조정 가능):**

| 상수 | 초기값 | 설명 |
|---|---|---|
| `FOOD_DEFICIT_COST` | `5` | 적자 food 1당 차감 credit |
| `FOOD_POP_DECAY` | `50` | credit 소진 후 인구 1 감소에 필요한 food 적자량 |

> ⚠️ `FOOD_POP_DECAY = 50`은 원작 설계(`5`)보다 완화된 값. 데이터 밸런스 조정 전까지 임시.

### 2-4. 초기 행성 밸런스 현황

현재 대부분의 시작 행성은 **FARM_000만 보유하고 소수 인력만 배치**된 상태.

예) 230001P01 (바텐·도라흐)
- pops.unit: 2,100 / FARMER 배치: 2,000
- FARM_000 reqPop: 50/건 → 실 가동: 40건 × 50food = **2,000 food 생산**
- 소비: 2,100 → 적자 **100 food/turn**
- 완전 균형을 위해 FARMER 배치를 100 추가하거나, 초기 credit을 충분히 설정 필요

→ **TODO**: 시나리오 초기 planet data 밸런싱 (FARMER 배치 또는 assets.credit 조정)

---

## 3. 건물 건설 (`_construct`)

### 3-1. 건설 진행

```
for each system → each planet → each detail d:
  if d.construct > 0:
    d.construct--
    if d.construct === 0:
      d.active = true
      log('완공')
```

`construct` 필드: 남은 건설 턴 수. 0이면 완성 (active). 새 건설 시 `BUILDING_MAP[b_id].buildTime` 으로 초기화.

### 3-2. 건물 추가 (`planet_develop` 의안 액션)

**payload:**
```js
{
  planetCode: string,   // 예: '230001P01'
  b_id:       string,   // 예: 'COMMERCIAL_001'
  count:      number,   // 건설 개수 (기본 1)
}
```

**처리 순서:**
1. `BUILDING_MAP[b_id]` 조회 → `buildCost`, `buildTime`, `maxCount` 확인
2. `planet.buildings.details` 에서 동일 `b_id` 탐색
   - 있으면: `d.count += count`, 새 건설분은 `d.construct_queue` 또는 별도 항목으로 추가
   - 없으면: 새 항목 `{ b_id, count, active: false, construct: buildTime }` 추가
3. `faction.resources.gold -= buildCost × count`
4. log

> ⚠️ 현재 `details` 구조는 건물 유형별 단일 항목(count 집계). 건설 중 / 완성 분리가 필요하면 `construct_queue` 서브필드 도입 필요 — **설계 확정 후 구현**.

---

## 4. 턴 처리 순서 (`endTurn` 내)

```
_processAgendas()   → planet_develop 등 의안 처리 (새 건물 추가)
_income()           → 수입 계산 → faction.gold 업데이트
_food()             → 식량 계산 → planet.assets.credit / pops 업데이트
_supply()           → 함대 보급
_fleetMove()
_morale()
_construct()        → 건설 진행 (construct--)
_events()
_ai()
```

---

## 5. 상수 정리

| 상수 | 위치 | 초기값 | 설명 |
|---|---|---|---|
| `BASE_POP_INCOME` | `gameStore._income` | `1` | pops.unit 당 기본 수입 |
| `FOOD_DEFICIT_COST` | `gameStore._food` | `5` | 식량 적자 1당 credit 차감 |
| `FOOD_POP_DECAY` | `gameStore._food` | `50` | credit 소진 후 pops 감소율 |

---

## 6. 미구현 / TODO

| 항목 | 비고 |
|---|---|
| planet_develop 의안 UI | MenuPanel → 건물 선택 → 결재 흐름 |
| 건설 중 / 완성 분리 표시 | details 항목 분리 또는 `construct > 0` 뱃지 |
| 시나리오 planet data 밸런싱 | FARMER 배치, 초기 credit 조정 |
| FARM 외 건물 초기 배치 | 현재 대부분 FARM_000만 존재 |
| 인구 성장 로직 | 식량 흑자 5당 pops +1 (buildingData.js 설계) |
| 연구 시스템 | RESEARCH 건물 effects 미정 |
| 건물 유지비 | 건물별 turn 비용 (현재 없음) |
