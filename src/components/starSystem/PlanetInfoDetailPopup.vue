<template>
  <transition name="ppd-fade">
    <div v-if="show && planet" class="ppd-box" @click.stop>

      <!-- 헤더 -->
      <div class="ppd-head">
        <div>
          <div class="serif gold ppd-name">{{ planet.nameKr }}</div>
          <div v-if="planet.nameEn" class="mono dim" style="font-size:10px;margin-top:2px">{{ planet.nameEn }}</div>
        </div>
        <button class="ppd-close" @click="$emit('close')">✕</button>
      </div>

      <!-- 네비게이터 -->
      <div class="ppd-nav">
        <button class="ppd-nav-btn" :disabled="planets.length <= 1" @click="move(-1)">◀</button>
        <span class="serif ppd-nav-name">{{ planet.nameKr }}</span>
        <span class="mono dim ppd-nav-idx">{{ currentIdx + 1 }}/{{ planets.length }}</span>
        <button class="ppd-nav-btn" :disabled="planets.length <= 1" @click="move(1)">▶</button>
      </div>

      <!-- 탭 -->
      <div class="ppd-tabs">
        <button v-for="t in TABS" :key="t.key"
                class="ppd-tab" :class="{ active: activeTab === t.key }"
                @click="activeTab = t.key">{{ t.label }}</button>
      </div>

      <!-- 콘텐츠 -->
      <div class="ppd-content">

        <!-- 개요 -->
        <template v-if="activeTab === 'overview'">
          <div class="ppd-rows">
            <div class="ppd-row">
              <span class="ppd-rl mono dim">타입</span>
              <span class="ppd-rv serif">{{ PLANET_TYPE[planet.planetType] ?? planet.planetType }}</span>
            </div>
            <div class="ppd-row">
              <span class="ppd-rl mono dim">세력</span>
              <span class="ppd-rv mono" :class="`fc-${planet.faction}`">{{ FACTION_NAMES[planet.faction] ?? planet.faction ?? '—' }}</span>
            </div>
            <div class="ppd-row">
              <span class="ppd-rl mono dim">총독</span>
              <span class="ppd-rv serif">{{ govName }}</span>
            </div>
            <div class="ppd-row">
              <span class="ppd-rl mono dim">방위사령관</span>
              <span class="ppd-rv serif">{{ cmdName }}</span>
            </div>
            <div class="ppd-row ppd-row--link" @click="activeTab = 'pops'">
              <span class="ppd-rl mono dim">인구</span>
              <span class="ppd-rv mono gold">{{ (planet.pops?.unit ?? 0).toLocaleString() }}<span class="dim" style="font-size:10px"> 만명</span></span>
              <span class="ppd-arrow mono dim">›</span>
            </div>
            <div class="ppd-row ppd-row--link" @click="activeTab = 'buildings'">
              <span class="ppd-rl mono dim">건물</span>
              <span class="ppd-rv mono">{{ buildingUsed }}<span class="dim"> / {{ planet.buildings?.maxSize ?? 0 }}</span></span>
              <span class="ppd-arrow mono dim">›</span>
            </div>
          </div>
        </template>

        <!-- 특성 -->
        <template v-else-if="activeTab === 'traits'">
          <div v-if="planet.traitData?.length" class="ppd-trait-list">
            <div v-for="t in planet.traitData" :key="t.id" class="ppd-trait-card">
              <div class="ppd-trait-head">
                <span v-if="t.icon" class="ppd-trait-icon">{{ t.icon }}</span>
                <span class="serif ppd-trait-name">{{ t.nameKr }}</span>
                <span class="mono dim ppd-trait-id">{{ t.id }}</span>
              </div>
              <div v-if="t.desc" class="ppd-trait-desc serif">{{ t.desc }}</div>
            </div>
          </div>
          <div v-else class="ppd-empty serif">특성 없음</div>
        </template>

        <!-- 인구 -->
        <template v-else-if="activeTab === 'pops'">
          <div class="ppd-pops-total">
            총 인구 <span class="mono gold">{{ (planet.pops?.unit ?? 0).toLocaleString() }}</span><span class="mono dim"> 만명</span>
          </div>

          <div v-if="planet.pops?.econ?.length" class="ppd-dist-section">
            <div class="ppd-dist-title mono">경제 성향</div>
            <div v-for="e in planet.pops.econ" :key="e.code" class="ppd-dist-row">
              <span class="ppd-dist-lbl mono dim">{{ e.code }}</span>
              <div class="ppd-dist-bar-wrap">
                <div class="ppd-dist-bar" :style="{ width: pct(e.unit, planet.pops.unit) }" />
              </div>
              <span class="ppd-dist-val mono">{{ pct(e.unit, planet.pops.unit) }}</span>
            </div>
          </div>

          <div v-if="planet.pops?.idea?.length" class="ppd-dist-section">
            <div class="ppd-dist-title mono">체제 성향</div>
            <div v-for="e in planet.pops.idea" :key="e.code" class="ppd-dist-row">
              <span class="ppd-dist-lbl mono dim">{{ e.code }}</span>
              <div class="ppd-dist-bar-wrap">
                <div class="ppd-dist-bar" :style="{ width: pct(e.unit, planet.pops.unit) }" />
              </div>
              <span class="ppd-dist-val mono">{{ pct(e.unit, planet.pops.unit) }}</span>
            </div>
          </div>

          <div v-if="planet.pops?.clique?.length" class="ppd-dist-section">
            <div class="ppd-dist-title mono">파벌 지지</div>
            <div v-for="e in planet.pops.clique" :key="e.code" class="ppd-dist-row">
              <span class="ppd-dist-lbl mono dim">{{ e.code }}</span>
              <div class="ppd-dist-bar-wrap">
                <div class="ppd-dist-bar ppd-dist-bar--clique" :style="{ width: pct(e.unit, planet.pops.unit) }" />
              </div>
              <span class="ppd-dist-val mono">{{ pct(e.unit, planet.pops.unit) }}</span>
            </div>
          </div>

          <div v-if="planet.pops?.jobs?.length" class="ppd-dist-section">
            <div class="ppd-dist-title mono">직업</div>
            <div v-for="e in planet.pops.jobs" :key="e.job_code" class="ppd-dist-row">
              <span class="ppd-dist-lbl mono dim">{{ JOB_LABELS[e.job_code] ?? e.job_code }}</span>
              <div class="ppd-dist-bar-wrap">
                <div class="ppd-dist-bar ppd-dist-bar--job" :style="{ width: pct(e.unit, planet.pops.unit) }" />
              </div>
              <span class="ppd-dist-val mono">{{ e.unit.toLocaleString() }}</span>
            </div>
          </div>
        </template>

        <!-- 건물 -->
        <template v-else-if="activeTab === 'buildings'">
          <div class="ppd-bld-slot mono dim">
            슬롯 {{ buildingUsed }} / {{ planet.buildings?.maxSize ?? 0 }}
          </div>
          <div v-if="planet.buildings?.details?.length" class="ppd-bld-list">
            <div v-for="(d, i) in planet.buildings.details" :key="i"
                 class="ppd-bld-row" :class="{ inactive: !d.active }">
              <span class="ppd-bld-cat mono dim">{{ CAT_LABELS[d.bldCategory] ?? '' }}</span>
              <span class="serif ppd-bld-name">{{ d.bldName }}</span>
              <span class="mono ppd-bld-count">× {{ d.count.toLocaleString() }}</span>
              <span class="mono ppd-bld-status" :class="d.active ? 'active' : 'off'">
                {{ d.active ? '가동' : '정지' }}
              </span>
            </div>
          </div>
          <div v-else class="ppd-empty serif">건물 없음</div>
        </template>

        <!-- 설명 -->
        <template v-else-if="activeTab === 'desc'">
          <p v-if="descText" class="ppd-desc serif">{{ descText }}</p>
          <div v-else class="ppd-empty serif">설명 없음</div>
        </template>

      </div>

      <!-- 닫기 -->
      <div class="ppd-footer">
        <button class="btn btn-gold ppd-close-btn" @click="$emit('close')">닫기</button>
      </div>

    </div>
  </transition>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useGameStore } from '@/stores/gameStore'

const props = defineProps({
  show:        { type: Boolean, default: false },
  planets:     { type: Array,   default: () => [] },
  initialCode: { type: String,  default: null },
})
defineEmits(['close'])

const game = useGameStore()

const currentIdx = ref(0)
const activeTab  = ref('overview')

watch(() => props.initialCode, code => {
  if (!code) return
  const idx = props.planets.findIndex(p => p.code === code)
  currentIdx.value = idx >= 0 ? idx : 0
  activeTab.value  = 'overview'
}, { immediate: true })

watch(() => props.show, v => { if (v) activeTab.value = 'overview' })

const planet = computed(() => props.planets[currentIdx.value] ?? null)

function move(dir) {
  currentIdx.value = (currentIdx.value + dir + props.planets.length) % props.planets.length
  activeTab.value = 'overview'
}

const govName = computed(() => {
  const code = planet.value?.governor
  return (code && game.characters[code]?.name) || '공석'
})
const cmdName = computed(() => {
  const code = planet.value?.commander
  return (code && game.characters[code]?.name) || '공석'
})

const buildingUsed = computed(() =>
  (planet.value?.buildings?.details ?? []).reduce((s, d) => s + d.count, 0)
)

const descText = computed(() => {
  const arr = planet.value?.desc
  if (!arr) return ''
  return (Array.isArray(arr) ? arr.find(e => e.code === 'Kr')?.context : arr) ?? ''
})

function pct(unit, total) {
  if (!total) return '0%'
  return `${Math.round(unit / total * 100)}%`
}

const TABS = [
  { key: 'overview',   label: '개요' },
  { key: 'traits',     label: '특성' },
  { key: 'pops',       label: '인구' },
  { key: 'buildings',  label: '건물' },
  { key: 'desc',       label: '설명' },
]

const PLANET_TYPE = {
  terrestrial: '지상형', gas: '가스형', ocean: '해양형',
  desert: '사막형', ice: '빙하형', volcanic: '화산형', artificial: '인공',
}
const FACTION_NAMES = { REH: '은하제국', FPA: '자유행성동맹', PZN: '페잔' }
const JOB_LABELS = {
  FARMER: '농민', MINER: '광부', WORKER: '노동자', MERCHANT: '상인',
  ADMINISTRATOR: '관료', RESEARCHER: '연구자', GARRISON: '수비대', ARMORER: '조병공',
}
const CAT_LABELS = {
  economic: '경제', military: '군사', administrative: '행정', research: '연구',
}
</script>

<style scoped>
.ppd-box {
  position: fixed;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw; max-width: 420px; height: 90vh;
  z-index: 300;
  background: linear-gradient(180deg, #101828 0%, #0b1220 100%);
  border: 1px solid rgba(212,170,96,.4);
  border-radius: var(--r);
  box-shadow: 0 8px 40px rgba(0,0,0,.9);
  display: flex; flex-direction: column;
  overflow: hidden;
}

/* 헤더 */
.ppd-head {
  display: flex; justify-content: space-between; align-items: flex-start;
  padding: 14px 18px 10px;
  border-bottom: 1px solid var(--bd);
  flex-shrink: 0;
}
.ppd-name  { font-size: 16px; letter-spacing: .5px; }
.ppd-close {
  background: none; border: none; color: var(--td);
  font-size: 14px; cursor: pointer; padding: 2px 4px; line-height: 1;
  flex-shrink: 0; margin-left: 8px;
}
.ppd-close:hover { color: var(--t1); }

/* 네비게이터 */
.ppd-nav {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 16px;
  border-bottom: 1px solid var(--bd);
  flex-shrink: 0;
}
.ppd-nav-btn {
  background: none; border: 1px solid var(--bd); border-radius: 3px;
  color: var(--t2); font-size: 11px; padding: 3px 8px; cursor: pointer;
  transition: color .15s, border-color .15s;
}
.ppd-nav-btn:hover:not(:disabled) { color: var(--tg); border-color: var(--tg); }
.ppd-nav-btn:disabled { opacity: .3; cursor: default; }
.ppd-nav-name { flex: 1; text-align: center; font-size: 13px; letter-spacing: .3px; color: var(--t1); }
.ppd-nav-idx  { font-size: 10px; flex-shrink: 0; }

/* 탭 */
.ppd-tabs {
  display: flex; border-bottom: 1px solid var(--bd); flex-shrink: 0;
}
.ppd-tab {
  flex: 1; padding: 7px 0;
  background: none; border: none; border-bottom: 2px solid transparent;
  font-size: 11px; font-family: var(--font-serif); letter-spacing: .5px;
  color: var(--td); cursor: pointer; margin-bottom: -1px;
  transition: color .15s, border-color .15s;
}
.ppd-tab:hover { color: var(--t2); }
.ppd-tab.active { color: var(--tg); border-bottom-color: var(--tg); }

/* 콘텐츠 */
.ppd-content { flex: 1; overflow-y: auto; padding: 14px 18px; }

/* 개요 탭 */
.ppd-rows { display: flex; flex-direction: column; gap: 1px; }
.ppd-row {
  display: flex; align-items: center; gap: 10px;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255,255,255,.04);
}
.ppd-row:last-child { border-bottom: none; }
.ppd-row--link { cursor: pointer; }
.ppd-row--link:hover { background: rgba(255,255,255,.03); border-radius: 4px; }
.ppd-rl { font-size: 11px; letter-spacing: .3px; width: 72px; flex-shrink: 0; }
.ppd-rv { font-size: 12px; flex: 1; letter-spacing: .3px; }
.ppd-arrow { font-size: 14px; }

/* 특성 탭 */
.ppd-trait-list { display: flex; flex-direction: column; gap: 8px; }
.ppd-trait-card {
  padding: 8px 10px;
  background: rgba(255,255,255,.03);
  border: 1px solid rgba(255,255,255,.06);
  border-radius: var(--r);
}
.ppd-trait-head { display: flex; align-items: center; gap: 6px; margin-bottom: 4px; }
.ppd-trait-icon { font-size: 14px; }
.ppd-trait-name { font-size: 12px; color: var(--t1); letter-spacing: .3px; }
.ppd-trait-id   { font-size: 9px; margin-left: auto; }
.ppd-trait-desc { font-size: 11px; color: var(--t2); line-height: 1.7; letter-spacing: .3px; }

/* 인구 탭 */
.ppd-pops-total {
  font-size: 11px; color: var(--t2); letter-spacing: .3px;
  margin-bottom: 14px; padding-bottom: 10px;
  border-bottom: 1px solid var(--bd);
}
.ppd-dist-section { margin-bottom: 14px; }
.ppd-dist-title { font-size: 10px; letter-spacing: .5px; color: var(--t2); margin-bottom: 6px; }
.ppd-dist-row { display: flex; align-items: center; gap: 7px; margin-bottom: 5px; }
.ppd-dist-lbl { font-size: 10px; width: 56px; flex-shrink: 0; text-align: right; }
.ppd-dist-bar-wrap { flex: 1; height: 5px; background: var(--bg4); border-radius: 3px; overflow: hidden; }
.ppd-dist-bar { height: 100%; background: var(--tg); border-radius: 3px; opacity: .6; }
.ppd-dist-bar--clique { background: var(--FPA); }
.ppd-dist-bar--job    { background: #8090c0; }
.ppd-dist-val { font-size: 10px; width: 36px; text-align: right; flex-shrink: 0; color: var(--t2); }

/* 건물 탭 */
.ppd-bld-slot { font-size: 11px; margin-bottom: 10px; }
.ppd-bld-list { display: flex; flex-direction: column; gap: 1px; }
.ppd-bld-row {
  display: flex; align-items: center; gap: 8px;
  padding: 6px 8px;
  border-bottom: 1px solid rgba(255,255,255,.04);
}
.ppd-bld-row:last-child { border-bottom: none; }
.ppd-bld-row.inactive { opacity: .5; }
.ppd-bld-cat  { font-size: 9px; width: 24px; flex-shrink: 0; }
.ppd-bld-name { font-size: 12px; flex: 1; color: var(--t1); letter-spacing: .3px; }
.ppd-bld-count { font-size: 11px; color: var(--t2); flex-shrink: 0; }
.ppd-bld-status { font-size: 9px; letter-spacing: .3px; flex-shrink: 0; }
.ppd-bld-status.active { color: #2ecc71; }
.ppd-bld-status.off    { color: var(--td); }

/* 설명 탭 */
.ppd-desc {
  font-size: 12px; color: var(--t2); line-height: 1.9;
  letter-spacing: .3px; margin: 0; white-space: pre-line;
}

/* 공통 */
.ppd-empty { font-size: 12px; color: var(--td); letter-spacing: .3px; }

/* 푸터 */
.ppd-footer { padding: 12px 18px; border-top: 1px solid var(--bd); flex-shrink: 0; }
.ppd-close-btn { width: 100%; justify-content: center; }

/* 세력 색상 */
.fc-REH { color: var(--REH); }
.fc-FPA { color: var(--FPA); }
.fc-PZN { color: var(--PZN); }

/* 트랜지션 */
.ppd-fade-enter-active { transition: opacity .18s, transform .18s; }
.ppd-fade-leave-active { transition: opacity .12s; }
.ppd-fade-enter-from   { opacity: 0; transform: translate(-50%, -48%); }
.ppd-fade-leave-to     { opacity: 0; transform: translate(-50%, -50%); }
</style>
