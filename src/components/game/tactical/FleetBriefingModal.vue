<template>
  <div class="fbm-backdrop">
    <div class="fbm-panel">

      <!-- 헤더 -->
      <div class="fbm-header">
        <span class="fbm-title serif">함대별 회의</span>
        <span class="stage-tag">{{ currentIdx + 1 }} / {{ fleets.length }}</span>
        <span class="fbm-obj t-sub">작전: {{ objName(objective) }}</span>
      </div>

      <!-- 본문 -->
      <div v-if="currentFleet" class="fbm-body">

        <!-- 함대 카드 -->
        <div class="fleet-card" :class="`side-${playerFaction}`">
          <div class="fleet-top">
            <div class="fleet-name serif">{{ currentFleet.name }}</div>
            <div class="fleet-ships mono">{{ currentFleet.ships?.toLocaleString() }}척</div>
          </div>
          <div class="fleet-cmd-row">
            <span class="cmd-label t-sub">사령관</span>
            <span class="cmd-name serif" :class="`fc-${playerFaction}`">
              {{ charName(currentFleet.commander) }}
            </span>
            <span v-if="isPlayerFleet" class="tag-player">플레이어</span>
            <span v-else-if="isObserver" class="tag-obs">참관</span>
          </div>
        </div>

        <!-- 역할 배정 섹션 -->
        <div class="role-section">
          <div class="role-sec-title t-sub">전술 역할</div>

          <!-- 플레이어가 이 함대 사령관: 직접 선택 -->
          <div v-if="isPlayerFleet" class="role-choose">
            <button
              v-for="role in TACTICAL_ROLES"
              :key="role.code"
              :class="['role-btn', { selected: selectedRole === role.code }]"
              @click="selectedRole = role.code"
            >
              <span class="role-name serif">{{ role.name }}</span>
              <span class="role-desc">{{ role.desc }}</span>
            </button>
          </div>

          <!-- 플레이어가 참관자 (사령관 아님): 제안만 가능 -->
          <div v-else-if="isObserver" class="role-observer">
            <div class="obs-notice t-sub">지휘권 없음 — 의견 제시만 가능합니다.</div>
            <div class="obs-suggest-row">
              <span class="t-sub">제안:</span>
              <button
                v-for="role in TACTICAL_ROLES"
                :key="role.code"
                :class="['role-tag', { selected: suggestedRole === role.code }]"
                @click="suggestedRole = role.code"
              >{{ role.name }}</button>
            </div>
            <div class="ai-decide-row">
              <span class="t-sub">사령관 결정 →</span>
              <span class="ai-role serif">{{ roleName(assignedRoles[currentFleet.id]) }}</span>
            </div>
          </div>

          <!-- 비플레이어 함대: AI 자동 배정 표시 -->
          <div v-else class="role-ai">
            <span class="ai-badge">AI</span>
            <div class="ai-role-info">
              <span class="ai-role-name serif">{{ roleName(assignedRoles[currentFleet.id]) }}</span>
              <span class="ai-role-desc t-sub">{{ roleDesc(assignedRoles[currentFleet.id]) }}</span>
            </div>
          </div>
        </div>

        <!-- 이전 함대 역할 요약 (2번째 이후) -->
        <div v-if="currentIdx > 0" class="prev-summary">
          <div class="ps-title t-sub">배정 완료</div>
          <div v-for="(roleCode, fid) in confirmedRoles" :key="fid" class="ps-row">
            <span class="ps-fleet t-sub">{{ fleetName(fid) }}</span>
            <span class="ps-role">{{ roleName(roleCode) }}</span>
          </div>
        </div>

      </div>

      <!-- 푸터 -->
      <div class="fbm-footer">
        <button class="btn" @click="emit('skip')">전체 건너뜀</button>
        <button
          class="btn btn-gold"
          :disabled="isPlayerFleet && !selectedRole"
          @click="onNext"
        >
          {{ isLast ? '⚔ 전투 개시' : '다음 함대 →' }}
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive, watch, onMounted } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import { OPERATION_OBJECTIVES, TACTICAL_ROLES, defaultFleetRole } from '@/data/base/tactical/tacticalData'
import { useLang } from '@/composables/useLang'

const props = defineProps({
  ctx:       { type: Object, required: true },
  objective: { type: String, default: null },
})
const emit = defineEmits(['done', 'skip'])

const game     = useGameStore()
const { lang } = useLang()

// ── 플레이어 측 결정 ──────────────────────────────────────────
const playerSide = computed(() => {
  if (props.ctx.playerFaction === props.ctx.attackerFaction) return 'attacker'
  if (props.ctx.playerFaction === props.ctx.defenderFaction) return 'defender'
  return null
})
const playerFaction = computed(() => props.ctx.playerFaction ?? props.ctx.attackerFaction)
const isAttacker    = computed(() => playerSide.value === 'attacker')

const fleets = computed(() => {
  if (!playerSide.value) return []
  const allFleets = playerSide.value === 'attacker' ? props.ctx.attackerFleets : props.ctx.defenderFleets
  const pFleetId = game.playerChar?.fleetCode
  if (!pFleetId) return []
  return allFleets.filter(f => f.id === pFleetId)
})

// ── 현재 진행 상태 ────────────────────────────────────────────
const currentIdx   = ref(0)
const selectedRole = ref(null)
const suggestedRole = ref(null)
// fleetId → 역할 코드 (최종 배정)
const assignedRoles  = reactive({})
// 이미 확정된 함대 역할 (요약 표시용)
const confirmedRoles = reactive({})

// 초기화: 모든 함대에 기본 역할 자동 배정
function initRoles() {
  fleets.value.forEach((f, i) => {
    assignedRoles[f.id] = defaultFleetRole(i, isAttacker.value)
  })
}
initRoles()
watch(() => fleets.value, initRoles)

onMounted(() => {
  if (fleets.value.length === 0) emit('skip')
})

const currentFleet  = computed(() => fleets.value[currentIdx.value] ?? null)
const isPlayerFleet = computed(() =>
  !!currentFleet.value && currentFleet.value.commander === game.playerCharCode)
const isObserver    = computed(() =>
  !isPlayerFleet.value && game.playerCharCode && fleets.value.every(f => f.commander !== game.playerCharCode))
const isLast        = computed(() => currentIdx.value === fleets.value.length - 1)

// 플레이어 함대 전환 시 선택 초기화
watch(currentIdx, () => {
  selectedRole.value  = isPlayerFleet.value ? (assignedRoles[currentFleet.value?.id] ?? null) : null
  suggestedRole.value = null
})

// ── 헬퍼 ─────────────────────────────────────────────────────
function charName(code) {
  if (!code) return '—'
  const ch = game.characters?.[code]
  if (!ch) return code
  const n = ch.name
  if (Array.isArray(n)) return n.find(e => e.code === lang.value)?.context ?? n[0]?.context ?? code
  return n ?? code
}
function objName(code) {
  if (!code) return '—'
  return OPERATION_OBJECTIVES.find(o => o.code === code)?.name ?? code
}
function roleName(code) {
  if (!code) return '—'
  return TACTICAL_ROLES.find(r => r.code === code)?.name ?? code
}
function roleDesc(code) {
  if (!code) return ''
  return TACTICAL_ROLES.find(r => r.code === code)?.desc ?? ''
}
function fleetName(fid) {
  return fleets.value.find(f => f.id === fid)?.name ?? fid
}

// ── 다음 함대로 진행 ─────────────────────────────────────────
function onNext() {
  const fid = currentFleet.value.id
  // 플레이어 선택 반영
  if (isPlayerFleet.value && selectedRole.value) {
    assignedRoles[fid] = selectedRole.value
  }
  // 확정 목록에 추가
  confirmedRoles[fid] = assignedRoles[fid]

  if (isLast.value) {
    emit('done', { ...assignedRoles })
  } else {
    currentIdx.value++
  }
}
</script>

<style scoped>
.fbm-backdrop {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.76);
  display: flex; align-items: center; justify-content: center;
  z-index: 100;
}
.fbm-panel {
  background: var(--bg2);
  border: 1px solid var(--bd);
  border-radius: var(--r);
  width: min(560px, 96vw);
  max-height: 90vh;
  overflow-y: auto;
  display: flex; flex-direction: column;
}

/* 헤더 */
.fbm-header {
  display: flex; align-items: baseline; gap: 10px;
  padding: 13px 18px 10px;
  border-bottom: 1px solid var(--bd);
  flex-shrink: 0;
}
.fbm-title { font-size: 15px; letter-spacing: 2px; color: var(--tg); }
.stage-tag {
  font-size: 10px; padding: 1px 7px; border-radius: 3px;
  background: rgba(218,165,32,.12); border: 1px solid rgba(218,165,32,.3);
  color: var(--tg); letter-spacing: .5px;
}
.fbm-obj { margin-left: auto; font-size: 11px; }

/* 본문 */
.fbm-body {
  padding: 16px 18px;
  display: flex; flex-direction: column; gap: 14px;
  flex: 1;
}

/* 함대 카드 */
.fleet-card {
  padding: 10px 13px;
  background: var(--bg3);
  border: 1px solid var(--bd);
  border-radius: 5px;
  display: flex; flex-direction: column; gap: 5px;
}
.fleet-top {
  display: flex; justify-content: space-between; align-items: baseline;
}
.fleet-name { font-size: 14px; letter-spacing: 1px; color: var(--t1); }
.fleet-ships { font-size: 11px; color: var(--td); }
.fleet-cmd-row {
  display: flex; align-items: center; gap: 7px; flex-wrap: wrap;
}
.cmd-label { font-size: 10px; }
.cmd-name  { font-size: 12px; }
.tag-player {
  font-size: 9px; padding: 1px 6px; border-radius: 3px;
  background: rgba(218,165,32,.15); border: 1px solid rgba(218,165,32,.35);
  color: var(--tg);
}
.tag-obs {
  font-size: 9px; padding: 1px 6px; border-radius: 3px;
  background: rgba(120,120,200,.12); border: 1px solid rgba(120,120,200,.3);
  color: #9090cc;
}

/* 역할 섹션 */
.role-section {
  display: flex; flex-direction: column; gap: 9px;
}
.role-sec-title { font-size: 11px; letter-spacing: .5px; }

/* 플레이어 선택 */
.role-choose {
  display: flex; flex-direction: column; gap: 5px;
}
.role-btn {
  display: flex; align-items: baseline; gap: 10px;
  padding: 8px 12px;
  background: var(--bg3); border: 1px solid var(--bd);
  border-radius: 4px; cursor: pointer; text-align: left;
  transition: border-color .12s, background .12s;
}
.role-btn:hover    { border-color: var(--bdg); background: var(--bg4); }
.role-btn.selected { border-color: var(--tg);  background: rgba(218,165,32,.08); }
.role-name { font-size: 12px; color: var(--t1); flex-shrink: 0; min-width: 56px; }
.role-desc { font-size: 10px; color: var(--td); }

/* 참관자 */
.role-observer {
  display: flex; flex-direction: column; gap: 9px;
  padding: 10px 12px;
  background: var(--bg3); border-radius: 4px;
  border: 1px solid rgba(120,120,200,.2);
}
.obs-notice { font-size: 11px; color: #9090cc; }
.obs-suggest-row {
  display: flex; align-items: center; gap: 6px; flex-wrap: wrap;
}
.role-tag {
  padding: 3px 9px; font-size: 10px;
  background: var(--bg4); border: 1px solid var(--bd);
  border-radius: 3px; color: var(--t2); cursor: pointer;
  transition: border-color .1s, color .1s;
}
.role-tag:hover    { border-color: var(--bdg); color: var(--t1); }
.role-tag.selected { border-color: rgba(120,120,200,.5); color: #9090cc; }
.ai-decide-row {
  display: flex; align-items: center; gap: 7px; font-size: 11px; color: var(--t2);
}
.ai-role { font-size: 12px; color: var(--t1); }

/* AI 자동 배정 */
.role-ai {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 12px;
  background: var(--bg3); border-radius: 4px;
}
.ai-badge {
  font-size: 9px; padding: 1px 5px; border-radius: 3px;
  background: rgba(100,100,180,.2); border: 1px solid rgba(100,100,180,.3);
  color: #9090cc; flex-shrink: 0;
}
.ai-role-info { display: flex; flex-direction: column; gap: 2px; }
.ai-role-name { font-size: 13px; color: var(--t1); }
.ai-role-desc { font-size: 10px; }

/* 이전 배정 요약 */
.prev-summary {
  padding: 9px 12px;
  background: var(--bg3); border-radius: 4px;
  display: flex; flex-direction: column; gap: 4px;
}
.ps-title { font-size: 10px; letter-spacing: .5px; margin-bottom: 4px; }
.ps-row   { display: flex; justify-content: space-between; align-items: center; font-size: 11px; }
.ps-fleet { font-size: 10px; }
.ps-role  { color: var(--tg); font-family: var(--font-serif); }

/* 푸터 */
.fbm-footer {
  display: flex; justify-content: flex-end; gap: 8px;
  padding: 12px 18px 14px;
  border-top: 1px solid var(--bd); flex-shrink: 0;
}

/* 세력 색상 */
.fc-REH { color: var(--REH); }
.fc-FPA { color: var(--FPA); }
.fc-PZN { color: var(--PZN); }

.t-sub  { color: var(--t2); letter-spacing: .4px; font-size: var(--fs-sm, 11px); }
.serif  { font-family: var(--font-serif); }
.mono   { font-family: var(--font-mono); }
</style>
