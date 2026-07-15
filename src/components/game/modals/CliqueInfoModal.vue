<template>
  <div class="modal-box ci-modal">

    <div class="ci-header">
      <span class="serif gold ci-title">파벌 정보</span>
      <span class="mono dim ci-faction">{{ factionLabel }}</span>
      <button class="ci-close mono dim" @click="$emit('close')">✕</button>
    </div>

    <div class="ci-scroll">
      <div v-if="myCliques.length" class="ci-list">
        <div v-for="clq in myCliques" :key="clq.id" class="ci-card">

          <div class="ci-card-head">
            <span class="serif ci-name">{{ clq.name }}</span>
            <div class="ci-lv mono">Lv.{{ clq.level }}</div>
          </div>

          <div class="ci-card-body">

            <!-- 리더 / 창설자 -->
            <div class="ci-row">
              <span class="ci-lbl">리더</span>
              <CharChip v-if="leaderChar(clq)" :char-code="clq.leader" />
              <span v-else class="ci-val dim">—</span>
            </div>
            <div class="ci-row">
              <span class="ci-lbl">창설자</span>
              <CharChip v-if="founderChar(clq)" :char-code="clq.founder" />
              <span v-else class="ci-val dim">—</span>
            </div>

            <!-- 성향 -->
            <div class="ci-row">
              <span class="ci-lbl">경제</span>
              <span class="ci-val serif">{{ nearestEcon(clq.tender?.econ) }}</span>
            </div>
            <div class="ci-row">
              <span class="ci-lbl">이념</span>
              <span class="ci-val serif">{{ nearestIdea(clq.tender?.idea) }}</span>
            </div>

            <!-- 경험치 -->
            <div class="ci-row">
              <span class="ci-lbl">경험치</span>
              <span class="ci-val mono">{{ clq.exp ?? 0 }}</span>
            </div>

            <!-- 멤버 -->
            <div class="ci-row ci-row-top">
              <span class="ci-lbl">멤버</span>
              <div class="ci-chips">
                <template v-if="clq.members?.length">
                  <CharChip
                    v-for="code in clq.members"
                    :key="code"
                    :char-code="code"
                  />
                </template>
                <span v-else class="ci-val dim">—</span>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div v-else class="ci-empty">
        <span class="dim mono">소속 파벌이 없습니다.</span>
      </div>
    </div>

    <div class="ci-footer">
      <button class="btn btn-gold" @click="$emit('close')">확인</button>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import CharChip from '@/components/common/CharChip.vue'
import { ECONOMY_DATA } from '@/data/base/regime/economyData'
import { IDEOLOGY_DATA } from '@/data/base/regime/ideologyData'
import { useLang } from '@/composables/useLang'

defineEmits(['close'])
const game = useGameStore()
const { lang } = useLang()

// 플레이어 세력의 파벌만 — 리더의 faction 기준
const myCliques = computed(() =>
  (game.cliques ?? []).filter(clq => {
    const leaderFaction = game.characters[clq.leader]?.faction
      ?? game.characters[clq.founder]?.faction
    return leaderFaction === game.playerFaction
  })
)

const factionLabel = computed(() =>
  game.factions?.[game.playerFaction]?.name?.find(e => e.code === lang.value)?.context ?? game.playerFaction
)

function leaderChar(clq)  { return game.characters[clq.leader]  ?? null }
function founderChar(clq) { return game.characters[clq.founder] ?? null }

function nearest(arr, val) {
  if (val == null) return '—'
  return arr.reduce((a, b) =>
    Math.abs(b.code - val) < Math.abs(a.code - val) ? b : a
  ).name
}
function nearestEcon(val) { return nearest(ECONOMY_DATA,  val) }
function nearestIdea(val) { return nearest(IDEOLOGY_DATA, val) }
</script>

<style scoped>
.ci-modal {
  width: min(80vw, 800px);
  height: 80vh;
  display: flex;
  flex-direction: column;
  gap: 0;
}

/* 헤더 */
.ci-header {
  display: flex; align-items: center; gap: 8px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--bd);
  flex-shrink: 0;
}
.ci-title   { font-size: 15px; letter-spacing: 1px; }
.ci-faction { font-size: 11px; flex: 1; }
.ci-close {
  background: none; border: none; color: var(--td); font-size: 16px;
  cursor: pointer; padding: 2px 6px; border-radius: var(--r);
  transition: color .15s;
}
.ci-close:hover { color: var(--t1); }

/* 스크롤 */
.ci-scroll { flex: 1; overflow-y: auto; min-height: 0; padding: 4px 0; }

/* 카드 목록 */
.ci-list { display: flex; flex-direction: column; gap: 12px; padding: 8px 0; }

.ci-card {
  border: 1px solid var(--bd);
  border-radius: var(--r);
  overflow: hidden;
}

.ci-card-head {
  display: flex; align-items: center; gap: 8px;
  padding: 9px 14px;
  background: rgba(255,255,255,.025);
  border-bottom: 1px solid var(--bd);
}
.ci-name { font-size: 13px; color: var(--t1); letter-spacing: .5px; flex: 1; }
.ci-lv   {
  font-size: 9px; padding: 2px 7px;
  background: rgba(212,170,96,.1); border: 1px solid rgba(212,170,96,.25);
  border-radius: 8px; color: var(--tg);
}

/* 바디 */
.ci-card-body {
  padding: 10px 14px;
  display: flex; flex-direction: column; gap: 5px;
}
.ci-row { display: flex; align-items: baseline; gap: 8px; }
.ci-row-top { align-items: flex-start !important; }
.ci-lbl {
  font-size: 10px; color: var(--td);
  min-width: 44px; text-align: right; flex-shrink: 0; letter-spacing: .3px;
}
.ci-val { font-size: 12px; color: var(--t1); }

/* 멤버 칩 묶음 */
.ci-chips { display: flex; flex-wrap: wrap; gap: 5px; flex: 1; }

/* 빈 상태 */
.ci-empty {
  display: flex; justify-content: center; align-items: center;
  height: 100%; font-size: 12px; letter-spacing: .3px;
}

/* 푸터 */
.ci-footer {
  padding-top: 12px;
  border-top: 1px solid var(--bd);
  display: flex; justify-content: flex-end;
  flex-shrink: 0;
}
</style>
