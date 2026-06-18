# src/router — 라우터
> 분류: 화면
> 경로: `docs/202_screen_router.md`
> 상위: [200_SCREEN.md](200_SCREEN.md)
> 최종 수정: 2026-06-18

## 개요

`src/router/index.js` — Vue Router 설정. 현재 라우터 가드는 최소화되어 있으며, Phase3 API 연동 시 인증 가드를 강화할 예정.

### 현재 가드 현황

| 라우트 | 가드 | 비고 |
|---|---|---|
| `/game` | `beforeEnter`: `gameStore.initialized` 체크 | 구현됨 |
| `/admin` | 미구현 | TODO |
| `/lobby` 및 하위 | **미구현** | 현재는 게스트도 문제없이 통과. 인증 정책 확정 시 설계 필요 |

---

## 라우트 목록

```js
{ path: '/',                component: TitleView }
{ path: '/user/login',      component: LoginView }
{ path: '/user/register',   component: RegisterView }
{ path: '/user/profile',    component: UserProfileView }
{ path: '/lobby',           component: LobbyView }
{ path: '/scenario',        component: ScenarioSelectView }
{ path: '/game',            component: GameView }
{ path: '/game/tactical',   component: TacticalView }
{ path: '/tutorial',        component: TutorialView }
{ path: '/encyclopedia',    component: EncyclopediaView }
{ path: '/admin',           component: AdminView }
```

---

## TODO

- [ ] `/game` 진입 가드: `game.initialized` false 시 `/lobby` 리다이렉트
- [ ] `/admin` 진입 가드: `auth.isAdmin` false 시 `/` 리다이렉트
- [ ] `/lobby` 및 하위 라우트 인증 가드 체계 설계 (인증 정책 확정 후 진행 — 즉시 수정 필요 항목 아님)
- [ ] Phase3: 인증 필요 라우트 전체 가드 강화
