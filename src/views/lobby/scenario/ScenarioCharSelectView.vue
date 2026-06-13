<template>
  <div class="page">

    <div class="top-nav">
      <div class="nav-title">
        <span class="serif">{{ navTitle }}</span>
        <span class="mono dim nav-year">{{ cur.nameKr }}</span>
      </div>
      <button class="close-btn mono" @click="router.push('/lobby/single/new')">✕</button>
    </div>

    <div class="body">
      <FactionFilter
        v-model:open="filterOpen"
        :model-value="factionFilter"
        :picked="factionPicked"
        :faction-list="cur.factions"
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

    <div class="selected-bar" v-if="selChar">
      <div class="sel-avatar serif" :style="{ borderColor: fcolor(selChar.faction) }">
        {{ NAMES_MAP[selChar.code]?.name?.[0] ?? '?' }}
      </div>
      <div class="sel-info">
        <span class="serif sel-name">{{ NAMES_MAP[selChar.code]?.name ?? selChar.code }}</span>
        <span class="mono sel-faction" :style="{ color: fcolor(selChar.faction) }">
          {{ FACTIONS[selChar.faction]?.name ?? selChar.faction }}
        </span>
      </div>
    </div>

    <div class="action-bar">
      <button class="btn" @click="router.back()">← 뒤로</button>
      <button class="btn btn-gold" :disabled="!selChar" @click="onNext">다음 →</button>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { SCENARIOS } from '@/data/scenario/scenarioData.js'
import { useGameStore } from '@/stores/gameStore'
import { useLobbyStore } from '@/stores/lobbyStore'
import { FACTIONS } from '@/data/masterData'
import { CHAR_BASE } from '@/data/base/characters/charactersData.js'
import { FACTION_NAMES } from '@/data/base/factions/factionName.js'
import FactionFilter  from './legacy/FactionFilter.vue'
import CharSelectGrid from './legacy/CharSelectGrid.vue'

const route  = useRoute()
const router = useRouter()
const game   = useGameStore()
const lobby  = useLobbyStore()

const cur     = computed(() => SCENARIOS.find(s => s.id === route.params.scId) ?? SCENARIOS[0])
const options = computed(() => lobby.options)

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

const navTitle = computed(() => {
  if (!factionPicked.value || filterOpen.value) return '국가 선택'
  return factionFilter.value
    ? `${FACTION_NAMES_MAP[factionFilter.value]?.name ?? factionFilter.value} 인물 선택`
    : '전체 인물 선택'
})

watchEffect(async () => {
  if (!cur.value?.id) return
  try {
    const [base, num] = cur.value.id.split('_')
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
  const yearType  = cur.value?.yearType
  const year      = cur.value?.year

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

function onNext() {
  if (!selChar.value) return
  lobby.selectedFaction = selChar.value.faction
  router.push({ name: 'scenario-detail', params: { scId: cur.value.id } })
}
</script>

<style scoped>
.page {
  width: 100%; height: 100%;
  display: flex; flex-direction: column;
  background: #020508;
  overflow: hidden;
}

.top-nav {
  display: flex; align-items: center;
  padding: 0 1.5vw; height: 7vh;
  background: rgba(2,5,8,.9);
  border-bottom: 1px solid rgba(212,170,96,.15);
  flex-shrink: 0;
}
.nav-title {
  flex: 1; display: flex; flex-direction: column; align-items: center; gap: 2px;
}
.nav-title .serif { font-size: 3.0vh; color: var(--t1); }
.nav-year { font-size: 1.8vh; }
.close-btn {
  flex-shrink: 0; width: 3.5vh; height: 3.5vh;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.6vh;
  background: rgba(255,255,255,.05);
  border: 1px solid rgba(255,255,255,.1);
  border-radius: 50%; color: var(--t2); cursor: pointer; transition: all .13s;
}
.close-btn:hover { color: var(--t1); border-color: rgba(255,255,255,.3); }

.body {
  flex: 1; overflow-y: auto;
  padding: 16px 20px;
  display: flex; flex-direction: column; gap: 16px;
}

.selected-bar {
  display: flex; align-items: center; gap: 12px;
  padding: 10px 20px; flex-shrink: 0;
  background: var(--bg4);
  border-top: 1px solid rgba(212,170,96,.2);
}
.sel-avatar {
  width: 3.5vh; height: 3.5vh; border-radius: 50%;
  background: var(--bg3); border: 2px solid var(--bd);
  display: flex; align-items: center; justify-content: center;
  font-size: 1.6vh; flex-shrink: 0; transition: border-color .15s;
}
.sel-info { display: flex; align-items: center; gap: 10px; }
.sel-name { font-size: 1.6vh; color: var(--t1); }
.sel-faction { font-size: 1.2vh; }

.action-bar {
  flex-shrink: 0; display: flex; align-items: stretch;
  padding: 0.1vh 2vw; height: 7vh; gap: 1.5vw;
  background: rgba(2,5,8,.85);
  border-top: 1px solid rgba(212,170,96,.15);
}
.action-bar > button {
  flex: 1; font-size: 1.8vh; padding: 0;
  display: flex; align-items: center; justify-content: center;
}
</style>
