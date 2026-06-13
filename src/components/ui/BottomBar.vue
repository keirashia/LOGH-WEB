<template>
  <div class="bottom-bar">
    <div class="btns">
      <div class="btn-row">
        <button class="btn btn-red" @click="game.openModal('military')">⚔️ 군사</button>
        <button class="btn" @click="game.openModal('char')">👤 인사</button>
        <button class="btn btn-blue" @click="game.openModal('fleet')">🚀 함대</button>
        <button class="btn" @click="game.openModal('build')">🏗️ 기지</button>
      </div>
      <div class="btn-row">
        <button class="btn btn-green" @click="game.openModal('intel')">🔍 정보</button>
        <button class="btn" @click="game.openModal('special')">⚡ 특수</button>
        <button class="btn btn-gold" @click="game.openModal('finance')">💰 재정</button>
      </div>
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
.bottom-bar{position:fixed;left:0;right:0;bottom:0;display:flex;align-items:center;padding:8px 14px;background:var(--bg3);border-top:1px solid var(--bd);gap:10px;z-index:1500}
.btns{display:flex;flex-direction:column;gap:6px}
.btn-row{display:flex;gap:8px}
.sp{flex:1}
.end .btn{padding:10px 18px}
@media (max-width:600px){
  .bottom-bar{padding:6px 8px}
  .btn-row button{padding:6px 8px;font-size:12px}
}
@media (orientation:landscape) and (max-height:480px){
  .bottom-bar{padding:4px 12px}
  .btn-row button{padding:4px 8px;font-size:11px}
  .end .btn{padding:4px 12px;font-size:11px}
}
</style>
