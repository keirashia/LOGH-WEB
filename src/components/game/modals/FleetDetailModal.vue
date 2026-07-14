<template>
  <div class="modal-box fd-modal">

    <!-- 헤더 -->
    <div class="fd-header">
      <button class="fd-back" @click="game.openModal('fleetInfo')" title="목록으로">◀</button>
      <span class="serif gold fd-title">{{ fleet?.name ?? '함대 상세' }}</span>
      <button class="fd-close" @click="$emit('close')">✕</button>
    </div>

    <div v-if="!fleet" class="fd-empty dim serif">함대 정보를 찾을 수 없습니다.</div>

    <template v-else>
      <div class="fd-body">

        <!-- ── 상단: 초상화 + 기본정보 + 참모 ───────────── -->
        <div class="fd-top">

          <!-- 초상화 + 기본 -->
          <div class="fd-info-col">
            <div class="fd-portrait-wrap">
              <img v-if="commander"
                   :key="commander.code"
                   :src="charImgSrc(commander.code)"
                   class="fd-portrait-img" alt=""
                   @error="handleCharImgError($event, commander.code)" />
              <span v-else class="fd-portrait">👤</span>
            </div>
            <div class="fd-basic">
              <div class="fd-basic-row">
                <span class="fd-lbl">함대명</span>
                <span class="serif fd-val gold">{{ fleet.name }}</span>
              </div>
              <div class="fd-basic-row">
                <span class="fd-lbl">사령관</span>
                <CharChip v-if="commander" :char-code="fleet.commander" />
                <span v-else class="serif fd-val dim">미임명</span>
              </div>
              <div class="fd-basic-row">
                <span class="fd-lbl">위치</span>
                <span class="mono fd-val">{{ locationName }}</span>
              </div>
              <div class="fd-basic-row">
                <span class="fd-lbl">상태</span>
                <span class="fd-badge" :class="statusClass(fleet.status)">{{ statusLabel(fleet.status) }}</span>
              </div>
              <div class="fd-basic-row">
                <span class="fd-lbl">진형</span>
                <span class="serif fd-val">{{ formationName }}</span>
              </div>
            </div>
          </div>

          <!-- 함대참모 -->
          <div class="fd-staff-col">
            <div class="fd-section-label">함대 참모</div>
            <div v-if="officerList.length" class="fd-staff-list">
              <div v-for="o in officerList" :key="o.code" class="fd-staff-row">
                <CharChip :char-code="o.code" />
              </div>
            </div>
            <div v-else class="dim" style="font-size:11px">(편성된 참모 없음)</div>
          </div>

        </div>

        <div class="fd-divider" />

        <!-- ── 하단: 능력치 + 함대현황 ────────────────── -->
        <div class="fd-bottom">

          <!-- 전투 능력치 -->
          <div class="fd-stats-col">
            <div class="fd-section-label">전투 능력치</div>
            <div class="fd-stats-grid">
              <div v-for="[lbl, key, clr] in statDefs" :key="key" class="fd-stat-row">
                <span class="fd-stat-lbl">{{ lbl }}</span>
                <div class="fd-sbar">
                  <div class="fd-sbar-fill"
                    :style="{ width: pct(fleetStats?.[key]) + '%', background: clr }" />
                </div>
                <span class="fd-stat-val mono">{{ fleetStats?.[key] ?? '—' }}</span>
              </div>
            </div>
          </div>

          <!-- 함대 현황 -->
          <div class="fd-status-col">
            <div class="fd-section-label">함대 현황</div>
            <div class="fd-status-rows">
              <div class="fd-status-row">
                <span class="fd-lbl">총 함선</span>
                <span class="mono fd-val gold">{{ fleet.ships.toLocaleString() }}척</span>
              </div>
              <div class="fd-status-row">
                <span class="fd-lbl">사기</span>
                <span class="mono fd-val" :style="{ color: moraleColor(fleet.moral ?? 100) }">
                  {{ fleet.moral ?? 100 }}
                </span>
              </div>
              <div class="fd-status-row">
                <span class="fd-lbl">최대사기</span>
                <span class="mono fd-val">{{ fleetStats?.statCsm ?? 100 }}</span>
              </div>
              <div class="fd-divider-sm" />
              <div class="fd-status-row">
                <span class="fd-lbl">유지비</span>
                <span class="mono fd-val">{{ fleet.upkeep ?? 0 }}</span>
              </div>
              <div class="fd-status-row">
                <span class="fd-lbl">보급</span>
                <span class="mono fd-val">{{ fleet.supply ?? 100 }}%</span>
              </div>
            </div>
          </div>

        </div>

        <div class="fd-divider" />

        <!-- ── 하단: 진형 도식 + 부대 편성 ──────────────── -->
        <div class="fd-bottom">

          <!-- 진형 도식 -->
          <div class="fd-formation-col">
            <div class="fd-section-label">진형 도식</div>
            <div class="fd-formation-box">
              <!-- TODO: 진형 캔버스 렌더링 -->
            </div>
          </div>

          <!-- 부대 편성 -->
          <div class="fd-units-col">
            <div class="fd-section-label">부대 편성</div>
            <div class="fd-units-list">
              <!-- TODO: 부대별 함선 목록 렌더링 -->
            </div>
          </div>

        </div>

      </div>

      <div class="fd-footer">
        <button class="btn" @click="game.openModal('fleetInfo')">목록으로</button>
        <button class="btn" @click="$emit('close')">닫기</button>
      </div>
    </template>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import { FORMATIONS } from '@/data/base/tactical/tacticalData'
import { charImgSrc, handleCharImgError } from '@/utils/charImg'
import CharChip from '@/components/common/CharChip.vue'

const props = defineProps({ payload: Object })
defineEmits(['close'])
const game = useGameStore()

// ── 함대 ─────────────────────────────────────────────
const fleet = computed(() => {
  const id = props.payload?.fleetId
  return id ? (game.pFleets ?? []).find(f => f.id === id) ?? null : null
})

// ── 사령관 ───────────────────────────────────────────
const commander = computed(() =>
  fleet.value?.commander ? (game.characters[fleet.value.commander] ?? null) : null
)

// ── 참모 목록 ─────────────────────────────────────────
const officerList = computed(() =>
  (fleet.value?.officers ?? []).map(code => ({ code }))
)

// ── 능력치 계산 (computeFleetStats 인라인) ────────────
// 규칙: statCmd/statCsm = 사령관 단독
//       나머지 = 전원(사령관+부관) max, statCsm 상한
const STAT_KEYS = ['statAtt','statDef','statFst','statMng','statInf','statGfg','statAfg']

const fleetStats = computed(() => {
  if (!fleet.value) return null
  const allCodes = [fleet.value.commander, ...(fleet.value.officers ?? [])].filter(Boolean)
  if (!allCodes.length) return null

  const chars = allCodes.map(c => game.characters[c]).filter(Boolean)
  if (!chars.length) return null

  const cmd    = commander.value
  const statCmd = cmd?.statCmd ?? 0
  const statCsm = cmd?.statCsm ?? 100

  const result = { statCmd, statCsm }
  for (const key of STAT_KEYS) {
    const maxVal = Math.max(0, ...chars.map(c => c[key] ?? 0))
    result[key] = Math.min(maxVal, statCsm)
  }
  return result
})

// ── 스탯 정의 ─────────────────────────────────────────
const statDefs = [
  ['통솔', 'statCmd', 'var(--tg)'],
  ['문영', 'statMng', '#9b59b6'],
  ['정보', 'statInf', '#1abc9c'],
  ['기동', 'statFst', '#2ecc71'],
  ['공격', 'statAtt', '#e74c3c'],
  ['방어', 'statDef', '#3498db'],
  ['육전', 'statGfg', '#e67e22'],
  ['공전', 'statAfg', '#f39c12'],
]

// ── 표시 헬퍼 ─────────────────────────────────────────
const locationName = computed(() =>
  fleet.value?.location ? (game.systems[fleet.value.location]?.name ?? fleet.value.location) : '—'
)

const formationName = computed(() =>
  fleet.value?.formation ? (FORMATIONS[fleet.value.formation]?.name ?? '—') : '—'
)

function pct(val) { return Math.min(100, Math.max(0, val ?? 0)) }

function moraleColor(m) {
  return m > 60 ? '#2ecc71' : m > 30 ? '#e67e22' : '#e74c3c'
}

function statusLabel(s) {
  return { standby:'대기', moving:'이동 중', battle:'교전 중', retreat:'후퇴' }[s] ?? s
}

function statusClass(s) {
  return { battle:'st-battle', moving:'st-moving', retreat:'st-retreat' }[s] ?? 'st-standby'
}
</script>

<style scoped>
.fd-modal {
  width: min(90vw, 560px);
  display: flex; flex-direction: column;
  padding: 0; overflow: hidden;
}

/* ── 헤더 ─────────────────────────────────────── */
.fd-header {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 14px; border-bottom: 1px solid var(--bd);
  background: rgba(255,255,255,.02); flex-shrink: 0;
}
.fd-back {
  background: none; border: 1px solid var(--bd); border-radius: 4px;
  color: var(--t2); font-size: 11px; padding: 3px 8px; cursor: pointer;
  transition: all .15s; line-height: 1; flex-shrink: 0;
}
.fd-back:hover { border-color: var(--tg); color: var(--tg); }
.fd-title { flex: 1; text-align: center; font-size: 14px; letter-spacing: 1px; }
.fd-close {
  background: none; border: none; color: var(--td);
  font-size: 14px; cursor: pointer; padding: 4px 6px; line-height: 1;
  transition: color .15s; flex-shrink: 0;
}
.fd-close:hover { color: var(--t1); }

.fd-empty { padding: 40px 16px; text-align: center; font-size: 13px; }

/* ── 바디 ─────────────────────────────────────── */
.fd-body {
  flex: 1; overflow-y: auto;
  padding: 14px 16px; display: flex; flex-direction: column; gap: 14px;
}

/* ── 상단 ─────────────────────────────────────── */
.fd-top {
  display: flex; gap: 16px; align-items: flex-start;
}

/* 초상화 + 기본 정보 */
.fd-info-col {
  display: flex; gap: 12px; flex: 1; min-width: 0;
}
.fd-portrait-wrap {
  width: 60px; height: 70px; flex-shrink: 0;
  background: var(--bg4); border: 1px solid var(--bd); border-radius: var(--r);
  display: flex; align-items: center; justify-content: center;
  overflow: hidden;
}
.fd-portrait { font-size: 38px; line-height: 1; }
.fd-portrait-img {
  width: 100%; height: 100%;
  object-fit: cover; object-position: top;
}

.fd-basic { flex: 1; display: flex; flex-direction: column; gap: 4px; justify-content: center; }
.fd-basic-row { display: flex; align-items: center; gap: 8px; font-size: 11px; }
.fd-lbl  { color: var(--td); font-family: var(--font-serif); letter-spacing: .3px; min-width: 36px; flex-shrink: 0; }
.fd-val  { color: var(--t1); }

/* 상태 뱃지 */
.fd-badge { font-size: 9px; padding: 2px 7px; border-radius: 8px; }
.st-standby { color: var(--t2);  background: rgba(255,255,255,.06); }
.st-moving  { color: var(--tg);  background: rgba(212,170,96,.12); }
.st-battle  { color: #e74c3c;    background: rgba(231,76,60,.12); }
.st-retreat { color: var(--td);  background: rgba(255,255,255,.04); }

/* 함대참모 */
.fd-staff-col {
  width: 140px; flex-shrink: 0; display: flex; flex-direction: column; gap: 6px;
}
.fd-staff-list { display: flex; flex-direction: column; gap: 3px; }
.fd-staff-row  { display: flex; }

/* ── 구분선 ───────────────────────────────────── */
.fd-divider    { height: 1px; background: var(--bd); flex-shrink: 0; }
.fd-divider-sm { height: 1px; background: rgba(255,255,255,.06); margin: 3px 0; }

/* ── 하단 ─────────────────────────────────────── */
.fd-bottom {
  display: flex; gap: 16px; align-items: flex-start;
}

/* 섹션 레이블 */
.fd-section-label {
  font-size: 10px; color: var(--td); letter-spacing: 1px;
  text-transform: uppercase; margin-bottom: 8px;
}

/* 전투 능력치 */
.fd-stats-col  { flex: 1; }
.fd-stats-grid { display: flex; flex-direction: column; gap: 6px; }
.fd-stat-row   { display: flex; align-items: center; gap: 7px; }
.fd-stat-lbl   { width: 28px; font-size: 11px; color: var(--td); flex-shrink: 0; font-family: var(--font-serif); letter-spacing: .5px; }
.fd-sbar       { flex: 1; height: 5px; background: rgba(255,255,255,.08); border-radius: 3px; overflow: hidden; }
.fd-sbar-fill  { height: 100%; border-radius: 3px; transition: width .3s; }
.fd-stat-val   { width: 28px; font-size: 10px; color: var(--t2); text-align: right; flex-shrink: 0; }

/* 함대 현황 */
.fd-status-col  { width: 148px; flex-shrink: 0; }
.fd-status-rows { display: flex; flex-direction: column; gap: 0; }
.fd-status-row  {
  display: flex; justify-content: space-between; align-items: center;
  padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,.04);
  font-size: 11px; font-family: var(--font-serif); letter-spacing: .3px;
}
.fd-status-row:last-child { border-bottom: none; }

/* 진형 도식 */
.fd-formation-col { width: 140px; flex-shrink: 0; }
.fd-formation-box {
  width: 100%; aspect-ratio: 1;
  background: var(--bg4); border: 1px solid var(--bd); border-radius: var(--r);
}

/* 부대 편성 */
.fd-units-col  { flex: 1; }
.fd-units-list {
  min-height: 120px;
  background: var(--bg4); border: 1px solid var(--bd); border-radius: var(--r);
}

/* ── 푸터 ─────────────────────────────────────── */
.fd-footer {
  display: flex; justify-content: center; gap: 8px;
  padding: 10px 16px; border-top: 1px solid var(--bd); flex-shrink: 0;
}
</style>
