# src/data/characters — 인물 화면 설계
> 작성: 2026-05-29
> 데이터 설계: charactersData.md 참조

---

## 컴포넌트 구조

```
CharLibPop.vue        사전 팝업 래퍼 (시나리오 탭 포함)
  └── CharDetailComp  공통 내부 컴포넌트

CharDetailPop.vue     게임 내 팝업 래퍼 (시나리오 고정)
  └── CharDetailComp  공통 내부 컴포넌트
```

---

## CharLibPop.vue — 사전 팝업 래퍼

### 호출 방식
```js
// 시나리오 상세 desc[]의 libs 탭
libs: ["CH_000064:라인하르트"]
// encyclopediaStore.open('char', 'CH_000064')
```

### 시나리오 탭
```
인물이 등장하는 시나리오 목록을 탭으로 표시
탭 선택 → 해당 시나리오 기준 데이터 주입

예외: 특정 시나리오 지정 호출 시 탭 없이 고정
  encyclopediaStore.open('char', 'CH_000064', '796_01')
  → 796_01 고정, 탭 없음
```

### props
```js
{
  chaCode:    String,          // CHA_CODE
  scenarioId: String | null,   // null = 탭 표시, 'xxx_xx' = 고정
}
```

---

## CharDetailPop.vue — 게임 내 팝업 래퍼

### 호출 방식
```js
// 게임 중 인물 클릭
game.openModal('charDetail', { chaCode: 'CH_000064' })
```

### 특징
```
현재 세션 시나리오 고정
시나리오 탭 없음
```

### props
```js
{
  chaCode: String,   // CHA_CODE
}
```

---

## CharDetailComp.vue — 공통 내부 컴포넌트

### 구조 (전체 아코디언)

```
프로필 (고정 — 아코디언 아님)
  이미지 + 이름(한글/영문) + 세력 배지 + 직책

능력치 ▼ (아코디언)
  통솔/카리스마/공격/방어/기동
  운영/정보/육전/공전/정치
  10개 바 차트

성향 ▼ (아코디언)
  이념 (수치 대신 이념명 표시)
  용맹/도덕/친화 바 차트

트레잇 ▼ (아코디언)
  기본: 아이콘 최대 5개 + 초과시 "+N ▼"
  펼치면: 아이콘 + 트레잇명 + 경험치바 + 기간
          li 탭 → encyclopediaStore.open('trait', TRAIT_ID)

직업 ▼ (아코디언)
  기본: JOB_ST_DATE 오름차순 최대 3개 li
        직업 아이콘 + 직업명 + 취득 턴
  펼치면: 전체 직업 리스트
```

### 능력치 한글 표기
```
CHA_ST_CMD → 통솔
CHA_ST_CSM → 카리스마
CHA_ST_ATT → 공격
CHA_ST_DEF → 방어
CHA_ST_FST → 기동
CHA_ST_MNG → 운영
CHA_ST_INF → 정보
CHA_ST_GFG → 육전
CHA_ST_AFG → 공전
CHA_ST_MMP → 정치
```

### 이념(CHA_IDEA) 표시 기준
```
0~50    민주공화제
51~100  입헌군주제
101~150 온건군주제
151~200 귀족제
201~250 권위주의
251~300 전제군주제
```

### props
```js
{
  chaCode:    String,
  scenarioId: String,   // 데이터 로딩 기준 시나리오
}
```

### 데이터 로딩 우선순위
```
시나리오별 scenerio/{scenarioId}/charDetail.js
  → 있으면 해당 값 사용
  → 없으면 charDetail.js 기본값 사용
```

---

## 정보 공개 범위

### Phase A (현재 구현)
```
모든 인물 전체 정보 공개
```

### Phase B (TODO)
```
INF 수치 기반 적군 정보 제한
  INF 0~30:   이름 + 이미지만
  INF 31~60:  프로필 + 통솔/카리스마만
  INF 61~90:  능력치 전체
  INF 91~100: 전체 공개
```

---

## 설계 결정 이력

| 날짜 | 결정 |
|---|---|
| 2026-05-29 | CharModal 제거 → CharDetailComp로 통합 |
| 2026-05-29 | CharLibPop / CharDetailPop 래퍼로 분리 |
| 2026-05-29 | CharDetailComp 전체 아코디언 구조 |
| 2026-05-29 | 직업 표시: JOB_ST_DATE 오름차순 최대 3개 |
| 2026-05-29 | 트레잇: 아이콘 5개 + 슬라이드 리스트 |
| 2026-05-29 | 트레잇 li 탭 → 사전 팝업 연동 |
| 2026-05-29 | 이념 수치 → 텍스트 변환 |
| 2026-05-29 | Phase B(INF 기반 공개 제한) 추후 구현 |

---

## TODO

- [ ] `CharDetailComp.vue` 신규 생성
- [ ] `CharLibPop.vue` 신규 생성
- [ ] `CharDetailPop.vue` 신규 생성
- [ ] `CharModal.vue` 제거 (CharDetailPop으로 대체)
- [ ] `encyclopediaStore.js` open() 액션 추가
- [ ] `GameView.vue` MODAL_MAP charDetail 업데이트
- [ ] Phase B: INF 기반 정보 공개 범위 구현
