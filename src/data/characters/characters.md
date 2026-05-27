# src/data/characters — 인물 데이터

## 개요

게임 등장인물(제독/정치인) 마스터 데이터.

---

## 파일 목록

| 파일 | 설명 |
|---|---|
| `char.js` | 인물 기본 정보 (id/name/faction/stats/portrait) |
| `charStats.js` | 스탯 체계 정의 (통솔/정치/외교 등) |

---

## 인물 데이터 구조 (char.js)

```js
export const CHARACTERS = {
  'REINHARD': {
    id: 'REINHARD', nameKr: '라인하르트', nameEn: 'Reinhard von Lohengramm',
    faction: 'REH',
    stats: { command: 95, politics: 80, diplomacy: 70, ... },
    portrait: '⚔️',
    currentPost: null,   // 게임 중 gameStore.characters에서 관리
  },
  // ...
}
```

---

## TODO

- [ ] 추가 인물 데이터 입력: 루츠, 파렌하이트, 뮐러, 부코크, 피셔, 줄리안 민츠
- [ ] 인물 초상화 이미지 연결 (`src/assets/Img/characters/face/`)
- [ ] 스탯 체계 최종 확정 (charStats.js)
