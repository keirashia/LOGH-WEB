<template>
  <CardSliderLayout
    title="메뉴"
    :cards="CARDS"
    back-to="/"
    back-label="타이틀"
    :star-count="250"
    :neb-colors="['rgba(41,128,185,', 'rgba(192,57,43,', 'rgba(100,50,180,']"
  >
    <template #extra>
      <div v-if="!auth.isLoggedIn" class="login-notice dim mono">
        ⚠ 로그인하지 않으면 게임 기록이 저장되지 않습니다
      </div>
    </template>
  </CardSliderLayout>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import CardSliderLayout from '@/components/common/CardSliderLayout.vue'

const router = useRouter()
const auth   = useAuthStore()

const CARDS = [
  { icon: '⚔️', title: '싱글플레이', desc: 'Single Play',  abbr: 'SGL', action: () => router.push('/lobby/single') },
  { icon: '🌌', title: '멀티플레이', desc: 'Multi Play',   abbr: 'MLT', disabled: true },
  { icon: '📖', title: '사전',       desc: 'Encyclopedia', abbr: 'ENC', action: () => router.push('/lobby/encyclopedia') },
  { icon: '🎓', title: '튜토리얼',   desc: 'Tutorial',     abbr: 'TUT', disabled: true },
]
</script>

<style scoped>
.login-notice { font-size: 11px; letter-spacing: 1px; }
</style>
