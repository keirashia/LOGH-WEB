<template>
  <div class="lib-overlay" @click.self="enc.close()">
    <div class="lib-panel">

      <!-- 헤더 -->
      <div class="lib-header">
        <span class="serif lib-title">🚀 함선 사전</span>
        <button class="lib-close mono" @click="enc.close()">✕</button>
      </div>

      <!-- 본문 (좌: 범주 / 우: 내용) -->
      <div class="lib-body">

        <!-- 좌: 대범주 목록 -->
        <div class="lib-nav">
          <template v-for="cat in CATEGORIES" :key="cat.key">
            <!-- 대범주 버튼 -->
            <button
              class="nav-btn serif"
              :class="{ active: activeCat === cat.key }"
              @click="clickCat(cat)"
            >
              {{ cat.labelKr }}
            </button>

            <!-- 중범주 (ㄴ 형태, 대범주 선택 시 노출) -->
            <template v-if="activeCat === cat.key && cat.sub?.length">
              <button
                v-for="sub in cat.sub"
                :key="sub.key"
                class="sub-btn serif"
                :class="{ active: activeSub === sub.key }"
                @click="activeSub = sub.key"
              >
                <span class="sub-indent">•</span>{{ sub.labelKr }}
              </button>
            </template>
          </template>
        </div>

        <!-- 우: 내용 -->
        <div class="lib-content">
          <div class="content-placeholder">
            <div class="ph-title serif dim">준비 중</div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useEncyclopediaStore } from '@/stores/encyclopediaStore'

const enc = useEncyclopediaStore()

const CATEGORIES = [
  {
    key: 'battleship',
    labelKr: '전함',
    sub: [],
  },
  {
    key: 'fast_battleship',
    labelKr: '고속전함',
    sub: [],
  },
  {
    key: 'cruiser',
    labelKr: '순양함',
    sub: [],
  },
  {
    key: 'destroyer',
    labelKr: '구축함',
    sub: [],
  },
  {
    key: 'carrier',
    labelKr: '항공모함',
    sub: [],
  },
  {
    key: 'transport',
    labelKr: '수송함',
    sub: [],
  },
  {
    key: 'flagship',
    labelKr: '기함',
    sub: [],
  },
  {
    key: 'fortress',
    labelKr: '요새',
    sub: [],
  },
  {
    key: 'weapon',
    labelKr: '무기',
    sub: [
      { key: 'cannon',  labelKr: '주포' },
      { key: 'missile', labelKr: '미사일' },
      { key: 'railgun', labelKr: '레일건' },
    ],
  },
]

const activeCat = ref(null)
const activeSub = ref(null)

function clickCat(cat) {
  if (activeCat.value === cat.key) {
    activeCat.value = null
    activeSub.value = null
  } else {
    activeCat.value = cat.key
    activeSub.value = cat.sub?.[0]?.key ?? null
  }
}
</script>

<style scoped>
/* ── 오버레이 ────────────────────────────────────────────── */
.lib-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, .75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  backdrop-filter: blur(6px);
}

/* ── 패널 ──────────────────────────────────────────────── */
.lib-panel {
  position: relative;
  width: min(95vw, 1000px);
  height: 80vh;
  background: linear-gradient(165deg, #0d1b2a 0%, #1a082e 60%, #0d1520 100%);
  border: 2px solid rgba(212,170,96,.8);
  border-radius: 14px;
  box-shadow:
    inset 0 0 0 5px #0d1520,
    inset 0 0 0 7px rgba(212,170,96,.22),
    0 16px 64px rgba(0,0,0,.9);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  color: var(--t1);
}
.lib-panel::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    repeating-linear-gradient( 45deg, transparent, transparent 10px, rgba(212,170,96,.018) 10px, rgba(212,170,96,.018) 11px),
    repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(212,170,96,.018) 10px, rgba(212,170,96,.018) 11px);
  pointer-events: none;
  z-index: 0;
}

/* ── 헤더 ────────────────────────────────────────────────── */
.lib-header {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  padding: 1.8vh 2vw;
  border-bottom: 1px solid rgba(212,170,96,.25);
  flex-shrink: 0;
}
.lib-header .lib-title { flex: 1; text-align: center; }
.lib-title { font-size: 2.2vh; letter-spacing: 0.3vw; color: var(--tg); text-shadow: 0 0 16px rgba(212,170,96,.4); }
.lib-close {
  font-size: 1.8vh;
  width: 3.5vh; height: 3.5vh;
  padding: 0;
  display: flex; align-items: center; justify-content: center;
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(212,170,96,.3);
  border-radius: var(--r);
  color: rgba(212,170,96,.7);
  cursor: pointer;
  transition: all .15s;
  flex-shrink: 0;
}
.lib-close:hover { color: var(--tg); border-color: rgba(212,170,96,.8); background: rgba(212,170,96,.08); }

/* ── 본문 레이아웃 ─────────────────────────────────────── */
.lib-body {
  position: relative;
  z-index: 1;
  flex: 1;
  min-height: 0;
  display: flex;
}

/* ── 좌: 범주 네비 ─────────────────────────────────────── */
.lib-nav {
  width: 18vw;
  min-width: 140px;
  max-width: 200px;
  flex-shrink: 0;
  border-right: 1px solid rgba(212,170,96,.2);
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 1.6vh 0;
  overflow-y: auto;
}
.lib-nav::-webkit-scrollbar { width: 3px; }
.lib-nav::-webkit-scrollbar-thumb { background: rgba(212,170,96,.2); }

.nav-btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1vw;
  padding: 1.4vh 1.4vw;
  background: none;
  border: none;
  border-left: 3px solid transparent;
  color: rgba(212,170,96,.5);
  font-size: 3.0vh;
  cursor: pointer;
  text-align: left;
  transition: all .15s;
}
.nav-btn:hover {
  background: rgba(212,170,96,.05);
  color: var(--tg);
}
.nav-btn.active {
  background: rgba(212,170,96,.08);
  border-left-color: var(--tg);
  color: var(--tg);
}

.sub-btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.6vw;
  padding: 1.0vh 1.4vw 1.0vh 2.0vw;
  background: none;
  border: none;
  border-left: 3px solid transparent;
  color: rgba(212,170,96,.4);
  font-size: 2.5vh;
  cursor: pointer;
  text-align: left;
  transition: all .15s;
}
.sub-btn:hover { background: rgba(212,170,96,.04); color: rgba(212,170,96,.8); }
.sub-btn.active { border-left-color: var(--tg); color: var(--tg); background: rgba(212,170,96,.07); }
.sub-indent { color: rgba(212,170,96,.3); margin-right: 0.3vw; font-size: 2.0vh; }

/* ── 우: 내용 영역 ─────────────────────────────────────── */
.lib-content {
  flex: 1;
  min-width: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}
.lib-content::-webkit-scrollbar { width: 4px; }
.lib-content::-webkit-scrollbar-thumb { background: rgba(212,170,96,.3); border-radius: 2px; }

/* ── 준비 중 플레이스홀더 ─────────────────────────────── */
.content-placeholder {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.6vh;
  color: rgba(212,170,96,.3);
}
.ph-icon  { font-size: 6vh; }
.ph-title { font-size: 2.2vh; color: rgba(212,170,96,.5); letter-spacing: 0.2vw; }
.ph-desc  { font-size: 1.5vh; }
</style>
