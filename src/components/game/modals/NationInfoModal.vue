<template>
  <div class="modal-box ni-modal">

    <!-- 상단: 국가명 + 닫기 -->
    <div class="ni-header">
      <span class="serif gold" style="font-size:14px;letter-spacing:1px">
        {{ viewFaction?.nameKr ?? viewId }} 국가정보
      </span>
      <button class="ni-close" @click="$emit('close')">✕</button>
    </div>

    <!-- 세력 rotate -->
    <div class="ni-faction-row">
      <button class="ni-arrow" @click="prevFaction">◀</button>
      <span v-for="(id, i) in factionIds" :key="id"
            class="ni-fc-chip" :class="{ on: id === viewId }"
            @click="viewIdx = i">
        {{ game.factions[id]?.shortNameKr ?? id }}
      </span>
      <button class="ni-arrow" @click="nextFaction">▶</button>
    </div>

    <!-- 탭 -->
    <div class="ni-tabs">
      <button v-for="t in TABS" :key="t.id"
              class="ni-tab" :class="{ on: tab === t.id }"
              @click="tab = t.id">{{ t.label }}</button>
    </div>

    <!-- 내용 (스크롤) -->
    <div class="ni-body">

      <!-- 이념 -->
      <template v-if="tab === 'idea'">
        <div class="ni-row"><span class="dim">현재 이념</span><span>{{ viewFaction?.ideology?.name ?? '불명' }}</span></div>
        <div class="ni-row"><span class="dim">현재 경제</span><span>{{ viewFaction?.economy?.name ?? '불명' }}</span></div>
        <div class="ni-divider" />
        <div class="ni-row"><span class="dim">목표 이념</span><span class="dim">미설정</span></div>
        <div class="ni-row"><span class="dim">목표 경제</span><span class="dim">미설정</span></div>
        <div class="ni-divider" />
        <div class="ni-row"><span class="dim">현재 중점</span><span class="dim">미설정</span></div>
        <div class="ni-row"><span class="dim">중점 이력</span><span class="dim">없음</span></div>
      </template>

      <!-- 경제 -->
      <template v-if="tab === 'econ'">
        <div class="ni-row"><span class="dim">국가 세율</span><span class="mono">{{ avgTax }}%</span></div>
        <div class="ni-row">
          <span class="dim">예상 수입</span>
          <span class="gold mono">{{ expectedIncome.toLocaleString() }}</span>
        </div>
        <div class="ni-divider" />
        <div class="ni-row">
          <span class="dim">국가 재정</span>
          <span class="gold mono">{{ (viewResources?.gold ?? 0).toLocaleString() }}</span>
        </div>
        <div class="ni-row">
          <span class="dim">국가 부채</span>
          <span class="mono" :class="isPlayer && game._loanBalance > 0 ? 'alert' : ''">
            {{ isPlayer ? game._loanBalance.toLocaleString() : '—' }}
          </span>
        </div>
        <div class="ni-divider" />
        <div class="ni-row"><span class="dim">평균 지지율</span><span class="mono">{{ avgMorale }}%</span></div>
      </template>

      <!-- 함대 -->
      <template v-if="tab === 'fleet'">
        <div class="ni-row"><span class="dim">국가 함대</span><span class="mono">{{ viewFleetCount }}개</span></div>
        <div class="ni-row"><span class="dim">국가 함선</span><span class="mono">{{ viewShipCount.toLocaleString() }}척</span></div>
      </template>

      <!-- 성계 -->
      <template v-if="tab === 'star'">
        <div class="ni-row"><span class="dim">보유 성계</span><span class="mono">{{ game.sysCounts[viewId] ?? 0 }}개</span></div>
      </template>

    </div>

    <!-- 하단 -->
    <div class="ni-footer">
      <button class="btn" @click="$emit('close')">닫기</button>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'

defineEmits(['close'])
const game = useGameStore()

const TABS = [
  { id: 'idea',  label: '이념' },
  { id: 'econ',  label: '경제' },
  { id: 'fleet', label: '함대' },
  { id: 'star',  label: '성계' },
]

const tab = ref('idea')
const factionIds = computed(() => Object.keys(game.factions))
const viewIdx    = ref(Math.max(0, factionIds.value.indexOf(game.playerFaction)))

const viewId       = computed(() => factionIds.value[viewIdx.value] ?? game.playerFaction)
const viewFaction  = computed(() => game.factions[viewId.value]  ?? null)
const viewResources= computed(() => game.resources[viewId.value] ?? null)
const viewFleets   = computed(() => game.fleets[viewId.value]    ?? [])
const isPlayer     = computed(() => viewId.value === game.playerFaction)

function prevFaction() { viewIdx.value = (viewIdx.value - 1 + factionIds.value.length) % factionIds.value.length }
function nextFaction() { viewIdx.value = (viewIdx.value + 1) % factionIds.value.length }

const viewSystems = computed(() =>
  Object.values(game.systems).filter(s => s.faction === viewId.value)
)

const avgTax = computed(() => {
  const s = viewSystems.value
  if (!s.length) return 0
  return Math.round(s.reduce((a, x) => a + (x.tax ?? 0), 0) / s.length)
})

const expectedIncome = computed(() =>
  viewSystems.value.reduce((sum, s) =>
    sum + Math.floor((s.population ?? 0) * ((s.tax ?? 0) / 100) * ((s.industry ?? 100) / 100) * 10), 0
  )
)

const avgMorale = computed(() => {
  const s = viewSystems.value
  if (!s.length) return 0
  return Math.round(s.reduce((a, x) => a + (x.morale ?? 0), 0) / s.length)
})

const viewFleetCount = computed(() => viewFleets.value.length)
const viewShipCount  = computed(() => viewFleets.value.reduce((s, f) => s + (f.ships ?? 0), 0))
</script>

<style scoped>
.ni-modal { min-width: min(90vw, 400px); display: flex; flex-direction: column; padding: 0; overflow: hidden }

.ni-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px 16px; border-bottom: 1px solid var(--bd);
  background: rgba(255,255,255,.02); flex-shrink: 0;
}
.ni-close {
  background: none; border: none; color: var(--td);
  font-size: 14px; cursor: pointer; padding: 4px 6px; line-height: 1;
  transition: color .15s;
}
.ni-close:hover { color: var(--t1); }

.ni-faction-row {
  display: flex; align-items: center; justify-content: center;
  gap: 8px; padding: 8px 16px; border-bottom: 1px solid var(--bd); flex-shrink: 0;
}
.ni-arrow {
  background: none; border: 1px solid var(--bd); border-radius: 3px;
  color: var(--t2); font-size: 10px; padding: 2px 8px; cursor: pointer;
  transition: all .15s;
}
.ni-arrow:hover { border-color: var(--tg); color: var(--tg); }
.ni-fc-chip {
  font-size: 12px; font-family: var(--font-serif); color: var(--t2);
  padding: 3px 10px; border-radius: 12px; cursor: pointer;
  transition: all .15s; letter-spacing: .5px;
}
.ni-fc-chip.on { color: var(--tg); background: rgba(212,170,96,.12); }

.ni-tabs {
  display: flex; border-bottom: 1px solid var(--bd); flex-shrink: 0;
}
.ni-tab {
  flex: 1; padding: 9px 4px; background: none; border: none;
  color: var(--t2); font-size: 12px; font-family: var(--font-serif);
  cursor: pointer; transition: all .15s; letter-spacing: .3px;
  border-bottom: 2px solid transparent; margin-bottom: -1px;
}
.ni-tab.on { color: var(--tg); border-bottom-color: var(--tg); }

.ni-body {
  flex: 1; overflow-y: auto; padding: 12px 16px;
  display: flex; flex-direction: column; gap: 0;
  min-height: 160px;
}
.ni-row {
  display: flex; justify-content: space-between; align-items: center;
  padding: 9px 0; border-bottom: 1px solid rgba(255,255,255,.04);
  font-size: 12px; font-family: var(--font-serif); letter-spacing: .3px;
}
.ni-row:last-child { border-bottom: none; }
.ni-divider { height: 1px; background: var(--bd); margin: 6px 0; }

.ni-footer {
  display: flex; justify-content: center; padding: 10px 16px;
  border-top: 1px solid var(--bd); flex-shrink: 0;
}
</style>
