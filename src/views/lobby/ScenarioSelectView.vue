<template>
  <div class="sc-wrap">
    <Step1HistoryGraph v-if="step === 1" @select="onEventSelect" />
    <Step2GameOptions
      v-else-if="step === 2"
      :event="selEvent"
      @back="step = 1"
      @next="onOptionsNext"
    />
    <Step3CharSelect
      v-else-if="step === 3"
      :event="selEvent"
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
import Step2GameOptions  from './Step2GameOptions.vue'
import Step3CharSelect   from './Step3CharSelect.vue'

const router = useRouter()
const game   = useGameStore()

const step     = ref(1)
const selEvent = ref(null)
const options  = ref({ npcAppearance: 'fact', npcBehavior: 'fact' })

function onEventSelect(evt) {
  selEvent.value = evt
  step.value = 2
}

function onOptionsNext(opts) {
  options.value = opts
  step.value = 3
}

function onStart(char) {
  if (!selEvent.value?.id) return
  game.startGame(selEvent.value.id, char.CHA_NATION)
  router.push('/game')
}
</script>

<style scoped>
.sc-wrap {
  width: 100%; height: 100%;
  background: var(--bg);
  display: flex;
  overflow: hidden;
}
</style>
