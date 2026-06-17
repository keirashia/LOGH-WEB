# 시나리오 데이터
> 분류: 데이터
> 경로: `docs/103_data_scenarios.md`
> 상위: [100_DATA.md](100_DATA.md)
> 최종 수정: 2026-06-17

---

## 파일 구조

```
src/data/scenario/
├── scenarioData.js           시나리오 메타 목록 (SCENARIOS)
├── SE640/01/                 SE 640년 시나리오 01
│   ├── starDetail.js
│   └── planetDetail.js
├── SE745/01/                 SE 745년 시나리오 01
│   ├── starDetail.js
│   └── planetDetail.js
└── SE796/
    ├── 01/                   SE 796년 시나리오 01 (아스타테 — 정사)
    │   ├── starDetail.js
    │   ├── planetDetail.js
    │   ├── charList.js
    │   ├── scenarioDesc.js
    │   └── fleet/
    │       ├── fleetData.js
    │       ├── fleetCharacterData.js
    │       ├── fleetShipData.js
    │       └── fleetTraitData.js
    └── 10/                   SE 796년 시나리오 10 (아스타테 — 가상)
        └── (동일 구조)
```

---

## scenarioData.js — 시나리오 메타

### 스키마

```js
{
  yearType:    "SE",           // "AD" | "SE" (우주력)
  year:        796,
  month:       1,
  id:          "SE796_01",    // PK. {yearType}{year}_{seq}
  nameKr:      "아스타테 회전",
  nameEn:      "Battle of Astarte",
  nameJp:      "アスターテ会戦",
  tags:        ["사실", "초심자추천"],  // 사실|가상, 전략|전술|혼합, 초심자추천|숙련자추천
  factions:    ["REH", "FPA", "PZN"],  // 등장 세력
  useYn:       true,           // false = 연표 표시만, 선택 불가
  showYn:      true,           // false = 조건 미달 시 숨김
  openPt:      0,              // 활성화 필요 포인트 (0 = 상시)
  appearances: ["은하영웅전설 1권 <여명편>"],
  desc:        [],             // 시나리오 소개 슬라이드 (scenarioDesc.js 참조)
}
```

### 플레이 가능 시나리오 (useYn: true)

| id | 연도 | 이름 | 분류 |
|---|---|---|---|
| SE640_01 | SE 640 | (이제르론 함락 전) | 사실 |
| SE796_01 | SE 796 | 아스타테 회전 | 사실, 초심자추천 |
| SE796_10 | SE 796 | 아스타테 회전 (가상) | 가상, openPt=1000 |
| SE796_11 | SE 796 | 가상 분기 01 | 가상, openPt=1000 |
| SE796_12 | SE 796 | 가상 분기 02 | 가상, openPt=1000 |

> AD 시대 시나리오는 모두 useYn: false — 연표 전시 전용

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

### charList.js

시나리오에 등장하는 인물 코드 목록. 게임 초기화 시 해당 목록의 인물만 활성화.

### fleet/ 서브폴더

함대 초기값 4개 파일로 구성. 상세는 [106_data_fleet.md](106_data_fleet.md) 참조.

---

## TODO

- [ ] SE640/01, SE745/01 시나리오 데이터 입력 (starDetail 빈값)
- [ ] 시나리오 분기(SE796_11/12) 가상 전제 조건 설계
- [ ] charOverride.js 설계 — 시나리오별 인물 오버라이드 (이름/파벌 변경)
