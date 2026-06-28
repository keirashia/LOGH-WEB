<template>
  <aside class="side">
    <div class="tabs">
      <button v-for="t in TABS" :key="t.id"
              class="tab" :class="{ on: activeTab===t.id }"
              @click="activeTab=t.id">
        {{ t.icon }} {{ t.label }}
      </button>
    </div>
    <div class="tc">
      <!-- 함대 탭 -->
      <template v-if="activeTab==='fleets'">
        <div v-for="fl in game.pFleets" :key="fl.id"
             class="fleet-card" :class="{ sel: game.selectedFleet===fl.id, dep: fl.status==='deployed' }"
             @click="game.selectFleet(fl.id)">
          <div class="fc-top">
            <span class="serif" style="font-size:12px">{{ fl.name }}</span>
            <span class="mono" :class="stCls(fl.status)" style="font-size:10px">{{ stLbl(fl.status) }}</span>
          </div>
          <div class="dim mono" style="font-size:10px;margin:3px 0">🚀 {{ fl.ships.toLocaleString() }}척</div>
          <div class="dim" style="font-size:10px">📍 {{ game.systems[fl.location]?.name || fl.location }}</div>
          <div class="fc-cmd">
            <span style="font-size:16px">{{ chr(fl.commander)?.portrait }}</span>
            <span class="dim" style="font-size:10px">{{ charName(chr(fl.commander)) }}</span>
          </div>
        </div>
      </template>
      <!-- 인물 탭 -->
      <template v-if="activeTab==='chars'">
        <div v-for="c in game.pChars" :key="c.id"
             class="char-card" @click="game.openModal('char',{charId:c.id})">
          <span class="cc-pt">{{ c.portrait }}</span>
          <div>
            <div class="serif" style="font-size:11px">{{ charName(c) }}</div>
            <div class="dim" style="font-size:10px">{{ c.rank }}</div>
            <div v-if="c.jobs?.[0]" class="gold mono" style="font-size:9px;margin-top:2px">{{ c.jobs[0].jobCode }}</div>
            <div class="cc-stats">
              <span class="cs-p">전{{ c.military }}</span>
              <span class="cs-p">정{{ c.politics }}</span>
              <span class="cs-p">지{{ c.intelligence }}</span>
            </div>
          </div>
        </div>
      </template>
      <!-- 첩보 탭 -->
      <template v-if="activeTab==='intel'">
        <div v-for="(f,fid) in enemyFacs" :key="fid" class="intel-card">
          <div :class="`fc-${fid}`" style="font-size:13px;font-family:var(--font-serif);margin-bottom:7px">
            {{ f.flag }} {{ f.nameKr }}
          </div>
          <div class="dim" style="font-size:11px">보유 성계: {{ game.sysCounts[fid]||0 }}개</div>
          <div class="dim" style="font-size:11px">자금: ???</div>
        </div>
      </template>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import { charName } from '@/utils/charUtils'

const game = useGameStore()
const activeTab = ref('fleets')
const TABS = [
  { id:'fleets', icon:'🚀', label:'함대' },
  { id:'chars',  icon:'👤', label:'인물' },
  { id:'intel',  icon:'🔍', label:'첩보' },
]
const enemyFacs = computed(() => {
  const r = {}
  Object.entries(game.factions).forEach(([id,f]) => { if(id !== game.playerFaction) r[id]=f })
  return r
})
const chr = id => game.characters[id]
function stLbl(s) { return {standby:'대기',deployed:'출격',retreat:'철수'}[s]||s }
function stCls(s) { return {standby:'dim',deployed:'alert',retreat:'gold'}[s] }
</script>

<style scoped>
.side{width:178px;flex-shrink:0;display:flex;flex-direction:column;border-right:1px solid var(--bd);background:var(--bg3);overflow:hidden;transition:transform .25s ease}

@media (orientation:landscape) and (max-height:480px){
  .side{position:absolute;left:0;top:0;bottom:0;z-index:100;transform:translateX(-100%);box-shadow:4px 0 24px rgba(0,0,0,.6)}
  .side.is-open{transform:translateX(0)}
}
.tabs{display:flex;border-bottom:1px solid var(--bd);flex-shrink:0}
.tab{flex:1;padding:8px 2px;background:none;border:none;color:var(--t2);font-size:11px;cursor:pointer;transition:all .15s;border-bottom:2px solid transparent}
.tab.on{color:var(--tg);border-bottom-color:var(--tg);background:rgba(255,255,255,.02)}
.tc{flex:1;overflow-y:auto;padding:7px}
.fleet-card{padding:9px;margin-bottom:6px;background:var(--bg4);border:1px solid var(--bd);border-radius:var(--r);cursor:pointer;transition:all .15s}
.fleet-card:hover{background:var(--bgh)}
.fleet-card.sel{border-color:var(--tg)}
.fleet-card.dep{border-left:3px solid var(--ta)}
.fc-top{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:3px}
.fc-cmd{display:flex;align-items:center;gap:5px;margin-top:5px}
.char-card{display:flex;gap:8px;align-items:flex-start;padding:9px;margin-bottom:6px;background:var(--bg4);border:1px solid var(--bd);border-radius:var(--r);cursor:pointer;transition:all .15s}
.char-card:hover{background:var(--bgh)}
.cc-pt{font-size:20px;flex-shrink:0}
.cc-stats{display:flex;gap:4px;flex-wrap:wrap;margin-top:3px}
.cs-p{font-size:9px;font-family:var(--font-mono);padding:1px 4px;background:var(--bg3);border-radius:2px;color:var(--t2)}
.intel-card{padding:10px;margin-bottom:7px;background:var(--bg4);border:1px solid var(--bd);border-radius:var(--r)}
</style>