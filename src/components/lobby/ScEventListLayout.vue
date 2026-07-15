<template>
  <div class="info-panel">

    <div class="info-header">
      <template v-if="selYear !== null">
        <button class="nav-arrow" :disabled="!prevPlayable" @click="emit('navigate', prevPlayable)">
          <span class="arr-sym">‹</span>
          <span class="arr-name mono">{{ prevPlayable ? scName(prevPlayable) : '🔒' }}</span>
        </button>
        <div class="year-info">
          <span class="serif gold" style="font-size:22px">{{ selYearType }} {{ selYear }}년</span>
          <span v-if="selYearType === 'SE'" class="mono dim" style="font-size:13px;margin-left:10px">/ 제국력 {{ selYear - 309 }}년</span>
        </div>
        <button class="nav-arrow nav-arrow-r" :disabled="!nextPlayable" @click="emit('navigate', nextPlayable)">
          <span class="arr-sym">›</span>
          <span class="arr-name mono">{{ nextPlayable ? scName(nextPlayable) : '🔒' }}</span>
        </button>
      </template>
      <template v-else>
        <span class="dim" style="font-size:13px">연도를 선택하세요</span>
      </template>
    </div>

    <div class="sc-slider-wrap">
      <div v-if="selYear === null || events.length === 0" class="no-events dim serif">
        {{ selYear === null ? '왼쪽 타임라인에서 연도를 선택하세요' : '이 연도에 등록된 사건이 없습니다' }}
      </div>
      <template v-else>
        <div
          ref="sliderRef"
          class="sc-slider"
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
          <div ref="trackRef" class="sc-track">
            <button
              v-for="(sc, i) in events"
              :key="sc.id"
              class="sc-card"
              :class="{ lifting: liftingCard === i }"
              draggable="false"
              @click="handleCard(sc, i)"
            >
              <div class="card-corner tl">
                <span class="cc-icon">{{ cardIcon(sc) }}</span>
                <span v-if="sc.month" class="cc-txt mono">{{ sc.month }}월</span>
              </div>
              <div class="card-tags">
                <span
                  v-for="tag in sc.tags" :key="tag"
                  class="evt-tag mono"
                  :style="{ background: TAG_COLORS[tag] ?? 'var(--t2)', borderColor: TAG_COLORS[tag] ?? 'var(--t2)' }"
                >{{ tag }}</span>
              </div>
              <div class="card-body">
                <span class="cb-icon">{{ cardIcon(sc) }}</span>
                <span class="cb-title serif">{{ scName(sc) }}</span>
                <span v-if="scEnName(sc)" class="cb-sub mono">{{ scEnName(sc) }}</span>
              </div>
              <div class="card-corner br">
                <span class="cc-icon">{{ cardIcon(sc) }}</span>
                <span v-if="sc.month" class="cc-txt mono">{{ sc.month }}월</span>
              </div>
            </button>
          </div>
        </div>

        <div class="card-dots">
          <span
            v-for="(sc, i) in events" :key="sc.id"
            class="dot"
            :class="{ active: i === currentCard }"
            @click="goToCard(i)"
          />
        </div>
      </template>
    </div>

    <div class="step-nav">
      <button class="back-btn" @click="emit('back')">
        <span class="back-label mono">뒤로</span>
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { SCENARIOS } from '@/data/scenario/scenarioData.js'
import { useLobbyStore } from '@/stores/lobbyStore'
import { useLang } from '@/composables/useLang'

const lobby = useLobbyStore()
const { lang } = useLang()

function scName(sc)   { return sc?.name?.find(e => e.code === lang.value)?.context ?? '' }
function scEnName(sc) { return sc?.name?.find(e => e.code === 'En')?.context ?? '' }

const TAG_COLORS = {
  '사실':       '#4488FF',
  '가상':       '#8844CC',
  '택틱스':     '#CC6622',
  '전투':       '#4488FF',
  '분기점':     '#CC6622',
  '초심자추천': '#44AA66',
  '숙련자추천': '#CC4444',
}

const props = defineProps({
  selYear:     { type: Number, default: null },
  selYearType: { type: String, default: null },
  events:      { type: Array,  default: () => [] },
  targetScId:  { type: String, default: null },
})

const emit = defineEmits(['select', 'back', 'navigate'])

const sliderRef   = ref(null)
const trackRef    = ref(null)
const isDragging  = ref(false)
const currentCard = ref(0)
const liftingCard = ref(-1)

const currentScGlobalIdx = computed(() => {
  const sc = props.events[currentCard.value]
  if (!sc) return -1
  return SCENARIOS.findIndex(s => s.id === sc.id)
})

const prevPlayable = computed(() => {
  const gIdx = currentScGlobalIdx.value
  if (gIdx === -1) return null
  for (let i = gIdx - 1; i >= 0; i--) {
    if (SCENARIOS[i].useYn && SCENARIOS[i].showYn !== false) return SCENARIOS[i]
  }
  return null
})

const nextPlayable = computed(() => {
  const gIdx = currentScGlobalIdx.value
  if (gIdx === -1) return null
  for (let i = gIdx + 1; i < SCENARIOS.length; i++) {
    if (SCENARIOS[i].useYn && SCENARIOS[i].showYn !== false) return SCENARIOS[i]
  }
  return null
})

function gap() { return window.innerWidth * 0.016 }
let startX       = 0
let offsetX      = 0
let dragDist     = 0
let raf          = null
let pendingDelta = 0
let wheelLocked  = false

function cardIcon(sc) {
  if (sc.tags?.includes('전투'))   return '⚔️'
  if (sc.tags?.includes('분기점')) return '🌀'
  if (sc.tags?.includes('가상'))   return '🔮'
  return '📜'
}

function cardWidth()   { return window.innerHeight * 0.55 * (5 / 7) }
function unitWidth()   { return cardWidth() + gap() }
function sliderWidth() { return sliderRef.value?.offsetWidth ?? window.innerWidth }
function centerOf(i)   { return sliderWidth() / 2 - cardWidth() / 2 - i * unitWidth() }
function minOffset()   { return props.events.length ? centerOf(props.events.length - 1) : 0 }
function maxOffset()   { return props.events.length ? centerOf(0) : 0 }
function clamp(val)    { return Math.max(minOffset(), Math.min(maxOffset(), val)) }

function applyOffset(val, animate = false) {
  offsetX = clamp(val)
  if (!trackRef.value) return
  trackRef.value.style.transition = animate ? 'transform 0.34s cubic-bezier(.25,.8,.25,1)' : 'none'
  trackRef.value.style.transform  = `translate3d(${offsetX}px, 0, 0)`
}

function snapNearest(val) {
  let best = 0, bestDist = Infinity
  for (let i = 0; i < props.events.length; i++) {
    const d = Math.abs(val - centerOf(i))
    if (d < bestDist) { bestDist = d; best = i }
  }
  currentCard.value = best
  return centerOf(best)
}

function goToCard(i) {
  currentCard.value = i
  applyOffset(centerOf(i), true)
}

function px(e) { return e.touches ? e.touches[0].clientX : e.clientX }

function onDragStart(e) {
  isDragging.value = true
  dragDist = 0
  startX = px(e)
  pendingDelta = 0
  if (raf) { cancelAnimationFrame(raf); raf = null }
  if (trackRef.value) trackRef.value.style.transition = 'none'
}

function onDragMove(e) {
  if (!isDragging.value) return
  const x      = px(e)
  const delta  = x - startX
  dragDist    += Math.abs(delta)
  startX       = x
  pendingDelta += delta
  if (raf) return
  raf = requestAnimationFrame(() => {
    applyOffset(offsetX + pendingDelta)
    pendingDelta = 0
    raf = null
  })
}

function onDragEnd() {
  if (!isDragging.value) return
  isDragging.value = false
  if (raf) { cancelAnimationFrame(raf); raf = null }
  if (dragDist < 5) return
  applyOffset(snapNearest(offsetX), true)
}

function onWheel(e) {
  if (wheelLocked) return
  const next = currentCard.value + (e.deltaY > 0 ? 1 : -1)
  if (next < 0 || next >= props.events.length) return
  goToCard(next)
  wheelLocked = true
  setTimeout(() => { wheelLocked = false }, 400)
}

function handleCard(sc, i) {
  if (dragDist > 5) return
  if (i !== currentCard.value) { goToCard(i); return }
  if (liftingCard.value !== -1) return
  if (!lobby.isScenarioUnlocked(sc.id)) return
  liftingCard.value = i
  setTimeout(() => {
    liftingCard.value = -1
    emit('select', sc)
  }, 500)
}

function onResize() { applyOffset(centerOf(currentCard.value)) }

watch(() => props.events, () => {
  liftingCard.value = -1
  const idx = props.targetScId
    ? props.events.findIndex(s => s.id === props.targetScId)
    : -1
  const target = idx !== -1 ? idx : 0
  currentCard.value = target
  nextTick(() => applyOffset(centerOf(target)))
})

watch(() => props.targetScId, (id) => {
  if (!id) return
  const idx = props.events.findIndex(s => s.id === id)
  if (idx !== -1) goToCard(idx)
})

onMounted(() => {
  addEventListener('resize', onResize)
  nextTick(() => applyOffset(centerOf(0)))
})

onUnmounted(() => removeEventListener('resize', onResize))
</script>

<style scoped>
.info-panel {
  flex: 1; display: flex; flex-direction: column; overflow: hidden;
  background: linear-gradient(165deg, #0d1b2a 0%, #0d1520 100%);
  border: 0.1vh solid rgba(212,170,96,.45); border-radius: 1.2vh;
  box-shadow: inset 0 0 0 0.3vh #0d1520, inset 0 0 0 0.5vh rgba(212,170,96,.12);
}

/* ── 헤더 ────────────────────────────────────────────────── */
.info-header {
  padding: 0.8vh 1.4vw; border-bottom: 0.1vh solid rgba(212,170,96,.2);
  flex-shrink: 0; display: flex; align-items: center; gap: 0.8vw; min-height: 5.2vh;
}
.year-info {
  flex: 1; display: flex; align-items: baseline; justify-content: center;
}
.nav-arrow {
  flex: 0 1 15vw; min-width: 4vw; height: 4vh;
  display: flex; align-items: center; gap: 0.6vw; padding: 0 0.8vw; overflow: hidden;
  background: var(--bg3); border: 0.1vh solid var(--bd); border-radius: var(--r);
  color: var(--t1); cursor: pointer; transition: all .13s;
}
.nav-arrow-r { flex-direction: row-reverse; }
.nav-arrow:hover:not(:disabled) { border-color: var(--tg); color: var(--tg); }
.nav-arrow:disabled { opacity: .3; cursor: default; }
.arr-sym  { font-size: 1.8vh; flex-shrink: 0; }
.arr-name { font-size: 2.7vh; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
            color: rgba(212,170,96,.7); letter-spacing: 0.03vw; flex: 1; min-width: 0; }

/* ── 슬라이더 영역 ───────────────────────────────────────── */
.sc-slider-wrap {
  flex: 1; display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 1.2vh;
}
.no-events { padding: 4vh; text-align: center; font-size: 1.4vh; }

.sc-slider {
  width: 100%; overflow-x: clip; overflow-y: visible;
  cursor: grab; user-select: none;
}
.sc-slider.grabbing { cursor: grabbing; }
.sc-track { display: flex; gap: 1.6vw; width: max-content; will-change: transform; }

/* ── 카드 ────────────────────────────────────────────────── */
.sc-card {
  flex-shrink: 0; position: relative;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  width: calc(55vh * 5 / 7); height: 55vh;
  padding: 1.8vh 1.4vw;
  background: linear-gradient(165deg, #0d1b2a 0%, #1a082e 60%, #0d1520 100%);
  border: 0.2vh solid rgba(212,170,96,.8); border-radius: 1.4vh;
  box-shadow:
    inset 0 0 0 0.5vh #0d1520,
    inset 0 0 0 0.7vh rgba(212,170,96,.22),
    0 0.8vh 3.2vh rgba(0,0,0,.85);
  cursor: pointer; transition: transform .2s, box-shadow .2s; overflow: hidden; color: var(--t1);
}
.sc-card::before {
  content: ''; position: absolute; inset: 0;
  background-image:
    repeating-linear-gradient( 45deg, transparent, transparent 1vw, rgba(212,170,96,.025) 1vw, rgba(212,170,96,.025) 1.1vw),
    repeating-linear-gradient(-45deg, transparent, transparent 1vw, rgba(212,170,96,.025) 1vw, rgba(212,170,96,.025) 1.1vw);
  pointer-events: none;
}
.sc-card::after {
  content: ''; position: absolute;
  width: calc(55vh * 5 / 7 * 0.68); height: calc(55vh * 5 / 7 * 0.68);
  border-radius: 50%; border: 0.1vh solid rgba(212,170,96,.1); pointer-events: none;
}
.sc-card:hover:not(.disabled):not(.lifting) {
  box-shadow:
    inset 0 0 0 0.5vh #0d1520,
    inset 0 0 0 0.7vh rgba(212,170,96,.5),
    0 2vh 5.6vh rgba(212,170,96,.2);
  transform: translateY(-0.8vh) scale(1.03);
}
.sc-card.lifting  { animation: card-lift 0.5s ease-in forwards; pointer-events: none; }

@keyframes card-lift {
  0%   { transform: translateY(0)      scale(1);    opacity: 1; }
  40%  { transform: translateY(-3.2vh) scale(1.06); opacity: 1; }
  100% { transform: translateY(-12vh)  scale(1.1);  opacity: 0; }
}

/* ── 코너 라벨 ───────────────────────────────────────────── */
.card-corner { position: absolute; display: flex; flex-direction: column; align-items: center; gap: 0.3vh; z-index: 2; }
.card-corner.tl { top: 1.4vh; left: 1.6vw; }
.card-corner.br { bottom: 1.4vh; right: 1.6vw; transform: rotate(180deg); }
.cc-icon { font-size: 3.2vh; line-height: 1; }
.cc-txt  { font-size: 1.8vh; color: rgba(212,170,96,.65); letter-spacing: .1vw; }

/* ── 카드 중앙 본문 ──────────────────────────────────────── */
.card-body {
  display: flex; flex-direction: column; align-items: center;
  gap: 1.5vh; z-index: 2; pointer-events: none;
  max-width: 82%; text-align: center;
}
.cb-icon  { font-size: 8vh; }
.cb-title { font-size: 3.4vh; letter-spacing: .2vw; color: var(--tg); text-shadow: 0 0 2vh rgba(212,170,96,.6); line-height: 1.3; }
.cb-sub   { font-size: 1.7vh; letter-spacing: .15vw; color: rgba(212,170,96,.4); }

/* ── 상단 태그 라벨 ──────────────────────────────────────── */
.card-tags {
  position: absolute; top: 1.4vh; left: 0; right: 0;
  display: flex; justify-content: flex-end; gap: 0.6vw; flex-wrap: wrap;
  padding: 0 1.8vw; z-index: 2;
}
.evt-tag {
  font-size: 2vh; letter-spacing: 0.06vw; padding: 0.2vh 0.8vw;
  border: 0.1vh solid; border-radius: 1vh; color: #fff;
}

/* ── 인디케이터 ──────────────────────────────────────────── */
.card-dots { display: flex; gap: 0.8vw; align-items: center; }
.dot {
  width: 0.6vh; height: 0.6vh; border-radius: 50%;
  background: rgba(212,170,96,.3); border: 0.1vh solid rgba(212,170,96,.4);
  cursor: pointer; transition: all .2s;
}
.dot.active { width: 2vh; border-radius: 0.3vh; background: var(--tg); border-color: var(--tg); }

/* ── 푸터 ────────────────────────────────────────────────── */
.step-nav {
  display: flex; justify-content: center; align-items: center;
  flex-shrink: 0; padding: 1vh 1.4vw; border-top: 0.1vh solid rgba(212,170,96,.2);
}
.back-btn {
  position: relative;
  display: flex; align-items: center; justify-content: center;
  width: calc(55vh * 5 / 7); padding: 1.8vh 0;
  background: linear-gradient(165deg, #0d1b2a 0%, #1a082e 60%, #0d1520 100%);
  border: 0.2vh solid rgba(212,170,96,.6); border-radius: 1.2vh;
  box-shadow:
    inset 0 0 0 0.4vh #0d1520,
    inset 0 0 0 0.6vh rgba(212,170,96,.18),
    0 0.6vh 2.4vh rgba(0,0,0,.7);
  color: rgba(212,170,96,.8);
  cursor: pointer; transition: all .2s; overflow: hidden;
}
.back-btn::before {
  content: ''; position: absolute; inset: 0;
  background-image:
    repeating-linear-gradient( 45deg, transparent, transparent 1vw, rgba(212,170,96,.02) 1vw, rgba(212,170,96,.02) 1.1vw),
    repeating-linear-gradient(-45deg, transparent, transparent 1vw, rgba(212,170,96,.02) 1vw, rgba(212,170,96,.02) 1.1vw);
  pointer-events: none;
}
.back-btn:hover {
  border-color: rgba(212,170,96,.9);
  box-shadow:
    inset 0 0 0 0.4vh #0d1520,
    inset 0 0 0 0.6vh rgba(212,170,96,.4),
    0 1.2vh 4vh rgba(212,170,96,.18);
  color: var(--tg); transform: translateY(-0.3vh);
}
.back-label { font-size: 1.8vh; letter-spacing: 0.25vw; position: relative; z-index: 1; }
</style>
