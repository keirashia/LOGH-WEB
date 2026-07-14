<template>
  <div class="modal-box ni-modal">

    <!-- 헤더 -->
    <div class="ni-header">
      <span class="serif gold ni-title">{{ viewFaction?.nameKr ?? viewId }} 국가정보</span>
      <button class="ni-close mono dim" @click="$emit('close')">✕</button>
    </div>

    <!-- 세력 선택 -->
    <div class="ni-faction-row">
      <button class="ni-arrow" @click="prevFaction">◀</button>
      <button
        v-for="(id, i) in factionIds" :key="id"
        class="ni-fc-chip serif"
        :class="[`fc-${id}`, { on: id === viewId }]"
        @click="viewIdx = i"
      >{{ game.factions[id]?.shortNameKr ?? id }}</button>
      <button class="ni-arrow" @click="nextFaction">▶</button>
    </div>

    <!-- 탭 -->
    <div class="ni-tabs">
      <button v-for="t in TABS" :key="t.id"
              class="ni-tab serif"
              :class="{ on: tab === t.id }"
              @click="tab = t.id">{{ t.label }}</button>
    </div>

    <!-- 본문 -->
    <div class="ni-body">

      <!-- 이념 탭 -->
      <template v-if="tab === 'idea'">
        <div class="ni-card-grid">
          <div class="ni-card">
            <div class="ni-card-head">체제</div>
            <div class="ni-card-body">
              <div class="ni-item">
                <span class="ni-lbl">정치 체제</span>
                <span class="ni-val serif">{{ viewFaction?.ideology?.system ?? '불명' }}</span>
              </div>
              <div class="ni-item">
                <span class="ni-lbl">이념</span>
                <span class="ni-val serif">{{ viewFaction?.ideology?.name ?? '불명' }}</span>
              </div>
              <div class="ni-item">
                <span class="ni-lbl">경제</span>
                <span class="ni-val serif">{{ viewFaction?.economy?.name ?? '불명' }}</span>
              </div>
            </div>
          </div>
          <div class="ni-card">
            <div class="ni-card-head">목표</div>
            <div class="ni-card-body">
              <div class="ni-item">
                <span class="ni-lbl">목표 이념</span>
                <span class="ni-val dim serif">미설정</span>
              </div>
              <div class="ni-item">
                <span class="ni-lbl">목표 경제</span>
                <span class="ni-val dim serif">미설정</span>
              </div>
            </div>
          </div>
          <div class="ni-card">
            <div class="ni-card-head">중점</div>
            <div class="ni-card-body">
              <div class="ni-item">
                <span class="ni-lbl">현재 중점</span>
                <span class="ni-val dim serif">미설정</span>
              </div>
              <div class="ni-item">
                <span class="ni-lbl">중점 이력</span>
                <span class="ni-val dim serif">없음</span>
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- 경제 탭 -->
      <template v-if="tab === 'econ'">
        <div class="ni-card-grid">
          <div class="ni-card">
            <div class="ni-card-head">재정</div>
            <div class="ni-card-body">
              <div class="ni-item">
                <span class="ni-lbl">국가 재정</span>
                <span class="ni-val gold mono">{{ (viewResources?.gold ?? 0).toLocaleString() }}</span>
              </div>
              <div class="ni-item">
                <span class="ni-lbl">국가 부채</span>
                <span class="ni-val mono" :class="isPlayer && game._loanBalance > 0 ? 'alert' : ''">
                  {{ isPlayer ? game._loanBalance.toLocaleString() : '—' }}
                </span>
              </div>
            </div>
          </div>
          <div class="ni-card">
            <div class="ni-card-head">세입</div>
            <div class="ni-card-body">
              <div class="ni-item">
                <span class="ni-lbl">평균 세율</span>
                <span class="ni-val mono">{{ avgTax }}%</span>
              </div>
              <div class="ni-item">
                <span class="ni-lbl">예상 수입</span>
                <span class="ni-val gold mono">{{ expectedIncome.toLocaleString() }}</span>
              </div>
            </div>
          </div>
          <div class="ni-card">
            <div class="ni-card-head">민심</div>
            <div class="ni-card-body">
              <div class="ni-item">
                <span class="ni-lbl">평균 지지율</span>
                <span class="ni-val mono" :class="moraleClass(avgMorale)">{{ avgMorale }}%</span>
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- 군사 탭 -->
      <template v-if="tab === 'military'">
        <div class="ni-card-grid">
          <div class="ni-card">
            <div class="ni-card-head">함대 현황</div>
            <div class="ni-card-body">
              <div class="ni-item">
                <span class="ni-lbl">보유 함대</span>
                <span class="ni-val mono">{{ viewFleetCount }}개</span>
              </div>
              <div class="ni-item">
                <span class="ni-lbl">총 함선</span>
                <span class="ni-val mono">{{ viewShipCount.toLocaleString() }}척</span>
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- 성계 탭 -->
      <template v-if="tab === 'star'">
        <div class="ni-card-grid">
          <div class="ni-card">
            <div class="ni-card-head">영토</div>
            <div class="ni-card-body">
              <div class="ni-item">
                <span class="ni-lbl">보유 성계</span>
                <span class="ni-val mono">{{ game.sysCounts[viewId] ?? 0 }}개</span>
              </div>
              <div class="ni-item">
                <span class="ni-lbl">평균 지지율</span>
                <span class="ni-val mono" :class="moraleClass(avgMorale)">{{ avgMorale }}%</span>
              </div>
              <div class="ni-item">
                <span class="ni-lbl">평균 세율</span>
                <span class="ni-val mono">{{ avgTax }}%</span>
              </div>
            </div>
          </div>
        </div>
      </template>

    </div>

    <!-- 푸터 -->
    <div class="ni-footer">
      <button class="btn btn-gold" @click="$emit('close')">확인</button>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'

defineEmits(['close'])
const game = useGameStore()

const TABS = [
  { id: 'idea',     label: '이념' },
  { id: 'econ',     label: '경제' },
  { id: 'military', label: '군사' },
  { id: 'star',     label: '성계' },
]

const tab        = ref('idea')
const factionIds = computed(() => Object.keys(game.factions))
const viewIdx    = ref(Math.max(0, factionIds.value.indexOf(game.playerFaction)))

const viewId        = computed(() => factionIds.value[viewIdx.value] ?? game.playerFaction)
const viewFaction   = computed(() => game.factions[viewId.value]  ?? null)
const viewResources = computed(() => game.resources[viewId.value] ?? null)
const viewFleets    = computed(() => game.fleets[viewId.value]    ?? [])
const isPlayer      = computed(() => viewId.value === game.playerFaction)

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

function moraleClass(v) {
  return v >= 70 ? 'ok' : v >= 40 ? '' : 'alert'
}
</script>

<style scoped>
.ni-modal {
  width: 80vw;
  height: 80vh;
  display: flex;
  flex-direction: column;
  padding: 0;
  overflow: hidden;
}

/* 헤더 */
.ni-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 20px; border-bottom: 1px solid var(--bd);
  background: rgba(255,255,255,.02); flex-shrink: 0;
}
.ni-title { font-size: 15px; letter-spacing: 1px; }
.ni-close {
  background: none; border: none; color: var(--td); font-size: 16px;
  cursor: pointer; padding: 2px 6px; border-radius: var(--r);
  transition: color .15s;
}
.ni-close:hover { color: var(--t1); }

/* 세력 선택 */
.ni-faction-row {
  display: flex; align-items: center; justify-content: center;
  gap: 6px; padding: 10px 20px; border-bottom: 1px solid var(--bd); flex-shrink: 0;
}
.ni-arrow {
  background: none; border: 1px solid var(--bd); border-radius: 3px;
  color: var(--t2); font-size: 10px; padding: 3px 10px; cursor: pointer;
  transition: all .15s;
}
.ni-arrow:hover { border-color: var(--tg); color: var(--tg); }
.ni-fc-chip {
  font-size: 12px; color: var(--t2); letter-spacing: .5px;
  padding: 4px 16px; border-radius: 14px; cursor: pointer; border: none;
  background: none; transition: all .15s;
}
.ni-fc-chip.on { background: rgba(255,255,255,.06); color: var(--t1); }
.ni-fc-chip.fc-REH.on { color: var(--REH); background: rgba(var(--REH-rgb, 200,60,60), .1); }
.ni-fc-chip.fc-FPA.on { color: var(--FPA); background: rgba(var(--FPA-rgb, 60,120,200), .1); }
.ni-fc-chip.fc-PZN.on { color: var(--PZN); background: rgba(var(--PZN-rgb, 60,180,120), .1); }

/* 탭 */
.ni-tabs {
  display: flex; border-bottom: 1px solid var(--bd); flex-shrink: 0;
}
.ni-tab {
  flex: 1; padding: 10px 4px; background: none; border: none;
  color: var(--t2); font-size: 12px; letter-spacing: .5px;
  cursor: pointer; transition: all .15s;
  border-bottom: 2px solid transparent; margin-bottom: -1px;
}
.ni-tab:hover { color: var(--t1); }
.ni-tab.on { color: var(--tg); border-bottom-color: var(--tg); }

/* 본문 */
.ni-body {
  flex: 1; overflow-y: auto; min-height: 0;
  padding: 20px;
}

/* 카드 그리드 */
.ni-card-grid {
  display: flex; flex-wrap: wrap; gap: 16px; align-items: flex-start;
}
.ni-card {
  flex: 1; min-width: 200px;
  border: 1px solid var(--bd); border-radius: var(--r); overflow: hidden;
}
.ni-card-head {
  padding: 9px 16px;
  background: rgba(255,255,255,.025);
  border-bottom: 1px solid var(--bd);
  font-size: 11px; font-family: var(--font-mono); color: var(--td);
  letter-spacing: 1px; text-transform: uppercase;
}
.ni-card-body {
  padding: 4px 0;
  display: flex; flex-direction: column;
}
.ni-item {
  display: flex; justify-content: space-between; align-items: center;
  padding: 9px 16px; border-bottom: 1px solid rgba(255,255,255,.04);
  font-size: 12px; letter-spacing: .3px;
}
.ni-item:last-child { border-bottom: none; }
.ni-lbl { font-family: var(--font-serif); color: var(--td); }
.ni-val { font-family: var(--font-serif); color: var(--t1); }

/* 상태 색상 */
.ok    { color: #2ecc71 !important; }
.alert { color: #e74c3c !important; }

/* 푸터 */
.ni-footer {
  display: flex; justify-content: flex-end; padding: 12px 20px;
  border-top: 1px solid var(--bd); flex-shrink: 0;
}
</style>
