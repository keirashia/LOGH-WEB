# 함선·유닛·함대 데이터 플로우
> 분류: 데이터
> 경로: `docs/116_data_ship_unit.md`
> 상위: [100_DATA.md](100_DATA.md)
> 최종 수정: 2026-07-28

## 개요

게임 내 전투 자원은 **함선 → 유닛 → 함대** 3계층으로 구성된다.

```
[컴포넌트]          [함선]           [유닛]              [함대]
hullData.js   ─┐
weaponData.js  ├─→ unitshipData.js ─→ fleetData.shipList ─→ fleetData (함대 객체)
engineData.js  │   (함선 스펙 정의)    (함선 묶음 = 유닛)    (유닛들의 집합)
radarData.js  ─┘
```

---

## 1. 컴포넌트 레이어

함선은 4개 컴포넌트의 조합으로 정의된다.  
함체를 먼저 선택하고, 해당 함체에 무기·엔진·레이더를 장착하는 방식.

| 파일 | 코드 체계 | 주요 필드 |
|---|---|---|
| `hullData.js` | `HL_${faction}_${typeCode}` | hp, armor(front/side/rear), slots, maxSupply, crew, buildCost |
| `weaponData.js` | `WPN_${faction}_${typeCode}` | type, power, range, supply, slots, equippableBy |
| `engineData.js` | `ENG_${faction}_${typeCode}` | speed, power, equippableBy, buildCost |
| `radarData.js` | `RDR_${faction}_${typeCode}` | range, ecm, equippableBy, buildCost |

### 장착 가능 함체 (`equippableBy`)

무기·엔진·레이더는 각각 `equippableBy: [hullCode, ...]` 필드로  
장착 가능한 함체를 제한한다.  
함체 선택 후 해당 목록 내 컴포넌트만 설치 가능.

### 슬롯 구조

```
hull.slots:
  weapon : 0~4칸  ← 무기 외 보급시설·수리시설도 장착 가능 (TODO)
  engine : 1칸 고정
  radar  : 1칸 고정
```

---

## 2. 함선 레이어 (`unitshipData.js`)

컴포넌트 코드를 조합해 완성 함선 스펙을 정의한다.

```js
{
  shipCode:  "US_REH_BS",
  faction:   "REH",
  shipType:  "battleship",
  name:      [{ code: "Kr", context: "제국 전함" }],

  hull:      "HL_REH_BS",                          // 함체 코드
  weapons:   ["WPN_REH_BEAM", "WPN_REH_MISSILE"],  // 기본 장착 무기 목록
  engine:    "ENG_REH_BS",                         // 엔진 코드
  radar:     "RDR_REH_BS",                         // 레이더 코드

  buildCost:  950,   // 전체 컴포넌트 합산 건조비 (크레딧)
  buildTurns:   2,   // 함체 기준 건조 소요 턴
  upkeep:       8,   // 턴당 유지비 (크레딧)
}
```

### 함선 총 스탯 산출

| 스탯 | 산출 방식 |
|---|---|
| 총 화력 | `sum(weapons[i].power)` |
| 최대 사거리 | `max(weapons[i].range)` |
| 전투 보급 소모 | `sum(weapons[i].supply)` |
| 이동 속도 | `engine.speed` |
| 탐지 거리 | `radar.range` |
| 전자전 | `radar.ecm` |
| 방어력 | `hull.armor.front / side / rear` |

---

## 3. 유닛 레이어 (`fleetData.shipList`)

유닛 = **동일 함종 함선의 묶음**.  
전술전투의 최소 행동 단위이며, 함대는 복수의 유닛으로 구성된다.

```js
// fleetData.js 내 shipList 항목
{
  fltCode:   "REH004",
  shipIndex: 1,
  type:      "F",         // F: 일반 함선 유닛
  shipCode:  "US_REH_BS", // unitshipData.js 참조
  shipAmt:   4000,        // 유닛 보유 함선 수
}
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
       ├─ 유닛 2: US_REH_CR × 1000
       └─ 유닛 3: US_REH_DS × 1000
```

### 분함대 구조

```
모함대 (parentFlt: null)
  └─ 분함대 (parentFlt: "REH004")  ← 전술맵에서 독립 유닛
       전략맵에서는 모함대 이동 시 자동 동기화 (_syncSubFleets)
```

---

## 5. 봉건 함선 풀 (REH 전용)

제국 영주 함선은 함대 편성 전 **행성 단위 풀**로 존재한다.

```js
// planetsData.assets.ships[] — TODO: 구현 예정
[
  { shipCode: "US_REH_BS", amt: 1000, status: "pool"     },  // 미편성 가용
  { shipCode: "US_REH_BS", amt: 500,  status: "assigned",
    fleetId: "REH041"                                     },  // 함대 배속
  { shipCode: "US_REH_BS", amt: 200,  status: "transit",
    fleetId: "REH041", dest: "230001", turnsLeft: 2       },  // 이동/귀환 중
  { shipCode: "US_REH_BS", amt: 100,  status: "repairing",
    turnsLeft: 3                                          },  // 수리 중
  { shipCode: "US_REH_BS", amt: 300,  status: "constructing",
    turnsLeft: 5                                          },  // 건조 중
]
```

### 봉건 함대 편성 흐름

```
작전수립 (op_propose)
  → 함대편성 (fleet_form)
       planets.assets.ships[status:'pool'] 차감
       → gameStore.fleets[faction]에 새 함대 객체 생성
         → 함대투입 (fleet_deploy)
```

---

## 관련 파일

| 파일 | 역할 |
|---|---|
| `src/data/base/fleet/hullData.js` | 함체 컴포넌트 마스터 |
| `src/data/base/fleet/weaponData.js` | 무기 컴포넌트 마스터 |
| `src/data/base/fleet/engineData.js` | 엔진 컴포넌트 마스터 |
| `src/data/base/fleet/radarData.js` | 레이더 컴포넌트 마스터 |
| `src/data/base/fleet/unitshipData.js` | 완성 함선 정의 |
| `src/data/base/fleet/formationData.js` | 진형 마스터 |
| `src/data/scenario/…/fleet/fleetData.js` | 시나리오별 함대·유닛 초기값 |
| `src/data/base/stars/planetsData.js` | 행성 함선 풀 (assets.ships — TODO) |
| `src/utils/fleetUtils.js` | buildFleetsMap, computeFleetStats 등 |
| `src/stores/gameStore.js` | fleets 상태, fleet_form 처리 예정 |

---

## TODO

- [ ] `assets.ships` 구현 — planetsData에 행성별 함선 풀 데이터 입력 (REH 총 296,000척 배분)
- [ ] `fleet_form` 의안 액션 구현 — 풀 차감 + 함대 생성
- [ ] `agendaData.js`에 `fleet_form` 액션 추가
- [ ] `unitshipData` 수치 밸런스 확정 (현재 임시값)
- [ ] `weaponData` grade 도입 — L/M/S 함급별 무기 분리
- [ ] 이제르론 주둔함대 `fleetData.js`에 추가 (40,000척 목표)
