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
      :class="{ vacant: !pos.charCode, chair: i === 0 }"
      :style="{ '--i': i, '--n': resolved.length }"
    >
      <JobChip :job-code="pos.jobCode" :label="pos.shortTitle" class="seat-lbl" />
      <CharChip v-if="pos.charCode" :char-code="pos.charCode" disp-type="F" class="seat-chip" />
      <div v-else class="seat-nm dim">공석</div>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import CharChip from '@/components/common/CharChip.vue'
import JobChip from '@/components/common/JobChip.vue'

const props = defineProps({
  seats: { type: Array, required: true },
})

const game = useGameStore()

function charByJob(jobCode) {
  return Object.values(game.characters).find(
    ch => ch.faction === game.playerFaction && ch.charStatus !== 'dead' &&
          ch.jobs?.some(j => j.jobCode === jobCode)
  ) ?? null
}

const resolved = computed(() =>
  props.seats.map(s => {
    const ch = charByJob(s.jobCode)
    return {
      ...s,
      charCode: ch?.code ?? null,
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
  user-select: none;
  -webkit-user-select: none;
}
.cring-seat.vacant { opacity: .55; }

/* JobChip as seat label */
.cring-seat :deep(.seat-lbl) {
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
  justify-content: center;
}
.cring-seat.chair :deep(.seat-lbl) {
  border-color: rgba(212,170,96,.6);
  color: var(--tg);
}

/* CharChip as seat name */
.cring-seat :deep(.seat-chip) {
  width: 100%;
  border-radius: 0 0 3px 3px;
  border-top: none;
  justify-content: center;
}

.seat-nm {
  display: inline-block;
  width: 100%;
  font-size: 11px;
  font-family: var(--font-serif);
  color: var(--td);
  font-style: italic;
  letter-spacing: .3px;
  line-height: 1.5;
  background: var(--bg2);
  border: 1px solid var(--bdg);
  border-top: none;
  border-radius: 0 0 3px 3px;
  padding: 2px 4px;
  box-sizing: border-box;
  text-align: center;
}
</style>
