<template>
  <header class="app-header">
    <div class="hdr-brand">
      <span class="hdr-title serif">銀河英雄伝説</span>
      <span class="hdr-server-status" :class="apiOnline ? 'online' : 'offline'">
        <span class="hdr-status-dot" />
        <span class="hdr-status-text mono">{{ apiOnline ? 'ONLINE' : 'SINGLE' }}</span>
      </span>
    </div>

    <div class="hdr-right">
      <!-- 아바타 + 사용자명 -->
      <div class="hdr-avatar" :title="auth.username">{{ avatarInitial }}</div>
      <span class="hdr-name serif">{{ auth.username }}</span>

      <div class="hdr-divider" />

      <!-- 포인트 -->
      <span class="hdr-points mono gold">◆ {{ auth.points.toLocaleString() }}</span>

      <div class="hdr-divider" />

      <!-- 로그인 / 로그아웃 -->
      <button v-if="auth.isLoggedIn" class="btn hdr-auth-btn" @click="logout">로그아웃</button>
      <button v-else class="btn btn-gold hdr-auth-btn" @click="$router.push('/user/login')">🔑 로그인</button>

      <div class="hdr-divider" />

      <!-- 옵션 (삼선) -->
      <button class="hdr-menu-btn" :class="{ open: optionsOpen }" title="설정" @click="optionsOpen = !optionsOpen">
        <span class="bar" />
        <span class="bar" />
        <span class="bar" />
      </button>
    </div>

    <Transition name="opts-slide">
      <OptionsPanel v-if="optionsOpen" />
    </Transition>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import OptionsPanel from '@/components/ui/OptionsPanel.vue'

const API_BASE = 'http://localhost:8081'
const PING_INTERVAL = 30_000

const router = useRouter()
const auth = useAuthStore()
const optionsOpen = ref(false)
const apiOnline = ref(false)

const avatarInitial = computed(() => (auth.username?.[0] ?? '?').toUpperCase())

async function checkApi() {
  try {
    const ctrl = new AbortController()
    const tid = setTimeout(() => ctrl.abort(), 3000)
    await fetch(`${API_BASE}/`, { signal: ctrl.signal })
    clearTimeout(tid)
    apiOnline.value = true
  } catch {
    apiOnline.value = false
  }
}

let _pingTimer = null
onMounted(() => {
  checkApi()
  _pingTimer = setInterval(checkApi, PING_INTERVAL)
})
onUnmounted(() => clearInterval(_pingTimer))

function logout() {
  auth.logout()
  router.push('/')
}
</script>

<style scoped lang="scss">
@import '@/assets/components/ui/AppHeader.scss';
</style>
