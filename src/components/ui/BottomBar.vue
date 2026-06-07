<template>
  <div class="bottom-bar">
    <div class="btns">
      <button class="btn" @click="game.openModal('char')">👤 인사</button>
      <button class="btn btn-gold" @click="game.openModal('finance')">💰 재정</button>
      <button class="btn btn-red" @click="game.openModal('military')">⚔️ 군사</button>
      <button class="btn btn-green" @click="game.openModal('intel')">🔍 정보</button>
    </div>
    <div class="sp" />
    <div class="end">
      <button class="btn" :class="endBtnCls" @click="game.endTurn()">턴 종료</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'
const game = useGameStore()
const endBtnCls = computed(() => ({ REH:'btn-red', FPA:'btn-blue', PZN:'btn-green' }[game.playerFaction]))
</script>

<style scoped>
.bottom-bar{position:fixed;left:0;right:0;bottom:0;display:flex;align-items:center;padding:10px 14px;background:var(--bg3);border-top:1px solid var(--bd);gap:10px;z-index:1500}
.btns{display:flex;gap:8px}
.sp{flex:1}
.end .btn{padding:10px 18px}
@media (max-width:600px){
  .bottom-bar{padding:8px}
  .btns button{padding:8px 10px;font-size:13px}
}
@media (orientation:landscape) and (max-height:480px){
  .bottom-bar{padding:5px 12px}
  .btns button{padding:5px 10px;font-size:12px}
  .end .btn{padding:5px 14px;font-size:12px}
}
</style>
