<template>
  <div class="cdc-wrap">

    <!-- 프로필 (고정) -->
    <div class="cdc-profile">
      <div class="cdc-img-wrap">
        <img v-if="base" :src="charImgSrc(base.CHA_IMG)"
             class="cdc-img" @error="onImgErr" />
        <div v-else class="cdc-img-ph mono">?</div>
      </div>
      <div class="cdc-info">
        <div class="serif cdc-kr-name">{{ base?.CHA_KR_NAME ?? '—' }}</div>
        <div class="mono dim cdc-en-name">{{ base?.CHA_EN_NAME }}</div>
        <div class="cdc-badges">
          <span v-if="tender?.CHA_NATION" class="nation-badge mono"
                :style="{ background: nationBg, borderColor: nationBorder }">
            {{ NATION_LABEL[tender.CHA_NATION] ?? tender.CHA_NATION }}
          </span>
          <span v-for="j in topJobs" :key="j.JOB_CODE" class="job-badge mono">
            {{ JOB_MAP[j.JOB_CODE]?.nameKr ?? j.JOB_CODE }}
          </span>
        </div>
        <div v-if="desc?.descKr" class="cdc-desc dim">{{ desc.descKr }}</div>
      </div>
    </div>

    <!-- 직업 아코디언 -->
    <div class="acc-section">
      <button class="acc-head" :class="{ 'acc-disabled': !jobList.length }" @click="toggle('job')">
        <span class="acc-label">직업</span>
        <span class="acc-sep">|</span>
        <span class="acc-count" v-if="jobList.length">{{ jobList.length }}개</span>
        <span class="acc-empty" v-else>없음</span>
        <span class="acc-arrow" :class="{ 'arr-empty': !jobList.length }">{{ open.job ? '▲' : '▼' }}</span>
      </button>
      <div v-if="open.job" class="acc-body">
        <div v-if="!jobList.length" class="dim" style="font-size:11px;padding:4px 0">없음</div>
        <div v-else v-for="j in jobList" :key="j.JOB_CODE" class="job-item">
          <div>
            <span class="serif" style="font-size:12px">{{ JOB_MAP[j.JOB_CODE]?.nameKr ?? j.JOB_CODE }}</span>
            <span class="mono dim" style="font-size:10px;margin-left:6px">{{ JOB_MAP[j.JOB_CODE]?.nameEn }}</span>
          </div>
          <span class="mono dim" style="font-size:10px">exp {{ j.JOB_EXPS }}</span>
        </div>
      </div>
    </div>

    <!-- 트레잇 아코디언 -->
    <div class="acc-section">
      <button class="acc-head" :class="{ 'acc-disabled': !traitList.length }" @click="toggle('trait')">
        <span class="acc-label">트레잇</span>
        <span class="acc-sep">|</span>
        <span class="acc-count" v-if="traitList.length">{{ traitList.length }}개</span>
        <span class="acc-empty" v-else>없음</span>
        <span class="acc-arrow" :class="{ 'arr-empty': !traitList.length }">{{ open.trait ? '▲' : '▼' }}</span>
      </button>
      <div v-if="open.trait" class="acc-body">
        <div v-if="!traitList.length" class="dim" style="font-size:11px;padding:4px 0">없음</div>
        <div v-else v-for="t in traitList" :key="t.TRAIT_CODE" class="trait-item mono">
          {{ t.TRAIT_CODE }}
          <span class="dim" style="font-size:10px">exp {{ t.TRAIT_EXPS }}</span>
        </div>
      </div>
    </div>

    <!-- 능력치 아코디언 -->
    <div class="acc-section">
      <button class="acc-head" @click="toggle('stat')">
        <span class="acc-label">능력치</span>
        <span class="acc-sep">|</span>
        <span class="acc-csm mono" v-if="status">CAP {{ status.CHA_ST_CSM }}</span>
        <span class="acc-arrow">{{ open.stat ? '▲' : '▼' }}</span>
      </button>
      <div v-if="open.stat" class="acc-body stat-grid">
        <div v-for="[key, label] in STAT_KEYS" :key="key" class="stat-row">
          <span class="stat-lbl dim">{{ label }}</span>
          <div class="stat-bar">
            <div class="stat-fill" :style="{ width: `${status?.[key] ?? 0}%`, background: statColor(status?.[key] ?? 0) }" />
          </div>
          <span class="stat-num mono">{{ status?.[key] ?? '—' }}</span>
        </div>
      </div>
    </div>

    <!-- 성향 아코디언 -->
    <div class="acc-section">
      <button class="acc-head" @click="toggle('tend')">
        <span class="acc-label">성향</span>
        <span class="acc-sep">|</span>
        <span class="acc-arrow">{{ open.tend ? '▲' : '▼' }}</span>
      </button>
      <div v-if="open.tend" class="acc-body">
        <div class="tend-idea">
          <span class="dim" style="font-size:11px;width:36px;flex-shrink:0">이념</span>
          <span class="mono" style="font-size:11px">{{ ideaLabel }}</span>
          <span class="dim" style="font-size:10px;margin-left:auto">{{ tender?.CHA_IDEA ?? '—' }}</span>
        </div>
        <div v-for="[key, label] in TEND_KEYS" :key="key" class="stat-row">
          <span class="stat-lbl dim">{{ label }}</span>
          <div class="stat-bar">
            <div class="stat-fill" :style="{ width: `${tender?.[key] ?? 0}%`, background: '#5bc4a0' }" />
          </div>
          <span class="stat-num mono">{{ tender?.[key] ?? '—' }}</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { charImgSrc } from '@/utils/charImg.js'
import { CHAR_BASE } from '@/data/characters/charBase.js'
import { CHAR_STATUS, CHAR_STATUS_MAP } from '@/data/characters/charStatus.js'
import { CHAR_TENDER } from '@/data/characters/charTender.js'
import { CHAR_DETAIL } from '@/data/characters/charDetail.js'
import { CHAR_DESC } from '@/data/characters/charDesc.js'
import { CHAR_JOBS } from '@/data/characters/charJobs.js'
import { CHAR_TRAITS } from '@/data/characters/charTraits.js'
import { JOBS } from '@/data/jobs/jobData.js'

const props = defineProps({
  chaCode:    { type: String, required: true },
  scenarioId: { type: String, default: null },
})

// ── 정적 맵 ────────────────────────────────────────────────────
const CHAR_BASE_MAP   = Object.fromEntries(CHAR_BASE.map(c => [c.CHA_CODE, c]))
const CHAR_TENDER_MAP = Object.fromEntries(CHAR_TENDER.map(c => [c.CHA_CODE, c]))
const CHAR_DETAIL_MAP = Object.fromEntries(CHAR_DETAIL.map(c => [c.CHA_CODE, c]))
const CHAR_DESC_MAP   = Object.fromEntries(CHAR_DESC.map(c => [c.CHA_CODE, c]))
const CHAR_JOBS_MAP   = Object.fromEntries(CHAR_JOBS.map(c => [c.CHA_CODE, c]))
const CHAR_TRAITS_MAP = Object.fromEntries(CHAR_TRAITS.map(c => [c.CHA_CODE, c]))
const JOB_MAP         = Object.fromEntries(JOBS.map(j => [j.id, j]))

const NATION_LABEL = {
  FPA: '자유행성동맹',
  REH: '은하帝国',
  PZN: '페잔',
  EAT: '지구교',
}
const NATION_COLORS = {
  FPA: { bg: 'rgba(40,100,200,.25)', border: 'rgba(68,136,255,.5)' },
  REH: { bg: 'rgba(180,30,30,.25)', border: 'rgba(220,60,60,.5)' },
  PZN: { bg: 'rgba(40,140,80,.25)', border: 'rgba(60,180,100,.5)' },
  EAT: { bg: 'rgba(120,50,180,.25)', border: 'rgba(160,80,220,.5)' },
}

const STAT_KEYS = [
  ['CHA_ST_CMD','통솔'], ['CHA_ST_CSM','카리스마'],
  ['CHA_ST_ATT','공격'], ['CHA_ST_DEF','방어'],
  ['CHA_ST_FST','기동'], ['CHA_ST_MNG','운영'],
  ['CHA_ST_INF','정보'], ['CHA_ST_GFG','육전'],
  ['CHA_ST_AFG','공전'], ['CHA_ST_MMP','정치'],
]
const TEND_KEYS = [
  ['CHA_BRAVE','용맹'],
  ['CHA_MORAL','도덕'],
]

const IDEA_LABELS = [
  [0,   50,  '민주공화제'],
  [51,  100, '입헌군주제'],
  [101, 150, '온건군주제'],
  [151, 200, '귀족제'],
  [201, 250, '권위주의'],
  [251, 300, '전제군주제'],
]

// ── 아코디언 상태 ────────────────────────────────────────────
const open = reactive({ stat: false, tend: false, trait: false, job: false })
function toggle(key) { open[key] = !open[key] }

// ── 데이터 ───────────────────────────────────────────────────
const base   = computed(() => CHAR_BASE_MAP[props.chaCode] ?? null)
const status = computed(() => CHAR_STATUS_MAP[props.chaCode] ?? null)
const tender = computed(() => CHAR_TENDER_MAP[props.chaCode] ?? null)
const detail = computed(() => CHAR_DETAIL_MAP[props.chaCode] ?? null)
const desc   = computed(() => CHAR_DESC_MAP[props.chaCode] ?? null)
const jobs   = computed(() => CHAR_JOBS_MAP[props.chaCode] ?? null)
const traits = computed(() => CHAR_TRAITS_MAP[props.chaCode] ?? null)

const jobList = computed(() =>
  [...(jobs.value?.jobs ?? [])].sort((a, b) => a.JOB_ST_DATE - b.JOB_ST_DATE)
)
const topJobs = computed(() => jobList.value.slice(0, 3))
const traitList = computed(() => traits.value?.traits ?? [])

// ── 이념 라벨 ────────────────────────────────────────────────
const ideaLabel = computed(() => {
  const v = tender.value?.CHA_IDEA ?? 0
  const found = IDEA_LABELS.find(([lo, hi]) => v >= lo && v <= hi)
  return found ? found[2] : '미상'
})

// ── 능력치 바 색상 ────────────────────────────────────────────
function statColor(v) {
  if (v >= 90) return '#f0c040'
  if (v >= 70) return '#d4aa60'
  if (v >= 50) return '#4a90d9'
  if (v >= 30) return '#5a7aaa'
  return '#445566'
}

// ── 국가 배지 ─────────────────────────────────────────────────
const nationBg     = computed(() => NATION_COLORS[tender.value?.CHA_NATION]?.bg ?? 'rgba(80,80,80,.2)')
const nationBorder = computed(() => NATION_COLORS[tender.value?.CHA_NATION]?.border ?? 'rgba(120,120,120,.4)')

function onImgErr(e) { e.target.style.display = 'none' }
</script>

<style scoped>
.cdc-wrap {
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
}

/* ── 프로필 ──────────────────────────────────────────────── */
.cdc-profile {
  display: flex;
  gap: 14px;
  padding: 16px;
  align-items: flex-start;
}
.cdc-img-wrap {
  width: 12vw;
  aspect-ratio: 180 / 219;
  flex-shrink: 0;
  border-radius: 4px;
  overflow: hidden;
  background: var(--bg4);
  border: 1px solid var(--bd);
  display: flex;
  align-items: center;
  justify-content: center;
}
.cdc-img { width: 100%; height: 100%; object-fit: contain; }
.cdc-img-ph { font-size: 28px; color: var(--t3); }
.cdc-info { flex: 1; display: flex; flex-direction: column; gap: 5px; }
.cdc-kr-name { font-size: 17px; color: var(--tg); }
.cdc-en-name { font-size: 11px; }
.cdc-badges { display: flex; flex-wrap: wrap; gap: 5px; }
.nation-badge {
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 2px;
  border: 1px solid;
}
.job-badge {
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 2px;
  background: rgba(80,100,140,.2);
  border: 1px solid rgba(100,130,180,.35);
  color: var(--t2);
}
.cdc-desc {
  font-size: 2.2vh;
  line-height: 1.7;
  margin-top: 2px;
  height: 14.5vh;
  overflow-y: auto;
  padding: 1vh 10px;
  background: rgba(0, 0, 0, .45);
  border-radius: 6px;
  box-sizing: border-box;
  white-space: pre-line;
}

/* ── 아코디언 공통 ───────────────────────────────────────── */
.acc-section {
  border-top: 1px solid var(--bd);
}
.acc-head {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 11px 16px;
  background: none;
  border: none;
  color: var(--t2);
  font-size: 2.5vh;
  font-family: var(--ff-mono);
  letter-spacing: 1px;
  cursor: pointer;
  text-align: left;
  transition: background .13s;
}
.acc-head:hover:not(:disabled) { background: var(--bgh); }
.acc-disabled { cursor: default; pointer-events: none; }
.acc-label { flex-shrink: 0; width: 44px; color: #fff; white-space: nowrap; }
.acc-sep   { color: var(--bd); font-size: 2.5vh; flex-shrink: 0; padding: 0 2vw; }
.acc-arrow { margin-left: auto; font-size: 2.3vh; color: var(--t3); }
.acc-arrow.arr-empty { color: var(--t3); opacity: .4; }
.acc-count { font-size: 2.3vh; }
.acc-csm   { font-size: 2.3vh; color: var(--tg); }
.acc-empty { font-size: 2.3vh; }
.acc-body {
  padding: 8px 16px 14px;
  display: flex;
  flex-direction: column;
  gap: 7px;
}

/* ── 능력치/성향 바 ─────────────────────────────────────── */
.stat-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1vh 2vw;
}
.stat-row {
  display: flex;
  align-items: center;
  gap: 1vw;
}
.stat-lbl {
  font-size: 1.8vh;
  width: 6vw;
  flex-shrink: 0;
  text-align: right;
}
.stat-bar {
  flex: 1;
  height: 0.6vh;
  background: var(--bg4);
  border-radius: 3px;
  overflow: hidden;
}
.stat-fill {
  height: 100%;
  border-radius: 3px;
  transition: width .3s;
}
.stat-num {
  font-size: 1.8vh;
  width: 3vw;
  text-align: right;
  flex-shrink: 0;
  color: var(--t2);
}

/* ── 성향 이념 ────────────────────────────────────────── */
.tend-idea {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 0 6px;
}

/* ── 트레잇 ──────────────────────────────────────────── */
.trait-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  padding: 4px 0;
  border-bottom: 1px solid var(--bd);
}
.trait-item:last-child { border-bottom: none; }

/* ── 직업 ────────────────────────────────────────────── */
.job-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 0;
  border-bottom: 1px solid var(--bd);
}
.job-item:last-child { border-bottom: none; }
</style>
