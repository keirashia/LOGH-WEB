<template>
  <div class="fi-wrap">
    <div class="fi-pairs">
      <div v-for="([left, right], i) in FLEET_STAT_PAIRS" :key="i" class="fi-pair-row">
        <!-- 왼쪽 스탯 -->
        <div class="fi-cell">
          <span class="fi-lbl">{{ left[0] }}</span>
          <div class="fi-bar">
            <div class="fi-fill" :style="{ width: statPct(fleetStats?.[left[1]]) + '%', background: left[2] }" />
          </div>
          <span class="fi-val mono">{{ fleetStats?.[left[1]] ?? '—' }}</span>
          <div class="fi-chip-row">
            <CharChip v-if="fleetStats?._attr?.[left[1]]"
              :char-code="fleetStats._attr[left[1]]"
              disp-type="N"
              class="fi-chip"
            />
          </div>
        </div>
        <!-- 오른쪽 스탯 -->
        <div class="fi-cell">
          <span class="fi-lbl">{{ right[0] }}</span>
          <div class="fi-bar">
            <div class="fi-fill" :style="{ width: statPct(fleetStats?.[right[1]]) + '%', background: right[2] }" />
          </div>
          <span class="fi-val mono">{{ fleetStats?.[right[1]] ?? '—' }}</span>
          <div class="fi-chip-row">
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
import { FLEET_STAT_PAIRS, statPct } from '@/utils/fleetUtils'

defineProps({
  fleetStats: { type: Object, default: null },
})
</script>

<style scoped>
.fi-wrap  { padding: 4px 0; }

.fi-pairs { display: flex; flex-direction: column; }

.fi-pair-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255,255,255,.07);
}
.fi-pair-row:last-child { border-bottom: none; }
.fi-pair-row > .fi-cell:first-child {
  padding-right: 12px;
  border-right: 1px solid rgba(255,255,255,.07);
}
.fi-pair-row > .fi-cell:last-child  { padding-left: 12px; }

/*
  셀 그리드: [라벨] [바] [값]
                   [칩]
  col: 30px  1fr  28px
  row1: lbl  bar  val
  row2: lbl  chip val
*/
.fi-cell {
  display: grid;
  grid-template-columns: 30px 1fr 28px;
  grid-template-rows: auto auto;
  column-gap: 8px;
  row-gap: 4px;
  align-items: center;
}

.fi-lbl {
  grid-column: 1;
  grid-row: 1 / 3;
  align-self: stretch;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  color: var(--t1);
  font-family: var(--font-serif);
  letter-spacing: .5px;
  background: rgba(255,255,255,.05);
  border-radius: var(--r);
}

.fi-bar {
  grid-column: 2;
  grid-row: 1;
  height: 5px;
  background: rgba(255,255,255,.08);
  border-radius: 3px;
  overflow: hidden;
}
.fi-fill { height: 100%; border-radius: 3px; transition: width .3s; }

.fi-val {
  grid-column: 3;
  grid-row: 1 / 3;
  align-self: center;
  font-size: 12px;
  color: var(--t1);
  text-align: right;
}

.fi-chip-row {
  grid-column: 2;
  grid-row: 2;
  min-height: 20px;
}

.fi-chip { font-size: 9px !important; padding: 1px 6px !important; }
</style>
