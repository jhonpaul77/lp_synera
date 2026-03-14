import { redirect } from '@tanstack/react-router'
import { authService } from '../api/authService'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  console.log(`🛡️ [PROTECTED ROUTE] Checking authentication`)
  
  const isAuth = authService.isAuthenticated()
  console.log(`🛡️ [PROTECTED ROUTE] isAuthenticated: ${isAuth}`)
  
  if (!isAuth) {
    console.log(`🛡️ [PROTECTED ROUTE] No token found, redirecting to login`)
    throw redirect({ to: '/login' })
  }

  console.log(`🛡️ [PROTECTED ROUTE] Token found, allowing access to protected route`)
  return <>{children}</>
}
