<template>
  <div class="tb-wrap" :class="`rarity-${trait.rarity}`">

    <!-- 게이지 테두리: clip-path로 왼→오 순서로 노출 -->
    <div
      v-if="gaugePercent > 0"
      class="tb-gauge"
      :style="{ clipPath: `inset(0 ${100 - gaugePercent}% 0 0)` }"
    />

    <button
      class="tb-btn"
      @mousedown="onDown"
      @mouseup="onUp"
      @mouseleave="onUp"
      @touchstart.prevent="onDown"
      @touchend.prevent="onUp"
      @touchcancel="onUp"
      @contextmenu.prevent
    >
      <span v-if="trait.rarity === 'unique'" class="tb-rarity mono">{{ RARITY_LABEL[trait.rarity] ?? trait.rarity }}</span>
      <span class="tb-name serif">{{ trait.nameKr }}</span>
      <div class="tb-right">
        <span class="tb-lv mono">Lv.{{ charTrait?.traitLv ?? 0 }}</span>
        <div class="tb-exp-bar">
          <div class="tb-exp-fill" :style="{ width: `${expPercent}%` }" />
        </div>
      </div>
    </button>

    <!-- 힌트 패널 (홀드 완료 후 표시, 클릭으로 닫기) -->
    <transition name="tb-drop">
      <div v-if="showHint" class="tb-hint" @click.stop="showHint = false">
        <div class="tb-hint-head">
          <span class="serif tb-hint-name">{{ trait.nameKr }}</span>
          <!-- <span class="tb-hint-rar mono">{{ RARITY_LABEL[trait.rarity] ?? trait.rarity }}</span> -->
        </div>
        <p class="tb-hint-desc">{{ trait.desc }}</p>
        <div v-if="hasEffects" class="tb-hint-fx">
          <span
            v-for="(val, key) in trait.effects" :key="key"
            class="tb-fx mono"
            :class="val > 0 ? 'fx-pos' : 'fx-neg'"
          >{{ STAT_LABEL[key] ?? key }} {{ val > 0 ? '+' : '' }}{{ val }}</span>
        </div>
        <div v-else class="mono dim tb-hint-event">이벤트 트리거</div>
      </div>
    </transition>

  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'

const props = defineProps({
  trait:     { type: Object, required: true },
  charTrait: { type: Object, default: null },
})

const HOLD_MS = 800
const TICK_MS = 16

const RARITY_LABEL = { common: '일반', uncommon: '비범', rare: '희귀', unique: '고유' }
const STAT_LABEL = {
  statCmd: '통솔', statCsm: '카리스마', statAtt: '공격', statDef: '방어',
  statFst: '기동', statMng: '운영', statInf: '정보', statGfg: '육전',
  statAfg: '공전', statPlt: '정략',
}

const gaugePercent = ref(0)
const showHint     = ref(false)

let timerId = null
let elapsed = 0

function onDown() {
  if (showHint.value) { showHint.value = false; return }
  elapsed = 0
  gaugePercent.value = 0
  timerId = setInterval(() => {
    elapsed += TICK_MS
    gaugePercent.value = Math.min((elapsed / HOLD_MS) * 100, 100)
    if (elapsed >= HOLD_MS) {
      stop()
      gaugePercent.value = 0
      showHint.value = true
    }
  }, TICK_MS)
}

function onUp() {
  stop()
  if (!showHint.value) gaugePercent.value = 0
}

function stop() {
  if (timerId) { clearInterval(timerId); timerId = null }
}

onUnmounted(stop)

const MAX_EXP = 100
const expPercent = computed(() => Math.min(((props.charTrait?.traitExp ?? 0) / MAX_EXP) * 100, 100))
const hasEffects = computed(() => Object.keys(props.trait.effects ?? {}).length > 0)
</script>

<style scoped>
/* rarity별 색상 토큰 */
.tb-wrap {
  position: relative;
  width: 100%;
  --rc: var(--td);   /* rarity label/border color */
  --gc: var(--t2);   /* gauge color */
}
.rarity-uncommon { --rc: rgba(68,136,255,.75);  --gc: rgba(68,136,255,.9); }
.rarity-rare     { --rc: rgba(160,80,220,.75);  --gc: rgba(160,80,220,.9); }
.rarity-unique   { --rc: var(--tg);              --gc: var(--tg); }

/* ── 게이지 테두리 오버레이 ──────────────────────── */
.tb-gauge {
  position: absolute;
  inset: -1px;
  border: 2px solid var(--gc);
  border-radius: 5px;
  pointer-events: none;
  z-index: 2;
}

/* ── 버튼 ─────────────────────────────────────────── */
.tb-btn {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 9px 12px;
  background: var(--bg4);
  border: 1px solid var(--bd);
  border-radius: 4px;
  text-align: left;
  user-select: none;
  -webkit-user-select: none;
  transition: background .12s;
}
.tb-btn:active { background: var(--bgh); }

.tb-rarity {
  font-size: 9px;
  color: var(--rc);
  border: 1px solid var(--rc);
  padding: 1px 5px;
  border-radius: 2px;
  flex-shrink: 0;
  letter-spacing: .5px;
}
.tb-name {
  font-size: 12px;
  color: var(--t1);
  flex: 1;
  letter-spacing: .5px;
}
.tb-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 3px;
  flex-shrink: 0;
}
.tb-lv {
  font-size: 10px;
  color: var(--t2);
}
.tb-exp-bar {
  width: 40px;
  height: 3px;
  background: var(--bd);
  border-radius: 2px;
  overflow: hidden;
}
.tb-exp-fill {
  height: 100%;
  background: var(--gc);
  border-radius: 2px;
  transition: width .3s;
}

/* ── 힌트 패널 ───────────────────────────────────── */
.tb-hint {
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  right: 0;
  z-index: 200;
  background: var(--bg3);
  border: 1px solid var(--gc);
  border-radius: 5px;
  padding: 12px 14px;
  box-shadow: 0 6px 24px rgba(0,0,0,.75);
  cursor: pointer;
  max-height: 40vh;
  overflow-y: auto;
}
.tb-hint-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}
.tb-hint-name {
  font-size: 13px;
  color: var(--tg);
}
.tb-hint-rar {
  font-size: 9px;
  color: var(--rc);
  border: 1px solid var(--rc);
  padding: 1px 5px;
  border-radius: 2px;
}
.tb-hint-desc {
  font-size: 11px;
  color: var(--t2);
  line-height: 1.65;
  white-space: pre-line;
}
.tb-hint-fx {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 8px;
}
.tb-fx {
  font-size: 10px;
  padding: 2px 7px;
  border-radius: 3px;
}
.fx-pos { background: rgba(91,196,160,.12); color: #5bc4a0; border: 1px solid rgba(91,196,160,.3); }
.fx-neg { background: rgba(224,80,80,.12);  color: var(--ta); border: 1px solid rgba(224,80,80,.3); }
.tb-hint-event { font-size: 10px; margin-top: 6px; }

/* ── 트랜지션 ─────────────────────────────────────── */
.tb-drop-enter-active { transition: opacity .18s, transform .18s; }
.tb-drop-leave-active { transition: opacity .12s; }
.tb-drop-enter-from   { opacity: 0; transform: translateY(-6px); }
.tb-drop-leave-to     { opacity: 0; }
</style>
