<template>
  <div class="modal-box fd-modal">
    <!-- 헤더 -->
    <div class="fd-header">
      <button class="fd-back" @click="game.openModal('fleetInfo')" title="목록으로">◀</button>
      <span class="serif gold fd-title">{{ fleet?.name ?? '함대 상세' }}</span>
      <button class="fd-close" @click="$emit('close')">✕</button>
    </div>

    <div v-if="!fleet" class="fd-empty dim serif">함대 정보를 찾을 수 없습니다.</div>

    <template v-else>
      <div class="fd-body">
        <!-- ── 상단: 초상화 + 기본정보 + 참모 ───────────── -->
        <div class="fd-top">
          <!-- 초상화 + 기본 -->
          <div class="fd-info-col">
            <div class="fd-portrait-wrap">
              <img v-if="commander"
                   :key="commander.code"
                   :src="charImgSrc(commander.code)"
                   class="fd-portrait-img" alt=""
                   @error="handleCharImgError($event, commander.code)" />
              <span v-else class="fd-portrait">👤</span>
            </div>
            <div class="fd-basic">
              <div class="fd-basic-row">
                <span class="fd-lbl">함대명</span>
                <span class="serif fd-val gold">{{ fleet.name }}</span>
              </div>
              <div class="fd-basic-row">
                <span class="fd-lbl">사령관</span>
                <CharChip v-if="commander" :char-code="fleet.commander" />
                <span v-else class="serif fd-val dim">미임명</span>
              </div>
              <div class="fd-basic-row">
                <span class="fd-lbl">위치</span>
                <span class="mono fd-val">{{ locationName }}</span>
              </div>
              <div class="fd-basic-row">
                <span class="fd-lbl">상태</span>
                <span class="fd-badge" :class="statusClass(fleet.status)">{{ statusLabel(fleet.status) }}</span>
              </div>
              <div class="fd-basic-row">
                <span class="fd-lbl">진형</span>
                <span class="serif fd-val">{{ formationName }}</span>
              </div>
            </div>
          </div>

          <!-- 함대참모 -->
          <div class="fd-staff-col">
            <div class="fd-section-label">함대 참모</div>
            <div v-if="officerList.length" class="fd-staff-list">
              <div v-for="o in officerList" :key="o.code" class="fd-staff-row">
                <CharChip :char-code="o.code" />
              </div>
            </div>
            <div v-else class="dim" style="font-size:11px">(편성된 참모 없음)</div>
          </div>
        </div>
        <div class="fd-divider" />

        <!-- ── 탭 바 ───────────────────────────────────── -->
        <div class="fd-tabs">
          <button
            v-for="tab in TABS" :key="tab.key"
            class="fd-tab" :class="{ active: activeTab === tab.key }"
            @click="activeTab = tab.key"
          >
            {{ tab.label }}
          </button>
        </div>

        <!-- ── 탭 컨텐츠 ─────────────────────────────────── -->
        <component
          :is="TAB_COMPONENTS[activeTab]"
          :fleet="fleet"
          :fleet-stats="fleetStats"
          :formation-name="formationName"
        />
      </div>

      <div class="fd-footer">
        <button class="btn" @click="game.openModal('fleetInfo')">목록으로</button>
        <button class="btn" @click="$emit('close')">닫기</button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import { FORMATIONS } from '@/data/base/tactical/tacticalData'
import { computeFleetStatsByStore } from '@/utils/fleetUtils'
import { charImgSrc, handleCharImgError } from '@/utils/charImg'
import CharChip from '@/components/common/CharChip.vue'
import FleetStatusPanel    from './fleet/FleetStatusPanel.vue'
import FleetInfoPanel      from './fleet/FleetInfoPanel.vue'
import FleetFormationPanel from './fleet/FleetFormationPanel.vue'

const props = defineProps({ payload: Object })
defineEmits(['close'])
const game = useGameStore()

// ── 탭 ───────────────────────────────────────────────
const TABS = [
  { key: 'status',    label: '현황' },
  { key: 'info',      label: '능력치' },
  { key: 'formation', label: '진형' },
]
const TAB_COMPONENTS = {
  status:    FleetStatusPanel,
  info:      FleetInfoPanel,
  formation: FleetFormationPanel,
}
const activeTab = ref('status')

// ── 함대 ─────────────────────────────────────────────
const fleet = computed(() => {
  const id = props.payload?.fleetId
  return id ? (game.pFleets ?? []).find(f => f.id === id) ?? null : null
})

// ── 사령관 ───────────────────────────────────────────
const commander = computed(() =>
  fleet.value?.commander ? (game.characters[fleet.value.commander] ?? null) : null
)

// ── 참모 목록 ─────────────────────────────────────────
const officerList = computed(() =>
  (fleet.value?.officers ?? []).map(code => ({ code }))
)

// ── 능력치 계산 ───────────────────────────────────────
const fleetStats = computed(() =>
  computeFleetStatsByStore(fleet.value, game.characters)
)

// ── 표시 헬퍼 ─────────────────────────────────────────
const locationName = computed(() => {
  const loc = fleet.value?.location
  if (!loc) return '—'
  const sys = game.systems[loc]
  if (!sys) return loc
  const n = sys.name
  if (Array.isArray(n)) return n.find(e => e.code === 'Kr')?.context ?? n[0]?.context ?? loc
  return n ?? loc
})

const formationName = computed(() =>
  fleet.value?.formation ? (FORMATIONS[fleet.value.formation]?.name ?? '—') : '—'
)

function statusLabel(s) {
  return { standby:'대기', moving:'이동 중', battle:'교전 중', retreat:'후퇴' }[s] ?? s
}

function statusClass(s) {
  return { battle:'st-battle', moving:'st-moving', retreat:'st-retreat' }[s] ?? 'st-standby'
}
</script>

<style scoped>
.fd-modal {
  width: 80vw; height: 80vh;
  display: flex; flex-direction: column;
  padding: 0; overflow: hidden;
}

/* ── 헤더 ─────────────────────────────────────── */
.fd-header {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 14px; border-bottom: 1px solid var(--bd);
  background: rgba(255,255,255,.02); flex-shrink: 0;
}
.fd-back {
  background: none; border: 1px solid var(--bd); border-radius: 4px;
  color: var(--t2); font-size: 11px; padding: 3px 8px; cursor: pointer;
  transition: all .15s; line-height: 1; flex-shrink: 0;
}
.fd-back:hover { border-color: var(--tg); color: var(--tg); }
.fd-title { flex: 1; text-align: center; font-size: 14px; letter-spacing: 1px; }
.fd-close {
  background: none; border: none; color: var(--td);
  font-size: 14px; cursor: pointer; padding: 4px 6px; line-height: 1;
  transition: color .15s; flex-shrink: 0;
}
.fd-close:hover { color: var(--t1); }

.fd-empty { padding: 40px 16px; text-align: center; font-size: 13px; }

/* ── 바디 ─────────────────────────────────────── */
.fd-body {
  flex: 1; overflow-y: auto;
  padding: 14px 16px; display: flex; flex-direction: column; gap: 14px;
}

/* ── 상단 ─────────────────────────────────────── */
.fd-top {
  display: flex; gap: 16px; align-items: flex-start;
}

/* 초상화 + 기본 정보 */
.fd-info-col {
  display: flex; gap: 12px; flex: 1; min-width: 0;
}
.fd-portrait-wrap {
  width: 60px; height: 70px; flex-shrink: 0;
  background: var(--bg4); border: 1px solid var(--bd); border-radius: var(--r);
  display: flex; align-items: center; justify-content: center;
  overflow: hidden;
}
.fd-portrait { font-size: 38px; line-height: 1; }
.fd-portrait-img {
  width: 100%; height: 100%;
  object-fit: cover; object-position: top;
}

.fd-basic { flex: 1; display: flex; flex-direction: column; gap: 4px; justify-content: center; }
.fd-basic-row { display: flex; align-items: center; gap: 8px; font-size: 11px; }
.fd-lbl  { color: var(--td); font-family: var(--font-serif); letter-spacing: .3px; min-width: 36px; flex-shrink: 0; }
.fd-val  { color: var(--t1); }

/* 상태 뱃지 */
.fd-badge { font-size: 9px; padding: 2px 7px; border-radius: 8px; }
.st-standby { color: var(--t2);  background: rgba(255,255,255,.06); }
.st-moving  { color: var(--tg);  background: rgba(212,170,96,.12); }
.st-battle  { color: #e74c3c;    background: rgba(231,76,60,.12); }
.st-retreat { color: var(--td);  background: rgba(255,255,255,.04); }

/* 함대참모 */
.fd-staff-col {
  width: 140px; flex-shrink: 0; display: flex; flex-direction: column; gap: 6px;
}
.fd-staff-list { display: flex; flex-direction: column; gap: 3px; }
.fd-staff-row  { display: flex; }

/* ── 구분선 ───────────────────────────────────── */
.fd-divider { height: 1px; background: var(--bd); flex-shrink: 0; }

/* ── 탭 바 ────────────────────────────────────── */
.fd-tabs {
  display: flex; gap: 0; flex-shrink: 0;
  border-bottom: 1px solid var(--bd);
  margin: -6px 0 0;
}
.fd-tab {
  flex: 1; background: none; border: none;
  border-bottom: 2px solid transparent;
  padding: 7px 4px; color: var(--td);
  font-size: 11px; font-family: var(--font-serif);
  letter-spacing: .5px; cursor: pointer;
  transition: color .15s, border-color .15s;
}
.fd-tab:hover  { color: var(--t2); }
.fd-tab.active { color: var(--tg); border-bottom-color: var(--tg); }

/* ── 푸터 ─────────────────────────────────────── */
.fd-footer {
  display: flex; justify-content: center; gap: 8px;
  padding: 10px 16px; border-top: 1px solid var(--bd); flex-shrink: 0;
}
</style>
