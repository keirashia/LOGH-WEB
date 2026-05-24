<template>
  <div class="map-wrap">
    <canvas ref="bgCvs" class="map-bg" />
    <svg class="map-svg" viewBox="0 0 500 400"
         @click.self="game.selectSystem(null)">
      <!-- 항로 -->
      <line v-for="l in lanes" :key="l.k"
        :x1="l.x1" :y1="l.y1" :x2="l.x2" :y2="l.y2"
        stroke="rgba(255,255,255,0.07)" stroke-width="1" stroke-dasharray="3 8"/>
      <!-- 함대 마커 -->
      <g v-for="f in game.allFleets" :key="f.id"
         :transform="`translate(${f.sx+17},${f.sy-11})`"
         class="fleet-dot" :class="{ sel: game.selectedFleet===f.id }"
         @click.stop="game.selectFleet(f.id)">
        <circle r="7" :fill="`${fclr[f.faction]}44`"
                :stroke="fclr[f.faction]" stroke-width="1.5"/>
        <text text-anchor="middle" dy="4" font-size="8" fill="white">🚀</text>
      </g>
      <!-- 성계 -->
      <g v-for="s in systems" :key="s.id"
         :transform="`translate(${s.x},${s.y})`"
         class="sys-node" @click.stop="game.selectSystem(s.id)">
        <circle v-if="game.selectedSystem===s.id"
                :r="nr(s)+8" fill="none"
                :stroke="fclr[s.faction]||'#555'"
                stroke-width="1.5" opacity=".8"
                style="animation:pulse 1.5s ease-in-out infinite"/>
        <circle :r="nr(s)" :fill="`${fclr[s.faction]||'#333'}33`"/>
        <circle :r="nr(s)*.62"
                :fill="fclr[s.faction]||'#2a3a4a'"
                :stroke="fclr[s.faction]||'#555'" stroke-width="1.5"/>
        <text text-anchor="middle" dy="5" :font-size="s.type==='capital'?13:10">
          {{ ico(s) }}
        </text>
        <text class="sys-lbl" text-anchor="middle" :dy="nr(s)+13"
              font-size="9" :fill="fclr[s.faction]||'#6a8aaa'">{{ s.name }}</text>
        <text v-if="s.underConstruction" text-anchor="middle"
              :dy="-nr(s)-4" font-size="9">🔧</text>
      </g>
    </svg>
    <!-- 범례 -->
    <div class="map-legend panel">
      <div v-for="(f,fid) in FACTIONS" :key="fid" class="leg-row">
        <span class="leg-dot" :style="`background:${f.color}`"/>
        <span class="dim" style="font-size:10px">{{ f.name }}</span>
      </div>
      <div class="leg-row">
        <span class="leg-dot" style="background:#555"/>
        <span class="dim" style="font-size:10px">중립</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import { FACTIONS, STAR_SYSTEMS, LANES as LANE_DEF } from '@/data/masterData'

const game = useGameStore()
const bgCvs = ref(null)
let aid = null

const fclr = computed(() => game.fColors)
const systems = computed(() => Object.values(game.systems))

const lanes = (() => {
  const m = {}; STAR_SYSTEMS.forEach(s => { m[s.id] = s })
  return LANE_DEF.map(([a,b]) => ({
    k:`${a}-${b}`, x1:m[a]?.x, y1:m[a]?.y, x2:m[b]?.x, y2:m[b]?.y
  })).filter(l => l.x1 != null)
})()

function nr(s) {
  if (s.type==='capital') return 16
  if (s.type==='fortress') return 13
  if (s.isGateway) return 14
  return 10
}
function ico(s) {
  if (s.type==='capital') return '🏛'
  if (s.type==='fortress') return '🏰'
  if (s.isGateway) return '🌀'
  if (s.type==='contested') return '⚡'
  return '⭐'
}

onMounted(() => {
  const c = bgCvs.value
  if (!c) return
  const ctx = c.getContext('2d')
  let w = c.width = c.offsetWidth || 500
  let h = c.height = c.offsetHeight || 400
  const stars = Array.from({length:320}, () => ({
    x:Math.random()*w, y:Math.random()*h,
    r:Math.random()*.9+.1, tw:Math.random()*Math.PI*2, sp:Math.random()*.15+.02,
  }))
  const nebs = Array.from({length:3}, () => ({
    x:Math.random()*w, y:Math.random()*h, r:70+Math.random()*100,
    cl:['rgba(41,128,185,','rgba(192,57,43,','rgba(80,40,140,'][Math.floor(Math.random()*3)],
  }))
  function draw() {
    ctx.fillStyle='#020508'; ctx.fillRect(0,0,w,h)
    nebs.forEach(n => {
      const g = ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,n.r)
      g.addColorStop(0,`${n.cl}0.05)`); g.addColorStop(1,`${n.cl}0)`)
      ctx.fillStyle=g; ctx.beginPath(); ctx.arc(n.x,n.y,n.r,0,Math.PI*2); ctx.fill()
    })
    stars.forEach(s => {
      s.tw+=.01; s.x-=s.sp; if(s.x<0){s.x=w; s.y=Math.random()*h}
      ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2)
      ctx.fillStyle=`rgba(200,220,255,${.1+Math.sin(s.tw)*.2})`; ctx.fill()
    })
    aid = requestAnimationFrame(draw)
  }
  draw()
})
onUnmounted(() => cancelAnimationFrame(aid))
</script>

<style scoped>
.map-wrap{position:relative;flex:1;overflow:hidden;background:var(--bg)}
.map-bg{position:absolute;inset:0;width:100%;height:100%}
.map-svg{position:absolute;inset:0;width:100%;height:100%}
.sys-node{cursor:pointer}
.sys-lbl{pointer-events:none;font-family:var(--font-sans)}
.fleet-dot{cursor:pointer}
.fleet-dot.sel circle{stroke-width:2.5}
.map-legend{position:absolute;bottom:10px;left:10px;padding:7px 11px;display:flex;flex-direction:column;gap:4px;pointer-events:none}
.leg-row{display:flex;align-items:center;gap:6px}
.leg-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0;display:inline-block}
@keyframes pulse{0%,100%{opacity:.5}50%{opacity:1}}
</style>