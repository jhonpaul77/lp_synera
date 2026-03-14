import { Outlet, useLocation } from '@tanstack/react-router'
import Navbar from './components/Navbar'

export default function App() {
  const location = useLocation()
  const loginPaths = ['/login', '/debug']
  const showNavbar = !loginPaths.includes(location.pathname)

  return (
    <div className="min-h-screen bg-bg text-text">
      {showNavbar && <Navbar />}
      <Outlet />
    </div>
  )
}
