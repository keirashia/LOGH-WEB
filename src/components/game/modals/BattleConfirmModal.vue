<template>
  <div class="modal-box battle-confirm-modal">
    <div class="modal-title">교전 발생</div>
    <div class="bc-location serif">{{ payload?.locationName }}</div>

    <div class="bc-sides">
      <!-- 공격측 -->
      <div class="bc-side">
        <div class="bc-side-label mono" :style="{ color: factionColor(payload?.attackerFaction) }">
          {{ factionName(payload?.attackerFaction) }} (공격)
        </div>
        <div v-for="f in payload?.attackerFleets" :key="f.id" class="bc-fleet-row">
          <span class="fleet-name serif">{{ f.name }}</span>
          <span class="fleet-ships mono dim">{{ f.ships?.toLocaleString() }}척</span>
        </div>
      </div>

      <div class="bc-vs mono dim">VS</div>

      <!-- 방어측 -->
      <div class="bc-side">
        <div class="bc-side-label mono" :style="{ color: factionColor(payload?.defenderFaction) }">
          {{ factionName(payload?.defenderFaction) }} (방어)
        </div>
        <div v-for="f in payload?.defenderFleets" :key="f.id" class="bc-fleet-row">
          <span class="fleet-name serif">{{ f.name }}</span>
          <span class="fleet-ships mono dim">{{ f.ships?.toLocaleString() }}척</span>
        </div>
      </div>
    </div>

    <div class="modal-actions">
      <button class="btn btn-gold" @click="onManual">수동 진행</button>
      <button class="btn" @click="onAuto">자동 진행</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ payload: Object })
const emit  = defineEmits(['close'])

const FACTION_NAMES  = { REH: '은하제국', FPA: '자유행성동맹', PZN: '페잔' }
const FACTION_COLORS = { REH: 'var(--REH)', FPA: 'var(--FPA)', PZN: 'var(--PZN)' }

function factionName(code)  { return FACTION_NAMES[code]  ?? code ?? '?' }
function factionColor(code) { return FACTION_COLORS[code] ?? 'var(--t1)' }

function onManual() {
  props.payload?.onManual?.()
  emit('close')
}

function onAuto() {
  props.payload?.onAuto?.()
  emit('close')
}
</script>

<style scoped>
.battle-confirm-modal { max-width: 360px; }

.bc-location {
  text-align: center;
  font-size: 13px;
  color: var(--tg);
  letter-spacing: 1px;
  margin-bottom: 16px;
}

.bc-sides {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  margin-bottom: 18px;
}

.bc-vs {
  font-size: 11px;
  padding-top: 20px;
  flex-shrink: 0;
  color: var(--td);
}

.bc-side {
  flex: 1;
}

.bc-side-label {
  font-size: 10px;
  letter-spacing: .5px;
  margin-bottom: 6px;
}

.bc-fleet-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 6px;
  padding: 3px 0;
  border-bottom: 1px solid var(--bd);
}

.bc-fleet-row:last-child { border-bottom: none; }

.fleet-name {
  font-size: 11px;
  color: var(--t2);
  letter-spacing: .5px;
}

.fleet-ships {
  font-size: 10px;
  white-space: nowrap;
}
</style>
