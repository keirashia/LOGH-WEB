<template>
  <div class="tac-root">

    <!-- 헤더 -->
    <div class="tac-header">
      <div class="tac-title serif">전술전투</div>
      <div class="tac-info">
        <span class="turn-badge">{{ store.turn }}턴</span>
        <span :class="['phase-badge', store.phase]">
          {{ phaseLabel }}
        </span>
        <span v-if="store.context" class="battle-label">
          {{ factionLabel(store.context.attackerFaction) }} vs {{ factionLabel(defFaction) }}
        </span>
      </div>
      <button v-if="store.phase === 'player'" class="btn btn-end" @click="store.endPlayerTurn()">
        턴 종료 <span class="kbd">Space</span>
      </button>
      <div v-else-if="store.phase === 'ai'" class="ai-label">AI 행동 중…</div>
    </div>

    <div class="tac-body">

      <!-- 좌측: 유닛 정보 + 진형 선택 -->
      <div class="tac-left">
        <template v-if="store.selectedUnit">
          <div class="panel unit-panel">
            <div class="unit-name serif">{{ store.selectedUnit.name }}</div>
            <div class="unit-faction" :class="`fc-${store.selectedUnit.faction}`">
              {{ factionLabel(store.selectedUnit.faction) }}
            </div>

            <div class="stat-rows">
              <div class="stat-row">
                <span class="sl">함선</span>
                <span class="sv">{{ store.selectedUnit.ships.toLocaleString() }} / {{ store.selectedUnit.maxShips.toLocaleString() }}</span>
              </div>
              <div class="ships-bar">
                <div class="ships-fill" :style="{ width: (store.selectedUnit.ships / store.selectedUnit.maxShips * 100) + '%' }"></div>
              </div>
              <div class="stat-row">
                <span class="sl">사기</span>
                <span class="sv">{{ store.selectedUnit.morale }}</span>
              </div>
              <div class="morale-bar">
                <div class="morale-fill" :style="{ width: store.selectedUnit.morale + '%', background: moraleColor(store.selectedUnit.morale) }"></div>
              </div>
              <div class="stat-row">
                <span class="sl">상태</span>
                <span class="sv">
                  {{ store.selectedUnit.moved ? '이동 완료' : '이동 가능' }}
                  /
                  {{ store.selectedUnit.attacked ? '공격 완료' : '공격 가능' }}
                </span>
              </div>
            </div>

            <div v-if="selectedCommander" class="commander-row">
              <span class="portrait">{{ selectedCommander.portrait }}</span>
              <div class="c-info">
                <div class="c-name">{{ selectedCommander.name }}</div>
                <div class="c-rank">군사 {{ selectedCommander.military }}</div>
              </div>
            </div>

            <!-- 진형 선택 -->
            <div class="fm-title">진형 선택</div>
            <div class="fm-grid">
              <button
                v-for="(f, key) in FORMATIONS" :key="key"
                :class="['fm-btn', { active: store.selectedUnit.formation === key }]"
                :title="f.desc"
                @click="store.changeFormation(store.selectedUnit.id, key)"
              >
                <span class="fm-icon">{{ f.icon }}</span>
                <span class="fm-name">{{ f.name }}</span>
              </button>
            </div>
            <div class="fm-desc" v-if="curFm">
              {{ curFm.nameJp }} — {{ curFm.desc }}<br/>
              공격 ×{{ curFm.offMod.toFixed(1) }} &nbsp; 방어 ×{{ curFm.defMod.toFixed(1) }} &nbsp; 사거리 {{ curFm.range }} &nbsp; 속도 {{ curFm.speed }}
            </div>
          </div>
        </template>

        <template v-else>
          <div class="panel unit-panel no-sel">
            <div class="no-sel-txt">유닛을 선택하세요<br/><span class="hint">클릭으로 선택<br/>이동: 파란 칸<br/>공격: 빨간 칸</span></div>
          </div>
          <!-- 전력 현황 -->
          <div class="panel strength-panel">
            <div class="sp-title">전력 현황</div>
            <div v-for="grp in unitGroups" :key="grp.faction" class="sp-row">
              <span :class="`dot fc-${grp.faction}`">●</span>
              <span class="sp-name">{{ factionLabel(grp.faction) }}</span>
              <span class="sp-count">{{ grp.units }}비행대 / {{ grp.ships.toLocaleString() }}척</span>
            </div>
          </div>
        </template>
      </div>

      <!-- 중앙: SVG 전술 지도 -->
      <div class="tac-map-wrap">
        <svg
          :viewBox="`0 0 ${MAP_W * CS} ${MAP_H * CS}`"
          class="tac-svg"
          preserveAspectRatio="xMidYMid meet"
          @click.self="store.deselect()"
        >
          <!-- 지형 타일 -->
          <g v-for="tile in store.map.tiles" :key="`t${tile.x}-${tile.y}`">
            <rect
              :x="tile.x * CS" :y="tile.y * CS"
              :width="CS" :height="CS"
              :fill="terrainColor(tile.terrain)"
              stroke="#0d1117" stroke-width="0.5"
            />
            <!-- 소행성 텍스처 -->
            <text v-if="tile.terrain === 'ASTEROID'"
              :x="tile.x * CS + CS/2" :y="tile.y * CS + CS/2 + 5"
              font-size="20" text-anchor="middle" fill="#333" style="pointer-events:none">⬡</text>
            <!-- 성운 텍스처 -->
            <rect v-if="tile.terrain === 'NEBULA'"
              :x="tile.x * CS + 2" :y="tile.y * CS + 2"
              :width="CS - 4" :height="CS - 4"
              fill="url(#nebula-pattern)" opacity="0.4" style="pointer-events:none"/>
          </g>

          <!-- 이동 가능 하이라이트 (클릭 시 이동) -->
          <rect
            v-for="c in store.movableCells" :key="`m${c.x}-${c.y}`"
            :x="c.x * CS + 1" :y="c.y * CS + 1"
            :width="CS - 2" :height="CS - 2"
            fill="rgba(40,130,255,0.20)" stroke="#4488ff" stroke-width="1.5" rx="3"
            style="cursor:pointer"
            @click.stop="store.moveUnit(c.x, c.y)"
          />

          <!-- 공격 가능 하이라이트 -->
          <rect
            v-for="c in store.attackableCells" :key="`a${c.x}-${c.y}`"
            :x="c.x * CS + 1" :y="c.y * CS + 1"
            :width="CS - 2" :height="CS - 2"
            fill="rgba(255,60,60,0.20)" stroke="#ff4444" stroke-width="1.5" rx="3"
            style="pointer-events:none"
          />

          <!-- 유닛 -->
          <g
            v-for="u in store.units" :key="u.id"
            class="unit-g"
            @click.stop="onUnitClick(u)"
          >
            <!-- 선택 글로우 -->
            <rect v-if="store.selectedId === u.id"
              :x="u.x * CS - 1" :y="u.y * CS - 1"
              :width="CS + 2" :height="CS + 2"
              fill="none" stroke="gold" stroke-width="2.5" rx="5" opacity="0.8"
            />
            <!-- 본체 -->
            <rect
              :x="u.x * CS + 2" :y="u.y * CS + 2"
              :width="CS - 4" :height="CS - 4"
              :fill="unitBg(u)"
              :stroke="unitStroke(u)"
              stroke-width="1.5" rx="4"
            />
            <!-- 진형 아이콘 -->
            <text
              :x="u.x * CS + CS / 2" :y="u.y * CS + 17"
              font-size="14" text-anchor="middle" fill="#fff" font-family="serif"
              style="pointer-events:none"
            >{{ FORMATIONS[u.formation]?.icon }}</text>
            <!-- 함선 수 -->
            <text
              :x="u.x * CS + CS / 2" :y="u.y * CS + 30"
              font-size="10" text-anchor="middle" fill="#e0e0e0" font-weight="bold"
              style="pointer-events:none"
            >{{ fmtShips(u.ships) }}</text>
            <!-- 사령관 약칭 -->
            <text
              :x="u.x * CS + CS / 2" :y="u.y * CS + 40"
              font-size="7.5" text-anchor="middle" fill="#aaa"
              style="pointer-events:none"
            >{{ cmdShort(u.commander) }}</text>
            <!-- 사기 바 -->
            <rect
              :x="u.x * CS + 4" :y="u.y * CS + CS - 9"
              :width="CS - 8" height="4"
              fill="#111" rx="2" style="pointer-events:none"
            />
            <rect
              :x="u.x * CS + 4" :y="u.y * CS + CS - 9"
              :width="Math.max(0, (CS - 8) * u.morale / 100)" height="4"
              :fill="moraleColor(u.morale)" rx="2"
              style="pointer-events:none"
            />
          </g>

          <!-- 좌/우 진영 구분선 -->
          <line :x1="3*CS" y1="0" :x2="3*CS" :y2="MAP_H*CS" stroke="#1a2a3a" stroke-width="1" stroke-dasharray="4,4"/>
          <line :x1="(MAP_W-3)*CS" y1="0" :x2="(MAP_W-3)*CS" :y2="MAP_H*CS" stroke="#1a2a3a" stroke-width="1" stroke-dasharray="4,4"/>

          <defs>
            <pattern id="nebula-pattern" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#6633aa" opacity="0.5"/>
              <circle cx="6" cy="6" r="1.5" fill="#4422aa" opacity="0.3"/>
            </pattern>
          </defs>
        </svg>
      </div>

      <!-- 우측: 전투 로그 -->
      <div class="tac-right">
        <div class="panel log-panel">
          <div class="log-title">전투 기록</div>
          <div class="log-list">
            <div
              v-for="(entry, i) in store.logs.slice(0, 80)"
              :key="i"
              :class="['log-entry', logClass(entry)]"
            >{{ entry }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 결과 오버레이 -->
    <transition name="fade">
      <div v-if="store.phase === 'result' && store.result" class="result-overlay">
        <div class="result-box panel">
          <div class="result-icon">{{ isPlayerWin ? '🏆' : '💀' }}</div>
          <div class="result-title serif">{{ isPlayerWin ? '전술 승리' : '전술 패배' }}</div>
          <div class="result-stats">
            <div class="rs-row">
              <span>아군 손실</span>
              <span class="rs-val">{{ store.result.attackerLosses.toLocaleString() }} 척</span>
            </div>
            <div class="rs-row">
              <span>적군 손실</span>
              <span class="rs-val">{{ store.result.defenderLosses.toLocaleString() }} 척</span>
            </div>
          </div>
          <button class="btn btn-return serif" @click="returnToCampaign">
            전략 지도로 귀환
          </button>
        </div>
      </div>
    </transition>

  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTacticalStore } from '@/stores/tacticalStore'
import { useGameStore }     from '@/stores/gameStore'
import { FORMATIONS, TERRAIN, MAP_W, MAP_H, CELL_SIZE } from '@/data/base/tactical/tacticalData'
import { CHARACTERS, FACTIONS } from '@/data/masterData'

const router = useRouter()
const store  = useTacticalStore()
const game   = useGameStore()
const CS     = CELL_SIZE

// ── 초기화 ──────────────────────────────────────────────────
onMounted(() => {
  if (game._pendingBattle && !store.active) {
    store.initBattle(game._pendingBattle)
  }
  window.addEventListener('keydown', onKey)
})
onUnmounted(() => window.removeEventListener('keydown', onKey))

function onKey(e) {
  if (e.key === ' ')      { e.preventDefault(); if (store.phase === 'player') store.endPlayerTurn() }
  if (e.key === 'Escape') { store.deselect() }
}

// ── 표시 헬퍼 ───────────────────────────────────────────────
const phaseLabel = computed(() => ({
  player: '🎮 플레이어 페이즈',
  ai:     '🤖 AI 페이즈',
  result: '⚔️ 전투 결과',
}[store.phase] || ''))

const defFaction = computed(() =>
  store.context?.defenderFleets?.[0]?.faction || ''
)

const isPlayerWin = computed(() =>
  store.result?.winner === store.playerFaction
)

const curFm = computed(() =>
  store.selectedUnit ? FORMATIONS[store.selectedUnit.formation] : null
)

const selectedCommander = computed(() =>
  store.selectedUnit?.commander ? CHARACTERS[store.selectedUnit.commander] : null
)

const unitGroups = computed(() => {
  const map = {}
  store.units.forEach(u => {
    if (!map[u.faction]) map[u.faction] = { faction: u.faction, units: 0, ships: 0 }
    map[u.faction].units++
    map[u.faction].ships += u.ships
  })
  return Object.values(map)
})

function factionLabel(id) { return FACTIONS[id]?.name || id }
function terrainColor(t)  { return TERRAIN[t]?.color || '#06090f' }
function moraleColor(m)   { return m > 60 ? '#27ae60' : m > 30 ? '#e67e22' : '#c0392b' }
function fmtShips(n)      { return n >= 10000 ? (n/1000).toFixed(0)+'K' : n >= 1000 ? (n/1000).toFixed(1)+'K' : n }
function cmdShort(id)     {
  const c = CHARACTERS[id]
  if (!c) return ''
  const name = c.name
  return name.length > 4 ? name.slice(0, 4) : name
}

function unitBg(u) {
  const base = { REH:'#4a1020', FPA:'#0d2a4a', PZN:'#0a2a16' }
  return base[u.faction] || '#1a1a2e'
}
function unitStroke(u) {
  const col = { REH:'#c0392b', FPA:'#2980b9', PZN:'#27ae60' }
  return col[u.faction] || '#555'
}

function logClass(entry) {
  if (entry.startsWith('🏆')) return 'log-win'
  if (entry.startsWith('💀')) return 'log-lose'
  if (entry.startsWith('💥')) return 'log-kill'
  if (entry.startsWith('──')) return 'log-sep'
  if (entry.startsWith('▶'))  return 'log-move'
  return ''
}

// ── 클릭 처리 ───────────────────────────────────────────────
function onUnitClick(u) {
  if (store.phase !== 'player') return

  if (u.faction === store.playerFaction) {
    // 내 유닛 선택
    store.selectUnit(u.id)
  } else {
    // 적 유닛 공격 시도
    if (store.selectedId && store.attackableCells.some(c => c.x === u.x && c.y === u.y)) {
      store.attackUnit(u.id)
    }
  }
}

// SVG 빈 칸 클릭 → 이동 시도 (이미 @click.self="store.deselect()"로 처리되지만,
// 하이라이트된 칸이면 이동해야 함 — rect에 클릭 핸들러 추가 대신 overlay rect 사용)

// ── 결과 처리 ───────────────────────────────────────────────
function returnToCampaign() {
  if (store.result) game.applyBattleResult(store.result)
  store.active = false
  router.push('/game')
}
</script>

<style scoped>
.tac-root {
  display: flex; flex-direction: column;
  height: 100vh; overflow: hidden;
  background: var(--bg); color: var(--t1);
}

/* 헤더 */
.tac-header {
  display: flex; align-items: center; gap: 14px;
  padding: 10px 16px; border-bottom: 1px solid var(--bd);
  flex-shrink: 0;
}
.tac-title { font-size: 18px; letter-spacing: 2px; color: var(--gold); }
.tac-info  { display: flex; align-items: center; gap: 10px; flex: 1; }
.turn-badge {
  background: var(--bg4); border: 1px solid var(--bd);
  padding: 2px 8px; border-radius: 4px; font-size: 13px;
}
.phase-badge {
  padding: 3px 10px; border-radius: 4px; font-size: 13px; font-weight: bold;
}
.phase-badge.player { background: rgba(41,128,185,0.25); border: 1px solid #2980b9; color: #7ab8e8; }
.phase-badge.ai     { background: rgba(192,57,43,0.20);  border: 1px solid #c0392b; color: #e88; }
.phase-badge.result { background: rgba(218,165,32,0.20); border: 1px solid var(--gold); color: var(--gold); }
.battle-label { font-size: 12px; color: var(--t3); }
.ai-label     { font-size: 13px; color: #e88; animation: pulse 1s infinite; }
.btn-end { margin-left: auto; }
.kbd { font-size: 10px; background: #333; border-radius: 3px; padding: 1px 4px; }

/* 바디 */
.tac-body {
  display: flex; flex: 1; overflow: hidden;
}

/* 좌측 패널 */
.tac-left {
  width: 220px; flex-shrink: 0;
  display: flex; flex-direction: column; gap: 8px;
  padding: 10px 8px; overflow-y: auto;
  border-right: 1px solid var(--bd);
}
.unit-panel { padding: 12px; }
.unit-name  { font-size: 15px; font-weight: bold; letter-spacing: 1px; }
.unit-faction { font-size: 11px; margin: 2px 0 8px; opacity: 0.7; }
.stat-rows  { display: flex; flex-direction: column; gap: 4px; margin-bottom: 8px; }
.stat-row   { display: flex; justify-content: space-between; font-size: 12px; }
.sl         { color: var(--t3); }
.sv         { color: var(--t1); }
.ships-bar, .morale-bar {
  height: 5px; background: #1a1a2e; border-radius: 3px; overflow: hidden; margin: 0 0 4px;
}
.ships-fill { height: 100%; background: #2980b9; border-radius: 3px; }
.morale-fill{ height: 100%; border-radius: 3px; transition: width .3s; }

.commander-row {
  display: flex; align-items: center; gap: 8px;
  background: var(--bg3); border-radius: 6px; padding: 6px 8px; margin-bottom: 10px;
}
.portrait { font-size: 20px; }
.c-name   { font-size: 12px; font-weight: bold; }
.c-rank   { font-size: 10px; color: var(--t3); }

.fm-title { font-size: 11px; color: var(--t3); margin: 4px 0; }
.fm-grid  { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; margin-bottom: 6px; }
.fm-btn {
  display: flex; flex-direction: column; align-items: center;
  padding: 5px 4px; border-radius: 5px;
  background: var(--bg3); border: 1px solid var(--bd);
  cursor: pointer; color: var(--t2); font-size: 10px; gap: 2px;
  transition: all .15s;
}
.fm-btn:hover  { border-color: var(--fc); color: var(--fc); }
.fm-btn.active { background: var(--fc); border-color: var(--fc); color: #fff; }
.fm-icon { font-size: 16px; }
.fm-name { font-size: 9px; }
.fm-desc {
  font-size: 10px; line-height: 1.5; color: var(--t3);
  background: var(--bg3); border-radius: 4px; padding: 5px 6px;
}

.no-sel { min-height: 120px; display: flex; align-items: center; justify-content: center; }
.no-sel-txt { text-align: center; color: var(--t3); font-size: 12px; line-height: 1.8; }
.hint { font-size: 10px; opacity: 0.6; }

.strength-panel { padding: 10px; }
.sp-title { font-size: 11px; color: var(--t3); margin-bottom: 6px; }
.sp-row   { display: flex; align-items: center; gap: 6px; font-size: 11px; margin-bottom: 4px; }
.dot      { font-size: 10px; }
.sp-name  { flex: 1; }
.sp-count { color: var(--t3); }

/* 맵 */
.tac-map-wrap {
  flex: 1; display: flex; align-items: center; justify-content: center;
  overflow: hidden; background: #020509;
}
.tac-svg {
  width: 100%; height: 100%;
  max-height: calc(100vh - 56px);
  cursor: crosshair;
}
.unit-g { cursor: pointer; }

/* 우측 로그 */
.tac-right {
  width: 220px; flex-shrink: 0;
  display: flex; flex-direction: column;
  padding: 10px 8px;
  border-left: 1px solid var(--bd);
}
.log-panel { flex: 1; display: flex; flex-direction: column; padding: 10px; }
.log-title { font-size: 11px; color: var(--t3); margin-bottom: 6px; }
.log-list  { flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 3px; }
.log-entry { font-size: 10px; line-height: 1.5; color: var(--t2); word-break: break-all; }
.log-sep   { color: var(--t4); text-align: center; }
.log-win   { color: var(--gold); font-weight: bold; }
.log-lose  { color: #c0392b; font-weight: bold; }
.log-kill  { color: #e67e22; }
.log-move  { color: #3498db; }

/* 결과 오버레이 */
.result-overlay {
  position: fixed; inset: 0; z-index: 3000;
  background: rgba(2,5,8,.92);
  display: flex; align-items: center; justify-content: center;
  backdrop-filter: blur(8px);
}
.result-box {
  display: flex; flex-direction: column; align-items: center;
  gap: 16px; padding: 48px 56px; text-align: center; min-width: 280px;
}
.result-icon  { font-size: 64px; }
.result-title { font-size: 36px; letter-spacing: 3px; }
.result-stats { width: 100%; display: flex; flex-direction: column; gap: 6px; }
.rs-row       { display: flex; justify-content: space-between; font-size: 14px; }
.rs-val       { font-weight: bold; color: var(--gold); }
.btn-return   { padding: 12px 28px; font-size: 15px; letter-spacing: 1px; }

@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
.fade-enter-active,.fade-leave-active { transition: opacity .4s }
.fade-enter-from,.fade-leave-to { opacity: 0 }
</style>
