# 갭 분석 — `20260703_todos.md` / `796dummy.md` vs 실제 코드

> 조사 기준일: 2026-07-03. 아래 파일:라인은 조사 시점 기준이며 이후 코드 변경 시 재확인 필요.

## 구현됨 (스펙과 거의 일치)

- 타이틀 → 로비 → 시나리오 선택 라우팅 전체 (`router/index.js`)
- `gameStore.startGame` / `buildState` / `_loadScenarioFiles` (프리로드 캐시 포함)
- `endTurn()` 서브함수 체인 순서: `_processAgendas → _income → _supply → _fleetMove → _morale → _construct → _events → _ai → _victory`
- 의안 시스템: `politics/10` 동시 처리 수, `pending → approved/expired` 전환
- 전술 전투: 편대 생성 규칙(12,000/6,000 기준), 배치, 초기 사기 80/`DOUBLE_COL`, 3페이즈(player/ai/result), `_combat()` 데미지·반격·사기저하 공식 — 스펙과 거의 완전 일치

---

## 🔴 플로우 단절

1. **`ScenarioDetailView` → `[국가선택]`이 `ScenarioOptionsView`를 건너뜀** — 바로 `scenario-char`로 라우팅. `ScenarioOptionsView`는 라우트만 등록되어 있고 실제로는 도달 불가능한 고아 화면. 옵션 카드도 전부 `disabled` 상태 (`lobby.options.npcAppearance/npcBehavior`가 기본값에 고정됨).
   - `ScenarioDetailView.vue:119-121`, `ScenarioOptionsView.vue:49`
2. **턴종료 confirm 다이얼로그 전체 미구현.** "전략 활동 이력" 추적 자체가 없고 (`actionHistory` 류 코드 전무), `BottomBar.vue`의 턴종료 버튼은 `game.endTurn()`을 확인 없이 즉시 호출.
   - `BottomBar.vue:15`
3. **교전 발생 confirm 미구현.** `_pendingBattle`이 생기면 무조건 `/game/tactical`로 강제 이동. "플레이어 캐릭터 부재 시에만 confirm" 분기, "아니오 선택 시 자동처리" 분기 모두 없음.
   - `GameView.vue:147-149`

## 🔴 구조적 버그

4. **`_pendingBattle`이 스칼라(단일 객체).** 한 턴에 전투가 여러 건 감지되면 나중 것이 이전 것을 덮어써 사라짐. 스펙의 "성계 ID 순서대로 큐 처리" 불가능.
   - `gameStore.js:810-816`
5. **라인(lane) 이동 중 조우 감지 로직 없음.** 도착한 성계에서의 적 감지만 존재 (`_fleetMove` 내부).
6. **`_victory()` 실행 순서 역전.** `endTurn()` 안에서 전술턴 진입보다 먼저 `_victory()`가 실행되어, 턴/날짜가 이미 넘어간 뒤에 전투가 재생됨.
   - `gameStore.js:162-171`
7. **"가장 가까운 아군 성계로 철수"가 실제로는 `Object.values` 순회상 첫 번째 성계.** 거리 계산 없음 (`retreatFleet`, `applyBattleResult` 패배 분기 동일 패턴).
   - `gameStore.js:510-529`, `gameStore.js:263-273`

## 🟡 UI 컴포넌트 미정비

8. `BottomBar.vue` → `StrategyBar.vue` 리네임 안 됨. `TacticalBar.vue` 파일 자체가 없음 — 전술 조작(이동/공격/진형변경/턴종료)은 `TacticalView.vue`에 인라인으로 구현되어 기능은 있으나 스펙이 요구한 컴포넌트 분리가 안 되어 있음.
9. `CharInfoPanel.vue`를 함대 패널로 교체하는 대신 `TacticalView.vue` 내부에 별도 패널(`.tac-left`)을 새로 만듦. 표시 내용은 충족하나 스펙이 지시한 "교체" 방식과 다름. `CharInfoPanel.vue` 자체는 `tacticalStore`에 대한 인지가 전혀 없음.
10. `GameHud.vue`에 일(day)·턴 수 미표시 (연/월만 표시, `game.dateStr`).
    - `GameHud.vue:11`, `gameStore.js:94`

## 🟡 얕은 구현

11. `_events()`: 10% 확률로 로그 텍스트만 출력, 실제 상태 변화 없음. `triggerCoup/triggerDefection/triggerResignation/triggerDeath`는 완성돼 있지만 어디서도 호출되지 않는 죽은 코드.
    - `gameStore.js:908-913`, `gameStore.js:949-1006`
12. `_ai()`: 세력별 성격 구분 없이 12% 확률로 랜덤 성계를 50% 확률로 즉시 강탈 (전술 전투 시스템 미경유).
    - `gameStore.js:915-934`
13. `AGENDA_ACTIONS`의 상당수 미실행: `fleet_train`, `op_propose`, `planet_develop`, `ship_design`, `ship_build`, `research_*`, 외교 카테고리 전체(`war_declare`, `ceasefire_propose`, `peace_treaty`, `alliance_propose/break`, `passage_rights`, `envoy_send`, `surrender_accept`, `trade_negotiate`, `loan_request`).
    - `gameStore.js:1120` TODO 주석 참조

---

## 🟠 `796dummy.md` (아스타테 성역 회전 시나리오) 관련

14. **FPA003(르페브르) charCode 미등록** — 확인됨, 여전히 미해결 (`fleetData.js:117-124`).
15. **REH004 `locCode: ""` 미확정.** 게다가 `buildFleetsMap()`이 `parentFlt` 있는 함대(REH041~045)를 전부 제외 → 실제 게임엔 REH 함대가 REH004의 4,000척만 존재하고, 그마저 `locCode`가 빈 문자열이라 `game.systems[""]`가 `undefined`가 되어 **맵에 렌더링조차 안 됨**. 데이터상 "약 2만척"이 게임에 전혀 반영되지 않는 심각한 갭.
    - `fleetData.js:512-516`, `fleetUtils.js:128-164`(parentFlt 제외 로직), `gameStore.js:97-106`(allFleets 필터)
16. **`REH001`(뮈켄베르거 함대)이 `fleetData.js`에 아예 없음** — 문서와 실제 데이터 불일치.
17. 이제르론 주둔함대(미터마이어/로이엔탈), 시나리오 전용 승리조건, 1턴 강제 조우 이벤트(포위망/제2분함대), 양 웬리 지휘권 이전 이벤트 — 전부 코드 없음, 문서의 TODO 그대로 미해결.

---

## 권장 우선순위 (구현 착수 시)

1. `_pendingBattle` 큐화 (스칼라 → 배열) — 구조적 버그이자 이후 confirm/자동처리 로직의 전제조건
2. 시나리오 옵션 플로우 연결 (`ScenarioDetailView` → `ScenarioOptionsView` → `ScenarioCharSelectView`) 복구
3. 턴종료 / 교전 발생 confirm 다이얼로그 2건 구현
4. REH004 `locCode` 확정 + `parentFlt` 함대 합산 로직 수정 (아스타테 시나리오 플레이 자체를 막는 블로커)
5. `_victory()` 순서 재정렬 (턴 종료 전에 모든 전술턴 처리 완료되도록)
6. UI 컴포넌트 분리(`StrategyBar`/`TacticalBar`, 함대 정보 패널)는 기능적으로는 이미 동작하므로 후순위
