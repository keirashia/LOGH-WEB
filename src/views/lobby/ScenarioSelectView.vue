<template>
  <div class="sc-wrap">
    <div class="sc-layout">

      <!-- 헤더 -->
      <div class="sc-header">
        <button class="btn" @click="$router.push('/lobby/single')">← 뒤로</button>
        <span class="serif gold" style="font-size:17px;letter-spacing:2px">새 게임 — 시나리오 선택</span>
      </div>

      <!-- 게임 타입 탭 (T/S/F) -->
      <div class="type-tabs">
        <button v-for="t in TYPES" :key="t.code"
                class="type-tab"
                :class="{ active: activeType === t.code }"
                @click="selectType(t.code)">
          <span class="mono" style="font-size:9px;letter-spacing:2px;opacity:.6">{{ t.code }}</span>
          <span class="serif">{{ t.name }}</span>
        </button>
      </div>

      <!-- 바디: 시나리오 목록 + 상세 패널 -->
      <div class="sc-body">

        <!-- 시나리오 목록 -->
        <div class="sc-list">
          <button v-for="sc in filteredScenarios" :key="sc.id"
                  class="sc-item"
                  :class="{ active: selSc?.id === sc.id }"
                  @click="selSc = sc; selFac = sc.recommend; activeTab = 'overview'">
            <div class="mono dim" style="font-size:9px;letter-spacing:2px">
              SCN.{{ String(sc.id).padStart(2,'0') }}
            </div>
            <div class="serif sc-item-name">{{ sc.name }}</div>
            <div class="mono dim" style="font-size:9px">우주력 {{ sc.year }}년</div>
          </button>

          <div v-if="filteredScenarios.length === 0" class="sc-empty-list dim">
            <span>준비 중인 시나리오입니다</span>
          </div>
        </div>

        <!-- 상세 패널 -->
        <div class="sc-detail panel" v-if="selSc">

          <!-- 시나리오 제목 -->
          <div class="detail-title">
            <div class="serif gold" style="font-size:20px;letter-spacing:1px">{{ selSc.name }}</div>
            <div class="mono dim" style="font-size:10px;margin-top:2px">
              우주력 {{ selSc.year }}년 / 제국력 {{ selSc.impYear }}년
            </div>
          </div>

          <!-- 탭 (개요/정보/목표/보상) -->
          <div class="detail-tabs">
            <button v-for="tab in DETAIL_TABS" :key="tab.code"
                    class="detail-tab"
                    :class="{ active: activeTab === tab.code }"
                    @click="activeTab = tab.code">
              {{ tab.name }}
            </button>
          </div>

          <!-- 탭 콘텐츠 -->
          <div class="detail-content">
            <!-- 개요 -->
            <div v-if="activeTab === 'overview'" class="tab-overview">
              <p class="dim" style="font-size:12px;line-height:1.9">{{ selSc.desc }}</p>
            </div>

            <!-- 정보 -->
            <div v-if="activeTab === 'info'" class="tab-info">
              <div class="info-row" v-for="(ids, fid) in selSc.systems" :key="fid">
                <span class="info-faction" :style="{ color: `var(--${fid})` }">
                  {{ FACTIONS[fid]?.name }}
                </span>
                <span class="dim" style="font-size:11px">
                  {{ ids.map(i => STAR_SYSTEMS[i]?.name ?? i).join(' · ') }}
                </span>
              </div>
            </div>

            <!-- 목표 -->
            <div v-if="activeTab === 'mission'" class="tab-mission">
              <ul class="mission-list">
                <li v-for="(m, i) in selSc.mission" :key="i" class="mission-item">
                  <span class="mono dim" style="font-size:10px">0{{ i+1 }}</span>
                  <span style="font-size:12px">{{ m }}</span>
                </li>
              </ul>
            </div>

            <!-- 보상 -->
            <div v-if="activeTab === 'rewards'" class="tab-rewards dim" style="font-size:12px">
              <span>추후 업데이트 예정</span>
            </div>
          </div>

          <!-- 세력 선택 -->
          <div class="faction-section">
            <div class="dim" style="font-size:10px;letter-spacing:1px;margin-bottom:8px">세력 선택</div>
            <div class="faction-grid">
              <button v-for="(f, fid) in FACTIONS" :key="fid"
                      class="faction-btn"
                      :class="{ selected: selFac === fid }"
                      :style="selFac === fid ? { borderColor: `var(--${fid})`, background: `var(--${fid}-g)` } : {}"
                      @click="selFac = fid">
                <span style="font-size:22px">{{ f.flag }}</span>
                <span class="serif" style="font-size:11px">{{ f.name }}</span>
                <span class="dim mono" style="font-size:9px">{{ f.ideology }}</span>
              </button>
            </div>
          </div>

          <!-- 선택 세력 리더 -->
          <div class="leader-row" v-if="leader">
            <div class="leader-avatar serif">{{ leader.name[0] }}</div>
            <div>
              <div class="serif" style="font-size:13px">{{ leader.name }}</div>
              <div class="dim" style="font-size:10px">{{ leader.rank }}</div>
              <div class="dim mono" style="font-size:10px;font-style:italic;margin-top:2px">"{{ leader.quote }}"</div>
            </div>
          </div>

          <!-- 게임 시작 -->
          <button class="btn btn-gold start-btn serif"
                  :disabled="!selFac"
                  @click="startGame">
            ⚔️ 게임 시작
          </button>
        </div>

        <!-- 미선택 안내 -->
        <div class="sc-empty panel" v-else>
          <span class="dim serif" style="font-size:15px">← 시나리오를 선택하세요</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/gameStore'
import { SCENARIOS, FACTIONS, CHARACTERS, STAR_SYSTEMS as STAR_SYSTEMS_ARR } from '@/data/masterData'

const STAR_SYSTEMS = Object.fromEntries(STAR_SYSTEMS_ARR.map(s => [s.id, s]))

const router = useRouter()
const game   = useGameStore()

const TYPES = [
  { code: 'T', name: '튜토리얼' },
  { code: 'S', name: '스탠다드' },
  { code: 'F', name: '가상역사' },
]
const DETAIL_TABS = [
  { code: 'overview', name: '개요' },
  { code: 'info',     name: '정보' },
  { code: 'mission',  name: '목표' },
  { code: 'rewards',  name: '보상' },
]

const activeType = ref('S')
const activeTab  = ref('overview')
const selSc      = ref(null)
const selFac     = ref(null)

const filteredScenarios = computed(() =>
  SCENARIOS.filter(sc => sc.flag === activeType.value)
)

const leader = computed(() => {
  if (!selFac.value) return null
  const fac = FACTIONS[selFac.value]
  return fac?.leader ? CHARACTERS[fac.leader] : null
})

function selectType(code) {
  activeType.value = code
  selSc.value = null
  selFac.value = null
}

function startGame() {
  if (!selSc.value || !selFac.value) return
  game.startGame(selSc.value.id, selFac.value)
  router.push('/game')
}
</script>

<style scoped>
.sc-wrap {
  width: 100%; height: 100%; overflow: hidden;
  background: var(--bg);
  display: flex; align-items: stretch;
}
.sc-layout {
  flex: 1; display: flex; flex-direction: column;
  padding: 16px 20px; gap: 12px; overflow: hidden;
}

/* 헤더 */
.sc-header { display: flex; align-items: center; gap: 14px; flex-shrink: 0; }

/* 타입 탭 */
.type-tabs { display: flex; gap: 6px; flex-shrink: 0; }
.type-tab {
  display: flex; flex-direction: column; align-items: center; gap: 2px;
  padding: 7px 20px; background: var(--bg3); border: 1px solid var(--bd);
  border-radius: var(--r); cursor: pointer; transition: all .15s; min-width: 90px;
}
.type-tab:hover  { background: var(--bgh); }
.type-tab.active { border-color: var(--tg); background: rgba(212,170,96,.1); color: var(--tg); }
.type-tab .serif { font-size: 13px; letter-spacing: 1px; }

/* 바디 */
.sc-body { display: flex; gap: 14px; flex: 1; overflow: hidden; }

/* 목록 */
.sc-list {
  width: 190px; flex-shrink: 0;
  display: flex; flex-direction: column; gap: 6px;
  overflow-y: auto;
}
.sc-item {
  text-align: left; padding: 10px 12px;
  background: var(--bg3); border: 1px solid var(--bd); border-radius: var(--r);
  cursor: pointer; transition: all .15s; display: flex; flex-direction: column; gap: 3px;
}
.sc-item:hover   { background: var(--bgh); }
.sc-item.active  { border-color: var(--tg); background: rgba(212,170,96,.08); }
.sc-item-name    { font-size: 13px; color: var(--t1); }
.sc-empty-list   { padding: 20px; text-align: center; font-size: 12px; }

/* 상세 패널 */
.sc-detail {
  flex: 1; overflow-y: auto;
  display: flex; flex-direction: column; gap: 14px;
  padding: 18px;
}
.sc-empty {
  flex: 1; display: flex; align-items: center; justify-content: center;
  padding: 18px;
}

/* 상세 내부 */
.detail-title  { flex-shrink: 0; }
.detail-tabs   { display: flex; gap: 4px; flex-shrink: 0; }
.detail-tab {
  padding: 5px 14px; font-size: 12px; letter-spacing: 1px;
  background: var(--bg4); border: 1px solid var(--bd); border-radius: var(--r);
  cursor: pointer; transition: all .13s; color: var(--t2);
}
.detail-tab:hover  { background: var(--bgh); color: var(--t1); }
.detail-tab.active { border-color: var(--tg); color: var(--tg); background: rgba(212,170,96,.08); }

.detail-content { flex-shrink: 0; min-height: 80px; }

/* 정보 탭 */
.info-row { display: flex; align-items: baseline; gap: 10px; padding: 5px 0; border-bottom: 1px solid var(--bd); }
.info-faction { font-size: 12px; font-weight: bold; min-width: 70px; flex-shrink: 0; }

/* 목표 탭 */
.mission-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; }
.mission-item { display: flex; align-items: center; gap: 10px; padding: 8px 10px; background: var(--bg4); border-radius: var(--r); }

/* 세력 선택 */
.faction-section { flex-shrink: 0; }
.faction-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 7px;
}
.faction-btn {
  display: flex; flex-direction: column; align-items: center; gap: 3px;
  padding: 9px 4px; border: 1px solid var(--bd); border-radius: var(--r);
  background: var(--bg4); cursor: pointer; transition: all .15s;
}
.faction-btn:hover    { background: var(--bgh); }
.faction-btn.selected { border-color: var(--tg); }

/* 리더 */
.leader-row {
  display: flex; align-items: center; gap: 12px;
  padding: 10px 14px; background: var(--bg4); border-radius: var(--r); flex-shrink: 0;
}
.leader-avatar {
  width: 38px; height: 38px; border-radius: 50%;
  background: var(--bg3); border: 1px solid var(--bdg);
  display: flex; align-items: center; justify-content: center;
  font-size: 16px; color: var(--tg); flex-shrink: 0;
}

/* 시작 버튼 */
.start-btn {
  width: 100%; justify-content: center;
  padding: 13px; font-size: 15px; letter-spacing: 2px;
  margin-top: auto; flex-shrink: 0;
}
</style>
