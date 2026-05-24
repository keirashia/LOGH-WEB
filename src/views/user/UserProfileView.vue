<template>
  <div class="profile-wrap">
    <canvas ref="cvs" class="starfield"/>
    <div class="profile-layout">
      <header class="profile-hdr">
        <button class="btn" @click="$router.back()">← 뒤로</button>
        <h2 class="serif gold">계정 정보</h2>
      </header>

      <div class="profile-body">
        <!-- 프로필 카드 -->
        <div class="profile-card panel">
          <div class="pc-avatar">{{ avatarEmoji }}</div>
          <div class="pc-name serif gold">{{ auth.username }}</div>
          <div class="pc-type dim mono">{{ accountType }}</div>
          <div v-if="auth.isAdmin" class="pc-admin">⚙️ 관리자 계정</div>
        </div>

        <!-- 계정 상세 -->
        <div class="profile-details panel">
          <div class="pd-title serif">계정 상세</div>
          <div class="pd-row">
            <span class="dim">아이디</span>
            <span class="mono">{{ auth.username }}</span>
          </div>
          <div class="pd-row" v-if="auth.user?.email">
            <span class="dim">이메일</span>
            <span class="mono">{{ auth.user.email }}</span>
          </div>
          <div class="pd-row">
            <span class="dim">계정 유형</span>
            <span>{{ accountType }}</span>
          </div>
        </div>

        <!-- 기기 이전 -->
        <div class="transfer-card panel" v-if="auth.isLoggedIn && auth.user?.id !== 0">
          <div class="pd-title serif">📲 기기 이전</div>
          <p class="dim" style="font-size:12px;line-height:1.7">
            새 기기에서 계정을 복구하려면 이전 코드를 발급하여 새 기기의 로그인 화면에 입력하세요.
          </p>
          <button class="btn btn-gold" style="margin-top:10px" @click="getCode" :disabled="loading">
            {{ loading ? '발급 중...' : '이전 코드 발급' }}
          </button>
          <div v-if="code" class="code-display">
            <div class="dim mono" style="font-size:10px;margin-bottom:4px">이전 코드 (24시간 유효)</div>
            <div class="code-value mono gold">{{ code }}</div>
          </div>
        </div>

        <!-- 로그아웃 -->
        <button class="btn btn-red logout-btn" @click="logout">로그아웃</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const auth   = useAuthStore()
const cvs    = ref(null)
const loading= ref(false)
const code   = ref(null)
let aid = null

const avatarEmoji = computed(() => {
  if (auth.isAdmin) return '⚙️'
  if (auth.user?.id === 0) return '👤'
  const emojis = ['👑','🌟','⚡','🦅','🎓','🛡️','💚']
  return emojis[(auth.user?.id || 0) % emojis.length]
})

const accountType = computed(() => {
  if (!auth.isLoggedIn) return '비로그인'
  if (auth.user?.id === 0) return '게스트'
  if (auth.isAdmin) return '관리자'
  return '일반 회원'
})

async function getCode() {
  loading.value = true
  code.value = await auth.generateTransferCode()
  loading.value = false
}

function logout() {
  auth.logout()
  router.push('/')
}

onMounted(() => {
  const c = cvs.value, ctx = c.getContext('2d')
  let w = c.width = innerWidth, h = c.height = innerHeight
  const stars = Array.from({length:150}, () => ({
    x:Math.random()*w, y:Math.random()*h, r:Math.random()*.9+.1,
    tw:Math.random()*Math.PI*2, sp:Math.random()*.15+.02,
  }))
  function draw() {
    ctx.fillStyle='#020508'; ctx.fillRect(0,0,w,h)
    stars.forEach(s => {
      s.tw+=.01; s.x-=s.sp; if(s.x<0){s.x=w; s.y=Math.random()*h}
      ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2)
      ctx.fillStyle=`rgba(200,220,255,${.1+Math.sin(s.tw)*.18})`; ctx.fill()
    })
    aid = requestAnimationFrame(draw)
  }
  draw()
  onUnmounted(() => cancelAnimationFrame(aid))
})
</script>

<style scoped>
.profile-wrap{position:relative;width:100%;height:100vh;overflow:hidden}
.starfield{position:absolute;inset:0;z-index:0}
.profile-layout{position:relative;z-index:1;display:flex;flex-direction:column;height:100%;padding:16px 20px;gap:14px}
.profile-hdr{display:flex;align-items:center;gap:14px}
.profile-body{display:flex;flex-direction:column;gap:12px;max-width:440px;overflow-y:auto}
.profile-card{display:flex;flex-direction:column;align-items:center;gap:6px;padding:24px}
.pc-avatar{font-size:52px}
.pc-name{font-size:20px;letter-spacing:1px}
.pc-type{font-size:11px}
.pc-admin{font-size:11px;color:var(--ta);margin-top:2px}
.profile-details,.transfer-card{padding:16px;display:flex;flex-direction:column;gap:9px}
.pd-title{font-size:14px;margin-bottom:4px;color:var(--tg)}
.pd-row{display:flex;justify-content:space-between;align-items:center;font-size:12px}
.code-display{margin-top:10px;padding:10px;background:var(--bg4);border-radius:var(--r);text-align:center}
.code-value{font-size:18px;letter-spacing:3px;margin-top:4px}
.logout-btn{width:100%;justify-content:center;padding:11px;font-size:13px}
</style>