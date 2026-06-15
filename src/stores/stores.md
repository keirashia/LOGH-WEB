# src/stores — Pinia 스토어

## 개요

| 파일 | 역할 | 상태 |
|---|---|---|
| `gameStore.js` | 메인 게임 엔진 | ✅ 완성 |
| `tacticalStore.js` | 전술 전투 엔진 | ✅ 완성 |
| `authStore.js` | 로그인/계정/기기이전 | Phase3 연동 예정 |
| `encyclopediaStore.js` | 사전 캐시 | 껍데기 |
| `seasonStore.js` | 시즌/역사 관리 | 껍데기 |
| `wsStore.js` | WebSocket 멀티 동기화 | Phase3 껍데기 |

---

## gameStore.js

### 상태

```js
{
  initialized, playerFaction, year, impYear, month, turn,
  systems,      // { [code]: { id, code, name, type, x, y, faction, morale, tax, traits, underConstruction } }
  resources,    // { REH: {gold}, FPA: {gold}, PZN: {gold} }
  characters,   // { [id]: { ...CHARACTERS, currentPost } }
  fleets,       // { REH: [...], FPA: [...], PZN: [] }
  log,          // 이벤트 로그 배열
  selectedSystem, selectedFleet, activeModal,
  gameOver, winner,
  _pendingBattle,    // 전술전투 브릿지 (GameView watch → /game/tactical 라우팅)
  _levyCooldown, _loanBalance, _loanDueTurn, _reserve, _intelligenceFund,
  _fleetSeq, _agendaSeq,
  _truce, _tradeBonus,
  agendas,      // 의안 목록 — agenda.md 참조
}
```

#### 의안(agendas) 항목 구조

```js
{
  id:             'AGD_0001',
  category:       'military',   // military|domestic|personnel|intel|research
  action:         'fleet_deploy',
  title:          '제13함대 출격',
  payload:        { ... },
  registeredBy:   'CHR_001',    // 친밀도 계산 기준 (null 허용)
  registeredTurn: 5,
  status:         'pending',    // pending|approved|expired
}
```

### 초기화 (buildState)

`startGame(scId, pf)` 호출 시 실행.

```js
import { STAR_SYSTEMS } from '@/data/stars/starSystemData'
import { STAR_DETAIL }  from '@/data/scenarios/S01/starDetail'

// STAR_SYSTEMS(불변) + STAR_DETAIL(초기값) 병합
systems[s.code] = { ...s, ...d, underConstruction: null }
```

### 액션 목록

**기본**
- `startGame(scId, pf)` — 게임 초기화
- `endTurn()` — 턴 종료 (수입/건설/이벤트/AI/날짜)
- `selectSystem(id)` / `selectFleet(id)`
- `openModal(name, payload)` / `closeModal()`
- `addLog(msg)`

**국정**
- `changeTax(sysId, rate)`
- `buildConstruction(sysId, type)` — ARSENAL / DEF_BASE / GARRISON
- `assignChar(charId, post)`

**재정**
- `emergencyLevy()` — 임시 징수 (월수입 30%, 민심 -10, 3턴 쿨다운)
- `takeLoan(amount)` — 페잔 차관 (500~5000, 이자 5%, 6턴 상환)
- `repayLoan()`
- `allocateBudget(allocations)`

**군사**
- `deployFleet(fleetId, targetId, opType)` — 방어함대 있으면 `_pendingBattle` 세팅 → 'tactical' 반환
- `applyBattleResult(result)` — TacticalView에서 전투 결과 수신
- `formFleet(name, cmdId, sizeKey, locationId)`
- `reorganizeFleet(fleetId, newShips)`
- `disbandFleet(fleetId)`
- `moveFleet(fleetId, targetSysId)`
- `retreatFleet(fleetId)`
- `transportResources(from, to, itemType, amount)`

**정보·외교**
- `launchIntelOp(targetSysId, opType, officerId)`
- `restoreSecurity(sysId, level, officerId)`
- `launchProposal(targetFaction, propType)`

**스토리 이벤트**
- `triggerCoup(charId, targetFaction)` — 쿠데타
- `triggerDefection(charId, targetFaction)` — 망명
- `triggerResignation(charId)` — 사임
- `triggerDeath(charId)` — 사망

**의안 시스템** (상세: `src/data/base/agenda/agenda.md`)
- `registerAgenda(action, payload, registeredBy)` — 의안 등록 → id 반환
- `cancelAgenda(agendaId)` — 의안 취소
- `_processAgendas()` — 턴 종료 시 자동 호출, 카테고리별 결재권자 판정 → 1건 처리
- `_executeAgenda(agenda)` — 의안 실행 (action → 기존 액션 위임)

---

## tacticalStore.js

전술전투 엔진. `gameStore._pendingBattle` 세팅 → GameView watch → `/game/tactical` 라우팅.

전투 종료 후 `gameStore.applyBattleResult(result)` 호출.

### 진형 6종

`DOUBLE_COL` / `LINE` / `RING` / `WEDGE` / `CRANE_WING` / `CONE`

---

## TODO

- [ ] 민란 시스템: `endTurn()` 내에 `morale < 20` 체크 → 반란 발생
- [ ] AI 개선: 전략적 함대 건조 (축적 골드 활용), 세력별 성격 (REH=공세, FPA=수비, PZN=외교)
- [ ] LOGH-API 연동: `authStore.js` 실제 login/register API 연결
