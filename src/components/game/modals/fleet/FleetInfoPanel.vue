<template>
  <div class="fi-wrap">
    <div class="fi-pairs">
      <div v-for="([left, right], i) in STAT_PAIRS" :key="i" class="fi-pair-row">
        <div class="fi-cell">
          <div class="fi-row">
            <span class="fi-lbl">{{ left[0] }}</span>
            <div class="fi-bar">
              <div class="fi-fill" :style="{ width: pct(fleetStats?.[left[1]]) + '%', background: left[2] }" />
            </div>
            <span class="fi-val mono">{{ fleetStats?.[left[1]] ?? '—' }}</span>
          </div>
          <div class="fi-nick-wrap">
            <CharChip v-if="fleetStats?._attr?.[left[1]]"
              :char-code="fleetStats._attr[left[1]]"
              disp-type="N"
              class="fi-chip"
            />
          </div>
        </div>
        <div class="fi-cell">
          <div class="fi-row">
            <span class="fi-lbl">{{ right[0] }}</span>
            <div class="fi-bar">
              <div class="fi-fill" :style="{ width: pct(fleetStats?.[right[1]]) + '%', background: right[2] }" />
            </div>
            <span class="fi-val mono">{{ fleetStats?.[right[1]] ?? '—' }}</span>
          </div>
          <div class="fi-nick-wrap">
            <CharChip v-if="fleetStats?._attr?.[right[1]]"
              :char-code="fleetStats._attr[right[1]]"
              disp-type="N"
              class="fi-chip"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CharChip from '@/components/common/CharChip.vue'

defineProps({
  fleetStats: { type: Object, default: null },
})

const STAT_PAIRS = [
  [['통솔', 'statCmd', 'var(--tg)'],  ['지휘', 'statCsm', '#c9a84c']],
  [['공격', 'statAtt', '#e74c3c'],    ['방어', 'statDef', '#3498db']],
  [['운영', 'statMng', '#9b59b6'],    ['정보', 'statInf', '#1abc9c']],
  [['육전', 'statGfg', '#e67e22'],    ['공전', 'statAfg', '#f39c12']],
  [['기동', 'statFst', '#2ecc71'],    ['정치', 'statPlt', '#95a5a6']],
]

function pct(val) { return Math.min(100, Math.max(0, val ?? 0)) }
</script>

<style scoped>
.fi-wrap  { padding: 12px 0; }

.fi-pairs { display: flex; flex-direction: column; gap: 10px; }

.fi-pair-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.fi-cell      { display: flex; flex-direction: column; gap: 3px; }

.fi-row       { display: flex; align-items: center; gap: 7px; }
.fi-lbl       { width: 28px; font-size: 11px; color: var(--td); flex-shrink: 0; font-family: var(--font-serif); letter-spacing: .5px; }
.fi-bar       { flex: 1; height: 5px; background: rgba(255,255,255,.08); border-radius: 3px; overflow: hidden; }
.fi-fill      { height: 100%; border-radius: 3px; transition: width .3s; }
.fi-val       { width: 28px; font-size: 10px; color: var(--t2); text-align: right; flex-shrink: 0; }

.fi-nick-wrap { padding-left: 35px; min-height: 18px; }
.fi-chip      { font-size: 9px !important; padding: 1px 6px !important; }
</style>
