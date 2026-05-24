<template>
  <header class="app-header">
    <div class="hdr-brand">
      <span class="hdr-title serif">銀河英雄伝説</span>
      <span class="hdr-sub mono dim">IV · EX</span>
    </div>

    <div class="hdr-right">
      <!-- 아바타 + 사용자명 -->
      <img class="hdr-avatar" :src="avatarSrc" :alt="auth.username" />
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import OptionsPanel from '@/components/ui/OptionsPanel.vue'
import testAvatar from '@/assets/Img/characters/face/CHA/CH_0001740.jpg'

const router = useRouter()
const auth = useAuthStore()
const optionsOpen = ref(false)

// TODO: 실제 유저 아바타 이미지로 교체 예정
const avatarSrc = testAvatar

function logout() {
  auth.logout()
  router.push('/')
}
</script>

<style scoped lang="scss">
@import '@/assets/components/ui/AppHeader.scss';
</style>
