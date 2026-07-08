# 사전 화면 설계
> 분류: 화면
> 경로: `docs/206_screen_encyclopedia.md`
> 상위: [200_SCREEN.md](200_SCREEN.md)
> 최종 수정: 2026-06-17

---

## 화면 Flow

```
EncyclopediaMenuView   (카드 슬라이더 — /lobby/encyclopedia)
  ↓ enc.open('char')
CharLibPop             인물 사전 팝업 (overlay)
  └── CharDetailComp   인물 상세 공통 컴포넌트
```

---

## 컴포넌트 구조

```
components/encyclopedia/
└── EncCharactersPop.vue  사전 팝업 래퍼 (인물 목록 + 상세)

components/char/
└── CharDetailComp.vue    인물 상세 공통 컴포넌트 (LibPop·게임 내 팝업 공용)
```

---

## CharLibPop.vue — 인물 사전 팝업

### 호출 방식
```js
// encyclopediaStore.open('char')
enc.open('char')

// 특정 인물 지정 시
enc.open('char', 'CH_000064')
```

### 구조

```
lib-overlay (배경 클릭 → 닫기)
└── lib-panel
    ├── lib-header     제목 / 뒤로가기 / 닫기
    ├── [목록 뷰]      검색 + 국가 필터 + 캐릭터 리스트 + 카운터
    └── [상세 뷰]      CharDetailComp (selectedCode 설정 시)
```

### 상태

| 변수 | 타입 | 설명 |
|---|---|---|
| `selectedCode` | `ref(null)` | null이면 목록, 값이면 상세 뷰 |
| `query` | `ref('')` | 이름 검색 |
| `nationFilter` | `ref(null)` | 세력 필터 (FPA/REH/PZN/EAT) |

### 데이터 소스

```js
import { CHAR_BASE }   from '@/data/characters/legacy/charBase.js'
import { CHAR_TENDER } from '@/data/characters/legacy/charTender.js'
// CHAR_BASE  → 전체 인물 목록 (ALL)
// CHAR_TENDER → 세력(nation) 정보 (TENDER_MAP)
```

### 국가 필터

| code | label | 색상 |
|---|---|---|
| `FPA` | 동맹 | `#4488ff` |
| `REH` | 제국 | `#cc4444` |
| `PZN` | 페잔 | `#44aa66` |
| `EAT` | 지구교 | `#9955cc` |

### 검색 로직

```js
const filtered = computed(() => {
  // 1. nationFilter 적용 (TENDER_MAP[code].CHA_NATION)
  // 2. query로 이름 검색
  //    CHA_KR_NAME / CHA_KR_NICK / CHA_EN_NAME / CHA_EN_NICK
})
```

---

## CharDetailComp.vue — 인물 상세 공통 컴포넌트

> 위치: `src/components/char/CharDetailComp.vue`  
> LibPop과 게임 내 팝업(CharDetailPop) 양쪽에서 공용으로 사용

### props

```js
{
  chaCode:    String,          // 인물 코드
  scenarioId: String | null,   // null = base 데이터 사용
}
```

### 레이아웃 (아코디언)

```
프로필 (고정)
  이미지 + 이름(한글/영문) + 세력 배지 + 직책

능력치 ▼
  통솔 / 지휘 / 공격 / 방어 / 기동
  운영 / 정보 / 육전 / 공전 / 정략  (10개 바 차트)

성향 ▼
  이념 (수치 → 텍스트 변환)
  용맹 / 도덕 / 친화  (바 차트)

트레잇 ▼
  기본: 아이콘 최대 5개 + 초과 시 "+N ▼"
  펼치면: 아이콘 + 트레잇명 + 경험치바 + 기간

직업 ▼
  기본: 최신 3개 (JOB_ST_DATE 오름차순)
  펼치면: 전체 직업 리스트
```

### 능력치 필드명 → 한글 매핑

| 필드 | 한글 |
|---|---|
| `CHA_ST_CMD` | 통솔 |
| `CHA_ST_CSM` | 지휘 |
| `CHA_ST_ATT` | 공격 |
| `CHA_ST_DEF` | 방어 |
| `CHA_ST_FST` | 기동 |
| `CHA_ST_MNG` | 운영 |
| `CHA_ST_INF` | 정보 |
| `CHA_ST_GFG` | 육전 |
| `CHA_ST_AFG` | 공전 |
| `CHA_ST_MMP` | 정략 |

### 이념(CHA_IDEA) 수치 → 텍스트 변환

| 범위 | 표시 |
|---|---|
| 0~50 | 민주공화제 |
| 51~100 | 입헌군주제 |
| 101~150 | 온건군주제 |
| 151~200 | 귀족제 |
| 201~250 | 권위주의 |
| 251~300 | 전제군주제 |

---

## encyclopediaStore

```js
// 팝업 열기
enc.open(type, chaCode?, scenarioId?)
// enc.popType  → 'char' | null
// enc.chaCode  → 인물 코드 | null
// enc.scenarioId → 시나리오 ID | null

// 팝업 닫기
enc.close()
```

---

## 설계 결정 이력

| 날짜 | 결정 |
|---|---|
| 2026-05-29 | CharLibPop / CharDetailPop 래퍼로 분리, CharDetailComp 공통화 |
| 2026-05-29 | 인물 상세 전체 아코디언 구조 확정 |
| 2026-06-02 | CharLibPop 위치 `components/char/` → `components/encyclopedia/` 이동 |

---

## TODO

- [ ] legacy charBase → 신규 charactersData.js 마이그레이션 (CharLibPop, CharDetailComp)
- [ ] 시나리오 탭 구현 (CharLibPop 상단 — 연도별 시나리오 선택)
- [ ] CharDetailPop.vue 신규 생성 (게임 내 팝업 래퍼)
- [ ] Phase B: INF 수치 기반 적군 정보 공개 제한
