<template>
  <Teleport to="body">
    <transition name="cp-fade">
      <div v-if="show && char" class="cp-box" @click.stop>

      <!-- ① 헤더: 초상화 | 소속국가 | 풀네임 -->
      <div class="cp-head">
        <div class="cp-portrait">
          <img v-if="portraitSrc" :src="portraitSrc" class="cp-portrait-img"
               @error="onPortraitError" alt="" />
          <span v-else class="cp-init serif">{{ initials }}</span>
        </div>
        <div class="cp-head-info">
          <span class="mono" :class="`fc-${char.faction}`" style="font-size:12px;letter-spacing:.5px">
            {{ FACTION_NAMES[char.faction] ?? char.faction }}
          </span>
          <span class="mono dim" style="font-size:12px;margin:0 6px">|</span>
          <span class="serif gold" style="font-size:18px;letter-spacing:.5px">{{ fullName }}</span>
        </div>
      </div>

      <!-- ② 직업 -->
      <div class="cp-sep"><span class="cp-sep-lbl">직업</span></div>
      <div class="cp-jobs">
        <template v-if="char.jobs?.length">
          <JobChip v-for="j in char.jobs" :key="j.jobCode" :job-code="j.jobCode" />
        </template>
        <span v-else class="dim serif" style="font-size:11px">없음</span>
      </div>

      <!-- ③ 트레잇 -->
      <div class="cp-sep"><span class="cp-sep-lbl">트레잇</span></div>
      <div class="cp-traits">
        <template v-if="char.traits?.length">
          <TraitBadge
            v-for="t in char.traits" :key="t.traitCode"
            :trait="CHAR_TRAIT_MAP[t.traitCode]"
            :char-trait="t"
          />
        </template>
        <span v-else class="dim serif" style="font-size:11px">없음</span>
      </div>

      <!-- ④ 성향 -->
      <div class="cp-sep"><span class="cp-sep-lbl">성향</span></div>
      <div class="cp-grid-3col" @click="activeHint = null">
        <div v-for="p in PERSONALITY" :key="p.key" class="cp-stat">
          <span class="cp-sl mono">{{ p.label }}</span>
          <template v-if="p.friendMode">
            <span style="flex:1" />
            <div class="cp-friend-wrap" @click.stop>
              <span class="cp-sv mono cp-hint-trigger" style="width:auto"
                    @click="activeHint = activeHint === 'friend' ? null : 'friend'">
                {{ friendInfo?.label ?? '-' }}
              </span>
              <div v-if="activeHint === 'friend'" class="cp-hint-box">
                <div class="cp-hint-title mono">친화도 계산</div>
                <div class="cp-hint-row">
                  <span class="dim">내 친화</span>
                  <span>{{ friendInfo?.playerVal }}</span>
                </div>
                <div class="cp-hint-row">
                  <span class="dim">상대 친화</span>
                  <span>{{ friendInfo?.charVal }}</span>
                </div>
                <div class="cp-hint-row">
                  <span class="dim">원형 거리</span>
                  <span>{{ friendInfo?.diff }} / 150</span>
                </div>
                <div class="cp-hint-grade">→ {{ friendInfo?.label }}</div>
              </div>
            </div>
          </template>
          <template v-else-if="p.labelFn">
            <span style="flex:1" />
            <span class="cp-sv mono" style="width:auto">{{ p.labelFn(char[p.key]) }}</span>
          </template>
          <template v-else>
            <span class="cp-sb"><span class="cp-sf" :style="{ width: pct(char[p.key], p.max) }" /></span>
            <span class="cp-sv mono" :style="valStyle(Number(char[p.key]), p.max)">{{ char[p.key] ?? '-' }}</span>
          </template>
        </div>
      </div>

      <!-- ⑤ 능력치 -->
      <div class="cp-sep"><span class="cp-sep-lbl">능력치</span></div>
      <div class="cp-grid-2col">
        <div v-for="s in STATS" :key="s.key" class="cp-stat">
          <span class="cp-sl mono">{{ s.label }}</span>
          <span class="cp-sb"><span class="cp-sf" :style="{ width: pct(char[s.key], 100) }" /></span>
          <span class="cp-sv mono" :style="valStyle(char[s.key], 100)">{{ char[s.key] ?? '-' }}</span>
        </div>
      </div>

      <!-- 닫기 -->
      <div class="cp-sep" />
      <button class="btn btn-gold cp-close-btn" @click="$emit('close')">닫기</button>

      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import { useLang } from '@/composables/useLang'
import TraitBadge from '@/components/char/TraitBadge.vue'
import JobChip from '@/components/common/JobChip.vue'
import { CHAR_TRAIT_MAP } from '@/data/base/trait/chars/charTraitData.js'
import { braveLabel, ideaLabel, econLabel, friendGrade } from '@/utils/charValueLabel.js'

const props = defineProps({
  show:     { type: Boolean, default: false },
  charCode: { type: String,  default: null },
  title:    { type: String,  default: '' },
})
defineEmits(['close'])

const game = useGameStore()
const { lang } = useLang()

const char = computed(() =>
  props.charCode ? (game.characters?.[props.charCode] ?? null) : null
)

const FACTION_NAMES = { REH: '은하제국', FPA: '자유행성동맹', PZN: '페잔' }

const STATS = [
  { key: 'statCmd', label: '통솔' }, { key: 'statCsm', label: '지휘' },
  { key: 'statAtt', label: '공격' }, { key: 'statDef', label: '방어' },
  { key: 'statMng', label: '운영' }, { key: 'statInf', label: '정보' },
  { key: 'statGfg', label: '육전' }, { key: 'statAfg', label: '공전' },
]

const PERSONALITY = [
  { key: 'brave',  label: '성격', labelFn: braveLabel },
  { key: 'moral',  label: '도덕', max: 100 },
  { key: 'friend', label: '친화', friendMode: true },
  { key: 'idea',   label: '이념', labelFn: ideaLabel },
  { key: 'econ',   label: '경제', labelFn: econLabel },
]

const playerFriend = computed(() =>
  Number(game.characters?.[game.playerCharCode]?.friend ?? 0)
)
const friendInfo = computed(() =>
  char.value ? friendGrade(char.value.friend, playerFriend.value) : null
)

const activeHint = ref(null)

const fullName = computed(() =>
  char.value?.name?.find(e => e.code === lang.value)?.context ?? '?'
)

const portraitSrc = ref(null)
watch(() => props.charCode, (code) => {
  portraitSrc.value = code ? `/img/characters/${code}O_H.png` : null
}, { immediate: true })

function onPortraitError() {
  if (!props.charCode) return
  const cur = portraitSrc.value ?? ''
  if (cur.endsWith('.png')) {
    portraitSrc.value = `/img/characters/${props.charCode}O_H.jpg`
  } else {
    portraitSrc.value = null
  }
}

const initials = computed(() => fullName.value?.slice(-1) ?? '?')

function pct(v, max = 100) {
  const n = Number(v ?? 0)
  return `${Math.min((n / max) * 100, 100)}%`
}

function valStyle(v, max = 100) {
  const n = Number(v)
  if (isNaN(n))       return { color: 'var(--td)' }
  const r = n / max
  if (r >= 0.9)       return { color: 'var(--tg)' }
  if (r >= 0.7)       return { color: 'var(--t1)' }
  if (r >= 0.5)       return { color: 'var(--t2)' }
  return { color: 'var(--td)' }
}
</script>

<style scoped>
.cp-box {
  position: fixed;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw; height: 90vh;
  z-index: 3000;
  background: linear-gradient(180deg, #101828 0%, #0b1220 100%);
  border: 1px solid rgba(212,170,96,.4);
  border-radius: var(--r);
  padding: 18px 20px 16px;
  box-shadow: 0 8px 40px rgba(0,0,0,.9);
  display: flex;
  flex-direction: column;
  gap: 0;
  overflow-y: auto;
}

/* ① 헤더 */
.cp-head {
  display: flex;
  align-items: center;
  gap: 16px;
  padding-bottom: 4px;
}
.cp-portrait {
  width: 100px; height: 100px;
  flex-shrink: 0;
  border: 1px solid var(--bd);
  border-radius: var(--r);
  background: var(--bg4);
  display: flex;
  align-items: center;
  justify-content: center;
}
.cp-portrait-img {
  width: 100%; height: 100%;
  object-fit: cover;
  border-radius: var(--r);
}
.cp-init { font-size: 36px; color: var(--td); }
.cp-head-info {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

/* 구분선 */
.cp-sep {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 12px 0 8px;
}
.cp-sep::before {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--bd);
}
.cp-sep::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--bd);
}
.cp-sep-lbl {
  font-size: 2.2vh;
  letter-spacing: 1px;
  flex-shrink: 0;
}

/* ② 직업 */
.cp-jobs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.cp-chip {
  font-size: 11px;
  color: var(--t2);
  letter-spacing: .3px;
  background: var(--bg4);
  border: 1px solid var(--bd);
  border-radius: var(--r);
  padding: 3px 8px;
}

/* ③ 트레잇 */
.cp-traits {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

/* ④ 성향 (3열) */
.cp-grid-3col {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px 20px;
}

/* ⑤ 능력치 (2열 × 4행, 쌍 단위 row-flow) */
.cp-grid-2col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px 24px;
}

/* 공통 스탯 행 */
.cp-stat {
  display: flex;
  align-items: center;
  gap: 7px;
}
.cp-sl {
  font-size: 11px;
  color: var(--t2);
  letter-spacing: .3px;
  width: 26px;
  flex-shrink: 0;
}
.cp-sb {
  flex: 1;
  height: 4px;
  background: var(--bg4);
  border-radius: 2px;
  overflow: hidden;
}
.cp-sf {
  display: block;
  height: 100%;
  background: var(--tg);
  border-radius: 2px;
  opacity: .55;
}
.cp-sv {
  font-size: 12px;
  width: 28px;
  text-align: right;
  flex-shrink: 0;
}

/* 친화 힌트 */
.cp-friend-wrap {
  position: relative;
}
.cp-hint-trigger {
  cursor: pointer;
  border-bottom: 1px dotted var(--td);
}
.cp-hint-box {
  position: absolute;
  right: 0; top: calc(100% + 4px);
  z-index: 10;
  background: var(--bg3);
  border: 1px solid var(--bdg);
  border-radius: var(--r);
  padding: 8px 10px;
  min-width: 140px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  box-shadow: 0 4px 16px rgba(0,0,0,.6);
}
.cp-hint-title {
  font-size: 10px;
  color: var(--td);
  letter-spacing: .5px;
  padding-bottom: 4px;
  border-bottom: 1px solid var(--bd);
}
.cp-hint-row {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  font-size: 11px;
  font-family: var(--font-mono);
  color: var(--t1);
}
.cp-hint-row .dim { color: var(--td); }
.cp-hint-grade {
  font-size: 11px;
  font-family: var(--font-mono);
  color: var(--tg);
  text-align: right;
  padding-top: 2px;
  border-top: 1px solid var(--bd);
}

/* 닫기 */
.cp-close-btn {
  width: 100%;
  justify-content: center;
  margin-top: auto;
}

/* 트랜지션 */
.cp-fade-enter-active { transition: opacity .18s, transform .18s; }
.cp-fade-leave-active { transition: opacity .12s; }
.cp-fade-enter-from   { opacity: 0; transform: translate(-50%, -48%); }
.cp-fade-leave-to     { opacity: 0; transform: translate(-50%, -50%); }
</style>
