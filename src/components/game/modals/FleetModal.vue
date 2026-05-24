<template>
  <div class="modal-box">
    <div class="modal-title">⚔️ 함대 출격 명령</div>
    <!-- 목표 성계 -->
    <div class="m-sec">
      <div class="sec-lbl dim">목표 성계</div>
      <div class="target-box" v-if="targetSys">
        <span style="font-size:22px">{{ ico(targetSys) }}</span>
        <div>
          <div class="serif">{{ targetSys.name }}</div>
          <div class="mono dim" style="font-size:10px">방어 {{ targetSys.defense }}% · {{ fName(targetSys.faction) }}</div>
        </div>
      </div>
      <div class="dim" style="font-size:12px" v-else>맵에서 성계를 먼저 선택하세요.</div>
    </div>
    <!-- 함대 선택 -->
    <div class="m-sec">
      <div class="sec-lbl dim">출격 함대</div>
      <div class="opt-list">
        <label v-for="fl in available" :key="fl.id"
               class="opt-item" :class="{ sel: selFleet===fl.id }"
               @click="selFleet=fl.id">
          <span style="font-size:20px">{{ chr(fl.commander)?.portrait }}</span>
          <div style="flex:1">
            <div class="serif" style="font-size:12px">{{ fl.name }}</div>
            <div class="mono dim" style="font-size:10px">{{ fl.ships.toLocaleString() }}척</div>
          </div>
          <span class="gold" v-if="selFleet===fl.id">✓</span>
        </label>
      </div>
    </div>
    <!-- 작전 선택 -->
    <div class="m-sec">
      <div class="sec-lbl dim">작전 종류</div>
      <div class="op-grid">
        <label v-for="(op,opId) in OPERATION_TYPES" :key="opId"
               class="op-item" :class="{ sel: selOp===opId }"
               @click="selOp=opId">
          <span style="font-size:16px">{{ op.icon }}</span>
          <div>
            <div style="font-size:11px">{{ op.name }}</div>
            <div class="mono dim" style="font-size:9px">성공률 {{ Math.round(op.successRate*100) }}%</div>
          </div>
        </label>
      </div>
    </div>
    <!-- 출격 나레이션 -->
    <div class="m-dialog" v-if="selFleet && selOp && targetSys">
      <div class="dlg-spk mono dim">출격 나레이션</div>
      <div class="dlg-txt serif">{{ narrative }}</div>
    </div>
    <div class="modal-actions">
      <button class="btn" @click="$emit('close')">취소</button>
      <button class="btn btn-red" :disabled="!selFleet||!selOp||!targetSys" @click="confirm">⚔️ 출격!</button>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import { FACTIONS, CHARACTERS, OPERATION_TYPES } from '@/data/masterData'
const props = defineProps({ payload: Object })
const emit = defineEmits(['close'])
const game = useGameStore()
const selFleet = ref(props.payload?.fleetId || game.pFleets.find(f=>f.status==='standby')?.id || null)
const selOp = ref('PRECISION_BOMB')
const targetSys = computed(() => {
  const id = props.payload?.systemId || game.selectedSystem
  return id ? game.systems[id] : null
})
const available = computed(() => game.pFleets.filter(f => f.status==='standby'))
const chr = id => CHARACTERS[id]
const fName = fid => FACTIONS[fid]?.name || '중립'
function ico(s) {
  if (!s) return '🌟'
  if (s.type==='capital') return '🏛'
  if (s.type==='fortress') return '🏰'
  if (s.isGateway) return '🌀'
  return '🌟'
}
const narrative = computed(() => {
  const fl = game.pFleets.find(f=>f.id===selFleet.value)
  const t = targetSys.value
  const op = OPERATION_TYPES[selOp.value]
  if (!fl||!t||!op) return ''
  const cn = CHARACTERS[fl.commander]?.name || fl.name
  return `우주력 ${game.year}년 ${game.impYear}년 ${game.month}월, ${cn}에 이끌린 ${fl.ships.toLocaleString()}척이 ${t.name} 성역에 대한 ${op.name}을 개시한다.`
})
function confirm() {
  if (!selFleet.value||!selOp.value||!targetSys.value) return
  game.deployFleet(selFleet.value, targetSys.value.id, selOp.value)
  emit('close')
}
</script>
<style scoped>
.m-sec{margin-bottom:14px}
.sec-lbl{font-size:10px;letter-spacing:1px;text-transform:uppercase;margin-bottom:7px}
.target-box{display:flex;align-items:center;gap:10px;padding:10px;background:var(--bg4);border-radius:var(--r)}
.opt-list{display:flex;flex-direction:column;gap:5px}
.opt-item{display:flex;align-items:center;gap:9px;padding:8px 11px;border:1px solid var(--bd);border-radius:var(--r);background:var(--bg4);cursor:pointer;transition:all .15s}
.opt-item:hover{background:var(--bgh)}
.opt-item.sel{border-color:var(--tg);background:rgba(212,170,96,.1)}
.op-grid{display:grid;grid-template-columns:1fr 1fr;gap:5px}
.op-item{display:flex;align-items:center;gap:7px;padding:7px 9px;border:1px solid var(--bd);border-radius:var(--r);background:var(--bg4);cursor:pointer;transition:all .15s;font-size:11px}
.op-item:hover{background:var(--bgh)}
.op-item.sel{border-color:var(--empire);background:rgba(192,57,43,.12)}
.m-dialog{border-left:3px solid var(--empire);padding:8px 12px;background:rgba(192,57,43,.05);border-radius:0 4px 4px 0;margin-bottom:4px}
.dlg-spk{font-size:9px;text-transform:uppercase;letter-spacing:1px;margin-bottom:3px;color:var(--t2);font-family:var(--font-mono)}
.dlg-txt{font-size:11px;line-height:1.8;color:var(--t2);font-family:var(--font-serif)}
</style>