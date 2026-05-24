<template>
  <div class="evlog" :class="{ open }">
    <div class="ev-hdr" @click="open=!open">
      <span class="mono dim" style="font-size:10px">📋 이벤트 로그</span>
      <span v-if="game.log.length" class="ev-cnt mono">{{ game.log.length }}</span>
      <span style="margin-left:auto;font-size:10px;color:var(--t2)">{{ open?'▼':'▲' }}</span>
    </div>
    <div v-show="open" class="ev-body">
      <div v-for="(e,i) in game.log.slice(0,80)" :key="i"
           class="ev-row" :class="rowCls(e.msg)">
        <span class="mono dim ev-mo">{{ e.month }}월</span>
        <span class="ev-msg">{{ e.msg }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useGameStore } from '@/stores/gameStore'
const game = useGameStore()
const open = ref(true)
function rowCls(m) {
  if (m.startsWith('✅')||m.startsWith('🏆')) return 'ok'
  if (m.startsWith('❌')||m.startsWith('⚠️')) return 'bad'
  if (m.startsWith('📰')) return 'ev'
  if (m.startsWith('────')) return 'turn'
  return ''
}
</script>

<style scoped>
.evlog{flex-shrink:0;background:var(--bg3);border-top:1px solid var(--bd);max-height:28px;transition:max-height .25s ease;overflow:hidden}
.evlog.open{max-height:130px}
.ev-hdr{display:flex;align-items:center;gap:7px;padding:5px 14px;cursor:pointer;user-select:none}
.ev-hdr:hover{background:var(--bgh)}
.ev-cnt{font-size:9px;background:rgba(212,170,96,.2);color:var(--tg);padding:1px 5px;border-radius:3px}
.ev-body{height:100px;overflow-y:auto;padding:2px 14px 6px}
.ev-row{display:flex;gap:9px;font-size:10px;padding:2px 0;color:var(--t2)}
.ev-mo{flex-shrink:0;width:24px;color:var(--td)}
.ev-row.ok .ev-msg{color:#2ecc71}
.ev-row.bad .ev-msg{color:#e74c3c}
.ev-row.ev .ev-msg{color:#f39c12}
.ev-row.turn .ev-msg{color:var(--td);font-family:var(--font-mono);font-size:9px}
</style>