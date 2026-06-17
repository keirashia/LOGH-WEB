import { defineStore } from 'pinia'

export const useLobbyStore = defineStore('lobby', {
  state: () => ({
    options: { npcAppearance: 'fact', npcBehavior: 'fact' },
    selectedFaction: null,
    selectedCharCode: null,
    selectedVariant: null,
  }),
})
