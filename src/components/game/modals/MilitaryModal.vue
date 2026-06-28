<template>
  <div class="modal-box mil-modal">
    <div class="modal-title">⚔️ 군사 관리</div>

    <!-- 탭 -->
    <div class="mil-tabs">
      <button v-for="t in TABS" :key="t.id"
              class="mil-tab" :class="{ on: tab===t.id }"
              @click="tab=t.id">
        {{ t.icon }} {{ t.label }}
      </button>
    </div>

    <!-- ── 함대 편성 ── -->
    <div v-if="tab==='form'" class="tab-content">
      <div class="dialog-box">
        <div class="dlg-spk mono dim">{{ factionLabel }} → 수장</div>
        <div class="dlg-txt serif">함대를 새로이 편성하고자 합니다. 이름과 규모를 결정하여 주십시오.</div>
      </div>
      <div class="form-fields">
        <div class="ff-row">
          <span class="dim ff-lbl">함대명</span>
          <input v-model="newFleet.name" class="mil-input" placeholder="예) 제5함대"/>
        </div>
        <div class="ff-row">
          <span class="dim ff-lbl">사령관</span>
          <select v-model="newFleet.commanderId" class="mil-select">
            <option value="">-- 선택 --</option>
            <option v-for="c in availableCommanders" :key="c.id" :value="c.id">
              {{ c.portrait }} {{ charName(c) }} (전술 {{ c.military }})
            </option>
          </select>
        </div>
        <div class="ff-row">
          <span class="dim ff-lbl">성계</span>
          <select v-model="newFleet.locationId" class="mil-select">
            <option value="">-- 선택 --</option>
            <option v-for="s in playerSystems" :key="s.id" :value="s.id">
              {{ s.name }}
            </option>
          </select>
        </div>
        <div class="ff-row">
          <span class="dim ff-lbl">규모</span>
          <div class="size-grid">
            <label v-for="(sz, key) in MILITARY.FLEET_SIZES" :key="key"
                   class="size-opt" :class="{ sel: newFleet.sizeKey===key, disabled: game.pRes.gold < sz.cost }">
              <input type="radio" :value="key" v-model="newFleet.sizeKey"
                     :disabled="game.pRes.gold < sz.cost" style="display:none"/>
              <div class="so-name serif">{{ sz.name }}</div>
              <div class="mono" style="font-size:11px">{{ sz.ships.toLocaleString() }}척</div>
              <div class="so-cost" :class="game.pRes.gold < sz.cost ? 'alert' : 'gold'">
                {{ sz.cost.toLocaleString() }}마크
              </div>
            </label>
          </div>
        </div>
      </div>
      <div class="ep-row" v-if="newFleet.sizeKey">
        <span class="dim">편성 비용</span>
        <span class="alert mono">-{{ MILITARY.FLEET_SIZES[newFleet.sizeKey]?.cost.toLocaleString() }} 마크</span>
      </div>
      <div class="ep-row" v-if="newFleet.sizeKey">
        <span class="dim">월 유지비</span>
        <span class="dim mono">{{ MILITARY.FLEET_SIZES[newFleet.sizeKey]?.upkeep }}/턴</span>
      </div>
      <div class="modal-actions">
        <button class="btn" @click="$emit('close')">취소</button>
        <button class="btn btn-red" :disabled="!canForm" @click="doForm">⚔️ 편성</button>
      </div>
    </div>

    <!-- ── 함대 재편성·해산 ── -->
    <div v-if="tab==='manage'" class="tab-content">
      <div class="fleet-manage-list">
        <div v-for="fl in game.pFleets" :key="fl.id"
             class="fm-card" :class="{ sel: selFleetId===fl.id }"
             @click="selectFleet(fl)">
          <div class="fmc-top">
            <span class="serif" style="font-size:12px">{{ fl.name }}</span>
            <span class="mono dim" style="font-size:10px">{{ stLbl(fl.status) }}</span>
          </div>
          <div style="display:flex;gap:10px;margin-top:4px">
            <span class="mono gold" style="font-size:11px">{{ fl.ships.toLocaleString() }}척</span>
            <span class="dim" style="font-size:10px">📍{{ game.systems[fl.location]?.name }}</span>
            <span class="dim" style="font-size:10px">유지비 {{ fl.upkeep }}/턴</span>
          </div>
          <div v-if="selFleetId===fl.id" class="fm-actions">
            <!-- 재편성 슬라이더 -->
            <div class="reorg-wrap">
              <div style="display:flex;justify-content:space-between;font-size:10px;margin-bottom:4px">
                <span class="dim">규모 조정</span>
                <span class="gold mono">{{ reorgShips.toLocaleString() }}척</span>
              </div>
              <input type="range" :min="1000" :max="30000" :step="1000" v-model.number="reorgShips"/>
              <div style="display:flex;justify-content:space-between;font-size:9px;color:var(--td);margin-top:2px">
                <span>1,000</span><span>30,000</span>
              </div>
              <div class="ep-row" style="margin-top:6px">
                <span class="dim" style="font-size:10px">비용</span>
                <span class="mono" style="font-size:10px"
                      :class="reorgShips > fl.ships ? 'alert' : 'gold'">
                  {{ reorgShips > fl.ships
                    ? `-${Math.floor((reorgShips-fl.ships)*0.02).toLocaleString()}`
                    : `+${Math.floor((fl.ships-reorgShips)*0.01).toLocaleString()}` }} 마크
                </span>
              </div>
            </div>
            <div style="display:flex;gap:6px;margin-top:8px">
              <button class="btn btn-gold" style="flex:1;justify-content:center;font-size:11px"
                      :disabled="reorgShips===fl.ships || fl.status!=='standby'"
                      @click="doReorg(fl)">재편성</button>
              <button class="btn btn-red" style="flex:1;justify-content:center;font-size:11px"
                      :disabled="fl.status==='deployed'"
                      @click="doDisband(fl)">해산</button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-actions">
        <button class="btn" @click="$emit('close')">닫기</button>
      </div>
    </div>

    <!-- ── 이동·철수 ── -->
    <div v-if="tab==='move'" class="tab-content">
      <div class="form-fields">
        <div class="ff-row">
          <span class="dim ff-lbl">함대</span>
          <select v-model="moveFleetId" class="mil-select">
            <option value="">-- 선택 --</option>
            <option v-for="fl in game.pFleets" :key="fl.id" :value="fl.id"
                    :disabled="fl.status !== 'standby'">
              {{ fl.name }} ({{ stLbl(fl.status) }}) — {{ game.systems[fl.location]?.name }}
            </option>
          </select>
        </div>
        <div class="ff-row">
          <span class="dim ff-lbl">목적지</span>
          <select v-model="moveTargetId" class="mil-select">
            <option value="">-- 선택 --</option>
            <option v-for="s in playerSystems" :key="s.id" :value="s.id">
              {{ s.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="modal-actions">
        <button class="btn" @click="$emit('close')">취소</button>
        <button class="btn btn-gold" :disabled="!moveFleetId || !moveTargetId" @click="doMove">
          🚀 이동
        </button>
        <button class="btn btn-red" :disabled="!moveFleetId" @click="doRetreat">
          ↩️ 철수
        </button>
      </div>
    </div>

    <!-- ── 수송 ── -->
    <div v-if="tab==='transport'" class="tab-content">
      <div class="dialog-box" style="border-color:var(--FPA)">
        <div class="dlg-spk mono dim">수송 사령부</div>
        <div class="dlg-txt serif">아군 성계 간 자원을 수송하여 전략적 위치를 강화합니다.</div>
      </div>
      <div class="form-fields">
        <div class="ff-row">
          <span class="dim ff-lbl">출발지</span>
          <select v-model="transport.fromId" class="mil-select">
            <option value="">-- 선택 --</option>
            <option v-for="s in playerSystems" :key="s.id" :value="s.id">{{ s.name }}</option>
          </select>
        </div>
        <div class="ff-row">
          <span class="dim ff-lbl">목적지</span>
          <select v-model="transport.toId" class="mil-select">
            <option value="">-- 선택 --</option>
            <option v-for="s in playerSystems" :key="s.id" :value="s.id"
                    :disabled="s.id === transport.fromId">{{ s.name }}</option>
          </select>
        </div>
        <div class="ff-row">
          <span class="dim ff-lbl">수송품</span>
          <div class="size-grid">
            <label v-for="(item, key) in MILITARY.TRANSPORT_ITEMS" :key="key"
                   class="size-opt" :class="{ sel: transport.itemType===key }"
                   @click="transport.itemType=key">
              <div style="font-size:18px">{{ item.icon }}</div>
              <div class="serif" style="font-size:11px">{{ item.name }}</div>
              <div class="dim mono" style="font-size:9px">{{ item.costPerUnit }}마크/단위</div>
            </label>
          </div>
        </div>
        <div class="ff-row">
          <span class="dim ff-lbl">수량</span>
          <input type="number" v-model.number="transport.amount"
                 class="mil-input" :min="1" :max="1000" placeholder="수량"/>
        </div>
      </div>
      <div class="ep-row" v-if="transport.itemType && transport.amount">
        <span class="dim">수송 비용</span>
        <span class="alert mono">
          -{{ (transport.amount * (MILITARY.TRANSPORT_ITEMS[transport.itemType]?.costPerUnit||0)).toLocaleString() }} 마크
        </span>
      </div>
      <div class="modal-actions">
        <button class="btn" @click="$emit('close')">취소</button>
        <button class="btn btn-blue"
                :disabled="!transport.fromId || !transport.toId || !transport.itemType || !transport.amount"
                @click="doTransport">📦 수송</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import { MILITARY } from '@/data/masterData'
import { charName } from '@/utils/charUtils'

const emit = defineEmits(['close'])
const game = useGameStore()

const tab = ref('form')
const TABS = [
  { id:'form',      icon:'⚔️',  label:'편성' },
  { id:'manage',    icon:'🔧',  label:'재편성·해산' },
  { id:'move',      icon:'🚀',  label:'이동·철수' },
  { id:'transport', icon:'📦',  label:'수송' },
]

// 편성
const newFleet = ref({ name:'', commanderId:'', sizeKey:'', locationId:'' })
// 재편성
const selFleetId = ref(null)
const reorgShips = ref(15000)
// 이동·철수
const moveFleetId  = ref(null)
const moveTargetId = ref(null)
// 수송
const transport = ref({ fromId:'', toId:'', itemType:'', amount:100 })

const factionLabel = computed(() =>
  game.playerFaction === 'REH' ? '재상' : '의장'
)

const availableCommanders = computed(() =>
  game.pChars.filter(c => !game.pFleets.some(f => f.commander === c.id))
)

const playerSystems = computed(() =>
  Object.values(game.systems).filter(s => s.faction === game.playerFaction)
)

const canForm = computed(() =>
  newFleet.value.name &&
  newFleet.value.commanderId &&
  newFleet.value.sizeKey &&
  newFleet.value.locationId &&
  game.pRes.gold >= (MILITARY.FLEET_SIZES[newFleet.value.sizeKey]?.cost || Infinity)
)

function stLbl(s) { return { standby:'대기', deployed:'출격', retreat:'철수' }[s] || s }

function selectFleet(fl) {
  if (selFleetId.value === fl.id) { selFleetId.value = null; return }
  selFleetId.value = fl.id
  reorgShips.value = fl.ships
}

function doForm() {
  const { name, commanderId, sizeKey, locationId } = newFleet.value
  if (game.formFleet(name, commanderId, sizeKey, locationId)) {
    newFleet.value = { name:'', commanderId:'', sizeKey:'', locationId:'' }
    emit('close')
  }
}

function doReorg(fl) {
  if (game.reorganizeFleet(fl.id, reorgShips.value)) selFleetId.value = null
}

function doDisband(fl) {
  if (confirm(`${fl.name}을 해산하시겠습니까?`)) {
    game.disbandFleet(fl.id)
    selFleetId.value = null
  }
}

function doMove() {
  if (game.moveFleet(moveFleetId.value, moveTargetId.value)) {
    moveFleetId.value = null; moveTargetId.value = null; emit('close')
  }
}

function doRetreat() {
  if (game.retreatFleet(moveFleetId.value)) {
    moveFleetId.value = null; emit('close')
  }
}

function doTransport() {
  const { fromId, toId, itemType, amount } = transport.value
  if (game.transportResources(fromId, toId, itemType, amount)) {
    transport.value = { fromId:'', toId:'', itemType:'', amount:100 }
    emit('close')
  }
}
</script>

<style scoped>
.mil-modal { min-width: min(92vw, 500px) }
.mil-tabs { display:flex; border:1px solid var(--bd); border-radius:var(--r); overflow:hidden; margin-bottom:14px }
.mil-tab { flex:1; padding:8px 2px; background:none; border:none; color:var(--t2); font-size:10px; cursor:pointer; transition:all .15s; font-family:var(--font-sans) }
.mil-tab.on { background:rgba(192,57,43,.12); color:var(--REH) }
.tab-content { display:flex; flex-direction:column; gap:10px }
.dialog-box { border-left:3px solid var(--tg); padding:8px 12px; background:rgba(212,170,96,.05); border-radius:0 4px 4px 0 }
.dlg-spk { font-size:9px; text-transform:uppercase; letter-spacing:1px; margin-bottom:3px }
.dlg-txt { font-size:12px; line-height:1.8; color:var(--t2) }
.form-fields { display:flex; flex-direction:column; gap:9px }
.ff-row { display:flex; align-items:flex-start; gap:10px }
.ff-lbl { font-size:11px; width:44px; flex-shrink:0; padding-top:7px }
.mil-input { flex:1; background:var(--bg4); border:1px solid var(--bd); border-radius:4px; padding:7px 10px; color:var(--t1); font-size:12px; font-family:var(--font-sans); outline:none }
.mil-input:focus { border-color:var(--tg) }
.mil-select { flex:1; background:var(--bg4); border:1px solid var(--bd); border-radius:4px; padding:7px 10px; color:var(--t1); font-size:12px; font-family:var(--font-sans); outline:none; cursor:pointer }
.mil-select:focus { border-color:var(--tg) }
.size-grid { display:flex; flex-wrap:wrap; gap:5px; flex:1 }
.size-opt { display:flex; flex-direction:column; align-items:center; gap:2px; padding:7px 8px; border:1px solid var(--bd); border-radius:var(--r); background:var(--bg4); cursor:pointer; transition:all .15s; min-width:72px; text-align:center }
.size-opt:hover:not(.disabled) { background:var(--bgh) }
.size-opt.sel { border-color:var(--REH); background:rgba(192,57,43,.12) }
.size-opt.disabled { opacity:.4; cursor:not-allowed }
.so-name { font-size:11px }
.so-cost { font-size:10px; font-family:var(--font-mono) }
.ep-row { display:flex; justify-content:space-between; align-items:center; font-size:12px; padding:4px 0 }
/* 함대 관리 */
.fleet-manage-list { display:flex; flex-direction:column; gap:7px; max-height:340px; overflow-y:auto }
.fm-card { padding:10px 12px; background:var(--bg4); border:1px solid var(--bd); border-radius:var(--r); cursor:pointer; transition:all .15s }
.fm-card:hover { background:var(--bgh) }
.fm-card.sel { border-color:var(--tg) }
.fmc-top { display:flex; justify-content:space-between; align-items:baseline }
.fm-actions { margin-top:10px; padding-top:10px; border-top:1px solid var(--bd) }
.reorg-wrap { display:flex; flex-direction:column; gap:3px }
</style>