<template>
  <div class="page">

    <div class="top-nav">
      <div class="nav-title">
        <span class="serif">게임 옵션</span>
        <span class="mono dim nav-year">{{ cur.nameKr }}</span>
      </div>
      <button class="close-btn mono" @click="router.push('/lobby/single/new')">✕</button>
    </div>

    <div class="body">
      <div v-for="grp in optGroups" :key="grp.key" class="opt-group">
        <div class="opt-label mono dim">{{ grp.label }}</div>
        <div class="opt-row">
          <button v-for="opt in grp.opts" :key="opt.val"
                  class="opt-btn"
                  :class="{ active: localOpts[grp.key] === opt.val }"
                  @click="localOpts[grp.key] = opt.val">
            <span class="opt-name serif">{{ opt.name }}</span>
            <span class="opt-desc mono dim">{{ opt.desc }}</span>
          </button>
        </div>
      </div>
    </div>

    <div class="action-bar">
      <button class="btn" @click="router.back()">← 뒤로</button>
      <button class="btn btn-gold" @click="onNext">다음 →</button>
    </div>

  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { SCENARIOS } from '@/data/scenarios/scenarioData.js'

const route  = useRoute()
const router = useRouter()

const cur = computed(() => SCENARIOS.find(s => s.id === route.params.scId) ?? SCENARIOS[0])

const localOpts = reactive({ npcAppearance: 'fact', npcBehavior: 'fact' })

const optGroups = [
  {
    key: 'npcAppearance',
    label: 'NPC 등장',
    opts: [
      { val: 'fact',    name: '사실', desc: '원작 인물만 등장' },
      { val: 'fiction', name: '가상', desc: '추가 인물 등장 가능' },
    ],
  },
  {
    key: 'npcBehavior',
    label: 'NPC 행동',
    opts: [
      { val: 'fact',    name: '사실', desc: '원작 역사대로 행동' },
      { val: 'fiction', name: '가상', desc: 'AI가 자유롭게 판단' },
    ],
  },
]

function onNext() {
  router.push({
    name: 'scenario-char',
    params: { scId: route.params.scId },
    query: { ...localOpts },
  })
}
</script>

<style scoped>
.page {
  width: 100%; height: 100%;
  display: flex; flex-direction: column;
  background: #020508;
  overflow: hidden;
}

.top-nav {
  display: flex; align-items: center;
  padding: 0 1.5vw; height: 7vh;
  background: rgba(2,5,8,.9);
  border-bottom: 1px solid rgba(212,170,96,.15);
  flex-shrink: 0;
}
.nav-title {
  flex: 1; display: flex; flex-direction: column; align-items: center; gap: 2px;
}
.nav-title .serif { font-size: 3.0vh; color: var(--t1); }
.nav-year { font-size: 1.8vh; }
.close-btn {
  flex-shrink: 0; width: 3.5vh; height: 3.5vh;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.6vh;
  background: rgba(255,255,255,.05);
  border: 1px solid rgba(255,255,255,.1);
  border-radius: 50%; color: var(--t2); cursor: pointer; transition: all .13s;
}
.close-btn:hover { color: var(--t1); border-color: rgba(255,255,255,.3); }

.body {
  flex: 1; overflow-y: auto;
  padding: 24px 20px;
  display: flex; flex-direction: column; gap: 24px;
}

.opt-group { display: flex; flex-direction: column; gap: 10px; }
.opt-label { font-size: 1.4vh; letter-spacing: 1px; }
.opt-row   { display: flex; gap: 10px; }
.opt-btn {
  flex: 1; padding: 14px 16px;
  display: flex; flex-direction: column; gap: 5px; text-align: left;
  background: var(--bg3); border: 1px solid var(--bd); border-radius: var(--r);
  cursor: pointer; transition: all .13s;
}
.opt-btn:hover  { background: var(--bgh); }
.opt-btn.active { border-color: var(--tg); background: rgba(212,170,96,.08); }
.opt-name { font-size: 1.8vh; color: var(--t1); }
.opt-desc { font-size: 1.2vh; }

.action-bar {
  flex-shrink: 0; display: flex; align-items: stretch;
  padding: 0.1vh 2vw; height: 7vh; gap: 1.5vw;
  background: rgba(2,5,8,.85);
  border-top: 1px solid rgba(212,170,96,.15);
}
.action-bar > button {
  flex: 1; font-size: 1.8vh; padding: 0;
  display: flex; align-items: center; justify-content: center;
}
</style>
