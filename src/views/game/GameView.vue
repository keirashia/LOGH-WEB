<template>
  <div class="game-view" :class="`theme-${game.playerFaction}`">
    <EventLog />
    <GameHud />
    <div class="game-main">
      <SidePanel v-show="false" :class="{ 'is-open': showSide }" />
      <GalaxyMap />
      <InfoPanel v-show="false" :class="{ 'is-open': showInfo }" />

      <Transition name="bd-fade">
        <div v-if="isMobileLs && (showSide || showInfo)"
             class="panel-backdrop"
             @click="showSide = false; showInfo = false" />
      </Transition>

      <template v-if="isMobileLs">
        <button class="panel-tab panel-tab-l" :class="{ on: showSide }"
                @click="showSide = !showSide; showInfo = false">
          {{ showSide ? '✕' : '🚀' }}
        </button>
        <button class="panel-tab panel-tab-r" :class="{ on: showInfo }"
                @click="showInfo = !showInfo; showSide = false">
          {{ showInfo ? '✕' : 'ℹ' }}
        </button>
      </template>
    </div>
    <BottomBar />

    <!-- 모달 -->
    <transition name="fade">
      <div v-if="game.activeModal && modalComp" class="modal-overlay" @click.self="game.closeModal()">
        <transition name="slide-up">
          <component :is="modalComp" v-if="game.activeModal"
                     :payload="game.activeModal.payload"
                     @close="game.closeModal()" />
        </transition>
      </div>
    </transition>

    <!-- 게임 오버 -->
    <transition name="fade">
      <div v-if="game.gameOver" class="go-overlay">
        <div class="go-box panel">
          <div style="font-size:60px">{{ game.winner===game.playerFaction?'🏆':'💀' }}</div>
          <div class="serif gold" style="font-size:38px;letter-spacing:3px">
            {{ game.winner===game.playerFaction?'승리':'패배' }}
          </div>
          <div :class="`fc-${game.winner}`" style="font-size:17px;letter-spacing:2px">
            {{ FACTIONS[game.winner]?.name }} 우주 통일
          </div>
          <div style="display:flex;gap:10px;margin-top:10px">
            <button class="btn btn-gold serif" style="padding:11px 24px;font-size:14px"
                    @click="$router.push('/scenario')">새 게임</button>
            <button class="btn serif" style="padding:11px 24px;font-size:14px"
                    @click="$router.push('/')">타이틀</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { computed, watch, ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/gameStore'
import { FACTIONS } from '@/data/masterData'
import GameHud    from '@/components/ui/GameHud.vue'
import EventLog   from '@/components/ui/EventLog.vue'
import BottomBar  from '@/components/ui/BottomBar.vue'
import SidePanel  from '@/components/game/panels/SidePanel.vue'
import GalaxyMap  from '@/components/game/map/GalaxyMap.vue'
import InfoPanel  from '@/components/game/panels/InfoPanel.vue'
import TaxModal   from '@/components/game/modals/TaxModal.vue'
import FleetModal from '@/components/game/modals/FleetModal.vue'
import BuildModal from '@/components/game/modals/BuildModal.vue'
import CharModal  from '@/components/game/modals/CharModal.vue'
import FinanceModal  from '@/components/game/modals/FinanceModal.vue'
import MilitaryModal from '@/components/game/modals/MilitaryModal.vue'
import IntelModal    from '@/components/game/modals/IntelModal.vue'
import EventModal   from '@/components/game/modals/EventModal.vue'

const router = useRouter()
const game = useGameStore()

const showSide   = ref(false)
const showInfo   = ref(false)
const isMobileLs = ref(false)

function checkMobileLs() {
  isMobileLs.value = window.innerHeight < 480 && window.innerWidth > window.innerHeight
}
onMounted(() => { checkMobileLs(); window.addEventListener('resize', checkMobileLs) })
onUnmounted(() => window.removeEventListener('resize', checkMobileLs))

watch(() => game._pendingBattle, (val) => {
  if (val) router.push('/game/tactical')
})

const MODAL_MAP = { tax:TaxModal, fleet:FleetModal, build:BuildModal, char:CharModal, finance:FinanceModal, military:MilitaryModal, intel:IntelModal, event:EventModal }
const modalComp = computed(() => game.activeModal ? (MODAL_MAP[game.activeModal.name] ?? null) : null)
</script>

<style scoped>
.game-view{display:flex;flex-direction:column;width:100%;height:100%;overflow:hidden;background:var(--bg);padding-bottom:106px}
.theme-REH  {--fc:var(--REH)}
.theme-FPA{--fc:var(--FPA)}
.theme-PZN {--fc:var(--PZN)}
.game-main{display:flex;flex:1;overflow:hidden;position:relative}
.go-overlay{position:fixed;inset:0;z-index:2000;background:rgba(2,5,8,.93);display:flex;align-items:center;justify-content:center;backdrop-filter:blur(8px)}
.go-box{display:flex;flex-direction:column;align-items:center;gap:14px;padding:44px 52px;text-align:center}

.panel-backdrop{position:absolute;inset:0;z-index:90;background:rgba(0,0,0,.5)}
.bd-fade-enter-active,.bd-fade-leave-active{transition:opacity .2s}
.bd-fade-enter-from,.bd-fade-leave-to{opacity:0}

.panel-tab{
  position:absolute; top:50%; transform:translateY(-50%);
  z-index:110; width:28px; height:52px;
  display:flex; align-items:center; justify-content:center;
  background:rgba(10,16,24,.88); border:1px solid var(--bd);
  color:var(--t2); cursor:pointer; font-size:14px;
  transition:all .15s;
}
.panel-tab:hover,.panel-tab.on{border-color:var(--fc);color:var(--fc)}
.panel-tab-l{left:0; border-radius:0 var(--r) var(--r) 0; border-left:none}
.panel-tab-r{right:0; border-radius:var(--r) 0 0 var(--r); border-right:none}

@media (orientation:landscape) and (max-height:480px){
  .game-view{padding-bottom:52px}
}
</style>