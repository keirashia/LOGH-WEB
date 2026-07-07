<template>
  <transition name="cp-fade">
    <div v-if="show" class="cp-hint" @click.stop="$emit('close')">
      <div class="cp-header">
        <span class="cp-title serif">{{ title }}</span>
        <span class="cp-name serif">{{ name ?? '공석' }}</span>
      </div>
      <template v-if="traits.length">
        <TraitBadge
          v-for="t in traits" :key="t.traitCode"
          :trait="CHAR_TRAIT_MAP[t.traitCode]"
          :char-trait="t"
        />
      </template>
      <div v-else class="cp-no-trait mono dim">트레잇 없음</div>
      <div class="cp-close mono dim">클릭하여 닫기</div>
    </div>
  </transition>
</template>

<script setup>
import TraitBadge from '@/components/char/TraitBadge.vue'
import { CHAR_TRAIT_MAP } from '@/data/base/trait/chars/charTraitData.js'

defineProps({
  show:   { type: Boolean, default: false },
  title:  { type: String,  default: '' },
  name:   { type: String,  default: null },
  traits: { type: Array,   default: () => [] },
})

defineEmits(['close'])
</script>

<style scoped>
.cp-hint {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 190px;
  z-index: 100;
  background: var(--bg3);
  border: 1px solid rgba(212,170,96,.4);
  border-radius: var(--r);
  padding: 12px 10px 8px;
  box-shadow: 0 8px 32px rgba(0,0,0,.85);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 5px;
  max-height: 280px;
  overflow-y: auto;
}
.cp-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  margin-bottom: 4px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--bd);
}
.cp-title {
  font-size: 10px;
  color: var(--td);
  letter-spacing: .5px;
}
.cp-name {
  font-size: 14px;
  color: var(--tg);
  letter-spacing: .5px;
}
.cp-no-trait {
  font-size: 10px;
  text-align: center;
  padding: 4px 0;
}
.cp-close {
  font-size: 9px;
  text-align: center;
  margin-top: 2px;
  letter-spacing: .5px;
}

.cp-fade-enter-active { transition: opacity .18s, transform .18s; }
.cp-fade-leave-active { transition: opacity .12s; }
.cp-fade-enter-from   { opacity: 0; transform: translate(-50%, -48%); }
.cp-fade-leave-to     { opacity: 0; transform: translate(-50%, -50%); }
</style>
