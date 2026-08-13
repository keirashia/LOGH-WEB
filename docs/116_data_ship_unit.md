# 함선·유닛·함대 데이터 플로우
> 분류: 데이터
> 경로: `docs/116_data_ship_unit.md`
> 상위: [100_DATA.md](100_DATA.md)
> 최종 수정: 2026-08-13

## 개요

게임 내 전투 자원은 **함선 → 유닛 → 함대** 3계층으로 구성된다.

```
[함체+무기]          [함선]           [유닛]              [함대]
hullData.js   ─┐
               ├─→ unitshipData.js ─→ fleetData.shipList ─→ fleetData (함대 객체)
weaponData.js ─┘   (함선 스펙 정의)    (함선 묶음 = 유닛)    (유닛들의 집합)
```

> **2026-08-13 구조 개편**: `engineData.js`(엔진) / `radarData.js`(레이더)는 **폐지**.  
> 기동(speed) · 탐지(detection/ecm) 수치는 `hullData.js`에 흡수됨.  
> `equippableBy` 제거 → 함체 `grade`(L/M/S/X)로 무기 호환성 관리.

---

## 1. 컴포넌트 레이어

함선은 **함체(hull) + 무기(weapons)** 2종 조합으로 정의한다.  
엔진·레이더는 함체에 내장 (별도 컴포넌트 없음).

| 파일 | 코드 체계 | 주요 필드 |
|---|---|---|
| `hullData.js` | `HL_${faction}_${typeCode}` | grade, hp, armor, speed, detection, ecm, slots, maxSupply, buildCost |
| `weaponData.js` | `WPN_${faction}_${type}_${grade}` | grade, type, power, range, supply |

### 함체 grade 체계

| grade | 함종 | weapon 슬롯 |
|---|---|---|
| `L` | 전함(BS) · 고속전함(FB) | 1 |
| `M` | 순양함(CR) | 1 |
| `S` | 구축함(DS) | 2 |
| `X` | 항모(CV) · 수송함(TR) | 고정(fixed) 또는 없음 |

### 슬롯 구조

```js
// L / M — 무기 1종 선택
slots: { weapon: 1 }

// S — 소형 무기 2종 선택
slots: { weapon: 2 }

// CV — 함재기 고정 내장 (선택 불가)
slots: { fixed: ["WPN_REH_FIGHTER", "WPN_REH_GUNSHIP"] }

// TR — 무장 없음
slots: {}
```

### 무기 grade 체계

무기는 함체 grade에 맞는 것만 장착 가능 (`equippableBy` 대신 grade 매칭).

| grade | 대상 함종 | 특징 |
|---|---|---|
| `L` | 전함·고속전함 | 고화력 1문 |
| `M` | 순양함 | 중간 화력 |
| `S` | 구축함 | 저화력, 2종 혼용 가능 |
| 없음 | 특수(CV 함재기 등) | hull.slots.fixed에 고정 |

무기 전투 스탯 3종: `power`(공격력) · `range`(사거리) · `supply`(소모물자)

---

## 2. 함선 레이어 (`unitshipData.js`)

함체 코드 + 무기 코드 목록으로 완성 함선을 정의한다.

```js
{
  shipCode:   "US_REH_BS",
  faction:    "REH",
  shipType:   "battleship",
  name:       [{ code: "Kr", context: "제국 전함" }],

  hull:       "HL_REH_BS",          // hullData 참조 (grade L)
  weapons:    ["WPN_REH_BEAM_L"],   // grade 매칭 무기 목록 (CV는 [] — hull.slots.fixed 사용)

  buildCost:   680,   // hull + weapons 합산
  buildTurns:    2,
  upkeep:        8,
}
```

### 함선 총 스탯 산출

| 스탯 | 산출 방식 |
|---|---|
| 총 화력 | `sum(weapons[i].power)` + `sum(hull.slots.fixed weapon power)` (CV) |
| 최대 사거리 | `max(weapons[i].range)` |
| 전투 보급 소모 | `sum(weapons[i].supply)` |
| 이동 속도 | `hull.speed` |
| 탐지 거리 | `hull.detection` |
| 전자전 | `hull.ecm` |
| 방어력 | `hull.armor.front / side / rear` |

---

## 3. 유닛 레이어 (`fleetData.shipList`)

유닛 = **동일 함종 함선의 묶음**.  
전술전투의 최소 행동 단위이며, 함대는 복수의 유닛으로 구성된다.

```js
// fleetData.js 내 shipList 항목 (함종별 분리)
{ type: "U", shipCode: "US_FPA_BS", shipAmt: 3000 },
{ type: "U", shipCode: "US_FPA_CR", shipAmt: 5000 },
{ type: "U", shipCode: "US_FPA_DS", shipAmt: 7000 },
```

### 유닛 전투력 산출

```
유닛 전투력 = shipAmt × (함선 총 화력)
유닛 내구도  = shipAmt × hull.hp
유닛 보급    = shipAmt × 전투 보급 소모
```

---

## 4. 함대 레이어 (`fleetData.js` → `gameStore.fleets`)

함대 = 유닛들의 집합. 전략맵의 이동·배치 단위.

```
함대 (Fleet)
  ├─ 지휘관 (commander)  — charactersData 참조
  ├─ 부관 (officers[])
  ├─ 진형 (formation)    — formationData 참조
  ├─ 위치 (location)     — 성계 코드
  ├─ 상태 (status)       — standby | moving | battle
  └─ 유닛 목록 (shipList[])
       ├─ 유닛 1: US_REH_BS × 2000
       ├─ 유닛 2: US_REH_CR × 3000
       └─ 유닛 3: US_REH_DS × 7000
```

### 분함대 구조

```
모함대 (parentFlt: null)
  └─ 분함대 (parentFlt: "REH004")  ← 전술맵에서 독립 유닛
       전략맵에서는 모함대 이동 시 자동 동기화 (_syncSubFleets)
```

---

## 5. 함대 전략 스탯 산출 (`getFleetShipStats`)

> 위치: `src/utils/fleetUtils.js`

`shipList` 구성에서 **전략 레이어 스탯** 3종을 계산한다.  
`computeFleetStats()`(인물 기반 cmd/att/def 등)와는 **별개**. 사용처가 다르다.

| 스탯 | 산출 방식 | 사용처 |
|---|---|---|
| `speed` (전략 이동력) | `min(HULL_MAP[ship.hull].speed)` — 가장 느린 함종 기준 | 전략 이동 |
| `supplyDrain` (턴당 보급 소모) | `Σ( shipAmt × Σ weapon.supply )` — 장착+고정 무기 합산 | `_supply()` 보급 처리 |
| `firepower` (표시용 총 화력) | `Σ( shipAmt × Σ weapon.power )` | UI 정보 표시 |

```js
// src/utils/fleetUtils.js — getFleetShipStats(fleet)
function getFleetShipStats(fleet) {
  let speed = Infinity, supplyDrain = 0, firepower = 0
  for (const entry of (fleet.shipList ?? [])) {
    if (!entry.shipCode) continue
    const ship = UNIT_SHIP_MAP[entry.shipCode]
    if (!ship) continue
    const hull = HULL_MAP[ship.hull]
    if (hull) speed = Math.min(speed, hull.speed)
    const weapons = [
      ...(ship.weapons ?? []),
      ...(hull?.slots?.fixed ?? []),   // CV 고정 함재기 포함
    ]
    for (const wpnCode of weapons) {
      const wpn = WEAPON_MAP[wpnCode]
      if (!wpn) continue
      supplyDrain += entry.shipAmt * wpn.supply
      firepower   += entry.shipAmt * wpn.power
    }
  }
  return {
    speed:       speed === Infinity ? 1 : speed,
    supplyDrain,
    firepower,
  }
}
```

### 전략 스탯 vs 전술 스탯 구분

| 구분 | 함수 | 소스 | 사용처 |
|---|---|---|---|
| 전략 스탯 | `getFleetShipStats(fleet)` | shipList + hullData/weaponData | 이동·보급·UI |
| 전술 스탯 | `computeFleetStats(fleet, chars)` | charList + charactersData | 전술 전투 공격/방어 계산 |

---

## 6. 봉건 함선 풀 (REH 전용)

제국 영주 함선은 함대 편성 전 **행성 단위 풀**로 존재한다.

```js
// planetsData.assets.ships[] — TODO: 구현 예정
[
  { shipCode: "US_REH_BS", amt: 1000, status: "pool"     },
  { shipCode: "US_REH_BS", amt: 500,  status: "assigned", fleetId: "REH041" },
  { shipCode: "US_REH_BS", amt: 200,  status: "transit",  fleetId: "REH041", dest: "230001", turnsLeft: 2 },
  { shipCode: "US_REH_BS", amt: 100,  status: "repairing",   turnsLeft: 3 },
  { shipCode: "US_REH_BS", amt: 300,  status: "constructing",turnsLeft: 5 },
]
```

---

## 관련 파일

| 파일 | 역할 |
|---|---|
| `src/data/base/fleet/hullData.js` | 함체 마스터 (grade/speed/detection/ecm 내장) |
| `src/data/base/fleet/weaponData.js` | 무기 마스터 (grade L/M/S, power/range/supply) |
| `src/data/base/fleet/unitshipData.js` | 완성 함선 정의 (hull + weapons) |
| `src/data/base/fleet/formationData.js` | 진형 마스터 |
| `src/scenario/…/fleet/fleetData.js` | 시나리오별 함대·유닛 초기값 |
| `src/data/base/stars/planetsData.js` | 행성 함선 풀 (assets.ships — TODO) |
| `src/utils/fleetUtils.js` | buildFleetsMap, getFleetShipStats 등 |
| `src/stores/gameStore.js` | fleets 상태, fleet_form 처리 예정 |

> `engineData.js` / `radarData.js` — **폐지** (2026-08-13). 수치는 hullData에 흡수됨.

---

## TODO

- [ ] **`getFleetShipStats()` 구현**: `src/utils/fleetUtils.js`에 §5 공식 구현
- [ ] **SE796_0211_010 shipList 채우기**: 전체 함대 shipCode 실제 함종으로 분리 입력 → `106_data_fleet.md` TODO 참조
- [x] **구축함 슬롯 불일치 수정**: S grade = 2슬롯으로 확정 (2026-08-13)
- [ ] **gameStore `_supply()` 연동**: `getFleetShipStats().supplyDrain` 반영
- [ ] **전략 이동 speed 반영**: `getFleetShipStats().speed` 반영
- [ ] `assets.ships` 구현 — planetsData에 행성별 함선 풀 데이터 입력
- [ ] `fleet_form` 의안 액션 구현 — 풀 차감 + 함대 생성
- [ ] 이제르론 주둔함대 `fleetData.js`에 추가 (40,000척 목표)
