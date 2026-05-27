# src/components — 컴포넌트

## 개요

```
components/
├── ui/             공통 UI (헤더/HUD/로그/바)
└── game/
    ├── map/        갤럭시맵
    ├── panels/     사이드/인포 패널
    └── modals/     게임 모달 9종
```

---

## ui/ — 공통 UI

| 파일 | 설명 |
|---|---|
| `AppHeader.vue` | 전역 헤더 (브랜드/유저/포인트/메뉴) |
| `OptionsPanel.vue` | AppHeader 메뉴 패널 |
| `GameHud.vue` | 게임 중 HUD (세력/자원/날짜) |
| `EventLog.vue` | 이벤트 로그 패널 |
| `BottomBar.vue` | 하단 주요 버튼 + 턴 종료 (position: fixed) |
| `StatRow.vue` | 스탯 행 공통 컴포넌트 |

### AppHeader 상세

- 좌: 브랜드 타이틀
- 우: 아바타 / 유저명 / ◆포인트 / 로그인·로그아웃 / ☰메뉴
- `optionsOpen` ref로 OptionsPanel 토글
- 30초마다 API 서버 연결 상태 폴링 (`apiOnline`)

---

## game/map/GalaxyMap.vue

### 스펙

- SVG viewBox: `0 0 1600 1000`, `preserveAspectRatio="xMidYMid meet"`
- 줌: 마우스 휠 + 핀치 (scale 0.4~5), 버튼 +/⌂/−
- 팬: 드래그
- 클릭: 성계(selectSystem) / 함대(selectFleet) / 항로(selectedLane 토글, 금색 글로우)
- 편집 모드(✏️): 이동/라인/추가/삭제 툴

### 항로 렌더링

편집모드 OFF 시 항로 type별 색상/선스타일:

| type | 색상 | 선두께 | 대시 |
|---|---|---|---|
| `corridor` | `rgba(100,200,255,0.55)` | 2px | `8 4` |
| `phezzan` | `rgba(212,170,96,0.60)` | 2px | `4 3` |
| `normal` | `rgba(255,255,255,0.35)` | 1.5px | `5 6` |

편집모드 ON: 전체 `rgba(255,255,255,0.65)`, 2px, 대시 없음

### 주요 import

```js
import { LANE_DEF } from '@/data/stars/lane'
// game.systems 에서 성계 좌표/정보 읽음 (starSystemData는 직접 import 안 함)
```

---

## game/panels/

| 파일 | 설명 |
|---|---|
| `SidePanel.vue` | 좌측 패널: 세력 목록, 함대 목록 |
| `InfoPanel.vue` | 우측 패널: 선택 성계 상세 (탭: 개요/함대/경제/세부맵) |

### InfoPanel 세부맵 탭

```js
import { getStarMapByCode } from '@/data/stars/maps/index.js'
const starMapData = computed(() => getStarMapByCode(sys.value.code ?? sys.value.id))
// SVG mini-map: 성운 + 행성 표시
```

---

## game/modals/ — MODAL_MAP

`GameView.vue`의 `MODAL_MAP`에 등록. `game.openModal('name', payload)`로 호출.

| key | 파일 | 용도 |
|---|---|---|
| `tax` | TaxModal.vue | 세율 조정 |
| `fleet` | FleetModal.vue | 함대 편성/재편 |
| `build` | BuildModal.vue | 건설 명령 |
| `char` | CharModal.vue | 인물 발령 |
| `finance` | FinanceModal.vue | 재정 (차관/징수/예산) |
| `military` | MilitaryModal.vue | 군사 작전 |
| `intel` | IntelModal.vue | 첩보/외교 |
| `event` | EventModal.vue | 스토리 이벤트 |

### EventModal payload 구조

```js
{
  title: '쿠데타 발생',
  portrait: '⚔️',
  speaker: '라인하르트 폰 로엔그람',
  desc: '은하제국 내에 쿠데타가 발생했습니다...',
  effect: { morale: -10, gold: -500 },  // optional
  buttons: [{ label: '확인' }],          // optional, default=[{label:'확인'}]
}
```

---

## InfoPanel 설계 목표

### 성계 정보 패널

```
[ 성계명 ] [ 주요행성 이미지 ] [ 각종 수치 ] [ 상태: 평화/교전중 ]
버튼:
  1. 상세보기  → 갤럭시맵이 해당 성계맵으로 전환 (뒤로가기로 복귀)
  2. 행성정보  → 행성 목록 <li> (행성명 + 간략 정보)
                  → 행성명 클릭 시 행성 상세 노출
  3. 항로정보  → 연결된 성계명 버튼 목록
                  → 성계명 클릭 시 해당 항로 정보 노출
  4. 제안      → 담당 인물이 있으면 담당관에게, 없으면 국가수반에게
                  담당관은 턴 종료 시 유효한 우선순위 제안을 수용
                  (제안 시스템은 별도 MD 관리 예정)
```

### 각종 수치 상세

```
인구: 1k = 1pop, 아이콘(사람) 터치 시 지지도 노출
  예) 인구 10k → 자유행성동맹 지지 4k / 구국군사회의 지지 2k ...
```

### 행성 정보 패널

```
[ 행성명 ] [ 소속 성계 ] [ 각종 수치 ] [ 상태 ]
버튼:
  1. 상세보기  → 해당 행성 focus, 성계맵으로 전환
  2. 행성정보  → 행성 상세
  3. 제안      → 해당 성계 선택 상태에서 제안 패널 오픈
```

---

## TODO

- [ ] GalaxyMap 성계 좌표 수정 미반영 문제 조사
- [ ] AppHeader: 아바타 이미지 API 연동, OptionsPanel 내용 채우기
- [ ] InfoPanel: 위 설계 목표대로 탭 구현 (planetsData.js 완성 후)
- [ ] 제안 시스템 MD 파일 작성
