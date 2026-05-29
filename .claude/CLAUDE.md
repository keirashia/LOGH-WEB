# LOGH-WEB — 문서 관리 가이드

## 프로젝트 개요

- 원작: BOTHTEC 은하영웅전설 IV EX (1996, DOS)
- 스택: Vue 3 + Vite + Pinia (JS, 순수 프론트엔드)
- 목표: 원작 DOS 게임을 Vue3 기반 웹앱으로 완전 포팅
- 멀티플레이: Phase 3에서 WebSocket(LOGH_API) 연동 예정

---

## MD 파일 관리 규칙

### 원칙
- `.claude/` 폴더에는 이 가이드 파일만 존재
- 각 주요 폴더에 `{폴더명}.md` 파일 하나씩 배치
- 내용 구조: **개요** → **파일 목록** → **상세** → **TODO**

### MD 파일 목록

| 파일 | 담당 내용 |
|---|---|
| `src/data/data.md` | 데이터 폴더 전체 구조, masterData.js, 코드 체계 |
| `src/data/stars/stars.md` | 성계/항로/행성 마스터 데이터, 좌표 범위 |
| `src/data/scenarios/scenarios.md` | 시나리오별 초기값 |
| `src/data/factions/factions.md` | 세력/정치/이념 데이터 |
| `src/data/characters/charactersData.md` | 인물 데이터 |
| `src/stores/stores.md` | 전체 스토어 개요, gameStore 상태/액션 상세 |
| `src/components/components.md` | 컴포넌트 구조, GalaxyMap 스펙, 모달 목록 |
| `src/components/game/modals/characters/characters.md` | 인물 모달 화면 설계 (CharModal/CharDetailModal) |
| `src/views/views.md` | 뷰 목록, 라우터 경로, 각 뷰 상세 |
| `src/router/router.md` | 라우터 가드, 접근 제어 |

---

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
- **데이터 구조 개편**: starSystemData.js (62개) + lane.js (72개) + S01/starDetail.js
- **GalaxyMap**: VW=1600/VH=1000, 항로 type별 색상 구분 (corridor/phezzan/normal)
- **세부맵**: src/data/stars/maps/ 62개 성계 개별 파일

### ⬜ 진행 중 / 다음 작업

| 우선순위 | 항목 | 비고 |
|---|---|---|
| 🔴 | 성계 좌표 수정 미반영 문제 | starSystemData.js 수정 후 게임에 반영 안 됨 — 원인 조사 |
| 🟡 | lane.js 고립 성계 7개 항로 추가 | ARESHYUM/BARATULF/FIREZIERD/HAN/LUYKAS_FPA/MARBACH/PORGEN |
| 🟡 | starSystemData.js nameJp 62개 입력 | 현재 빈 문자열 |
| 🟡 | code 중복 3건 원작 확인 | ALTENER/LUYKAS/MARADEITA |
| 🟡 | starsData.js LEGACY 파일 삭제 확인 | 현재 미참조 |
| 🟢 | 인물 데이터 리팩토링 | char.js → charBase/charTender/charDetail/charJobs/charTraits 분리 |
| 🟢 | 민란 시스템 | morale < 20 → 반란 |
| 🟢 | AI 개선 | 전략적 함대 건조, 세력별 성격 |
| 🟢 | LOGH-API schema.sql 재작성 | 새 code 체계 반영 |

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
