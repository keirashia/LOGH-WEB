# 데이터 총괄 (DATA)
> 분류: 총괄
> 경로: `docs/100_DATA.md`
> 상위: [000_INDEX.md](000_INDEX.md)
> 최종 수정: 2026-06-17

게임의 모든 마스터/정적 데이터 및 로직 계층 문서 인덱스.

---

## 마스터 데이터

| 번호 | 문서 | 담당 | 상태 |
|---|---|---|---|
| 101 | [101_data_core.md](101_data_core.md) | 데이터 폴더 구조, masterData.js, 코드 체계 | ✅ |
| 102 | [102_data_stars.md](102_data_stars.md) | 성계/항로/행성 마스터, 좌표 범위 | ✅ |
| 103 | [103_data_scenarios.md](103_data_scenarios.md) | 시나리오별 초기값 | ✅ |
| 104 | [104_data_factions.md](104_data_factions.md) | 세력/정치/이념 데이터 | ✅ |
| 105 | [105_data_characters.md](105_data_characters.md) | 인물 마스터 (필드/스탯/특성) | ✅ |
| 106 | [106_data_fleet.md](106_data_fleet.md) | 함대 설계 — fltCode 체계, 지휘 계층(C/O/S) | ✅ |

## 시스템 로직

| 번호 | 문서 | 담당 | 상태 |
|---|---|---|---|
| 107 | [107_data_agenda.md](107_data_agenda.md) | 의안 시스템 (흐름/결재 체인/활성화 규칙) | ✅ |
| 108 | [108_data_turns.md](108_data_turns.md) | 턴 시스템 (1턴=1일, 서브턴, 날짜) | ✅ |
| 109 | [109_data_stores.md](109_data_stores.md) | Pinia 스토어 개요, gameStore 상태/액션 | ✅ |
| 110 | [110_data_init.md](110_data_init.md) | 게임 초기화 데이터 로드 흐름 | ✅ |
| 111 | [111_data_auth.md](111_data_auth.md) | 인증 흐름 설계 (tempCode, findByTempCode, AppHeader 폴링) | 🔄 설계 완료, 구현 대기 |
| 112 | [112_data_users.md](112_data_users.md) | 유저 데이터 모델 (포인트/잠금 해제/언어/업적) | 🔄 설계 완료, 구현 대기 |

## TODO
- 각 상세 문서 내 TODO 항목 참조
