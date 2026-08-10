# 시나리오 선택 화면 설계
> 분류: 화면
> 경로: `docs/205_screen_scenario.md`
> 상위: [200_SCREEN.md](200_SCREEN.md)
> 최종 수정: 2026-07-05

---

## 화면 Flow

```
LobbyView
  ↓ 싱글플레이
SingleView  →  lobby.loadUnlocks()  →  router.push('/lobby/single/new')
  ↓
/lobby/single/new                  Step 1.  역사 타임라인 + 사건 카드
/lobby/single/new/:scId/options    Step 2.  게임 옵션 (variant 선택 포함)
/lobby/single/new/:scId/char       Step 3.  인물 선택
  ↓
GameView  (game.startGame() async 완료 후 이동)
```

### 라우팅 전환 규칙
```
Step1  사건 카드 클릭  → isScenarioUnlocked 체크 → router.push(`/lobby/single/new/${scId}/options`)
Step2  [다음]          → router.push(`/lobby/single/new/${scId}/char`)
Step2  [← 뒤로]       → router.back()
Step3  [게임 시작]     → await game.startGame() + router.push('/game')
Step3  [← 뒤로]       → router.back()
```

> **Step 1-1 (시나리오 상세) 제거**: 선택 → 옵션으로 바로 이동. `ScenarioDetailView.vue`는 `/lobby/single/new/:scId` 라우트로 존재하나 현재 Step1에서 직접 진입하지 않음.

### 상태 공유
```
scId         : URL 파람으로 전달 (새로고침 복원 가능)
options      : lobbyStore — npcAppearance, npcBehavior
userUnlocks  : lobbyStore — scenarios[], characters[] (localStorage 연동)
```

> **히스토리 관리**: router.push/back 위임으로 AOS/iOS/Web 플랫폼 내장 히스토리가
> 자연스럽게 처리됨. ScenarioDetail의 history.pushState 수동 핵 제거.

---

## 폴더 구조

```
src/views/lobby/scenario/
├── ScenarioSelectView.vue     ← Step1 ✅ 완료
├── ScenarioDetailView.vue     ← Step1-1 전체 화면 ✅ 완료 (현재 직접 진입 안 함)
├── ScenarioOptionsView.vue    ← Step2 ✅ 완료
├── ScenarioCharSelectView.vue ← Step3 ✅ 완료
└── legacy/                    ← 삭제 대상 (grep 확인 후)
    ├── ScenarioSelectView.vue
    ├── ScenarioDetail.vue
    ├── Step1HistoryGraph.vue
    ├── Step2GameOptions.vue
    ├── Step3CharSelect.vue
    ├── CharSelectGrid.vue
    └── FactionFilter.vue

src/components/lobby/
├── ScTimelineLayout.vue       ← 타임라인 좌측 패널
└── ScEventListLayout.vue      ← 사건 카드 우측 패널
                                  isScenarioUnlocked 체크 내장 (useLobbyStore)
                                  prevPlayable/nextPlayable: showYn !== false 필터 적용
```

---

## Step 1 — 역사 타임라인 ✅ 구현됨 (`ScenarioSelectView.vue`)

```
좌: 수직 타임라인 (ScTimelineLayout) — 밀도 기반, 줌/드래그
우: 선택 연도의 사건 카드 슬라이더 (ScEventListLayout)

연대 구분: yearType 기준으로 ERA_ORDER 정렬 (AD → SE → RC)
연도 표시: {yearType} {year}년  (SE 이면 / 제국력 {year-309}년 병기)
연도 핀:  클릭 시 우측 사건 목록 갱신
사건 카드: 태그 + 사건명 + 월
절단선:   era 전환 또는 연도 공백이 클 때 표시
```

### 타임라인 정렬 규칙
```js
ERA_ORDER = { AD: 0, SE: 1, RC: 2 }
// AD 연도 전체 → SE 연도 전체 → RC 연도 전체 순으로 표시
// 동일 era 내에서는 year 오름차순
// 복합키: `${yearType}_${year}` 로 연도 구분 (AD2039 ≠ SE2039)
```

### 시나리오 표시 필터
```js
visible = SCENARIOS.filter(s => s.showYn !== false)
// showYn: false → 연표 미노출. 같은 variants 그룹의 showYn:true 시나리오
//                options 화면 variant 드롭다운에서만 접근 가능한 종속 variant.
// useYn: false  → 연표 노출, 카드 표시됨. 연표 전시 전용 (시작 불가)
```

### 사건 카드 클릭 흐름
```
클릭 → isScenarioUnlocked(sc.id) 체크
  잠금: 무시 (애니메이션 없음)
  해금: 500ms lift 애니메이션 → emit('select') → router.push(`/lobby/single/new/${scId}/options`)
```

> `useYn`은 카드 클릭 단계에서 체크하지 않는다. `openPt`와 `userUnlocks`만 판정 기준.

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
libs: ["ST_:아스타테", "CH_:양 웬리"]   // 실사용 예 (SE796_0211_010 scenarioDesc.js)

// 파싱: prefix = lib.slice(0,3) (항상 "ST_"/"CH_" 3글자) / label = lib.slice(indexOf(':')+1)
// prefix와 ':' 사이 값은 파싱에서 그냥 버려짐 — 코드값을 넣어도(예: "ST_230017:엘 파실") 무시되고 label만 쓰임
ST_  → encyclopediaStore.open('systems');    enc.searchQuery = label
CH_  → encyclopediaStore.open('characters'); enc.searchQuery = label
```

---

## Step 2 — 게임 옵션 ✅ 구현됨 (`ScenarioOptionsView.vue`)

```
레이아웃: StarfieldCanvas 배경 + gold-dark 카드 UI
타이틀: name[Kr] (gold serif, 3.6vh)
서브타이틀: subTitle — pill 칩, 클릭 시 variants 드롭다운 (multi-variant 시나리오용)
요약: summary 필드 — 칩 아래 짧은 시나리오 소개 (1.6vh, dim 색상)
NPC 등장: 사실 / 가상
NPC 행동: 사실 / 가상
```

### variant 선택 드롭다운
```
cur.variants 배열이 존재하고 2개 이상일 때 서브타이틀 칩에 ▾ 표시
클릭 → 드롭다운 패널 (각 variant의 subTitle 표시, 현재 선택 항목 gold 강조)
선택 → router.replace(`/lobby/single/new/${sc.id}/options`)
```

### NPC 등장 옵션 동작
```
사실: charactersData.js birth/death 기준 시나리오 연도 생존 인물만 표시
가상: 생몰년도 무관 전원 표시
```

---

## Step 3 — 인물 선택 ✅ 구현됨 (`ScenarioCharSelectView.vue`)

국가 선택(Stage 1) + 인물 선택(Stage 2) 통합 화면.

### 사전 조건 — preload guard
```js
// onMounted: preload 없이 직접 접근하면 scenario-select로 리디렉트
if (game._preloadedScId !== cur.value?.id || !game._preloadedData)
  router.replace({ name: 'scenario-select' })
```
`ScenarioDetailView.onMounted`에서 `game.preloadScenario(scId)` 호출 후 CharSelectView 진입하는 정상 경로만 허용.

### Stage 1 — 국가 선택
```
가로 스크롤 카드: [전체] + 시나리오 세력 카드
드래그/스와이프/휠 지원 (fcDragStart/Move/End, fcWheel)
선택된 카드 gold 강조 + translateY(-8px) 스케일업
[다음 →] → goToChar() → factionFilter 세팅 후 stage = 'char'
```

### Stage 2 — 인물 선택 (좌우 분할 레이아웃)
```
┌─────────────────────┬──────────────────────┐
│  검색 입력 / N명     │                      │
│─────────────────────│   CharDetailComp      │
│  이름표   소속  ★ ● │   (우측 사이드 패널)   │
│  ─────────────────  │   선택 없으면         │
│  [인물 행 × N]       │   "인물을 선택하세요"  │
└─────────────────────┴──────────────────────┘
```

```
인물 목록: game._preloadedData.charList + 전체 CHAR_BASE 조합
생존 필터: isAliveAt() — npcAppearance === 'fact'일 때 생몰년(birth/death) 기준 필터링
추천 인물: recommend 값 기준 자동 선택(leadChars) — Stage 2 진입 시 자동 선택
소속 열: charJobListMap[ch.code]?.primary ?? subs[0] ?? '—'
우측 패널: <CharDetailComp :cha-code :scenario-id> — detail-fade 트랜지션
[게임 시작] 클릭 → game.startGame(scId, faction, charCode) 후 /game 라우팅
```

### charJobListMap — 소속(직업) 3단계 집계
```
map 값 타입: { primary: string|null, subs: string[] }

① planetsData (고유직업): governor → "{행성명} 총독" / commander → "{행성명} 사령관"
② fleetData   (고유직업): charList[].type C/O/S → "{함대명} 사령관/부관/분함대 사령관"
③ jobData     (서브직업): { charCode, label } — 다건 허용, subs[]에 push

규칙:
- ①②는 primary에 set. 이미 값 있으면 나중 값으로 덮어쓰고 console.error 출력
  → "[charJobListMap] 고유직업 중복 — {code}: "{기존}" → "{신규}" 로 덮어씀 [{source}]"
- ③은 항상 subs[]에 push (primary와 독립)
- 소스 없으면 '—' 표시
```

**데이터 파일 스키마** (시나리오 폴더 선택적 추가):
```js
// planetsData.js  →  PLANET_DATA
export const PLANET_DATA = [
  { code: "230006P01", governor: "CH_000443", commander: "CH_000444" },
]

// jobData.js  →  JOB_DATA
export const JOB_DATA = [
  { charCode: "CH_000789", label: "최고평의회 의장" },
]
```

gameStore `_loadScenarioFiles`에서 두 파일 모두 dynamic import (`planetsData`, `jobData` 키로 `_preloadedData`에 저장). 파일 없으면 `[]` 폴백.

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
| **summary** | ❌ | ❌ | ✅ 타이틀 하단 | ❌ | 짧은 시나리오 소개 |
| **variants** | ❌ | ❌ | ✅ subTitle 드롭다운 | ❌ | variant 간 전환 |
| yearType | ✅ 타임라인 핀 | ✅ 헤더 | - | - | |
| year | ✅ 타임라인/헤더 | ✅ 헤더 | ✅ 요약 | - | |
| month | ✅ 카드 | - | ✅ 요약 | - | |
| id | - | - | - | - | 키/URL 파람 |
| name[Kr] | ✅ 카드 | ✅ 헤더 | ✅ 요약 | - | |
| **name[En]** | ❌ | ❌ | ❌ | ❌ | **미노출** |
| **name[Jp]** | ❌ | ❌ | ❌ | ❌ | **미노출** |
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
name[En]   →  Step1 카드 하단 소자 표시 (영문 부제)
name[Jp]   →  Step1-1 상세 헤더 하단 (일문 병기) 또는 미표시
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
| 2026-06-13 | 시나리오 화면 flow 변경: 선택→소개→옵션→캐릭터 → 선택→옵션→캐릭터→소개 |
| 2026-06-13 | ScenarioOptionsView.vue 전면 재설계 (gold-dark 카드 UI, StarfieldCanvas) |
| 2026-06-13 | ScenarioCharSelectView.vue 전면 재설계 (faction→캐릭터 2단계, slide 트랜지션) |
| 2026-06-13 | lobbyStore.js 신규: options, selectedFaction, selectedVariant |
| 2026-06-13 | scenarioData.js: SE796_10~13 추가 (variants, showYn, subTitle, date, summary 필드) |
| 2026-06-13 | ScenarioOptionsView: subTitle 칩 클릭 → variant 드롭다운으로 시나리오 전환 |
| 2026-06-13 | ScenarioOptionsView: summary 필드 화면 표시 추가 |
| 2026-06-13 | Step1HistoryGraph.vue: showYn !== false 필터로 숨김 variant 제외 |
| 2026-06-18 | ScenarioSelectView.vue 신규 작성 — legacy/Step1HistoryGraph 대체, lobbyStore 연동 |
| 2026-06-18 | 카드 클릭 잠금: isScenarioUnlocked (openPt/userUnlocks 기준, useYn 미체크) |
| 2026-06-18 | prevPlayable/nextPlayable: showYn !== false 필터 추가 |
| 2026-06-18 | SingleView 새 게임 진입 시 lobby.loadUnlocks() 선행 호출 |
| 2026-07-03 | `ScenarioDetailView.onStart()` 라우팅 버그 수정 — `scenario-options`로 정상 이동하도록 변경, `ScenarioOptionsView.vue`의 옵션 카드 `disabled` 제거 후 클릭 시 `lobby.options[grp.key] = opt.val` 연결 |
| 2026-08-10 | `ScenarioCharSelectView.vue` Step 3 전면 재설계 — Stage 1(국가 선택)/Stage 2(인물 선택) 2단계 유지, 인물 상세 우측 사이드 패널로 이동, 소속 열 추가, preload guard(onMounted 리디렉트) 추가 |
| 2026-08-10 | charJobListMap 도입 — `{ primary, subs }` 구조. ①planetsData(총독/사령관) ②fleetData(함대직) = 고유직업(primary), ③jobData = 서브직업(subs). primary 중복 시 덮어쓰기 + console.error |
| 2026-08-10 | gameStore `_loadScenarioFiles` — planetsData.js(`PLANET_DATA`), jobData.js(`JOB_DATA`) 두 파일 dynamic import 추가 (없으면 `[]` 폴백) |

---

## TODO

### 미결
- [ ] `scenario.js` SE640~SE801 이벤트 항목 입력 (사용자 직접 작업)
- [ ] `ScenarioDetailView.vue` 구매 완료 상태 연동 (lobbyStore.purchaseScenario, Phase 3)
- [ ] name[En] 카드 노출 여부 결정
- [ ] appearances 화면 노출 방안 결정
- [ ] factions 세력 뱃지 표시 여부 결정
- [ ] legacy/ 폴더 삭제 — 삭제 전 잔존 참조 grep 확인 필수

### 완료
- [x] `ScenarioSelectView.vue` 신규 작성 (Step1 타임라인, lobbyStore 연동) — 2026-06-18
- [x] `router/index.js` scenario-select 라우트 → 신규 ScenarioSelectView.vue 교체 — 2026-06-18
- [x] `ScEventListLayout.vue` isScenarioUnlocked 카드 클릭 잠금 체크 — 2026-06-18
- [x] `ScEventListLayout.vue` prevPlayable/nextPlayable showYn 필터 추가 — 2026-06-18
- [x] `SingleView.vue` 새 게임 진입 시 lobby.loadUnlocks() 호출 — 2026-06-18
- [x] `ScenarioDetail.vue` 신규 생성 (desc[] 페이지, libs, 버튼 분기)
- [x] `eventData.js` 삭제 — scenario.js 기반으로 통합
- [x] `Step1HistoryGraph.vue` yearType AD/SE/RC 지원 + ERA_ORDER 정렬
- [x] `Step2GameOptions.vue` event.name → `event.name.find(e=>e.code==='Kr')?.context`
- [x] `Step3CharSelect.vue` charList.js faction 우선 + charactersData.js 폴백
- [x] `Step3CharSelect.vue` NPC 등장 사실 모드 → birth/death 기준 생존 필터
- [x] `gameStore.js` startGame FACTIONS[pf] undefined 크래시 수정
