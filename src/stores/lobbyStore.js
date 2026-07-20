import { defineStore } from 'pinia'
import { SCENARIOS } from '@/data/scenario/scenarioData.js'
import { useAuthStore } from '@/stores/authStore'

const UNLOCK_KEY = 'logh_unlocks'

export const useLobbyStore = defineStore('lobby', {
  state: () => ({
    options: { npcAppearance: 'fact', npcBehavior: 'fact', tacticalPhase: 'normal' },
    selectedFaction:  null,
    selectedCharCode: null,
    selectedVariant:  null,
    userUnlocks: {
      scenarios:  [],
      characters: [],
    },
  }),

  getters: {
    isScenarioUnlocked: (state) => (scId) => {
      const sc = SCENARIOS.find(s => s.id === scId)
      if (!sc) return false
      if (Number(sc.openPt) === 0) return true
      return state.userUnlocks.scenarios.includes(scId)
    },
  },

  actions: {
    loadUnlocks() {
      try {
        const raw = localStorage.getItem(UNLOCK_KEY)
        if (!raw) return
        const data = JSON.parse(raw)
        if (Array.isArray(data.scenarios))  this.userUnlocks.scenarios  = data.scenarios
        if (Array.isArray(data.characters)) this.userUnlocks.characters = data.characters
      } catch {}
    },

    _saveUnlocks() {
      localStorage.setItem(UNLOCK_KEY, JSON.stringify(this.userUnlocks))
    },

    purchaseScenario(scId) {
      const auth = useAuthStore()
      const sc = SCENARIOS.find(s => s.id === scId)
      if (!sc) return false
      if (sc.openPt === 0 || sc.openPt === '-') return false
      if (typeof sc.openPt !== 'number') return false
      if (auth.points < sc.openPt) return false
      if (this.userUnlocks.scenarios.includes(scId)) return false

      auth.points -= sc.openPt
      this.userUnlocks.scenarios.push(scId)
      this._saveUnlocks()
      return true
    },

    unlockScenarioByAchievement(scId) {
      if (this.userUnlocks.scenarios.includes(scId)) return
      this.userUnlocks.scenarios.push(scId)
      this._saveUnlocks()
    },
  },
})
