<template>
  <div class="map-wrap">
    <canvas ref="bgCvs" class="map-bg" />
    <svg ref="svgEl" class="map-svg" :viewBox="`0 0 ${VW} ${VH}`"
         preserveAspectRatio="xMidYMid slice"
         :class="{ 'is-edit': editMode, [`tool-${activeTool}`]: editMode }"
         @pointerdown="onPtrDown"
         @pointermove="onPtrMove"
         @pointerup="onPtrUp"
         @pointercancel="onPtrUp">
      <defs>
        <!-- 보로노이 클립 -->
        <clipPath id="map-clip" clipPathUnits="userSpaceOnUse">
          <rect x="0" y="0" :width="VW" :height="VH"/>
        </clipPath>
        <!-- 사르갓소 성운 필터: 넓은 확산 블러 + 좁은 내부 블러 합산 -->
        <filter id="sargasso-nebula" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="30" result="wide"/>
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="inner"/>
          <feMerge>
            <feMergeNode in="wide"/>
            <feMergeNode in="inner"/>
          </feMerge>
        </filter>
        <!-- 국경선 warp (비활성화용 보존) -->
        <filter id="bt-warp" x="-10%" y="-100%" width="120%" height="300%">
          <feTurbulence type="fractalNoise" baseFrequency="0.007 0.003" numOctaves="2" result="noise">
            <animate attributeName="seed" from="0" to="60" dur="8s" repeatCount="indefinite"/>
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="G"/>
        </filter>
      </defs>
      <g :transform="mapTransform">

        <!-- 보로노이 영역 -->
        <g style="pointer-events:none" clip-path="url(#map-clip)">
          <!-- 셀 채움 -->
          <path v-for="cell in voronoiCells" :key="'vc_'+cell.id"
                :d="cell.path"
                :fill="cell.faction ? fclr[cell.faction] : 'none'"
                fill-opacity="0.18"/>
          <!-- 동일 세력 내부 경계 (얇은 선) -->
          <line v-for="(e,i) in voronoiInternalEdges" :key="'vi_'+i"
                :x1="e.x1" :y1="e.y1" :x2="e.x2" :y2="e.y2"
                :stroke="fclr[e.faction]" stroke-width="0.6" opacity="0.30"/>
          <!-- 이종 세력 경계 (이중선 + 글로우) -->
          <g v-for="(e,i) in voronoiBorderEdges" :key="'vb_'+i">
            <line :x1="e.ax1" :y1="e.ay1" :x2="e.ax2" :y2="e.ay2"
                  :stroke="fclr[e.fA]" stroke-width="4" opacity="0.15"/>
            <line :x1="e.ax1" :y1="e.ay1" :x2="e.ax2" :y2="e.ay2"
                  :stroke="fclr[e.fA]" stroke-width="1.5" opacity="0.9" class="border-line"/>
            <line :x1="e.bx1" :y1="e.by1" :x2="e.bx2" :y2="e.by2"
                  :stroke="fclr[e.fB]" stroke-width="4" opacity="0.15"/>
            <line :x1="e.bx1" :y1="e.by1" :x2="e.bx2" :y2="e.by2"
                  :stroke="fclr[e.fB]" stroke-width="1.5" opacity="0.9" class="border-line"/>
          </g>
        </g>

        <!-- 사르갓소 / 장애물 폴리곤 -->
        <g style="pointer-events:none">
          <polygon v-for="obs in game.obstacles" :key="obs.id"
                   :points="obs.points.map(p => p.join(',')).join(' ')"
                   :fill="obs.type==='SARGASSO' ? 'rgba(110,30,210,0.38)' : obs.color.fill"
                   :filter="obs.type==='SARGASSO' ? 'url(#sargasso-nebula)' : undefined"
                   :stroke="obs.type==='SARGASSO' ? 'none' : obs.color.outline"
                   :stroke-width="obs.type==='SARGASSO' ? 0 : 1.5"/>
        </g>

        <!-- 항로 (비경계) -->
        <line v-for="l in normalLanesComp" :key="l.k"
              :x1="l.x1" :y1="l.y1" :x2="l.x2" :y2="l.y2"
              :stroke="editMode ? 'rgba(255,255,255,0.65)' : (LANE_STROKE[l.type] || LANE_STROKE.normal)"
              :stroke-width="editMode ? 2 : (l.type==='corridor' || l.type==='phezzan' ? 2 : 1.5)"
              :stroke-dasharray="l.type==='corridor' ? '8 4' : l.type==='phezzan' ? '4 3' : '5 6'"
              style="pointer-events:none"/>

        <!-- 국경 3중 금선 (비활성화)
        <g filter="url(#bt-warp)" style="pointer-events:none">
          <g v-for="bl in borderLanes" :key="'bl_'+bl.k">
            <line :x1="bl.segs[0].x1" :y1="bl.segs[0].y1" :x2="bl.segs[0].x2" :y2="bl.segs[0].y2" class="bline bl-1"/>
            <line :x1="bl.segs[1].x1" :y1="bl.segs[1].y1" :x2="bl.segs[1].x2" :y2="bl.segs[1].y2" class="bline bl-2"/>
            <line :x1="bl.segs[2].x1" :y1="bl.segs[2].y1" :x2="bl.segs[2].x2" :y2="bl.segs[2].y2" class="bline bl-3"/>
          </g>
        </g>
        -->

        <!-- 함대 마커 -->
        <g v-for="f in game.allFleets" :key="f.id"
           :transform="`translate(${f.sx+17},${f.sy-11})`"
           :class="['fleet-dot', { sel: game.selectedFleet===f.id }]">
          <circle r="7" :fill="`${fclr[f.faction]}44`"
                  :stroke="fclr[f.faction]" stroke-width="1.5"/>
          <text text-anchor="middle" dy="4" font-size="8" fill="white">🚀</text>
        </g>

        <!-- 성계 -->
        <g v-for="s in systems" :key="s.id"
           :transform="`translate(${s.x},${s.y})`"
           class="sys-node">
          <circle v-if="showHit"
                  :r="nr(s) + hitPadContent"
                  fill="rgba(255,255,255,0.08)"
                  stroke="rgba(255,255,255,0.5)"
                  stroke-width="0.5"
                  stroke-dasharray="3 2"
                  style="pointer-events:none"/>
          <circle v-if="game.selectedSystem===s.id && !editMode"
                  :r="vr(s)+6" fill="none"
                  :stroke="fclr[s.faction]||'rgba(255,255,255,0.25)'"
                  stroke-width="1.5" opacity=".8" class="sel-ring"/>
          <circle v-if="editMode && laneFrom===s.id"
                  :r="vr(s)+8" fill="none" stroke="gold" stroke-width="2" opacity=".85"/>
          <circle :r="vr(s)+2" :fill="fclr[s.faction]||'none'" opacity="0.25"/>
          <circle :r="vr(s)" fill="white" opacity="0.9"/>
          <circle v-if="s.underConstruction"
                  :r="vr(s)+3" fill="none" stroke="#f0b030"
                  stroke-width="0.8" stroke-dasharray="2 2" opacity=".7"/>
          <g v-if="labelOpacity > 0" :opacity="labelOpacity" style="pointer-events:none">
            <rect
              :x="-(s.displayName.length * 9 / scale + 4 / scale)"
              :y="vr(s) + 3 / scale"
              :width="s.displayName.length * 18 / scale + 8 / scale"
              :height="22 / scale"
              :rx="2 / scale"
              fill="rgba(4,8,16,0.80)"
              :stroke="fclr[s.faction] || 'rgba(255,255,255,0.25)'"
              :stroke-width="0.8 / scale"
            />
            <text class="sys-lbl" text-anchor="middle"
                  :dy="vr(s) + 19 / scale"
                  :font-size="18 / scale"
                  :fill="fclr[s.faction] || 'rgba(255,255,255,0.9)'">{{ s.displayName }}</text>
          </g>
        </g>

        <!-- 추가 미리보기 -->
        <g v-if="addPreview" :transform="`translate(${addPreview.x},${addPreview.y})`"
           style="pointer-events:none">
          <circle r="11" fill="#27ae6022" stroke="#27ae60" stroke-width="1.5" stroke-dasharray="3 3"/>
          <text text-anchor="middle" dy="5" font-size="12" fill="#27ae60">+</text>
        </g>

      </g>
    </svg>

    <!-- 줌 + 편집 토글 -->
    <div class="zoom-ctrl">
      <button class="zb" @click="zoomStep(1.2)"   title="줌인 (+)">+</button>
      <button class="zb" @click="resetZoom"         title="초기화">⌂</button>
      <button class="zb" @click="zoomStep(1/1.2)"  title="줌아웃 (−)">−</button>
      <div class="zb-sep"/>
      <button :class="['zb', { active: showHit }]" @click="showHit=!showHit" title="터치 영역 표시">◎</button>
      <!-- <button :class="['zb', { active: editMode }]" @click="toggleEditMode" title="편집 모드">✏️</button> -->
    </div>

    <!-- 편집 툴바 -->
    <transition name="tb-fade">
      <div v-if="editMode" class="edit-tb">
        <button v-for="t in TOOLS" :key="t.id"
                :class="['tb-btn', { active: activeTool===t.id }]"
                @click="activeTool=t.id" :title="t.hint">
          <span class="tb-icon">{{ t.icon }}</span>
          <span class="tb-lbl">{{ t.label }}</span>
        </button>
      </div>
    </transition>

    <!-- 성계 추가 폼 -->
    <div v-if="addForm.visible" class="add-form panel"
         :style="{ left: addForm.sx+'px', top: addForm.sy+'px' }">
      <div class="af-title">새 성계</div>
      <input ref="addInput" v-model="addForm.name" class="af-input"
             placeholder="성계 이름" maxlength="10"
             @keydown.enter="confirmAdd" @keydown.escape="cancelAdd"/>
      <div class="af-btns">
        <button class="btn btn-sm" @click="confirmAdd">추가</button>
        <button class="btn btn-sm" style="opacity:.6" @click="cancelAdd">취소</button>
      </div>
    </div>

    <!-- 날짜 -->
    <GameDateDisplay class="map-date" />

    <!-- 범례 -->
    <div class="map-legend panel">
      <div v-for="fid in scenarioFactions" :key="fid" class="leg-row">
        <span class="leg-dot" :style="`background:${FACTIONS[fid]?.color}`"/>
        <span class="dim" style="font-size:10px">{{ FACTION_NAME_MAP[fid] }}</span>
        <span class="mono dim" style="font-size:10px;margin-left:auto">{{ factionSystemCounts[fid] ?? 0 }}</span>
      </div>
      <div class="leg-row">
        <span class="leg-dot" style="background:transparent;border:1px solid rgba(255,255,255,0.25)"/>
        <span class="dim" style="font-size:10px">중립</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { Delaunay } from 'd3-delaunay'
import { useGameStore } from '@/stores/gameStore'
import { useLang } from '@/composables/useLang'
import { FACTIONS } from '@/data/masterData'
import { FACTION_NAMES } from '@/data/base/factions/factionName.js'
import GameDateDisplay from '@/components/game/GameDateDisplay.vue'

const game  = useGameStore()
const { lang } = useLang()
const bgCvs = ref(null)
const svgEl = ref(null)
let   aid   = null

const svgW    = ref(0)
const showHit = ref(false)
const hitPadContent = computed(() =>
  svgW.value ? 28 * VW / svgW.value / scale.value : 36
)

const VW = 1600, VH = 1000

const scenarioFactions = computed(() => game.sc?.factions ?? [])

const FACTION_NAME_MAP = Object.fromEntries(
  FACTION_NAMES.filter(n => n.lang === 'Kr').map(n => [n.factionId, n.shortName])
)

const factionSystemCounts = computed(() => {
  const cnt = {}
  for (const sys of Object.values(game.systems)) {
    if (sys.faction) cnt[sys.faction] = (cnt[sys.faction] || 0) + 1
  }
  return cnt
})

// ── 줌 / 팬 상태 ─────────────────────────────────────────────
const scale = ref(1)
const panX  = ref(0)
const panY  = ref(0)
const MIN_SCALE = 0.5
const MAX_SCALE = 5

const mapTransform = computed(() =>
  `translate(${panX.value},${panY.value}) scale(${scale.value})`
)

function toSvg(clientX, clientY) {
  const r = svgEl.value.getBoundingClientRect()
  return { x: (clientX - r.left) / r.width * VW, y: (clientY - r.top) / r.height * VH }
}
function toContent(svgX, svgY) {
  return { x: (svgX - panX.value) / scale.value, y: (svgY - panY.value) / scale.value }
}
function applyZoom(factor, svgX, svgY) {
  const ns  = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale.value * factor))
  const r   = ns / scale.value
  panX.value  = svgX * (1 - r) + panX.value * r
  panY.value  = svgY * (1 - r) + panY.value * r
  scale.value = ns
}
function zoomStep(f) { applyZoom(f, VW / 2, VH / 2) }
function resetZoom()  { scale.value = 1; panX.value = 0; panY.value = 0 }

// ── 포인터 통합 (팬·드래그·핀치) ────────────────────────────
const activePointers = new Map()   // pointerId → { x, y }
let   pinchDist0     = 0

// drag state: null | { type:'pan'|'sys', id?, startSvg, startPan, startContent, moved }
const ds = ref(null)

function onPtrDown(e) {
  const sp = toSvg(e.clientX, e.clientY)
  activePointers.set(e.pointerId, sp)
  svgEl.value.setPointerCapture(e.pointerId)

  if (activePointers.size === 2) {
    const pts = [...activePointers.values()]
    pinchDist0 = Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y)
    ds.value = null
    return
  }
  if (activePointers.size > 2) return

  const cp = toContent(sp.x, sp.y)
  const sys = sysAt(sp.x, sp.y)

  if (editMode.value && activeTool.value === 'move' && sys) {
    ds.value = { type: 'sys', id: sys.id, startSvg: sp, moved: false }
  } else {
    ds.value = { type: 'pan', startSvg: sp,
                 startPan: { x: panX.value, y: panY.value }, moved: false }
  }
}

function onPtrMove(e) {
  const sp = toSvg(e.clientX, e.clientY)
  activePointers.set(e.pointerId, sp)

  if (activePointers.size === 2) {
    const pts = [...activePointers.values()]
    const nd   = Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y)
    const midX = (pts[0].x + pts[1].x) / 2
    const midY = (pts[0].y + pts[1].y) / 2
    applyZoom(nd / pinchDist0, midX, midY)
    pinchDist0 = nd
    return
  }

  if (!ds.value) return
  const d  = ds.value
  const dx = sp.x - d.startSvg.x
  const dy = sp.y - d.startSvg.y
  if (!d.moved && (Math.abs(dx) > 3 || Math.abs(dy) > 3)) d.moved = true

  if (d.type === 'pan') {
    panX.value = d.startPan.x + dx
    panY.value = d.startPan.y + dy
  } else if (d.type === 'sys') {
    const cp = toContent(sp.x, sp.y)
    const s  = game.systems[d.id]
    if (s) { s.x = Math.round(cp.x); s.y = Math.round(cp.y) }
  }

  // 추가 모드 미리보기 업데이트
  if (editMode.value && activeTool.value === 'add' && !d.moved) {
    const cp = toContent(sp.x, sp.y)
    if (!sysAt(sp.x, sp.y)) addPreview.value = { x: Math.round(cp.x), y: Math.round(cp.y) }
    else addPreview.value = null
  }
}

function onPtrUp(e) {
  const sp   = toSvg(e.clientX, e.clientY)
  const prev = ds.value
  const wasMoved = prev?.moved
  ds.value = null
  activePointers.delete(e.pointerId)
  addPreview.value = null

  if (wasMoved) return

  // 클릭 처리
  const cp    = toContent(sp.x, sp.y)
  const sys   = sysAt(sp.x, sp.y)
  const fleet = !sys ? fleetAt(cp.x, cp.y) : null

  if (editMode.value) {
    handleEditClick(sys, cp.x, cp.y, e)
  } else {
    if (sys)        game.selectSystem(sys.id)
    else if (fleet) game.selectFleet(fleet.id)
    else            game.selectSystem(null)
  }
}

// ── 휠 줌 ────────────────────────────────────────────────────
function onWheel(e) {
  e.preventDefault()
  const sp = toSvg(e.clientX, e.clientY)
  applyZoom(e.deltaY < 0 ? 1.15 : 1 / 1.15, sp.x, sp.y)
}

// ── 히트 테스트 ──────────────────────────────────────────────
// SVG 뷰포트 좌표로 판정. 패딩 36px(화면 기준) → 패딩 내 가장 가까운 별 반환.
function sysAt(svgX, svgY) {
  const rect = svgEl.value?.getBoundingClientRect()
  const pad  = rect ? 28 * VW / rect.width : 36
  let best = null, bestDist = Infinity
  for (const s of systems.value) {
    const sx = s.x * scale.value + panX.value
    const sy = s.y * scale.value + panY.value
    const r  = nr(s) * scale.value + pad
    const dx = svgX - sx, dy = svgY - sy
    if (Math.abs(dx) <= r && Math.abs(dy) <= r) {
      const dist = Math.hypot(dx, dy)
      if (dist < bestDist) { bestDist = dist; best = s }
    }
  }
  return best
}
function fleetAt(cx, cy) {
  return game.allFleets.find(f => {
    const fx = f.sx + 17, fy = f.sy - 11
    return Math.hypot(cx - fx, cy - fy) <= 12
  }) || null
}
// ── 편집 모드 ────────────────────────────────────────────────

const editMode   = ref(false)
const activeTool = ref('move')
const laneFrom   = ref(null)
const addPreview = ref(null)
const addInput   = ref(null)
const addForm    = ref({ visible: false, name: '', sx: 0, sy: 0, cx: 0, cy: 0 })

const TOOLS = [
  { id:'move',   icon:'✥', label:'이동',  hint:'드래그로 성계 위치 변경' },
  { id:'lane',   icon:'⟷', label:'라인',  hint:'성계 두 개 클릭으로 항로 연결/해제' },
  { id:'add',    icon:'＋', label:'추가',  hint:'빈 공간 클릭으로 성계 추가' },
  { id:'delete', icon:'✕', label:'삭제',  hint:'성계·항로 클릭으로 삭제' },
]

function toggleEditMode() {
  editMode.value = !editMode.value
  if (!editMode.value) { laneFrom.value = null; cancelAdd() }
  activeTool.value = 'move'
}

function handleEditClick(sys, cx, cy, e) {
  const tool = activeTool.value
  if (tool === 'move') {
    // 클릭만으로는 아무것도 안함 (드래그가 이동)
    return
  }
  if (tool === 'lane') {
    if (!sys) { laneFrom.value = null; return }
    if (!laneFrom.value) {
      laneFrom.value = sys.id
    } else {
      if (laneFrom.value !== sys.id) toggleLane(laneFrom.value, sys.id)
      laneFrom.value = null
    }
    return
  }
  if (tool === 'add') {
    if (sys) return
    const rect = svgEl.value.getBoundingClientRect()
    addForm.value = {
      visible: true, name: '',
      sx: Math.min(e.clientX - rect.left + 10, rect.width  - 160),
      sy: Math.min(e.clientY - rect.top  + 10, rect.height - 100),
      cx: Math.round(cx), cy: Math.round(cy),
    }
    nextTick(() => addInput.value?.focus())
    return
  }
  if (tool === 'delete') {
    if (sys) {
      game.removeSystem(sys.id)
      laneKeySet.value = new Set([...laneKeySet.value].filter(k => !k.split('|').includes(sys.id)))
    } else {
      const key = laneNear(cx, cy)
      if (key) laneKeySet.value = new Set([...laneKeySet.value].filter(k => k !== key))
    }
  }
}

function confirmAdd() {
  const name = addForm.value.name.trim()
  if (!name) return
  game.addSystem(name, addForm.value.cx, addForm.value.cy)
  cancelAdd()
}
function cancelAdd() {
  addForm.value = { visible: false, name: '', sx: 0, sy: 0, cx: 0, cy: 0 }
}

// ── 라인 관리 ────────────────────────────────────────────────
function laneKey(a, b) { return [a, b].sort().join('|') }

const laneTypeMap = Object.fromEntries(game.lanes.map(l => [laneKey(l.stars[0], l.stars[1]), l.type]))
const laneKeySet  = ref(new Set(game.lanes.map(l => laneKey(l.stars[0], l.stars[1]))))

const LANE_STROKE = {
  corridor: 'rgba(100,200,255,0.55)',
  phezzan:  'rgba(212,170,96,0.60)',
  normal:   'rgba(255,255,255,0.35)',
}

function toggleLane(a, b) {
  const k  = laneKey(a, b)
  const ns = new Set(laneKeySet.value)
  if (ns.has(k)) ns.delete(k); else ns.add(k)
  laneKeySet.value = ns
}

// ── 보로노이 영역 ─────────────────────────────────────────────
// 팬텀 포인트 간격 — 값이 작을수록 끄트머리 셀이 타이트해짐
const GHOST_STEP = 80

const voronoiData = computed(() => {
  const sysList = Object.values(game.systems)
  if (sysList.length < 2) return { cells: [], internalEdges: [], borderEdges: [] }

  // 격자 팬텀 포인트 (셀 최대 크기 제한용)
  const ghosts = []
  for (let gx = 0; gx <= VW; gx += GHOST_STEP)
    for (let gy = 0; gy <= VH; gy += GHOST_STEP)
      ghosts.push({ x: gx, y: gy, faction: null })

  const nReal  = sysList.length
  const allPts = [...sysList, ...ghosts]

  const delaunay = Delaunay.from(allPts, s => s.x, s => s.y)
  const voronoi  = delaunay.voronoi([0, 0, VW, VH])
  const OFFSET   = 2.5

  // 팬텀: 가장 가까운 실제 성계의 세력 상속 (동일 국가 사이 빈 틈 제거)
  for (let g = nReal; g < allPts.length; g++) {
    let minD = Infinity, nf = null
    for (let r = 0; r < nReal; r++) {
      const dx = allPts[g].x - allPts[r].x
      const dy = allPts[g].y - allPts[r].y
      const d  = dx * dx + dy * dy
      if (d < minD) { minD = d; nf = allPts[r].faction || null }
    }
    allPts[g].faction = nf
  }

  // 세력별 경로 병합 → 단일 <path>로 안티앨리어싱 틈 없이 렌더링
  const factionPathMap = {}
  for (let i = 0; i < allPts.length; i++) {
    const f = allPts[i].faction
    if (!f) continue
    if (!factionPathMap[f]) factionPathMap[f] = []
    factionPathMap[f].push(voronoi.renderCell(i))
  }
  const cells = Object.entries(factionPathMap).map(([faction, paths]) => ({
    id:      `f_${faction}`,
    path:    paths.join(' '),
    faction,
  }))

  const internalEdges = []
  const borderEdges   = []

  for (let e = 0; e < delaunay.halfedges.length; e++) {
    const opp = delaunay.halfedges[e]
    if (opp < 0 || e > opp) continue

    const i = delaunay.triangles[e]
    const j = delaunay.triangles[opp]
    // 팬텀 포인트 연결은 경계선 계산 제외
    if (i >= nReal || j >= nReal) continue

    const fA = allPts[i]?.faction || null
    const fB = allPts[j]?.faction || null

    const c1 = Math.floor(e   / 3) * 2
    const c2 = Math.floor(opp / 3) * 2
    const x1 = voronoi.circumcenters[c1],     y1 = voronoi.circumcenters[c1 + 1]
    const x2 = voronoi.circumcenters[c2],     y2 = voronoi.circumcenters[c2 + 1]
    const dx = x2 - x1, dy = y2 - y1
    const len = Math.hypot(dx, dy)
    if (len < 0.5) continue

    if (fA && fB && fA !== fB) {
      const nx = -dy / len * OFFSET, ny = dx / len * OFFSET
      borderEdges.push({
        ax1: x1 + nx, ay1: y1 + ny, ax2: x2 + nx, ay2: y2 + ny,
        bx1: x1 - nx, by1: y1 - ny, bx2: x2 - nx, by2: y2 - ny,
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

// 비경계 항로 (같은 세력 or 중립 포함)
const normalLanesComp = computed(() => {
  return [...laneKeySet.value].map(k => {
    const [a, b] = k.split('|')
    const sa = game.systems[a], sb = game.systems[b]
    if (!sa || !sb) return null
    const type = laneTypeMap[k] || 'normal'
    return { k, type, x1: sa.x, y1: sa.y, x2: sb.x, y2: sb.y }
  }).filter(Boolean)
})

// 국경 항로 — 3중 금선용
const borderLanes = computed(() => {
  return [...laneKeySet.value].map(k => {
    const [a, b] = k.split('|')
    const sa = game.systems[a], sb = game.systems[b]
    if (!sa || !sb) return null
    if (!sa.faction || !sb.faction || sa.faction === sb.faction) return null
    const dx = sb.x - sa.x, dy = sb.y - sa.y
    const len = Math.hypot(dx, dy)
    if (len < 1) return null
    const px = -dy / len, py = dx / len  // 수직 단위벡터
    return {
      k,
      segs: [-10, 0, 10].map(o => ({
        x1: sa.x + px * o, y1: sa.y + py * o,
        x2: sb.x + px * o, y2: sb.y + py * o,
      }))
    }
  }).filter(Boolean)
})

// 하위 호환 (edit 모드 delete 등에서 사용)
const lanesComp = computed(() => {
  return [...laneKeySet.value].map(k => {
    const [a, b] = k.split('|')
    const sa = game.systems[a], sb = game.systems[b]
    if (!sa || !sb) return null
    const type = laneTypeMap[k] || 'normal'
    return { k, type, x1: sa.x, y1: sa.y, x2: sb.x, y2: sb.y }
  }).filter(Boolean)
})

// ── 기존 헬퍼 ────────────────────────────────────────────────
const fclr    = computed(() => game.fColors)
const systems = computed(() =>
  Object.values(game.systems).map(s => ({
    ...s,
    displayName: Array.isArray(s.name)
      ? (s.name.find(e => e.code === lang.value)?.context ?? s.name[0]?.context ?? s.id)
      : (s.name ?? s.id),
  }))
)

// 라벨 페이드: 줌아웃 시 서서히 사라짐
// scale 0.75 이하에서 fade 시작, 0.55 이하에서 완전 소멸
const LABEL_FADE_IN  = 0.75
const LABEL_FADE_OUT = 0.55
const labelOpacity = computed(() =>
  Math.max(0, Math.min(1, (scale.value - LABEL_FADE_OUT) / (LABEL_FADE_IN - LABEL_FADE_OUT)))
)


function nr(s) {
  if (s.type === 'capital')  return 16
  if (s.type === 'fortress') return 13
  if (s.isGateway)           return 14
  return 10
}
// 시각적 원 반지름 (이미지 대체 전 임시 흰 원)
function vr(s) {
  if (s.type === 'capital')  return 7
  if (s.type === 'fortress') return 5
  if (s.isGateway)           return 5
  return 4
}

// ── 별/성운 배경 ──────────────────────────────────────────────
function updateSvgW() { svgW.value = svgEl.value?.getBoundingClientRect().width || 0 }

onMounted(() => {
  svgEl.value.addEventListener('wheel', onWheel, { passive: false })
  updateSvgW()
  window.addEventListener('resize', updateSvgW)

  const c = bgCvs.value
  if (!c) return
  const ctx = c.getContext('2d')
  let w = c.width = c.offsetWidth || 820
  let h = c.height = c.offsetHeight || 490
  const stars = Array.from({ length: 420 }, () => ({
    x: Math.random()*w, y: Math.random()*h,
    r: Math.random()*.9+.1, tw: Math.random()*Math.PI*2, sp: Math.random()*.15+.02,
  }))
  const nebs = Array.from({ length: 3 }, () => ({
    x: Math.random()*w, y: Math.random()*h, r: 70+Math.random()*100,
    cl: ['rgba(41,128,185,','rgba(192,57,43,','rgba(80,40,140,'][Math.floor(Math.random()*3)],
  }))
  function draw() {
    ctx.fillStyle = '#020508'; ctx.fillRect(0, 0, w, h)
    nebs.forEach(n => {
      const g = ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,n.r)
      g.addColorStop(0, `${n.cl}0.05)`); g.addColorStop(1, `${n.cl}0)`)
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(n.x,n.y,n.r,0,Math.PI*2); ctx.fill()
    })
    stars.forEach(s => {
      s.tw += .01; s.x -= s.sp; if (s.x < 0) { s.x = w; s.y = Math.random()*h }
      ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2)
      ctx.fillStyle = `rgba(200,220,255,${.1+Math.sin(s.tw)*.2})`; ctx.fill()
    })
    aid = requestAnimationFrame(draw)
  }
  draw()
})

onUnmounted(() => {
  cancelAnimationFrame(aid)
  svgEl.value?.removeEventListener('wheel', onWheel)
  window.removeEventListener('resize', updateSvgW)
})
</script>

<style scoped>
.map-wrap { position:relative; flex:1; overflow:hidden; background:var(--bg) }
.map-bg   { position:absolute; inset:0; width:100%; height:100% }
.map-svg  { position:absolute; inset:0; width:100%; height:100%; touch-action:none; user-select:none }
.sys-node { cursor:pointer }
.sys-lbl  { pointer-events:none; font-family:var(--font-sans) }
.fleet-dot         { cursor:pointer }
.fleet-dot.sel circle { stroke-width:2.5 }

/* 편집 모드 커서 */
.is-edit.tool-move   { cursor:move }
.is-edit.tool-lane   { cursor:crosshair }
.is-edit.tool-add    { cursor:cell }
.is-edit.tool-delete { cursor:not-allowed }

/* 줌 컨트롤 */
.zoom-ctrl {
  position:absolute; bottom:10px; right:10px;
  display:flex; flex-direction:column; gap:4px; z-index:10;
}
.zb {
  width:28px; height:28px;
  background:rgba(10,16,24,.85); border:1px solid var(--bd);
  color:var(--t2); border-radius:5px; cursor:pointer; font-size:14px;
  display:flex; align-items:center; justify-content:center;
  transition:border-color .15s, color .15s;
}
.zb:hover, .zb.active { border-color:var(--fc); color:var(--fc) }
.zb-sep { height:4px }

/* 편집 툴바 */
.edit-tb {
  position:absolute; top:10px; left:50%; transform:translateX(-50%);
  display:flex; gap:4px; z-index:10;
  background:rgba(8,12,20,.88); border:1px solid var(--bd);
  border-radius:8px; padding:5px 7px;
}
.tb-btn {
  display:flex; align-items:center; gap:4px;
  padding:4px 10px; border-radius:5px;
  background:transparent; border:1px solid transparent;
  color:var(--t3); cursor:pointer; font-size:12px;
  transition:all .15s;
}
.tb-btn:hover  { border-color:var(--bd); color:var(--t1) }
.tb-btn.active { background:var(--bg4); border-color:var(--fc); color:var(--fc) }
.tb-icon { font-size:14px }
.tb-lbl  { font-size:11px }

/* 성계 추가 폼 */
.add-form {
  position:absolute; z-index:20;
  padding:10px 12px; min-width:150px;
}
.af-title { font-size:11px; color:var(--t3); margin-bottom:6px }
.af-input {
  width:100%; padding:5px 7px; font-size:12px;
  background:var(--bg3); border:1px solid var(--bd); border-radius:4px;
  color:var(--t1); outline:none; margin-bottom:7px;
}
.af-input:focus { border-color:var(--fc) }
.af-btns { display:flex; gap:6px }

/* 날짜 */
.map-date {
  position: absolute; top: 10px; right: 10px;
  padding: 7px 12px;
}

/* 범례 */
.map-legend {
  position:absolute; bottom:10px; left:10px;
  padding:7px 11px; display:flex; flex-direction:column; gap:4px;
  pointer-events:none; z-index:130;
}
.leg-row { display:flex; align-items:center; gap:6px }
.leg-dot { width:7px; height:7px; border-radius:50%; flex-shrink:0; display:inline-block }

@keyframes pulse { 0%,100%{opacity:.5} 50%{opacity:1} }
.sel-ring { animation:pulse 1.5s ease-in-out infinite }

.border-line { animation: border-pulse 2.5s ease-in-out infinite }
@keyframes border-pulse { 0%,100%{opacity:.7} 50%{opacity:1} }

/* 국경 3중 금선 */
.bline { fill:none; stroke:rgba(212,170,96,0.8); }
.bl-1  { stroke-width:1.5; stroke-dasharray:10 5;  animation:bflow 2.5s linear infinite; }
.bl-2  { stroke-width:1;   stroke-dasharray:5 10;  animation:bflow 3.8s linear infinite reverse; opacity:.6; }
.bl-3  { stroke-width:2;   stroke-dasharray:14 3;  animation:bflow 2.0s linear infinite; opacity:.45; }
@keyframes bflow { to { stroke-dashoffset:-96; } }

.tb-fade-enter-active, .tb-fade-leave-active { transition:opacity .2s, transform .2s }
.tb-fade-enter-from, .tb-fade-leave-to { opacity:0; transform:translateX(-50%) translateY(-6px) }
</style>
