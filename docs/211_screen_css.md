# CSS 반응형 디자인 시스템
> 분류: 화면
> 경로: `docs/211_screen_css.md`
> 상위: [200_SCREEN.md](200_SCREEN.md)
> 참조: [201_screen_design.md](201_screen_design.md) (색상·컴포넌트·애니메이션 기준 문서 유지)
> 최종 수정: 2026-06-28
> 상태: 🔄 설계 중

---

## 설계 방향

**기준 컴포넌트: `BottomBar.vue`**

BottomBar는 모바일·PC 양쪽에서 레이아웃 깨짐 없이 작동하는 유일한 기준점이다.
이 컴포넌트가 사용하는 `clamp() + vh` 패턴을 프로젝트 전체의 반응형 단위로 통일한다.

```css
/* BottomBar 현재 적용값 — 이 패턴을 전체로 확장 */
font-size:  clamp(14px, 2.4vh, 22px);   /* cat-btn */
height:     clamp(88px, 11vh,  112px);  /* --bar-h  */
height:     clamp(36px, 4.5vh, 50px);   /* --hdr-h  */
```

### 왜 vh인가

| 환경 | 특성 |
|---|---|
| **모바일 landscape** | 화면 높이가 짧음 → vh 소값 → 버튼/폰트 자동 축소 |
| **PC landscape** | 화면 높이 충분 → vh 중간값 → 편안한 크기 |
| **모바일 portrait** | 높이 큼 → max 클램프로 상한 제한 |

> vw는 가로 해상도에만 반응, vh는 landscape/portrait 전환을 자동 처리 —
> 전략 게임 특성상 항상 landscape 기준이므로 **vh가 주 단위**, vw는 보조.

---

## 타입 스케일

### CSS 변수 (추가 대상: `src/assets/global.css`)

BottomBar `cat-btn` = `clamp(14px, 2.4vh, 22px)` 를 `--fs-lg` 기준으로 역산.

```css
:root {
  /* ── 타입 스케일 (vh 기반 clamp) ─────────────────── */
  --fs-xs:  clamp( 9px, 1.2vh, 11px);   /* 좌표, 극소 라벨       */
  --fs-sm:  clamp(11px, 1.6vh, 13px);   /* 수치, 보조 텍스트      */
  --fs-md:  clamp(12px, 2.0vh, 16px);   /* 기본 본문, UI 레이블   */
  --fs-lg:  clamp(14px, 2.4vh, 22px);   /* BottomBar 버튼 ← 기준 */
  --fs-xl:  clamp(17px, 3.0vh, 28px);   /* 모달 타이틀, 섹션 헤더 */
  --fs-2xl: clamp(22px, 4.5vh, 48px);   /* 대제목                 */
}
```

### 기존 px 스케일 → 변수 대응표

| 기존 (px) | 신규 변수 | 용도 |
|---|---|---|
| `10px` | `--fs-xs` | 미니 표기 |
| `11px` | `--fs-sm` | 보조·라벨 |
| `12px` | `--fs-sm` | 버튼 (`.btn`) |
| `13px` | `--fs-md` | 일반 본문 (현 html 기본값) |
| `14px` | `--fs-lg` | BottomBar 버튼, 타이틀 버튼 |
| `17px` | `--fs-xl` | 모달 타이틀 (`.modal-title`) |

### 기존 vh/vw 패턴 → 변수 대응표

| 기존 | 신규 변수 | 위치 |
|---|---|---|
| `clamp(14px, 2.4vh, 22px)` | `--fs-lg` | BottomBar `.cat-btn` |
| `clamp(12px, 2vh, 20px)` | `--fs-lg` | BottomBar `.end-btn` |
| `clamp(11px, 1.4vw, 15px)` | `--fs-md` | AppHeader `.hdr-title` |
| `clamp(11px, 1.1vw, 13px)` | `--fs-sm` | AppHeader `.hdr-name` |
| `2.5vh` (카드 desc) | `--fs-sm` | CardSliderLayout |
| `4.8vh` (카드 타이틀) | `--fs-xl` | CardSliderLayout |

---

## 레이아웃 높이 변수 (현행 유지)

BottomBar와 동일한 vh clamp 패턴 — 현재 값 그대로 유지한다.

```css
:root {
  --hdr-h: clamp(36px, 4.5vh, 50px);    /* AppHeader 높이 */
  --bar-h: clamp(88px, 11vh,  112px);   /* BottomBar 높이 */
}
```

---

## html 기본값 변경

```css
/* 현재 */
html, body { font-size: 13px; }

/* 변경안 */
html, body { font-size: var(--fs-md); }
```

> `--fs-md = clamp(12px, 2.0vh, 16px)` — 현재 13px 고정에서 반응형으로 전환.
> 컴포넌트별 폰트는 `--fs-*` 변수로 직접 지정해 html 상속에 의존하지 않는다.

---

## 적용 우선순위

반응형 전환이 필요한 컴포넌트 순서.

| 우선 | 컴포넌트 | 현재 방식 | 변경 |
|---|---|---|---|
| ✅ 완료 | `BottomBar.vue` | clamp vh | 기준으로 사용 |
| 1 | `global.css` | 13px 고정 | `--fs-*` 변수 추가, html=`--fs-md` |
| 2 | `AppHeader.scss` | clamp vw | `--fs-sm` / `--fs-md` 변수 대체 |
| 3 | `CharInfoPanel.vue` | px 혼용 | `--fs-sm` / `--fs-md` |
| 4 | `.modal-*` (global) | 13~17px | `--fs-md` / `--fs-xl` |
| 5 | `.btn` (global) | 12px | `--fs-sm` |
| 6 | `CardSliderLayout` | vh/vw 직접 | `--fs-xl` / `--fs-sm` |

---

## 파일 변경 계획

| 파일 | 변경 내용 |
|---|---|
| `src/assets/global.css` | `--fs-*` 6종 변수 추가, `html font-size` → `--fs-md` |
| `src/assets/components/ui/AppHeader.scss` | clamp vw → `--fs-sm` / `--fs-md` |
| `src/assets/views/user/UserBadge.scss` | px → `--fs-sm` |
| 각 `.vue` scoped 스타일 | 하드코딩 px/vh → `--fs-*` 변수 순차 대체 |

> `201_screen_design.md` §3 타이포그래피 내 px/vh 혼용 표는 본 문서가 대체한다.

---

## TODO

- [ ] `global.css`에 `--fs-xs` ~ `--fs-2xl` 변수 추가
- [ ] `html, body font-size: var(--fs-md)` 전환 후 레이아웃 확인
- [ ] `AppHeader.scss` — clamp vw → `--fs-*` 대체
- [ ] `.btn`, `.modal-title`, `.modal-box` — px → `--fs-*` 대체
- [ ] `CharInfoPanel`, `GameHud`, `InfoPanel` — px → `--fs-*` 순차 대체
- [ ] 완료 후 `201_screen_design.md` §3 타이포그래피 → 본 문서 링크로 교체
