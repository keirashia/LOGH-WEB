# src/data/factions — 세력 데이터

## 개요

3대 세력(제국/동맹/페잔)의 기본 정보, 정치 구조, 이념 데이터.

---

## 파일 목록

| 파일 | 설명 |
|---|---|
| `factions.js` | 3세력 기본 정보 (id/name/색상/설명) |
| `politics.js` | 각 세력 정치 파벌 및 정치 구조 |
| `ideologies.js` | 세력별 이념 체계 |

---

## 세력 코드

| 코드 | 세력 | 한글 | CSS 변수 |
|---|---|---|---|
| `REH` | Galactic Empire | 은하제국 | `--REH` |
| `FPA` | Free Planets Alliance | 자유행성동맹 | `--FPA` |
| `PZN` | Phezzan Dominion | 페잔 자치령 | `--PZN` |

게임 전체에서 세력 식별은 이 3개 코드로만 함.

---

## TODO

- [ ] factions.js — FACTIONS 상수 정의 확인 (masterData.js에서 이미 export 중인지 체크)
- [ ] politics.js — 정치 파벌 게임 로직 연결 (현재 데이터만 존재, 게임 효과 없음)
