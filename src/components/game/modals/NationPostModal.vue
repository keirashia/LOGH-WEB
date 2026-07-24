<template>
  <div class="modal-box np-modal">

    <!-- 상단 -->
    <div class="np-header">
      <span class="serif gold" style="font-size:14px;letter-spacing:1px">요직</span>
      <button class="np-close" @click="$emit('close')">✕</button>
    </div>

    <!-- 탭 바 -->
    <div class="np-tabs">
      <button
        v-for="tab in tabs" :key="tab.id"
        class="np-tab serif"
        :class="{ active: activeTab === tab.id }"
        @click="activeTab = tab.id"
      >{{ tab.label }}</button>
    </div>

    <!-- 내용 (스크롤) -->
    <div class="np-body">

      <!-- 궁정 탭 -->
      <template v-if="activeTab === 'court'">
        <!-- 공화 체제: 평의회 링 -->
        <CouncilRingComp v-if="councilSeats.length" :seats="councilSeats" />
        <!-- 군주 체제: 황실 계층도 -->
        <MonarchyPostComp v-if="monarchySeats.length" :seats="monarchySeats" />
      </template>

      <!-- 군무성 탭 -->
      <template v-if="activeTab === 'military'">
        <div v-for="sec in sections" :key="sec.label" class="np-section">
          <div class="np-sec-head" @click="toggleSection(sec.label)">
            <span class="serif" style="font-size:12px;letter-spacing:.5px">{{ sec.label }}</span>
            <span class="mono dim" style="font-size:11px">{{ collapsed[sec.label] ? '▶' : '▼' }}</span>
          </div>
          <template v-if="!collapsed[sec.label]">
            <div v-for="pos in sec.positions" :key="pos.title" class="np-pos-row">
              <JobChip :job-code="pos.jobCode" :label="pos.title" />
              <CharChip v-if="pos.char" :char-code="pos.char.code" />
              <span v-else class="np-pos-vacant">공석</span>
            </div>
          </template>
        </div>
      </template>

    </div>

    <!-- 하단 -->
    <div class="np-footer">
      <button class="btn" @click="$emit('close')">닫기</button>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import CouncilRingComp from '@/components/game/modals/CouncilRingComp.vue'
import MonarchyPostComp from '@/components/game/modals/MonarchyPostComp.vue'
import CharChip from '@/components/common/CharChip.vue'
import JobChip from '@/components/common/JobChip.vue'

defineEmits(['close'])
const game = useGameStore()

// 세력 이념 체제 (없음/공화/혼합/군주)
const system = computed(() => game.factions[game.playerFaction]?.ideology?.system ?? '없음')

// 체제별 탭 구성
//   없음  → (없음)
//   공화  → 평의회 + 군무성
//   혼합  → 군무성
//   군주  → 궁정   + 군무성
const tabs = computed(() => {
  const list = []
  if (system.value === '공화') list.push({ id: 'court', label: '평의회' })
  else if (system.value === '군주') list.push({ id: 'court', label: '궁정' })
  if (system.value !== '없음') list.push({ id: 'military', label: '군무성' })
  return list
})

const activeTab = ref('court')
watch(tabs, newTabs => {
  if (!newTabs.find(t => t.id === activeTab.value)) {
    activeTab.value = newTabs[0]?.id ?? null
  }
}, { immediate: true })

// ── 공화 체제 평의회 링 설정 ────────────────────────────────────────
const COUNCIL_CONFIG = {
  FPA: [
    { jobCode: 'JB_F001', shortTitle: '의장' },
    { jobCode: 'JB_F002', shortTitle: '부의장' },
    { jobCode: 'JB_F003', shortTitle: '국무' },
    { jobCode: 'JB_F004', shortTitle: '국방' },
    { jobCode: 'JB_F005', shortTitle: '법질서' },
    { jobCode: 'JB_F006', shortTitle: '천연자원' },
    { jobCode: 'JB_F007', shortTitle: '인적자원' },
    { jobCode: 'JB_F008', shortTitle: '경제개발' },
    { jobCode: 'JB_F009', shortTitle: '지역개발' },
    { jobCode: 'JB_F010', shortTitle: '정보교통' },
    { jobCode: 'JB_F011', shortTitle: '재정' },
  ],
}

// ── 군주 체제 계층도 설정 ─────────────────────────────────────────
const MONARCHY_CONFIG = {
  REH: [
    { jobCode: 'JB_R001', label: '황제',     tier: 0 },
    { jobCode: 'JB_R002', label: '제국재상', tier: 1 },
    { jobCode: 'JB_R003', label: '국무상서', tier: 1 },
    { jobCode: 'JB_R004', label: '내무상서', tier: 2 },
    { jobCode: 'JB_R008', label: '군무상서', tier: 2 },
    { jobCode: 'JB_R009', label: '재무상서', tier: 2 },
    { jobCode: 'JB_R012', label: '궁내상서', tier: 2 },
    { jobCode: 'JB_R013', label: '사법상서', tier: 2 },
    { jobCode: 'JB_R014', label: '전례상서', tier: 2 },
    { jobCode: 'JB_R015', label: '과학상서', tier: 2 },
    { jobCode: 'JB_R016', label: '내각 서기관장', tier: 2 },
  ],
}

// ── 섹션 설정 ─────────────────────────────────────────────────────
const POST_CONFIG = {
  REH: [
    {
      label: '군무',
      jobCodes: [
        { title: '군무상서',          jobCode: 'JB_R008' },
        { title: '통수본부총장',      jobCode: 'JB_R007' },
        { title: '우주함대사령장관',  jobCode: 'JB_R006' },
      ],
    },
  ],
  FPA: [
    {
      label: '군무',
      jobCodes: [
        { title: '국방위원장',        jobCode: 'JB_F004' },
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
    ch => ch.faction === game.playerFaction && ch.charStatus !== 'dead' &&
          ch.jobs?.some(j => j.jobCode === jobCode)
  ) ?? null
}


const councilSeats = computed(() => {
  const faction = game.factions[game.playerFaction]
  if (faction?.ideology?.system !== '공화') return []
  return COUNCIL_CONFIG[game.playerFaction] ?? []
})

const monarchySeats = computed(() => {
  const faction = game.factions[game.playerFaction]
  if (faction?.ideology?.system !== '군주') return []
  return MONARCHY_CONFIG[game.playerFaction] ?? []
})

const sections = computed(() => {
  const config = POST_CONFIG[game.playerFaction] ?? []
  return config.map(sec => ({
    label: sec.label,
    positions: sec.jobCodes.map(p => ({
      title:   p.title,
      jobCode: p.jobCode,
      char:    charByJob(p.jobCode),
    })),
  }))
})
</script>

<style scoped>
.np-modal { width: 80vw; height: 80vh; display: flex; flex-direction: column; padding: 0; overflow: hidden }

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

/* ── 탭 바 ────────────────────────────────────────── */
.np-tabs {
  display: flex;
  border-bottom: 1px solid var(--bd);
  flex-shrink: 0;
}
.np-tab {
  flex: 1;
  padding: 8px 0;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  color: var(--t1);
  font-size: 12px;
  letter-spacing: .6px;
  cursor: pointer;
  transition: color .15s, border-color .15s;
  margin-bottom: -1px;
}
.np-tab:hover { color: rgba(255,255,255,.95); }
.np-tab.active {
  color: var(--tg);
  border-bottom-color: var(--tg);
}

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
.np-pos-vacant {
  font-family: var(--font-serif); font-size: 11px;
  color: var(--td); font-style: italic; letter-spacing: .3px;
}

.np-footer {
  display: flex; justify-content: center; padding: 10px 16px;
  border-top: 1px solid var(--bd); flex-shrink: 0;
}
</style>
