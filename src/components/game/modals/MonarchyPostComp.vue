<template>
  <div class="mph-root">
    <div class="mph-bg" />
    <div v-for="(tier, ti) in tiers" :key="tier.level">
      <div v-if="ti > 0" class="mph-vline"></div>
      <div class="mph-tier" :class="`tier-${tier.level}`">
        <div
          v-for="pos in tier.seats"
          :key="pos.jobCode"
          class="mph-cell"
          :class="{ apex: tier.level === 0, vacant: !pos.charName, held: heldCode === pos.jobCode }"
          @mousedown="onDown(pos)"
          @mouseup="onUp"
          @mouseleave="onUp"
          @touchstart.prevent="onDown(pos)"
          @touchend.prevent="onUp"
          @touchcancel="onUp"
          @contextmenu.prevent
        >
          <div class="cell-gauge" v-if="heldCode === pos.jobCode && gaugePercent > 0"
               :style="{ clipPath: `inset(0 ${100 - gaugePercent}% 0 0)` }" />
          <div class="mph-lbl mono">{{ pos.label }}</div>
          <div class="mph-name serif" :class="{ dim: !pos.charName }">
            {{ pos.charName ?? '공석' }}
          </div>
        </div>
      </div>
    </div>

    <!-- 힌트 패널 -->
    <CharacterInfoPopup
      :show="!!hintPos"
      :char-code="hintPos?.charCode ?? null"
      :title="hintPos?.label ?? ''"
      @close="hintPos = null"
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

const gaugePercent = ref(0)
const heldCode     = ref(null)
const hintPos      = ref(null)

let timerId = null
let elapsed = 0

function onDown(pos) {
  if (!pos.charName) return
  if (hintPos.value) { hintPos.value = null; return }
  heldCode.value = pos.jobCode
  elapsed = 0
  gaugePercent.value = 0
  timerId = setInterval(() => {
    elapsed += TICK_MS
    gaugePercent.value = Math.min((elapsed / HOLD_MS) * 100, 100)
    if (elapsed >= HOLD_MS) {
      stop()
      gaugePercent.value = 0
      heldCode.value = null
      hintPos.value = pos
    }
  }, TICK_MS)
}

function onUp() {
  stop()
  if (!hintPos.value) {
    gaugePercent.value = 0
    heldCode.value = null
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
      charCode: ch?.code ?? null,
      charName: ch?.nick?.find(e => e.code === 'Kr')?.context
             ?? ch?.name?.find(e => e.code === 'Kr')?.context
             ?? null,
      traits: ch?.traits ?? [],
    }
  })
)

const tiers = computed(() => {
  const maxTier = Math.max(...props.seats.map(s => s.tier))
  return Array.from({ length: maxTier + 1 }, (_, i) => ({
    level: i,
    seats: resolved.value.filter(s => s.tier === i),
  }))
})
</script>

<style scoped>
.mph-root {
  position: relative;
  padding: 0.75em 0.5em 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  border-radius: var(--r);
}
.mph-bg {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to bottom, rgba(2,5,8,.55) 0%, rgba(2,5,8,.35) 50%, rgba(2,5,8,.65) 100%),
    url('/img/ui/Neue%20Sans-souci.jpg') center / cover no-repeat;
  border-radius: var(--r);
}

.mph-vline {
  position: relative;
  z-index: 1;
  width: 1px;
  height: 10px;
  background: var(--bd);
  margin: 0 auto;
}

.mph-tier {
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  justify-content: center;
}

/* tier 1 (재상급): 내용 너비에 맞추되 최대 50% */
.tier-1 .mph-cell {
  flex: 0 0 auto;
  width: fit-content;
  max-width: 50%;
}
.tier-1 .mph-name {
  white-space: nowrap;
  word-break: normal;
  overflow-wrap: normal;
}

/* tier 2 (각 상서): 2열 고정 */
.tier-2 .mph-cell {
  flex: 0 0 calc(50% - 2px);
}

.mph-cell {
  position: relative;
  flex: 1 1 60px;
  min-width: 60px;
  text-align: center;
  border-radius: var(--r);
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
}

.mph-cell.apex {
  flex: 0 0 90px;
}
.mph-cell.apex .mph-lbl {
  border-color: rgba(212,170,96,.6);
  color: var(--tg);
}
.mph-cell.apex .mph-name {
  border-color: rgba(212,170,96,.4);
  background: rgba(255,215,0,.05);
}

.mph-cell.vacant { cursor: default; }
.mph-cell.vacant .mph-name { color: rgba(255,255,255,.45); font-style: italic; }

/* 홀드 게이지 */
.cell-gauge {
  position: absolute;
  inset: -2px;
  border: 2px solid rgba(212,170,96,.85);
  border-radius: calc(var(--r) + 2px);
  pointer-events: none;
  z-index: 2;
}

.mph-lbl {
  display: block;
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

.mph-name {
  display: block;
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

.mph-name.dim { color: rgba(255,255,255,.45); font-style: italic; }

</style>
