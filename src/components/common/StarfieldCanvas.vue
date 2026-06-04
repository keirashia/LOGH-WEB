<template>
  <canvas ref="cvs" class="starfield" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  starCount: { type: Number, default: 200 },
  nebColors: { type: Array,  default: () => ['rgba(41,128,185,', 'rgba(100,50,180,'] },
})

const cvs = ref(null)
let aid   = null

onMounted(() => {
  const c = cvs.value, ctx = c.getContext('2d')
  let w = c.width = innerWidth, h = c.height = innerHeight

  const stars = Array.from({ length: props.starCount }, () => ({
    x: Math.random() * w, y: Math.random() * h,
    r: Math.random() * 1.2 + .1, tw: Math.random() * Math.PI * 2, sp: Math.random() * .2 + .02,
  }))
  const nebs = Array.from({ length: props.nebColors.length }, () => ({
    x: Math.random() * w, y: Math.random() * h, r: 80 + Math.random() * 100,
    cl: props.nebColors[Math.floor(Math.random() * props.nebColors.length)],
  }))

  function draw() {
    ctx.fillStyle = '#020508'; ctx.fillRect(0, 0, w, h)
    nebs.forEach(n => {
      const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r)
      g.addColorStop(0, `${n.cl}0.05)`); g.addColorStop(1, `${n.cl}0)`)
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill()
    })
    stars.forEach(s => {
      s.tw += .011; s.x -= s.sp; if (s.x < 0) { s.x = w; s.y = Math.random() * h }
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(200,220,255,${.13 + Math.sin(s.tw) * .22})`; ctx.fill()
    })
    aid = requestAnimationFrame(draw)
  }
  draw()

  const onr = () => { w = c.width = innerWidth; h = c.height = innerHeight }
  addEventListener('resize', onr)
  onUnmounted(() => { cancelAnimationFrame(aid); removeEventListener('resize', onr) })
})
</script>

<style scoped>
.starfield { position: absolute; inset: 0; z-index: 0; }
</style>
