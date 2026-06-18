# 인증(Auth) 흐름 설계
> 분류: 데이터
> 경로: `docs/111_data_auth.md`
> 상위: [100_DATA.md](100_DATA.md)
> 최종 수정: 2026-06-18

---

## 관련 파일

| 파일 | 역할 |
|---|---|
| `src/stores/authStore.js` | 인증 상태 관리 (Pinia) |
| `src/views/TitleView.vue` | 진입점 — tempCode 조회/생성 + [시작] 버튼 |
| `src/components/AppHeader.vue` | 30초 주기 API 상태 폴링 (`checkApi`) |
| LOGH-API `/user/isRegisted` | tempCode 기반 계정 조회/자동생성 엔드포인트 |

---

## 설계 의도 — Title 진입 시 자동 로그인 흐름

```
1. localStorage에서 auth 키(tempCode) 조회
2. 없으면 신규 생성 / 있으면 해당 키로 서버에 계정 검색
   2-1. API 서버 다운 시 → 게스트로 진입 허용 (tempCode는 로컬에 그대로 유지)
3. [시작] 버튼 클릭 시, 위에서 검색된 계정으로 로그인 처리
```

서버 다운/정상 전환 감지는 `AppHeader.vue`의 30초 폴링(`checkApi`)이 수행.
다운→정상 전환 시점에 보류 중이던 tempCode 기반 로그인 검색을 자동 재시도한다.

---

## 현재 코드 상태 (구현 간극)

```js
// TitleView.vue — 현재 구현
function guestStart() {
  auth.user = { id: 0, username: '게스트', email: '', isAdmin: false }
  auth.isLoggedIn = true
  router.push('/lobby')
}
```

- `tempCode` 조회/생성(`initTempCode()`)이 `TitleView`에서 호출되지 않음
- `authStore.js`에 tempCode로 서버 조회하는 액션 없음
  (현재는 `register()`에서 `uuid: this.tempCode`를 신규 가입 시 같이 전송하는 용도만 존재)
- `[시작]` 버튼은 조회 결과와 무관하게 항상 `id:0` 고정 게스트 정보를 주입
- 서버 다운 시 게스트 폴백, 정상화 시 자동 재시도 로직 없음

---

## 구현 계획

### authStore.js — `findByTempCode()` 액션 추가

```js
// 가칭 — LOGH-API /user/isRegisted 호출
async findByTempCode() {
  // tempCode로 서버 조회
  // → 계정 있으면: _applyUser(user) 동일 처리
  // → 계정 없으면(신규 기기): 게스트 상태 유지, 추후 register() 시 동일 tempCode로 연결
  // → API 호출 실패(서버 다운): 예외 던지지 않고 "보류" 상태 표시, 게스트 폴백
}
```

> LOGH-API의 `/user/isRegisted` 엔드포인트가 이미 tempCode(uuid) 기반 조회를 수행하므로
> 신규 엔드포인트 불필요. 단, 백엔드 수정사항은 `LOGH-API/docs/001_api_user.md` 참조 후 연결.

### TitleView.vue — [시작] 버튼 흐름 변경

```
클릭
 ├─ 로딩 인디케이터 ON + 버튼 중복 클릭 방지
 ├─ auth.initTempCode()        (tempCode 조회 또는 신규 생성)
 ├─ auth.findByTempCode()      (서버 계정 검색)
 └─ 결과 확정 (서버 응답 수신 또는 다운→게스트 폴백 확정)
      → 인디케이터 OFF → router.push('/lobby')
```

- (검토사항, 이번 범위 밖) [시작] 버튼 라벨을 조회 결과에 따라 분기할지 여부
  — 예: "계속하기 (닉네임)" vs "시작" — 필요 시 별도 논의

### AppHeader.vue — `checkApi()` 상태 전환 감지 추가

```
다운 → 정상 전환 감지 시:
  1. 사용자에게 메시지 노출
  2. 보류 중인 findByTempCode() 자동 재시도

정상 → 다운 전환 감지 시:
  1. 사용자에게 메시지 노출 (기존 게스트 진입은 유지)
```

---

## TODO

- [ ] `authStore.js` — `findByTempCode()` 액션 추가 (LOGH-API `/user/isRegisted` 연결)
- [ ] `TitleView.vue` — [시작] 버튼 클릭 시 `initTempCode()` → `findByTempCode()` 흐름으로 교체, 로딩 인디케이터 추가
- [ ] `AppHeader.vue` — `checkApi()` 폴링에 다운↔정상 전환 감지 + 메시지 노출 + 보류 findByTempCode 재시도 로직 추가
- [ ] 백엔드 수정 완료 후 연결 (`LOGH-API/docs/001_api_user.md`의 4-2~4-5 항목 적용 선행)
