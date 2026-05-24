import { defineStore } from 'pinia'

export const useSeasonStore = defineStore('season', {
  state: () => ({
    seasons: [
      {
        id: 1, name: '1기',
        startDate: '2026-01-01',
        endDate: null,
        status: 'active',   // 'active' | 'ended'
        winner: null,
      },
    ],
    currentSeasonId: 1,
  }),

  getters: {
    currentSeason: s => s.seasons.find(s2 => s2.id === s.currentSeasonId),
    activeSeason:  s => s.seasons.find(s2 => s2.status === 'active'),
    history:       s => s.seasons.filter(s2 => s2.status === 'ended'),
  },

  actions: {
    async fetchSeasons() {
      // TODO: GET /api/seasons
    },
  },
})