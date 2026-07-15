# 유저 데이터 모델 설계
> 분류: 데이터
> 경로: `docs/112_data_users.md`
> 상위: [100_DATA.md](100_DATA.md)
> 최종 수정: 2026-06-18

---

## 전제 조건

> ⚠️ 현재 게스트 식별이 `id:0` 단일값으로 고정되어 있음.  
> 실제 유저별 데이터 분기는 인증 체계(`docs/111_data_auth.md`) 정리 이후 가능.  
> 이번 단계는 **데이터 구조 정의 + 함수 시그니처/위치 설계**까지만.  
> 실제 userId 연동·API 호출·DB 저장은 인증 흐름 완료 후 별도 작업으로 진행.

---

## 현재 auth.user 구조

```js
auth.user = {
  id: 0,
  username: '게스트',
  email: '',
  isAdmin: false,
  points: 0,       // LOGH-API TBL_USER_MAIN.POINT 대응
}
```

---

## 3-1. 포인트 (기존 필드 — 용도 명확화)

`auth.points` 로 이미 존재. 변경 없음.

**용도**
- 로비에서 시나리오 잠금 해제 (`openPt > 0` 인 시나리오 구매)
- 시나리오 내 특정 캐릭터 잠금 해제

차감 시점·위치는 3-2 참조.

---

## 3-2. 해제된 시나리오/캐릭터 잠금 상태

### 잠금 판정 우선순위 (3단계)

```
1. useYn: false    → 전역 비공개 (미출시). 언제나 잠금.
2. openPt: 0       → 무료 공개. 유저 구분 없이 해금.
3. openPt > 0      → 포인트 구매 필요. 유저별 구매 이력 확인.
```

### 데이터 구조

```js
// lobbyStore.userUnlocks (구현 완료 — 2026-06-18)
userUnlocks: {
  scenarios:   ['SE796_0211_011', ...],   // 해금된 scenarioId 목록
  characters:  ['CH_000064', ...],        // 해금된 charCode 목록
}
```

localStorage 키: `logh_unlocks` — 오프라인 영속. API 연동 시 서버 DB와 동기화 예정.

### 잠금 판정 로직 위치

- `ScenarioDetailView.vue` — openPt > 0 시나리오의 [구매] 버튼 표시 여부 판정
- `ScenarioOptionsView.vue` — 동일 (진입 시 재확인)

### 구매/해금 액션 (lobbyStore — 구현 완료)

```js
purchaseScenario(scId)          // auth.points 차감 + userUnlocks 추가 + localStorage 저장
unlockScenarioByAchievement(scId) // 업적 해금 (openPt: "-" 시나리오)
```

> `[🔒 Npt로 구매]` 버튼 클릭 핸들러 연결은 미완료 — `ScenarioDetailView.vue` TODO 참조.

---

## 3-3. 유저 언어 우선순위

### 이번 단계에서 할 것

`auth.user`에 언어 우선순위 필드 추가 (저장 구조만):

```js
auth.user = {
  ...
  langPref: 'kr',   // 'kr' | 'en' | 'jp'
}
```

공통 유틸 함수 시그니처 설계:

```js
// name 배열 접근 패턴 (전 프로젝트 통일, 2026-07-15 확정)
// obj.name: [{ code: "Kr"|"En"|"Jp", context: string }]
obj.name?.find(e => e.code === lang)?.context
  ?? obj.name?.find(e => e.code === 'Kr')?.context
  ?? fallback
```

> `getLocalizedName()` 유틸 함수 설계는 폐기. 전 데이터가 `name: [{ code, context }]` 배열로 통일되어  
> 직접 `.find()` 접근으로 충분하며, 별도 i18n.js 파일 불필요.

---

## 3-4. 업적 (Achievement)

유저 데이터에 업적 영역 필요. 현재는 "유저 데이터 모델에 업적 영역이 존재해야 한다"는 사실만 기록.

```js
auth.user = {
  ...
  achievements: [],   // 달성한 업적 ID 목록
}
```

추적 대상·데이터 구조·조건 유형은 추후 구체화 예정.  
LOGH-API `TBL_ACHIEVEMENT_MASTER` / `TBL_USER_ACHIEVEMENT` 참조 (`LOGH-API/docs/001_api_user.md` 4-6).

---

## TODO

### 구조 설계
- [ ] `auth.user`에 `langPref` 필드 추가 (초기값: `'kr'`)
- [ ] `auth.user`에 `achievements: []` 필드 추가
- [ ] `src/utils/i18n.js` 신규 작성 — `getLocalizedName(obj, langPref)` 함수 구현
- [x] `lobbyStore.js`에 `userUnlocks: { scenarios, characters }` 상태 추가 — 2026-06-18

### 구매/해금 로직
- [x] `purchaseScenario(scId)` 액션 구현 (lobbyStore) — 2026-06-18
- [x] `unlockScenarioByAchievement(scId)` 액션 구현 (lobbyStore) — 2026-06-18
- [ ] `purchaseCharacter(charCode)` 액션 구현 (인증 흐름 완료 후)
- [ ] `ScenarioDetailView.vue` [🔒 Npt로 구매] 버튼 클릭 핸들러 연결

### 언어 교체
- [x] 전 JS 데이터·유틸·스토어 파일 구형 언어별 필드 → `name:[{code,context}]` 배열 변환 (2026-07-15)
- [x] Vue 파일 구형 언어별 필드 하드코딩 → `name.find(e=>e.code===lang)?.context` 일괄 교체 (2026-07-15)
