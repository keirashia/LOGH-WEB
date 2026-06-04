<template>
  <div class="cslay-wrap">
    <StarfieldCanvas :star-count="starCount" :neb-colors="nebColors" />

    <div class="cslay-layout">
      <div class="cslay-title">
        <span class="serif gold lbt-main">{{ title }}</span>
      </div>

      <div
        class="card-slider"
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
        <div ref="trackRef" class="card-track">
          <button
            v-for="(c, i) in cards"
            :key="i"
            class="menu-btn"
            :class="{ disabled: c.disabled, lifting: liftingCard === i }"
            draggable="false"
            @click="handleCard(c, i)"
          >
            <div class="card-corner tl">
              <span class="cc-icon">{{ c.icon }}</span>
              <span class="cc-txt mono">{{ c.abbr }}</span>
            </div>
            <div class="card-body">
              <span class="mb-icon">{{ c.icon }}</span>
              <span class="mb-title serif">{{ c.title }}</span>
              <span class="mb-desc mono">{{ c.desc }}</span>
            </div>
            <div class="card-corner br">
              <span class="cc-icon">{{ c.icon }}</span>
              <span class="cc-txt mono">{{ c.abbr }}</span>
            </div>
          </button>
        </div>
      </div>

      <div class="card-dots">
        <span
          v-for="(c, i) in cards" :key="i"
          class="dot"
          :class="{ active: i === currentCard }"
          @click="goToCard(i)"
        />
      </div>

      <slot name="extra" />

      <div class="cslay-footer">
        <button class="cslay-back" @click="router.push(backTo)">
          <span class="cslay-back-label mono">{{ backLabel }}</span>
        </button>
      </div>
    </div>

    <slot />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import StarfieldCanvas from './StarfieldCanvas.vue'

const props = defineProps({
  title:     { type: String, required: true },
  cards:     { type: Array,  required: true },
  backTo:    { type: String, required: true },
  backLabel: { type: String, required: true },
  starCount: { type: Number, default: 200 },
  nebColors: { type: Array,  default: () => ['rgba(41,128,185,', 'rgba(100,50,180,'] },
})

const router   = useRouter()
const trackRef = ref(null)

const GAP         = 16
const isDragging  = ref(false)
const currentCard = ref(0)
const liftingCard = ref(-1)

let startX       = 0
let offsetX      = 0
let dragDist     = 0
let raf          = null
let pendingDelta = 0
let wheelLocked  = false

function cardWidth()   { return window.innerHeight * 0.55 * (5 / 7) }
function unitWidth()   { return cardWidth() + GAP }
function sliderWidth() { return trackRef.value?.parentElement?.offsetWidth ?? window.innerWidth }
function centerOf(i)   { return sliderWidth() / 2 - cardWidth() / 2 - i * unitWidth() }
function minOffset()   { return centerOf(props.cards.length - 1) }
function maxOffset()   { return centerOf(0) }
function clamp(val)    { return Math.max(minOffset(), Math.min(maxOffset(), val)) }

function applyOffset(val, animate = false) {
  offsetX = clamp(val)
  if (!trackRef.value) return
  trackRef.value.style.transition = animate ? 'transform 0.34s cubic-bezier(.25,.8,.25,1)' : 'none'
  trackRef.value.style.transform  = `translate3d(${offsetX}px, 0, 0)`
}

function snapNearest(val) {
  let best = 0, bestDist = Infinity
  for (let i = 0; i < props.cards.length; i++) {
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
  const x     = px(e)
  const delta = x - startX
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
  if (next < 0 || next >= props.cards.length) return
  goToCard(next)
  wheelLocked = true
  setTimeout(() => { wheelLocked = false }, 400)
}

function handleCard(c, i) {
  if (dragDist > 5) return
  if (i !== currentCard.value) { goToCard(i); return }
  if (c.disabled) return
  if (liftingCard.value !== -1) return
  liftingCard.value = i
  setTimeout(() => {
    liftingCard.value = -1
    c.action?.()
  }, 500)
}

function onResize() { applyOffset(centerOf(currentCard.value)) }

function onBrowserBack() {
  window.removeEventListener('popstate', onBrowserBack)
  router.replace(props.backTo)
}

onMounted(() => {
  history.pushState({ ...history.state }, '')
  window.addEventListener('popstate', onBrowserBack)
  requestAnimationFrame(() => applyOffset(centerOf(0)))
  addEventListener('resize', onResize)

  onUnmounted(() => {
    removeEventListener('resize', onResize)
    window.removeEventListener('popstate', onBrowserBack)
  })
})
</script>

<style scoped>
/* ── 레이아웃 ─────────────────────────────────────────────── */
.cslay-wrap {
  position: relative; width: 100%; height: 100%;
  display: flex; align-items: center; justify-content: center; overflow: hidden;
}
.starfield { position: absolute; inset: 0; z-index: 0; }
.cslay-layout {
  position: relative; z-index: 1;
  display: flex; flex-direction: column; align-items: center;
  gap: 12px; padding: 12px 24px; width: 100%;
}

/* ── 타이틀 ──────────────────────────────────────────────── */
.cslay-title { display: flex; flex-direction: column; align-items: center; gap: 2px; position: relative; z-index: 0; }
.lbt-main    { font-size: 2.2vh; letter-spacing: 0.4vw; text-shadow: 0 0 16px rgba(212,170,96,.4); }

/* ── 슬라이더 ────────────────────────────────────────────── */
.card-slider {
  position: relative; z-index: 1;
  width: 100%; overflow-x: clip; overflow-y: visible;
  cursor: grab; user-select: none;
}
.card-slider.grabbing { cursor: grabbing; }
.card-track { display: flex; gap: 16px; width: max-content; will-change: transform; }

/* ── 카드 ────────────────────────────────────────────────── */
.menu-btn {
  flex-shrink: 0; position: relative;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  width: calc(55vh * 5 / 7); height: 55vh;
  padding: 18px 14px;
  background: linear-gradient(165deg, #0d1b2a 0%, #1a082e 60%, #0d1520 100%);
  border: 2px solid rgba(212,170,96,.8); border-radius: 14px;
  box-shadow:
    inset 0 0 0 5px #0d1520,
    inset 0 0 0 7px rgba(212,170,96,.22),
    0 8px 32px rgba(0,0,0,.85);
  cursor: pointer; transition: transform .2s, box-shadow .2s; overflow: hidden; color: var(--t1);
}
.menu-btn::before {
  content: ''; position: absolute; inset: 0;
  background-image:
    repeating-linear-gradient( 45deg, transparent, transparent 10px, rgba(212,170,96,.025) 10px, rgba(212,170,96,.025) 11px),
    repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(212,170,96,.025) 10px, rgba(212,170,96,.025) 11px);
  pointer-events: none;
}
.menu-btn::after {
  content: ''; position: absolute;
  width: calc(55vh * 5 / 7 * 0.68); height: calc(55vh * 5 / 7 * 0.68);
  border-radius: 50%; border: 1px solid rgba(212,170,96,.1); pointer-events: none;
}
.menu-btn:hover:not(.disabled):not(.lifting) {
  box-shadow:
    inset 0 0 0 5px #0d1520,
    inset 0 0 0 7px rgba(212,170,96,.5),
    0 20px 56px rgba(212,170,96,.2);
  transform: translateY(-8px) scale(1.03);
}
.menu-btn.disabled { opacity: .4; cursor: not-allowed; }
.menu-btn.lifting  { animation: card-lift 0.5s ease-in forwards; pointer-events: none; }

@keyframes card-lift {
  0%   { transform: translateY(0)      scale(1);    opacity: 1; }
  40%  { transform: translateY(-32px)  scale(1.06); opacity: 1; }
  100% { transform: translateY(-120px) scale(1.1);  opacity: 0; }
}

/* ── 모서리 라벨 ─────────────────────────────────────────── */
.card-corner { position: absolute; display: flex; flex-direction: column; align-items: center; gap: 3px; z-index: 2; }
.card-corner.tl { top: 14px; left: 16px; }
.card-corner.br { bottom: 14px; right: 16px; transform: rotate(180deg); }
.cc-icon { font-size: 3.2vh; line-height: 1; }
.cc-txt  { font-size: 2.0vh; color: rgba(212,170,96,.65); letter-spacing: 0.1vw; }

/* ── 카드 중앙 ───────────────────────────────────────────── */
.card-body { display: flex; flex-direction: column; align-items: center; gap: 2vh; z-index: 2; pointer-events: none; }
.mb-icon  { font-size: 9vh; }
.mb-title { font-size: 4.8vh; letter-spacing: 0.3vw; color: var(--tg); text-shadow: 0 0 20px rgba(212,170,96,.6); }
.mb-desc  { font-size: 2.5vh; letter-spacing: 0.2vw; color: rgba(212,170,96,.5); }

/* ── 인디케이터 ──────────────────────────────────────────── */
.card-dots { display: flex; gap: 8px; align-items: center; }
.dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: rgba(212,170,96,.3); border: 1px solid rgba(212,170,96,.4);
  cursor: pointer; transition: all .2s;
}
.dot.active { width: 20px; border-radius: 3px; background: var(--tg); border-color: var(--tg); }

/* ── 푸터 뒤로가기 ───────────────────────────────────────── */
.cslay-footer { display: flex; gap: 10px; align-items: center; justify-content: center; }
.cslay-back {
  position: relative;
  display: flex; align-items: center; justify-content: center; gap: 1.6vh;
  width: calc(55vh * 5 / 7); padding: 1.8vh 0;
  background: linear-gradient(165deg, #0d1b2a 0%, #1a082e 60%, #0d1520 100%);
  border: 2px solid rgba(212,170,96,.6); border-radius: 12px;
  box-shadow:
    inset 0 0 0 4px #0d1520,
    inset 0 0 0 6px rgba(212,170,96,.18),
    0 6px 24px rgba(0,0,0,.7);
  color: rgba(212,170,96,.8);
  cursor: pointer; transition: all .2s; overflow: hidden;
}
.cslay-back::before {
  content: ''; position: absolute; inset: 0;
  background-image:
    repeating-linear-gradient( 45deg, transparent, transparent 10px, rgba(212,170,96,.02) 10px, rgba(212,170,96,.02) 11px),
    repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(212,170,96,.02) 10px, rgba(212,170,96,.02) 11px);
  pointer-events: none;
}
.cslay-back:hover {
  border-color: rgba(212,170,96,.9);
  box-shadow:
    inset 0 0 0 4px #0d1520,
    inset 0 0 0 6px rgba(212,170,96,.4),
    0 12px 40px rgba(212,170,96,.18);
  color: var(--tg); transform: translateY(-3px);
}
.cslay-back-label { font-size: 1.8vh; letter-spacing: 0.25vw; position: relative; z-index: 1; }
</style>
