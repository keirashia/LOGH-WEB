<template>
  <div class="ff-wrap">
    <div class="ff-formation-col">
      <div class="ff-label">진형 도식</div>
      <div class="ff-formation-box">
        <!-- TODO: 진형 캔버스 렌더링 -->
      </div>
    </div>
    <div class="ff-units-col">
      <div class="ff-label">부대 편성</div>
      <div class="ff-units-list">
        <!-- TODO: 부대별 함선 목록 렌더링 -->
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  fleet:         { type: Object, default: null },
  formationName: { type: String, default: '—' },
})
</script>

<style scoped>
.ff-wrap {
  display: flex; gap: 16px; align-items: flex-start;
  padding: 12px 0;
}

.ff-label {
  font-size: 10px; color: var(--td); letter-spacing: 1px;
  text-transform: uppercase; margin-bottom: 8px;
}

.ff-formation-col { width: 140px; flex-shrink: 0; }
.ff-formation-box {
  width: 100%; aspect-ratio: 1;
  background: var(--bg4); border: 1px solid var(--bd); border-radius: var(--r);
}

.ff-units-col  { flex: 1; }
.ff-units-list {
  min-height: 120px;
  background: var(--bg4); border: 1px solid var(--bd); border-radius: var(--r);
}
</style>
