import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from '@tanstack/react-router'
import { registrationService, Registration } from '../api/registrationService'
import { customerService, Customer } from '../api/customerService'

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
  green: '#22c55e',
  greenDim: 'rgba(34,197,94,.08)',
  red: '#f87171',
  yellow: '#fbbf24',
  blue: '#60a5fa',
}

export default function DashboardPage() {
  const navigate = useNavigate()
  const location = useLocation()
  
  // Determine current page from URL pathname
  const getPageFromPath = (pathname: string) => {
    if (pathname.includes('/dashboard/registrasi')) return 'registrasi'
    if (pathname.includes('/dashboard/klien')) return 'clients'
    return 'overview'
  }
  
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [currentPage, setCurrentPage] = useState(getPageFromPath(location.pathname))
  const [currentRegTab, setCurrentRegTab] = useState('open')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedClient, setSelectedClient] = useState<any>(null)
  const [selectedRegs, setSelectedRegs] = useState<string[]>([])
  const userRole = localStorage.getItem('userRole') || 'admin'

  // Fetch registrations and customers from API on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [regsResponse, customersResponse] = await Promise.all([
          registrationService.getRegistrations(),
          customerService.getCustomers(),
        ])
        if (regsResponse.success && regsResponse.data) {
          setRegistrations(regsResponse.data)
        }
        if (customersResponse.success && customersResponse.data) {
          setCustomers(customersResponse.data)
        }
      } catch (err: any) {
        console.error('Error fetching data:', err)
      }
    }
    fetchData()
  }, [])

  // Update currentPage when URL pathname changes
  useEffect(() => {
    const page = getPageFromPath(location.pathname)
    setCurrentPage(page)
  }, [location.pathname])

  // Handle loading state when switching to registrasi tab
  useEffect(() => {
    if (currentPage === 'registrasi') {
      setLoading(false)
      setError('')
    }
  }, [currentPage])

  const updateApprovalStatus = async (regId: string, newStatus: 'release' | 'open') => {
    try {
      const response = await registrationService.updateApprovalStatus(regId, newStatus)
      if (response.success) {
        // Update local state
        setRegistrations(registrations.map(r => r.id === regId ? { ...r, approval_status: newStatus } : r))
      } else {
        setError('Gagal mengubah status persetujuan')
      }
    } catch (err: any) {
      console.error('Error updating approval status:', err)
      setError(err.message || 'Terjadi kesalahan saat mengubah status')
    }
  }

  const deleteSelectedRegistrations = async () => {
    if (selectedRegs.length === 0) return
    
    if (!confirm(`Apakah Anda yakin ingin menghapus ${selectedRegs.length} pendaftaran?`)) {
      return
    }

    try {
      setLoading(true)
      setError('')
      
      // Delete each selected registration
      await Promise.all(selectedRegs.map(regId => 
        registrationService.deleteRegistration(regId)
      ))

      // Remove deleted registrations from local state
      setRegistrations(registrations.filter(r => !selectedRegs.includes(r.id)))
      setSelectedRegs([])
    } catch (err: any) {
      console.error('Error deleting registrations:', err)
      setError(err.message || 'Terjadi kesalahan saat menghapus pendaftaran')
    } finally {
      setLoading(false)
    }
  }

  const handleSelectReg = (regId: string) => {
    setSelectedRegs(prev => 
      prev.includes(regId) 
        ? prev.filter(id => id !== regId)
        : [...prev, regId]
    )
  }

  const handleSelectAllRegs = () => {
    const openRegs = registrations.filter(r => r.reg_status === currentRegTab)
    if (selectedRegs.length === openRegs.length) {
      setSelectedRegs([])
    } else {
      setSelectedRegs(openRegs.map(r => r.id))
    }
  }

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', backgroundColor: COLORS.bg, fontFamily: "'Plus Jakarta Sans', sans-serif", color: COLORS.text }}>
      {/* SIDEBAR */}
      <aside style={{ width: sidebarCollapsed ? '64px' : '252px', flexShrink: 0, background: COLORS.bg2, borderRight: `1px solid ${COLORS.border}`, display: 'flex', flexDirection: 'column', height: '100vh', transition: 'width .25s ease' }}>
        <div style={{ padding: '1.2rem 1rem', borderBottom: `1px solid ${COLORS.border}`, display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '9px', flexShrink: 0, background: 'linear-gradient(135deg, #06b6d4, #0891b2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 900, color: '#fff' }}>SY</div>
          {!sidebarCollapsed && <div style={{ fontSize: '1.05rem', fontWeight: 800, whiteSpace: 'nowrap' }}>SYNERA</div>}
        </div>

        <nav style={{ flex: 1, overflowY: 'auto', padding: '0.6rem 0.55rem', display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
          {[{ id: 'overview', label: 'Overview', icon: '📊', path: '/dashboard' }, { id: 'registrasi', label: 'Pendaftaran', icon: '📥', path: '/dashboard/registrasi' }, { id: 'clients', label: 'Klien', icon: '👥', path: '/dashboard/klien' }].map(item => (
            <button key={item.id} onClick={() => navigate({ to: item.path })} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', padding: '0.58rem 0.7rem', borderRadius: '9px', cursor: 'pointer', border: 'none', background: currentPage === item.id ? COLORS.cyanDim : 'transparent', color: currentPage === item.id ? COLORS.cyan : COLORS.text3, fontFamily: 'inherit', fontSize: '0.82rem', fontWeight: 600, transition: 'all .17s' }}>
              <span>{item.icon}</span>
              {!sidebarCollapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <div style={{ padding: '0.7rem 0.55rem', borderTop: `1px solid ${COLORS.border}` }}>
        </div>
      </aside>

      {/* MAIN */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* MENU BAR */}
        <div style={{ height: '54px', flexShrink: 0, background: COLORS.bg2, borderBottom: `1px solid ${COLORS.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.4rem', gap: '0.85rem' }}>
          {/* Search Bar */}
          <div style={{ flex: 1, maxWidth: '400px', display: 'flex', alignItems: 'center', gap: '0.5rem', background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: '8px', padding: '0.4rem 0.85rem' }}>
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ width: '16px', height: '16px', color: COLORS.text3 }}>
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Cari perusahaan, klien, atau data..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                background: 'none',
                border: 'none',
                outline: 'none',
                fontFamily: 'inherit',
                fontSize: '0.82rem',
                color: COLORS.text,
              }}
            />
          </div>

          {/* Right Side - Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: COLORS.text2, fontSize: '1.2rem' }}>{sidebarCollapsed ? '→' : '←'}</button>
            
            {/* Avatar with Dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setDrawerOpen(!drawerOpen)}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '9px',
                  background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  color: '#fff',
                  transition: 'opacity .2s'
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                AD
              </button>

              {/* Dropdown Menu */}
              {drawerOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '0.5rem',
                    background: COLORS.surface2,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: '10px',
                    minWidth: '180px',
                    zIndex: 50,
                    boxShadow: '0 4px 12px rgba(0,0,0,.3)'
                  }}
                >
                  <div style={{ padding: '0.75rem 1rem', borderBottom: `1px solid ${COLORS.border}` }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.25rem' }}>Admin</div>
                    <div style={{ fontSize: '0.7rem', color: COLORS.text3 }}>{userRole}</div>
                  </div>
                  <button
                    onClick={() => {
                      localStorage.removeItem('userRole')
                      navigate({ to: '/login' })
                    }}
                    style={{
                      width: '100%',
                      padding: '0.65rem 1rem',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: COLORS.red,
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      textAlign: 'left',
                      transition: 'background .2s'
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(248,113,113,.1)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'none')}
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* PAGE HEADER */}
        <div style={{ height: '64px', flexShrink: 0, background: COLORS.bg, borderBottom: `1px solid ${COLORS.border}`, display: 'flex', alignItems: 'center', padding: '0 1.4rem', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.2rem' }}>{currentPage === 'overview' ? 'Overview' : currentPage === 'registrasi' ? 'Pendaftaran Masuk' : 'Semua Klien'}</div>
            <div style={{ fontSize: '0.72rem', color: COLORS.text3 }}>{new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</div>
          </div>
        </div>

        {/* CONTENT */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.4rem', maxWidth: '1600px' }}>
          {currentPage === 'overview' && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.85rem', marginBottom: '1.25rem' }}>
                {[
                  { val: customers.length, lbl: 'Klien Aktif', icon: '👥' },
                  { val: registrations.filter((r: Registration) => r.reg_status === 'open').length, lbl: 'Open', icon: '📥' },
                  { val: registrations.filter((r: Registration) => r.reg_status === 'review').length, lbl: 'Review', icon: '🔍' },
                  { val: registrations.length, lbl: 'Total Reg', icon: '📋' },
                  { val: customers.length, lbl: 'Total Klien', icon: '👨‍💼' },
                ].map((stat, i) => (
                  <div key={i} style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: '13px', padding: '1.1rem' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.88rem', background: COLORS.cyanDim, marginBottom: '0.65rem' }}>{stat.icon}</div>
                    <div style={{ fontSize: '1.55rem', fontWeight: 800, marginBottom: '0.2rem' }}>{stat.val}</div>
                    <div style={{ fontSize: '0.75rem', color: COLORS.text3 }}>{stat.lbl}</div>
                  </div>
                ))}
              </div>

              <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: '13px', overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ backgroundColor: COLORS.surface2, borderBottom: `1px solid ${COLORS.border}` }}>
                        <th style={{ fontSize: '0.68rem', fontWeight: 700, color: COLORS.text3, padding: '0.6rem 1rem', textAlign: 'left', textTransform: 'uppercase' }}>Klien</th>
                        <th style={{ fontSize: '0.68rem', fontWeight: 700, color: COLORS.text3, padding: '0.6rem 1rem', textAlign: 'left', textTransform: 'uppercase' }}>Paket</th>
                        <th style={{ fontSize: '0.68rem', fontWeight: 700, color: COLORS.text3, padding: '0.6rem 1rem', textAlign: 'left', textTransform: 'uppercase' }}>Go-Live</th>
                        <th style={{ fontSize: '0.68rem', fontWeight: 700, color: COLORS.text3, padding: '0.6rem 1rem', textAlign: 'left', textTransform: 'uppercase' }}>Expired</th>
                        <th style={{ fontSize: '0.68rem', fontWeight: 700, color: COLORS.text3, padding: '0.6rem 1rem', textAlign: 'left', textTransform: 'uppercase' }}>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map((c: Customer, i: number) => (
                        <tr key={i} style={{ borderBottom: `1px solid rgba(255,255,255,.03)` }}>
                          <td style={{ padding: '0.7rem 1rem', fontSize: '0.82rem' }}><div style={{ fontWeight: 600 }}>{c.company}</div><div style={{ fontSize: '0.7rem', color: COLORS.text3 }}>{c.city}</div></td>
                          <td style={{ padding: '0.7rem 1rem', fontSize: '0.82rem', color: COLORS.text2 }}>SYNERA Growth</td>
                          <td style={{ padding: '0.7rem 1rem', fontSize: '0.82rem', color: COLORS.text3 }}>-</td>
                          <td style={{ padding: '0.7rem 1rem', fontSize: '0.82rem', color: COLORS.text3 }}>-</td>
                          <td style={{ padding: '0.7rem 1rem' }}>
                            <button onClick={() => { setSelectedClient(c); setDrawerOpen(true) }} style={{ background: COLORS.surface2, border: `1px solid ${COLORS.border2}`, borderRadius: '8px', padding: '0.38rem 0.75rem', fontSize: '0.77rem', fontWeight: 600, color: COLORS.text2, cursor: 'pointer' }}>Detail</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div style={{ fontSize: '0.75rem', color: COLORS.text3, padding: '0.9rem 1.15rem', borderTop: `1px solid ${COLORS.border}` }}>{customers.length} klien</div>
              </div>
            </>
          )}

          {currentPage === 'registrasi' && (
            <>
              <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                {['open', 'review', 'release', 'rejected'].map(tab => (
                  <button key={tab} onClick={() => setCurrentRegTab(tab)} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', padding: '0.45rem 0.9rem', borderRadius: '9px', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 700, border: `1.5px solid ${currentRegTab === tab ? COLORS.cyan : COLORS.border}`, background: currentRegTab === tab ? COLORS.cyanDim : COLORS.surface, color: currentRegTab === tab ? COLORS.cyan : COLORS.text3 }}>
                    <span>{tab === 'open' ? '📥' : tab === 'review' ? '🔍' : tab === 'release' ? '✅' : '❌'} {tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
                              <span style={{ fontSize: '0.65rem', fontWeight: 800, padding: '0.08rem 0.38rem', borderRadius: '100px', background: 'rgba(255,255,255,.08)' }}>{registrations.filter((r: Registration) => r.reg_status === tab).length}</span>
                  </button>
                ))}
              </div>

              {error && (
                <div style={{ background: 'rgba(248,113,113,.1)', border: `1px solid ${COLORS.red}`, borderRadius: '9px', padding: '0.8rem 1rem', marginBottom: '1rem', color: COLORS.red, fontSize: '0.82rem' }}>
                  ⚠️ {error}
                </div>
              )}

              {loading ? (
                <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: '13px', padding: '2rem', textAlign: 'center', color: COLORS.text3 }}>
                  ⏳ Memuat data pendaftaran...
                </div>
              ) : (
                <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: '13px', overflow: 'hidden' }}>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ backgroundColor: COLORS.surface2, borderBottom: `1px solid ${COLORS.border}` }}>
                          <th style={{ fontSize: '0.68rem', fontWeight: 700, color: COLORS.text3, padding: '0.6rem 1rem', textAlign: 'left', textTransform: 'uppercase' }}>No. Reg</th>
                          <th style={{ fontSize: '0.68rem', fontWeight: 700, color: COLORS.text3, padding: '0.6rem 1rem', textAlign: 'left', textTransform: 'uppercase' }}>Perusahaan</th>
                          <th style={{ fontSize: '0.68rem', fontWeight: 700, color: COLORS.text3, padding: '0.6rem 1rem', textAlign: 'left', textTransform: 'uppercase' }}>PIC</th>
                          <th style={{ fontSize: '0.68rem', fontWeight: 700, color: COLORS.text3, padding: '0.6rem 1rem', textAlign: 'left', textTransform: 'uppercase' }}>Paket</th>
                          <th style={{ fontSize: '0.68rem', fontWeight: 700, color: COLORS.text3, padding: '0.6rem 1rem', textAlign: 'left', textTransform: 'uppercase' }}>Kota</th>
                          <th style={{ fontSize: '0.68rem', fontWeight: 700, color: COLORS.text3, padding: '0.6rem 1rem', textAlign: 'left', textTransform: 'uppercase' }}>Status</th>
                          <th style={{ fontSize: '0.68rem', fontWeight: 700, color: COLORS.text3, padding: '0.6rem 1rem', textAlign: 'left', textTransform: 'uppercase' }}>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {registrations.filter((r: Registration) => r.reg_status === currentRegTab).map((r: Registration, i: number) => (
                          <tr key={i} onClick={() => navigate({ to: '/agreement' })} style={{ borderBottom: `1px solid rgba(255,255,255,.03)`, cursor: 'pointer', transition: 'background-color 0.17s', backgroundColor: 'transparent' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = COLORS.surface2} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                            <td style={{ padding: '0.7rem 1rem', fontSize: '0.82rem', color: COLORS.text3, fontFamily: 'monospace' }}>{r.reg_no}</td>
                            <td style={{ padding: '0.7rem 1rem', fontSize: '0.82rem', fontWeight: 600 }}>{r.company}</td>
                            <td style={{ padding: '0.7rem 1rem', fontSize: '0.82rem' }}>{r.pic}</td>
                            <td style={{ padding: '0.7rem 1rem', fontSize: '0.82rem', color: COLORS.cyan }}>{r.package}</td>
                            <td style={{ padding: '0.7rem 1rem', fontSize: '0.82rem', color: COLORS.text3 }}>{r.city}</td>
                            <td style={{ padding: '0.7rem 1rem', fontSize: '0.82rem' }}>
                              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: r.approval_status === 'release' ? COLORS.greenDim : 'rgba(251, 191, 36, 0.08)', border: `1px solid ${r.approval_status === 'release' ? COLORS.green + '4d' : 'rgba(251, 191, 36, 0.3)'}`, color: r.approval_status === 'release' ? COLORS.green : COLORS.yellow, padding: '0.3rem 0.65rem', borderRadius: '6px', fontWeight: 600, whiteSpace: 'nowrap' }}>
                                <span>{r.approval_status === 'release' ? '✓' : '◯'}</span>
                                {r.approval_status === 'release' ? 'Release' : 'Open'}
                              </div>
                            </td>
                            <td style={{ padding: '0.7rem 1rem' }} onClick={(e) => e.stopPropagation()}>
                              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                                {r.approval_status === 'open' && (
                                  <button onClick={() => updateApprovalStatus(r.id, 'release')} style={{ background: COLORS.green, border: 'none', borderRadius: '6px', padding: '0.3rem 0.65rem', fontSize: '0.72rem', fontWeight: 700, color: '#000', cursor: 'pointer', transition: 'opacity 0.17s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'} onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>✓ Approve</button>
                                )}
                                <button onClick={() => navigate({ to: '/agreement', search: { regId: r.id } })} style={{ background: COLORS.surface2, border: `1px solid ${COLORS.border2}`, borderRadius: '6px', padding: '0.3rem 0.65rem', fontSize: '0.72rem', fontWeight: 600, color: COLORS.text2, cursor: 'pointer' }}>Detail</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: COLORS.text3, padding: '0.9rem 1.15rem', borderTop: `1px solid ${COLORS.border}` }}>{registrations.filter((r: Registration) => r.reg_status === currentRegTab).length} pendaftaran</div>
                </div>
              )}
            </>
          )}

          {currentPage === 'clients' && (
            <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: '13px', overflow: 'hidden' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: COLORS.surface2, borderBottom: `1px solid ${COLORS.border}` }}>
                      <th style={{ fontSize: '0.68rem', fontWeight: 700, color: COLORS.text3, padding: '0.6rem 1rem', textAlign: 'left', textTransform: 'uppercase' }}>Klien</th>
                      <th style={{ fontSize: '0.68rem', fontWeight: 700, color: COLORS.text3, padding: '0.6rem 1rem', textAlign: 'left', textTransform: 'uppercase' }}>Paket</th>
                      <th style={{ fontSize: '0.68rem', fontWeight: 700, color: COLORS.text3, padding: '0.6rem 1rem', textAlign: 'left', textTransform: 'uppercase' }}>Go-Live</th>
                      <th style={{ fontSize: '0.68rem', fontWeight: 700, color: COLORS.text3, padding: '0.6rem 1rem', textAlign: 'left', textTransform: 'uppercase' }}>Expired</th>
                      <th style={{ fontSize: '0.68rem', fontWeight: 700, color: COLORS.text3, padding: '0.6rem 1rem', textAlign: 'left', textTransform: 'uppercase' }}>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((c: Customer, i: number) => (
                      <tr key={i} style={{ borderBottom: `1px solid rgba(255,255,255,.03)` }}>
                        <td style={{ padding: '0.7rem 1rem', fontSize: '0.82rem' }}><div style={{ fontWeight: 600 }}>{c.company}</div><div style={{ fontSize: '0.7rem', color: COLORS.text3 }}>{c.city}</div></td>
                        <td style={{ padding: '0.7rem 1rem', fontSize: '0.82rem', color: COLORS.text2 }}>SYNERA Growth</td>
                        <td style={{ padding: '0.7rem 1rem', fontSize: '0.82rem', color: COLORS.text3 }}>-</td>
                        <td style={{ padding: '0.7rem 1rem', fontSize: '0.82rem', color: COLORS.text3 }}>-</td>
                        <td style={{ padding: '0.7rem 1rem' }}>
                          <button onClick={() => { setSelectedClient(c); setDrawerOpen(true) }} style={{ background: COLORS.surface2, border: `1px solid ${COLORS.border2}`, borderRadius: '8px', padding: '0.38rem 0.75rem', fontSize: '0.77rem', fontWeight: 600, color: COLORS.text2, cursor: 'pointer' }}>Detail</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{ fontSize: '0.75rem', color: COLORS.text3, padding: '0.9rem 1.15rem', borderTop: `1px solid ${COLORS.border}` }}>{customers.length} klien</div>
            </div>
          )}
        </div>
      </div>

      {/* DRAWER */}
      {drawerOpen && selectedClient && (
        <>
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.5)', zIndex: 100, backdropFilter: 'blur(4px)' }} onClick={() => setDrawerOpen(false)}></div>
          <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '480px', background: COLORS.bg2, borderLeft: `1px solid ${COLORS.border}`, zIndex: 101, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.15rem 1.4rem', borderBottom: `1px solid ${COLORS.border}` }}>
              <div style={{ fontSize: '1rem', fontWeight: 700 }}>{selectedClient.company}</div>
              <button onClick={() => setDrawerOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: COLORS.text3, fontSize: '1.2rem' }}>✕</button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.4rem' }}>
              <div style={{ marginBottom: '1.4rem' }}>
                <div style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', color: COLORS.text3, marginBottom: '0.7rem', paddingBottom: '0.5rem', borderBottom: `1px solid ${COLORS.border}` }}>Informasi Klien</div>
                {[{ label: 'Nama', value: selectedClient.pic }, { label: 'Jabatan', value: (selectedClient as any).pic_title }, { label: 'Email', value: selectedClient.email }, { label: 'WhatsApp', value: (selectedClient as any).wa }].filter(row => row.value).map((row, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: `1px solid rgba(255,255,255,.03)`, fontSize: '0.82rem' }}>
                    <span style={{ color: COLORS.text3 }}>{row.label}</span>
                    <span style={{ fontWeight: 600 }}>{row.value}</span>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', color: COLORS.text3, marginBottom: '0.7rem', paddingBottom: '0.5rem', borderBottom: `1px solid ${COLORS.border}` }}>Paket & Kontrak</div>
                {[{ label: 'Paket', value: selectedClient.package }, { label: 'Status', value: (selectedClient as any).status }, { label: 'Go-Live', value: (selectedClient as any).golive }, { label: 'Expired', value: (selectedClient as any).expired }, { label: 'Pembayaran', value: (selectedClient as any).payment }].filter(row => row.value).map((row, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: `1px solid rgba(255,255,255,.03)`, fontSize: '0.82rem' }}>
                    <span style={{ color: COLORS.text3 }}>{row.label}</span>
                    <span style={{ fontWeight: 600 }}>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ padding: '1rem 1.4rem', borderTop: `1px solid ${COLORS.border}`, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button style={{ width: '100%', background: COLORS.cyan, color: COLORS.bg, fontFamily: 'inherit', fontSize: '0.82rem', fontWeight: 700, padding: '0.6rem 1rem', borderRadius: '8px', cursor: 'pointer', border: 'none' }}>💬 WhatsApp</button>
              <button onClick={() => setDrawerOpen(false)} style={{ width: '100%', background: COLORS.surface2, color: COLORS.text2, fontFamily: 'inherit', fontSize: '0.82rem', fontWeight: 700, padding: '0.6rem 1rem', borderRadius: '8px', cursor: 'pointer', border: 'none' }}>Tutup</button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
