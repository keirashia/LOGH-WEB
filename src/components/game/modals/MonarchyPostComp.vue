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
          :class="{ apex: tier.level === 0, vacant: !pos.charCode }"
        >
          <JobChip :job-code="pos.jobCode" :label="pos.label" class="mph-lbl" />
          <CharChip v-if="pos.charCode" :char-code="pos.charCode" disp-type="F" class="mph-chip" />
          <div v-else class="mph-name dim">공석</div>
        </div>
      </div>
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

.tier-1 .mph-cell {
  flex: 0 0 auto;
  width: fit-content;
  max-width: 50%;
}
.tier-2 .mph-cell {
  flex: 0 0 calc(50% - 2px);
}

.mph-cell {
  position: relative;
  flex: 1 1 60px;
  min-width: 60px;
  text-align: center;
  border-radius: var(--r);
  user-select: none;
  -webkit-user-select: none;
}
.mph-cell.apex { flex: 0 0 90px; }
.mph-cell.vacant { opacity: .55; }

/* JobChip as lbl */
.mph-cell :deep(.mph-lbl) {
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
  justify-content: center;
}
.mph-cell.apex :deep(.mph-lbl) {
  border-color: rgba(212,170,96,.6);
  color: var(--tg);
}

/* CharChip as name */
.mph-cell :deep(.mph-chip) {
  width: 100%;
  border-radius: 0 0 3px 3px;
  border-top: none;
  justify-content: center;
}
.mph-cell.apex :deep(.mph-chip) {
  border-color: rgba(212,170,96,.4);
  background: rgba(255,215,0,.05);
}

.mph-name {
  display: block;
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
