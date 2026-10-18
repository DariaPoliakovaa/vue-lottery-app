import { http } from '@/shared/api'
import type { AuthResponse, LoginCredentials } from '@/entities/session/model/types'

export class AuthService {
  login(credentials: LoginCredentials): Promise<AuthResponse> {
    return http<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
  }

  refresh(refreshToken: string): Promise<AuthResponse> {
    return http<AuthResponse>('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken, expiresInMins: 30 }),
    })
  }
}
