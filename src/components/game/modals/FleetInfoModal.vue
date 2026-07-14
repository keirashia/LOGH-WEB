<template>
  <div class="modal-box fi-modal">

    <div class="fi-header">
      <span class="serif gold" style="font-size:14px;letter-spacing:1px">함대정보</span>
      <button class="fi-close" @click="$emit('close')">✕</button>
    </div>

    <div class="fi-body">
      <div v-if="fleets.length === 0" class="fi-empty dim mono">편성된 함대가 없습니다.</div>

      <button
        v-for="fl in fleets" :key="fl.id"
        class="fi-row"
        @click="openDetail(fl.id)"
      >
        <!-- 함대명 + 상태 -->
        <div class="fi-name-row">
          <span class="serif fi-name">{{ fl.name }}</span>
          <span class="mono fi-status" :class="statusClass(fl.status)">{{ statusLabel(fl.status) }}</span>
        </div>

        <!-- 사령관 -->
        <div class="fi-detail-row">
          <span class="fi-lbl dim">사령관</span>
          <span class="serif fi-val">{{ commanderName(fl.commander) }}</span>
        </div>

        <!-- 위치 -->
        <div class="fi-detail-row">
          <span class="fi-lbl dim">위치</span>
          <span class="mono fi-val">{{ locationName(fl.location) }}</span>
        </div>

        <!-- 전력 -->
        <div class="fi-detail-row">
          <span class="fi-lbl dim">전력</span>
          <span class="mono fi-val">{{ fl.ships.toLocaleString() }}척</span>
        </div>

        <span class="fi-arrow">›</span>
      </button>
    </div>

    <div class="fi-footer">
      <button class="btn" @click="$emit('close')">닫기</button>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'

defineEmits(['close'])
const game = useGameStore()

const fleets = computed(() => game.pFleets ?? [])

function openDetail(fleetId) {
  game.openModal('fleetDetail', { fleetId })
}

function commanderName(charCode) {
  if (!charCode) return '(미임명)'
  const ch = game.characters[charCode]
  if (!ch) return '?'
  return ch.nick?.find(e => e.code === 'Kr')?.context
      ?? ch.name?.find(e => e.code === 'Kr')?.context
      ?? charCode
}

function locationName(locCode) {
  if (!locCode) return '—'
  return game.systems[locCode]?.name ?? locCode
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
.fi-modal { width: 420px; display: flex; flex-direction: column; padding: 0; overflow: hidden }

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

.fi-body { flex: 1; overflow-y: auto; padding: 8px 0; }
.fi-empty { padding: 24px 16px; text-align: center; font-size: 12px; }

.fi-row {
  position: relative;
  width: 100%; text-align: left;
  padding: 10px 36px 10px 16px;
  border: none; border-bottom: 1px solid var(--bd);
  background: none; color: inherit;
  cursor: pointer; transition: background .12s;
}
.fi-row:last-child { border-bottom: none; }
.fi-row:hover { background: rgba(255,255,255,.03); }

.fi-name-row {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 6px;
}
.fi-name { font-size: 13px; letter-spacing: .5px; }

.fi-status { font-size: 10px; padding: 2px 7px; border-radius: 10px; }
.st-standby { color: var(--t2);  background: rgba(255,255,255,.06); }
.st-moving  { color: var(--tg);  background: rgba(212,170,96,.12); }
.st-battle  { color: #e74c3c;    background: rgba(231,76,60,.12); }
.st-retreat { color: var(--td);  background: rgba(255,255,255,.04); }

.fi-detail-row {
  display: flex; align-items: center; gap: 8px;
  font-size: 11px; padding: 2px 0;
}
.fi-lbl { font-family: var(--font-serif); letter-spacing: .5px; min-width: 44px; font-size: 11px; }
.fi-val { color: var(--t1); }

.fi-arrow {
  position: absolute; right: 14px; top: 50%;
  transform: translateY(-50%);
  color: var(--td); font-size: 18px; line-height: 1;
  pointer-events: none;
}

.fi-footer {
  display: flex; justify-content: center; padding: 10px 16px;
  border-top: 1px solid var(--bd); flex-shrink: 0;
}
</style>
