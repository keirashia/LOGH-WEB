# src/data/characters — 인물 데이터 설계
> 최종 수정: 2026-05-29

---

## 개요

게임 등장인물 마스터 데이터.
불변 데이터(charBase.js)와 가변 데이터(charTender/charDetail/charJobs/charTraits)로 분리.
시나리오별 초기값은 `src/data/characters/scenerio/{시나리오명}/` 에서 관리.

---

## 파일 구조

```
src/data/characters/
├── charactersData.md      ← 이 파일 (데이터 설계)
├── charBase.js            ← 불변 마스터 (이름/이미지/생일)
├── charTender.js          ← 성향 기본값
├── charDetail.js          ← 능력치 기본값
├── charJobs.js            ← 직업 기본값
├── charTraits.js          ← 트레잇 기본값
├── char.js                ← LEGACY (이관 완료 후 삭제 예정)
├── charStats.js           ← LEGACY (이관 완료 후 삭제 예정)
└── scenerio/
    ├── 796_01/
    │   ├── charTender.js
    │   ├── charDetail.js
    │   ├── charJobs.js
    │   └── charTraits.js
    ├── 745_01/
    │   └── charDetail.js  ← role 포함
    └── 640_01/
```

---

## 데이터 계층 구조

```
charBase.js          불변 마스터 → 시나리오/세이브에서 절대 변경 안 됨
charTender.js        성향 기본값 → 시나리오별 초기값 있으면 해당 값 사용
charDetail.js        능력치 기본값 → 시나리오별 초기값 있으면 해당 값 사용
charJobs.js          직업 기본값 → 시나리오별 초기값 있으면 해당 값 사용
charTraits.js        트레잇 기본값 → 시나리오별 초기값 있으면 해당 값 사용

우선순위: 시나리오별 데이터 > 기본값
```

---

## charBase.js — 불변 마스터

총 560명, 시나리오/세이브에서 변경되지 않는 고정값

```js
export const CHAR_BASE = [
  {
    id:          1,
    CHA_CODE:    'CH_000001',   // PK
    CHA_EN_NAME: 'D. Sinclair',
    CHA_KR_NAME: 'D.싱클레어',
    CHA_JP_NAME: 'D.シンクレア',
    CHA_EN_NICK: 'Sinclair',
    CHA_KR_NICK: '싱클레어',
    CHA_JP_NICK: 'シンクレア',
    CHA_IMG:     'CH_00000100', // assets/Img/characters/face/CHA/{CHA_IMG}.jpg
    CHA_BIRTH:   '',            // 생일 (빈값 가능)
  },
]
```

---

## charTender.js — 성향 기본값

총 560명, 시나리오/세이브에서 변경 가능

```js
export const CHAR_TENDER = [
  {
    CHA_CODE:   'CH_000001',
    CHA_NATION: 'FPA',    // 소속 세력 (REH/FPA/PZN/EAT/RAG/null)
    CHA_IDEA:   150,      // 선호 정치체제 수치 (0=공화제~300=전제군주제)
    CHA_BRAVE:  30,       // 용맹도 (0~100)
    CHA_MORAL:  88,       // 도덕 (0~100) — 수치에 따라 이벤트 발생
    CHA_FRIEND: 100,      // 친화 (0~100) — 수치 차이가 적을수록 친한 관계
  },
]
```

---

## charDetail.js — 능력치 기본값

총 560명, 시나리오/세이브에서 변경 가능

```js
export const CHAR_DETAIL = [
  {
    CHA_CODE:    'CH_000001',
    CHA_ST_CMD:  47,   // 통솔  — 함대사령관 행동 처리 보정
    CHA_ST_CSM:  65,   // 카리스마 — 부관 능력치 상한선(캡)
    CHA_ST_ATT:  39,   // 공격  — 함대 공격력에 영향
    CHA_ST_DEF:  33,   // 방어  — 함대 방어력에 영향
    CHA_ST_FST:  29,   // 기동  — 함대 기동력 기본값
    CHA_ST_MNG:  54,   // 운영  — 보급/수송 효율 + 기동력 보정
    CHA_ST_INF:  62,   // 정보  — 색적 범위
    CHA_ST_GFG:  70,   // 육전  — 행성 점령전
    CHA_ST_AFG:  51,   // 공전  — 항공모함 함재기 전용
    CHA_ST_MMP:  70,   // 정치  — 내정/운영
  },
]
```

---

## charJobs.js — 직업 기본값

1인 다직업 가능

```js
export const CHAR_JOBS = [
  {
    CHA_CODE:     'CH_000001',
    JOB_CODE:     'JB_000001',  // 직업 코드 (jobData.js 참조)
    JOB_EXPS:     0,            // 경험치 (일정 수치 시 직업 변화 가능)
    JOB_ST_DATE:  0,            // 직업 취득 턴 (0=처음부터 보유)
  },
]
```

---

## charTraits.js — 트레잇 기본값

1인 다트레잇 가능

```js
export const CHAR_TRAITS = [
  {
    CHA_CODE:      'CH_000001',
    TRAIT_CODE:    'TR_000001',  // 트레잇 코드
    TRAIT_EXPS:    0,            // 경험치
    TRAIT_ST_DATE: 0,            // 취득 턴 (0=처음부터 보유)
    TRAIT_ED_DATE: null,         // 종료 턴 (null=영구)
  },
]
```

---

## 시나리오별 charDetail.js

시나리오에 등장하는 인물 목록 + 역할 정의

```js
// src/data/characters/scenerio/796_01/charDetail.js
export const CHAR_DETAIL = [
  {
    CHA_CODE: 'CH_000064',   // 라인하르트
    role:     'commander',   // commander / adjutant / staff
    faction:  'REH',
  },
  {
    CHA_CODE: 'CH_000266',   // 양 웬리
    role:     'commander',
    faction:  'FPA',
  },
  {
    CHA_CODE: 'CH_000481',   // 오베르슈타인
    role:     'staff',       // 내정/외교 전용
    faction:  'REH',
  },
]
```

### role 종류
```
commander  함대 사령관 가능 (전투 스탯 적용)
adjutant   부관 가능
staff      참모/내정 전용 (전투 불가)
```

---

## 인물 역할 분류 (796_01 기준)

**함대 사령관 가능 (commander)**
```
REH: CH_000064 라인하르트(CMD:97)  CH_000173 미터마이어(CMD:94)
     CH_000301 로이엔탈(CMD:92)    CH_000388 키르히아이스(CMD:98)
FPA: CH_000266 양 웬리(CMD:100)    CH_000055 드와이트 그린힐(CMD:81)
     CH_000231 싱클레어(CMD:72)    CH_000353 응웬 반 티우(CMD:65)
     CH_000034 네그로폰테(CMD:68)
```

**내정/외교 전용 (staff)**
```
REH: CH_000481 오베르슈타인(MNG:99)  CH_000005 슈퇴거(MNG:70)
FPA: CH_000174 부시아스 아둘라(MNG:83)  CH_000255 카젤느(MNG:100)
     CH_000337 파에타
```

---

## 능력치 규칙

```
CSM(카리스마) = 모든 능력치의 상한선(캡)

함대 최종 능력치 = min(사령관.CSM, max(사령관+부관 전체의 해당능력치))
                 + 기함 bonus

기동력   = FST(캡 적용) + MNG * 0.1
색적범위 = INF 기반
항공전   = AFG (carrier_ship 보유 시만 적용)
점령전   = GFG (assault_ship 보유 시만 적용)
```

---

## CHA_USEYN 제거

```
기존 char.js의 CHA_USEYN 컬럼 → 완전 제거
시나리오별 등장 인물은 scenerio/{시나리오명}/charDetail.js 로만 관리
Step3CharSelect.vue → charDetail.js 기반으로 수정 예정
```

---

## 설계 결정 이력

| 날짜 | 결정 |
|---|---|
| 2026-05-28 | char.js + charStats.js → 5개 파일로 분리 확정 |
| 2026-05-28 | CHA_USEYN 완전 제거 결정 |
| 2026-05-28 | 시나리오별 등장인물: scenerio/{시나리오명}/charDetail.js |
| 2026-05-28 | role: commander/adjutant/staff 3종 |
| 2026-05-28 | 부시아스 아둘라(CH_000174) = 양 웬리와 별개 캐릭터, 내정 전용 |
| 2026-05-28 | CH_000266 양 웬리 신규 추가, 전투 스탯 4EX 기준 |
| 2026-05-29 | charDetail.js 경로: scenerio/ (오타 유지, 기존 구조 통일) |

---

## TODO

- [ ] charBase.js 생성 (char.js 560개 → 이관)
- [ ] charTender.js 생성 (char.js 성향 → 이관)
- [ ] charDetail.js 생성 (charStats.js → 이관)
- [ ] charJobs.js 생성 (직업 데이터 신규 입력)
- [ ] charTraits.js 생성 (트레잇 데이터 신규 입력)
- [ ] char.js CHA_USEYN 제거
- [ ] gameStore.js CHA_USEYN 참조 제거
- [ ] Step3CharSelect.vue → charDetail.js 기반으로 수정
- [ ] scenerio/796_01/charDetail.js 작성 (15명)
- [ ] scenerio/745_01/charDetail.js 작성
- [ ] scenerio/640_01/charDetail.js 작성
- [ ] jobData.js 설계 (추후)
