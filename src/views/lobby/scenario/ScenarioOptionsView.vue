<template>
  <div class="sc-wrap">
    <StarfieldCanvas :star-count="220" :neb-colors="['rgba(41,128,185,', 'rgba(100,50,180,']" />

    <div class="layout">

      <!-- 타이틀 (고정) -->
      <div class="title-block">
        <span class="serif gold title-scenario">{{ cur.nameKr }}</span>
        <div v-if="cur.subTitle" class="subtitle-wrap">
          <button
            class="title-sub-chip mono"
            :class="{ open: showVariants }"
            @click="showVariants = !showVariants"
          >
            {{ cur.subTitle }}
            <span v-if="variantList.length > 1" class="chip-arrow">{{ showVariants ? '▴' : '▾' }}</span>
          </button>
          <Transition name="vpanel">
            <div v-if="showVariants && variantList.length > 1" class="variant-panel">
              <button
                v-for="sc in variantList"
                :key="sc.id"
                class="variant-item mono"
                :class="{ active: sc.id === cur.id }"
                @click="selectVariant(sc)"
              >
                <span class="vi-dot" />
                {{ sc.subTitle }}
              </button>
            </div>
          </Transition>
        </div>
        <div v-if="cur.summary" class="summary-block">
          <div class="summary-rule"><span class="summary-gem">◆</span></div>
          <div class="summary-scroll-wrap" ref="summaryWrapRef">
            <p
              class="sc-summary serif"
              ref="summaryEl"
              :class="{ 'is-scrolling': isOverflowing }"
              :style="isOverflowing ? { '--scroll-dist': scrollDist + 'px' } : {}"
            >{{ cur.summary }}</p>
          </div>
          <div class="summary-rule"><span class="summary-gem">◆</span></div>
        </div>
      </div>

      <!-- 옵션 그룹 (스크롤) -->
      <div class="scroll-body">
        <div class="groups">
          <div v-for="grp in optGroups" :key="grp.key" class="group">
            <div class="group-label mono">{{ grp.label }}</div>
            <div class="group-row">
              <button
                v-for="opt in grp.opts"
                :key="opt.val"
                class="opt-card"
                :class="{ active: lobby.options[grp.key] === opt.val }"
                @click="lobby.options[grp.key] = opt.val"
              >
                <div class="card-corner tl">
                  <span class="cc-icon">{{ opt.icon }}</span>
                </div>
                <div class="card-body">
                  <span class="cb-icon">{{ opt.icon }}</span>
                  <span class="cb-name serif">{{ opt.name }}</span>
                  <span class="cb-desc mono dim">{{ opt.desc }}</span>
                </div>
                <div class="card-corner br">
                  <span class="cc-icon">{{ opt.icon }}</span>
                </div>
                <div v-if="lobby.options[grp.key] === opt.val" class="active-glow" />
              </button>
            </div>
          </div>
        </div>
      </div><!-- /scroll-body -->

      <!-- 푸터 버튼 -->
      <div class="footer">
        <button class="footer-btn" @click="router.back()">
          <span class="mono">← 뒤로</span>
        </button>
        <button class="footer-btn gold-btn" @click="onNext">
          <span class="mono">다음 →</span>
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { SCENARIOS } from '@/data/scenario/scenarioData.js'
import { useLobbyStore } from '@/stores/lobbyStore'
import StarfieldCanvas from '@/components/common/StarfieldCanvas.vue'

const route  = useRoute()
const router = useRouter()
const lobby  = useLobbyStore()


const cur = computed(() => SCENARIOS.find(s => s.id === route.params.scId) ?? SCENARIOS[0])

const showVariants = ref(false)

const variantList = computed(() => {
  if (!cur.value.variants) return []
  const group = SCENARIOS.filter(s => s.variants === cur.value.variants)
  return group.length > 1 ? group : []
})

function selectVariant(sc) {
  showVariants.value = false
  if (sc.id !== cur.value.id) {
    router.replace(`/lobby/single/new/${sc.id}/options`)
  }
}

const summaryWrapRef = ref(null)
const summaryEl      = ref(null)
const isOverflowing  = ref(false)
const scrollDist     = ref(0)

function checkSummaryOverflow() {
  nextTick(() => {
    if (!summaryEl.value || !summaryWrapRef.value) return
    const overflow = summaryEl.value.scrollHeight - summaryWrapRef.value.clientHeight
    isOverflowing.value = overflow > 0
    scrollDist.value    = Math.max(0, overflow)
  })
}

onMounted(checkSummaryOverflow)
watch(cur, checkSummaryOverflow)

const optGroups = [
  {
    key: 'npcAppearance',
    label: 'NPC 등장',
    opts: [
      { val: 'fact',    icon: '📜', name: '사실',  desc: '원작 인물만 등장' },
      { val: 'fiction', icon: '✨', name: '가상',  desc: '추가 인물 등장 가능' },
    ],
  },
  {
    key: 'npcBehavior',
    label: 'NPC 행동',
    opts: [
      { val: 'fact',    icon: '🗺️', name: '사실',  desc: '원작 역사대로 행동' },
      { val: 'fiction', icon: '🤖', name: '가상',  desc: 'AI가 자유롭게 판단' },
    ],
  },
]

function onNext() {
  router.push({ name: 'scenario-char', params: { scId: route.params.scId } })
}
</script>

<style scoped>
.sc-wrap {
  position: relative;
  width: 100%; height: 100%;
  display: flex; align-items: stretch; justify-content: center;
  overflow: hidden;
  background: #020508;
}

.layout {
  position: relative; z-index: 1;
  display: flex; flex-direction: column;
  width: 100%;
  height: 100%;
}

.scroll-body {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex; flex-direction: column; align-items: stretch;
  padding: 2vh 0;
}
.scroll-body::-webkit-scrollbar { width: 4px; }
.scroll-body::-webkit-scrollbar-track { background: transparent; }
.scroll-body::-webkit-scrollbar-thumb { background: rgba(212,170,96,.25); border-radius: 2px; }

/* ── 타이틀 ── */
.title-block {
  display: flex; flex-direction: column; align-items: center; gap: 1vh;
  flex-shrink: 0;
  padding: 4vh 24px 2vh;
  width: 100%; max-width: 640px;
  margin: 0 auto;
  overflow: visible;
}
.title-scenario {
  font-size: 3.6vh;
  line-height: 1.3;
  letter-spacing: 0.5vw;
  text-shadow: 0 0 20px rgba(212,170,96,.5);
}
.subtitle-wrap {
  position: relative;
  display: flex; flex-direction: column; align-items: center;
}
.title-sub-chip {
  font-size: 3vh;
  letter-spacing: 0.2vw;
  color: rgba(212,170,96,.85);
  padding: 0.6vh 2vw;
  border: 1px solid rgba(212,170,96,.5);
  border-radius: 999px;
  background: rgba(212,170,96,.07);
  box-shadow: 0 0 12px rgba(212,170,96,.12);
  cursor: pointer;
  display: flex; align-items: center; gap: 0.6vw;
  white-space: nowrap;
  transition: background .2s, border-color .2s, box-shadow .2s;
}
.title-sub-chip:hover,
.title-sub-chip.open {
  background: rgba(212,170,96,.14);
  border-color: rgba(212,170,96,.8);
  box-shadow: 0 0 18px rgba(212,170,96,.25);
}
.chip-arrow { font-size: 1.4vh; opacity: .7; }

/* variant 드롭다운 */
.variant-panel {
  position: absolute;
  top: calc(100% + 8px);
  left: 50%; transform: translateX(-50%);
  min-width: max-content;
  display: flex; flex-direction: column; gap: 2px;
  background: linear-gradient(165deg, #0d1b2a 0%, #1a082e 60%, #0d1520 100%);
  border: 1px solid rgba(212,170,96,.45);
  border-radius: 12px;
  padding: 6px;
  box-shadow: 0 10px 32px rgba(0,0,0,.8), 0 0 16px rgba(212,170,96,.1);
  z-index: 10;
}
.variant-item {
  display: flex; align-items: center; gap: 10px;
  padding: 0.9vh 1.2vw;
  border-radius: 8px;
  font-size: 2.6vh;
  letter-spacing: 0.12vw;
  color: rgba(212,170,96,.65);
  white-space: nowrap;
  cursor: pointer;
  transition: background .15s, color .15s;
  text-align: left;
}
.variant-item:hover { background: rgba(212,170,96,.1); color: rgba(212,170,96,.95); }
.variant-item.active {
  background: rgba(212,170,96,.15);
  color: rgba(212,170,96,1);
}
.vi-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: rgba(212,170,96,.4);
  flex-shrink: 0;
  transition: background .15s;
}
.variant-item.active .vi-dot { background: rgba(212,170,96,.9); }

/* 패널 트랜지션 */
.vpanel-enter-active, .vpanel-leave-active { transition: opacity .18s, transform .18s; }
.vpanel-enter-from, .vpanel-leave-to { opacity: 0; transform: translateX(-50%) translateY(-6px); }

.summary-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.4vh;
  width: 90%;
  margin-top: 1vh;
  height: 16vh;
}
.summary-scroll-wrap {
  flex: 1;
  overflow: hidden;
  min-height: 0;
  width: 100%;
  display: flex;
  justify-content: center;
}
.summary-rule {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.summary-rule::before,
.summary-rule::after {
  content: '';
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(212,170,96,.35));
}
.summary-rule::after {
  background: linear-gradient(90deg, rgba(212,170,96,.35), transparent);
}
.summary-gem {
  font-size: 1vh;
  color: rgba(212,170,96,.5);
  padding: 0 1vw;
  flex-shrink: 0;
}
.sc-summary {
  font-size: 1.7vh;
  line-height: 1.9;
  color: rgba(195,215,235,.6);
  text-align: center;
  letter-spacing: 0.05vw;
  font-style: italic;
  padding: 0 2%;
  white-space: pre-line;
  will-change: transform;
}
.sc-summary.is-scrolling {
  animation: summary-scroll 10s ease-in-out 1 forwards;
}
@keyframes summary-scroll {
  0%, 20%   { transform: translateY(0); }
  100% { transform: translateY(calc(-1 * var(--scroll-dist, 0px))); }
}

/* ── 옵션 그룹 ── */
.groups {
  display: flex; flex-direction: column; gap: 3vh;
  width: 100%;
  padding: 0 3vw;
}
.group { display: flex; flex-direction: column; gap: 1.2vh; }
.group-label {
  font-size: 1.3vh;
  letter-spacing: 1.5px;
  color: rgba(212,170,96,.6);
  text-align: center;
  text-transform: uppercase;
}
.group-row { display: flex; gap: 2vw; }

/* ── 옵션 카드 ── */
.opt-card {
  flex: 1;
  position: relative;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  height: 22vh;
  padding: 14px;
  background: linear-gradient(165deg, #0d1b2a 0%, #1a082e 60%, #0d1520 100%);
  border: 2px solid rgba(212,170,96,.35);
  border-radius: 14px;
  box-shadow:
    inset 0 0 0 4px #0d1520,
    inset 0 0 0 6px rgba(212,170,96,.1),
    0 6px 24px rgba(0,0,0,.7);
  cursor: pointer;
  transition: transform .2s, border-color .2s, box-shadow .2s;
  overflow: hidden;
  color: var(--t1);
}
.opt-card::before {
  content: '';
  position: absolute; inset: 0;
  background-image:
    repeating-linear-gradient( 45deg, transparent, transparent 10px, rgba(212,170,96,.018) 10px, rgba(212,170,96,.018) 11px),
    repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(212,170,96,.018) 10px, rgba(212,170,96,.018) 11px);
  pointer-events: none;
}
.opt-card:hover:not(.active) {
  border-color: rgba(212,170,96,.6);
  transform: translateY(-4px);
  box-shadow:
    inset 0 0 0 4px #0d1520,
    inset 0 0 0 6px rgba(212,170,96,.25),
    0 14px 40px rgba(0,0,0,.8);
}
.opt-card.active {
  border-color: rgba(212,170,96,.9);
  box-shadow:
    inset 0 0 0 4px #0d1520,
    inset 0 0 0 6px rgba(212,170,96,.35),
    0 10px 36px rgba(212,170,96,.2);
  transform: translateY(-5px);
}

/* 카드 모서리 라벨 */
.card-corner {
  position: absolute;
  display: flex; flex-direction: column; align-items: center; gap: 3px;
  z-index: 2;
}
.card-corner.tl { top: 10px; left: 12px; }
.card-corner.br { bottom: 10px; right: 12px; transform: rotate(180deg); }
.cc-icon { font-size: 2vh; line-height: 1; opacity: 0.5; }

/* 카드 중앙 */
.card-body {
  display: flex; flex-direction: column; align-items: center;
  gap: 1.2vh; z-index: 2; pointer-events: none;
}
.cb-icon { font-size: 5.5vh; }
.cb-name {
  font-size: 3.2vh;
  letter-spacing: 0.2vw;
  color: var(--tg);
  text-shadow: 0 0 14px rgba(212,170,96,.5);
}
.cb-desc { font-size: 1.3vh; letter-spacing: 0.5px; }

/* 선택 시 안쪽 글로우 */
.active-glow {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse at center, rgba(212,170,96,.08) 0%, transparent 70%);
  pointer-events: none;
}

/* ── 푸터 ── */
.footer {
  display: flex; gap: 2vw;
  width: 100%;
  padding: 2vh 3vw;
  flex-shrink: 0;
  border-top: 1px solid rgba(212,170,96,.1);
  background: rgba(2,5,8,.6);
  backdrop-filter: blur(8px);
}
.footer-btn {
  flex: 1;
  position: relative;
  display: flex; align-items: center; justify-content: center;
  padding: 1.8vh 0;
  background: linear-gradient(165deg, #0d1b2a 0%, #1a082e 60%, #0d1520 100%);
  border: 2px solid rgba(212,170,96,.45);
  border-radius: 12px;
  box-shadow:
    inset 0 0 0 4px #0d1520,
    inset 0 0 0 6px rgba(212,170,96,.12),
    0 6px 24px rgba(0,0,0,.6);
  color: rgba(212,170,96,.7);
  cursor: pointer;
  transition: all .2s;
  overflow: hidden;
  font-size: 1.8vh;
  letter-spacing: 0.2vw;
}
.footer-btn::before {
  content: '';
  position: absolute; inset: 0;
  background-image:
    repeating-linear-gradient( 45deg, transparent, transparent 10px, rgba(212,170,96,.018) 10px, rgba(212,170,96,.018) 11px),
    repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(212,170,96,.018) 10px, rgba(212,170,96,.018) 11px);
  pointer-events: none;
}
.footer-btn:hover {
  border-color: rgba(212,170,96,.8);
  color: var(--tg);
  transform: translateY(-3px);
  box-shadow:
    inset 0 0 0 4px #0d1520,
    inset 0 0 0 6px rgba(212,170,96,.3),
    0 12px 36px rgba(212,170,96,.15);
}
.footer-btn > span { position: relative; z-index: 1; }
.gold-btn { flex: 2; }
.gold-btn:hover {
  box-shadow:
    inset 0 0 0 4px #0d1520,
    inset 0 0 0 6px rgba(212,170,96,.4),
    0 14px 44px rgba(212,170,96,.25);
}
</style>
