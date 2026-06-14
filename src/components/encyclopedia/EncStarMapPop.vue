<template>
  <div class="lib-overlay" @click.self="enc.close()">
    <div class="lib-panel lib-panel--map">

      <!-- 헤더 -->
      <div class="lib-header">
        <span class="serif lib-title">🌌 성계 지도 — {{ mapTitle }}</span>
        <button class="lib-close mono" @click="enc.close()">✕</button>
      </div>

      <!-- 맵 영역 -->
      <div class="starmap-wrap">
        <svg ref="svgEl" class="starmap-svg"
             :viewBox="`0 0 ${VW} ${VH}`"
             preserveAspectRatio="xMidYMid meet"
             @pointerdown="onPtrDown"
             @pointermove="onPtrMove"
             @pointerup="onPtrUp"
             @pointercancel="onPtrUp"
             @wheel.prevent="onWheel">
          <defs>
            <clipPath id="enc-map-clip" clipPathUnits="userSpaceOnUse">
              <rect x="0" y="0" :width="VW" :height="VH"/>
            </clipPath>
          </defs>
          <g :transform="mapTransform">

            <!-- 보로노이 영역 -->
            <g style="pointer-events:none" clip-path="url(#enc-map-clip)">
              <path v-for="cell in voronoiCells" :key="'vc_'+cell.code"
                    :d="cell.path"
                    :fill="cell.faction ? FACTION_COLORS[cell.faction] : '#060c14'"
                    fill-opacity="0.18"/>
              <line v-for="(e,i) in voronoiInternalEdges" :key="'vi_'+i"
                    :x1="e.x1" :y1="e.y1" :x2="e.x2" :y2="e.y2"
                    :stroke="FACTION_COLORS[e.faction]" stroke-width="0.6" opacity="0.3"/>
              <g v-for="(e,i) in voronoiBorderEdges" :key="'vb_'+i">
                <line :x1="e.ax1" :y1="e.ay1" :x2="e.ax2" :y2="e.ay2"
                      :stroke="FACTION_COLORS[e.fA]" stroke-width="4" opacity="0.12"/>
                <line :x1="e.ax1" :y1="e.ay1" :x2="e.ax2" :y2="e.ay2"
                      :stroke="FACTION_COLORS[e.fA]" stroke-width="1.5" opacity="0.85"/>
                <line :x1="e.bx1" :y1="e.by1" :x2="e.bx2" :y2="e.by2"
                      :stroke="FACTION_COLORS[e.fB]" stroke-width="4" opacity="0.12"/>
                <line :x1="e.bx1" :y1="e.by1" :x2="e.bx2" :y2="e.by2"
                      :stroke="FACTION_COLORS[e.fB]" stroke-width="1.5" opacity="0.85"/>
              </g>
            </g>

            <!-- 사르갓소 / 장애물 폴리곤 -->
            <g style="pointer-events:none">
              <polygon v-for="obs in OBSTACLES" :key="obs.id"
                       :points="obs.points.map(p => p.join(',')).join(' ')"
                       :fill="obs.color.fill"
                       :stroke="obs.color.outline"
                       stroke-width="1.5"
                       opacity="0.88"/>
            </g>

            <!-- 항로 -->
            <line v-for="l in lanesComp" :key="l.id"
                  :x1="l.x1" :y1="l.y1" :x2="l.x2" :y2="l.y2"
                  :stroke="LANE_STROKE[l.type] || LANE_STROKE.normal"
                  :stroke-width="l.type !== 'normal' ? 2 : 1.5"
                  :stroke-dasharray="l.type==='corridor' ? '8 4' : l.type==='phezzan' ? '4 3' : '5 6'"
                  stroke-opacity="0.6"
                  style="pointer-events:none"/>

            <!-- 성계 -->
            <g v-for="s in systems" :key="s.code"
               :transform="`translate(${s.x},${s.y})`"
               class="sys-node"
               :class="{ selected: selectedCode === s.code }"
               @click="selectedCode = selectedCode === s.code ? null : s.code">
              <circle v-if="selectedCode === s.code"
                      r="14" fill="none"
                      :stroke="s.faction ? FACTION_COLORS[s.faction] : '#555'"
                      stroke-width="1.5" opacity=".8" class="sel-ring"/>
              <circle :r="s.type==='capital' ? 7 : s.type==='fortress' ? 6 : 5"
                      fill="#0c1520"
                      :stroke="s.faction ? FACTION_COLORS[s.faction] : '#445'"
                      stroke-width="1"/>
              <text text-anchor="middle" dy="5"
                    :font-size="s.type==='capital' ? 13 : 10">{{ ico(s) }}</text>
              <text class="sys-lbl" text-anchor="middle" dy="17" font-size="9"
                    :fill="s.faction ? FACTION_COLORS[s.faction] : '#6a8aaa'">{{ s.nameKr }}</text>
            </g>

          </g>
        </svg>

        <!-- 범례 -->
        <div class="map-legend panel">
          <div v-for="[fid, clr] in LEGEND_ENTRIES" :key="fid" class="leg-row">
            <span class="leg-dot" :style="`background:${clr}`"/>
            <span class="dim" style="font-size:10px">{{ FACTION_LABELS[fid] }}</span>
          </div>
          <div class="leg-row">
            <span class="leg-dot" style="background:#445"/>
            <span class="dim" style="font-size:10px">중립</span>
          </div>
        </div>

        <!-- 줌 토스트 -->
        <transition name="toast-fade">
          <div v-if="toastVisible" class="zoom-toast mono">
            {{ Math.round(scale * 100) }}%
          </div>
        </transition>

        <!-- 줌 컨트롤 -->
        <div class="zoom-ctrl">
          <button class="zb" @click="zoomStep(1.2)" title="줌인">+</button>
          <button class="zb" @click="resetZoom"      title="초기화">⌂</button>
          <button class="zb" @click="zoomStep(1/1.2)" title="줌아웃">−</button>
        </div>
      </div>

      <!-- 선택된 성계 상세 -->
      <transition name="detail-fade">
        <div v-if="selectedSystem" class="sys-detail panel">
          <div class="sys-detail-header">
            <span class="serif" style="font-size:14px">{{ selectedSystem.nameKr }}</span>
            <span class="mono dim" style="font-size:11px">{{ selectedSystem.nameEn }}</span>
            <span v-if="selectedSystem.faction"
                  class="mono"
                  :style="`color:${FACTION_COLORS[selectedSystem.faction]};font-size:10px`">
              {{ FACTION_LABELS[selectedSystem.faction] }}
            </span>
          </div>
          <p v-if="selectedSystem.desc" class="dim" style="font-size:11px;margin:0">
            {{ selectedSystem.desc }}
          </p>
        </div>
      </transition>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Delaunay } from 'd3-delaunay'
import { useEncyclopediaStore } from '@/stores/encyclopediaStore'
import { useGameStore }         from '@/stores/gameStore'
import { STAR_SYSTEMS, OBSTACLES } from '@/data/base/stars/starSystemData'
import { LANES }                   from '@/data/base/stars/laneData'
import { STAR_DETAIL }  from '@/data/scenario/SE796/01/starDetail'
import { FACTIONS }     from '@/data/masterData'

const enc  = useEncyclopediaStore()
const game = useGameStore()

// ── 상수 ──────────────────────────────────────────────────────
const VW = 1600, VH = 1000
const MIN_SCALE = 1.0, MAX_SCALE = 5.0

const FACTION_COLORS = Object.fromEntries(
  Object.values(FACTIONS).filter(f => f.color).map(f => [f.id, f.color])
)
const FACTION_LABELS = { REH: '은하제국', FPA: '자유행성동맹', PZN: '페잔 자치령' }
const LEGEND_ENTRIES = ['REH', 'FPA', 'PZN'].map(id => [id, FACTION_COLORS[id]])

const LANE_STROKE = {
  corridor: 'rgba(100,200,255,0.8)',
  phezzan:  'rgba(212,170,96,0.8)',
  normal:   'rgba(255,255,255,0.35)',
}

// ── 데이터 ────────────────────────────────────────────────────
const gameActive = computed(() => Object.keys(game.systems).length > 0)

const mapTitle = computed(() =>
  gameActive.value ? `우주력 ${game.year}년 ${game.month}월` : '우주력 796년 2월'
)

const systems = computed(() => {
  if (gameActive.value) {
    return Object.values(game.systems)
      .filter(s => s.x > 0 && s.y > 0)
      .map(s => ({ ...s, nameKr: s.name }))
  }
  const factionMap = Object.fromEntries(STAR_DETAIL.map(d => [d.code, d.faction]))
  return STAR_SYSTEMS
    .filter(s => s.x > 0 && s.y > 0)
    .map(s => ({ ...s, faction: factionMap[s.code] ?? null }))
})

// ── 항로 ──────────────────────────────────────────────────────
const sysMap = computed(() => Object.fromEntries(systems.value.map(s => [s.code, s])))

const lanesComp = computed(() =>
  LANES.map(l => {
    const sa = sysMap.value[l.stars[0]], sb = sysMap.value[l.stars[1]]
    if (!sa || !sb) return null
    return { id: l.id, type: l.type, x1: sa.x, y1: sa.y, x2: sb.x, y2: sb.y }
  }).filter(Boolean)
)

// ── 보로노이 ──────────────────────────────────────────────────
const GHOST_STEP     = 450
const SARGASSO_STEP  = 25

function pointInPolygon(x, y, pts) {
  let inside = false
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const xi = pts[i][0], yi = pts[i][1]
    const xj = pts[j][0], yj = pts[j][1]
    if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi)
      inside = !inside
  }
  return inside
}

const voronoiData = computed(() => {
  const sysList = systems.value
  if (sysList.length < 2) return { cells: [], internalEdges: [], borderEdges: [] }

  const ghosts = []
  for (let gx = 0; gx <= VW; gx += GHOST_STEP)
    for (let gy = 0; gy <= VH; gy += GHOST_STEP)
      ghosts.push({ x: gx, y: gy, faction: null })

  for (const obs of OBSTACLES) {
    const xs = obs.points.map(p => p[0])
    const ys = obs.points.map(p => p[1])
    const x0 = Math.min(...xs), x1 = Math.max(...xs)
    const y0 = Math.min(...ys), y1 = Math.max(...ys)
    for (let gx = x0; gx <= x1; gx += SARGASSO_STEP)
      for (let gy = y0; gy <= y1; gy += SARGASSO_STEP)
        if (pointInPolygon(gx, gy, obs.points))
          ghosts.push({ x: gx, y: gy, faction: null })
  }

  const nReal  = sysList.length
  const allPts = [...sysList, ...ghosts]

  const delaunay = Delaunay.from(allPts, s => s.x, s => s.y)
  const voronoi  = delaunay.voronoi([0, 0, VW, VH])
  const OFFSET   = 2.5

  const cells = sysList.map((s, i) => ({
    code:    s.code,
    path:    voronoi.renderCell(i),
    faction: s.faction,
  }))

  const internalEdges = [], borderEdges = []

  for (let e = 0; e < delaunay.halfedges.length; e++) {
    const opp = delaunay.halfedges[e]
    if (opp < 0 || e > opp) continue

    const i = delaunay.triangles[e]
    const j = delaunay.triangles[opp]
    if (i >= nReal || j >= nReal) continue

    const fA = allPts[i]?.faction || null
    const fB = allPts[j]?.faction || null

    const c1 = Math.floor(e   / 3) * 2
    const c2 = Math.floor(opp / 3) * 2
    const x1 = voronoi.circumcenters[c1],   y1 = voronoi.circumcenters[c1 + 1]
    const x2 = voronoi.circumcenters[c2],   y2 = voronoi.circumcenters[c2 + 1]
    const dx = x2 - x1, dy = y2 - y1
    const len = Math.hypot(dx, dy)
    if (len < 0.5) continue

    if (fA && fB && fA !== fB) {
      const nx = -dy / len * OFFSET, ny = dx / len * OFFSET
      borderEdges.push({
        ax1: x1+nx, ay1: y1+ny, ax2: x2+nx, ay2: y2+ny,
        bx1: x1-nx, by1: y1-ny, bx2: x2-nx, by2: y2-ny,
        fA, fB,
      })
    } else if (fA && fA === fB) {
      internalEdges.push({ x1, y1, x2, y2, faction: fA })
    }
  }

  return { cells, internalEdges, borderEdges }
})

const voronoiCells         = computed(() => voronoiData.value.cells)
const voronoiInternalEdges = computed(() => voronoiData.value.internalEdges)
const voronoiBorderEdges   = computed(() => voronoiData.value.borderEdges)

// ── 아이콘 ────────────────────────────────────────────────────
function ico(s) {
  if (s.type === 'capital')   return '🏛'
  if (s.type === 'fortress')  return '🏰'
  if (s.type === 'contested') return '⚡'
  return '⭐'
}

// ── 선택 ──────────────────────────────────────────────────────
const selectedCode   = ref(null)
const selectedSystem = computed(() => systems.value.find(s => s.code === selectedCode.value) ?? null)

// ── 줌 / 팬 ──────────────────────────────────────────────────
const scale = ref(1), panX = ref(0), panY = ref(0)
const svgEl = ref(null)

const mapTransform = computed(() =>
  `translate(${panX.value},${panY.value}) scale(${scale.value})`
)

function toSvg(clientX, clientY) {
  const r = svgEl.value.getBoundingClientRect()
  return { x: (clientX - r.left) / r.width * VW, y: (clientY - r.top) / r.height * VH }
}
function applyZoom(factor, svgX, svgY) {
  const ns = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale.value * factor))
  const r  = ns / scale.value
  panX.value  = svgX * (1 - r) + panX.value * r
  panY.value  = svgY * (1 - r) + panY.value * r
  scale.value = ns
}
function zoomStep(f) { applyZoom(f, VW / 2, VH / 2) }
function resetZoom()  { scale.value = 1; panX.value = 0; panY.value = 0 }

const toastVisible = ref(false)
let toastTimer = null
function showToast() {
  toastVisible.value = true
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { toastVisible.value = false }, 1200)
}
function onWheel(e) {
  const sp = toSvg(e.clientX, e.clientY)
  applyZoom(e.deltaY < 0 ? 1.15 : 1 / 1.15, sp.x, sp.y)
  showToast()
}

const activePointers = new Map()
let pinchDist0 = 0
const ds = ref(null)

function onPtrDown(e) {
  const sp = toSvg(e.clientX, e.clientY)
  activePointers.set(e.pointerId, sp)
  svgEl.value.setPointerCapture(e.pointerId)
  if (activePointers.size === 2) {
    const pts = [...activePointers.values()]
    pinchDist0 = Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y)
    ds.value = null; return
  }
  ds.value = { startSvg: sp, startPan: { x: panX.value, y: panY.value }, moved: false }
}
function onPtrMove(e) {
  const sp = toSvg(e.clientX, e.clientY)
  activePointers.set(e.pointerId, sp)
  if (activePointers.size === 2) {
    const pts = [...activePointers.values()]
    const nd  = Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y)
    const mx  = (pts[0].x + pts[1].x) / 2, my = (pts[0].y + pts[1].y) / 2
    applyZoom(nd / pinchDist0, mx, my)
    pinchDist0 = nd; return
  }
  if (!ds.value) return
  const d = ds.value
  const dx = sp.x - d.startSvg.x, dy = sp.y - d.startSvg.y
  if (!d.moved && (Math.abs(dx) > 3 || Math.abs(dy) > 3)) d.moved = true
  panX.value = d.startPan.x + dx
  panY.value = d.startPan.y + dy
}
function onPtrUp(e) {
  activePointers.delete(e.pointerId)
  ds.value = null
}
</script>

<style scoped>
/* ── 오버레이 / 패널 ──────────────────────────────────────────── */
.lib-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,.6); backdrop-filter: blur(4px);
  display: flex; align-items: center; justify-content: center;
  z-index: 200;
}
.lib-panel--map {
  width: min(96vw, 1200px);
  height: min(92vh, 780px);
  background: var(--bg2, #0a0f1a);
  border: 1px solid var(--bd, #1e2a3a);
  border-radius: 10px;
  display: flex; flex-direction: column;
  overflow: hidden;
}
.lib-header {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 14px; border-bottom: 1px solid var(--bd, #1e2a3a);
  flex-shrink: 0;
}
.lib-title { flex: 1; font-size: 14px; color: var(--t1, #e0e6f0) }
.lib-close {
  background: none; border: none; color: var(--t3, #4a5a6a);
  font-size: 16px; cursor: pointer; padding: 2px 6px;
}
.lib-close:hover { color: var(--t1, #e0e6f0) }

/* ── 맵 래퍼 ─────────────────────────────────────────────────── */
.starmap-wrap {
  position: relative; flex: 1; overflow: hidden; background: #020508;
}
.starmap-svg {
  width: 100%; height: 100%;
  touch-action: none; user-select: none; display: block;
}
.sys-node { cursor: pointer }
.sys-lbl  { pointer-events: none; font-family: var(--font-sans, sans-serif) }

@keyframes pulse { 0%,100%{opacity:.5} 50%{opacity:1} }
.sel-ring { animation: pulse 1.5s ease-in-out infinite }

/* ── 범례 ────────────────────────────────────────────────────── */
.map-legend {
  position: absolute; bottom: 40px; left: 10px;
  padding: 7px 11px; display: flex; flex-direction: column; gap: 4px;
  pointer-events: none;
}
.leg-row { display: flex; align-items: center; gap: 6px }
.leg-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; display: inline-block }

/* ── 줌 컨트롤 ───────────────────────────────────────────────── */
.zoom-ctrl {
  position: absolute; bottom: 10px; right: 10px;
  display: flex; flex-direction: column; gap: 4px; z-index: 10;
}
.zb {
  width: 28px; height: 28px;
  background: rgba(10,16,24,.85); border: 1px solid var(--bd, #1e2a3a);
  color: var(--t2, #8a9aaa); border-radius: 5px; cursor: pointer; font-size: 14px;
  display: flex; align-items: center; justify-content: center;
}
.zb:hover { border-color: var(--fc, #d4aa60); color: var(--fc, #d4aa60) }

/* ── 성계 상세 ───────────────────────────────────────────────── */
.sys-detail {
  position: absolute; bottom: 10px; left: 10px;
  padding: 8px 12px; max-width: 280px;
  display: flex; flex-direction: column; gap: 3px;
  pointer-events: none;
}
.sys-detail-header { display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap }

.detail-fade-enter-active, .detail-fade-leave-active { transition: opacity .2s }
.detail-fade-enter-from, .detail-fade-leave-to { opacity: 0 }

/* ── 줌 토스트 ───────────────────────────────────────────────── */
.zoom-toast {
  position: absolute; top: 10px; left: 50%; transform: translateX(-50%);
  background: rgba(10,16,28,.85); border: 1px solid var(--bd, #1e2a3a);
  color: var(--fc, #d4aa60); font-size: 13px; letter-spacing: .05em;
  padding: 4px 14px; border-radius: 20px; pointer-events: none;
  white-space: nowrap;
}
.toast-fade-enter-active { transition: opacity .15s }
.toast-fade-leave-active { transition: opacity .4s }
.toast-fade-enter-from, .toast-fade-leave-to { opacity: 0 }
</style>
