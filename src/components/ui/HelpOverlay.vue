<template>
  <Teleport to="body">
    <div class="ho-backdrop" @click.self="$emit('close')" />
    <div class="ho-box">
      <div class="ho-header">
        <span class="serif gold" style="font-size:14px;letter-spacing:1px">도움말</span>
        <button class="ho-close" @click="$emit('close')">✕</button>
      </div>
      <div class="ho-title serif gold">{{ title }}</div>
      <!-- TODO: helpData.js 연결 후 실제 도움말 본문으로 교체 -->
      <div class="ho-body dim serif">{{ body || '(도움말 준비 중)' }}</div>
      <div class="ho-actions">
        <div class="ho-checks">
          <label class="ho-check-label">
            <input type="checkbox" v-model="checkAll" />
            <span>전부 다시 보지 않기</span>
          </label>
          <label class="ho-check-label">
            <input type="checkbox" v-model="checkThis" />
            <span>해당건 다시 보지 않기</span>
          </label>
        </div>
        <button class="btn btn-gold" style="width:100%;justify-content:center" @click="onClose">닫기</button>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useHelpStore } from '@/stores/helpStore'

const props = defineProps({
  menuId: { type: String, required: true },
  title:  { type: String, default: '도움말' },
  body:   { type: String, default: '' },
})
const emit = defineEmits(['close'])

const help = useHelpStore()

const checkAll  = ref(false)
const checkThis = ref(false)

watch(checkAll, (val) => { if (val) checkThis.value = true })

function onClose() {
  if (checkAll.value)  help.hideAll()
  if (checkThis.value) help.hideThis(props.menuId)
  emit('close')
}
</script>

<style scoped>
.ho-backdrop {
  position: fixed; inset: 0; z-index: 2100;
  background: rgba(0,0,0,.5);
}
.ho-box {
  position: fixed; left: 50%; top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2200;
  width: 90vw; height: 90vh;
  display: flex; flex-direction: column;
  background: linear-gradient(180deg, #101828 0%, #0b1220 100%);
  border: 1px solid rgba(212,170,96,.4);
  border-radius: 12px;
  padding: 18px 20px 14px;
  box-shadow: 0 -4px 32px rgba(0,0,0,.8);
}
.ho-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px 16px; margin: -18px -20px 14px;
  border-bottom: 1px solid var(--bd);
  background: rgba(255,255,255,.02); flex-shrink: 0;
}
.ho-close {
  background: none; border: none; color: var(--td);
  font-size: 14px; cursor: pointer; padding: 4px 6px; line-height: 1;
  transition: color .15s;
}
.ho-close:hover { color: var(--t1); }
.ho-title {
  font-size: 13px; letter-spacing: 1px; margin-bottom: 10px;
}
.ho-body {
  font-size: 12px; line-height: 1.8; margin-bottom: 16px;
  flex: 1; overflow-y: auto;
}
.ho-actions {
  display: flex; flex-direction: column; gap: 10px; flex-shrink: 0;
}
.ho-checks {
  display: grid; grid-template-columns: 1fr 1fr; gap: 7px;
}
.ho-check-label {
  display: flex; align-items: center; gap: 7px;
  padding: 9px 12px;
  border: 1px solid var(--bd); border-radius: var(--r);
  cursor: pointer; font-size: 11px; font-family: var(--font-serif);
  color: var(--t2); letter-spacing: .3px;
  transition: border-color .15s, color .15s;
  user-select: none;
}
.ho-check-label:hover { border-color: var(--bdg); color: var(--t1); }
.ho-check-label input[type="checkbox"] {
  accent-color: var(--tg); width: 14px; height: 14px; flex-shrink: 0; cursor: pointer;
}
.ho-check-label span {
  flex: 1; text-align: center;
}
</style>
