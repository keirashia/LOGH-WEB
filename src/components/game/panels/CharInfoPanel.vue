<template>
  <div class="char-panel" :class="{ overlay: isOverlay }">

    <!-- 오버레이 닫기 (모바일) -->
    <button v-if="isOverlay" class="panel-close mono dim" @click="$emit('close')">✕</button>

    <!-- 인물 없는 경우 -->
    <div v-if="!char" class="no-char">
      <span class="dim mono" style="font-size:11px">인물 미선택</span>
    </div>

    <template v-else>

      <!-- 이름 블록 -->
      <div class="name-block">
        <div class="name-kr serif gold">{{ char.nameKr }}</div>
        <div class="name-sub mono dim">
          <span>{{ char.nameJp }}</span>
          <span class="name-sep">·</span>
          <span>{{ char.nameEn }}</span>
        </div>
      </div>

      <!-- 직책 -->
      <div class="job-row mono dim">
        <span class="job-label">{{ jobLabel || '직책 없음' }}</span>
        <span v-if="factionLabel" class="faction-tag" :class="`fc-${char.faction}`">
          {{ factionLabel }}
        </span>
      </div>

      <!-- 행동력 슬롯 -->
      <div class="action-section">
        <div class="section-label mono dim">행동력</div>
        <div class="action-slots">
          <div v-for="(slot, i) in actionSlotDisplay" :key="i" class="action-slot"
               :class="{ filled: slot.used, empty: !slot.used }">
            <template v-if="slot.used">
              <span class="slot-label serif">{{ slot.label }}</span>
              <button class="slot-cancel mono dim" @click="game.cancelActionSlot(i)"
                      title="취소">✕</button>
            </template>
            <span v-else class="slot-empty mono dim">—</span>
          </div>
        </div>
      </div>

      <!-- 능력치 -->
      <div class="stat-section">
        <div class="section-label mono dim">능력치</div>
        <div class="stat-list">
          <div v-for="s in STATS" :key="s.key" class="stat-row">
            <span class="stat-lbl mono dim">{{ s.short }}</span>
            <div class="stat-bar-wrap">
              <div class="stat-bar">
                <div class="stat-fill" :style="{ width: (char[s.key] ?? 0) + '%' }"
                     :class="statClass(char[s.key] ?? 0)" />
              </div>
            </div>
            <span class="stat-val mono" :class="statClass(char[s.key] ?? 0)">
              {{ char[s.key] ?? 0 }}
            </span>
          </div>
        </div>
      </div>

    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import { JOB_MAP } from '@/data/base/jobs/jobData'
import { FACTION_NAMES } from '@/data/base/factions/factionName.js'

defineProps({ isOverlay: { type: Boolean, default: false } })
defineEmits(['close'])

const game = useGameStore()

const char = computed(() => game.playerChar)

const jobLabel = computed(() => {
  if (!char.value?.currentPost) return ''
  return JOB_MAP[char.value.currentPost]?.nameKr ?? char.value.currentPost
})

const factionLabel = computed(() => {
  if (!char.value) return ''
  const found = FACTION_NAMES.find(n => n.factionId === char.value.faction && n.lang === 'Kr')
  return found?.name ?? char.value.faction
})

// 행동력 슬롯 (항상 3개)
const actionSlotDisplay = computed(() => {
  const slots = game._actionSlots ?? []
  return Array.from({ length: 3 }, (_, i) =>
    i < slots.length
      ? { used: true, label: slots[i].label }
      : { used: false }
  )
})

const STATS = [
  { key: 'statCmd', short: 'CMD', label: '지휘' },
  { key: 'statCsm', short: 'CSM', label: '카리스마' },
  { key: 'statAtt', short: 'ATT', label: '공격' },
  { key: 'statDef', short: 'DEF', label: '방어' },
  { key: 'statFst', short: 'FST', label: '속도' },
  { key: 'statMng', short: 'MNG', label: '관리' },
  { key: 'statInf', short: 'INF', label: '정보' },
  { key: 'statGfg', short: 'GFG', label: '지상전' },
  { key: 'statAfg', short: 'AFG', label: '공중전' },
  { key: 'statMmp', short: 'MMP', label: '사기' },
]

function statClass(val) {
  if (val >= 80) return 'stat-high'
  if (val >= 60) return 'stat-mid'
  if (val >= 40) return 'stat-low'
  return 'stat-very-low'
}
</script>

<style scoped>
/* ── 패널 기본 ───────────────────────────────────────────────────── */
.char-panel {
  width: clamp(160px, 20vw, 240px);
  height: 100%;
  background: linear-gradient(180deg, #080e1a 0%, #050a12 100%);
  border-right: 1px solid var(--bd);
  display: flex;
  flex-direction: column;
  gap: 0;
  overflow-y: auto;
  overflow-x: hidden;
  flex-shrink: 0;
  scrollbar-width: thin;
}

/* 모바일 오버레이 모드 */
.char-panel.overlay {
  position: absolute;
  inset: 0;
  width: 100%;
  z-index: 200;
  border-right: none;
  background: rgba(5,10,18,.97);
  backdrop-filter: blur(4px);
  border-bottom: 1px solid var(--bd);
  overflow-y: auto;
}

.panel-close {
  position: absolute;
  top: 10px; right: 12px;
  font-size: 16px; color: var(--td);
  cursor: pointer; z-index: 10;
  padding: 4px 8px; border-radius: var(--r);
  transition: color .15s;
}
.panel-close:hover { color: var(--t1); }

/* ── 인물 없음 ──────────────────────────────────────────────────── */
.no-char {
  flex: 1;
  display: flex; align-items: center; justify-content: center;
  opacity: .5;
}

/* ── 이름 블록 ─────────────────────────────────────────────────── */
.name-block {
  padding: 16px 14px 10px;
  border-bottom: 1px solid var(--bd);
}
.name-kr {
  font-size: clamp(15px, 1.6vw, 20px);
  letter-spacing: 1px;
  line-height: 1.3;
}
.name-sub {
  font-size: 9px; letter-spacing: .3px; margin-top: 4px;
  display: flex; gap: 4px; flex-wrap: wrap;
}
.name-sep { opacity: .4; }

/* ── 직책 ──────────────────────────────────────────────────────── */
.job-row {
  display: flex; align-items: center; justify-content: space-between; gap: 4px;
  padding: 8px 14px;
  font-size: 10px; letter-spacing: .4px;
  border-bottom: 1px solid var(--bd);
}
.job-label { flex: 1; }
.faction-tag {
  font-size: 9px; padding: 1px 5px;
  border: 1px solid currentColor;
  border-radius: 3px; opacity: .7;
  flex-shrink: 0;
}

/* ── 행동력 슬롯 ────────────────────────────────────────────────── */
.action-section {
  padding: 10px 14px 8px;
  border-bottom: 1px solid var(--bd);
}
.section-label {
  font-size: 9px; letter-spacing: 1px; text-transform: uppercase;
  margin-bottom: 6px;
}
.action-slots { display: flex; flex-direction: column; gap: 4px; }
.action-slot {
  display: flex; align-items: center; gap: 6px;
  padding: 5px 8px;
  border-radius: var(--r);
  min-height: 26px;
  font-size: 10px;
}
.action-slot.filled {
  background: rgba(212,170,96,.07);
  border: 1px solid rgba(212,170,96,.25);
}
.action-slot.empty {
  background: var(--bg4);
  border: 1px dashed var(--bd);
  opacity: .5;
}
.slot-label { flex: 1; color: var(--tg); font-size: 10px; }
.slot-cancel {
  font-size: 10px; color: var(--td); padding: 0 3px;
  cursor: pointer; transition: color .15s; flex-shrink: 0;
}
.slot-cancel:hover { color: var(--ta); }
.slot-empty { font-size: 12px; }

/* ── 능력치 ───────────────────────────────────────────────────── */
.stat-section {
  padding: 10px 14px;
  flex: 1;
}
.stat-list { display: flex; flex-direction: column; gap: 4px; }
.stat-row {
  display: flex; align-items: center; gap: 6px;
}
.stat-lbl {
  width: 30px; font-size: 9px; text-align: right; flex-shrink: 0;
  letter-spacing: .3px;
}
.stat-bar-wrap { flex: 1; }
.stat-bar {
  height: 4px; background: var(--bg4);
  border-radius: 2px; overflow: hidden;
}
.stat-fill {
  height: 100%; border-radius: 2px;
  transition: width .4s;
}
.stat-val { width: 24px; font-size: 10px; text-align: right; flex-shrink: 0; }

/* stat 색상 */
.stat-high     { color: var(--tg); }
.stat-high.stat-fill  { background: var(--tg); }
.stat-mid      { color: var(--t1); }
.stat-mid.stat-fill   { background: var(--t1); opacity: .7; }
.stat-low      { color: var(--t2); }
.stat-low.stat-fill   { background: var(--t2); opacity: .6; }
.stat-very-low { color: var(--td); }
.stat-very-low.stat-fill { background: var(--td); opacity: .5; }

/* fc 색상 */
.fc-REH { color: var(--REH); }
.fc-FPA { color: var(--FPA); }
.fc-PZN { color: var(--PZN); }
</style>
