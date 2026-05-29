<template>
  <div class="sc-wrap">
    <Step1HistoryGraph
      v-show="step === 1 || step === '1-1'"
      @select="onDetailOpen"
    />
    <ScenarioDetail
      v-if="step === '1-1'"
      :scenario="selScenario"
      class="detail-layer"
      @close="step = 1"
      @start="onDetailStart"
    />
    <Step2GameOptions
      v-else-if="step === 2"
      :event="selScenario"
      @back="step = '1-1'"
      @next="onOptionsNext"
    />
    <Step3CharSelect
      v-else-if="step === 3"
      :event="selScenario"
      :options="options"
      @back="step = 2"
      @start="onStart"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/gameStore'
import Step1HistoryGraph from './Step1HistoryGraph.vue'
import ScenarioDetail    from './ScenarioDetail.vue'
import Step2GameOptions  from './Step2GameOptions.vue'
import Step3CharSelect   from './Step3CharSelect.vue'

const router = useRouter()
const game   = useGameStore()

const step        = ref(1)
const selScenario = ref(null)
const options     = ref({ npcAppearance: 'fact', npcBehavior: 'fact' })

function onDetailOpen(sc) {
  selScenario.value = sc
  step.value = '1-1'
}

function onDetailStart(sc) {
  if (sc) selScenario.value = sc
  step.value = 2
}

function onOptionsNext(opts) {
  options.value = opts
  step.value = 3
}

function onStart(char) {
  if (!selScenario.value?.id) return
  game.startGame(selScenario.value.id, char.CHA_NATION)
  router.push('/game')
}
</script>

<style scoped>
.sc-wrap {
  position: relative;
  width: 100%; height: 100%;
  background: var(--bg);
  display: flex;
  overflow: hidden;
}
.detail-layer {
  position: absolute;
  inset: 0;
}
</style>
