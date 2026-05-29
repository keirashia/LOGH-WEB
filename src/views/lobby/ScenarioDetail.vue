<template>
  <div class="detail-overlay" @click.self="$emit('close')">
    <div class="detail-panel">

      <!-- 상단 헤더 -->
      <div class="det-header">
        <button class="adj-btn mono" :disabled="!prevSc" @click="goTo(prevSc)">← 이전</button>
        <div class="det-title">
          <span class="serif" style="font-size:16px;color:var(--tg)">{{ cur.nameKr }}</span>
          <span class="mono dim" style="font-size:10px;margin-left:8px">
            {{ cur.yearType }} {{ cur.year }}
            <template v-if="cur.yearType === 'SE'"> / 제국력 {{ cur.year - 309 }}년</template>
          </span>
        </div>
        <button class="adj-btn mono" :disabled="!nextSc" @click="goTo(nextSc)">다음 →</button>
        <button class="close-btn mono" @click="$emit('close')">✕</button>
      </div>

      <!-- 이미지 -->
      <div class="det-image">
        <img v-if="page?.image" :src="page.image" class="det-img" />
        <div v-else class="det-gradient" />
      </div>

      <!-- 본문 -->
      <div class="det-body">
        <Transition :name="page?.effect ?? 'fade'" mode="out-in">
          <p :key="pageIdx" class="det-text serif">{{ page?.text ?? '(내용 준비 중)' }}</p>
        </Transition>

        <!-- 하단 고정: libs + 페이지 인디케이터 -->
        <div class="det-bottom">
          <div class="libs-row" v-if="page?.libs?.length">
            <button v-for="lib in page.libs" :key="lib"
                    class="lib-btn mono"
                    @click="openLib(lib)">
              {{ libLabel(lib) }}
            </button>
          </div>
          <div class="page-dots" v-if="totalPages > 1">
            <span v-for="i in totalPages" :key="i"
                  class="dot" :class="{ active: i - 1 === pageIdx }"
                  @click="pageIdx = i - 1" />
          </div>
        </div>
      </div>

      <!-- 하단 버튼 -->
      <div class="det-footer">
        <button class="btn" :disabled="pageIdx === 0" @click="pageIdx--">← 이전</button>

        <button v-if="!cur.useYn"
                class="btn dim-action" :disabled="!nextSc" @click="goTo(nextSc)">
          다음 시나리오 →
        </button>
        <button v-else-if="cur.openPt === 0"
                class="btn btn-gold" @click="onStart">
          ▶ 시작
        </button>
        <button v-else
                class="btn btn-blue">
          🔒 {{ cur.openPt }}P로 구매
        </button>

        <button class="btn" :disabled="pageIdx >= totalPages - 1" @click="pageIdx++">다음 →</button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { SCENARIOS } from '@/data/scenarios/scenario.js'
import { useEncyclopediaStore } from '@/stores/encyclopediaStore'

const props = defineProps({ scenario: Object })
const emit  = defineEmits(['close', 'start'])

const enc = useEncyclopediaStore()

// ── 내부 현재 시나리오 (헤더 이전/다음으로 전환 가능) ─────────
const cur     = ref(props.scenario)
const pageIdx = ref(0)

watch(() => props.scenario, sc => { cur.value = sc; pageIdx.value = 0 })

// ── 전체 시나리오 정렬 (AD → SE → RC, 연도 순) ────────────────
const ERA_ORDER = { AD: 0, SE: 1, RC: 2 }
const sortedAll = computed(() =>
  [...SCENARIOS].sort((a, b) => {
    const eo = (ERA_ORDER[a.yearType] ?? 9) - (ERA_ORDER[b.yearType] ?? 9)
    return eo !== 0 ? eo : a.year - b.year
  })
)

const curIdx   = computed(() => sortedAll.value.findIndex(s => s.id === cur.value?.id))
const prevSc   = computed(() => curIdx.value > 0 ? sortedAll.value[curIdx.value - 1] : null)
const nextSc   = computed(() => curIdx.value < sortedAll.value.length - 1 ? sortedAll.value[curIdx.value + 1] : null)

function goTo(sc) {
  cur.value   = sc
  pageIdx.value = 0
}

// ── 현재 페이지 ───────────────────────────────────────────────
const pages      = computed(() => cur.value?.desc ?? [])
const totalPages = computed(() => Math.max(pages.value.length, 1))
const page       = computed(() => pages.value[pageIdx.value] ?? null)

// ── libs 팝업 ─────────────────────────────────────────────────
function libLabel(lib) {
  return lib.slice(lib.indexOf(':') + 1)
}

function openLib(lib) {
  const colonIdx = lib.indexOf(':')
  const prefix   = lib.slice(0, 3)          // 'ST_' or 'CH_'
  const label    = lib.slice(colonIdx + 1)
  if (prefix === 'ST_') {
    enc.open('systems')
    enc.searchQuery = label
  } else if (prefix === 'CH_') {
    enc.open('characters')
    enc.searchQuery = label
  }
}

// ── 시작 ─────────────────────────────────────────────────────
function onStart() {
  emit('start', cur.value)
}
</script>

<style scoped>
/* ── 오버레이 ─────────────────────────────────────────────── */
.detail-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, .55);
  display: flex;
  align-items: flex-end;
  justify-content: stretch;
  z-index: 100;
  backdrop-filter: blur(3px);
}

.detail-panel {
  width: 100%;
  height: 80vh;
  background: var(--bg2);
  border: 1px solid var(--bdg);
  border-radius: 12px 12px 0 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 -10px 40px rgba(0,0,0,.5);
}

/* ── 헤더 ─────────────────────────────────────────────────── */
.det-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--bd);
  flex-shrink: 0;
}
.det-title {
  flex: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}
.adj-btn {
  font-size: 11px;
  padding: 5px 10px;
  background: var(--bg3);
  border: 1px solid var(--bd);
  border-radius: var(--r);
  color: var(--t2);
  cursor: pointer;
  transition: all .13s;
  white-space: nowrap;
  flex-shrink: 0;
}
.adj-btn:hover:not(:disabled) { color: var(--t1); border-color: var(--tg); }
.adj-btn:disabled { opacity: .3; cursor: default; }
.close-btn {
  font-size: 13px;
  width: 28px; height: 28px;
  display: flex; align-items: center; justify-content: center;
  background: var(--bg3); border: 1px solid var(--bd); border-radius: var(--r);
  color: var(--t2); cursor: pointer; transition: all .13s; flex-shrink: 0;
}
.close-btn:hover { color: var(--t1); border-color: var(--bd); }

/* ── 이미지 (50%) ────────────────────────────────────────── */
.det-image {
  flex: 5;
  min-height: 0;
  overflow: hidden;
  background: linear-gradient(135deg, #06111e 0%, #0e1e3a 40%, #081018 100%);
}
.det-img {
  width: 100%; height: 100%;
  object-fit: cover;
}
.det-gradient {
  width: 100%; height: 100%;
  background: linear-gradient(135deg, #06111e 0%, #0e1e3a 40%, #081018 100%);
}

/* ── 본문 (30%) ───────────────────────────────────────────── */
.det-body {
  flex: 3;
  min-height: 0;
  overflow-y: auto;
  padding: 16px 24px 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.det-text {
  font-size: 13px;
  line-height: 1.85;
  color: var(--t1);
  white-space: pre-line;
  margin: 0;
}

/* libs */
.libs-row { display: flex; flex-wrap: wrap; gap: 6px; }
.lib-btn {
  font-size: 11px;
  padding: 4px 10px;
  background: rgba(68,136,255,.1);
  border: 1px solid rgba(68,136,255,.35);
  border-radius: var(--r);
  color: #6aabff;
  cursor: pointer;
  transition: all .13s;
}
.lib-btn:hover { background: rgba(68,136,255,.2); border-color: #6aabff; }

/* 하단 고정 영역 */
.det-bottom { margin-top: auto; display: flex; flex-direction: column; gap: 8px; }

/* 페이지 인디케이터 */
.page-dots { display: flex; justify-content: center; gap: 7px; padding-bottom: 2px; }
.dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: var(--bd); cursor: pointer; transition: background .15s;
}
.dot.active { background: var(--tg); }

/* ── 하단 버튼 ───────────────────────────────────────────── */
.det-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-top: 1px solid var(--bd);
  flex-shrink: 0;
  gap: 8px;
}
.dim-action {
  color: var(--t2);
  border-color: var(--bd);
  background: var(--bg3);
  font-size: 12px;
}

/* ── 페이지 전환 트랜지션 ───────────────────────────────── */
.fade-enter-active, .fade-leave-active { transition: opacity .25s; }
.fade-enter-from, .fade-leave-to       { opacity: 0; }

.slide-enter-active, .slide-leave-active { transition: all .25s; }
.slide-enter-from  { opacity: 0; transform: translateX(20px); }
.slide-leave-to    { opacity: 0; transform: translateX(-20px); }
</style>
