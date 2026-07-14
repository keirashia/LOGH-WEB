<template>
  <div class="modal-box oi-modal">

    <div class="oi-header">
      <span class="serif gold oi-title">작전 정보</span>
      <button class="oi-close mono dim" @click="$emit('close')">✕</button>
    </div>

    <!-- 탭 -->
    <div class="oi-tabs">
      <button
        v-for="t in TABS" :key="t.key"
        class="oi-tab mono"
        :class="{ active: activeTab === t.key }"
        @click="activeTab = t.key"
      >
        {{ t.label }}
        <span class="tab-count">{{ t.count.value }}</span>
      </button>
    </div>

    <!-- 스크롤 영역 -->
    <div class="oi-scroll">

      <!-- 확정 작전 섹션 -->
      <div v-if="activeTab !== 'pending'" class="oi-section">
        <div v-if="activeTab === 'all'" class="oi-section-label mono">확정 작전</div>
        <div v-if="approvedOps.length" class="oi-list">
          <div v-for="op in approvedOps" :key="op.id" class="oi-card confirmed">
            <div class="oi-card-top">
              <span class="faction-badge" :class="`fc-${op.payload.faction}`">
                {{ factionName(op.payload.faction) }}
              </span>
              <span class="type-badge" :class="op.payload.opType === 'attack' ? 'type-atk' : 'type-def'">
                {{ op.payload.opType === 'attack' ? '공격' : '방어' }}
              </span>
              <span class="serif op-title-text">{{ op.title }}</span>
            </div>
            <div class="oi-card-body">
              <div class="oi-row">
                <span class="oi-lbl">목표</span>
                <span class="oi-val serif">{{ op.payload.targetName }}</span>
              </div>
              <div class="oi-row">
                <span class="oi-lbl">함대 수</span>
                <span class="oi-val mono">{{ op.payload.fleetCount }}개 함대</span>
              </div>
              <div class="oi-row align-start">
                <span class="oi-lbl">투입함대</span>
                <div class="fleet-chips">
                  <template v-if="op.payload.fleetIds && op.payload.fleetIds.length">
                    <button
                      v-for="fid in op.payload.fleetIds"
                      :key="fid"
                      class="fleet-chip"
                      v-bind="longPressProps(fid)"
                    >{{ fleetName(fid) }}</button>
                  </template>
                  <span v-else class="oi-val dim">—</span>
                </div>
              </div>
              <div class="oi-row">
                <span class="oi-lbl">작전기간</span>
                <span class="oi-val mono">{{ op.payload.period }}일</span>
              </div>
              <div v-if="op.payload.notes" class="oi-notes">{{ op.payload.notes }}</div>
            </div>
          </div>
        </div>
        <div v-else class="oi-empty dim mono">확정된 작전이 없습니다.</div>
      </div>

      <!-- 승인 대기 섹션 -->
      <div v-if="activeTab !== 'approved'" class="oi-section">
        <div v-if="activeTab === 'all'" class="oi-section-label mono">승인 대기</div>
        <div v-if="pendingOps.length" class="oi-list">
          <div v-for="op in pendingOps" :key="op.id" class="oi-card pending">
            <div class="oi-card-top">
              <span class="type-badge" :class="op.payload.opType === 'attack' ? 'type-atk' : 'type-def'">
                {{ op.payload.opType === 'attack' ? '공격' : '방어' }}
              </span>
              <span class="serif op-title-text">{{ op.title }}</span>
              <span class="mono dim" style="font-size:9px;margin-left:auto">T{{ op.registeredTurn }}</span>
            </div>
            <div class="oi-card-body">
              <div class="oi-row">
                <span class="oi-lbl">목표</span>
                <span class="oi-val serif">{{ op.payload.targetName }}</span>
              </div>
              <div class="oi-row">
                <span class="oi-lbl">함대 수</span>
                <span class="oi-val mono">{{ op.payload.fleetCount }}개 함대</span>
              </div>
              <div class="oi-row align-start">
                <span class="oi-lbl">투입함대</span>
                <div class="fleet-chips">
                  <template v-if="op.payload.fleetIds && op.payload.fleetIds.length">
                    <button
                      v-for="fid in op.payload.fleetIds"
                      :key="fid"
                      class="fleet-chip"
                      v-bind="longPressProps(fid)"
                    >{{ fleetName(fid) }}</button>
                  </template>
                  <span v-else class="oi-val dim">—</span>
                </div>
              </div>
              <div class="oi-row">
                <span class="oi-lbl">작전기간</span>
                <span class="oi-val mono">{{ op.payload.period }}일</span>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="oi-empty-center">
          <span class="dim mono">승인 대기 중인 작전이 없습니다.</span>
          <button class="btn btn-blue" style="font-size:11px;padding:6px 16px" @click="goToPropose">작전 제안</button>
        </div>
      </div>

    </div><!-- /oi-scroll -->

    <div class="oi-footer">
      <button class="btn btn-gold" @click="$emit('close')">확인</button>
    </div>

  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useGameStore } from '@/stores/gameStore'

defineEmits(['close'])

const game = useGameStore()

const activeTab = ref('all')

const allOps = computed(() =>
  game.agendas.filter(a => a.action === 'op_propose')
)

const approvedOps = computed(() =>
  allOps.value.filter(a => a.status === 'approved')
)

const pendingOps = computed(() =>
  allOps.value
    .filter(a => a.status === 'pending')
    .sort((a, b) => a.registeredTurn - b.registeredTurn)
)

const TABS = [
  { key: 'all',      label: '전체 작전', count: computed(() => allOps.value.length) },
  { key: 'approved', label: '확정 작전', count: computed(() => approvedOps.value.length) },
  { key: 'pending',  label: '승인 대기', count: computed(() => pendingOps.value.length) },
]

function factionName(id) {
  return game.factions?.[id]?.nameKr ?? id
}

function fleetName(fid) {
  for (const fleets of Object.values(game.fleets)) {
    const f = fleets.find(f => f.id === fid)
    if (f) return f.name
  }
  return fid
}

// ── 롱프레스 (500ms → fleetDetail 팝업) ─────────────────────────
let _lpTimer = null

function longPressProps(fid) {
  return {
    onMousedown:  () => { _lpTimer = setTimeout(() => openFleet(fid), 500) },
    onMouseup:    () => clearTimeout(_lpTimer),
    onMouseleave: () => clearTimeout(_lpTimer),
    onTouchstart: (e) => { e.preventDefault(); _lpTimer = setTimeout(() => openFleet(fid), 500) },
    onTouchend:   () => clearTimeout(_lpTimer),
  }
}

function openFleet(fid) {
  game.openModal('fleetDetail', { fleetId: fid })
}

function goToPropose() {
  game.openModal('operation')
}
</script>

<style scoped>
.oi-modal {
  width: min(94vw, 440px);
  height: min(85vh, 600px);
  display: flex;
  flex-direction: column;
  gap: 0;
}

.oi-scroll {
  flex: 1;
  overflow-y: auto;
  min-height: 0;
}

.oi-footer {
  padding-top: 12px;
  border-top: 1px solid var(--bd);
  display: flex;
  justify-content: flex-end;
  flex-shrink: 0;
}

/* 헤더 */
.oi-header {
  display: flex; align-items: center; gap: 8px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--bd);
}
.oi-title { font-size: 15px; letter-spacing: 1px; flex: 1; }
.oi-close {
  background: none; border: none; color: var(--td); font-size: 16px;
  cursor: pointer; padding: 2px 6px; border-radius: var(--r);
  transition: color .15s;
}
.oi-close:hover { color: var(--t1); }

/* 탭 */
.oi-tabs {
  display: flex;
  border-bottom: 1px solid var(--bd);
  flex-shrink: 0;
}
.oi-tab {
  flex: 1;
  padding: 8px 4px 7px;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  color: var(--td);
  font-size: 11px;
  letter-spacing: .5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  transition: color .15s, border-color .15s;
}
.oi-tab:hover { color: var(--t2); }
.oi-tab.active {
  color: var(--tg);
  border-bottom-color: var(--tg);
}
.tab-count {
  font-size: 9px;
  padding: 1px 5px;
  border-radius: 8px;
  background: var(--bg4);
  border: 1px solid var(--bd);
  color: var(--td);
  line-height: 1.4;
}
.oi-tab.active .tab-count {
  background: rgba(212,170,96,.12);
  border-color: rgba(212,170,96,.3);
  color: var(--tg);
}

/* 섹션 */
.oi-section {
  padding: 14px 0 8px;
  border-bottom: 1px solid var(--bd);
}
.oi-section:last-of-type { border-bottom: none; }
.oi-section-label {
  font-size: 1.6vh; letter-spacing: 1.5px; text-transform: uppercase;
  color: rgba(255,255,255,.82); margin-bottom: 8px; padding: 0 2px;
}

/* 카드 */
.oi-list { display: flex; flex-direction: column; gap: 8px; }
.oi-card {
  border: 1px solid var(--bd);
  border-radius: var(--r);
  overflow: hidden;
}
.oi-card.confirmed { border-color: rgba(212,170,96,.3); }
.oi-card.pending   { opacity: .75; }

.oi-card-top {
  display: flex; align-items: center; gap: 7px;
  padding: 8px 12px;
  background: rgba(255,255,255,.02);
  border-bottom: 1px solid var(--bd);
}
.op-title-text { font-size: 12px; color: var(--t1); flex: 1; }

.faction-badge {
  font-size: 9px; padding: 2px 7px; border-radius: 3px;
  font-family: var(--font-mono); letter-spacing: .5px; flex-shrink: 0;
}
.fc-REH { color: var(--REH); background: rgba(192,57,43,.12); border: 1px solid rgba(192,57,43,.3); }
.fc-FPA { color: var(--FPA); background: rgba(41,128,185,.12); border: 1px solid rgba(41,128,185,.3); }
.fc-PZN { color: var(--PZN); background: rgba(39,174,96,.12);  border: 1px solid rgba(39,174,96,.3); }

.type-badge {
  font-size: 9px; padding: 2px 7px; border-radius: 3px;
  font-family: var(--font-mono); letter-spacing: .5px; flex-shrink: 0;
}
.type-atk { color: #e8888a; background: rgba(192,57,43,.1); border: 1px solid rgba(192,57,43,.25); }
.type-def { color: #7ab8e8; background: rgba(41,128,185,.1); border: 1px solid rgba(41,128,185,.25); }

/* 카드 바디 */
.oi-card-body { padding: 8px 12px; display: flex; flex-direction: column; gap: 4px; }
.oi-row { display: flex; align-items: baseline; gap: 8px; }
.oi-lbl {
  font-size: 10px; color: var(--td); min-width: 56px;
  text-align: right; flex-shrink: 0; letter-spacing: .3px;
}
.oi-val { font-size: 12px; color: var(--t1); }
.oi-notes {
  margin-top: 4px; padding-top: 6px;
  border-top: 1px solid rgba(255,255,255,.05);
  font-size: 10px; color: var(--td); line-height: 1.6;
}

/* 투입함대 칩 */
.align-start { align-items: flex-start !important; }
.fleet-chips { display: flex; flex-wrap: wrap; gap: 5px; flex: 1; }
.fleet-chip {
  padding: 3px 9px; font-size: 11px; font-family: var(--font-serif);
  color: var(--t1); background: var(--bg4);
  border: 1px solid var(--bd); border-radius: 4px;
  cursor: pointer; user-select: none; -webkit-user-select: none;
  transition: border-color .15s, background .15s;
}
.fleet-chip:active {
  border-color: var(--tg);
  background: rgba(212,170,96,.1);
}

/* 빈 상태 */
.oi-empty {
  font-size: 11px; padding: 12px 2px; letter-spacing: .3px;
}
.oi-empty-center {
  display: flex; flex-direction: column; align-items: center;
  gap: 12px; padding: 24px 0;
  font-size: 11px; letter-spacing: .3px;
}
</style>
