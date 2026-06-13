<template>
  <div class="sc-wrap">
    <StarfieldCanvas :star-count="250" :neb-colors="['rgba(41,128,185,', 'rgba(192,57,43,', 'rgba(100,50,180,']" />
    <Step1HistoryGraph
      v-if="step === 1"
      @select="onDetailOpen"
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
import StarfieldCanvas from '@/components/common/StarfieldCanvas.vue'
import Step1HistoryGraph from './Step1HistoryGraph.vue'
import Step2GameOptions  from './Step2GameOptions.vue'
import Step3CharSelect   from './Step3CharSelect.vue'

const router = useRouter()
const game   = useGameStore()

const step        = ref(1)
const selScenario = ref(null)
const options     = ref({ npcAppearance: 'fact', npcBehavior: 'fact' })

function onDetailOpen(sc) {
  router.push(`/lobby/single/new/${sc.id}/options`)
}


function onOptionsNext(opts) {
  options.value = opts
  step.value = 3
}

function onStart(char) {
  if (!selScenario.value?.id) return
  game.startGame(selScenario.value.id, char.faction)
  router.push('/game')
}
</script>

<style scoped>
.sc-wrap {
  position: relative;
  width: 100%; height: 100%;
  background: #020508;
  display: flex;
  overflow: hidden;
  padding: 16px;
  gap: 12px;
}
</style>
