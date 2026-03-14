import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

console.log('🔧 [AXIOS CONFIG] Initializing axios instance')
console.log('🔧 [AXIOS CONFIG] VITE_API_URL env var:', import.meta.env.VITE_API_URL)
console.log('🔧 [AXIOS CONFIG] Final BACKEND_URL:', BACKEND_URL)

const instance = axios.create({
  baseURL: BACKEND_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

console.log('🔧 [AXIOS CONFIG] Instance created with baseURL:', instance.defaults.baseURL)

// Add token to requests if available
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  console.log(`🔄 [AXIOS] REQUEST: ${config.method?.toUpperCase()} ${config.url}`)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
    console.log(`🔄 [AXIOS] Token attached (${token.substring(0, 20)}...)`)
  } else {
    console.log(`🔄 [AXIOS] No token in localStorage`)
  }
  return config
})

// Handle 401 responses - but NOT for login endpoint
instance.interceptors.response.use(
  (response) => {
    console.log(`✅ [AXIOS] RESPONSE: ${response.status} from ${response.config.url}`)
    return response
  },
  (error) => {
    console.log(`❌ [AXIOS] ERROR: ${error.response?.status || 'No status'} from ${error.config?.url}`)
    
    // Don't auto-redirect for login endpoint
    if (error.config?.url?.includes('/auth/login')) {
      console.log(`❌ [AXIOS] Login endpoint error - not auto-redirecting`)
      return Promise.reject(error)
    }

    if (error.response?.status === 401) {
      console.log(`❌ [AXIOS] Got 401 - clearing tokens and redirecting`)
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('userEmail')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default instance
