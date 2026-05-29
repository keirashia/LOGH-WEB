<template>
  <div class="sc-layout">

    <!-- 왼쪽: 수직 타임라인 -->
    <div class="graph-panel">
      <div class="graph-panel-header">
        <span class="serif gold" style="font-size:12px;letter-spacing:1px">역사 타임라인</span>
      </div>

      <div class="graph-track"
           ref="trackRef"
           @mousedown.prevent="startDrag"
           @wheel.prevent="onWheel">

        <!-- 수직 중심선 -->
        <div class="v-line"></div>

        <!-- 상단 끝 블록 -->
        <div class="track-end-block track-end-top" v-if="atTop"></div>

        <!-- 10vh 마진 내부 영역: 핀 + 절단선 -->
        <div class="graph-inner" ref="innerRef">
          <template v-for="(item, i) in timelineItems" :key="item.type === 'year' ? `${item.yearType}_${item.year}` : 'brk-' + i">

            <div v-if="item.type === 'year'"
                 class="year-pin"
                 :class="{ selected: selYear === item.year && selYearType === item.yearType }"
                 :style="{ top: item.top + '%' }"
                 @click.stop="selectYear(item.year, item.yearType)"
                 @mouseenter="hoveredKey = `${item.yearType}_${item.year}`"
                 @mouseleave="hoveredKey = null">
              <div class="pin-label mono"
                   v-show="showLabel(item) || hoveredKey === `${item.yearType}_${item.year}` || (selYear === item.year && selYearType === item.yearType)"
                   :style="{ color: (hoveredKey === `${item.yearType}_${item.year}` || (selYear === item.year && selYearType === item.yearType)) ? 'var(--tg)' : 'var(--t1)' }">
                {{ item.yearType }} {{ item.year }}
              </div>
              <div class="pin-dot"
                   :style="{ width: dotSz(item.count) + 'px', height: dotSz(item.count) + 'px' }">
              </div>
            </div>

            <div v-else-if="item.type === 'break'"
                 class="break-mark"
                 :style="{ top: item.top + '%' }">
              <svg viewBox="0 0 44 12" width="44" height="12" preserveAspectRatio="none">
                <polyline points="0,6 8,1 16,11 24,1 32,11 40,1 44,6"
                          fill="none" stroke="var(--bd)" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </div>

          </template>
        </div>

        <!-- 하단 끝 블록 -->
        <div class="track-end-block track-end-bottom" v-if="atBottom"></div>
      </div>
    </div>

    <!-- 오른쪽: 사건 목록 -->
    <div class="info-panel">

      <div class="info-header">
        <template v-if="selYear !== null">
          <button class="nav-arrow" :disabled="!prevGroup" @click="selectYear(prevGroup.year, prevGroup.yearType)">‹</button>
          <div class="year-info">
            <span class="serif gold" style="font-size:22px">{{ selYearType }} {{ selYear }}년</span>
            <span v-if="selYearType === 'SE'" class="mono dim" style="font-size:13px;margin-left:10px">/ 제국력 {{ selYear - 309 }}년</span>
            <!-- 건수 제거 -->
            <!-- <span class="mono dim" style="font-size:10px;margin-left:10px">{{ selEvents.length }}건</span> -->
          </div>
          <button class="nav-arrow" :disabled="!nextGroup" @click="selectYear(nextGroup.year, nextGroup.yearType)">›</button>
        </template>
        <template v-else>
          <span class="dim" style="font-size:13px">연도를 선택하세요</span>
        </template>
      </div>

      <div class="event-list">
        <template v-if="selYear !== null">
          <button v-for="sc in selEvents" :key="sc.id"
                  class="event-card"
                  :class="{ unimpl: !sc.useYn }"
                  @click="$emit('select', sc)">

            <div class="card-top">
              <div class="tag-row">
                <span v-for="tag in sc.tags" :key="tag"
                      class="evt-tag mono"
                      :style="{ color: TAG_COLORS[tag] ?? 'var(--t2)' }">{{ tag }}</span>
              </div>
              <div class="card-meta mono dim">
                <span v-if="sc.month">{{ sc.month }}월</span>
                <span v-if="sc.useYn" class="star-mark">★</span>
              </div>
            </div>

            <div class="card-name serif">{{ sc.nameKr }}</div>
            <div v-if="sc.nameEn" class="card-na mono dim">{{ sc.nameEn }}</div>          </button>

          <div v-if="selEvents.length === 0" class="no-events dim serif">
            이 연도에 등록된 사건이 없습니다
          </div>
        </template>

        <div v-else class="no-events dim serif">
          왼쪽 타임라인에서 연도를 선택하세요
        </div>
      </div>

      <!-- 하단 네비 -->
      <div class="step-nav">
        <button class="btn" @click="$router.push('/lobby/single')">← 뒤로</button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { SCENARIOS } from '@/data/scenarios/scenario.js'

defineEmits(['select'])

const TAG_COLORS = {
  '사실':       '#4488FF',
  '가상':       '#8844CC',
  '택틱스':     '#CC6622',
  '전투':       '#4488FF',
  '분기점':     '#CC6622',
  '초심자추천': '#44AA66',
  '숙련자추천': '#CC4444',
}

const ERA_ORDER = { AD: 0, SE: 1, RC: 2 }

// ── 연도별 사건 집계 + 밀도 좌표 ──────────────────────────────
const yearGroups = computed(() => {
  const m = {}
  SCENARIOS.forEach(s => {
    const key = `${s.yearType}_${s.year}`
    if (!m[key]) m[key] = { yearType: s.yearType, year: s.year, count: 0 }
    m[key].count++
  })
  const sorted = Object.values(m).sort((a, b) => {
    const eo = (ERA_ORDER[a.yearType] ?? 9) - (ERA_ORDER[b.yearType] ?? 9)
    return eo !== 0 ? eo : a.year - b.year
  })
  const total  = sorted.reduce((s, y) => s + y.count, 0)
  let cum = 0
  return sorted.map(y => {
    const densPos = (cum + y.count / 2) / total * 100
    cum += y.count
    return { ...y, densPos }
  })
})

// ── 뷰 상태: 밀도 좌표 [ds, de] (0~100) ──────────────────────
const ds         = ref(0)
const de         = ref(100)
const selYear     = ref(null)
const selYearType = ref(null)
const trackRef    = ref(null)
const innerRef    = ref(null)
const hoveredKey  = ref(null)   // `${yearType}_${year}` 형태

function selectYear(year, yearType) {
  selYear.value     = year
  selYearType.value = yearType
}

// 밀도 좌표 → 뷰 내 비율(%)
function viewPct(densPos) {
  const span = de.value - ds.value
  if (span <= 0) return 50
  return Math.max(0.5, Math.min(99.5, (densPos - ds.value) / span * 100))
}

// 뷰 범위 안의 연도만 렌더링
const visibleYears = computed(() => {
  const pad = (de.value - ds.value) * 0.05
  return yearGroups.value.filter(y =>
    y.densPos >= ds.value - pad && y.densPos <= de.value + pad
  )
})

// ── 라벨 겹침 방지 (세로 기준) ────────────────────────────────
const MIN_GAP_PCT = 8

const labelSet = computed(() => {
  const visible = new Set()
  let lastPct = -Infinity
  for (const yr of visibleYears.value) {
    const p = pinPct(yr)
    if (p < 0 || p > 100) continue
    if (p - lastPct >= MIN_GAP_PCT) {
      visible.add(`${yr.yearType}_${yr.year}`)
      lastPct = p
    }
  }
  return visible
})

function showLabel(yr) {
  return labelSet.value.has(`${yr.yearType}_${yr.year}`)
}

// ── 핀 간 최소 간격 보장 (겹침 방지) ─────────────────────────
const MIN_PIN_GAP = 8

const pinnedPositions = computed(() => {
  const yrs = visibleYears.value
  if (!yrs.length) return new Map()

  const pos = yrs.map(y => viewPct(y.densPos))

  for (let i = 1; i < pos.length; i++) {
    if (pos[i] - pos[i - 1] < MIN_PIN_GAP) pos[i] = pos[i - 1] + MIN_PIN_GAP
  }
  for (let i = pos.length - 2; i >= 0; i--) {
    if (pos[i + 1] - pos[i] < MIN_PIN_GAP) pos[i] = pos[i + 1] - MIN_PIN_GAP
  }

  return new Map(yrs.map((y, i) => [`${y.yearType}_${y.year}`, Math.max(0, Math.min(100, pos[i]))]))
})

function pinPct(yr) {
  return pinnedPositions.value.get(`${yr.yearType}_${yr.year}`) ?? viewPct(yr.densPos)
}

// ── 점 크기 ────────────────────────────────────────────────────
function dotSz(count) {
  return Math.max(5, Math.min(14, 4 + count * 0.9))
}

// ── 드래그 (상하 이동) ─────────────────────────────────────────
let dy0 = 0, ds0 = 0, de0 = 0

function startDrag(e) {
  dy0 = e.clientY
  ds0 = ds.value
  de0 = de.value

  function onMove(ev) {
    const h = innerRef.value?.offsetHeight || trackRef.value?.offsetHeight
    if (!h) return
    const span  = de0 - ds0
    const delta = -((ev.clientY - dy0) / h) * span
    let ns = ds0 + delta
    let ne = de0 + delta
    if (ns < 0)   { ne -= ns;     ns = 0 }
    if (ne > 100) { ns -= ne-100; ne = 100 }
    ds.value = ns
    de.value = ne
  }

  function onUp() {
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('mouseup',   onUp)
  }
  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseup',   onUp)
}

// ── 초기 줌: SE 796 기준, 없으면 마지막 SE, 없으면 마지막 항목 ──
onMounted(() => {
  if (!yearGroups.value.length) return
  const target = yearGroups.value.find(y => y.yearType === 'SE' && y.year === 796)
             ?? yearGroups.value.find(y => y.yearType === 'SE')
             ?? yearGroups.value[yearGroups.value.length - 1]
  if (!target) return
  selYear.value     = target.year
  selYearType.value = target.yearType
  const pivot = target.densPos
  const span  = 100 * 0.8 ** 4
  let ns = pivot - span / 2
  let ne = pivot + span / 2
  if (ns < 0)   { ne -= ns;     ns = 0 }
  if (ne > 100) { ns -= ne-100; ne = 100 }
  ds.value = Math.max(0, ns)
  de.value = Math.min(100, ne)
})

// ── 휠 (스크롤) ────────────────────────────────────────────────
function onWheel(e) {
  const span  = de.value - ds.value
  const step  = span * 0.15 * (e.deltaY > 0 ? 1 : -1)
  let ns = ds.value + step
  let ne = de.value + step
  if (ns < 0)   { ne -= ns;     ns = 0 }
  if (ne > 100) { ns -= ne-100; ne = 100 }
  ds.value = ns
  de.value = ne
}

// ── 절단선 포함 타임라인 아이템 ───────────────────────────────
const BREAK_YEAR_GAP = 3
const BREAK_MIN_PCT  = 5

const timelineItems = computed(() => {
  const items = []
  const years = visibleYears.value
  for (let i = 0; i < years.length; i++) {
    const top = pinPct(years[i])
    if (i > 0) {
      const yearGap    = years[i].year - years[i - 1].year
      const prevTop    = pinPct(years[i - 1])
      const eraChanged = years[i].yearType !== years[i - 1].yearType
      if ((eraChanged || yearGap > BREAK_YEAR_GAP) && top - prevTop > BREAK_MIN_PCT) {
        items.push({ type: 'break', top: (prevTop + top) / 2 })
      }
    }
    items.push({ type: 'year', ...years[i], top })
  }
  return items
})

const atTop    = computed(() => ds.value < 0.1)
const atBottom = computed(() => de.value > 99.9)

// ── 이전/다음 연도 ────────────────────────────────────────────
const prevGroup = computed(() => {
  const idx = yearGroups.value.findIndex(y => y.year === selYear.value && y.yearType === selYearType.value)
  return idx > 0 ? yearGroups.value[idx - 1] : null
})

const nextGroup = computed(() => {
  const idx = yearGroups.value.findIndex(y => y.year === selYear.value && y.yearType === selYearType.value)
  return idx >= 0 && idx < yearGroups.value.length - 1 ? yearGroups.value[idx + 1] : null
})

// ── 선택된 연도의 사건 목록 ───────────────────────────────────
const selEvents = computed(() =>
  selYear.value !== null
    ? SCENARIOS.filter(s => s.year === selYear.value && s.yearType === selYearType.value)
    : []
)
</script>

<style scoped>
/* ── 전체 레이아웃 ─────────────────────────────────────────── */
.sc-layout {
  flex: 1;
  display: flex;
  overflow: hidden;
}

/* ── 왼쪽: 그래프 패널 ────────────────────────────────────── */
.graph-panel {
  width: 25vw;
  min-width: 140px;
  max-width: 220px;
  background: var(--bg2);
  border-right: 1px solid var(--bd);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex-shrink: 0;
}

.graph-panel-header {
  padding: 12px 14px 8px;
  border-bottom: 1px solid var(--bd);
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
}

.graph-track {
  flex: 1;
  position: relative;
  cursor: grab;
  user-select: none;
  overflow: hidden;
}
.graph-track:active { cursor: grabbing; }

/* 수직 중심선 */
.v-line {
  position: absolute;
  left: 50%; top: 0; bottom: 0;
  width: 1px;
  background: var(--bd);
  transform: translateX(-50%);
}

/* 내부 마진 영역 */
.graph-inner {
  position: absolute;
  top: 10vh;
  bottom: 10vh;
  left: 0;
  right: 0;
}

/* 연도 핀 (수직) */
.year-pin {
  position: absolute;
  left: 0; right: 0;
  height: 40px;
  transform: translateY(-50%);
  cursor: pointer;
  color: var(--t1);
  z-index: 4;
}

.pin-label {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  white-space: nowrap;
  transition: color .15s;
}

.pin-dot {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: var(--t2);
  transition: all .15s;
}

/* 절단선 */
.break-mark {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  pointer-events: none;
  opacity: 0.5;
}

/* 끝 블록 */
.track-end-block {
  position: absolute;
  left: 0; right: 0;
  height: 28px;
  z-index: 3;
  pointer-events: none;
}
.track-end-top {
  top: 0;
  background: linear-gradient(to bottom, rgba(212,170,96,.12), transparent);
  border-top: 2px solid rgba(212,170,96,.35);
}
.track-end-bottom {
  bottom: 0;
  background: linear-gradient(to top, rgba(212,170,96,.12), transparent);
  border-bottom: 2px solid rgba(212,170,96,.35);
}

.year-pin:hover .pin-dot,
.year-pin.selected .pin-dot {
  background: var(--tg);
  box-shadow: 0 0 7px var(--tg);
}

/* ── 오른쪽: 정보 패널 ────────────────────────────────────── */
.info-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.info-header {
  padding: 8px 14px;
  border-bottom: 1px solid var(--bd);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 52px;
}

.year-info {
  flex: 1;
  display: flex;
  align-items: baseline;
  justify-content: center;
}

.nav-arrow {
  width: 32px; height: 32px;
  display: flex; align-items: center; justify-content: center;
  background: var(--bg3); border: 1px solid var(--bd); border-radius: var(--r);
  color: var(--t1); font-size: 18px; cursor: pointer;
  transition: all .13s; flex-shrink: 0;
}
.nav-arrow:hover:not(:disabled) { border-color: var(--tg); color: var(--tg); }
.nav-arrow:disabled { opacity: .3; cursor: default; }

/* 사건 목록 */
.event-list {
  flex: 1;
  overflow-y: auto;
  padding: 14px 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.event-card {
  text-align: left; width: 100%;
  padding: 16px 20px;
  background: var(--bg3); border: 1px solid var(--bd); border-radius: var(--r);
  cursor: pointer; transition: all .15s;
  display: flex; flex-direction: column; gap: 10px;
}
.event-card:hover   { background: var(--bgh); }
.event-card.selected {
  border-color: var(--tg); background: rgba(212,170,96,.07);
}
.event-card.unimpl  { opacity: .55; cursor: default; }
.event-card.unimpl:hover { background: var(--bg3); }

.card-top  { display: flex; justify-content: space-between; align-items: center; }
.tag-row   { display: flex; gap: 8px; }
.evt-tag   { font-size: 12px; letter-spacing: .5px; }
.card-meta { font-size: 12px; display: flex; gap: 8px; align-items: center; }
.star-mark { color: var(--tg); font-size: 13px; }
.card-name { font-size: 18px; color: var(--t1); }
.card-na   { font-size: 12px; letter-spacing: .5px; }

.no-events {
  padding: 40px; text-align: center; font-size: 14px;
}

/* 네비 */
.step-nav {
  display: flex; justify-content: space-between; align-items: center;
  flex-shrink: 0; padding: 10px 14px;
  border-top: 1px solid var(--bd);
}
</style>
