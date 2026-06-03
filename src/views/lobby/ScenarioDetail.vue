<template>
  <div class="detail-overlay" @click.self="$emit('close')">
    <div class="detail-panel">

      <!-- ?ÅÎã® ?§Îçî -->
      <div class="det-header">
        <button class="adj-btn mono" :disabled="!prevSc" @click="goTo(prevSc)">???¥Ï†Ñ</button>
        <div class="det-title">
          <span class="serif" style="font-size:16px;color:var(--tg)">{{ cur.nameKr }}</span>
          <span class="mono dim" style="font-size:10px;margin-left:8px">
            {{ cur.yearType }} {{ cur.year }}
            <template v-if="cur.yearType === 'SE'"> / ?úÍµ≠??{{ cur.year - 309 }}??/template>
          </span>
        </div>
        <button class="adj-btn mono" :disabled="!nextSc" @click="goTo(nextSc)">?§Ïùå ??/button>
        <button class="close-btn mono" @click="$emit('close')">??/button>
      </div>

      <!-- ?¥Î?ÏßÄ -->
      <div class="det-image">
        <template v-if="bgSrc">
          <img class="det-img-bg" :src="bgSrc" />
          <img class="det-img"    :src="bgSrc" />
        </template>
        <div v-else class="det-gradient" />

        <!-- Ï∫êÎ¶≠??Ï¥àÏÉÅ??(?Ä??Î™®Îìú) -->
        <Transition name="char-fade">
          <div v-if="charSrc" class="det-char-wrap">
            <div v-if="page.charName" class="det-char-name mono">{{ page.charName }}</div>
            <img class="det-char-img" :src="charSrc" />
          </div>
        </Transition>
      </div>

      <!-- Î≥∏Î¨∏ -->
      <div class="det-body">
        <div class="det-text-wrap">
          <Transition :name="page?.effect ?? 'fade'" mode="out-in">
            <p :key="pageIdx" class="det-text serif">{{ page?.text ?? '(?¥Ïö© Ï§ÄÎπ?Ï§?' }}</p>
          </Transition>
        </div>

        <!-- ?òÎã® Í≥†Ï†ï: libs + ?òÏù¥ÏßÄ ?∏ÎîîÏºÄ?¥ÌÑ∞ -->
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

      <!-- ?òÎã® Î≤ÑÌäº -->
      <div class="det-footer">
        <button class="btn" :disabled="pageIdx === 0" @click="pageIdx--">???¥Ï†Ñ</button>

        <button v-if="!cur.useYn"
                class="btn dim-action" disabled>
          ÏßÑÌñâ Î∂àÍ?
        </button>
        <button v-else-if="cur.openPt === 0"
                class="btn btn-gold" @click="onStart">
          ???úÏûë
        </button>
        <button v-else
                class="btn btn-blue">
          ?îí {{ cur.openPt }}PÎ°?Íµ¨Îß§
        </button>

        <button class="btn" :disabled="pageIdx >= totalPages - 1" @click="pageIdx++">?§Ïùå ??/button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { SCENARIOS } from '@/data/scenarios/scenarioData.js'
import { useEncyclopediaStore } from '@/stores/encyclopediaStore'

const props = defineProps({ scenario: Object })
const emit  = defineEmits(['close', 'start'])

const enc = useEncyclopediaStore()

// ?Ä?Ä ?¥Î? ?ÑÏû¨ ?úÎÇòÎ¶¨Ïò§ (?§Îçî ?¥Ï†Ñ/?§Ïùå?ºÎ°ú ?ÑÌôò Í∞Ä?? ?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä
const cur     = ref(props.scenario)
const pageIdx = ref(0)

watch(() => props.scenario, sc => { cur.value = sc; pageIdx.value = 0 })

// ?Ä?Ä ?ÑÏ≤¥ ?úÎÇòÎ¶¨Ïò§ ?ïÎ†¨ (AD ??SE ??RC, ?∞ÎèÑ ?? ?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä
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

// ?Ä?Ä ?ÑÏû¨ ?òÏù¥ÏßÄ ?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä
const pages      = computed(() => cur.value?.desc ?? [])
const totalPages = computed(() => Math.max(pages.value.length, 1))
const page       = computed(() => pages.value[pageIdx.value] ?? null)

// ?Ä?Ä ?¥Î?ÏßÄ Í≤ΩÎ°ú ?¨Ìçº (bg ?∞ÏÑ†, image ?òÏúÑ?∏Ìôò) ?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä
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

// ?Ä?Ä libs ?ùÏóÖ ?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä
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

// ?Ä?Ä ?úÏûë ?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä
function onStart() {
  emit('start', cur.value)
}
</script>

<style scoped>
/* ?Ä?Ä ?§Î≤Ñ?àÏù¥ ?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä */
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

/* ?Ä?Ä ?§Îçî ?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä */
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

/* ?Ä?Ä ?¥Î?ÏßÄ (50%) ?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä */
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

/* ?Ä?Ä Ï∫êÎ¶≠??Ï¥àÏÉÅ???Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä */
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

/* Ï∫êÎ¶≠???òÏù¥???ÑÌôò */
.char-fade-enter-active, .char-fade-leave-active { transition: opacity .2s; }
.char-fade-enter-from, .char-fade-leave-to       { opacity: 0; }

/* ?Ä?Ä Î≥∏Î¨∏ (30%) ?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä */
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

/* ?òÎã® Í≥†Ï†ï ?ÅÏó≠ */
.det-bottom { flex-shrink: 0; display: flex; flex-direction: column; gap: 8px; }

/* ?òÏù¥ÏßÄ ?∏ÎîîÏºÄ?¥ÌÑ∞ */
.page-dots { display: flex; justify-content: center; gap: 7px; padding-bottom: 2px; }
.dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: var(--bd); cursor: pointer; transition: background .15s;
}
.dot.active { background: var(--tg); }

/* ?Ä?Ä ?òÎã® Î≤ÑÌäº ?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä */
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

/* ?Ä?Ä ?òÏù¥ÏßÄ ?ÑÌôò ?∏ÎûúÏßÄ???Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä?Ä */
.fade-enter-active, .fade-leave-active { transition: opacity .25s; }
.fade-enter-from, .fade-leave-to       { opacity: 0; }

.slide-enter-active, .slide-leave-active { transition: all .25s; }
.slide-enter-from  { opacity: 0; transform: translateX(20px); }
.slide-leave-to    { opacity: 0; transform: translateX(-20px); }
</style>
