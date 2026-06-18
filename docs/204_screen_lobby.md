# 로비 화면 설계
> 분류: 화면
> 경로: `docs/204_screen_lobby.md`
> 상위: [200_SCREEN.md](200_SCREEN.md)
> 최종 수정: 2026-06-18

---

## 화면 Flow

```
TitleView
  ↓
LobbyView          ← 이 문서
  ├── 싱글플레이  → /lobby/single
  ├── 멀티플레이  → /lobby/multi (준비 중)
  ├── 사전        → /lobby/encyclopedia
  └── 튜토리얼   → /tutorial
```

---

## 컴포넌트 구조

`LobbyView.vue`는 카드 데이터 정의만 담당하는 얇은 컴포넌트.
슬라이더 로직(드래그/RAF/lift/히스토리/별배경) 전체는 `src/components/common/CardSliderLayout.vue`로 추출되어 있음.

```
LobbyView.vue
└── CardSliderLayout.vue   (공용 컴포넌트 — 슬라이더/드래그/애니메이션/별배경 전담)
```

## 레이아웃 구조

```
lobby-wrap (전체 화면, 별 배경 캔버스 포함)
└── lobby-layout (세로 중앙 정렬, flex-column)
    ├── lobby-title   銀河英雄伝説 + 영문 부제
    ├── card-slider   드래그 슬라이더 (메인 메뉴)
    ├── card-dots     카드 위치 인디케이터
    ├── login-notice  로그인 미완료 시 경고
    └── lobby-footer  ← 타이틀 / 관리자 버튼
```

---

## 카드 슬라이더

### 카드 데이터 (CARDS)

```js
const CARDS = [
  { icon: '⚔️', title: '싱글플레이', desc: 'Single Play',  abbr: 'SGL', action: () => router.push('/lobby/single') },
  { icon: '🌌', title: '멀티플레이', desc: 'Multi Play',   abbr: 'MLT', disabled: true },
  { icon: '📖', title: '사전',       desc: 'Encyclopedia', abbr: 'ENC', action: () => router.push('/lobby/encyclopedia') },
  { icon: '🎓', title: '튜토리얼',   desc: 'Tutorial',     abbr: 'TUT', disabled: true },
]
```

- `action`: 카드 클릭 시 실행할 함수 (router.push 등)
- `disabled: true`: 해당 카드 비활성. 멀티플레이·튜토리얼은 현재 무조건 비활성 (추후 오픈 예정)
- `desc`: 영문 설명 (카드 하단 보조 텍스트)

### 슬라이드 범위

클론 없이 4장만 렌더. 스와이프 범위는 **싱글 중앙 ↔ 튜토리얼 중앙**으로 고정.

```js
function centerOf(i)  { return window.innerWidth / 2 - cardWidth() / 2 - i * unitWidth() }
function minOffset()  { return centerOf(CARDS.length - 1) }  // 튜토리얼 중앙
function maxOffset()  { return centerOf(0) }                  // 싱글 중앙
```

- 초기 위치: 싱글(0번) 중앙
- 경계 초과 드래그 불가 (hard clamp)
- 리사이즈 시 현재 카드 중앙 위치 재계산

---

## 카드 디자인 — 트럼프 카드 콘셉트

### 사이즈 (디스플레이 비율 무관)

```
height : 60vh
width  : calc(60vh * 5 / 7)   ← 트럼프 카드 표준 비율 (63.5 : 88.9mm ≈ 5 : 7)
gap    : 16px
```

### 카드 내부 구조

```
┌─ [icon] [abbr] ──────────────────┐  ← 좌상단 모서리 라벨
│                                  │     icon: 3.2vh / abbr: 2.0vh
│                                  │
│           [ icon ]               │  ← 9vh
│           타이틀                  │  ← 4.8vh, 금색
│           English Desc           │  ← 2.5vh, 금색 희미하게 (mono)
│                                  │
└──────────────── [icon] [abbr] ─┘  ← 우하단 모서리 라벨 (180° 회전)
```

### 텍스트 크기 (vh 기준 — 디스플레이 비율 무관)

| 요소 | 크기 | 비고 |
|---|---|---|
| 모서리 아이콘 | 3.2vh | |
| 모서리 약어 | 2.0vh | mono, 금색 희미하게 |
| 중앙 아이콘 | 9vh | |
| 중앙 타이틀 | 4.8vh | serif, 금색, 글로우 |
| 영문 설명 | 2.5vh | mono, 금색 반투명 |

### 시각 효과

```css
/* 이중 테두리 */
border: 2px solid rgba(212,170,96,.8)
box-shadow: inset 0 0 0 5px #0d1520,
            inset 0 0 0 7px rgba(212,170,96,.22)

/* 배경 격자 패턴 */
::before — 45deg/-45deg 미세 대각선

/* 중앙 장식 원 */
::after  — 카드 폭의 68% 크기 원, 미세 테두리

/* hover (비lifting 상태에서만) */
translateY(-8px) scale(1.03) + 금색 내부 글로우
```

### 인디케이터 (card-dots)

```
● ● ● ●  → 현재 카드: 길쭉한 바 형태로 강조
```

- 점 클릭 시 해당 카드로 이동 (`goToCard(i)`)

---

## 인터랙션

### 이벤트 바인딩 (card-slider)

| 이벤트 | 처리 |
|---|---|
| `mousedown` | onDragStart |
| `mousemove` | onDragMove |
| `mouseup` / `mouseleave` | onDragEnd |
| `touchstart` (passive) | onDragStart |
| `touchmove` (prevent) | onDragMove |
| `touchend` | onDragEnd |
| `wheel` (prevent) | onWheel |

### 드래그 로직

```js
// RAF 기반 — 프레임당 1회만 style 업데이트 (끊김 방지)
function onDragMove(e) {
  pendingDelta += delta
  if (raf) return
  raf = requestAnimationFrame(() => {
    applyOffset(offsetX + pendingDelta)
    pendingDelta = 0
    raf = null
  })
}
// transition: 'transform 0.34s cubic-bezier(.25,.8,.25,1)'
// translate3d 사용 → GPU 가속
```

### 마우스 휠

```js
// deltaY > 0 → 다음 카드 / deltaY < 0 → 이전 카드
// 400ms 쿨다운 (관성 스크롤 / 빠른 휠 방지)
```

### 클릭 동작 (handleCard)

```
드래그 거리 ≥ 5px  →  무시 (드래그로 판정)
비중앙 카드 클릭   →  goToCard(i) — 중앙으로 이동
중앙 카드 클릭     →  lift 애니메이션(0.5s) → 액션 실행
```

### 카드 lift 애니메이션

```css
@keyframes card-lift {
  0%   { transform: translateY(0)      scale(1);    opacity: 1; }
  40%  { transform: translateY(-32px)  scale(1.06); opacity: 1; }
  100% { transform: translateY(-120px) scale(1.1);  opacity: 0; }
}
```

- `.lifting` 클래스 부착 → 0.5s 후 라우팅
- 애니메이션 중 `pointer-events: none` (중복 클릭 방지)
- hover 효과는 `.lifting` 상태에서 비활성

### 커서

```css
.card-slider         { cursor: grab; }
.card-slider.grabbing{ cursor: grabbing; }
```

---

## 히스토리 처리

```js
// 진입 시: 더미 state push → 백 버튼 감지용
history.pushState(null, '')
window.addEventListener('popstate', onBrowserBack)

// 백 버튼 → 타이틀로 이동 (history 추가 없이)
function onBrowserBack() {
  window.removeEventListener('popstate', onBrowserBack)
  router.replace('/')
}
```

---

## 별 배경 (Canvas)

- 별 250개, 유성 효과 (좌→우 이동)
- 성운 3개 (파랑/빨강/보라 랜덤)
- `requestAnimationFrame` 루프, resize 대응

---

## 설계 결정 이력

| 날짜 | 결정 |
|---|---|
| 2026-06-02 | 메뉴 레이아웃: 2×2 그리드 → 세로 리스트 → 1×4 카드 슬라이더로 확정 |
| 2026-06-02 | 카드 사이즈: 트럼프 카드 표준 비율 5:7, 높이 60vh 고정 |
| 2026-06-02 | 슬라이드: 자동 슬라이드 제거 → 드래그/터치 기반으로 변경 |
| 2026-06-02 | 무한 루프 제거 → 4장 고정, 싱글~튜토리얼 중앙 범위 클램프 |
| 2026-06-02 | 드래그 끊김 개선: RAF + pendingDelta 누적 + translate3d |
| 2026-06-02 | 비중앙 카드 클릭 → 중앙 이동 / 중앙 카드 클릭 → lift 후 액션 |
| 2026-06-02 | 마우스 휠 지원 추가 (400ms 쿨다운) |
| 2026-06-02 | 히스토리 처리: 백 버튼 → 타이틀 이동 |
| 2026-06-02 | 텍스트 가로 전환 (writing-mode 제거) + 영문 설명(desc) 추가 |
| 2026-06-02 | 텍스트 전체 vh 단위 통일 (모바일 가시성 개선) |
| 2026-06-18 | 슬라이더/드래그/별배경 로직 → CardSliderLayout.vue 공용 컴포넌트로 추출. LobbyView는 카드 데이터 정의만 담당 |
| 2026-06-18 | 카드 필드 `to` → `action(함수)` 으로 변경. 멀티플레이 `multi:true` → `disabled:true`, 튜토리얼 `to:'/tutorial'` → `disabled:true` |

---

## TODO

- [ ] 멀티플레이/튜토리얼 `disabled: true` 가 의도된 상태인지 확인 후 소스에 주석으로 명시 (현재는 추후 오픈 예정으로 추정)
- [ ] 멀티플레이 서버 연결 (Phase 3)
- [ ] 모바일 스와이프 속도 튜닝 (momentum 추가 검토)
