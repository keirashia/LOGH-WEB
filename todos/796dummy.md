# SE796_0211_010 — 아스타테 성역 회전 「영원한 어둠 속에서」
## 게임 시작 진입 로직

---

## 1. 시나리오 개요

| 항목 | 값 |
|---|---|
| ID | `SE796_0211_010` |
| 명칭 | 아스타테 성역 회전 |
| 부제 | 영원한 어둠 속에서 |
| 개시일 | 우주력 796년 2월 11일 (제국력 487년) |
| 등장 세력 | REH · FPA · PZN |
| 해금 조건 | 상시 (openPt = 0) |
| 태그 | 사실, 초심자추천 |

---

## 2. 시나리오 선택 → 게임 진입 흐름

```
ScenarioSelectView (SE796 연도 선택)
  ↓
ScenarioDetailView (아스타테 성역 회전 선택)
  → SCENARIO_DESC 오프닝 3페이지 표시 (scenarioDesc.js)
  ↓
ScenarioOptionsView (NPC 옵션 선택)
  ↓
ScenarioCharSelectView
  → 국가 선택: REH / FPA / PZN
  → 인물 선택 후 [게임 시작]
  ↓
gameStore.startGame('SE796_0211_010', playerFaction, charCode)
  ↓
GameView (/game) 진입
  → 시나리오 진입 이벤트 실행 (오프닝 컷씬 / EventModal)
```
> TODO. 초기 데이터 세팅
> 연도 선택 시, 해당 연도의 시나리오를 불러와 화면에 노출하는지 여부 체크
> 시나리오 선택 시, 해당 시나리오에 등장하는 인물 필터링

### 2-1. 참조 파일 상세

#### `src/data/scenario/scenarioData.js`
- 전체 시나리오 메타 목록 (`SCENARIOS` 배열) 관리
- 각 항목: `id`, `yearType`, `year`, `month`, `nameKr`, `factions`, `tags`, `useYn`, `openPt`, `desc`
- `desc` 배열은 각 시나리오 폴더의 `scenarioDesc.js`에서 import해 주입
- `showYn: false`이면 타임라인에서 숨김 (`ScenarioSelectView`에서 필터링)

#### `src/data/scenario/SE796/0211/010/scenarioDesc.js`
- 아스타테 회전 오프닝 3페이지 데이터 (`SCENARIO_DESC` 배열)
- 각 항목 인터페이스: `{ index, image/bg, char, charName, text, effect, libs }`
- `libs` 값 형식: `"ST_:아스타테"`, `"CH_:양 웬리"` → 클릭 시 백과사전(`encyclopediaStore`) 열림

#### `src/views/lobby/scenario/ScenarioSelectView.vue`
- 연도(타임라인) 선택 화면
- `SCENARIOS`를 연도별로 그룹핑 → `ScTimelineLayout` · `ScEventListPanel` 에 전달
- 시나리오 선택 시 `lobbyStore.selectedFaction/selectedCharCode` 초기화 후 `/lobby/single/new/{scId}/options` 라우팅

#### `src/views/lobby/scenario/ScenarioDetailView.vue`
- 시나리오 오프닝 3페이지 표시 화면 (이미지 + 텍스트 + libs 버튼 + 페이지 도트)
- `SCENARIOS[scId].desc` 배열을 페이지 단위로 렌더링; 이미지 경로: `/img/scenarios/{y}/{m}/{s}/{파일명}`
- `onMounted`에서 `game.preloadScenario(scId)` 호출 → 백그라운드 사전 로드
- [국가 선택] 클릭 시 `scenario-char` 라우트로 이동
- ※ 흐름도 상 "시나리오 선택" 단계이지만 실제로 오프닝 desc 표시 역할도 겸함

#### `src/views/lobby/scenario/ScenarioOptionsView.vue`
- NPC 등장/행동 옵션 선택 화면
- `lobbyStore.options.npcAppearance` (`fact` / `fiction`), `lobbyStore.options.npcBehavior` (`fact` / `fiction`) 바인딩
- 현재 옵션 카드 전체 `disabled` 처리 중 (선택 불가 상태, TODO)
- [다음] 클릭 시 `scenario-char` 라우트로 이동

#### `src/views/lobby/scenario/ScenarioCharSelectView.vue`
- 국가 선택(Stage 1) + 인물 선택(Stage 2) 통합 화면
- 인물 목록: 시나리오별 `characters/charactersData.js` (dynamic import) 의 `CHAR_LIST` + 전체 `CHAR_BASE` 조합
- `game._preloadedData?.charJobs`로 시나리오 오버라이드 직책 반영 (`effectiveCharJobs`)
- `isAliveAt()`: `npcAppearance === 'fact'`일 때 생몰년(`birth`/`death`) 기준으로 인물 필터링
- `recommend` 값 기준 추천 인물 자동 선택 (`leadChars`)
- [게임 시작] 클릭 → `game.startGame(scId, faction, charCode)` 후 `/game` 라우팅

#### `src/stores/gameStore.js` — `startGame(scId, pf, charCode)`
- `_loadScenarioFiles(scId)`로 아래 7개 파일 병렬 로드 (glob 기반 dynamic import):

  | 파일 경로 (시나리오 폴더 기준) | export | 용도 |
  |---|---|---|
  | `stars/starDetail.js` | `STAR_DETAIL` | 성계 초기 상태 |
  | `stars/planetDetail.js` | `PLANET_DETAIL` | 행성 상세 |
  | `characters/charactersJobs.js` | `CHAR_JOBS` | 시나리오 직책 오버라이드 |
  | `characters/charactersData.js` | `CHAR_LIST` | 시나리오 등장 인물 목록 |
  | `cliqueData.js` | `CLIQUE_DATA` | 파벌 데이터 |
  | `fleet/fleetData.js` | `FLEET_DATA` | 초기 함대 배치 |
  | `fleet/fleetTraitData.js` | `FLEET_TRAIT_DATA` | 함대 트레잇 |

- 로드 완료 후 `buildState(scId, pf, extraData)`로 초기 게임 상태 구성 → `$state` 전체 교체
- `preloadScenario(scId)`: `ScenarioDetailView` 진입 시 미리 로드 → `startGame`에서 캐시 재사용


---

## 3. 오프닝 컷씬 (scenarioDesc.js — 3페이지)

| 페이지 | 이미지 | 내용 | 효과 | 등장 자료 |
|---|---|---|---|---|
| 1 | `01.webp` (아스타테 성계) | 동맹 4만척 → 3개 분함대 편성, 라인하르트 단독 지휘 소개 | `fade` | ST_:아스타테 |
| 2 | (없음) | 라인하르트의 각개격파 전략 설명 | `slide` | — |
| 3 | (없음) | 제2분함대 격파 → 파에타 4함대 후퇴 결단, 양 웬리 첫 등장 | `fade` | CH_:양 웬리 |

---

## 4. 초기 함대 배치

### 자유행성동맹 (FPA)

아스타테 회전에 직접 투입되는 3개 분함대 (총 ~4만 5천척).

| 함대 코드 | 함대명 | 사령관 | 부관/참모 | 함선 수 | 시작 위치 |
|---|---|---|---|---|---|
| `FPA001` | 제1함대 | 쿠브르슬리 (CH_000443) | — | 15,000 | `230006` |
| `FPA002` | 제2함대 | 파에타 (CH_000479) | 양 웬리(CH_000266), 아텐보로(CH_000043), 라오(CH_000060) | 15,000 | `230006` |
| `FPA004` | 제4함대 | 파스톨레 (CH_000478) | 피셔 (CH_000270) | 15,000 | `230006` |

> 나머지 함대(FPA005~FPA012)는 하이네센(230006) 주둔 상태이며 이 시나리오의 교전에 직접 참여하지 않음.  
> FPA003(르페브르)는 charList 미등록 상태 — TODO.

### 은하제국 (REH)

라인하르트 총사령관 휘하 약 2만척. 위치는 초기화 시 아스타테 방면 미확정 성계로 배치 예정.

| 함대 코드 | 함대명 | 사령관 | 부관/참모 | 함선 수 | 시작 위치 |
|---|---|---|---|---|---|
| `REH001` | 뮈켄베르거 함대 | 뮈켄베르거 (CH_000199) | — | 4,000 | 미확정 |
| `REH004` | 로엔그람 함대 (총사령관) | 라인하르트 폰 뮈젤 (CH_000064) | 키르히아이스 (CH_000388) | 4,000 | 미확정 |
| `REH041` | 메르카츠 분함대 | 메르카츠 (CH_000195) | — | 4,000 | 미확정 (parentFlt: REH004) |
| `REH042` | 슈타덴 분함대 | 슈타덴 (CH_000223) | — | 4,000 | 미확정 (parentFlt: REH004) |
| `REH043` | 파렌하이트 분함대 | 파렌하이트 (CH_000233) | — | 4,000 | 미확정 (parentFlt: REH004) |
| `REH044` | 에를라흐 분함대 | 에를라흐 (CH_000290) | — | 4,000 | 미확정 (parentFlt: REH004) |
| `REH045` | 포겔 분함대 | 포겔 (CH_000494) | — | 4,000 | 미확정 (parentFlt: REH004) |

> 이제르론 주둔함대

---

## 5. 초기 인물 직책 오버라이드 (charactersJobs.js)

베이스 직책과 다른 경우만 등록.

| 인물 | charCode | 직책 코드 | 비고 |
|---|---|---|---|
| 양 웬리 | CH_000266 | JB_MR005, JB_C001 | 아스타테 당시 소장/전략고문. 함대 소속은 fleetData.js의 FPA002 charList에서 파생 |

---

## 6. 주요 성계 초기 상태 (관련 성계)

| 코드 | 민심 | 세율 | 트레잇 | 비고 |
|---|---|---|---|---|
| 230006 | 80 | 35% | ANCIENT_CAPITAL, TRADE_HUB | 하이네센 추정 (FPA 수도, 전 FPA함대 집결지) |
| 230042 | 82 | 20% | TRADE_HUB, STRATEGIC_POSITION, OCEANIC_WORLD | 페잔 추정 |
| 230002 | 75 | 30% | MILITARY_TRADITION, NATURAL_FORTRESS | 요새형 제국 성계 |
| 230009 | 78 | 28% | NOBLE_DOMINANCE, MILITARY_TRADITION | 제국 귀족 거점 |
| 230037 | 48 | 33% | WAR_SCAR | 전쟁 피해 성계 (경계지대 추정) |

---

## 7. 게임 진입 시 발생해야 할 이벤트 (TODO)

### 7-1. 아스타테 진입 직전 포위망 전술 이벤트
- 게임 시작 직후(1턴 개시 전), 동맹 3개 분함대가 아스타테 성역 방면으로 이동 명령이 의안으로 자동 등록되어 있는 상태로 시작
- 또는: 게임 시작과 동시에 함대가 이미 아스타테 성역에 배치된 상태로 시작 (구현 방향 결정 필요)

### 7-2. 제2분함대 조우 이벤트 (1턴)
- 제2분함대(파에타)와 로엔그람 함대의 조우 → 전술턴 자동 진입 or 자동 처리 선택지

### 7-3. 양 웬리 플레이어블 트리거
- FPA 플레이어가 양 웬리를 인물로 선택했을 경우: 제2함대 사령관 권한이 파에타에서 양으로 이전되는 이벤트 연출 필요

---

## 8. 승리/패배 조건 (이 시나리오 전용)

> 현재 코드에서 `_victory()`는 70% 성계 점유 일반 조건만 존재. 아스타테 시나리오 전용 조건은 추가 구현 필요.

| 진영 | 승리 조건 (안) |
|---|---|
| REH | 동맹 3개 분함대 중 2개 이상 격파 또는 아스타테 성역 점령 |
| FPA | 라인하르트 함대 격퇴 또는 로엔그람 기함 격파 |
| PZN | 양 진영 모두 소진될 때까지 중립 유지 후 교역 수입 X턴 달성 |

---

## 9. 미결 사항 (TODO)

- [ ] FPA003 (르페브르) charCode 등록 필요
- [ ] REH 함대 초기 locCode 확정 (아스타테 성계 코드 확인 필요)
- [ ] 이제르론 주둔 제국 후방 함대 데이터 추가
- [ ] 시나리오 전용 승리 조건 구현
- [ ] 1턴 시작 시 강제 전술턴 진입 로직 또는 함대 이미 교전 배치 로직 결정
- [ ] 양 웬리 플레이어블 시 제2함대 지휘권 이전 이벤트
- [ ] 미터마이어/로이엔탈 이제르론 주둔 함대 데이터 등록
