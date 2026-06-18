# 시나리오 데이터
> 분류: 데이터
> 경로: `docs/103_data_scenarios.md`
> 상위: [100_DATA.md](100_DATA.md)
> 최종 수정: 2026-06-18

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
└── SE796/
    └── 0211/
        ├── 010/                 ← ID SE796_0211_010 (아스타테 — 정사 그룹)
        │   ├── starDetail.js
        │   ├── planetDetail.js
        │   ├── scenarioDesc.js  → export _DESC_SE796_010
        │   ├── charList.js      등장 인물 코드 목록 (CHAR_LIST)
        │   └── fleet/
        │       ├── fleetData.js
        │       ├── fleetCharacterData.js
        │       ├── fleetShipData.js
        │       └── fleetTraitData.js
        └── 011/                 ← ID SE796_0211_011/013/014 (아스타테 — 가상 그룹)
            ├── starDetail.js
            ├── scenarioDesc.js
            ├── charList.js
            ├── characters/
            │   ├── charactersData.js
            │   └── charactersJobs.js
            └── fleet/
                ├── fleetData.js
                ├── fleetCharacterData.js
                ├── fleetShipData.js
                └── fleetTraitData.js
```

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
  showYn:      true,                  // false = 연표 미노출 (조건 달성 후 표시 예정)
  openPt:      0,                     // 활성화 필요 포인트.
                                      //   0   = 상시 무료
                                      //   N   = N포인트 구매 필요
                                      //   "-" = 포인트 아닌 업적 기반 해금
  appearances: ["은하영웅전설 1권 <여명편>"],
  desc:        _DESC_SE796_010,       // 시나리오 소개 슬라이드 (scenarioDesc.js import)
  variants:    ["SE796_01"],          // 같은 시기·사건 variant들의 그룹 키
                                      //   형식: {yearType}{year}_{seq2자리} (하위호환 키)
}
```

### 플레이 가능 시나리오 (useYn: true)

| id | 연도/월/일 | 이름 | subTitle | showYn | openPt | 분류 |
|---|---|---|---|---|---|---|
| SE796_0211_010 | SE 796.2.11 | 아스타테 회전 | 영원한 어둠 속에서 | true | 0 | 사실, 초심자추천 |
| SE796_0211_011 | SE 796.2.11 | 아스타테 회전 | 노원수 오다 | false | "-" | 가상, 업적 해금 |
| SE796_0211_013 | SE 796.2.11 | 아스타테 회전 | 주둔함대 출격하다 | false | "-" | 가상, 업적 해금 |
| SE796_0211_014 | SE 796.2.11 | 아스타테 회전 | (브라운슈바이크 분기) | false | "-" | 가상, 업적 해금 |

> `variants: ["SE796_01"]` — 위 4개 시나리오가 같은 그룹. `showYn: false`인 3개는 연표 미노출 (기준 시나리오 클리어 후 해금 예정)
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

함대 초기값 4개 파일로 구성. 상세는 [106_data_fleet.md](106_data_fleet.md) 참조.

---

## TODO

- [ ] SE640/01, SE745/01 시나리오 데이터 입력 (starDetail 빈값)
- [ ] 가상 시나리오(SE796_0211_011/013/014) 업적 해금 조건 설계 (`openPt: "-"` 처리 로직 포함)
- [ ] charOverride.js 설계 — 시나리오별 인물 오버라이드 (이름/파벌 변경)
- [ ] SE796/01/characters/ 폴더 생성 및 charList.js 마이그레이션
- [ ] **삭제 대상**: `src/views/lobby/scenario/legacy/ScenarioSelectView.vue`, `Step3CharSelect.vue` — router `scenario-select` 대체 후 삭제
- [ ] **삭제 대상**: `src/data/scenario/SE796/10/charList.js` — characters/charactersData.js 로 이전 완료
