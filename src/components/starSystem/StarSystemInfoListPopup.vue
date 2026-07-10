<template>
  <div class="sl-box" @click.stop>

    <!-- 헤더 -->
    <div class="sl-header">
      <span class="serif gold" style="font-size:14px;letter-spacing:1px">성계</span>
      <span class="mono dim" style="font-size:11px;margin-left:6px">{{ sorted.length }}개</span>
      <button class="sl-close" @click="$emit('close')">✕</button>
    </div>

    <!-- 세력 탭 -->
    <div class="sl-tabs">
      <button
        v-for="t in FACTION_TABS" :key="t.key"
        class="sl-tab"
        :class="{ active: factionTab === t.key, [`sl-tab--${t.key}`]: true }"
        @click="switchTab(t.key)"
      >{{ t.label }}</button>
    </div>

    <!-- 검색 바 -->
    <div class="sl-filter">
      <input v-model="query" class="sl-search" placeholder="성계 이름 검색..." />
    </div>

    <!-- 통합 스크롤 -->
    <div class="sl-scroll">

      <!-- 헤더 행 -->
      <div class="sl-thead">
        <button class="sl-th" :class="{ active: sortKey === 'name' }"       @click="setSort('name')">성계명{{ arrow('name') }}</button>
        <button class="sl-th" :class="{ active: sortKey === 'type' }"       @click="setSort('type')">유형{{ arrow('type') }}</button>
        <button class="sl-th num" :class="{ active: sortKey === 'planets' }" @click="setSort('planets')">행성{{ arrow('planets') }}</button>
        <button class="sl-th num" :class="{ active: sortKey === 'population' }" @click="setSort('population')">인구{{ arrow('population') }}</button>
        <button class="sl-th num" :class="{ active: sortKey === 'industry' }" @click="setSort('industry')">산업{{ arrow('industry') }}</button>
        <button class="sl-th num" :class="{ active: sortKey === 'defense' }"  @click="setSort('defense')">방어{{ arrow('defense') }}</button>
        <button class="sl-th num" :class="{ active: sortKey === 'morale' }"   @click="setSort('morale')">사기{{ arrow('morale') }}</button>
      </div>

      <!-- 데이터 행 -->
      <div
        v-for="s in sorted" :key="s.id"
        class="sl-row"
        :class="{ 'sl-row--sel': selectedId === s.id }"
        @click="selectedId = selectedId === s.id ? null : s.id"
      >
        <div class="sl-cell-name">
          <span class="serif" style="font-size:12px;white-space:nowrap;letter-spacing:.3px">{{ s.name }}</span>
          <span v-if="s.fortress" class="sl-badge mono">요새</span>
        </div>
        <div class="sl-cell mono" :class="`sl-type--${s.type}`" style="font-size:10px">{{ TYPE_LABELS[s.type] ?? s.type }}</div>
        <div class="sl-cell num mono dim" style="font-size:11px">{{ s.planets }}</div>
        <div class="sl-cell num mono" style="font-size:11px" :style="valStyle(s.population, 200)">{{ s.population }}</div>
        <div class="sl-cell num mono" style="font-size:11px" :style="valStyle(s.industry,   100)">{{ s.industry }}</div>
        <div class="sl-cell num mono" style="font-size:11px" :style="valStyle(s.defense,    100)">{{ s.defense }}</div>
        <div class="sl-cell num mono" style="font-size:11px" :style="valStyle(s.morale,     100)">{{ s.morale }}</div>
      </div>

      <!-- 선택 시 상세 -->
      <transition name="sl-detail-fade">
        <div v-if="detail" class="sl-detail">
          <div class="sl-detail-header">
            <span class="serif gold" style="font-size:13px;letter-spacing:.5px">{{ detail.name }}</span>
            <span class="mono dim" style="font-size:10px;margin-left:6px">{{ detail.nameEn }}</span>
          </div>
          <div class="sl-detail-grid">
            <div v-for="p in detail.planets" :key="p.code" class="sl-planet-row">
              <span class="serif" style="font-size:11px;color:var(--t1)">{{ p.nameKr ?? p.name ?? p.code }}</span>
              <span class="mono dim" style="font-size:10px">{{ p.nameEn ?? '' }}</span>
            </div>
            <div v-if="!detail.planets?.length" class="mono dim" style="font-size:11px;padding:4px 0">
              행성 정보 없음
            </div>
          </div>
          <div v-if="detail.desc" class="sl-detail-desc serif">{{ detail.desc }}</div>
        </div>
      </transition>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'

defineProps({ payload: { default: null } })
defineEmits(['close'])

const game = useGameStore()

const FACTION_TABS = [
  { key: 'FPA', label: '동맹' },
  { key: 'REH', label: '제국' },
  { key: 'PZN', label: '페잔' },
]

const factionTab = ref(game.playerFaction)
const query      = ref('')
const sortKey    = ref('population')
const sortDir    = ref(-1)
const selectedId = ref(null)

function switchTab(key) {
  factionTab.value  = key
  selectedId.value  = null
  query.value       = ''
}

const TYPE_LABELS = {
  capital:   '수도',
  fortress:  '요새',
  frontier:  '전초',
  contested: '분쟁',
  noble:     '귀족',
  normal:    '일반',
  neutral:   '중립',
}

// ── 데이터 (선택 세력 성계) ──────────────────────────────────────
const rows = computed(() =>
  Object.values(game.systems)
    .filter(s => s.faction === factionTab.value)
    .map(s => ({
      id:         s.id,
      name:       s.name,
      nameEn:     s.nameEn ?? '',
      type:       s.type ?? 'normal',
      planets:    s.planets?.length ?? 0,
      planetList: s.planets ?? [],
      population: s.population ?? 0,
      industry:   s.industry   ?? 0,
      defense:    s.defense    ?? 0,
      morale:     s.morale     ?? 0,
      fortress:   s.fortress,
      desc:       s.desc ?? '',
    }))
)

// ── 검색 + 정렬 ──────────────────────────────────────────────────
const sorted = computed(() => {
  const q = query.value.trim().toLowerCase()
  const list = q
    ? rows.value.filter(s => s.name.toLowerCase().includes(q) || s.nameEn.toLowerCase().includes(q))
    : rows.value
  return [...list].sort((a, b) => {
    if (sortKey.value === 'name') return sortDir.value * a.name.localeCompare(b.name, 'ko')
    if (sortKey.value === 'type') return sortDir.value * a.type.localeCompare(b.type)
    return sortDir.value * (b[sortKey.value] - a[sortKey.value])
  })
})

const detail = computed(() =>
  selectedId.value ? rows.value.find(s => s.id === selectedId.value) ?? null : null
)

function setSort(key) {
  if (sortKey.value === key) {
    sortDir.value *= -1
  } else {
    sortKey.value = key
    sortDir.value = (key === 'name' || key === 'type') ? 1 : -1
  }
}

function arrow(key) {
  if (sortKey.value !== key) return ''
  return sortDir.value < 0 ? ' ↓' : ' ↑'
}

function valStyle(v, max) {
  const r = v / max
  if (r >= 0.8) return { color: 'var(--tg)' }
  if (r >= 0.5) return { color: 'var(--t1)' }
  if (r >= 0.3) return { color: 'var(--t2)' }
  return { color: 'var(--td)' }
}
</script>

<style scoped>
/* ── 박스 ─────────────────────────────────────────────────────── */
.sl-box {
  width: min(90vw, 540px); height: 88vh;
  display: flex; flex-direction: column;
  background: linear-gradient(180deg, #101828 0%, #0b1220 100%);
  border: 1px solid rgba(212,170,96,.4);
  border-radius: var(--r);
  overflow: clip;
  box-shadow: 0 8px 40px rgba(0,0,0,.9);
}

/* ── 헤더 ─────────────────────────────────────────────────────── */
.sl-header {
  display: flex; align-items: center;
  padding: 10px 16px;
  border-bottom: 1px solid var(--bd);
  flex-shrink: 0;
  background: rgba(255,255,255,.02);
}
.sl-close {
  margin-left: auto;
  background: none; border: none; color: var(--td);
  font-size: 14px; cursor: pointer; padding: 4px 6px; line-height: 1;
  transition: color .15s;
}
.sl-close:hover { color: var(--t1); }

/* ── 세력 탭 ─────────────────────────────────────────────────── */
.sl-tabs {
  display: flex;
  border-bottom: 1px solid var(--bd);
  flex-shrink: 0;
}
.sl-tab {
  flex: 1; padding: 8px 0;
  background: none; border: none;
  font-size: clamp(11px, 2.5vw, 13px);
  font-family: var(--font-serif); letter-spacing: 1px;
  color: var(--td); cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: color .15s, border-color .15s;
  margin-bottom: -1px;
}
.sl-tab:hover { color: var(--t2); }
.sl-tab--FPA.active { color: var(--FPA); border-bottom-color: var(--FPA); }
.sl-tab--REH.active { color: var(--REH); border-bottom-color: var(--REH); }
.sl-tab--PZN.active { color: var(--PZN); border-bottom-color: var(--PZN); }

/* ── 검색 바 ─────────────────────────────────────────────────── */
.sl-filter {
  padding: 8px 16px;
  border-bottom: 1px solid var(--bd);
  flex-shrink: 0;
}
.sl-search {
  width: 100%; padding: 6px 10px; font-size: 12px;
  background: var(--bg4); border: 1px solid var(--bd);
  border-radius: var(--r); color: var(--t1);
  font-family: var(--font-sans); outline: none;
  box-sizing: border-box;
}
.sl-search:focus { border-color: var(--tg); }

/* ── 스크롤 컨테이너 ─────────────────────────────────────────── */
.sl-scroll { flex: 1; overflow: auto; }

/* ── 그리드 공통
   성계명(1fr·min120) | 유형(54px) | 행성(36px) | 인구·산업·방어·사기(42px×4)
*/
.sl-thead,
.sl-row {
  display: grid;
  grid-template-columns: minmax(120px, 1fr) 54px 36px repeat(4, 42px);
  gap: 0 8px;
  padding: 0 16px;
}

/* ── 헤더 ─────────────────────────────────────────────────────── */
.sl-thead {
  position: sticky; top: 0; z-index: 3;
  background: #101828;
  border-bottom: 1px solid var(--bd);
}
.sl-th {
  background: none; border: none;
  color: var(--t1); font-size: clamp(9px, 1.8vw, 11px);
  font-family: var(--font-mono); letter-spacing: .5px;
  cursor: pointer; padding: 6px 0; text-align: left;
  white-space: nowrap; transition: color .15s;
}
.sl-th.num { text-align: right; }
.sl-th.active { color: var(--tg); }

/* ── 데이터 행 ───────────────────────────────────────────────── */
.sl-row {
  align-items: center;
  cursor: pointer;
  border-bottom: 1px solid rgba(255,255,255,.04);
  transition: background .1s;
}
.sl-row:hover    { background: rgba(255,255,255,.04); }
.sl-row--sel     { background: rgba(212,170,96,.06); border-left: 2px solid rgba(212,170,96,.4); }

/* ── 셀 ──────────────────────────────────────────────────────── */
.sl-cell-name {
  display: flex; align-items: center; gap: 6px;
  padding: 7px 0;
}
.sl-cell {
  font-size: 11px; color: var(--t1);
  letter-spacing: .3px; white-space: nowrap;
}
.sl-cell.num { text-align: right; }

/* 유형 색상 */
.sl-type--capital   { color: var(--tg); }
.sl-type--fortress  { color: #b06090; }
.sl-type--frontier  { color: #8090c0; }
.sl-type--contested { color: #c06050; }
.sl-type--noble     { color: #a09060; }

.sl-badge {
  font-size: 9px; color: #b06090;
  border: 1px solid #b06090; border-radius: 3px;
  padding: 1px 4px; letter-spacing: .3px;
}

/* ── 상세 패널 ───────────────────────────────────────────────── */
.sl-detail {
  margin: 0 16px 12px;
  padding: 12px 14px;
  background: rgba(255,255,255,.03);
  border: 1px solid var(--bd);
  border-radius: var(--r);
  display: flex; flex-direction: column; gap: 8px;
}
.sl-detail-header { display: flex; align-items: baseline; gap: 0; }
.sl-detail-grid {
  display: flex; flex-direction: column; gap: 4px;
}
.sl-planet-row {
  display: flex; align-items: baseline; gap: 8px;
}
.sl-detail-desc {
  font-size: 11px; color: var(--t2);
  line-height: 1.7; letter-spacing: .3px;
  border-top: 1px solid var(--bd);
  padding-top: 8px;
}

/* 상세 트랜지션 */
.sl-detail-fade-enter-active { transition: opacity .15s, transform .15s; }
.sl-detail-fade-leave-active { transition: opacity .1s; }
.sl-detail-fade-enter-from   { opacity: 0; transform: translateY(-4px); }
.sl-detail-fade-leave-to     { opacity: 0; }
</style>
