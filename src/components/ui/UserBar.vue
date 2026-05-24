<template>
  <div class="userbar" :class="{ open }">
    <div class="userbar-row" @click="open = !open">
      <div class="user-left">
        <span class="mono user-name">{{ user?.username || '게스트' }}</span>
        <span class="dim user-email">{{ user?.email || '' }}</span>
      </div>
      <div class="user-right">
        <button class="btn small" @click.stop="goProfile">프로필</button>
        <button class="btn small" @click.stop="logout">로그아웃</button>
        <span class="caret">{{ open ? '▼' : '▲' }}</span>
      </div>
    </div>
    <div v-show="open" class="user-body">
      <div class="panel">
        <div><strong>계정 정보</strong></div>
        <div>이름: {{ user?.username || '게스트' }}</div>
        <div>이메일: {{ user?.email || '-' }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
const auth = useAuthStore()
const user = auth.user
const open = ref(false)
const router = useRouter()
function goProfile(){ router.push('/user/profile') }
function logout(){ auth.logout(); router.push('/') }
</script>

<style scoped>
.userbar{background:#000;color:#fff;border-bottom:2px solid rgba(255,255,255,0.04)}
.userbar-row{display:flex;justify-content:space-between;align-items:center;padding:8px 12px;gap:8px}
.user-left{display:flex;gap:8px;align-items:center}
.user-name{font-weight:600}
.user-email{opacity:.8;font-size:13px}
.user-right{display:flex;gap:8px;align-items:center}
.user-body{padding:8px 12px}
.btn.small{padding:6px 8px;font-size:13px}

@media (max-width:600px){
  .user-email{display:none}
  .btn.small{padding:6px 8px;font-size:12px}
}
</style>
