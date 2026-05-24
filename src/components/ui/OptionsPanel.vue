<template>
  <div class="options-panel panel">
    <div class="opts-placeholder dim mono">설정 (준비 중)</div>
  </div>
</template>

<style scoped>
.options-panel {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 490;
  padding: 20px 24px;
  border-radius: 0 0 var(--r) var(--r);
  border-top: none;
  box-shadow: 0 8px 24px rgba(0,0,0,.5);
  min-height: 80px;
}

.opts-placeholder {
  font-size: 11px;
  letter-spacing: 1px;
}
</style>
