# src/data/trait — 트레잇 마스터 데이터

## 개요

성계·행성에 부착되는 특성(trait) 마스터. `traitData.js` 단일 파일로 관리.

---

## 파일 목록

| 파일 | 상태 | 설명 |
|---|---|---|
| `stars/traitData.js` | ✅ 22개 | 성계/행성 트레잇 마스터 (불변) |

---

## traitData.js 스키마

| 키 | 타입 | 설명 |
|---|---|---|
| `id` | string | PK (예: `FERTILE_SOIL`) |
| `nameKr` | string | 한국어 명칭 |
| `nameEn` | string | 영문 명칭 |
| `category` | string | `environment` / `history` / `event` / `political` / `military` |
| `target` | string | `planet` / `star` / `both` |
| `icon` | string | 이모지 아이콘 |
| `rarity` | string | `common` / `uncommon` / `rare` |
| `desc` | string | 설명 |
| `permanent` | boolean | `true` = 영구, `false` = 임시 (END_TURN으로 소멸) |
| `effects` | object | 수치 보정 (아래 참조) |
| `eventChance` | object | 이벤트 발생 확률 보정 `{ 이벤트ID: 배율 }` |
| `factionBonus` | object | 파벌 지지율 보정 `{ 파벌ID: 수치 }` |

### effects 키 목록

| 키 | 설명 |
|---|---|
| `population` | 인구 보정 (절대값) |
| `industry` | 산업 보정 (절대값) |
| `defense` | 방어 보정 (절대값) |
| `morale` | 민심 보정 (절대값) |
| `tax` | 세율 보정 (절대값) |
| `incomeBonus` | 수입 배율 보정 (예: `0.1` = +10%) |
| `buildSpeed` | 건설 속도 보정 (턴, 예: `-1` = 1턴 단축) |

---

## 트레잇 목록 (22개)

### 환경 (environment) — 6개, 영구

| id | 명칭 | target | 주요 효과 |
|---|---|---|---|
| `FERTILE_SOIL` | 비옥한 토지 | planet | population+20, morale+5, income+5% |
| `MINERAL_RICH` | 풍부한 광물 | planet | industry+25, income+10% |
| `NATURAL_FORTRESS` | 천연 요새 | planet | defense+30, pop-10, industry-10 |
| `STRATEGIC_POSITION` | 전략적 요충지 | star | income+15%, defense+10 |
| `HARSH_ENVIRONMENT` | 가혹한 환경 | planet | pop-15, morale-10, industry-10 |
| `OCEANIC_WORLD` | 해양 행성 | planet | pop+10, income+8%, defense-5 |

### 역사 (history) — 5개, 영구

| id | 명칭 | target | 주요 효과 |
|---|---|---|---|
| `ANCIENT_CAPITAL` | 유서 깊은 수도 | star | morale+15, income+10% |
| `MILITARY_TRADITION` | 군사적 전통 | both | defense+20, morale+5 |
| `TRADE_HUB` | 무역 중심지 | star | industry+15, income+20% |
| `IMPERIAL_HERITAGE` | 제국의 유산 | both | morale+20 |
| `FRONTIER_SPIRIT` | 개척자 정신 | both | defense+10, morale+5, industry+5 |

### 이벤트 (event) — 5개, 임시

| id | 명칭 | target | 주요 효과 |
|---|---|---|---|
| `WAR_SCAR` | 전쟁의 상흔 | both | pop-20, industry-20, morale-25 |
| `OCCUPATION` | 점령지 | both | morale-30, industry-15, tax-10 |
| `PROSPERITY` | 번영의 시대 | both | pop+15, morale+20, income+15% |
| `PLAGUE` | 역병 | planet | pop-30, morale-20, industry-10 |
| `BLOCKADE` | 봉쇄 | star | industry-20, morale-15, income-30% |

### 정치 (political) — 3개, 임시

| id | 명칭 | target | 주요 효과 |
|---|---|---|---|
| `MILITARIST_SURGE` | 군국주의 열풍 | both | defense+10, tax+5, morale-5 |
| `REFORM_MOVEMENT` | 개혁 운동 | both | morale-5, income-5% |
| `NOBLE_DOMINANCE` | 귀족 지배 | star | defense+10, tax-5, income-10% |

### 군사 (military) — 3개, 임시

| id | 명칭 | target | 주요 효과 |
|---|---|---|---|
| `FORTIFIED` | 요새화 | both | defense+25, industry-5, income-5% |
| `DEVASTATED` | 초토화 | both | pop-40, industry-40, morale-35 |
| `GARRISON_CITY` | 주둔 도시 | planet | defense+20, morale+5, industry-10 |

---

## export 목록

```js
import { STAR_TRAITS, TRAIT_MAP, TRAIT_BY_CATEGORY, TRAIT_BY_TARGET } from '@/data/trait/stars/traitData'

STAR_TRAITS          // 전체 배열
TRAIT_MAP            // { [id]: trait } 객체 — 단건 조회
TRAIT_BY_CATEGORY    // { environment: [...], history: [...], ... }
TRAIT_BY_TARGET      // { planet: [...], star: [...] }
```

---

## TODO

- [ ] traitData.js — gameStore `endTurn()` 내 트레잇 효과 적용 로직 연결
- [ ] 행성/성계 트레잇 부착 UI (InfoPanel 또는 별도 모달)
- [ ] TBL_PLANET_TRAIT / TBL_STAR_TRAIT DB 연동 (schema.sql 추가 완료, API 미구현)
