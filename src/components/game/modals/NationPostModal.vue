<template>
  <div class="modal-box np-modal">

    <!-- 상단 -->
    <div class="np-header">
      <span class="serif gold" style="font-size:14px;letter-spacing:1px">요직</span>
      <button class="np-close" @click="$emit('close')">✕</button>
    </div>

    <!-- 내용 (스크롤) -->
    <div class="np-body">
      <div v-for="sec in sections" :key="sec.label" class="np-section">
        <div class="np-sec-head" @click="toggleSection(sec.label)">
          <span class="serif" style="font-size:12px;letter-spacing:.5px">{{ sec.label }}</span>
          <span class="mono dim" style="font-size:11px">{{ collapsed[sec.label] ? '▶' : '▼' }}</span>
        </div>
        <template v-if="!collapsed[sec.label]">
          <div v-for="pos in sec.positions" :key="pos.title" class="np-pos-row">
            <span class="np-pos-title dim">{{ pos.title }}</span>
            <span class="np-pos-name" :class="{ vacant: !pos.char }">
              {{ pos.char ? charDisplayName(pos.char) : '(공석)' }}
            </span>
          </div>
        </template>
      </div>
    </div>

    <!-- 하단 -->
    <div class="np-footer">
      <button class="btn" @click="$emit('close')">닫기</button>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'

defineEmits(['close'])
const game = useGameStore()

const POST_CONFIG = {
  REH: [
    {
      label: '내무',
      jobCodes: [
        { title: '황제',     jobCode: 'JB_R001' },
        { title: '제국재상',  jobCode: 'JB_R002' },
      ],
    },
    {
      label: '군무',
      jobCodes: [
        { title: '군무상서',       jobCode: 'JB_R008' },
        { title: '통수본부총장',    jobCode: 'JB_R007' },
        { title: '우주함대사령장관', jobCode: 'JB_R006' },
      ],
    },
  ],
  FPA: [
    {
      label: '내무',
      jobCodes: [
        { title: '최고평의회의장',  jobCode: 'JB_F001' },
        { title: '최고평의회부의장', jobCode: 'JB_F002' },
      ],
    },
    {
      label: '군무',
      jobCodes: [
        { title: '국방위원장',       jobCode: 'JB_F004' },
        { title: '통합작전본부장',    jobCode: 'JB_F013' },
        { title: '우주함대사령장관',  jobCode: 'JB_F014' },
      ],
    },
  ],
  PZN: [
    {
      label: '행정',
      jobCodes: [
        { title: '자치령총독',  jobCode: 'JB_P001' },
      ],
    },
    {
      label: '정보',
      jobCodes: [
        { title: '페잔대리인', jobCode: 'JB_P002' },
      ],
    },
  ],
}

const collapsed = ref({})

function toggleSection(label) {
  collapsed.value[label] = !collapsed.value[label]
}

function charByJob(jobCode) {
  return Object.values(game.characters).find(
    ch => ch.faction === game.playerFaction && !ch.isDead &&
          ch.jobs?.some(j => j.jobCode === jobCode)
  ) ?? null
}

function charDisplayName(ch) {
  return ch.name?.find(e => e.code === 'Kr')?.context
      ?? ch.name?.find(e => e.code === 'En')?.context
      ?? ch.code
      ?? '?'
}

const sections = computed(() => {
  const config = POST_CONFIG[game.playerFaction] ?? []
  return config.map(sec => ({
    label: sec.label,
    positions: sec.jobCodes.map(p => ({
      title: p.title,
      char:  charByJob(p.jobCode),
    })),
  }))
})
</script>

<style scoped>
.np-modal { min-width: min(90vw, 360px); display: flex; flex-direction: column; padding: 0; overflow: hidden }

.np-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px 16px; border-bottom: 1px solid var(--bd);
  background: rgba(255,255,255,.02); flex-shrink: 0;
}
.np-close {
  background: none; border: none; color: var(--td);
  font-size: 14px; cursor: pointer; padding: 4px 6px; line-height: 1;
  transition: color .15s;
}
.np-close:hover { color: var(--t1); }

.np-body { flex: 1; overflow-y: auto; min-height: 140px; }

.np-section { border-bottom: 1px solid var(--bd); }
.np-section:last-child { border-bottom: none; }

.np-sec-head {
  display: flex; align-items: center; justify-content: space-between;
  padding: 10px 16px;
  background: rgba(255,255,255,.02);
  cursor: pointer;
  user-select: none;
  transition: background .12s;
}
.np-sec-head:hover { background: rgba(255,255,255,.04); }

.np-pos-row {
  display: flex; align-items: center; justify-content: space-between;
  padding: 8px 24px; border-top: 1px solid rgba(255,255,255,.04);
  font-size: 12px;
}
.np-pos-title {
  font-family: var(--font-serif); letter-spacing: .5px; flex-shrink: 0;
  min-width: 90px;
}
.np-pos-name {
  font-family: var(--font-serif); letter-spacing: .3px; color: var(--t1);
}
.np-pos-name.vacant { color: var(--td); font-style: italic; }

.np-footer {
  display: flex; justify-content: center; padding: 10px 16px;
  border-top: 1px solid var(--bd); flex-shrink: 0;
}
</style>
