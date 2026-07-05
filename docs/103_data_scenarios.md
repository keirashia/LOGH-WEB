# 시나리오 데이터
> 분류: 데이터
> 경로: `docs/103_data_scenarios.md`
> 상위: [100_DATA.md](100_DATA.md)
> 최종 수정: 2026-07-05

---

## 파일 구조

```
src/data/scenario/
├── scenarioData.js              시나리오 메타 목록 (SCENARIOS)
├── SE640/01/                    SE 640년 시나리오 (TODO: 데이터 미입력)
│   ├── starDetail.js
│   └── planetDetail.js
├── SE745/01/                    SE 745년 시나리오 (TODO: 데이터 미입력)
│   ├── starDetail.js
│   └── planetDetail.js
├── SE795/
│   └── 0913/
│       └── 010/                 ← ID SE795_0913_010 (제4차 티아마트 회전)
│           └── (파일 미생성 — TODO)
└── SE796/
    └── 0211/
        ├── 010/                 ← ID SE796_0211_010 (아스타테 — 정사 그룹)
        │   ├── scenarioDesc.js  → export _DESC_SE796_010
        │   ├── cliqueData.js
        │   ├── stars/
        │   │   ├── starDetail.js
        │   │   └── planetDetail.js
        │   ├── characters/
        │   │   ├── charactersData.js   등장 인물 코드 목록 (CHAR_LIST)
        │   │   └── charactersJobs.js   시나리오 직책 오버라이드 (CHAR_JOBS)
        │   └── fleet/
        │       ├── fleetData.js        (charList/shipList 내장, [106_data_fleet.md](106_data_fleet.md) 참조)
        │       └── fleetTraitData.js
        └── 011/                 ← ID SE796_0211_011/012/013/014 (아스타테 — 가상 그룹, 파일 미생성 TODO)
```

> 위 `010/` 구조가 현재 시나리오 폴더의 표준 형태 (2026-07-02 스키마 개편 반영: `charList.js`→`characters/charactersData.js`,
> `fleetCharacterData.js`/`fleetShipData.js` 삭제 후 `fleetData.js`에 통합, `starDetail.js`/`planetDetail.js`는 `stars/` 서브폴더로 이동).
> 신규 시나리오 폴더는 이 구조를 따를 것.

> **폴더 ↔ ID 1:1 매핑**: `SE796_0211_010` → `SE796/0211/010/`  
> `id.split('_')` → `[y, m, s]` → `${y}/${m}/${s}/`  
> gameStore `_loadScenarioFiles(scId)` 에서 동적 import (Promise.allSettled + @vite-ignore)

---

## scenarioData.js — 시나리오 메타

### 스키마

```js
{
  yearType:    "SE",                  // "AD" | "SE" (우주력)
  year:        796,
  month:       2,
  date:        11,                    // 시작 일자 (신규 — 연월일 모두 표기 가능)
  id:          "SE796_0211_010",      // PK. {yearType}{year}_{MMDD}_{seq3자리}
                                      //   MMDD = 월2자리+일2자리 (2월11일 → 0211)
                                      //   seq  = 3자리 zero-pad (10번째 → 010)
  nameKr:      "아스타테 회전",
  nameEn:      "Battle of Astarte",
  nameJp:      "アスターテ会戦",
  subTitle:    "영원한 어둠 속에서",   // variant 구분 부제
  summary:     "...",                 // 시나리오 한 줄 요약 (ScenarioOptionsView 표시)
  tags:        ["사실", "초심자추천"], // 사실|가상, 전략|전술|혼합, 초심자추천|숙련자추천
  factions:    ["REH", "FPA", "PZN"], // 등장 세력
  useYn:       true,                  // false = 연표 표시만, 선택 불가
  showYn:      true,                  // false = 연표 미노출. 같은 variants 그룹의
                                      //   showYn:true 시나리오 options 화면에서만 접근 가능.
                                      //   (연표에서 직접 선택 불가능한 종속 variant)
  openPt:      0,                     // 활성화 필요 포인트.
                                      //   0   = 상시 무료
                                      //   N   = N포인트 구매 필요
                                      //   "-" = 포인트 아닌 업적 기반 해금
  appearances: ["은하영웅전설 1권 <여명편>"],
  desc:        _DESC_SE796_010,       // 시나리오 소개 슬라이드 (scenarioDesc.js import)
  variants:    "SE796_01",            // 같은 시기·사건 variant 그룹 키 (문자열)
                                      //   형식: {yearType}{year}_{seq2자리}
                                      //   ScenarioOptionsView에서 동일 키를 가진 시나리오를 동적 조회
}
```

### 플레이 가능 시나리오 (useYn: true)

| id | 연도/월/일 | 이름 | subTitle | showYn | openPt | 분류 |
|---|---|---|---|---|---|---|
| SE795_0913_010 | SE 795.9.13 | 제4차 티아마트 회전 | 주둔함대 출격하다 | true | "0" | 사실 |
| SE796_0211_010 | SE 796.2.11 | 아스타테 회전 | 영원한 어둠 속에서 | true | "0" | 사실, 초심자추천 |
| SE796_0211_011 | SE 796.2.11 | 아스타테 회전 | 노원수 오다 | false | "1000" | 가상 |
| SE796_0211_012 | SE 796.2.11 | 아스타테 회전 | 주둔함대 출격하다 | false | "-" | 가상, 업적 해금 |
| SE796_0211_013 | SE 796.2.11 | 아스타테 회전 | 젊은 사자들 | false | "-" | 가상, 업적 해금 |
| SE796_0211_014 | SE 796.2.11 | 아스타테 회전 | 라프 함대 출격하다. | false | "-" | 가상 (showYn:false) |

> `variants: "SE795_01"` — SE795_0913_010 단독 그룹  
> `variants: "SE796_01"` — SE796_0211_010~014 동일 그룹. `showYn: false`는 연표 미노출  
> SE796_0211_014는 useYn:true지만 showYn:false — 다른 variant 화면에서만 접근 가능
>
> AD 시대 시나리오는 모두 useYn: false — 연표 전시 전용
>
> **SE640/SE745 플레이 가능 시나리오는 데이터 입력 후 별도 추가**

---

## 시나리오 하위 파일

### starDetail.js

성계 초기 상태. STAR_DETAIL 배열.

```js
{
  code:    '230006',
  faction: 'FPA',      // 지배 세력 코드
  morale:  80,         // 사기 (0~100)
  tax:     35,         // 세율 (%)
  traits:  [
    { traitId:'ANCIENT_CAPITAL', startTurn:0, endTurn:null }
  ],
}
```

**morale 기준값:**
- 수도/거점: 75~85 / 변경 성계: 60~70 / 분쟁/중립: 45~60

**tax 기준값:**
- REH: 28~30% / FPA: 33~35% / PZN: 20% / 중립: 0%

### characters/charactersData.js

시나리오에 등장하는 인물 코드 목록 (`CHAR_LIST`). 게임 로비 인물 선택 화면에서 동적 import.

### characters/charactersJobs.js

시나리오 시작 시점의 직책 초기값 (`CHAR_JOBS`). `gameStore._loadScenarioFiles()`에서 동적 import.
- `currentPost` (string): 1순위 직책 — 결재체인·승인 등 게임 로직용
- `currentPosts` (array): 전체 직책 목록 — CharInfoPanel 표시용
- 파일 없는 경우 `base/characters/charactersJobs.js` 폴백 (buildState 내부에서 처리)

### fleet/ 서브폴더

함대 초기값(charList/shipList 내장) + 트레잇 2개 파일로 구성. 상세는 [106_data_fleet.md](106_data_fleet.md) 참조.

### 인물 직책 오버라이드 예시 (SE796_0211_010)

베이스 직책과 다른 경우만 `charactersJobs.js`에 등록.

| 인물 | charCode | 직책 코드 | 비고 |
|---|---|---|---|
| 양 웬리 | CH_000266 | JB_MR005, JB_C001 | 아스타테 당시 소장/전략고문. 함대 소속은 `fleet/fleetData.js`의 FPA002 charList에서 파생 |

---

## TODO

- [ ] SE640/01, SE745/01 시나리오 데이터 입력 (starDetail 빈값)
- [ ] 가상 시나리오(SE796_0211_011/013/014) 업적 해금 조건 설계 (`openPt: "-"` 처리 로직 포함)
- [ ] charOverride.js 설계 — 시나리오별 인물 오버라이드 (이름/파벌 변경)
- [ ] **삭제 대상**: `src/views/lobby/scenario/legacy/ScenarioSelectView.vue`, `Step3CharSelect.vue` — router `scenario-select` 대체 후 삭제
