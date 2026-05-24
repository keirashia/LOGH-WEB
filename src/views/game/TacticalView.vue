<template>
  <div class="tactical-view">
    <div class="tactical-header">
      <div class="title">Tactical Map</div>
      <div class="controls">
        <button class="btn" @click="endTurn">End Turn ({{ store.turn }})</button>
      </div>
    </div>

    <div class="tactical-body">
      <svg :viewBox="`0 0 ${mapW} ${mapH}`" class="tactical-svg" @click="onSvgClick($event)">
        <g v-for="tile in tiles" :key="`t-${tile.x}-${tile.y}`">
          <rect :x="tile.x*ts" :y="tile.y*ts" :width="ts" :height="ts"
                :fill="terrainColor(tile.terrain)" stroke="#222" />
        </g>

        <!-- units -->
        <g v-for="u in store.units" :key="u.id">
          <circle :cx="(u.x+0.5)*ts" :cy="(u.y+0.5)*ts" :r="ts*0.35"
                  :fill="u.faction==='EMPIRE'? '#c48' : '#48c'" stroke="#000" stroke-width="2"
                  :class="{ selected: store.selectedUnit===u.id }"
                  @click.stop="onUnitClick(u.id)" />
          <text :x="(u.x+0.5)*ts" :y="(u.y+0.5)*ts + ts*0.55" font-size="10" text-anchor="middle" fill="#fff">{{ u.hp }}</text>
        </g>
      </svg>

      <div class="side">
        <div class="panel">
          <h3>Selected</h3>
          <div v-if="selected">
            <div><strong>{{ selected.name }}</strong></div>
            <div>HP: {{ selected.hp }}</div>
            <div>Moves: {{ selected.moves }}</div>
            <div>Pos: {{ selected.x }}, {{ selected.y }}</div>
          </div>
          <div v-else>None</div>
        </div>

        <div class="panel logs">
          <h3>Logs</h3>
          <div v-for="(l, i) in store.logs.slice().reverse().slice(0,20)" :key="i">{{ l }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useTacticalStore } from '@/stores/tacticalStore'

const store = useTacticalStore()
const ts = 64 // tile size in SVG units

const tiles = computed(() => store.map.tiles)
const mapW = computed(() => store.map.width * ts)
const mapH = computed(() => store.map.height * ts)
const selected = computed(() => store.unitById(store.selectedUnit))

// cursor for keyboard-driven input (DOS-like)
const cursorX = ref(Math.floor((store.map.width||12)/2))
const cursorY = ref(Math.floor((store.map.height||8)/2))

function terrainColor(t){
  switch(t){
    case 'mountain': return '#6b6b6b'
    case 'water': return '#1f6ea5'
    default: return '#2b2f33'
  }
}

function onUnitClick(id){
  if(store.selectedUnit && store.selectedUnit!==id){
    // attempt attack
    store.attack(id)
  } else {
    store.selectUnit(id)
    // move cursor to selected unit
    const u = store.unitById(id)
    if(u){ cursorX.value = u.x; cursorY.value = u.y }
  }
}

function onSvgClick(e){
  const svg = e.currentTarget
  const pt = svg.createSVGPoint()
  pt.x = e.clientX; pt.y = e.clientY
  const ctm = svg.getScreenCTM().inverse()
  const loc = pt.matrixTransform(ctm)
  const tx = Math.floor(loc.x / ts)
  const ty = Math.floor(loc.y / ts)
  // emulate DOS: if a unit exists under cursor, select; else move selected unit
  const unitHere = store.units.find(u=>u.x===tx && u.y===ty)
  if(unitHere) onUnitClick(unitHere.id)
  else store.moveSelectedTo(tx, ty)
}

function tryAttackAtCursor(){
  const unitHere = store.units.find(u=>u.x===cursorX.value && u.y===cursorY.value)
  if(unitHere) return store.attack(unitHere.id)
  store.logs.push('공격 대상이 없습니다.')
  return false
}

function moveCursor(dx, dy){
  const w = store.map.width, h = store.map.height
  cursorX.value = Math.max(0, Math.min(w-1, cursorX.value + dx))
  cursorY.value = Math.max(0, Math.min(h-1, cursorY.value + dy))
}

function onKeyDown(e){
  const k = e.key
  if(k === 'ArrowLeft') { e.preventDefault(); moveCursor(-1,0) }
  else if(k === 'ArrowRight') { e.preventDefault(); moveCursor(1,0) }
  else if(k === 'ArrowUp') { e.preventDefault(); moveCursor(0,-1) }
  else if(k === 'ArrowDown') { e.preventDefault(); moveCursor(0,1) }
  else if(k === 'Enter') {
    // select unit under cursor or move selected unit there
    const unitHere = store.units.find(u=>u.x===cursorX.value && u.y===cursorY.value)
    if(unitHere) onUnitClick(unitHere.id)
    else store.moveSelectedTo(cursorX.value, cursorY.value)
  }
  else if(k === ' '){ e.preventDefault(); store.endTurn() }
  else if(k.toLowerCase() === 'a') { tryAttackAtCursor() }
  else if(k.toLowerCase() === 'm') { // manual move relative if unit selected
    // in DOS, M might open move menu; here just attempt move to cursor
    store.moveSelectedTo(cursorX.value, cursorY.value)
  }
}

onMounted(()=>{
  window.addEventListener('keydown', onKeyDown)
})
onUnmounted(()=>{
  window.removeEventListener('keydown', onKeyDown)
})

function endTurn(){ store.endTurn() }

</script>

<style scoped>
.tactical-view{display:flex;flex-direction:column;height:100vh;background:var(--bg);color:var(--t1)}
.tactical-header{display:flex;justify-content:space-between;align-items:center;padding:12px 16px;border-bottom:1px solid var(--bd)}
.tactical-body{display:flex;flex:1;gap:12px;padding:12px}
.tactical-svg{flex:1;background:#071018;border-radius:8px}
.side{width:260px;display:flex;flex-direction:column;gap:12px}
.panel{background:var(--bg4);padding:10px;border-radius:8px;border:1px solid var(--bd);min-height:80px}
.logs{overflow:auto;font-size:13px;max-height:60vh}
circle.selected{stroke:gold;stroke-width:3}
</style>
