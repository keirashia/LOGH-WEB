<template>
  <div class="options-panel panel">
    <div class="opts-placeholder dim mono">설정 (준비 중)</div>
    <!-- 언어 설정 -->
     
  </div>
</template>

<style scoped>
.options-panel {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 490;
  padding: clamp(14px, 2vh, 24px) clamp(14px, 2vw, 28px);
  border-radius: 0 0 var(--r) var(--r);
  border-top: none;
  box-shadow: 0 8px 24px rgba(0, 0, 0, .5);
  min-height: clamp(60px, 8vh, 100px);
}

.opts-placeholder {
  font-size: clamp(10px, 1vw, 12px);
  letter-spacing: 1px;
}
</style>
