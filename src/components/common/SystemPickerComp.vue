<template>
  <div class="sp-wrap">

    <!-- 뷰 탭 -->
    <div class="sp-tabs">
      <button class="sp-tab" :class="{ active: view === 'list' }" @click="view = 'list'">리스트</button>
      <button class="sp-tab" :class="{ active: view === 'map'  }" @click="view = 'map'">지도</button>
    </div>

    <!-- 리스트 뷰 -->
    <div v-if="view === 'list'" class="sp-list">
      <input class="sp-search mono" v-model="q" placeholder="성계 검색..." />

      <div class="sp-scroll">
        <template v-for="sys in filteredSystems" :key="sys.id">

          <!-- 성계 행 -->
          <div
            class="sp-sys-row"
            :class="{ active: internalSysId === sys.id, disabled: !isSelectable(sys) }"
            @click="isSelectable(sys) && onSysPick(sys.id)"
          >
            <span class="sp-dot" :style="{ background: fclr(sys.faction) }" />
            <span class="sp-sys-name serif">{{ sysLabel(sys) }}</span>
            <span class="sp-faction mono dim">{{ sys.faction ?? '중립' }}</span>
            <span v-if="internalSysId === sys.id && !selectPlanet" class="sp-check gold">✓</span>
          </div>

          <!-- 행성 서브 목록 (selectPlanet 모드 + 성계 선택 시) -->
          <template v-if="selectPlanet && internalSysId === sys.id">
            <div
              v-for="planet in sys.planets ?? []"
              :key="planet.code"
              class="sp-planet-row"
              :class="{ active: internalPlanetCode === planet.code }"
              @click="onPlanetPick(planet.code)"
            >
              <span class="sp-planet-name mono">└ {{ planetLabel(planet) }}</span>
              <span v-if="internalPlanetCode === planet.code" class="sp-check gold">✓</span>
            </div>
            <div v-if="!(sys.planets ?? []).length" class="sp-planet-row dim">
              <span class="mono" style="font-size:1rem">└ 행성 없음</span>
            </div>
          </template>

        </template>

        <div v-if="!filteredSystems.length" class="sp-empty dim mono">결과 없음</div>
      </div>
    </div>

    <!-- 지도 뷰 -->
    <div v-else class="sp-map">
      <GalaxyMap
        selection-mode
        :sel-highlight="internalSysId"
        :sys-filter="isSelectable"
        @pick="onSysPick"
      />
    </div>

    <!-- 선택 상태 표시 바 -->
    <div class="sp-status mono">
      <span v-if="internalSysId" class="sp-sel-label">
        <span class="gold">{{ sysLabel(game.systems[internalSysId]) }}</span>
        <template v-if="selectPlanet && internalPlanetCode">
          &nbsp;/&nbsp;
          <span class="gold">{{ selectedPlanetLabel }}</span>
        </template>
      </span>
      <span v-else class="dim">성계를 선택하세요</span>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import { useLang } from '@/composables/useLang'
import { FACTIONS } from '@/data/masterData'
import GalaxyMap from '@/components/game/map/GalaxyMap.vue'

const props = defineProps({
  modelValue:   { type: Object,   default: () => ({}) },   // { sysId, planetCode }
  filter:       { type: Function, default: null },          // (sys) => boolean
  selectPlanet: { type: Boolean,  default: false },
})
const emit = defineEmits(['update:modelValue'])

const game = useGameStore()
const { lang } = useLang()
const view = ref('list')
const q    = ref('')

// ── 내부 선택 상태 ────────────────────────────────────────────
const internalSysId     = ref(props.modelValue?.sysId     ?? null)
const internalPlanetCode = ref(props.modelValue?.planetCode ?? null)

watch(() => props.modelValue, v => {
  internalSysId.value      = v?.sysId     ?? null
  internalPlanetCode.value = v?.planetCode ?? null
}, { deep: true })

// ── 유틸 ─────────────────────────────────────────────────────
const fclr = faction => FACTIONS[faction]?.color ?? 'rgba(255,255,255,0.3)'

function sysLabel(sys) {
  if (!sys) return ''
  return sys.name?.find(n => n.code === lang.value)?.context
      ?? sys.name?.[0]?.context
      ?? sys.displayName
      ?? sys.id
}

function planetLabel(planet) {
  return planet?.name?.find(n => n.code === lang.value)?.context
      ?? planet?.name?.[0]?.context
      ?? planet?.code
      ?? ''
}

function isSelectable(sys) {
  if (!props.filter) return true
  return props.filter(sys)
}

// ── 필터링된 성계 목록 ────────────────────────────────────────
const allSystems = computed(() => Object.values(game.systems))

const filteredSystems = computed(() => {
  const kw = q.value.trim().toLowerCase()
  return allSystems.value
    .filter(s => !kw || sysLabel(s).toLowerCase().includes(kw))
    .sort((a, b) => {
      // 선택 가능한 성계를 위로
      const sa = isSelectable(a) ? 0 : 1
      const sb = isSelectable(b) ? 0 : 1
      if (sa !== sb) return sa - sb
      return sysLabel(a).localeCompare(sysLabel(b))
    })
})

const selectedPlanetLabel = computed(() => {
  if (!internalSysId.value || !internalPlanetCode.value) return ''
  const sys = game.systems[internalSysId.value]
  const planet = (sys?.planets ?? []).find(p => p.code === internalPlanetCode.value)
  return planetLabel(planet)
})

// ── 선택 핸들러 ───────────────────────────────────────────────
function onSysPick(sysId) {
  internalSysId.value      = sysId
  internalPlanetCode.value = null
  if (!props.selectPlanet) {
    emit('update:modelValue', { sysId })
  } else {
    emit('update:modelValue', { sysId, planetCode: null })
  }
}

function onPlanetPick(planetCode) {
  internalPlanetCode.value = planetCode
  emit('update:modelValue', { sysId: internalSysId.value, planetCode })
}
</script>

<style scoped>
.sp-wrap {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  overflow: hidden;
}

/* ── 탭 ──────────────────────────────────────────────────────── */
.sp-tabs {
  flex-shrink: 0;
  display: flex;
  gap: 4px;
  padding: 8px 12px 0;
  border-bottom: 1px solid rgba(212,170,96,.18);
}
.sp-tab {
  padding: 6px 20px;
  background: none;
  border: 1px solid rgba(212,170,96,.2);
  border-bottom: none;
  border-radius: 4px 4px 0 0;
  color: var(--t2);
  font-size: 1em;
  cursor: pointer;
  transition: background .12s, color .12s;
}
.sp-tab.active {
  background: rgba(212,170,96,.12);
  color: var(--tg);
  border-color: rgba(212,170,96,.45);
}

/* ── 리스트 ──────────────────────────────────────────────────── */
.sp-list {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  padding: 10px 12px 0;
  gap: 8px;
}
.sp-search {
  flex-shrink: 0;
  padding: 8px 12px;
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(212,170,96,.22);
  border-radius: var(--r);
  color: var(--t1);
  font-size: 1em;
  outline: none;
}
.sp-search:focus { border-color: rgba(212,170,96,.6); }
.sp-search::placeholder { color: rgba(212,170,96,.3); }

.sp-scroll {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  scrollbar-width: thin;
  scrollbar-color: rgba(212,170,96,.2) transparent;
}

/* 성계 행 */
.sp-sys-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 10px;
  border-radius: var(--r);
  cursor: pointer;
  transition: background .1s;
}
.sp-sys-row:hover:not(.disabled) { background: rgba(212,170,96,.07); }
.sp-sys-row.active { background: rgba(212,170,96,.12); }
.sp-sys-row.disabled { opacity: .35; cursor: default; }

.sp-dot {
  width: 10px; height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}
.sp-sys-name {
  flex: 1;
  font-size: 1.05em;
  color: var(--t1);
}
.sp-faction {
  font-size: 0.85em;
  color: var(--td);
}
.sp-check {
  font-size: 0.9em;
}

/* 행성 서브 행 */
.sp-planet-row {
  display: flex;
  align-items: center;
  padding: 8px 10px 8px 28px;
  cursor: pointer;
  border-radius: var(--r);
  transition: background .1s;
}
.sp-planet-row:hover { background: rgba(212,170,96,.06); }
.sp-planet-row.active { background: rgba(212,170,96,.1); }
.sp-planet-name {
  flex: 1;
  font-size: 0.95em;
  color: var(--t2);
}

.sp-empty {
  padding: 24px;
  text-align: center;
  font-size: 0.9em;
  opacity: .5;
}

/* ── 지도 뷰 ──────────────────────────────────────────────────── */
.sp-map {
  flex: 1;
  min-height: 0;
  position: relative;
}

/* ── 선택 상태 바 ─────────────────────────────────────────────── */
.sp-status {
  flex-shrink: 0;
  padding: 9px 14px;
  font-size: 0.9em;
  border-top: 1px solid rgba(212,170,96,.12);
  background: rgba(0,0,0,.2);
}
</style>
