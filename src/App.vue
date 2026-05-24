<template>
  <AppHeader />
  <div class="app-body">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import AppHeader from '@/components/ui/AppHeader.vue'
</script>

<style>
.app-body { flex: 1; overflow: hidden; display: flex; flex-direction: column; }
</style>
