# 의안 시스템 설계
> 분류: 데이터
> 경로: `docs/107_data_agenda.md`
> 상위: [100_DATA.md](100_DATA.md)
> 최종 수정: 2026-07-27

## 개요

플레이어가 명령을 즉시 실행하는 방식이 아닌,  
**의안을 등록 → 결재권자가 턴 종료 시 처리**하는 의사결정 워크플로우.

결재권자는 **직위(job)에 임명된 인물**이며, 직위 공석 시 체인 상위 직위가 대행.  
결재권자의 **정치력(politics)** 기준으로 이번 턴 활성 의안 수가 결정됨.

---

## 의안 흐름

```
플레이어 명령 입력
  → 의안 등록 (registerAgenda)
  → 대기 목록에 추가 (status: 'pending')

턴 종료 (_processAgendas)
  → 카테고리별 결재권자 탐색 (공석 시 체인 상위로)
  → 전체 의안 친밀도 기준 정렬
  → 상위 AGENDA_DISPLAY_LIMIT(10)건 표시
  → 그 중 floor(politics / 10)건 활성화
  → 활성 의안 중 1건 선택 → 실행 (status: 'approved')
  → 나머지 → 다음 턴 이월
  → AGENDA_EXPIRE_TURNS(10) 초과 의안 → 만료 (status: 'expired')
```

---

## 의안 envelope (공통 필드)

```js
{
  id:             'AGD_0001',         // 자동 채번
  category:       'military',         // military|domestic|personnel|intel|research|finance|diplomacy
  action:         'op_propose',       // AGENDA_ACTIONS 키
  title:          '아스타테 공격작전', // UI 표시용
  payload:        { ... },            // action별 타입 고정 (아래 참조)
  registeredTurn: 5,
  registeredBy:   'CHR_001',         // 제안자 charId (친밀도 계산 기준)
  status:         'pending',          // pending|approved|rejected|expired
}
```

---

## action별 payload 스키마

### 군사 — 작전 (`op_propose`, `fleet_deploy`)

```js
{
  opType:     'attack' | 'defense' | 'occupy',
  targetStar: String,   // 성계 ID
  targetName: String,   // 표시용 이름
  fleetIds:   String[], // 참전 함대 코드 목록
  period:     Number,   // 작전 기한 (턴)
  notes:      String,
  intel: {
    hasIntel:  Boolean, // 아군이 적 전력 정보를 보유 중인가
    expiresAt: Number,  // 유효 턴 (null = 영구)
    exposed:   Boolean, // 적이 이 작전을 탐지했는가 (방첩 실패 시 true)
  },
}
```

`intel.hasIntel` → 전투 컨텍스트 `_pendingBattles[n].hasIntel` 로 전달.  
`intel.exposed` → 향후 적 AI 선제 반응 트리거에 활용 예정.

### 인사 (`appoint`, `dismiss`)

```js
// appoint
{ charId: String, jobId: String, fromJobId: String }

// dismiss
{ charId: String, reason: String }
```

### 내정 — 건설 (`planet_develop`, `ship_build`)

```js
// planet_develop
{
  systemId: String, planetCode: String,
  buildId: String, cost: Number, turnsRequired: Number,
}

// ship_build
{
  systemId: String, shipType: String,
  amount: Number, cost: Number, turnsRequired: Number,
}
```

### 재정 (`budget_alloc`)

```js
{ allocations: { MILITARY, CONSTRUCTION, INTELLIGENCE, WELFARE, RESERVE } }
```

### 첩보 (`intel_spy`, `intel_counter`, `intel_special`)

```js
{ targetStar: String, opType: String, officerId: String }
```

### 외교

```js
// 대부분: { targetFaction: String }
// peace_treaty / trade_negotiate: { targetFaction: String, terms: Object }
// envoy_send: { targetFaction: String, charId: String }
// loan_request: { amount: Number, targetFaction: String }
```

---

## 첩보 연동 (`intel`)

### 흐름

```
launchIntelOp(SPY 성공)
  → _intelMap[systemId] = turn + 3   (3턴간 유효)

_pendingBattles.push()  ← 전투 발생 4개 경로 모두
  → hasIntel: _hasIntel(systemId)
     _hasIntel: _intelMap[sysId] != null && _intelMap[sysId] > currentTurn

OperationBriefingModal
  → enemyVisible = ctx.hasIntel
  → true: 적 함대 수/편제 공개 / false: ??? 표시
```

### `_intelMap` 상태

| 필드 | 타입 | 설명 |
|---|---|---|
| `_intelMap` | `{ [systemId]: number }` | 첩보 만료 턴 맵 |

만료 정리는 `_hasIntel` 호출 시 즉시 판정 (별도 cleanup 불필요).

### 시나리오 초기 첩보

`opProposeData.js`의 각 항목에 `intel` 필드로 초기값 설정 가능:

```js
intel: { hasIntel: true, expiresAt: null, exposed: false }
// expiresAt: null → 만료 없이 영구 유지
```

---

## 카테고리별 결재 체인

`APPROVAL_CHAINS` in `agendaData.js`. 체인 앞쪽 직위가 공석이면 뒤쪽으로 대행.

### 은하제국 (REH)

| 카테고리 | 결재 체인 (앞→뒤) | 비고 |
|---|---|---|
| `military` (작전) | 통수본부총장 JB_R007 → 국무상서 JB_R003 → 황제 JB_R001 | |
| `military_fleet` (함대) | 우주함대사령장관 JB_R006 → 국무상서 JB_R003 → 황제 JB_R001 | |
| `domestic` (내정) | 군무상서 JB_R008 → 국무상서 JB_R003 → 황제 JB_R001 | |
| `personnel` (인사) | 군무상서 JB_R008 → 국무상서 JB_R003 → 황제 JB_R001 | |
| `finance` (재정) | 재무상서 JB_R009 → 국무상서 JB_R003 → 황제 JB_R001 | |
| `research` (연구) | 국무상서 JB_R003 → 황제 JB_R001 | |
| `intel` (모략) | 첩보관 JB_R011 | 독립 행사, 결재 없음 |
| `diplomacy` (외교) | 국무상서 JB_R003 → 황제 JB_R001 | |

### 자유행성동맹 (FPA)

| 카테고리 | 결재 체인 (앞→뒤) | 비고 |
|---|---|---|
| `military` (작전) | 통합작전본부장 JB_F013 → 부의장 JB_F002 → 의장 JB_F001 | |
| `military_fleet` (함대) | 우주함대사령장관 JB_F014 → 부의장 JB_F002 → 의장 JB_F001 | |
| `domestic` (내정) | 국방위원장 JB_F004 → 부의장 JB_F002 → 의장 JB_F001 | |
| `personnel` (인사) | 국방위원장 JB_F004 → 부의장 JB_F002 → 의장 JB_F001 | |
| `finance` (재정) | 재정위원장 JB_F011 → 부의장 JB_F002 → 의장 JB_F001 | |
| `research` (연구) | 부의장 JB_F002 → 의장 JB_F001 | |
| `intel` (모략) | 국방위원장 JB_F004 → 부의장 JB_F002 → 의장 JB_F001 | |
| `diplomacy` (외교) | 부의장 JB_F002 → 의장 JB_F001 | |

### 페잔 자치령 (PZN)

- 전 카테고리: 자치령총독 JB_P001 단독 즉시 결정

---

## 활성화 규칙

```
등록 의안 전체
  → 친밀도(intimacy) 내림차순 정렬   ← TODO: 친밀도 시스템 구현 전까지 등록 순서
  → 상위 10건 노출 (AGENDA_DISPLAY_LIMIT)
  → 그 중 floor(결재권자.politics / 10)건 활성화
  → 나머지 비활성 (목록에 표시되나 처리 불가)
  → 활성 의안 중 1건 턴 종료 시 처리 (추후 밸런스 조정 가능)
```

---

## 관련 파일

| 파일 | 역할 |
|------|------|
| `src/data/base/agenda/agendaData.js` | 의안 타입, 결재 체인, payload 스키마, 액션 목록 마스터 |
| `src/data/base/agenda/menuTree.js` | 카테고리별 메뉴 트리 (drill-down 구조) |
| `src/stores/gameStore.js` | agendas 상태, `_intelMap`, registerAgenda(), _processAgendas(), _executeAgenda(), _hasIntel() |
| `src/components/game/panels/MenuPanel.vue` | 의안 조회 + 카테고리 메뉴 drill-down 패널 UI |
| `src/components/ui/BottomBar.vue` | 카테고리 버튼 진입점 (2×4 그리드) |
| `src/components/game/tactical/OperationBriefingModal.vue` | `ctx.hasIntel` 기반 적 전력 공개/비공개 |
| `src/data/scenario/SE796/0211/010/opProposeData.js` | 시나리오 초기 작전 데이터 (intel 필드 포함) |

---

## TODO

- [ ] 친밀도(intimacy) 수치 시스템 설계 — characters 간 관계 수치
- [ ] REH 군사: 3장관 협의 로직 (2/3 동의 판정)
- [ ] FPA 평의원 11명 AI 투표 로직
- [ ] 의안 처리 용량 밸런스 조정 (현재 1건 고정)
- [ ] `_executeAgenda` 전체 액션 구현 (현재 stub)
- [ ] 의안 만료/거부 이벤트 로그 연동
- [ ] `intel.exposed = true` 시 적 AI 선제 반응 트리거 구현
- [ ] `_intelMap` 만료 정리 (현재는 읽기 시 판정, 주기적 cleanup 미구현)
- [ ] `planet_develop` / `ship_build` agenda 경로 통합 (현재 `buildBuilding` 직접 실행)
