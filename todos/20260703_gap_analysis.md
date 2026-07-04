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

1. ✅ **[해결됨 2026-07-03]** ~~`ScenarioDetailView` → `[국가선택]`이 `ScenarioOptionsView`를 건너뜀~~. `onStart()`가 `scenario-options`로 라우팅하도록 수정, 옵션 카드 `disabled` 제거 후 `@click="lobby.options[grp.key] = opt.val"` 연결. Playwright로 상세→옵션→국가선택 전체 플로우 및 카드 active 토글 확인 완료.
   - `ScenarioDetailView.vue:119-121`, `ScenarioOptionsView.vue:49`
2. ✅ **[해결됨 2026-07-04]** ~~턴종료 confirm 다이얼로그 전체 미구현.~~ `gameStore._turnActionTaken` 플래그 추가(플레이어 커맨드 20개 지점에 `_markAction()` 삽입, 매 턴 종료 시 리셋), 턴종료 버튼(현 `StrategyBar.vue`, 구 `BottomBar.vue`)이 `event` 모달로 활동 유무에 따라 다른 문구의 confirm을 띄우도록 수정. Playwright로 활동 없음/있음 두 케이스, 취소 시 턴 유지, 확인 시 턴 증가 모두 확인.
   - `gameStore.js:73,180,189...`(20개 지점), `StrategyBar.vue`
3. ✅ **[해결됨 2026-07-04]** ~~교전 발생 confirm 미구현.~~ `GameView.vue`의 `_pendingBattles` watcher가 플레이어 캐릭터가 해당 함대(사령관/부관)에 없을 때만 `event` 모달로 confirm 표시, [네]→전술뷰 이동/[아니오]→`gameStore.autoResolveBattle()`(신규, 함대 규모+지휘관 보정 기반 약식 판정) 후 결과 모달. 플레이어 캐릭터가 전투 현장에 있으면 바로 전술뷰 진입. Playwright로 두 분기 모두 확인 (자동처리 결과 로그/모달, `_pendingBattles` 소진, [네] 클릭 시 전술 그리드 진입).
   - `gameStore.js:225-283`(applyBattleResult/autoResolveBattle), `GameView.vue:147-179`, `EventModal.vue:58`(줄바꿈 미반영 버그도 함께 수정: `white-space: pre-line` 추가)

## 🔴 구조적 버그

4. ✅ **[해결됨 2026-07-03]** ~~`_pendingBattle`이 스칼라(단일 객체).~~ `_pendingBattles`(배열) 큐로 전환 완료. `_fleetMove()`가 한 턴에 감지된 전투를 모아 성계 ID 순으로 정렬 후 큐에 push, `applyBattleResult()`는 `shift()`로 소비. `GameView.vue`/`TacticalView.vue`도 큐 길이 기반으로 갱신, `returnToCampaign()`이 다음 대기 전투가 있으면 `initBattle()`로 이어서 처리하도록 수정.
   - `gameStore.js:72,219,275,791-826`, `GameView.vue:147-149`, `TacticalView.vue:268-271,362-368`
5. **라인(lane) 이동 중 조우 감지 로직 없음.** 도착한 성계에서의 적 감지만 존재 (`_fleetMove` 내부).
6. ✅ **[해결됨 2026-07-04]** ~~`_victory()` 실행 순서 역전.~~ `endTurn()`을 두 단계로 분리: 의안/수입/보급/함대이동(전투감지)/사기/건설/이벤트/AI까지 실행 후 `_pendingBattles`가 비어있을 때만 곧바로 `_finishTurn()`(날짜·턴 증가, `_victory()`, 로그) 호출. 전투가 있으면 `_finishTurn()`을 보류하고, `applyBattleResult()`가 큐를 `shift()`한 뒤 큐가 완전히 비었을 때 `_finishTurn()`을 호출하도록 변경 — "모든 전술턴 처리 후 턴 종료" 스펙과 일치. `applyBattleResult` 승리 분기의 중복 `_victory()` 호출도 제거. Playwright로 검증: 전투 대기 중엔 turn/day가 그대로 유지되다가 전투 해소 시점에만 증가함을 확인.
   - 검증 중 **별개의 실제 버그**를 하나 더 발견해 수정: `EventModal.vue`의 `buttons`가 `computed`가 아닌 일반 `const`라서, 동일 컴포넌트 인스턴스가 재사용되는 연속 모달 호출(턴종료 confirm → 교전 confirm) 시 두 번째 모달의 버튼이 첫 번째 모달의 버튼으로 고정되어 표시되는 문제가 있었음 → `computed()`로 전환해 반응형으로 수정.
   - `gameStore.js:138-183`(endTurn/_finishTurn), `gameStore.js:290-292`(applyBattleResult), `EventModal.vue:35`
7. **"가장 가까운 아군 성계로 철수"가 실제로는 `Object.values` 순회상 첫 번째 성계.** 거리 계산 없음 (`retreatFleet`, `applyBattleResult` 패배 분기 동일 패턴).
   - `gameStore.js:510-529`, `gameStore.js:263-273`

## 🟡 UI 컴포넌트 미정비

8. ✅ **[일부 해결 2026-07-04]** `BottomBar.vue` → `StrategyBar.vue` 리네임 완료 (`GameView.vue`, `menuTree.js` 주석 포함 참조 전체 갱신, 클래스명도 `.bottom-bar`→`.strategy-bar`). Playwright로 메뉴/턴종료 정상 동작 재확인.
   `TacticalBar.vue` 신설은 **보류**: 현재 이동/공격은 지도 셀 클릭 기반 UX이고, 진형변경은 선택된 유닛과 밀접한 좌측 패널에 있어 이를 별도 하단바로 쪼개면 검증된 전술 UI에 회귀 위험만 생기고 실질적 이득이 없다고 판단. 기능은 이미 100% 동작하므로 순수 컴포넌트 명명 일치 목적일 때만 재검토.
9. `CharInfoPanel.vue`를 함대 패널로 교체하는 대신 `TacticalView.vue` 내부에 별도 패널(`.tac-left`)을 새로 만듦. 표시 내용은 충족하나 스펙이 지시한 "교체" 방식과 다름. `CharInfoPanel.vue` 자체는 `tacticalStore`에 대한 인지가 전혀 없음. (위와 같은 이유로 보류)
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
15. ✅ **[해결됨 2026-07-04]** ~~REH004 `locCode: ""` 미확정, `parentFlt` 함대(REH041~045) 함선 수 유실.~~ REH004 `location.locCode`를 `230005`(아스타테)로 확정, `buildFleetsMap()`이 `parentFlt`로 상위 함대를 가리키는 분함대들의 `shipList` 합계를 상위 함대에 더하도록 수정. Playwright로 확인: REH004 `ships=24000`(4,000+4,000×5), `game.allFleets`에 `sx:580, sy:190`(아스타테 좌표)로 정상 포함되어 맵 렌더링 가능해짐. 단, 분함대 사령관(메르카츠 등)은 여전히 REH004 `officers`에 반영되지 않음 (별도 TODO, `796dummy.md` 9절 참조).
    - `fleetData.js:512-516`, `fleetUtils.js:128-164`(parentFlt 합산 로직)
16. **`REH001`(뮈켄베르거 함대)이 `fleetData.js`에 아예 없음** — 문서와 실제 데이터 불일치.
17. 이제르론 주둔함대(미터마이어/로이엔탈), 시나리오 전용 승리조건, 1턴 강제 조우 이벤트(포위망/제2분함대), 양 웬리 지휘권 이전 이벤트 — 전부 코드 없음, 문서의 TODO 그대로 미해결.
18. **`scenarioDesc.js` 인터페이스 불일치.** `796dummy.md`가 명시한 페이지 인터페이스는 `{ index, image/bg, char, charName, text, effect, libs }`이지만, 실제 `scenarioDesc.js`(3페이지 전부)는 `char`/`charName` 필드를 전혀 채우지 않음(`image`/`text`/`effect`/`libs`만 존재). `ScenarioDetailView.vue`는 `page.char`로 캐릭터 초상화(`charSrc`)를, `page.charName`으로 이름 라벨을 렌더링하도록 이미 구현되어 있는데(`ScenarioDetailView.vue:100-102,22`), 이 시나리오는 해당 기능을 아예 쓰지 않는 상태 — 코드 버그는 아니지만 연출 콘텐츠 미완성.
19. **오프닝 내레이션과 함대 데이터 간 인명 불일치.** `scenarioDesc.js` 3페이지 텍스트는 "제4함대 사령관 패트릭 캐슬네스 중장"이 후퇴를 결단했다고 서술하지만, `fleetData.js`의 실제 `FPA004` 사령관은 파스톨레(`CH_000478`)이며 이는 `796dummy.md` 자체의 표(4절)와도 일치함. 즉 오프닝 컷씬 스크립트 쪽 인명이 시나리오 데이터/문서와 어긋나 있어 수정 필요.
    - `scenarioDesc.js` index 3, `fleetData.js:145-165`

**검증 완료(문제 없음):** `796dummy.md` 6절의 주요 성계 초기 상태 표(230006/230042/230002/230009/230037의 morale·tax·traits)는 `starDetail.js`와 정확히 일치. 5절 양 웬리 직책 오버라이드도 `charactersJobs.js`와 정확히 일치. libs 프리픽스 라우팅(`ST_`→성계 백과사전, `CH_`→인물 백과사전)도 `ScenarioDetailView.vue:109-110`에 정상 구현되어 있음.

---

## 권장 우선순위 (구현 착수 시)

1. ✅ `_pendingBattle` 큐화 (스칼라 → 배열) — 완료 (2026-07-03)
2. ✅ 시나리오 옵션 플로우 연결 (`ScenarioDetailView` → `ScenarioOptionsView` → `ScenarioCharSelectView`) 복구 — 완료 (2026-07-03)
3. ✅ 턴종료 / 교전 발생 confirm 다이얼로그 2건 구현 — 완료 (2026-07-04)
4. ✅ REH004 `locCode` 확정 + `parentFlt` 함대 합산 로직 수정 — 완료 (2026-07-04)
5. ✅ `_victory()` 순서 재정렬 (턴 종료 전에 모든 전술턴 처리 완료되도록) — 완료 (2026-07-04)
6. ✅ `StrategyBar` 리네임 완료 (2026-07-04) — `TacticalBar`/함대 정보 패널 분리는 회귀 위험 대비 실익이 낮아 보류 (기능은 이미 동작)
