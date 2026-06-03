<template>
  <div class="step-layout">

    <!-- 헤더 -->
    <div class="step-header">
      <button class="btn" @click="$emit('back')">← 게임 옵션</button>
      <span class="serif gold" style="font-size:17px">인물 선택</span>
    </div>
    <div class="hint dim">인물 선택 시 소속 세력이 자동 결정됩니다</div>

    <!-- 세력 필터 -->
    <div class="faction-filter" role="radiogroup">
      <div class="ff-wrap">
        <button class="ff-btn ff-btn--all mono"
                :class="{ active: factionFilter === null }"
                @click="factionFilter = null">
          <div v-for="fid in factionList" :key="fid"
               class="ff-slice"
               :style="{ backgroundImage: `url(/img/factions/${fid}.png)` }" />
        </button>
        <span class="ff-label mono" :class="{ active: factionFilter === null }">전체</span>
      </div>
      <div v-for="fid in factionList" :key="fid" class="ff-wrap">
        <button class="ff-btn mono"
                :class="{ active: factionFilter === fid }"
                :style="{
                  backgroundImage: `url(/img/factions/${fid}.png)`,
                  ...(factionFilter === fid ? { borderColor: fcolor(fid) } : {})
                }"
                @click="factionFilter = fid" />
        <span class="ff-label mono"
              :class="{ active: factionFilter === fid }"
              :style="{ color: fcolor(fid) }">
          {{ FACTION_NAMES_MAP[fid]?.name ?? fid }}
        </span>
      </div>
    </div>

    <div class="char-body">

      <!-- 추천 인물 (세력별 첫 번째 Y 인물) -->
      <div v-if="leadChars.length" class="section-block">
        <div class="section-label dim">추천 인물</div>
        <div class="recommend-row">
          <button v-for="ch in leadChars" :key="ch.code"
                  class="char-card"
                  :class="{ selected: selChar?.code === ch.code }"
                  @click="selChar = ch">
            <div class="card-star mono" :style="{ color: fcolor(ch.faction) }">★</div>
            <div class="card-avatar serif"
                 :style="{ borderColor: selChar?.code === ch.code ? fcolor(ch.faction) : 'var(--bd)' }">
              {{ NAMES_MAP[ch.code]?.name?.[0] ?? '?' }}
            </div>
            <div class="card-name serif">{{ NAMES_MAP[ch.code]?.name ?? ch.code }}</div>
            <div class="card-faction mono" :style="{ color: fcolor(ch.faction) }">
              {{ FACTIONS[ch.faction]?.name ?? ch.faction }}
            </div>
          </button>
        </div>
      </div>

      <!-- 전체 인물 검색 -->
      <div class="section-block">
        <div class="section-label dim">전체 인물</div>
        <input class="search-input mono" v-model="q" placeholder="🔍 이름으로 검색...">
        <div class="char-chip-grid">
          <button v-for="ch in filteredChars" :key="ch.code"
                  class="char-chip"
                  :class="{ selected: selChar?.code === ch.code }"
                  :style="selChar?.code === ch.code
                    ? { borderColor: fcolor(ch.faction), color: fcolor(ch.faction) }
                    : {}"
                  @click="selChar = ch">
            {{ NAMES_MAP[ch.code]?.name ?? ch.code }}
          </button>
        </div>
      </div>

    </div>

    <!-- 선택 표시 바 -->
    <div class="selected-bar" v-if="selChar">
      <div class="sel-avatar serif"
           :style="{ borderColor: fcolor(selChar.faction) }">
        {{ NAMES_MAP[selChar.code]?.name?.[0] ?? '?' }}
      </div>
      <div>
        <span class="serif" style="font-size:13px">{{ NAMES_MAP[selChar.code]?.name ?? selChar.code }}</span>
        <span class="mono" style="font-size:11px;margin-left:10px"
              :style="{ color: fcolor(selChar.faction) }">
          {{ FACTIONS[selChar.faction]?.name ?? selChar.faction }}
        </span>
      </div>
    </div>

    <!-- 네비 -->
    <div class="step-nav">
      <button class="btn" @click="$emit('back')">← 옵션 변경</button>
      <button class="btn btn-gold"
              :disabled="!selChar"
              @click="$emit('start', selChar)">
        ⚔️ 게임 시작
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { FACTIONS } from '@/data/masterData'
import { CHAR_BASE } from '@/data/characters/charactersData.js'
import { CHAR_NAMES } from '@/data/characters/charactersName.js'
import { FACTION_NAMES } from '@/data/factions/factionName.js'

const props = defineProps({ event: Object, options: Object })
defineEmits(['back', 'start'])

const NAMES_MAP = Object.fromEntries(
  CHAR_NAMES.filter(n => n.lang === 'Kr').map(n => [n.charCode, n])
)
const FACTION_NAMES_MAP = Object.fromEntries(
  FACTION_NAMES.filter(n => n.lang === 'Kr').map(n => [n.factionId, n])
)

const q             = ref('')
const selChar       = ref(null)
const factionFilter = ref(null)

const factionSet  = computed(() => new Set(props.event?.factions ?? []))
const factionList = computed(() => props.event?.factions ?? [])

const scenarioChars = computed(() =>
  CHAR_BASE.filter(c => {
    if (!factionSet.value.has(c.faction)) return false
    if (factionFilter.value && c.faction !== factionFilter.value) return false
    return true
  })
)

// 세력별 첫 번째 인물 → 추천
const leadChars = computed(() => {
  const seen = new Set()
  return scenarioChars.value.filter(c => {
    if (seen.has(c.faction)) return false
    seen.add(c.faction)
    return true
  })
})

const filteredChars = computed(() => {
  const kw = q.value.trim().toLowerCase()
  if (!kw) return scenarioChars.value
  const entry = (c) => NAMES_MAP[c.code]
  return scenarioChars.value.filter(c =>
    entry(c)?.name?.toLowerCase().includes(kw) ||
    entry(c)?.nick?.toLowerCase().includes(kw)
  )
})

function fcolor(faction) {
  return FACTIONS[faction]?.color ?? 'var(--t2)'
}
</script>

<style scoped>
.step-layout {
  flex: 1;
  display: flex; flex-direction: column;
  padding: 16px 20px; gap: 10px;
  overflow: hidden;
  background: linear-gradient(165deg, #0d1b2a 0%, #0d1520 100%);
  border: 1px solid rgba(212,170,96,.45);
  border-radius: 12px;
  box-shadow: inset 0 0 0 3px #0d1520, inset 0 0 0 5px rgba(212,170,96,.12);
}
.step-header { display: flex; align-items: center; gap: 14px; flex-shrink: 0; }
.hint        { font-size: 11px; flex-shrink: 0; }

/* 세력 필터 */
.faction-filter {
  display: flex; gap: 6px; flex-shrink: 0; width: 100%;
}
.ff-wrap {
  flex: 1;
  display: flex; flex-direction: column; align-items: center; gap: 5px;
}
.ff-btn {
  width: 100%;
  aspect-ratio: 280 / 175;
  background: var(--bg3) center / cover no-repeat;
  border: 1px solid var(--bd); border-radius: var(--r);
  cursor: pointer; transition: border-color .13s;
}
.ff-btn:hover { border-color: var(--tg); }
.ff-btn.active { border-color: var(--tg); }

.ff-btn--all { display: flex; padding: 0; overflow: hidden; }
.ff-slice {
  flex: 1; height: 100%;
  background-size: cover;
  background-position: center;
}

.ff-label {
  font-size: 2.8vh;
  font-weight: bold;
  color: var(--t2);
  text-align: center;
}

/* 바디 */
.char-body {
  flex: 1; overflow-y: auto;
  display: flex; flex-direction: column; gap: 16px;
}

.section-block { display: flex; flex-direction: column; gap: 8px; }
.section-label { font-size: 10px; letter-spacing: 1px; }

/* 추천 인물 */
.recommend-row { display: flex; gap: 10px; flex-wrap: wrap; }

.char-card {
  display: flex; flex-direction: column; align-items: center; gap: 4px;
  padding: 10px 14px; min-width: 90px;
  background: var(--bg3); border: 1px solid var(--bd); border-radius: var(--r);
  cursor: pointer; transition: all .15s;
}
.char-card:hover   { background: var(--bgh); }
.char-card.selected { background: rgba(212,170,96,.07); }

.card-star   { font-size: 11px; }
.card-avatar {
  width: 40px; height: 40px; border-radius: 50%;
  background: var(--bg4); border: 1px solid var(--bd);
  display: flex; align-items: center; justify-content: center;
  font-size: 18px; color: var(--t1);
  transition: border-color .15s;
}
.card-name   { font-size: 12px; color: var(--t1); }
.card-faction { font-size: 10px; }

/* 검색 */
.search-input {
  width: 100%; padding: 7px 10px; font-size: 12px;
  background: var(--bg3); border: 1px solid var(--bd); border-radius: var(--r);
  color: var(--t1); outline: none;
}
.search-input:focus { border-color: var(--tg); }

/* 칩 그리드 */
.char-chip-grid { display: flex; flex-wrap: wrap; gap: 5px; }

.char-chip {
  padding: 4px 10px; font-size: 11px;
  background: var(--bg3); border: 1px solid var(--bd); border-radius: var(--r);
  cursor: pointer; transition: all .13s; color: var(--t2);
}
.char-chip:hover   { background: var(--bgh); color: var(--t1); }
.char-chip.selected { background: rgba(212,170,96,.08); }

/* 선택 바 */
.selected-bar {
  display: flex; align-items: center; gap: 12px;
  padding: 10px 14px; flex-shrink: 0;
  background: var(--bg4); border-radius: var(--r);
  border: 1px solid rgba(212,170,96,.3);
}
.sel-avatar {
  width: 36px; height: 36px; border-radius: 50%;
  background: var(--bg3); border: 2px solid var(--bd);
  display: flex; align-items: center; justify-content: center;
  font-size: 16px; flex-shrink: 0;
  transition: border-color .15s;
}

/* 네비 */
.step-nav {
  display: flex; justify-content: space-between; align-items: center;
  flex-shrink: 0; padding-top: 10px;
  border-top: 1px solid rgba(212,170,96,.2);
}
</style>
