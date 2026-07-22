<template>
  <div class="obm-backdrop">
    <div class="obm-panel">

      <!-- 헤더 -->
      <div class="obm-header">
        <span class="obm-title serif">작전 회의</span>
        <span class="stage-tag">{{ stageName }}</span>
        <span class="obm-location">{{ locationName }}</span>
      </div>

      <!-- ── Stage 1: 전력 브리핑 ────────────────────────── -->
      <template v-if="stage === 'briefing'">
        <div class="obm-forces">
          <!-- 공격측 -->
          <div class="obm-side" :class="`side-${ctx.attackerFaction}`">
            <div class="side-label">공격</div>
            <div class="faction-name" :class="`fc-${ctx.attackerFaction}`">{{ factionName(ctx.attackerFaction) }}</div>
            <div class="sup-cmd" v-if="attackerSupChar">
              <span class="sup-label">총사령관</span>
              <span class="sup-name serif">{{ charName(attackerSupChar) }}</span>
              <span class="sup-rank mono">{{ rankName(attackerSupChar) }}</span>
            </div>
            <div class="fleet-list">
              <div v-for="f in ctx.attackerFleets" :key="f.id" class="fleet-row">
                <span class="fleet-name">{{ f.name }}</span>
                <span class="fleet-ships mono">{{ atkVisible ? f.ships.toLocaleString()+'척' : '???' }}</span>
              </div>
            </div>
            <div class="fleet-total mono">
              합계: {{ atkVisible ? atkTotalShips.toLocaleString()+'척' : '??? 척' }}
            </div>
          </div>

          <div class="obm-vs serif">vs</div>

          <!-- 방어측 -->
          <div class="obm-side" :class="`side-${ctx.defenderFaction}`">
            <div class="side-label">방어</div>
            <div class="faction-name" :class="`fc-${ctx.defenderFaction}`">{{ factionName(ctx.defenderFaction) }}</div>
            <div class="sup-cmd" v-if="defenderSupChar">
              <span class="sup-label">총사령관</span>
              <span class="sup-name serif">{{ charName(defenderSupChar) }}</span>
              <span class="sup-rank mono">{{ rankName(defenderSupChar) }}</span>
            </div>
            <div class="fleet-list">
              <div v-for="f in ctx.defenderFleets" :key="f.id" class="fleet-row">
                <span class="fleet-name">{{ f.name }}</span>
                <span class="fleet-ships mono">{{ defVisible ? f.ships.toLocaleString()+'척' : '???' }}</span>
              </div>
            </div>
            <div class="fleet-total mono">
              합계: {{ defVisible ? defTotalShips.toLocaleString()+'척' : '??? 척' }}
            </div>
          </div>
        </div>

        <div class="intel-note" v-if="!enemyVisible">
          <span class="intel-icon">🔒</span> 첩보 미확보 — 적 전력 정보 불명
        </div>

        <div class="obm-footer">
          <button class="btn" :disabled="!canSkip" @click="emit('skip')">건너뜀</button>
          <button class="btn btn-gold" @click="stage = 'proposal'">작전 협의 →</button>
        </div>
      </template>

      <!-- ── Stage 2: 제독 의견 수렴 ──────────────────────── -->
      <template v-else-if="stage === 'proposal'">
        <div class="proposal-section">
          <div class="proposal-intro t-sub">
            각 제독의 작전 의견을 청취합니다.
          </div>

          <!-- 아군 제독들 -->
          <div v-for="f in playerSideFleets" :key="f.id" class="proposal-row" :class="{ 'player-row': f.isPlayerFleet }">
            <img
              v-if="f.char"
              class="proposer-portrait"
              :src="charImgSrc(f.char.code)"
              @error="e => handleCharImgError(e, f.char.code)"
            />
            <div class="proposer-info">
              <span class="proposer-name serif" :class="`fc-${ctx.playerFaction ?? ctx.attackerFaction}`">
                {{ f.char ? charName(f.char) : f.name }}
              </span>
              <span class="proposer-fleet t-sub">{{ f.name }}</span>
            </div>
            <div v-if="f.isPlayerFleet" class="player-choice">
              <div class="obj-mini-list">
                <button
                  v-for="obj in availableObjectives"
                  :key="obj.code"
                  :class="['obj-mini-btn', { selected: fleetProposals[f.id] === obj.code }]"
                  @click="fleetProposals[f.id] = obj.code"
                >{{ obj.name }}</button>
              </div>
            </div>
            <div v-else class="ai-proposal">
              <span class="ai-badge">AI</span>
              <span class="ai-obj">{{ objName(f.autoProposal) }}</span>
            </div>
          </div>
        </div>

        <div class="obm-footer">
          <button class="btn" @click="stage = 'briefing'">← 뒤로</button>
          <button class="btn btn-gold"
            :disabled="hasPlayerFleet && !playerFleetHasProposal"
            @click="goConfirm">
            총사령관 결정 →
          </button>
        </div>
      </template>

      <!-- ── Stage 3: 총사령관 최종 결정 ──────────────────── -->
      <template v-else-if="stage === 'confirm'">
        <div class="confirm-section">
          <div class="confirm-intro t-sub">
            {{ canSetObjective ? '총사령관으로서 최종 작전을 결정하십시오.' : '총사령관이 최종 작전을 결정합니다.' }}
          </div>

          <!-- 의견 요약 -->
          <div class="proposals-summary">
            <div class="ps-title t-sub">제출된 의견</div>
            <div v-for="f in playerSideFleets" :key="f.id" class="ps-row">
              <span class="ps-name">{{ f.char ? charName(f.char) : f.name }}</span>
              <span class="ps-obj" :class="`fc-${ctx.playerFaction ?? ctx.attackerFaction}`">
                {{ objName(f.isPlayerFleet ? fleetProposals[f.id] : f.autoProposal) }}
              </span>
            </div>
          </div>

          <div class="obm-divider"></div>

          <!-- 총사령관 결정 -->
          <div v-if="canSetObjective" class="obm-obj-section">
            <div class="obj-section-title serif">최종 작전 목표</div>
            <div class="obj-list">
              <button
                v-for="obj in availableObjectives"
                :key="obj.code"
                :class="['obj-btn', { selected: finalObjective === obj.code }]"
                @click="finalObjective = obj.code"
              >
                <span class="obj-name serif">{{ obj.name }}</span>
                <span class="obj-desc">{{ obj.desc }}</span>
              </button>
            </div>
          </div>
          <div v-else class="ai-decision">
            <div class="ai-decision-label t-sub">총사령관 결정</div>
            <div class="ai-decision-obj serif">{{ objName(aiDecision) }}</div>
            <div class="ai-decision-note t-sub">총사령관이 작전을 수립했습니다.</div>
          </div>
        </div>

        <div class="obm-footer">
          <button class="btn" @click="stage = 'proposal'">← 뒤로</button>
          <button class="btn btn-gold" :disabled="canSetObjective && !finalObjective" @click="onConfirm">
            작전 확정
          </button>
        </div>
      </template>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { useGameStore }     from '@/stores/gameStore'
import { useTacticalStore } from '@/stores/tacticalStore'
import { charImgSrc, handleCharImgError } from '@/utils/charImg'
import { OPERATION_OBJECTIVES } from '@/data/base/tactical/tacticalData'
import { JOB_MAP } from '@/data/base/jobs/jobData'
import { useLang } from '@/composables/useLang'

const props = defineProps({
  ctx: { type: Object, required: true },
})
const emit = defineEmits(['confirm', 'skip'])

const game     = useGameStore()
const tactical = useTacticalStore()
const { lang } = useLang()

const canSkip = computed(() => tactical.operationObjective != null)

// ── 단계 ──────────────────────────────────────────────────────
const stage = ref('briefing')
// fleet.id → 선택된 작전 코드
const fleetProposals = reactive({})
const finalObjective = ref(null)

const STAGE_NAMES = { briefing:'전력 브리핑', proposal:'작전 협의', confirm:'최종 결정' }
const stageName = computed(() => STAGE_NAMES[stage.value] ?? '')

// ── 기본 정보 ─────────────────────────────────────────────────
const locationName = computed(() => {
  const sys = game.systems?.[props.ctx.locationId]
  return sys?.name?.find(e => e.code === lang.value)?.context ?? props.ctx.locationId ?? ''
})

function factionName(id) {
  return game.factions?.[id]?.name?.find(e => e.code === lang.value)?.context ?? id
}
function charName(char) {
  if (!char) return ''
  const n = char.name
  if (Array.isArray(n)) return n.find(e => e.code === lang.value)?.context ?? n[0]?.context ?? ''
  return n ?? ''
}
function rankName(char) {
  if (!char) return ''
  const rankJob = (char.jobs ?? []).find(j => j.jobCode?.startsWith('JB_MR'))
  if (!rankJob) return ''
  return JOB_MAP[rankJob.jobCode]?.name?.find(n => n.code === lang.value)?.context ?? rankJob.jobCode
}
function objName(code) {
  if (!code) return '—'
  return OPERATION_OBJECTIVES.find(o => o.code === code)?.name ?? code
}

// ── 총사령관 ──────────────────────────────────────────────────
const attackerSupChar = computed(() => game.characters?.[props.ctx.attackerSupCmd] ?? null)
const defenderSupChar = computed(() => game.characters?.[props.ctx.defenderSupCmd] ?? null)

// ── 인텔 / 가시성 ─────────────────────────────────────────────
const playerSide = computed(() => {
  if (props.ctx.playerFaction === props.ctx.attackerFaction) return 'attacker'
  if (props.ctx.playerFaction === props.ctx.defenderFaction) return 'defender'
  return null
})
// 적 측 함대 정보가 공개되어 있는가
const enemyVisible = computed(() => props.ctx.hasIntel ?? false)
const atkVisible   = computed(() => playerSide.value === 'attacker' || enemyVisible.value)
const defVisible   = computed(() => playerSide.value === 'defender' || enemyVisible.value)

const atkTotalShips = computed(() => props.ctx.attackerFleets.reduce((s,f) => s + (f.ships ?? 0), 0))
const defTotalShips = computed(() => props.ctx.defenderFleets.reduce((s,f) => s + (f.ships ?? 0), 0))

// ── 플레이어 측 함대 목록 (Stage 2용) ──────────────────────────
function autoProposal(side) {
  return side === 'attacker' ? 'OBJ_ANNIHILATE' : 'OBJ_DELAY'
}

const playerSideFleets = computed(() => {
  if (!playerSide.value) return []
  const fleets = playerSide.value === 'attacker' ? props.ctx.attackerFleets : props.ctx.defenderFleets
  return fleets.map(f => {
    const char = game.characters?.[f.commander] ?? null
    const isPlayerFleet = f.commander === game.playerCharCode
    return {
      ...f,
      char,
      isPlayerFleet,
      autoProposal: autoProposal(playerSide.value),
    }
  })
})

const hasPlayerFleet = computed(() => playerSideFleets.value.some(f => f.isPlayerFleet))
const playerFleetHasProposal = computed(() => {
  const pf = playerSideFleets.value.find(f => f.isPlayerFleet)
  return pf ? !!fleetProposals[pf.id] : true
})

// ── 플레이어 총사령관 여부 ────────────────────────────────────
const canSetObjective = computed(() => {
  if (!playerSide.value) return false
  const supCmd = playerSide.value === 'attacker' ? props.ctx.attackerSupCmd : props.ctx.defenderSupCmd
  return supCmd === game.playerCharCode
})

// ── 선택 가능한 작전목표 ──────────────────────────────────────
const availableObjectives = computed(() => {
  return OPERATION_OBJECTIVES.filter(o => o.sides.includes(playerSide.value))
})

// ── AI 총사령관 결정 (과반수 의견 또는 SupCmd 자동 선택) ─────────
const aiDecision = computed(() => {
  // 제출된 의견 중 가장 많이 선택된 것
  const counts = {}
  for (const f of playerSideFleets.value) {
    const code = f.isPlayerFleet ? (fleetProposals[f.id] ?? f.autoProposal) : f.autoProposal
    counts[code] = (counts[code] ?? 0) + 1
  }
  const [best] = Object.entries(counts).sort((a,b) => b[1]-a[1])
  return best?.[0] ?? autoProposal(playerSide.value)
})

// ── 확정 버튼 ────────────────────────────────────────────────
function goConfirm() {
  // AI 총사령관인 경우 자동 결정 미리 세팅
  if (!canSetObjective.value) {
    finalObjective.value = aiDecision.value
  }
  stage.value = 'confirm'
}

function onConfirm() {
  const code = canSetObjective.value ? finalObjective.value : aiDecision.value
  emit('confirm', code)
}
</script>

<style scoped>
.obm-backdrop {
  position: fixed; inset: 0;
  background: rgba(0, 0, 0, 0.76);
  display: flex; align-items: center; justify-content: center;
  z-index: 100;
}

.obm-panel {
  background: var(--bg2);
  border: 1px solid var(--bd);
  border-radius: var(--r);
  width: min(700px, 96vw);
  max-height: 90vh;
  overflow-y: auto;
  display: flex; flex-direction: column;
}

/* ── 헤더 ─────────────────────────────────────────────── */
.obm-header {
  display: flex; align-items: baseline; gap: 10px;
  padding: 13px 18px 10px;
  border-bottom: 1px solid var(--bd);
  flex-shrink: 0;
}
.obm-title  { font-size: 15px; letter-spacing: 2px; color: var(--tg); }
.stage-tag  {
  font-size: 10px; padding: 1px 7px; border-radius: 3px;
  background: rgba(218,165,32,.12); border: 1px solid rgba(218,165,32,.3);
  color: var(--tg); letter-spacing: .5px;
}
.obm-location { font-size: 11px; color: var(--td); letter-spacing: .5px; margin-left: auto; }

/* ── 전력 현황 ────────────────────────────────────────── */
.obm-forces {
  display: flex; align-items: flex-start;
  padding: 16px 18px 12px;
  gap: 12px;
}
.obm-side {
  flex: 1; display: flex; flex-direction: column; gap: 5px;
}
.obm-vs {
  align-self: center; font-size: 18px; color: var(--td);
  padding: 0 4px; flex-shrink: 0;
}
.side-label     { font-size: 9px; letter-spacing: 1px; color: var(--td); text-transform: uppercase; }
.faction-name   { font-size: 13px; letter-spacing: 1px; }
.sup-cmd        { display: flex; align-items: baseline; gap: 6px; padding: 5px 8px; background: var(--bg3); border-radius: 4px; }
.sup-label      { font-size: 9px; color: var(--td); flex-shrink: 0; }
.sup-name       { font-size: 12px; color: var(--t1); flex: 1; }
.sup-rank       { font-size: 9px; color: var(--td); }
.fleet-list     { display: flex; flex-direction: column; gap: 2px; }
.fleet-row      { display: flex; justify-content: space-between; align-items: center; padding: 2px 5px; font-size: 11px; color: var(--t2); }
.fleet-ships    { font-size: 10px; color: var(--td); }
.fleet-total    { font-size: 10px; color: var(--t2); padding: 2px 5px; border-top: 1px solid var(--bd); margin-top: 2px; }

.intel-note {
  display: flex; align-items: center; gap: 5px;
  margin: 0 18px 12px;
  padding: 6px 10px;
  background: rgba(200,100,50,.08); border: 1px solid rgba(200,100,50,.2);
  border-radius: 4px; font-size: 11px; color: #e07050;
}
.intel-icon { flex-shrink: 0; }

/* ── Stage 2: 작전 협의 ────────────────────────────────── */
.proposal-section {
  padding: 14px 18px;
  display: flex; flex-direction: column; gap: 10px;
}
.proposal-intro { padding: 0 2px 4px; }

.proposal-row {
  display: flex; align-items: flex-start; gap: 12px;
  padding: 8px 10px; background: var(--bg3); border-radius: 4px;
  border: 1px solid var(--bd);
}
.proposal-row.player-row { border-color: rgba(218,165,32,.3); }

.proposer-portrait {
  width: 80px; height: 80px;
  border-radius: 4px;
  object-fit: cover; object-position: top;
  border: 1px solid var(--bd);
  flex-shrink: 0;
}
.proposer-info  { display: flex; flex-direction: column; gap: 2px; min-width: 80px; }
.proposer-name  { font-size: 12px; font-weight: bold; }
.proposer-fleet { font-size: 10px; color: var(--td); }

.obj-mini-list  { display: flex; flex-wrap: wrap; gap: 5px; }
.obj-mini-btn   {
  padding: 4px 10px; font-size: 11px;
  background: var(--bg4); border: 1px solid var(--bd);
  border-radius: 4px; color: var(--t2); cursor: pointer;
  transition: border-color .12s, color .12s;
}
.obj-mini-btn:hover    { border-color: var(--bdg); color: var(--t1); }
.obj-mini-btn.selected { border-color: var(--tg); color: var(--tg); background: rgba(218,165,32,.08); }

.ai-proposal   { display: flex; align-items: center; gap: 7px; flex: 1; padding-top: 3px; }
.ai-badge      {
  font-size: 9px; padding: 1px 5px; border-radius: 3px;
  background: rgba(100,100,180,.2); border: 1px solid rgba(100,100,180,.3);
  color: #9090cc; flex-shrink: 0;
}
.ai-obj        { font-size: 11px; color: var(--t2); font-family: var(--font-serif); }

/* ── Stage 3: 최종 결정 ────────────────────────────────── */
.confirm-section {
  padding: 14px 18px;
  display: flex; flex-direction: column; gap: 12px;
}
.confirm-intro { padding: 0 2px; }

.proposals-summary { display: flex; flex-direction: column; gap: 4px; }
.ps-title { margin-bottom: 6px; }
.ps-row   { display: flex; justify-content: space-between; align-items: center; font-size: 11px; padding: 3px 8px; background: var(--bg3); border-radius: 3px; }
.ps-name  { color: var(--t2); }
.ps-obj   { font-family: var(--font-serif); }

.ai-decision {
  display: flex; flex-direction: column; align-items: center; gap: 6px;
  padding: 16px;
  background: var(--bg3); border-radius: 4px; text-align: center;
}
.ai-decision-label { }
.ai-decision-obj   { font-size: 18px; letter-spacing: 2px; color: var(--tg); }
.ai-decision-note  { }

/* ── 구분선 ───────────────────────────────────────────── */
.obm-divider { height: 1px; background: var(--bd); margin: 0; }

/* ── 작전목표 목록 ────────────────────────────────────── */
.obm-obj-section {
  display: flex; flex-direction: column; gap: 8px;
}
.obj-section-title {
  font-size: 12px; letter-spacing: 1px; color: var(--t2);
}
.obj-list {
  display: flex; flex-direction: column; gap: 5px;
}
.obj-btn {
  display: flex; align-items: baseline; gap: 10px;
  padding: 8px 12px;
  background: var(--bg3); border: 1px solid var(--bd);
  border-radius: 4px; cursor: pointer; text-align: left;
  transition: border-color .14s, background .14s;
}
.obj-btn:hover    { border-color: var(--bdg); background: var(--bg4); }
.obj-btn.selected { border-color: var(--tg); background: rgba(218,165,32,0.08); }
.obj-name { font-size: 12px; color: var(--t1); letter-spacing: .5px; flex-shrink: 0; min-width: 64px; }
.obj-desc { font-size: 10px; color: var(--td); }

/* ── 푸터 ─────────────────────────────────────────────── */
.obm-footer {
  display: flex; justify-content: flex-end; gap: 8px;
  padding: 12px 18px 14px;
  border-top: 1px solid var(--bd); flex-shrink: 0;
}

/* ── 세력 색상 ────────────────────────────────────────── */
.fc-REH { color: var(--REH); }
.fc-FPA { color: var(--FPA); }
.fc-PZN { color: var(--PZN); }

/* ── 타이포 유틸 ──────────────────────────────────────── */
.t-sub  { font-size: var(--fs-sm, 11px); color: var(--t2); letter-spacing: .4px; }
.serif  { font-family: var(--font-serif); }
.mono   { font-family: var(--font-mono); }
</style>
