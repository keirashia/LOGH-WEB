import { defineStore } from 'pinia'

export const useEncyclopediaStore = defineStore('encyclopedia', {
  state: () => ({
    // 팝업 제어
    popType: null,       // 'char' | 'star' | 'ship' | null
    chaCode: null,       // 현재 열린 인물 코드 (null = 목록)
    scenarioId: null,    // 고정 시나리오 (null = 탭 표시)
    searchQuery: '',
    // 레거시 (인게임 오버레이용)
    isOpen: false,
    activeTab: 'characters',
  }),

  actions: {
    // open('char')                    → 인물 목록 팝업
    // open('char', 'CH_000064')       → 인물 상세 직접 오픈
    // open('char', 'CH_000064', '796_1') → 시나리오 고정
    // open('star') / open('ship')     → 성계/함선 (추후)
    open(type, code = null, scenarioId = null) {
      const typeMap = { characters: 'char', systems: 'star', ships: 'ship' }
      this.popType = typeMap[type] ?? type
      this.chaCode = code
      this.scenarioId = scenarioId
      this.searchQuery = ''
      this.isOpen = true
      this.activeTab = type
    },
    close() {
      this.popType = null
      this.chaCode = null
      this.scenarioId = null
      this.searchQuery = ''
      this.isOpen = false
    },
    openChar(code, scenarioId = null) {
      this.open('char', code, scenarioId)
    },
  },
})