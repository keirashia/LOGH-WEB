<template>
  <CardSliderLayout
    title="싱글플레이"
    :cards="CARDS"
    back-to="/lobby"
    back-label="메뉴"
    :star-count="220"
    :neb-colors="['rgba(41,128,185,', 'rgba(100,50,180,']"
  />
</template>

<script setup>
import { useRouter } from 'vue-router'
import CardSliderLayout from '@/components/common/CardSliderLayout.vue'

const router = useRouter()

const CARDS = [
  { icon: '🌟', title: '새 게임',   desc: 'New Game',   abbr: 'NEW', action: () => router.push('/lobby/single/new') },
  { icon: '▶️',  title: '계속하기', desc: 'Continue',   abbr: 'CNT', disabled: true },
  { icon: '💾',  title: '불러오기', desc: 'Load Game',  abbr: 'SLD', disabled: true },
]
</script>
