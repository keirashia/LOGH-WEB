import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index.js'
import './assets/global.css'
import { useAuthStore } from '@/stores/authStore'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia).use(router).mount('#app')

useAuthStore().initTempCode()
