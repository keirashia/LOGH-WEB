<template>
  <div class="obm-backdrop" @click.self="onSkip">
    <div class="obm-panel">

      <!-- 헤더 -->
      <div class="obm-header">
        <span class="obm-title serif">작전 회의</span>
        <span class="obm-location">{{ locationName }}</span>
      </div>

      <!-- 전력 현황 -->
      <div class="obm-forces">
        <div class="obm-side" :class="`side-${ctx.attackerFaction}`">
          <div class="side-label">공격</div>
          <div class="faction-name" :class="`fc-${ctx.attackerFaction}`">{{ factionName(ctx.attackerFaction) }}</div>
          <div class="sup-cmd" v-if="attackerSupChar">
            <span class="sup-label">총사령관</span>
            <span class="sup-name serif">{{ attackerSupChar.name }}</span>
            <span class="sup-rank mono">{{ attackerRankName }}</span>
          </div>
          <div class="fleet-list">
            <div v-for="f in ctx.attackerFleets" :key="f.id" class="fleet-row">
              <span class="fleet-name">{{ f.name }}</span>
              <span class="fleet-ships mono">{{ f.ships.toLocaleString() }}척</span>
            </div>
          </div>
        </div>

        <div class="obm-vs serif">vs</div>

        <div class="obm-side" :class="`side-${ctx.defenderFaction}`">
          <div class="side-label">방어</div>
          <div class="faction-name" :class="`fc-${ctx.defenderFaction}`">{{ factionName(ctx.defenderFaction) }}</div>
          <div class="sup-cmd" v-if="defenderSupChar">
            <span class="sup-label">총사령관</span>
            <span class="sup-name serif">{{ defenderSupChar.name }}</span>
            <span class="sup-rank mono">{{ defenderRankName }}</span>
          </div>
          <div class="fleet-list">
            <div v-for="f in ctx.defenderFleets" :key="f.id" class="fleet-row">
              <span class="fleet-name">{{ f.name }}</span>
              <span class="fleet-ships mono">{{ f.ships.toLocaleString() }}척</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 작전목표 선택 (플레이어가 총사령관인 경우) -->
      <template v-if="canSetObjective">
        <div class="obm-divider"></div>
        <div class="obm-obj-section">
          <div class="obj-section-title serif">작전 목표 수립</div>
          <div class="obj-list">
            <button
              v-for="obj in availableObjectives"
              :key="obj.code"
              :class="['obj-btn', { selected: selected === obj.code }]"
              @click="selected = obj.code"
            >
              <span class="obj-name serif">{{ obj.name }}</span>
              <span class="obj-desc">{{ obj.desc }}</span>
            </button>
          </div>
        </div>
      </template>

      <!-- 버튼 -->
      <div class="obm-footer">
        <button class="btn" @click="onSkip">강제 진입</button>
        <button
          v-if="canSetObjective"
          class="btn btn-gold"
          :disabled="!selected"
          @click="onConfirm"
        >
          작전 목표 확정
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useGameStore }  from '@/stores/gameStore'
import { OPERATION_OBJECTIVES } from '@/data/base/tactical/tacticalData'
import { JOB_MAP } from '@/data/base/jobs/jobData'
import { useLang } from '@/composables/useLang'

const props = defineProps({
  ctx: { type: Object, required: true },
})
const emit = defineEmits(['confirm', 'skip'])

const game     = useGameStore()
const { lang } = useLang()
const selected = ref(null)

// ── 기본 정보 ─────────────────────────────────────────────────
const locationName = computed(() => {
  const sys = game.systems?.[props.ctx.locationId]
  return sys?.name?.find(e => e.code === lang.value)?.context ?? props.ctx.locationId
})

function factionName(id) {
  return game.factions?.[id]?.name?.find(e => e.code === lang.value)?.context ?? id
}

// ── 총사령관 ──────────────────────────────────────────────────
const attackerSupChar = computed(() => {
  const code = props.ctx.attackerSupCmd
  return code ? game.characters?.[code] ?? null : null
})
const defenderSupChar = computed(() => {
  const code = props.ctx.defenderSupCmd
  return code ? game.characters?.[code] ?? null : null
})

function rankName(char) {
  if (!char) return ''
  const rankJob = (char.jobs ?? []).find(j => j.jobCode?.startsWith('JB_MR'))
  if (!rankJob) return ''
  return JOB_MAP[rankJob.jobCode]?.name?.find(n => n.code === lang.value)?.context ?? rankJob.jobCode
}

const attackerRankName = computed(() => rankName(attackerSupChar.value))
const defenderRankName = computed(() => rankName(defenderSupChar.value))

// ── 플레이어 총사령관 여부 ────────────────────────────────────
const playerSide = computed(() => {
  if (props.ctx.playerFaction === props.ctx.attackerFaction) return 'attacker'
  if (props.ctx.playerFaction === props.ctx.defenderFaction) return 'defender'
  return null
})

const canSetObjective = computed(() => {
  if (!playerSide.value) return false
  const supCmd = playerSide.value === 'attacker'
    ? props.ctx.attackerSupCmd
    : props.ctx.defenderSupCmd
  return supCmd === game.playerCharCode
})

// ── 선택 가능한 작전목표 ──────────────────────────────────────
const availableObjectives = computed(() => {
  return OPERATION_OBJECTIVES.filter(o => o.sides.includes(playerSide.value))
})

// ── 이벤트 ───────────────────────────────────────────────────
function onConfirm() {
  emit('confirm', selected.value)
}
function onSkip() {
  emit('skip')
}
</script>

<style scoped>
.obm-backdrop {
  position: fixed; inset: 0;
  background: rgba(0, 0, 0, 0.72);
  display: flex; align-items: center; justify-content: center;
  z-index: 100;
}

.obm-panel {
  background: var(--bg2);
  border: 1px solid var(--bd);
  border-radius: var(--r);
  width: min(680px, 96vw);
  max-height: 90vh;
  overflow-y: auto;
  display: flex; flex-direction: column;
  gap: 0;
}

/* ── 헤더 ─────────────────────────────────────────────── */
.obm-header {
  display: flex; align-items: baseline; justify-content: space-between;
  padding: 14px 18px 10px;
  border-bottom: 1px solid var(--bd);
}
.obm-title {
  font-size: 15px; letter-spacing: 2px; color: var(--tg);
}
.obm-location {
  font-size: 11px; color: var(--td); letter-spacing: .5px;
}

/* ── 전력 현황 ────────────────────────────────────────── */
.obm-forces {
  display: flex; align-items: flex-start;
  padding: 16px 18px;
  gap: 12px;
}
.obm-side {
  flex: 1;
  display: flex; flex-direction: column; gap: 6px;
}
.obm-vs {
  align-self: center;
  font-size: 18px; color: var(--td);
  padding: 0 4px; flex-shrink: 0;
}

.side-label {
  font-size: 9px; letter-spacing: 1px; color: var(--td);
  text-transform: uppercase;
}
.faction-name {
  font-size: 13px; letter-spacing: 1px;
}

.sup-cmd {
  display: flex; align-items: baseline; gap: 6px;
  padding: 5px 8px;
  background: var(--bg3); border-radius: 4px;
}
.sup-label {
  font-size: 9px; color: var(--td); letter-spacing: .5px; flex-shrink: 0;
}
.sup-name {
  font-size: 12px; color: var(--t1); flex: 1;
}
.sup-rank {
  font-size: 9px; color: var(--td);
}

.fleet-list { display: flex; flex-direction: column; gap: 3px; margin-top: 2px; }
.fleet-row  {
  display: flex; justify-content: space-between; align-items: center;
  padding: 2px 6px;
  font-size: 11px; color: var(--t2);
}
.fleet-ships { font-size: 10px; color: var(--td); }

/* ── 세력 색상 ────────────────────────────────────────── */
.fc-REH { color: var(--REH); }
.fc-FPA { color: var(--FPA); }
.fc-PZN { color: var(--PZN); }

/* ── 구분선 ───────────────────────────────────────────── */
.obm-divider {
  height: 1px; background: var(--bd); margin: 0 18px;
}

/* ── 작전목표 ─────────────────────────────────────────── */
.obm-obj-section {
  padding: 14px 18px 8px;
  display: flex; flex-direction: column; gap: 10px;
}
.obj-section-title {
  font-size: 12px; letter-spacing: 1px; color: var(--t2);
}

.obj-list {
  display: flex; flex-direction: column; gap: 6px;
}
.obj-btn {
  display: flex; align-items: baseline; gap: 10px;
  padding: 8px 12px;
  background: var(--bg3); border: 1px solid var(--bd);
  border-radius: 4px; cursor: pointer; text-align: left;
  transition: border-color .15s, background .15s;
}
.obj-btn:hover {
  border-color: var(--bdg);
  background: var(--bg4);
}
.obj-btn.selected {
  border-color: var(--tg);
  background: rgba(218,165,32,0.08);
}
.obj-name {
  font-size: 12px; color: var(--t1); letter-spacing: .5px; flex-shrink: 0; min-width: 64px;
}
.obj-desc {
  font-size: 10px; color: var(--td);
}

/* ── 푸터 ─────────────────────────────────────────────── */
.obm-footer {
  display: flex; justify-content: flex-end; gap: 8px;
  padding: 12px 18px 16px;
  border-top: 1px solid var(--bd);
}
</style>
