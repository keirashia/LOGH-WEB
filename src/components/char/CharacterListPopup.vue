<template>
  <div class="cl-box" @click.stop>

    <!-- 헤더 -->
    <div class="cl-header">
      <span class="serif gold" style="font-size:14px;letter-spacing:1px">인물</span>
      <span class="mono dim" style="font-size:11px;margin-left:6px">{{ sorted.length }}명</span>
      <button class="cl-close" @click="$emit('close')">✕</button>
    </div>

    <!-- 필터 바 -->
    <div class="cl-filter">
      <button class="btn cl-filter-btn">필터</button>
    </div>

    <!-- 통합 스크롤 컨테이너 (가로·세로 모두) -->
    <div class="cl-scroll">

      <!-- 2행 컬럼 헤더 (세로 sticky) -->
      <div class="cl-thead">
        <!-- 고정 4열: 2행 span -->
        <button class="cl-th cl-s1 cl-th-span" :class="{ active: sortKey === 'name' }"   @click="setSort('name')">이름{{ arrow('name') }}</button>
        <button class="cl-th cl-s2 cl-th-span" :class="{ active: sortKey === 'job' }"    @click="setSort('job')">직책{{ arrow('job') }}</button>
        <button class="cl-th cl-s3 cl-th-span" :class="{ active: sortKey === 'brave' }"  @click="setSort('brave')">성격{{ arrow('brave') }}</button>
        <button class="cl-th cl-s4 cl-th-span" :class="{ active: sortKey === 'friend' }" @click="setSort('friend')">관계{{ arrow('friend') }}</button>
        <!-- 스탯 1행 -->
        <button class="cl-th" style="grid-column:5;grid-row:1" :class="{ active: sortKey === 'statCmd' }" @click="setSort('statCmd')">통솔{{ arrow('statCmd') }}</button>
        <button class="cl-th" style="grid-column:6;grid-row:1" :class="{ active: sortKey === 'statAtt' }" @click="setSort('statAtt')">공격{{ arrow('statAtt') }}</button>
        <button class="cl-th" style="grid-column:7;grid-row:1" :class="{ active: sortKey === 'statFst' }" @click="setSort('statFst')">기동{{ arrow('statFst') }}</button>
        <button class="cl-th" style="grid-column:8;grid-row:1" :class="{ active: sortKey === 'statInf' }" @click="setSort('statInf')">정보{{ arrow('statInf') }}</button>
        <button class="cl-th" style="grid-column:9;grid-row:1" :class="{ active: sortKey === 'statAfg' }" @click="setSort('statAfg')">공전{{ arrow('statAfg') }}</button>
        <!-- 스탯 2행 -->
        <button class="cl-th" style="grid-column:5;grid-row:2" :class="{ active: sortKey === 'statCsm' }" @click="setSort('statCsm')">지휘{{ arrow('statCsm') }}</button>
        <button class="cl-th" style="grid-column:6;grid-row:2" :class="{ active: sortKey === 'statDef' }" @click="setSort('statDef')">방어{{ arrow('statDef') }}</button>
        <button class="cl-th" style="grid-column:7;grid-row:2" :class="{ active: sortKey === 'statMng' }" @click="setSort('statMng')">운영{{ arrow('statMng') }}</button>
        <button class="cl-th" style="grid-column:8;grid-row:2" :class="{ active: sortKey === 'statGfg' }" @click="setSort('statGfg')">육전{{ arrow('statGfg') }}</button>
        <button class="cl-th" style="grid-column:9;grid-row:2" :class="{ active: sortKey === 'statPlt' }" @click="setSort('statPlt')">정치{{ arrow('statPlt') }}</button>
      </div>

      <!-- 데이터 행 -->
      <div
        v-for="c in sorted" :key="c.code"
        class="cl-row"
        :class="{ 'cl-row--player': c.isPlayer }"
        @click="detailCode = c.code"
      >
        <div class="cl-cell-name cl-s1">
          <div class="cl-init">
            <img v-if="portraitSrc(c.code)" :src="portraitSrc(c.code)" class="cl-portrait-img" alt=""
                 @error="onImgError(c.code, $event)" />
            <span v-else class="serif" style="font-size:11px;color:var(--td)">{{ c.initials }}</span>
          </div>
          <span class="serif" style="font-size:12px;letter-spacing:.3px;white-space:nowrap">{{ c.nick }}</span>
        </div>
        <div class="cl-cell mono dim cl-s2" style="font-size:10px;letter-spacing:.2px">{{ c.jobName }}</div>
        <div class="cl-cell mono cl-s3" style="font-size:11px">{{ c.braveLabel }}</div>
        <div class="cl-cell mono cl-s4" style="font-size:11px">{{ c.friendLabel }}</div>
        <div class="cl-stat-pair">
          <span class="mono" :style="valStyle(c.statCmd)">{{ c.statCmd }}</span>
          <span class="mono" :style="valStyle(c.statCsm)">{{ c.statCsm }}</span>
        </div>
        <div class="cl-stat-pair">
          <span class="mono" :style="valStyle(c.statAtt)">{{ c.statAtt }}</span>
          <span class="mono" :style="valStyle(c.statDef)">{{ c.statDef }}</span>
        </div>
        <div class="cl-stat-pair">
          <span class="mono" :style="valStyle(c.statFst)">{{ c.statFst }}</span>
          <span class="mono" :style="valStyle(c.statMng)">{{ c.statMng }}</span>
        </div>
        <div class="cl-stat-pair">
          <span class="mono" :style="valStyle(c.statInf)">{{ c.statInf }}</span>
          <span class="mono" :style="valStyle(c.statGfg)">{{ c.statGfg }}</span>
        </div>
        <div class="cl-stat-pair">
          <span class="mono" :style="valStyle(c.statAfg)">{{ c.statAfg }}</span>
          <span class="mono" :style="valStyle(c.statPlt)">{{ c.statPlt }}</span>
        </div>
      </div>

    </div>

    <!-- 인물 상세 -->
    <CharacterInfoPopup
      :show="!!detailCode"
      :char-code="detailCode"
      @close="detailCode = null"
    />

  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import { JOB_MAP } from '@/data/base/jobs/jobData.js'
import { friendGrade } from '@/utils/charValueLabel.js'
import CharacterInfoPopup from '@/components/char/CharacterInfoPopup.vue'
import { useLang } from '@/composables/useLang'

defineProps({ payload: { default: null } })
defineEmits(['close'])

const game = useGameStore()
const { lang } = useLang()

const detailCode = ref(null)
const sortKey    = ref('friend')
const sortDir    = ref(1)

// ── portrait 상태: reactive map (png → jpg → none) ────────────────
const imgState = reactive({}) // code → undefined | 'jpg' | 'none'

function portraitSrc(code) {
  const s = imgState[code]
  if (s === 'none') return null
  if (s === 'jpg')  return `/img/characters/${code}O_H.jpg`
  return `/img/characters/${code}O_H.png`
}

function onImgError(code, e) {
  if (imgState[code] !== 'jpg') {
    imgState[code] = 'jpg'
    e.target.src = `/img/characters/${code}O_H.jpg`
  } else {
    imgState[code] = 'none'
  }
}

// ── 데이터 ────────────────────────────────────────────────────────
const rows = computed(() => {
  const pc = game.playerCharCode
  const pf = Number(game.characters?.[pc]?.friend ?? 0)
  return Object.values(game.characters)
    .filter(c => c.faction === game.playerFaction && !c.isDead)
    .map(c => {
      const isPlayer = c.code === pc
      const fi       = friendGrade(c.friend, pf)
      const nick     = c.nick?.find(e => e.code === lang.value)?.context
                    ?? c.name?.find(e => e.code === lang.value)?.context
                    ?? '?'
      return {
        code:        c.code,
        isPlayer,
        nick,
        initials:    nick.slice(-1),
        jobName:     c.jobs?.[0]
                       ? (JOB_MAP[c.jobs[0].jobCode]?.name?.find(e => e.code === lang.value)?.context ?? '-')
                       : '-',
        brave:       Number(c.brave ?? 0),
        braveLabel:  c.braveLabel ?? '-',
        friendDiff:  fi.diff,
        friendLabel: isPlayer ? '-' : fi.label,
        statCmd: c.statCmd ?? 0,
        statCsm: c.statCsm ?? 0,
        statAtt: c.statAtt ?? 0,
        statDef: c.statDef ?? 0,
        statFst: c.statFst ?? 0,
        statMng: c.statMng ?? 0,
        statInf: c.statInf ?? 0,
        statGfg: c.statGfg ?? 0,
        statAfg: c.statAfg ?? 0,
        statPlt: c.statPlt ?? 0,
      }
    })
})

// ── 정렬 ─────────────────────────────────────────────────────────
const sorted = computed(() => {
  return [...rows.value].sort((a, b) => {
    if (sortKey.value === 'name')   return sortDir.value * a.nick.localeCompare(b.nick, 'ko')
    if (sortKey.value === 'job')    return sortDir.value * a.jobName.localeCompare(b.jobName, 'ko')
    if (sortKey.value === 'friend') {
      const d = a.friendDiff - b.friendDiff
      if (d !== 0) return sortDir.value * d
      if (a.isPlayer) return -1
      if (b.isPlayer) return  1
      return 0
    }
    if (sortKey.value === 'brave')  return sortDir.value * (b.brave - a.brave)
    return sortDir.value * (b[sortKey.value] - a[sortKey.value])
  })
})

function setSort(key) {
  if (sortKey.value === key) {
    sortDir.value *= -1
  } else {
    sortKey.value = key
    sortDir.value = (key === 'name' || key === 'job' || key === 'friend') ? 1 : -1
  }
}

function arrow(key) {
  if (sortKey.value !== key) return ''
  return sortDir.value < 0 ? ' ↓' : ' ↑'
}

function valStyle(v) {
  const n = Number(v)
  if (isNaN(n))  return { color: 'var(--td)' }
  if (n >= 90)   return { color: 'var(--tg)' }
  if (n >= 70)   return { color: 'var(--t1)' }
  if (n >= 50)   return { color: 'var(--t2)' }
  return { color: 'var(--td)' }
}
</script>

<style scoped>
/* ── 박스 ─────────────────────────────────────────────────────── */
.cl-box {
  width: 90vw; max-height: 88vh;
  display: flex; flex-direction: column;
  background: linear-gradient(180deg, #101828 0%, #0b1220 100%);
  border: 1px solid rgba(212,170,96,.4);
  border-radius: var(--r);
  overflow: clip; /* sticky가 부모 overflow:hidden에 막히지 않도록 */
  box-shadow: 0 8px 40px rgba(0,0,0,.9);
}

/* ── 헤더 ─────────────────────────────────────────────────────── */
.cl-header {
  display: flex; align-items: center;
  padding: 10px 16px;
  border-bottom: 1px solid var(--bd);
  flex-shrink: 0;
  background: rgba(255,255,255,.02);
}
.cl-close {
  margin-left: auto;
  background: none; border: none; color: var(--td);
  font-size: 14px; cursor: pointer; padding: 4px 6px; line-height: 1;
  transition: color .15s;
}
.cl-close:hover { color: var(--t1); }

/* ── 필터 바 ─────────────────────────────────────────────────── */
.cl-filter {
  display: flex; align-items: center; gap: 6px;
  padding: 7px 16px;
  border-bottom: 1px solid var(--bd);
  flex-shrink: 0;
}
.cl-filter-btn {
  font-size: clamp(10px, 2.5vw, 13px);
  padding: 3px 10px;
  color: #fff;
}

/* ── 통합 스크롤 컨테이너 ────────────────────────────────────── */
.cl-scroll {
  flex: 1;
  overflow: auto;
}

/* ── 그리드 공통 (헤더·데이터 행 공유) ─────────────────────── */
/*
  컬럼 구성:
  [고정] 이름(100px) 직책(80px) 성격(46px) 관계(46px)
  [스크롤] 통솔/지휘(42px) 공격/방어(42px) 기동/운영(42px) 정보/육전(42px) 공전/정치(42px)
*/
.cl-thead,
.cl-row {
  display: grid;
  grid-template-columns: 100px 80px 46px 46px repeat(5, 42px);
  gap: 0 8px;
  padding: 0 16px;
}

/* ── 2행 컬럼 헤더 ───────────────────────────────────────────── */
.cl-thead {
  grid-template-rows: auto auto;
  position: sticky; top: 0; z-index: 5;
  background: #101828;
  border-bottom: 1px solid var(--bd);
}

.cl-th {
  background: none; border: none;
  color: var(--t1); font-size: clamp(10px, 2vw, 12px);
  font-family: var(--font-mono); letter-spacing: .5px;
  cursor: pointer; padding: 4px 0; text-align: left;
  white-space: nowrap; transition: color .15s;
  display: flex; align-items: center;
}
.cl-th:hover { color: var(--t1); }
.cl-th.active { color: var(--tg); }

/* 고정 컬럼 헤더: 2행 span + 세로 중앙 */
.cl-th-span {
  grid-row: 1 / span 2;
  align-items: center;
}

/* ── 데이터 행 ───────────────────────────────────────────────── */
.cl-row {
  --row-bg: transparent;
  background: var(--row-bg);
  align-items: center;
  cursor: pointer;
  border-bottom: 1px solid rgba(255,255,255,.04);
  transition: background .1s;
}
.cl-row:hover { --row-bg: rgba(255,255,255,.05); }
.cl-row--player { --row-bg: rgba(212,170,96,.06); border-left: 2px solid rgba(212,170,96,.5); }
/* 플레이어 행 하단 구분선 (다른 row border-bottom보다 훨씬 진하게) */
.cl-row.cl-row--player { border-bottom: 1px solid rgba(212,170,96,.4); }

/* ── 고정 컬럼 (가로 sticky) ─────────────────────────────────── */
/*
  left 값 = 16px 패딩 + 앞 컬럼 너비 합 + gap 합
  s1: 16
  s2: 16 + 100 + 8 = 124
  s3: 124 + 80 + 8 = 212
  s4: 212 + 46 + 8 = 266
*/
.cl-s1, .cl-s2, .cl-s3, .cl-s4 {
  position: sticky;
  z-index: 2;
  background: #0c1521;
}
.cl-s1 { left: 16px; }
.cl-s2 { left: 124px; }
.cl-s3 { left: 212px; }
.cl-s4 { left: 266px; border-right: 1px solid var(--bdg); padding-right: 8px; }

/* 헤더 고정 컬럼: 최상위 z-index */
.cl-thead .cl-s1,
.cl-thead .cl-s2,
.cl-thead .cl-s3,
.cl-thead .cl-s4 {
  z-index: 6;
  background: #101828;
}

/* 호버 시 고정 컬럼 배경 동기화 */
.cl-row:hover .cl-s1,
.cl-row:hover .cl-s2,
.cl-row:hover .cl-s3,
.cl-row:hover .cl-s4 {
  background: #121d2a;
}

/* ── 셀 공통 ─────────────────────────────────────────────────── */
.cl-cell-name {
  display: flex; align-items: center; gap: 8px;
  white-space: nowrap;
}
.cl-cell {
  font-size: 12px; color: var(--t1);
  letter-spacing: .3px;
  white-space: nowrap;
  overflow: hidden; text-overflow: ellipsis;
}

/* 이니셜 / 초상화 */
.cl-init {
  width: 24px; height: 24px; flex-shrink: 0;
  border: 1px solid var(--bd); border-radius: var(--r);
  background: var(--bg4);
  display: flex; align-items: center; justify-content: center;
  overflow: hidden;
}
.cl-portrait-img {
  width: 100%; height: 100%;
  object-fit: cover;
}

/* 스탯 쌍: 2줄 세로 배치 */
.cl-stat-pair {
  display: flex; flex-direction: column; gap: 0;
  padding: 3px 0;
}
.cl-stat-pair .mono {
  font-size: 11px; letter-spacing: .3px;
  white-space: nowrap; padding: 2px 0;
}
/* 1행·2행 능력치 사이 구분선 */
.cl-stat-pair .mono:first-child {
  border-bottom: 1px solid rgba(255,255,255,.1);
}
</style>
