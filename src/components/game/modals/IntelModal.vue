<template>
  <div class="modal-box intel-modal">
    <div class="modal-title">🔍 정보·외교</div>

    <!-- 탭 -->
    <div class="intel-tabs">
      <button v-for="t in TABS" :key="t.id"
              class="intel-tab" :class="{ on: tab===t.id }"
              @click="tab=t.id">
        {{ t.icon }} {{ t.label }}
      </button>
    </div>

    <!-- ── 첩보 작전 ── -->
    <div v-show="tab==='spy'" class="tab-content">
      <div class="dialog-box">
        <div class="dlg-spk mono dim">정보국장</div>
        <div class="dlg-txt serif">이제부터 첩보 작전을 개시한다.</div>
      </div>
      <div class="form-fields">
        <div class="ff-row">
          <span class="dim ff-lbl">작전</span>
          <div class="op-grid">
            <label v-for="(op, key) in INTEL.OPERATIONS" :key="key"
                   class="op-item" :class="{ sel: spy.opType===key, disabled: game.pRes.gold < op.cost }"
                   @click="game.pRes.gold >= op.cost && (spy.opType=key)">
              <span style="font-size:18px">{{ op.icon }}</span>
              <div>
                <div class="serif" style="font-size:11px">{{ op.name }}</div>
                <div class="dim" style="font-size:9px">{{ op.desc }}</div>
                <div style="display:flex;gap:8px;margin-top:3px">
                  <span class="mono" :class="game.pRes.gold < op.cost ? 'alert' : 'gold'" style="font-size:9px">
                    {{ op.cost.toLocaleString() }}마크
                  </span>
                  <span class="dim mono" style="font-size:9px">성공률 {{ Math.round(op.successBase*100) }}%+</span>
                </div>
              </div>
              <span class="gold" v-if="spy.opType===key" style="margin-left:auto">✓</span>
            </label>
          </div>
        </div>
        <div class="ff-row">
          <span class="dim ff-lbl">목표</span>
          <select v-model="spy.targetId" class="intel-select">
            <option value="">-- 성계 선택 --</option>
            <option v-for="s in enemySystems" :key="s.id" :value="s.id">
              {{ s.name }} ({{ fName(s.faction) }})
            </option>
          </select>
        </div>
        <div class="ff-row">
          <span class="dim ff-lbl">담당관</span>
          <select v-model="spy.officerId" class="intel-select">
            <option value="">-- 선택 안 함 --</option>
            <option v-for="c in intelOfficers" :key="c.id" :value="c.id">
              {{ c.portrait }} {{ c.name }} (지략 {{ c.intelligence }})
            </option>
          </select>
        </div>
      </div>
      <div v-if="spy.opType && spy.targetId" class="effect-preview">
        <div class="ep-row">
          <span class="dim">예상 성공률</span>
          <span class="gold mono">{{ spySuccessRate }}%</span>
        </div>
        <div class="ep-row">
          <span class="dim">비용</span>
          <span class="alert mono">-{{ INTEL.OPERATIONS[spy.opType]?.cost.toLocaleString() }} 마크</span>
        </div>
      </div>
      <div class="modal-actions">
        <button class="btn" @click="$emit('close')">취소</button>
        <button class="btn btn-red"
                :disabled="!spy.opType || !spy.targetId"
                @click="doSpy">🔍 작전 개시</button>
      </div>
    </div>

    <!-- ── 치안 회복 ── -->
    <div v-show="tab==='security'" class="tab-content">
      <div class="dialog-box" style="border-color:var(--alliance)">
        <div class="dlg-spk mono dim">치안 담당관</div>
        <div class="dlg-txt serif">아군 성계의 민심과 방어 태세를 강화합니다.</div>
      </div>
      <div class="form-fields">
        <div class="ff-row">
          <span class="dim ff-lbl">성계</span>
          <select v-model="security.systemId" class="intel-select">
            <option value="">-- 선택 --</option>
            <option v-for="s in playerSystems" :key="s.id" :value="s.id">
              {{ s.name }} (민심 {{ game.systems[s.id]?.morale }}%)
            </option>
          </select>
        </div>
        <div class="ff-row">
          <span class="dim ff-lbl">수준</span>
          <div class="level-grid">
            <label v-for="(lvl, key) in INTEL.SECURITY_LEVELS" :key="key"
                   class="level-item" :class="{ sel: security.level===key, disabled: game.pRes.gold < lvl.cost }"
                   @click="game.pRes.gold >= lvl.cost && (security.level=key)">
              <div class="serif" style="font-size:12px">{{ lvl.name }}</div>
              <div style="display:flex;gap:8px;margin-top:4px;flex-wrap:wrap">
                <span class="mono" :class="game.pRes.gold < lvl.cost ? 'alert' : 'gold'" style="font-size:10px">
                  {{ lvl.cost.toLocaleString() }}마크
                </span>
                <span style="font-size:10px" :class="lvl.moraleEffect >= 0 ? '' : 'alert'">
                  민심 {{ lvl.moraleEffect >= 0 ? '+' : '' }}{{ lvl.moraleEffect }}
                </span>
                <span style="font-size:10px;color:#2ecc71">방어 +{{ lvl.defEffect }}</span>
              </div>
              <span class="gold" v-if="security.level===key" style="margin-top:4px">✓</span>
            </label>
          </div>
        </div>
        <div class="ff-row">
          <span class="dim ff-lbl">담당관</span>
          <select v-model="security.officerId" class="intel-select">
            <option value="">-- 선택 안 함 --</option>
            <option v-for="c in intelOfficers" :key="c.id" :value="c.id">
              {{ c.portrait }} {{ c.name }} (정치 {{ c.politics }})
            </option>
          </select>
        </div>
      </div>
      <div v-if="security.level && security.systemId" class="effect-preview">
        <div class="ep-row">
          <span class="dim">민심 변화</span>
          <span :class="secLvl?.moraleEffect >= 0 ? 'gold' : 'alert'" class="mono">
            {{ secLvl?.moraleEffect >= 0 ? '+' : '' }}{{ secLvl?.moraleEffect }}
          </span>
        </div>
        <div class="ep-row">
          <span class="dim">방어 강화</span>
          <span class="mono" style="color:#2ecc71">+{{ secLvl?.defEffect }}</span>
        </div>
        <div class="ep-row">
          <span class="dim">비용</span>
          <span class="alert mono">-{{ secLvl?.cost.toLocaleString() }} 마크</span>
        </div>
      </div>
      <div class="modal-actions">
        <button class="btn" @click="$emit('close')">취소</button>
        <button class="btn btn-blue"
                :disabled="!security.systemId || !security.level"
                @click="doSecurity">🛡️ 실행</button>
      </div>
    </div>

    <!-- ── 제안 공작 ── -->
    <div v-show="tab==='proposal'" class="tab-content">
      <div class="dialog-box" style="border-color:var(--phezzan)">
        <div class="dlg-spk mono dim">재상 / 의장</div>
        <div class="dlg-txt serif">{{ INTEL.DIALOGS.PROPOSAL.prime_suggest }}</div>
      </div>
      <div class="form-fields">
        <div class="ff-row">
          <span class="dim ff-lbl">대상</span>
          <div class="faction-grid">
            <label v-for="(f, fid) in enemyFactions" :key="fid"
                   class="faction-item" :class="{ sel: proposal.targetFaction===fid }"
                   @click="proposal.targetFaction=fid">
              <span style="font-size:20px">{{ f.flag }}</span>
              <span class="serif" style="font-size:11px">{{ f.name }}</span>
              <span class="gold" v-if="proposal.targetFaction===fid">✓</span>
            </label>
          </div>
        </div>
        <div class="ff-row">
          <span class="dim ff-lbl">내용</span>
          <div class="op-grid">
            <label v-for="(prop, key) in INTEL.PROPOSALS" :key="key"
                   class="op-item" :class="{ sel: proposal.propType===key, disabled: game.pRes.gold < prop.cost }"
                   @click="game.pRes.gold >= prop.cost && (proposal.propType=key)">
              <span style="font-size:18px">{{ prop.icon }}</span>
              <div>
                <div class="serif" style="font-size:11px">{{ prop.name }}</div>
                <div class="dim" style="font-size:9px;line-height:1.5">{{ prop.desc }}</div>
                <span class="mono" :class="game.pRes.gold < prop.cost ? 'alert' : 'gold'" style="font-size:9px">
                  {{ prop.cost.toLocaleString() }}마크
                </span>
              </div>
              <span class="gold" v-if="proposal.propType===key" style="margin-left:auto">✓</span>
            </label>
          </div>
        </div>
      </div>
      <div v-if="proposal.targetFaction && proposal.propType" class="effect-preview">
        <div class="ep-row">
          <span class="dim">대상</span>
          <span>{{ FACTIONS[proposal.targetFaction]?.name }}</span>
        </div>
        <div class="ep-row">
          <span class="dim">예상 성공률</span>
          <span class="gold mono">{{ proposal.targetFaction === 'PHEZZAN' ? '70' : '45' }}%</span>
        </div>
        <div class="ep-row">
          <span class="dim">비용</span>
          <span class="alert mono">-{{ INTEL.PROPOSALS[proposal.propType]?.cost.toLocaleString() }} 마크</span>
        </div>
      </div>
      <div class="modal-actions">
        <button class="btn" @click="$emit('close')">취소</button>
        <button class="btn btn-green"
                :disabled="!proposal.targetFaction || !proposal.propType"
                @click="doProposal">📜 공작 개시</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import { INTEL, FACTIONS } from '@/data/masterData'

const emit = defineEmits(['close'])
const game = useGameStore()

const tab = ref('spy')
const TABS = [
  { id:'spy',      icon:'🔍', label:'첩보 작전' },
  { id:'security', icon:'🛡️', label:'치안 회복' },
  { id:'proposal', icon:'📜', label:'제안 공작' },
]

const spy      = ref({ opType:'', targetId:'', officerId:'' })
const security = ref({ systemId:'', level:'', officerId:'' })
const proposal = ref({ targetFaction:'', propType:'' })

// 적 성계 목록
const enemySystems = computed(() =>
  Object.values(game.systems).filter(s => s.faction && s.faction !== game.playerFaction)
)
// 아군 성계
const playerSystems = computed(() =>
  Object.values(game.systems).filter(s => s.faction === game.playerFaction)
)
// 정보 담당 인물 (지략 상위)
const intelOfficers = computed(() =>
  game.pChars.slice().sort((a, b) => b.intelligence - a.intelligence).slice(0, 5)
)
// 적대 세력
const enemyFactions = computed(() => {
  const r = {}
  Object.entries(FACTIONS).forEach(([id, f]) => {
    if (id !== game.playerFaction) r[id] = f
  })
  return r
})

const secLvl = computed(() =>
  security.value.level ? INTEL.SECURITY_LEVELS[security.value.level] : null
)

// 첩보 성공률 계산
const spySuccessRate = computed(() => {
  if (!spy.value.opType) return 0
  const base = INTEL.OPERATIONS[spy.value.opType]?.successBase || 0
  const officer = spy.value.officerId ? game.characters[spy.value.officerId] : null
  const bonus = officer ? (officer.intelligence / 100) * 0.3 : 0
  return Math.round(Math.min(0.95, base + bonus) * 100)
})

function fName(fid) { return FACTIONS[fid]?.name || '중립' }

function doSpy() {
  if (game.launchIntelOp(spy.value.targetId, spy.value.opType, spy.value.officerId)) {
    spy.value = { opType:'', targetId:'', officerId:'' }
    emit('close')
  }
}
function doSecurity() {
  if (game.restoreSecurity(security.value.systemId, security.value.level, security.value.officerId)) {
    security.value = { systemId:'', level:'', officerId:'' }
    emit('close')
  }
}
function doProposal() {
  if (game.launchProposal(proposal.value.targetFaction, proposal.value.propType)) {
    proposal.value = { targetFaction:'', propType:'' }
    emit('close')
  }
}
</script>

<style scoped>
.intel-modal { min-width: min(92vw, 500px) }

/* 탭 */
.intel-tabs { display:flex; border:1px solid var(--bd); border-radius:var(--r); overflow:hidden; margin-bottom:14px }
.intel-tab  { flex:1; padding:8px 2px; background:none; border:none; color:var(--t2); font-size:10px; cursor:pointer; transition:all .15s; font-family:var(--font-sans) }
.intel-tab.on { background:rgba(39,174,96,.12); color:var(--phezzan) }

.tab-content { display:flex; flex-direction:column; gap:10px }

/* 대화 박스 */
.dialog-box { border-left:3px solid var(--tg); padding:8px 12px; background:rgba(212,170,96,.05); border-radius:0 4px 4px 0 }
.dlg-spk    { font-size:9px; text-transform:uppercase; letter-spacing:1px; margin-bottom:3px }
.dlg-txt    { font-size:12px; line-height:1.8; color:var(--t2) }

/* 폼 */
.form-fields { display:flex; flex-direction:column; gap:9px }
.ff-row      { display:flex; align-items:flex-start; gap:10px }
.ff-lbl      { font-size:11px; width:44px; flex-shrink:0; padding-top:7px; color:var(--t2) }
.intel-select { flex:1; background:var(--bg4); border:1px solid var(--bd); border-radius:4px; padding:7px 10px; color:var(--t1); font-size:12px; font-family:var(--font-sans); outline:none; cursor:pointer }
.intel-select:focus { border-color:var(--tg) }

/* 작전 그리드 */
.op-grid { display:flex; flex-direction:column; gap:5px; flex:1 }
.op-item { display:flex; align-items:flex-start; gap:9px; padding:8px 10px; border:1px solid var(--bd); border-radius:var(--r); background:var(--bg4); cursor:pointer; transition:all .15s }
.op-item:hover:not(.disabled) { background:var(--bgh) }
.op-item.sel     { border-color:var(--phezzan); background:rgba(39,174,96,.1) }
.op-item.disabled { opacity:.4; cursor:not-allowed }

/* 치안 수준 그리드 */
.level-grid { display:flex; gap:6px; flex:1 }
.level-item { flex:1; display:flex; flex-direction:column; padding:9px; border:1px solid var(--bd); border-radius:var(--r); background:var(--bg4); cursor:pointer; transition:all .15s; align-items:flex-start }
.level-item:hover:not(.disabled) { background:var(--bgh) }
.level-item.sel { border-color:var(--alliance); background:rgba(41,128,185,.12) }
.level-item.disabled { opacity:.4; cursor:not-allowed }

/* 세력 그리드 */
.faction-grid { display:flex; gap:6px; flex:1 }
.faction-item { flex:1; display:flex; flex-direction:column; align-items:center; gap:4px; padding:9px 6px; border:1px solid var(--bd); border-radius:var(--r); background:var(--bg4); cursor:pointer; transition:all .15s }
.faction-item:hover { background:var(--bgh) }
.faction-item.sel { border-color:var(--tg); background:rgba(212,170,96,.1) }

/* 효과 미리보기 */
.effect-preview { padding:10px 12px; background:var(--bg4); border-radius:var(--r); display:flex; flex-direction:column; gap:6px }
.ep-row { display:flex; justify-content:space-between; align-items:center; font-size:12px }
</style>