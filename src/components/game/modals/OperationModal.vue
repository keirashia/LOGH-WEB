<template>
  <div class="modal-box op-modal">
    <div class="modal-title">⚔️ 작전 제안</div>

    <!-- 작전 유형 -->
    <div class="op-type-row">
      <button class="op-type-btn" :class="{ on: opType==='attack' }" @click="opType='attack'">
        공격작전
        <span class="mono dim" style="font-size:10px">수락률 -10%</span>
      </button>
      <button class="op-type-btn" :class="{ on: opType==='defense' }" @click="opType='defense'">
        방어작전
        <span class="mono dim" style="font-size:10px">수락률 +10%</span>
      </button>
    </div>

    <!-- 필드 목록 -->
    <div class="op-fields">

      <!-- 승인자 -->
      <div class="op-row">
        <span class="op-lbl dim">승인자</span>
        <div class="op-val approver-wrap">
          <button class="approver-btn" :class="{ unset: !selectedApprover }" @click="showPicker=!showPicker">
            <template v-if="selectedApprover">
              <span class="serif">{{ selectedApprover.nameKr }}</span>
              <span class="mono" :class="acceptanceRate>=50?'gold':'alert'" style="font-size:11px">
                {{ acceptanceRate }}%
              </span>
              <span class="dim mono" style="font-size:10px">
                {{ isDecisionMaker ? '[결정권자]' : '[중장급]' }}
              </span>
            </template>
            <span v-else class="dim">-- 선택 --</span>
            <span class="mono dim" style="margin-left:auto">›</span>
          </button>

          <!-- 승인자 선택 드롭다운 -->
          <div v-if="showPicker" class="approver-picker">
            <div class="picker-title mono dim">승인자 선택</div>
            <div v-if="!approverCandidates.length" class="dim" style="padding:10px 12px;font-size:11px">
              임명된 인물이 없습니다
            </div>
            <button
              v-for="c in approverCandidates" :key="c.code"
              class="picker-item"
              :class="{ sel: selectedApprover?.code===c.code }"
              @click="selectApprover(c)"
            >
              <div class="pi-left">
                <span class="pi-badge" :class="c.isDecisionMaker ? 'badge-dm' : 'badge-gen'">
                  {{ c.isDecisionMaker ? '결정권자' : '중장급' }}
                </span>
                <span class="serif pi-name">{{ c.nameKr }}</span>
                <span class="dim mono pi-rank" style="font-size:10px">{{ c.rankLabel }}</span>
              </div>
              <span class="mono pi-rate" :class="c.rate>=50?'gold':'alert'">{{ c.rate }}%</span>
            </button>
          </div>
        </div>
      </div>

      <!-- 대상 성계 -->
      <div class="op-row">
        <span class="op-lbl dim">대상 성계</span>
        <select v-model="targetStarId" class="op-select">
          <option value="">-- 선택 --</option>
          <option v-for="s in targetSystems" :key="s.id" :value="s.id">{{ s.name }}</option>
        </select>
      </div>

      <!-- 작전명 (자동) -->
      <div class="op-row">
        <span class="op-lbl dim">작전명</span>
        <span class="op-val serif gold">{{ operationName }}</span>
      </div>

      <!-- 출격함대 -->
      <div class="op-row">
        <span class="op-lbl dim">출격함대</span>
        <select v-model="fleetId" class="op-select">
          <option value="">-- 선택 --</option>
          <option
            v-for="fl in game.pFleets" :key="fl.id" :value="fl.id"
            :disabled="fl.status!=='standby'"
          >
            {{ fl.name }} — {{ game.systems[fl.location]?.name }}
            ({{ fl.ships.toLocaleString() }}척)
            {{ fl.status!=='standby' ? '['+stLbl(fl.status)+']' : '' }}
          </option>
        </select>
      </div>

      <!-- 작전기간 -->
      <div class="op-row">
        <span class="op-lbl dim">작전기간</span>
        <div class="op-val period-wrap">
          <input type="range" min="1" max="12" v-model.number="period" />
          <span class="mono gold" style="font-size:13px;min-width:44px;text-align:right">{{ period }}개월</span>
        </div>
      </div>

      <!-- 구분선 -->
      <div class="op-divider" />

      <!-- 작전종료 (읽기 전용) -->
      <div class="op-row info">
        <span class="op-lbl dim">작전종료</span>
        <span class="mono op-val">{{ endDateStr }}</span>
      </div>

      <!-- 작전예산 (미구현) -->
      <div class="op-row info">
        <span class="op-lbl dim">작전예산</span>
        <span class="op-val dim mono">0 <small style="font-size:9px;opacity:.5">(추후 구현)</small></span>
      </div>

      <!-- 보안도 (미구현) -->
      <div class="op-row info">
        <span class="op-lbl dim">보안도</span>
        <span class="op-val dim mono">0 <small style="font-size:9px;opacity:.5">(추후 구현)</small></span>
      </div>
    </div>

    <div class="modal-actions">
      <button class="btn" @click="$emit('close')">취소</button>
      <button class="btn btn-gold" :disabled="!canSubmit" @click="doSubmit">
        {{ isDecisionMaker ? '결정' : '제안' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import { JOB_MAP } from '@/data/base/jobs/jobData'

const emit = defineEmits(['close'])
const game = useGameStore()

// ── 세력별 군사 결정권자 직위 (JB_ 코드) ──────────────────────
const MILITARY_DM_JOBS = {
  REH: ['JB_R006', 'JB_R007', 'JB_R004', 'JB_R002'], // 사령장관, 통수본부총장, 군무상서, 재상
  FPA: ['JB_F002', 'JB_F001'],                         // 국방위원장, 최고평의회의장
  PZN: ['JB_P001'],                                     // 자치령총독
}

// 중장급 이상 계급 코드 (원수·상급대장·대장·중장)
const GENERAL_RANK_JOBS = new Set(['JB_MR001', 'JB_MR002', 'JB_MR003', 'JB_MR004'])

function isGeneralRank(jobId) {
  return GENERAL_RANK_JOBS.has(jobId)
}

// ── 상태 ────────────────────────────────────────────────────────
const opType       = ref('attack')
const targetStarId = ref('')
const fleetId      = ref('')
const period       = ref(3)
const showPicker   = ref(false)
const selectedApprover = ref(null)

// ── 대상 성계 ────────────────────────────────────────────────────
const targetSystems = computed(() => {
  const all = Object.values(game.systems)
  return opType.value === 'attack'
    ? all.filter(s => s.faction && s.faction !== game.playerFaction)
    : all.filter(s => s.faction === game.playerFaction)
})

// 작전 유형 변경 시 대상 성계 초기화
watch(opType, () => { targetStarId.value = '' })

// ── 작전명 ───────────────────────────────────────────────────────
const operationName = computed(() => {
  const sys = targetStarId.value ? game.systems[targetStarId.value] : null
  if (!sys) return '—'
  return `${sys.name} ${opType.value === 'attack' ? '공격' : '방어'}작전`
})

// ── 작전종료 날짜 ────────────────────────────────────────────────
const endDateStr = computed(() => {
  let m = game.month + period.value
  let y = game.year
  while (m > 12) { m -= 12; y++ }
  return `${y}년 ${m}월`
})

// ── 승인자 후보 목록 ─────────────────────────────────────────────
const dmJobs = computed(() => new Set(MILITARY_DM_JOBS[game.playerFaction] || []))

const approverCandidates = computed(() => {
  const chars = game.pChars.filter(c => !c.isDead)
  const baseRate = opType.value === 'attack' ? 50 : 70

  // 결정권자: DM 직위 보유자 (JB_ 코드로 비교)
  const dmList = chars.filter(c => dmJobs.value.has(c.currentPost))

  // 중장급: 결정권자가 아니면서 중장 이상 계급 보유자
  const dmCodes = new Set(dmList.map(c => c.code))
  const generals = chars.filter(c =>
    !dmCodes.has(c.code) && isGeneralRank(c.currentPost)
  )

  const toCand = (c, isDm) => ({
    ...c,
    isDecisionMaker: isDm,
    rankLabel: JOB_MAP[c.currentPost]?.nameKr ?? '',
    rate: Math.min(90, Math.max(10, baseRate + Math.round(((c.statCmd ?? 50) - 50) / 5))),
  })

  return [
    ...dmList.map(c => toCand(c, true)),
    ...generals.map(c => toCand(c, false)),
  ]
})

// ── 선택된 승인자 파생 ────────────────────────────────────────────
const isDecisionMaker = computed(() =>
  selectedApprover.value?.isDecisionMaker ?? false
)
const acceptanceRate = computed(() =>
  selectedApprover.value?.rate ?? 0
)

// ── 제출 가능 여부 ────────────────────────────────────────────────
const canSubmit = computed(() =>
  selectedApprover.value && targetStarId.value && fleetId.value
)

// ── 함수 ─────────────────────────────────────────────────────────
function selectApprover(c) {
  selectedApprover.value = c
  showPicker.value = false
}

function stLbl(s) {
  return { standby: '대기', deployed: '출격', retreat: '철수' }[s] || s
}

function doSubmit() {
  if (!canSubmit.value) return
  game.registerAgenda('op_propose', {
    title:         operationName.value,
    opType:        opType.value,
    targetStarId:  targetStarId.value,
    fleetId:       fleetId.value,
    period:        period.value,
    approverId:    selectedApprover.value.id,
    acceptanceRate: acceptanceRate.value,
    isDecisionMaker: isDecisionMaker.value,
  })
  emit('close')
}
</script>

<style scoped>
.op-modal { min-width: min(92vw, 480px); position: relative; }

/* 유형 토글 */
.op-type-row {
  display: flex; gap: 8px; margin-bottom: 14px;
}
.op-type-btn {
  flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px;
  padding: 10px 8px; border: 1px solid var(--bd); border-radius: var(--r);
  background: var(--bg4); color: var(--t2);
  font-family: var(--font-serif); font-size: 13px; letter-spacing: .5px;
  cursor: pointer; transition: all .15s;
}
.op-type-btn:hover { background: var(--bgh); border-color: var(--bdg); color: var(--t1); }
.op-type-btn.on { border-color: var(--tg); color: var(--tg); background: rgba(212,170,96,.08); }

/* 필드 목록 */
.op-fields { display: flex; flex-direction: column; gap: 0; }
.op-row {
  display: flex; align-items: center; gap: 10px;
  padding: 9px 0; border-bottom: 1px solid rgba(30,45,68,.6);
}
.op-row.info { opacity: .65; }
.op-lbl { font-size: 11px; width: 52px; flex-shrink: 0; text-align: right; letter-spacing: .3px; }
.op-val { flex: 1; font-size: 13px; }
.op-divider { height: 1px; background: var(--bd); margin: 6px 0; }

/* 승인자 버튼 */
.approver-wrap { position: relative; flex: 1; }
.approver-btn {
  width: 100%; display: flex; align-items: center; gap: 8px;
  padding: 7px 10px; background: var(--bg4); border: 1px solid var(--bd);
  border-radius: var(--r); color: var(--t1); font-size: 12px;
  cursor: pointer; transition: all .15s; text-align: left;
}
.approver-btn:hover { background: var(--bgh); border-color: var(--bdg); }
.approver-btn.unset { color: var(--t2); }

/* 승인자 드롭다운 */
.approver-picker {
  position: absolute; top: calc(100% + 4px); left: 0; right: 0; z-index: 10;
  background: var(--bg3); border: 1px solid var(--bdg);
  border-radius: var(--r); box-shadow: 0 8px 32px rgba(0,0,0,.7);
  overflow: hidden;
}
.picker-title {
  padding: 7px 12px; font-size: 10px; letter-spacing: 1px;
  text-transform: uppercase; border-bottom: 1px solid var(--bd);
}
.picker-item {
  width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 8px;
  padding: 9px 12px; background: none; border: none;
  border-bottom: 1px solid var(--bd); cursor: pointer; transition: background .12s;
  font-family: var(--font-sans);
}
.picker-item:last-child { border-bottom: none; }
.picker-item:hover { background: rgba(255,255,255,.04); }
.picker-item.sel { background: rgba(212,170,96,.07); }
.pi-left { display: flex; align-items: center; gap: 7px; flex: 1; min-width: 0; }
.pi-badge {
  font-size: 9px; font-family: var(--font-mono); padding: 2px 6px;
  border-radius: 3px; flex-shrink: 0; letter-spacing: .3px;
}
.badge-dm  { background: rgba(212,170,96,.15); color: var(--tg); }
.badge-gen { background: rgba(41,128,185,.12);  color: var(--FPA); }
.pi-name { font-size: 12px; white-space: nowrap; }
.pi-rank { margin-left: 2px; white-space: nowrap; }
.pi-rate { font-size: 12px; flex-shrink: 0; }

/* 셀렉트 */
.op-select {
  flex: 1; background: var(--bg4); border: 1px solid var(--bd);
  border-radius: 4px; padding: 7px 10px; color: var(--t1);
  font-size: 12px; font-family: var(--font-sans); outline: none; cursor: pointer;
}
.op-select:focus { border-color: var(--tg); }

/* 기간 슬라이더 */
.period-wrap { display: flex; align-items: center; gap: 10px; flex: 1; }
.period-wrap input[type=range] { flex: 1; }
</style>
