<template>
  <aside class="info-panel">
    <!-- 성계 선택됨 -->
    <template v-if="sys">
      <div class="ip-hd">
        <span class="ip-ico">{{ ico(sys) }}</span>
        <div>
          <div class="serif" style="font-size:15px">{{ sys.name }}</div>
          <div class="mono dim" style="font-size:9px;margin-top:2px">{{ sys.id }}</div>
        </div>
        <span class="ip-badge" :class="`bg-${sys.faction}`"
              :style="`color:${fColor(sys.faction)}`">{{ fName(sys.faction) }}</span>
      </div>
      <div class="ip-stats">
        <StatRow label="인구" :value="sys.population" :max="300" color="#3498db"/>
        <StatRow label="산업" :value="sys.industry"   :max="100" color="#f39c12"/>
        <StatRow label="방어" :value="sys.defense"    :max="100" color="#e74c3c"/>
        <StatRow label="민심" :value="sys.morale"     :max="100" color="#2ecc71"/>
        <div class="sr-row">
          <span class="dim" style="font-size:11px">세율</span>
          <span class="gold mono" style="font-size:13px">{{ sys.tax }}%</span>
        </div>
        <div v-if="sys.fortress" class="sr-row">
          <span class="dim" style="font-size:11px">요새</span>
          <span style="font-size:11px;color:#9b59b6">{{ sys.fortress }}</span>
        </div>
      </div>
      <div v-if="sys.underConstruction" class="ip-const">
        🔧
        <div>
          <div class="serif" style="font-size:11px">{{ CONSTRUCTION_TYPES[sys.underConstruction.type]?.name }} 건설 중</div>
          <div class="mono dim" style="font-size:10px">{{ sys.underConstruction.turnsLeft }}턴 후 완공</div>
        </div>
      </div>
      <div class="ip-acts">
        <template v-if="isPlayer">
          <button class="btn btn-gold" style="width:100%;justify-content:center"
                  @click="game.openModal('tax',{systemId:sys.id})">💰 세율 변경</button>
          <button class="btn" style="width:100%;justify-content:center"
                  :disabled="!!sys.underConstruction"
                  @click="game.openModal('build',{systemId:sys.id})">🔧 건설</button>
        </template>
        <button v-if="isEnemy" class="btn btn-red" style="width:100%;justify-content:center"
                @click="game.openModal('fleet',{systemId:sys.id})">⚔️ 공격</button>
      </div>
    </template>

    <!-- 함대 선택됨 -->
    <template v-else-if="fleet">
      <div class="ip-hd">
        <span class="ip-ico">🚀</span>
        <div>
          <div class="serif" style="font-size:15px">{{ fleet.name }}</div>
          <div class="mono dim" style="font-size:9px;margin-top:2px">{{ fleet.id }}</div>
        </div>
      </div>
      <div class="ip-stats">
        <div class="sr-row"><span class="dim">함선 수</span><span class="gold mono">{{ fleet.ships.toLocaleString() }}척</span></div>
        <div class="sr-row"><span class="dim">위치</span><span style="font-size:11px">{{ game.systems[fleet.location]?.name||fleet.location }}</span></div>
        <div class="sr-row"><span class="dim">상태</span><span :class="stCls(fleet.status)">{{ stLbl(fleet.status) }}</span></div>
      </div>
      <div v-if="cmd" class="cmd-card">
        <span style="font-size:28px">{{ cmd.portrait }}</span>
        <div>
          <div class="serif" style="font-size:12px">{{ cmd.name }}</div>
          <div class="dim" style="font-size:10px">{{ cmd.rank }}</div>
          <div class="cmd-st mono">
            <span class="gold">전술 {{ cmd.military }}</span>
            <span class="dim">정치 {{ cmd.politics }}</span>
          </div>
        </div>
      </div>
      <div class="ip-acts" v-if="isPlayerFleet">
        <button class="btn btn-red" style="width:100%;justify-content:center"
                @click="game.openModal('fleet',{fleetId:fleet.id})">⚔️ 출격 명령</button>
      </div>
    </template>

    <!-- 미선택 -->
    <template v-else>
      <div class="ip-empty">
        <span class="dim serif">성계나 함대를<br>클릭하세요</span>
      </div>
    </template>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import { FACTIONS, CHARACTERS, CONSTRUCTION_TYPES } from '@/data/masterData'
import StatRow from '@/components/ui/StatRow.vue'

const game = useGameStore()
const sys   = computed(() => game.selSysObj)
const fleet = computed(() => game.selFleetObj)
const cmd   = computed(() => fleet.value ? CHARACTERS[fleet.value.commander] : null)

const isPlayer     = computed(() => sys.value?.faction === game.playerFaction)
const isEnemy      = computed(() => sys.value?.faction && sys.value.faction !== game.playerFaction && sys.value.faction !== 'PZN')
const isPlayerFleet= computed(() => game.pFleets.some(f => f.id === game.selectedFleet))

function fName(fid) { return FACTIONS[fid]?.name || '중립' }
function fColor(fid){ return FACTIONS[fid]?.color || '#555' }
function ico(s) {
  if (!s) return '🌟'
  if (s.type==='capital') return '🏛'
  if (s.type==='fortress') return '🏰'
  if (s.isGateway) return '🌀'
  if (s.type==='contested') return '⚡'
  return '🌟'
}
function stLbl(s){ return {standby:'대기',deployed:'출격',retreat:'철수'}[s]||s }
function stCls(s){ return {standby:'dim',deployed:'alert',retreat:'gold'}[s] }
</script>

<style scoped>
.info-panel{width:200px;flex-shrink:0;display:flex;flex-direction:column;gap:12px;padding:14px;overflow-y:auto;border-left:1px solid var(--bd);background:var(--bg3)}
.ip-hd{display:flex;align-items:flex-start;gap:9px}
.ip-ico{font-size:26px;line-height:1;flex-shrink:0}
.ip-badge{font-size:9px;padding:2px 7px;border-radius:3px;margin-left:auto;font-family:var(--font-mono)}
.ip-stats{display:flex;flex-direction:column}
.sr-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:5px;font-size:11px}
.ip-const{display:flex;align-items:center;gap:8px;padding:8px;background:rgba(212,170,96,.08);border:1px solid rgba(212,170,96,.2);border-radius:var(--r);font-size:22px}
.ip-acts{display:flex;flex-direction:column;gap:7px;margin-top:auto}
.cmd-card{display:flex;gap:9px;align-items:flex-start;padding:9px;background:var(--bg4);border-radius:var(--r)}
.cmd-st{display:flex;gap:9px;margin-top:4px;font-size:10px}
.ip-empty{flex:1;display:flex;align-items:center;justify-content:center;text-align:center;line-height:2;font-size:14px}
</style>