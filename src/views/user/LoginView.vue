<template>
  <div class="auth-wrap">
    <canvas ref="cvs" class="starfield" />
    <div class="auth-box panel">
      <div class="auth-logo serif gold">銀河英雄伝説</div>
      <div class="auth-tabs">
        <button :class="{ on: tab==='login' }"    @click="tab='login'">로그인</button>
        <button :class="{ on: tab==='register' }" @click="tab='register'">계정 생성</button>
        <button :class="{ on: tab==='transfer' }" @click="tab='transfer'">기기 이전</button>
      </div>

      <!-- 로그인 -->
      <div v-show="tab==='login'" class="auth-form">
        <div class="field-label dim">아이디</div>
        <input v-model="form.username" class="auth-input" placeholder="아이디 입력" @keyup.enter="submit"/>
        <div class="field-label dim">비밀번호</div>
        <input v-model="form.password" class="auth-input" type="password" placeholder="비밀번호 입력" @keyup.enter="submit"/>
        <button class="btn btn-gold auth-btn serif" @click="submit" :disabled="loading">
          {{ loading ? '로그인 중...' : '로그인' }}
        </button>
        <button class="btn auth-btn-ghost" @click="guestLogin">게스트로 시작</button>
      </div>

      <!-- 계정 생성 -->
      <div v-show="tab==='register'" class="auth-form">
        <div class="field-label dim">아이디</div>
        <input v-model="form.username" class="auth-input" placeholder="아이디 (4~16자)"/>
        <div class="field-label dim">비밀번호</div>
        <input v-model="form.password" class="auth-input" type="password" placeholder="비밀번호 (8자 이상)"/>
        <div class="field-label dim">이메일 (선택)</div>
        <input v-model="form.email"    class="auth-input" placeholder="이메일"/>
        <div class="sub-btns">
          <button class="btn auth-btn-ghost" @click="tab='transfer'">📲 데이터 수신</button>
        </div>
        <button class="btn btn-gold auth-btn serif" @click="submit" :disabled="loading">
          {{ loading ? '처리 중...' : '계정 생성' }}
        </button>
      </div>

      <!-- 기기 이전 (데이터 수신) -->
      <div v-show="tab==='transfer'" class="auth-form">
        <div class="transfer-desc dim">
          기존 기기에서 발급한 이전 코드를 입력하세요.
        </div>
        <div class="field-label dim">이전 코드</div>
        <input v-model="form.transferCode" class="auth-input mono"
               placeholder="LOGH-XXXXXXXX" style="letter-spacing:2px; text-transform:uppercase"/>
        <button class="btn btn-gold auth-btn serif" @click="submit" :disabled="loading">
          {{ loading ? '확인 중...' : '데이터 수신' }}
        </button>
      </div>

      <!-- 에러 메시지 -->
      <div v-if="error" class="auth-error">{{ error }}</div>

      <button class="btn auth-back" @click="$router.push('/')">← 타이틀로</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const route  = useRoute()
const auth   = useAuthStore()
const cvs    = ref(null)
const tab    = ref(String(route.query.tab || 'login'))
const loading= ref(false)
const error  = ref('')
const form   = ref({ username:'', password:'', email:'', transferCode:'' })

watch(() => route.query.tab, (value) => {
  if (value) tab.value = String(value)
})

let aid = null

async function submit() {
  error.value = ''
  loading.value = true
  try {
    if (tab.value === 'login') {
      await auth.login(form.value.username, form.value.password)
      router.push('/lobby')
    } else if (tab.value === 'register') {
      if (form.value.username.length < 4) { error.value = '아이디는 4자 이상이어야 합니다.'; return }
      if (form.value.password.length < 8) { error.value = '비밀번호는 8자 이상이어야 합니다.'; return }
      await auth.register(form.value.username, form.value.password, form.value.email)
      router.push('/lobby')
    } else if (tab.value === 'transfer') {
      if (!form.value.transferCode) { error.value = '이전 코드를 입력해주세요.'; return }
      await auth.transferAccount(form.value.transferCode.toUpperCase())
      router.push('/lobby')
    }
  } catch(e) {
    error.value = e.message || '처리 중 오류가 발생했습니다.'
  } finally {
    loading.value = false
  }
}

function guestLogin() {
  auth.setMode('single')
  router.push('/lobby')
}

onMounted(() => {
  const c = cvs.value, ctx = c.getContext('2d')
  let w = c.width = innerWidth, h = c.height = innerHeight
  const stars = Array.from({length:200}, () => ({
    x:Math.random()*w, y:Math.random()*h,
    r:Math.random()*1.1+.1, tw:Math.random()*Math.PI*2, sp:Math.random()*.18+.02,
  }))
  function draw() {
    ctx.fillStyle='#020508'; ctx.fillRect(0,0,w,h)
    stars.forEach(s => {
      s.tw+=.012; s.x-=s.sp; if(s.x<0){s.x=w; s.y=Math.random()*h}
      ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2)
      ctx.fillStyle=`rgba(200,220,255,${.12+Math.sin(s.tw)*.2})`; ctx.fill()
    })
    aid = requestAnimationFrame(draw)
  }
  draw()
  onUnmounted(() => cancelAnimationFrame(aid))
})
</script>

<style scoped>
.auth-wrap{position:relative;width:100%;height:100vh;display:flex;align-items:center;justify-content:center;overflow:hidden}
.starfield{position:absolute;inset:0;z-index:0}
.auth-box{position:relative;z-index:1;width:min(90vw,380px);padding:28px;display:flex;flex-direction:column;gap:14px;min-height:72vh;max-height:72vh}
.auth-logo{font-size:22px;letter-spacing:4px;text-align:center}
.auth-tabs{display:flex;gap:0;border:1px solid var(--bd);border-radius:var(--r);overflow:hidden;flex-shrink:0}
.auth-tabs button{flex:1;padding:8px 4px;background:none;border:none;color:var(--t2);font-size:11px;cursor:pointer;transition:all .15s;font-family:var(--font-sans)}
.auth-tabs button.on{background:rgba(212,170,96,.12);color:var(--tg)}
.auth-form{display:flex;flex-direction:column;gap:8px;flex:1;min-height:0;overflow-y:auto}
.field-label{font-size:11px;letter-spacing:.5px}
.auth-input{background:var(--bg4);border:1px solid var(--bd);border-radius:4px;padding:9px 12px;color:var(--t1);font-size:13px;font-family:var(--font-sans);outline:none;transition:border .15s}
.auth-input:focus{border-color:var(--tg)}
.auth-btn{width:100%;justify-content:center;padding:11px;font-size:14px;letter-spacing:1px;margin-top:4px}
.auth-btn-ghost{width:100%;justify-content:center;padding:9px;font-size:12px;color:var(--t2);border:1px solid var(--bd);border-radius:4px;background:none;cursor:pointer;transition:all .15s}
.auth-btn-ghost:hover{background:var(--bgh);color:var(--t1)}
.sub-btns{display:flex;gap:6px}
.sub-btns .auth-btn-ghost{font-size:11px}
.transfer-desc{font-size:12px;line-height:1.7;padding:10px;background:var(--bg4);border-radius:var(--r)}
.auth-error{color:var(--ta);font-size:11px;text-align:center;padding:6px;background:rgba(192,57,43,.1);border-radius:4px}
.auth-back{justify-content:center;font-size:11px;color:var(--t2);width:100%}
</style>