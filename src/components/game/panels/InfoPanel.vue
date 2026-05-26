<template>
  <aside class="info-panel">

    <!-- ── 성계 선택 ──────────────────────────────────────────── -->
    <template v-if="sys">
      <div class="ip-hd">
        <span class="ip-ico">{{ ico(sys) }}</span>
        <div class="ip-hd-info">
          <div class="serif ip-name">{{ sys.name }}</div>
          <div class="mono dim" style="font-size:9px">{{ sys.id }}</div>
        </div>
        <span class="ip-badge"
              :style="sys.faction
                ? `color:${fColor(sys.faction)};border-color:${fColor(sys.faction)}55`
                : 'color:#666;border-color:#444'">
          {{ fName(sys.faction) }}
        </span>
      </div>

      <div class="ip-tabs">
        <button v-for="t in SYS_TABS" :key="t.id"
                class="ip-tab" :class="{ on: sysTab===t.id }"
                @click="setTab(t.id)">{{ t.label }}</button>
      </div>

      <div class="ip-body">

        <!-- 수치 탭 -->
        <template v-if="sysTab==='stats'">
          <div class="stat-hdr" @click="showSupport=!showSupport">
            <span class="dim">👤 인구</span>
            <span class="gold mono">{{ sys.population }}k
              <span class="dim" style="font-size:9px">{{ showSupport?'▲':'▼' }}</span>
            </span>
          </div>
          <div v-if="showSupport" class="support-box">
            <div v-for="s in supportBreakdown" :key="s.fid" class="sup-row">
              <span class="sup-label" :style="`color:${fColor(s.fid)}`">{{ fName(s.fid) }}</span>
              <div class="sup-track">
                <div class="sup-fill" :style="`width:${s.pct}%;background:${fColor(s.fid)}`"/>
              </div>
              <span class="mono dim" style="font-size:9px;min-width:26px;text-align:right">{{ s.count }}k</span>
            </div>
          </div>

          <StatRow label="산업" :value="sys.industry"  :max="100" color="#f39c12"/>
          <StatRow label="방어" :value="sys.defense"   :max="100" color="#e74c3c"/>
          <StatRow label="민심" :value="sys.morale"    :max="100" color="#2ecc71"/>
          <div class="sr-row">
            <span class="dim" style="font-size:11px">세율</span>
            <span class="gold mono" style="font-size:13px">{{ sys.tax }}%</span>
          </div>
          <div v-if="sys.fortress" class="sr-row">
            <span class="dim" style="font-size:11px">요새</span>
            <span style="font-size:11px;color:#9b59b6">{{ sys.fortress }}</span>
          </div>
          <div v-if="sys.underConstruction" class="ip-const">
            🔧
            <div>
              <div class="serif" style="font-size:11px">{{ CONSTRUCTION_TYPES[sys.underConstruction.type]?.name }} 건설 중</div>
              <div class="mono dim" style="font-size:10px">{{ sys.underConstruction.turnsLeft }}턴 후 완공</div>
            </div>
          </div>
          <p class="ip-desc dim">{{ sys.desc }}</p>
        </template>

        <!-- 행성 탭 -->
        <template v-else-if="sysTab==='planets'">
          <template v-if="selPlanet">
            <button class="back-btn" @click="selPlanet=null">← 목록</button>
            <div class="item-detail">
              <div class="serif item-title">
                {{ selPlanet.main ? '⭐' : '🪐' }} {{ selPlanet.nameKr || '(무명)' }}
              </div>
              <div class="sr-row">
                <span class="dim">코드</span>
                <span class="mono dim" style="font-size:10px">{{ selPlanet.code }}</span>
              </div>
              <div v-if="selPlanet.type" class="sr-row">
                <span class="dim">유형</span>
                <span style="font-size:11px">{{ selPlanet.type }}</span>
              </div>
              <div v-if="selPlanet.fortress" class="sr-row">
                <span class="dim">요새</span>
                <span style="font-size:11px;color:#9b59b6">{{ selPlanet.fortress }}</span>
              </div>
              <div class="sr-row">
                <span class="dim">대표 행성</span>
                <span style="font-size:11px">{{ selPlanet.main ? 'Y' : 'N' }}</span>
              </div>
              <div v-if="selPlanet.nameEn" class="sr-row">
                <span class="dim">영문명</span>
                <span class="mono" style="font-size:10px">{{ selPlanet.nameEn }}</span>
              </div>
            </div>
          </template>
          <template v-else>
            <div v-if="!sysPlanets.length" class="empty-msg dim">행성 데이터 없음</div>
            <button v-for="p in sysPlanets" :key="p.code"
                    class="list-item" @click="selPlanet=p">
              <span class="li-ico">{{ p.main ? '⭐' : '🪐' }}</span>
              <div class="li-text">
                <div style="font-size:12px">{{ p.nameKr || '(무명)' }}</div>
                <div class="mono dim" style="font-size:9px">{{ p.code }}</div>
              </div>
              <span v-if="p.fortress" class="li-tag">요새</span>
            </button>
          </template>
        </template>

        <!-- 항로 탭 -->
        <template v-else-if="sysTab==='lanes'">
          <template v-if="selLane">
            <button class="back-btn" @click="selLane=null">← 목록</button>
            <div class="item-detail">
              <div class="serif item-title">
                {{ laneTypeIco(selLane.type) }} {{ game.systems[selLane.other]?.name || selLane.other }}
              </div>
              <div class="sr-row">
                <span class="dim">항로 ID</span>
                <span class="mono dim" style="font-size:10px">{{ selLane.id }}</span>
              </div>
              <div class="sr-row">
                <span class="dim">유형</span>
                <span style="font-size:11px">{{ laneTypeName(selLane.type) }}</span>
              </div>
              <div class="sr-row">
                <span class="dim">이동 소요</span>
                <span class="gold mono">{{ selLane.period }}턴</span>
              </div>
              <StatRow label="안정도" :value="selLane.stability" :max="100" color="#3498db"/>
            </div>
          </template>
          <template v-else>
            <div v-if="!sysLanes.length" class="empty-msg dim">연결된 항로 없음</div>
            <button v-for="l in sysLanes" :key="l.id"
                    class="list-item" @click="selLane=l">
              <span class="li-ico">{{ laneTypeIco(l.type) }}</span>
              <div class="li-text">
                <div style="font-size:12px">{{ game.systems[l.other]?.name || l.other }}</div>
                <div class="mono dim" style="font-size:9px">{{ l.period }}턴 · 안정 {{ l.stability }}</div>
              </div>
            </button>
          </template>
        </template>

      </div><!-- ip-body -->

      <div class="ip-acts">
        <button class="btn" style="width:100%;justify-content:center" @click="onDetailView">
          🔭 상세보기
        </button>
        <template v-if="isPlayer">
          <button class="btn btn-gold" style="width:100%;justify-content:center"
                  @click="game.openModal('tax',{systemId:sys.id})">💰 세율 변경</button>
          <button class="btn" style="width:100%;justify-content:center"
                  :disabled="!!sys.underConstruction"
                  @click="game.openModal('build',{systemId:sys.id})">🔧 건설</button>
        </template>
        <button v-if="isEnemy" class="btn btn-red" style="width:100%;justify-content:center"
                @click="game.openModal('fleet',{systemId:sys.id})">⚔️ 공격</button>
        <button class="btn" style="width:100%;justify-content:center"
                @click="game.addLog(`[제안] ${sys.name} 제안 기능 — 미구현`)">📋 제안</button>
      </div>
    </template>

    <!-- ── 함대 선택 ──────────────────────────────────────────── -->
    <template v-else-if="fleet">
      <div class="ip-hd">
        <span class="ip-ico">🚀</span>
        <div>
          <div class="serif" style="font-size:15px">{{ fleet.name }}</div>
          <div class="mono dim" style="font-size:9px;margin-top:2px">{{ fleet.id }}</div>
        </div>
      </div>
      <div class="ip-body">
        <div class="sr-row"><span class="dim">함선 수</span><span class="gold mono">{{ fleet.ships.toLocaleString() }}척</span></div>
        <div class="sr-row"><span class="dim">위치</span><span style="font-size:11px">{{ game.systems[fleet.location]?.name || fleet.location }}</span></div>
        <div class="sr-row"><span class="dim">상태</span><span :class="stCls(fleet.status)">{{ stLbl(fleet.status) }}</span></div>
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
      </div>
      <div v-if="isPlayerFleet" class="ip-acts">
        <button class="btn btn-red" style="width:100%;justify-content:center"
                @click="game.openModal('fleet',{fleetId:fleet.id})">⚔️ 출격 명령</button>
      </div>
    </template>

    <!-- ── 미선택 ──────────────────────────────────────────────── -->
    <template v-else>
      <div class="ip-empty">
        <span class="dim serif">성계나 함대를<br>클릭하세요</span>
      </div>
    </template>

  </aside>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import { FACTIONS, CHARACTERS, CONSTRUCTION_TYPES } from '@/data/masterData'
import { PLANETS } from '@/data/stars/planetsData.js'
import { LANES as RAW_LANES } from '@/data/stars/lane.js'
import StatRow from '@/components/ui/StatRow.vue'

const game  = useGameStore()
const sys   = computed(() => game.selSysObj)
const fleet = computed(() => game.selFleetObj)
const cmd   = computed(() => fleet.value ? CHARACTERS[fleet.value.commander] : null)

const isPlayer      = computed(() => sys.value?.faction === game.playerFaction)
const isEnemy       = computed(() => sys.value?.faction && sys.value.faction !== game.playerFaction && sys.value.faction !== 'PZN')
const isPlayerFleet = computed(() => game.pFleets.some(f => f.id === game.selectedFleet))

// ── 탭 상태 ─────────────────────────────────────────────────────
const SYS_TABS = [
  { id:'stats',   label:'수치' },
  { id:'planets', label:'행성' },
  { id:'lanes',   label:'항로' },
]
const sysTab      = ref('stats')
const selPlanet   = ref(null)
const selLane     = ref(null)
const showSupport = ref(false)

watch(() => game.selectedSystem, () => {
  sysTab.value      = 'stats'
  selPlanet.value   = null
  selLane.value     = null
  showSupport.value = false
})

function setTab(id) {
  sysTab.value    = id
  selPlanet.value = null
  selLane.value   = null
}

// ── 파생 데이터 ──────────────────────────────────────────────────
const sysPlanets = computed(() =>
  PLANETS.filter(p => p.starCode === sys.value?.id)
)

const sysLanes = computed(() => {
  if (!sys.value) return []
  return RAW_LANES
    .filter(l => l.stars.includes(sys.value.id))
    .map(l => ({
      ...l,
      other: l.stars[0] === sys.value.id ? l.stars[1] : l.stars[0],
    }))
})

const supportBreakdown = computed(() => {
  if (!sys.value) return []
  const pop    = sys.value.population
  const fac    = sys.value.faction
  const morale = sys.value.morale ?? 60
  const all    = ['REH', 'FPA', 'PZN']

  if (fac) {
    const dominant = Math.round(pop * morale / 100)
    const rest     = pop - dominant
    const others   = all.filter(f => f !== fac)
    const result   = [{ fid: fac, count: dominant, pct: Math.round(morale) }]
    others.forEach((f, i) => {
      const count = i === 0 ? Math.round(rest * 0.6) : Math.round(rest * 0.4)
      if (count > 0) result.push({ fid: f, count, pct: Math.round(count / pop * 100) })
    })
    return result
  }
  return all.map(f => ({ fid: f, count: Math.round(pop / 3), pct: 33 }))
})

// ── 헬퍼 ─────────────────────────────────────────────────────────
function fName(fid)  { return FACTIONS[fid]?.name || '중립' }
function fColor(fid) { return FACTIONS[fid]?.color || '#555' }
function ico(s) {
  if (!s) return '🌟'
  if (s.type === 'capital')   return '🏛'
  if (s.type === 'fortress')  return '🏰'
  if (s.type === 'contested') return '⚡'
  if (s.type === 'noble')     return '👑'
  return '🌟'
}
function stLbl(s) { return { standby:'대기', deployed:'출격', retreat:'철수' }[s] || s }
function stCls(s) { return { standby:'dim', deployed:'alert', retreat:'gold' }[s] }
function laneTypeIco(t)  { return { corridor:'🌀', phezzan:'💎', normal:'—' }[t] || '—' }
function laneTypeName(t) {
  return { corridor:'이젤론 회랑', phezzan:'페잔 회랑', normal:'일반 항로' }[t] || t
}
function onDetailView() {
  game.addLog(`[상세] ${sys.value?.name} 성계 세부 맵 — 미구현`)
}
</script>

<style scoped>
.info-panel {
  width: 200px; flex-shrink: 0;
  display: flex; flex-direction: column;
  border-left: 1px solid var(--bd);
  background: var(--bg3);
  overflow: hidden;
}

/* ── 헤더 ── */
.ip-hd {
  display: flex; align-items: flex-start; gap: 8px;
  padding: 12px 12px 0; flex-shrink: 0;
}
.ip-ico { font-size: 24px; line-height: 1; flex-shrink: 0; }
.ip-hd-info { flex: 1; min-width: 0; }
.ip-name { font-size: 14px; line-height: 1.3; }
.ip-badge {
  font-size: 9px; padding: 2px 5px;
  border-radius: 3px; border: 1px solid;
  font-family: var(--font-mono); white-space: nowrap; flex-shrink: 0;
}

/* ── 탭 바 ── */
.ip-tabs {
  display: flex; border-bottom: 1px solid var(--bd);
  margin-top: 10px; flex-shrink: 0;
}
.ip-tab {
  flex: 1; padding: 6px 2px; background: none; border: none;
  color: var(--t2); font-size: 11px; cursor: pointer;
  border-bottom: 2px solid transparent; transition: all .15s;
}
.ip-tab.on { color: var(--tg); border-bottom-color: var(--tg); }

/* ── 스크롤 바디 ── */
.ip-body { flex: 1; overflow-y: auto; padding: 10px 12px; }

/* ── 수치 탭 ── */
.stat-hdr {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 5px; font-size: 11px;
  padding: 3px 0; cursor: pointer;
}
.stat-hdr:hover { opacity: .8; }
.sr-row {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 5px; font-size: 11px;
}

.support-box {
  background: var(--bg4); border-radius: var(--r);
  padding: 8px; margin-bottom: 8px;
}
.sup-row { display: flex; align-items: center; gap: 5px; margin-bottom: 5px; }
.sup-row:last-child { margin-bottom: 0; }
.sup-label { font-size: 9px; min-width: 50px; font-family: var(--font-mono); }
.sup-track { flex: 1; height: 4px; background: var(--bg3); border-radius: 2px; overflow: hidden; }
.sup-fill  { height: 100%; border-radius: 2px; }

.ip-const {
  display: flex; align-items: center; gap: 8px;
  padding: 8px; margin-top: 6px;
  background: rgba(212,170,96,.08); border: 1px solid rgba(212,170,96,.2);
  border-radius: var(--r); font-size: 22px;
}
.ip-desc {
  font-size: 10px; line-height: 1.6; margin-top: 8px;
  padding-top: 8px; border-top: 1px solid var(--bd);
}

/* ── 행성/항로 탭 공통 ── */
.back-btn {
  background: none; border: none; color: var(--t2); font-size: 11px;
  cursor: pointer; padding: 2px 0; margin-bottom: 8px; display: block;
}
.back-btn:hover { color: var(--tg); }

.item-detail { padding: 2px 0; }
.item-title { font-size: 13px; margin-bottom: 10px; font-family: var(--font-serif); }

.list-item {
  display: flex; align-items: center; gap: 8px;
  width: 100%; background: var(--bg4); border: 1px solid var(--bd);
  border-radius: var(--r); padding: 8px; margin-bottom: 5px;
  cursor: pointer; text-align: left; color: var(--t1);
  transition: all .15s;
}
.list-item:hover { background: var(--bgh); border-color: var(--bdg); }
.li-ico { font-size: 15px; flex-shrink: 0; }
.li-text { flex: 1; min-width: 0; }
.li-tag {
  font-size: 9px; color: #9b59b6;
  border: 1px solid #9b59b644; border-radius: 2px;
  padding: 1px 4px; flex-shrink: 0;
}
.empty-msg { font-size: 11px; text-align: center; padding: 20px 0; }

/* ── 액션 버튼 ── */
.ip-acts {
  display: flex; flex-direction: column; gap: 6px;
  padding: 10px 12px; border-top: 1px solid var(--bd); flex-shrink: 0;
}

/* ── 함대 섹션 ── */
.cmd-card {
  display: flex; gap: 9px; align-items: flex-start;
  padding: 9px; margin-top: 8px;
  background: var(--bg4); border-radius: var(--r);
}
.cmd-st { display: flex; gap: 9px; margin-top: 4px; font-size: 10px; }

/* ── 빈 상태 ── */
.ip-empty {
  flex: 1; display: flex; align-items: center; justify-content: center;
  text-align: center; line-height: 2; font-size: 14px; padding: 14px;
}
</style>
