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
          <div class="nation-filters">
            <button v-for="n in NATION_FILTERS" :key="n.code"
                    class="nf-btn mono"
                    :class="{ active: nationFilter === n.code }"
                    @click="toggleNation(n.code)">
              {{ n.label }}
            </button>
          </div>
        </div>

        <!-- 캐릭터 목록 -->
        <div class="lib-list" ref="listRef">
          <div v-if="!filtered.length" class="dim mono" style="padding:24px;text-align:center">
            검색 결과 없음
          </div>
          <button
            v-else
            v-for="c in filtered"
            :key="c.CHA_CODE"
            class="lib-item"
            @click="open(c.CHA_CODE)"
          >
            <div class="li-img-wrap">
              <img :src="`/img/characters/${c.CHA_IMG}.png`"
                   class="li-img"
                   @error="e => e.target.style.display = 'none'" />
            </div>
            <div class="li-info">
              <div class="serif li-name">{{ c.CHA_KR_NAME }}</div>
              <div class="mono dim li-en">{{ c.CHA_EN_NICK || c.CHA_EN_NAME }}</div>
            </div>
            <span class="nation-dot" :style="{ background: nationDot(c.CHA_CODE) }" />
            <span class="mono dim li-arr">›</span>
          </button>
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
import { ref, computed } from 'vue'
import { useEncyclopediaStore } from '@/stores/encyclopediaStore'
import { CHAR_BASE } from '@/data/characters/charBase.js'
import { CHAR_TENDER } from '@/data/characters/charTender.js'
import CharDetailComp from './CharDetailComp.vue'

const enc = useEncyclopediaStore()

const ALL = CHAR_BASE
const TENDER_MAP = Object.fromEntries(CHAR_TENDER.map(c => [c.CHA_CODE, c]))

const NATION_FILTERS = [
  { code: 'FPA', label: '동맹' },
  { code: 'REH', label: '제국' },
  { code: 'PZN', label: '페잔' },
  { code: 'EAT', label: '지구교' },
]
const NATION_DOT_COLOR = {
  FPA: '#4488ff',
  REH: '#cc4444',
  PZN: '#44aa66',
  EAT: '#9955cc',
}

const query        = ref('')
const nationFilter = ref(null)
const listRef      = ref(null)

// enc.chaCode가 이미 지정된 경우 바로 상세 뷰
const selectedCode = ref(enc.chaCode ?? null)

const charName = computed(() => {
  if (!selectedCode.value) return ''
  return ALL.find(c => c.CHA_CODE === selectedCode.value)?.CHA_KR_NAME ?? selectedCode.value
})

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  return ALL.filter(c => {
    if (nationFilter.value) {
      const nation = TENDER_MAP[c.CHA_CODE]?.CHA_NATION
      if (nation !== nationFilter.value) return false
    }
    if (!q) return true
    return (
      c.CHA_KR_NAME.toLowerCase().includes(q) ||
      c.CHA_KR_NICK.toLowerCase().includes(q) ||
      c.CHA_EN_NAME.toLowerCase().includes(q) ||
      c.CHA_EN_NICK.toLowerCase().includes(q)
    )
  })
})

function toggleNation(code) {
  nationFilter.value = nationFilter.value === code ? null : code
}
function open(code) {
  selectedCode.value = code
}
function scrollToTop() {
  listRef.value?.scrollTo({ top: 0 })
}
function nationDot(chaCode) {
  const nation = TENDER_MAP[chaCode]?.CHA_NATION
  return NATION_DOT_COLOR[nation] ?? '#445566'
}
</script>

<style scoped>
/* ── 오버레이 ────────────────────────────────────────────── */
.lib-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, .6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  backdrop-filter: blur(4px);
}

.lib-panel {
  width: 90%;
  max-width: 560px;
  height: 80vh;
  background: var(--bg2);
  border: 1px solid var(--bdg);
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 8px 48px rgba(0,0,0,.7);
}

/* ── 헤더 ────────────────────────────────────────────────── */
.lib-header {
  display: flex;
  align-items: center;
  gap: 1vw;
  padding: 1.6vh 2vw;
  border-bottom: 1px solid var(--bd);
  flex-shrink: 0;
}
.lib-header span { flex: 1; text-align: center; }
.lib-back, .lib-close {
  font-size: 2.2vh;
  padding: 0.6vh 1.2vw;
  background: var(--bg3);
  border: 1px solid var(--bd);
  border-radius: var(--r);
  color: var(--t2);
  cursor: pointer;
  transition: all .13s;
  flex-shrink: 0;
}
.lib-back:hover, .lib-close:hover { color: var(--t1); border-color: var(--tg); }
.lib-close { width: 3.5vh; height: 3.5vh; padding: 0; display: flex; align-items: center; justify-content: center; }

/* ── 검색 + 필터 ─────────────────────────────────────────── */
.lib-search-row {
  display: flex;
  flex-direction: column;
  gap: 1vh;
  padding: 1.4vh 1.8vw 1vh;
  flex-shrink: 0;
}
.lib-search {
  width: 100%;
  padding: 1vh 1.5vw;
  background: var(--bg3);
  border: 1px solid var(--bd);
  border-radius: var(--r);
  color: var(--t1);
  font-size: 1.6vh;
  box-sizing: border-box;
  outline: none;
  transition: border-color .15s;
}
.lib-search:focus { border-color: var(--tg); }
.lib-search::placeholder { color: var(--t3); }

.nation-filters { display: flex; gap: 0.8vw; }
.nf-btn {
  flex: 1;
  padding: 0.6vh 0;
  font-size: 1.3vh;
  background: var(--bg3);
  border: 1px solid var(--bd);
  border-radius: var(--r);
  color: var(--t2);
  cursor: pointer;
  transition: all .13s;
}
.nf-btn:hover { color: var(--t1); }
.nf-btn.active { background: rgba(212,170,96,.12); border-color: var(--tg); color: var(--tg); }

/* ── 목록 ────────────────────────────────────────────────── */
.lib-list {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}
.lib-item {
  display: flex;
  align-items: center;
  gap: 1.2vw;
  padding: 1.2vh 1.8vw;
  background: none;
  border: none;
  border-bottom: 1px solid var(--bd);
  cursor: pointer;
  text-align: left;
  transition: background .12s;
  color: var(--t1);
}
.lib-item:hover { background: var(--bgh); }
.lib-item:last-child { border-bottom: none; }

.li-img-wrap {
  width: 4.5vw; height: 5.5vh;
  background: var(--bg4);
  border: 1px solid var(--bd);
  border-radius: 0.4vh;
  overflow: hidden;
  flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
}
.li-img { width: 100%; height: 100%; object-fit: cover; }
.li-info { flex: 1; }
.li-name { font-size: 1.6vh; color: var(--t1); }
.li-en   { font-size: 1.3vh; margin-top: 0.3vh; }
.nation-dot {
  width: 0.8vh; height: 0.8vh;
  border-radius: 50%;
  flex-shrink: 0;
}
.li-arr { font-size: 2vh; color: var(--t3); flex-shrink: 0; }

/* ── 풋터 ────────────────────────────────────────────────── */
.lib-footer {
  padding: 1vh 1.8vw;
  font-size: 1.3vh;
  border-top: 1px solid var(--bd);
  flex-shrink: 0;
  text-align: right;
}

/* ── 상세 뷰 ─────────────────────────────────────────────── */
.lib-detail-wrap {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
}
</style>
