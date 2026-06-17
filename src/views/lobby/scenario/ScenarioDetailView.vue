<template>
  <div class="page">

    <!-- 상단 네비 -->
    <div class="top-nav">
      <div class="nav-title">
        <span class="serif">{{ cur.nameKr }}</span>
        <span class="mono dim nav-year">
          {{ cur.yearType }} {{ cur.year }}
          <template v-if="cur.yearType === 'SE'"> / 제국력 {{ cur.year - 309 }}년</template>
        </span>
      </div>
      <button class="close-btn mono" @click="router.back()">✕</button>
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
      <button class="btn" :disabled="pageIdx === 0" @click="pageIdx--">← 이전</button>

      <button v-if="!cur.useYn"                              class="btn dim-action" disabled>진행 불가</button>
      <button v-else-if="lobby.selectedFaction && cur.openPt === 0" class="btn btn-gold" @click="onStart">⚔ 게임 시작</button>
      <button v-else-if="cur.openPt === 0"                    class="btn btn-gold" @click="onStart">▶ 시작</button>
      <button v-else                                          class="btn btn-blue">🔒 {{ cur.openPt }}P로 구매</button>

      <button class="btn" :disabled="pageIdx >= totalPages - 1" @click="pageIdx++">다음 →</button>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
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

function libLabel(lib) { return lib.slice(lib.indexOf(':') + 1) }
function openLib(lib) {
  const prefix = lib.slice(0, 3)
  const label  = lib.slice(lib.indexOf(':') + 1)
  if (prefix === 'ST_')      { enc.open('systems');    enc.searchQuery = label }
  else if (prefix === 'CH_') { enc.open('characters'); enc.searchQuery = label }
}

function onStart() {
  if (lobby.selectedFaction) {
    game.startGame(cur.value.id, lobby.selectedFaction, lobby.selectedCharCode)
    lobby.selectedFaction  = null
    lobby.selectedCharCode = null
    router.push('/game')
  } else {
    router.push({ name: 'scenario-options', params: { scId: cur.value.id } })
  }
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
.nav-year { font-size: 1.8vh; }
.close-btn {
  flex-shrink: 0;
  width: 3.5vh;
  height: 3.5vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6vh;
  background: rgba(255,255,255,.05);
  border: 1px solid rgba(255,255,255,.1);
  border-radius: 50%;
  color: var(--t2);
  cursor: pointer;
  transition: all .13s;
}
.close-btn:hover { color: var(--t1); border-color: rgba(255,255,255,.3); }

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
  bottom: 7vh; left: 0; right: 0;
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
  align-items: stretch;
  padding: 0.1vh 2vw;
  height: 7vh;
  background: rgba(2,5,8,.85);
  border-top: 1px solid rgba(212,170,96,.15);
  gap: 1.5vw;
  backdrop-filter: blur(8px);
}
.action-bar > button {
  flex: 1;
  font-size: 1.8vh;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.action-bar > button:nth-child(2) {
  flex: 3;
}
.dim-action {
  color: var(--t2);
  border-color: rgba(212,170,96,.2);
  background: rgba(212,170,96,.05);
  font-size: 12px;
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
