<template>
  <div class="cdc-wrap">

    <!-- 프로필 (고정) -->
    <div class="cdc-profile">
      <div class="cdc-img-wrap">
        <img :src="charImgSrc(chaCode)"
             class="cdc-img" @error="handleCharImgError($event, chaCode, 'H')" />
      </div>
      <div class="cdc-info">
        <div class="serif cdc-kr-name">{{ nameData?.name ?? chaCode }}</div>
        <div class="mono dim cdc-en-name">{{ nameData?.nick ?? '' }}</div>
        <div class="cdc-badges">
          <span v-if="charData?.faction" class="nation-badge mono"
                :style="{ background: nationBg, borderColor: nationBorder }">
            {{ NATION_LABEL[charData.faction] ?? charData.faction }}
          </span>
          <span v-for="j in topJobs" :key="j.jobCode" class="job-badge mono">
            {{ JOB_MAP[j.jobCode]?.nameKr ?? j.jobCode }}
          </span>
        </div>
        <div v-if="descData?.desc" class="cdc-desc dim">{{ descData.desc }}</div>
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
        <div v-else v-for="j in jobList" :key="j.jobCode" class="job-item">
          <div>
            <span class="serif" style="font-size:12px">{{ JOB_MAP[j.jobCode]?.nameKr ?? j.jobCode }}</span>
            <span class="mono dim" style="font-size:10px;margin-left:6px">{{ JOB_MAP[j.jobCode]?.nameEn }}</span>
          </div>
          <span class="mono dim" style="font-size:10px">exp {{ j.jobExp }}</span>
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
        <template v-else>
          <TraitBadge
            v-for="t in traitList" :key="t.traitCode"
            :trait="CHAR_TRAIT_MAP[t.traitCode]"
            :char-trait="t"
          />
        </template>
      </div>
    </div>

    <!-- 능력치 아코디언 -->
    <div class="acc-section">
      <button class="acc-head" @click="toggle('stat')">
        <span class="acc-label">능력치</span>
        <span class="acc-sep">|</span>
        <span class="acc-csm mono" v-if="charData">CAP {{ charData.statCsm }}</span>
        <span class="acc-arrow">{{ open.stat ? '▲' : '▼' }}</span>
      </button>
      <div v-if="open.stat" class="acc-body stat-grid">
        <div v-for="[key, label] in STAT_KEYS" :key="key" class="stat-row">
          <span class="stat-lbl dim">{{ label }}</span>
          <div class="stat-bar">
            <div class="stat-fill" :style="{ width: `${charData?.[key] ?? 0}%`, background: statColor(charData?.[key] ?? 0) }" />
          </div>
          <span class="stat-num mono">{{ charData?.[key] ?? '—' }}</span>
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
          <span class="dim" style="font-size:10px;margin-left:auto">{{ charData?.idea ?? '—' }}</span>
        </div>
        <div v-for="[key, label] in TEND_KEYS" :key="key" class="stat-row">
          <span class="stat-lbl dim">{{ label }}</span>
          <div class="stat-bar">
            <div class="stat-fill" :style="{ width: `${charData?.[key] ?? 0}%`, background: '#5bc4a0' }" />
          </div>
          <span class="stat-num mono">{{ charData?.[key] ?? '—' }}</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import TraitBadge from '@/components/char/TraitBadge.vue'
import { charImgSrc, handleCharImgError } from '@/utils/charImg.js'
import { CHAR_BASE }  from '@/data/base/characters/charactersData.js'
import { CHAR_JOBS }  from '@/data/base/characters/charactersJobs.js'
import { CHAR_TRAITS }      from '@/data/base/trait/chars/charTraitData.js'
import { CHAR_TRAIT_MAP }   from '@/data/base/trait/chars/charTraitData.js'
import { JOBS } from '@/data/base/jobs/jobData.js'

const props = defineProps({
  chaCode:    { type: String, required: true },
  scenarioId: { type: String, default: null },
})

// ── 정적 맵 ────────────────────────────────────────────────────
const CHAR_DATA_MAP  = Object.fromEntries(CHAR_BASE.map(c => [c.code, c]))
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
  ['statCmd','통솔'], ['statCsm','카리스마'],
  ['statAtt','공격'], ['statDef','방어'],
  ['statFst','기동'], ['statMng','운영'],
  ['statInf','정보'], ['statGfg','육전'],
  ['statAfg','공전'], ['statMmp','정략'],
]
const TEND_KEYS = [
  ['brave','용맹'],
  ['moral','도덕'],
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
const charData  = computed(() => CHAR_DATA_MAP[props.chaCode] ?? null)
const nameData  = computed(() => charData.value ? { name: charData.value.nameKr, nick: charData.value.nickKr } : null)
const descData  = computed(() => charData.value ? { desc: charData.value.descKr } : null)
const traitListRaw = computed(() =>
  CHAR_TRAITS.filter(t => t.charCode === props.chaCode)
    .sort((a, b) => a.traitStDate - b.traitStDate)
)

const jobList = computed(() =>
  CHAR_JOBS
    .filter(j => j.charCode === props.chaCode)
    .sort((a, b) => a.jobStDate - b.jobStDate)
)
const topJobs   = computed(() => jobList.value.slice(0, 3))
const traitList = computed(() => traitListRaw.value)

// ── 이념 라벨 ────────────────────────────────────────────────
const ideaLabel = computed(() => {
  const v = parseInt(charData.value?.idea) || 0
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
const nationBg     = computed(() => NATION_COLORS[charData.value?.faction]?.bg ?? 'rgba(80,80,80,.2)')
const nationBorder = computed(() => NATION_COLORS[charData.value?.faction]?.border ?? 'rgba(120,120,120,.4)')
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
