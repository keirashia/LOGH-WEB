<template>
  <div class="sp-popup-overlay" @click.self="$emit('close')">
    <div class="sp-popup">

      <!-- 헤더 -->
      <div class="sp-popup-header">
        <span class="serif gold sp-popup-title">{{ title }}</span>
        <button class="sp-popup-close mono dim" @click="$emit('close')">✕</button>
      </div>

      <!-- 피커 본체 -->
      <SystemPickerComp
        v-model="sel"
        :filter="filter"
        :select-planet="selectPlanet"
        class="sp-popup-body"
      />

      <!-- 푸터 -->
      <div class="sp-popup-footer">
        <button class="btn" @click="$emit('close')">취소</button>
        <button
          class="btn btn-gold"
          :disabled="!isConfirmable"
          @click="confirm"
        >확인</button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import SystemPickerComp from '@/components/common/SystemPickerComp.vue'

const props = defineProps({
  title:        { type: String,   default: '성계 선택' },
  filter:       { type: Function, default: null },
  selectPlanet: { type: Boolean,  default: false },
})
const emit = defineEmits(['select', 'close'])

const sel = ref({})

const isConfirmable = computed(() => {
  if (!sel.value.sysId) return false
  if (props.selectPlanet && !sel.value.planetCode) return false
  return true
})

function confirm() {
  if (!isConfirmable.value) return
  emit('select', { ...sel.value })
  emit('close')
}
</script>

<style scoped>
.sp-popup-overlay {
  position: fixed;
  inset: 0;
  z-index: 900;
  background: rgba(0,0,0,.55);
  display: flex;
  align-items: center;
  justify-content: center;
}

.sp-popup {
  font-size: clamp(1.3rem, 2vmin, 1.6rem);
  width: min(92vw, 680px);
  height: min(88vh, 560px);
  background: linear-gradient(165deg, #0d1b2a 0%, #1a082e 60%, #0d1520 100%);
  border: 2px solid rgba(212,170,96,.45);
  border-radius: 14px;
  box-shadow:
    inset 0 0 0 5px #0d1520,
    inset 0 0 0 7px rgba(212,170,96,.1),
    0 12px 48px rgba(0,0,0,.8);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* 헤더 */
.sp-popup-header {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px 12px;
  border-bottom: 1px solid rgba(212,170,96,.2);
}
.sp-popup-title {
  font-size: var(--fs-xl);
  letter-spacing: .5px;
}
.sp-popup-close {
  background: none;
  border: none;
  font-size: var(--fs-lg);
  cursor: pointer;
  padding: 2px 6px;
  border-radius: var(--r);
  transition: background .12s;
}
.sp-popup-close:hover { background: rgba(255,255,255,.07); }

/* 본체 */
.sp-popup-body {
  flex: 1;
  min-height: 0;
}

/* 푸터 */
.sp-popup-footer {
  flex-shrink: 0;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 12px 18px;
  border-top: 1px solid rgba(212,170,96,.15);
}
</style>
