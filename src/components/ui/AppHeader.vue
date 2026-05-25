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

const API_DIRECT = import.meta.env.VITE_API_URL ?? 'http://localhost:8081'
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
    const res = await fetch(`${API_DIRECT}/health`, { signal: ctrl.signal })
    clearTimeout(tid)
    apiOnline.value = res.ok
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
.app-header {
  display: flex;
  align-items: center;
  height: var(--hdr-h);
  padding: 0 clamp(10px, 1.5vw, 20px);
  background: var(--bg2);
  border-bottom: 1px solid var(--bd);
  flex-shrink: 0;
  position: relative;
  z-index: 500;
}

.hdr-brand {
  display: flex;
  align-items: baseline;
  gap: clamp(4px, 0.6vw, 10px);
}

.hdr-title {
  font-size: clamp(11px, 1.4vw, 15px);
  color: var(--tg);
  letter-spacing: 1px;
}

.hdr-server-status {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: clamp(7px, 0.75vw, 9px);
  letter-spacing: 1.5px;

  &.online  { color: #4caf7d; }
  &.offline { color: #d84c4c; }
}

.hdr-status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;

  .online  & { background: #4caf7d; box-shadow: 0 0 5px #4caf7d99; }
  .offline & { background: #d84c4c; box-shadow: 0 0 5px #d84c4c99; }
}

.hdr-status-text {
  font-size: inherit;
  letter-spacing: inherit;
}

.hdr-right {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: clamp(5px, 0.8vw, 10px);
}

.hdr-divider {
  width: 1px;
  height: 16px;
  background: var(--bd);
  margin: 0 clamp(1px, 0.3vw, 4px);
  flex-shrink: 0;
}

.hdr-avatar {
  width: clamp(24px, 2.8vw, 34px);
  height: clamp(24px, 2.8vw, 34px);
  border-radius: 50%;
  border: 1px solid var(--bdg);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg3);
  color: var(--tg);
  font-size: clamp(10px, 1.1vw, 13px);
  font-family: var(--font-serif);
  user-select: none;
}

.hdr-name {
  font-size: clamp(11px, 1.1vw, 13px);
  color: var(--t1);
  white-space: nowrap;
}

.hdr-points {
  font-size: clamp(10px, 1vw, 12px);
  white-space: nowrap;
  flex-shrink: 0;
}

.hdr-auth-btn {
  font-size: clamp(10px, 1vw, 12px);
  padding: clamp(4px, 0.5vh, 6px) clamp(8px, 1vw, 14px);
  white-space: nowrap;
  flex-shrink: 0;
}

.hdr-menu-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px 6px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  justify-content: center;
  border-radius: 3px;
  transition: background .15s;
  flex-shrink: 0;

  &:hover {
    background: var(--bgh);
    .bar { background: var(--t1); }
  }

  &.open {
    .bar:nth-child(1) { transform: translateY(6px) rotate(45deg); background: var(--t1); }
    .bar:nth-child(2) { opacity: 0; transform: scaleX(0); }
    .bar:nth-child(3) { transform: translateY(-6px) rotate(-45deg); background: var(--t1); }
  }
}

.bar {
  display: block;
  width: 18px;
  height: 2px;
  background: var(--t2);
  border-radius: 1px;
  transition: transform .25s ease, opacity .2s ease, background .15s;
  transform-origin: center;
}

.opts-slide-enter-active { transition: opacity .25s ease, transform .28s cubic-bezier(.4, 0, .2, 1); }
.opts-slide-leave-active  { transition: opacity .18s ease, transform .2s ease; }
.opts-slide-enter-from,
.opts-slide-leave-to      { opacity: 0; transform: translateY(-10px); }
</style>
