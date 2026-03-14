import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { authService } from '../api/authService'

const COLORS = {
  bg: '#09090b',
  bg2: '#0d0d10',
  surface: '#18181b',
  surface2: '#1f1f23',
  border: '#27272a',
  border2: '#3f3f46',
  text: '#fafafa',
  text2: '#a1a1aa',
  text3: '#52525b',
  cyan: '#06b6d4',
  cyan2: '#22d3ee',
  cyanDim: 'rgba(6,182,212,.08)',
  cyanGlow: 'rgba(6,182,212,.3)',
  cyanGlow2: 'rgba(6,182,212,.12)',
  red: '#f87171',
  redDim: 'rgba(248,113,113,.1)',
}

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log(`📝 [LOGIN PAGE] handleSubmit called`)
    setError('')
    setLoading(true)
    
    if (!email || !password) {
      console.log(`📝 [LOGIN PAGE] Email or password empty`)
      setError('Email dan password harus diisi')
      setLoading(false)
      return
    }

    console.log(`📝 [LOGIN PAGE] Calling authService.login() with email: ${email}`)
    try {
      const response = await authService.login(email, password)
      
      console.log(`📝 [LOGIN PAGE] Login response received:`, response)
      if (response.success && response.data?.access_token) {
        console.log(`📝 [LOGIN PAGE] Response successful, saving tokens`)
        // Save tokens
        authService.setTokens(response.data.access_token, response.data.refresh_token)
        
        // Save user info
        localStorage.setItem('userEmail', email)
        localStorage.setItem('userRole', 'admin') // Set default role (TODO: extract from JWT)
        
        setSuccess(true)
        setLoading(false)
        
        console.log(`📝 [LOGIN PAGE] Redirecting to dashboard in 1s`)
        setTimeout(() => {
          navigate({ to: '/dashboard' })
        }, 1000)
      } else {
        console.log(`📝 [LOGIN PAGE] Response not successful`)
        setError('Login gagal: Invalid response dari server')
        setLoading(false)
      }
    } catch (error: any) {
      console.error('📝 [LOGIN PAGE] Login error:', error)
      
      // IMPORTANT: Clear any old tokens on failed login
      console.log(`📝 [LOGIN PAGE] Clearing tokens due to failed login`)
      authService.logout()
      
      // Handle error response
      const errorMessage = 
        error.message || 
        error.data?.message || 
        'Email atau password salah. Silakan coba lagi.'
      
      console.log(`📝 [LOGIN PAGE] Displaying error message:`, errorMessage)
      setError(errorMessage)
      setLoading(false)
    }
  }

  const handleSSOProvider = (provider: string) => {
    if (provider === 'SSO') {
      alert('SSO Corporate belum dikonfigurasi.\nHubungi administrator sistem Anda.')
      return
    }
    setSuccess(true)
    setTimeout(() => {
      navigate({ to: '/registrasi' })
    }, 3000)
  }

  return (
    <>
      <style>{`
        @keyframes gridShift {
          from { background-position: 0 0; }
          to { background-position: 48px 48px; }
        }
        @keyframes orbFloat1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, 20px); }
        }
        @keyframes orbFloat2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-20px, -30px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-6px); }
          40%, 80% { transform: translateX(6px); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes logoPop {
          from { transform: scale(0.5); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes progressFill {
          from { width: 0; }
          to { width: 100%; }
        }
        @media (max-width: 768px) {
          #leftPanel { display: none !important; }
          #rightPanel { width: 100% !important; padding: 1.5rem 1rem !important; }
        }
      `}</style>

      <div style={{ backgroundColor: COLORS.bg, display: 'flex', height: '100vh', overflow: 'hidden', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {/* LEFT PANEL */}
        <div id="leftPanel" style={{ flex: 1, backgroundColor: COLORS.bg2, borderRight: `1px solid ${COLORS.border}`, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '2.5rem' }}>
          {/* Grid Background */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(6,182,212,.06) 1px,transparent 1px), linear-gradient(90deg,rgba(6,182,212,.06) 1px,transparent 1px)`, backgroundSize: '48px 48px', animation: 'gridShift 20s linear infinite' }}></div>
          <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 80% 80% at 30% 40%,transparent 20%,${COLORS.bg2} 80%)` }}></div>

          {/* Orbs */}
          <div style={{ position: 'absolute', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none', width: '400px', height: '400px', background: 'rgba(6,182,212,.12)', top: '-80px', left: '-80px', animation: 'orbFloat1 8s ease-in-out infinite' }}></div>
          <div style={{ position: 'absolute', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none', width: '300px', height: '300px', background: 'rgba(99,102,241,.08)', bottom: '-60px', right: '60px', animation: 'orbFloat2 10s ease-in-out infinite' }}></div>

          {/* Left Content */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: 'auto', cursor: 'pointer' }} onClick={() => navigate({ to: '/' })}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, #06b6d4, #0891b2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 900, color: '#fff', boxShadow: '0 0 20px rgba(6,182,212,.35)' }}>
                SY
              </div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
                SYNERA
              </div>
            </div>
          </div>

          {/* Hero Area */}
          <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2rem 0' }}>
            {/* Hero Tag */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', background: COLORS.cyanDim, border: `1px solid rgba(6,182,212,.2)`, color: COLORS.cyan, fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.35rem 0.85rem', borderRadius: '100px', marginBottom: '1.5rem', width: 'fit-content' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: COLORS.cyan, animation: 'pulse 2s infinite' }}></span>
              Integrated Business Management
            </div>

            {/* Hero Title */}
            <h1 style={{ fontSize: 'clamp(2rem,3.5vw,3rem)', fontWeight: 800, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.035em', marginBottom: '1.1rem' }}>
              Satu Platform.{' '}
              <span style={{ background: 'linear-gradient(135deg, #06b6d4, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Semua Terkendali.
              </span>
            </h1>

            {/* Hero Subtitle */}
            <p style={{ fontSize: '0.9rem', color: COLORS.text2, lineHeight: 1.7, maxWidth: '380px', marginBottom: '2.5rem' }}>
              Kelola operasional bisnis Anda — dari sales, inventory, keuangan, hingga CRM — dalam satu sistem terintegrasi yang terhubung penuh.
            </p>

            {/* Features */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[
                { icon: '📊', title: 'Laporan Keuangan Otomatis', desc: 'Laba rugi & neraca real-time' },
                { icon: '📦', title: 'Inventory Real-Time', desc: 'Stok akurat di semua lokasi' },
                { icon: '🛒', title: 'Marketplace Integration', desc: 'Terhubung ke semua platform' },
              ].map((feat, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(255,255,255,.03)', border: `1px solid ${COLORS.border}`, borderRadius: '12px', padding: '0.75rem 1rem', transition: 'border-color .2s, background .2s', animation: `slideUp .5s ease both`, animationDelay: `${0.1 + i * 0.1}s`, cursor: 'pointer' }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(6,182,212,.2)'; (e.currentTarget as HTMLElement).style.background = 'rgba(6,182,212,.04)' }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = COLORS.border; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,.03)' }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '9px', background: COLORS.cyanDim, border: `1px solid rgba(6,182,212,.15)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', flexShrink: 0 }}>
                    {feat.icon}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff', marginBottom: '0.1rem' }}>
                      {feat.title}
                    </h4>
                    <p style={{ fontSize: '0.74rem', color: COLORS.text3, lineHeight: 1.4 }}>
                      {feat.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Left Footer */}
          <div style={{ position: 'relative', zIndex: 1, fontSize: '0.72rem', color: COLORS.text3, borderTop: `1px solid ${COLORS.border}`, paddingTop: '1.25rem', marginTop: 'auto' }}>
            © 2026 SYNERA · Integrated Business Management System
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div id="rightPanel" style={{ width: '440px', flexShrink: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '3rem 2.75rem', backgroundColor: COLORS.bg, overflowY: 'auto', position: 'relative' }}>
          {/* Form Header */}
          <div style={{ marginBottom: '2rem', animation: 'slideUp .45s .1s both' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.025em', marginBottom: '0.35rem' }}>
              Selamat Datang
            </h2>
            <p style={{ fontSize: '0.85rem', color: COLORS.text2, lineHeight: 1.6 }}>
              Masuk ke akun SYNERA Anda untuk mengakses sistem manajemen bisnis.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div style={{ background: COLORS.redDim, border: `1px solid rgba(248,113,113,.2)`, borderRadius: '8px', padding: '0.65rem 0.9rem', fontSize: '0.8rem', color: COLORS.red, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ width: '14px', height: '14px', flexShrink: 0 }}>
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} autoComplete="off" style={{ animation: error ? 'shake .4s ease' : 'none' }}>
            {/* Email Field */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '1.1rem', animation: 'slideUp .45s .15s both' }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 600, color: COLORS.text2 }}>
                Email
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: COLORS.text3, display: 'flex', pointerEvents: 'none' }}>
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" style={{ width: '16px', height: '16px' }}>
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError('') }}
                  placeholder="email@perusahaan.com"
                  autoComplete="email"
                  required
                  style={{ width: '100%', background: COLORS.surface, border: `1px solid ${COLORS.border2}`, borderRadius: '10px', padding: '0.75rem 0.9rem 0.75rem 2.6rem', fontFamily: 'inherit', fontSize: '0.88rem', color: COLORS.text, outline: 'none', transition: 'border-color .2s, box-shadow .2s, background .2s' }}
                  onFocus={e => { e.currentTarget.style.borderColor = COLORS.cyan; e.currentTarget.style.boxShadow = `0 0 0 3px ${COLORS.cyanGlow2}`; e.currentTarget.style.background = COLORS.surface2 }}
                  onBlur={e => { e.currentTarget.style.borderColor = COLORS.border2; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = COLORS.surface }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '1.1rem', animation: 'slideUp .45s .2s both' }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 600, color: COLORS.text2 }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: COLORS.text3, display: 'flex', pointerEvents: 'none' }}>
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" style={{ width: '16px', height: '16px' }}>
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError('') }}
                  placeholder="Masukkan password"
                  autoComplete="current-password"
                  required
                  style={{ width: '100%', background: COLORS.surface, border: `1px solid ${COLORS.border2}`, borderRadius: '10px', padding: '0.75rem 0.9rem 0.75rem 2.6rem', paddingRight: '2.6rem', fontFamily: 'inherit', fontSize: '0.88rem', color: COLORS.text, outline: 'none', transition: 'border-color .2s, box-shadow .2s, background .2s' }}
                  onFocus={e => { e.currentTarget.style.borderColor = COLORS.cyan; e.currentTarget.style.boxShadow = `0 0 0 3px ${COLORS.cyanGlow2}`; e.currentTarget.style.background = COLORS.surface2 }}
                  onBlur={e => { e.currentTarget.style.borderColor = COLORS.border2; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = COLORS.surface }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '0.85rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: COLORS.text3, display: 'flex', padding: 0, transition: 'color .2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = COLORS.text2)}
                  onMouseLeave={e => (e.currentTarget.style.color = COLORS.text3)}
                >
                  {showPassword ? (
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" style={{ width: '16px', height: '16px' }}>
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" style={{ width: '16px', height: '16px' }}>
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Options Row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', animation: 'slideUp .45s .25s both' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={e => setRemember(e.target.checked)}
                  style={{ display: 'none' }}
                />
                <div style={{ width: '16px', height: '16px', borderRadius: '4px', border: `1.5px solid ${COLORS.border2}`, background: remember ? COLORS.cyan : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .18s', flexShrink: 0 }}>
                  {remember && <span style={{ fontSize: '0.6rem', color: COLORS.bg, fontWeight: 900 }}>✓</span>}
                </div>
                <span style={{ fontSize: '0.78rem', color: COLORS.text2 }}>Ingat saya</span>
              </label>
              <a href="#" style={{ fontSize: '0.78rem', color: COLORS.cyan, textDecoration: 'none', fontWeight: 600, transition: 'color .2s' }} onMouseEnter={e => e.currentTarget.style.color = COLORS.cyan2} onMouseLeave={e => e.currentTarget.style.color = COLORS.cyan}>
                Lupa password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              style={{ width: '100%', background: COLORS.cyan, color: COLORS.bg, fontFamily: 'inherit', fontSize: '0.92rem', fontWeight: 700, border: 'none', borderRadius: '10px', padding: '0.85rem', cursor: loading ? 'not-allowed' : 'pointer', transition: 'all .2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', letterSpacing: '-0.01em', position: 'relative', overflow: 'hidden', opacity: loading ? 0.8 : 1, animation: 'slideUp .45s .3s both' }}
              onMouseEnter={e => !loading && ((e.currentTarget.style.background = COLORS.cyan2), (e.currentTarget.style.boxShadow = `0 10px 28px ${COLORS.cyanGlow}`), (e.currentTarget.style.transform = 'translateY(-1px)'))}
              onMouseLeave={e => !loading && ((e.currentTarget.style.background = COLORS.cyan), (e.currentTarget.style.boxShadow = 'none'), (e.currentTarget.style.transform = 'translateY(0)'))}
            >
              {loading && (
                <div style={{ width: '16px', height: '16px', border: `2px solid rgba(0,0,0,.3)`, borderTopColor: COLORS.bg, borderRadius: '50%', animation: 'spin .6s linear infinite' }} />
              )}
              {!loading && 'Masuk ke SYNERA →'}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '1.5rem 0', animation: 'slideUp .45s .35s both' }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: COLORS.border }}></div>
            <span style={{ fontSize: '0.72rem', color: COLORS.text3, fontWeight: 500, whiteSpace: 'nowrap' }}>atau masuk dengan</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: COLORS.border }}></div>
          </div>

          {/* SSO Buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.6rem', animation: 'slideUp .45s .4s both' }}>
            <button
              onClick={() => handleSSOProvider('Google')}
              style={{ background: COLORS.surface, border: `1px solid ${COLORS.border2}`, borderRadius: '10px', padding: '0.7rem 0.5rem', fontFamily: 'inherit', fontSize: '0.8rem', fontWeight: 600, color: COLORS.text2, cursor: 'pointer', transition: 'all .2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', whiteSpace: 'nowrap' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = COLORS.text; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(0,0,0,.3)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(66,133,244,.4)'; (e.currentTarget as HTMLElement).style.background = 'rgba(66,133,244,.06)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = COLORS.text2; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.borderColor = COLORS.border2; (e.currentTarget as HTMLElement).style.background = COLORS.surface }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span>Google</span>
            </button>

            <button
              onClick={() => handleSSOProvider('Facebook')}
              style={{ background: COLORS.surface, border: `1px solid ${COLORS.border2}`, borderRadius: '10px', padding: '0.7rem 0.5rem', fontFamily: 'inherit', fontSize: '0.8rem', fontWeight: 600, color: COLORS.text2, cursor: 'pointer', transition: 'all .2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', whiteSpace: 'nowrap' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = COLORS.text; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(0,0,0,.3)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(24,119,242,.4)'; (e.currentTarget as HTMLElement).style.background = 'rgba(24,119,242,.06)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = COLORS.text2; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.borderColor = COLORS.border2; (e.currentTarget as HTMLElement).style.background = COLORS.surface }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2" />
              </svg>
              <span>Facebook</span>
            </button>

            <button
              onClick={() => handleSSOProvider('SSO')}
              style={{ background: COLORS.surface, border: `1px solid ${COLORS.border2}`, borderRadius: '10px', padding: '0.7rem 0.5rem', fontFamily: 'inherit', fontSize: '0.8rem', fontWeight: 600, color: COLORS.text2, cursor: 'pointer', transition: 'all .2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', whiteSpace: 'nowrap' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = COLORS.cyan; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(0,0,0,.3)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(6,182,212,.3)'; (e.currentTarget as HTMLElement).style.background = COLORS.cyanDim }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = COLORS.text2; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.borderColor = COLORS.border2; (e.currentTarget as HTMLElement).style.background = COLORS.surface }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8M12 17v4" />
              </svg>
              <span>SSO</span>
            </button>
          </div>

          {/* Footer */}
          <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: `1px solid ${COLORS.border}`, textAlign: 'center', fontSize: '0.72rem', color: COLORS.text3, lineHeight: 1.6 }}>
            Dengan masuk, Anda menyetujui{' '}
            <a href="#" style={{ color: COLORS.cyan, textDecoration: 'none' }}>
              Syarat Layanan
            </a>
            {' '}dan{' '}
            <a href="#" style={{ color: COLORS.cyan, textDecoration: 'none' }}>
              Kebijakan Privasi
            </a>
            {' '}SYNERA.<br />
            Butuh akun? Hubungi administrator sistem Anda.
          </div>
        </div>

        {/* Success Overlay */}
        {success && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 999, background: COLORS.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 1, pointerEvents: 'all', textAlign: 'center', padding: '2rem' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'linear-gradient(135deg, #06b6d4, #0891b2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 900, color: '#fff', margin: '0 auto 1.5rem', boxShadow: '0 0 40px rgba(6,182,212,.4)', animation: 'logoPop .5s cubic-bezier(.34,1.56,.64,1) both' }}>
              SY
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: '0.4rem' }}>
              Login Berhasil!
            </div>
            <div style={{ fontSize: '0.85rem', color: COLORS.text2, marginBottom: '1.5rem' }}>
              Mengarahkan ke dashboard SYNERA...
            </div>
            <div style={{ width: '200px', height: '3px', background: COLORS.border, borderRadius: '100px', overflow: 'hidden' }}>
              <div style={{ height: '100%', background: COLORS.cyan, borderRadius: '100px', animation: 'progressFill 1.5s ease forwards' }}></div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}