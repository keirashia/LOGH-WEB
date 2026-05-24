<template>
  <header class="app-header">
    <div class="hdr-brand">
      <span class="hdr-title serif">銀河英雄伝説</span>
      <span class="hdr-sub mono dim">IV · EX</span>
    </div>

    <div class="hdr-right">
      <div class="hdr-divider" />

      <template v-if="auth.isLoggedIn">
        <span class="hdr-avatar">{{ avatarEmoji }}</span>
        <div class="hdr-userinfo">
          <span class="hdr-name serif">{{ auth.username }}</span>
        </div>
      </template>

      <template v-else>
        <span class="dim mono hdr-guest">비로그인</span>
        <button class="btn btn-gold hdr-login-btn" @click="$router.push('/user/login')">
          🔑 로그인
        </button>
      </template>

      <div class="hdr-divider" />

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
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import OptionsPanel from '@/components/ui/OptionsPanel.vue'

const router = useRouter()
const auth = useAuthStore()
const optionsOpen = ref(false)

const avatarEmoji = computed(() => {
  if (auth.isAdmin) return '⚙️'
  const emojis = ['👑', '🌟', '⚡', '🦅', '🎓', '🛡️', '💚']
  return emojis[(auth.user?.id || 0) % emojis.length]
})
</script>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  height: var(--hdr-h);
  padding: 0 16px;
  background: var(--bg2);
  border-bottom: 1px solid var(--bd);
  flex-shrink: 0;
  position: relative;
  z-index: 500;
}

.hdr-brand {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.hdr-title {
  font-size: 14px;
  color: var(--tg);
  letter-spacing: 1px;
}

.hdr-sub {
  font-size: 10px;
  letter-spacing: 2px;
}

.hdr-right {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 8px;
}

.hdr-divider {
  width: 1px;
  height: 18px;
  background: var(--bd);
  margin: 0 2px;
}

.hdr-avatar {
  font-size: 16px;
  line-height: 1;
}

.hdr-userinfo {
  display: flex;
  align-items: center;
}

.hdr-name {
  font-size: 13px;
  color: var(--t1);
}

.hdr-guest {
  font-size: 11px;
}

.hdr-login-btn {
  font-size: 11px;
  padding: 5px 12px;
}

/* 삼선 버튼 */
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
}

.hdr-menu-btn:hover {
  background: var(--bgh);
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

.hdr-menu-btn:hover .bar {
  background: var(--t1);
}

.hdr-menu-btn.open .bar:nth-child(1) { transform: translateY(6px) rotate(45deg); background: var(--t1); }
.hdr-menu-btn.open .bar:nth-child(2) { opacity: 0; transform: scaleX(0); }
.hdr-menu-btn.open .bar:nth-child(3) { transform: translateY(-6px) rotate(-45deg); background: var(--t1); }

/* OptionsPanel 슬라이드 */
.opts-slide-enter-active { transition: opacity .25s ease, transform .28s cubic-bezier(.4,0,.2,1); }
.opts-slide-leave-active  { transition: opacity .18s ease, transform .2s ease; }
.opts-slide-enter-from,
.opts-slide-leave-to      { opacity: 0; transform: translateY(-10px); }
</style>
