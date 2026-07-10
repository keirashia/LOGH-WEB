<template>
  <div class="tac-root">

    <!-- 헤더 -->
    <div class="tac-header">
      <div class="tac-title serif">전술전투</div>
      <div class="tac-info">
        <span class="date-badge serif">{{ battleDate }}</span>
        <span :class="['phase-badge', store.phase]">{{ phaseLabel }}</span>
        <span v-if="store.context" class="battle-label">
          {{ factionLabel(store.context.attackerFaction) }} vs {{ factionLabel(defFaction) }}
        </span>
      </div>
      <div v-if="store.phase === 'ai'" class="ai-label">AI 행동 중…</div>
      <!-- 로그 토글 -->
      <button class="btn log-toggle-btn" @click="logOpen = !logOpen">
        전투 기록 {{ logOpen ? '▲' : '▼' }}
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

      <!-- 좌측 패널 -->
      <div class="tac-left">
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
          <div v-for="grp in store.unitGroups" :key="grp.faction" class="sp-row">
            <span class="sp-name" :class="`fc-${grp.faction}`">{{ factionShort(grp.faction) }}</span>
            <span class="sp-count">{{ grp.ships.toLocaleString() }}척</span>
          </div>
        </div>

        <template v-if="store.selectedFlagship">
          <div class="panel unit-panel">
            <div class="unit-name serif">{{ store.selectedFlagship.fleetName }}</div>
            <div class="unit-faction" :class="`fc-${store.selectedFlagship.faction}`">
              {{ factionLabel(store.selectedFlagship.faction) }}
            </div>

            <div class="stat-rows">
              <div class="stat-row">
                <span class="sl">BU 수</span>
                <span class="sv">{{ store.unitsOfFleet(store.selectedFleet).length }}부대</span>
              </div>
              <div class="stat-row">
                <span class="sl">총 함선</span>
                <span class="sv">{{ totalShips.toLocaleString() }}척</span>
              </div>
              <div class="morale-bar">
                <div class="morale-fill" :style="{ width: store.selectedFlagship.morale + '%', background: moraleColor(store.selectedFlagship.morale) }"></div>
              </div>
              <div class="stat-row">
                <span class="sl">사기</span>
                <span class="sv">{{ store.selectedFlagship.morale }}</span>
              </div>
              <div class="stat-row">
                <span class="sl">이동</span>
                <span class="sv">{{ store.selectedFlagship.moved ? '완료' : '가능' }}</span>
              </div>
            </div>

            <div v-if="selectedCommander" class="commander-row">
              <div class="c-info">
                <div class="c-name">{{ selectedCommander.name }}</div>
                <div class="c-rank">지휘 {{ selectedCommander.statCmd }}</div>
              </div>
            </div>

            <div class="fm-title">현재 진형</div>
            <div class="fm-current">{{ FORMATIONS[store.selectedFlagship.formation]?.name ?? '—' }}</div>
            <div v-if="curFm" class="fm-desc">
              공격 ×{{ curFm.offMod.toFixed(2) }} &nbsp; 방어 ×{{ curFm.defMod.toFixed(2) }}<br/>
              사거리 ±{{ curFm.rangeMod >= 0 ? '+':'' }}{{ curFm.rangeMod }} &nbsp; 속도 ×{{ curFm.speedMod.toFixed(1) }}
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
          @mouseleave="onMouseUp"
        />
        <!-- 카메라 힌트 -->
        <div class="cam-hint">WASD / 드래그: 카메라 이동</div>
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
import { CHARACTERS, FACTIONS } from '@/data/masterData'

const router = useRouter()
const store  = useTacticalStore()
const game   = useGameStore()

// ── refs ─────────────────────────────────────────────────────
const mapWrap    = ref(null)
const mainCanvas = ref(null)
const miniCanvas = ref(null)
const logOpen    = ref(false)

// ── 카메라 ───────────────────────────────────────────────────
const cam = ref({ x: 0, y: 0 })     // 뷰포트 픽셀 오프셋
let drag = null                       // { startX, startY, camX, camY }

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
  const total = store.unitGroups.reduce((s, g) => s + g.ships, 0)
  if (!total) return 0
  const grp = store.unitGroups.find(g => g.faction === factionId)
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
const curFm = computed(() => store.selectedFlagship ? FORMATIONS[store.selectedFlagship.formation] : null)
const selectedCommander = computed(() => {
  const code = store.selectedFlagship?.commander
  return code ? CHARACTERS[code] : null
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

  ctx.clearRect(0, 0, W, H)

  // 가시 타일 범위
  const tx0 = Math.max(0, Math.floor(camX / TILE_PX))
  const ty0 = Math.max(0, Math.floor(camY / TILE_PX))
  const tx1 = Math.min(mapW - 1, Math.ceil((camX + W) / TILE_PX))
  const ty1 = Math.min(mapH - 1, Math.ceil((camY + H) / TILE_PX))

  // 지형 그리기
  for (let ty = ty0; ty <= ty1; ty++) {
    for (let tx = tx0; tx <= tx1; tx++) {
      const tile = store.tileAt(tx, ty)
      const sx = tx * TILE_PX - camX
      const sy = ty * TILE_PX - camY
      ctx.fillStyle = TERRAIN_COLOR[tile.terrain] ?? TERRAIN_COLOR.SPACE
      ctx.fillRect(sx, sy, TILE_PX, TILE_PX)
      // 격자선
      ctx.strokeStyle = '#0d1117'
      ctx.lineWidth = 0.5
      ctx.strokeRect(sx, sy, TILE_PX, TILE_PX)
      // 소행성 텍스처
      if (tile.terrain === 'ASTEROID') {
        ctx.fillStyle = '#2a2a22'
        ctx.font = '10px serif'
        ctx.textAlign = 'center'
        ctx.fillText('✦', sx + TILE_PX/2, sy + TILE_PX/2 + 4)
      }
      // 성운 텍스처
      if (tile.terrain === 'NEBULA') {
        ctx.fillStyle = 'rgba(100,50,180,0.15)'
        ctx.fillRect(sx + 2, sy + 2, TILE_PX - 4, TILE_PX - 4)
      }
    }
  }

  // 이동 가능 하이라이트
  ctx.fillStyle = 'rgba(40,130,255,0.18)'
  ctx.strokeStyle = '#4488ff'
  ctx.lineWidth = 1.5
  for (const c of store.movableCells) {
    const sx = c.x * TILE_PX - camX, sy = c.y * TILE_PX - camY
    if (sx + TILE_PX < 0 || sx > W || sy + TILE_PX < 0 || sy > H) continue
    ctx.fillRect(sx+1, sy+1, TILE_PX-2, TILE_PX-2)
    ctx.strokeRect(sx+1, sy+1, TILE_PX-2, TILE_PX-2)
  }

  // 공격 가능 하이라이트
  ctx.fillStyle = 'rgba(255,60,60,0.18)'
  ctx.strokeStyle = '#ff4444'
  for (const c of store.attackableCells) {
    const sx = c.x * TILE_PX - camX, sy = c.y * TILE_PX - camY
    if (sx + TILE_PX < 0 || sx > W || sy + TILE_PX < 0 || sy > H) continue
    ctx.fillRect(sx+1, sy+1, TILE_PX-2, TILE_PX-2)
    ctx.strokeRect(sx+1, sy+1, TILE_PX-2, TILE_PX-2)
  }

  // 유닛 그리기
  ctx.textAlign = 'center'
  for (const u of store.units) {
    const sx = u.px - camX, sy = u.py - camY
    if (sx + TILE_PX < 0 || sx > W || sy + TILE_PX < 0 || sy > H) continue

    const isSelected = u.fleetCode === store.selectedFleet
    const fc = FACTION_COLOR[u.faction] ?? '#888'
    const fbg = FACTION_BG[u.faction] ?? 'rgba(80,80,80,0.7)'

    // 선택 글로우
    if (isSelected) {
      ctx.strokeStyle = 'gold'
      ctx.lineWidth = 2
      ctx.strokeRect(sx - 1, sy - 1, TILE_PX + 2, TILE_PX + 2)
    }

    // 본체
    ctx.fillStyle = fbg
    ctx.beginPath()
    ctx.roundRect(sx + 2, sy + 2, TILE_PX - 4, TILE_PX - 4, 4)
    ctx.fill()
    ctx.strokeStyle = fc
    ctx.lineWidth = 1.5
    ctx.stroke()

    // 기함 별표
    if (u.role === 'flagship') {
      ctx.fillStyle = 'rgba(255,220,50,0.9)'
      ctx.font = 'bold 9px sans-serif'
      ctx.fillText('★', sx + TILE_PX - 8, sy + 10)
    }

    // 레이블 (함대명 앞 2자)
    ctx.fillStyle = '#fff'
    ctx.font = 'bold 9px serif'
    ctx.fillText(u.fleetName.slice(0, 2), sx + TILE_PX/2, sy + TILE_PX/2 - 2)

    // 함선 수
    ctx.fillStyle = '#ddd'
    ctx.font = '8px monospace'
    ctx.fillText(fmtShips(u.ships), sx + TILE_PX/2, sy + TILE_PX/2 + 9)

    // 사기 바
    const barW = TILE_PX - 8
    ctx.fillStyle = '#111'
    ctx.fillRect(sx + 4, sy + TILE_PX - 7, barW, 3)
    ctx.fillStyle = moraleColor(u.morale)
    ctx.fillRect(sx + 4, sy + TILE_PX - 7, Math.max(0, barW * u.morale / 100), 3)

    // 이동/공격 완료 표시
    if (u.role === 'flagship' && u.moved && u.attacked) {
      ctx.fillStyle = 'rgba(0,0,0,0.4)'
      ctx.fillRect(sx + 2, sy + 2, TILE_PX - 4, TILE_PX - 4)
    }
  }

  // 진영 구분선
  ctx.strokeStyle = 'rgba(30,50,70,0.7)'
  ctx.lineWidth = 1
  ctx.setLineDash([4, 4])
  const sep1x = 3 * TILE_PX - camX, sep2x = (mapW - 3) * TILE_PX - camX
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

  // 유닛
  for (const u of store.units) {
    ctx.fillStyle = FACTION_COLOR[u.faction] ?? '#888'
    ctx.fillRect(u.x * px - 1, u.y * py - 1, Math.max(2, px + 1), Math.max(2, py + 1))
  }

  // 뷰포트 rect
  const canvas = mainCanvas.value
  if (canvas) {
    const vx = cam.value.x / TILE_PX * px
    const vy = cam.value.y / TILE_PX * py
    const vw = (canvas.width  / TILE_PX) * px
    const vh = (canvas.height / TILE_PX) * py
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
  return {
    tx: Math.floor((cx + cam.value.x) / TILE_PX),
    ty: Math.floor((cy + cam.value.y) / TILE_PX),
  }
}

function clampCam() {
  const canvas  = mainCanvas.value
  const mapW    = store.map.width
  const mapH    = store.map.height
  const fullW   = mapW * TILE_PX
  const fullH   = mapH * TILE_PX
  const maxX    = Math.max(0, fullW  - (canvas?.width  ?? fullW))
  const maxY    = Math.max(0, fullH  - (canvas?.height ?? fullH))
  cam.value.x = Math.max(0, Math.min(cam.value.x, maxX))
  cam.value.y = Math.max(0, Math.min(cam.value.y, maxY))
}

// ── 클릭 ─────────────────────────────────────────────────────
function onCanvasClick(e) {
  if (store.animating) return
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
  cam.value.x = mx * TILE_PX - (canvas?.width ?? 0) / 2
  cam.value.y = my * TILE_PX - (canvas?.height ?? 0) / 2
  clampCam()
}

// ── 드래그 패닝 ──────────────────────────────────────────────
function onMouseDown(e) {
  if (e.button !== 1 && e.button !== 2) return   // 중간 or 우클릭만 드래그
  drag = { startX: e.clientX, startY: e.clientY, camX: cam.value.x, camY: cam.value.y }
}
function onMouseMove(e) {
  if (!drag) return
  cam.value.x = drag.camX - (e.clientX - drag.startX)
  cam.value.y = drag.camY - (e.clientY - drag.startY)
  clampCam()
}
function onMouseUp() { drag = null }

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
  if (e.key === ' ')      { e.preventDefault(); if (store.phase === 'player') store.endPlayerTurn() }
  if (e.key === 'Escape') store.deselect()
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

onMounted(() => {
  if (game._pendingBattles.length && !store.active) {
    store.initBattle(game._pendingBattles[0])
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
.log-toggle-btn { font-size: 11px; padding: 4px 9px; white-space: nowrap; flex-shrink: 0; }

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
.unit-name    { font-size: 13px; font-weight: bold; letter-spacing: 1px; }
.unit-faction { font-size: 11px; margin: 2px 0 6px; opacity: 0.7; }
.stat-rows    { display: flex; flex-direction: column; gap: 3px; margin-bottom: 6px; }
.stat-row     { display: flex; justify-content: space-between; font-size: 11px; }
.sl           { color: var(--td); }
.sv           { color: var(--t1); }
.morale-bar   { height: 4px; background: #1a1a2e; border-radius: 3px; overflow: hidden; margin: 2px 0; }
.morale-fill  { height: 100%; border-radius: 3px; transition: width .3s; }
.commander-row { background: var(--bg3); border-radius: 5px; padding: 5px 8px; margin-bottom: 6px; }
.c-name { font-size: 12px; font-weight: bold; }
.c-rank { font-size: 10px; color: var(--td); }
.fm-title   { font-size: 10px; color: var(--td); margin: 3px 0 2px; }
.fm-current { font-size: 12px; font-weight: bold; color: var(--tg); margin-bottom: 3px; font-family: var(--font-serif); }
.fm-desc    { font-size: 10px; line-height: 1.5; color: var(--td); background: var(--bg3); border-radius: 4px; padding: 4px 6px; }
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
.cam-hint     { position: absolute; left: 8px; bottom: 8px; font-size: 10px; color: rgba(255,255,255,0.25); pointer-events: none; }

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
