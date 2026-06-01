<template>
  <div class="lobby-wrap">
    <canvas ref="cvs" class="starfield" />


    <div class="lobby-layout">
      <div class="lobby-title">
        <span class="serif gold lbt-main">銀河英雄伝説</span>
        <span class="mono dim lbt-sub">LEGEND OF GALACTIC HEROES · IV EX</span>
      </div>

      <nav class="menu-grid">
        <button class="menu-btn" @click="$router.push('/lobby/single')">
          <span class="mb-icon">⚔️</span>
          <span class="mb-title serif">싱글플레이</span>
          <span class="mb-desc dim">AI와 대결하거나 역사를 재현</span>
        </button>

        <button class="menu-btn" :class="{ disabled: !auth.isLoggedIn }" @click="goMulti">
          <span class="mb-icon">🌌</span>
          <span class="mb-title serif">멀티플레이</span>
          <span class="mb-desc dim">{{ auth.isLoggedIn ? '시즌 서버에 접속하여 다른 플레이어와 대결' : '로그인이 필요합니다' }}</span>
        </button>

        <button class="menu-btn" @click="$router.push('/lobby/encyclopedia')">
          <span class="mb-icon">📖</span>
          <span class="mb-title serif">사전</span>
          <span class="mb-desc dim">인물·성계·함선 데이터베이스</span>
        </button>

        <button class="menu-btn" @click="$router.push('/tutorial')">
          <span class="mb-icon">🎓</span>
          <span class="mb-title serif">튜토리얼</span>
          <span class="mb-desc dim">게임 진행 방법을 배워보세요</span>
        </button>
      </nav>

      <div v-if="!auth.isLoggedIn" class="login-notice dim mono">
        ⚠ 로그인하지 않으면 게임 기록이 저장되지 않습니다
      </div>

      <div class="lobby-footer">
        <button class="btn" @click="$router.push('/')">← 타이틀</button>
        <button v-if="auth.isAdmin" class="btn btn-red" @click="$router.push('/admin')">⚙️ 관리자</button>
      </div>
    </div>
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

function goMulti() {
  if (!auth.isLoggedIn) return
  // Phase 3: router.push('/lobby/multi')
  alert('멀티플레이 서버는 준비 중입니다.')
}

onMounted(() => {
  const c = cvs.value, ctx = c.getContext('2d')
  let w = c.width = innerWidth, h = c.height = innerHeight
  const stars = Array.from({ length: 250 }, () => ({
    x: Math.random() * w, y: Math.random() * h,
    r: Math.random() * 1.2 + .1, tw: Math.random() * Math.PI * 2, sp: Math.random() * .2 + .02,
  }))
  const nebs = Array.from({ length: 3 }, () => ({
    x: Math.random() * w, y: Math.random() * h, r: 100 + Math.random() * 100,
    cl: ['rgba(41,128,185,', 'rgba(192,57,43,', 'rgba(100,50,180,'][Math.floor(Math.random() * 3)],
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
.lobby-wrap { position: relative; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; overflow: hidden; }
.starfield  { position: absolute; inset: 0; z-index: 0; }
.lobby-layout {
  position: relative; z-index: 1;
  display: flex; flex-direction: column; align-items: center;
  gap: 28px; padding: 24px; width: 100%; max-width: 700px;
}

/* 타이틀 */
.lobby-title { display: flex; flex-direction: column; align-items: center; gap: 4px; }
.lbt-main { font-size: clamp(22px, 3.5vw, 36px); letter-spacing: 4px; text-shadow: 0 0 24px rgba(212,170,96,.45); }
.lbt-sub  { font-size: clamp(9px, 1vw, 11px); letter-spacing: 3px; }

/* 메뉴 그리드 */
.menu-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
  width: 100%;
}
.menu-btn {
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  padding: clamp(20px, 3vh, 32px) 20px;
  background: var(--bg3); border: 1px solid var(--bd); border-radius: var(--r);
  cursor: pointer; transition: all .2s;
}
.menu-btn:hover:not(.disabled) {
  background: var(--bgh); border-color: var(--bdg);
  transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,.4);
}
.menu-btn.disabled { opacity: .45; cursor: not-allowed; }
.mb-icon  { font-size: clamp(28px, 4vw, 40px); }
.mb-title { font-size: clamp(13px, 1.6vw, 17px); letter-spacing: 2px; color: var(--tg); }
.mb-desc  { font-size: clamp(9px, 1vw, 11px); text-align: center; line-height: 1.6; max-width: 180px; }

/* 하단 */
.login-notice { font-size: 11px; letter-spacing: 1px; }
.lobby-footer { display: flex; gap: 10px; align-items: center; }

</style>
