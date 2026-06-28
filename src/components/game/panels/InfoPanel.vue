<template>
  <aside class="info-panel">

    <!-- ══════════════════════════════════════════════════════
         성계 선택
    ══════════════════════════════════════════════════════ -->
    <template v-if="sys">

      <!-- ── 헤더 영역 ─────────────────────────────────────── -->
      <div class="ip-hd">
        <div class="sys-img"
             :style="`background:linear-gradient(135deg,${fColor(sys.faction)}44,${fColor(sys.faction)}11);
                      border-color:${fColor(sys.faction)}66`">
          <span class="sys-img-ico">{{ ico(sys) }}</span>
        </div>
        <div class="ip-hd-info">
          <div class="serif ip-name">{{ sys.name }}</div>
          <div class="ip-nation" :style="`color:${fColor(sys.faction)}`">{{ fName(sys.faction) }}</div>
          <div class="ip-type dim">{{ typeLabel(sys.type) }}</div>
        </div>
      </div>

      <!-- ── 본문 영역 ─────────────────────────────────────── -->
      <div class="ip-body">
        <!-- 본문 타이틀 -->
        <div class="ip-body-hd" @click="onTitleClick" :class="{ clickable: isSubView }">
          <span v-if="isSubView" class="dim" style="margin-right:4px">←</span>
          <span>{{ bodyTitle }}</span>
          <span v-if="sysTab==='planets' && !selPlanet" class="dim" style="font-size:9px;margin-left:auto">{{ sysPlanets.length }}개</span>
          <span v-if="sysTab==='lanes'   && !selLane"   class="dim" style="font-size:9px;margin-left:auto">{{ sysLanes.length }}개</span>
        </div>

        <!-- 본문 콘텐츠 -->
        <div class="ip-body-ct">

          <!-- 정보 탭 -->
          <template v-if="sysTab==='info'">
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
            <StatRow label="산업" :value="sys.industry" :max="100" color="#f39c12"/>
            <StatRow label="방어" :value="sys.defense"  :max="100" color="#e74c3c"/>
            <StatRow label="민심" :value="sys.morale"   :max="100" color="#2ecc71"/>
            <div class="sr-row">
              <span class="dim">세율</span>
              <span class="gold mono">{{ sys.tax }}%</span>
            </div>
            <div v-if="sys.fortress" class="sr-row">
              <span class="dim">요새</span>
              <span style="color:#9b59b6">{{ sys.fortress }}</span>
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

          <!-- 상세지도 탭 -->
          <template v-else-if="sysTab==='detail'">
            <template v-if="starMapData">
              <svg class="star-minimap"
                   :viewBox="`0 0 ${starMapData.mapSize[0]} ${starMapData.mapSize[1]}`"
                   preserveAspectRatio="xMidYMid meet">
                <rect width="100%" height="100%" fill="#080c14"/>
                <ellipse v-for="(n,i) in starMapData.nebulae" :key="'n'+i"
                         :cx="n.x" :cy="n.y" :rx="n.r" :ry="n.r*.7"
                         :fill="`${n.color}${n.alpha})`"/>
                <g v-for="p in starMapData.planets" :key="p.nameKr"
                   :transform="`translate(${p.x},${p.y})`">
                  <circle :r="p.size/2" fill="#1a2a3a" stroke="#3a5a7a" stroke-width="2"/>
                  <circle :r="p.size/2*.55" :fill="p.main?'#d4aa60':'#2a4a6a'"/>
                  <text text-anchor="middle" :dy="p.size/2+18"
                        font-size="28" fill="#8aaabb">{{ p.nameKr }}</text>
                </g>
              </svg>
              <div class="star-map-legend">
                <div v-for="p in starMapData.planets" :key="p.nameKr" class="sml-row">
                  <span>{{ p.main?'⭐':'🪐' }}</span>
                  <span>{{ p.nameKr }}</span>
                  <span class="dim mono" style="font-size:9px">{{ p.type }}</span>
                </div>
              </div>
            </template>
            <div v-else class="placeholder-area">
              <div style="font-size:32px;margin-bottom:10px">🗺</div>
              <div class="dim" style="font-size:11px">세부 지도 없음</div>
            </div>
          </template>

          <!-- 소속성계(행성) 탭 -->
          <template v-else-if="sysTab==='planets'">
            <template v-if="selPlanet">
              <div class="sr-row"><span class="dim">코드</span><span class="mono dim" style="font-size:10px">{{ selPlanet.code }}</span></div>
              <div v-if="selPlanet.type" class="sr-row"><span class="dim">유형</span><span>{{ selPlanet.type }}</span></div>
              <div v-if="selPlanet.fortress" class="sr-row"><span class="dim">요새</span><span style="color:#9b59b6">{{ selPlanet.fortress }}</span></div>
              <div class="sr-row"><span class="dim">대표 행성</span><span>{{ selPlanet.main ? 'Y' : 'N' }}</span></div>
              <div v-if="selPlanet.nameEn" class="sr-row">
                <span class="dim">영문명</span>
                <span class="mono" style="font-size:10px">{{ selPlanet.nameEn }}</span>
              </div>
            </template>
            <template v-else>
              <div v-if="!sysPlanets.length" class="placeholder-area">
                <div class="dim" style="font-size:11px">행성 데이터 없음</div>
              </div>
              <button v-for="p in sysPlanets" :key="p.code"
                      class="list-item" @click="selPlanet=p">
                <span class="li-ico">{{ p.main?'⭐':'🪐' }}</span>
                <div class="li-text">
                  <div>{{ p.nameKr||'(무명)' }}</div>
                  <div class="mono dim" style="font-size:9px">{{ p.code }}</div>
                </div>
                <span v-if="p.fortress" class="li-tag">요새</span>
              </button>
            </template>
          </template>

          <!-- 항로정보 탭 -->
          <template v-else-if="sysTab==='lanes'">
            <template v-if="selLane">
              <div class="sr-row"><span class="dim">항로 ID</span><span class="mono dim" style="font-size:10px">{{ selLane.id }}</span></div>
              <div class="sr-row"><span class="dim">유형</span><span>{{ laneTypeName(selLane.type) }}</span></div>
              <div class="sr-row"><span class="dim">이동 소요</span><span class="gold mono">{{ selLane.period }}턴</span></div>
              <StatRow label="안정도" :value="selLane.stability" :max="100" color="#3498db"/>
            </template>
            <template v-else>
              <div v-if="!sysLanes.length" class="placeholder-area">
                <div class="dim" style="font-size:11px">연결된 항로 없음</div>
              </div>
              <button v-for="l in sysLanes" :key="l.id"
                      class="list-item" @click="selLane=l">
                <span class="li-ico">{{ laneTypeIco(l.type) }}</span>
                <div class="li-text">
                  <div>{{ game.systems[l.other]?.name||l.other }}</div>
                  <div class="mono dim" style="font-size:9px">{{ l.period }}턴 · 안정 {{ l.stability }}</div>
                </div>
              </button>
            </template>
          </template>

          <!-- 제안/공격/첩보 탭 -->
          <template v-else-if="sysTab==='action'">
            <div v-if="isPlayer" class="action-panel">
              <div class="dim" style="font-size:11px;line-height:1.7">
                해당 성계 담당관에게 제안을 전달합니다.<br>
                담당관이 없을 경우 국가수반에게 전달됩니다.
              </div>
              <button class="btn btn-gold" style="width:100%;justify-content:center;margin-top:12px"
                      @click="game.addLog(`[제안] ${sys.name} 제안 기능 — 미구현`)">
                📋 제안하기
              </button>
            </div>
            <div v-else-if="isAdjacentEnemy" class="action-panel">
              <div class="dim" style="font-size:11px;line-height:1.7">
                인접 적국 성계입니다.<br>
                함대를 출격시켜 공격할 수 있습니다.
              </div>
              <button class="btn btn-red" style="width:100%;justify-content:center;margin-top:12px"
                      @click="game.openModal('fleet',{systemId:sys.id})">
                ⚔️ 공격 명령
              </button>
            </div>
            <div v-else class="action-panel">
              <div class="dim" style="font-size:11px;line-height:1.7">
                비인접 적국 성계입니다.<br>
                첩보 작전을 통해 정보를 수집할 수 있습니다.
              </div>
              <button class="btn btn-blue" style="width:100%;justify-content:center;margin-top:12px"
                      @click="game.openModal('intel',{systemId:sys.id})">
                🔍 첩보 작전
              </button>
            </div>
          </template>

        </div><!-- ip-body-ct -->
      </div><!-- ip-body -->

      <!-- ── 버튼 영역 ─────────────────────────────────────── -->
      <div class="ip-btns">
        <button v-for="t in sysTabs" :key="t.id"
                class="ip-btn" :class="{ on: sysTab===t.id }"
                @click="setTab(t.id)">{{ t.label }}</button>
      </div>

    </template>

    <!-- ══════════════════════════════════════════════════════
         함대 선택
    ══════════════════════════════════════════════════════ -->
    <template v-else-if="fleet">
      <div class="ip-hd">
        <div class="sys-img" style="background:rgba(255,255,255,.05);border-color:#333">
          <span class="sys-img-ico">🚀</span>
        </div>
        <div class="ip-hd-info">
          <div class="serif ip-name">{{ fleet.name }}</div>
          <div class="ip-nation dim">{{ stLbl(fleet.status) }}</div>
          <div class="ip-type dim">{{ fleet.ships.toLocaleString() }}척</div>
        </div>
      </div>
      <div class="ip-body">
        <div class="ip-body-hd"><span>함대 정보</span></div>
        <div class="ip-body-ct">
          <div class="sr-row"><span class="dim">위치</span><span>{{ game.systems[fleet.location]?.name||fleet.location }}</span></div>
          <div class="sr-row"><span class="dim">상태</span><span :class="stCls(fleet.status)">{{ stLbl(fleet.status) }}</span></div>
          <div v-if="cmd" class="cmd-card">
            <span style="font-size:28px">{{ cmd.portrait }}</span>
            <div>
              <div class="serif" style="font-size:12px">{{ charName(cmd) }}</div>
              <div class="dim" style="font-size:10px">{{ cmd.rank }}</div>
              <div class="cmd-st mono">
                <span class="gold">전술 {{ cmd.military }}</span>
                <span class="dim">정치 {{ cmd.politics }}</span>
              </div>
            </div>
          </div>
          <div v-if="isPlayerFleet" style="margin-top:12px">
            <button class="btn btn-red" style="width:100%;justify-content:center"
                    @click="game.openModal('fleet',{fleetId:fleet.id})">⚔️ 출격 명령</button>
          </div>
        </div>
      </div>
    </template>

    <!-- ══════════════════════════════════════════════════════
         미선택
    ══════════════════════════════════════════════════════ -->
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
import { CONSTRUCTION_TYPES } from '@/data/masterData'
import { charName } from '@/utils/charUtils'
import { getStarMapByCode } from '@/data/base/stars/maps/index.js'
import StatRow from '@/components/ui/StatRow.vue'

const game  = useGameStore()
const sys   = computed(() => game.selSysObj)
const fleet = computed(() => game.selFleetObj)
const cmd   = computed(() => fleet.value ? game.characters[fleet.value.commander] : null)

const isPlayer      = computed(() => sys.value?.faction === game.playerFaction)
const isEnemy       = computed(() => sys.value?.faction && sys.value.faction !== game.playerFaction && sys.value.faction !== 'PZN')
const isPlayerFleet = computed(() => game.pFleets.some(f => f.id === game.selectedFleet))

// ── 탭 상태 ────────────────────────────────────────────────────
const sysTab      = ref('info')
const selPlanet   = ref(null)
const selLane     = ref(null)
const showSupport = ref(false)

const isSubView = computed(() =>
  (sysTab.value === 'planets' && selPlanet.value) ||
  (sysTab.value === 'lanes'   && selLane.value)
)

watch(() => game.selectedSystem, () => {
  sysTab.value      = 'info'
  selPlanet.value   = null
  selLane.value     = null
  showSupport.value = false
})

function setTab(id) {
  sysTab.value    = id
  selPlanet.value = null
  selLane.value   = null
}

function onTitleClick() {
  if (selPlanet.value) selPlanet.value = null
  else if (selLane.value) selLane.value = null
}

// ── 파생 데이터 ────────────────────────────────────────────────
const starMapData = computed(() => sys.value ? getStarMapByCode(sys.value.code ?? sys.value.id) : null)

const sysPlanets = computed(() => sys.value?.planets ?? [])

const sysLanes = computed(() => {
  if (!sys.value) return []
  return game.lanes
    .filter(l => l.stars.includes(sys.value.id))
    .map(l => ({ ...l, other: l.stars[0] === sys.value.id ? l.stars[1] : l.stars[0] }))
})

const isAdjacentEnemy = computed(() => {
  if (!sys.value || !isEnemy.value) return false
  return sysLanes.value.some(l => game.systems[l.other]?.faction === game.playerFaction)
})

const actionLabel = computed(() => {
  if (!sys.value || isPlayer.value) return '제안'
  if (isAdjacentEnemy.value) return '공격'
  return '첩보'
})

const sysTabs = computed(() => [
  { id:'info',    label:'정보' },
  { id:'detail',  label:'상세지도' },
  { id:'planets', label:'소속성계' },
  { id:'lanes',   label:'항로정보' },
  { id:'action',  label: actionLabel.value },
])

const bodyTitle = computed(() => {
  if (sysTab.value === 'planets' && selPlanet.value) return selPlanet.value.nameKr || '(무명)'
  if (sysTab.value === 'lanes'   && selLane.value)   return game.systems[selLane.value.other]?.name || selLane.value.other
  return { info:'성계 정보', detail:'상세 지도', planets:'소속 성계', lanes:'항로 정보', action: actionLabel.value }[sysTab.value] || ''
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

// ── 헬퍼 ──────────────────────────────────────────────────────
function fName(fid)  { return game.factions[fid]?.nameKr || '중립' }
function fColor(fid) { return game.factions[fid]?.color || '#4a5a6a' }
function ico(s) {
  if (!s) return '🌟'
  if (s.type === 'capital')   return '🏛'
  if (s.type === 'fortress')  return '🏰'
  if (s.type === 'contested') return '⚡'
  if (s.type === 'noble')     return '👑'
  if (s.type === 'frontier')  return '🔭'
  return '🌟'
}
function typeLabel(t) {
  return { capital:'수도 성계', fortress:'요새 성계', frontier:'변경 성계',
           contested:'분쟁 성계', noble:'귀족 성계', normal:'일반 성계', neutral:'중립 성계' }[t] || ''
}
function stLbl(s) { return { standby:'대기', deployed:'출격', retreat:'철수' }[s] || s }
function stCls(s) { return { standby:'dim', deployed:'alert', retreat:'gold' }[s] }
function laneTypeIco(t)  { return { corridor:'🌀', phezzan:'💎', normal:'↔' }[t] || '↔' }
function laneTypeName(t) {
  return { corridor:'이젤론 회랑', phezzan:'페잔 회랑', normal:'일반 항로' }[t] || t
}
</script>

<style scoped>
.info-panel {
  width: 200px; flex-shrink: 0;
  display: flex; flex-direction: column;
  border-left: 1px solid var(--bd);
  background: var(--bg3);
  overflow: hidden;
  transition: transform .25s ease;
}

@media (orientation:landscape) and (max-height:480px){
  .info-panel{position:absolute;right:0;top:0;bottom:0;z-index:100;transform:translateX(100%);box-shadow:-4px 0 24px rgba(0,0,0,.6)}
  .info-panel.is-open{transform:translateX(0)}
}

/* ━━━ 헤더 영역 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
.ip-hd {
  display: flex; align-items: center; gap: 10px;
  padding: 12px; flex-shrink: 0;
  border-bottom: 1px solid var(--bd);
}
.sys-img {
  width: 52px; height: 52px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  border-radius: var(--r); border: 1px solid;
}
.sys-img-ico { font-size: 26px; line-height: 1; }
.ip-hd-info  { flex: 1; min-width: 0; }
.ip-name     { font-size: 14px; line-height: 1.3; margin-bottom: 2px; }
.ip-nation   { font-size: 11px; line-height: 1.4; }
.ip-type     { font-size: 9px; margin-top: 1px; }

/* ━━━ 본문 영역 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
.ip-body {
  flex: 1; display: flex; flex-direction: column; overflow: hidden;
}
.ip-body-hd {
  display: flex; align-items: center;
  padding: 7px 12px; flex-shrink: 0;
  background: var(--bg4); border-bottom: 1px solid var(--bd);
  font-size: 11px; color: var(--t2); font-family: var(--font-serif);
}
.ip-body-hd.clickable { cursor: pointer; }
.ip-body-hd.clickable:hover { color: var(--tg); }
.ip-body-ct { flex: 1; overflow-y: auto; padding: 10px 12px; }

/* ── 수치 ── */
.stat-hdr {
  display: flex; justify-content: space-between; align-items: center;
  padding: 3px 0; margin-bottom: 5px; font-size: 11px; cursor: pointer;
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
.sup-row   { display: flex; align-items: center; gap: 5px; margin-bottom: 5px; }
.sup-row:last-child { margin-bottom: 0; }
.sup-label { font-size: 9px; min-width: 50px; font-family: var(--font-mono); }
.sup-track { flex: 1; height: 4px; background: var(--bg3); border-radius: 2px; overflow: hidden; }
.sup-fill  { height: 100%; border-radius: 2px; }
.ip-const  {
  display: flex; align-items: center; gap: 8px;
  padding: 8px; margin-top: 6px; font-size: 22px;
  background: rgba(212,170,96,.08); border: 1px solid rgba(212,170,96,.2);
  border-radius: var(--r);
}
.ip-desc {
  font-size: 10px; line-height: 1.6; margin-top: 8px;
  padding-top: 8px; border-top: 1px solid var(--bd);
}

/* ── 행성/항로 리스트 ── */
.list-item {
  display: flex; align-items: center; gap: 8px;
  width: 100%; background: var(--bg4); border: 1px solid var(--bd);
  border-radius: var(--r); padding: 8px; margin-bottom: 5px;
  cursor: pointer; text-align: left; color: var(--t1); transition: all .15s;
}
.list-item:hover { background: var(--bgh); border-color: var(--bdg); }
.li-ico  { font-size: 15px; flex-shrink: 0; }
.li-text { flex: 1; min-width: 0; font-size: 12px; }
.li-tag  {
  font-size: 9px; color: #9b59b6;
  border: 1px solid #9b59b644; border-radius: 2px;
  padding: 1px 4px; flex-shrink: 0;
}

/* ── 플레이스홀더 / 액션 ── */
.placeholder-area {
  display: flex; flex-direction: column; align-items: center;
  justify-content: center; padding: 40px 0; text-align: center;
}
.action-panel { padding: 4px 0; }

/* ━━━ 버튼 영역 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
.ip-btns {
  display: flex; flex-shrink: 0;
  border-top: 1px solid var(--bd); background: var(--bg4);
}
.ip-btn {
  flex: 1; padding: 8px 2px; background: none; border: none;
  color: var(--t2); font-size: 9px; cursor: pointer;
  border-top: 2px solid transparent; transition: all .15s;
  line-height: 1.3; word-break: keep-all;
}
.ip-btn:hover { color: var(--t1); background: var(--bgh); }
.ip-btn.on    { color: var(--tg); border-top-color: var(--tg); background: rgba(212,170,96,.06); }

/* ━━━ 함대 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
.cmd-card {
  display: flex; gap: 9px; align-items: flex-start;
  padding: 9px; margin-top: 8px;
  background: var(--bg4); border-radius: var(--r);
}
.cmd-st { display: flex; gap: 9px; margin-top: 4px; font-size: 10px; }

/* ── 상세지도 ── */
.star-minimap {
  width: 100%; aspect-ratio: 1/1;
  border-radius: var(--r); border: 1px solid var(--bd);
  display: block; margin-bottom: 8px;
}
.star-map-legend { display: flex; flex-direction: column; gap: 4px; }
.sml-row { display: flex; align-items: center; gap: 6px; font-size: 11px; }
.sml-row > span:last-child { margin-left: auto; }

/* ━━━ 빈 상태 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
.ip-empty {
  flex: 1; display: flex; align-items: center; justify-content: center;
  text-align: center; line-height: 2; font-size: 14px; padding: 14px;
}
</style>
