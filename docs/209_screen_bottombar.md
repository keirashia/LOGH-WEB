# 게임 하단 버튼 (BottomBar / MenuPanel)
> 분류: 화면
> 경로: `docs/209_screen_bottombar.md`
> 상위: [200_SCREEN.md](200_SCREEN.md)
> 최종 수정: 2026-06-27

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

| ROW1 | 국가 | 군사 | 내정 | 파벌 |
|---|---|---|---|---|
| **ROW2** | **인물** | **모략** | **사교** | **뉴스** |

- 우측 고정: **턴 종료** 버튼 (세력 색상 — REH=red / FPA=blue / PZN=green)
- `toggle(id)`: 같은 버튼 재클릭 시 `activecat = null` → MenuPanel 닫힘
- ROW1 = 국가 영역 (제안 중심) / ROW2 = 개인 영역 (직접 실행)

### CSS 핵심
- `height: var(--bar-h)` (`clamp(88px, 11vh, 112px)`)
- 활성 버튼(`.cat-btn.on`): 금색 상단 인셋 글로우 + 격자 패턴 오버레이
- 비활성 색상: `rgba(255,255,255,.75)`, 호버: `rgba(255,255,255,.95)`
- 글자 크기: `clamp(14px, 2.4vh, 22px)`
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
const AGENDA_CATS = new Set(['military', 'domestic', 'personnel', 'intel', 'research', 'finance'])
// nation, faction, personal, social, info 는 의안 카테고리 아님 (결재권자 패널 미표시)
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

### CAT_LABEL

```js
{
  nation: '국가', military: '군사', domestic: '내정', faction: '파벌',
  intel: '모략', personal: '인물', social: '사교', info: '뉴스',
  personnel: '인사', research: '연구', finance: '재정',  // 레거시/내부용
}
```

### 카테고리별 현황 (2026-06-27 기준)

| 카테고리 | 그룹 | 모달 연결 항목 | disabled |
|---|---|---|---|
| `nation` (국가) | 국가중점/정책/인사/외교/프로젝트 | 내정인사(char), 군사인사(char) | 나머지 전부 |
| `military` (군사) | 작전/함대/생산/인사/교리/군정/훈련 | 작전제안(operation), 수송(fleet), 함대편성~해산(fleet), 함선생산(military), 예산요청(finance) | 인사/교리/훈련 |
| `domestic` (내정) | 행성/건설/경제/인구/치안/연구/재정 | 행성개발(build), 재정현황(finance), 세율조정(tax) | 경제/인구/치안/연구 |
| `faction` (파벌) | 세력/지지/의제/투표/정치 | — | 전부 |
| `intel` (모략) | 정보/포섭/공작/암살/선전 | 정보수집·방첩·특수작전(intel) | 포섭/암살/선전 |
| `personal` (인물) | 프로필/관계/특성/경력/자산/가문/신분 | 능력치·직책(char) | 나머지 전부 |
| `social` (사교) | 방문/대화/선물/후원/연회/소개 | — | 전부 |
| `info` (뉴스) | 정치/군사/경제/소문/기록 | 파벌동향(intel), 함대정보(fleet), 인물전(char) | 나머지 |

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

---

## OperationModal.vue — 작전 발의 스펙

**modal 키**: `operation` | **파일**: `src/components/game/modals/OperationModal.vue`

### 결정권자 / 제안 조건

| 항목 | 내용 |
|---|---|
| 결정권자 | 동맹: 통합작전본부장 / 제국: 통수본부총장 |
| 제안 가능 계급 | 중장 이상 |

### 진입 시 동작 (순서)

1. 캐릭터 **행동력** 체크 — 3슬롯 모두 소진 시 alert `이번 턴엔 더 이상 제안할 수 없습니다.` → [확인] 닫기
2. 이번 턴 **제안 이력** 확인 → 있으면 해당 값 세팅, 작전명 끝에 `수정` 텍스트 추가
3. 이번 턴 **보류 이력** 확인 → 있으면 해당 값 기본값으로 세팅
4. 보류 이력 clear
5. 기본값 세팅 (아래 화면 구성 참조)

### 화면 구성

| 필드 | 기본값 | 설명 |
|---|---|---|
| [작전명] | `${성계명} 공격/방어작전` | 목표 성계 없으면 `-`, 아국=방어, 적국=공격. 우측 X 버튼(닫기 → 보류 clear) |
| [승인자] | 자동 입력, 변경불가 | 초상화 + 인물명(nick) + 발의자와의 관계(수락률) |
| [발의자] | 플레이어 캐릭터명(nick) | 초상화 + 인물명(nick) + 수락률. 자신이면 초상화+이름만. 우측 [변경] 버튼 |
| [작전목표] | `-` | 우측 [변경] 버튼 |
| [출격함대] | 1개 | 함대 수 선택 바(bar) + Number input (1 ~ 자국 함대수) |
| [작전기간] | 1개월 | 기간 선택 바 + Number input (1~30) |
| [작전예산] | 0 디나르\|\|마르크 | computed: 출격함대 × 작전기간 × 작전비용 (공격=1000 / 방어=200) |
| [보안도] | 0% | computed (아래 계산식) |
| [특이사항] | 빈값 | 자유 입력 |
| [제안] 버튼 | 빈값 없을 때 활성화 | 행동력 슬롯에 `제안 : 작전 발의 (x)` 추가 후 저장 |
| [보류] 버튼 | — | 현재 상태값 임시 저장 후 닫기 |

### 보안도 계산

```
A = 아국 정보 담당관 INF (공석이면 0)
B = 적국 정보 담당관 INF (공석이면 0)
C = 발의자 INF (필수)
D = 발의자가 플레이어가 아닌 경우, 추가 인물 INF

공격작전: D 있음 → ~60% / D 없음 → ~80%
방어작전: D 있음 → ~70% / D 없음 → ~90%
국가·목표성계 트레잇에 따라 추가 보정 가능
```

### 힌트 UI

- 힌트 있는 필드 label 옆에 `?` 표시
- `?` 꾹 누르기 → 1.5초에 걸쳐 좌→우 색상 변경 → 완료 시 힌트 텍스트 노출

| 필드 | 힌트 (세력별 분기 포함) |
|---|---|
| [승인자] | `(동맹) ...평의회 의결 → 통과` / `(제국) ...3장관 회의, 재상(대리), 황제 승인` |
| [발의자] | `중장 이하이거나 관계가 나쁜 경우 다른 인물 대리 가능` |
| [출격함대] | `3대 발의 시 3대 모두 교전지역 도착 후 공격 수행` |
| [작전기간] | `만료 시 교전 중인 함대 제외 나머지는 소속행성 복귀 시도` |
| [작전예산] | `매 턴(일) 지불, 예산 0이면 모두 후퇴` |
| [보안도] | `누출 시 적국 즉시 방위작전 편성 → 유리한 방어전` |

### 기능 상세

**[발의자] [변경]** — 필터링된 인물 리스트 팝업

```
조건: 자국인물 && 군인(계급 중장 이상)
표시: 얼굴(H) + nick + 계급 + 친밀도 + 용맹
정렬: 군사공적치 순, 플레이어 캐릭터 최상단 고정
타인 선택 시: confirm "해당 인물에게 작전을 발의시킵니다. 해당 인물과 승인자가 모두 수락해야..."
```

**[작전목표] [변경]** — 목표 선택 팝업

```
상단: 라디오 [지도 | 성계 | 함대] (기본=지도)
중단: 라디오 선택에 따라 지도 이미지 | 성계 리스트 | 적국 함대 리스트
하단: [확인] [취소]
확인 시 이미 승인된 작전 존재 → confirm: 수정할까요? 신규로 만들까요?
```

### 턴 종료 처리 흐름

```
1. [개인 이벤트] 발의자가 타인인 경우
   → 호감도 + 용맹도 기반 수락/거부 이벤트 발생

2. [국가 이벤트] 승인자가 해당 턴 발의 목록 전체 확인
   → 목록 = 승인자 MNG/10(내림) 건만 노출, 수락률 높은 순 정렬, 나머지 파기
   → 승인자 INF/30(내림) 만큼 수락률 주사위(100) → 승인 or 거부

3. [보안 체크] 타국 승인 작전 1건 이상 존재 시
   → 보안도로 주사위(100): 보안도 이상이면 방위작전 자동 편성

4. [최종 결의]
   동맹: 최고평의회 11명 `얼굴 이름(nick) 직책 가/부` 리스트 → 과반 통과
   제국: 장관 3명 `얼굴 이름(nick) 직책 가/부` 리스트 → 과반 통과
          → 재상(대리) → 황제 순 결재
```

---

## TODO

- [ ] `handleItem` — `item.action` 분기 추가 (`game.registerAgenda` 연결)
- [ ] `military` 카테고리도 `isAgendaCat`에 포함 여부 결정
- [ ] `finance`, `personal`, `info` 카테고리 결재 체인 정의 여부 결정
- [ ] disabled 항목 단계적 구현 (research / personal 우선순위 낮음)
- [ ] **OperationModal.vue** 구현 (위 스펙 참조)
  - [ ] 진입 시 행동력 체크 / 이력 복원 / 보류 clear
  - [ ] 보안도 computed 계산 (A/B/C/D + 트레잇 보정)
  - [ ] [발의자] 변경 인물 리스트 팝업
  - [ ] [작전목표] 변경 팝업 (지도/성계/함대 라디오)
  - [ ] 힌트 UI (꾹 누르기 1.5초 좌→우 색상 전환)
  - [ ] 턴 종료 시 개인 이벤트(발의자 수락/거부)
  - [ ] 국가 이벤트: 승인자 결재 (MNG/INF 기반 주사위)
  - [ ] 보안 누출 체크 → 방위작전 자동 편성
  - [ ] 최종 결의: 동맹(평의회 11명 과반) / 제국(장관 3명→재상→황제)
