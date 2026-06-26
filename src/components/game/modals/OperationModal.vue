<template>
  <div class="modal-box op-modal">

    <!-- ── 헤더 (작전명 + X) ──────────────────────────────────── -->
    <div class="op-header">
      <span class="op-title serif gold">
        {{ operationName }}<span v-if="isModify" class="op-modify-tag mono"> 수정</span>
      </span>
      <button class="op-close mono dim" @click="doClose">✕</button>
    </div>

    <!-- ── 행동력 소진 알림 ──────────────────────────────────────── -->
    <div v-if="actionsFull" class="op-alert">
      <span class="mono">이번 턴엔 더 이상 제안할 수 없습니다.</span>
      <button class="btn btn-gold" style="margin-top:14px" @click="$emit('close')">확인</button>
    </div>

    <!-- ── 메인 폼 ───────────────────────────────────────────────── -->
    <template v-else>
      <div class="op-fields">

        <!-- 승인자 (자동, 불변) -->
        <div class="op-row">
          <span class="op-lbl dim">
            승인자
            <span class="hint-q" @click.stop="startHint('approver')">?</span>
          </span>
          <div class="op-char-card" :class="{ empty: !autoApprover }">
            <template v-if="autoApprover">
              <span class="char-avatar serif" :class="`fc-${autoApprover.faction}`">
                {{ autoApprover.nickKr?.[0] ?? '?' }}
              </span>
              <div class="char-info">
                <span class="serif char-nick">{{ autoApprover.nickKr }}</span>
                <span class="mono dim char-job">{{ approverJobLabel }}</span>
              </div>
              <span class="mono char-rate" :class="approverAcceptRate >= 50 ? 'gold' : 'alert'">
                {{ approverAcceptRate }}%
              </span>
            </template>
            <span v-else class="dim mono" style="font-size:11px">임명된 결정권자 없음</span>
          </div>
        </div>

        <!-- 발의자 -->
        <div class="op-row">
          <span class="op-lbl dim">
            발의자
            <span class="hint-q" @click.stop="startHint('proposer')">?</span>
          </span>
          <div class="op-char-card" :class="{ self: proposer?.code === game.playerCharCode }">
            <template v-if="proposer">
              <span class="char-avatar serif" :class="`fc-${proposer.faction}`">
                {{ proposer.nickKr?.[0] ?? '?' }}
              </span>
              <div class="char-info">
                <span class="serif char-nick">{{ proposer.nickKr }}</span>
                <span v-if="proposer.code !== game.playerCharCode" class="mono dim char-job">
                  대리 발의
                </span>
              </div>
              <span v-if="proposer.code !== game.playerCharCode"
                    class="mono char-rate" :class="proposerToApproverRate >= 50 ? 'gold' : 'alert'">
                {{ proposerToApproverRate }}%
              </span>
            </template>
            <span v-else class="dim mono" style="font-size:11px">인물 선택 필요</span>
          </div>
          <button class="btn-sm" @click="showProposerPicker = true">변경</button>
        </div>

        <!-- 작전목표 -->
        <div class="op-row">
          <span class="op-lbl dim">작전목표</span>
          <span class="op-val serif" :class="targetStar ? 'gold' : 'dim'">
            {{ targetLabel }}
          </span>
          <button class="btn-sm" @click="openTargetPicker">변경</button>
        </div>

        <!-- 출격함대 -->
        <div class="op-row">
          <span class="op-lbl dim">
            출격함대
            <span class="hint-q" @click.stop="startHint('fleet')">?</span>
          </span>
          <div class="slider-wrap">
            <input type="range" :min="1" :max="maxFleets" v-model.number="fleetCount" class="op-slider" />
            <input type="number" :min="1" :max="maxFleets" v-model.number="fleetCount" class="op-num" />
            <span class="dim mono" style="font-size:11px">/ {{ maxFleets }}</span>
          </div>
        </div>

        <!-- 작전기간 -->
        <div class="op-row">
          <span class="op-lbl dim">
            작전기간
            <span class="hint-q" @click.stop="startHint('period')">?</span>
          </span>
          <div class="slider-wrap">
            <input type="range" min="1" max="30" v-model.number="period" class="op-slider" />
            <input type="number" min="1" max="30" v-model.number="period" class="op-num" />
            <span class="dim mono" style="font-size:11px">일</span>
          </div>
        </div>

        <div class="op-divider" />

        <!-- 작전예산 -->
        <div class="op-row info">
          <span class="op-lbl dim">
            작전예산
            <span class="hint-q" @click.stop="startHint('budget')">?</span>
          </span>
          <span class="op-val mono">
            {{ budgetAmount.toLocaleString() }}
            <span class="dim" style="font-size:10px"> {{ currencyLabel }}</span>
          </span>
        </div>

        <!-- 보안도 -->
        <div class="op-row info">
          <span class="op-lbl dim">
            보안도
            <span class="hint-q" @click.stop="startHint('security')">?</span>
          </span>
          <div class="op-val security-bar-wrap">
            <div class="security-bar">
              <div class="security-fill" :style="{ width: securityPct + '%' }"
                   :class="securityPct >= 70 ? 'fill-ok' : securityPct >= 50 ? 'fill-mid' : 'fill-bad'" />
            </div>
            <span class="mono" :class="securityPct >= 70 ? 'gold' : securityPct >= 50 ? '' : 'alert'">
              {{ securityPct }}%
            </span>
          </div>
        </div>

        <!-- 특이사항 -->
        <div class="op-row notes-row">
          <span class="op-lbl dim" style="align-self:flex-start;padding-top:6px">특이사항</span>
          <textarea v-model="notes" class="op-notes" rows="2" placeholder="(선택 입력)" />
        </div>

      </div>

      <!-- 행동력 표시 -->
      <div class="op-action-dots">
        <span v-for="i in 3" :key="i"
              class="action-dot"
              :class="i <= game._opActionsUsed ? 'used' : 'free'" />
        <span class="mono dim" style="font-size:10px">행동력 {{ 3 - game._opActionsUsed }}/3 남음</span>
      </div>

      <!-- 버튼 -->
      <div class="modal-actions">
        <button class="btn btn-blue" @click="doHold">보류</button>
        <button class="btn" @click="doClose">취소</button>
        <button class="btn btn-gold" :disabled="!canSubmit" @click="doSubmit">
          {{ isModify ? '수정 제안' : '제안' }}
        </button>
      </div>
    </template>

    <!-- ── 발의자 선택 피커 ──────────────────────────────────────── -->
    <Teleport to="body">
      <div v-if="showProposerPicker" class="inner-overlay" @click.self="showProposerPicker = false">
        <div class="inner-popup">
          <div class="popup-header">
            <span class="mono">발의자 선택</span>
            <button class="op-close mono dim" @click="showProposerPicker = false">✕</button>
          </div>
          <div class="popup-list">
            <button v-for="c in proposerCandidates" :key="c.code"
                    class="picker-row"
                    :class="{ sel: proposer?.code === c.code, top: c.code === game.playerCharCode }"
                    @click="selectProposer(c)">
              <span class="char-avatar serif sm" :class="`fc-${c.faction}`">{{ c.nickKr?.[0] }}</span>
              <div class="picker-info">
                <span class="serif">{{ c.nickKr }}</span>
                <span class="mono dim" style="font-size:10px">{{ c.rankLabel }}</span>
              </div>
              <div class="picker-stats mono dim" style="font-size:10px">
                <span>친밀 —</span>
                <span>용맹 {{ c.brave ?? '—' }}</span>
              </div>
              <span class="mono" :class="c.code === game.playerCharCode ? 'gold' : ''">
                {{ c.code === game.playerCharCode ? '(본인)' : '' }}
              </span>
            </button>
            <div v-if="!proposerCandidates.length" class="dim" style="padding:16px;text-align:center;font-size:11px">
              중장 이상 군인이 없습니다
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- 발의자 위임 confirm -->
    <Teleport to="body">
      <div v-if="pendingProposer" class="inner-overlay">
        <div class="inner-popup compact">
          <p class="serif" style="line-height:1.7;font-size:13px">
            해당 인물에게 작전을 발의시킵니다.<br>
            해당 인물과 승인자가 모두 수락해야 작전이 발의됩니다.
          </p>
          <div class="modal-actions" style="margin-top:12px">
            <button class="btn" @click="pendingProposer = null">취소</button>
            <button class="btn btn-gold" @click="confirmProposer">확인</button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- ── 작전목표 선택 피커 ──────────────────────────────────────── -->
    <Teleport to="body">
      <div v-if="showTargetPicker" class="inner-overlay" @click.self="showTargetPicker = false">
        <div class="inner-popup target-popup">
          <div class="popup-header">
            <span class="mono">작전목표 선택</span>
            <button class="op-close mono dim" @click="showTargetPicker = false">✕</button>
          </div>

          <!-- 탭 라디오 -->
          <div class="target-tabs">
            <label v-for="t in TARGET_TABS" :key="t.key" class="target-tab-item">
              <input type="radio" :value="t.key" v-model="targetTab" />
              <span class="mono" :class="{ on: targetTab === t.key }">{{ t.label }}</span>
            </label>
          </div>

          <!-- 지도 탭 -->
          <div v-if="targetTab === 'map'" class="target-content dim mono" style="text-align:center;padding:24px;font-size:12px">
            지도 선택은 추후 지원 예정입니다.<br>성계 또는 함대 탭을 이용해 주세요.
          </div>

          <!-- 성계 탭 -->
          <div v-else-if="targetTab === 'star'" class="target-content">
            <div class="target-search">
              <input v-model="targetQ" class="op-search" placeholder="성계 이름 검색..." />
            </div>
            <div class="popup-list">
              <button v-for="s in filteredTargetSystems" :key="s.id"
                      class="picker-row"
                      :class="{ sel: tempTarget === s.id }"
                      @click="tempTarget = s.id">
                <div class="picker-info">
                  <span class="serif">{{ s.name }}</span>
                  <span class="mono dim" style="font-size:10px">{{ s.faction ?? '무소속' }}</span>
                </div>
                <span class="mono dim" style="font-size:10px">
                  {{ s.faction === game.playerFaction ? '아군' : s.faction ? '적' : '중립' }}
                </span>
              </button>
            </div>
          </div>

          <!-- 함대 탭 -->
          <div v-else class="target-content">
            <div class="popup-list">
              <button v-for="f in enemyFleets" :key="f.id"
                      class="picker-row"
                      :class="{ sel: tempTarget === f.location }"
                      @click="tempTarget = f.location">
                <div class="picker-info">
                  <span class="serif">{{ f.name }}</span>
                  <span class="mono dim" style="font-size:10px">{{ game.systems[f.location]?.name ?? f.location }}</span>
                </div>
                <span class="mono dim" style="font-size:10px">{{ f.ships.toLocaleString() }}척</span>
              </button>
              <div v-if="!enemyFleets.length" class="dim" style="padding:16px;text-align:center;font-size:11px">
                탐지된 적 함대가 없습니다
              </div>
            </div>
          </div>

          <div class="modal-actions" style="border-top:1px solid var(--bd);padding-top:12px">
            <button class="btn" @click="showTargetPicker = false">취소</button>
            <button class="btn btn-gold" :disabled="!tempTarget" @click="confirmTarget">확인</button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- ── 힌트 오버레이 ──────────────────────────────────────────── -->
    <Teleport to="body">
      <div v-if="activeHint" class="hint-overlay" @click="activeHint = null">
        <div class="hint-box" @click.stop>
          <div class="hint-text serif">{{ HINTS[activeHint] }}</div>
          <button class="btn" style="margin-top:14px" @click="activeHint = null">확인</button>
        </div>
      </div>
    </Teleport>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import { JOB_MAP } from '@/data/base/jobs/jobData'
import { APPROVAL_CHAINS } from '@/data/base/agenda/agendaData'

const emit = defineEmits(['close'])
const game = useGameStore()

// ── 상수 ──────────────────────────────────────────────────────────
const GENERAL_RANK_JOBS = new Set(['JB_MR001', 'JB_MR002', 'JB_MR003', 'JB_MR004'])

const TARGET_TABS = [
  { key: 'map',  label: '지도' },
  { key: 'star', label: '성계' },
  { key: 'fleet', label: '함대' },
]

const HINTS = {
  approver: game.playerFaction === 'FPA'
    ? '해당 작전을 승인할 인물입니다. 자유행성동맹의 경우 승인자 승인 후 평의회 의결을 거쳐 통과되면 작전이 수립됩니다.'
    : '해당 작전을 승인할 인물입니다. 은하제국의 경우 승인자 승인 후 3장관 회의, 재상(대리), 황제 승인을 거쳐 작전이 수립됩니다.',
  proposer: '해당 작전을 발의할 인물입니다. 당신이 중장 이하의 군사 직책을 보유하지 않거나 승인자와의 관계가 좋지 않은 경우, 다른 인물을 대리로 내세울 수 있습니다.',
  fleet:    '해당 작전에 투입될 함대의 수입니다. 승인된 공격 작전의 경우 완편된 출격함대가 교전지역에 돌입하기 전까지 공격하지 않습니다. 지정된 수의 함대가 모두 교전지역 인근에 도착한 이후 성계에 대한 공격을 수행합니다.',
  period:   '해당 작전의 유지기간입니다. 작전기간이 만료된 경우 현재 교전중인 함대를 제외한 나머지는 소속 행성으로 복귀하려고 시도합니다.',
  budget:   '해당 작전의 비용입니다. 매 턴(일) 단위로 지불되며 예산이 없는 경우 작전 중인 함대는 모두 교전에서 후퇴하고 소속 행성으로 복귀하려고 시도합니다.',
  security: '해당 작전이 적국에 누출될 확률입니다. 공격 작전의 경우 해당 작전이 유지되는 동안 매 턴(일)마다 이 확률로 누출될 가능성이 있습니다. 누출된 경우 적국은 즉시 방위작전을 편성합니다.',
}

// ── 상태 ──────────────────────────────────────────────────────────
const proposer          = ref(null)
const targetStar        = ref('')
const fleetCount        = ref(1)
const period            = ref(1)
const notes             = ref('')
const showProposerPicker = ref(false)
const pendingProposer   = ref(null)
const showTargetPicker  = ref(false)
const targetTab         = ref('star')
const targetQ           = ref('')
const tempTarget        = ref('')
const activeHint        = ref(null)
const isModify          = ref(false)
let   existingAgendaId  = null

// 힌트 표시
function startHint(field) { activeHint.value = field }

// ── 마운트: 이력 복원 ─────────────────────────────────────────────
onMounted(() => {
  // 이번 턴 제안 이력 확인 (수정 모드)
  const existing = game.agendas.find(
    a => a.action === 'op_propose' && a.registeredTurn === game.turn && a.status === 'pending'
  )
  if (existing) {
    isModify.value      = true
    existingAgendaId    = existing.id
    const p             = existing.payload
    targetStar.value    = p.targetStar   ?? ''
    fleetCount.value    = p.fleetCount   ?? 1
    period.value        = p.period       ?? 1
    notes.value         = p.notes        ?? ''
    const pc = p.proposerCode ? game.characters[p.proposerCode] : null
    if (pc) proposer.value = pc
  }

  // 보류 이력 복원
  if (!isModify.value && game._pendingOp) {
    const op = game._pendingOp
    targetStar.value    = op.targetStar  ?? ''
    fleetCount.value    = op.fleetCount  ?? 1
    period.value        = op.period      ?? 1
    notes.value         = op.notes       ?? ''
    const pc = op.proposerCode ? game.characters[op.proposerCode] : null
    if (pc) proposer.value = pc
  }
  game.clearHeldOp()

  // 발의자 기본값 = playerChar
  if (!proposer.value && game.playerChar) {
    proposer.value = game.playerChar
  }
})

// ── 행동력 체크 ───────────────────────────────────────────────────
const actionsFull = computed(() => game._opActionsUsed >= 3)

// ── 승인자 자동 결정 (APPROVAL_CHAINS military_op 체인 사용) ──────
const dmJobs = computed(() => APPROVAL_CHAINS[game.playerFaction]?.military_op ?? [])

const autoApprover = computed(() => {
  const chars = Object.values(game.characters)
  for (const jobId of dmJobs.value) {
    const found = chars.find(c => c.currentPost === jobId && c.faction === game.playerFaction && !c.isDead)
    if (found) return found
  }
  return null
})

const approverJobLabel = computed(() => {
  if (!autoApprover.value) return ''
  return JOB_MAP[autoApprover.value.currentPost]?.nameKr ?? ''
})

// 수락률: 공격=기본50 / 방어=기본70 + 발의자 INF 보정
const opType = computed(() =>
  targetStar.value && game.systems[targetStar.value]?.faction !== game.playerFaction
    ? 'attack' : 'defense'
)
const baseAcceptRate = computed(() => opType.value === 'attack' ? 50 : 70)

const approverAcceptRate = computed(() => {
  const base = baseAcceptRate.value
  const inf  = proposer.value?.statInf ?? 50
  return Math.min(90, Math.max(10, base + Math.round((inf - 50) / 5)))
})

const proposerToApproverRate = computed(() => approverAcceptRate.value)

// ── 발의자 후보 ───────────────────────────────────────────────────
function isGeneralRank(jobId) { return GENERAL_RANK_JOBS.has(jobId) }

const proposerCandidates = computed(() => {
  const pf = game.playerFaction
  const playerCode = game.playerCharCode
  const chars = Object.values(game.characters)
    .filter(c => c.faction === pf && !c.isDead && isGeneralRank(c.currentPost))
    .map(c => ({ ...c, rankLabel: JOB_MAP[c.currentPost]?.nameKr ?? '' }))
    .sort((a, b) => (b.statCmd ?? 0) - (a.statCmd ?? 0))

  // playerChar 최상단 고정
  const playerIdx = chars.findIndex(c => c.code === playerCode)
  if (playerIdx > 0) {
    const [pc] = chars.splice(playerIdx, 1)
    chars.unshift(pc)
  }
  return chars
})

function selectProposer(c) {
  if (c.code === game.playerCharCode) {
    proposer.value = c
    showProposerPicker.value = false
  } else {
    pendingProposer.value = c
    showProposerPicker.value = false
  }
}

function confirmProposer() {
  proposer.value         = pendingProposer.value
  pendingProposer.value  = null
}

// ── 작전목표 ──────────────────────────────────────────────────────
const targetLabel = computed(() => {
  if (!targetStar.value) return '—'
  const sys = game.systems[targetStar.value]
  if (!sys) return targetStar.value
  const type = sys.faction === game.playerFaction ? '방어' : '공격'
  return `${sys.name} ${type}작전`
})

const filteredTargetSystems = computed(() => {
  const q = targetQ.value.trim().toLowerCase()
  return Object.values(game.systems)
    .filter(s => s.faction !== game.playerFaction || opType.value === 'defense')
    .filter(s => !q || s.name.toLowerCase().includes(q) || (s.nameEn ?? '').toLowerCase().includes(q))
    .slice(0, 40)
})

const enemyFleets = computed(() => {
  const result = []
  Object.entries(game.fleets).forEach(([faction, fleets]) => {
    if (faction !== game.playerFaction) {
      fleets.forEach(f => result.push({ ...f, faction }))
    }
  })
  return result
})

function openTargetPicker() {
  tempTarget.value = targetStar.value
  showTargetPicker.value = true
}

function confirmTarget() {
  // 이미 승인된 작전이 있을 경우 기존 모드 유지 (이미 수정 모드로 진입함)
  if (tempTarget.value) {
    targetStar.value = tempTarget.value
  }
  showTargetPicker.value = false
}

// ── 출격함대 / 기간 ───────────────────────────────────────────────
const maxFleets = computed(() => Math.max(1, game.pFleets.length))

// ── 예산 / 보안도 ─────────────────────────────────────────────────
const opCost = computed(() => opType.value === 'attack' ? 1000 : 200)
const budgetAmount = computed(() => fleetCount.value * period.value * opCost.value)

const currencyLabel = computed(() =>
  game.playerFaction === 'REH' ? '마르크' : '디나르'
)

const securityPct = computed(() => {
  const pf  = game.playerFaction
  const chars = Object.values(game.characters)

  // A: 아국 정보 담당관 INF (TODO: 정보 담당관 직위 코드 확정 후 정밀화)
  const aChar = chars.find(c => c.faction === pf && c.currentPost?.includes('INTEL'))
  const A = aChar?.statInf ?? 0

  // B: 적국 정보 담당관 INF
  const bChar = chars.find(c => c.faction !== pf && c.currentPost?.includes('INTEL'))
  const B = bChar?.statInf ?? 0

  // C: 발의자 INF
  const C = proposer.value?.statInf ?? 0

  // D: 대리 발의자 여부
  const hasD = proposer.value && proposer.value.code !== game.playerCharCode

  const base = opType.value === 'attack'
    ? (hasD ? 60 : 80)
    : (hasD ? 70 : 90)

  const adjust = Math.round((C - B + A) / 10)
  return Math.min(99, Math.max(1, base + adjust))
})

// ── 제출 가능 여부 ────────────────────────────────────────────────
const canSubmit = computed(() =>
  !!autoApprover.value && !!targetStar.value && fleetCount.value >= 1
)

// ── 액션 ──────────────────────────────────────────────────────────
function currentFormData() {
  return {
    targetStar:   targetStar.value,
    fleetCount:   fleetCount.value,
    period:       period.value,
    notes:        notes.value,
    proposerCode: proposer.value?.code ?? null,
  }
}

function doClose() {
  game.clearHeldOp()
  emit('close')
}

function doHold() {
  game.holdOp(currentFormData())
  emit('close')
}

function doSubmit() {
  if (!canSubmit.value) return

  // 수정 모드: 기존 의안 취소
  if (isModify.value && existingAgendaId) {
    game.cancelAgenda(existingAgendaId)
  }

  const sys = game.systems[targetStar.value]
  const agendaId = game.registerAgenda('op_propose', {
    title:         targetLabel.value,
    opType:        opType.value,
    targetStar:    targetStar.value,
    targetName:    sys?.name ?? '',
    fleetCount:    fleetCount.value,
    period:        period.value,
    budget:        budgetAmount.value,
    securityPct:   securityPct.value,
    notes:         notes.value,
    proposerCode:  proposer.value?.code ?? null,
    approverCode:  autoApprover.value?.code ?? null,
    acceptRate:    approverAcceptRate.value,
  })

  const slotLabel = `${isModify.value ? '수정 ' : ''}작전 발의`
  game.useActionSlot(slotLabel, agendaId)
  emit('close')
}
</script>

<style scoped>
.op-modal {
  min-width: min(94vw, 500px);
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0;
}

/* 헤더 */
.op-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--bd);
  margin-bottom: 4px;
}
.op-title { font-size: 15px; letter-spacing: 1px; flex: 1; }
.op-modify-tag { font-size: 11px; color: var(--t2); margin-left: 6px; }
.op-close {
  background: none; border: none; color: var(--td); font-size: 16px;
  cursor: pointer; padding: 2px 6px; border-radius: var(--r);
  transition: color .15s;
}
.op-close:hover { color: var(--t1); }

/* 행동력 소진 */
.op-alert {
  display: flex; flex-direction: column; align-items: center;
  gap: 8px; padding: 24px 0; text-align: center;
}

/* 필드 */
.op-fields { display: flex; flex-direction: column; gap: 0; }
.op-row {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid rgba(30,45,68,.6);
}
.op-row.info { opacity: .7; }
.op-row.notes-row { align-items: flex-start; }
.op-lbl {
  font-size: 11px; min-width: 68px; flex-shrink: 0;
  text-align: right; letter-spacing: .3px; line-height: 1.6;
  white-space: nowrap;
}
.op-val { flex: 1; font-size: 13px; }
.op-divider { height: 1px; background: var(--bd); margin: 2px 0; }

/* 힌트 버튼 */
.hint-q {
  display: inline-block;
  width: 13px; height: 13px; line-height: 13px;
  text-align: center; font-size: 9px;
  border: 1px solid var(--bd); border-radius: 50%;
  cursor: pointer; margin-left: 3px; opacity: .6;
  user-select: none; -webkit-user-select: none;
}
.hint-q:hover { opacity: 1; border-color: var(--tg); color: var(--tg); }

/* 인물 카드 */
.op-char-card {
  flex: 1; display: flex; align-items: center; gap: 8px;
  padding: 6px 10px;
  background: var(--bg4); border: 1px solid var(--bd);
  border-radius: var(--r);
  min-height: 38px;
}
.op-char-card.empty { opacity: .5; }
.char-avatar {
  width: 28px; height: 28px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; font-weight: bold;
  background: rgba(212,170,96,.12);
  border: 1px solid rgba(212,170,96,.3);
  flex-shrink: 0;
}
.char-avatar.sm { width: 22px; height: 22px; font-size: 11px; }
.char-info { flex: 1; display: flex; flex-direction: column; gap: 1px; }
.char-nick { font-size: 12px; }
.char-job { font-size: 9px; }
.char-rate { font-size: 12px; flex-shrink: 0; }

/* 버튼 (소형) */
.btn-sm {
  flex-shrink: 0;
  padding: 5px 10px; font-size: 11px;
  background: var(--bg4); border: 1px solid var(--bd);
  border-radius: var(--r); color: var(--t2);
  cursor: pointer; font-family: var(--font-mono);
  transition: all .15s;
}
.btn-sm:hover { border-color: var(--tg); color: var(--tg); }

/* 슬라이더 */
.slider-wrap { flex: 1; display: flex; align-items: center; gap: 8px; }
.op-slider { flex: 1; accent-color: var(--tg); }
.op-num {
  width: 52px; padding: 4px 6px; font-size: 12px;
  background: var(--bg4); border: 1px solid var(--bd);
  border-radius: 4px; color: var(--t1); font-family: var(--font-mono);
  text-align: center; outline: none;
}
.op-num:focus { border-color: var(--tg); }

/* 보안도 바 */
.security-bar-wrap { display: flex; align-items: center; gap: 8px; flex: 1; }
.security-bar {
  flex: 1; height: 6px; background: var(--bg4);
  border-radius: 3px; overflow: hidden;
}
.security-fill { height: 100%; border-radius: 3px; transition: width .4s; }
.fill-ok  { background: var(--tg); }
.fill-mid { background: #a0a060; }
.fill-bad { background: #c0443a; }

/* 특이사항 */
.op-notes {
  flex: 1; padding: 7px 10px; font-size: 12px;
  background: var(--bg4); border: 1px solid var(--bd);
  border-radius: var(--r); color: var(--t1); font-family: var(--font-sans);
  resize: vertical; outline: none; line-height: 1.5;
}
.op-notes:focus { border-color: var(--tg); }

/* 행동력 */
.op-action-dots {
  display: flex; align-items: center; gap: 6px;
  padding: 10px 0 6px;
}
.action-dot {
  width: 10px; height: 10px; border-radius: 50%;
  border: 1px solid var(--bd);
}
.action-dot.free { background: rgba(212,170,96,.3); border-color: var(--tg); }
.action-dot.used { background: var(--bg4); opacity: .35; }

/* 내부 팝업 오버레이 */
.inner-overlay {
  position: fixed; inset: 0; z-index: 3000;
  background: rgba(0,0,0,.7);
  display: flex; align-items: center; justify-content: center;
}
.inner-popup {
  background: var(--bg2); border: 1px solid var(--bdg);
  border-radius: var(--r); box-shadow: 0 16px 48px rgba(0,0,0,.8);
  width: min(90vw, 420px); max-height: 80vh;
  display: flex; flex-direction: column; overflow: hidden;
}
.inner-popup.compact { width: min(80vw, 340px); padding: 20px; }
.target-popup { width: min(90vw, 460px); }
.popup-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 16px; border-bottom: 1px solid var(--bd);
}
.popup-list { flex: 1; overflow-y: auto; max-height: 45vh; }
.picker-row {
  width: 100%; display: flex; align-items: center; gap: 10px;
  padding: 10px 14px; background: none; border: none;
  border-bottom: 1px solid var(--bd); cursor: pointer;
  font-family: var(--font-sans); text-align: left; transition: background .12s;
}
.picker-row:last-child { border-bottom: none; }
.picker-row:hover { background: rgba(255,255,255,.04); }
.picker-row.sel { background: rgba(212,170,96,.07); }
.picker-row.top { border-left: 2px solid var(--tg); }
.picker-info { flex: 1; display: flex; flex-direction: column; gap: 2px; }
.picker-stats { display: flex; gap: 10px; }

/* 목표 팝업 탭 */
.target-tabs {
  display: flex; gap: 0;
  border-bottom: 1px solid var(--bd);
}
.target-tab-item {
  flex: 1; text-align: center;
}
.target-tab-item input { display: none; }
.target-tab-item span {
  display: block; padding: 10px 8px; font-size: 12px;
  cursor: pointer; color: var(--t2);
  transition: all .15s;
}
.target-tab-item span.on {
  color: var(--tg);
  border-bottom: 2px solid var(--tg);
}
.target-content { flex: 1; overflow: hidden; display: flex; flex-direction: column; }
.target-search { padding: 10px 14px 4px; }
.op-search {
  width: 100%; padding: 7px 10px; font-size: 12px;
  background: var(--bg4); border: 1px solid var(--bd);
  border-radius: var(--r); color: var(--t1); font-family: var(--font-sans);
  outline: none;
}
.op-search:focus { border-color: var(--tg); }

/* 힌트 오버레이 */
.hint-overlay {
  position: fixed; inset: 0; z-index: 4000;
  background: rgba(0,0,0,.75);
  display: flex; align-items: center; justify-content: center;
}
.hint-box {
  background: var(--bg2); border: 1px solid var(--bdg);
  border-radius: var(--r); padding: 24px 28px;
  width: min(88vw, 380px); text-align: center;
  box-shadow: 0 16px 48px rgba(0,0,0,.8);
}
.hint-text { font-size: 13px; line-height: 1.8; color: var(--t1); }

/* fc-색상 class (avatar) */
.fc-REH { color: var(--REH); border-color: rgba(192,57,43,.4); background: rgba(192,57,43,.1); }
.fc-FPA { color: var(--FPA); border-color: rgba(41,128,185,.4); background: rgba(41,128,185,.1); }
.fc-PZN { color: var(--PZN); border-color: rgba(39,174,96,.4);  background: rgba(39,174,96,.1);  }
</style>
