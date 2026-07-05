<template>
  <div class="game-view" :class="`theme-${game.playerFaction}`">
    <EventLog />
    <GameHud />
    <div class="game-main">

      <!-- CharInfoPanel: PC(landscape)에서 좌측 고정 -->
      <CharInfoPanel v-if="!isPortrait" />

      <!-- InfoPanel: 성계 선택 시 CharInfoPanel 위를 덮는 overlay -->
      <Transition name="slide-info">
        <InfoPanel v-if="!isPortrait && game.selectedSystem" class="info-panel-overlay" />
      </Transition>

      <!-- GalaxyMap 영역 -->
      <div class="galaxy-area">
        <SidePanel v-show="false" :class="{ 'is-open': showSide }" />
        <GalaxyMap />

        <!-- CharInfoPanel: 모바일(portrait) 오버레이 -->
        <Transition name="slide-char">
          <CharInfoPanel v-if="isPortrait && showCharPanel"
                         :is-overlay="true"
                         @close="showCharPanel = false" />
        </Transition>

        <!-- 버튼 a-1: 모바일 portrait 전용 탭 -->
        <button v-if="isPortrait" class="char-tab-btn"
                :class="{ on: showCharPanel }"
                @click="showCharPanel = !showCharPanel">
          <span class="char-tab-text">
            {{ game.playerChar?.nickKr ?? '인물' }}
          </span>
          <span class="char-tab-dots">
            <span v-for="i in 3" :key="i" class="tab-dot"
                  :class="i <= game._opActionsUsed ? 'used' : 'free'" />
          </span>
        </button>

        <Transition name="bd-fade">
          <div v-if="isMobileLs && (showSide || !!game.selectedSystem)"
               class="panel-backdrop"
               @click="showSide = false; game.selectSystem(null)" />
        </Transition>

        <template v-if="isMobileLs">
          <button class="panel-tab panel-tab-l" :class="{ on: showSide }"
                  @click="showSide = !showSide; game.selectSystem(null)">
            {{ showSide ? '✕' : '🚀' }}
          </button>
          <button v-if="game.selectedSystem" class="panel-tab panel-tab-r" :class="{ on: true }"
                  @click="game.selectSystem(null)">
            ✕
          </button>
        </template>
      </div>

    </div>
    <StrategyBar />

    <!-- 모달 -->
    <transition name="fade">
      <div v-if="game.activeModal && modalComp" class="modal-overlay" @click.self="closeModalSafe">
        <transition name="slide-up">
          <component :is="modalComp" v-if="game.activeModal"
                     :payload="game.activeModal.payload"
                     @close="closeModalSafe" />
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
import StrategyBar from '@/components/ui/StrategyBar.vue'
import SidePanel     from '@/components/game/panels/SidePanel.vue'
import GalaxyMap     from '@/components/game/map/GalaxyMap.vue'
import InfoPanel     from '@/components/game/panels/InfoPanel.vue'
import CharInfoPanel from '@/components/game/panels/CharInfoPanel.vue'
import TaxModal   from '@/components/game/modals/TaxModal.vue'
import FleetModal from '@/components/game/modals/FleetModal.vue'
import BuildModal from '@/components/game/modals/BuildModal.vue'
import CharModal  from '@/components/game/modals/CharModal.vue'
import FinanceModal    from '@/components/game/modals/FinanceModal.vue'
import MilitaryModal   from '@/components/game/modals/MilitaryModal.vue'
import IntelModal      from '@/components/game/modals/IntelModal.vue'
import EventModal      from '@/components/game/modals/EventModal.vue'
import OperationModal  from '@/components/game/modals/OperationModal.vue'
import NationInfoModal from '@/components/game/modals/NationInfoModal.vue'
import NationPostModal from '@/components/game/modals/NationPostModal.vue'

const router = useRouter()
const game = useGameStore()

const showSide      = ref(false)
const showCharPanel = ref(false)
const isMobileLs   = ref(false)
const isPortrait   = ref(false)

function checkLayout() {
  isMobileLs.value = window.innerHeight < 480 && window.innerWidth > window.innerHeight
  isPortrait.value = window.innerWidth <= window.innerHeight
  if (!isPortrait.value) showCharPanel.value = false
}
onMounted(() => {
  checkLayout()
  window.addEventListener('resize', checkLayout)
  window.addEventListener('popstate', onPopState)
})
onUnmounted(() => {
  window.removeEventListener('resize', checkLayout)
  window.removeEventListener('popstate', onPopState)
})

function onPopState() {
  if (game.activeModal) { closeModalSafe(); return }
  if (showCharPanel.value)  { showCharPanel.value = false; history.pushState(null, '') }
}

// ── 전투 확인 모달 (배경클릭/뒤로가기로 응답 없이 닫히면 재소환) ──
// 이 모달은 반드시 네/아니오 응답을 거쳐야 _pendingBattles가 줄어들고
// endTurn()의 _finishTurn() 보류가 풀린다. 응답 없이 닫히면(ctx._handled 없음)
// 큐가 영원히 남아 턴이 멈추므로, 닫힘을 감지해 동일 전투를 다시 띄운다.
function showBattleConfirm(ctx) {
  ctx._notified = true
  const attackerFleet = ctx.attackerFleet

  // 플레이어 캐릭터가 해당 함대(전투 현장)에 있으면 곧바로 전술턴 진입
  const playerCharPresent = game.playerCharCode && (
    attackerFleet.commander === game.playerCharCode ||
    (attackerFleet.officers || []).includes(game.playerCharCode) ||
    (attackerFleet.subCommanders || []).some(c => c.charCode === game.playerCharCode)
  )
  if (playerCharPresent) { router.push('/game/tactical'); return }

  const sysName = game.systems[ctx.targetSystemId]?.name ?? ctx.targetSystemId
  game.openModal('event', {
    battleConfirm: true,
    title: '교전 발생',
    desc: `${sysName}에서 교전이 발생하였습니다.\n상세 전투를 보시겠어요?`,
    buttons: [
      { label: '네',   cls: 'btn-gold', action: () => { ctx._handled = true; router.push('/game/tactical') } },
      {
        label: '아니오', cls: 'btn',
        action: () => {
          ctx._handled = true
          const result = game.autoResolveBattle()
          if (!result) return
          setTimeout(() => {
            game.openModal('event', {
              title: '전투 결과',
              desc: `${sysName} 전투가 자동 처리되었습니다.\n`
                  + `${result.winner === game.playerFaction ? '아군 승리' : '아군 패배'}\n`
                  + `아군 손실 ${result.attackerLosses.toLocaleString()}척 · 적 손실 ${result.defenderLosses.toLocaleString()}척`,
            })
          }, 0)
        },
      },
    ],
  })
}

// 모달을 닫는 모든 경로(배경클릭 / 뒤로가기 / 버튼 close)에서 공통으로 사용.
// 닫힌 모달이 미응답 전투 확인 모달이었다면 같은 전투를 다시 띄운다.
function closeModalSafe() {
  const payload = game.activeModal?.payload
  const wasBattleConfirm = payload?.battleConfirm === true
  const ctx = game._pendingBattles[0]
  game.closeModal()
  if (wasBattleConfirm && ctx && !ctx._handled && game._pendingBattles[0] === ctx) {
    setTimeout(() => showBattleConfirm(ctx), 0)
  }
}

watch(() => game._pendingBattles.length, (len) => {
  if (len === 0) return
  const ctx = game._pendingBattles[0]
  if (ctx._notified) return
  showBattleConfirm(ctx)
}, { immediate: true })

const MODAL_MAP = { tax:TaxModal, fleet:FleetModal, build:BuildModal, char:CharModal, finance:FinanceModal, military:MilitaryModal, intel:IntelModal, event:EventModal, operation:OperationModal, nationInfo:NationInfoModal, nationPost:NationPostModal }
const modalComp = computed(() => game.activeModal ? (MODAL_MAP[game.activeModal.name] ?? null) : null)
</script>

<style scoped>
.game-view{display:flex;flex-direction:column;width:100%;height:100%;overflow:hidden;background:var(--bg);padding-bottom:var(--bar-h)}
.theme-REH{--fc:var(--REH)}
.theme-FPA{--fc:var(--FPA)}
.theme-PZN{--fc:var(--PZN)}
.game-main{display:flex;flex:1;overflow:hidden;position:relative}
.galaxy-area{position:relative;flex:1;display:flex;overflow:hidden}

.info-panel-overlay{
  position:absolute; left:0; top:0; bottom:0;
  width:clamp(200px,22vw,280px);
  z-index:50;
}
.slide-info-enter-active,.slide-info-leave-active{transition:transform .22s ease}
.slide-info-enter-from,.slide-info-leave-to{transform:translateX(-100%)}

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

/* 버튼 a-1 (모바일 세로 탭) */
.char-tab-btn {
  position: absolute;
  top: 0; right: 0;
  width: clamp(32px, 10vw, 52px);
  height: 100%;
  z-index: 120;
  background: rgba(8,12,20,.85);
  border-left: 1px solid var(--bd);
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 8px;
  cursor: pointer; transition: all .15s;
}
.char-tab-btn:hover,.char-tab-btn.on {
  background: rgba(12,20,36,.95);
  border-left-color: var(--tg);
}
.char-tab-text {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  font-family: var(--font-serif);
  font-size: clamp(9px, 1.4vw, 13px);
  color: var(--t2);
  letter-spacing: 2px;
  line-height: 1;
  white-space: nowrap;
  transition: color .15s;
}
.char-tab-btn.on .char-tab-text { color: var(--tg); }
.char-tab-dots { display: flex; flex-direction: column; gap: 3px; }
.tab-dot {
  width: 6px; height: 6px; border-radius: 50%;
  border: 1px solid var(--bd);
}
.tab-dot.free { background: rgba(212,170,96,.3); border-color: var(--tg); }
.tab-dot.used { background: var(--bg4); opacity: .35; }

/* CharInfoPanel 오버레이 슬라이드 트랜지션 */
.slide-char-enter-active { transition: transform .25s cubic-bezier(.34,1.56,.64,1), opacity .2s; }
.slide-char-leave-active { transition: transform .18s ease, opacity .15s; }
.slide-char-enter-from   { transform: translateX(-100%); opacity: 0; }
.slide-char-leave-to     { transform: translateX(-100%); opacity: 0; }
</style>