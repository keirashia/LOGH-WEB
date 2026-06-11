<template>
  <div class="lib-overlay" @click.self="enc.close()">
    <div class="lib-panel">

      <!-- 헤더 -->
      <div class="lib-header">
        <button v-if="selectedCode" class="lib-back mono" @click="selectedCode = null">❮</button>
        <span class="serif lib-title">
          {{ selectedCode ? charName : '📖 인물 사전' }}
        </span>
        <button class="lib-close mono" @click="enc.close()">✕</button>
      </div>
      <!-- 
      1. 현재 선택된 시나리오 표시. 디폴트는 아스타테 회전 SE 796 / 제국력 487년
      796년에 캐릭터가 사망상태면, 생몰년도 기준으로 살아있는 상태의 첫번째 가능 시나리오로 표시.

      2. 클릭/터치 시, 연도 선택 뷰로 전환.
      < SE798 SE799 SE800 ...   >
      이런식으로 세로로 숫자 표기 간격은 좀 넓게 해줘. 팻핑거 방지
      
      3. 연도 선택 시, 드롭다운으로 해당 연도의 시나리오 노출.
      시나리오 선택 시, 해당 시나리오의 데이터를 가져오고 해당 시나리오의 데이터가 없다면, 그냥 base기준 데이터를 노출함.      

      이건 라이브러리 팝업에서만 노출되고, 실제 게임 상에서는 시나리오명만 노출되고, 클릭 터치 이벤트는 작동 X
      -->

      <!-- 목록 뷰 -->
      <template v-if="!selectedCode">
        <!-- 검색 + 국가 필터 -->
        <div class="lib-search-row">
          <input
            v-model="query"
            class="lib-search mono"
            placeholder="이름 검색..."
            @input="scrollToTop"
          />
          <!-- 필터 칩 바 -->
          <div class="filter-bar">
            <!-- 국가 필터 -->
            <div class="filter-slot" @click.stop>
              <button class="filter-btn mono" :class="{ active: factionFilter }" @click="toggleFactionDropdown">
                <span class="fb-dot" v-if="factionFilter" :style="{ background: FACTION_DOT_COLOR[factionFilter] }" />
                <span class="fb-label">{{ factionFilter ? FACTION_FILTERS.find(n => n.code === factionFilter)?.label : '모든 국가' }}</span>
                <span v-if="factionFilter" class="fb-clear" @click.stop="clearFaction">✕</span>
                <span v-else class="fb-arrow">▾</span>
              </button>
              <div v-if="factionDropdownOpen" class="filter-dropdown">
                <button v-for="n in FACTION_FILTERS" :key="n.code"
                        class="fd-item mono"
                        :class="{ active: factionFilter === n.code }"
                        @mousedown.prevent="selectFaction(n.code)">
                  <span class="fd-dot" :style="{ background: FACTION_DOT_COLOR[n.code] }" />
                  {{ n.label }}
                </button>
              </div>
            </div>
            <!-- 추후 필터 슬롯 -->
            <div class="filter-slot filter-slot--empty" />
            <div class="filter-slot filter-slot--empty" />
          </div>
        </div>

        <!-- 캐릭터 목록 -->
        <div class="lib-list" ref="listRef">
          <div v-if="!filtered.length" class="dim mono" style="padding:24px;text-align:center">
            검색 결과 없음
          </div>
          <div
            v-else
            v-for="c in filtered"
            :key="c.code"
            class="lib-item"
            @click="open(c.code)"
          >
            <div class="li-img-wrap">
              <img :src="charImgSrc(c.code)"
                   class="li-img"
                   @error="handleCharImgError($event, c.code, 'H')" />
            </div>
            <div class="li-info">
              <div class="serif li-name">{{ NAMES_MAP[c.code]?.name ?? c.code }}</div>
              <div class="mono dim li-en">{{ NAMES_MAP[c.code]?.nick ?? '' }}</div>
            </div>
            <span class="nation-dot" :style="{ background: factionDot(c.code) }" />
          </div>
        </div>

        <!-- 카운터 -->
        <div class="lib-footer dim mono">
          {{ filtered.length }}명 / 전체 {{ ALL.length }}명
        </div>
      </template>

      <!-- 상세 뷰 -->
      <template v-else>
        <div class="lib-detail-wrap">
          <CharDetailComp :cha-code="selectedCode" :scenario-id="enc.scenarioId" />
        </div>
      </template>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useEncyclopediaStore } from '@/stores/encyclopediaStore'
import { CHAR_BASE } from '@/data/base/characters/charactersData.js'
import { CHAR_NAMES } from '@/data/base/characters/charactersName.js'
import CharDetailComp from '@/components/char/CharDetailComp.vue'
import { charImgSrc, handleCharImgError } from '@/utils/charImg.js'

const enc = useEncyclopediaStore()

const ALL = CHAR_BASE
const NAMES_MAP = Object.fromEntries(
  CHAR_NAMES.filter(n => n.lang === 'Kr').map(n => [n.charCode, n])
)

const FACTION_FILTERS = [
  { code: 'FPA', label: '동맹' },
  { code: 'REH', label: '제국' },
  { code: 'PZN', label: '페잔' },
  { code: 'EAT', label: '지구교' },
]
const FACTION_DOT_COLOR = {
  FPA: '#4488ff',
  REH: '#cc4444',
  PZN: '#44aa66',
  EAT: '#9955cc',
}

const query              = ref('')
const factionFilter       = ref(null)
const factionDropdownOpen = ref(false)
const listRef            = ref(null)

// enc.chaCode가 이미 지정된 경우 바로 상세 뷰
const selectedCode = ref(enc.chaCode ?? null)

const charName = computed(() => {
  if (!selectedCode.value) return ''
  return NAMES_MAP[selectedCode.value]?.name ?? selectedCode.value
})

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  return ALL.filter(c => {
    if (factionFilter.value && c.faction !== factionFilter.value) return false
    if (!q) return true
    const name = NAMES_MAP[c.code]
    return (
      name?.name.toLowerCase().includes(q) ||
      name?.nick.toLowerCase().includes(q)
    )
  })
})

function toggleFactionDropdown() { factionDropdownOpen.value = !factionDropdownOpen.value }
function selectFaction(code) {
  factionFilter.value = factionFilter.value === code ? null : code
  factionDropdownOpen.value = false
  scrollToTop()
}
function clearFaction() { factionFilter.value = null; scrollToTop() }

function open(code) { selectedCode.value = code }
function scrollToTop() { if (listRef.value) listRef.value.scrollTo({ top: 0 }) }
function factionDot(code) {
  const faction = ALL.find(c => c.code === code)?.faction
  return FACTION_DOT_COLOR[faction] ?? '#445566'
}

// 이벤트 리스너 관리
const handleDocClick = () => {
  if (factionDropdownOpen.value) {
    factionDropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleDocClick, { capture: false })
})

onUnmounted(() => {
  document.removeEventListener('click', handleDocClick, { capture: false })
  // 상태 초기화
  selectedCode.value = null
  query.value = ''
  factionFilter.value = null
  factionDropdownOpen.value = false
})
</script>

<style scoped>
/* ── 오버레이 ────────────────────────────────────────────── */
.lib-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, .75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  backdrop-filter: blur(6px);
}

/* ── 패널 (로비 카드 스타일) ──────────────────────────────── */
.lib-panel {
  position: relative;
  width: min(95vw, 1000px);
  height: 80vh;
  background: linear-gradient(165deg, #0d1b2a 0%, #1a082e 60%, #0d1520 100%);
  border: 2px solid rgba(212,170,96,.8);
  border-radius: 14px;
  box-shadow:
    inset 0 0 0 5px #0d1520,
    inset 0 0 0 7px rgba(212,170,96,.22),
    0 16px 64px rgba(0,0,0,.9);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  color: var(--t1);
}
.lib-panel::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    repeating-linear-gradient( 45deg, transparent, transparent 10px, rgba(212,170,96,.018) 10px, rgba(212,170,96,.018) 11px),
    repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(212,170,96,.018) 10px, rgba(212,170,96,.018) 11px);
  pointer-events: none;
  z-index: 0;
}

/* ── 헤더 ────────────────────────────────────────────────── */
.lib-header {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 1vw;
  padding: 1.8vh 2vw;
  border-bottom: 1px solid rgba(212,170,96,.25);
  flex-shrink: 0;
}
.lib-header span { flex: 1; text-align: center; }
.lib-title { font-size: 2.2vh; letter-spacing: 0.3vw; color: var(--tg); text-shadow: 0 0 16px rgba(212,170,96,.4); }
.lib-back, .lib-close {
  font-size: 1.8vh;
  padding: 0.6vh 1.2vw;
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(212,170,96,.3);
  border-radius: var(--r);
  color: rgba(212,170,96,.7);
  cursor: pointer;
  transition: all .15s;
  flex-shrink: 0;
}
.lib-back:hover, .lib-close:hover {
  color: var(--tg);
  border-color: rgba(212,170,96,.8);
  background: rgba(212,170,96,.08);
}
.lib-close { width: 3.5vh; height: 3.5vh; padding: 0; display: flex; align-items: center; justify-content: center; }

/* ── 검색 + 필터 ─────────────────────────────────────────── */
.lib-search-row {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 1.2vh;
  padding: 1.8vh 2vw 1.4vh;
  height: 14vh;
  box-sizing: border-box;
  flex-shrink: 0;
  border-bottom: 1px solid rgba(212,170,96,.15);
}
.lib-search {
  width: 100%;
  flex: 1;
  padding: 0 1.5vw;
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(212,170,96,.25);
  border-radius: var(--r);
  color: var(--t1);
  font-size: 2.0vh;
  box-sizing: border-box;
  outline: none;
  transition: border-color .15s;
}
.lib-search:focus { border-color: rgba(212,170,96,.8); }
.lib-search::placeholder { color: rgba(212,170,96,.3); }

.nation-filters { display: flex; gap: 0.8vw; }
.nf-btn {
  flex: 1;
  padding: 0;
  height: 4vh;
  font-size: 1.6vh;
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(212,170,96,.2);
  border-radius: var(--r);
  color: rgba(212,170,96,.5);
  cursor: pointer;
  transition: all .15s;
}
.nf-btn:hover { color: var(--tg); border-color: rgba(212,170,96,.5); }
.nf-btn.active { background: rgba(212,170,96,.12); border-color: var(--tg); color: var(--tg); }

/* ── 필터 바 ─────────────────────────────────────────────── */
.filter-bar { display: flex; gap: 1vw; align-items: center; }

.filter-slot { position: relative; flex: 1; }
.filter-slot--empty {
  height: 4vh;
  border: 1px dashed rgba(212,170,96,.12);
  border-radius: var(--r);
}

.filter-btn {
  width: 100%; height: 4vh;
  display: flex; align-items: center; justify-content: center; gap: 0.6vw;
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(212,170,96,.25);
  border-radius: var(--r);
  color: rgba(212,170,96,.55);
  font-size: 1.6vh;
  cursor: pointer;
  transition: all .15s;
}
.filter-btn:hover { border-color: rgba(212,170,96,.6); color: var(--tg); }
.filter-btn.active {
  background: rgba(212,170,96,.1);
  border-color: var(--tg);
  color: var(--tg);
}
.fb-dot { width: 1vh; height: 1vh; border-radius: 50%; flex-shrink: 0; }
.fb-label { flex: 1; text-align: center; }
.fb-clear { font-size: 1.4vh; opacity: .7; padding: 0 0.2vw; }
.fb-clear:hover { opacity: 1; }
.fb-arrow { font-size: 1.2vh; opacity: .6; }

.filter-dropdown {
  position: absolute;
  top: calc(100% + 6px);
  left: 0; right: 0;
  background: #0d1520;
  border: 1px solid rgba(212,170,96,.7);
  border-radius: var(--r);
  box-shadow: 0 8px 32px rgba(0,0,0,.95);
  overflow: hidden;
  z-index: 10;
}
.fd-item {
  width: 100%; height: 4.5vh;
  display: flex; align-items: center; gap: 1vw;
  padding: 0 1.2vw;
  background: none;
  border: none;
  border-bottom: 1px solid rgba(212,170,96,.1);
  color: rgba(212,170,96,.6);
  font-size: 1.6vh;
  cursor: pointer;
  transition: background .12s;
  text-align: left;
}
.fd-item:last-child { border-bottom: none; }
.fd-item:hover { background: rgba(212,170,96,.08); color: var(--tg); }
.fd-item.active { background: rgba(212,170,96,.12); color: var(--tg); }
.fd-dot { width: 1vh; height: 1vh; border-radius: 50%; flex-shrink: 0; }

/* ── 목록 ────────────────────────────────────────────────── */
.lib-list {
  position: relative;
  z-index: 1;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}
.lib-list::-webkit-scrollbar { width: 4px; }
.lib-list::-webkit-scrollbar-track { background: transparent; }
.lib-list::-webkit-scrollbar-thumb { background: rgba(212,170,96,.3); border-radius: 2px; }

.lib-item {
  display: flex;
  align-items: center;
  gap: 1.2vw;
  height: 15vh;
  flex-shrink: 0;
  padding: 0 2vw;
  background: none;
  border: none;
  border-bottom: 1px solid rgba(212,170,96,.1);
  cursor: pointer;
  text-align: left;
  transition: background .12s;
  color: var(--t1);
}
.lib-item:hover { background: rgba(212,170,96,.06); }
.lib-item:last-child { border-bottom: none; }

.li-img-wrap {
  height: 12vh;
  aspect-ratio: 3 / 4;
  background: rgba(255,255,255,.05);
  border: 1px solid rgba(212,170,96,.2);
  border-radius: 0.4vh;
  overflow: hidden;
  flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
}
.li-img { width: 100%; height: 100%; object-fit: contain; }
.li-info { flex: 1; }
.li-name { font-size: 1.6vh; color: var(--t1); }
.li-en   { font-size: 1.3vh; margin-top: 0.3vh; color: rgba(212,170,96,.5); }
.nation-dot {
  width: 0.8vh; height: 0.8vh;
  border-radius: 50%;
  flex-shrink: 0;
}
.li-arr { font-size: 2vh; color: rgba(212,170,96,.4); flex-shrink: 0; }

/* ── 풋터 ────────────────────────────────────────────────── */
.lib-footer {
  position: relative;
  z-index: 1;
  padding: 1vh 2vw;
  font-size: 1.3vh;
  border-top: 1px solid rgba(212,170,96,.2);
  flex-shrink: 0;
  text-align: right;
  color: rgba(212,170,96,.4);
}

/* ── 상세 뷰 ─────────────────────────────────────────────── */
.lib-detail-wrap {
  position: relative;
  z-index: 1;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
}
</style>
