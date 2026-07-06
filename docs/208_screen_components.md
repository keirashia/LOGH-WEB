# src/components — 컴포넌트
> 분류: 화면
> 경로: `docs/208_screen_components.md`
> 상위: [200_SCREEN.md](200_SCREEN.md)
> 최종 수정: 2026-07-05

## 개요

```
components/
├── ui/             공통 UI (헤더/HUD/로그/바)
└── game/
    ├── map/        갤럭시맵
    ├── panels/     사이드/인포/메뉴 패널
    └── modals/     게임 모달 9종
```

---

## ui/ — 공통 UI

| 파일 | 설명 |
|---|---|
| `AppHeader.vue` | 전역 헤더 (브랜드/유저/포인트/메뉴) |
| `OptionsPanel.vue` | AppHeader 메뉴 패널 |
| `GameHud.vue` | 게임 중 HUD (세력/자원/날짜) |
| `EventLog.vue` | 이벤트 로그 패널 |
| `StrategyBar.vue`(구 `BottomBar.vue`, 2026-07-04 리네임) | 하단 카테고리 버튼 8개(2×4 그리드) + 턴 종료 (position: fixed). 최신 카테고리 구성/CSS는 [209_screen_bottombar.md](209_screen_bottombar.md) 참조 |
| `StatRow.vue` | 스탯 행 공통 컴포넌트 |

### AppHeader 상세

- 좌: 브랜드 타이틀
- 우: 아바타 / 유저명 / ◆포인트 / 로그인·로그아웃 / ☰메뉴
- `optionsOpen` ref로 OptionsPanel 토글
- 30초마다 API 서버 연결 상태 폴링 (`apiOnline`)

---

## game/map/GalaxyMap.vue

### 스펙

- SVG viewBox: `0 0 1600 1000`, `preserveAspectRatio="xMidYMid meet"`
- 줌: 마우스 휠 + 핀치 (scale 0.4~5), 버튼 +/⌂/−
- 팬: 드래그
- 클릭: 성계(selectSystem) / 함대(selectFleet) / 항로(selectedLane 토글, 금색 글로우)
- 편집 모드(✏️): 이동/라인/추가/삭제 툴

### 항로 렌더링

편집모드 OFF 시 항로 type별 색상/선스타일:

| type | 색상 | 선두께 | 대시 |
|---|---|---|---|
| `corridor` | `rgba(100,200,255,0.55)` | 2px | `8 4` |
| `phezzan` | `rgba(212,170,96,0.60)` | 2px | `4 3` |
| `normal` | `rgba(255,255,255,0.35)` | 1.5px | `5 6` |

편집모드 ON: 전체 `rgba(255,255,255,0.65)`, 2px, 대시 없음

### 주요 import

```js
import { LANE_DEF } from '@/data/stars/lane'
// game.systems 에서 성계 좌표/정보 읽음 (starSystemData는 직접 import 안 함)
```

---

## BottomBar / MenuPanel 상세

### BottomBar (v2 — 2×4 카테고리 그리드)

- `ROW1`: 군사 / 내정 / 인사 / 첩보  
- `ROW2`: 연구 / 재정 / 개인 / 정보  
- 우측 고정: **턴 종료** 버튼 (세력별 `btn-red/btn-blue/btn-green`)
- 버튼 클릭 시 `toggle(id)` → 같은 버튼 재클릭이면 MenuPanel 닫음
- 높이: `--bar-h: clamp(88px, 11vh, 112px)` (모바일 팻핑거 대응, 행당 최소 44px)
- 랜드스케이프 low-height: `--bar-h: 52px` (global.css `@media` 오버라이드)

**CSS 패턴 (로비 카드 스타일 참조)**:
```css
.bottom-bar {
  background: linear-gradient(165deg, #0d1b2a 0%, #0a0f1c 60%, #060a10 100%);
  border-top: 2px solid rgba(212,170,96,.55);
}
.cat-btn.on {
  color: var(--tg);
  background: linear-gradient(180deg, rgba(13,27,42,.9) 0%, rgba(8,12,20,.8) 100%);
  box-shadow: inset 0 2px 0 rgba(212,170,96,.9), inset 0 0 24px rgba(212,170,96,.06);
  text-shadow: 0 0 12px rgba(212,170,96,.5);
}
/* ::before: 대각선 격자 패턴 오버레이 (활성 버튼) */
```

---

### MenuPanel (신규 — game/panels/)

- props: `category` (String), emit: `close`
- `navStack` ref → 뎁스 이동 (push/pop), 카테고리 변경 시 초기화
- `currentItems` computed: `MENU_TREES[category]`를 navStack으로 traverse
- `headerTitle` computed: navStack 기반 현재 레벨 라벨
- 위치: `bottom: var(--bar-h)` → BottomBar 위에 슬라이드업
- Teleport to body, z-index 1900

**결재권자 표시 (의안 카테고리 + 최상위 레벨)**:
- `APPROVAL_CHAINS[playerFaction][category]` 배열 순서대로 공석 건너뜀
- `maxActive = floor(approver.politics / 10)` (최소 1)
- 대기 의안 상위 10건 표시, `maxActive`건 활성 / 나머지 비활(opacity .4)

**메뉴 트리 (`src/data/base/agenda/menuTree.js`)**:
```
military:  작전 발의(출격/수송) / 함대관리(편성·재편/해산) / 훈련* / 모의*
domestic:  예산 배분 / 행성 개발 / 함선 설계* / 함선 제작
personnel: 내정 인사 / 군사 인사
intel:     첩보 / 방첩 / 특수
research:  체제* / 사상* / 내정설비* / 군사설비* / 전술연구*
finance:   재정 현황 / 세율 조정
personal:  뉴스* / 임관·퇴역* / 입당·탈당* / 개인 훈련* / 교육*
info:      인물 / 함대 / 세력 / 성계*
```
*disabled 항목

---

## game/panels/

| 파일 | 설명 |
|---|---|
| `SidePanel.vue` | 좌측 패널: 세력 목록, 함대 목록 |
| `InfoPanel.vue` | 우측 패널: 선택 성계 상세 (탭: 개요/함대/경제/세부맵) |
| `MenuPanel.vue` | BottomBar 카테고리 메뉴 슬라이드업 패널 |
| `CharInfoPanel.vue` | 좌측 패널: 현재 플레이 인물 정보 (PC 상시노출 / 모바일 오버레이) |

### CharInfoPanel.vue

**목적**: 현재 플레이 중인 인물(playerChar)의 정보를 항상 볼 수 있도록 노출.

**패널 폭**: `clamp(200px, 22vw, 280px)` (PC 고정) / 모바일 오버레이 시 `width: 100%`

#### 반응형 동작

| 디스플레이 | 동작 |
|---|---|
| 가로(landscape, PC) | 항상 노출 — GalaxyMap 좌측에 고정 배치 |
| 세로(portrait, 모바일) | 기본 숨김, 버튼(a-1) 터치 시 GalaxyMap 위 오버레이로 노출 |

#### 컴포넌트 구성 (위→아래)

```
[이름]
  - USER_LANG(현재 'Kr' 하드코딩) 기준 nameKr 표시
  - 글자 수 기반 동적 font-size: 11~15px (clamp 없이 JS 계산)
  - 이름이 너무 길면(11px 미만 예상) nickKr로 자동 대체
  - text-align: right

[초상화]
  - charImg.js 헬퍼 사용: {charCode}O_H.png → webp → jpg → N/T/F 버전 순 탐색
  - 모두 없으면 CH_000000O_H.png (플레이스홀더)
  - 플레이스홀더 시 이미지 아래 파일명 힌트 표시 ({charCode}O_H.png)
  - 배경: 세력 색상 그라데이션 (#0a0f1c → {faction color}cc, 160deg)

[직책]
  - 직책 2개 이상: "직책 N개 ▼/▲" 토글 바 + 전체 행 열기/닫기
  - 직책 1개: 토글 바 없이 직책 행만 표시
  - 각 직책 행: 직책명(serif 12px) + Lv.N + 경험치 바(40px 골드)
  - 데이터: CHAR_JOBS(base)에서 jobLevel/jobExp 조회, 없으면 0

[트레잇]
  - TraitBadge 컴포넌트 사용 (CHAR_TRAITS → charCode 필터)
  - 없으면 "트레잇 없음"

[행동력 슬롯] × 3  (매 턴 3회, 빈칸 기본)

[능력치]  CMD / CSM / ATT / DEF / FST / MNG / INF / GFG / AFG / PLT
```

**직책 데이터 흐름**:
- `gameStore.buildState()` → 시나리오 `characters/charactersJobs.js` 로드
- `character.currentPost` (string): 1순위 직책 — 결재체인 로직용
- `character.currentPosts` (array): 전체 직책 코드 목록 — CharInfoPanel 표시용
- `charJobData` computed: `currentPosts` × `CHAR_JOBS` 조인 → `{ jobCode, nameKr, jobLevel, jobExp }`

**이미지 관련**:
- `src/utils/charImg.js`: `charImgSrc(code)` + `handleCharImgError(e, code)` 사용
- `CHAR_PLACEHOLDER`: `CH_000000O_H.png` (흑백 실루엣, 투명 배경)

#### 버튼 (a-1) — 모바일 전용

- GalaxyMap 우측에 `~10vw` 폭으로 노출 (북인덱스 스티커 형태, 위→아래)
- 터치 시 CharInfoPanel이 GalaxyMap 위에 오버레이
- 현재는 인물 정보 1개만, 향후 확장 가능

#### GameView 레이아웃 변경

```
기존: [ GalaxyMap (상단) ]
      [ BottomBar (하단) ]

변경 (PC):    [ CharInfoPanel | GalaxyMap ]
                               [ BottomBar ]
변경 (모바일): [ GalaxyMap + 버튼a-1 ]
               [ BottomBar ]
               (CharInfoPanel은 오버레이)
```

#### 전술뷰(TacticalView)와의 관계 — 교체 대신 별도 패널 신설 (결정)

원래 스펙은 전술턴 진입 시 `CharInfoPanel.vue`를 함대(편대) 정보 패널로 "교체"하는 것이었으나,
실제로는 `TacticalView.vue` 내부에 별도 패널(`.tac-left`)을 새로 만들어 편대 정보를 표시한다.
`CharInfoPanel.vue` 자체는 `tacticalStore`를 전혀 참조하지 않는다.

**사유**: 이동/공격은 지도 셀 클릭 기반 UX이고 진형변경은 선택 유닛과 밀접한 좌측 패널에 있어,
기존 `CharInfoPanel`을 재활용하도록 뜯어고치면 이미 검증된 전술 UI에 회귀 위험만 생기고 실질적 이득이 없다고 판단.
컴포넌트 명명/구조를 스펙과 일치시키는 것 자체가 목적이 아니라면 현재 구조 유지 (2026-07-04).

#### 뒤로가기 / 닫기 처리

- 명령 관련 컴포넌트(MenuPanel 등) 우측 상단 **X** → 행동 취소(닫기)
- 브라우저 백버튼 / 마우스 뒤로가기 → 동일 동작 (`popstate` 이벤트 처리)
- ⚠️ 브라우저/기기 제약으로 백버튼이 막힐 경우 대응 방안 별도 검토 필요

### InfoPanel 세부맵 탭

```js
import { getStarMapByCode } from '@/data/stars/maps/index.js'
const starMapData = computed(() => getStarMapByCode(sys.value.code ?? sys.value.id))
// SVG mini-map: 성운 + 행성 표시
```

---

## game/modals/ — MODAL_MAP

`GameView.vue`의 `MODAL_MAP`에 등록. `game.openModal('name', payload)`로 호출.

| key | 파일 | 용도 |
|---|---|---|
| `tax` | TaxModal.vue | 세율 조정 |
| `fleet` | FleetModal.vue | 함대 편성/재편 |
| `build` | BuildModal.vue | 건설 명령 |
| `char` | CharModal.vue | 인물 발령 |
| `finance` | FinanceModal.vue | 재정 (차관/징수/예산) |
| `military` | MilitaryModal.vue | 군사 작전 |
| `intel` | IntelModal.vue | 첩보/외교 |
| `event` | EventModal.vue | 스토리 이벤트 |
| `nationPost` | NationPostModal.vue | 국가 요직 현황 |

### NationPostModal.vue — 요직 현황

세력 이념에 따라 다른 레이아웃 컴포넌트를 조건부로 표시:

| 조건 | 컴포넌트 | 설명 |
|---|---|---|
| `ideology.system === '공화'` | `CouncilRingComp.vue` | 평의회원 원형 배치 (11석) |
| `ideology.system === '군주'` | `MonarchyPostComp.vue` | 황실 계층도 (tier별 행 배치) |

#### CouncilRingComp.vue

- props: `seats: [{ jobCode, shortTitle }]`
- `COUNCIL_CONFIG.FPA` — 11석 설정
- CSS `rotate(angle) translateY(-radius) rotate(-angle)` 트릭으로 원형 배치
- 의장석(`i===0`)에 gold 테두리

#### MonarchyPostComp.vue

- props: `seats: [{ jobCode, label, tier }]`
- tier 0: 황제 1인 (80px gold 셀), tier 1: 재상급, tier 2: 각 상서 (50px 셀)
- 각 tier 사이 수직선(`mph-vline`) 표시
- `MONARCHY_CONFIG.REH` — tier 0(황제) / tier 1(제국재상·국무상서) / tier 2(내무·군무·재무·궁내·사법·전례상서)

NationPostModal의 `sections` (POST_CONFIG): 계층도에 포함되지 않는 군사 직위 표시.
- REH: 통수본부총장(JB_R007) · 우주함대사령장관(JB_R006)
- FPA: 통합작전본부장(JB_F013) · 우주함대사령장관(JB_F014)

### EventModal payload 구조

```js
{
  title: '쿠데타 발생',
  portrait: '⚔️',
  speaker: '라인하르트 폰 로엔그람',
  desc: '은하제국 내에 쿠데타가 발생했습니다...\n두 번째 줄',  // white-space: pre-line 적용, \n 개행 반영
  effect: { morale: -10, gold: -500 },  // optional
  buttons: [{ label: '확인', cls: 'btn-gold', action: () => {...} }],
  // buttons: optional, default=[{label:'확인'}]
  // cls: 'btn'|'btn-gold'|'btn-red'|... (미지정 시 btn-gold)
  // action: 클릭 시 실행할 콜백 (실행 후 자동으로 close emit)
}
```

**주의 (2026-07-04 수정)**: `buttons`는 `computed(() => props.payload?.buttons ?? [...])`로 구현되어야 한다.
일반 `const`로 두면 같은 EventModal 인스턴스가 재사용되는 연속 모달 호출(예: 턴종료 confirm → 교전 confirm)에서
두 번째 모달이 첫 번째 모달의 버튼을 그대로 표시하는 반응성 버그가 발생한다.

---

## InfoPanel 설계 목표

### 성계 정보 패널

```
[ 성계명 ] [ 주요행성 이미지 ] [ 각종 수치 ] [ 상태: 평화/교전중 ]
버튼:
  1. 상세보기  → 갤럭시맵이 해당 성계맵으로 전환 (뒤로가기로 복귀)
  2. 행성정보  → 행성 목록 <li> (행성명 + 간략 정보)
                  → 행성명 클릭 시 행성 상세 노출
  3. 항로정보  → 연결된 성계명 버튼 목록
                  → 성계명 클릭 시 해당 항로 정보 노출
  4. 제안      → 담당 인물이 있으면 담당관에게, 없으면 국가수반에게
                  담당관은 턴 종료 시 유효한 우선순위 제안을 수용
                  (제안 시스템은 별도 MD 관리 예정)
```

### 각종 수치 상세

```
인구: 1k = 1pop, 아이콘(사람) 터치 시 지지도 노출
  예) 인구 10k → 자유행성동맹 지지 4k / 구국군사회의 지지 2k ...
```

### 행성 정보 패널

```
[ 행성명 ] [ 소속 성계 ] [ 각종 수치 ] [ 상태 ]
버튼:
  1. 상세보기  → 해당 행성 focus, 성계맵으로 전환
  2. 행성정보  → 행성 상세
  3. 제안      → 해당 성계 선택 상태에서 제안 패널 오픈
```

---

## TODO

- [ ] GalaxyMap 성계 좌표 수정 미반영 문제 조사
- [ ] AppHeader: 아바타 이미지 API 연동, OptionsPanel 내용 채우기
- [ ] InfoPanel: 위 설계 목표대로 탭 구현 (planetsData.js 완성 후)
- [ ] MenuPanel: 의안 등록 UI 연동 (현재는 openModal 직접 호출)
- [ ] MenuPanel: BottomBar 각 버튼 개별 카드 스타일 (취소됨, 추후 재검토)
- [ ] 의안 시스템 상세 설계 → `src/data/base/agenda/agenda.md` 참조
- [x] **CharInfoPanel.vue** 신규 구현 (반응형: PC 좌측 고정 / 모바일 오버레이 토글) — 2026-06-17
- [x] **GameView.vue** 레이아웃 변경 — galaxy-area 래퍼 추가, isPortrait 기반 분기 — 2026-06-17
- [x] 버튼(a-1) 모바일 토글 버튼 구현 (GalaxyMap 우측 북인덱스 형태) — 2026-06-17
- [x] 뒤로가기 처리 (`popstate` 이벤트: activeModal 닫기 / showCharPanel 닫기) — 2026-06-17
- [x] CharInfoPanel 이름 표시 개선 — lang 기반 단일 표시, 동적 font-size, nickKr 폴백 — 2026-06-18
- [x] CharInfoPanel 초상화 영역 추가 — charImg.js 헬퍼, 세력 그라데이션 배경, 미등록 파일명 힌트 — 2026-06-18
- [x] CharInfoPanel 직책 UI 개선 — 토글 바(직책 N개), Lv + 경험치 바 — 2026-06-18
- [x] CharInfoPanel 트레잇 영역 추가 — TraitBadge 컴포넌트 연결 — 2026-06-18
- [x] TraitBadge.vue 폰트 px 통일 (vh/vw → px) — 2026-06-18
- [ ] CharInfoPanel USER_LANG 하드코딩 → 유저 스토어 lang 값 연동
- [ ] 시나리오 charactersJobs.js에 jobLevel/jobExp 필드 추가
