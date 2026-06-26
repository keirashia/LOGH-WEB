# 성계 / 항로 / 행성 데이터
> 분류: 데이터
> 경로: `docs/102_data_stars.md`
> 상위: [100_DATA.md](100_DATA.md)
> 최종 수정: 2026-06-27

---

## 파일 목록

```
src/data/base/stars/
├── starSystemData.js    성계 마스터 (93개+, 230001~230093)
├── laneData.js          항로 마스터 (118개+)
├── planetsData.js       행성 마스터 (코드 체계 정의, 좌표 미완성)
├── code_map.json        구 id → 새 code 변환 대조표
└── maps/
    ├── starMaps.js      STAR_MAPS 배열 + STAR_MAP_BY_ID/CODE Map
    ├── index.js         개별 파일 re-export
    └── 230001_ALMENTPUVEL.js ~ 230062_VILLENSTEIN.js  (62개 개별 파일)
```

---

## starSystemData.js — 성계 마스터

### 스키마

```js
{
  code:   "230001",          // 6자리 고유 코드 (230001~230062, ABC순)
  nameKr: "알멘트푸벨",
  nameEn: "ALMENTPUVEL",
  nameJp: "",                // ⚠️ 62개 전체 미입력
  alias:  ["알멘트푸벨", "Almentpuvel", "ALMENTPUVEL"],  // 검색용 한영일 모두 포함
  x: 1120,                   // GalaxyMap 픽셀 좌표 (VW=1600 기준)
  y: 450,                    // GalaxyMap 픽셀 좌표 (VH=1000 기준)
  desc: "...",
}
```

### 좌표 체계

- 전체 맵: **VW=1600, VH=1000** (px)
- x: 0(서쪽) → 1600(동쪽) / y: 0(북쪽) → 1000(남쪽)
- 제국 영토: 맵 우측(x 높음), 동맹 영토: 맵 좌측(x 낮음), 페잔: 중앙

### 성계 코드 전체 (62개)

```
230001=ALMENTPUVEL   230002=ALTENER      230003=AMLITZER
230004=ARESHYUM      230005=ASTADE       230006=BAARAT
230007=BARATULF      230008=BODEN        230009=BRUNSCHWEIG
230010=DAGON         230011=DOSORIA      230012=ECKHART
230013=ECRUSHYLA     230014=EISENHERZ    230015=EISENHUT
230016=ELGON         230017=ELPACIL      230018=FIREZIERD
230019=FREYA         230020=GANDHARVA    230021=HAN
230022=ISERLOHN      230023=JAMSID       230024=JOTUNHEIM
230025=KAPCHE_LANKA  230026=KASTROP      230027=KERUM
230028=KIPOIZER      230029=LEGNICA      230030=LICHTENLADE
230031=LIPPSTADT     230032=LITTENHEIM   230033=LOPODEN
230034=LUNVINI       230035=LUYKAS       230036=LUYKAS_FPA
230037=MARADEITA     230038=MARBACH      230039=MARIENDORF
230040=NEUE_LAND     230041=PALANTIA     230042=PHEZZAN
230043=PHOREVIT      230044=PORGEN       230045=RAIGAR
230046=RANTEMARIO    230047=RIOPUERDE    230048=SHACHEN
230049=SHANDARA      230050=SHANDOW      230051=SHIVA
230052=SPAHLA        230053=TANATOS      230054=TASIRI
230055=TIAMAT        230056=TRABAH       230057=TRIPOLA
230058=VALHALLA      230059=VANDENBERG   230060=VANFLEET
230061=VERMILION     230062=VILLENSTEIN
```

구 id → 새 code 변환: `src/data/base/stars/code_map.json` 참조

---

## laneData.js — 항로 마스터

### 스키마

```js
{
  id:        'LANE_001',
  stars:     ['230022', '230055'],  // 연결 성계 code 2개
  type:      'corridor',            // corridor | phezzan | normal
  period:    2,                     // 이동 소요 턴
  stability: 55,                    // 항로 안정도 (0~100)
}
```

### type 규칙

| type | 설명 | period | stability | 해당 항로 |
|---|---|---|---|---|
| corridor | 이제르론 회랑 | 2 (고정) | 55 | LANE_001~004 (4개) |
| phezzan | 페잔 회랑 | 3 (고정) | 70 | LANE_005~006 (2개) |
| normal | 일반 항로 | 1 또는 2 | 45 | 나머지 |

### 회랑 항로

```
LANE_001  ISERLOHN ↔ TIAMAT      corridor
LANE_002  ISERLOHN ↔ VANFLEET    corridor
LANE_003  ISERLOHN ↔ ARESHYUM    corridor
LANE_004  ISERLOHN ↔ AMLITZER    corridor
LANE_005  PHEZZAN  ↔ SCHATTENBURG  phezzan   ← 230065 (미등록 성계)
LANE_006  PHEZZAN  ↔ LICHTENBERG   phezzan   ← 230066 (미등록 성계)
```

### 추가 성계 (230063~, 2026-06-25~27 등록)

원작 나무위키 지명 문서 근거로 동맹 외곽 등 위치 비정하여 추가:

| code | nameEn | nameKr | 좌표 | 비고 |
|---|---|---|---|---|
| 230063 | KERIM | 케림 | x:200, y:190 | 기존 laneData 참조 성계 |
| 230065 | SCHATTENBURG | 샤텐부르크 | — | 페잔 회랑 LANE_005 참조 |
| 230066 | LICHTENBERG | 리히텐베르크 | — | 페잔 회랑 LANE_006 참조 |
| 230067 | MÜKKENBERGER | 뮈켄베르거 | — | LANE_025 참조 |
| 230068 | FORSETI | 포르세티 | x:640, y:560 | 기존 laneData 참조 성계 |
| 230089 | REZAVIK | 레자빅 | x:200, y:290 | 케림↔버밀리온 사이 수직선상 |
| 230093 | NISHUHIDERS | 닛슈우히더스 | — | 동맹 외곽 |

> 230065~230067은 starSystemData.js 미등록 상태 (laneData 참조만 존재).

### 레자빅 (230089) 좌표 배치 근거

```
케림     (230063)  x:200, y:190
레자빅   (230089)  x:200, y:290  ← 케림 6시 / 버밀리온 12시 방향, 각 100px
버밀리온 (230061)  x:200, y:390
```

- LANE_118 (버밀리온↔레자빅): period:1 (100px < 200px 기준)

---

## planetsData.js — 행성 마스터

### 스키마 주의 (2026-06-25 2차 개편)

`name` 필드가 다국어 배열로 변경됨:
```js
// 변경 후 (현행)
name: [ { code: "Kr", context: "하이네센" }, { code: "En", context: "HEINESSEN" } ]

// 변경 전 (구형)
nameKr: "하이네센", nameEn: "HEINESSEN"
```

`gameStore.js`의 planets 빌드 로직이 배열 → `nameKr`/`nameEn` 플랫 필드로 자동 변환하므로,  
컴포넌트는 기존대로 `p.nameKr` 사용 가능.

### code 체계

```
행성 코드: {starCode}P{seq}
예시: 230006P01 = BAARAT(하이네센 성계) 첫 번째 행성
```

### 주요 행성 (현황)

starMaps.js 기준 실제 배치된 행성:

| 성계 code | 성계명 | 주요 행성 | planet.type |
|---|---|---|---|
| 230006 | BAARAT (바라트) | 하이네센 | capital |
| 230042 | PHEZZAN (페잔) | 페잔 | capital |
| 230058 | VALHALLA (발할라) | 오딘 | capital |
| 230022 | ISERLOHN (이제르론) | 이제르론 요새 | fortress |
| 230002 | ALTENER (알테너) | 가이에스부르크 요새 | fortress |
| 230055 | TIAMAT (티아매트) | 라므 (티아매트 요새) | fortress |
| 나머지 | - | 일반 행성 | terrestrial |

> ⚠️ planetsData.js의 좌표/size/type은 미완성. 실제 배치 데이터는 **starMaps.js**가 기준.

---

## maps/ — 성계 세부맵

### 데이터 구조

각 성계마다 개별 파일 + `starMaps.js`에 전체 통합.

```js
// starMaps.js
export const STAR_MAPS = [ ... ]                    // 62개 배열
export const STAR_MAP_BY_ID   = { ISERLOHN: {...} } // nameEn 기준 Map
export const STAR_MAP_BY_CODE = { '230022': {...} } // code 기준 Map
```

### STAR_MAP 스키마

```js
{
  id:      'ISERLOHN',          // nameEn
  code:    '230022',
  nameKr:  '이제르론',
  nameEn:  'ISERLOHN',
  mapSize: [1000, 1000],        // 전 성계 통일
  nebulae: [
    { x, y, r, color: 'rgba(R,G,B,', alpha }  // color는 rgba 앞부분만
  ],
  planets: [
    {
      nameKr:  '이제르론',
      nameEn:  '',
      main:    true,            // 주행성 여부 (성계 대표 행성)
      type:    'fortress',      // capital | fortress | terrestrial
      fortress: 'ISERLOHN',    // fortress명 | null
      x: 500, y: 500,          // 세부맵 내 좌표 (0~1000)
      size: 50,                 // 반지름 px (capital=55, fortress=50, main=42, sub=22~32)
    }
  ],
}
```

### planet.size 기준

| 유형 | size |
|---|---|
| capital (수도: 오딘/하이네센/페잔) | 55 |
| fortress (요새: 이제르론/가이에스부르크/티아매트) | 50 |
| 일반 주행성 (main=true) | 42 |
| 일반 부행성 (main=false) | 22~32 |

---

## TODO

- [ ] `nameJp` 전체 미입력
- [ ] 미등록 성계 3개(230065/066/067) starSystemData.js에 추가
- [ ] code 중복 의심 3건 원작 확인: 230002(ALTENER)/230035(LUYKAS)/230037(MARADEITA)
- [ ] planetsData.js 좌표/size/type starMaps.js 기준으로 동기화
- [ ] starsData.js (LEGACY) 삭제 — encyclopediaStore 참조 여부 확인 후
