# 게임 하단 버튼 (BottomBar / MenuPanel)
> 분류: 화면
> 경로: `docs/209_screen_bottombar.md`
> 상위: [200_SCREEN.md](200_SCREEN.md)
> 최종 수정: 2026-06-17

---

## 관련 파일

| 파일 | 역할 |
|---|---|
| `src/components/ui/BottomBar.vue` | 하단 버튼 8개 + 턴 종료 버튼 |
| `src/components/game/panels/MenuPanel.vue` | 버튼 클릭 시 슬라이드업 패널 |
| `src/data/base/agenda/menuTree.js` | 카테고리별 메뉴 트리 정의 |
| `src/data/base/agenda/agendaData.js` | 결재 체인, 액션 타입 |
| `src/stores/gameStore.js` | openModal(), registerAgenda() |

---

## 전체 흐름

```
BottomBar 버튼 클릭 (toggle)
  └── activecat 변경 → MenuPanel 열림
        ├── currentItems = MENU_TREES[category] 표시
        ├── 결재권자 + 대기 의안 표시 (의안 카테고리만)
        └── 항목 클릭 (handleItem)
              ├── children 있음 → navStack.push (drill-down)
              └── leaf 항목
                    ├── modal 있음 → game.openModal(modal) + 닫기
                    └── action 있음 → game.registerAgenda(action, payload) + 닫기
```

---

## BottomBar.vue

### 버튼 배치 (2×4 그리드)

| ROW1 | 군사 | 내정 | 인사 | 첩보 |
|---|---|---|---|---|
| **ROW2** | **연구** | **재정** | **개인** | **정보** |

- 우측 고정: **턴 종료** 버튼 (세력 색상 — REH=red / FPA=blue / PZN=green)
- `toggle(id)`: 같은 버튼 재클릭 시 `activecat = null` → MenuPanel 닫힘

### CSS 핵심
- `height: var(--bar-h)` (`clamp(88px, 11vh, 112px)`)
- 활성 버튼(`.cat-btn.on`): 금색 상단 인셋 글로우 + 격자 패턴 오버레이
- landscape 저해상도: `--bar-h: 52px`

---

## MenuPanel.vue

### 표시 조건별 구성

| 조건 | 표시 내용 |
|---|---|
| 항상 | 헤더 (타이틀 + 뒤로가기 + 닫기) |
| 의안 카테고리 + 최상위 레벨 | 결재권자 정보 + 대기 의안 목록 |
| group 타입 항목 | 그룹 라벨 + 버튼들 (가로 나열) |
| children 있는 항목 | `›` 표시, 클릭 시 drill-down |
| leaf 항목 | 클릭 시 모달 열기 또는 의안 등록 |

### 의안 카테고리 판정
```js
const AGENDA_CATS = new Set(['domestic', 'personnel', 'intel', 'research'])
// military, finance, personal, info 는 의안 카테고리 아님
```

### 결재권자 계산
```js
// APPROVAL_CHAINS[playerFaction][category] 순서대로
// currentPost === jobId && !isDead 인 인물 → 첫 번째가 결재권자
// maxActive = Math.max(1, Math.floor(approver.politics / 10))
```

---

## menuTree.js — 메뉴 트리 구조

### 항목 타입

```js
// leaf — 최종 실행 항목
{ id, label, modal? }        // modal: game.openModal(modal) 호출
{ id, label, action? }       // action: game.registerAgenda(action, payload) 호출  ← TODO
{ id, label, disabled: true }// 비활성 (미구현)

// parent — drill-down 항목
{ id, label, children: [...] }

// group — 같은 행에 버튼 나열
{ id, label, type: 'group', items: [...] }
```

### 카테고리별 현황

| 카테고리 | 구현 항목 | 미구현(disabled) |
|---|---|---|
| military | 작전제안, 함대출격, 수송, 편성, 재편, 해산 | 훈련, 모의전 |
| domestic | 예산배분, 행성개발, 함선제작 | 함선설계 |
| personnel | 내정인사, 군사인사 | — |
| intel | 첩보, 방첩, 특수 | — |
| research | — | 체제, 사상, 내정설비, 군사설비, 전술연구 |
| finance | 재정현황, 세율조정 | — |
| personal | — | 뉴스, 임관/퇴역, 입당/탈당, 개인훈련, 교육 |
| info | 인물, 함대, 세력 | 성계 |

---

## JS 주석 기반 구현 지시 방식

`menuTree.js` leaf 항목 위에 블록 주석으로 모달/로직 스펙을 직접 작성하면  
Claude Code(VSCode 연동)가 해당 파일을 보면서 모달과 로직을 구현한다.

### 주석 작성 규칙

```js
/**
 *  {모달명}.vue → {ModalName}.vue
 *
 *  결정권자: (세력별 결재 체인)
 *  제안 가능 조건: (계급/직위 등)
 *  효과: (게임 내 효과 설명)
 *
 *  {입력 필드명}: {타입/설명}
 *  ...
 *
 *  [버튼명] 버튼: (클릭 시 동작)
 *
 *  제출 시 → {저장 위치/함수}
 *  턴 종료 시 → {처리 로직}
 */
{ id: 'xxx', label: '...', modal: 'xxx' },
```

### 구현 완료 후 주석 정리 기준
- 구현 전: 전체 스펙 주석 유지
- 구현 완료: 한 줄 설명 주석으로 교체
  ```js
  // OperationModal: 작전 발의/수정, 결재권자 친밀도 기반 수락
  { id: 'op_propose', label: '작전제안', modal: 'operation' },
  ```

---

## 현재 구현된 모달 연결 맵

| modal 키 | 파일 | 담당 기능 |
|---|---|---|
| `military` | MilitaryModal.vue | 함대 출격 |
| `fleet` | FleetModal.vue | 함대 편성/재편/해산/수송 |
| `finance` | FinanceModal.vue | 재정 (차관/징수/예산) |
| `tax` | TaxModal.vue | 세율 조정 |
| `build` | BuildModal.vue | 행성 개발 |
| `char` | CharModal.vue | 인사 발령 |
| `intel` | IntelModal.vue | 첩보/외교 |
| `event` | EventModal.vue | 스토리 이벤트 |
| `operation` | OperationModal.vue | 작전 발의 ← **미구현** |

---

## TODO

- [ ] `handleItem` — `item.action` 분기 추가 (`game.registerAgenda` 연결)
- [ ] `OperationModal.vue` 구현 (menuTree.js 주석 스펙 참조)
- [ ] `military` 카테고리도 `isAgendaCat`에 포함 여부 결정
- [ ] `finance`, `personal`, `info` 카테고리 결재 체인 정의 여부 결정
- [ ] disabled 항목 단계적 구현 (research / personal 우선순위 낮음)
