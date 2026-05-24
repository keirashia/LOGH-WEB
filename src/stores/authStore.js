import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,        // { id, username, email, isAdmin }
    token: null,
    isLoggedIn: false,
    mode: null,        // 'single' | 'multi'
  }),

  getters: {
    isAdmin: s => s.user?.isAdmin ?? false,
    username: s => s.user?.username ?? '게스트',
  },

  actions: {
    // 로그인 (Phase3에서 API 연동)
    async login(username, password) {
      // TODO: POST /api/auth/login
      this.user = { id: 1, username, email: '', isAdmin: username === 'admin' }
      this.token = 'mock-token'
      this.isLoggedIn = true
      return true
    },

    // 계정 생성
    async register(username, password, email) {
      // TODO: POST /api/auth/register
      this.user = { id: Date.now(), username, email, isAdmin: false }
      this.token = 'mock-token'
      this.isLoggedIn = true
      return true
    },

    // 기기 이전 — 이전 기기에서 발급된 이전 코드로 계정 복구
    async transferAccount(transferCode) {
      // TODO: POST /api/auth/transfer
      console.log('기기 이전 코드:', transferCode)
      return true
    },

    // 이전 코드 발급 (현재 기기에서)
    async generateTransferCode() {
      // TODO: GET /api/auth/transfer-code
      return 'LOGH-' + Math.random().toString(36).substr(2, 8).toUpperCase()
    },

    logout() {
      this.user = null
      this.token = null
      this.isLoggedIn = false
      this.mode = null
    },

    setMode(mode) {
      this.mode = mode
    },
  },
})