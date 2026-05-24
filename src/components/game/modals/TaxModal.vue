<template>
  <div class="modal-box">
    <div class="modal-title">💰 세율 변경 — {{ sys?.name }}</div>
    <div class="m-cur">
      <span class="dim">현재 세율</span>
      <span class="gold mono" style="font-size:20px">{{ sys?.tax }}%</span>
    </div>
    <div class="m-slide">
      <div class="slide-labels">
        <span class="dim mono">10%</span>
        <span class="gold mono" style="font-size:18px">{{ val }}%</span>
        <span class="dim mono">80%</span>
      </div>
      <input type="range" min="10" max="80" step="5" v-model.number="val"/>
      <div class="slide-hints">
        <span class="dim">낮은 세율 → 민심 ↑</span>
        <span class="dim">높은 세율 → 수입 ↑</span>
      </div>
    </div>
    <div class="m-preview">
      <div class="prev-row"><span class="dim">예상 수입</span><span class="gold mono">+{{ income }}</span></div>
      <div class="prev-row"><span class="dim">민심 변화</span>
        <span :style="`color:${moraleChg>=0?'#2ecc71':'#e74c3c'}`" class="mono">{{ moraleChg>0?'+':'' }}{{ moraleChg }}</span>
      </div>
    </div>
    <div class="m-dialog" v-if="game.playerFaction==='EMPIRE'">
      <div class="dlg-spk mono dim">재상 → 황제</div>
      <div class="dlg-txt serif">황공하오나, 민에 대한 조세를 이와 같이 개정하려 하옵니다만, 폐하의 뜻은 어떠하옵니까.</div>
    </div>
    <div class="m-dialog" v-else>
      <div class="dlg-spk mono dim">최고평의회</div>
      <div class="dlg-txt serif">자유행성동맹 최고평의회의 결정을 전달한다. 내기의 세율은 {{ val }}퍼센트로 결정되었다.</div>
    </div>
    <div class="modal-actions">
      <button class="btn" @click="$emit('close')">취소</button>
      <button class="btn btn-gold" @click="confirm">결정</button>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'
const props = defineProps({ payload: Object })
const emit = defineEmits(['close'])
const game = useGameStore()
const sys = computed(() => game.systems[props.payload?.systemId])
const val = ref(sys.value?.tax || 30)
const income = computed(() => {
  if (!sys.value) return 0
  return Math.floor(sys.value.population * (val.value/100) * (sys.value.industry/100) * 10)
})
const moraleChg = computed(() => sys.value ? -Math.floor((val.value - sys.value.tax) * 0.5) : 0)
function confirm() { game.changeTax(props.payload?.systemId, val.value); emit('close') }
</script>
<style scoped>
.m-cur{display:flex;justify-content:space-between;align-items:center;padding:10px;background:var(--bg4);border-radius:var(--r);margin-bottom:14px}
.m-slide{display:flex;flex-direction:column;gap:7px;margin-bottom:14px}
.slide-labels{display:flex;justify-content:space-between;align-items:center}
.slide-hints{display:flex;justify-content:space-between;font-size:10px}
.m-preview{padding:10px;background:var(--bg4);border-radius:var(--r);display:flex;flex-direction:column;gap:7px;margin-bottom:14px}
.prev-row{display:flex;justify-content:space-between;font-size:12px}
.m-dialog{border-left:3px solid var(--tg);padding:8px 12px;background:rgba(212,170,96,.05);border-radius:0 4px 4px 0;margin-bottom:4px}
.dlg-spk{font-size:9px;text-transform:uppercase;letter-spacing:1px;margin-bottom:3px}
.dlg-txt{font-size:12px;line-height:1.8;color:var(--t2)}
</style>