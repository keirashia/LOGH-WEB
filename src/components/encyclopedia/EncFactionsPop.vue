<template>
  <div class="lib-overlay" @click.self="enc.close()">
    <div class="lib-panel">

      <!-- 헤더 -->
      <div class="lib-header">
        <button v-if="selected" class="lib-back mono" @click="selected = null">❮</button>
        <span class="serif lib-title">{{ selected ? getName(selected.id) : '🏛️ 세력 사전' }}</span>
        <button class="lib-close mono" @click="enc.close()">✕</button>
      </div>

      <!-- 목록 뷰 -->
      <template v-if="!selected">
        <div class="fac-grid">
          <button
            v-for="(f, i) in FACTIONS_LIST"
            :key="i"
            class="fac-card"
            @click="selected = f"
          >
            <span class="fac-card-color" :style="{ background: f.color || 'rgba(212,170,96,.35)' }" />
            <span class="fac-flag">{{ f.flag || '🏳️' }}</span>
            <span class="serif fac-name">{{ getName(f.id) }}</span>
            <span class="mono dim fac-en">{{ getName(f.id, 'En') }}</span>
          </button>
        </div>
        <div class="lib-footer dim mono">{{ FACTIONS_LIST.length }}개 세력</div>
      </template>

      <!-- 상세 뷰 -->
      <template v-else>
        <div class="fac-detail">
          <!-- 배너 -->
          <div class="fac-banner" :style="bannerStyle">
            <span class="fac-big-flag">{{ selected.flag || '🏳️' }}</span>
            <div class="fac-names">
              <div class="serif fac-detail-kr">{{ getName(selected.id) }}</div>
              <div class="mono dim fac-detail-sub">{{ getName(selected.id, 'Jp') }}</div>
              <div class="mono dim fac-detail-sub">{{ getName(selected.id, 'En') }}</div>
            </div>
          </div>

          <!-- 메타 -->
          <div class="fac-meta">
            <div v-if="periodText" class="meta-row">
              <span class="meta-label dim mono">존속 기간</span>
              <span class="meta-value mono">{{ periodText }}</span>
            </div>
            <div v-if="selected.currency" class="meta-row">
              <span class="meta-label dim mono">화폐</span>
              <span class="meta-value mono">{{ selected.currency }}</span>
            </div>
            <div v-if="ideologyName" class="meta-row">
              <span class="meta-label dim mono">정치 체제</span>
              <span class="meta-value mono">{{ ideologyName }}</span>
            </div>
          </div>

          <!-- 설명 -->
          <div class="fac-desc-wrap">
            <p v-if="selected.desc" class="serif fac-desc">{{ selected.desc }}</p>
            <p v-else class="dim mono fac-desc-empty">(준비 중)</p>
          </div>
        </div>
      </template>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useEncyclopediaStore } from '@/stores/encyclopediaStore'
import FACTIONS_ALL from '@/data/base/factions/factionsData.js'
import { FACTION_NAMES } from '@/data/base/factions/factionName.js'

const enc = useEncyclopediaStore()

// id가 있는 세력만 목록에 표시
const FACTIONS_LIST = FACTIONS_ALL.filter(f => f.id)

// 이름 조회 맵: { factionId → { Kr, En, Jp } }
const NAMES_MAP = {}
FACTION_NAMES.forEach(n => {
  if (!NAMES_MAP[n.factionId]) NAMES_MAP[n.factionId] = {}
  NAMES_MAP[n.factionId][n.lang] = { name: n.name, shortName: n.shortName }
})

function getName(id, lang = 'Kr') {
  return NAMES_MAP[id]?.[lang]?.name ?? id
}

const selected = ref(null)

const bannerStyle = computed(() => {
  const c = selected.value?.color
  return c
    ? { background: `${c}22`, borderColor: `${c}55` }
    : { background: 'rgba(212,170,96,.05)', borderColor: 'rgba(212,170,96,.25)' }
})

const periodText = computed(() => {
  const f = selected.value
  if (!f?.period?.some(p => p)) return ''
  const [s, e] = f.period
  const era = f.periodType ? `${f.periodType} ` : ''
  if (!s && e) return `~ ${era}${e}`
  if (s && !e) return `${era}${s} ~`
  return `${era}${s} ~ ${era}${e}`
})

const ideologyName = computed(() => {
  const ideo = selected.value?.ideology
  if (!ideo) return ''
  return typeof ideo === 'string' ? ideo : (ideo.name ?? '')
})
</script>

<style scoped>
/* ── 오버레이 / 패널 ────────────────────────────────────── */
.lib-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,.75);
  display: flex; align-items: center; justify-content: center;
  z-index: 200; backdrop-filter: blur(6px);
}
.lib-panel {
  position: relative;
  width: min(95vw, 860px); height: 80vh;
  background: linear-gradient(165deg, #0d1b2a 0%, #1a082e 60%, #0d1520 100%);
  border: 2px solid rgba(212,170,96,.8); border-radius: 14px;
  box-shadow: inset 0 0 0 5px #0d1520, inset 0 0 0 7px rgba(212,170,96,.22), 0 16px 64px rgba(0,0,0,.9);
  display: flex; flex-direction: column; overflow: hidden; color: var(--t1);
}
.lib-panel::before {
  content: ''; position: absolute; inset: 0;
  background-image:
    repeating-linear-gradient( 45deg, transparent, transparent 10px, rgba(212,170,96,.018) 10px, rgba(212,170,96,.018) 11px),
    repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(212,170,96,.018) 10px, rgba(212,170,96,.018) 11px);
  pointer-events: none; z-index: 0;
}

/* ── 헤더 ────────────────────────────────────────────────── */
.lib-header {
  position: relative; z-index: 1;
  display: flex; align-items: center; gap: 1vw;
  padding: 1.8vh 2vw;
  border-bottom: 1px solid rgba(212,170,96,.25); flex-shrink: 0;
}
.lib-header span { flex: 1; text-align: center; }
.lib-title { font-size: 2.2vh; letter-spacing: 0.3vw; color: var(--tg); text-shadow: 0 0 16px rgba(212,170,96,.4); }
.lib-back, .lib-close {
  font-size: 1.8vh; padding: 0.6vh 1.2vw;
  background: rgba(255,255,255,.04); border: 1px solid rgba(212,170,96,.3);
  border-radius: var(--r); color: rgba(212,170,96,.7);
  cursor: pointer; transition: all .15s; flex-shrink: 0;
}
.lib-back:hover, .lib-close:hover { color: var(--tg); border-color: rgba(212,170,96,.8); background: rgba(212,170,96,.08); }
.lib-close { width: 3.5vh; height: 3.5vh; padding: 0; display: flex; align-items: center; justify-content: center; }

/* ── 세력 그리드 ─────────────────────────────────────────── */
.fac-grid {
  position: relative; z-index: 1;
  flex: 1; min-height: 0; overflow-y: auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 14px; padding: 2vh 2vw;
  align-content: start;
}
.fac-grid::-webkit-scrollbar { width: 4px; }
.fac-grid::-webkit-scrollbar-track { background: transparent; }
.fac-grid::-webkit-scrollbar-thumb { background: rgba(212,170,96,.3); border-radius: 2px; }

.fac-card {
  position: relative; overflow: hidden;
  display: flex; flex-direction: column; align-items: center; gap: 1vh;
  padding: 2.4vh 1vw 1.8vh;
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(212,170,96,.25); border-radius: 10px;
  cursor: pointer; transition: all .15s; color: var(--t1); text-align: center;
}
.fac-card:hover { background: rgba(212,170,96,.08); border-color: rgba(212,170,96,.6); transform: translateY(-3px); }
.fac-card-color {
  position: absolute; top: 0; left: 0; right: 0;
  height: 3px; border-radius: 10px 10px 0 0;
}
.fac-flag { font-size: 3.5vh; }
.fac-name { font-size: 1.6vh; color: var(--tg); letter-spacing: 0.05em; }
.fac-en   { font-size: 1.2vh; color: rgba(212,170,96,.4); }

/* ── 세력 상세 ───────────────────────────────────────────── */
.fac-detail {
  position: relative; z-index: 1;
  flex: 1; min-height: 0; overflow-y: auto;
  display: flex; flex-direction: column;
}
.fac-detail::-webkit-scrollbar { width: 4px; }
.fac-detail::-webkit-scrollbar-track { background: transparent; }
.fac-detail::-webkit-scrollbar-thumb { background: rgba(212,170,96,.3); border-radius: 2px; }

.fac-banner {
  display: flex; align-items: center; gap: 2.5vw;
  padding: 2.5vh 2.5vw;
  border-bottom: 1px solid; flex-shrink: 0;
}
.fac-big-flag    { font-size: 7vh; flex-shrink: 0; }
.fac-names       { display: flex; flex-direction: column; gap: 0.6vh; }
.fac-detail-kr   { font-size: 2.6vh; color: var(--tg); letter-spacing: 0.05em; }
.fac-detail-sub  { font-size: 1.3vh; color: rgba(212,170,96,.45); }

.fac-meta { display: flex; flex-direction: column; border-bottom: 1px solid rgba(212,170,96,.15); flex-shrink: 0; }
.meta-row {
  display: flex; align-items: center; gap: 1.5vw;
  padding: 1.2vh 2.5vw;
  border-bottom: 1px solid rgba(212,170,96,.08);
}
.meta-row:last-child { border-bottom: none; }
.meta-label { font-size: 1.4vh; letter-spacing: 0.05em; width: 8vw; min-width: 80px; flex-shrink: 0; }
.meta-value { font-size: 1.5vh; color: var(--t1); }

.fac-desc-wrap { flex: 1; padding: 2vh 2.5vw; }
.fac-desc      { font-size: 1.6vh; line-height: 2; color: var(--t1); white-space: pre-line; margin: 0; }
.fac-desc-empty { font-size: 1.5vh; text-align: center; padding: 4vh 0; margin: 0; font-style: italic; }

/* ── 풋터 ────────────────────────────────────────────────── */
.lib-footer {
  position: relative; z-index: 1;
  padding: 1vh 2vw; font-size: 1.3vh;
  border-top: 1px solid rgba(212,170,96,.2);
  flex-shrink: 0; text-align: right; color: rgba(212,170,96,.4);
}
</style>
