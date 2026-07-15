<template>
  <button
    v-bind="$attrs"
    class="job-chip mono"
    :class="{ 'is-held': isHeld }"
    @mousedown="onDown"
    @mouseup="onUp"
    @mouseleave="onUp"
    @touchstart.prevent="onDown"
    @touchend.prevent="onUp"
    @touchcancel="onUp"
    @contextmenu.prevent
  >
    <span v-if="isHeld" class="job-chip-gauge"
          :style="{ clipPath: `inset(0 ${100 - gaugePercent}% 0 0)` }" />
    {{ displayName }}
  </button>
  <JobInfoPopup :show="showDetail" :job-code="jobCode" @close="showDetail = false" />
</template>

<script setup>
import { computed, ref, onUnmounted } from 'vue'
import { JOB_MAP } from '@/data/base/jobs/jobData.js'
import JobInfoPopup from '@/components/common/JobInfoPopup.vue'
import { useLang } from '@/composables/useLang'

defineOptions({ inheritAttrs: false })

const props = defineProps({
  jobCode: { type: String, default: null },
  label:   { type: String, default: null }, // 표시명 오버라이드
})

const { lang } = useLang()
const job = computed(() => props.jobCode ? (JOB_MAP[props.jobCode] ?? null) : null)
const displayName = computed(() =>
  props.label
  ?? job.value?.name?.find(e => e.code === lang.value)?.context
  ?? props.jobCode
  ?? '?'
)

const HOLD_MS = 500
const TICK_MS = 16

const gaugePercent = ref(0)
const isHeld       = ref(false)
const showDetail   = ref(false)

let timerId = null
let elapsed = 0

function onDown() {
  if (!job.value) return
  if (showDetail.value) { showDetail.value = false; return }
  isHeld.value = true
  elapsed = 0
  gaugePercent.value = 0
  timerId = setInterval(() => {
    elapsed += TICK_MS
    gaugePercent.value = Math.min((elapsed / HOLD_MS) * 100, 100)
    if (elapsed >= HOLD_MS) {
      stop()
      gaugePercent.value = 0
      isHeld.value = false
      showDetail.value = true
    }
  }, TICK_MS)
}

function onUp() {
  stop()
  if (!showDetail.value) {
    gaugePercent.value = 0
    isHeld.value = false
  }
}

function stop() {
  if (timerId) { clearInterval(timerId); timerId = null }
}

onUnmounted(stop)
</script>

<style scoped>
.job-chip {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 3px 8px;
  background: var(--bg4);
  border: 1px solid var(--bd);
  border-radius: var(--r);
  color: var(--t2);
  font-size: 11px;
  letter-spacing: .3px;
  line-height: 1.6;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  overflow: hidden;
  transition: border-color .15s, background .15s;
}
.job-chip.is-held {
  border-color: rgba(212, 170, 96, .5);
}
.job-chip-gauge {
  position: absolute;
  inset: 0;
  background: rgba(212, 170, 96, .18);
  pointer-events: none;
}
</style>
