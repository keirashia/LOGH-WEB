# 갭 분석 — `20260703_todos.md` / `796dummy.md` vs 실제 코드

> 조사 기준일: 2026-07-03. 아래 파일:라인은 조사 시점 기준이며 이후 코드 변경 시 재확인 필요.
> 해결된 항목은 `docs/`로 이관 완료 (108_data_turns.md, 114_data_battle.md, 203_screen_views.md,
> 106_data_fleet.md, 205_screen_scenario.md, 208_screen_components.md, 000_INDEX.md 참조).

## 🔴 플로우 단절

1. **라인(lane) 이동 중 조우 감지 로직 없음.** 도착한 성계에서의 적 감지만 존재 (`_fleetMove` 내부).

## 🔴 구조적 버그

2. **"가장 가까운 아군 성계로 철수"가 실제로는 `Object.values` 순회상 첫 번째 성계.** 거리 계산 없음 (`retreatFleet`, `applyBattleResult` 패배 분기 동일 패턴).
   - `gameStore.js:510-529`, `gameStore.js:263-273`

## 🟡 UI 컴포넌트 미정비

3. `GameHud.vue`에 일(day)·턴 수 미표시 (연/월만 표시, `game.dateStr`).
   - `GameHud.vue:11`, `gameStore.js:94`

## 🟡 얕은 구현

4. `_events()`: 10% 확률로 로그 텍스트만 출력, 실제 상태 변화 없음. `triggerCoup/triggerDefection/triggerResignation/triggerDeath`는 완성돼 있지만 어디서도 호출되지 않는 죽은 코드.
   - `gameStore.js:908-913`, `gameStore.js:949-1006`
5. `_ai()`: 세력별 성격 구분 없이 12% 확률로 랜덤 성계를 50% 확률로 즉시 강탈 (전술 전투 시스템 미경유).
   - `gameStore.js:915-934`
6. `AGENDA_ACTIONS`의 상당수 미실행: `fleet_train`, `op_propose`, `planet_develop`, `ship_design`, `ship_build`, `research_*`, 외교 카테고리 전체(`war_declare`, `ceasefire_propose`, `peace_treaty`, `alliance_propose/break`, `passage_rights`, `envoy_send`, `surrender_accept`, `trade_negotiate`, `loan_request`).
   - `gameStore.js:1120` TODO 주석 참조

---

## 🟠 `796dummy.md` (아스타테 성역 회전 시나리오) 관련

7. **FPA003(르페브르) charCode 미등록** — 확인됨, 여전히 미해결 (`fleetData.js:117-124`).
8. **`REH001`(뮈켄베르거 함대)이 `fleetData.js`에 아예 없음** — 문서와 실제 데이터 불일치.
9. 이제르론 주둔함대(미터마이어/로이엔탈), 시나리오 전용 승리조건, 1턴 강제 조우 이벤트(포위망/제2분함대), 양 웬리 지휘권 이전 이벤트 — 전부 코드 없음, 문서의 TODO 그대로 미해결.
10. **`scenarioDesc.js` 인터페이스 불일치.** `796dummy.md`가 명시한 페이지 인터페이스는 `{ index, image/bg, char, charName, text, effect, libs }`이지만, 실제 `scenarioDesc.js`(3페이지 전부)는 `char`/`charName` 필드를 전혀 채우지 않음(`image`/`text`/`effect`/`libs`만 존재). `ScenarioDetailView.vue`는 `page.char`로 캐릭터 초상화(`charSrc`)를, `page.charName`으로 이름 라벨을 렌더링하도록 이미 구현되어 있는데(`ScenarioDetailView.vue:100-102,22`), 이 시나리오는 해당 기능을 아예 쓰지 않는 상태 — 코드 버그는 아니지만 연출 콘텐츠 미완성.
11. **오프닝 내레이션과 함대 데이터 간 인명 불일치.** `scenarioDesc.js` 3페이지 텍스트는 "제4함대 사령관 패트릭 캐슬네스 중장"이 후퇴를 결단했다고 서술하지만, `fleetData.js`의 실제 `FPA004` 사령관은 파스톨레(`CH_000478`)이며 이는 `796dummy.md` 자체의 표(4절)와도 일치함. 즉 오프닝 컷씬 스크립트 쪽 인명이 시나리오 데이터/문서와 어긋나 있어 수정 필요.
    - `scenarioDesc.js` index 3, `fleetData.js:145-165`

**검증 완료(문제 없음):** `796dummy.md` 6절의 주요 성계 초기 상태 표(230006/230042/230002/230009/230037의 morale·tax·traits)는 `starDetail.js`와 정확히 일치. 5절 양 웬리 직책 오버라이드도 `charactersJobs.js`와 정확히 일치. libs 프리픽스 라우팅(`ST_`→성계 백과사전, `CH_`→인물 백과사전)도 `ScenarioDetailView.vue:109-110`에 정상 구현되어 있음.
