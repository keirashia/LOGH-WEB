# src/data/jobs — 직업 데이터 설계
> 작성: 2026-05-29

---

## 개요

인물이 보유할 수 있는 직업 마스터 데이터.
1인 다직업 가능. 경험치 누적 시 직업 변화 가능.
직업은 게임 내 행동 가능 범위와 능력치 보정에 영향.

---

## 파일 구조

```
src/data/jobs/
├── jobs.md      ← 이 파일
└── jobData.js   ← 직업 마스터
```

---

## jobData.js 스키마

```js
export const JOBS = [
  {
    id:       'JB_0001',
    nameKr:   '함대사령관',
    nameEn:   'Fleet Commander',
    category: 'military',     // military / noble / political / civilian / religious
    faction:  null,           // null=공통 / 'REH' / 'FPA' / 'PZN'
    effects: {
      CMD: 10,                // 능력치 보정 (해당 직업 보유 시 적용)
    },
    canCommand: true,         // 함대 지휘 가능 여부
    canGovern:  false,        // 성계 내정 가능 여부
    expToNext:  1000,         // 다음 단계 직업으로 변화하는 경험치 (null=변화 없음)
    nextJob:    null,         // 변화할 직업 ID
    desc: '함대를 지휘하는 사령관.',
  },
]
```

---

## 직업 목록

### 군사직 (military)

| id | nameKr | nameEn | canCommand | canGovern | desc |
|---|---|---|---|---|---|
| `JB_M001` | 함대사령관 | Fleet Commander | ✅ | ❌ | 함대 지휘 |
| `JB_M002` | 부관 | Adjutant | ❌ | ❌ | 함대 보조 |
| `JB_M003` | 참모 | Staff Officer | ❌ | ❌ | 내정/정보 보조 |
| `JB_M004` | 요새사령관 | Fortress Commander | ✅ | ❌ | 요새 방어 지휘 |
| `JB_M005` | 육전대장 | Ground Forces Commander | ✅ | ❌ | 행성 점령전 지휘 |
| `JB_M006` | 우주함대사령장관 | Space Fleet Commander | ✅ | ❌ | 동맹 최고 군사직 |
| `JB_M007` | 제국군원수 | Imperial Marshal | ✅ | ❌ | 제국 최고 군사직 |

---

### 귀족직 (noble) — REH 전용

| id | nameKr | nameEn | canCommand | canGovern | desc |
|---|---|---|---|---|---|
| `JB_N001` | 공작 | Duke | ✅ | ✅ | 최고위 귀족 |
| `JB_N002` | 후작 | Marquis | ✅ | ✅ | |
| `JB_N003` | 백작 | Count | ✅ | ✅ | |
| `JB_N004` | 자작 | Viscount | ✅ | ✅ | |
| `JB_N005` | 남작 | Baron | ❌ | ✅ | |
| `JB_N006` | 기사 | Knight | ❌ | ❌ | |

---

### 제국 정치직 (political) — REH 전용

| id | nameKr | nameEn | canCommand | canGovern | desc |
|---|---|---|---|---|---|
| `JB_R001` | 황제 | Kaiser | ❌ | ✅ | 은하제국 황제 |
| `JB_R002` | 제국재상 | Imperial Chancellor | ❌ | ✅ | |
| `JB_R003` | 내무상서 | Minister of Interior | ❌ | ✅ | |
| `JB_R004` | 군무상서 | Minister of Military Affairs | ❌ | ✅ | |
| `JB_R005` | 헌병총감 | Inspector General | ❌ | ✅ | |

---

### 동맹 정치직 (political) — FPA 전용

| id | nameKr | nameEn | canCommand | canGovern | desc |
|---|---|---|---|---|---|
| `JB_F001` | 최고평의회의장 | Chairman of the High Council | ❌ | ✅ | 동맹 최고 정치직 |
| `JB_F002` | 국방위원장 | Chairman of Defense Committee | ❌ | ✅ | |
| `JB_F003` | 각료 | Cabinet Member | ❌ | ✅ | |

---

### 페잔직 (political) — PZN 전용

| id | nameKr | nameEn | canCommand | canGovern | desc |
|---|---|---|---|---|---|
| `JB_P001` | 자치령총독 | Autonomous Governor | ❌ | ✅ | 페잔 최고직 |
| `JB_P002` | 페잔대리인 | Fezzan Agent | ❌ | ❌ | 정보/외교 |

---

### 종교직 (religious) — EAT 전용

| id | nameKr | nameEn | canCommand | canGovern | desc |
|---|---|---|---|---|---|
| `JB_E001` | 총대주교 | Patriarch | ❌ | ❌ | 지구교 최고직 |
| `JB_E002` | 사제 | Priest | ❌ | ❌ | |

---

### 일반직 (civilian)

| id | nameKr | nameEn | canCommand | canGovern | desc |
|---|---|---|---|---|---|
| `JB_C001` | 시민 | Civilian | ❌ | ❌ | |
| `JB_C002` | 상인 | Merchant | ❌ | ❌ | MNG 보정 |
| `JB_C003` | 학자 | Scholar | ❌ | ❌ | INF 보정 |

---

## 796_01 기준 주요 인물 직업

| CHA_CODE | 이름 | 직업 |
|---|---|---|
| CH_000064 | 라인하르트 | JB_M007(원수), JB_N003(백작) |
| CH_000266 | 양 웬리 | JB_M006(우주함대사령장관) |
| CH_000173 | 미터마이어 | JB_M001(함대사령관), JB_N004(자작) |
| CH_000301 | 로이엔탈 | JB_M001(함대사령관), JB_N004(자작) |
| CH_000388 | 키르히아이스 | JB_M001(함대사령관) |
| CH_000481 | 오베르슈타인 | JB_M003(참모) |
| CH_000055 | 드와이트 그린힐 | JB_M001(함대사령관) |
| CH_000174 | 부시아스 아둘라 | JB_F003(각료) |
| CH_000255 | 알렉스 카젤느 | JB_F003(각료) |
| CH_000004 | 가짜 총대주교 | JB_E001(총대주교) |

---

## 설계 결정 이력

| 날짜 | 결정 |
|---|---|
| 2026-05-29 | src/data/jobs/ 별도 폴더로 분리 |
| 2026-05-29 | 직업 카테고리: military/noble/political/civilian/religious |
| 2026-05-29 | canCommand/canGovern으로 행동 범위 정의 |
| 2026-05-29 | expToNext/nextJob으로 직업 변화 설계 |
| 2026-05-29 | 엑셀 직업 데이터 없음 → 원작 기반 수동 입력 |

---

## TODO

- [ ] jobData.js 생성 (위 목록 기반)
- [ ] charJobs.js 생성 시 796_01 주요 인물 직업 입력
- [ ] 직업별 능력치 보정 수치 확정
- [ ] expToNext 수치 확정 (직업 변화 경험치)
- [ ] 귀족직 세부 영지 시스템 연동 여부 결정
