<template>
  <div class="tac-root">

    <!-- 헤더 -->
    <div class="tac-header">
      <div class="tac-info">
        <span class="date-badge serif">{{ battleDate }}</span>
        <span :class="['phase-badge', store.phase]">{{ phaseLabel }}</span>
        <span v-if="store.context" class="battle-label">
          {{ factionLabel(store.context.attackerFaction) }} vs {{ factionLabel(defFaction) }}
        </span>
      </div>
      <div v-if="store.phase === 'ai'" class="ai-label">AI 행동 중…</div>
      <!-- 격자 토글 -->
      <button :class="['btn', 'grid-toggle-btn', showGrid ? 'btn-gold' : '']"
              @click="showGrid = !showGrid"
              title="격자선 표시/숨김">
        <span class="grid-icon">⊞</span>
      </button>
      <!-- 로그 토글 -->
      <button class="btn log-toggle-btn" @click="logOpen = !logOpen">
        전투 기록 {{ logOpen ? '▲' : '▼' }}
      </button>
      <!-- FOW 토글 (개발용) -->
      <button :class="['btn', 'fow-toggle-btn', store.fowEnabled ? 'btn-gold' : '']"
              @click="store.toggleFow()">
        FOW {{ store.fowEnabled ? 'ON' : 'OFF' }}
      </button>
    </div>

    <div class="tac-body">

      <!-- 전투 기록 오버레이 (float) -->
      <transition name="log-slide">
        <div v-if="logOpen" class="tac-log-overlay" @click.self="logOpen = false">
          <div class="log-bar-inner">
            <div
              v-for="(entry, i) in store.logs.slice(0, 60)"
              :key="i"
              :class="['log-entry', logClass(entry)]"
            >{{ entry }}</div>
          </div>
        </div>
      </transition>

      <!-- 좌측 패널 토글 버튼 -->
      <button class="left-panel-toggle" @click="showLeftPanel = !showLeftPanel">
        {{ showLeftPanel ? '◀' : '▶' }}
      </button>

      <!-- 좌측 패널 -->
      <div v-show="showLeftPanel" class="tac-left">
        <!-- 미니맵 (최상단) -->
        <div class="mini-wrap panel">
          <div class="mini-title">전술 현황</div>
          <canvas ref="miniCanvas" class="mini-canvas" @click="onMiniClick" />
        </div>

        <!-- 전력 현황 (항상 표시) -->
        <div class="panel strength-panel">
          <div class="sp-title">전력 현황</div>
          <!-- 통합 게이지 바 -->
          <div class="sp-gauge">
            <div class="sp-gauge-red"   :style="{ width: shipRatio('REH') + '%' }"></div>
            <div class="sp-gauge-blue"  :style="{ width: shipRatio('FPA') + '%' }"></div>
          </div>
          <div v-for="grp in store.visibleUnitGroups" :key="grp.faction" class="sp-row">
            <span class="sp-name" :class="`fc-${grp.faction}`">{{ factionShort(grp.faction) }}</span>
            <span class="sp-count">{{ grp.ships.toLocaleString() }}척</span>
          </div>
        </div>

        <template v-if="store.selectedFlagship">
          <div class="panel unit-panel">
            <!-- 함대명 -->
            <div class="unit-name serif">{{ store.selectedFlagship.fleetName }}</div>
            <div class="unit-faction-row">
              <span class="unit-faction" :class="`fc-${store.selectedFlagship.faction}`">
                {{ factionLabel(store.selectedFlagship.faction) }}
              </span>
              <span class="unit-move-badge" :class="store.selectedFlagship.moved ? 'done' : 'ready'">
                {{ store.selectedFlagship.moved ? '완료' : '가능' }}
              </span>
            </div>

            <div class="panel-divider"></div>

            <!-- 기본 정보 -->
            <div class="info-rows">
              <div class="info-row">
                <span class="ir-label">총 함선</span>
                <span class="ir-value">{{ totalShips.toLocaleString() }}척</span>
              </div>
              <div class="info-row">
                <span class="ir-label">부대 수</span>
                <span class="ir-value">{{ store.unitsOfFleet(store.selectedFleet).length }}부대</span>
              </div>
              <div class="info-row">
                <span class="ir-label">사기</span>
                <span class="ir-value" :style="{ color: moraleColor(store.selectedFlagship.morale) }">
                  {{ store.selectedFlagship.morale }}
                </span>
              </div>
              <div class="morale-bar">
                <div class="morale-fill" :style="{ width: store.selectedFlagship.morale + '%', background: moraleColor(store.selectedFlagship.morale) }"></div>
              </div>
              <div class="info-row">
                <span class="ir-label">진형</span>
                <span class="ir-value ir-gold">{{ FORMATIONS[store.selectedFlagship.formation]?.name ?? '—' }}</span>
              </div>
            </div>

            <div class="panel-divider"></div>

            <!-- 함대 능력치 -->
            <div class="stats-section-title">함대 능력치</div>
            <div v-if="selectedCommander" class="fleet-stats">
              <div v-for="[label, key] in fleetStatDefs" :key="key" class="fs-row">
                <span class="fs-label">{{ label }}</span>
                <div class="fs-bar-wrap">
                  <div class="fs-bar" :style="{ width: Math.min(100, selectedCommander[key] ?? 0) + '%' }"></div>
                </div>
                <span class="fs-val">{{ selectedCommander[key] ?? '—' }}</span>
              </div>
            </div>
            <div v-else class="no-cmd-txt">능력치 정보 없음</div>

            <!-- 사령관 -->
            <div v-if="selectedCommander" class="cmd-line">
              <span class="cmd-label">사령관</span>
              <span class="cmd-name serif">{{ selectedCommander.nameKr }}</span>
            </div>

            <button
              v-if="store.attackableCells.length"
              class="btn btn-red hint-btn"
              @click="autoAttack"
            >자동교전</button>
          </div>
        </template>

        <template v-else>
          <div class="panel unit-panel no-sel">
            <div class="no-sel-txt">함대를 선택하세요<br/><span class="hint">클릭: 아군 함대 선택<br/>이동: 파란 타일 클릭<br/>공격: 빨간 타일 / 적 클릭</span></div>
          </div>
        </template>

      </div>

      <!-- 중앙: Canvas 전술 지도 -->
      <div class="tac-map-wrap" ref="mapWrap">
        <canvas ref="mainCanvas" class="tac-canvas"
          @click="onCanvasClick"
          @contextmenu.prevent="onCanvasRightClick"
          @mousedown="onMouseDown"
          @mousemove="onMouseMove"
          @mouseup="onMouseUp"
          @mouseleave="onMouseLeave"
          @wheel.prevent="onWheel"
          @touchstart.prevent="onTouchStart"
          @touchmove.prevent="onTouchMove"
          @touchend="onTouchEnd"
        />
        <!-- 카메라 힌트 -->
        <div class="cam-hint">WASD / 좌클릭 드래그: 이동 &nbsp;|&nbsp; 휠 / PgUp/Dn: 줌</div>
        <!-- 마우스 위치 + 줌 -->
        <div class="tile-coord">
          <template v-if="hoverTile">X:{{ hoverTile.x }} &nbsp; Y:{{ hoverTile.y }} &nbsp; [{{ hoverTerrainLabel }}] &nbsp;|&nbsp;</template>
          {{ Math.round(zoom * 100) }}%
        </div>
      </div>

    </div>

    <!-- 하단 액션 바 -->
    <div class="tac-bottom" :class="`theme-${store.playerFaction ?? 'REH'}`">
      <div class="tac-actions">
        <button
          class="tac-act-btn"
          :disabled="!store.selectedFleet || store.phase !== 'player' || store.animating"
          @click="autoAttack"
        >자동교전</button>
        <button
          class="tac-act-btn"
          :disabled="!store.selectedFleet || store.phase !== 'player' || store.animating"
          @click="waitFleet"
        >대기</button>
        <button
          class="tac-act-btn"
          :disabled="!store.selectedFleet"
          @click="store.deselect()"
        >선택 해제</button>
      </div>
      <button
        class="tac-end-btn"
        :class="endBtnCls"
        :disabled="store.phase !== 'player' || store.animating"
        @click="onEndTurnClick"
      >
        {{ store.phase === 'ai' ? 'AI 행동 중…' : '턴 종료' }}
        <span class="kbd">Space</span>
      </button>
    </div>

    <!-- 작전 회의 팝업 -->
    <OperationBriefingModal
      v-if="showBriefing && store.context"
      :ctx="store.context"
      @confirm="onBriefingConfirm"
      @skip="onBriefingSkip"
    />

    <!-- 결과 오버레이 -->
    <transition name="fade">
      <div v-if="store.phase === 'result' && store.result" class="result-overlay">
        <div class="result-box panel">
          <div class="result-icon">{{ isPlayerWin ? '🏆' : '💀' }}</div>
          <div class="result-title serif">{{ isPlayerWin ? '전술 승리' : '전술 패배' }}</div>
          <div class="result-stats">
            <div class="rs-row"><span>아군 손실</span><span class="rs-val">{{ store.result.attackerLosses.toLocaleString() }} 척</span></div>
            <div class="rs-row"><span>적군 손실</span><span class="rs-val">{{ store.result.defenderLosses.toLocaleString() }} 척</span></div>
          </div>
          <button class="btn btn-return serif" @click="returnToCampaign">전략 지도로 귀환</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTacticalStore } from '@/stores/tacticalStore'
import { useGameStore }     from '@/stores/gameStore'
import { FORMATIONS, TERRAIN, TILE_PX } from '@/data/base/tactical/tacticalData'
import { CHARACTERS_MAP, FACTIONS } from '@/data/masterData'
import OperationBriefingModal from '@/components/game/tactical/OperationBriefingModal.vue'

const router = useRouter()
const store  = useTacticalStore()
const game   = useGameStore()

// ── refs ─────────────────────────────────────────────────────
const mapWrap       = ref(null)
const mainCanvas    = ref(null)
const miniCanvas    = ref(null)
const logOpen       = ref(false)
const showLeftPanel = ref(true)
const showGrid      = ref(true)
const hoverTile     = ref(null)   // { x, y } — 마우스 커서 타일 좌표
const showBriefing  = ref(false)

// ── 카메라 + 줌 ─────────────────────────────────────────────
const cam     = ref({ x: 0, y: 0 })   // 뷰포트 픽셀 오프셋 (줌 적용 공간)
const zoom    = ref(0.25)              // 현재 줌 배율
const ZOOM_MIN = 0.1
const ZOOM_MAX = 4.0
let drag    = null
let didDrag = false
let pinchDist = null

function applyZoom(factor, mx, my) {
  const oldZ = zoom.value
  const newZ = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, oldZ * factor))
  if (newZ === oldZ) return
  const ratio = newZ / oldZ
  cam.value.x = (cam.value.x + mx) * ratio - mx
  cam.value.y = (cam.value.y + my) * ratio - my
  zoom.value = newZ
  clampCam()
}

// ── rAF ──────────────────────────────────────────────────────
let rafId = null
const LERP = 0.18     // 픽셀 보간 속도 (0~1)

// ── 색상 ─────────────────────────────────────────────────────
const FACTION_COLOR  = { REH:'#c0392b', FPA:'#2980b9', PZN:'#27ae60' }
const FACTION_BG     = { REH:'rgba(192,57,43,0.7)', FPA:'rgba(41,128,185,0.7)', PZN:'rgba(39,174,96,0.7)' }
const TERRAIN_COLOR  = { SPACE:'#06090f', NEBULA:'#0f0820', ASTEROID:'#1c1c18', PLANET:'#1a0800' }

// ── 헬퍼 ─────────────────────────────────────────────────────
function factionLabel(id) { return FACTIONS[id]?.name || id }
function moraleColor(m)   { return m > 60 ? '#27ae60' : m > 30 ? '#e67e22' : '#c0392b' }
function fmtShips(n)      { return n >= 10000 ? (n/1000).toFixed(0)+'K' : n >= 1000 ? (n/1000).toFixed(1)+'K' : String(n) }

const FACTION_SHORT = { REH:'제국', FPA:'동맹', PZN:'페잔' }
function factionShort(id) { return FACTION_SHORT[id] ?? factionLabel(id) }


function shipRatio(factionId) {
  const total = store.visibleUnitGroups.reduce((s, g) => s + g.ships, 0)
  if (!total) return 0
  const grp = store.visibleUnitGroups.find(g => g.faction === factionId)
  return grp ? Math.round(grp.ships / total * 100) : 0
}

function logClass(e) {
  if (e.startsWith('🏆')) return 'log-win'
  if (e.startsWith('💀')) return 'log-lose'
  if (e.startsWith('💥')) return 'log-kill'
  if (e.startsWith('──')) return 'log-sep'
  if (e.startsWith('▶'))  return 'log-move'
  return ''
}

const phaseLabel = computed(() => ({ player:'🎮 플레이어 페이즈', ai:'🤖 AI 페이즈', result:'⚔️ 전투 결과' }[store.phase] || ''))
const defFaction = computed(() => store.context?.defenderFleets?.[0]?.faction || '')
const isPlayerWin = computed(() => store.result?.winner === store.playerFaction)
const fleetStatDefs = [
  ['지휘', 'statCmd'],
  ['통솔', 'statCsm'],
  ['공격', 'statAtt'],
  ['방어', 'statDef'],
  ['기동', 'statFst'],
]
const selectedCommander = computed(() => {
  const code = store.selectedFlagship?.commander
  if (!code) return null
  const ch = CHARACTERS_MAP[code]
  if (!ch) return null
  const nameKr = Array.isArray(ch.name)
    ? (ch.name.find(n => n.code === 'Kr')?.context ?? ch.name[0]?.context ?? '')
    : (ch.name ?? '')
  return { ...ch, nameKr }
})
const totalShips = computed(() => {
  if (!store.selectedFleet) return 0
  return store.unitsOfFleet(store.selectedFleet).reduce((s, u) => s + u.ships, 0)
})

// 날짜 표시 (game 날짜 + 전투 턴 시간)
const battleDate = computed(() => {
  const y = game.year ?? 796, m = game.month ?? 1, d = game.day ?? 1
  const h = (store.turn - 1) % 24
  const hStr = String(h).padStart(2, '0')
  return `우주력 ${y}년 ${m}월 ${d}일 ${hStr}시`
})
const endBtnCls = computed(() => ({ REH:'btn-red', FPA:'btn-blue', PZN:'btn-green' }[store.playerFaction ?? 'REH']))

const TERRAIN_LABEL = { SPACE: '우주', NEBULA: '성운', ASTEROID: '소행성', PLANET: '행성' }
const hoverTerrainLabel = computed(() => {
  if (!hoverTile.value) return ''
  const tile = store.tileAt?.(hoverTile.value.x, hoverTile.value.y)
  return TERRAIN_LABEL[tile?.terrain] ?? tile?.terrain ?? '-'
})

// ── 픽셀 보간 업데이트 ───────────────────────────────────────
function updateAnimation() {
  let anyMoving = false
  for (const u of store.units) {
    const dx = u.targetPx - u.px
    const dy = u.targetPy - u.py
    if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
      u.px += dx * LERP
      u.py += dy * LERP
      anyMoving = true
    } else {
      u.px = u.targetPx
      u.py = u.targetPy
      u.moving = false
    }
  }
  store.animating = anyMoving
}

// ── Canvas 렌더링 ─────────────────────────────────────────────
function render() {
  const canvas = mainCanvas.value
  if (!canvas) return
  const ctx  = canvas.getContext('2d')
  const W    = canvas.width
  const H    = canvas.height
  const mapW = store.map.width
  const mapH = store.map.height
  const camX = cam.value.x
  const camY = cam.value.y
  const tpx  = TILE_PX * zoom.value    // 현재 줌 적용 타일 픽셀 크기

  ctx.clearRect(0, 0, W, H)

  // 가시 타일 범위
  const tx0 = Math.max(0, Math.floor(camX / tpx))
  const ty0 = Math.max(0, Math.floor(camY / tpx))
  const tx1 = Math.min(mapW - 1, Math.ceil((camX + W) / tpx))
  const ty1 = Math.min(mapH - 1, Math.ceil((camY + H) / tpx))

  // 지형 그리기
  for (let ty = ty0; ty <= ty1; ty++) {
    for (let tx = tx0; tx <= tx1; tx++) {
      const tile = store.tileAt(tx, ty)
      const sx = tx * tpx - camX
      const sy = ty * tpx - camY
      ctx.fillStyle = TERRAIN_COLOR[tile.terrain] ?? TERRAIN_COLOR.SPACE
      ctx.fillRect(sx, sy, tpx, tpx)
      // 격자선
      if (showGrid.value && tpx >= 4) {
        ctx.strokeStyle = 'rgba(255,255,255,0.12)'
        ctx.lineWidth = 0.5
        ctx.strokeRect(sx, sy, tpx, tpx)
      }
      // 소행성 텍스처
      if (tile.terrain === 'ASTEROID' && tpx >= 12) {
        ctx.fillStyle = '#2a2a22'
        ctx.font = `${Math.max(8, tpx * 0.35)}px serif`
        ctx.textAlign = 'center'
        ctx.fillText('✦', sx + tpx/2, sy + tpx/2 + 4)
      }
      // 성운 텍스처
      if (tile.terrain === 'NEBULA') {
        ctx.fillStyle = 'rgba(100,50,180,0.15)'
        ctx.fillRect(sx + 2, sy + 2, tpx - 4, tpx - 4)
      }
    }
  }

  // Fog of War 오버레이
  if (store.fowEnabled) {
    ctx.fillStyle = 'rgba(0,0,0,0.62)'
    for (let ty = ty0; ty <= ty1; ty++) {
      for (let tx = tx0; tx <= tx1; tx++) {
        if (!store.isTileVisible(tx, ty)) {
          ctx.fillRect(tx * tpx - camX, ty * tpx - camY, tpx, tpx)
        }
      }
    }
  }

  // 이동 가능 하이라이트
  ctx.fillStyle = 'rgba(40,130,255,0.18)'
  ctx.strokeStyle = '#4488ff'
  ctx.lineWidth = 1.5
  for (const c of store.movableCells) {
    const sx = c.x * tpx - camX, sy = c.y * tpx - camY
    if (sx + tpx < 0 || sx > W || sy + tpx < 0 || sy > H) continue
    ctx.fillRect(sx+1, sy+1, tpx-2, tpx-2)
    ctx.strokeRect(sx+1, sy+1, tpx-2, tpx-2)
  }

  // 공격 가능 하이라이트
  ctx.fillStyle = 'rgba(255,60,60,0.18)'
  ctx.strokeStyle = '#ff4444'
  for (const c of store.attackableCells) {
    const sx = c.x * tpx - camX, sy = c.y * tpx - camY
    if (sx + tpx < 0 || sx > W || sy + tpx < 0 || sy > H) continue
    ctx.fillRect(sx+1, sy+1, tpx-2, tpx-2)
    ctx.strokeRect(sx+1, sy+1, tpx-2, tpx-2)
  }

  // 유닛 그리기
  ctx.textAlign = 'center'
  for (const u of store.units) {
    if (!store.isUnitVisible(u)) continue
    // u.px 는 TILE_PX 기준 픽셀 좌표 → zoom 보정
    const sx = (u.px / TILE_PX) * tpx - camX
    const sy = (u.py / TILE_PX) * tpx - camY
    if (sx + tpx < 0 || sx > W || sy + tpx < 0 || sy > H) continue

    const isSelected = u.fleetCode === store.selectedFleet
    const fc = FACTION_COLOR[u.faction] ?? '#888'
    const fbg = FACTION_BG[u.faction] ?? 'rgba(80,80,80,0.7)'

    // 선택 글로우
    if (isSelected) {
      ctx.strokeStyle = 'gold'
      ctx.lineWidth = 2
      ctx.strokeRect(sx - 1, sy - 1, tpx + 2, tpx + 2)
    }

    // 본체
    ctx.fillStyle = fbg
    ctx.beginPath()
    ctx.roundRect(sx + 2, sy + 2, tpx - 4, tpx - 4, 4)
    ctx.fill()
    ctx.strokeStyle = fc
    ctx.lineWidth = 1.5
    ctx.stroke()

    if (tpx >= 10) {
      // 기함 별표
      if (u.role === 'flagship') {
        ctx.fillStyle = 'rgba(255,220,50,0.9)'
        ctx.font = `bold ${Math.max(7, tpx * 0.28)}px sans-serif`
        ctx.fillText('★', sx + tpx - 8, sy + 10)
      }
      // 레이블 (함대명 앞 2자)
      ctx.fillStyle = '#fff'
      ctx.font = `bold ${Math.max(7, tpx * 0.28)}px serif`
      ctx.fillText(u.fleetName.slice(0, 2), sx + tpx/2, sy + tpx/2 - 2)
      // 함선 수
      ctx.fillStyle = '#ddd'
      ctx.font = `${Math.max(6, tpx * 0.24)}px monospace`
      ctx.fillText(fmtShips(u.ships), sx + tpx/2, sy + tpx/2 + tpx * 0.28)
    }

    // 사기 바
    const barW = Math.max(2, tpx - 8)
    ctx.fillStyle = '#111'
    ctx.fillRect(sx + 4, sy + tpx - 6, barW, 3)
    ctx.fillStyle = moraleColor(u.morale)
    ctx.fillRect(sx + 4, sy + tpx - 6, Math.max(0, barW * u.morale / 100), 3)

    // 이동/공격 완료 표시
    if (u.role === 'flagship' && u.moved && u.attacked) {
      ctx.fillStyle = 'rgba(0,0,0,0.4)'
      ctx.fillRect(sx + 2, sy + 2, tpx - 4, tpx - 4)
    }
  }

  // 진영 구분선
  ctx.strokeStyle = 'rgba(30,50,70,0.7)'
  ctx.lineWidth = 1
  ctx.setLineDash([4, 4])
  const sep1x = 3 * tpx - camX, sep2x = (mapW - 3) * tpx - camX
  ctx.beginPath(); ctx.moveTo(sep1x, 0); ctx.lineTo(sep1x, H); ctx.stroke()
  ctx.beginPath(); ctx.moveTo(sep2x, 0); ctx.lineTo(sep2x, H); ctx.stroke()
  ctx.setLineDash([])

  renderMinimap()
}

function renderMinimap() {
  const mc = miniCanvas.value
  if (!mc) return
  const ctx = mc.getContext('2d')
  const MW  = mc.width, MH = mc.height
  const mapW = store.map.width, mapH = store.map.height
  const px = MW / mapW, py = MH / mapH

  ctx.clearRect(0, 0, MW, MH)
  ctx.fillStyle = '#06090f'
  ctx.fillRect(0, 0, MW, MH)

  // 지형
  for (const tile of store.map.tiles) {
    if (tile.terrain === 'SPACE') continue
    ctx.fillStyle = TERRAIN_COLOR[tile.terrain] ?? '#333'
    ctx.fillRect(tile.x * px, tile.y * py, Math.max(1, px), Math.max(1, py))
  }

  // 유닛 (FOW ON 시 탐지된 유닛만)
  for (const u of store.units) {
    if (!store.isUnitVisible(u)) continue
    ctx.fillStyle = FACTION_COLOR[u.faction] ?? '#888'
    ctx.fillRect(u.x * px - 1, u.y * py - 1, Math.max(2, px + 1), Math.max(2, py + 1))
  }

  // 뷰포트 rect
  const canvas = mainCanvas.value
  if (canvas) {
    const tpx = TILE_PX * zoom.value
    const vx = cam.value.x / tpx * px
    const vy = cam.value.y / tpx * py
    const vw = (canvas.width  / tpx) * px
    const vh = (canvas.height / tpx) * py
    ctx.strokeStyle = 'rgba(255,255,255,0.6)'
    ctx.lineWidth = 1
    ctx.strokeRect(vx, vy, vw, vh)
  }
}

// ── rAF 루프 ─────────────────────────────────────────────────
function loop() {
  updateAnimation()
  render()
  rafId = requestAnimationFrame(loop)
}

// ── 캔버스 리사이즈 ──────────────────────────────────────────
function resizeCanvas() {
  const wrap = mapWrap.value
  const canvas = mainCanvas.value
  if (!wrap || !canvas) return
  canvas.width  = wrap.clientWidth
  canvas.height = wrap.clientHeight
}

// ── 좌표 변환 ────────────────────────────────────────────────
function canvasToTile(cx, cy) {
  const tpx = TILE_PX * zoom.value
  return {
    tx: Math.floor((cx + cam.value.x) / tpx),
    ty: Math.floor((cy + cam.value.y) / tpx),
  }
}

function clampCam() {
  const canvas  = mainCanvas.value
  const mapW    = store.map.width
  const mapH    = store.map.height
  const tpx     = TILE_PX * zoom.value
  const fullW   = mapW * tpx
  const fullH   = mapH * tpx
  const maxX    = Math.max(0, fullW  - (canvas?.width  ?? fullW))
  const maxY    = Math.max(0, fullH  - (canvas?.height ?? fullH))
  cam.value.x = Math.max(0, Math.min(cam.value.x, maxX))
  cam.value.y = Math.max(0, Math.min(cam.value.y, maxY))
}

// ── 클릭 ─────────────────────────────────────────────────────
function onCanvasClick(e) {
  if (store.animating || didDrag) { didDrag = false; return }
  const rect = mainCanvas.value.getBoundingClientRect()
  const { tx, ty } = canvasToTile(e.clientX - rect.left, e.clientY - rect.top)

  // 1) 이동 가능 타일 클릭 → 이동
  if (store.isMovable(tx, ty)) {
    store.moveFleetTo(tx, ty)
    return
  }

  // 2) 유닛 클릭
  const unit = store.units.find(u => u.x === tx && u.y === ty)
  if (unit) {
    if (unit.faction === store.playerFaction) {
      store.selectFleet(unit.fleetCode)
    } else {
      // 적 클릭 → 공격 시도
      if (store.selectedFleet && store.isAttackable(tx, ty)) {
        store.attackUnit(unit.unitId)
      }
    }
    return
  }

  // 3) 빈 공간 클릭 → 선택 해제
  store.deselect()
}

function onCanvasRightClick(e) {
  if (store.animating) return
  const rect = mainCanvas.value.getBoundingClientRect()
  const { tx, ty } = canvasToTile(e.clientX - rect.left, e.clientY - rect.top)
  const unit = store.units.find(u => u.x === tx && u.y === ty)
  if (unit && unit.faction !== store.playerFaction && store.selectedFleet) {
    store.setPriorityTarget(unit.unitId)
  }
}

function onMiniClick(e) {
  const mc   = miniCanvas.value
  const rect = mc.getBoundingClientRect()
  const mx   = (e.clientX - rect.left) / mc.width  * store.map.width
  const my   = (e.clientY - rect.top)  / mc.height * store.map.height
  const canvas = mainCanvas.value
  const tpx = TILE_PX * zoom.value
  cam.value.x = mx * tpx - (canvas?.width ?? 0) / 2
  cam.value.y = my * tpx - (canvas?.height ?? 0) / 2
  clampCam()
}

// ── 드래그 패닝 (좌클릭) ─────────────────────────────────────
function onMouseDown(e) {
  if (e.button !== 0) return
  drag = { startX: e.clientX, startY: e.clientY, camX: cam.value.x, camY: cam.value.y }
  didDrag = false
}
function onMouseMove(e) {
  // 호버 타일 갱신 (zoom 반영 — canvasToTile 재사용)
  if (mainCanvas.value) {
    const rect = mainCanvas.value.getBoundingClientRect()
    const { tx, ty } = canvasToTile(e.clientX - rect.left, e.clientY - rect.top)
    hoverTile.value = { x: tx, y: ty }
  }
  if (!drag) return
  const dx = e.clientX - drag.startX
  const dy = e.clientY - drag.startY
  if (!didDrag && (Math.abs(dx) > 4 || Math.abs(dy) > 4)) didDrag = true
  if (didDrag) {
    cam.value.x = drag.camX - dx
    cam.value.y = drag.camY - dy
    clampCam()
  }
}
function onMouseUp() { drag = null }
function onMouseLeave() { drag = null; hoverTile.value = null }

// ── 마우스 휠 줌 ──────────────────────────────────────────────
function onWheel(e) {
  e.preventDefault()
  const rect = mainCanvas.value.getBoundingClientRect()
  applyZoom(e.deltaY < 0 ? 1.15 : 1 / 1.15, e.clientX - rect.left, e.clientY - rect.top)
}

// ── 터치 핀치 줌 ──────────────────────────────────────────────
function onTouchStart(e) {
  if (e.touches.length === 2) {
    pinchDist = Math.hypot(
      e.touches[0].clientX - e.touches[1].clientX,
      e.touches[0].clientY - e.touches[1].clientY
    )
  }
}
function onTouchMove(e) {
  if (e.touches.length !== 2 || pinchDist === null) return
  e.preventDefault()
  const dist = Math.hypot(
    e.touches[0].clientX - e.touches[1].clientX,
    e.touches[0].clientY - e.touches[1].clientY
  )
  const rect = mainCanvas.value.getBoundingClientRect()
  const cx = (e.touches[0].clientX + e.touches[1].clientX) / 2 - rect.left
  const cy = (e.touches[0].clientY + e.touches[1].clientY) / 2 - rect.top
  applyZoom(dist / pinchDist, cx, cy)
  pinchDist = dist
}
function onTouchEnd() { pinchDist = null }

// ── 액션 버튼 ────────────────────────────────────────────────
function autoAttack() {
  if (store.selectedFleet) store._checkAutoEngage(store.selectedFleet)
}
function waitFleet() {
  if (!store.selectedFleet) return
  store.unitsOfFleet(store.selectedFleet).forEach(u => { u.moved = true; u.attacked = true })
  store.deselect()
}
function onEndTurnClick() {
  if (store.phase === 'player' && !store.animating) store.endPlayerTurn()
}

// ── 키보드 ───────────────────────────────────────────────────
const CAM_STEP = TILE_PX * 3
function onKey(e) {
  if (e.key === ' ')        { e.preventDefault(); if (store.phase === 'player') store.endPlayerTurn() }
  if (e.key === 'Escape')   store.deselect()
  if (e.key === 'PageUp')   { e.preventDefault(); const c = mainCanvas.value; applyZoom(1.2, (c?.width??0)/2, (c?.height??0)/2) }
  if (e.key === 'PageDown') { e.preventDefault(); const c = mainCanvas.value; applyZoom(1/1.2, (c?.width??0)/2, (c?.height??0)/2) }
  if (e.key === 'w' || e.key === 'ArrowUp')    { cam.value.y -= CAM_STEP; clampCam() }
  if (e.key === 's' || e.key === 'ArrowDown')  { cam.value.y += CAM_STEP; clampCam() }
  if (e.key === 'a' || e.key === 'ArrowLeft')  { cam.value.x -= CAM_STEP; clampCam() }
  if (e.key === 'd' || e.key === 'ArrowRight') { cam.value.x += CAM_STEP; clampCam() }
}

// ── 뒤로가기 방지 ────────────────────────────────────────────
function onPopState() {
  if (store.phase === 'result') {
    const left = finishTacticalSession(true)
    if (left) { window.removeEventListener('popstate', onPopState); return }
    history.pushState({ ...history.state }, '')
    return
  }
  history.pushState({ ...history.state }, '')
  game.addLog('⚠ [전투] 전투가 끝나기 전에는 전략 화면으로 돌아갈 수 없습니다.')
}

// ── 라이프사이클 ─────────────────────────────────────────────
const resizeObserver = new ResizeObserver(() => { resizeCanvas(); clampCam() })

// ── 작전 회의 ─────────────────────────────────────────────────
function onBriefingConfirm(objectiveCode) {
  const ctx = game._pendingBattles[0]
  if (ctx) {
    if (ctx.playerFaction === ctx.attackerFaction)
      ctx.attackerObjective = objectiveCode
    else
      ctx.defenderObjective = objectiveCode
  }
  showBriefing.value = false
}
function onBriefingSkip() {
  showBriefing.value = false
}

onMounted(() => {
  if (game._pendingBattles.length) {
    const ctx = game._pendingBattles[0]
    if (store.context !== ctx) store.initBattle(ctx)
    showBriefing.value = true
  }

  resizeCanvas()
  if (mapWrap.value) resizeObserver.observe(mapWrap.value)

  // 미니맵 크기 (좌측 패널 너비에 맞춤)
  if (miniCanvas.value) {
    miniCanvas.value.width  = 176
    miniCanvas.value.height = 106
  }

  loop()

  window.addEventListener('keydown', onKey)
  history.pushState({ ...history.state }, '')
  window.addEventListener('popstate', onPopState)
})

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId)
  resizeObserver.disconnect()
  window.removeEventListener('keydown', onKey)
  window.removeEventListener('popstate', onPopState)
})

// ── 결과 처리 ────────────────────────────────────────────────
function finishTacticalSession(useReplace = false) {
  if (store.result) game.applyBattleResult(store.result)
  if (game._pendingBattles.length) {
    store.initBattle(game._pendingBattles[0])
    showBriefing.value = true
    return false
  }
  store.active = false
  if (useReplace) router.replace('/game')
  else router.push('/game')
  return true
}
function returnToCampaign() { finishTacticalSession(false) }
</script>

<style scoped>
.tac-root {
  display: flex; flex-direction: column;
  height: 100vh; overflow: hidden;
  background: var(--bg); color: var(--t1);
}

/* ── 헤더 ─────────────────────────────────────────────────── */
.tac-header {
  display: flex; align-items: center; gap: 12px;
  padding: 8px 14px; border-bottom: 1px solid var(--bd);
  flex-shrink: 0;
}
.tac-title    { font-size: 16px; letter-spacing: 2px; color: var(--tg); white-space: nowrap; }
.tac-info     { display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0; }
.date-badge   { font-size: 12px; color: var(--tg); letter-spacing: .5px; white-space: nowrap; }
.phase-badge  { padding: 2px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; white-space: nowrap; }
.phase-badge.player { background: rgba(41,128,185,0.22); border: 1px solid #2980b9; color: #7ab8e8; }
.phase-badge.ai     { background: rgba(192,57,43,0.18);  border: 1px solid #c0392b; color: #e88; }
.phase-badge.result { background: rgba(218,165,32,0.18); border: 1px solid var(--tg); color: var(--tg); }
.battle-label { font-size: 11px; color: var(--td); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ai-label     { font-size: 12px; color: #e88; white-space: nowrap; animation: pulse 1s infinite; }
.grid-toggle-btn { font-size: 15px; padding: 2px 8px; white-space: nowrap; flex-shrink: 0; line-height: 1; }
.grid-toggle-btn:not(.btn-gold) { opacity: 0.45; }
.grid-icon { font-style: normal; }
.log-toggle-btn { font-size: 11px; padding: 4px 9px; white-space: nowrap; flex-shrink: 0; }
.fow-toggle-btn { font-size: 11px; padding: 4px 9px; white-space: nowrap; flex-shrink: 0; opacity: 0.85; }

/* ── 바디 (position: relative → 로그 overlay 기준) ─────────── */
.tac-body { display: flex; flex: 1; overflow: hidden; position: relative; }

/* ── 전투 기록 오버레이 (float) ─────────────────────────────── */
.tac-log-overlay {
  position: absolute; top: 0; left: 0; right: 0; z-index: 200;
  background: rgba(8,13,22,.94);
  border-bottom: 1px solid var(--bd);
  max-height: 200px;
  backdrop-filter: blur(4px);
}
.log-bar-inner {
  padding: 6px 14px 8px;
  max-height: 200px; overflow-y: auto;
  display: flex; flex-direction: column; gap: 2px;
}
.log-slide-enter-active, .log-slide-leave-active { transition: max-height .22s ease, opacity .18s; overflow: hidden; }
.log-slide-enter-from, .log-slide-leave-to { max-height: 0; opacity: 0; }
.log-slide-enter-to, .log-slide-leave-from  { max-height: 200px; opacity: 1; }

/* ── 좌측 패널 ───────────────────────────────────────────── */
.tac-left {
  width: 200px; flex-shrink: 0;
  display: flex; flex-direction: column; gap: 8px;
  padding: 10px 8px; overflow-y: auto;
  border-right: 1px solid var(--bd);
}
.unit-panel   { padding: 11px; }
.unit-name    { font-size: 13px; font-weight: bold; letter-spacing: 1px; margin-bottom: 3px; }
.unit-faction-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px; }
.unit-faction { font-size: 11px; opacity: 0.75; }
.unit-move-badge {
  font-size: 9px; padding: 1px 5px; border-radius: 3px;
  font-family: var(--font-mono); letter-spacing: .3px;
}
.unit-move-badge.ready { background: rgba(39,174,96,.18); color: #4bc87a; border: 1px solid rgba(39,174,96,.3); }
.unit-move-badge.done  { background: rgba(80,80,80,.18); color: var(--td); border: 1px solid rgba(120,120,120,.2); }

.panel-divider { height: 1px; background: var(--bd); margin: 6px 0; }

/* 기본 정보 */
.info-rows  { display: flex; flex-direction: column; gap: 3px; margin-bottom: 2px; }
.info-row   { display: flex; justify-content: space-between; align-items: center; font-size: 11px; }
.ir-label   { color: var(--td); }
.ir-value   { color: var(--t1); font-family: var(--font-mono); font-size: 10px; }
.ir-gold    { color: var(--tg); font-family: var(--font-serif); font-size: 11px; }
.morale-bar { height: 3px; background: #1a1a2e; border-radius: 3px; overflow: hidden; margin: 1px 0 3px; }
.morale-fill { height: 100%; border-radius: 3px; transition: width .3s; }

/* 함대 능력치 */
.stats-section-title {
  font-size: 10px; color: var(--td); letter-spacing: .5px;
  margin: 2px 0 5px;
}
.fleet-stats { display: flex; flex-direction: column; gap: 4px; margin-bottom: 6px; }
.fs-row     { display: flex; align-items: center; gap: 4px; }
.fs-label   { width: 24px; font-size: 10px; color: var(--td); flex-shrink: 0; font-family: var(--font-serif); }
.fs-bar-wrap { flex: 1; height: 4px; background: rgba(255,255,255,0.07); border-radius: 2px; overflow: hidden; }
.fs-bar     { height: 100%; background: var(--tg); border-radius: 2px; transition: width .3s; }
.fs-val     { width: 20px; font-size: 10px; color: var(--t2); text-align: right; font-family: var(--font-mono); flex-shrink: 0; }

/* 사령관 */
.cmd-line   { display: flex; align-items: baseline; gap: 5px; margin-top: 4px; padding: 4px 6px; background: var(--bg3); border-radius: 4px; }
.cmd-label  { font-size: 9px; color: var(--td); flex-shrink: 0; }
.cmd-name   { font-size: 12px; font-weight: bold; color: var(--t1); }
.no-cmd-txt { font-size: 10px; color: var(--td); text-align: center; margin-bottom: 6px; }

.hint-btn   { width: 100%; margin-top: 6px; font-size: 11px; }
.no-sel     { min-height: 100px; display: flex; align-items: center; justify-content: center; }
.no-sel-txt { text-align: center; color: var(--td); font-size: 11px; line-height: 1.8; }
.hint       { font-size: 10px; opacity: 0.6; }
.strength-panel { padding: 9px 8px; }
.sp-title { font-size: 11px; color: var(--td); margin-bottom: 7px; text-align: center; letter-spacing: .5px; }

/* 통합 게이지 바 */
.sp-gauge {
  display: flex; height: 8px;
  border-radius: 4px; overflow: hidden;
  background: var(--bg4);
  margin-bottom: 8px;
  gap: 1px;
}
.sp-gauge-red  { background: var(--REH); transition: width .6s ease; border-radius: 4px 0 0 4px; }
.sp-gauge-blue { background: var(--FPA); transition: width .6s ease; border-radius: 0 4px 4px 0; }

.sp-row   { display: flex; align-items: center; gap: 6px; font-size: 11px; margin-bottom: 3px; padding: 0 2px; }
.sp-name  { flex: 1; font-family: var(--font-serif); font-size: 12px; }
.sp-count { color: var(--td); font-size: 10px; font-family: var(--font-mono); }

/* 미니맵 (좌측 패널) */
.mini-wrap    { padding: 8px; }
.mini-title   { font-size: 10px; color: var(--td); margin-bottom: 5px; }
.mini-canvas  { display: block; width: 100%; border: 1px solid var(--bd); border-radius: 4px; cursor: pointer; image-rendering: pixelated; }

/* ── 중앙 Canvas ─────────────────────────────────────────── */
.tac-map-wrap { flex: 1; position: relative; overflow: hidden; background: #020509; }
.tac-canvas   { display: block; width: 100%; height: 100%; cursor: crosshair; }
.cam-hint     { position: absolute; left: 8px; bottom: 22px; font-size: 10px; color: rgba(255,255,255,0.25); pointer-events: none; }
.tile-coord   { position: absolute; left: 8px; bottom: 6px; font-size: 10px; font-family: var(--font-mono); color: rgba(255,255,255,0.45); pointer-events: none; letter-spacing: .3px; }

/* 좌측 패널 토글 */
.left-panel-toggle {
  position: absolute; left: 0; top: 50%; transform: translateY(-50%);
  z-index: 50; width: 16px; height: 48px;
  background: rgba(10,16,24,.88); border: 1px solid var(--bd); border-left: none;
  color: var(--td); cursor: pointer; font-size: 10px;
  display: flex; align-items: center; justify-content: center;
  border-radius: 0 var(--r) var(--r) 0; transition: all .15s;
}
.left-panel-toggle:hover { border-color: var(--tg); color: var(--tg); }

/* ── 로그 텍스트 ─────────────────────────────────────────── */
.log-entry  { font-size: 10px; line-height: 1.5; color: var(--t2); word-break: break-all; }
.log-sep    { color: var(--td); text-align: center; }
.log-win    { color: var(--tg); font-weight: bold; }
.log-lose   { color: #c0392b; font-weight: bold; }
.log-kill   { color: #e67e22; }
.log-move   { color: #3498db; }

/* ── 하단 액션 바 (StrategyBar 참조) ────────────────────── */
.tac-bottom {
  flex-shrink: 0;
  display: flex; align-items: stretch;
  height: clamp(44px, 7vh, 60px);
  background: linear-gradient(165deg, #0d1b2a 0%, #0a0f1c 60%, #060a10 100%);
  border-top: 2px solid rgba(212,170,96,.5);
  box-shadow: 0 -8px 32px rgba(0,0,0,.8), inset 0 1px 0 rgba(212,170,96,.08);
}
.tac-actions {
  flex: 1; display: flex;
}
.tac-act-btn {
  flex: 1; padding: 0;
  position: relative; overflow: hidden;
  background: none; border: none;
  border-right: 1px solid rgba(212,170,96,.08);
  color: rgba(255,255,255,.7);
  font-size: clamp(11px, 1.8vh, 16px); font-family: var(--font-serif);
  letter-spacing: .5px; cursor: pointer;
  transition: color .18s, background .18s;
}
.tac-act-btn:last-child { border-right: 1px solid rgba(212,170,96,.2); }
.tac-act-btn:hover:not(:disabled) { color: #fff; background: rgba(212,170,96,.04); }
.tac-act-btn:disabled { opacity: .35; cursor: default; }

/* 턴 종료 버튼 */
.tac-end-btn {
  flex-shrink: 0; padding: 0 clamp(14px, 3vw, 28px);
  position: relative; overflow: hidden;
  border-radius: 0; border: none;
  border-left: 2px solid rgba(212,170,96,.4);
  font-size: clamp(11px, 1.8vh, 17px); font-family: var(--font-serif);
  letter-spacing: 1.2px; align-self: stretch;
  background: linear-gradient(180deg, rgba(13,27,42,.6) 0%, transparent 100%);
  transition: all .18s; cursor: pointer;
  display: flex; align-items: center; gap: 8px;
}
.tac-end-btn.btn-red   { color: var(--REH); }
.tac-end-btn.btn-blue  { color: var(--FPA); }
.tac-end-btn.btn-green { color: var(--PZN); }
.tac-end-btn:hover:not(:disabled) { text-shadow: 0 0 12px currentColor; }
.tac-end-btn:disabled { opacity: .4; cursor: default; }
.kbd { font-size: 9px; background: rgba(255,255,255,.12); border-radius: 3px; padding: 1px 4px; }

/* 페이션 테마 */
.theme-REH .tac-end-btn { color: var(--REH); }
.theme-FPA .tac-end-btn { color: var(--FPA); }
.theme-PZN .tac-end-btn { color: var(--PZN); }

/* ── 결과 오버레이 ─────────────────────────────────────── */
.result-overlay {
  position: fixed; inset: 0; z-index: 3000;
  background: rgba(2,5,8,.92);
  display: flex; align-items: center; justify-content: center;
  backdrop-filter: blur(8px);
}
.result-box   { display: flex; flex-direction: column; align-items: center; gap: 16px; padding: 44px 52px; text-align: center; min-width: 260px; }
.result-icon  { font-size: 56px; }
.result-title { font-size: 32px; letter-spacing: 3px; }
.result-stats { width: 100%; display: flex; flex-direction: column; gap: 6px; }
.rs-row       { display: flex; justify-content: space-between; font-size: 13px; }
.rs-val       { font-weight: bold; color: var(--tg); }
.btn-return   { padding: 11px 26px; font-size: 14px; letter-spacing: 1px; }

@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
.fade-enter-active,.fade-leave-active { transition: opacity .4s }
.fade-enter-from,.fade-leave-to { opacity: 0 }
</style>
