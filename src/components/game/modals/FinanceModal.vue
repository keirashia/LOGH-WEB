<template>
  <div class="modal-box finance-modal">
    <div class="modal-title">💰 국정 재정</div>

    <!-- 현황 배너 -->
    <div class="finance-status">
      <div class="fs-item">
        <span class="dim">보유 자금</span>
        <span class="gold mono" style="font-size:16px">{{ game.pRes.gold.toLocaleString() }}</span>
        <span class="dim" style="font-size:10px">마크</span>
      </div>
      <div class="fs-item" v-if="game._loanBalance > 0">
        <span class="alert">차관 잔액</span>
        <span class="alert mono" style="font-size:16px">{{ game._loanBalance.toLocaleString() }}</span>
        <span class="alert" style="font-size:10px">마크 ({{ loanRemaining }}턴 내)</span>
      </div>
      <div class="fs-item" v-if="game._levyCooldown > 0">
        <span class="dim">임시 징수</span>
        <span class="dim mono">{{ game._levyCooldown }}턴 대기</span>
      </div>
    </div>

    <!-- 탭 -->
    <div class="fin-tabs">
      <button v-for="t in TABS" :key="t.id"
              class="fin-tab" :class="{ on: tab===t.id }"
              @click="tab=t.id">
        {{ t.icon }} {{ t.label }}
      </button>
    </div>

    <!-- 임시 징수 -->
    <div v-if="tab==='levy'" class="tab-content">
      <div class="dialog-box">
        <div class="dlg-spk dim mono">{{ factionLabel }} → 수장</div>
        <div class="dlg-txt serif">{{ FINANCE.DIALOGS.EMERGENCY_LEVY[factionKey] }}</div>
      </div>
      <div class="effect-preview">
        <div class="ep-row">
          <span class="dim">예상 징수액</span>
          <span class="gold mono">+{{ levyAmount.toLocaleString() }} 마크</span>
        </div>
        <div class="ep-row">
          <span class="dim">전 성계 민심</span>
          <span class="alert mono">{{ FINANCE.LEVY_TERMS.MORALE_PENALTY }}</span>
        </div>
        <div class="ep-row">
          <span class="dim">재사용 대기</span>
          <span class="mono dim">{{ FINANCE.LEVY_TERMS.COOLDOWN_TURNS }}턴</span>
        </div>
      </div>
      <div class="modal-actions">
        <button class="btn" @click="$emit('close')">취소</button>
        <button class="btn btn-gold" :disabled="game._levyCooldown > 0" @click="doLevy">
          {{ game._levyCooldown > 0 ? `대기 중 (${game._levyCooldown}턴)` : '징수 실행' }}
        </button>
      </div>
    </div>

    <!-- 페잔 차관 -->
    <div v-if="tab==='loan'" class="tab-content">
      <div class="dialog-box" style="border-left-color:var(--PZN)">
        <div class="dlg-spk dim mono">페잔 상인</div>
        <div class="dlg-txt serif">{{ FINANCE.DIALOGS.LOAN.phezzan_offer }}</div>
      </div>

      <!-- 차관 중 상환 -->
      <div v-if="game._loanBalance > 0" class="loan-active">
        <div class="la-title alert">진행 중인 차관</div>
        <div class="ep-row">
          <span class="dim">상환액</span>
          <span class="alert mono">{{ game._loanBalance.toLocaleString() }} 마크</span>
        </div>
        <div class="ep-row">
          <span class="dim">상환 기한</span>
          <span class="mono" :class="loanRemaining <= 1 ? 'alert' : 'gold'">{{ loanRemaining }}턴 내</span>
        </div>
        <div class="modal-actions">
          <button class="btn" @click="$emit('close')">닫기</button>
          <button class="btn btn-red"
                  :disabled="game.pRes.gold < game._loanBalance"
                  @click="doRepay">
            {{ game.pRes.gold < game._loanBalance ? '자금 부족' : '즉시 상환' }}
          </button>
        </div>
      </div>

      <!-- 신규 차관 -->
      <div v-else>
        <div class="loan-slider">
          <div class="ls-header">
            <span class="dim" style="font-size:11px">차관 금액</span>
            <span class="gold mono" style="font-size:18px">{{ loanAmount.toLocaleString() }}</span>
            <span class="dim" style="font-size:10px">마크</span>
          </div>
          <input type="range"
                 :min="FINANCE.LOAN_TERMS.MIN_AMOUNT"
                 :max="FINANCE.LOAN_TERMS.MAX_AMOUNT"
                 :step="100"
                 v-model.number="loanAmount"/>
          <div style="display:flex;justify-content:space-between;font-size:10px;color:var(--t2)">
            <span>{{ FINANCE.LOAN_TERMS.MIN_AMOUNT.toLocaleString() }}</span>
            <span>{{ FINANCE.LOAN_TERMS.MAX_AMOUNT.toLocaleString() }}</span>
          </div>
        </div>
        <div class="effect-preview">
          <div class="ep-row">
            <span class="dim">수령액</span>
            <span class="gold mono">+{{ loanAmount.toLocaleString() }} 마크</span>
          </div>
          <div class="ep-row">
            <span class="dim">상환액 (이자 {{ Math.round(FINANCE.LOAN_TERMS.INTEREST_RATE*100) }}%)</span>
            <span class="alert mono">{{ totalRepay.toLocaleString() }} 마크</span>
          </div>
          <div class="ep-row">
            <span class="dim">상환 기한</span>
            <span class="mono">{{ FINANCE.LOAN_TERMS.REPAY_TURNS }}턴</span>
          </div>
        </div>
        <div class="modal-actions">
          <button class="btn" @click="$emit('close')">취소</button>
          <button class="btn btn-green" @click="doLoan">차관 수락</button>
        </div>
      </div>
    </div>

    <!-- 예산 배분 -->
    <div v-if="tab==='budget'" class="tab-content">
      <div class="dialog-box">
        <div class="dlg-spk dim mono">{{ factionLabel }}</div>
        <div class="dlg-txt serif">{{ FINANCE.DIALOGS.BUDGET[factionKey] }}</div>
      </div>
      <div class="budget-list">
        <div v-for="(item, key) in FINANCE.BUDGET_ITEMS" :key="key" class="budget-row">
          <div class="br-info">
            <span class="br-icon">{{ item.icon }}</span>
            <div>
              <div style="font-size:12px;font-family:var(--font-serif)">{{ item.name }}</div>
              <div class="dim" style="font-size:10px">{{ item.desc }}</div>
            </div>
          </div>
          <div class="br-input">
            <input type="number" class="budget-input"
                   v-model.number="budgetAlloc[key]"
                   :min="0" :max="game.pRes.gold"
                   placeholder="0"/>
            <span class="dim" style="font-size:10px">마크</span>
          </div>
        </div>
      </div>
      <div class="budget-summary">
        <div class="ep-row">
          <span class="dim">배분 총액</span>
          <span class="mono" :class="budgetTotal > game.pRes.gold ? 'alert' : 'gold'">
            {{ budgetTotal.toLocaleString() }}
          </span>
        </div>
        <div class="ep-row">
          <span class="dim">잔여 자금</span>
          <span class="mono" :class="(game.pRes.gold - budgetTotal) < 0 ? 'alert' : ''">
            {{ (game.pRes.gold - budgetTotal).toLocaleString() }}
          </span>
        </div>
      </div>
      <div class="modal-actions">
        <button class="btn" @click="$emit('close')">취소</button>
        <button class="btn btn-gold"
                :disabled="budgetTotal <= 0 || budgetTotal > game.pRes.gold"
                @click="doBudget">
          배분 실행
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import { FINANCE } from '@/data/masterData'

const emit = defineEmits(['close'])
const game = useGameStore()

const tab = ref('levy')
const loanAmount = ref(FINANCE.LOAN_TERMS.MIN_AMOUNT)
const budgetAlloc = ref({ MILITARY:0, CONSTRUCTION:0, INTELLIGENCE:0, WELFARE:0, RESERVE:0 })

const TABS = [
  { id:'levy',   icon:'💸', label:'임시 징수' },
  { id:'loan',   icon:'🏦', label:'페잔 차관' },
  { id:'budget', icon:'📊', label:'예산 배분' },
]

const factionLabel = computed(() =>
  game.playerFaction === 'REH' ? '재상' : '의장'
)
const factionKey = computed(() =>
  game.playerFaction === 'REH' ? 'empire_prime' : 'alliance_council'
)

// 예상 징수액 계산
const levyAmount = computed(() => {
  let inc = 0
  Object.values(game.systems).forEach(s => {
    if (s.faction === game.playerFaction)
      inc += Math.floor(s.population * (s.tax / 100) * (s.industry / 100) * 10)
  })
  return Math.floor(inc * FINANCE.LEVY_TERMS.RATE)
})

const loanRemaining = computed(() => {
  if (!game._loanDueTurn) return 0
  return game._loanDueTurn - game.turn
})

const totalRepay = computed(() =>
  Math.floor(loanAmount.value * (1 + FINANCE.LOAN_TERMS.INTEREST_RATE))
)

const budgetTotal = computed(() =>
  Object.values(budgetAlloc.value).reduce((s, v) => s + (Number(v) || 0), 0)
)

function doLevy()  { if (game.emergencyLevy()) emit('close') }
function doLoan()  { if (game.takeLoan(loanAmount.value)) emit('close') }
function doRepay() { if (game.repayLoan()) emit('close') }
function doBudget() {
  const a = {}
  Object.entries(budgetAlloc.value).forEach(([k,v]) => { a[k] = Number(v) || 0 })
  if (game.allocateBudget(a)) emit('close')
}
</script>

<style scoped>
.finance-modal { min-width: min(90vw, 460px) }

/* 현황 배너 */
.finance-status {
  display: flex; gap: 16px; flex-wrap: wrap;
  padding: 10px 12px; background: var(--bg4);
  border-radius: var(--r); margin-bottom: 14px;
}
.fs-item { display: flex; flex-direction: column; gap: 2px }

/* 탭 */
.fin-tabs { display: flex; border: 1px solid var(--bd); border-radius: var(--r); overflow: hidden; margin-bottom: 14px }
.fin-tab { flex: 1; padding: 8px 4px; background: none; border: none; color: var(--t2); font-size: 11px; cursor: pointer; transition: all .15s; font-family: var(--font-sans) }
.fin-tab.on { background: rgba(212,170,96,.12); color: var(--tg) }

.tab-content { display: flex; flex-direction: column; gap: 12px }

/* 대화 박스 */
.dialog-box { border-left: 3px solid var(--tg); padding: 8px 12px; background: rgba(212,170,96,.05); border-radius: 0 4px 4px 0 }
.dlg-spk { font-size: 9px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 3px }
.dlg-txt { font-size: 12px; line-height: 1.8; color: var(--t2) }

/* 효과 미리보기 */
.effect-preview { padding: 10px 12px; background: var(--bg4); border-radius: var(--r); display: flex; flex-direction: column; gap: 7px }
.ep-row { display: flex; justify-content: space-between; align-items: center; font-size: 12px }

/* 차관 */
.loan-active { display: flex; flex-direction: column; gap: 10px; padding: 12px; background: rgba(192,57,43,.08); border: 1px solid rgba(192,57,43,.25); border-radius: var(--r) }
.la-title { font-size: 12px; font-family: var(--font-serif); margin-bottom: 4px }
.loan-slider { display: flex; flex-direction: column; gap: 7px }
.ls-header { display: flex; align-items: baseline; gap: 6px }

/* 예산 배분 */
.budget-list { display: flex; flex-direction: column; gap: 8px }
.budget-row { display: flex; align-items: center; gap: 10px; padding: 9px 10px; background: var(--bg4); border-radius: var(--r) }
.br-info { display: flex; align-items: center; gap: 9px; flex: 1 }
.br-icon { font-size: 18px }
.br-input { display: flex; align-items: center; gap: 5px }
.budget-input { width: 80px; background: var(--bg3); border: 1px solid var(--bd); border-radius: 4px; padding: 5px 8px; color: var(--t1); font-size: 12px; font-family: var(--font-mono); text-align: right; outline: none }
.budget-input:focus { border-color: var(--tg) }
.budget-summary { padding: 10px 12px; background: var(--bg4); border-radius: var(--r); display: flex; flex-direction: column; gap: 6px }
</style>