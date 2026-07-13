<template>
  <transition name="ssd-fade">
    <div v-if="show && sys" class="ssd-box" @click.stop>

      <!-- 헤더 -->
      <div class="ssd-head">
        <div class="ssd-head-left">
          <span class="serif gold ssd-name">{{ sys.name }}</span>
          <span v-if="sys.nameEn" class="mono dim ssd-name-en">{{ sys.nameEn }}</span>
        </div>
        <div class="ssd-head-right">
          <span class="mono ssd-type-badge" :class="`ssd-type--${sys.type}`">{{ TYPE_LABELS[sys.type] ?? sys.type }}</span>
          <span class="mono ssd-fc-badge" :class="`fc-${sys.faction}`">{{ FACTION_NAMES[sys.faction] ?? sys.faction }}</span>
        </div>
      </div>

      <!-- 스탯 -->
      <div class="ssd-sep"><span class="ssd-sep-lbl">현황</span></div>
      <div class="ssd-stats">
        <div v-for="s in STATS" :key="s.key" class="ssd-stat">
          <span class="ssd-sl mono">{{ s.label }}</span>
          <span class="ssd-sb"><span class="ssd-sf" :style="{ width: pct(sys[s.key], s.max) }" /></span>
          <span class="ssd-sv mono" :style="valStyle(sys[s.key], s.max)">{{ sys[s.key] ?? '-' }}</span>
        </div>
      </div>

      <!-- 행성 -->
      <div class="ssd-sep"><span class="ssd-sep-lbl">행성 ({{ sys.planets?.length ?? 0 }})</span></div>
      <div class="ssd-planets">
        <template v-if="sys.planets?.length">
          <div v-for="p in sortedPlanets" :key="p.code"
               class="ssd-planet-row ssd-planet-row--link"
               @click="selectedPlanetCode = p.code">
            <span class="serif ssd-planet-name">{{ p.nameKr ?? p.name ?? p.code }}</span>
            <span v-if="p.nameEn" class="mono dim ssd-planet-en">{{ p.nameEn }}</span>
            <span v-if="p.faction && p.faction !== sys.faction"
                  class="mono ssd-planet-fc" :class="`fc-${p.faction}`">
              {{ FACTION_NAMES[p.faction] ?? p.faction }}
            </span>
            <span class="mono dim ssd-planet-arrow">›</span>
          </div>
        </template>
        <span v-else class="dim serif" style="font-size:11px">행성 정보 없음</span>
      </div>

      <!-- 행성 상세 팝업 -->
      <PlanetInfoDetailPopup
        :show="!!selectedPlanetCode"
        :planets="sys.planets ?? []"
        :initial-code="selectedPlanetCode"
        @close="selectedPlanetCode = null"
      />

      <!-- 설명 -->
      <template v-if="sys.desc">
        <div class="ssd-sep"><span class="ssd-sep-lbl">설명</span></div>
        <p class="ssd-desc serif">{{ sys.desc }}</p>
      </template>

      <div class="ssd-sep" />
      <button class="btn btn-gold ssd-close-btn" @click="$emit('close')">닫기</button>

    </div>
  </transition>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import PlanetInfoDetailPopup from '@/components/starSystem/PlanetInfoDetailPopup.vue'

const props = defineProps({
  show:       { type: Boolean, default: false },
  systemCode: { type: String,  default: null  },
})
defineEmits(['close'])

const game = useGameStore()

const selectedPlanetCode = ref(null)

const sys = computed(() =>
  props.systemCode ? (game.systems?.[props.systemCode] ?? null) : null
)

const sortedPlanets = computed(() =>
  [...(sys.value?.planets ?? [])].sort((a, b) => (b.pops?.unit ?? 0) - (a.pops?.unit ?? 0))
)

const FACTION_NAMES = { REH: '은하제국', FPA: '자유행성동맹', PZN: '페잔' }

const TYPE_LABELS = {
  capital:   '수도',
  fortress:  '요새',
  frontier:  '전초',
  contested: '분쟁',
  noble:     '귀족',
  neutral:   '중립',
}

const STATS = [
  { key: 'population', label: '인구', max: 200 },
  { key: 'industry',   label: '산업', max: 100 },
  { key: 'defense',    label: '방어', max: 100 },
  { key: 'morale',     label: '사기', max: 100 },
  { key: 'tax',        label: '세율', max: 100 },
]

function pct(v, max) {
  return `${Math.min((Number(v ?? 0) / max) * 100, 100)}%`
}

function valStyle(v, max) {
  const r = Number(v ?? 0) / max
  if (r >= 0.8) return { color: 'var(--tg)' }
  if (r >= 0.5) return { color: 'var(--t1)' }
  if (r >= 0.3) return { color: 'var(--t2)' }
  return { color: 'var(--td)' }
}
</script>

<style scoped>
.ssd-box {
  position: fixed;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw; max-width: 400px; height: 90vh;
  z-index: 200;
  background: linear-gradient(180deg, #101828 0%, #0b1220 100%);
  border: 1px solid rgba(212,170,96,.4);
  border-radius: var(--r);
  padding: 18px 20px 16px;
  box-shadow: 0 8px 40px rgba(0,0,0,.9);
  display: flex; flex-direction: column; gap: 0;
  overflow-y: auto;
}

/* 헤더 */
.ssd-head {
  display: flex; align-items: flex-start; justify-content: space-between; gap: 10px;
  padding-bottom: 4px;
}
.ssd-head-left { display: flex; flex-direction: column; gap: 3px; }
.ssd-name    { font-size: 18px; letter-spacing: .5px; }
.ssd-name-en { font-size: 11px; }
.ssd-head-right { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; flex-shrink: 0; }

/* 배지 */
.ssd-type-badge {
  font-size: 10px; letter-spacing: .5px;
  padding: 2px 7px; border-radius: 3px;
  background: rgba(255,255,255,.06);
  border: 1px solid var(--bd);
  color: var(--t2);
}
.ssd-type--capital   { color: var(--tg);  border-color: rgba(212,170,96,.4); }
.ssd-type--fortress  { color: #b06090;    border-color: rgba(176,96,144,.4); }
.ssd-type--frontier  { color: #8090c0;    border-color: rgba(128,144,192,.4); }
.ssd-type--contested { color: #c06050;    border-color: rgba(192,96,80,.4); }
.ssd-type--noble     { color: #a09060;    border-color: rgba(160,144,96,.4); }
.ssd-fc-badge {
  font-size: 11px; letter-spacing: .3px;
}

/* 구분선 */
.ssd-sep {
  display: flex; align-items: center; gap: 8px;
  margin: 12px 0 8px;
}
.ssd-sep::before, .ssd-sep::after {
  content: ''; flex: 1; height: 1px; background: var(--bd);
}
.ssd-sep-lbl { font-size: 11px; letter-spacing: .5px; flex-shrink: 0; color: var(--t2); }

/* 스탯 */
.ssd-stats { display: flex; flex-direction: column; gap: 8px; }
.ssd-stat  { display: flex; align-items: center; gap: 7px; }
.ssd-sl    { font-size: 11px; color: var(--t2); letter-spacing: .3px; width: 26px; flex-shrink: 0; }
.ssd-sb    { flex: 1; height: 4px; background: var(--bg4); border-radius: 2px; overflow: hidden; }
.ssd-sf    { display: block; height: 100%; background: var(--tg); border-radius: 2px; opacity: .55; }
.ssd-sv    { font-size: 12px; width: 30px; text-align: right; flex-shrink: 0; }

/* 행성 */
.ssd-planets { display: flex; flex-direction: column; gap: 6px; }
.ssd-planet-row {
  display: flex; align-items: baseline; gap: 8px;
  padding: 4px 8px;
  background: rgba(255,255,255,.02);
  border: 1px solid rgba(255,255,255,.04);
  border-radius: var(--r);
}
.ssd-planet-name { font-size: 12px; color: var(--t1); }
.ssd-planet-en   { font-size: 10px; flex: 1; }
.ssd-planet-fc   { font-size: 10px; flex-shrink: 0; }
.ssd-planet-arrow { font-size: 14px; margin-left: auto; }
.ssd-planet-row--link { cursor: pointer; }
.ssd-planet-row--link:hover { background: rgba(255,255,255,.05); border-radius: 4px; }

/* 설명 */
.ssd-desc {
  font-size: 11px; color: var(--t2);
  line-height: 1.8; letter-spacing: .3px;
  margin: 0;
}

/* 닫기 */
.ssd-close-btn { width: 100%; justify-content: center; margin-top: auto; }

/* 세력 색상 */
.fc-REH { color: var(--REH); }
.fc-FPA { color: var(--FPA); }
.fc-PZN { color: var(--PZN); }

/* 트랜지션 */
.ssd-fade-enter-active { transition: opacity .18s, transform .18s; }
.ssd-fade-leave-active { transition: opacity .12s; }
.ssd-fade-enter-from   { opacity: 0; transform: translate(-50%, -48%); }
.ssd-fade-leave-to     { opacity: 0; transform: translate(-50%, -50%); }
</style>
