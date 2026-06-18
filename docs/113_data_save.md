# 게임 저장/불러오기
> 분류: 데이터
> 경로: `docs/113_data_save.md`
> 상위: [100_DATA.md](100_DATA.md)
> 최종 수정: 2026-06-18

---

## 방식

파일 내보내기/불러오기 방식으로 구현한다. localStorage는 사용하지 않는다.

- **저장**: `gameStore.$state`를 JSON으로 직렬화 → `.json` 파일로 다운로드
- **불러오기**: `.json` 파일을 `<input type="file">`로 읽어 `gameStore.$patch()` 로 복원
- 완전 오프라인 동작 (API 불필요)
- 용량 무제한, 파일 백업/이전 가능

---

## 저장 파일 형식

```js
{
  version:  1,                   // 포맷 버전 — 하위호환 판별용
  savedAt:  "2026-06-18T12:00",  // ISO8601
  scId:     "SE796_0211_010",    // 시나리오 ID
  faction:  "FPA",               // 플레이어 세력
  state:    { ...gameStore.$state }  // 게임 상태 전체
}
```

> `version` 필드는 불러오기 시 포맷 검증에 사용한다. 현재는 `1`만 존재.

---

## 파일명 규칙

```
LOGH_{scId}_{faction}_{YYYYMMDD_HHmm}.json
예) LOGH_SE796_0211_010_FPA_20260618_1430.json
```

---

## 저장 흐름

```
[저장 버튼 클릭]
  → gameStore.$state 전체를 래핑 객체에 담아 JSON.stringify
  → Blob 생성 → <a download> 트릭으로 파일 다운로드
```

```js
// 구현 예시 (saveStore 또는 gameStore action)
function exportSave() {
  const payload = {
    version: 1,
    savedAt: new Date().toISOString(),
    scId:    game.sc?.id,
    faction: game.playerFaction,
    state:   game.$state,
  }
  const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  const ts   = new Date().toISOString().slice(0, 16).replace(/[-:T]/g, m => m === 'T' ? '_' : m)
  a.href     = url
  a.download = `LOGH_${payload.scId}_${payload.faction}_${ts}.json`
  a.click()
  URL.revokeObjectURL(url)
}
```

---

## 불러오기 흐름

```
[불러오기 버튼 클릭]
  → <input type="file" accept=".json"> 열기
  → FileReader로 텍스트 읽기
  → JSON.parse → version 검증
  → gameStore.$patch(data.state)
  → initialized: true 확인 후 /game 라우트로 이동
```

```js
// 구현 예시
function importSave(file) {
  const reader = new FileReader()
  reader.onload = (e) => {
    const data = JSON.parse(e.target.result)
    if (data.version !== 1) throw new Error('지원하지 않는 저장 파일 버전입니다.')
    game.$patch({ ...data.state, initialized: true })
    router.push('/game')
  }
  reader.readAsText(file)
}
```

---

## UI 위치

| 진입 경로 | 액션 |
|---|---|
| 게임 화면 내 메뉴 (BottomBar 또는 MenuPanel) | 저장 / 불러오기 |
| 로비 화면 | 불러오기만 (저장 없음 — 게임 중이 아니므로) |

---

## TODO

- [ ] `exportSave()` / `importSave()` 구현 — `gameStore` action 또는 별도 composable
- [ ] MenuPanel에 "저장" / "불러오기" 항목 추가
- [ ] 불러오기 후 `_loadScenarioFiles` 재호출 여부 검토 (state에 이미 게임 데이터가 있으므로 불필요할 수 있음)
- [ ] version 업 시 마이그레이션 전략 정의
