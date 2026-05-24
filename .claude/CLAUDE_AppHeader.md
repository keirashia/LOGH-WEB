# AppHeader — 전역 헤더 컴포넌트

**파일**: `src/components/ui/AppHeader.vue`
**스타일**: `src/assets/components/ui/AppHeader.scss`
**자식**: `src/components/ui/OptionsPanel.vue` + `src/assets/components/ui/OptionsPanel.scss`
**등록**: `src/App.vue` (모든 뷰 상단에 전역 렌더링)

---

## 레이아웃

```
[ 銀河英雄伝説  IV·EX ]  ─────  [ 아바타 ] [ 사용자명 ] | [ ◆ 포인트 ] | [ 로그인/로그아웃 ] | [ ☰ ]
```

| 클래스 | 요소 | 설명 |
|---|---|---|
| `.hdr-brand` | 좌측 타이틀 | serif 금색, `IV · EX` 서브 |
| `.hdr-avatar` | `<img>` | 원형 크롭, `object-position: top center` |
| `.hdr-name` | `<span>` | `auth.username` getter |
| `.hdr-points` | `<span>` | `auth.points` (gold mono, `◆` 접두) |
| `.hdr-auth-btn` | `<button>` | 로그인 시 "로그아웃" / 비로그인 시 "🔑 로그인" |
| `.hdr-menu-btn` | `<button>` | 삼선 → X 토글, `optionsOpen` 제어 |

---

## 주요 상태 (script setup)

```js
const optionsOpen = ref(false)  // OptionsPanel 표시 여부
const avatarSrc   = testAvatar  // TODO: 유저 아바타 API 연동으로 교체
```

---

## authStore 연동

| 항목 | 설명 |
|---|---|
| `auth.username` | 비로그인 → `사용자_${tempCode앞8자리}` / 로그인 → 실제 username |
| `auth.isLoggedIn` | 로그인/로그아웃 버튼 분기 |
| `auth.points` | 헤더 포인트 수치 |
| `auth.tempCode` | 64자리 hex, `localStorage('logh_temp_code')` 연동, 게임 시작 시 DB 전송 예정 |

---

## 삼선 → X 애니메이션

`.bar` 3개 `<span>`. `.hdr-menu-btn.open` 시:

```
bar1: translateY(+6px) rotate(45deg)
bar2: opacity 0, scaleX(0)
bar3: translateY(-6px) rotate(-45deg)
```

트랜지션: `transform .25s ease`, `opacity .2s ease`

---

## OptionsPanel

- `optionsOpen === true` 일 때 `<Transition name="opts-slide">` 로 마운트
- `position: absolute; top: 100%` — 헤더 전체 너비, 본문 위 오버레이
- slide: `opacity + translateY(-10px)` → 0

---

## TODO

- [ ] `avatarSrc` — 유저 계정 아바타 API 연동
- [ ] OptionsPanel 내용 채우기 (현재 플레이스홀더)
- [ ] `☰` 옵션 항목 정의
