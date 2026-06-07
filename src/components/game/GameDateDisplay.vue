<template>
  <div class="game-date panel" :class="align">
    <div class="date-year mono">우주력 {{ game.year }}년 (제국력 {{ game.impYear }}년)</div>
    <div class="date-detail mono">
      {{ game.month }}월 {{ game.day }}일
      <span class="date-hour">{{ hourStr }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'

const props = defineProps({
  align: { type: String, default: 'right' }, // 'right' | 'left' | 'center'
})

const game = useGameStore()

// hourStep 옵션이 생기면 game.hourStep 으로 교체
const hourStep = computed(() => game.hourStep ?? 24)

// 하루 안에서 몇 번째 서브턴인지 (0-based)
const subTurnOfDay = computed(() => (game.subTurn ?? 0) % (24 / hourStep.value))

const currentHour = computed(() => subTurnOfDay.value * hourStep.value)

const hourStr = computed(() => `${String(currentHour.value).padStart(2, '0')}시`)
</script>

<style scoped>
.game-date {
  display: flex;
  flex-direction: column;
  gap: 3px;
  pointer-events: none;
}
.game-date.right  { text-align: right; }
.game-date.left   { text-align: left; }
.game-date.center { text-align: center; }

.date-year   { font-size: 10px; color: var(--tg); opacity: .8; }
.date-detail { font-size: 13px; color: var(--t1); }
.date-hour   { margin-left: 4px; color: var(--tg); }
</style>
