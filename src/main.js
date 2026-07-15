import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index.js'
import './assets/global.css'
import { useAuthStore } from '@/stores/authStore'
import { useLobbyStore } from '@/stores/lobbyStore'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia).use(router).mount('#app')

const auth = useAuthStore()
auth.initLang()
auth.initTempCode()
useLobbyStore().loadUnlocks()
