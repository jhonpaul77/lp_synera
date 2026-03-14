import { RootRoute, Route, Router, redirect, Outlet, useLocation } from '@tanstack/react-router'
import Navbar from './components/Navbar'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import RegistrasiPage from './pages/RegistrasiPage'
import AgreementPage from './pages/AgreementPage'
import { authService } from './api/authService'

// Root Layout Component
function RootLayout() {
  const location = useLocation()
  const hiddenNavbarPaths = ['/login', '/dashboard', '/dashboard/registrasi', '/dashboard/klien', '/agreement']
  const showNavbar = !hiddenNavbarPaths.includes(location.pathname)

  return (
    <div className="min-h-screen bg-bg text-text">
      {showNavbar && <Navbar />}
      <Outlet />
    </div>
  )
}

// Root route - wraps entire app with layout
const rootRoute = new RootRoute({
  component: RootLayout,
})

// Public routes
const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: IndexPage,
})

const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
})

const registrasiRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/registrasi',
  component: RegistrasiPage,
})

const agreementRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/agreement',
  component: AgreementPage,
})

// Protected route - Dashboard Layout with nested routes
const dashboardRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: DashboardPage,
  beforeLoad: async () => {
    console.log(`🛡️ [ROUTER] Dashboard beforeLoad check`)
    const isAuth = authService.isAuthenticated()
    console.log(`🛡️ [ROUTER] isAuthenticated: ${isAuth}`)
    
    if (!isAuth) {
      console.log(`🛡️ [ROUTER] Not authenticated, redirecting to /login`)
      throw redirect({
        to: '/login',
      })
    }
    
    console.log(`🛡️ [ROUTER] Authentication passed, allowing access`)
  },
})

// Dashboard sub-routes
const dashboardOverviewRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: DashboardPage,
  beforeLoad: async () => {
    const isAuth = authService.isAuthenticated()
    if (!isAuth) throw redirect({ to: '/login' })
  },
})

const dashboardRegistrasiRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/dashboard/registrasi',
  component: DashboardPage,
  beforeLoad: async () => {
    const isAuth = authService.isAuthenticated()
    if (!isAuth) throw redirect({ to: '/login' })
  },
})

const dashboardKlienRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/dashboard/klien',
  component: DashboardPage,
  beforeLoad: async () => {
    const isAuth = authService.isAuthenticated()
    if (!isAuth) throw redirect({ to: '/login' })
  },
})

// Create route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  registrasiRoute,
  agreementRoute,
  dashboardOverviewRoute,
  dashboardRegistrasiRoute,
  dashboardKlienRoute,
])

// Create router
export const router = new Router({
  routeTree,
  defaultNotFoundComponent: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <a href="/" className="text-cyan-500 hover:underline">
          Go back home
        </a>
      </div>
    </div>
  ),
})

// Register router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
