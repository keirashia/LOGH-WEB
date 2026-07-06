<template>
  <div class="cring-root">
    <svg class="cring-svg" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <circle cx="150" cy="150" r="115" class="cring-circle" />
    </svg>

    <div
      v-for="(pos, i) in resolved"
      :key="pos.jobCode"
      class="cring-seat"
      :class="{ vacant: !pos.charName, chair: i === 0 }"
      :style="{ '--i': i, '--n': resolved.length }"
    >
      <div class="seat-lbl mono">{{ pos.shortTitle }}</div>
      <div class="seat-nm serif" :class="{ dim: !pos.charName }">
        {{ pos.charName ?? '공석' }}
      </div>
    </div>

    <div class="cring-center mono dim">평의회</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'

const props = defineProps({
  seats: { type: Array, required: true },
  // [{ jobCode: string, shortTitle: string }]
})

const game = useGameStore()

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
      charName: ch?.name?.find(e => e.code === 'Kr')?.context ?? null,
    }
  })
)
</script>

<style scoped>
.cring-root {
  position: relative;
  width: 300px;
  height: 300px;
  margin: 4px auto;
  flex-shrink: 0;
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
    translateY(-115px)
    rotate(calc(-1 * (360deg / var(--n) * var(--i) - 90deg)));
  width: 64px;
  text-align: center;
  background: var(--bg2);
  border: 1px solid var(--bd);
  border-radius: var(--r);
  padding: 3px 5px;
}
.cring-seat.chair {
  border-color: var(--tg);
  background: rgba(255, 215, 0, .05);
}
.cring-seat.vacant { opacity: .55; }

.seat-lbl {
  font-size: 9px;
  color: var(--td);
  letter-spacing: .3px;
  line-height: 1.4;
}
.seat-nm {
  font-size: 10px;
  color: var(--t1);
  letter-spacing: .3px;
  line-height: 1.5;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.seat-nm.dim { color: var(--td); font-style: italic; }

.cring-center {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 9px;
  letter-spacing: .5px;
  pointer-events: none;
}
</style>
