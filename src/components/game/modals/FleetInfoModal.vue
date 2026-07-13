<template>
  <div class="modal-box fi-modal">

    <!-- 헤더 -->
    <div class="fi-header">
      <span class="serif gold" style="font-size:14px;letter-spacing:1px">함대 정보</span>
      <button class="fi-close" @click="$emit('close')">✕</button>
    </div>

    <!-- 2패널 레이아웃 -->
    <div class="fi-layout">

      <!-- 좌측: 함대 목록 -->
      <div class="fi-list">
        <div v-if="fleets.length === 0" class="fi-empty dim mono">
          편성된 함대가 없습니다.
        </div>
        <button
          v-for="fl in fleets" :key="fl.id"
          class="fl-item" :class="{ on: sel?.id === fl.id }"
          @click="sel = fl"
        >
          <div class="fl-item-top">
            <span class="serif fl-name">{{ fl.name }}</span>
            <span class="fl-badge" :class="statusClass(fl.status)">{{ statusLabel(fl.status) }}</span>
          </div>
          <div class="fl-item-sub mono dim">{{ fl.ships.toLocaleString() }}척</div>
        </button>
      </div>

      <!-- 우측: 상세 -->
      <div class="fi-detail" v-if="sel">

        <!-- 함대명 + 상태 -->
        <div class="fid-title-row">
          <span class="serif gold" style="font-size:16px;letter-spacing:1px">{{ sel.name }}</span>
          <span class="fl-badge" :class="statusClass(sel.status)">{{ statusLabel(sel.status) }}</span>
        </div>

        <!-- 사령관 카드 -->
        <div class="fid-cmd-card" v-if="commander">
          <span class="fid-cmd-portrait">{{ commander.portrait ?? '👤' }}</span>
          <div class="fid-cmd-info">
            <div class="serif" style="font-size:13px;font-weight:bold;letter-spacing:.5px">{{ charName(commander) }}</div>
            <div class="dim" style="font-size:10px;margin-top:2px">사령관</div>
          </div>
        </div>
        <div class="fid-cmd-card fid-cmd-empty" v-else>
          <span class="dim serif" style="font-size:12px">(사령관 미임명)</span>
        </div>

        <div class="fid-divider" />

        <!-- 기본 정보 -->
        <div class="fid-rows">
          <div class="fid-row">
            <span class="dim">위치</span>
            <span class="mono">{{ locationName(sel.location) }}</span>
          </div>
          <div class="fid-row">
            <span class="dim">전력</span>
            <span class="mono">{{ sel.ships.toLocaleString() }}척</span>
          </div>
          <div class="fid-row">
            <span class="dim">사기</span>
            <span class="mono">{{ sel.moral ?? 100 }}</span>
          </div>
          <div class="fid-row">
            <span class="dim">진형</span>
            <span class="serif">{{ formationName(sel.formation) }}</span>
          </div>
          <div class="fid-row" v-if="officers.length">
            <span class="dim">부관</span>
            <span class="serif" style="text-align:right">{{ officers.join(' · ') }}</span>
          </div>
        </div>

        <div class="fid-divider" />

        <!-- 함대 능력치 -->
        <div class="fid-stats-box" v-if="commander">
          <div class="dim" style="font-size:10px;letter-spacing:1px;margin-bottom:8px">함대 능력치</div>
          <div v-for="[lbl, key, clr] in statDefs" :key="key" class="fid-stat-row">
            <span class="dim" style="font-size:10px;width:36px;flex-shrink:0;font-family:var(--font-serif)">{{ lbl }}</span>
            <div class="sbar">
              <div class="sbar-fill" :style="`width:${Math.min(100, commander[key] ?? 0)}%;background:${clr}`" />
            </div>
            <span class="mono" style="font-size:10px;width:24px;text-align:right;flex-shrink:0;color:var(--t2)">
              {{ commander[key] ?? '—' }}
            </span>
          </div>
        </div>

      </div>

      <!-- 미선택 상태 -->
      <div v-else class="fi-detail fi-no-sel">
        <span class="dim serif" style="font-size:13px">← 함대를 선택하세요</span>
      </div>

    </div>

    <!-- 푸터 -->
    <div class="fi-footer">
      <button class="btn" @click="$emit('close')">닫기</button>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import { charName } from '@/utils/charUtils'
import { FORMATIONS } from '@/data/base/tactical/tacticalData'

defineEmits(['close'])
const game = useGameStore()

const fleets = computed(() => game.pFleets ?? [])
const sel    = ref(fleets.value[0] ?? null)

const commander = computed(() => {
  if (!sel.value?.commander) return null
  return game.characters[sel.value.commander] ?? null
})

const officers = computed(() => {
  if (!sel.value?.officers?.length) return []
  return sel.value.officers.map(code => {
    const ch = game.characters[code]
    return ch ? charName(ch) : code
  })
})

const statDefs = [
  ['지휘', 'statCmd', 'var(--tg)'],
  ['통솔', 'statCsm', '#e67e22'],
  ['공격', 'statAtt', '#e74c3c'],
  ['방어', 'statDef', '#3498db'],
  ['기동', 'statFst', '#2ecc71'],
]

function locationName(locCode) {
  if (!locCode) return '—'
  return game.systems[locCode]?.name ?? locCode
}

function formationName(ffCode) {
  if (!ffCode) return '—'
  return FORMATIONS[ffCode]?.name ?? ffCode
}

function statusLabel(s) {
  const MAP = { standby: '대기', moving: '이동 중', battle: '교전 중', retreat: '후퇴' }
  return MAP[s] ?? s
}

function statusClass(s) {
  if (s === 'battle')  return 'st-battle'
  if (s === 'moving')  return 'st-moving'
  if (s === 'retreat') return 'st-retreat'
  return 'st-standby'
}
</script>

<style scoped>
.fi-modal {
  width: min(90vw, 560px);
  display: flex; flex-direction: column;
  padding: 0; overflow: hidden;
}

/* ── 헤더 ─────────────────────────────────────── */
.fi-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px 16px; border-bottom: 1px solid var(--bd);
  background: rgba(255,255,255,.02); flex-shrink: 0;
}
.fi-close {
  background: none; border: none; color: var(--td);
  font-size: 14px; cursor: pointer; padding: 4px 6px; line-height: 1;
  transition: color .15s;
}
.fi-close:hover { color: var(--t1); }

/* ── 2패널 레이아웃 ───────────────────────────── */
.fi-layout {
  display: flex; flex: 1; overflow: hidden; min-height: 320px;
}

/* ── 좌측 목록 ────────────────────────────────── */
.fi-list {
  width: 164px; flex-shrink: 0;
  border-right: 1px solid var(--bd);
  overflow-y: auto;
  display: flex; flex-direction: column; gap: 5px;
  padding: 8px;
}
.fi-empty {
  padding: 24px 8px; text-align: center; font-size: 11px;
}
.fl-item {
  display: flex; flex-direction: column; gap: 4px;
  padding: 8px 10px;
  background: var(--bg4); border: 1px solid var(--bd); border-radius: var(--r);
  cursor: pointer; text-align: left; transition: all .15s;
}
.fl-item:hover { background: var(--bgh); }
.fl-item.on { border-color: var(--tg); background: rgba(212,170,96,.08); }
.fl-item-top {
  display: flex; align-items: center; justify-content: space-between; gap: 4px;
}
.fl-name     { font-size: 11px; letter-spacing: .3px; }
.fl-item-sub { font-size: 10px; }

/* ── 상태 뱃지 ────────────────────────────────── */
.fl-badge { font-size: 9px; padding: 1px 5px; border-radius: 8px; flex-shrink: 0; white-space: nowrap; }
.st-standby { color: var(--t2);  background: rgba(255,255,255,.06); }
.st-moving  { color: var(--tg);  background: rgba(212,170,96,.12); }
.st-battle  { color: #e74c3c;    background: rgba(231,76,60,.12); }
.st-retreat { color: var(--td);  background: rgba(255,255,255,.04); }

/* ── 우측 상세 ────────────────────────────────── */
.fi-detail {
  flex: 1; overflow-y: auto;
  padding: 16px; display: flex; flex-direction: column; gap: 10px;
}
.fi-no-sel {
  align-items: center; justify-content: center;
}

.fid-title-row {
  display: flex; align-items: center; justify-content: space-between;
}

/* 사령관 카드 */
.fid-cmd-card {
  display: flex; align-items: center; gap: 12px;
  padding: 10px 12px; background: var(--bg4); border-radius: var(--r);
}
.fid-cmd-empty { justify-content: center; }
.fid-cmd-portrait { font-size: 36px; line-height: 1; }
.fid-cmd-info { display: flex; flex-direction: column; }

.fid-divider { height: 1px; background: var(--bd); flex-shrink: 0; }

/* 기본 정보 행 */
.fid-rows { display: flex; flex-direction: column; }
.fid-row {
  display: flex; justify-content: space-between; align-items: center;
  padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,.04);
  font-size: 11px; font-family: var(--font-serif); letter-spacing: .3px;
}
.fid-row:last-child { border-bottom: none; }

/* 능력치 바 */
.fid-stats-box {
  background: var(--bg4); border-radius: var(--r); padding: 11px 12px;
}
.fid-stat-row {
  display: flex; align-items: center; gap: 7px; margin-bottom: 6px;
}
.fid-stat-row:last-child { margin-bottom: 0; }
.sbar { flex: 1; height: 4px; background: rgba(255,255,255,.08); border-radius: 2px; overflow: hidden; }
.sbar-fill { height: 100%; border-radius: 2px; transition: width .3s; }

/* ── 푸터 ─────────────────────────────────────── */
.fi-footer {
  display: flex; justify-content: center; padding: 10px 16px;
  border-top: 1px solid var(--bd); flex-shrink: 0;
}
</style>
