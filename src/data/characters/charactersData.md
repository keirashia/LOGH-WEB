# src/data/characters — 인물 데이터 설계

> 작성: 2026-05-29 / 최종수정: 2026-06-01
> 화면 설계: charactersScreen.md 참조

---

## 개요

게임 등장인물 마스터 데이터.
불변/가변 데이터 분리, 시나리오별 초기값 별도 관리.

---

## 파일 구조

```
src/data/characters/
├── charactersData.md    ← 이 파일
├── charactersScreen.md  ← 화면 설계
├── charBase.js          불변 마스터 (이름/이미지/생일)
├── charStatus.js        능력치 (구 charDetail.js)
├── charTender.js        성향 (IDEA/BRAVE/MORAL/FRIEND)
├── charDetail.js        인물 상세 (appearances/location)
├── charDesc.js          다국어 설명 (신규)
├── charJobs.js          직업
├── charTraits.js        트레잇
├── char.js              LEGACY → 삭제 예정
├── charStats.js         LEGACY → 삭제 예정
└── scenerio/
    └── {연도_seq}/
        ├── charStatus.js   시나리오별 능력치 초기값
        ├── charDetail.js   등장인물 + role + location
        └── charTender.js   시나리오별 성향 초기값

src/data/jobs/
├── jobs.md
└── jobData.js           28개 직업 마스터

src/data/trait/stars/
└── traitData.js         22개 트레잇 마스터
```

---

## 데이터 계층 구조

```
charBase.js          불변 → 절대 변경 안 됨
charStatus.js        능력치 기본값
charTender.js        성향 기본값
charDetail.js        인물 상세 기본값
charDesc.js          다국어 설명
charJobs.js          직업 기본값
charTraits.js        트레잇 기본값

우선순위: 시나리오별 > 기본값
```

---

## charBase.js — 불변 마스터

```js
export const CHAR_BASE = [
  {
    CHA_CODE: "CH_000001",
    CHA_EN_NAME: "D. Sinclair",
    CHA_KR_NAME: "D.싱클레어",
    CHA_KR_NICK: "싱클레어",
    CHA_JP_NAME: "",
    CHA_JP_NICK: "",
    CHA_IMG: "CH_0000010",
    CHA_BIRTH: "", // 근사값 입력 예정 → 나이 계산/은퇴 이벤트 연동
    CHA_POINTS: "0", // 추가. 해당 포인트가 0인 경우 기본 선택 가능함. 포인트가 존재할 경우, 해당 포인트로 계정별 해금
  },
];
```

---

## charStatus.js — 능력치

```js
export const CHAR_STATUS = [
  {
    CHA_CODE: "CH_000001",
    CHA_ST_CMD: 15, // 통솔
    CHA_ST_CSM: 65, // 카리스마 — 모든 능력치 상한선(캡)
    CHA_ST_ATT: 5, // 공격
    CHA_ST_DEF: 5, // 방어
    CHA_ST_FST: 15, // 기동
    CHA_ST_MNG: 50, // 운영
    CHA_ST_INF: 88, // 정보
    CHA_ST_GFG: 5, // 육전
    CHA_ST_AFG: 5, // 공전
    CHA_ST_MMP: 75, // 정치
  },
];
export const CHAR_STATUS_MAP = Object.fromEntries(
  CHAR_STATUS.map((c) => [c.CHA_CODE, c])
);
```

### 능력치 규칙

```
CSM(카리스마) = 모든 능력치의 상한선(캡)

함대 최종 능력치 = min(사령관.CSM, max(사령관+부관 전체)) + 기함 bonus
기동력   = FST(캡) + MNG * 0.1
색적범위 = INF 기반
항공전   = AFG (carrier_ship 보유 시만)
점령전   = GFG (assault_ship 보유 시만)
```

---

## charTender.js — 성향

```js
export const CHAR_TENDER = [
  {
    CHA_CODE: "CH_000001",
    CHA_NATION: "FPA",
    CHA_IDEA: 30, // 선호 정치체제 (0~300)
    CHA_BRAVE: 25, // 용맹 (0~100)
    CHA_MORAL: 88, // 도덕 (0~100)
    CHA_FRIEND: 120, // 친밀도 (0=미입력, 1~200)
  },
];
```

### CHA_IDEA 정치체제 기준

```
0~50    민주공화제
51~100  입헌군주제
101~150 온건군주제
151~200 귀족제
201~250 권위주의
251~300 전제군주제
```

### CHA_FRIEND 친밀도

```
범위: 0=미입력, 1~200
중립: 100

수치 차이 → 관계 판정:
  차이 0~30    → 절친
  차이 31~70   → 친함
  차이 71~110  → 보통
  차이 111~150 → 불편함
  차이 151~    → 상극

게임 영향:
  1. 함대 편성 시 부관 보너스/패널티
  2. 외교 이벤트 발생 조건
  3. 인물 간 관계 표시
  4. 제안 커맨드 수락 가능성

특수 관계:
  FRIEND 수치로 표현 못하는 관계는 트레잇으로 보정
  예: 오베르슈타인(FRIEND:10) + 트레잇 '황제의 검'
    → 라인하르트에 한해 관계 판정 보정
```

### 주요 인물 FRIEND 기준값

```
라인하르트:   150
키르히아이스: 148  → 라인하르트와 절친(차이2) ✅
양 웬리:      145  → 라인하르트와 절친(차이5) ✅
미터마이어:   145  → 로이엔탈과 절친(차이5) ✅
로이엔탈:     150  → 미터마이어와 절친(차이5) ✅
오베르슈타인:  10  → 대부분과 상극, 트레잇 보정
D.싱클레어:   120  → 두루두루 친함
```

---

## charDetail.js — 인물 상세

```js
export const CHAR_DETAIL = [
  {
    CHA_CODE: "CH_000001",
    appearances: [
      // 등장 작품 (수동 입력, 주요 인물 우선)
      "은하영웅전설 1권 <여명편>",
      "은하영웅전설 5권 <풍운편>",
      "OVA 40화",
    ],
    location: "230006", // 기본 위치 성계 code (null 가능)
    // 시나리오별 값이 있으면 우선 적용
  },
];
```

### location 우선순위

```
scenerio/{시나리오}/charDetail.js location
  → 있으면 우선
  → 없으면 charDetail.js 기본값
  → 기본값도 없으면 null
```

### appearances TODO

```
현재: 단순 문자열 배열
추후: meta화 예정 (불필요한 용량 절감)
```

---

## charDesc.js — 다국어 설명

```js
export const CHAR_DESC = [
  {
    CHA_CODE: "CH_000001",
    descKr:
      "자유행성동맹 출신 역사가. 역사 다큐멘터리 해설가로 등장. E.J 매켄지와 함께 루돌프 폰 골덴바움 등장부터 다곤 성역 회전까지 해설.",
    descEn: "",
    descJp: "",
  },
];
```

---

## charJobs.js — 직업

```js
export const CHAR_JOBS = [
  {
    CHA_CODE: "CH_000001",
    jobs: [
      {
        JOB_CODE: "JB_C003", // 학자 (jobData.js 참조)
        JOB_EXPS: 0,
        JOB_ST_DATE: 0, // 취득 턴 (0=처음부터)
      },
    ],
  },
];
```

### jobData.js 직업 카테고리

```
military:  JB_M001~007 (함대사령관~제국군원수)
noble:     JB_N001~006 (공작~기사) — REH 전용
political: JB_R001~005 (황제~헌병총감) — REH
           JB_F001~003 (최고평의회의장~각료) — FPA
           JB_P001~002 (자치령총독~페잔대리인) — PZN
religious: JB_E001~002 (총대주교~사제) — EAT
civilian:  JB_C001~003 (시민~학자)
```

### 직업 canCommand / canGovern

```
canCommand: true  → 함대 지휘 가능
canGovern:  true  → 성계 내정 가능
```

### 직업 표시 규칙 (화면)

```
JOB_ST_DATE 오름차순 → 최대 3개 노출
펼치면 전체 리스트
```

---

## charTraits.js — 트레잇

```js
export const CHAR_TRAITS = [
  {
    CHA_CODE: "CH_000001",
    traits: [
      {
        TRAIT_CODE: "TR_000001",
        TRAIT_EXPS: 0,
        TRAIT_ST_DATE: 0,
        TRAIT_ED_DATE: null, // null = 영구
      },
    ],
  },
];
```

### 트레잇 특수 용도

```
은퇴/사망 표시:
  트레잇 '은퇴' → charBase.js 나이 계산 이벤트 연동
  트레잇 '전사' → 전투 이벤트 처리

특수 관계 보정:
  트레잇으로 FRIEND 수치 한계 보완
  예: 오베르슈타인 '황제의 검' → 라인하르트 관계 보정

traitData.js 카테고리:
  environment / history / event / political / military
```

---

## 시나리오별 파일

### scenerio/{연도\_seq}/charDetail.js — 등장인물 + role

```js
export const CHAR_DETAIL = [
  {
    CHA_CODE: "CH_000064",
    role: "commander", // commander / adjutant / staff
    faction: "REH",
    location: "230058", // 시나리오 시작 시점 위치
  },
];
```

### scenerio/{연도\_seq}/charStatus.js — 능력치 초기값

```js
export const CHAR_STATUS = [
  {
    CHA_CODE: "CH_000064",
    CHA_ST_CMD: 97,
    // ... 해당 시나리오 기준 능력치
  },
];
```

---

## CHA_USEYN 제거

```
char.js의 CHA_USEYN 완전 제거
시나리오별 등장인물 = scenerio/{시나리오}/charDetail.js 로만 관리
Step3CharSelect.vue → charDetail.js 기반으로 수정 예정
```

---

## 설계 결정 이력

| 날짜       | 결정                                                                 |
| ---------- | -------------------------------------------------------------------- |
| 2026-05-28 | char.js + charStats.js → 5개 파일 분리 확정                          |
| 2026-05-28 | CHA_USEYN 완전 제거 결정                                             |
| 2026-05-28 | role: commander/adjutant/staff 3종                                   |
| 2026-05-29 | charDetail → charStatus 변경 (능력치 파일)                           |
| 2026-06-01 | charDetail 신규 역할 (appearances/location)                          |
| 2026-06-01 | charDesc.js 신규 (다국어 설명, 별도 파일)                            |
| 2026-06-01 | FRIEND 범위 1~200 확정                                               |
| 2026-06-01 | FRIEND 판정: 차이 0~30절친/31~70친함/71~110보통/111~150불편/151~상극 |
| 2026-06-01 | FRIEND 특수 관계 → 트레잇으로 보정                                   |
| 2026-06-01 | CHA_IDEA 0~300 정치체제 6단계 확정                                   |
| 2026-06-01 | appearances: 단순 문자열 배열 (meta화는 TODO)                        |
| 2026-06-01 | location: 기본값 charDetail, 시나리오값 우선                         |
| 2026-06-01 | 트레잇: 은퇴/사망/특수관계 보정 용도 포함                            |
| 2026-06-01 | 직업: JOB_ST_DATE 오름차순 최대 3개 노출                             |

---

## TODO

- [ ] charBase.js CHA_BIRTH 근사값 입력
- [ ] charStatus.js 파일명 변경 (charDetail.js → charStatus.js)
- [ ] charDetail.js 신규 생성 (appearances/location)
- [ ] charDesc.js 신규 생성 (다국어)
- [ ] charTender.js FRIEND 주요 인물 수치 업데이트
- [ ] char.js CHA_USEYN 제거
- [ ] gameStore.js CHA_USEYN 참조 제거
- [ ] Step3CharSelect.vue → charDetail.js 기반 수정
- [ ] scenerio/796_01/charDetail.js 작성
- [ ] scenerio/796_01/charStatus.js 작성
- [ ] scenerio/745_01/charDetail.js 작성
- [ ] jobData.js canCommand/canGovern 수치 확정
- [ ] charTraits.js 주요 인물 트레잇 입력
- [ ] appearances meta화 (추후)
