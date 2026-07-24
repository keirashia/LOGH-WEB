<template>
  <div class="lobby-footer-layer">
    <button
      v-for="(btn, i) in buttons"
      :key="i"
      class="lb-btn"
      :class="{ 'lb-primary': btn.primary }"
      :disabled="btn.disabled"
      @click="btn.action?.()"
    >
      <span class="mono">{{ btn.label }}</span>
    </button>
  </div>
</template>

<script setup>
defineProps({
  // [{ label, primary?, disabled?, action }]
  // primary: true → gold, flex:2, border-left separator (like end-btn in StrategyBar)
  buttons: {
    type: Array,
    default: () => [],
  },
})
</script>

<style scoped>
.lobby-footer-layer {
  position: relative; z-index: 1;
  display: flex;
  align-items: stretch;
  flex-shrink: 0;
  width: 100%;
  background: linear-gradient(165deg, #0d1b2a 0%, #0a0f1c 60%, #060a10 100%);
  border-top: 2px solid rgba(212,170,96,.55);
  box-shadow:
    0 -1px 0 rgba(212,170,96,.1),
    0 -8px 32px rgba(0,0,0,.85),
    inset 0 1px 0 rgba(212,170,96,.08);
}

.lb-btn {
  flex: 1;
  padding: 0;
  height: clamp(52px, 7vh, 72px);
  position: relative;
  overflow: hidden;
  display: flex; align-items: center; justify-content: center;
  background: none;
  border: none;
  border-right: 1px solid rgba(212,170,96,.08);
  color: rgba(255,255,255,.75);
  font-size: clamp(13px, 2.2vh, 20px);
  letter-spacing: .6px;
  cursor: pointer;
  transition: color .18s, background .18s;
}
.lb-btn:last-child { border-right: none; }
.lb-btn:disabled { opacity: .35; cursor: not-allowed; }

/* 대각선 격자 패턴 */
.lb-btn::before {
  content: '';
  position: absolute; inset: 0; pointer-events: none;
  background-image:
    repeating-linear-gradient( 45deg, transparent, transparent 10px, rgba(212,170,96,.025) 10px, rgba(212,170,96,.025) 11px),
    repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(212,170,96,.025) 10px, rgba(212,170,96,.025) 11px);
  opacity: 0; transition: opacity .2s;
}
.lb-btn:hover:not(:disabled)::before { opacity: 1; }

.lb-btn:hover:not(:disabled) { color: rgba(255,255,255,.95); background: rgba(212,170,96,.04); }

/* primary 버튼 — end-btn 스타일 */
.lb-primary {
  flex: 2;
  border-left: 2px solid rgba(212,170,96,.4);
  border-right: none;
  color: rgba(212,170,96,.85);
}
.lb-primary::before { opacity: 1; }
.lb-primary:hover:not(:disabled) {
  color: var(--tg);
  text-shadow: 0 0 12px rgba(212,170,96,.5);
}
</style>
