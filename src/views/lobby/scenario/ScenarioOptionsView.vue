<template>
  <div class="sc-wrap">
    <StarfieldCanvas :star-count="220" :neb-colors="['rgba(41,128,185,', 'rgba(100,50,180,']" />

    <div class="layout">

      <!-- 타이틀 -->
      <div class="title-block">
        <span class="serif gold title-main">게임 옵션</span>
        <span class="mono dim title-sub">{{ cur.nameKr }}</span>
      </div>

      <!-- 옵션 그룹 -->
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
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { SCENARIOS } from '@/data/scenario/scenarioData.js'
import { useLobbyStore } from '@/stores/lobbyStore'
import StarfieldCanvas from '@/components/common/StarfieldCanvas.vue'

const route  = useRoute()
const router = useRouter()
const lobby  = useLobbyStore()

const cur = computed(() => SCENARIOS.find(s => s.id === route.params.scId) ?? SCENARIOS[0])

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
  display: flex; align-items: center; justify-content: center;
  overflow: hidden;
  background: #020508;
}

.layout {
  position: relative; z-index: 1;
  display: flex; flex-direction: column; align-items: center;
  gap: 3vh;
  padding: 3vh 24px;
  width: 100%; max-width: 600px;
}

/* ── 타이틀 ── */
.title-block {
  display: flex; flex-direction: column; align-items: center; gap: 6px;
}
.title-main {
  font-size: 2.4vh;
  letter-spacing: 0.4vw;
  text-shadow: 0 0 16px rgba(212,170,96,.45);
}
.title-sub { font-size: 1.5vh; }

/* ── 옵션 그룹 ── */
.groups {
  display: flex; flex-direction: column; gap: 3vh;
  width: 100%;
}
.group { display: flex; flex-direction: column; gap: 1.2vh; }
.group-label {
  font-size: 1.3vh;
  letter-spacing: 1.5px;
  color: rgba(212,170,96,.6);
  text-align: center;
  text-transform: uppercase;
}
.group-row { display: flex; gap: 16px; }

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
  display: flex; gap: 16px;
  width: 100%;
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
