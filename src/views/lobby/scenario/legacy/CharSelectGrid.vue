<template>
  <div class="csg-wrap">

    <!-- 추천 인물 -->
    <div v-if="leadChars.length" class="csg-section">
      <div class="csg-label dim">추천 인물</div>
      <div class="csg-recommend">
        <button v-for="ch in leadChars" :key="ch.code"
                class="rec-card"
                :class="{ selected: modelValue?.code === ch.code }"
                :style="modelValue?.code === ch.code ? { borderColor: fcolor(ch.faction) } : {}"
                @click="$emit('update:modelValue', ch)">
          <div class="rec-avatar serif"
               :style="{
                 borderColor: modelValue?.code === ch.code ? fcolor(ch.faction) : 'var(--bd)',
                 color: fcolor(ch.faction)
               }">
            {{ namesMap[ch.code]?.name?.[0] ?? '?' }}
          </div>
          <div class="rec-info">
            <div class="rec-name serif">{{ namesMap[ch.code]?.name ?? ch.code }}</div>
            <div class="rec-faction mono" :style="{ color: fcolor(ch.faction) }">
              {{ factionNames[ch.faction]?.name ?? ch.faction }}
            </div>
          </div>
        </button>
      </div>
    </div>

    <!-- 전체 인물 -->
    <div class="csg-section">
      <div class="csg-label dim">전체 인물</div>
      <input class="search-input mono" v-model="q" placeholder="🔍 이름으로 검색...">
      <div class="char-chip-grid">
        <button v-for="ch in filteredChars" :key="ch.code"
                class="char-chip"
                :class="{ selected: modelValue?.code === ch.code }"
                :style="modelValue?.code === ch.code
                  ? { borderColor: fcolor(ch.faction), color: fcolor(ch.faction) }
                  : {}"
                @click="$emit('update:modelValue', ch)">
          {{ namesMap[ch.code]?.name ?? ch.code }}
        </button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  chars:        { type: Array,  default: () => [] },
  namesMap:     { type: Object, default: () => ({}) },
  factionNames: { type: Object, default: () => ({}) },
  factions:     { type: Object, default: () => ({}) },
  modelValue:   { type: Object, default: null },
})
defineEmits(['update:modelValue'])

const q = ref('')

const leadChars = computed(() =>
  props.chars
    .filter(c => c.recommend > 0)
    .sort((a, b) => a.recommend - b.recommend)
)

const filteredChars = computed(() => {
  const kw = q.value.trim().toLowerCase()
  if (!kw) return props.chars
  return props.chars.filter(c => {
    const entry = props.namesMap[c.code]
    return entry?.name?.toLowerCase().includes(kw) ||
           entry?.nick?.toLowerCase().includes(kw)
  })
})

function fcolor(faction) {
  return props.factions[faction]?.color ?? 'var(--t2)'
}
</script>

<style scoped>
.csg-wrap {
  display: flex; flex-direction: column; gap: 16px;
}

.csg-section { display: flex; flex-direction: column; gap: 8px; }
.csg-label   { font-size: 10px; letter-spacing: 1px; }

/* 추천 인물 - 가로형 리스트 카드 */
.csg-recommend {
  display: flex; flex-direction: column; gap: 6px;
}

.rec-card {
  display: flex; align-items: center; gap: 12px;
  padding: 10px 14px;
  background: var(--bg3); border: 1px solid var(--bd); border-radius: var(--r);
  cursor: pointer; transition: all .15s; text-align: left; width: 100%;
}
.rec-card:hover    { background: var(--bgh); border-color: var(--tg); }
.rec-card.selected { background: rgba(212,170,96,.07); }

.rec-avatar {
  width: 38px; height: 38px; border-radius: 50%; flex-shrink: 0;
  background: var(--bg4); border: 1px solid var(--bd);
  display: flex; align-items: center; justify-content: center;
  font-size: 17px; transition: border-color .15s;
}

.rec-info   { display: flex; flex-direction: column; gap: 2px; }
.rec-name   { font-size: 13px; color: var(--t1); }
.rec-faction { font-size: 10px; }

/* 전체 인물 - 칩 */
.search-input {
  width: 100%; padding: 7px 10px; font-size: 12px;
  background: var(--bg3); border: 1px solid var(--bd); border-radius: var(--r);
  color: var(--t1); outline: none;
}
.search-input:focus { border-color: var(--tg); }

.char-chip-grid { display: flex; flex-wrap: wrap; gap: 5px; }

.char-chip {
  padding: 4px 10px; font-size: 11px;
  background: var(--bg3); border: 1px solid var(--bd); border-radius: var(--r);
  cursor: pointer; transition: all .13s; color: var(--t2);
}
.char-chip:hover    { background: var(--bgh); color: var(--t1); }
.char-chip.selected { background: rgba(212,170,96,.08); }
</style>
