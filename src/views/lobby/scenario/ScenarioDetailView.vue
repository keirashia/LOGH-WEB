<template>
  <div class="page">

    <!-- 상단 네비 -->
    <div class="top-nav">
      <div class="nav-title">
        <span class="serif">{{ cur.nameKr }}</span>
        <span v-if="cur.subTitle" class="mono dim nav-subtitle">{{ cur.subTitle }}</span>
      </div>
    </div>

    <!-- 히어로 이미지 -->
    <div class="hero">
      <template v-if="bgSrc">
        <img class="hero-bg"  :src="bgSrc" />
        <img class="hero-img" :src="bgSrc" />
      </template>
      <div v-else class="hero-gradient" />

      <Transition name="char-fade">
        <div v-if="charSrc" class="char-wrap">
          <div v-if="page?.charName" class="char-name mono">{{ page.charName }}</div>
          <img class="char-img" :src="charSrc" />
        </div>
      </Transition>
    </div>

    <!-- 본문 -->
    <div class="body">
      <Transition :name="page?.effect ?? 'fade'" mode="out-in">
        <p :key="pageIdx" class="body-text serif">{{ page?.text ?? '(내용 준비 중)' }}</p>
      </Transition>

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

    <!-- 하단 액션 바 -->
    <div class="action-bar">
      <div class="action-row">
        <button class="btn" :disabled="pageIdx === 0" @click="pageIdx--">← 이전</button>
        <button class="btn" :disabled="pageIdx >= totalPages - 1" @click="pageIdx++">다음 →</button>
      </div>
      <div class="action-row">
        <button class="btn btn-cancel" @click="router.back()">◁ 설정</button>
        <button v-if="!cur.useYn"                              class="btn dim-action" disabled>진행 불가</button>
        <button v-else-if="!lobby.isScenarioUnlocked(cur.id)" class="btn btn-blue">🔒 {{ cur.openPt !== '-' ? cur.openPt + 'P로 구매' : '업적 해금 필요' }}</button>
        <button v-else                                         class="btn btn-gold" @click="onStart">국가 선택</button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { SCENARIOS } from '@/data/scenario/scenarioData.js'
import { useEncyclopediaStore } from '@/stores/encyclopediaStore'
import { useGameStore } from '@/stores/gameStore'
import { useLobbyStore } from '@/stores/lobbyStore'

const route  = useRoute()
const router = useRouter()
const enc    = useEncyclopediaStore()
const game   = useGameStore()
const lobby  = useLobbyStore()

const cur     = ref(SCENARIOS.find(s => s.id === route.params.scId) ?? SCENARIOS[0])
const pageIdx = ref(0)

watch(() => route.params.scId, id => {
  const sc = SCENARIOS.find(s => s.id === id)
  if (sc) { cur.value = sc; pageIdx.value = 0 }
})

const pages      = computed(() => cur.value?.desc ?? [])
const totalPages = computed(() => Math.max(pages.value.length, 1))
const page       = computed(() => pages.value[pageIdx.value] ?? null)

function scenarioImgBase(sc) {
  if (sc.variants) {
    const [yt, seq] = sc.variants.split('_')
    return `/img/scenarios/${yt}/${seq}`
  }
  const [y, m, s] = sc.id.split('_')
  return `/img/scenarios/${y}/${m}/${s}`
}
const bgSrc   = computed(() => {
  const f = page.value?.bg || page.value?.image
  return f ? `${scenarioImgBase(cur.value)}/${f}` : ''
})
const charSrc = computed(() => {
  const f = page.value?.char
  return f ? `${scenarioImgBase(cur.value)}/${f}` : ''
})

function libLabel(lib) { return lib.slice(lib.indexOf(':') + 1) }
function openLib(lib) {
  const prefix = lib.slice(0, 3)
  const label  = lib.slice(lib.indexOf(':') + 1)
  if (prefix === 'ST_')      { enc.open('systems');    enc.searchQuery = label }
  else if (prefix === 'CH_') { enc.open('characters'); enc.searchQuery = label }
}

onMounted(() => {
  if (cur.value.useYn && lobby.isScenarioUnlocked(cur.value.id)) {
    game.preloadScenario(cur.value.id)
  }
})

function onStart() {
  router.push({ name: 'scenario-char', params: { scId: cur.value.id } })
}
</script>

<style scoped>
.page {
  position: relative;
  width: 100%; height: 100%;
  background: #020508;
  overflow: hidden;
}

/* 상단 네비 */
.top-nav {
  position: absolute;
  top: 0; left: 0; right: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  padding: 0 1.5vw;
  height: 7vh;
  background: rgba(2,5,8,.7);
  border-bottom: 1px solid rgba(212,170,96,.15);
  backdrop-filter: blur(8px);
}
.nav-title {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}
.nav-title .serif { font-size: 3.0vh; color: var(--t1); }
.nav-subtitle { font-size: 1.6vh; color: rgba(212,170,96,.6); letter-spacing: 0.1vw; }

/* 히어로 이미지 */
.hero {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: #060d16;
}
.hero-bg {
  position: absolute;
  inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  filter: blur(20px) brightness(0.3);
  transform: scale(1.1);
}
.hero-img {
  position: relative;
  width: 100%; height: 100%;
  object-fit: cover;
}
.hero-gradient {
  width: 100%; height: 100%;
  background: linear-gradient(160deg, #06111e 0%, #0e1e3a 50%, #081018 100%);
}

/* 캐릭터 */
.char-wrap {
  position: absolute;
  bottom: 0; left: 16px;
  display: flex; flex-direction: column; align-items: flex-start; gap: 4px;
  pointer-events: none;
}
.char-name {
  font-size: 11px; color: var(--t1);
  background: rgba(160,20,20,.88);
  border: 1px solid rgba(220,70,70,.45);
  padding: 3px 10px; border-radius: 2px;
  letter-spacing: .04em;
}
.char-img {
  height: 150px; width: auto;
  object-fit: contain; object-position: bottom;
  filter: drop-shadow(0 2px 12px rgba(0,0,0,.9));
}
.char-fade-enter-active, .char-fade-leave-active { transition: opacity .2s; }
.char-fade-enter-from,   .char-fade-leave-to     { opacity: 0; }

/* 본문 */
.body {
  position: absolute;
  bottom: 14vh; left: 0; right: 0;
  z-index: 10;
  padding: 32px 20px 14px;
  background: linear-gradient(to bottom, transparent, rgba(2,5,8,.92) 28%);
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 48%;
  overflow-y: auto;
}
.body-text {
  font-size: 13px;
  line-height: 1.9;
  color: var(--t1);
  white-space: pre-line;
  margin: 0;
}
.libs-row { display: flex; flex-wrap: wrap; gap: 6px; }
.lib-btn {
  font-size: 11px; padding: 4px 10px;
  background: rgba(68,136,255,.1);
  border: 1px solid rgba(68,136,255,.35);
  border-radius: var(--r); color: #6aabff;
  cursor: pointer; transition: all .13s;
}
.lib-btn:hover { background: rgba(68,136,255,.2); border-color: #6aabff; }
.page-dots { display: flex; justify-content: center; gap: 7px; }
.dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: rgba(212,170,96,.25); cursor: pointer; transition: background .15s;
}
.dot.active { background: rgba(212,170,96,.85); }

/* 하단 액션 바 */
.action-bar {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  padding: 1vh 2vw;
  height: 14vh;
  background: rgba(2,5,8,.85);
  border-top: 1px solid rgba(212,170,96,.15);
  gap: 1vh;
  backdrop-filter: blur(8px);
}
.action-row {
  flex: 1;
  display: flex;
  gap: 1.2vw;
}
.action-row > button {
  flex: 1;
  position: relative;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.7vh;
  letter-spacing: 0.15vw;
  padding: 0;
  overflow: hidden;
  background: linear-gradient(165deg, #0d1b2a 0%, #1a082e 60%, #0d1520 100%);
  border: 0.2vh solid rgba(212,170,96,.45);
  border-radius: 1.2vh;
  box-shadow:
    inset 0 0 0 0.4vh #0d1520,
    inset 0 0 0 0.6vh rgba(212,170,96,.12),
    0 0.6vh 2.4vh rgba(0,0,0,.6);
  color: rgba(212,170,96,.7);
  cursor: pointer;
  transition: all .2s;
}
.action-row > button::before {
  content: '';
  position: absolute; inset: 0;
  background-image:
    repeating-linear-gradient( 45deg, transparent, transparent 10px, rgba(212,170,96,.018) 10px, rgba(212,170,96,.018) 11px),
    repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(212,170,96,.018) 10px, rgba(212,170,96,.018) 11px);
  pointer-events: none;
}
.action-row > button > * { position: relative; z-index: 1; }
.action-row > button:hover:not(:disabled) {
  border-color: rgba(212,170,96,.8);
  color: var(--tg);
  transform: translateY(-0.3vh);
  box-shadow:
    inset 0 0 0 0.4vh #0d1520,
    inset 0 0 0 0.6vh rgba(212,170,96,.3),
    0 1.2vh 4vh rgba(212,170,96,.18);
}
.action-row > button:disabled {
  opacity: 0.35;
  cursor: default;
  transform: none;
}
.btn-cancel { flex: 1 !important; }
.btn-gold, .btn-blue, .dim-action { flex: 3 !important; }
.btn-gold {
  border-color: rgba(212,170,96,.85) !important;
  color: var(--tg) !important;
  box-shadow:
    inset 0 0 0 0.4vh #0d1520,
    inset 0 0 0 0.6vh rgba(212,170,96,.25),
    0 0.6vh 2.4vh rgba(212,170,96,.15) !important;
}
.btn-gold:hover:not(:disabled) {
  box-shadow:
    inset 0 0 0 0.4vh #0d1520,
    inset 0 0 0 0.6vh rgba(212,170,96,.45),
    0 1.4vh 4.4vh rgba(212,170,96,.28) !important;
}
.btn-blue {
  border-color: rgba(68,136,255,.6) !important;
  color: #6aabff !important;
}
.dim-action {
  color: var(--t2) !important;
  border-color: rgba(212,170,96,.2) !important;
  font-size: 1.4vh;
}

/* 페이지 전환 */
.fade-enter-active,  .fade-leave-active  { transition: opacity .25s; }
.fade-enter-from,    .fade-leave-to      { opacity: 0; }
.slide-enter-active, .slide-leave-active { transition: all .25s; }
.slide-enter-from  { opacity: 0; transform: translateX(20px); }
.slide-leave-to    { opacity: 0; transform: translateX(-20px); }

/* 모바일 세로 — width 기준 이미지, 수직 스택 레이아웃 */
@media (orientation: portrait) and (max-width: 768px) {
  .page {
    display: flex;
    flex-direction: column;
  }
  .top-nav {
    position: relative;
    top: auto; left: auto; right: auto;
    height: auto;
    min-height: 7vh;
    padding: 0 4vw;
  }
  .hero {
    position: relative;
    inset: auto;
    width: 100%;
    aspect-ratio: 16 / 9;
    flex-shrink: 0;
  }
  .hero-img {
    position: absolute;
    inset: 0;
    width: 100%; height: 100%;
  }
  .body {
    position: relative;
    bottom: auto; left: auto; right: auto;
    flex: 1;
    max-height: none;
    padding: 16px 20px;
    background: #060d16;
    border-top: 1px solid rgba(212,170,96,.15);
  }
  .body-text {
    flex: 1;
  }
  .action-bar {
    position: relative;
    bottom: auto; left: auto; right: auto;
    padding: 0.1vh 4vw;
    gap: 3vw;
  }
}
</style>
