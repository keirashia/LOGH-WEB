<template>
  <div class="tl-wrap">
    <div class="tl-header">
      <span class="serif gold" style="font-size:12px;letter-spacing:1px">역사 타임라인</span>
    </div>

    <button class="tl-jump"
            :disabled="centerIdx === 0"
            @click="jumpBy(-5)">▲</button>

    <div
      ref="sliderRef"
      class="tl-slider"
      :class="{ grabbing: isDragging }"
      @mousedown="onDragStart"
      @mousemove="onDragMove"
      @mouseup="onDragEnd"
      @mouseleave="onDragEnd"
      @touchstart.passive="onDragStart"
      @touchmove.prevent="onDragMove"
      @touchend="onDragEnd"
      @wheel.prevent="onWheel"
    >
      <div ref="trackRef" class="tl-track">
        <button
          v-for="(yr, i) in yearGroups"
          :key="`${yr.yearType}_${yr.year}`"
          class="yr-card"
          :class="{
            'is-center': i === centerIdx,
            'is-near':   Math.abs(i - centerIdx) === 1,
            'is-far':    Math.abs(i - centerIdx) === 2,
          }"
          :style="{ height: itemH + 'px' }"
          draggable="false"
          @click="handleCard(i)"
        >
          <div class="yr-dot" :style="dotStyle(yr)" />
          <span class="yr-label mono">{{ yr.yearType }} {{ yr.year }}</span>
        </button>
      </div>
    </div>

    <button class="tl-jump"
            :disabled="centerIdx >= yearGroups.length - 1"
            @click="jumpBy(5)">▼</button>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'

const ERA_COLORS = { AD: '#4488FF', SE: 'var(--tg)', RC: '#CC4444' }

const props = defineProps({
  yearGroups:  { type: Array,  required: true },
  selYear:     { type: Number, default: null },
  selYearType: { type: String, default: null },
})

const emit = defineEmits(['select'])

const sliderRef  = ref(null)
const trackRef   = ref(null)
const isDragging = ref(false)
const centerIdx  = ref(0)
const itemH      = ref(60)

let offsetY      = 0
let startY       = 0
let dragDist     = 0
let raf          = null
let pendingDelta = 0
let wheelLocked  = false

function updateItemH() {
  if (!sliderRef.value) return
  const h = sliderRef.value.offsetHeight / 5
  if (h > 0) itemH.value = h
}

function cardH()     { return itemH.value }
function centerOf(i) { return (2 - i) * cardH() }
function minOffset() { return centerOf(props.yearGroups.length - 1) }
function maxOffset() { return centerOf(0) }
function clamp(val)  { return Math.max(minOffset(), Math.min(maxOffset(), val)) }

function applyOffset(val, animate = false) {
  offsetY = clamp(val)
  if (!trackRef.value) return
  trackRef.value.style.transition = animate ? 'transform 0.34s cubic-bezier(.25,.8,.25,1)' : 'none'
  trackRef.value.style.transform  = `translateY(${offsetY}px)`
}

function goToCard(i, animate = true) {
  centerIdx.value = i
  applyOffset(centerOf(i), animate)
}

function snapNearest(val) {
  let best = 0, bestDist = Infinity
  for (let i = 0; i < props.yearGroups.length; i++) {
    const d = Math.abs(val - centerOf(i))
    if (d < bestDist) { bestDist = d; best = i }
  }
  return best
}

function py(e) { return e.touches ? e.touches[0].clientY : e.clientY }

function onDragStart(e) {
  isDragging.value = true
  dragDist = 0
  startY = py(e)
  pendingDelta = 0
  if (raf) { cancelAnimationFrame(raf); raf = null }
  if (trackRef.value) trackRef.value.style.transition = 'none'
}

function onDragMove(e) {
  if (!isDragging.value) return
  const y      = py(e)
  const delta  = y - startY
  dragDist    += Math.abs(delta)
  startY       = y
  pendingDelta += delta
  if (raf) return
  raf = requestAnimationFrame(() => {
    applyOffset(clamp(offsetY + pendingDelta))
    pendingDelta = 0
    raf = null
  })
}

function onDragEnd() {
  if (!isDragging.value) return
  isDragging.value = false
  if (raf) { cancelAnimationFrame(raf); raf = null }
  if (dragDist < 5) return
  const best = snapNearest(offsetY)
  goToCard(best)
  emit('select', props.yearGroups[best].year, props.yearGroups[best].yearType)
}

function onWheel(e) {
  if (wheelLocked) return
  const next = centerIdx.value + (e.deltaY > 0 ? 1 : -1)
  if (next < 0 || next >= props.yearGroups.length) return
  goToCard(next)
  emit('select', props.yearGroups[next].year, props.yearGroups[next].yearType)
  wheelLocked = true
  setTimeout(() => { wheelLocked = false }, 300)
}

function jumpBy(delta) {
  const next = Math.max(0, Math.min(props.yearGroups.length - 1, centerIdx.value + delta))
  if (next === centerIdx.value) return
  goToCard(next)
  emit('select', props.yearGroups[next].year, props.yearGroups[next].yearType)
}

function handleCard(i) {
  if (dragDist > 5) return
  goToCard(i)
  emit('select', props.yearGroups[i].year, props.yearGroups[i].yearType)
}

function onResize() {
  updateItemH()
  applyOffset(centerOf(centerIdx.value))
}

function dotSz(count) { return Math.max(6, Math.min(12, 4 + count * 0.8)) }

function dotStyle(yr) {
  const sz    = dotSz(yr.count)
  const color = ERA_COLORS[yr.yearType] ?? 'var(--t2)'
  return {
    width:        sz + 'px',
    height:       sz + 'px',
    borderRadius: '50%',
    flexShrink:   '0',
    background:   yr.hasPlayable ? color : 'transparent',
    border:       `1.5px solid ${color}`,
    transition:   'background .3s, border-color .3s',
  }
}

watch([() => props.selYear, () => props.selYearType], ([year, yearType]) => {
  if (year === null) return
  const idx = props.yearGroups.findIndex(y => y.year === year && y.yearType === yearType)
  if (idx !== -1 && idx !== centerIdx.value) goToCard(idx)
})

onMounted(() => {
  addEventListener('resize', onResize)
  if (!props.yearGroups.length) return
  const target = props.yearGroups.find(y => y.yearType === 'SE' && y.year === 796)
             ?? props.yearGroups.find(y => y.yearType === 'SE')
             ?? props.yearGroups[props.yearGroups.length - 1]
  if (!target) return
  const idx = props.yearGroups.indexOf(target)
  centerIdx.value = idx
  emit('select', target.year, target.yearType)
  requestAnimationFrame(() => {
    updateItemH()
    applyOffset(centerOf(idx))
  })
})

onUnmounted(() => removeEventListener('resize', onResize))
</script>

<style scoped>
.tl-wrap {
  width: 25vw; min-width: 140px; max-width: 220px;
  background: linear-gradient(165deg, #0d1b2a 0%, #0d1520 100%);
  border: 1px solid rgba(212,170,96,.45); border-radius: 12px;
  box-shadow: inset 0 0 0 3px #0d1520, inset 0 0 0 5px rgba(212,170,96,.12);
  display: flex; flex-direction: column; overflow: hidden; flex-shrink: 0;
}

.tl-header {
  padding: 12px 14px 8px; border-bottom: 1px solid rgba(212,170,96,.2);
  flex-shrink: 0;
}

.tl-slider {
  flex: 1; position: relative;
  overflow: hidden; cursor: grab; user-select: none;
}
.tl-slider.grabbing { cursor: grabbing; }

.tl-track {
  position: absolute; left: 0; right: 0; top: 0;
  display: flex; flex-direction: column;
  will-change: transform;
}

/* ── 점프 버튼 ───────────────────────────────────────────── */
.tl-jump {
  flex-shrink: 0; width: 100%; padding: 5px 0;
  display: flex; align-items: center; justify-content: center;
  background: transparent; border: none; border-top: 1px solid rgba(212,170,96,.1);
  color: rgba(212,170,96,.35); font-size: 10px;
  cursor: pointer; transition: color .15s, background .15s;
}
.tl-jump:first-of-type { border-top: none; border-bottom: 1px solid rgba(212,170,96,.1); }
.tl-jump:hover:not(:disabled) { color: var(--tg); background: rgba(212,170,96,.04); }
.tl-jump:disabled { opacity: .2; cursor: default; }

/* ── 카드 ────────────────────────────────────────────────── */
.yr-card {
  flex-shrink: 0; width: 100%;
  display: flex; align-items: center; gap: 10px; padding: 0 14px;
  background: transparent; border: none;
  border-left: 2px solid transparent;
  cursor: pointer; text-align: left; color: var(--t1);
  transition: opacity .2s, border-color .2s, background .2s;
  opacity: 0.28;
}
.yr-card.is-far    { opacity: 0.48; }
.yr-card.is-near   { opacity: 0.72; border-left-color: rgba(212,170,96,.25); }
.yr-card.is-center {
  opacity: 1;
  border-left-color: var(--tg);
  background: rgba(212,170,96,.07);
}
.yr-card:hover:not(.is-center) { opacity: 0.85; }

.yr-label {
  flex: 1; font-size: 13px; letter-spacing: .5px; transition: color .2s;
}
.yr-card.is-center .yr-label { color: var(--tg); font-size: 14px; }
</style>
