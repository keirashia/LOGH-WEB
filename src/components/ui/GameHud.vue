<template>
  <header class="hud">
    <div class="hud-faction" :class="`bg-${game.playerFaction}`"
         :style="`border-color:${game.pFaction.color}`">
      <span>{{ game.pFaction.flag }}</span>
      <span class="serif" style="font-size:12px;letter-spacing:1px">{{ game.pFaction.name }}</span>
    </div>
    <span class="mono dim" style="font-size:10px;white-space:nowrap">{{ game.dateStr }}</span>
    <div class="hud-res">
      <span>💰</span>
      <span class="gold mono">{{ game.pRes.gold.toLocaleString() }}</span>
      <span class="dim" style="font-size:10px">마크</span>
    </div>
    <div class="hud-ctrl">
      <span v-for="(f,fid) in FACTIONS" :key="fid" class="ctrl-item">
        <span :class="`fc-${fid}`">{{ f.flag }}</span>
        <span class="mono" style="font-size:11px">{{ game.sysCounts[fid]||0 }}</span>
      </span>
    </div>
    <div class="hud-sp" />
    <div class="hud-acts">
      <button class="btn" @click="game.openModal('char')">👤 인사</button>
      <button class="btn btn-gold" @click="game.openModal('finance')">💰 재정</button>
      <button class="btn btn-red" @click="game.openModal('military')">⚔️ 군사</button>
      <button class="btn btn-green" @click="game.openModal('intel')">🔍 정보</button>
      <button class="btn" :class="endBtnCls" @click="game.endTurn()">턴 종료 →</button>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import { FACTIONS } from '@/data/masterData'
const game = useGameStore()
const endBtnCls = computed(() => ({
  EMPIRE:'btn-red', ALLIANCE:'btn-blue', PHEZZAN:'btn-green'
}[game.playerFaction]))
</script>

<style scoped>
.hud{display:flex;align-items:center;gap:10px;padding:0 14px;height:46px;background:var(--bg3);border-bottom:1px solid var(--bd);flex-shrink:0;overflow:hidden}
.hud-faction{display:flex;align-items:center;gap:6px;padding:3px 10px;border-radius:4px;border:1px solid;font-size:14px}
.hud-res{display:flex;align-items:center;gap:5px;font-size:13px;font-family:var(--font-mono)}
.hud-ctrl{display:flex;gap:10px;padding:0 10px;border-left:1px solid var(--bd)}
.ctrl-item{display:flex;align-items:center;gap:3px}
.hud-sp{flex:1}
.hud-acts{display:flex;gap:7px}
.hud-acts .btn{padding:5px 12px;font-size:12px}
</style>