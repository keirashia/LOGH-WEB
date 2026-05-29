# src/views/lobby — 시나리오 선택 화면 설계
> 작성: 2026-05-29
> 데이터 설계: src/data/scenarios/scenarioData.md 참조

---

## 화면 Flow

```
LobbyView
  ↓ 싱글플레이
SingleView
  ↓ 새 게임
ScenarioSelectView
  Step 1. 역사 그래프 + 사건 목록
  Step 1-1. 시나리오 상세 레이어 (A안: 레이어 전환)
  Step 2. 게임 옵션
  Step 3. 인물 선택
  ↓
GameView
```

---

## Step 1 — 역사 그래프 (현재 구현됨)

```
좌: 수직 타임라인 (밀도 기반, 줌/드래그)
우: 선택 연도의 사건 목록

연도 표시: SE {연도} ({사건수})
사건 카드: 태그 + 사건명 + 월 + ★(구현여부)
```

### 사건 카드 탭 → Step 1-1 상세 레이어 진입

---

## Step 1-1 — 시나리오 상세 레이어 (A안: 레이어 전환)

### 구조
```
┌──────────────────────────────┐
│ [← 이전] 사건명 [다음 →] [✕] │  ← 상단 고정 헤더
├──────────────────────────────┤
│  desc[currentPage].image     │  ← 이미지 (없으면 그라디언트)
│  ♪ bgm  / effect: fade       │
├──────────────────────────────┤
│  desc[currentPage].text      │  ← 본문 텍스트
│                              │
│  libs 링크 버튼들             │  ← 사전 팝업 호출
│  [엘 파실] [아서 린치]        │
│                              │
│  ● ● ● (페이지 인디케이터)    │
├──────────────────────────────┤
│  [← 이전]  [버튼]  [다음 →]  │  ← 하단 버튼
└──────────────────────────────┘
```

### 데이터 소스
```
eventData.js    → Step1 타임라인/사건 목록
scenario.js     → 상세 레이어 desc[] 표시
연결: eventData.scenarioId → scenario.id
```

### 상단 헤더 네비게이션
```
[← 이전]  사건명  [다음 →]  [✕]

이전/다음: 전체 연도 무관하게 전/후 사건으로 이동
✕: Step1 사건 목록으로 복귀
```

### libs 필드 — 사전 팝업 연동
```js
libs: ["ST_230017:엘 파실", "CH_000240:아서 린치"]

// 접두사 규칙
ST_{code}  → 성계 사전 팝업 (Encyclopedia - Star)
CH_{code}  → 인물 사전 팝업 (Encyclopedia - Character)

// 탭 시: encyclopediaStore.open('star', '230017')
//        encyclopediaStore.open('char', 'CH_000240')
```

### 하단 버튼 로직

```
useYn: false
  [← 이전]  [다음 시나리오 →]
  → 다음 사건으로 이동 (전체 연도 무관)

useYn: true + openPt: 0 (무료)
  [← 이전]  [▶ 시작]  [다음 →]

useYn: true + openPt > 0 + 구매완료
  [← 이전]  [▶ 시작]  [다음 →]

useYn: true + openPt > 0 + 미구매
  [← 이전]  [🔒 1500P로 구매]  [다음 →]
  → 구매 탭: 포인트 차감 + TBL_USER_ITEM 저장
  → 구매 완료 후: [▶ 시작] 로 변경
```

### [▶ 시작] 탭 → Step 2 진입

---

## Step 2 — 게임 옵션 (현재 구현됨)

```
NPC 등장: 사실 / 가상
NPC 행동: 사실 / 가상
(추가 옵션 추후 구현)
```

---

## Step 3 — 인물 선택 (현재 구현됨)

```
추천 인물 (scenario.js 기준 세력별)
전체 인물 검색
인물 선택 → 세력 자동 결정
```

### ⚠️ 수정 필요
```
현재: CHA_USEYN = 'Y' 필터링
변경: 시나리오 charDetail.js 기반으로 수정 예정
     (charDetail.js 완성 후 작업)
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
--tag-fact:      #4488FF   /* 사실 */
--tag-fiction:   #8844CC   /* 가상 */
--tag-tactics:   #CC6622   /* 택틱스 */
--tag-beginner:  #44AA66   /* 초심자추천 */
--tag-advanced:  #CC4444   /* 숙련자추천 */
```

---

## 컴포넌트 구조

```
ScenarioSelectView.vue     Step 1/2/3 라우팅
├── Step1HistoryGraph.vue  타임라인 + 사건 목록 ✅ 구현됨
├── ScenarioDetail.vue     상세 레이어 ⬜ 신규
├── Step2GameOptions.vue   게임 옵션 ✅ 구현됨
└── Step3CharSelect.vue    인물 선택 ✅ 구현됨 (charDetail 수정 필요)
```

---

## 설계 결정 이력

| 날짜 | 결정 |
|---|---|
| 2026-05-29 | T/S/F 타입 탭 제거 → 연도 선택으로 통합 |
| 2026-05-29 | 사건 상세: A안 레이어 전환 (전체화면) |
| 2026-05-29 | 상세 데이터: scenario.js의 desc[] 기반 |
| 2026-05-29 | 이전/다음: 전체 연도 무관하게 전/후 사건 |
| 2026-05-29 | libs: ST_/CH_ 접두사로 사전 팝업 연동 |
| 2026-05-29 | useYn: false → 상세만 보고 시작 불가 |
| 2026-05-29 | openPt > 0 + 미구매 → 포인트 구매 버튼 |
| 2026-05-29 | tags: 사실/가상/택틱스 + 초심자/숙련자추천 |
| 2026-05-29 | 인물 선택: charDetail.js 기반으로 변경 예정 |

---

## TODO

- [ ] `ScenarioDetail.vue` 신규 생성
  - desc[] 페이지 전환 (effect: fade/slide)
  - libs 탭 → encyclopediaStore.open() 호출
  - 하단 버튼 useYn/openPt/구매여부 분기
- [ ] `Step1HistoryGraph.vue` 사건 카드 클릭 → ScenarioDetail 진입으로 변경
- [ ] `ScenarioSelectView.vue` Step1-1 레이어 추가
- [ ] `Step3CharSelect.vue` charDetail.js 기반으로 수정
- [ ] `scenario.js` SE640~SE801 이벤트 항목 입력 (사용자 직접 작업)
- [x] `eventData.js` 삭제 — scenario.js 기반으로 통합
- [x] `Step1HistoryGraph.vue` SCENARIOS 기반으로 변경 (EVENTS 제거)
- [x] `Step1HistoryGraph.vue` 태그 색상 초심자/숙련자추천 추가
- [x] `Step2GameOptions.vue` event.name → event.nameKr
- [x] `ScenarioSelectView.vue` scenarioId → id
- [x] `Step3CharSelect.vue` SCENARIOS 조회 제거 (props.event 직접 사용)
