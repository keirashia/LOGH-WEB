import { defineStore } from 'pinia'

export const useWsStore = defineStore('ws', {
  state: () => ({
    socket: null,
    connected: false,
    roomId: null,
    players: [],       // [{ userId, username, faction, ready }]
    ping: null,
  }),

  getters: {
    isConnected: s => s.connected,
    playerCount: s => s.players.length,
  },

  actions: {
    // Phase3에서 구현
    connect(roomId) {
      // TODO: new WebSocket(`ws://api/ws/room/${roomId}`)
      console.log('[WS] connect placeholder:', roomId)
    },
    disconnect() {
      if (this.socket) this.socket.close()
      this.connected = false
      this.roomId = null
      this.players = []
    },
    sendAction(action) {
      // TODO: this.socket.send(JSON.stringify(action))
      console.log('[WS] sendAction placeholder:', action)
    },
  },
})