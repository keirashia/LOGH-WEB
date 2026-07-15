<template>
  <div class="options-panel panel" @click.self="dropOpen = false">

    <!-- 언어 -->
    <div class="opts-row">
      <span class="opts-label serif">언어</span>
      <div class="opts-picker">
        <button class="pick-arrow" @click="step(-1)">◀</button>

        <!-- 현재 값 클릭 → 드롭다운 토글 -->
        <div class="pick-val-wrap" ref="wrapRef">
          <button class="pick-val serif" @click="dropOpen = !dropOpen">
            {{ LANGS[auth.lang].label }}
          </button>

          <Transition name="drop">
            <ul v-if="dropOpen" class="pick-drop" @click.stop>
              <li
                v-for="code in ORDER" :key="code"
                class="pick-drop-item serif"
                :class="{ active: auth.lang === code }"
                @click="select(code)"
              >{{ LANGS[code].label }}</li>
            </ul>
          </Transition>
        </div>

        <button class="pick-arrow" @click="step(1)">▶</button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'

const auth = useAuthStore()

const LANGS = { Kr: { label: '한국어' }, En: { label: 'English' }, Jp: { label: '日本語' } }
const ORDER = ['Kr', 'En', 'Jp']

const dropOpen = ref(false)
const wrapRef  = ref(null)

function onDocClick(e) {
  if (wrapRef.value && !wrapRef.value.contains(e.target)) dropOpen.value = false
}
onMounted(()   => document.addEventListener('click', onDocClick))
onUnmounted(() => document.removeEventListener('click', onDocClick))

function step(dir) {
  const idx = ORDER.indexOf(auth.lang)
  auth.setLang(ORDER[(idx + dir + ORDER.length) % ORDER.length])
}
function select(code) {
  auth.setLang(code)
  dropOpen.value = false
}
</script>

<style scoped>
.options-panel {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 490;
  padding: clamp(14px, 2vh, 24px) clamp(14px, 2vw, 28px);
  border-radius: 0 0 var(--r) var(--r);
  border-top: none;
  box-shadow: 0 8px 24px rgba(0, 0, 0, .5);
}

/* ── 행 레이아웃 ─────────────────────────────────────── */
.opts-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 0;
}
.opts-label {
  font-size: var(--fs-sm);
  color: var(--t2);
  letter-spacing: .5px;
}

/* ── 피커 (◀ 값 ▶) ───────────────────────────────────── */
.opts-picker {
  display: flex;
  align-items: center;
  gap: 6px;
}
.pick-arrow {
  background: none;
  border: none;
  color: var(--td);
  font-size: var(--fs-xs);
  cursor: pointer;
  padding: 2px 5px;
  line-height: 1;
  transition: color .15s;
}
.pick-arrow:hover { color: var(--tg); }

/* ── 현재 값 버튼 ─────────────────────────────────────── */
.pick-val-wrap { position: relative; }

.pick-val {
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 72px;
  justify-content: center;
  background: var(--bg4);
  border: 1px solid var(--bd);
  border-radius: 4px;
  padding: 3px 8px;
  font-size: var(--fs-sm);
  color: var(--t1);
  letter-spacing: .5px;
  cursor: pointer;
  transition: border-color .15s, color .15s;
}
.pick-val:hover { border-color: var(--tg); color: var(--tg); }

.pick-caret { font-size: var(--fs-2xs); color: var(--td); }

/* ── 드롭다운 ─────────────────────────────────────────── */
.pick-drop {
  position: absolute;
  top: calc(100% + 4px);
  left: 50%;
  transform: translateX(-50%);
  min-width: 100%;
  background: var(--bg3);
  border: 1px solid var(--bdg);
  border-radius: var(--r);
  box-shadow: 0 6px 20px rgba(0,0,0,.6);
  list-style: none;
  overflow: hidden;
  z-index: 10;
}
.pick-drop-item {
  padding: 7px 16px;
  font-size: var(--fs-sm);
  color: var(--t2);
  letter-spacing: .5px;
  cursor: pointer;
  white-space: nowrap;
  text-align: center;
  transition: background .12s, color .12s;
}
.pick-drop-item:hover  { background: var(--bgh); color: var(--t1); }
.pick-drop-item.active { color: var(--tg); background: rgba(212,170,96,.08); }

/* ── 드롭 애니메이션 ──────────────────────────────────── */
.drop-enter-active { transition: opacity .15s, transform .15s; }
.drop-leave-active { transition: opacity .1s,  transform .1s; }
.drop-enter-from, .drop-leave-to { opacity: 0; transform: translateX(-50%) translateY(-4px); }
</style>
