import { createRouter, createWebHashHistory } from 'vue-router'
import { useGameStore } from '@/stores/gameStore'

const routes = [
  {
    path: '/',
    name: 'title',
    component: () => import('@/views/title/TitleView.vue'),
  },
  {
    path: '/lobby',
    name: 'lobby',
    component: () => import('@/views/lobby/LobbyView.vue'),
  },
  {
    path: '/lobby/single',
    name: 'single',
    component: () => import('@/views/lobby/SingleView.vue'),
  },
  {
    path: '/lobby/encyclopedia',
    name: 'encyclopedia-menu',
    component: () => import('@/views/lobby/EncyclopediaMenuView.vue'),
  },
  {
    path: '/lobby/single/new',
    name: 'scenario-select',
    component: () => import('@/views/lobby/scenario/ScenarioSelectView.vue'),
  },
  {
    path: '/lobby/single/new/:scId',
    name: 'scenario-detail',
    component: () => import('@/views/lobby/scenario/ScenarioDetailView.vue'),
  },
  {
    path: '/lobby/single/new/:scId/options',
    name: 'scenario-options',
    component: () => import('@/views/lobby/scenario/ScenarioOptionsView.vue'),
  },
  {
    path: '/lobby/single/new/:scId/char',
    name: 'scenario-char',
    component: () => import('@/views/lobby/scenario/ScenarioCharSelectView.vue'),
  },
  {
    path: '/user/login',
    name: 'login',
    component: () => import('@/views/user/LoginView.vue'),
  },
  {
    path: '/user/register',
    name: 'register',
    component: () => import('@/views/user/RegisterView.vue'),
  },
  {
    path: '/user/profile',
    name: 'profile',
    component: () => import('@/views/user/UserProfileView.vue'),
  },
  {
    path: '/game',
    name: 'game',
    component: () => import('@/views/game/GameView.vue'),
    beforeEnter: () => {
      const s = useGameStore()
      if (!s.initialized) return { name: 'title' }
    },
  },
  {
    path: '/game/tactical',
    name: 'tactical',
    component: () => import('@/views/game/TacticalView.vue'),
  },
  {
    path: '/tutorial',
    name: 'tutorial',
    component: () => import('@/views/tutorial/TutorialView.vue'),
  },
  {
    path: '/encyclopedia',
    name: 'encyclopedia',
    component: () => import('@/views/encyclopedia/EncyclopediaView.vue'),
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/admin/AdminView.vue'),
    meta: { requiresAdmin: true },
  },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})
