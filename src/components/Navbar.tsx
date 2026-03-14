import { useNavigate, useLocation } from '@tanstack/react-router'
import { Button } from './Button'
import { authService } from '../api/authService'
import { useState } from 'react'

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const isLoggedIn = authService.isAuthenticated()
  const userEmail = localStorage.getItem('userEmail')
  const pathname = location.pathname
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isDashboard = pathname === '/dashboard'

  const handleLogout = () => {
    authService.logout()
    navigate({ to: '/login' })
  }

  // Dashboard Navbar
  if (isDashboard) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-[20px] border-b border-border">
        <div className="flex items-center justify-between px-4 md:px-10 h-16 gap-4">
          {/* Logo + Title */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate({ to: '/' })}>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan to-cyan/70 flex items-center justify-center font-bold text-xs text-white">
                SY
              </div>
              <span className="text-lg font-bold tracking-tight text-white hidden sm:inline">SYNERA</span>
            </div>
            <div className="hidden md:inline text-text-2">|</div>
            <span className="hidden md:inline text-sm font-semibold text-text-2">Dashboard</span>
          </div>

          {/* Spacer */}
          <div className="flex-1"></div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-text-2 hover:text-text transition-colors"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown - Dashboard */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 py-3 border-t border-border bg-black/60">
            <div className="flex flex-col gap-3">
              <div className="text-xs text-text-2 px-3 py-2 rounded-lg border border-border">
                {userEmail}
              </div>
              <Button
                size="sm"
                onClick={() => {
                  handleLogout()
                  setMobileMenuOpen(false)
                }}
                className="bg-red-500 text-white w-full"
              >
                Logout
              </Button>
            </div>
          </div>
        )}
      </nav>
    )
  }

  // Home/Public Navbar
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-[20px] border-b border-border">
      <div className="flex items-center justify-between px-4 md:px-10 h-16">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate({ to: '/' })}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan to-cyan/70 flex items-center justify-center font-bold text-xs text-white">
            SY
          </div>
          <span className="text-lg font-bold tracking-tight text-white hidden sm:inline">SYNERA</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium absolute left-1/2 -translate-x-1/2">
          <button className="text-text-2 hover:text-text transition-colors">Solusi</button>
          <button className="text-text-2 hover:text-text transition-colors">Product</button>
          <button className="text-text-2 hover:text-text transition-colors">Kontak</button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-text-2 hover:text-text transition-colors ml-auto"
        >
          ☰
        </button>

        {/* Desktop Right Section */}
        <div className="hidden md:flex items-center gap-3">
          {pathname !== '/' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate({ to: '/' })}
            >
              ← Back
            </Button>
          )}
          {pathname === '/agreement' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate({ to: '/registrasi' })}
            >
              Edit
            </Button>
          )}

          {isLoggedIn ? (
            <>
              <div className="text-xs text-text-2 px-3 py-2 rounded-lg border border-border">
                {userEmail}
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleLogout}
                className="text-red-400 hover:text-red-300"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  console.log('🔵 Login button clicked')
                  navigate({ to: '/login' })
                }}
                className="px-4 py-2 rounded-lg border border-border text-text-2 text-xs font-semibold hover:border-border-2 hover:text-text transition-colors"
              >
                Login
              </button>
              <Button
                size="sm"
                onClick={() => {
                  console.log('🔵 Daftar button clicked')
                  navigate({ to: '/registrasi' })
                }}
                className="bg-cyan text-bg"
              >
                Daftar
              </Button>
            </>
          )}
        </div>

        {/* Mobile Right Section */}
        <div className="md:hidden flex items-center gap-2">
          {isLoggedIn && (
            <Button
              size="sm"
              variant="ghost"
              onClick={handleLogout}
              className="text-red-400 hover:text-red-300 text-xs"
            >
              Logout
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 py-3 border-t border-border bg-black/60">
          <div className="flex flex-col gap-3">
            <button className="text-text-2 hover:text-text transition-colors text-sm text-left">Solusi</button>
            <button className="text-text-2 hover:text-text transition-colors text-sm text-left">Product</button>
            <button className="text-text-2 hover:text-text transition-colors text-sm text-left">Kontak</button>

            {!isLoggedIn && (
              <>
                <div className="border-t border-border my-1"></div>
                <button
                  onClick={() => {
                    console.log('🔵 Mobile Login button clicked')
                    navigate({ to: '/login' })
                    setMobileMenuOpen(false)
                  }}
                  className="px-4 py-2 rounded-lg border border-border text-text-2 text-xs font-semibold hover:border-border-2 hover:text-text transition-colors text-left"
                >
                  Login
                </button>
                <Button
                  size="sm"
                  onClick={() => {
                    console.log('🔵 Mobile Daftar button clicked')
                    navigate({ to: '/registrasi' })
                    setMobileMenuOpen(false)
                  }}
                  className="bg-cyan text-bg w-full"
                >
                  Daftar
                </Button>
              </>
            )}

            {pathname !== '/' && (
              <button
                onClick={() => {
                  navigate({ to: '/' })
                  setMobileMenuOpen(false)
                }}
                className="text-text-2 hover:text-text transition-colors text-sm text-left"
              >
                ← Back
              </button>
            )}

            {isLoggedIn && (
              <div className="text-xs text-text-2 px-3 py-2 rounded-lg border border-border mt-2">
                {userEmail}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
