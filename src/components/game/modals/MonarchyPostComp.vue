<template>
  <div class="mph-root">
    <div v-for="(tier, ti) in tiers" :key="tier.level">
      <div v-if="ti > 0" class="mph-vline"></div>
      <div class="mph-tier" :class="`tier-${tier.level}`">
        <div
          v-for="pos in tier.seats"
          :key="pos.jobCode"
          class="mph-cell"
          :class="{ apex: tier.level === 0, vacant: !pos.charName }"
        >
          <div class="mph-lbl mono">{{ pos.label }}</div>
          <div class="mph-name serif" :class="{ dim: !pos.charName }">
            {{ pos.charName ?? '공석' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'

const props = defineProps({
  seats: { type: Array, required: true },
  // [{ jobCode: string, label: string, tier: number }]
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
  padding: 12px 8px 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.mph-vline {
  width: 1px;
  height: 10px;
  background: var(--bd);
  margin: 0 auto;
}

.mph-tier {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  justify-content: center;
}

.mph-cell {
  width: 50px;
  text-align: center;
  background: var(--bg2);
  border: 1px solid var(--bd);
  border-radius: var(--r);
  padding: 3px 4px;
}

.mph-cell.apex {
  width: 80px;
  border-color: var(--tg);
  background: rgba(255, 215, 0, .05);
}

.mph-cell.vacant { opacity: .5; }

.mph-lbl {
  font-size: 9px;
  color: var(--td);
  letter-spacing: .3px;
  line-height: 1.4;
}

.mph-name {
  font-size: 9px;
  color: var(--t1);
  letter-spacing: .3px;
  line-height: 1.5;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mph-name.dim { color: var(--td); font-style: italic; }
</style>
