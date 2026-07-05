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
├── fleetData.js         함대 초기 편성
├── fleetCharacterData.js 함대-인물 배치 (C/O/S 계층)
├── fleetShipData.js     함대-함선 구성
└── fleetTraitData.js    함대 트레잇 초기값
```

---

## fleetData.js — 함대 편성

### fltCode 체계

```
{FACTION}{NUM:3자리}  예) FPA0020, REH0040, REH0041
```

- `FPA0020` = 동맹 제2함대
- `REH0040` = 제국 로엔그람 함대
- `REH0041` = 로엔그람 함대 메르카츠 **분**함대

### 스키마

```js
{
  fltCode:   "FPA0020",
  faction:   "FPA",
  fltNum:    "002",
  fltName:   "자유행성동맹 제2함대",
  fltLoc:    "",           // 초기 위치 성계 code (현재 빈값)
  parentFlt: null,         // 분함대인 경우 상위 fltCode, 독립이면 null
}
```

---

## fleetCharacterData.js — 지휘 계층

### type 분류

| type | 역할 | 함대 능력치 |
|---|---|---|
| C | 사령관 | 해당 함대 기본값 결정 |
| O | 부관 | 사령관 스탯에 보정 적용 |
| S | 분함대 사령관 | 상위 함대 소속, 독립 행동 가능 |

### 스키마

```js
{
  fltCode:   "FPA002",     // 3자리 축약 코드 (FPA0020 → FPA002)
  charCode:  "CH_000479",  // 인물 코드
  type:      "C",          // C | O | S
  parentFlt: null,         // S 타입이면 상위 fltCode, 아니면 null
  stDate:    "0",          // 배치 시작 턴
}
```

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

예) `REH004`(로엔그람 함대, 4,000) + `REH041~044`(분함대 4개 × 4,000) → `ships = 24,000`

**미해결**: 분함대 사령관(메르카츠 등)은 상위 함대의 `officers` 배열에 반영되지 않는다 (`796dummy.md` 참조).

---

### SE796_01 아스타테 편성 예시

**FPA:**
- FPA002: 파에타(C) + 양 웬리(O)
- FPA004: 파스톨레(C)
- FPA006: 무어(C)

**REH:**
- REH001: 뮈켄베르거(C) — 독립 함대
- REH004: 로엔그람(C)
  - REH041: 메르카츠 분함대(S)
  - REH042: 슈타덴 분함대(S)
  - REH043: 파렌하이트 분함대(S)
  - REH044: 에를라흐 분함대(S)

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
- [ ] fleetData.js `fltLoc` 성계 code 입력 (REH004 외 나머지 여전히 빈값)
- [ ] `REH001`(뮈켄베르거 함대)이 `fleetData.js`에 아예 없음 — 문서와 실제 데이터 불일치
- [ ] fleetShipData.js / fleetTraitData.js 스키마 문서화
- [ ] formationData.js `effect` 미완성 6종 (FF_04~10 중 일부) 입력
- [ ] SE640/01, SE745/01 함대 데이터 미작성
