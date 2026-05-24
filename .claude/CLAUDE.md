# 銀河英雄伝説 IV EX — Vue Port (LOGH_WEB)

## 프로젝트 개요
- 원작: BOTHTEC 은하영웅전설 IV EX (1996, DOS)
- 스택: Vue 3 + Vite + Pinia (JS, 순수 프론트엔드)
- 목표: 원작 DOS 게임을 Vue3 기반 웹앱으로 완전 포팅
- 멀티플레이: Phase 3에서 WebSocket(LOGH_API) 연동 예정

---

## 폴더 구조

```
LOGH-WEB/
├── .claude/CLAUDE.md       ← 이 파일
├── package.json
├── vite.config.js
├── index.html
└── src/
    ├── App.vue
    ├── main.js
    ├── assets/global.css   ← 전역 CSS (우주 오페라 다크 테마)
    ├── data/
    │   ├── masterData.js   ← 세력/인물/성계/시나리오/이벤트 + FINANCE/MILITARY/INTEL 데이터
    │   └── tacticalData.js ← 전술전투: 진형 6종, 지형, 맵 빌더
    ├── stores/
    │   ├── gameStore.js        ← 메인 게임 엔진 (24개 actions + _pendingBattle)
    │   ├── tacticalStore.js    ← 전술 전투 엔진 (완성)
    │   ├── authStore.js        ← 로그인/계정/기기이전 (Phase3 API 연동 예정)
    │   ├── encyclopediaStore.js← 사전 캐시
    │   ├── seasonStore.js      ← 시즌/역사 관리
    │   └── wsStore.js          ← WebSocket (Phase3 껍데기)
    ├── router/index.js
    ├── views/
    │   ├── title/TitleView.vue
    │   ├── user/
    │   │   ├── LoginView.vue
    │   │   ├── RegisterView.vue
    │   │   ├── UserBadge.vue
    │   │   └── UserProfileView.vue
    │   ├── lobby/LobbyView.vue
    │   ├── game/
    │   │   ├── GameView.vue        ← 메인 게임 레이아웃
    │   │   └── TacticalView.vue    ← 전술 전투 화면 (완성)
    │   ├── tutorial/TutorialView.vue   ← 껍데기
    │   ├── encyclopedia/EncyclopediaView.vue ← 껍데기
    │   └── admin/AdminView.vue         ← 껍데기
    └── components/
        ├── ui/
        │   ├── UserBar.vue
        │   ├── GameHud.vue
        │   ├── EventLog.vue
        │   ├── BottomBar.vue   ← position:fixed, 하단 주요 버튼 + 턴 종료
        │   └── StatRow.vue
        └── game/
            ├── map/GalaxyMap.vue       ← SVG 갤럭시맵 (VW=820, VH=490)
            ├── panels/
            │   ├── SidePanel.vue
            │   └── InfoPanel.vue
            └── modals/
                ├── TaxModal.vue
                ├── FinanceModal.vue
                ├── FleetModal.vue
                ├── MilitaryModal.vue
                ├── BuildModal.vue
                ├── CharModal.vue
                └── IntelModal.vue
```

---

## 라우터 경로

| path | 설명 |
|---|---|
| `/` | TitleView |
| `/user/login` | LoginView (로그인/계정생성/기기이전) |
| `/user/register` | RegisterView |
| `/user/profile` | UserProfileView |
| `/lobby` | LobbyView (멀티/싱글/시나리오 선택) |
| `/game` | GameView (game.initialized 필요) |
| `/game/tactical` | TacticalView (전술 전투, _pendingBattle 경유) |
| `/tutorial` | TutorialView |
| `/encyclopedia` | EncyclopediaView |
| `/admin` | AdminView (isAdmin 필요) |

---

## gameStore 주요 상태

```js
{
  initialized, playerFaction, year, impYear, month, turn,
  systems,      // { [id]: { ...STAR_SYSTEMS, faction, morale, tax, underConstruction } }
  resources,    // { EMPIRE: {gold}, ALLIANCE: {gold}, PHEZZAN: {gold} }
  characters,   // { [id]: { ...CHARACTERS, currentPost } }
  fleets,       // { EMPIRE: [...], ALLIANCE: [...], PHEZZAN: [] }
  log,          // 이벤트 로그
  selectedSystem, selectedFleet, activeModal,
  gameOver, winner,
  _pendingBattle, // 전술전투 브릿지: GameView가 watch → /game/tactical 라우팅
  // 재정
  _levyCooldown, _loanBalance, _loanDueTurn, _reserve, _intelligenceFund,
  // 군사
  _fleetSeq,
  // 정보·외교
  _truce, _tradeBonus,
}
```

## gameStore actions

### 기본
- `startGame(scId, pf)` — 게임 초기화
- `endTurn()` — 턴 종료 (수입/건설/이벤트/AI/날짜)
- `selectSystem(id)` / `selectFleet(id)`
- `openModal(name, payload)` / `closeModal()`
- `addLog(msg)`
- `addSystem(name, x, y)` — 맵 편집용 성계 추가
- `removeSystem(id)` — 맵 편집용 성계 삭제

### 국정
- `changeTax(sysId, rate)`
- `buildConstruction(sysId, type)` — ARSENAL/DEF_BASE/GARRISON
- `assignChar(charId, post)`

### 재정
- `emergencyLevy()` — 임시 징수 (월수입 30%, 민심 -10, 3턴 쿨다운)
- `takeLoan(amount)` — 페잔 차관 (500~5000, 이자 5%, 6턴 상환)
- `repayLoan()`
- `allocateBudget(allocations)`

### 군사
- `deployFleet(fleetId, targetId, opType)` — 방어 함대 있으면 _pendingBattle 세팅 후 'tactical' 반환
- `applyBattleResult(result)` — TacticalView에서 전투 결과 수신
- `formFleet(name, cmdId, sizeKey, locationId)`
- `reorganizeFleet(fleetId, newShips)`
- `disbandFleet(fleetId)`
- `moveFleet(fleetId, targetSysId)`
- `retreatFleet(fleetId)`
- `transportResources(from, to, itemType, amount)`

### 정보·외교
- `launchIntelOp(targetSysId, opType, officerId)`
- `restoreSecurity(sysId, level, officerId)`
- `launchProposal(targetFaction, propType)`

---

## MODAL_MAP (GameView.vue)

```js
{ tax, fleet, build, char, finance, military, intel }
```

---

## GalaxyMap.vue 주요 스펙

- SVG viewBox: `0 0 820 490`, `preserveAspectRatio="xMidYMid slice"`
- 줌: 마우스 휠 + 핀치 (scale 0.4~5), 버튼 +/⌂/−
- 팬: 드래그
- 클릭 이벤트: 성계(selectSystem) / 함대(selectFleet) / 항로(selectedLane 토글, 금색 글로우)
- 편집 모드(✏️): 이동/라인/추가/삭제 툴
- 항로 라인: opacity 0.45, stroke-width 1.5, dasharray "5 6" (편집 시 0.65/2)

---

## masterData.js exports

```js
FACTIONS, CHARACTERS, STAR_SYSTEMS (14개), LANES,
OPERATION_TYPES, FORTRESS_WEAPONS,
CONSTRUCTION_TYPES, SCENARIOS (5개), DIALOGS,
FINANCE, MILITARY, INTEL, POSTS,
```

### STAR_SYSTEMS 좌표 범위
- viewBox 820×490 기준: x=62~755, y=78~408
- 제국(우측), 동맹(좌측), 이젤론 회랑(중앙), 페잔(남부)

---

## 코딩 컨벤션

- **언어**: JavaScript (TypeScript 미사용)
- **스타일**: CSS 변수 기반 (global.css의 --bg, --empire 등)
- **import 경로**: 항상 `@/` 절대 경로 사용
- **파일 생성 후**: router/index.js 또는 부모 컴포넌트에 등록
- **모달**: GameView.vue의 MODAL_MAP에 등록, game.openModal('name') 으로 호출
- **로그**: game.addLog() 로 이벤트 기록
- **require() 금지**: import 방식 사용

### CSS 주요 변수
```css
--bg / --bg2 / --bg3 / --bg4   배경 레이어
--bd / --bdg                   테두리
--t1 / --t2 / --td / --tg      텍스트 (기본/보조/희미/골드)
--empire / --alliance / --phezzan  세력 색상
--r                            border-radius (6px)
--font-serif / --font-sans / --font-mono
```

### 버튼 클래스
```
.btn          기본
.btn-gold     골드 (확인/긍정)
.btn-red      레드 (제국/위험)
.btn-blue     블루 (동맹/정보)
.btn-green    그린 (페잔/성공)
```

---

## 진행 현황

### ✅ 완료
- **Phase 1-1**: 국정 재정 (임시징수/페잔차관/예산배분)
- **Phase 1-2**: 군사 확장 (함대 편성·재편성·해산/수송/철수)
- **Phase 1-3**: 정보·외교 (첩보작전/치안회복/제안공작)
- **전술 전투 시스템**: tacticalData.js + tacticalStore.js + TacticalView.vue 완성
  - 진형 6종 (DOUBLE_COL/LINE, RING, WEDGE, CRANE_WING, CONE)
  - 이동/공격/AI턴/사기/격퇴/승리판정
  - _pendingBattle 브릿지: deployFleet → GameView watch → /game/tactical 라우팅
- **GalaxyMap 개선**: 줌/팬/편집모드/항로 시인성/성계 좌표 재배치 (VW=820 VH=490)
- **버그 수정**: _income() 삼중계산 → 단일계산, GameView BottomBar 중복 제거

### ⬜ 다음 작업 (우선순위 순)

1. **데이터 구조 개선** (최우선)
   - 1순위: LOGH_API에서 데이터 fetch (성계/인물/시나리오 등)
   - 2순위(폴백): 내부 XLS 파일에서 읽어들이기
   - masterData.js의 하드코딩 데이터를 API/XLS 기반으로 전환

2. **민란 시스템**
   - 성계 morale < 20 → 반란 발생, 중립화 또는 타 세력 귀순

3. **AI 개선**
   - 전략적 함대 건조 (축적 골드 활용)
   - 세력별 성격: 제국=공세, 동맹=수비, 페잔=외교

4. **이벤트 시스템**
   - Eun4ex/EVTALK.MSG 기반
   - 특정 턴/조건에서 대사/이벤트 발생 (라인하르트 즉위, 키르히아이스 사망 등)

5. **데이터 추가**
   - 추가 인물: 루츠, 파렌하이트, 뮐러, 부코크, 피셔, 줄리안 민츠 등
   - 시나리오 5→10개, 시나리오별 초기 함대 편성

### ⬜ 예정 (Phase 2~3)
- **Phase 2-1**: 뷰 채우기 (Encyclopedia/Tutorial/Admin)
- **Phase 2-2**: 리팩토링 (require → import, turnEngine 분리)
- **Phase 3-1**: LOGH_API 연동 (authStore 실제 연결, 저장/불러오기)
- **Phase 3-2**: WebSocket 멀티플레이

---

## 원본 데이터 파일 (Eun4ex 폴더)

경로: `c:\Users\user\Documents\workspace\LOGH\Eun4ex\`

| 파일 | 내용 |
|---|---|
| EVTALK.MSG | 전략 이벤트 대사 (Shift-JIS, 28개 섹션) |
| EVTAC.MSG | 전술 전투 대사 (요새포/피해/결과) |
| G4XSNR00~09.DAT | 시나리오 10개 데이터 |
| TACMAP.PRT | 전술 맵 타일 스프라이트 |
| GIN4TAC.DAT | 함대 유닛 그래픽 (272KB) |
| TAC_ETC.DAT | 전술 맵 유닛 배치 좌표 |
| UNIT00.DAT | 유닛 스탯 |
| MSG00.DAT | 게임 메시지 |

---

## 멀티플레이 설계 (Phase 3 대비)

```
LOGH_WEB (Vue)  ←→  LOGH_API (Node.js/Express + SQLite3, port 8081)
                     /auth  로그인·계정·기기이전
                     /game  시즌·세션·상태 저장
                     /ws    WebSocket 멀티 동기화
                     /admin 회원관리
```

- 시즌제: 기간별 서버 초기화 (역사 1기, 2기...)
- 기기이전: 이전 코드 발급 → 새 기기에서 입력
- 멀티: 세력별 플레이어 배정, 턴 동기화
