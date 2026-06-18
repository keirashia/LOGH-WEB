<template>
  <div class="sc-wrap">
    <StarfieldCanvas :star-count="250" :neb-colors="['rgba(41,128,185,', 'rgba(192,57,43,', 'rgba(100,50,180,']" />
    <div class="sc-layout">
      <ScTimelineLayout
        :year-groups="yearGroups"
        :sel-year="selYear"
        :sel-year-type="selYearType"
        @select="selectYear"
      />
      <ScEventListPanel
        :sel-year="selYear"
        :sel-year-type="selYearType"
        :events="selEvents"
        :target-sc-id="targetScId"
        @select="onSelect"
        @navigate="handleNavigate"
        @back="router.push('/lobby/single')"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { SCENARIOS } from '@/data/scenario/scenarioData.js'
import { useLobbyStore } from '@/stores/lobbyStore'
import StarfieldCanvas from '@/components/common/StarfieldCanvas.vue'
import ScTimelineLayout from '@/components/lobby/ScTimelineLayout.vue'
import ScEventListPanel from '@/components/lobby/ScEventListLayout.vue'

const router = useRouter()
const lobby  = useLobbyStore()

const ERA_ORDER = { AD: 0, SE: 1, RC: 2 }

const visible = computed(() => SCENARIOS.filter(s => s.showYn !== false))

const yearGroups = computed(() => {
  const m = {}
  visible.value.forEach(s => {
    const key = `${s.yearType}_${s.year}`
    if (!m[key]) m[key] = { yearType: s.yearType, year: s.year, count: 0 }
    m[key].count++
  })
  const sorted = Object.values(m).sort((a, b) => {
    const eo = (ERA_ORDER[a.yearType] ?? 9) - (ERA_ORDER[b.yearType] ?? 9)
    return eo !== 0 ? eo : a.year - b.year
  })
  const total = sorted.reduce((s, y) => s + y.count, 0)
  let cum = 0
  return sorted.map(y => {
    const hasPlayable = visible.value.some(s =>
      s.yearType === y.yearType && s.year === y.year && lobby.isScenarioUnlocked(s.id)
    )
    const densPos = (cum + y.count / 2) / total * 100
    cum += y.count
    return { ...y, densPos, hasPlayable }
  })
})

const selYear     = ref(null)
const selYearType = ref(null)
const targetScId  = ref(null)

function selectYear(year, yearType) {
  selYear.value     = year
  selYearType.value = yearType
  targetScId.value  = null
}

function handleNavigate(sc) {
  selectYear(sc.year, sc.yearType)
  targetScId.value = sc.id
}

const selEvents = computed(() =>
  selYear.value !== null
    ? visible.value.filter(s => s.year === selYear.value && s.yearType === selYearType.value)
    : []
)

function onSelect(sc) {
  router.push(`/lobby/single/new/${sc.id}/options`)
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
.sc-layout { flex: 1; display: flex; overflow: hidden; gap: 12px; position: relative; z-index: 1; }
</style>
