# LOGH-WEB — Claude 가이드

## 프로젝트 개요

- 원작: BOTHTEC 은하영웅전설 IV EX (1996, DOS)
- 스택: Vue 3 + Vite + Pinia (JS, 순수 프론트엔드)
- 목표: 원작 DOS 게임을 Vue3 기반 웹앱으로 완전 포팅

---

## 문서 위치

모든 설계 문서는 `docs/` 폴더에 집중 관리.

| 파일 | 내용 |
|---|---|
| `docs/000_INDEX.md` | 총괄 인덱스 — 진행 현황, 코딩 컨벤션 |
| `docs/100_DATA.md` | 데이터 계층 인덱스 |
| `docs/200_SCREEN.md` | 화면 계층 인덱스 |

세부 문서는 각 총괄 인덱스 참조.

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

### 패널 UI 타이포그래피

게임 패널 내부 텍스트 규칙 (`CharInfoPanel` 등 기준):

| 용도 | 클래스 | 폰트 변수 | 색상 |
|---|---|---|---|
| 모달·팝업 최상위 제목 | `.t-title` | `--fs-2xl` (≈18px) | `var(--tg)` |
| 주요 레이블 (직책명·트레잇명) | `.t-label` | `--fs-md` (≈12px) | `var(--t1)` |
| 보조 항목 (하위 직책 등) | `.t-sub` | `--fs-sm` (≈11px) | `var(--t2)` |
| 코드·약어·수치 (등급·레벨) | `.t-code` | `--fs-xs` (≈10px) | `var(--td)` |
| 마이크로 배지 (타입·코드ID) | `.t-micro` | `--fs-2xs` (≈9px) | `var(--td)` |

- `letter-spacing: .5px` 통일
- 폰트 크기는 **`var(--fs-*)` 변수 또는 `rem` 단위** 사용
- 패널 내 `vh`/`vw` 폰트 크기 **금지**
- 루트: `html { font-size: clamp(8px, 2.5vmin, 10px) }` → 10px 기준, 소형폰 비례 축소

### 버튼 클래스

```
.btn          기본
.btn-gold     골드 (확인/긍정)
.btn-red      레드 (제국/위험)
.btn-blue     블루 (동맹/정보)
.btn-green    그린 (페잔/성공)
```
