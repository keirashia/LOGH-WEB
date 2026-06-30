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
        <div class="name-kr serif gold" :style="nameFontStyle">{{ displayName }}</div>
      </div>

      <!-- 초상화 -->
      <div class="portrait-wrap" :style="portraitBgStyle">
        <img
          :key="char.code"
          :src="charImgSrc(char.code)"
          class="portrait-img"
          @error="onPortraitError"
          :alt="displayName"
        />
        <div v-if="portraitMissing" class="portrait-hint mono dim">
          {{ char.code }}O_H.png
        </div>
      </div>

      <!-- 직업 -->
      <div class="trait-section">
        <div class="section-label mono job-lbl-badge" style="margin-bottom:6px;font-size:12px;color:#fff">직업</div>
        <div v-if="!charJobData.length" class="no-trait mono dim">직업 없음</div>
        <div v-for="j in charJobData" :key="j.jobCode" class="job-chip">
          <span class="chip-cat mono">{{ j.category }}</span>
          <span class="chip-name serif">{{ j.nameKr }}</span>
          <div class="job-right mono">
            <span class="job-lv">Lv.{{ j.jobLevel }}</span>
            <div class="job-exp-bar">
              <div class="job-exp-fill" :style="{ width: `${j.jobExp}%` }" />
            </div>
          </div>
        </div>
      </div>

      <!-- 트레잇 -->
      <div class="trait-section">
        <div class="section-label mono job-lbl-badge" style="margin-bottom:4px;font-size:12px;color:#fff">트레잇</div>
        <TraitBadge
          v-for="t in charTraits" :key="t.traitCode"
          :trait="CHAR_TRAIT_MAP[t.traitCode]"
          :char-trait="t"
        />
        <div v-if="!charTraits.length" class="no-trait mono dim">트레잇 없음</div>
      </div>

      <!-- 행동력 슬롯 -->
      <div class="action-section">
        <div class="section-label mono job-lbl-badge" style="margin-bottom:6px;font-size:12px;color:#fff">행동력</div>
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
        <div class="section-label mono job-lbl-badge" style="margin-bottom:6px;font-size:12px;color:#fff">능력치</div>
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
import { computed, ref, watch } from 'vue'
import { charImgSrc, handleCharImgError, CHAR_PLACEHOLDER } from '@/utils/charImg'
import TraitBadge from '@/components/char/TraitBadge.vue'
import { CHAR_TRAIT_MAP } from '@/data/base/trait/chars/charTraitData.js'
import { useGameStore } from '@/stores/gameStore'
import { JOB_MAP } from '@/data/base/jobs/jobData'
import { CHAR_JOBS, charName } from '@/utils/charUtils'

defineProps({ isOverlay: { type: Boolean, default: false } })
defineEmits(['close'])

const game = useGameStore()

const char = computed(() => game.playerChar)

const charJobData = computed(() => {
  const code = char.value?.code
  const jobs = char.value?.jobs ?? []
  return jobs.map(({ jobCode }) => {
    const entry  = CHAR_JOBS.find(j => j.charCode === code && j.jobCode === jobCode)
    const jobDef = JOB_MAP[jobCode]
    return {
      jobCode,
      nameKr:   jobDef?.nameKr  ?? jobCode,
      category: jobDef?.category ?? '',
      jobLevel: entry?.jobLevel  ?? 0,
      jobExp:   entry?.jobExp    ?? 0,
    }
  })
})

const USER_LANG = 'Kr'  // TODO: 유저 설정에서 읽기

const NAME_MIN_PX = 11
const NAME_MAX_PX = 15
const NAME_AVAIL  = 172  // 패널 최소폭(200) - 좌우패딩(28) = 172

function _nameFit(str) {
  if (!str) return NAME_MAX_PX
  return Math.floor(NAME_AVAIL / (str.length * 1.15))
}

const displayName = computed(() => {
  if (!char.value) return ''
  return charName(char.value, USER_LANG)
})

const nameFontStyle = computed(() => ({
  fontSize: Math.max(NAME_MIN_PX, Math.min(NAME_MAX_PX, _nameFit(displayName.value))) + 'px'
}))

const portraitMissing = ref(false)

function onPortraitError(e) {
  handleCharImgError(e, char.value?.code)
  if (e.target.src.endsWith(CHAR_PLACEHOLDER.split('/').pop())) {
    portraitMissing.value = true
  }
}

watch(() => char.value?.code, () => { portraitMissing.value = false })

const _FACTION_COLORS = { REH: '#c0392b', FPA: '#2980b9', PZN: '#27ae60' }

const portraitBgStyle = computed(() => {
  const color = _FACTION_COLORS[char.value?.faction]
  if (!color) return {}
  return {
    background: `linear-gradient(160deg, #0a0f1c 20%, ${color}cc 100%)`
  }
})

const charTraits = computed(() => char.value?.traits ?? [])

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
  { key: 'statPlt', short: 'PLT', label: '정략' },
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
  width: clamp(200px, 22vw, 280px);
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
  padding: 12px 14px 10px;
  border-bottom: 1px solid var(--bd);
  min-width: 0;
}
.name-kr {
  letter-spacing: .5px;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-align: right;
}
/* ── 초상화 ─────────────────────────────────────────────────────── */
.portrait-wrap {
  width: 100%;
  background: var(--bg3);
  border-bottom: 1px solid var(--bd);
  overflow: hidden;
  flex-shrink: 0;
  transition: background .3s;
}
.portrait-img {
  width: 100%;
  display: block;
  object-fit: cover;
  object-position: top;
}
.portrait-hint {
  padding: 4px 8px;
  font-size: 9px;
  letter-spacing: .3px;
  text-align: center;
  opacity: .5;
  word-break: break-all;
}

/* ── 직업 섹션 라벨 배지 ────────────────────────────────────── */
.job-lbl-badge {
  display: inline-block;
  width: 100%; text-align: center;
  font-size: 12px; color: #fff; letter-spacing: 1px;
  padding: 2px 10px;
  border: 1px solid rgba(255,255,255,.3);
  border-radius: 3px;
  background: rgba(255,255,255,.05);
  box-sizing: border-box;
}

/* ── 직업 chip (TraitBadge 동일 스타일) ─────────────────────── */
.job-chip {
  display: flex; align-items: center; gap: 8px; width: 100%;
  padding: 9px 12px;
  background: var(--bg4); border: 1px solid var(--bd); border-radius: 4px;
}
.chip-cat {
  font-size: 9px; color: var(--td);
  border: 1px solid var(--bd); padding: 1px 5px; border-radius: 2px;
  flex-shrink: 0; letter-spacing: .5px;
}
.chip-name {
  font-size: 12px; color: var(--t1); flex: 1; letter-spacing: .5px;
}

/* ── 트레잇 ─────────────────────────────────────────────────────── */
.trait-section {
  padding: 8px 10px;
  border-bottom: 1px solid var(--bd);
  display: flex; flex-direction: column; gap: 4px;
}
.no-trait { font-size: 10px; padding: 2px 4px; }

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
