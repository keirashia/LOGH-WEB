<template>
  <div class="step-layout">

    <!-- 헤더 -->
    <div class="step-header">
      <button class="btn" @click="$emit('back')">← 사건 선택</button>
      <span class="serif gold" style="font-size:17px">게임 옵션</span>
    </div>

    <!-- 선택된 사건 요약 -->
    <div class="event-summary panel">
      <div class="serif" style="font-size:15px">{{ event.nameKr }}</div>
      <div class="mono dim" style="font-size:11px;margin-top:3px">
        SE {{ event.year }}년
        <span v-if="event.month"> {{ event.month }}월</span>
      </div>
    </div>

    <!-- 옵션 목록 -->
    <div class="options-body">
      <div v-for="grp in optGroups" :key="grp.key" class="opt-group">
        <div class="opt-label dim">{{ grp.label }}</div>
        <div class="opt-row">
          <button v-for="opt in grp.opts" :key="opt.val"
                  class="opt-btn"
                  :class="{ active: localOpts[grp.key] === opt.val }"
                  @click="localOpts[grp.key] = opt.val">
            <span class="opt-name">{{ opt.name }}</span>
            <span class="opt-desc dim">{{ opt.desc }}</span>
          </button>
        </div>
      </div>

      <div class="dim" style="font-size:11px;margin-top:16px">(추가 옵션 추후 구현)</div>
    </div>

    <!-- 네비 -->
    <div class="step-nav">
      <button class="btn" @click="$emit('back')">← 사건 선택</button>
      <button class="btn btn-gold" @click="$emit('next', { ...localOpts })">
        다음 →
      </button>
    </div>

  </div>
</template>

<script setup>
import { reactive } from 'vue'

const props = defineProps({ event: Object })
defineEmits(['back', 'next'])

const localOpts = reactive({ npcAppearance: 'fact', npcBehavior: 'fact' })

const optGroups = [
  {
    key:   'npcAppearance',
    label: 'NPC 등장',
    opts: [
      { val: 'fact',    name: '사실', desc: '원작 인물만 등장' },
      { val: 'fiction', name: '가상', desc: '추가 인물 등장 가능' },
    ],
  },
  {
    key:   'npcBehavior',
    label: 'NPC 행동',
    opts: [
      { val: 'fact',    name: '사실', desc: '원작 역사대로 행동' },
      { val: 'fiction', name: '가상', desc: 'AI가 자유롭게 판단' },
    ],
  },
]
</script>

<style scoped>
.step-layout {
  flex: 1;
  display: flex; flex-direction: column;
  padding: 16px 20px; gap: 14px;
  overflow: hidden;
  background: linear-gradient(165deg, #0d1b2a 0%, #0d1520 100%);
  border: 1px solid rgba(212,170,96,.45);
  border-radius: 12px;
  box-shadow: inset 0 0 0 3px #0d1520, inset 0 0 0 5px rgba(212,170,96,.12);
}
.step-header { display: flex; align-items: center; gap: 14px; flex-shrink: 0; }

/* 사건 요약 */
.event-summary {
  flex-shrink: 0; padding: 12px 14px;
}

/* 옵션 */
.options-body {
  flex: 1; overflow-y: auto;
  display: flex; flex-direction: column; gap: 18px;
}
.opt-group  { display: flex; flex-direction: column; gap: 8px; }
.opt-label  { font-size: 11px; letter-spacing: 1px; }
.opt-row    { display: flex; gap: 8px; }

.opt-btn {
  flex: 1; padding: 12px 14px;
  display: flex; flex-direction: column; gap: 4px; text-align: left;
  background: var(--bg3); border: 1px solid var(--bd); border-radius: var(--r);
  cursor: pointer; transition: all .13s;
}
.opt-btn:hover  { background: var(--bgh); }
.opt-btn.active {
  border-color: var(--tg); background: rgba(212,170,96,.08);
}
.opt-name { font-size: 13px; color: var(--t1); }
.opt-desc { font-size: 10px; }

/* 네비 */
.step-nav {
  display: flex; justify-content: space-between; align-items: center;
  flex-shrink: 0; padding-top: 10px;
  border-top: 1px solid rgba(212,170,96,.2);
}
</style>
