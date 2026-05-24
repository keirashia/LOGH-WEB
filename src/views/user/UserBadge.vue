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

<style scoped>
.user-badge {
  position: relative;
  display: flex; align-items: center; gap: 8px;
  padding: 6px 12px;
  background: var(--bg3);
  border: 1px solid var(--bd);
  border-radius: var(--r);
  min-width: 160px;
}
.user-badge.is-logged { border-color: var(--bdg) }

.ub-avatar { font-size: 20px; flex-shrink: 0 }
.ub-info { flex: 1; min-width: 0 }
.ub-name { font-size: 13px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis }
.ub-meta { font-size: 10px; margin-top: 1px }
.ub-admin { color: var(--ta); font-size: 10px }

.ub-actions { display: flex; gap: 4px }
.ub-btn { background: none; border: none; font-size: 14px; cursor: pointer; padding: 2px 4px; border-radius: 3px; transition: background .15s; color: var(--t2) }
.ub-btn:hover { background: var(--bgh) }

.ub-guest { font-size: 11px; flex: 1 }
.ub-login-btn { padding: 5px 12px; font-size: 11px }

/* 이전 코드 팝업 */
.transfer-popup {
  position: absolute; top: calc(100% + 8px); right: 0;
  padding: 12px 14px; z-index: 100;
  display: flex; flex-direction: column; gap: 4px;
  min-width: 220px;
  box-shadow: 0 8px 24px rgba(0,0,0,.6);
}
.tp-label { font-size: 10px; text-transform: uppercase; letter-spacing: 1px }
.tp-code { font-size: 16px; letter-spacing: 2px; margin: 4px 0 }
.tp-desc { font-size: 10px; line-height: 1.5 }
</style>