<template>
  <div class="strategy-bar">
    <div class="cat-area">
      <div class="cat-row">
        <button v-for="c in ROW1" :key="c.id"
                class="cat-btn" :class="{ on: activecat === c.id }"
                @click="toggle(c.id)">{{ c.label }}</button>
      </div>
      <div class="cat-row">
        <button v-for="c in ROW2" :key="c.id"
                class="cat-btn" :class="{ on: activecat === c.id }"
                @click="toggle(c.id)">{{ c.label }}</button>
      </div>
    </div>
    <button class="btn end-btn" :class="endBtnCls" @click="onEndTurnClick">턴 종료</button>
  </div>

  <MenuPanel :category="activecat" @close="activecat = null" />
</template>

<script setup>
import { ref, computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import MenuPanel from '@/components/game/panels/MenuPanel.vue'

const game = useGameStore()
const activecat = ref(null)
const endBtnCls = computed(() => ({ REH:'btn-red', FPA:'btn-blue', PZN:'btn-green' }[game.playerFaction]))

const ROW1 = [
  { id: 'nation',   label: '국가' },
  { id: 'military', label: '군사' },
  { id: 'domestic', label: '내정' },
  { id: 'faction',  label: '파벌' },
]
const ROW2 = [
  { id: 'personal', label: '인물' },
  { id: 'intel',    label: '모략' },
  { id: 'social',   label: '사교' },
  { id: 'info',     label: '뉴스' },
]

function toggle(id) {
  activecat.value = activecat.value === id ? null : id
}

function onEndTurnClick() {
  const desc = game._turnActionTaken
    ? '전략 턴을 종료할까요?'
    : '이번 턴에는 전략 활동 이력이 없습니다. 전략 턴을 종료할까요?'
  game.openModal('event', {
    title: '턴 종료',
    desc,
    buttons: [
      { label: '취소',   cls: 'btn' },
      { label: '턴종료', cls: 'btn-gold', action: () => game.endTurn() },
    ],
  })
}
</script>

<style scoped>
.strategy-bar {
  position: fixed; left: 0; right: 0; bottom: 0; z-index: 1500;
  display: flex; align-items: stretch;
  height: var(--bar-h);
  background: linear-gradient(165deg, #0d1b2a 0%, #0a0f1c 60%, #060a10 100%);
  border-top: 2px solid rgba(212,170,96,.55);
  box-shadow:
    0 -1px 0 rgba(212,170,96,.1),
    0 -8px 32px rgba(0,0,0,.85),
    inset 0 1px 0 rgba(212,170,96,.08);
}

.cat-area {
  flex: 1; display: flex; flex-direction: column; min-width: 0;
}

.cat-row {
  flex: 1; display: flex;
}
.cat-row:first-child {
  border-bottom: 1px solid rgba(212,170,96,.1);
}

.cat-btn {
  flex: 1; padding: 0;
  position: relative; overflow: hidden;
  background: none; border: none;
  border-right: 1px solid rgba(212,170,96,.08);
  color: rgba(255,255,255,.75);
  font-size: clamp(14px, 2.4vh, 22px); font-family: var(--font-serif);
  letter-spacing: .6px;
  cursor: pointer;
  transition: color .18s, background .18s, box-shadow .18s;
  white-space: nowrap;
}
.cat-btn:last-child { border-right: none; }

/* 격자 패턴 오버레이 (카드 스타일 참조) */
.cat-btn::before {
  content: '';
  position: absolute; inset: 0; pointer-events: none;
  background-image:
    repeating-linear-gradient( 45deg, transparent, transparent 10px, rgba(212,170,96,.025) 10px, rgba(212,170,96,.025) 11px),
    repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(212,170,96,.025) 10px, rgba(212,170,96,.025) 11px);
  opacity: 0; transition: opacity .2s;
}
.cat-btn.on::before { opacity: 1; }

.cat-btn:hover {
  color: rgba(255,255,255,.95);
  background: rgba(212,170,96,.04);
}
.cat-btn.on {
  color: var(--tg);
  background: linear-gradient(180deg, rgba(13,27,42,.9) 0%, rgba(8,12,20,.8) 100%);
  box-shadow:
    inset 0 2px 0 rgba(212,170,96,.9),
    inset 0 0 24px rgba(212,170,96,.06);
  text-shadow: 0 0 12px rgba(212,170,96,.5);
}

/* 턴 종료 */
.end-btn {
  flex-shrink: 0; padding: 0 22px;
  position: relative; overflow: hidden;
  border-radius: 0;
  border-left: 2px solid rgba(212,170,96,.4);
  font-size: clamp(12px, 2vh, 20px); font-family: var(--font-serif);
  letter-spacing: 1.5px; align-self: stretch;
  color: var(--fc);
  background: linear-gradient(180deg, rgba(13,27,42,.6) 0%, transparent 100%);
  transition: all .18s;
}
.end-btn::before {
  content: '';
  position: absolute; inset: 0; pointer-events: none;
  background-image:
    repeating-linear-gradient( 45deg, transparent, transparent 10px, rgba(212,170,96,.015) 10px, rgba(212,170,96,.015) 11px),
    repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(212,170,96,.015) 10px, rgba(212,170,96,.015) 11px);
}
.end-btn::after {
  content: '';
  position: absolute; inset: 0;
  background: var(--fc); opacity: 0;
  transition: opacity .18s;
}
.end-btn:hover { text-shadow: 0 0 12px var(--fc); }
.end-btn:hover::after { opacity: .08; }
.end-btn:active::after { opacity: .18; }

@media (orientation:landscape) and (max-height:480px) {
  .end-btn { padding: 0 14px; }
}
</style>
