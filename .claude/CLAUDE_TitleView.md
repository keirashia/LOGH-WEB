# TitleView — 타이틀 화면

**파일**: `src/views/title/TitleView.vue`
**라우트**: `/`
**스타일**: scoped inline (별도 SCSS 없음)

---

## 레이아웃

```
[ 별이 흐르는 스타필드 canvas (z-index:0) ]
       ────────────────────────
       LEGEND OF GALACTIC HEROES   ← .t-sub
         銀河英雄伝説              ← .t-main (pulse 애니)
           은하영웅전설            ← .t-kr
        [ IV EX · Vue Port ]       ← .t-ver
       ────────────────────────
       [ ⚔️ 빠른 시작 (게스트) ]   ← gold-btn
       [ 🎓 튜토리얼 ]             ← dim-btn
       [ 📖 사전 ]                 ← dim-btn
[ ◤ 코너 장식 × 4 (tl/tr/bl/br) ]
```

---

## 클래스 & 요소

| 클래스 | 요소 | 설명 |
|---|---|---|
| `.title-wrap` | 루트 `<div>` | `position:relative`, 100% 크기 |
| `.starfield` | `<canvas ref="cvs">` | 배경 별 애니메이션 |
| `.title-inner` | 중앙 컨테이너 | flex column, z-index:1 |
| `.t-sub` | `<p>` | 영문 서브타이틀, mono, 11px |
| `.t-main` | `<h1>` | 일문 타이틀, serif, gold, `pulse` 애니 |
| `.t-kr` | `<p>` | 한글 타이틀, serif |
| `.t-ver` | `<span>` | 버전 표기, mono, border badge |
| `.t-btns` | `<div>` | 버튼 그룹, flex column |
| `.corner.tl/tr/bl/br` | `<div>×4` | 금색 코너 장식, opacity 0.4 |

---

## 버튼

| 클래스 | 목적지 | 동작 |
|---|---|---|
| `.gold-btn` | `/user/login` | `$router.push('/user/login')` |
| `.mid-btn` | `/lobby` | `guestStart()` → `/lobby` |
| `.dim-btn` | `/tutorial` | `$router.push('/tutorial')` |
| `.dim-btn` | `/encyclopedia` | `$router.push('/encyclopedia')` |

---

## 스타필드 (Canvas)

- **별**: 300개, 좌측 방향 이동 (`x -= sp`), 화면 밖 나가면 우측에서 재등장
- **성운**: 4개, 랜덤 위치·반경(80~200px), 라디알 그라데이션 (파랑/빨강/보라)
- **반짝임**: `sin(tw)` 기반 opacity 변화 (0.15 ~ 0.65)
- **리사이즈**: `addEventListener('resize', onr)` → canvas 크기 재조정
- **정리**: `onUnmounted` → `cancelAnimationFrame` + `removeEventListener`

```
별 속성: { x, y, r(반경 0.1~1.4), tw(트윙클위상), sp(속도 0.03~0.28) }
성운 팔레트: rgba(41,128,185 / 192,57,43 / 100,50,180)
```

---

## script setup 주요 항목

```js
const router = useRouter()
const auth   = useAuthStore()
const cvs    = ref(null)   // canvas ref
let aid = null              // requestAnimationFrame ID

function guestStart() {
  auth.user = { id: 0, username: '게스트', email: '', isAdmin: false }
  auth.isLoggedIn = true
  router.push('/lobby')
}
```

> `guestStart()`는 authStore 직접 변이 중 — 추후 `auth.loginAsGuest()` 액션으로 추출 예정

---

## CSS 애니메이션

```css
@keyframes pulse { 0%,100%{opacity:.7} 50%{opacity:1} }
/* .t-main에 3s ease-in-out infinite 적용 */
```

---

## TODO

- [ ] `.t-credit` (주석 처리됨) — 원작 크레딧 표기 여부 결정
- [ ] `guestStart()` → `auth.loginAsGuest()` 스토어 액션으로 추출
- [ ] 스타필드를 `<StarfieldCanvas />` 컴포넌트로 분리 (다른 뷰에서도 재사용 시)
- [ ] 버튼 진입 애니메이션 (staggered fade-in)
- [ ] 배경음악 / 효과음 연동 (Phase 2)
