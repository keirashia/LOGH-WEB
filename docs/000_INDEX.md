# LOGH-WEB — 문서 관리 가이드 (총괄)
> 분류: 총괄
> 경로: `docs/000_INDEX.md`
> 최종 수정: 2026-06-17

## 프로젝트 개요

- 원작: BOTHTEC 은하영웅전설 IV EX (1996, DOS)
- 스택: Vue 3 + Vite + Pinia (JS, 순수 프론트엔드)
- 목표: 원작 DOS 게임을 Vue3 기반 웹앱으로 완전 포팅
- 멀티플레이: Phase 3에서 WebSocket(LOGH_API) 연동 예정

---

## 문서 계층 구조

```
docs/
├── 000_INDEX.md          총괄 (이 파일)
│
├── 100_DATA.md           데이터 총괄
├── 101_data_core.md      데이터 폴더 / 코드 체계
├── 102_data_stars.md      성계 / 항로 / 행성
├── 103_data_scenarios.md  시나리오 초기값
├── 104_data_factions.md   세력 / 정치 / 이념
├── 105_data_characters.md 인물 마스터
├── 106_data_fleet.md      함대 설계
├── 107_data_agenda.md     의안 시스템
├── 108_data_turns.md      턴 시스템
├── 109_data_stores.md     Pinia 스토어
├── 110_data_init.md       게임 초기화
│   111~199 여유
│
├── 200_SCREEN.md          화면 총괄
├── 201_screen_design.md   디자인 시스템
├── 202_screen_router.md   라우터
├── 203_screen_views.md    뷰 목록
├── 204_screen_lobby.md    로비 화면
├── 205_screen_scenario.md 시나리오 선택 화면
├── 206_screen_encyclopedia.md 사전 화면
├── 207_screen_characters.md   인물 모달 화면
├── 208_screen_components.md   컴포넌트
├── 209_screen_bottombar.md    BottomBar / MenuPanel 상세
│   210~299 여유
│
│   300~: 전투 / 정치 / API 등 향후 확장
```

| 총괄 문서 | 담당 |
|---|---|
| [100_DATA.md](100_DATA.md) | 데이터·로직 계층 |
| [200_SCREEN.md](200_SCREEN.md) | 화면·디자인 계층 |

## MD 파일 관리 규칙

### 계층 원칙
- 모든 문서 MD는 `docs/` 폴더 한 곳에 집중 관리
- 파일명 prefix로 계층 식별: `0XX`=총괄, `1XX`=데이터, `2XX`=화면, `3XX~`=향후 확장
- 새 문서는 반드시 해당 총괄(DATA/SCREEN/...)에 인덱스 등록

### 헤더 통일 규칙
```
# {제목}
> 분류: 총괄 | 데이터 | 화면
> 경로: `docs/{파일명}`
> 상위: [{상위 파일명}]({상위 파일명})
> 최종 수정: YYYY-MM-DD
```

### 본문 구조
**개요** → **파일 목록** → **상세** → **TODO**

## 코딩 컨벤션

- **언어**: JavaScript (TypeScript 미사용)
- **스타일**: CSS 변수 기반 (`src/assets/global.css`)
- **import 경로**: 항상 `@/` 절대 경로 사용
- **require() 금지**: import 방식만 사용
- **모달 추가**: `GameView.vue`의 `MODAL_MAP`에 등록 + `game.openModal('name')` 호출
- **로그**: `game.addLog()` 로 이벤트 기록

### CSS 주요 변수

```css
--bg / --bg2 / --bg3 / --bg4   배경 레이어
--bd / --bdg                   테두리
--t1 / --t2 / --td / --tg      텍스트 (기본/보조/희미/골드)
--REH / --FPA / --PZN          세력 색상 (제국/동맹/페잔)
--r                            border-radius (6px)
--font-serif / --font-sans / --font-mono
```

### 패널 UI 타이포그래피 (게임 패널 기준)

게임 패널(CharInfoPanel 등) 내부 텍스트는 아래 규칙을 따른다.

| 용도 | 폰트 클래스 | 크기 | 색상 |
|---|---|---|---|
| 주요 레이블 (직책명·트레잇명 등) | `serif` | `12px` | `var(--t1)` |
| 보조 항목 (하위 직책·펼침 항목) | `serif` | `11px` | `var(--t2)` |
| 코드·약어·번호 (등급·레벨 등) | `mono` | `9~10px` | `var(--td)` |
| letter-spacing | — | — | `.5px` |

- `vh`/`vw` 기반 폰트 크기 **금지** — 패널 폭이 고정 범위이므로 `px` 사용
- 레이아웃 폭 기준값: `clamp(200px, 22vw, 280px)`

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
- **Phase 1-4**: 스토리 이벤트 (EventModal + triggerCoup/Defection/Resignation/Death)
- **전술 전투**: tacticalData.js + tacticalStore.js + TacticalView.vue 완성
- **데이터 구조 개편**: starSystemData.js (62개) + laneData.js + starDetail.js (시나리오별)
- **GalaxyMap**: VW=1600/VH=1000, 항로 type별 색상 구분 (corridor/phezzan/normal)
- **세부맵**: src/data/base/stars/maps/ 62개 성계 개별 파일
- **BottomBar v2**: 8개 카테고리 2×4 그리드 + 로비 카드 다크 골드 CSS, --bar-h CSS 변수 도입
- **MenuPanel**: 카테고리별 drill-down 메뉴 패널 (navStack, menuTree.js)
- **의안 시스템**: agendaData.js + menuTree.js + gameStore 통합 (registerAgenda / _processAgendas)
- **MD 개편**: docs/ 폴더 중앙화 (102~106 신규 작성, src/ 분산 MD 전체 삭제)

### ⬜ 진행 중 / 다음 작업

| 우선순위 | 항목 | 비고 |
|---|---|---|
| 🔴 | 성계 좌표 수정 미반영 문제 | starSystemData.js 수정 후 게임에 반영 안 됨 — 원인 조사 |
| 🟡 | lane.js 고립 성계 7개 항로 추가 | ARESHYUM/BARATULF/FIREZIERD/HAN/LUYKAS_FPA/MARBACH/PORGEN |
| 🟡 | starSystemData.js nameJp 62개 입력 | 현재 빈 문자열 |
| 🟡 | code 중복 3건 원작 확인 | ALTENER/LUYKAS/MARADEITA |
| 🟡 | starsData.js LEGACY 파일 삭제 확인 | 현재 미참조 |
| 🟡 | 의안 _executeAgenda 액션 구현 | planet_develop/ship_design/research_* stub 상태 |
| 🟡 | 친밀도(intimacy) 시스템 | 현재 등록 순서로 임시 정렬 |
| 🟢 | REH 군사 3장관 협의 로직 | 2/3 동의 판정 미구현 |
| 🟢 | FPA 평의원 11명 AI 투표 | 미구현 |
| 🟢 | 인물 데이터 리팩토링 | char.js → charBase/charTender/charDetail/charJobs/charTraits 분리 |
| 🟢 | 민란 시스템 | morale < 20 → 반란 |
| 🟢 | AI 개선 | 전략적 함대 건조, 세력별 성격 |
| 🟢 | LOGH-API schema.sql 재작성 | 새 code 체계 반영 |
| ✅ | 누락 상세 MD 작성 | 102~106 전체 작성 완료 (2026-06-17) |

### ⬜ 예정 (Phase 2~3)

- **Phase 2-1**: Encyclopedia/Tutorial/Admin 뷰 채우기
- **Phase 2-2**: 리팩토링 (turnEngine 분리 등)
- **Phase 3-1**: LOGH_API 연동 (저장/불러오기)
- **Phase 3-2**: WebSocket 멀티플레이

---

## 원본 데이터 (Eun4ex/)

경로: `c:\Users\user\Documents\workspace\LOGH\Eun4ex\`

| 파일 | 내용 |
|---|---|
| EVTALK.MSG | 전략 이벤트 대사 (Shift-JIS, 28개 섹션) |
| EVTAC.MSG | 전술 전투 대사 |
| G4XSNR00~09.DAT | 시나리오 10개 데이터 |
| UNIT00.DAT | 유닛 스탯 |
| MSG00.DAT | 게임 메시지 |
