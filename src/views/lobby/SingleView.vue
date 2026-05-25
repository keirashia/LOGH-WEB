<template>
  <div class="single-wrap">
    <div class="single-layout">
      <div class="single-header">
        <button class="btn" @click="$router.push('/lobby')">← 뒤로</button>
        <span class="serif gold" style="font-size:18px;letter-spacing:2px">싱글플레이</span>
      </div>

      <div class="single-menu">
        <button class="smenu-btn active" @click="$router.push('/lobby/single/new')">
          <span class="smenu-icon">🌟</span>
          <div class="smenu-text">
            <span class="serif smenu-title">새 게임</span>
            <span class="dim smenu-desc">시나리오를 선택하고 새 게임을 시작합니다</span>
          </div>
          <span class="smenu-arrow">›</span>
        </button>

        <button class="smenu-btn" disabled>
          <span class="smenu-icon">▶</span>
          <div class="smenu-text">
            <span class="serif smenu-title">계속하기</span>
            <span class="dim smenu-desc">마지막으로 저장된 게임을 불러옵니다</span>
          </div>
          <span class="smenu-badge dim mono">준비 중</span>
        </button>

        <button class="smenu-btn" disabled>
          <span class="smenu-icon">💾</span>
          <div class="smenu-text">
            <span class="serif smenu-title">불러오기</span>
            <span class="dim smenu-desc">저장된 게임 목록에서 선택합니다</span>
          </div>
          <span class="smenu-badge dim mono">준비 중</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.single-wrap {
  width: 100%; height: 100%;
  display: flex; align-items: center; justify-content: center;
  background: var(--bg);
}
.single-layout {
  display: flex; flex-direction: column;
  gap: 28px; padding: 32px; width: 100%; max-width: 520px;
}
.single-header {
  display: flex; align-items: center; gap: 16px;
}
.single-menu {
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
