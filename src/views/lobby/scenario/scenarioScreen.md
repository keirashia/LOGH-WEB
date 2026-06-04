# src/views/lobby/scenario — 시나리오 선택 화면 설계
> 작성: 2026-05-29 / 최종 수정: 2026-06-04
> 데이터 설계: src/data/scenarios/scenarioData.md 참조

---

## 화면 Flow (신규 라우팅 구조)

```
LobbyView
  ↓ 싱글플레이
SingleView
  ↓ 새 게임
/lobby/single/new          Step 1.   역사 그래프 + 사건 목록
/lobby/single/new/:scId    Step 1-1. 시나리오 상세 (전체 화면)
/lobby/single/new/:scId/options    Step 2.   게임 옵션
/lobby/single/new/:scId/char       Step 3.   인물 선택
  ↓
GameView
```

### 라우팅 전환 규칙
```
Step1  사건 카드 클릭  → router.push(`/lobby/single/new/${scId}`)
Step1-1 [▶ 시작]      → router.push(`/lobby/single/new/${scId}/options`)
Step1-1 [← 뒤로]      → router.back()  (플랫폼 내장 히스토리)
Step2  [다음]          → router.push(`/lobby/single/new/${scId}/char`)
Step2  [← 뒤로]       → router.back()
Step3  [게임 시작]     → game.startGame() + router.push('/game')
Step3  [← 뒤로]       → router.back()
```

### 상태 공유
```
scId    : URL 파람으로 전달 (새로고침 복원 가능)
options : lobbyStore (Pinia) — npcAppearance, npcBehavior
```

> **히스토리 관리**: router.push/back 위임으로 AOS/iOS/Web 플랫폼 내장 히스토리가
> 자연스럽게 처리됨. ScenarioDetail의 history.pushState 수동 핵 제거.

---

## 폴더 구조

```
src/views/lobby/scenario/
├── scenarioScreen.md          ← 이 파일 (설계 문서)
├── ScenarioSelectView.vue     ← Step1 (신규, 예정)
├── ScenarioDetailView.vue     ← Step1-1 전체 화면 (신규, 예정)
├── Step2GameOptions.vue       ← Step2 (legacy → 이동 예정)
├── Step3CharSelect.vue        ← Step3 (legacy → 이동 예정)
└── legacy/                    ← 기존 파일 보관 (마이그레이션 완료 후 삭제)
    ├── ScenarioSelectView.vue
    ├── ScenarioDetail.vue
    ├── Step1HistoryGraph.vue
    ├── Step2GameOptions.vue
    ├── Step3CharSelect.vue
    ├── CharSelectGrid.vue
    └── FactionFilter.vue
```

---

## Step 1 — 역사 그래프 ✅ 구현됨 (legacy)

```
좌: 수직 타임라인 (밀도 기반, 줌/드래그)
우: 선택 연도의 사건 목록

연대 구분: yearType 기준으로 ERA_ORDER 정렬 (AD → SE → RC)
연도 표시: {yearType} {year}년  (SE 이면 / 제국력 {year-309}년 병기)
연도 핀:  클릭 시 우측 사건 목록 갱신
사건 카드: 태그 + 사건명 + 월 + ★(useYn)
절단선:   era 전환 또는 연도 공백이 클 때 표시
```

### 타임라인 정렬 규칙
```js
ERA_ORDER = { AD: 0, SE: 1, RC: 2 }
// AD 연도 전체 → SE 연도 전체 → RC 연도 전체 순으로 표시
// 동일 era 내에서는 year 오름차순
// 복합키: `${yearType}_${year}` 로 연도 구분 (AD2039 ≠ SE2039)
```

### 사건 카드 클릭 → router.push(`/lobby/single/new/${scId}`)

---

## Step 1-1 — 시나리오 상세 🔄 전체 화면으로 재설계 예정

### 변경 사항
```
AS-IS: ScenarioDetail.vue — 바텀시트 오버레이 (80vh)
        history.pushState 수동 관리 (AOS/iOS/Web 동작 불일치)
TO-BE: ScenarioDetailView.vue — 전체 화면 라우트
        router.back() 으로 뒤로가기 위임
```

### 구조 (전체 화면)
```
┌──────────────────────────────────┐
│  [← 뒤로]  사건명  연도           │  ← 상단 헤더
├──────────────────────────────────┤
│  desc[currentPage].image         │  ← 이미지 영역 (없으면 다크 그라디언트)
│                                  │
├──────────────────────────────────┤
│  desc[currentPage].text          │  ← 본문 텍스트 (serif, pre-line)
│                                  │
│  [libs 버튼들]                    │
│  ● ● ● (페이지 인디케이터)        │
├──────────────────────────────────┤
│  [← 이전]    [중앙 버튼]  [다음 →]│  ← 하단 버튼 (footer)
└──────────────────────────────────┘
```

### 데이터 소스
```
route.params.scId  →  SCENARIOS.find(s => s.id === scId)
```

### 하단 버튼 로직
```
useYn: false
  [← 이전]  [다음 시나리오 →]  (nextSc 없으면 disabled)

useYn: true + openPt: 0
  [← 이전]  [▶ 시작]  [다음 →]

useYn: true + openPt > 0 + 미구매
  [← 이전]  [🔒 Npt로 구매]  [다음 →]
  → 구매: 포인트 차감 + TBL_USER_ITEM 저장 (미구현)
```

### image 필드 — 이미지 경로 규칙
```
public/img/scenarios/{yearType}{year}/{seq}/{desc.image}
예) public/img/scenarios/SE796/1/01.webp
    (id="SE796_1" → yearType="SE", year=796, seq=1)

desc[].bg   : "01.webp"  → 우선 사용
desc[].image: "01.webp"  → 하위 호환 폴백
              ""          → 이미지 없음 (다크 그라디언트 폴백)
```

### libs 필드 — 사전 팝업 연동
```js
libs: ["ST_230017:엘 파실", "CH_000240:아서 린치"]

// 접두사 규칙
ST_{code}  → encyclopediaStore.open('systems');  enc.searchQuery = label
CH_{code}  → encyclopediaStore.open('characters'); enc.searchQuery = label
```

---

## Step 2 — 게임 옵션 ✅ 구현됨 (legacy, 이동 예정)

```
NPC 등장: 사실 / 가상
NPC 행동: 사실 / 가상
(추가 옵션 추후 구현)
```

### NPC 등장 옵션 동작
```
사실: charactersData.js birth/death 기준 시나리오 연도 생존 인물만 표시
가상: 생몰년도 무관 전원 표시
```

---

## Step 3 — 인물 선택 ✅ 구현됨 (legacy, 이동 예정)

```
CHAR_BASE 전체 풀 기반
  charList.js에 faction 있으면 → charList 값 우선
  charList.js에 faction 없으면 → charactersData.js 폴백
NPC 등장 옵션에 따라 생존 필터 적용
```

---

## tags 체계

```js
// 시나리오 유형 (중복 가능)
'사실'       원작 소설 기반 실제 사건
'가상'       분기/픽션 시나리오
'택틱스'     특정 전투만 재현 (단기)

// 난이도 안내 (선택)
'초심자추천'
'숙련자추천'
```

### 태그 색상
```css
'사실':       #4488FF
'가상':       #8844CC
'택틱스':     #CC6622
'전투':       #4488FF
'분기점':     #CC6622
'초심자추천': #44AA66
'숙련자추천': #CC4444
```

---

## scenario.js 필드 — 화면 노출 현황

| 필드 | Step1 카드 | Step1-1 상세 | Step2 | Step3 | 비고 |
|---|---|---|---|---|---|
| yearType | ✅ 타임라인 핀 | ✅ 헤더 | - | - | |
| year | ✅ 타임라인/헤더 | ✅ 헤더 | ✅ 요약 | - | |
| month | ✅ 카드 | - | ✅ 요약 | - | |
| id | - | - | - | - | 키/URL 파람 |
| nameKr | ✅ 카드 | ✅ 헤더 | ✅ 요약 | - | |
| **nameEn** | ❌ | ❌ | ❌ | ❌ | **미노출** |
| **nameJp** | ❌ | ❌ | ❌ | ❌ | **미노출** |
| tags | ✅ 카드 | - | - | - | |
| factions | - | - | - | ✅ 필터 | 텍스트 미표시 |
| useYn | ✅ 카드 opacity | ✅ 버튼 분기 | - | - | |
| openPt | - | ✅ 버튼 분기 | - | - | |
| **appearances** | ❌ | ❌ | ❌ | ❌ | **미노출** |
| desc[].index | - | - | - | - | 내부 정렬용 |
| desc[].image | - | ✅ | - | - | |
| desc[].text | - | ✅ | - | - | |
| desc[].effect | - | ✅ 트랜지션 | - | - | |
| desc[].libs | - | ✅ 버튼 | - | - | |

### 미노출 필드 활용 방안 (미확정)
```
nameEn   →  Step1 카드 하단 소자 표시 (영문 부제)
nameJp   →  Step1-1 상세 헤더 하단 (일문 병기) 또는 미표시
appearances → Step1-1 상세 본문 하단 "출처: 은하영웅전설 N권 ..." 형태
factions →  Step1-1 상세 헤더 또는 태그 영역 세력 뱃지 표시
```

---

## 컴포넌트 구조 (신규 목표)

```
router
  /lobby/single/new              → ScenarioSelectView.vue   (Step1 타임라인)
  /lobby/single/new/:scId        → ScenarioDetailView.vue   (Step1-1 전체 화면)
  /lobby/single/new/:scId/options → Step2GameOptions.vue
  /lobby/single/new/:scId/char   → Step3CharSelect.vue

공유 상태
  route.params.scId              → 시나리오 조회
  lobbyStore (Pinia)             → options { npcAppearance, npcBehavior }
```

---

## 설계 결정 이력

| 날짜 | 결정 |
|---|---|
| 2026-05-29 | T/S/F 타입 탭 제거 → 연도 선택으로 통합 |
| 2026-05-29 | 사건 상세: A안 레이어 전환 (바텀시트 80vh) |
| 2026-05-29 | 상세 데이터: scenario.js의 desc[] 기반 |
| 2026-05-29 | 이전/다음: 전체 연도 무관하게 전/후 사건 |
| 2026-05-29 | libs: ST_/CH_ 접두사로 사전 팝업 연동 |
| 2026-05-29 | useYn: false → 상세만 보고 시작 불가 |
| 2026-05-29 | openPt > 0 + 미구매 → 포인트 구매 버튼 |
| 2026-05-29 | tags: 사실/가상/택틱스 + 초심자/숙련자추천 |
| 2026-05-29 | 인물 선택: charDetail.js 기반으로 변경 예정 |
| 2026-05-30 | eventData.js 삭제 → scenario.js 단일 소스 |
| 2026-05-30 | yearType 도입 (AD/SE/RC) → ERA_ORDER 정렬, 복합키 `${yearType}_${year}` |
| 2026-05-30 | 이미지 없을 시 다크 그라디언트 폴백 |
| 2026-05-30 | det-image flex:5 / det-body flex:3 비율 고정 |
| 2026-05-30 | det-bottom (libs+페이지인디케이터) margin-top:auto로 하단 고정 |
| 2026-06-04 | Step 1-1 바텀시트 → 전체 화면 라우트로 변경 (AOS/iOS/Web 히스토리 통일) |
| 2026-06-04 | step 변수 기반 오케스트레이션 → Vue Router 라우팅으로 전환 |
| 2026-06-04 | 기존 파일 legacy/ 보관, scenario/ 하위에 신규 파일 작성 |
| 2026-06-04 | scId URL 파람 + lobbyStore(Pinia)로 상태 공유 |

---

## TODO

### 진행 중
- [ ] `ScenarioDetailView.vue` 신규 작성 (전체 화면, route.params.scId 기반)
- [ ] `ScenarioSelectView.vue` 신규 작성 (Step1 타임라인, legacy/Step1HistoryGraph 이식)
- [ ] `router/index.js` 신규 라우트 4개 추가
- [ ] `lobbyStore.js` 신규 생성 (options 공유)
- [ ] `Step2GameOptions.vue` legacy → scenario/ 이동 + emit → router 전환
- [ ] `Step3CharSelect.vue` legacy → scenario/ 이동 + emit → router 전환

### 미결
- [ ] `scenario.js` SE640~SE801 이벤트 항목 입력 (사용자 직접 작업)
- [ ] `ScenarioDetailView.vue` 구매 완료 상태 연동 (TBL_USER_ITEM, Phase 3)
- [ ] nameEn 카드 노출 여부 결정
- [ ] appearances 화면 노출 방안 결정
- [ ] factions 세력 뱃지 표시 여부 결정
- [ ] legacy/ 폴더 삭제 (마이그레이션 완료 후)

### 완료
- [x] `ScenarioDetail.vue` 신규 생성 (desc[] 페이지, libs, 버튼 분기)
- [x] `Step1HistoryGraph.vue` 사건 카드 클릭 → ScenarioDetail 진입
- [x] `ScenarioSelectView.vue` Step1-1 레이어 추가
- [x] `eventData.js` 삭제 — scenario.js 기반으로 통합
- [x] `Step1HistoryGraph.vue` SCENARIOS 기반으로 변경 (EVENTS 제거)
- [x] `Step1HistoryGraph.vue` yearType AD/SE/RC 지원 + ERA_ORDER 정렬
- [x] `Step1HistoryGraph.vue` 태그 색상 초심자/숙련자추천 추가
- [x] `Step2GameOptions.vue` event.name → event.nameKr
- [x] `ScenarioSelectView.vue` scenarioId → id
- [x] `Step3CharSelect.vue` SCENARIOS 조회 제거 (props.event 직접 사용)
- [x] `Step3CharSelect.vue` charList.js faction 우선 + charactersData.js 폴백
- [x] `Step3CharSelect.vue` NPC 등장 사실 모드 → birth/death 기준 생존 필터
- [x] `gameStore.js` startGame FACTIONS[pf] undefined 크래시 수정
