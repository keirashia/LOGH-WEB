<template>
  <div class="info-panel">

    <div class="info-header">
      <template v-if="selYear !== null">
        <button class="nav-arrow" :disabled="!prevGroup" @click="emit('navigate', prevGroup.year, prevGroup.yearType)">‹</button>
        <div class="year-info">
          <span class="serif gold" style="font-size:22px">{{ selYearType }} {{ selYear }}년</span>
          <span v-if="selYearType === 'SE'" class="mono dim" style="font-size:13px;margin-left:10px">/ 제국력 {{ selYear - 309 }}년</span>
        </div>
        <button class="nav-arrow" :disabled="!nextGroup" @click="emit('navigate', nextGroup.year, nextGroup.yearType)">›</button>
      </template>
      <template v-else>
        <span class="dim" style="font-size:13px">연도를 선택하세요</span>
      </template>
    </div>

    <div class="event-list">
      <template v-if="selYear !== null">
        <button v-for="sc in events" :key="sc.id"
                class="event-card"
                :class="{ unimpl: !sc.useYn }"
                @click="emit('select', sc)">
          <div class="card-top">
            <div class="tag-row">
              <span v-for="tag in sc.tags" :key="tag"
                    class="evt-tag mono"
                    :style="{ color: TAG_COLORS[tag] ?? 'var(--t2)' }">{{ tag }}</span>
            </div>
            <div class="card-meta mono dim">
              <span v-if="sc.month">{{ sc.month }}월</span>
            </div>
          </div>
          <div class="card-name serif">{{ sc.nameKr }}</div>
          <div v-if="sc.nameEn" class="card-na mono">{{ sc.nameEn }}</div>
          <div v-if="sc.nameJp" class="card-na mono">{{ sc.nameJp }}</div>
        </button>

        <div v-if="events.length === 0" class="no-events dim serif">
          이 연도에 등록된 사건이 없습니다
        </div>
      </template>

      <div v-else class="no-events dim serif">
        왼쪽 타임라인에서 연도를 선택하세요
      </div>
    </div>

    <div class="step-nav">
      <button class="btn" @click="emit('back')">← 뒤로</button>
    </div>

  </div>
</template>

<script setup>
const TAG_COLORS = {
  '사실':       '#4488FF',
  '가상':       '#8844CC',
  '택틱스':     '#CC6622',
  '전투':       '#4488FF',
  '분기점':     '#CC6622',
  '초심자추천': '#44AA66',
  '숙련자추천': '#CC4444',
}

const props = defineProps({
  selYear:     { type: Number, default: null },
  selYearType: { type: String, default: null },
  prevGroup:   { type: Object, default: null },
  nextGroup:   { type: Object, default: null },
  events:      { type: Array,  default: () => [] },
})

const emit = defineEmits(['navigate', 'select', 'back'])
</script>

<style scoped>
.info-panel {
  flex: 1; display: flex; flex-direction: column; overflow: hidden;
  background: linear-gradient(165deg, #0d1b2a 0%, #0d1520 100%);
  border: 1px solid rgba(212,170,96,.45); border-radius: 12px;
  box-shadow: inset 0 0 0 3px #0d1520, inset 0 0 0 5px rgba(212,170,96,.12);
}

.info-header {
  padding: 8px 14px; border-bottom: 1px solid rgba(212,170,96,.2);
  flex-shrink: 0; display: flex; align-items: center; gap: 8px; min-height: 52px;
}
.year-info {
  flex: 1; display: flex; align-items: baseline; justify-content: center;
}

.nav-arrow {
  width: 44px; height: 44px;
  display: flex; align-items: center; justify-content: center;
  background: var(--bg3); border: 1px solid var(--bd); border-radius: var(--r);
  color: var(--t1); font-size: 20px; cursor: pointer; transition: all .13s; flex-shrink: 0;
}
.nav-arrow:hover:not(:disabled) { border-color: var(--tg); color: var(--tg); }
.nav-arrow:disabled { opacity: .3; cursor: default; }

.event-list {
  flex: 1; overflow-y: auto; padding: 14px 18px;
  display: flex; flex-direction: column; gap: 14px;
}

.event-card {
  text-align: left; width: 100%; padding: 16px 20px;
  background: var(--bg3); border: 1px solid var(--bd); border-radius: var(--r);
  cursor: pointer; transition: all .15s; display: flex; flex-direction: column; gap: 10px;
}
.event-card:hover  { background: var(--bgh); }
.event-card.unimpl { cursor: default; }
.event-card.unimpl:hover { background: var(--bg3); }

.card-top  { display: flex; justify-content: space-between; align-items: center; }
.tag-row   { display: flex; gap: 8px; }
.evt-tag   { font-size: 12px; letter-spacing: .5px; }
.card-meta { font-size: 12px; display: flex; gap: 8px; align-items: center; }
.card-name { font-size: 18px; color: var(--t1); }
.card-na   { font-size: 12px; letter-spacing: .5px; color: var(--t1); }

.no-events { padding: 40px; text-align: center; font-size: 14px; }

.step-nav {
  display: flex; justify-content: space-between; align-items: center;
  flex-shrink: 0; padding: 10px 14px; border-top: 1px solid rgba(212,170,96,.2);
}
</style>
