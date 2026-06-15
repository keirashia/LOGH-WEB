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

        <div class="faction-row">
          <!-- 전체 -->
          <button class="fc-card fc-all"
                  :class="{ active: pickedFaction === null }"
                  @click="pickedFaction = null">
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
                  @click="pickedFaction = fid">
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
          <button class="footer-btn gold-btn" :disabled="pickedFaction === undefined" @click="goToChar">
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

        <div class="char-body">

          <!-- 추천 인물 -->
          <div v-if="leadChars.length" class="char-section">
            <div class="section-label mono">추천 인물</div>
            <div class="rec-list">
              <button v-for="ch in leadChars" :key="ch.code"
                      class="rec-card"
                      :class="{ active: selChar?.code === ch.code }"
                      @click="selChar = ch">
                <div class="rec-avatar serif"
                     :style="{
                       color: fcolor(ch.faction),
                       borderColor: selChar?.code === ch.code ? fcolor(ch.faction) : 'rgba(212,170,96,.25)'
                     }">
                  {{ namesMap[ch.code]?.name?.[0] ?? '?' }}
                </div>
                <div class="rec-info">
                  <span class="rec-name serif">{{ namesMap[ch.code]?.name ?? ch.code }}</span>
                  <span class="rec-faction mono" :style="{ color: fcolor(ch.faction) }">
                    {{ factionNamesMap[ch.faction]?.name ?? ch.faction }}
                  </span>
                </div>
                <div v-if="selChar?.code === ch.code" class="rec-check">✓</div>
              </button>
            </div>
          </div>

          <!-- 전체 인물 -->
          <div class="char-section">
            <div class="section-label mono">전체 인물</div>
            <div class="search-wrap">
              <span class="search-icon">🔍</span>
              <input class="search-input mono" v-model="q" placeholder="이름으로 검색...">
            </div>
            <div class="chip-grid">
              <button v-for="ch in filteredChars" :key="ch.code"
                      class="char-chip"
                      :class="{ active: selChar?.code === ch.code }"
                      :style="selChar?.code === ch.code
                        ? { borderColor: fcolor(ch.faction), color: fcolor(ch.faction) }
                        : {}"
                      @click="selChar = ch">
                {{ namesMap[ch.code]?.name ?? ch.code }}
              </button>
            </div>
          </div>

        </div>

        <!-- 선택된 인물 바 -->
        <Transition name="sel-bar-fade">
          <div v-if="selChar" class="sel-bar">
            <div class="sel-avatar serif" :style="{ borderColor: fcolor(selChar.faction) }">
              {{ namesMap[selChar.code]?.name?.[0] ?? '?' }}
            </div>
            <div class="sel-info">
              <span class="serif sel-name">{{ namesMap[selChar.code]?.name ?? selChar.code }}</span>
              <span class="mono sel-faction" :style="{ color: fcolor(selChar.faction) }">
                {{ factionNamesMap[selChar.faction]?.name ?? selChar.faction }}
              </span>
            </div>
          </div>
        </Transition>

        <div class="footer">
          <button class="footer-btn" @click="goBackToFaction">
            <span class="mono">← 뒤로</span>
          </button>
          <button class="footer-btn gold-btn" :disabled="!selChar" @click="onNext">
            <span class="mono">다음 →</span>
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
import { FACTIONS } from '@/data/masterData'
import { CHAR_BASE } from '@/data/base/characters/charactersData.js'
import { FACTION_NAMES } from '@/data/base/factions/factionName.js'
import StarfieldCanvas from '@/components/common/StarfieldCanvas.vue'

const route  = useRoute()
const router = useRouter()
const lobby  = useLobbyStore()

const cur     = computed(() => SCENARIOS.find(s => s.id === route.params.scId) ?? SCENARIOS[0])
const options = computed(() => lobby.options)

const namesMap = Object.fromEntries(
  CHAR_BASE.map(c => [c.code, { name: c.nameKr, nick: c.nickKr }])
)
const factionNamesMap = Object.fromEntries(
  FACTION_NAMES.filter(n => n.lang === 'Kr').map(n => [n.factionId, n])
)

const stage         = ref('faction')
const transDir      = ref('slide-forward')
const pickedFaction = ref(undefined)
const factionFilter = ref(null)
const selChar       = ref(null)
const charList      = ref([])
const q             = ref('')

watchEffect(async () => {
  if (!cur.value?.id) return
  try {
    const [base, num] = cur.value.id.split('_')
    const mod = await import(`@/data/scenario/${base}/${num.padStart(2, '0')}/charList.js`)
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

const filteredChars = computed(() => {
  const kw = q.value.trim().toLowerCase()
  if (!kw) return scenarioChars.value
  return scenarioChars.value.filter(c => {
    const e = namesMap[c.code]
    return e?.name?.toLowerCase().includes(kw) || e?.nick?.toLowerCase().includes(kw)
  })
})

function fcolor(faction) {
  return FACTIONS[faction]?.color ?? 'var(--t2)'
}

function goToChar() {
  factionFilter.value = pickedFaction.value
  transDir.value = 'slide-forward'
  stage.value = 'char'
  selChar.value = null
  q.value = ''
}

function goBackToFaction() {
  transDir.value = 'slide-back'
  stage.value = 'faction'
  selChar.value = null
}

function onNext() {
  if (!selChar.value) return
  lobby.selectedFaction = selChar.value.faction
  router.push({ name: 'scenario-detail', params: { scId: cur.value.id } })
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
.layout-char { gap: 1.6vh; }

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
  display: flex; gap: 16px; align-items: center; justify-content: center;
  width: 100%; overflow-x: auto;
  scrollbar-width: none; padding: 8px 4px;
}
.faction-row::-webkit-scrollbar { display: none; }

.fc-card {
  flex-shrink: 0;
  position: relative;
  height: 32vh;
  aspect-ratio: 5 / 7;
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
.fc-card:hover {
  border-color: rgba(212,170,96,.95);
  transform: translateY(-8px) scale(1.03);
  box-shadow:
    inset 0 0 0 5px #0d1520,
    inset 0 0 0 7px rgba(212,170,96,.45),
    0 20px 56px rgba(212,170,96,.2);
}
.fc-card.active {
  border-color: rgba(212,170,96,1);
  transform: translateY(-8px) scale(1.03);
  box-shadow:
    inset 0 0 0 5px #0d1520,
    inset 0 0 0 7px rgba(212,170,96,.55),
    0 20px 56px rgba(212,170,96,.3);
}

/* 전체 카드 분할 이미지 */
.fc-all { background: none; }
.fc-slices { position: absolute; inset: 0; display: flex; z-index: 0; }
.fc-slice  { flex: 1; height: 100%; background-size: cover; background-position: center; }

/* 카드 오버레이 + 정보 */
.fc-overlay {
  position: absolute; inset: 0; z-index: 2;
  background: linear-gradient(to top, rgba(2,5,8,.92) 0%, rgba(2,5,8,.3) 50%, rgba(2,5,8,.15) 100%);
}
.fc-info {
  position: absolute; bottom: 0; left: 0; right: 0; z-index: 3;
  display: flex; flex-direction: column; align-items: center;
  padding: 12px 8px 14px;
  gap: 6px;
}
.fc-faction-tag {
  font-size: 1.1vh; letter-spacing: 2px;
  padding: 2px 8px; border-radius: 3px;
  border: 1px solid;
  background: rgba(0,0,0,.4);
}
.fc-name {
  font-size: 2.8vh; color: var(--tg);
  text-shadow: 0 0 16px rgba(212,170,96,.7);
  letter-spacing: 0.15vw;
}

/* ── 인물 선택 body ─────────────────────────────────────────── */
.char-body {
  flex: 1; min-height: 0;
  width: 100%; max-width: 640px;
  overflow-y: auto; scrollbar-width: thin;
  scrollbar-color: rgba(212,170,96,.2) transparent;
  display: flex; flex-direction: column; gap: 2vh;
  padding-right: 4px;
}

.char-section { display: flex; flex-direction: column; gap: 1vh; }
.section-label {
  font-size: 1.2vh; letter-spacing: 1.5px;
  color: rgba(212,170,96,.5);
  text-transform: uppercase;
}

/* 추천 인물 */
.rec-list { display: flex; flex-direction: column; gap: 8px; }
.rec-card {
  display: flex; align-items: center; gap: 14px;
  padding: 10px 14px;
  background: linear-gradient(165deg, #0d1b2a 0%, #1a082e 60%, #0d1520 100%);
  border: 1px solid rgba(212,170,96,.25);
  border-radius: 12px;
  box-shadow: inset 0 0 0 3px #0d1520, inset 0 0 0 4px rgba(212,170,96,.06);
  cursor: pointer; transition: all .15s; text-align: left; width: 100%;
  position: relative; overflow: hidden;
}
.rec-card::before {
  content: ''; position: absolute; inset: 0; pointer-events: none;
  background-image:
    repeating-linear-gradient( 45deg, transparent, transparent 10px, rgba(212,170,96,.012) 10px, rgba(212,170,96,.012) 11px),
    repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(212,170,96,.012) 10px, rgba(212,170,96,.012) 11px);
}
.rec-card:hover  { border-color: rgba(212,170,96,.5); transform: translateX(4px); }
.rec-card.active {
  border-color: rgba(212,170,96,.8);
  box-shadow: inset 0 0 0 3px #0d1520, inset 0 0 0 4px rgba(212,170,96,.2), 0 4px 16px rgba(212,170,96,.12);
}
.rec-avatar {
  flex-shrink: 0;
  width: 4.2vh; height: 4.2vh; border-radius: 50%;
  background: rgba(212,170,96,.06);
  border: 1px solid rgba(212,170,96,.25);
  display: flex; align-items: center; justify-content: center;
  font-size: 2vh; transition: border-color .15s;
  position: relative; z-index: 1;
}
.rec-info { flex: 1; display: flex; flex-direction: column; gap: 3px; position: relative; z-index: 1; }
.rec-name    { font-size: 1.8vh; color: var(--t1); }
.rec-faction { font-size: 1.2vh; }
.rec-check {
  flex-shrink: 0; font-size: 1.8vh; color: var(--tg);
  position: relative; z-index: 1;
}

/* 검색 */
.search-wrap {
  position: relative;
}
.search-icon {
  position: absolute; left: 10px; top: 50%; transform: translateY(-50%);
  font-size: 1.4vh; pointer-events: none;
}
.search-input {
  width: 100%; padding: 8px 10px 8px 32px; font-size: 1.3vh;
  background: rgba(13,27,42,.8);
  border: 1px solid rgba(212,170,96,.2); border-radius: 8px;
  color: var(--t1); outline: none; transition: border-color .13s;
}
.search-input:focus { border-color: rgba(212,170,96,.6); }
.search-input::placeholder { color: var(--t3); }

/* 인물 칩 */
.chip-grid { display: flex; flex-wrap: wrap; gap: 6px; }
.char-chip {
  padding: 5px 12px; font-size: 1.2vh;
  background: rgba(13,27,42,.7);
  border: 1px solid rgba(212,170,96,.2); border-radius: 6px;
  cursor: pointer; transition: all .13s; color: var(--t2);
}
.char-chip:hover  { border-color: rgba(212,170,96,.5); color: var(--t1); }
.char-chip.active {
  background: rgba(212,170,96,.08);
  font-weight: bold;
}

/* ── 선택된 인물 바 ───────────────────────────────────────── */
.sel-bar {
  flex-shrink: 0;
  width: 100%; max-width: 640px;
  display: flex; align-items: center; gap: 12px;
  padding: 10px 16px;
  background: linear-gradient(165deg, #0d1b2a 0%, #1a082e 60%, #0d1520 100%);
  border: 1px solid rgba(212,170,96,.4);
  border-radius: 10px;
  box-shadow: inset 0 0 0 3px #0d1520, inset 0 0 0 4px rgba(212,170,96,.12);
}
.sel-avatar {
  flex-shrink: 0;
  width: 3.8vh; height: 3.8vh; border-radius: 50%;
  background: rgba(212,170,96,.06); border: 1px solid var(--bd);
  display: flex; align-items: center; justify-content: center;
  font-size: 1.8vh; transition: border-color .15s;
}
.sel-info { display: flex; align-items: center; gap: 10px; }
.sel-name    { font-size: 1.8vh; color: var(--t1); }
.sel-faction { font-size: 1.2vh; }

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
