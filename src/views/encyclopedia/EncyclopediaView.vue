<template>
  <div class="placeholder-wrap">
    <canvas ref="cvs" class="starfield"/>
    <div class="ph-box panel">
      <div class="serif gold" style="font-size:22px;letter-spacing:2px">📖 사전</div>
      <div class="dim" style="font-size:13px;margin-top:8px">준비 중입니다.</div>
      <button class="btn btn-gold" style="margin-top:16px" @click="$router.back()">← 뒤로</button>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
const cvs = ref(null); let aid = null
onMounted(() => {
  const c = cvs.value, ctx = c.getContext('2d')
  let w = c.width = innerWidth, h = c.height = innerHeight
  const stars = Array.from({length:150}, () => ({ x:Math.random()*w, y:Math.random()*h, r:Math.random()*.9+.1, tw:Math.random()*Math.PI*2, sp:Math.random()*.15+.02 }))
  function draw() {
    ctx.fillStyle='#020508'; ctx.fillRect(0,0,w,h)
    stars.forEach(s => { s.tw+=.01; s.x-=s.sp; if(s.x<0){s.x=w;s.y=Math.random()*h} ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2); ctx.fillStyle=`rgba(200,220,255,${.1+Math.sin(s.tw)*.18})`; ctx.fill() })
    aid = requestAnimationFrame(draw)
  }
  draw()
  onUnmounted(() => cancelAnimationFrame(aid))
})
</script>
<style scoped>
.placeholder-wrap{position:relative;width:100%;height:100vh;display:flex;align-items:center;justify-content:center;overflow:hidden}
.starfield{position:absolute;inset:0;z-index:0}
.ph-box{position:relative;z-index:1;padding:36px 48px;display:flex;flex-direction:column;align-items:center;text-align:center}
</style>