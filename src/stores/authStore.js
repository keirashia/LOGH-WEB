import { defineStore } from 'pinia'

const STORAGE_KEY = 'logh_temp_code'

function generateTempCode() {
  const bytes = new Uint8Array(32) // 32 bytes = 64 hex chars
  crypto.getRandomValues(bytes)
  return Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('')
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,        // { id, username, email, isAdmin }
    token: null,
    isLoggedIn: false,
    mode: null,        // 'single' | 'multi'
    tempCode: null,    // 64자리 hex, localStorage 연동
    points: 0,         // 유저 계정 포인트
  }),

  getters: {
    isAdmin: s => s.user?.isAdmin ?? false,
    username: s => s.isLoggedIn
      ? (s.user?.username ?? '게스트')
      : `사용자_${(s.tempCode ?? '').slice(0, 8)}`,
  },

  actions: {
    // 앱 시작 시 호출 — localStorage에 코드가 있으면 재사용, 없으면 신규 생성
    initTempCode() {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored && stored.length === 64) {
        this.tempCode = stored
        console.log('[LOGH] tempCode 불러옴:', stored.slice(0, 8) + '...')
      } else {
        const code = generateTempCode()
        localStorage.setItem(STORAGE_KEY, code)
        this.tempCode = code
        console.log('[LOGH] tempCode 신규 생성:', code.slice(0, 8) + '...')
      }
    },

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
      // tempCode, points는 유지
    },

    setMode(mode) {
      this.mode = mode
    },
  },
})
