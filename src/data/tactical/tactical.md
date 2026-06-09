# src/data/tactical — 전술 전투 시스템 데이터
> 작성: 2026-06-09

---

## 개요

전술 전투(TacticalView)에서 사용하는 타일맵/지형/장애물 데이터.
성계별 전술맵은 starMaps.js에서 정의하고,
buildTacticalMap(starCode)을 통해 타일 그리드로 변환한다.

---

## 파일 구조

```
src/data/
├── tacticalData.js        ← 전술 전투 핵심 데이터
│     FORMATIONS           진형 데이터 (formationData.js로 통합 예정)
│     TERRAIN              타일 지형 속성
│     HAZARD_TYPES         장애물 타입 정의
│     buildTacticalMap()   성계 → 타일 변환 함수
│
└── stars/maps/
      230022_ISERLOHN.js   성계별 지형 데이터
      ...                  sargasso / hazards 필드 포함
```

---

## TERRAIN — 타일 고정 속성

타일에 고정된 지형 속성. 변하지 않음.

| 코드 | 명칭 | 통과 | FST | ATT | DEF | 피해/페이즈 | 비고 |
|---|---|---|---|---|---|---|---|
| SPACE | 우주 | ✅ | 1.0 | 1.0 | 1.0 | 0 | 기본 |
| NEBULA | 성운 | ✅ | 0.8 | 0.8 | 0.9 | 0 | 시야 감소 |
| ASTEROID | 소행성대 | ❌ | — | — | — | — | 진입 불가 |
| SARGASSO | 사르갓소 | ✅ | 0.1 | 0.5 | 0.5 | 30 | 항행불능 주역 |

### 스키마

```js
TERRAIN: {
  SPACE: {
    id:         'SPACE',
    name:       '우주',
    color:      '#06090f',
    passable:   true,
    fstMod:     1.0,
    offMod:     1.0,
    defMod:     1.0,
    rangeMod:   0,
    dmgPerPhase: 0,
  },
  SARGASSO: {
    id:         'SARGASSO',
    name:       '사르갓소',
    color:      '#1a0a2e',
    passable:   true,
    fstMod:     0.1,          // FST 10%로 감소
    offMod:     0.5,
    defMod:     0.5,
    rangeMod:  -1,
    dmgPerPhase: 30,          // 페이즈당 함대 피해
  },
  ...
}
```

---

## HAZARD — 동적 범위 장애물

위치/반경/효과를 가진 동적 장애물.
TERRAIN과 달리 이동/주기/중력 등 복잡한 효과 가능.

### HAZARD_TYPES 목록

| 코드 | 명칭 | 이동 | 중력 | 주기 | 비고 |
|---|---|---|---|---|---|
| BLACKHOLE | 블랙홀 | ❌ | ✅ | ❌ | 중심 진입불가, 주변 대량 피해 |
| PULSAR | 펄서 | ❌ | ❌ | ✅ | N페이즈마다 전체 피해 |
| ION_STORM | 이온 폭풍 | ✅ | ❌ | ❌ | 이동하는 피해 구역 |
| GRAVITY_WELL | 중력 이상 | ❌ | ✅ | ❌ | 함대를 특정 방향으로 끌어당김 |
| MINEFIELD | 지뢰밭 | ❌ | ❌ | ❌ | 진입 시 피해 (1회) |
| BINARY_STAR | 이중성 | ❌ | ✅ | ❌ | 두 중심점 복합 중력 |

### 기본 HAZARD 스키마

```js
// 블랙홀 (기본형)
{
  type:   'BLACKHOLE',
  x:      10,
  y:      6,
  radius: 3,            // 영향 반경 (타일 단위)
  core:   1,            // 중심부 반경 (진입 불가)
  effect: {
    dmgPerPhase: 100,   // 페이즈당 피해
    fstMod:      0.1,
    attMod:      1.0,
    defMod:      1.0,
  }
}
```

### 이동형 HAZARD 스키마

```js
// 이온 폭풍 (이동형)
{
  type:   'ION_STORM',
  x:      5,
  y:      3,
  radius: 4,
  movePattern: {
    type:     'LINEAR',    // LINEAR / CIRCULAR / RANDOM
    dx:       1,           // X 이동 벡터
    dy:       0,           // Y 이동 벡터
    interval: 2,           // N페이즈마다 이동
    bounce:   true,        // 맵 경계 반사 여부
  },
  effect: {
    dmgPerPhase: 30,
    fstMod:      0.3,
    attMod:      0.7,
    defMod:      1.0,
  }
}
```

### 중력형 HAZARD 스키마

```js
// 블랙홀 (중력 당김 포함)
{
  type:   'BLACKHOLE',
  x:      10,
  y:      6,
  radius: 5,
  core:   1,
  gravity: {
    pullStrength: 2,       // 매 페이즈 N타일 당김
    pullDir:      'CENTER',// CENTER / FIXED
    fixedDx:      0,       // pullDir=FIXED일 때 방향
    fixedDy:      0,
  },
  effect: {
    dmgPerPhase: 100,
    fstMod:      0.1,
  }
}
```

### 주기형 HAZARD 스키마

```js
// 펄서 (주기적 전체 피해)
{
  type:   'PULSAR',
  x:      10,
  y:      6,
  radius: 8,             // 영향 반경
  pulse: {
    interval:   3,       // N페이즈마다 발동
    dmg:        80,      // 발동 시 피해
    warning:    1,       // 발동 N페이즈 전 경고
  },
  effect: {
    dmgPerPhase: 0,      // 평소 피해 없음
  }
}
```

### 복합형 HAZARD 스키마

```js
// 이중성 (두 중심점 복합 중력)
{
  type:   'BINARY_STAR',
  cores: [
    { x:8,  y:5, radius:2, core:1 },
    { x:12, y:7, radius:2, core:1 },
  ],
  gravity: {
    pullStrength: 1,
    pullDir:      'CENTER',  // 각 core 기준
  },
  effect: {
    dmgPerPhase: 50,
    fstMod:      0.2,
  }
}
```

---

## starMaps.js 연동

각 성계 맵 파일에 sargasso/hazards 필드 추가.

```js
// 230022_ISERLOHN.js
export const STAR_MAP = {
  id:      'ISERLOHN',
  code:    '230022',
  nameKr:  '이제르론',
  mapSize: [1000, 1000],
  nebulae: [...],
  planets: [...],

  // 사르갓소 구역 (시각적 + 타일 변환용)
  sargasso: [
    { x:0,   y:0, width:120, height:1000 },  // 좌측 벽
    { x:880, y:0, width:120, height:1000 },  // 우측 벽
  ],

  // 동적 장애물
  hazards: [
    {
      type:   'BLACKHOLE',
      x:      60,
      y:      500,
      radius: 3,
      core:   1,
      gravity: { pullStrength:2, pullDir:'CENTER' },
      effect: { dmgPerPhase:100, fstMod:0.1 },
    }
  ],
}
```

---

## buildTacticalMap(starCode) 처리 흐름

```js
function buildTacticalMap(starCode) {
  const starMap = STAR_MAPS[starCode]
  const tiles = []

  for (let y = 0; y < MAP_H; y++) {
    for (let x = 0; x < MAP_W; x++) {
      let terrain = 'SPACE'

      // 1. ASTEROID 체크
      if (isAsteroid(x, y)) terrain = 'ASTEROID'
      // 2. SARGASSO 체크 (starMap.sargasso 변환)
      else if (isInSargasso(x, y, starMap)) terrain = 'SARGASSO'
      // 3. NEBULA 체크
      else if (isInNebula(x, y, starMap)) terrain = 'NEBULA'

      tiles.push({ x, y, terrain })
    }
  }

  return {
    width:   MAP_W,
    height:  MAP_H,
    tiles,
    hazards: starMap?.hazards || [],  // HAZARD는 타일 외 별도 관리
  }
}
```

---

## 전투 페이즈 처리 흐름

```js
// 매 페이즈 시작 시 processHazards() 호출
function processHazards(phase, fleets, hazards) {

  // 1. 이동형 HAZARD 위치 업데이트
  hazards
    .filter(h => h.movePattern)
    .forEach(h => {
      if (phase % h.movePattern.interval === 0)
        moveHazard(h)
    })

  // 2. 주기형 HAZARD 발동 체크
  hazards
    .filter(h => h.pulse)
    .forEach(h => {
      if (phase % h.pulse.interval === 0)
        applyPulse(fleets, h)
    })

  // 3. 각 함대에 범위 내 HAZARD 효과 적용
  fleets.forEach(fleet => {
    const active = getActiveHazards(fleet.pos, hazards)
    active.forEach(h => applyHazardEffect(fleet, h))
  })

  // 4. 중력 당김 처리
  hazards
    .filter(h => h.gravity)
    .forEach(h => applyGravityPull(fleets, h))
}
```

---

## movePattern 타입

| 타입 | 설명 |
|---|---|
| LINEAR | 직선 이동. dx/dy 벡터 방향. bounce=true면 맵 경계 반사 |
| CIRCULAR | 중심점 주위를 원형으로 이동. cx/cy/radius/speed 필요 |
| RANDOM | 매 interval마다 랜덤 방향 이동 |

---

## 설계 결정 이력

| 날짜 | 결정 |
|---|---|
| 2026-06-09 | TERRAIN + HAZARD 이중 체계 확정 |
| 2026-06-09 | TERRAIN: 타일 고정 속성 (SARGASSO 추가) |
| 2026-06-09 | HAZARD: 동적 범위 효과 (이동/중력/주기/복합) |
| 2026-06-09 | starMaps.js에 sargasso/hazards 필드 추가 |
| 2026-06-09 | buildTacticalMap()에서 성계별 타일 변환 |
| 2026-06-09 | 사르갓소 효과: FST×0.1 + 30dmg/페이즈 |

---

## TODO

- [ ] tacticalData.js TERRAIN에 SARGASSO 추가
- [ ] tacticalData.js HAZARD_TYPES 추가
- [ ] buildTacticalMap() starCode 파라미터 추가
- [ ] processHazards() 구현
- [ ] 각 성계 starMaps.js에 sargasso/hazards 필드 추가
- [ ] formationData.js 통합 (tacticalData.js FORMATIONS 폐기)
- [ ] TacticalView.vue HAZARD 렌더링 설계
