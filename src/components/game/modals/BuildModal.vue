<template>
  <div class="modal-box build-modal">
    <div class="modal-title">시설 건설</div>

    <!-- Step 1: 성계 / 행성 선택 -->
    <template v-if="step === 1">
      <div class="step-hint dim">건설할 행성을 선택하세요.</div>
      <div class="sys-list">
        <template v-for="sys in playerSystems" :key="sys.id">
          <div class="sys-header serif">{{ sysName(sys) }}</div>
          <div
            v-for="planet in playerPlanets(sys)" :key="planet.code"
            class="planet-row"
            @click="pick(sys, planet)"
          >
            <span class="planet-name serif">{{ planetName(planet) }}</span>
            <span class="slots mono dim">{{ usedSlots(planet) }}/{{ planet.buildings?.maxSize ?? 0 }} 슬롯</span>
          </div>
          <div v-if="!playerPlanets(sys).length" class="planet-row disabled">
            <span class="dim" style="font-size:10px">(아군 행성 없음)</span>
          </div>
        </template>
      </div>
      <div class="modal-actions">
        <button class="btn" @click="$emit('close')">닫기</button>
      </div>
    </template>

    <!-- Step 2: 시설 선택 -->
    <template v-else>
      <div class="step-header">
        <button class="back-btn mono" @click="goBack">← 뒤로</button>
        <div class="step-loc">
          <span class="serif gold">{{ sysName(selSys) }}</span>
          <span class="dim" style="font-size:10px">/ {{ planetName(selPlanet) }}</span>
        </div>
        <span class="slots-badge mono">슬롯 {{ usedSlots(selPlanet) }}/{{ selPlanet?.buildings?.maxSize ?? 0 }}</span>
      </div>

      <div class="gold-row">
        <span class="dim">보유 자금</span>
        <span class="gold mono">{{ game.pRes.gold.toLocaleString() }} 마크</span>
      </div>

      <div class="bld-list">
        <template v-for="cat in CATS" :key="cat.id">
          <template v-if="bldsByCat(cat.id).length">
            <div class="cat-label mono">{{ cat.label }}</div>
            <div
              v-for="bld in bldsByCat(cat.id)" :key="bld.id"
              class="bld-row"
              :class="{ sel: selBld?.id === bld.id, disabled: !canBuild(bld) }"
              @click="canBuild(bld) && (selBld = bld)"
            >
              <div class="bld-main">
                <div class="bld-name serif">{{ bldName(bld) }}</div>
                <div class="bld-fx dim">{{ fxText(bld) }}</div>
              </div>
              <div class="bld-meta">
                <span class="gold mono" style="font-size:11px">{{ bld.buildCost?.toLocaleString() }}</span>
                <span class="dim" style="font-size:9px">{{ bld.buildTime }}턴</span>
                <span class="count-badge" :class="{ full: countOnPlanet(bld.id) >= bld.maxCount }">
                  {{ countOnPlanet(bld.id) }}/{{ bld.maxCount }}
                </span>
              </div>
              <span v-if="selBld?.id === bld.id" class="sel-mark gold">✓</span>
            </div>
          </template>
        </template>
      </div>

      <div class="modal-actions">
        <button class="btn" @click="$emit('close')">취소</button>
        <button class="btn btn-gold" :disabled="!selBld" @click="confirm">건설 시작</button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import { BUILDINGS, BUILDING_MAP } from '@/data/base/buildingData'
import { useLang } from '@/composables/useLang'

const emit = defineEmits(['close'])
const game = useGameStore()
const { lang } = useLang()

const step      = ref(1)
const selSys    = ref(null)
const selPlanet = ref(null)
const selBld    = ref(null)

const CATS = [
  { id: 'economic',       label: 'ECONOMIC'  },
  { id: 'military',       label: 'MILITARY'  },
  { id: 'administrative', label: 'ADMIN'     },
  { id: 'research',       label: 'RESEARCH'  },
]

const FX_LABELS = {
  food:        '식량',
  industry:    '산업',
  defense:     '방어',
  morale:      '민심',
  tax:         '세수',
  incomeBonus: '수입',
  buildSpeed:  '건설속도',
}

const sysName    = sys    => sys?.name?.find(n => n.code === lang.value)?.context ?? sys?.name?.[0]?.context ?? ''
const planetName = planet => planet?.name?.find(n => n.code === lang.value)?.context ?? planet?.name?.[0]?.context ?? ''
const bldName    = bld    => bld?.name?.find(n => n.code === lang.value)?.context ?? bld?.name?.[0]?.context ?? bld?.id ?? ''

const playerSystems = computed(() =>
  Object.values(game.systems)
    .filter(s => s.faction === game.playerFaction)
    .sort((a, b) => sysName(a).localeCompare(sysName(b)))
)

function playerPlanets(sys) {
  return (sys.planets ?? []).filter(p => p.faction === game.playerFaction)
}

function usedSlots(planet) {
  return (planet?.buildings?.details ?? []).reduce((sum, d) => {
    return sum + (BUILDING_MAP[d.b_id]?.slotCost ?? 1) * d.count
  }, 0)
}

function pick(sys, planet) {
  selSys.value    = sys
  selPlanet.value = planet
  selBld.value    = null
  step.value      = 2
}

function goBack() {
  step.value      = 1
  selSys.value    = null
  selPlanet.value = null
  selBld.value    = null
}

const buildableBuildings = computed(() => BUILDINGS.filter(b => b.buildable))

function bldsByCat(catId) {
  return buildableBuildings.value.filter(b => b.category === catId)
}

function countOnPlanet(bldId) {
  return (selPlanet.value?.buildings?.details ?? [])
    .filter(d => d.b_id === bldId)
    .reduce((s, d) => s + d.count, 0)
}

function canBuild(bld) {
  if (!selPlanet.value) return false
  if (game.pRes.gold < (bld.buildCost ?? 0)) return false
  if (countOnPlanet(bld.id) >= bld.maxCount) return false
  if (bld.slotCost > 0) {
    const used = usedSlots(selPlanet.value)
    if (used + bld.slotCost > (selPlanet.value?.buildings?.maxSize ?? 0)) return false
  }
  return true
}

function fxText(bld) {
  const entries = Object.entries(bld.effects ?? {})
  if (!entries.length) return '—'
  return entries.map(([k, v]) => {
    const label = FX_LABELS[k] ?? k
    const val   = k === 'incomeBonus'
      ? `${v > 0 ? '+' : ''}${Math.round(v * 100)}%`
      : `${v > 0 ? '+' : ''}${v}`
    return `${label} ${val}`
  }).join(' / ')
}

function confirm() {
  if (!selSys.value || !selPlanet.value || !selBld.value) return
  game.buildBuilding(selSys.value.id, selPlanet.value.code, selBld.value.id)
  emit('close')
}
</script>

<style scoped>
.build-modal { width: min(90vw, 540px); height: 88vh; display: flex; flex-direction: column; }

.step-hint {
  font-size: 10px;
  letter-spacing: .5px;
  margin-bottom: 10px;
}

/* ── Step 1: 성계/행성 목록 ── */
.sys-list {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 4px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.sys-header {
  font-size: 11px;
  color: var(--tg);
  letter-spacing: 1px;
  padding: 8px 12px 4px;
  border-top: 1px solid var(--bd);
  background: rgba(212,170,96,.05);
}
.sys-header:first-child { border-top: none; }

.planet-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  border-radius: var(--r);
  cursor: pointer;
  transition: background .12s;
  border: 1px solid transparent;
}
.planet-row:hover:not(.disabled) {
  background: rgba(255,255,255,.05);
  border-color: var(--bdg);
}
.planet-row.disabled { opacity: .4; cursor: default; }

.planet-name { font-size: 13px; color: var(--t1); }
.slots { font-size: 10px; color: var(--td); }

/* ── Step 2: 헤더 ── */
.step-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0 12px;
  border-bottom: 1px solid var(--bd);
  margin-bottom: 10px;
}

.back-btn {
  background: none;
  border: 1px solid var(--bd);
  border-radius: var(--r);
  color: var(--t2);
  font-size: 10px;
  padding: 4px 10px;
  cursor: pointer;
  flex-shrink: 0;
  transition: all .15s;
}
.back-btn:hover { border-color: var(--tg); color: var(--tg); }

.step-loc {
  flex: 1;
  display: flex;
  align-items: baseline;
  gap: 6px;
  font-size: 12px;
}

.slots-badge {
  font-size: 10px;
  color: var(--td);
  flex-shrink: 0;
}

.gold-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 10px;
  background: var(--bg4);
  border-radius: var(--r);
  margin-bottom: 12px;
  font-size: 11px;
}

/* ── Step 2: 시설 목록 ── */
.bld-list {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 4px;
}

.cat-label {
  font-size: 9px;
  letter-spacing: 1.5px;
  color: var(--td);
  padding: 6px 2px 2px;
  text-transform: uppercase;
}

.bld-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border: 1px solid var(--bd);
  border-radius: var(--r);
  background: var(--bg4);
  cursor: pointer;
  transition: all .13s;
  position: relative;
}
.bld-row:hover:not(.disabled) {
  background: var(--bgh);
  border-color: var(--bdg);
}
.bld-row.sel {
  border-color: var(--tg);
  background: rgba(212,170,96,.08);
}
.bld-row.disabled { opacity: .35; cursor: not-allowed; }

.bld-main { flex: 1; min-width: 0; }
.bld-name { font-size: 12px; color: var(--t1); margin-bottom: 2px; }
.bld-fx   { font-size: 9px; color: var(--td); letter-spacing: .3px; }

.bld-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 3px;
  flex-shrink: 0;
}

.count-badge {
  font-size: 9px;
  font-family: var(--font-mono);
  padding: 1px 5px;
  border-radius: 3px;
  background: rgba(255,255,255,.06);
  color: var(--t2);
}
.count-badge.full {
  background: rgba(255,80,80,.12);
  color: #f66;
}

.sel-mark {
  font-size: 14px;
  flex-shrink: 0;
  line-height: 1;
}
</style>
