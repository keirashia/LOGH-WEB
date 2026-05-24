<template>
  <div class="sr">
    <span class="sr-l dim">{{ label }}</span>
    <div class="sbar"><div class="sbar-fill" :style="`width:${pct}%;background:${color}`"/></div>
    <span class="sr-v mono">{{ value }}</span>
  </div>
</template>
<script setup>
import { computed } from 'vue'
const p = defineProps({ label:String, value:Number, max:{default:100}, color:{default:'#3498db'} })
const pct = computed(() => Math.min(100, Math.max(0, (p.value/p.max)*100)))
</script>
<style scoped>
.sr{display:flex;align-items:center;gap:7px;margin-bottom:5px}
.sr-l{font-size:11px;width:30px;flex-shrink:0}
.sr-v{font-size:11px;width:28px;text-align:right;flex-shrink:0;color:var(--t2)}
</style>