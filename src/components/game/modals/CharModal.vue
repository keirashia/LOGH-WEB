<template>
  <div class="modal-box char-modal">
    <div class="modal-title">👤 인사 관리</div>
    <div class="cm-layout">
      <!-- 인물 목록 -->
      <div class="cm-list">
        <button v-for="c in game.pChars" :key="c.id"
                class="cl-item" :class="{ on: sel?.id===c.id }"
                @click="sel=game.characters[c.id]">
          <span style="font-size:18px">{{ c.portrait }}</span>
          <div>
            <div class="serif" style="font-size:11px">{{ charName(c) }}</div>
            <div class="dim" style="font-size:9px">{{ c.rank }}</div>
          </div>
        </button>
      </div>
      <!-- 상세 -->
      <div class="cm-detail" v-if="sel">
        <div style="font-size:44px;text-align:center">{{ sel.portrait }}</div>
        <div class="serif gold" style="font-size:17px;text-align:center">{{ charName(sel) }}</div>
        <div class="dim" style="font-size:11px;text-align:center">{{ sel.rank }}</div>
        <div class="mono dim" style="font-size:10px;text-align:center;font-style:italic;margin-top:3px">"{{ sel.quote }}"</div>
        <!-- 스탯 -->
        <div class="cd-stats">
          <div v-for="[lbl,val,clr] in statRows" :key="lbl" style="display:flex;align-items:center;gap:7px;margin-bottom:5px">
            <span class="dim" style="font-size:10px;width:44px;flex-shrink:0">{{ lbl }}</span>
            <div class="sbar"><div class="sbar-fill" :style="`width:${val}%;background:${clr}`"/></div>
            <span class="mono" style="font-size:10px;width:24px;text-align:right;flex-shrink:0;color:var(--t2)">{{ val }}</span>
          </div>
        </div>
        <!-- 요직 임명 -->
        <div>
          <div class="dim" style="font-size:10px;letter-spacing:1px;text-transform:uppercase;margin-bottom:7px">요직 임명</div>
          <div class="posts">
            <button v-for="p in posts" :key="p"
                    class="post-btn" :class="{ on: sel.jobs?.some(j => j.jobCode===p) }"
                    @click="assign(p)">{{ p }}</button>
          </div>
        </div>
      </div>
      <div v-else class="dim serif" style="flex:1;display:flex;align-items:center;justify-content:center;font-size:14px">
        ← 인물을 선택하세요
      </div>
    </div>
    <div class="modal-actions">
      <button class="btn" @click="$emit('close')">닫기</button>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import { POSTS } from '@/data/masterData'
import { charName } from '@/utils/charUtils'
const props = defineProps({ payload: Object })
const emit = defineEmits(['close'])
const game = useGameStore()
const sel = ref(
  props.payload?.charId
    ? game.characters[props.payload.charId]
    : game.pChars[0] || null
)
const posts = computed(() => POSTS[game.playerFaction] || [])
const statRows = computed(() => sel.value ? [
  ['전술',    sel.value.military,     '#e74c3c'],
  ['정치',    sel.value.politics,     '#3498db'],
  ['지략',    sel.value.intelligence, '#9b59b6'],
  ['지휘', sel.value.charisma,    '#f39c12'],
  ['충성',    sel.value.loyalty,      '#2ecc71'],
  ['건강',    sel.value.health,       '#1abc9c'],
] : [])
function assign(post) {
  if (!sel.value) return
  game.assignChar(sel.value.id, post)
  sel.value = game.characters[sel.value.id]
}
</script>
<style scoped>
.char-modal{min-width:min(90vw,480px)}
.cm-layout{display:flex;gap:14px;min-height:280px}
.cm-list{width:160px;flex-shrink:0;overflow-y:auto;display:flex;flex-direction:column;gap:5px;max-height:360px}
.cl-item{display:flex;align-items:center;gap:7px;padding:7px 9px;background:var(--bg4);border:1px solid var(--bd);border-radius:var(--r);cursor:pointer;text-align:left;transition:all .15s}
.cl-item:hover{background:var(--bgh)}
.cl-item.on{border-color:var(--tg);background:rgba(212,170,96,.08)}
.cm-detail{flex:1;display:flex;flex-direction:column;gap:10px;overflow-y:auto}
.cd-stats{padding:10px;background:var(--bg4);border-radius:var(--r)}
.posts{display:flex;flex-wrap:wrap;gap:5px}
.post-btn{padding:4px 8px;font-size:10px;border-radius:3px;border:1px solid var(--bd);background:var(--bg4);color:var(--t2);cursor:pointer;transition:all .15s}
.post-btn:hover{background:var(--bgh)}
.post-btn.on{border-color:var(--tg);color:var(--tg);background:rgba(212,170,96,.1)}
</style>