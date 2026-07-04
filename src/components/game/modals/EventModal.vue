<template>
  <div class="modal-box event-modal">
    <div class="modal-title">{{ payload?.title || '이벤트' }}</div>

    <div v-if="payload?.portrait" class="ev-portrait">
      <span style="font-size:52px">{{ payload.portrait }}</span>
    </div>

    <div class="ev-dialog">
      <div v-if="payload?.speaker" class="dlg-spk mono dim">{{ payload.speaker }}</div>
      <div class="dlg-txt serif">{{ payload?.desc }}</div>
    </div>

    <div v-if="payload?.effect" class="ev-effect">
      <span v-for="(v, k) in payload.effect" :key="k" class="ef-tag"
            :class="v > 0 ? 'pos' : 'neg'">
        {{ effectLabel(k) }} {{ v > 0 ? '+' : '' }}{{ v }}
      </span>
    </div>

    <div class="modal-actions">
      <button v-for="btn in buttons" :key="btn.label"
              :class="['btn', btn.cls || 'btn-gold']"
              @click="btn.action ? (btn.action(), $emit('close')) : $emit('close')">
        {{ btn.label }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({ payload: Object })
defineEmits(['close'])

const buttons = computed(() => props.payload?.buttons ?? [{ label: '확인' }])

const EFFECT_LABELS = {
  morale: '민심', industry: '산업', defense: '방어',
  population: '인구', tax: '세율', gold: '자금',
}
function effectLabel(k) { return EFFECT_LABELS[k] || k }
</script>

<style scoped>
.event-modal { max-width: 340px; }
.ev-portrait {
  display: flex; justify-content: center;
  padding: 12px 0 8px; margin-bottom: 4px;
}
.ev-dialog {
  border-left: 3px solid var(--tg);
  padding: 8px 12px;
  background: rgba(212,170,96,.05);
  border-radius: 0 4px 4px 0;
  margin-bottom: 12px;
}
.dlg-spk { font-size: 9px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
.dlg-txt  { font-size: 12px; line-height: 1.9; color: var(--t2); white-space: pre-line; }
.ev-effect {
  display: flex; flex-wrap: wrap; gap: 5px;
  margin-bottom: 14px;
}
.ef-tag {
  font-size: 10px; font-family: var(--font-mono);
  padding: 2px 7px; border-radius: 10px;
}
.ef-tag.pos { background: rgba(46,204,113,.15); color: #2ecc71; }
.ef-tag.neg { background: rgba(231,76,60,.15);  color: #e74c3c; }
</style>
