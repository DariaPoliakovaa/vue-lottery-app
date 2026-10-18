import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { ServiceProvider } from '@/shared/api'
import type { AuthService } from '@/entities/session'
import type { AuthResponse, LoginCredentials } from '@/entities/session/model/types'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<Partial<AuthResponse> | null>(null)
  const accessToken = ref<string | null>(null)
  const refreshToken = ref<string | null>(null)
  const router = useRouter()

  const isAuthenticated = computed(() => !!accessToken.value)

  async function login(credentials: LoginCredentials) {
    const authService = () => ServiceProvider.get<AuthService>('auth')
    const data = await authService().login(credentials)
    
    user.value = data
    accessToken.value = data.accessToken
    refreshToken.value = data.refreshToken
  }

  function logout() {
    user.value = null
    accessToken.value = null
    refreshToken.value = null
    
    router.push('/login')
  }

  return { user, accessToken, refreshToken, isAuthenticated, login, logout }
}, {
  persist: true 
})
