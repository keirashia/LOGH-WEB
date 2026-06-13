<template>
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
      @select="$emit('select', $event)"
      @navigate="handleNavigate"
      @back="$router.push('/lobby/single')"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { SCENARIOS } from '@/data/scenario/scenarioData.js'
import ScTimelineLayout from '@/components/lobby/ScTimelineLayout.vue'
import ScEventListPanel from '@/components/lobby/ScEventListLayout.vue'

defineEmits(['select'])

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
    const densPos     = (cum + y.count / 2) / total * 100
    const hasPlayable = visible.value.some(s =>
      s.yearType === y.yearType && s.year === y.year && s.useYn && s.openPt === 0
    )
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
</script>

<style scoped>
.sc-layout { flex: 1; display: flex; overflow: hidden; gap: 12px; position: relative; z-index: 1; }
</style>
