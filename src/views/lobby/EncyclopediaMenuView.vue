<template>
  <CardSliderLayout
    title="사전"
    :cards="CARDS"
    back-to="/lobby"
    back-label="메뉴"
    :star-count="200"
  >
    <EncCharactersPop v-if="enc.popType === 'char'" />
    <EncFactionsPop   v-if="enc.popType === 'faction'" />
    <EncStarMapPop    v-if="enc.popType === 'star'" />
  </CardSliderLayout>
</template>

<script setup>
import { useEncyclopediaStore } from '@/stores/encyclopediaStore'
import CardSliderLayout    from '@/components/common/CardSliderLayout.vue'
import EncCharactersPop   from '@/components/encyclopedia/EncCharactersPop.vue'
import EncFactionsPop     from '@/components/encyclopedia/EncFactionsPop.vue'
import EncStarMapPop      from '@/components/encyclopedia/EncStarMapPop.vue'

const enc = useEncyclopediaStore()

const CARDS = [
  { icon: '👤', title: '인물', desc: 'Characters',  abbr: 'CHR', action: () => enc.open('char')    },
  { icon: '🏛️', title: '세력', desc: 'Factions',    abbr: 'FAC', action: () => enc.open('faction') },
  { icon: '🌌', title: '성계', desc: 'Star Systems', abbr: 'STR', action: () => enc.open('star')    },
  { icon: '🚀', title: '함선', desc: 'Fleet',        abbr: 'FLT', disabled: true },
  { icon: '📚', title: '용어', desc: 'Glossary',     abbr: 'GLO', disabled: true },
]
</script>
