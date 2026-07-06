<template>
  <div class="cdc-wrap">

    <!-- 프로필 (고정) -->
    <div class="cdc-profile">
      <div class="cdc-img-wrap">
        <img :key="chaCode"
             :src="charImgSrc(chaCode)"
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
            {{ JOB_MAP[j.jobCode]?.name?.find(e => e.code === 'Kr')?.context ?? j.jobCode }}
          </span>
        </div>
        <div v-if="descData?.desc" class="cdc-desc dim">{{ descData.desc }}</div>
      </div>
    </div>

    <!-- 직업 -->
    <div class="job-list">
      <div v-if="jobList.length >= 2"
           class="job-toggle-bar mono"
           @click="jobsExpanded = !jobsExpanded">
        <span>직책 {{ jobList.length }}개</span>
        <span class="job-arrow">{{ jobsExpanded ? '▲' : '▼' }}</span>
      </div>
      <div v-if="!jobList.length" class="job-row mono dim">직책 없음</div>
      <template v-else-if="jobsExpanded || jobList.length === 1">
        <div v-for="j in jobList" :key="j.jobCode" class="job-row">
          <span class="job-label serif">{{ JOB_MAP[j.jobCode]?.name?.find(e => e.code === 'Kr')?.context ?? j.jobCode }}</span>
          <div class="job-right mono">
            <span class="job-lv">Lv.{{ j.jobLevel ?? 0 }}</span>
            <div class="job-exp-bar">
              <div class="job-exp-fill" :style="{ width: `${j.jobExp ?? 0}%` }" />
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- 트레잇 -->
    <div class="trait-section">
      <TraitBadge
        v-if="uniqueTrait"
        :trait="uniqueTrait"
        :char-trait="{ traitLv: 0, traitExp: 0 }"
      />
      <div v-else class="no-trait mono dim">트레잇 없음</div>
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
import { reactive, ref, computed } from 'vue'
import TraitBadge from '@/components/char/TraitBadge.vue'
import { charImgSrc, handleCharImgError } from '@/utils/charImg.js'
import {
  CHAR_BASE, CHAR_JOBS,
  CHAR_TRAITS as CHAR_TRAIT_ASSIGNMENTS,
  CHAR_TRAIT_MAP,
  JOB_MAP,
  charName, charNick, charDesc,
} from '@/utils/charUtils.js'

const props = defineProps({
  chaCode:    { type: String, required: true },
  scenarioId: { type: String, default: null },
})

// ── 정적 맵 ────────────────────────────────────────────────────
const CHAR_DATA_MAP = Object.fromEntries(CHAR_BASE.map(c => [c.code, c]))

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
  ['statAfg','공전'], ['statPlt','정략'],
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
const open = reactive({ stat: false, tend: false })
function toggle(key) { open[key] = !open[key] }
const jobsExpanded = ref(true)

// ── 데이터 ───────────────────────────────────────────────────
const charData  = computed(() => CHAR_DATA_MAP[props.chaCode] ?? null)
const nameData  = computed(() => charData.value ? {
  name: charName(charData.value),
  nick: charNick(charData.value),
} : null)
const descData  = computed(() => charData.value ? {
  desc: charDesc(charData.value),
} : null)
const traitListRaw = computed(() =>
  CHAR_TRAIT_ASSIGNMENTS.filter(t => t.charCode === props.chaCode)
    .sort((a, b) => a.traitStDate - b.traitStDate)
)

const jobList = computed(() =>
  CHAR_JOBS
    .filter(j => j.charCode === props.chaCode)
    .sort((a, b) => a.jobStDate - b.jobStDate)
)
const topJobs = computed(() => jobList.value.slice(0, 3))

const uniqueTrait = computed(() => {
  const assignment = CHAR_TRAIT_ASSIGNMENTS.find(
    t => t.charCode === props.chaCode && t.traitCode.startsWith('TRC_U_')
  )
  return assignment ? (CHAR_TRAIT_MAP[assignment.traitCode] ?? null) : null
})

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
  position: relative;
  z-index: 1;
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
.job-list { border-bottom: 1px solid var(--bd); }
.job-toggle-bar {
  display: flex; align-items: center; justify-content: space-between;
  padding: 5px 14px;
  font-size: 1.3vh; letter-spacing: .5px; color: var(--td);
  background: var(--bg3);
  border-bottom: 1px solid var(--bd);
  cursor: pointer; transition: color .13s;
}
.job-toggle-bar:hover { color: var(--t1); }
.job-arrow { font-size: 1.1vh; }
.job-row {
  display: flex; align-items: center; justify-content: space-between;
  padding: 1vh 14px;
  font-size: 1.4vh; letter-spacing: .5px; color: var(--t1);
  border-bottom: 1px solid rgba(255,255,255,.04);
}
.job-row.dim { color: var(--td); }
.job-row:last-child { border-bottom: none; }
.job-label { flex: 1; }
.job-right {
  display: flex; flex-direction: column; align-items: flex-end;
  gap: 3px; flex-shrink: 0;
}
.job-lv { font-size: 1.1vh; color: var(--t2); }
.job-exp-bar {
  width: 40px; height: 3px;
  background: var(--bd); border-radius: 2px; overflow: hidden;
}
.job-exp-fill { height: 100%; background: var(--tg); border-radius: 2px; }

/* ── 트레잇 ────────────────────────────────────────── */
.trait-section {
  padding: 8px 10px;
  border-bottom: 1px solid var(--bd);
  display: flex; flex-direction: column; gap: 4px;
}
.no-trait { font-size: 1.2vh; padding: 2px 4px; }
</style>
