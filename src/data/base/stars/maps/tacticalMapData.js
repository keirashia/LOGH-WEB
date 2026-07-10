import { STAR_MAP as ASTADE } from './230005_ASTADE.js'

// key: STAR_MAP.code
// mapSize: [tileW, tileH] — 전술 맵 타일 그리드 크기 (성계 시각 맵과 무관)
// terrain: STAR_MAP.tactical.terrain (1000×1000 좌표계 객체 배열)
export const TACTICAL_MAP_DATA = {
  [ASTADE.code]: {
    mapSize: [40, 24],
    terrain: ASTADE.tactical.terrain,
  },
}
