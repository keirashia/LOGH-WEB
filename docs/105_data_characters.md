# 인물 마스터 데이터
> 분류: 데이터
> 경로: `docs/105_data_characters.md`
> 상위: [100_DATA.md](100_DATA.md)
> 최종 수정: 2026-06-19

---

## 파일 목록

```
src/data/base/characters/
├── charactersData.js     인물 기본 스탯 (CHAR_BASE)
├── charactersJobs.js     인물-직업 관계 (CHAR_JOBS)
└── charactersTraits.js   인물-트레잇 관계 (CHAR_TRAITS)

src/data/base/jobs/
└── jobData.js            직업 마스터

src/data/base/trait/
└── traitData.js          트레잇 마스터 (22종)
```

---

## charactersData.js — 인물 기본값

### code 체계

```
CH_{6자리}  예) CH_000064 = 라인하르트 폰 뮤젤
```

### 스키마

```js
{
  // ── 기본 ──────────────────────────────────────────
  code:   "CH_000064",
  nameKr: "라인하르트 폰 뮤젤",
  nameEn: "Reinhard von Müsel",
  nameJp: "ラインハルト・フォン・ミューゼル",
  nickKr: "라인하르트",    // 게임 내 짧은 표기
  nickEn: "Reinhard",
  nickJp: "ラインハルト",
  searchKeys: [],     // 검색 키워드 (이칭·오기 등), 기본값 []
  birth:  "SE|743.05.14", // {yearType}|{year}.{mm}.{dd}
  death:  "SE|801.07.26", // 생존 중이면 null

  // ── 성향 ──────────────────────────────────────────
  faction: "REH",     // 소속 세력 코드
  idea:    "35",      // 이념 코드 (ideologyData.js)
  econ:    "100",     // 경제 코드
  brave:   "85",      // 배짱 (0~100)
  moral:   "70",      // 도덕성 (0~100)
  friend:  "120",     // 친밀도 초기값

  // ── 능력치 ────────────────────────────────────────
  statCmd: 95,   // 통솔 (함대 전투 기본)
  statCsm: 90,   // 카리스마
  statAtt: 92,   // 공격성
  statDef: 80,   // 방어성
  statFst: 88,   // 기동성
  statMng: 60,   // 행정
  statInf: 75,   // 정보
  statGfg: 85,   // 지상전
  statAfg: 90,   // 공중전 (전술)
  statMmp: 88,   // 사기 관리

  // ── 기타 ──────────────────────────────────────────
  loc:    "230058P01", // 현재 위치 행성 코드. 디폴트: 소속 세력 수도 행성
                       //   REH → 230058P01 (오딘), FPA → 230006P01 (하이네센)
                       //   PZN → 230042P01 (페잔), 소속 없음 → ""
  point:  "500",       // 포인트 (시나리오 해금 등에 사용)
  descKr: `...`,
  descEn: ``,
  descJp: ``,
}
```

### 능력치 항목

| 필드 | 의미 | 영향 범위 |
|---|---|---|
| statCmd | 통솔 | 함대 기본 전투력 |
| statCsm | 카리스마 | 사기·외교 |
| statAtt | 공격성 | 공세 판정 |
| statDef | 방어성 | 수세 판정 |
| statFst | 기동성 | 이동·기습 |
| statMng | 행정 | 국정·재정 |
| statInf | 정보 | 첩보·외교 |
| statGfg | 지상전 | 지상 전투 |
| statAfg | 공중전 | 전술 전투 |
| statMmp | 정략 | 정치력·의회 공작 |

---

## charactersJobs.js — 인물-직업 관계

```js
{
  charCode:   "CH_000064",
  jobCode:    "JB_M001",    // jobData.js 참조
  jobLevel:   0,
  jobExp:     0,
  jobStDate:  0,            // 취득 턴 (0=처음부터)
  jobEdDate:  0,            // 종료 턴 (0=영구)
}
```

1인 다직업 가능. 같은 charCode 항목을 여러 개 등록.

---

## charactersTraits.js — 인물-트레잇 관계

```js
{
  charCode:    "CH_000139",
  traitCode:   "TRC_U_000139",  // 고유 트레잇: TRC_U_{charCode 번호}
  traitLv:     0,
  traitExp:    0,
  traitStDate: 0,
  traitEdDate: null,            // null=영구
}
```

트레잇 종류: 성계 트레잇(traitData.js 22종) + 인물 고유 트레잇(TRC_U_*)

---

## 시나리오 오버라이드 (미구현)

시나리오별 인물 필드 변경 설계:

```
src/data/scenario/{id}/charOverride.js
```

- 이름 변경: 라인하르트 폰 뮤젤 → 라인하르트 폰 로엔그람 (796 이후)
- 파벌 변경: 귀족 탈주 등 이벤트 반영
- 구현 함수: `fncGetCharInfo(charCode, scenarioCode?)` — 현재 stub 상태

---

## TODO

- [ ] charOverride.js 설계 및 `fncGetCharInfo()` 구현
- [ ] 친밀도(intimacy) 시스템: 현재 등록 순서로 임시 정렬
- [ ] 인물 리팩토링: charBase/charTender/charDetail/charJobs/charTraits 분리 검토
- [ ] descEn/descJp 전체 미입력 — 추후 번역
