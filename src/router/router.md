# src/router — 라우터

## 개요

`src/router/index.js` — Vue Router 설정. 현재 라우터 가드는 최소화되어 있으며, Phase3 API 연동 시 인증 가드를 강화할 예정.

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
- [ ] Phase3: 인증 필요 라우트 전체 가드 강화
