<template>
  <div class="title-wrap">
    <canvas ref="cvs" class="starfield" />
    <div class="title-inner">
      <p class="t-sub mono">LEGEND OF GALACTIC HEROES</p>
      <h1 class="t-main serif">銀河英雄伝説</h1>
      <p class="t-kr serif">은하영웅전설</p>
      <span class="t-ver mono">IV EX · Vue Port</span>
      <div class="t-btns">
        <button class="tbtn gold-btn serif" @click="$router.push('/user/login')">🔑 로그인 / 계정생성</button>
        <button class="tbtn mid-btn serif"  @click="guestStart">⚔️ 빠른 시작 (게스트)</button>
        <button class="tbtn dim-btn serif"  @click="$router.push('/tutorial')">🎓 튜토리얼</button>
        <button class="tbtn dim-btn serif"  @click="$router.push('/encyclopedia')">📖 사전</button>
      </div>
      <!-- <p class="t-credit dim mono">원작: BOTHTEC (1996)</p> -->
    </div>
    <div v-for="c in ['tl','tr','bl','br']" :key="c" :class="['corner', c]" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
const router = useRouter()
const auth   = useAuthStore()
const cvs    = ref(null)
let aid = null

function guestStart() {
  auth.user = { id: 0, username: '게스트', email: '', isAdmin: false }
  auth.isLoggedIn = true
  router.push('/lobby')
}

onMounted(() => {
  const c = cvs.value, ctx = c.getContext('2d')
  let w = c.width = innerWidth, h = c.height = innerHeight
  const stars = Array.from({length:300}, () => ({
    x:Math.random()*w, y:Math.random()*h,
    r:Math.random()*1.3+.1, tw:Math.random()*Math.PI*2, sp:Math.random()*.25+.03,
  }))
  const nebs = Array.from({length:4}, () => ({
    x:Math.random()*w, y:Math.random()*h, r:80+Math.random()*120,
    cl:['rgba(41,128,185,','rgba(192,57,43,','rgba(100,50,180,'][Math.floor(Math.random()*3)],
  }))
  function draw() {
    ctx.fillStyle='#020508'; ctx.fillRect(0,0,w,h)
    nebs.forEach(n=>{
      const g=ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,n.r)
      g.addColorStop(0,`${n.cl}0.05)`);g.addColorStop(1,`${n.cl}0)`)
      ctx.fillStyle=g;ctx.beginPath();ctx.arc(n.x,n.y,n.r,0,Math.PI*2);ctx.fill()
    })
    stars.forEach(s=>{
      s.tw+=.012;s.x-=s.sp;if(s.x<0){s.x=w;s.y=Math.random()*h}
      ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2)
      ctx.fillStyle=`rgba(200,220,255,${.15+Math.sin(s.tw)*.25})`;ctx.fill()
    })
    aid=requestAnimationFrame(draw)
  }
  draw()
  const onr=()=>{w=c.width=innerWidth;h=c.height=innerHeight}
  addEventListener('resize',onr)
  onUnmounted(()=>{cancelAnimationFrame(aid);removeEventListener('resize',onr)})
})
</script>

<style scoped>
.title-wrap{position:relative;width:100%;height:100%;display:flex;align-items:center;justify-content:center;overflow:hidden}
.starfield{position:absolute;inset:0;z-index:0}
.title-inner{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;gap:10px;text-align:center;padding:20px}
.t-sub{font-size:11px;letter-spacing:5px;color:var(--t2);text-transform:uppercase}
.t-main{font-size:clamp(36px,6vw,72px);color:var(--tg);letter-spacing:6px;text-shadow:0 0 30px rgba(212,170,96,.5);animation:pulse 3s ease-in-out infinite}
.t-kr{font-size:20px;letter-spacing:3px;margin-bottom:4px}
.t-ver{font-size:10px;color:var(--t2);border:1px solid var(--bd);padding:2px 10px;border-radius:3px;letter-spacing:2px}
.t-btns{display:flex;flex-direction:column;gap:9px;min-width:240px;margin-top:16px}
.tbtn{padding:11px 24px;font-size:14px;letter-spacing:1.5px;border-radius:var(--r);transition:all .2s;border:1px solid var(--bd);cursor:pointer}
.gold-btn{border-color:var(--tg);color:var(--tg);background:rgba(212,170,96,.08)}
.gold-btn:hover{background:rgba(212,170,96,.18);box-shadow:0 0 20px rgba(212,170,96,.3);transform:translateY(-1px)}
.mid-btn{border-color:var(--bdg);color:var(--t1);background:var(--bg3)}
.mid-btn:hover{background:var(--bgh);transform:translateY(-1px)}
.dim-btn{color:var(--t2);background:none;border-color:var(--bd)}
.dim-btn:hover{background:var(--bg3);color:var(--t1)}
.t-credit{font-size:10px;letter-spacing:1px;margin-top:8px}
.corner{position:absolute;width:22px;height:22px;border-color:var(--tg);border-style:solid;opacity:.4}
.corner.tl{top:18px;left:18px;border-width:2px 0 0 2px}
.corner.tr{top:18px;right:18px;border-width:2px 2px 0 0}
.corner.bl{bottom:18px;left:18px;border-width:0 0 2px 2px}
.corner.br{bottom:18px;right:18px;border-width:0 2px 2px 0}
@keyframes pulse{0%,100%{opacity:.7}50%{opacity:1}}
</style>