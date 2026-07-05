# 함대 설계 데이터
> 분류: 데이터
> 경로: `docs/106_data_fleet.md`
> 상위: [100_DATA.md](100_DATA.md)
> 최종 수정: 2026-07-05

---

## 파일 목록

```
src/data/base/fleet/
├── formationData.js     진형 마스터 (FF_01~10)
├── flagshipData.js      기함 제원 (FS_*)
└── unitshipData.js      일반 함선 제원 (US_*)

src/data/scenario/{id}/fleet/
├── fleetData.js         함대 초기 편성 (charList/shipList 내장)
└── fleetTraitData.js    함대 트레잇 초기값
```

> **2026-07-02 스키마 개편**: 구 `fleetCharacterData.js`(지휘 계층) / `fleetShipData.js`(함선 구성) 2개 파일은
> **삭제**되었고, 각 함대 객체 안에 `charList`/`shipList`로 내장됐다. `fltCode`도 7자리(예: `FPA0020`)→
> **6자리**(`FPA002`)로 통일 (본함대/분함대 구분 없이 전부 6자리, 접미사 seq 규칙 폐기).

---

## fleetData.js — 함대 편성

### fltCode 체계

```
{FACTION}{NUM:3자리}  예) FPA002(동맹 제2함대), REH004(로엔그람 함대), REH041(메르카츠 분함대)
```

- `parentFlt`: 분함대면 상위 `fltCode`(6자리), 독립 함대면 `null`

### 스키마

```js
{
  fltCode:   "FPA002",
  faction:   "FPA",
  fltNum:    "002",
  fltName:   [{ code: "Kr", context: "제2함대" }],   // 다국어 배열, context = 함대 고유명칭
  parentFlt: null,          // 분함대인 경우 상위 fltCode, 독립이면 null
  charList:  [              // 지휘 계층 (fltCode 필드 없음 — 상위 함대와 중복이므로 제거)
    { charCode: "CH_000479", type: "C", stDate: "0", proactive: 100 },  // 파에타
    { charCode: "CH_000266", type: "O", stDate: "0", proactive: 50  },  // 양 웬리
  ],
  shipList: [                // 함선 구성 (fltCode는 조인 키로 유지)
    { fltCode: "FPA002", shipIndex: 1, type: "F", shipCode: "", shipAmt: 15000 },
  ],
  location: {                 // 분함대는 location 필드 자체를 생략 (상위 함대 위치 따름)
    locCode: "230006", locPos: { x: 527, y: 775 }, direction: 12,
  },
  formationList: [{ ffCode: "FF_01", useYn: true }],
  stratageList: [],
}
```

### type 분류 (charList)

| type | 역할 | 함대 능력치 |
|---|---|---|
| C | 사령관 | 해당 함대 기본값 결정 (`statCmd`/`statCsm` 고정) |
| O | 부관 | 사령관 스탯에 보정 적용 (전원 중 최고값, `statCsm` 상한) |
| S | 분함대 사령관 | 상위 함대(`parentFlt`) 소속, 독립 행동 가능. `getFleetAssignment` 라벨은 "사령관"과 동일 취급 |

### 분함대(parentFlt) 함선 수 합산 — `fleetUtils.buildFleetsMap()`

분함대(`parentFlt`로 상위 함대를 가리키는 함대)는 `gameStore.fleets`에 독립 항목으로 올라가지 않고,
`shipList` 합계가 상위 함대의 `ships`/`maxShips`에 더해진다.

```js
// buildFleetsMap() 내부
const childShips = fleetData
  .filter(c => c.parentFlt === fleet.fltCode)
  .reduce((s, c) => s + sumShips(c.shipList), 0)
totalShips = sumShips(fleet.shipList) + childShips
```

예) `REH004`(로엔그람 함대, 4,000) + `REH041~045`(분함대 5개 × 4,000) → `ships = 24,000`

분함대 사령관(type=S)은 상위 함대의 `subCommanders: [{ charCode, fleetName }]` 필드에 반영된다.
`officers`(O타입, "부관")와는 별도 필드 — `CharInfoPanel.vue`가 이 둘을 구분해 "사령관"/"부관" 라벨을 표시하고,
`GameView.vue`의 교전 confirm 스킵 판정(`playerCharPresent`)도 `officers` + `subCommanders` 양쪽을 모두 확인한다.

---

### SE796_0211_010 (아스타테 회전) 편성 — 검증 완료 (2026-07-05, `796dummy.md`↔`fleetData.js` 대조)

**FPA — 아스타테에 직접 투입되는 3개 분함대(총 4만 5천척) + 대기 함대:**

| fltCode | 함대명 | 사령관 | 부관/참모 | 함선 수 | 위치 |
|---|---|---|---|---|---|
| FPA001 | 제1함대 | 쿠브르슬리(CH_000443) | — | 15,000 | 230006(하이네센) |
| FPA002 | 제2함대 | 파에타(CH_000479) | 양 웬리(O)/아텐보로(O)/라오(O) | 15,000 | **230005(아스타테)** — 시작부터 REH004와 조우 상태 (2026-07-05) |
| FPA003 | 제3함대 | 르페브르(CH_000574) | — | 15,000 | 230006 |
| FPA004 | 제4함대 | 파스톨레(CH_000478) | 피셔(O) | 15,000 | 230006 |
| FPA005~012 | — | — | — | 각 15,000 | 230006, 이 시나리오 교전 미참여 |

**REH — 라인하르트 총사령관 휘하:**

| fltCode | 함대명 | 사령관 | 함선 수 | 비고 |
|---|---|---|---|---|
| REH004 | 로엔그람 함대(총사령관) | 라인하르트(C) + 키르히아이스(O) | 4,000 | 230005(아스타테) |
| REH041 | 메르카츠 분함대 | 메르카츠(S) | 4,000 | parentFlt: REH004 |
| REH042 | 슈타덴 분함대 | 슈타덴(S) | 4,000 | parentFlt: REH004 |
| REH043 | 파렌하이트 분함대 | 파렌하이트(S) | 4,000 | parentFlt: REH004 |
| REH044 | 에를라흐 분함대 | 에를라흐(S) | 4,000 | parentFlt: REH004 |
| REH045 | 포겔 분함대 | 포겔(S) | 4,000 | parentFlt: REH004 |

→ `buildFleetsMap()` 합산으로 REH 총 병력 24,000척 (§ 위 "분함대 함선 수 합산" 참조)

**결정 (2026-07-05): 이 시나리오에는 추가하지 않음.**
- `REH001`(뮈켄베르거 함대) — 아스타테 회전에 직접 참여하지 않는 본국/후방 대기 함대.
- 이제르론 주둔함대(미터마이어/로이엔탈) — 마찬가지로 이 시나리오에 등장하지 않는 후방 주둔 함대.
  `fleetData.js`의 `// 이제르론 주둔함대` 주석은 자리 표시일 뿐 데이터는 없음 — 의도된 상태.
  (참고: 뮈켄베르거를 추가할 다른 시나리오가 생기면 사령관 코드는 `CH_000199`(부친, 사망)가 아니라
  실제 활동 중인 `CH_000017`을 써야 함 — `796dummy.md`가 지정했던 코드는 오기였음)

---

## formationData.js — 진형

### ffCode / ffType

| ffCode | ffName | ffType |
|---|---|---|
| FF_01 | 방진 | DEF |
| FF_02 | 횡렬진 | ATK |
| FF_03 | 종렬진 | MOV |
| FF_04 | 학익진 | ENC |
| FF_05 | 포위진 | ENC |
| FF_06 | 쐐기진 | ATK |
| FF_07 | 원형진 | DEF |
| FF_08 | 돌격진 | ATK |
| FF_09 | 기동진 | MOV |
| FF_10 | 방어진 | DEF |

ffType: `ATK`(공격형) | `DEF`(방어형) | `MOV`(기동형) | `ENC`(포위형)

### weight 테이블

각 진형마다 다른 진형으로 전환 시 걸리는 딜레이(단위: 임의).  
자기 자신 → delay=0, 유사 진형 → 낮음, 이질적 진형 → 높음.

```js
weight: [
  { target: "FF_01", delay: 0   },  // 방진→방진 = 즉시
  { target: "FF_02", delay: 90  },  // 방진→횡렬진
  { target: "FF_09", delay: 220 },  // 방진→기동진 = 최장
]
```

---

## flagshipData.js — 기함 제원

### shipCode 체계

```
FS_{NAME}   예) FS_BRUNHILD, FS_HYPERION
```

### 스키마

```js
{
  shipCode:  "FS_BRUNHILD",
  faction:   "REH",
  shipType:  "command_battleship",
  nameKr:    "브륀힐트",
  nameEn:    "Brünhild",
  nameJp:    "ブリュンヒルト",
  length:    1007,       // 미터
  width:     264,
  height:    273,
  crew:      1171,
  ucFrom:    795,        // 취역 UC년
  ucTo:      null,       // 퇴역/격침 UC년 (현역이면 null)
  status:    "active",   // active | decommissioned | destroyed
  weapons: [
    { wType:"beam", caliber:40, count:8, pos:"fwd" }
  ],
}
```

---

## unitshipData.js — 일반 함선 제원

### shipCode 체계

```
US_{faction}_{typeCode}

typeCode:
  BS = 전함(battleship)
  FB = 고속전함(fast_battleship)
  CR = 순양함(cruiser)
  DS = 구축함(destroyer)
  CV = 항공모함(carrier)
  TR = 수송함(transport)

예) US_REH_BS = 제국 전함, US_FPA_CR = 동맹 순양함
```

`era`: 기준 UC연도 (788 UC era 기준으로 작성)

---

## TODO

- [x] `REH004` `location.locCode` 확정 (`230005` 아스타테) — 2026-07-04
- [x] FPA003 사령관(르페브르, `CH_000574`) charList 등록 — 2026-07-05
- [ ] `location.locCode` 나머지 함대 입력 (REH004 외 대부분 여전히 빈값 또는 하이네센 고정)
- [x] `REH001`(뮈켄베르거 함대) / 이제르론 주둔함대 — 이 시나리오 범위에 포함하지 않기로 결정 (위 예시 절 참조) — 2026-07-05
- [x] 분함대 사령관(메르카츠 등)을 상위 함대에 반영 — `subCommanders: [{charCode, fleetName}]` 별도 필드 추가 (officers=O타입과 구분) — 2026-07-05
- [ ] fleetTraitData.js 스키마 문서화 (현재 미입력)
- [ ] formationData.js `effect` 미완성 6종 (FF_04~10 중 일부) 입력
- [ ] SE640/01, SE745/01 함대 데이터 미작성
