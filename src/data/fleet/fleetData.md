// ================================================================
// src/data/fleet/
// fleetData.md
// ver.20260608 | md문서 생성
// ================================================================

# 규칙

함대 관련 데이터는 시나리오별로 큰 차이가 있기 때문에, 기본 데이터를 생성하지 않는다.
location은 연도/시나리오 순번을 기준으로 한다.

(혹시 해당 값이 생성되지 않은 경우
해당 시나리오와 가장 가까운 이전 시나리오
해당 시나리오와 가장 가까운 이후 시나리오
순서로 검색하여 해당 시나리오의 값으로 세팅한다.)

// ================================================================
// 경로: src/data/fleet/fleetData.md
// JS : src/data/fleet/${location}/fleetData.js
// JS : src/data/fleet/${location}/fleetFormationData.js
// JS 참조 : src/data/fleet/formationData.js
// JS : src/data/fleet/${location}/fleetCharacterData.js
// JS 참조 : src/data/characters/charactersData.js
// JS : src/data/fleet/${location}/fleetShipData.js
// JS 참조 : src/data/fleet/unitshipData.js
// JS 참조 : src/data/fleet/flagshipData.js
// JS : src/data/fleet/${location}/fleetTraitData.js
// JS 참조 : src/data/trait/ship/shipTraitData.js
// ================================================================

---

## 함대 코드 체계

```
fltCode = ${faction}${fltNum}
예) FPA002, REH001

fltNum: 3자리 pad (001, 002, ...)
  - 함대가 생성된 순서 기반 번호값
  - 시나리오 내 존재하는 모든 함대에 순차 부여
```

---

## 지휘 계층 구조

```
총사령관 (type: C)
  └ 부관 (type: O)
  └ 분함대 사령관 (type: S)
      └ 분함대 부관 (type: O, parentFlt 지정)
```

### type 코드

| 코드 | 명칭          | 설명                                 |
| ---- | ------------- | ------------------------------------ |
| C    | 사령관        | 함대 최고 지휘관. 함대 능력치 기준값 |
| O    | 부관          | 사령관 보좌. 스탯 보정 적용          |
| S    | 분함대 사령관 | 상위 함대 소속. 독립 행동 가능       |

### parentFlt

```
분함대 사령관(S)은 parentFlt로 상위 함대 코드를 지정
예) 메르카츠(S) → parentFlt: "REH0010"

parentFlt가 없으면 독립 함대로 취급
```

---

## 함대 능력치 계산 규칙

### 기본 원칙

```
함대 능력치 = 사령관(C) 스탯 기본값
부관(O) 보정: 부관 스탯 > 사령관 스탯이면 해당 스탯 대체
  → 단, 사령관의 statCsm(카리스마)을 초과할 수 없음

분함대 사령관(S): 상위 함대 작계 하에 독립 능력치 적용
```

### 스탯별 적용 규칙

```
statCmd (통솔) : 사령관(C) 수치 고정
statCsm (카리스마) : 사령관(C) 수치 고정 (보정 상한값)
statAtt (공격) : 소속 인원 중 최고값. statCsm 초과 불가
statDef (방어) : 소속 인원 중 최고값. statCsm 초과 불가
statFst (기동) : 소속 인원 중 최고값. statCsm 초과 불가
statMng (운영) : 소속 인원 중 최고값. statCsm 초과 불가
statInf (정보) : 소속 인원 중 최고값. statCsm 초과 불가
statGfg (육전) : 소속 인원 중 최고값. statCsm 초과 불가
statAfg (공전) : 소속 인원 중 최고값. statCsm 초과 불가
```

### 계산 예시

```
슈타덴(CMD:81, CSM:49, FST:43) + 부관(FST:100)
→ 함대 FST = min(CSM:49, 부관:100) = 49

라인하르트(CMD:97, CSM:98, ATT:95) + 키르히아이스(ATT:100)
→ 함대 ATT = min(CSM:98, 키르히아이스:100) = 98
```

---

## src/data/fleet/${location}/fleetData.js

### 스키마

```js
{
  fltCode : "FPA0020",              // ${faction}${fltNum}${index} 조합 키값 0이면 통상적으로 본함대, 분함대는 해당 index에 숫자가 붙어서, n함대 1분함대. 이런 식으로 처리
  faction : "FPA",                 // 소속 세력
  fltNum  : "002",                 // 함대 번호 (3자리 pad)
  fltName : "자유행성동맹 제2함대", // 함대명
  fltLoc  : "SE796/01",            // 함대 위치 (성계 또는 성계간 통로 lane)
  parentFlt: null,                 // 상위 함대 코드 (분함대인 경우)
}
```

## src/data/fleet/${location}/fleetFormationData.js

```js
{
  fltCode : "FPA0020",
  formation: "FF_00001",  // fleetFormation 으로 해당 함대가 보유한 진형
  useYn : true // 현재 사용중인 포메이션
}
```

---

## src/data/fleet/${location}/fleetCharacterData.js

### 스키마

```js
{
  fltCode  : "FPA002",     // 소속 함대 코드
  charCode : "CH_000479",  // 인물 코드
  type     : "C",          // C 사령관 / O 부관 / S 분함대 사령관
  parentFlt: null,         // S 타입일 경우 상위 함대 코드
  stDate   : "0",          // 소속 시작 턴 (0 = 시나리오 시작부터)
}
```

---

## src/data/fleet/${location}/fleetShipData.js

### 스키마

```js
{
  fltCode  : "FPA002",    // 소속 함대 코드
  type     : "F",         // F 기함 / U 일반 함선
  shipIndex: 1,           // 함선 index
  shipAmt  : 15000,       // 함선 수량(1유닛은 최대 1000)
  shipType : "warship",   // 함선 종류
  shipLoc : "C04" // 함대 내 해당 유닛의 위치 A~P x 1~16 그리드 타입에 현재 유닛이 어느 위치에 존재하는지 처리한다.
}
```

---

## src/data/fleet/${location}/fleetTraitData.js

### 스키마

```js
{
  fltCode   : "FPA002",          // 소속 함대 코드
  traitCode : "FLTR_00000001",   // 트레잇 코드
  stDate    : "0",               // 트레잇 시작 턴
}
```

---

## 설계 결정 이력

| 날짜       | 결정                                              |
| ---------- | ------------------------------------------------- |
| 2026-06-08 | 분함대 구조 추가 (type: S / parentFlt)            |
| 2026-06-08 | 지휘 계층: C(사령관) / O(부관) / S(분함대 사령관) |
| 2026-06-08 | 함대 능력치 상한 = 사령관 statCsm 고정            |
| 2026-06-08 | location 형식: SE796/01                           |
| 2026-06-08 | 기본 데이터 없음, 시나리오별 생성                 |
| 2026-06-08 | 분함대 fltCode 형식 확정: 분함대는 seq 포함 full fltCode 사용 (REH0041 등), parentFlt도 full fltCode |

---

## TODO

- [x] 분함대 대응 코드 수정 (fltCode/fltNum/parentFlt SE796/01 전체 통일)
- [ ] unitshipData.js 설계
- [ ] flagshipData.js 설계
- [ ] shipTraitData.js 설계
- [ ] fltLoc 성계 코드 입력 (SE796/01 전체)
- [ ] fleetFormationData.js 생성 (SE796/01)
- [ ] 분함대 사령관 작계 처리 로직 설계
- [ ] 함대 괴멸 조건 정의 (함선 N% 이하?)
