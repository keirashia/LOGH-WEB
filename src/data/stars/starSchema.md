# LOGH 데이터 스키마

> 최종 업데이트: 2026-05-26
> VSCode Claude Code 연동용 컨텍스트 파일

---

## 폴더 구조

```
src/data/stars/
├── starSystemData.js     성계 마스터 (불변)
├── planetsData.js        행성 마스터 (불변)
├── lane.js               항로 마스터 (불변)
│
├── S01/                  시나리오 1 초기값
│   ├── planetDetail.js
│   └── ...
├── S02/
│   └── ...
│
└── {uuid}_{seq}/         세이브파일
    ├── planetDetail.js
    └── ...
```

---

## 코드 체계

```
성계 코드: 230001 ~ 230062  (6자리, ABC순, unique)
행성 코드: 230001P01 ~ P99  (성계코드 + P + 순번)

230006        → 성계 (GANDHARVA)
230006P01     → 행성 1번 (main=true)
230006P02     → 행성 2번
```

---

## 갤럭시맵 스펙

| 항목 | 값 | 비고 |
| ---- | -- | ---- |
| SVG viewBox | `0 0 1640 980` | GalaxyMap.vue VW=1640, VH=980 |
| preserveAspectRatio | `xMidYMid slice` | 화면 비율 자동 조정 |
| 줌 범위 | scale 0.4 ~ 5 | 마우스 휠 / 핀치 |
| 성계 좌표 범위 | x: 110~1510, y: 156~900 | starSystemData.js 기준 |
| 성계 반경 | capital=16, fortress=13, 기타=10 | nr() 함수 기준 |
| 성계 수 | 62개 | code 230001~230062 |
| 항로 수 | 86개 | LANE_001~LANE_086 |

> 좌표계: 구 820×490 대비 **x2 스케일** (2026-05-26 적용)
> 변환식: newX = oldX × 2, newY = oldY × 2

---

## starSystemData.js

역할: 성계 불변 마스터
변경 조건: 없음

| 키      | 타입   | 설명                                                     |
| ------- | ------ | -------------------------------------------------------- |
| code    | string | PK, 6자리 ABC순 (230001~230062)                          |
| nameKr  | string | 한국어 명칭                                              |
| nameEn  | string | 영문 명칭 (gineipaedia 위키 기준)                        |
| nameJp  | string | 일본어 명칭 (추후 입력)                                  |
| x       | number | 갤럭시맵 X 좌표 (viewBox 1640×980 기준)                  |
| y       | number | 갤럭시맵 Y 좌표 (viewBox 1640×980 기준)                  |
| mapSize | [w, h] | 성계 세부맵 크기 (기본 [800, 800])                       |
| type    | string | capital/fortress/frontier/normal/noble/contested/neutral |
| desc    | string | 성계 설명                                                |

> isGateway 제거 → lane.type(corridor/phezzan)으로 판단
> fortress 제거 → planetsData.js의 planet.fortress로 판단

---

## planetsData.js

역할: 행성 불변 마스터
변경 조건: 없음

| 키       | 타입    | 설명                     |
| -------- | ------- | ------------------------ |
| code     | string  | PK (230001P01 형식)      |
| starCode | string  | FK → starSystemData.code |
| nameKr   | string  | 한국어 명칭              |
| nameEn   | string  | 영문 명칭                |
| nameJp   | string  | 일본어 명칭              |
| type     | string  | 행성 유형                |
| main     | boolean | 대표 행성 여부           |
| x        | number  | 성계 세부맵 내 X 좌표    |
| y        | number  | 성계 세부맵 내 Y 좌표    |
| size     | number  | 행성 표시 반경 (px)      |

---

## lane.js

역할: 항로 마스터 (불변)
DB: TBL_LANE + TBL_LANE_STAR(Junction) + VW_LANE(View)

| 키        | 타입      | 설명                        |
| --------- | --------- | --------------------------- |
| id        | string    | LANE_001 ~ LANE_072         |
| stars     | string[2] | 연결 성계 code 2개          |
| type      | string    | normal / corridor / phezzan |
| period    | number    | 이동 소요 턴 (1~3)          |
| stability | number    | 기본 안정도 (0~100)         |

stability 최종 = 기본값 + 사령관 운영력 보정 + 시설 보정
물자 손실 이벤트 확률 = (100 - 최종 stability) / 100

---

## planetDetail.js (S0N/ 또는 {uuid}\_{seq}/)

역할: 행성 가변값
키 구조: 폴더(시나리오/세이브) + code로 식별

| 키         | 타입         | 설명                         |
| ---------- | ------------ | ---------------------------- |
| code       | string       | FK → planetsData.code        |
| faction    | string\|null | 지배 세력 (REH/FPA/PZN/null) |
| population | number       | 행성 인구                    |
| industry   | number       | 행성 산업 (0~100)            |
| defense    | number       | 행성 방어 (0~100)            |
| morale     | number       | 행성 민심 (0~100)            |
| tax        | number       | 행성 세율 (0~100)            |

파생값 (런타임 계산, 저장 불필요):

- 성계 faction = 소속 행성 faction 다수결
- 성계 population = 소속 행성 SUM
- 성계 industry = 소속 행성 SUM
- 성계 defense = 소속 행성 SUM
- 성계 morale = 소속 행성 평균
- 성계 tax = 소속 행성 평균

starSystemDetail.js → 불필요, 제거됨

---

## DB 테이블 구조

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
TBL_GAME_LANE            세션 중 항로 상태 (active/blocked)
TBL_GAME_FLEET           함대 상태
TBL_GAME_CHARACTER       인물 상태
TBL_GAME_RESOURCE        자원
TBL_GAME_LOG             이벤트 로그
```

### View

```
VW_LANE               TBL_LANE + TBL_LANE_STAR
                      → STAR_A, STAR_B 컬럼으로 조회
```

### 유저/멀티

```
TBL_USER_MAIN         유저 (TRANSFER_CODE 포함)
TBL_SEASON            멀티플레이 시즌
```

---

## 설계 결정사항 이력

| 날짜       | 결정                                             |
| ---------- | ------------------------------------------------ |
| 2026-05-26 | starSystemDetail.js 제거 — 불필요 확정           |
| 2026-05-26 | faction = 소속 행성 다수결로 파생                |
| 2026-05-26 | morale/tax = 행성별 관리, 성계는 평균값 파생     |
| 2026-05-26 | 성계 코드 230001~ (6자리 ABC순)                  |
| 2026-05-26 | 행성 코드 {starCode}P{seq} (P01~P99)             |
| 2026-05-26 | 파일명 starSystemData.js 확정                    |
| 2026-05-26 | lane.js 별도 분리, stars[] = code 배열           |
| 2026-05-26 | Lane DB: TBL_LANE + TBL_LANE_STAR + VW_LANE      |
| 2026-05-26 | 시나리오: S01/ 폴더, 세이브: {uuid}\_{seq}/ 폴더 |
| 2026-05-26 | nameEn = gineipaedia 위키 공식 영문명 기준       |

---

## 진행 현황

### ✅ 완료

- starSystemData.js (62개, code 230001~230062, isGateway/fortress 제거)
- planetsData.js (102개, fortress 포함, 간다르바 외 좌표/size 추후 수기 입력)
- lane.js (72개, 새 code 체계)
- code_map.json (구 id → 새 code 변환 참조)

### ⬜ 진행 예정

- planetsData.js 나머지 61개 성계 행성 입력
- S01~S0N/ planetDetail.js 시나리오 초기값 작성
- facilities.js 설계 및 입력
- schema.sql 전면 재설계 (새 code 체계 반영)
- TBL_CHARACTER INSERT (560명)
- nameJp 전체 입력 (DB 적용 전)
- 고립 성계 7개 항로 수기 수정

### ⚠️ 보완 필요

- 고립 성계 7개: 230004(ARESHYUM), 230007(BARATULF),
  230018(FIREZIERD), 230021(HAN), 230036(LUYKAS_FPA),
  230038(MARBACH), 230044(PORGEN)
- code 중복 3건 수기 확인 필요:
  230002(ALTENER)/230037(LUYKAS)/230040(MARADEITA) 원작 코드 검증
- nobility(noble) 타입 게임 규칙 정의
- stability 방향성 여부 최종 결정

| 2026-05-26 | isGateway 제거 → lane type(corridor/phezzan)으로 판단 |
| 2026-05-26 | fortress 제거(성계) → planetsData.fortress로 이동 |

,,,

### 사용자 주석

- planetData.js를 읽을 때, 성계 내의 시설물도 가져와야함.
- building.js 파일에 건물의 종류가 있으며, 행성의 size만큼 보유 가능함.
- planetBuildData.js에 건물 1개당 rowData를 가진다.

galaxyMap에서 성계 클릭시, 성계 데이터를 우측에 보여준다.
[성계정보]
성계명 / 주요행성의 이미지 / 각종 수치 / 상태 (평화/교전중 등등)
버튼

1. 상세보기 -> 우주맵이 해당 성계 맵으로 전환됨 (성계맵에서 뒤로가기로 다시 우주맵으로 돌아옴)
2. 행성정보 -> 해당 성계내 행성들이 <li>으로 행성명, 대체적인 정보 노출
   -> 행성명 버튼 클릭 시, 해당 행성 정보가 노출
3. 항로정보 -> 해당 성계와 연결된 항로 노출 현재 성계 기준으로 연결된 성계명이 버튼형으로 노출
   -> 해당 성계명 버튼 클릭 시, 항로 정보가 노출
4. 제안 -> 해당 성계의 담당하는 인물이 존재할 경우, 담당관에게 제안을 할 수 있음. 없을 경우 국가수반에게 제안
   해당 담당관은 턴이 종료되는 시점에, 제안된 정보 중 유효한 우선순위의 제안을 받아들일 수 있음.
   (제안 관련된 부분은 별도의 md파일로 관리)
   제안 버튼을 누를 경우, 제안할 성계를 선택하고, 행성 정보가 노출됨. 제안 패널 오픈

[행성정보]
행성명 / 소속성계 / 각종수치 / 상태
버튼

1. 상세보기 -> 해당 행성을 중앙 focus하여, 해당 성계맵으로 전환됨. (성계정보에서와 동일기능)
2. 행성정보 -> 행성의 상세 정보를 보여줌
3. 제안 -> 해당 성계가 선택된 상태에서 제안 패널 오픈

[각종수치]

1. 인구 -> 해당 성계의 인구를 보여줌. 1k가 1pop
   아이콘으로 사람모양이 표시되며, 해당 아이콘 터치 시, 추가 정보 노출
   1-1 지지도
   예를 들어 인구가 10k면 자유행성동맹지지 4k / 구국군사회의지지 2k ... 이런 식으로
   아이콘 : n 지지
