import { defineStore } from 'pinia'
import { CHARACTERS, STAR_SYSTEMS, FACTIONS } from '@/data/masterData'

export const useEncyclopediaStore = defineStore('encyclopedia', {
  state: () => ({
    activeTab: 'characters',   // characters | ships | systems | politics | traits | skills
    activeSubTab: null,
    searchQuery: '',
    isOpen: false,             // 인게임 오버레이 여부
  }),

  getters: {
    // 인물 목록
    characters: () => Object.values(CHARACTERS),

    filteredCharacters: s => {
      const q = s.searchQuery.toLowerCase()
      return Object.values(CHARACTERS).filter(c =>
        !q || c.name.toLowerCase().includes(q) || c.rank.toLowerCase().includes(q)
      )
    },

    // 성계 목록
    systems: () => STAR_SYSTEMS,

    filteredSystems: s => {
      const q = s.searchQuery.toLowerCase()
      return STAR_SYSTEMS.filter(sys =>
        !q || sys.name.toLowerCase().includes(q)
      )
    },
  },

  actions: {
    open(tab = 'characters') {
      this.isOpen = true
      this.activeTab = tab
    },
    close() {
      this.isOpen = false
      this.searchQuery = ''
    },
    setTab(tab) {
      this.activeTab = tab
      this.activeSubTab = null
      this.searchQuery = ''
    },
  },
})