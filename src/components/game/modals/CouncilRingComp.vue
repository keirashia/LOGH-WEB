<template>
  <div class="cring-root">
    <div class="cring-bg" />
    <svg class="cring-svg" viewBox="0 0 370 370" xmlns="http://www.w3.org/2000/svg">
      <circle cx="185" cy="185" r="140" class="cring-circle" />
    </svg>

    <div
      v-for="(pos, i) in resolved"
      :key="pos.jobCode"
      class="cring-seat"
      :class="{ vacant: !pos.charName, chair: i === 0, held: heldIdx === i }"
      :style="{ '--i': i, '--n': resolved.length }"
      @mousedown="onDown(i)"
      @mouseup="onUp"
      @mouseleave="onUp"
      @touchstart.prevent="onDown(i)"
      @touchend.prevent="onUp"
      @touchcancel="onUp"
      @contextmenu.prevent
    >
      <div class="seat-gauge" v-if="heldIdx === i && gaugePercent > 0"
           :style="{ clipPath: `inset(0 ${100 - gaugePercent}% 0 0)` }" />
      <div class="seat-lbl mono">{{ pos.shortTitle }}</div>
      <div class="seat-nm serif" :class="{ dim: !pos.charName }">{{ pos.charName ?? '공석' }}</div>
    </div>

    <!-- 중앙 힌트 패널 -->
    <CharacterInfoPopup
      :show="showHintIdx !== null && !!resolved[showHintIdx]"
      :title="resolved[showHintIdx]?.shortTitle ?? ''"
      :name="resolved[showHintIdx]?.charName ?? null"
      :traits="resolved[showHintIdx]?.traits ?? []"
      @close="showHintIdx = null"
    />


  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import CharacterInfoPopup from '@/components/char/CharacterInfoPopup.vue'

const props = defineProps({
  seats: { type: Array, required: true },
})

const game = useGameStore()

const HOLD_MS = 800
const TICK_MS = 16

const gaugePercent  = ref(0)
const heldIdx       = ref(null)
const showHintIdx   = ref(null)

let timerId = null
let elapsed = 0

function onDown(i) {
  if (!resolved.value[i]?.charName) return
  if (showHintIdx.value !== null) { showHintIdx.value = null; return }
  heldIdx.value = i
  elapsed = 0
  gaugePercent.value = 0
  timerId = setInterval(() => {
    elapsed += TICK_MS
    gaugePercent.value = Math.min((elapsed / HOLD_MS) * 100, 100)
    if (elapsed >= HOLD_MS) {
      stop()
      gaugePercent.value = 0
      heldIdx.value = null
      showHintIdx.value = i
    }
  }, TICK_MS)
}

function onUp() {
  stop()
  if (showHintIdx.value === null) {
    gaugePercent.value = 0
    heldIdx.value = null
  }
}

function stop() {
  if (timerId) { clearInterval(timerId); timerId = null }
}

onUnmounted(stop)

function charByJob(jobCode) {
  return Object.values(game.characters).find(
    ch => ch.faction === game.playerFaction && !ch.isDead &&
          ch.jobs?.some(j => j.jobCode === jobCode)
  ) ?? null
}

const resolved = computed(() =>
  props.seats.map(s => {
    const ch = charByJob(s.jobCode)
    return {
      ...s,
      charName: ch?.nick?.find(e => e.code === 'Kr')?.context
             ?? ch?.name?.find(e => e.code === 'Kr')?.context
             ?? null,
      traits: ch?.traits ?? [],
    }
  })
)
</script>

<style scoped>
.cring-root {
  position: relative;
  width: 370px;
  height: 370px;
  margin: 4px auto;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: var(--r);
}
.cring-bg {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to bottom, rgba(2,5,8,.55) 0%, rgba(2,5,8,.35) 50%, rgba(2,5,8,.65) 100%),
    url('/img/ui/council_chamber.jpg') center / cover no-repeat;
  border-radius: var(--r);
}
.cring-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.cring-circle {
  fill: none;
  stroke: var(--bd);
  stroke-width: 1;
  stroke-dasharray: 4 3;
}

.cring-seat {
  position: absolute;
  top: 50%;
  left: 50%;
  transform:
    translate(-50%, -50%)
    rotate(calc(360deg / var(--n) * var(--i) - 90deg))
    translateY(-140px)
    rotate(calc(-1 * (360deg / var(--n) * var(--i) - 90deg)));
  width: 76px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  text-align: center;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
}
.cring-seat.chair .seat-lbl {
  border-color: rgba(212,170,96,.6);
  color: var(--tg);
}
.cring-seat.chair .seat-nm {
  border-color: rgba(212,170,96,.4);
}
.cring-seat.vacant { opacity: .55; cursor: default; }

/* 홀드 게이지 */
.seat-gauge {
  position: absolute;
  inset: -2px;
  border: 2px solid rgba(212,170,96,.85);
  border-radius: 5px;
  pointer-events: none;
  z-index: 2;
}

.seat-lbl {
  display: inline-block;
  width: 100%;
  font-size: 10px;
  color: rgba(255,255,255,.9);
  letter-spacing: .4px;
  line-height: 1.4;
  background: var(--bg3);
  border: 1px solid var(--bd);
  border-radius: 3px 3px 0 0;
  padding: 2px 4px;
  box-sizing: border-box;
}
.seat-nm {
  display: inline-block;
  width: 100%;
  font-size: 11px;
  color: var(--t1);
  letter-spacing: .3px;
  line-height: 1.5;
  background: var(--bg2);
  border: 1px solid var(--bdg);
  border-top: none;
  border-radius: 0 0 3px 3px;
  padding: 2px 4px;
  box-sizing: border-box;
  overflow-wrap: anywhere;
  word-break: break-all;
}
.seat-nm.dim { color: var(--td); font-style: italic; }

</style>
