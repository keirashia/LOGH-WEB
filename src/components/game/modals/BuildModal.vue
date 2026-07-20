<template>
  <div class="modal-box">
    <div class="modal-title">🔧 건설 명령 — {{ sys?.name?.find(n => n.code === lang)?.context ?? sys?.name?.[0]?.context ?? '' }}</div>
    <div class="m-cur">
      <span class="dim">현재 자금</span>
      <span class="gold mono" style="font-size:16px">{{ game.pRes.gold.toLocaleString() }} 마크</span>
    </div>
    <div v-if="sys?.underConstruction" class="busy-box">
      🔧
      <div>
        <div class="serif" style="font-size:12px">{{ CONSTRUCTION_TYPES[sys.underConstruction.type]?.name }} 건설 중</div>
        <div class="mono dim" style="font-size:10px">{{ sys.underConstruction.turnsLeft }}턴 후 완공</div>
      </div>
    </div>
    <div v-else class="opt-list">
      <label v-for="(ct,ctId) in CONSTRUCTION_TYPES" :key="ctId"
             class="opt-item" :class="{ sel: selType===ctId, disabled: game.pRes.gold < ct.cost }"
             @click="game.pRes.gold >= ct.cost && (selType=ctId)">
        <span style="font-size:20px">{{ ct.icon }}</span>
        <div style="flex:1">
          <div class="serif" style="font-size:13px">{{ ct.name }}</div>
          <div class="dim" style="font-size:10px">
            {{ Object.entries(ct.effect).map(([k,v]) => `${effLbl(k)} +${v}`).join(' / ') }}
          </div>
        </div>
        <div style="text-align:right">
          <div class="gold mono" style="font-size:12px">{{ ct.cost }}</div>
          <div class="mono dim" style="font-size:9px">마크 / {{ ct.turns }}턴</div>
        </div>
        <span class="gold" v-if="selType===ctId">✓</span>
      </label>
    </div>
    <div class="modal-actions">
      <button class="btn" @click="$emit('close')">취소</button>
      <button class="btn btn-gold" :disabled="!selType||!!sys?.underConstruction" @click="confirm">건설 시작</button>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import { CONSTRUCTION_TYPES } from '@/data/masterData'
import { useLang } from '@/composables/useLang'
const props = defineProps({ payload: Object })
const emit = defineEmits(['close'])
const game = useGameStore()
const { lang } = useLang()
const sys = computed(() => game.systems[props.payload?.systemId])
const selType = ref(null)
const EFF = { industry:'산업', defense:'방어', population:'인구', morale:'민심' }
const effLbl = k => EFF[k] || k
function confirm() {
  if (!selType.value) return
  game.buildConstruction(props.payload?.systemId, selType.value)
  emit('close')
}
</script>
<style scoped>
.m-cur{display:flex;justify-content:space-between;align-items:center;padding:10px;background:var(--bg4);border-radius:var(--r);margin-bottom:14px}
.busy-box{display:flex;align-items:center;gap:10px;padding:14px;background:rgba(212,170,96,.08);border:1px solid rgba(212,170,96,.25);border-radius:var(--r);font-size:24px;margin-bottom:4px}
.opt-list{display:flex;flex-direction:column;gap:7px;margin-bottom:4px}
.opt-item{display:flex;align-items:center;gap:11px;padding:11px 13px;border:1px solid var(--bd);border-radius:var(--r);background:var(--bg4);cursor:pointer;transition:all .15s}
.opt-item:hover:not(.disabled){background:var(--bgh)}
.opt-item.sel{border-color:var(--tg);background:rgba(212,170,96,.1)}
.opt-item.disabled{opacity:.4;cursor:not-allowed}
</style>