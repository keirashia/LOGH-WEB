<template>
  <Teleport to="body">
    <transition name="jp-fade">
      <div v-if="show && job" class="jp-box" @click.stop>

        <div class="jp-head">
          <span class="serif gold jp-name">{{ jobName }}</span>
          <div class="jp-badges">
            <span class="jp-badge mono">{{ CATEGORY_LABEL[job.category] ?? job.category }}</span>
            <span v-if="job.faction" class="jp-badge mono" :class="`fc-${job.faction}`">
              {{ FACTION_NAMES[job.faction] ?? job.faction }}
            </span>
          </div>
        </div>

        <div v-if="job.desc" class="jp-desc serif">{{ job.desc }}</div>

        <template v-if="hasEffects">
          <div class="jp-sep">능력치 보너스</div>
          <div class="jp-effects">
            <div v-for="(val, key) in job.effects" :key="key" class="jp-effect-row">
              <span class="jp-el serif">{{ EFFECT_LABELS[key] ?? key }}</span>
              <span class="jp-ev mono gold">+{{ val }}</span>
            </div>
          </div>
        </template>

        <div class="jp-flags">
          <span v-if="job.canCommand" class="jp-flag">지휘 가능</span>
          <span v-if="job.canGovern"  class="jp-flag">통치 가능</span>
        </div>

        <button class="btn btn-gold jp-close" @click="$emit('close')">닫기</button>

      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue'
import { JOB_MAP } from '@/data/base/jobs/jobData.js'

const props = defineProps({
  show:    { type: Boolean, default: false },
  jobCode: { type: String,  default: null },
})
defineEmits(['close'])

const FACTION_NAMES  = { REH: '은하제국', FPA: '자유행성동맹', PZN: '페잔' }
const CATEGORY_LABEL = { noble: '귀족', military: '군사', political: '정치', admin: '행정', other: '기타' }
const EFFECT_LABELS  = {
  CMD: '통솔', CSM: '운용', ATT: '공격', DEF: '방어', FST: '기동',
  MNG: '운영', INF: '정보', GFG: '육전', AFG: '공전', PLT: '정치',
}

const job     = computed(() => props.jobCode ? (JOB_MAP[props.jobCode] ?? null) : null)
const jobName = computed(() => job.value?.name?.find(e => e.code === 'Kr')?.context ?? props.jobCode ?? '?')
const hasEffects = computed(() => job.value && Object.keys(job.value.effects ?? {}).length > 0)
</script>

<style scoped>
.jp-box {
  position: fixed;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: min(90vw, 320px);
  z-index: 3000;
  background: linear-gradient(180deg, #101828 0%, #0b1220 100%);
  border: 1px solid rgba(212,170,96,.4);
  border-radius: var(--r);
  padding: 16px 18px 14px;
  box-shadow: 0 8px 40px rgba(0,0,0,.9);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.jp-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
.jp-name { font-size: 1.7vh; letter-spacing: .8px; }

.jp-badges { display: flex; gap: 5px; flex-shrink: 0; }
.jp-badge {
  font-size: 1.1vh; padding: 2px 8px;
  background: rgba(255,255,255,.08);
  border: 1px solid rgba(255,255,255,.15);
  border-radius: 8px; color: var(--t1);
  letter-spacing: .4px;
}
.jp-badge.fc-REH { color: var(--REH); border-color: rgba(200,60,60,.4); background: rgba(200,60,60,.08); }
.jp-badge.fc-FPA { color: var(--FPA); border-color: rgba(60,120,200,.4); background: rgba(60,120,200,.08); }
.jp-badge.fc-PZN { color: var(--PZN); border-color: rgba(60,180,120,.4); background: rgba(60,180,120,.08); }

.jp-desc {
  font-size: 1.4vh; color: var(--t1); line-height: 1.7;
  letter-spacing: .3px; padding: 8px 0;
  border-top: 1px solid var(--bd);
}

.jp-sep {
  font-size: 1.1vh; font-family: var(--font-mono);
  color: var(--t2); letter-spacing: .8px;
  border-top: 1px solid var(--bd); padding-top: 8px;
}

.jp-effects { display: flex; flex-direction: column; gap: 6px; }
.jp-effect-row {
  display: flex; justify-content: space-between; align-items: center;
  font-size: 1.4vh;
}
.jp-el { color: var(--t1); letter-spacing: .3px; }
.jp-ev { font-size: 1.5vh; }

.jp-flags {
  display: flex; gap: 6px; flex-wrap: wrap;
  min-height: 0;
}
.jp-flag {
  font-size: 1.1vh; font-family: var(--font-serif);
  color: var(--tg); padding: 3px 10px;
  border: 1px solid rgba(212,170,96,.35);
  border-radius: 8px; background: rgba(212,170,96,.08);
  letter-spacing: .4px;
}
.jp-flags:empty { display: none; }

.jp-close { width: 100%; justify-content: center; margin-top: 2px; }

.jp-fade-enter-active { transition: opacity .15s, transform .15s; }
.jp-fade-leave-active { transition: opacity .1s; }
.jp-fade-enter-from   { opacity: 0; transform: translate(-50%, -48%); }
.jp-fade-leave-to     { opacity: 0; transform: translate(-50%, -50%); }
</style>
