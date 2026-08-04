<template>
  <div class="fs-wrap">
    <div class="fs-row">
      <span class="fs-lbl">총 함선</span>
      <span class="mono fs-val gold">{{ fleet?.ships?.toLocaleString() }}척</span>
    </div>
    <div class="fs-row">
      <span class="fs-lbl">사기</span>
      <span class="mono fs-val" :style="{ color: moraleColor(fleet?.moral ?? 100) }">
        {{ fleet?.moral ?? 100 }}
      </span>
    </div>
    <div class="fs-row">
      <span class="fs-lbl">최대사기</span>
      <span class="mono fs-val">{{ fleetStats?.statCsm ?? 100 }}</span>
    </div>
    <div class="fs-divider" />
    <div class="fs-row">
      <span class="fs-lbl">유지비</span>
      <span class="mono fs-val">{{ fleet?.upkeep ?? 0 }}</span>
    </div>
    <div class="fs-row">
      <span class="fs-lbl">보급</span>
      <span class="mono fs-val">{{ fleet?.supply ?? 100 }}%</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  fleet:      { type: Object, default: null },
  fleetStats: { type: Object, default: null },
})

function moraleColor(m) {
  return m > 60 ? '#2ecc71' : m > 30 ? '#e67e22' : '#e74c3c'
}
</script>

<style scoped>
.fs-wrap { display: flex; flex-direction: column; padding: 4px 0; }

.fs-row {
  display: flex; justify-content: space-between; align-items: center;
  padding: 7px 0; border-bottom: 1px solid rgba(255,255,255,.04);
  font-size: 11px; font-family: var(--font-serif); letter-spacing: .3px;
}
.fs-row:last-child { border-bottom: none; }

.fs-lbl  { color: var(--td); }
.fs-val  { color: var(--t1); }

.fs-divider { height: 1px; background: rgba(255,255,255,.08); margin: 2px 0; }
</style>
