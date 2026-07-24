<template>
  <HelpOverlay v-if="showHelp" :menu-id="category" :title="helpTitle" @close="showHelp = false" />

  <Teleport to="body">
    <Transition name="mp-fade">
      <div v-if="category" class="mp-backdrop" @click.self="closeAll" />
    </Transition>

    <Transition name="mp-slide">
      <div v-if="category" class="mp-panel">

        <!-- 헤더 -->
        <div class="mp-header">
          <button v-if="navStack.length" class="mp-back mono" @click="navStack.pop()">← 뒤로</button>
          <span class="serif gold" style="font-size:13px;letter-spacing:1px">{{ headerTitle }}</span>
          <button class="mp-help" @click="openHelp">?</button>
          <button class="mp-close" @click="closeAll">✕</button>
        </div>

        <!-- 메뉴 항목 목록 -->
        <div class="mp-list">
          <template v-for="item in currentItems" :key="item.id">
            <!-- 그룹 행 -->
            <div v-if="item.type === 'group'" class="mp-group-row">
              <span class="mp-group-label mono">{{ item.label }}</span>
              <div class="mp-group-items">
                <button
                  v-for="sub in item.items" :key="sub.id"
                  class="mp-group-btn"
                  :class="{ disabled: sub.disabled }"
                  :disabled="sub.disabled"
                  @click="!sub.disabled && handleItem(sub)"
                >{{ sub.label }}</button>
              </div>
            </div>
            <!-- 일반 항목 -->
            <div v-else
                 class="mp-item" :class="{ disabled: item.disabled }"
                 @click="!item.disabled && handleItem(item)">
              <span class="mp-item-label">{{ item.label }}</span>
              <span v-if="item.children" class="mono dim" style="font-size:12px">›</span>
            </div>
          </template>
        </div>

        <!-- 의안 미리보기 (최상위 레벨) -->
        <template v-if="isAgendaCat && !navStack.length && agendas.length">
          <div class="mp-agenda-header">
            <span class="dim" style="font-size:10px">대기 의안</span>
          </div>
          <div class="mp-agenda-list">
            <div v-for="(ag, i) in agendas" :key="ag.id"
                 class="agenda-item" :class="{ active: i < maxActive, inactive: i >= maxActive }">
              <div class="ai-row">
                <span v-if="i < maxActive" class="tag tag-active">대기</span>
                <span v-else class="tag tag-inactive">비활</span>
                <span style="font-size:11px;flex:1">{{ ag.title }}</span>
                <button class="btn-cancel" @click.stop="game.cancelAgenda(ag.id)">✕</button>
              </div>
            </div>
          </div>
        </template>

      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import { useHelpStore } from '@/stores/helpStore'
import { APPROVAL_CHAINS } from '@/data/base/agenda/agendaData'
import { MENU_TREES } from '@/data/base/agenda/menuTree'
import HelpOverlay from '@/components/ui/HelpOverlay.vue'

const props = defineProps({ category: { type: String, default: null } })
const emit = defineEmits(['close'])

const game = useGameStore()
const help = useHelpStore()

onMounted(() => help.init())

// 카테고리가 바뀌면 네비게이션 초기화 + 도움말 체크
const navStack  = ref([])
const showHelp  = ref(false)
const helpTitle = ref('')

function openHelp() {
  helpTitle.value = CAT_LABEL[props.category] ?? props.category
  showHelp.value  = true
}

watch(() => props.category, (id) => {
  navStack.value = []
  if (id && help.shouldShow(id)) openHelp()
})

const AGENDA_CATS = new Set(['military', 'domestic', 'personnel', 'intel', 'research', 'finance'])
const isAgendaCat = computed(() => AGENDA_CATS.has(props.category))

const CAT_LABEL = {
  nation: '국가', military: '군사', domestic: '내정', faction: '파벌',
  intel: '모략', personal: '인물', social: '사교', info: '뉴스',
  personnel: '인사', research: '연구', finance: '재정',
}

// 현재 보여줄 항목 (navStack 기반 drill-down)
const currentItems = computed(() => {
  const tree = MENU_TREES[props.category] || []
  let items = tree
  for (const id of navStack.value) {
    const parent = items.find(i => i.id === id)
    items = parent?.children || []
  }
  return items
})

// 헤더 타이틀
const headerTitle = computed(() => {
  if (!navStack.value.length) return CAT_LABEL[props.category] || ''
  const tree = MENU_TREES[props.category] || []
  let items = tree
  let label = ''
  for (const id of navStack.value) {
    const found = items.find(i => i.id === id)
    if (found) { label = found.label; items = found.children || [] }
  }
  return label
})

// 결재권자
const approver = computed(() => {
  if (!isAgendaCat.value) return null
  const pf = game.playerFaction
  const chain = (APPROVAL_CHAINS[pf] || {})[props.category] || []
  for (const jobId of chain) {
    const c = Object.values(game.characters).find(
      ch => ch.jobs.some(j => j.jobCode === jobId) && ch.faction === pf && ch.charStatus !== 'dead'
    )
    if (c) return c
  }
  return null
})

const maxActive = computed(() =>
  approver.value ? Math.max(1, Math.floor((approver.value.politics || 50) / 10)) : 0
)

const agendas = computed(() =>
  game.agendas
    .filter(a => a.category === props.category && a.status === 'pending')
    .sort((a, b) => a.registeredTurn - b.registeredTurn)
    .slice(0, 10)
)

const pendingCount = computed(() => agendas.value.length)

function handleItem(item) {
  if (item.children) {
    navStack.value.push(item.id)
    if (help.shouldShow(item.id)) {
      helpTitle.value = item.label
      showHelp.value  = true
    }
  } else {
    if (item.modal) {
      game.openModal(item.modal)
      closeAll()
    }
  }
}

function closeAll() {
  navStack.value = []
  emit('close')
}
</script>

<style scoped>
.mp-backdrop {
  position: fixed;
  top: 0; left: 0; right: 0;
  bottom: var(--bar-h);
  z-index: 1800;
  background: rgba(0,0,0,.45);
  backdrop-filter: blur(2px);
}

.mp-panel {
  position: fixed; left: 0; right: 0; bottom: var(--bar-h); z-index: 1900;
  max-height: 55vh; overflow-y: auto;
  background: linear-gradient(180deg, #101828 0%, #0b1220 100%);
  border: 1px solid rgba(212,170,96,.35);
  border-bottom: none;
  border-radius: 14px 14px 0 0;
  box-shadow: 0 -4px 32px rgba(0,0,0,.8), 0 -1px 0 rgba(212,170,96,.15);
  display: flex; flex-direction: column;
}

/* 헤더 */
.mp-header {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 16px; border-bottom: 1px solid var(--bd);
  flex-shrink: 0; min-height: 42px;
  background: rgba(255,255,255,.02);
}
.mp-back {
  background: none; border: 1px solid var(--bd); border-radius: var(--r);
  color: var(--t2); font-size: 11px; font-family: var(--font-mono);
  padding: 3px 10px; cursor: pointer; letter-spacing: .5px;
  transition: all .15s;
}
.mp-back:hover { border-color: var(--tg); color: var(--tg); }
.mp-help {
  margin-left: auto; background: none; flex-shrink: 0;
  border: 1px solid var(--td); border-radius: 50%;
  color: var(--td); font-size: 11px; font-weight: bold;
  cursor: pointer; width: 20px; height: 20px;
  display: flex; align-items: center; justify-content: center;
  line-height: 1; transition: all .15s;
}
.mp-help:hover { border-color: var(--tg); color: var(--tg); }
.mp-close {
  background: none; border: none;
  color: var(--td); font-size: 14px; cursor: pointer; padding: 4px 6px;
  line-height: 1; transition: color .15s;
}
.mp-close:hover { color: var(--t1); }

/* 메뉴 항목 */
.mp-list { display: flex; flex-direction: column; flex-shrink: 0; }

/* 그룹 행 */
.mp-group-row {
  display: flex; align-items: center; gap: 14px;
  padding: 11px 18px; border-bottom: 1px solid var(--bd);
}
.mp-group-label {
  font-size: 11px; color: rgba(255,255,255,.5); letter-spacing: 1px;
  flex-shrink: 0; width: 34px; text-align: right;
}
.mp-group-items { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
.mp-group-btn {
  padding: 6px 14px; font-size: 13px; font-family: var(--font-serif);
  color: rgba(255,255,255,.8); background: var(--bg4);
  border: 1px solid var(--bd); border-radius: var(--r);
  cursor: pointer; transition: all .15s; letter-spacing: .3px;
}
.mp-group-btn:hover:not(.disabled) {
  background: var(--bgh); border-color: var(--bdg); color: #fff;
}
.mp-group-btn.disabled { opacity: .38; cursor: not-allowed; }

.mp-item {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 18px; border-bottom: 1px solid var(--bd);
  cursor: pointer; transition: background .12s, color .12s;
  font-size: 14px; font-family: var(--font-serif);
  color: rgba(255,255,255,.8); letter-spacing: .3px;
  position: relative;
}
.mp-item::before {
  content: '';
  position: absolute; left: 0; top: 20%; bottom: 20%; width: 2px;
  background: var(--tg);
  transform: scaleY(0); transition: transform .15s;
}
.mp-item:hover:not(.disabled) {
  background: rgba(255,255,255,.04);
  color: #fff;
}
.mp-item:hover:not(.disabled)::before { transform: scaleY(1); }
.mp-item.disabled { color: rgba(255,255,255,.35); cursor: default; }
.mp-item-label { flex: 1; }

/* 의안 섹션 */
.mp-agenda-header {
  padding: 8px 16px 4px;
  border-top: 1px solid var(--bd);
  font-size: 10px; font-family: var(--font-mono);
  color: var(--td); letter-spacing: 1px; text-transform: uppercase;
}
.mp-agenda-list {
  padding: 4px 12px 10px;
  display: flex; flex-direction: column; gap: 5px;
}
.agenda-item {
  border-radius: var(--r);
  border: 1px solid var(--bd);
  background: rgba(255,255,255,.02);
  transition: border-color .15s;
}
.agenda-item.active  { border-color: rgba(212,170,96,.35); }
.agenda-item.inactive { opacity: .4; }
.ai-row {
  display: flex; align-items: center; gap: 8px;
  padding: 7px 10px;
}
.tag {
  font-size: 9px; font-family: var(--font-mono);
  padding: 2px 6px; border-radius: 3px; flex-shrink: 0;
  letter-spacing: .5px;
}
.tag-active   { background: rgba(212,170,96,.15); color: var(--tg); }
.tag-inactive { background: rgba(255,255,255,.04); color: var(--td); }
.btn-cancel {
  margin-left: auto; background: none; border: none;
  color: var(--td); font-size: 12px; cursor: pointer; padding: 2px 5px;
  transition: color .12s;
}
.btn-cancel:hover { color: var(--ta); }

/* 트랜지션 */
.mp-fade-enter-active, .mp-fade-leave-active { transition: opacity .2s; }
.mp-fade-enter-from, .mp-fade-leave-to { opacity: 0; }
.mp-slide-enter-active, .mp-slide-leave-active { transition: transform .22s cubic-bezier(.4,0,.2,1); }
.mp-slide-enter-from, .mp-slide-leave-to { transform: translateY(100%); }
</style>
