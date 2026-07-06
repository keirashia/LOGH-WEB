<template>
  <div class="sc-wrap">
    <StarfieldCanvas :star-count="220" :neb-colors="['rgba(41,128,185,', 'rgba(100,50,180,']" />

    <Transition :name="transDir" mode="out-in">

      <!-- ── Stage 1: 국가 선택 ───────────────────────────────── -->
      <div v-if="stage === 'faction'" key="faction" class="layout">

        <div class="title-block">
          <span class="serif gold title-main">국가 선택</span>
          <span class="mono dim title-sub">{{ cur.nameKr }}</span>
        </div>

        <div
          class="faction-row"
          :class="{ grabbing: fcDragging }"
          ref="factionRowRef"
          @mousedown="fcDragStart"
          @mousemove="fcDragMove"
          @mouseup="fcDragEnd"
          @mouseleave="fcDragEnd"
          @touchstart.passive="fcDragStart"
          @touchmove.prevent="fcDragMove"
          @touchend="fcDragEnd"
          @wheel.prevent="fcWheel"
        >
          <!-- 전체 -->
          <button class="fc-card fc-all"
                  :class="{ active: pickedFaction === null }"
                  draggable="false"
                  @click="fcPick(null)">
            <div class="fc-slices">
              <div v-for="fid in cur.factions" :key="fid"
                   class="fc-slice"
                   :style="{ backgroundImage: `url(/img/factions/${fid}.png)` }" />
            </div>
            <div class="fc-overlay" />
            <div class="fc-info"><span class="fc-name serif">전체</span></div>
          </button>

          <button v-for="fid in cur.factions" :key="fid"
                  class="fc-card"
                  :class="{ active: pickedFaction === fid }"
                  :style="{ backgroundImage: `url(/img/factions/${fid}.png)` }"
                  draggable="false"
                  @click="fcPick(fid)">
            <div class="fc-overlay" />
            <div class="fc-info">
              <span class="fc-faction-tag mono"
                    :style="{ color: fcolor(fid), borderColor: fcolor(fid) + '66' }">
                {{ fid }}
              </span>
              <span class="fc-name serif">{{ factionNamesMap[fid]?.name ?? fid }}</span>
            </div>
          </button>
        </div>

        <div class="footer">
          <button class="footer-btn" @click="router.back()">
            <span class="mono">← 뒤로</span>
          </button>
          <button class="footer-btn gold-btn" @click="goToChar">
            <span class="mono">다음 →</span>
          </button>
        </div>

      </div>

      <!-- ── Stage 2: 인물 선택 ───────────────────────────────── -->
      <div v-else key="char" class="layout layout-char">

        <div class="title-block">
          <span class="serif gold title-main">
            {{ factionFilter ? (factionNamesMap[factionFilter]?.name ?? factionFilter) : '전체' }}
          </span>
          <span class="mono dim title-sub">인물 선택 · {{ cur.nameKr }}</span>
        </div>

        <!-- 검색 -->
        <div class="search-row">
          <input class="search-input mono" v-model="q" placeholder="이름 검색..." />
          <span class="search-count dim mono">{{ sortedFilteredChars.length }}명</span>
        </div>

        <!-- 테이블 헤더 -->
        <div class="cl-header">
          <div />
          <div class="cl-th mono">이름</div>
          <div class="cl-th mono">직업</div>
          <div class="cl-th mono">고유트레잇</div>
          <div />
          <div />
        </div>

        <!-- 인물 리스트 -->
        <div class="cl-list">
          <div v-if="!sortedFilteredChars.length" class="cl-empty dim mono">검색 결과 없음</div>
          <div
            v-for="ch in sortedFilteredChars" :key="ch.code"
            class="cl-item"
            :class="{ active: selChar?.code === ch.code }"
            @click="selChar = ch"
          >
            <div class="cl-img-wrap">
              <img :src="charImgSrc(ch.code)" class="cl-img"
                   @error="handleCharImgError($event, ch.code, 'H')" />
            </div>
            <div class="cl-info">
              <div class="serif cl-name">{{ namesMap[ch.code]?.name ?? ch.code }}</div>
              <div class="mono dim cl-nick">{{ namesMap[ch.code]?.nick ?? '' }}</div>
            </div>
            <div class="cl-job mono">{{ charJobMap[ch.code] || '—' }}</div>
            <div class="cl-trait serif">{{ charUniqueTraitMap[ch.code] || '—' }}</div>
            <span class="cl-rec mono">{{ ch.recommend > 0 ? '★' : '' }}</span>
            <span class="cl-dot" :style="{ background: fcolor(ch.faction) }" />
          </div>
        </div>

        <!-- 선택된 인물 상세 -->
        <Transition name="sel-bar-fade">
          <div v-if="selChar" class="char-detail-panel" :class="{ collapsed: !detailExpanded }">
            <button class="detail-toggle mono" @click="detailExpanded = !detailExpanded">
              <span>{{ namesMap[selChar.code]?.name ?? selChar.code }}</span>
              <span class="toggle-arrow">{{ detailExpanded ? '▼' : '▲' }}</span>
            </button>
            <div v-show="detailExpanded" class="detail-body">
              <CharDetailComp :cha-code="selChar.code" :scenario-id="cur.id" />
            </div>
          </div>
        </Transition>

        <div class="footer">
          <button class="footer-btn" @click="goBackToFaction">
            <span class="mono">← 뒤로</span>
          </button>
          <button class="footer-btn gold-btn" :disabled="!selChar" @click="onNext">
            <span class="mono">게임 시작</span>
          </button>
        </div>

      </div>

    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue'

import { useRoute, useRouter } from 'vue-router'
import { SCENARIOS } from '@/data/scenario/scenarioData.js'
import { useLobbyStore } from '@/stores/lobbyStore'
import { useGameStore } from '@/stores/gameStore'
import { FACTIONS } from '@/data/masterData'
import { FACTION_NAMES } from '@/data/base/factions/factionName.js'
import { charImgSrc, handleCharImgError } from '@/utils/charImg.js'
import {
  CHAR_BASE, CHAR_JOBS, JOB_MAP,
  CHAR_NAMES_MAP as namesMap,
  CHAR_UNIQUE_TRAIT_MAP as charUniqueTraitMap,
} from '@/utils/charUtils.js'
import StarfieldCanvas from '@/components/common/StarfieldCanvas.vue'
import CharDetailComp from '@/components/char/CharDetailComp.vue'

const route  = useRoute()
const router = useRouter()
const lobby  = useLobbyStore()
const game   = useGameStore()

const cur     = computed(() => SCENARIOS.find(s => s.id === route.params.scId) ?? SCENARIOS[0])
const options = computed(() => lobby.options)

const factionNamesMap = Object.fromEntries(
  FACTION_NAMES.filter(n => n.lang === 'Kr').map(n => [n.factionId, n])
)

// 시나리오 오버라이드 직업 반영 (base + 시나리오 덮어쓰기)
const effectiveCharJobs = computed(() => {
  const scJobs = game._preloadedData?.charJobs
  if (!scJobs?.length) return CHAR_JOBS
  const overridden = new Set(scJobs.map(j => j.charCode))
  return [...scJobs, ...CHAR_JOBS.filter(j => !overridden.has(j.charCode))]
})

const charJobMap = computed(() => Object.fromEntries(
  CHAR_BASE.map(c => {
    const primary = effectiveCharJobs.value
      .filter(j => j.charCode === c.code)
      .sort((a, b) => a.jobStDate - b.jobStDate)[0]
    return [c.code, primary ? (JOB_MAP[primary.jobCode]?.name?.find(e => e.code === 'Kr')?.context ?? '') : '']
  })
))

const stage         = ref('faction')
const transDir      = ref('slide-forward')
const pickedFaction = ref(null)
const factionFilter = ref(null)

// 국가 카드 드래그/스와이프/휠
const factionRowRef = ref(null)
const fcDragging    = ref(false)
let fcStartX = 0, fcScrollLeft = 0, fcDist = 0
let fcWheelLocked = false

const fcCards = computed(() => [null, ...(cur.value?.factions ?? [])])
const fcCurrentIdx = ref(0)

function fcScrollTo(idx) {
  const el = factionRowRef.value
  if (!el) return
  const cards = el.querySelectorAll('.fc-card')
  if (!cards[idx]) return
  const card    = cards[idx]
  const rowRect = el.getBoundingClientRect()
  const cardRect = card.getBoundingClientRect()
  const offset  = cardRect.left - rowRect.left + el.scrollLeft - (rowRect.width - cardRect.width) / 2
  el.scrollTo({ left: offset, behavior: 'smooth' })
}

function fcPx(e) { return e.touches ? e.touches[0].clientX : e.clientX }

function fcDragStart(e) {
  fcDragging.value = true
  fcDist = 0
  fcStartX = fcPx(e)
  fcScrollLeft = factionRowRef.value?.scrollLeft ?? 0
}
function fcDragMove(e) {
  if (!fcDragging.value) return
  const x = fcPx(e)
  const dx = fcStartX - x
  fcDist = Math.abs(dx)
  if (factionRowRef.value) factionRowRef.value.scrollLeft = fcScrollLeft + dx
}
function fcDragEnd() { fcDragging.value = false }

function fcWheel(e) {
  if (fcWheelLocked) return
  const next = fcCurrentIdx.value + (e.deltaY > 0 ? 1 : -1)
  if (next < 0 || next >= fcCards.value.length) return
  fcCurrentIdx.value = next
  pickedFaction.value = fcCards.value[next]
  fcScrollTo(next)
  fcWheelLocked = true
  setTimeout(() => { fcWheelLocked = false }, 400)
}

function fcPick(fid) {
  if (fcDist >= 5) return
  pickedFaction.value = fid
  const idx = fcCards.value.indexOf(fid)
  if (idx !== -1) { fcCurrentIdx.value = idx; fcScrollTo(idx) }
}

const selChar        = ref(null)
const charList       = ref([])
const q              = ref('')
const detailExpanded = ref(true)

watchEffect(async () => {
  if (!cur.value?.id) return
  try {
    const [y, m, s] = cur.value.id.split('_')
    const mod = await import(`@/data/scenario/${y}/${m}/${s}/characters/charactersData.js`)
    charList.value = mod.CHAR_LIST
  } catch {
    charList.value = []
  }
})

function isAliveAt(char, yearType, year) {
  if (char.birth) {
    const [bType, bRest] = char.birth.split('|')
    if (bType === yearType && !isNaN(parseInt(bRest)) && parseInt(bRest) > year) return false
  }
  if (char.death) {
    const [dType, dRest] = char.death.split('|')
    if (dType === yearType && !isNaN(parseInt(dRest)) && parseInt(dRest) < year) return false
  }
  return true
}

const factionSet = computed(() => new Set(cur.value?.factions ?? []))

const scenarioChars = computed(() => {
  const listedMap = Object.fromEntries(charList.value.map(c => [c.charCode, c]))
  const isFact    = options.value.npcAppearance === 'fact'
  const { yearType, year } = cur.value ?? {}

  return CHAR_BASE
    .map(c => {
      const entry = listedMap[c.code]
      return { ...c, faction: entry?.faction || c.faction, recommend: entry?.recommend ?? 0 }
    })
    .filter(c => {
      if (!factionSet.value.has(c.faction) && !listedMap[c.code]) return false
      if (isFact && yearType && year && !isAliveAt(c, yearType, year)) return false
      if (factionFilter.value && c.faction !== factionFilter.value) return false
      return true
    })
})

const leadChars = computed(() =>
  scenarioChars.value
    .filter(c => c.recommend > 0)
    .sort((a, b) => a.recommend - b.recommend)
)

const sortedFilteredChars = computed(() => {
  const kw = q.value.trim().toLowerCase()
  const list = kw
    ? scenarioChars.value.filter(c => {
        const e = namesMap[c.code]
        return e?.searchTokens?.some(t => t.toLowerCase().includes(kw))
      })
    : scenarioChars.value
  return [...list].sort((a, b) => {
    const ra = a.recommend > 0 ? a.recommend : Infinity
    const rb = b.recommend > 0 ? b.recommend : Infinity
    return ra - rb
  })
})

function fcolor(faction) {
  return FACTIONS[faction]?.color ?? 'var(--t2)'
}

function goToChar() {
  factionFilter.value = pickedFaction.value
  transDir.value = 'slide-forward'
  stage.value = 'char'
  q.value = ''
  selChar.value = leadChars.value[0] ?? scenarioChars.value[0] ?? null
}

function goBackToFaction() {
  transDir.value = 'slide-back'
  stage.value = 'faction'
  selChar.value = null
}

async function onNext() {
  if (!selChar.value) return
  await game.startGame(cur.value.id, selChar.value.faction, selChar.value.code)
  router.push({ name: 'game' })
}
</script>

<style scoped>
.sc-wrap {
  position: relative;
  width: 100%; height: 100%;
  display: flex; align-items: center; justify-content: center;
  overflow: hidden;
  background: #020508;
}

/* ── 공통 레이아웃 ────────────────────────────────────────── */
.layout {
  position: absolute; inset: 0;
  display: flex; flex-direction: column; align-items: center;
  gap: 3vh;
  padding: 4vh 24px 2vh;
  overflow: hidden;
}
.layout-char { gap: 1.4vh; }

/* ── 타이틀 ────────────────────────────────────────────────── */
.title-block {
  flex-shrink: 0;
  display: flex; flex-direction: column; align-items: center; gap: 6px;
}
.title-main {
  font-size: 2.4vh;
  letter-spacing: 0.4vw;
  text-shadow: 0 0 16px rgba(212,170,96,.45);
}
.title-sub { font-size: 1.5vh; }

/* ── 국가 카드 ─────────────────────────────────────────────── */
.faction-row {
  flex: 1; min-height: 0;
  display: flex; gap: 16px; align-items: center;
  width: 100%; overflow-x: auto;
  scrollbar-width: none;
  padding: 8px 5vw;
  cursor: grab; user-select: none;
  scroll-snap-type: x mandatory;
}
.faction-row::-webkit-scrollbar { display: none; }
.faction-row.grabbing { cursor: grabbing; }

.fc-card {
  flex-shrink: 0;
  position: relative;
  height: 32vh;
  aspect-ratio: 5 / 7;
  scroll-snap-align: center;
  background: #0d1520 center / cover no-repeat;
  border: 2px solid rgba(212,170,96,.7);
  border-radius: 14px;
  box-shadow:
    inset 0 0 0 5px #0d1520,
    inset 0 0 0 7px rgba(212,170,96,.18),
    0 8px 32px rgba(0,0,0,.85);
  cursor: pointer;
  transition: transform .22s, box-shadow .22s, border-color .22s;
  overflow: hidden;
}
.fc-card::before {
  content: ''; position: absolute; inset: 0; pointer-events: none; z-index: 1;
  background-image:
    repeating-linear-gradient( 45deg, transparent, transparent 10px, rgba(212,170,96,.02) 10px, rgba(212,170,96,.02) 11px),
    repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(212,170,96,.02) 10px, rgba(212,170,96,.02) 11px);
}
.fc-card.active {
  border-color: rgba(212,170,96,1);
  transform: translateY(-8px) scale(1.03);
  box-shadow:
    inset 0 0 0 5px #0d1520,
    inset 0 0 0 7px rgba(212,170,96,.55),
    0 20px 56px rgba(212,170,96,.3);
}

.fc-all { background: none; }
.fc-slices { position: absolute; inset: 0; display: flex; z-index: 0; }
.fc-slice  { flex: 1; height: 100%; background-size: cover; background-position: center; }

.fc-overlay {
  position: absolute; inset: 0; z-index: 2;
  background: linear-gradient(to top, rgba(2,5,8,.92) 0%, rgba(2,5,8,.3) 50%, rgba(2,5,8,.15) 100%);
}
.fc-info {
  position: absolute; bottom: 0; left: 0; right: 0; z-index: 3;
  display: flex; flex-direction: column; align-items: center;
  padding: 12px 8px 14px; gap: 6px;
}
.fc-faction-tag {
  font-size: 1.1vh; letter-spacing: 2px;
  padding: 2px 8px; border-radius: 3px;
  border: 1px solid; background: rgba(0,0,0,.4);
}
.fc-name {
  font-size: 2.8vh; color: var(--tg);
  text-shadow: 0 0 16px rgba(212,170,96,.7);
  letter-spacing: 0.15vw;
}

/* ── 검색 ────────────────────────────────────────────────── */
.search-row {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 1vw;
  width: 100%;
}
.search-input {
  flex: 1;
  padding: 0.8vh 1.2vw;
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(212,170,96,.25);
  border-radius: var(--r);
  color: var(--t1);
  font-size: 1.6vh;
  outline: none;
  transition: border-color .15s;
  box-sizing: border-box;
}
.search-input:focus { border-color: rgba(212,170,96,.7); }
.search-input::placeholder { color: rgba(212,170,96,.3); }
.search-count {
  font-size: 1.3vh;
  color: rgba(212,170,96,.4);
  flex-shrink: 0;
}

/* ── 인물 리스트 ──────────────────────────────────────────── */
/* 헤더·아이템 공통 그리드: img | 이름 | 직업 | 고유트레잇 | star | dot */
.cl-header,
.cl-item {
  display: grid;
  grid-template-columns: 5.5vh 1.1fr 1fr 1.3fr 2.4vw 1vh;
  column-gap: 1.2vw;
  align-items: center;
  padding: 0 1.6vw;
  width: 100%;
  box-sizing: border-box;
}

/* 헤더 */
.cl-header {
  flex-shrink: 0;
  padding-top: 0.5vh;
  padding-bottom: 0.5vh;
  background: rgba(2,5,8,.6);
  border-bottom: 1px solid rgba(212,170,96,.22);
}
.cl-th {
  font-size: 1.1vh;
  letter-spacing: 0.5px;
  color: rgba(212,170,96,.5);
}
.cl-th-r { text-align: right; }

/* 리스트 */
.cl-list {
  flex: 1;
  min-height: 0;
  width: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  scrollbar-width: thin;
  scrollbar-color: rgba(212,170,96,.2) transparent;
}
.cl-list::-webkit-scrollbar { width: 3px; }
.cl-list::-webkit-scrollbar-thumb { background: rgba(212,170,96,.25); border-radius: 2px; }

.cl-empty {
  padding: 3vh;
  text-align: center;
  font-size: 1.4vh;
  opacity: .5;
}

.cl-item {
  height: 9vh;
  flex-shrink: 0;
  border-bottom: 1px solid rgba(212,170,96,.08);
  cursor: pointer;
  transition: background .12s;
  color: var(--t1);
}
.cl-item:last-child { border-bottom: none; }
.cl-item:hover { background: rgba(212,170,96,.05); }
.cl-item.active {
  background: rgba(212,170,96,.1);
  border-bottom-color: rgba(212,170,96,.15);
}

.cl-img-wrap {
  height: 7vh;
  aspect-ratio: 3 / 4;
  background: rgba(255,255,255,.05);
  border: 1px solid rgba(212,170,96,.15);
  border-radius: 0.4vh;
  overflow: hidden;
  display: flex; align-items: center; justify-content: center;
}
.cl-img { width: 100%; height: 100%; object-fit: contain; }

.cl-info {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.3vh;
}
.cl-name {
  font-size: 1.6vh;
  color: var(--t1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.cl-nick {
  font-size: 1.2vh;
  color: rgba(212,170,96,.45);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cl-job {
  font-size: 1.3vh;
  color: var(--t2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.cl-trait {
  font-size: 1.3vh;
  color: rgba(212,170,96,.6);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cl-rec {
  font-size: 1.3vh;
  color: rgba(212,170,96,.8);
  text-align: center;
}

.cl-dot {
  width: 0.7vh;
  height: 0.7vh;
  border-radius: 50%;
  justify-self: center;
}

/* ── 선택된 인물 상세 ─────────────────────────────────────── */
.char-detail-panel {
  flex-shrink: 0;
  width: 100%;
  position: relative;
  background: linear-gradient(165deg, #0d1b2a 0%, #1a082e 60%, #0d1520 100%);
  border: 2px solid rgba(212,170,96,.55);
  border-radius: 14px;
  box-shadow:
    inset 0 0 0 5px #0d1520,
    inset 0 0 0 7px rgba(212,170,96,.14),
    0 8px 32px rgba(0,0,0,.7);
  overflow: hidden;
  transition: border-color .2s;
}
.char-detail-panel.collapsed { border-color: rgba(212,170,96,.3); }
.char-detail-panel::before {
  content: '';
  position: absolute; inset: 0;
  background-image:
    repeating-linear-gradient( 45deg, transparent, transparent 10px, rgba(212,170,96,.018) 10px, rgba(212,170,96,.018) 11px),
    repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(212,170,96,.018) 10px, rgba(212,170,96,.018) 11px);
  pointer-events: none;
  z-index: 0;
  border-radius: 12px;
}
.detail-toggle {
  position: relative;
  z-index: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1vh 1.6vw;
  background: none;
  border: none;
  border-bottom: 1px solid rgba(212,170,96,.15);
  color: rgba(212,170,96,.8);
  font-size: 1.5vh;
  letter-spacing: 0.15vw;
  cursor: pointer;
  transition: color .15s, background .15s;
}
.detail-toggle:hover { color: var(--tg); background: rgba(212,170,96,.04); }
.collapsed .detail-toggle { border-bottom: none; }
.toggle-arrow { font-size: 1.2vh; color: rgba(212,170,96,.5); }
.detail-body {
  position: relative;
  z-index: 1;
  height: 36vh;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(212,170,96,.2) transparent;
}

/* ── 푸터 ─────────────────────────────────────────────────── */
.footer {
  display: flex; gap: 2vw;
  width: 100%;
  padding: 2vh 3vw;
  flex-shrink: 0;
  border-top: 1px solid rgba(212,170,96,.1);
  background: rgba(2,5,8,.6);
  backdrop-filter: blur(8px);
}
.footer-btn {
  flex: 1;
  position: relative;
  display: flex; align-items: center; justify-content: center;
  padding: 1.8vh 0;
  background: linear-gradient(165deg, #0d1b2a 0%, #1a082e 60%, #0d1520 100%);
  border: 2px solid rgba(212,170,96,.45);
  border-radius: 12px;
  box-shadow:
    inset 0 0 0 4px #0d1520,
    inset 0 0 0 6px rgba(212,170,96,.12),
    0 6px 24px rgba(0,0,0,.6);
  color: rgba(212,170,96,.7);
  cursor: pointer;
  transition: all .2s;
  overflow: hidden;
  font-size: 1.8vh;
  letter-spacing: 0.2vw;
}
.footer-btn::before {
  content: '';
  position: absolute; inset: 0;
  background-image:
    repeating-linear-gradient( 45deg, transparent, transparent 10px, rgba(212,170,96,.018) 10px, rgba(212,170,96,.018) 11px),
    repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(212,170,96,.018) 10px, rgba(212,170,96,.018) 11px);
  pointer-events: none;
}
.footer-btn:hover {
  border-color: rgba(212,170,96,.8);
  color: var(--tg);
  transform: translateY(-3px);
  box-shadow:
    inset 0 0 0 4px #0d1520,
    inset 0 0 0 6px rgba(212,170,96,.3),
    0 12px 36px rgba(212,170,96,.15);
}
.footer-btn:disabled { opacity: .35; cursor: not-allowed; transform: none; }
.footer-btn > span { position: relative; z-index: 1; }
.gold-btn { flex: 2; }
.gold-btn:hover {
  box-shadow:
    inset 0 0 0 4px #0d1520,
    inset 0 0 0 6px rgba(212,170,96,.4),
    0 14px 44px rgba(212,170,96,.25);
}

/* ── 페이지 전환 ──────────────────────────────────────────── */
.slide-forward-enter-active,
.slide-forward-leave-active,
.slide-back-enter-active,
.slide-back-leave-active {
  transition: opacity .25s, transform .25s;
}
.slide-forward-enter-from { opacity: 0; transform: translateX(40px); }
.slide-forward-leave-to   { opacity: 0; transform: translateX(-40px); }
.slide-back-enter-from    { opacity: 0; transform: translateX(-40px); }
.slide-back-leave-to      { opacity: 0; transform: translateX(40px); }

.sel-bar-fade-enter-active, .sel-bar-fade-leave-active { transition: opacity .2s, transform .2s; }
.sel-bar-fade-enter-from, .sel-bar-fade-leave-to { opacity: 0; transform: translateY(8px); }
</style>
