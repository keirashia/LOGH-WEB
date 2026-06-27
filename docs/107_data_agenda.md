# 의안 시스템 설계
> 분류: 데이터
> 경로: `docs/107_data_agenda.md`
> 상위: [100_DATA.md](100_DATA.md)
> 최종 수정: 2026-06-27

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

## 의안 데이터 구조

```js
{
  id:             'AGD_0001',          // 자동 채번
  category:       'military',          // military|domestic|personnel|intel|research|finance
  action:         'fleet_deploy',      // AGENDA_ACTIONS 키
  title:          '제13함대 출격',      // UI 표시용
  payload:        { fleetId, targetStar, ... },
  registeredTurn: 5,
  registeredBy:   'CHR_001',          // 제안자 charId (친밀도 계산 기준)
  status:         'pending',           // pending|approved|rejected|expired
}
```

---

## 카테고리별 결재 체인

`APPROVAL_CHAINS` in `agendaData.js`. 체인 앞쪽 직위가 공석이면 뒤쪽으로 대행.

### 은하제국 (REH)

| 카테고리 | 결재 체인 (앞→뒤) | 비고 |
|---|---|---|
| `military` (작전) | 통수본부총장 JB_R007 → 재상 JB_R002 → 황제 JB_R001 | |
| `military_fleet` (함대) | 우주함대사령장관 JB_R006 → 재상 JB_R002 → 황제 JB_R001 | |
| `domestic` (내정) | 군무상서 JB_R008 → 재상 JB_R002 → 황제 JB_R001 | |
| `personnel` (인사) | 군무상서 JB_R008 → 재상 JB_R002 → 황제 JB_R001 | |
| `finance` (재정) | 재무상서 JB_R009 → 재상 JB_R002 → 황제 JB_R001 | |
| `research` (연구) | 재상 JB_R002 → 황제 JB_R001 | |
| `intel` (모략) | 첩보관 JB_R011 | 독립 행사, 결재 없음 |
| `diplomacy` (외교) | 재상 JB_R002 → 황제 JB_R001 | |

> JB_R004(구 군무상서 중복)는 삭제됨. JB_R008이 현 군무상서.  
> JB_R011(첩보관): 임명권자 군무상서. 결재 체인 없이 독립 행사.

### 자유행성동맹 (FPA)

| 카테고리 | 결재 체인 (앞→뒤) | 비고 |
|---|---|---|
| `military` (작전) | 통합작전본부장 JB_F016 → 부의장 JB_F013 → 의장 JB_F001 | |
| `military_fleet` (함대) | 우주함대사령장관 JB_F017 → 부의장 JB_F013 → 의장 JB_F001 | |
| `domestic` (내정) | 국방위원장 JB_F002 → 부의장 JB_F013 → 의장 JB_F001 | |
| `personnel` (인사) | 국방위원장 JB_F002 → 부의장 JB_F013 → 의장 JB_F001 | |
| `finance` (재정) | 재정위원장 JB_F015 → 부의장 JB_F013 → 의장 JB_F001 | |
| `research` (연구) | 부의장 JB_F013 → 의장 JB_F001 | |
| `intel` (모략) | 첩보관 JB_F018 | 독립 행사, 임명권자 국방위원장 |
| `diplomacy` (외교) | 부의장 JB_F013 → 의장 JB_F001 | |

> JB_F003(각료)/JB_F010(외교위원장)/JB_F011(교육위원장) 삭제됨.  
> JB_F013(부의장): 의안 투표 시 2표 효율.  
> TODO: 평의원 11명 AI 투표 로직 구현 예정.

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

예시 — politics = 40:
```
[활성] 제13함대 출격          (친밀도 90)
[활성] 예산 배분 변경         (친밀도 75)
[활성] 미터마이어 임명         (친밀도 60)
[활성] 행성개발 승인           (친밀도 45)
[비활] 첩보 작전               (친밀도 30)
...
```

---

## 관련 파일

| 파일 | 역할 |
|------|------|
| `src/data/base/agenda/agendaData.js` | 의안 타입, 결재 체인, 액션 목록 마스터 |
| `src/data/base/agenda/menuTree.js` | 카테고리별 메뉴 트리 (drill-down 구조) |
| `src/stores/gameStore.js` | agendas 상태, registerAgenda(), _processAgendas(), _executeAgenda() |
| `src/components/game/panels/MenuPanel.vue` | 의안 조회 + 카테고리 메뉴 drill-down 패널 UI |
| `src/components/ui/BottomBar.vue` | 카테고리 버튼 진입점 (2×4 그리드) |
| `src/assets/global.css` | --bar-h CSS 변수 (BottomBar 높이 동기화) |

---

## TODO

- [ ] 친밀도(intimacy) 수치 시스템 설계 — characters 간 관계 수치
- [ ] REH 군사: 3장관 협의 로직 (2/3 동의 판정)
- [ ] FPA 평의원 11명 AI 투표 로직
- [ ] 의안 처리 용량 밸런스 조정 (현재 1건 고정)
- [ ] `_executeAgenda` 전체 액션 구현 (현재 stub)
- [ ] 의안 만료/거부 이벤트 로그 연동
