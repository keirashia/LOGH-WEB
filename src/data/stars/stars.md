# src/data/stars — 성계 마스터 데이터

## 개요

성계(星系)·항로·행성에 관한 불변 마스터 데이터. 게임 초기화 시 `scenarios/S01/starDetail.js`와 병합해 `game.systems`를 구성한다.

---

## 파일 목록

| 파일 | 상태 | 설명 |
|---|---|---|
| `starSystemData.js` | ✅ 완성 | 62개 성계 마스터 (불변) |
| `lane.js` | ✅ 완성 | 항로 마스터, type/period/stability 포함 |
| `planetsData.js` | ⚠️ 부분 | 102개 행성, 간다르바(3개)만 좌표/type 완성 |
| `starsData.js` | ❌ LEGACY | 삭제 예정, 현재 미참조 |
| `maps/` | ✅ 완성 | 62개 성계 세부맵 |

---

## starSystemData.js

역할: 성계 불변 마스터 — 변경 금지

| 키 | 타입 | 설명 |
|---|---|---|
| `code` | string | PK, 6자리 ABC순 (230001~230062) |
| `nameKr` | string | 한국어 명칭 |
| `nameEn` | string | 영문 명칭 (gineipaedia 위키 기준) |
| `nameJp` | string | 일본어 명칭 (추후 입력) |
| `x` | number | 갤럭시맵 X 좌표 |
| `y` | number | 갤럭시맵 Y 좌표 |
| `mapSize` | number[2] | 성계 세부맵 크기 (기본 `[800, 800]`) |
| `type` | string | capital / fortress / frontier / normal / noble / contested / neutral |
| `desc` | string | 성계 설명 |

> `isGateway` 제거됨 → `lane.type` (corridor/phezzan)으로 판단  
> `fortress` 제거됨 → `planetsData.js`의 `planet.fortress`로 이동

### 좌표 범위 (viewBox 기준)

| 항목 | 값 |
|---|---|
| SVG viewBox | `0 0 1600 1000` |
| 전체 범위 | x: 110~1510, y: 156~900 |
| 성계 반경 | capital=16, fortress=13, 기타=10 |
| 성계 간 최소 거리 | 80px 이상 (팻핑거 방지) |

구 820×490 대비 x2 스케일 (2026-05-27 적용). 변환식: `newX = oldX × 2, newY = oldY × 2`

### 코드 체계

```
성계 코드: 230001 ~ 230062  (6자리, ABC순, unique)
행성 코드: {starCode}P{seq}  (예: 230006P01)

230001=ALMENTPUVEL  230002=ALTENER    230003=AMLITZER
230004=ARESHYUM     230005=ASTADE     230006=BAARAT (GANDHARVA)
...
230058=VALHALLA     230059=VANDENBERG 230060=VANFLEET
230061=VERMILION    230062=VILLENSTEIN
```

구 id → 새 code 변환: `src/data/stars/json/code_map.json` 참조

---

## lane.js

역할: 항로 마스터 (불변)

| 키 | 타입 | 설명 |
|---|---|---|
| `id` | string | LANE_001 ~ LANE_NNN |
| `stars` | string[2] | 연결 성계 code 2개 (예: `['230001','230022']`) |
| `type` | string | normal / corridor / phezzan |
| `period` | number | 이동 소요 턴 (1~3) |
| `stability` | number | 기본 안정도 (0~100) |

```js
import { LANE_DEF } from '@/data/stars/lane'
```

### 항로 type — 렌더링 스펙

| type | 색상 | 선두께 | 대시 | 의미 |
|---|---|---|---|---|
| `corridor` | `rgba(100,200,255,0.55)` | 2px | `8 4` | 이젤론 회랑 |
| `phezzan` | `rgba(212,170,96,0.60)` | 2px | `4 3` | 페잔 회랑 |
| `normal` | `rgba(255,255,255,0.35)` | 1.5px | `5 6` | 일반 항로 |

편집모드 ON: 전체 `rgba(255,255,255,0.65)`, 2px, 대시 없음

### period 기준

```
corridor: 2턴
phezzan:  3턴
normal:   거리 기반
  dist < 200px  → 1턴
  dist < 440px  → 2턴
  dist ≥ 440px  → 3턴
```

### stability 기준

```
corridor:  55
phezzan:   70
normal:
  수도(capital) 인접: 85
  일반(normal/noble): 70
  프론티어/중립:       60
  분쟁(contested):    40
```

stability 최종 = 기본값 + 사령관 운영력 보정 + 시설 보정  
물자 손실 이벤트 확률 = (100 - 최종 stability) / 100

---

## planetsData.js

역할: 행성 불변 마스터 — 변경 금지

| 키 | 타입 | 설명 |
|---|---|---|
| `code` | string | PK (230001P01 형식) |
| `starCode` | string | FK → starSystemData.code |
| `nameKr` | string | 한국어 명칭 |
| `nameEn` | string | 영문 명칭 |
| `nameJp` | string | 일본어 명칭 |
| `type` | string | 행성 유형 |
| `main` | boolean | 대표 행성 여부 |
| `fortress` | string\|null | 요새 ID (ISERLOHN/GAISHBURG/TIAMAT/null) |
| `x` | number | 성계 세부맵 내 X 좌표 |
| `y` | number | 성계 세부맵 내 Y 좌표 |
| `size` | number | 행성 표시 반경 (px) |

### 시설(building) 연동 예정

```
building.js         → 건물 종류 정의
planetBuildData.js  → 행성별 건물 rowData (건물 1개당 1행)
행성이 보유 가능한 건물 수 = planet.size 기준
```

---

## maps/ 폴더

62개 성계의 세부맵 데이터. 파일명: `{code}_{ID}.js`

```js
import { getStarMapByCode } from '@/data/stars/maps/index.js'
const map = getStarMapByCode('230020')  // GANDHARVA
// → { id, code, mapSize: 1000, nebulae: [...], planets: [...] }
```

---

## DB 테이블 구조 (LOGH-API)

### 마스터 (불변)

```
TBL_STAR_SYSTEM       ← starSystemData.js
TBL_PLANET            ← planetsData.js
TBL_LANE              ← lane.js (항로 속성)
TBL_LANE_STAR         ← lane.js (junction, SEQ 포함)
TBL_FACTION           세력 5개 (REH/FPA/PZN/EAT/RAG)
TBL_IDEOLOGY          정치이념 21종
TBL_CHARACTER         인물 560명
TBL_CHARACTER_STAT    인물 스탯
TBL_PLANET_TRAIT      행성 트레잇 (PLANET_CODE + TRAIT_ID 복합키)
TBL_STAR_TRAIT        성계 트레잇 (STAR_CODE + TRAIT_ID 복합키)
```

```sql
CREATE TABLE IF NOT EXISTS TBL_PLANET_TRAIT (
  PLANET_CODE  TEXT    NOT NULL,
  TRAIT_ID     TEXT    NOT NULL,
  START_TURN   INTEGER NOT NULL DEFAULT 0,
  END_TURN     INTEGER,          -- null = 영구
  PRIMARY KEY (PLANET_CODE, TRAIT_ID)
);
CREATE TABLE IF NOT EXISTS TBL_STAR_TRAIT (
  STAR_CODE    TEXT    NOT NULL,
  TRAIT_ID     TEXT    NOT NULL,
  START_TURN   INTEGER NOT NULL DEFAULT 0,
  END_TURN     INTEGER,
  PRIMARY KEY (STAR_CODE, TRAIT_ID)
);
```

### 시나리오 (초기값)

```
TBL_SCENARIO          시나리오 메타
TBL_SCENARIO_PLANET   ← S0N/planetDetail.js
TBL_SCENARIO_LANE     시나리오별 항로 초기 상태 (필요 시)
```

### 게임 세션 (진행값)

```
TBL_GAME_SESSION         세이브 메타
TBL_GAME_SESSION_PLAYER  멀티 플레이어 (SESSION+FACTION 복합키)
TBL_GAME_PLANET          ← {uuid}_{seq}/planetDetail.js
TBL_GAME_LANE            항로 상태 (active/blocked)
TBL_GAME_FLEET           함대 상태
TBL_GAME_CHARACTER       인물 상태
TBL_GAME_RESOURCE        자원
TBL_GAME_LOG             이벤트 로그
```

### View

```
VW_LANE   TBL_LANE + TBL_LANE_STAR → STAR_A, STAR_B 컬럼으로 조회
```

### 유저/멀티

```
TBL_USER_MAIN   유저 (TRANSFER_CODE 포함)
TBL_SEASON      멀티플레이 시즌
```

---

## 설계 결정 이력

| 날짜 | 결정 |
|---|---|
| 2026-05-26 | starSystemDetail.js 제거 — 불필요 확정 |
| 2026-05-26 | faction = 소속 행성 다수결로 파생 |
| 2026-05-26 | morale/tax = 행성별 관리, 성계는 평균 파생 |
| 2026-05-26 | 성계 코드 230001~ (6자리 ABC순) |
| 2026-05-26 | 행성 코드 {starCode}P{seq} (P01~P99) |
| 2026-05-26 | Lane DB: TBL_LANE + TBL_LANE_STAR + VW_LANE |
| 2026-05-26 | 시나리오: S01/ 폴더, 세이브: {uuid}_{seq}/ 폴더 |
| 2026-05-26 | nameEn = gineipaedia 위키 공식 영문명 기준 |
| 2026-05-26 | isGateway 제거 → lane type으로 판단 |
| 2026-05-26 | fortress 제거(성계) → planetsData.fortress로 이동 |
| 2026-05-27 | 맵 사이즈 800×500 → 1600×1000 (팻핑거 방지) |
| 2026-05-27 | 성계 간 최소 거리 80px 이상 확보 (전 62개) |
| 2026-05-27 | 항로 type별 색상/대시 구분 (corridor/phezzan/normal) |

---

## TODO

| 우선순위 | 항목 |
|---|---|
| 🔴 | **성계 좌표 수정 미반영**: starSystemData.js 좌표 수정 후 게임에 반영 안 됨 — gameStore.buildState() 에서 STAR_SYSTEMS를 제대로 읽는지, Vite HMR 캐시 문제인지 조사 |
| 🟡 | 고립 성계 7개 항로 수기 추가: 230004(ARESHYUM), 230007(BARATULF), 230018(FIREZIERD), 230021(HAN), 230036(LUYKAS_FPA), 230038(MARBACH), 230044(PORGEN) |
| 🟡 | nameJp 62개 전체 입력 (현재 빈 문자열) |
| 🟡 | code 중복 3건 원작 확인: 230002(ALTENER) / 230035(LUYKAS) / 230037(MARADEITA) |
| 🟡 | starsData.js LEGACY 삭제 (encyclopediaStore 참조 여부 체크 후) |
| 🟢 | planetsData.js 나머지 59개 성계 행성 좌표/type 완성 |
| 🟢 | building.js + planetBuildData.js 설계 및 입력 |
| 🟢 | schema.sql 전면 재작성 (새 code 체계 반영) |
