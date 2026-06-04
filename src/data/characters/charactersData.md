# src/data/characters — 인물 데이터 설계

> 작성: 2026-05-29 / 최종수정: 2026-06-04
> 화면 설계: charactersScreen.md 참조

---

## 개요

게임 등장인물 마스터 데이터.  
`2026-06-02` 기준으로 분산된 char~.js 파일들을 `charactersData.js`로 병합 완료.  
code 기준으로 다수 레코드가 필요한 데이터(이름/설명/직업)는 별도 파일 유지.

---

## 파일 구조 (현재)

```
src/data/characters/
├── charactersData.md       ← 이 파일
├── charactersScreen.md     ← 화면 설계
├── charactersData.js       ★ 주력 통합 파일 (charBase + charStatus + charTender 병합)
├── charactersName.js       다국어 이름 (code × scCode × lang 별 레코드)
├── charactersDesc.js       다국어 설명 (code × scCode × lang 별 레코드)
├── charactersJobs.js       직업 목록 (code 당 다수 레코드)
└── legacy/                 ← 병합/삭제 대상 구파일
    ├── charBase.js
    ├── charStatus.js
    ├── charTender.js
    ├── charDetail.js       삭제 예정 (appearances/location → 불필요)
    ├── charDesc.js         → charactersDesc.js 로 이전
    ├── charJobs.js         → charactersJobs.js 로 이전
    ├── charTraits.js       삭제 예정
    ├── char.js             삭제 예정 (LEGACY)
    ├── charStats.js        삭제 예정 (LEGACY)
    └── TN_CHAR_A_INFO.xlsx 원본 엑셀 (참조용)
```

---

## charactersData.js — 통합 마스터

charBase + charStatus + charTender 3개 파일을 하나로 병합한 파일.  
내보내기 이름: `CHAR_BASE`

```js
export const CHAR_BASE = [
  {
    code:    "CH_000001",          // 인물 고유 키
    birth:   "SE|743.05.14",       // 생년 (yearType|yyyy.mm.dd), 없으면 ""
    death:   "SE|801.07.26",       // 사망 (yearType|yyyy.mm.dd), 없으면 ""
    point:   "0",                  // 해금 포인트 (0=항상 해금, "X"=포인트 해금 불가)

    // ── 능력치 (charStatus 병합) ──────────────────────────────
    statCmd: 10,   // 통솔 (지휘81 → LOGH6 기준 별도 관리)
    statCsm: 65,   // 카리스마 — 모든 능력치 상한선(캡)
    statAtt: 5,    // 공격
    statDef: 5,    // 방어
    statFst: 15,   // 기동
    statMng: 50,   // 운영
    statInf: 88,   // 정보
    statGfg: 5,    // 육전
    statAfg: 5,    // 공전
    statMmp: 75,   // 정치공작

    // ── 성향 (charTender 병합) ────────────────────────────────
    faction: "FPA",   // 소속 세력 (FACTIONS 코드)
    idea:    "30",    // 선호 정치체제 (0~300) → ideaData.js 참조
    econ:    "100",   // 선호 경제체제 코드 → economyData.js 참조
    brave:   "25",    // 용맹 (0~100)
    moral:   "88",    // 도덕 (0~100)
    friend:  "120",   // 친밀도 기준값 (0=미입력, 1~200)
  },
]
```

### 능력치 규칙

```
함대 기본 능력치 = 사령관 본인 스탯 그대로 적용

부관 보정:
  부관의 스탯이 사령관보다 높을 경우, 해당 스탯을 함대에 적용
  단, 사령관의 statCsm(카리스마)을 초과할 수 없음

  예) 슈타덴(statFst:43, statCsm:49) + 부관(statFst:100)
      → 함대 statFst = min(statCsm:49, 부관:100) = 49

  부관이 없거나 부관 스탯 < 사령관 스탯이면 사령관 스탯 그대로 유지

기함 bonus: 함선 종류에 따라 특정 스탯 추가 보정
기동력   = statFst + 기함 bonus
색적범위 = statInf 기반
항공전   = statAfg (carrier_ship 보유 시만)
점령전   = statGfg (assault_ship 보유 시만)
```

### idea 정치체제 기준

```
0~50    민주공화제
51~100  입헌군주제
101~150 온건군주제
151~200 귀족제
201~250 권위주의
251~300 전제군주제
```

### econ 경제체제 기준 (economyData.js)

```
20   자급자족
60   봉건경제
100  자본주의
140  혼합경제
180  국가자본주의
220  사회주의
260  계획경제
300  공산주의
```

### friend 친밀도

```
범위: 0=미입력, 1~200 / 중립=100

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

특수 관계는 트레잇으로 보정:
  예: 오베르슈타인(friend:10) + 트레잇 '황제의 검' → 라인하르트 관계 보정
```

### 주요 인물 friend 기준값 (참고)

```
라인하르트:   150
키르히아이스: 148  → 절친 (차이2)
양 웬리:      145  → 라인하르트와 절친 (차이5)
미터마이어:   145  → 로이엔탈과 절친 (차이5)
로이엔탈:     150  → 미터마이어와 절친 (차이5)
오베르슈타인:  10  → 대부분 상극, 트레잇 보정
D.싱클레어:   120  → 두루두루 친함
```

---

## charactersName.js — 다국어 이름

code × scCode × lang 조합으로 레코드 분리.  
내보내기 이름: `CHAR_NAMES`

```js
export const CHAR_NAMES = [
  {
    charCode: "CH_000001",
    scCode:   "",           // 시나리오 코드 (없으면 기본값)
    lang:     "Kr",         // "Kr" | "En" | "Jp"
    name:     "D. 싱클레어",
    nick:     "싱클레어",
  },
]
```

---

## charactersDesc.js — 다국어 설명

code × scCode × lang 조합으로 레코드 분리.  
내보내기 이름: `CHAR_DESC`

```js
export const CHAR_DESC = [
  {
    charCode: "CH_000001",
    lang:     "KR",
    scCode:   "",
    desc:     `명망높은 역사가이자 역사 다큐멘터리 해설가...`,
  },
]
```

---

## charactersJobs.js — 직업

1인 다직업 가능. code 당 다수 레코드.  
내보내기 이름: `CHAR_JOBS`

```js
export const CHAR_JOBS = [
  {
    charCode:   "CH_000001",
    jobCode:    "JB_C003",   // jobData.js 참조
    jobLevel:   0,
    jobExp:     0,
    jobStDate:  0,           // 취득 턴 (0=처음부터)
    jobEdDate:  0,           // 종료 턴 (0=무기한)
  },
]
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

canCommand: true  → 함대 지휘 가능
canGovern:  true  → 성계 내정 가능
```

---

## 우선순위

```
시나리오별 charList.js > charactersData.js 기본값

faction: charList의 값 있으면 우선 (Step3CharSelect.vue)
```

---

## 설계 결정 이력

| 날짜       | 결정                                                                   |
| ---------- | ---------------------------------------------------------------------- |
| 2026-05-28 | char.js + charStats.js → 5개 파일 분리 확정                            |
| 2026-05-28 | CHA_USEYN 완전 제거 결정                                               |
| 2026-05-28 | role: commander/adjutant/staff 3종                                     |
| 2026-06-01 | FRIEND 범위 1~200 확정                                                 |
| 2026-06-01 | FRIEND 판정: 차이 0~30절친/31~70친함/71~110보통/111~150불편/151~상극   |
| 2026-06-01 | CHA_IDEA 0~300 정치체제 6단계 확정                                     |
| 2026-06-02 | charBase+charStatus+charTender → charactersData.js 단일 파일 병합 결정 |
| 2026-06-02 | 파일 네이밍 char~ → characters~ 로 변경                                |
| 2026-06-02 | 다수 레코드 파일(Name/Desc/Jobs)은 병합 제외, 별도 파일 유지           |
| 2026-06-02 | charDetail.js / charTraits.js 삭제 예정 확정                           |
| 2026-06-04 | econ 필드 추가 (economyData.js 참조, 선호 경제체제)                    |

---

## TODO

- [ ] legacy/ 폴더 삭제 (병합 및 이전 완료 후)
- [ ] charactersData.js 560명 능력치/성향 입력 (주요 인물 우선)
- [ ] charactersJobs.js 주요 인물 직업 입력 (796_01 기준)
- [ ] gameStore.js CHAR_USEYN 참조 제거
- [ ] Step3CharSelect.vue → charList.js 기반 수정 완료 확인
- [ ] scenerio/796_01/charList.js faction/role 값 입력
