<template>
  <div class="step-layout">

    <!-- 헤더 -->
    <div class="step-header">
<span class="serif gold" style="font-size:17px">{{ (factionPicked && !filterOpen) ? `${factionFilter ? (FACTION_NAMES_MAP[factionFilter]?.name ?? factionFilter) : '전체'} 인물 선택` : '국가 선택' }}</span>
    </div>
    <!-- 시나리오 개요 -->
    <div class="event-summary panel">
      <div class="serif" style="font-size:15px">{{ event?.nameKr }}</div>
      <div class="mono dim" style="font-size:11px;margin-top:3px">
        SE {{ event?.year }}년
        <span v-if="event?.month"> {{ event?.month }}월</span>
      </div>
    </div>

    <div class="char-body">

      <FactionFilter
        v-model:open="filterOpen"
        :model-value="factionFilter"
        :picked="factionPicked"
        :faction-list="factionList"
        :faction-names-map="FACTION_NAMES_MAP"
        :factions="FACTIONS"
        @select="selectFaction"
      />

      <CharSelectGrid
        v-if="factionPicked && !filterOpen"
        v-model="selChar"
        :chars="scenarioChars"
        :names-map="NAMES_MAP"
        :faction-names="FACTION_NAMES_MAP"
        :factions="FACTIONS"
      />

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
import { ref, computed, watchEffect } from 'vue'
import { FACTIONS } from '@/data/masterData'
import { CHAR_BASE } from '@/data/base/characters/charactersData.js'
import { FACTION_NAMES } from '@/data/base/factions/factionName.js'
import CharSelectGrid from './CharSelectGrid.vue'
import FactionFilter  from './FactionFilter.vue'

const props = defineProps({ event: Object, options: Object })
defineEmits(['back', 'start'])

const NAMES_MAP = Object.fromEntries(
  CHAR_BASE.map(c => [c.code, { name: c.nameKr, nick: c.nickKr }])
)
const FACTION_NAMES_MAP = Object.fromEntries(
  FACTION_NAMES.filter(n => n.lang === 'Kr').map(n => [n.factionId, n])
)

const selChar       = ref(null)
const factionFilter = ref(null)
const factionPicked = ref(false)
const filterOpen    = ref(true)
const charList      = ref([])

const factionSet  = computed(() => new Set(props.event?.factions ?? []))
const factionList = computed(() => props.event?.factions ?? [])

watchEffect(async () => {
  if (!props.event?.id) return
  try {
    const [base, num] = props.event.id.split('_')
    const folder = num.padStart(2, '0')
    const mod = await import(`@/data/scenario/${base}/${folder}/charList.js`)
    charList.value = mod.CHAR_LIST
  } catch {
    charList.value = []
  }
})

function isAliveAt(char, yearType, year) {
  if (char.birth) {
    const [bType, bRest] = char.birth.split('|')
    const bYear = parseInt(bRest)
    if (bType === yearType && !isNaN(bYear) && bYear > year) return false
  }
  if (char.death) {
    const [dType, dRest] = char.death.split('|')
    const dYear = parseInt(dRest)
    if (dType === yearType && !isNaN(dYear) && dYear < year) return false
  }
  return true
}

const scenarioChars = computed(() => {
  const listedMap = Object.fromEntries(charList.value.map(c => [c.charCode, c]))
  const isFact = props.options?.npcAppearance === 'fact'
  const yearType = props.event?.yearType
  const year = props.event?.year

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


function selectFaction(fid) {
  factionFilter.value = fid
  factionPicked.value = true
  filterOpen.value = false
}

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
.step-header   { display: flex; align-items: center; gap: 14px; flex-shrink: 0; }
.event-summary {
  flex-shrink: 0; padding: 12px 14px;
  background: linear-gradient(165deg, #0d1b2a 0%, #1a082e 60%, #0d1520 100%);
  border: 2px solid rgba(212,170,96,.8);
  border-radius: 14px;
  box-shadow:
    inset 0 0 0 5px #0d1520,
    inset 0 0 0 7px rgba(212,170,96,.22),
    0 8px 32px rgba(0,0,0,.85);
}

/* 바디 */
.char-body {
  flex: 1; overflow-y: auto;
  display: flex; flex-direction: column; gap: 16px;
}

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
