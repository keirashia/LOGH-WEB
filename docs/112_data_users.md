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

### 데이터 구조 (설계안)

유저별 구매·해금 이력. LOGH-API `TBL_USER_SCENARIO` / `TBL_USER_CHARACTER` 테이블 기반.  
(테이블 DDL은 `LOGH-API/docs/001_api_user.md` 4-6 참조)

```js
// 프론트 캐시 구조 (lobbyStore 또는 authStore에 추가 예정)
userUnlocks: {
  scenarios:   ['SE796_1', 'SE640_3', ...],   // 해금된 scenarioId 목록
  characters:  ['CH_000064', ...],            // 해금된 charCode 목록
}
```

### 잠금 판정 로직 위치

- `ScenarioDetailView.vue` — openPt > 0 시나리오의 [구매] 버튼 표시 여부 판정
- `ScenarioOptionsView.vue` — 동일 (진입 시 재확인)

### 구매/해금 액션 흐름 (함수 시그니처 설계)

```js
// authStore.js (또는 lobbyStore.js)
async purchaseScenario(scenarioId) {
  // 1. auth.points >= openPt 확인
  // 2. auth.points 차감
  // 3. LOGH-API에 TBL_USER_SCENARIO INSERT (UNLOCK_TYPE: 'POINT_PURCHASE')
  // 4. userUnlocks.scenarios에 scenarioId 추가
}

async purchaseCharacter(charCode) {
  // 동일 패턴
}
```

현재 `[🔒 Npt로 구매]` 버튼은 `ScenarioDetailView.vue`에 있으나 클릭 핸들러 미구현.

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
// src/utils/i18n.js (신규, 위치 후보)
export function getLocalizedName(obj, langPref) {
  // obj: { nameKr, nameEn, nameJp }
  // langPref: 'kr' | 'en' | 'jp'
  // 반환: 해당 언어 이름, 없으면 nameKr 폴백
  const map = { kr: 'nameKr', en: 'nameEn', jp: 'nameJp' }
  return obj[map[langPref]] || obj.nameKr
}
```

### 이번 단계에서 하지 않을 것

기존 화면들의 `nameKr` 하드코딩 참조를 `getLocalizedName()` 호출로 일괄 교체.  
영향 범위가 크므로 (예: `charactersData.js` 한 파일에서만 `nameKr` 참조 565곳) 별도 작업으로 분리.

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
- [ ] `authStore.js` 또는 `lobbyStore.js`에 `userUnlocks: { scenarios, characters }` 상태 추가

### 구매/해금 로직
- [ ] `purchaseScenario(scenarioId)` 액션 구현 (인증 흐름 완료 후)
- [ ] `purchaseCharacter(charCode)` 액션 구현 (인증 흐름 완료 후)
- [ ] `ScenarioDetailView.vue` [🔒 Npt로 구매] 버튼 클릭 핸들러 연결

### 언어 교체 (별도 작업, 범위 큼)
- [ ] 기존 화면들의 `nameKr` 하드코딩 → `getLocalizedName()` 일괄 교체
