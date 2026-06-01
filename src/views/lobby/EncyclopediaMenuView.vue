<template>
  <div class="enc-wrap">
    <div class="enc-layout">
      <div class="enc-header">
        <button class="btn" @click="$router.push('/lobby')">← 뒤로</button>
        <span class="serif gold" style="font-size:18px;letter-spacing:2px">사전</span>
      </div>

      <div class="enc-menu">
        <button class="smenu-btn active" @click="enc.open('char')">
          <span class="smenu-icon">👤</span>
          <div class="smenu-text">
            <span class="serif smenu-title">인물</span>
            <span class="dim smenu-desc">등장인물 560명의 프로필·능력치·성향을 조회합니다</span>
          </div>
          <span class="smenu-arrow">›</span>
        </button>

        <button class="smenu-btn" disabled>
          <span class="smenu-icon">🌌</span>
          <div class="smenu-text">
            <span class="serif smenu-title">성계</span>
            <span class="dim smenu-desc">은하 성계 데이터베이스를 조회합니다</span>
          </div>
          <span class="smenu-badge dim mono">준비 중</span>
        </button>

        <button class="smenu-btn" disabled>
          <span class="smenu-icon">🚀</span>
          <div class="smenu-text">
            <span class="serif smenu-title">함선</span>
            <span class="dim smenu-desc">함선 및 함급 데이터베이스를 조회합니다</span>
          </div>
          <span class="smenu-badge dim mono">준비 중</span>
        </button>
      </div>
    </div>

    <!-- 인물 사전 팝업 -->
    <CharLibPop v-if="enc.popType === 'char'" />
  </div>
</template>

<script setup>
import { useEncyclopediaStore } from '@/stores/encyclopediaStore'
import CharLibPop from '@/components/char/CharLibPop.vue'

const enc = useEncyclopediaStore()
</script>

<style scoped>
.enc-wrap {
  width: 100%; height: 100%;
  display: flex; align-items: center; justify-content: center;
  background: var(--bg);
}
.enc-layout {
  display: flex; flex-direction: column;
  gap: 28px; padding: 32px; width: 100%; max-width: 520px;
}
.enc-header {
  display: flex; align-items: center; gap: 16px;
}
.enc-menu {
  display: flex; flex-direction: column; gap: 10px;
}
.smenu-btn {
  display: flex; align-items: center; gap: 16px;
  padding: 18px 20px;
  background: var(--bg3); border: 1px solid var(--bd); border-radius: var(--r);
  cursor: pointer; transition: all .18s; text-align: left;
}
.smenu-btn.active:hover {
  background: var(--bgh); border-color: var(--bdg);
  transform: translateX(3px);
}
.smenu-btn:disabled { opacity: .4; cursor: not-allowed; }
.smenu-icon  { font-size: 24px; flex-shrink: 0; }
.smenu-text  { flex: 1; display: flex; flex-direction: column; gap: 3px; }
.smenu-title { font-size: 15px; letter-spacing: 1px; color: var(--t1); }
.smenu-desc  { font-size: 11px; line-height: 1.5; }
.smenu-arrow { font-size: 22px; color: var(--tg); flex-shrink: 0; }
.smenu-badge { font-size: 10px; letter-spacing: 1px; border: 1px solid var(--bd); padding: 2px 8px; border-radius: 3px; flex-shrink: 0; }
</style>
