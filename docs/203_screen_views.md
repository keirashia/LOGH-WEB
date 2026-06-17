# src/views — 뷰 & 라우터
> 분류: 화면
> 경로: `docs/203_screen_views.md`
> 상위: [200_SCREEN.md](200_SCREEN.md)
> 최종 수정: 2026-06-17

## 라우터 경로

| path | 뷰 | 접근 조건 |
|---|---|---|
| `/` | TitleView | 자유 |
| `/user/login` | LoginView | 자유 |
| `/user/register` | RegisterView | 자유 |
| `/user/profile` | UserProfileView | 로그인 필요 |
| `/lobby` | LobbyView | 자유 |
| `/scenario` | ScenarioSelectView | 자유 |
| `/game` | GameView | `game.initialized` 필요 |
| `/game/tactical` | TacticalView | `_pendingBattle` 경유 |
| `/tutorial` | TutorialView | 자유 |
| `/encyclopedia` | EncyclopediaView | 자유 |
| `/admin` | AdminView | `isAdmin` 필요 |

---

## TitleView.vue (`/`)

```
[ 별이 흐르는 스타필드 canvas ]
  LEGEND OF GALACTIC HEROES
    銀河英雄伝説   ← pulse 애니
      은하영웅전설
  [ ⚔️ 빠른 시작 ] → /lobby (guestStart)
  [ 🎓 튜토리얼 ] → /tutorial
  [ 📖 사전 ]     → /encyclopedia
[ 코너 장식 × 4 ]
```

- 별 300개: 좌측 방향 이동, 반짝임 (sin 기반)
- 성운 4개: 랜덤 위치, 라디알 그라데이션
- `guestStart()`: authStore 직접 변이 → 추후 `auth.loginAsGuest()` 추출 예정

---

## GameView.vue (`/game`)

메인 게임 레이아웃. `game.initialized`가 false면 접근 불가.

```
[ EventLog ]
[ GameHud ]
[ SidePanel | GalaxyMap | InfoPanel ]
[ BottomBar ]
[ 모달 오버레이 (activeModal) ]
[ 게임오버 오버레이 (gameOver) ]
```

- `watch(() => game._pendingBattle)` → `/game/tactical` 라우팅
- 테마: `.theme-REH` / `.theme-FPA` / `.theme-PZN` (CSS 변수 `--fc` 세팅)

---

## TacticalView.vue (`/game/tactical`)

전술 전투 화면. `gameStore._pendingBattle`로 진입.

- 전투 종료 시 `gameStore.applyBattleResult(result)` 호출 후 `/game` 복귀
- 자동/수동 모드 전환 지원

---

## LobbyView / ScenarioSelectView (`/lobby`, `/scenario`)

- LobbyView: 싱글/멀티/시나리오 선택
- ScenarioSelectView: 시나리오 목록 (`SCENARIOS`), 세력 선택 → `game.startGame(scId, pf)`

---

## 미완성 뷰 (껍데기)

| 뷰 | 현황 |
|---|---|
| TutorialView | 껍데기 |
| EncyclopediaView | encyclopediaStore 연결 예정 |
| AdminView | isAdmin 가드, 내용 없음 |

---

## TODO

- [ ] TutorialView 내용 작성
- [ ] EncyclopediaView — encyclopediaStore 완성 후 연결
- [ ] TitleView: 크레딧 표기, 버튼 staggered fade-in 애니메이션
- [ ] TitleView: `guestStart()` → `auth.loginAsGuest()` 스토어 액션으로 추출
