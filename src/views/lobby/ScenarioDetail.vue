<template>
  <div class="detail-overlay" @click.self="$emit('close')">
    <div class="detail-panel">

      <!-- 상단 헤더 -->
      <div class="det-header">
        <!-- <button class="adj-btn mono" :disabled="!prevSc" @click="goTo(prevSc)">← 이전</button> -->
        <div class="det-title">
          <span class="serif" style="font-size:16px;color:var(--tg)">{{ cur.nameKr }}</span>
          <span class="mono dim" style="font-size:10px;margin-left:8px">
            {{ cur.yearType }} {{ cur.year }}
            <template v-if="cur.yearType === 'SE'"> / 제국력 {{ cur.year - 309 }}년</template>
          </span>
        </div>
        <!-- <button class="adj-btn mono" :disabled="!nextSc" @click="goTo(nextSc)">다음 →</button> -->
        <button class="close-btn mono" @click="$emit('close')">✕</button>
      </div>

      <!-- 이미지 -->
      <div class="det-image">
        <template v-if="bgSrc">
          <img class="det-img-bg" :src="bgSrc" />
          <img class="det-img"    :src="bgSrc" />
        </template>
        <div v-else class="det-gradient" />

        <!-- 캐릭터 초상화 (대화 모드) -->
        <Transition name="char-fade">
          <div v-if="charSrc" class="det-char-wrap">
            <div v-if="page.charName" class="det-char-name mono">{{ page.charName }}</div>
            <img class="det-char-img" :src="charSrc" />
          </div>
        </Transition>
      </div>

      <!-- 본문 -->
      <div class="det-body">
        <div class="det-text-wrap">
          <Transition :name="page?.effect ?? 'fade'" mode="out-in">
            <p :key="pageIdx" class="det-text serif">{{ page?.text ?? '(내용 준비 중)' }}</p>
          </Transition>
        </div>

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
                class="btn dim-action" disabled>
          진행 불가
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
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { SCENARIOS } from '@/data/scenarios/scenarioData.js'
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

// ── 이미지 경로 헬퍼 (bg 우선, image 하위호환) ────────────────
function scenarioImgBase(sc) {
  const seq = sc.id.split('_')[1].padStart(2, '0')
  return `/img/scenarios/${sc.yearType}${sc.year}/${seq}`
}
const bgSrc   = computed(() => {
  const f = page.value?.bg || page.value?.image
  return f ? `${scenarioImgBase(cur.value)}/${f}` : ''
})
const charSrc = computed(() => {
  const f = page.value?.char
  return f ? `${scenarioImgBase(cur.value)}/${f}` : ''
})

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

// ── 마우스 백 버튼 / 브라우저 뒤로가기로 팝업 닫기 ──────────
let _pushedState = false

onMounted(() => {
  history.pushState({ loghDetail: true }, '')
  _pushedState = true
  window.addEventListener('popstate', _onPopState)
})

onUnmounted(() => {
  window.removeEventListener('popstate', _onPopState)
  if (_pushedState) {
    _pushedState = false
    history.back()
  }
})

function _onPopState() {
  _pushedState = false
  emit('close')
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
  height: 90vh;
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
  position: relative;
  background: #060d16;
}
.det-img-bg {
  position: absolute;
  inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  filter: blur(18px) brightness(0.4);
  transform: scale(1.1);
}
.det-img {
  position: relative;
  width: 100%; height: 100%;
  object-fit: contain;
}
.det-gradient {
  width: 100%; height: 100%;
  background: linear-gradient(135deg, #06111e 0%, #0e1e3a 40%, #081018 100%);
}

/* ── 캐릭터 초상화 ────────────────────────────────────────── */
.det-char-wrap {
  position: absolute;
  bottom: 0;
  left: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  pointer-events: none;
}
.det-char-name {
  font-size: 11px;
  color: var(--t1);
  background: rgba(160, 20, 20, 0.88);
  border: 1px solid rgba(220, 70, 70, 0.45);
  padding: 3px 10px;
  border-radius: 2px;
  letter-spacing: 0.04em;
}
.det-char-img {
  height: 160px;
  width: auto;
  object-fit: contain;
  object-position: bottom;
  filter: drop-shadow(0 2px 10px rgba(0, 0, 0, 0.85));
}

/* 캐릭터 페이드 전환 */
.char-fade-enter-active, .char-fade-leave-active { transition: opacity .2s; }
.char-fade-enter-from, .char-fade-leave-to       { opacity: 0; }

/* ── 본문 (30%) ───────────────────────────────────────────── */
.det-body {
  flex: 3;
  min-height: 0;
  overflow: hidden;
  padding: 12px 24px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.det-text-wrap {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
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
.det-bottom { flex-shrink: 0; display: flex; flex-direction: column; gap: 8px; }

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
