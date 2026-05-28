<template>
  <div class="step-layout">

    <!-- 헤더 -->
    <div class="step-header">
      <button class="btn" @click="$emit('back')">← 연도 변경</button>
      <span class="serif gold" style="font-size:17px">SE {{ year }}년</span>
      <span class="mono dim" style="font-size:11px;margin-left:4px">/ 제국력 {{ year - 309 }}년</span>
    </div>

    <!-- 사건 카드 목록 -->
    <div class="event-list">
      <button v-for="evt in events" :key="evt.id"
              class="event-card"
              :class="{ selected: selEvt?.id === evt.id, unimpl: !evt.scenarioId }"
              @click="selEvt = evt">

        <div class="card-top">
          <div class="tag-row">
            <span v-for="tag in evt.tags" :key="tag"
                  class="evt-tag mono"
                  :style="{ color: TAG_COLORS[tag] ?? 'var(--t2)' }">{{ tag }}</span>
          </div>
          <div class="card-meta mono dim">
            <span v-if="evt.month">{{ evt.month }}월</span>
            <span v-if="evt.scenarioId" class="star-mark">★</span>
          </div>
        </div>

        <div class="card-name serif">{{ evt.name }}</div>
        <div class="card-desc dim" v-if="evt.desc">{{ evt.desc }}</div>
        <div class="card-na mono dim" v-if="!evt.scenarioId">구현 예정</div>

      </button>

      <div v-if="events.length === 0" class="no-events dim serif">
        이 연도에 등록된 사건이 없습니다
      </div>
    </div>

    <!-- 네비 -->
    <div class="step-nav">
      <button class="btn" @click="$emit('back')">← 연도 변경</button>
      <button class="btn btn-gold"
              :disabled="!selEvt || !selEvt.scenarioId"
              @click="$emit('select', selEvt)">
        다음 →
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { EVENTS } from '@/data/scenarios/eventData.js'

const props = defineProps({ year: Number })
defineEmits(['back', 'select'])

const TAG_COLORS = {
  '사실':   '#4488FF',
  '가상':   '#8844CC',
  '택틱스': '#CC6622',
  '전투':   '#4488FF',
  '분기점': '#CC6622',
}

const events  = computed(() => EVENTS.filter(e => e.year === props.year))
const selEvt  = ref(null)
</script>

<style scoped>
.step-layout {
  flex: 1;
  display: flex; flex-direction: column;
  padding: 16px 20px; gap: 12px;
  overflow: hidden;
}
.step-header { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }

/* 사건 목록 */
.event-list {
  flex: 1; overflow-y: auto;
  display: flex; flex-direction: column; gap: 7px;
}

.event-card {
  text-align: left; width: 100%;
  padding: 11px 14px;
  background: var(--bg3); border: 1px solid var(--bd); border-radius: var(--r);
  cursor: pointer; transition: all .15s;
  display: flex; flex-direction: column; gap: 5px;
}
.event-card:hover   { background: var(--bgh); }
.event-card.selected {
  border-color: var(--tg); background: rgba(212,170,96,.07);
}
.event-card.unimpl  { opacity: .55; cursor: default; }
.event-card.unimpl:hover { background: var(--bg3); }

.card-top {
  display: flex; justify-content: space-between; align-items: center;
}
.tag-row    { display: flex; gap: 6px; }
.evt-tag    { font-size: 10px; letter-spacing: .5px; }
.card-meta  { font-size: 10px; display: flex; gap: 6px; align-items: center; }
.star-mark  { color: var(--tg); font-size: 11px; }
.card-name  { font-size: 14px; color: var(--t1); }
.card-desc  { font-size: 11px; line-height: 1.6; }
.card-na    { font-size: 10px; letter-spacing: .5px; }

.no-events {
  padding: 40px; text-align: center; font-size: 14px;
}

/* 네비 */
.step-nav {
  display: flex; justify-content: space-between; align-items: center;
  flex-shrink: 0; padding-top: 10px;
  border-top: 1px solid var(--bd);
}
</style>
