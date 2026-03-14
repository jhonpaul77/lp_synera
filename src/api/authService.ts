import axiosInstance from './axiosConfig'

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  success: boolean
  message: string
  data: {
    access_token: string
    refresh_token: string
  }
}

export const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    console.log(`🔐 [AUTH SERVICE] login() called with email: ${email}`)
    try {
      console.log(`🔐 [AUTH SERVICE] Making POST request to /auth/login`)
      const response = await axiosInstance.post<LoginResponse>('/auth/login', {
        email,
        password,
      })
      
      console.log(`🔐 [AUTH SERVICE] Got response, checking success flag`)
      if (!response.data.success) {
        console.log(`🔐 [AUTH SERVICE] Success flag is false, throwing error`)
        throw new Error(response.data.message || 'Login failed')
      }
      
      console.log(`🔐 [AUTH SERVICE] Login successful, returning response`)
      return response.data
    } catch (error: any) {
      console.log(`🔐 [AUTH SERVICE] Caught error:`, error)
      // Re-throw error untuk di-handle di component
      if (error.response?.data) {
        console.log(`🔐 [AUTH SERVICE] Re-throwing error.response.data`)
        throw error.response.data
      }
      console.log(`🔐 [AUTH SERVICE] Re-throwing error`)
      throw error
    }
  },

  logout: () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userRole')
    localStorage.removeItem('userRole')
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('access_token')
  },

  getToken: (): string | null => {
    return localStorage.getItem('access_token')
  },

  setTokens: (accessToken: string, refreshToken: string) => {
    localStorage.setItem('access_token', accessToken)
    localStorage.setItem('refresh_token', refreshToken)
  },
}
