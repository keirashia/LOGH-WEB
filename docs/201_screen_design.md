# LOGH-WEB — 디자인 시스템
> 분류: 화면
> 경로: `docs/201_screen_design.md`
> 상위: [200_SCREEN.md](200_SCREEN.md)
> 최종 수정: 2026-06-17

---

## 1. 디자인 컨셉

- **무드**: 심우주 SF + 고전 전략 / 은하영웅전설 세계관
- **키워드**: 어둠, 금빛 광휘, 별빛, 품격
- **배경**: 극도로 어두운 우주(#020508) 위에 흐르는 별과 성운
- **액센트**: 금색(골드) 단일 포인트 컬러 → 타이틀·카드 테두리·버튼·강조 텍스트
- **세력 색상**: 제국(빨강)·동맹(파랑)·페잔(초록)은 게임 화면 전용

---

## 2. 색상 시스템

### CSS 변수 (`:root` — `src/assets/global.css`)

#### 배경 레이어
| 변수 | 값 | 용도 |
|---|---|---|
| `--bg` | `#020508` | 최하단 베이스 (우주 공간) |
| `--bg2` | `#080c14` | AppHeader 배경 |
| `--bg3` | `#0d1420` | 패널·모달 배경, `.panel` |
| `--bg4` | `#121a28` | 입력 필드·보조 버튼 |
| `--bgh` | `#1a2438` | 호버 상태 배경 |

#### 테두리
| 변수 | 값 | 용도 |
|---|---|---|
| `--bd` | `#1e2d44` | 일반 테두리 |
| `--bdg` | `#2a4060` | 강조 테두리 (호버 등) |

#### 텍스트
| 변수 | 값 | 용도 |
|---|---|---|
| `--t1` | `#c8d8e8` | 기본 본문 |
| `--t2` | `#7a9ab8` | 보조·설명 (`dim`) |
| `--td` | `#3a5068` | 비활성·매우 희미 |
| `--tg` | `#d4aa60` | 골드 강조 (`gold`) |
| `--ta` | `#e05050` | 경고·위험 (`alert`) |

#### 세력 색상 (게임 화면 전용)
| 변수 | 컬러 | 배경용 |
|---|---|---|
| `--REH` | `#c0392b` | `--REH-g: rgba(192,57,43,.3)` |
| `--FPA` | `#2980b9` | `--FPA-g: rgba(41,128,185,.3)` |
| `--PZN` | `#27ae60` | `--PZN-g: rgba(39,174,96,.3)` |

#### 상태 색상 (코드 직접 사용)
| 역할 | 값 |
|---|---|
| 서버 온라인 | `#4caf7d` |
| 서버 오프라인 | `#d84c4c` |

---

## 3. 타이포그래피

### 폰트 패밀리
| 변수 | 폰트 | 용도 |
|---|---|---|
| `--font-serif` | Noto Serif KR | 타이틀, 카드 제목, 인물명, 한자 |
| `--font-sans` | Noto Sans KR | 기본 본문, UI 레이블 |
| `--font-mono` | Share Tech Mono | 코드·약어·수치·시스템 상태 |

### 글로벌 기본값
```css
html, body { font-family: var(--font-sans); font-size: 13px; line-height: 1.5; }
```

### 클래스 유틸리티
| 클래스 | 효과 |
|---|---|
| `.serif` | font-family: --font-serif |
| `.mono` | font-family: --font-mono |
| `.gold` | color: --tg |
| `.dim` | color: --t2 |
| `.alert` | color: --ta |

### 타입 스케일 (vh 반응형 기준 — 카드 영역)
| 요소 | 크기 |
|---|---|
| 카드 타이틀 (화면 메뉴) | `4.8vh`, letter-spacing `0.3vw` |
| 카드 서브 (desc) | `2.5vh`, letter-spacing `0.2vw` |
| 카드 아이콘 | `9vh` |
| 카드 코너 아이콘 | `3.2vh` |
| 카드 코너 텍스트 | `2.0vh` |
| 섹션 타이틀 (cslay) | `2.2vh`, letter-spacing `0.4vw` |
| 뒤로가기 버튼 | `1.8vh`, letter-spacing `0.25vw` |

### 픽셀 기준 스케일 (패널·HUD 영역)
| 요소 | 크기 |
|---|---|
| 모달 타이틀 | `17px` |
| 일반 본문 | `13px` |
| 버튼 | `12px` |
| 보조·라벨 | `11px` |
| 미니 표기 | `10px` |

---

## 4. 배경 & 스타필드

### StarfieldCanvas
모든 로비 계열 화면의 공통 배경 레이어.

```
StarfieldCanvas 구성
  ├── 배경 fill: #020508
  ├── 성운(nebs): 라디알 그라데이션, rgba 0.05→0 투명
  │     색상 풀: FPA파랑·REH빨강·보라
  └── 별(stars): radius 0.1~1.3, 좌측 방향 유동
        투명도: 0.13 + sin(tw) * 0.22 (반짝임)
```

**LobbyView 기본값**: 별 250개, 성운 파랑·빨강·보라
**TitleView**: 별 300개, 성운 4개

### 배경 레이어 순서 (z-index)
| z-index | 레이어 |
|---|---|
| 0 | StarfieldCanvas (`position: absolute; inset: 0`) |
| 1 | 콘텐츠 레이아웃 |
| 500 | AppHeader |
| 900 | 모달 오버레이 |

---

## 5. 레이아웃 아키텍처

### 앱 루트 구조
```
#app  (flex-direction: column; height: 100%)
  ├── AppHeader        (height: --hdr-h, flex-shrink: 0)
  └── .app-body        (flex: 1, overflow: hidden)
        └── <router-view>
```

### 높이 CSS 변수
| 변수 | 범위 | 용도 |
|---|---|---|
| `--hdr-h` | `clamp(36px, 4.5vh, 50px)` | 헤더 높이 |
| `--bar-h` | `clamp(88px, 11vh, 112px)` | BottomBar 높이 |

### CardSliderLayout 구조 (로비 계열 화면 표준)
```
.cslay-wrap  (position: relative; 100% × 100%)
  ├── StarfieldCanvas          (z-index: 0)
  └── .cslay-layout            (z-index: 1; flex-col; align-center)
        ├── .cslay-title       (serif gold, 2.2vh)
        ├── .card-slider       (overflow-x: clip; cursor: grab)
        │     └── .card-track  (flex; gap: 16px; will-change: transform)
        │           └── .menu-btn × N
        ├── .card-dots         (페이지 인디케이터)
        ├── <slot name="extra">
        └── .cslay-footer
              └── .cslay-back  (뒤로가기 버튼)
```

### GameView 구조
```
.game-wrap
  ├── EventLog     (상단 이벤트 로그)
  ├── GameHud      (날짜·자원 HUD)
  ├── .game-main   (flex-row)
  │     ├── SidePanel    (좌)
  │     ├── GalaxyMap    (중앙, VW=1600/VH=1000)
  │     └── InfoPanel    (우)
  ├── BottomBar    (높이: --bar-h)
  └── 모달 오버레이 (z-index: 900)
```

---

## 6. 카드 디자인 (핵심 모티프)

로비 메뉴 카드. 이 스타일을 다른 카드형 UI에도 준용한다.

### 구조
```
.menu-btn
  ├── .card-corner.tl  (아이콘 + 약어, 좌상단)
  ├── .card-body       (아이콘 9vh + 타이틀 serif + desc mono)
  └── .card-corner.br  (아이콘 + 약어, 우하단, 180deg 회전)
```

### CSS 핵심값
```css
/* 카드 크기 */
width:  calc(55vh * 5 / 7);
height: 55vh;

/* 배경 */
background: linear-gradient(165deg, #0d1b2a 0%, #1a082e 60%, #0d1520 100%);

/* 테두리 (금테 + 이중 인셋) */
border: 2px solid rgba(212,170,96,.8);
box-shadow:
  inset 0 0 0 5px #0d1520,
  inset 0 0 0 7px rgba(212,170,96,.22),
  0 8px 32px rgba(0,0,0,.85);

/* 텍스처 오버레이 (::before) */
background-image:
  repeating-linear-gradient( 45deg, transparent, transparent 10px, rgba(212,170,96,.025) 10px, rgba(212,170,96,.025) 11px),
  repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(212,170,96,.025) 10px, rgba(212,170,96,.025) 11px);

/* 원형 장식 (::after) */
border: 1px solid rgba(212,170,96,.1); border-radius: 50%;
```

### 호버 상태
```css
box-shadow:
  inset 0 0 0 5px #0d1520,
  inset 0 0 0 7px rgba(212,170,96,.5),
  0 20px 56px rgba(212,170,96,.2);
transform: translateY(-8px) scale(1.03);
```

### 클릭 애니메이션 (card-lift)
```css
@keyframes card-lift {
  0%   { transform: translateY(0)     scale(1);    opacity: 1; }
  40%  { transform: translateY(-32px) scale(1.06); opacity: 1; }
  100% { transform: translateY(-120px) scale(1.1); opacity: 0; }
}
```

---

## 7. 버튼

### 기본 버튼 `.btn`
```css
display: inline-flex; align-items: center; gap: 5px;
padding: 7px 14px; border: 1px solid var(--bd);
border-radius: 4px; background: var(--bg4); color: var(--t1); font-size: 12px;
transition: all .15s;
```

### 변형 클래스
| 클래스 | 테두리 | 텍스트 | 배경 |
|---|---|---|---|
| `.btn-gold` | `--tg` | `--tg` | `rgba(212,170,96,.1)` |
| `.btn-red` | `--REH` | `--REH` | `rgba(192,57,43,.1)` |
| `.btn-blue` | `--FPA` | `--FPA` | `rgba(41,128,185,.1)` |
| `.btn-green` | `--PZN` | `--PZN` | `rgba(39,174,96,.1)` |

호버 시 배경 투명도 `→ .22`

### 타이틀 버튼 (TitleView 전용)
```css
padding: 11px 24px; font-size: 14px; letter-spacing: 1.5px;
border-radius: var(--r); border: 1px solid var(--tg);
color: var(--tg); background: rgba(212,170,96,.08);
```
호버: `background .18`, `box-shadow 0 0 20px rgba(212,170,96,.3)`, `translateY(-1px)`

### 뒤로가기 버튼 (cslay-back)
카드와 동일한 이중 인셋 + 금테 + 크로스해치 스타일. 카드의 축소판.

---

## 8. 패널 & 모달

### `.panel` (공통 패널)
```css
background: var(--bg3);
border: 1px solid var(--bd);
border-radius: var(--r);        /* 6px */
box-shadow: 0 2px 16px rgba(0,0,0,.5);
```

### `.modal-overlay`
```css
position: fixed; inset: 0;
background: rgba(2,5,8,.88);
display: flex; align-items: center; justify-content: center;
z-index: 900; backdrop-filter: blur(4px);
```

### `.modal-box`
```css
background: var(--bg3);
border: 1px solid var(--bdg);
border-radius: var(--r); padding: 22px;
width: min(92vw, 500px); max-height: 82vh; overflow-y: auto;
box-shadow: 0 8px 40px rgba(0,0,0,.8);
```

### `.modal-title`
```css
font-family: var(--font-serif); font-size: 17px; color: var(--tg);
margin-bottom: 14px; padding-bottom: 10px; border-bottom: 1px solid var(--bd);
```

### `.modal-actions`
```css
display: flex; justify-content: flex-end; gap: 8px; margin-top: 16px;
```

---

## 9. 슬라이더 바 (`.sbar`)

```css
.sbar      { height: 5px; background: var(--bd); border-radius: 3px; flex: 1; }
.sbar-fill { height: 100%; border-radius: 3px; transition: width .4s; }
```

---

## 10. 세력 유틸리티 클래스

```css
.fc-REH { color: var(--REH); }   .fc-FPA { color: var(--FPA); }   .fc-PZN { color: var(--PZN); }
.bg-REH { background: rgba(192,57,43,.15); }
.bg-FPA { background: rgba(41,128,185,.15); }
.bg-PZN { background: rgba(39,174,96,.15); }
```

---

## 11. 애니메이션 & 트랜지션

### 페이지 전환 (router-view)
```css
.fade-enter-active, .fade-leave-active { transition: opacity .2s; }
.fade-enter-from, .fade-leave-to       { opacity: 0; }
```

### 슬라이드 업 (모달/팝업)
```css
.slide-up-enter-active { transition: all .25s cubic-bezier(.34,1.56,.64,1); }
.slide-up-leave-active { transition: all .18s ease; }
.slide-up-enter-from   { opacity: 0; transform: translateY(16px); }
.slide-up-leave-to     { opacity: 0; transform: translateY(-8px); }
```

### 옵션 패널 (위에서 드롭)
```css
.opts-slide-enter-active { transition: opacity .25s ease, transform .28s cubic-bezier(.4, 0, .2, 1); }
.opts-slide-leave-active  { transition: opacity .18s ease, transform .2s ease; }
.opts-slide-enter-from,
.opts-slide-leave-to      { opacity: 0; transform: translateY(-10px); }
```

### 카드 슬라이더 스냅
```css
transition: transform 0.34s cubic-bezier(.25,.8,.25,1)
```

### 글로벌 keyframes
```css
@keyframes pulse   { 0%,100%{ opacity:.7 } 50%{ opacity:1 } }  /* 타이틀 제목 */
@keyframes spin-ring { 0%{ transform:rotate(0deg) } 100%{ transform:rotate(360deg) } }
```

---

## 12. 장식 요소

### 코너 장식 (TitleView)
```css
.corner { position: absolute; width: 22px; height: 22px; border-color: var(--tg); border-style: solid; opacity: .4; }
.corner.tl { top:18px; left:18px;   border-width: 2px 0 0 2px; }
.corner.tr { top:18px; right:18px;  border-width: 2px 2px 0 0; }
.corner.bl { bottom:18px; left:18px;  border-width: 0 0 2px 2px; }
.corner.br { bottom:18px; right:18px; border-width: 0 2px 2px 0; }
```

### 페이지 인디케이터 (카드 슬라이더)
```css
.dot        { width:6px; height:6px; border-radius:50%; background:rgba(212,170,96,.3); border:1px solid rgba(212,170,96,.4); }
.dot.active { width:20px; border-radius:3px; background:var(--tg); border-color:var(--tg); }
```

### 스크롤바
```css
::-webkit-scrollbar       { width: 4px; height: 4px; }
::-webkit-scrollbar-track { background: var(--bg2); }
::-webkit-scrollbar-thumb { background: var(--bdg); border-radius: 2px; }
```

### 범위 슬라이더 (input[type=range])
```css
height: 4px; background: var(--bd); border-radius: 2px;
/* thumb */
width:16px; height:16px; border-radius:50%; background:var(--tg);
```

---

## 13. 헤더 (AppHeader)

```
[ 銀河英雄伝説 (serif gold) ]  [ ONLINE/SINGLE (mono) ]
                                         [ 아바타 ] [ 사용자명 ] | [ ◆ 포인트 ] | [ 로그인/아웃 ] | [ ☰ ]
```

- 높이: `--hdr-h`
- 배경: `--bg2` + 하단 테두리 `--bd`
- 브랜드 타이틀: serif, `--tg`, `clamp(11px, 1.4vw, 15px)`
- 서버 상태 dot: 6×6 원, 글로우 그림자
- 아바타: 원형, border `--bdg`, serif 이니셜
- 구분선: `1px` 세로선 `--bd`, 높이 `16px`
- 햄버거 → X 전환: CSS transform만으로 구현 (JS 불필요)

---

## 14. 화면별 디자인 요약

| 화면 | 배경 | 핵심 패턴 |
|---|---|---|
| TitleView | StarfieldCanvas (별 300) | 중앙 세로 정렬, pulse 타이틀, 코너 장식, .gold-btn |
| LobbyView | StarfieldCanvas (별 250) | CardSliderLayout, 금테 카드, 슬라이더 드래그 |
| SingleView | StarfieldCanvas | CardSliderLayout (시나리오 선택) |
| ScenarioDetailView | StarfieldCanvas | ScTimelineLayout / ScEventListLayout |
| GameView | 없음(--bg 배경) | SidePanel + GalaxyMap + InfoPanel, BottomBar, 모달 |
| TacticalView | 없음 | 전술 전투 전용 레이아웃 |
| LoginView / RegisterView | StarfieldCanvas | 중앙 폼 카드, .modal-box 유사 |
| EncyclopediaMenuView | StarfieldCanvas | CardSliderLayout |

---

## 15. 새 화면 추가 체크리스트

- [ ] StarfieldCanvas 사용 여부 결정 (로비 계열 = 사용, 게임 내부 = 미사용)
- [ ] 색상은 CSS 변수만 사용 (`--bg`, `--tg`, `--t1` 등)
- [ ] 폰트는 3종 패밀리 변수 사용 (serif/sans/mono)
- [ ] 카드형 UI → CardSliderLayout 또는 `.menu-btn` 스타일 준용
- [ ] 패널 → `.panel` 클래스 사용
- [ ] 모달 → `.modal-overlay` + `.modal-box` + `.modal-title` 구조
- [ ] 버튼 → `.btn` + 변형 클래스
- [ ] 라우터 진입/퇴장 → `.fade` 트랜지션 (기본 적용됨)
- [ ] 세력 색상은 게임 화면에서만, `.fc-*` / `.bg-*` 클래스 사용
