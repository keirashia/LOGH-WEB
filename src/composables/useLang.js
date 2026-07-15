import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/authStore'

export function useLang() {
  const { lang } = storeToRefs(useAuthStore())
  return { lang }
}
