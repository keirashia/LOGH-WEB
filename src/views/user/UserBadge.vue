<template>
  <div class="user-badge" :class="{ 'is-logged': auth.isLoggedIn }">
    <!-- 로그인 상태 -->
    <template v-if="auth.isLoggedIn">
      <div class="ub-avatar">{{ avatarEmoji }}</div>
      <div class="ub-info">
        <div class="ub-name serif">{{ auth.username }}</div>
        <div class="ub-meta dim mono">
          <span v-if="auth.isAdmin" class="ub-admin">관리자</span>
          <span v-else>{{ auth.user?.email ? '일반' : '게스트' }}</span>
        </div>
      </div>
      <div class="ub-actions">
        <button v-if="showTransfer" class="ub-btn dim" @click="getTransferCode" title="기기 이전 코드 발급">
          📲
        </button>
        <button class="ub-btn dim" @click="logout" title="로그아웃">
          ⬡
        </button>
      </div>
      <!-- 이전 코드 팝업 -->
      <div v-if="transferCode" class="transfer-popup panel">
        <div class="tp-label dim mono">기기 이전 코드</div>
        <div class="tp-code mono gold">{{ transferCode }}</div>
        <div class="tp-desc dim">다른 기기에서 이 코드를 입력하세요.</div>
        <button class="btn" style="font-size:10px;padding:4px 10px;margin-top:6px" @click="transferCode=null">닫기</button>
      </div>
    </template>

    <!-- 비로그인 상태 -->
    <template v-else>
      <div class="ub-guest dim mono">비로그인</div>
      <button class="btn btn-gold ub-login-btn" @click="$router.push('/user/login')">
        🔑 로그인
      </button>
    </template>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

defineProps({
  showTransfer: { type: Boolean, default: true },
})

const router = useRouter()
const auth   = useAuthStore()
const transferCode = ref(null)

const avatarEmoji = computed(() => {
  if (auth.isAdmin)                        return '⚙️'
  if (auth.user?.id === 0)                 return '👤'
  const emojis = ['👑','🌟','⚡','🦅','🎓','🛡️','💚']
  return emojis[(auth.user?.id || 0) % emojis.length]
})

async function getTransferCode() {
  transferCode.value = await auth.generateTransferCode()
}

function logout() {
  auth.logout()
  router.push('/')
}
</script>

<style scoped lang="scss">
@import '@/assets/views/user/UserBadge.scss';
</style>