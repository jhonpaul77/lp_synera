import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from './Button'

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 h-16 bg-black/40 backdrop-blur-[20px] border-b border-border">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan to-cyan/70 flex items-center justify-center font-bold text-xs text-white">
          SY
        </div>
        <span className="text-lg font-bold tracking-tight text-white">SYNERA</span>
      </div>

      <div className="flex items-center gap-2">
        {location.pathname !== '/' && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
          >
            ← Back
          </Button>
        )}
        {location.pathname === '/agreement' && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/registrasi')}
          >
            Edit
          </Button>
        )}
      </div>

      <div className="flex items-center gap-3">
        {(location.pathname === '/' || location.pathname === '') && (
          <>
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 rounded-lg border border-border text-text-2 text-xs font-semibold hover:border-border-2 hover:text-text transition-colors"
            >
              Login
            </button>
            <Button
              size="sm"
              onClick={() => navigate('/registrasi')}
              className="bg-cyan text-bg"
            >
              Daftar
            </Button>
          </>
        )}
      </div>
    </nav>
  )
}
