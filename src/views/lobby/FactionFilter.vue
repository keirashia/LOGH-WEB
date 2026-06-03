<template>
  <div class="ff-root">

    <div class="ff-divider" />

    <!-- 바 (항상 노출) -->
    <div class="faction-bar" @click="$emit('update:open', !open)">
      <span class="ff-bar-label mono"
            :style="{ color: picked ? (modelValue ? fcolor(modelValue) : 'var(--tg)') : 'var(--t3)' }">
        {{ picked ? (modelValue ? (factionNamesMap[modelValue]?.name ?? modelValue) : '전체') : '국가 선택' }}
      </span>
      <span class="dim" style="font-size:10px">{{ open ? '▲' : '▼' }}</span>
    </div>

    <div v-if="open" class="ff-divider" />

    <!-- 필터 패널 (expanded) -->
    <div v-if="open" class="filter-panel">

      <!-- 전체 (고정 좌측) -->
      <div class="ff-wrap">
        <button class="ff-card ff-card--all"
                :class="{ active: modelValue === null && picked }"
                @click="$emit('select', null)">
          <div class="ff-slices">
            <div v-for="fid in factionList" :key="fid"
                 class="ff-slice"
                 :style="{ backgroundImage: `url(/img/factions/${fid}.png)` }" />
          </div>
        </button>
        <span class="ff-label mono" :class="{ active: modelValue === null && picked }">전체</span>
      </div>

      <!-- 국가 카드 슬라이드 -->
      <div class="ff-slide-area">
        <div v-for="fid in factionList" :key="fid" class="ff-wrap">
          <button class="ff-card"
                  :class="{ active: modelValue === fid }"
                  :style="{
                    backgroundImage: `url(/img/factions/${fid}.png)`,
                    ...(modelValue === fid ? { borderColor: fcolor(fid) } : {})
                  }"
                  @click="$emit('select', fid)" />
          <span class="ff-label mono"
                :class="{ active: modelValue === fid }"
                :style="{ color: fcolor(fid) }">
            {{ factionNamesMap[fid]?.name ?? fid }}
          </span>
        </div>
      </div>

    </div>

  </div>
</template>

<script setup>
const props = defineProps({
  factionList:     { type: Array,   default: () => [] },
  factionNamesMap: { type: Object,  default: () => ({}) },
  factions:        { type: Object,  default: () => ({}) },
  modelValue:      { type: String,  default: null },
  picked:          { type: Boolean, default: false },
  open:            { type: Boolean, default: true },
})
defineEmits(['select', 'update:open'])

function fcolor(faction) {
  return props.factions[faction]?.color ?? 'var(--t2)'
}
</script>

<style scoped>
.ff-root { display: flex; flex-direction: column; gap: 8px; }

/* 바 */
.faction-bar {
  display: flex; align-items: center; justify-content: space-between;
  padding: 6px 12px;
  background: var(--bg3); border: 1px solid var(--bd); border-radius: var(--r);
  cursor: pointer; transition: border-color .13s;
}
.faction-bar:hover { border-color: var(--tg); }
.ff-bar-label { font-size: 2.8vh; font-weight: bold; }

/* 구분선 */
.ff-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(212,170,96,.4), transparent);
}

/* 패널 레이아웃 */
.filter-panel {
  display: flex; gap: 8px; align-items: flex-start;
}

/* 카드 래퍼 */
.ff-wrap {
  flex-shrink: 0;
  display: flex; flex-direction: column; align-items: center; gap: 6px;
}

/* 슬라이드 영역 */
.ff-slide-area {
  flex: 1; min-width: 0;
  display: flex; gap: 8px;
  overflow-x: auto; scroll-snap-type: x mandatory;
  scrollbar-width: none; padding-bottom: 2px;
}
.ff-slide-area::-webkit-scrollbar { display: none; }
.ff-slide-area .ff-wrap { scroll-snap-align: start; }

/* 카드 공통 */
.ff-card {
  height: 18vh;
  aspect-ratio: 280 / 175;
  background: var(--bg3) center / cover no-repeat;
  border: 2px solid rgba(212,170,96,.5);
  border-radius: 12px;
  box-shadow:
    inset 0 0 0 4px #0d1520,
    inset 0 0 0 6px rgba(212,170,96,.15),
    0 6px 20px rgba(0,0,0,.7);
  cursor: pointer; transition: all .2s;
  position: relative; overflow: hidden;
}
.ff-card::before {
  content: ''; position: absolute; inset: 0; pointer-events: none;
  background-image:
    repeating-linear-gradient( 45deg, transparent, transparent 10px, rgba(212,170,96,.025) 10px, rgba(212,170,96,.025) 11px),
    repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(212,170,96,.025) 10px, rgba(212,170,96,.025) 11px);
}
.ff-card:hover {
  border-color: rgba(212,170,96,.85);
  box-shadow:
    inset 0 0 0 4px #0d1520,
    inset 0 0 0 6px rgba(212,170,96,.35),
    0 12px 36px rgba(212,170,96,.18);
  transform: translateY(-3px);
}
.ff-card.active {
  border-color: rgba(212,170,96,.95);
  box-shadow:
    inset 0 0 0 4px #0d1520,
    inset 0 0 0 6px rgba(212,170,96,.4),
    0 12px 36px rgba(212,170,96,.22);
}

/* 전체 카드 복합 이미지 */
.ff-card--all { padding: 0; }
.ff-slices {
  position: absolute; inset: 0;
  display: flex;
}
.ff-slice {
  flex: 1; height: 100%;
  background-size: cover; background-position: center;
}

/* 라벨 */
.ff-label {
  font-size: 2.0vh; font-weight: bold;
  color: var(--t2); text-align: center; white-space: nowrap;
}
.ff-label.active { color: var(--tg); }
</style>
