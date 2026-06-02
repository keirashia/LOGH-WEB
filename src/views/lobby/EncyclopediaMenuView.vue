<template>
  <div class="enc-wrap">
    <canvas ref="cvs" class="starfield" />

    <div class="enc-layout">
      <div class="enc-header">
        <button class="btn" @click="$router.push('/lobby')">← 뒤로</button>
        <span class="serif gold enc-title">사전</span>
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
            v-for="(c, i) in CARDS"
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

      <!-- 인디케이터 -->
      <div class="card-dots">
        <span
          v-for="(c, i) in CARDS" :key="i"
          class="dot"
          :class="{ active: i === currentCard }"
          @click="goToCard(i)"
        />
      </div>
    </div>

    <!-- 팝업 -->
    <CharLibPop v-if="enc.popType === 'char'" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useEncyclopediaStore } from '@/stores/encyclopediaStore'
import CharLibPop from '@/components/char/CharLibPop.vue'

const router = useRouter()
const enc    = useEncyclopediaStore()
const cvs    = ref(null)
const trackRef = ref(null)
let aid = null

const CARDS = [
  { icon: '👤', title: '인물', desc: 'Characters',  abbr: 'CHR', action: () => enc.open('char') },
  { icon: '🏛️', title: '국가', desc: 'Nations',     abbr: 'NAT', disabled: true },
  { icon: '🌌', title: '성계', desc: 'Star Systems', abbr: 'STR', disabled: true },
  { icon: '🚀', title: '함선', desc: 'Fleet',        abbr: 'FLT', disabled: true },
  { icon: '📚', title: '용어', desc: 'Glossary',     abbr: 'GLO', disabled: true },
]

// ── 드래그 슬라이더 ────────────────────────────────────────
const GAP = 16
const isDragging  = ref(false)
const currentCard = ref(0)
const liftingCard = ref(-1)

let startX       = 0
let offsetX      = 0
let dragDist     = 0
let raf          = null
let pendingDelta = 0
let wheelLocked  = false

function cardWidth()    { return window.innerHeight * 0.6 * (5 / 7) }
function unitWidth()    { return cardWidth() + GAP }
function sliderWidth()  { return trackRef.value?.parentElement?.offsetWidth ?? window.innerWidth }
function centerOf(i)    { return sliderWidth() / 2 - cardWidth() / 2 - i * unitWidth() }
function minOffset()    { return centerOf(CARDS.length - 1) }
function maxOffset()    { return centerOf(0) }
function clamp(val)     { return Math.max(minOffset(), Math.min(maxOffset(), val)) }

function applyOffset(val, animate = false) {
  offsetX = clamp(val)
  if (!trackRef.value) return
  trackRef.value.style.transition = animate ? 'transform 0.34s cubic-bezier(.25,.8,.25,1)' : 'none'
  trackRef.value.style.transform  = `translate3d(${offsetX}px, 0, 0)`
}

function snapNearest(val) {
  let best = 0, bestDist = Infinity
  for (let i = 0; i < CARDS.length; i++) {
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
  const x = px(e)
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
  if (next < 0 || next >= CARDS.length) return
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
  router.replace('/lobby')
}

// ── 별 배경 ───────────────────────────────────────────────
onMounted(() => {
  history.pushState(null, '')
  window.addEventListener('popstate', onBrowserBack)

  requestAnimationFrame(() => applyOffset(centerOf(0)))
  addEventListener('resize', onResize)

  const c = cvs.value, ctx = c.getContext('2d')
  let w = c.width = innerWidth, h = c.height = innerHeight
  const stars = Array.from({ length: 200 }, () => ({
    x: Math.random() * w, y: Math.random() * h,
    r: Math.random() * 1.1 + .1, tw: Math.random() * Math.PI * 2, sp: Math.random() * .18 + .02,
  }))
  const nebs = Array.from({ length: 2 }, () => ({
    x: Math.random() * w, y: Math.random() * h, r: 80 + Math.random() * 80,
    cl: ['rgba(41,128,185,', 'rgba(100,50,180,'][Math.floor(Math.random() * 2)],
  }))
  function draw() {
    ctx.fillStyle = '#020508'; ctx.fillRect(0, 0, w, h)
    nebs.forEach(n => {
      const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r)
      g.addColorStop(0, `${n.cl}0.05)`); g.addColorStop(1, `${n.cl}0)`)
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill()
    })
    stars.forEach(s => {
      s.tw += .011; s.x -= s.sp; if (s.x < 0) { s.x = w; s.y = Math.random() * h }
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(200,220,255,${.12 + Math.sin(s.tw) * .2})`; ctx.fill()
    })
    aid = requestAnimationFrame(draw)
  }
  draw()
  const onr = () => { w = c.width = innerWidth; h = c.height = innerHeight }
  addEventListener('resize', onr)
  onUnmounted(() => {
    cancelAnimationFrame(aid)
    removeEventListener('resize', onResize)
    removeEventListener('resize', onr)
    window.removeEventListener('popstate', onBrowserBack)
  })
})
</script>

<style scoped>
/* ── 레이아웃 ─────────────────────────────────────────────── */
.enc-wrap {
  position: relative; width: 100%; height: 100%;
  display: flex; align-items: center; justify-content: center; overflow: hidden;
}
.starfield { position: absolute; inset: 0; z-index: 0; }
.enc-layout {
  position: relative; z-index: 1;
  display: flex; flex-direction: column; align-items: center;
  gap: 20px; padding: 24px; width: 100%;
}

/* ── 헤더 ────────────────────────────────────────────────── */
.enc-header {
  display: flex; align-items: center; gap: 16px; width: 100%; max-width: 600px;
}
.enc-title { font-size: 2.2vh; letter-spacing: 0.3vw; }

/* ── 슬라이더 ────────────────────────────────────────────── */
.card-slider {
  width: 100%;
  overflow-x: clip;
  overflow-y: visible;
  cursor: grab; user-select: none;
}
.card-slider.grabbing { cursor: grabbing; }
.card-track { display: flex; gap: 16px; width: max-content; will-change: transform; }

/* ── 카드 ────────────────────────────────────────────────── */
.menu-btn {
  flex-shrink: 0; position: relative;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  width: calc(60vh * 5 / 7); height: 60vh;
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
  width: calc(60vh * 5 / 7 * 0.68); height: calc(60vh * 5 / 7 * 0.68);
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
</style>
