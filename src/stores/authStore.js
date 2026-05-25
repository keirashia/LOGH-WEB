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

    async login(username, password) {
      const res = await fetch('/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: username, userPwd: password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || '로그인에 실패했습니다.')
      this._applyUser(data.user)
      return true
    },

    async register(username, password, email) {
      if (!this.tempCode) this.initTempCode()
      const res = await fetch('/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: username, userPwd: password, uuid: this.tempCode }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || '계정 생성에 실패했습니다.')
      this._applyUser(data.user)
      return true
    },

    // 기기 이전 — 이전 기기에서 발급된 이전 코드로 계정 복구
    async transferAccount(transferCode) {
      // TODO: POST /api/user/transfer (미구현)
      console.log('기기 이전 코드:', transferCode)
      throw new Error('기기 이전 기능은 아직 준비 중입니다.')
    },

    // 이전 코드 발급 (현재 기기에서)
    async generateTransferCode() {
      // TODO: GET /api/user/transfer-code (미구현)
      return 'LOGH-' + Math.random().toString(36).substr(2, 8).toUpperCase()
    },

    _applyUser(u) {
      this.user = {
        id: u.ID,
        username: u.USER_ID,
        email: u.USER_NAME || '',
        isAdmin: u.USER_ID === 'admin',
        points: u.POINT ?? 0,
      }
      this.points = u.POINT ?? 0
      this.token = String(u.ID)
      this.isLoggedIn = true
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
