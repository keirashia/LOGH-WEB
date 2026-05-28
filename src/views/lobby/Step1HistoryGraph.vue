<template>
  <div class="sc-layout">

    <!-- 왼쪽: 수직 타임라인 -->
    <div class="graph-panel">
      <div class="graph-panel-header">
        <span class="serif gold" style="font-size:12px;letter-spacing:1px">역사 타임라인</span>
        <span class="mono dim" style="font-size:9px;margin-top:3px">드래그: 이동 · 스크롤: 확대</span>
      </div>

      <div class="graph-track"
           ref="trackRef"
           @mousedown.prevent="startDrag"
           @wheel.prevent="onWheel">

        <!-- 수직 중심선 -->
        <div class="v-line"></div>

        <!-- 연도 핀 (수직) -->
        <div v-for="yr in visibleYears" :key="yr.year"
             class="year-pin"
             :class="{ selected: selYear === yr.year }"
             :style="{ top: viewPct(yr.densPos) + '%' }"
             @click.stop="selectYear(yr.year)">

          <div class="pin-label mono" :class="{ invisible: !showLabel(yr) }">
            SE {{ yr.year }}
          </div>

          <div class="pin-dot"
               :style="{
                 width:  dotSz(yr.count) + 'px',
                 height: dotSz(yr.count) + 'px',
               }">
          </div>
        </div>
      </div>
    </div>

    <!-- 오른쪽: 사건 목록 -->
    <div class="info-panel">

      <div class="info-header">
        <template v-if="selYear">
          <span class="serif gold" style="font-size:17px">SE {{ selYear }}년</span>
          <span class="mono dim" style="font-size:11px;margin-left:8px">/ 제국력 {{ selYear - 309 }}년</span>
          <span class="mono" style="font-size:11px;margin-left:auto">{{ selEvents.length }}건의 사건</span>
        </template>
        <template v-else>
          <span class="dim" style="font-size:13px">연도를 선택하세요</span>
        </template>
      </div>

      <div class="event-list">
        <template v-if="selYear">
          <button v-for="evt in selEvents" :key="evt.id"
                  class="event-card"
                  :class="{ selected: selEvt?.id === evt.id, unimpl: !evt.scenarioId }"
                  @click="selEvt = evt">

            <div class="card-top">
              <div class="tag-row">
                <span v-for="tag in evt.tags" :key="tag"
                      class="evt-tag mono"
                      :style="{ color: TAG_COLORS[tag] ?? 'var(--t2)' }">{{ tag }}</span>
              </div>
              <div class="card-meta mono dim">
                <span v-if="evt.month">{{ evt.month }}월</span>
                <span v-if="evt.scenarioId" class="star-mark">★</span>
              </div>
            </div>

            <div class="card-name serif">{{ evt.name }}</div>
            <div class="card-desc dim" v-if="evt.desc">{{ evt.desc }}</div>
            <div class="card-na mono dim" v-if="!evt.scenarioId">구현 예정</div>
          </button>

          <div v-if="selEvents.length === 0" class="no-events dim serif">
            이 연도에 등록된 사건이 없습니다
          </div>
        </template>

        <div v-else class="no-events dim serif">
          왼쪽 타임라인에서 연도를 선택하세요
        </div>
      </div>

      <!-- 하단 네비 -->
      <div class="step-nav">
        <button class="btn" @click="$router.push('/lobby/single')">← 뒤로</button>
        <button class="btn btn-gold"
                :disabled="!selEvt || !selEvt.scenarioId"
                @click="$emit('select', selEvt)">
          다음 →
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { EVENTS } from '@/data/scenarios/eventData.js'

defineEmits(['select'])

const TAG_COLORS = {
  '사실':   '#4488FF',
  '가상':   '#8844CC',
  '택틱스': '#CC6622',
  '전투':   '#4488FF',
  '분기점': '#CC6622',
}

// ── 연도별 사건 집계 + 밀도 좌표 ──────────────────────────────
const yearGroups = computed(() => {
  const m = {}
  EVENTS.forEach(e => {
    if (!m[e.year]) m[e.year] = { year: e.year, count: 0 }
    m[e.year].count++
  })
  const sorted = Object.values(m).sort((a, b) => a.year - b.year)
  const total  = sorted.reduce((s, y) => s + y.count, 0)
  let cum = 0
  return sorted.map(y => {
    const densPos = (cum + y.count / 2) / total * 100
    cum += y.count
    return { ...y, densPos }
  })
})

// ── 뷰 상태: 밀도 좌표 [ds, de] (0~100) ──────────────────────
const ds       = ref(0)
const de       = ref(100)
const selYear  = ref(796)
const selEvt   = ref(null)
const trackRef = ref(null)

// 밀도 좌표 → 뷰 내 비율(%)
function viewPct(densPos) {
  const span = de.value - ds.value
  if (span <= 0) return 50
  return Math.max(0.5, Math.min(99.5, (densPos - ds.value) / span * 100))
}

// 뷰 범위 안의 연도만 렌더링
const visibleYears = computed(() => {
  const pad = (de.value - ds.value) * 0.05
  return yearGroups.value.filter(y =>
    y.densPos >= ds.value - pad && y.densPos <= de.value + pad
  )
})

// ── 라벨 겹침 방지 (세로 기준) ────────────────────────────────
const MIN_GAP_PCT = 8

const labelSet = computed(() => {
  const visible = new Set()
  let lastPct = -Infinity
  for (const yr of visibleYears.value) {
    const p = viewPct(yr.densPos)
    if (p < 0 || p > 100) continue
    if (p - lastPct >= MIN_GAP_PCT) {
      visible.add(yr.year)
      lastPct = p
    }
  }
  return visible
})

function showLabel(yr) {
  return labelSet.value.has(yr.year)
}

// ── 점 크기 ────────────────────────────────────────────────────
function dotSz(count) {
  return Math.max(5, Math.min(14, 4 + count * 0.9))
}

// ── 연도 선택 ─────────────────────────────────────────────────
function selectYear(year) {
  selYear.value = year
  selEvt.value  = null
}

// ── 드래그 (상하 이동) ─────────────────────────────────────────
let dy0 = 0, ds0 = 0, de0 = 0

function startDrag(e) {
  dy0 = e.clientY
  ds0 = ds.value
  de0 = de.value

  function onMove(ev) {
    if (!trackRef.value) return
    const span  = de0 - ds0
    const delta = -((ev.clientY - dy0) / trackRef.value.offsetHeight) * span
    let ns = ds0 + delta
    let ne = de0 + delta
    if (ns < 0)   { ne -= ns;     ns = 0 }
    if (ne > 100) { ns -= ne-100; ne = 100 }
    ds.value = ns
    de.value = ne
  }

  function onUp() {
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('mouseup',   onUp)
  }
  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseup',   onUp)
}

// ── 휠 (확대/축소) ────────────────────────────────────────────
function onWheel(e) {
  const span    = de.value - ds.value
  const factor  = e.deltaY > 0 ? 1.25 : 0.8
  const newSpan = Math.min(100, Math.max(3, span * factor))
  const rect    = trackRef.value?.getBoundingClientRect()
  const frac    = rect ? Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height)) : 0.5
  const pivot   = ds.value + frac * span

  let ns = pivot - frac * newSpan
  let ne = pivot + (1 - frac) * newSpan
  if (ns < 0)   { ne -= ns;     ns = 0 }
  if (ne > 100) { ns -= ne-100; ne = 100 }
  ds.value = Math.max(0, ns)
  de.value = Math.min(100, ne)
}

// ── 선택된 연도의 사건 목록 ───────────────────────────────────
const selEvents = computed(() =>
  selYear.value ? EVENTS.filter(e => e.year === selYear.value) : []
)
</script>

<style scoped>
/* ── 전체 레이아웃 ─────────────────────────────────────────── */
.sc-layout {
  flex: 1;
  display: flex;
  overflow: hidden;
}

/* ── 왼쪽: 그래프 패널 ────────────────────────────────────── */
.graph-panel {
  width: 25vw;
  min-width: 140px;
  max-width: 220px;
  background: var(--bg2);
  border-right: 1px solid var(--bd);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex-shrink: 0;
}

.graph-panel-header {
  padding: 12px 14px 8px;
  border-bottom: 1px solid var(--bd);
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
}

.graph-track {
  flex: 1;
  position: relative;
  cursor: grab;
  user-select: none;
  overflow: hidden;
}
.graph-track:active { cursor: grabbing; }

/* 수직 중심선 */
.v-line {
  position: absolute;
  left: 50%; top: 0; bottom: 0;
  width: 1px;
  background: var(--bd);
  transform: translateX(-50%);
}

/* 연도 핀 (수직) */
.year-pin {
  position: absolute;
  left: 0; right: 0;
  height: 0;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 1;
}

.pin-label {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 10px;
  color: var(--t2);
  white-space: nowrap;
  transition: color .15s;
}

.pin-dot {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: var(--t2);
  transition: all .15s;
}

.invisible { opacity: 0; pointer-events: none; }

.year-pin:hover .pin-dot,
.year-pin.selected .pin-dot {
  background: var(--tg);
  box-shadow: 0 0 7px var(--tg);
}
.year-pin:hover .pin-label,
.year-pin.selected .pin-label {
  color: var(--tg);
  opacity: 1;
}

/* ── 오른쪽: 정보 패널 ────────────────────────────────────── */
.info-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.info-header {
  padding: 14px 18px;
  border-bottom: 1px solid var(--bd);
  flex-shrink: 0;
  display: flex;
  align-items: baseline;
  min-height: 52px;
}

/* 사건 목록 */
.event-list {
  flex: 1;
  overflow-y: auto;
  padding: 10px 14px;
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.event-card {
  text-align: left; width: 100%;
  padding: 11px 14px;
  background: var(--bg3); border: 1px solid var(--bd); border-radius: var(--r);
  cursor: pointer; transition: all .15s;
  display: flex; flex-direction: column; gap: 5px;
}
.event-card:hover   { background: var(--bgh); }
.event-card.selected {
  border-color: var(--tg); background: rgba(212,170,96,.07);
}
.event-card.unimpl  { opacity: .55; cursor: default; }
.event-card.unimpl:hover { background: var(--bg3); }

.card-top  { display: flex; justify-content: space-between; align-items: center; }
.tag-row   { display: flex; gap: 6px; }
.evt-tag   { font-size: 10px; letter-spacing: .5px; }
.card-meta { font-size: 10px; display: flex; gap: 6px; align-items: center; }
.star-mark { color: var(--tg); font-size: 11px; }
.card-name { font-size: 14px; color: var(--t1); }
.card-desc { font-size: 11px; line-height: 1.6; }
.card-na   { font-size: 10px; letter-spacing: .5px; }

.no-events {
  padding: 40px; text-align: center; font-size: 13px;
}

/* 네비 */
.step-nav {
  display: flex; justify-content: space-between; align-items: center;
  flex-shrink: 0; padding: 10px 14px;
  border-top: 1px solid var(--bd);
}
</style>
