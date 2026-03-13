import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

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

const REGISTRATIONS = [
  { id: 'r001', reg_no: 'SYN-2026-1008', company: 'Toko Sembako Pak Joko', pic: 'Joko Susanto', pic_title: 'Owner', wa: '08888999000', email: 'joko@sembakojoko.id', industry: 'FMCG', city: 'Solo', package: 'SYNERA Basic', reg_status: 'open', reg_date: '11 Mar 2026' },
  { id: 'r002', reg_no: 'SYN-2026-1009', company: 'PT Mitra Teknologi Bangsa', pic: 'Fajar Setiawan', pic_title: 'CTO', wa: '08999000111', email: 'fajar@mitrateknologi.id', industry: 'IT', city: 'Jakarta', package: 'SYNERA Growth', reg_status: 'open', reg_date: '12 Mar 2026' },
  { id: 'r004', reg_no: 'SYN-2026-1011', company: 'CV Cahaya Timur', pic: 'Benny Kurniawan', pic_title: 'Direktur', wa: '08211223344', email: 'benny@cahayatimur.id', industry: 'Distribusi', city: 'Surabaya', package: 'SYNERA Growth', reg_status: 'review', reg_date: '9 Mar 2026' },
  { id: 'r005', reg_no: 'SYN-2026-1007', company: 'PT Karya Nusantara Tbk', pic: 'Nina Susanti', pic_title: 'CFO', wa: '08777888999', email: 'nina@karyanusantara.id', industry: 'Manufaktur', city: 'Surabaya', package: 'SYNERA Pro', reg_status: 'release', reg_date: '8 Mar 2026' },
]

const CLIENTS = [
  { id: 'c001', company: 'PT Makmur Jaya Abadi', pic: 'Budi Santoso', pic_title: 'Direktur', wa: '08111222333', email: 'budi@tokomakmur.id', industry: 'Retail', city: 'Surabaya', package: 'SYNERA Growth', status: 'active', golive: '20 Jan 2026', expired: '20 Jan 2027', payment: 'paid' },
  { id: 'c002', company: 'CV Mandiri Sejahtera', pic: 'Siti Rahayu', pic_title: 'Owner', wa: '08222333444', email: 'siti@cvmandiri.id', industry: 'Distribusi', city: 'Jakarta', package: 'SYNERA Basic', status: 'active', golive: '28 Jan 2026', expired: '28 Jan 2027', payment: 'partial' },
  { id: 'c003', company: 'PT Bersatu Maju Digital', pic: 'Ahmad Fauzi', pic_title: 'CEO', wa: '08333444555', email: 'ahmad@ptbersatu.id', industry: 'IT Services', city: 'Bandung', package: 'SYNERA Pro', status: 'active', golive: '15 Feb 2026', expired: '15 Feb 2027', payment: 'paid' },
]

export default function DashboardPage() {
  const navigate = useNavigate()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [currentPage, setCurrentPage] = useState('overview')
  const [currentRegTab, setCurrentRegTab] = useState('open')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedClient, setSelectedClient] = useState<any>(null)
  const userRole = localStorage.getItem('userRole') || 'admin'

  useEffect(() => {
    const allowedRoles = ['admin', 'manager', 'supervisor']
    if (!allowedRoles.includes(userRole)) {
      navigate('/login')
    }
  }, [userRole, navigate])

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', backgroundColor: COLORS.bg, fontFamily: "'Plus Jakarta Sans', sans-serif", color: COLORS.text }}>
      {/* SIDEBAR */}
      <aside style={{ width: sidebarCollapsed ? '64px' : '252px', flexShrink: 0, background: COLORS.bg2, borderRight: `1px solid ${COLORS.border}`, display: 'flex', flexDirection: 'column', height: '100vh', transition: 'width .25s ease' }}>
        <div style={{ padding: '1.2rem 1rem', borderBottom: `1px solid ${COLORS.border}`, display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '9px', flexShrink: 0, background: 'linear-gradient(135deg, #06b6d4, #0891b2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 900, color: '#fff' }}>SY</div>
          {!sidebarCollapsed && <div style={{ fontSize: '1.05rem', fontWeight: 800, whiteSpace: 'nowrap' }}>SYNERA</div>}
        </div>

        <nav style={{ flex: 1, overflowY: 'auto', padding: '0.6rem 0.55rem', display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
          {[{ id: 'overview', label: 'Overview', icon: '📊' }, { id: 'registrasi', label: 'Pendaftaran', icon: '📥' }, { id: 'clients', label: 'Klien', icon: '👥' }].map(item => (
            <button key={item.id} onClick={() => setCurrentPage(item.id)} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', padding: '0.58rem 0.7rem', borderRadius: '9px', cursor: 'pointer', border: 'none', background: currentPage === item.id ? COLORS.cyanDim : 'transparent', color: currentPage === item.id ? COLORS.cyan : COLORS.text3, fontFamily: 'inherit', fontSize: '0.82rem', fontWeight: 600, transition: 'all .17s' }}>
              <span>{item.icon}</span>
              {!sidebarCollapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <div style={{ padding: '0.7rem 0.55rem', borderTop: `1px solid ${COLORS.border}`, display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
          <div style={{ width: '34px', height: '34px', borderRadius: '9px', flexShrink: 0, background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 800, color: '#fff' }}>AD</div>
          {!sidebarCollapsed && <div style={{ flex: 1 }}><div style={{ fontSize: '0.82rem', fontWeight: 700 }}>Admin</div><div style={{ fontSize: '0.68rem', color: COLORS.text3 }}>{userRole}</div></div>}
          <button onClick={() => { localStorage.removeItem('userRole'); navigate('/login') }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: COLORS.text3, fontSize: '0.9rem', padding: '0.25rem', borderRadius: '6px' }} title="Logout">🚪</button>
        </div>
      </aside>

      {/* MAIN */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* TOPBAR */}
        <div style={{ height: '54px', flexShrink: 0, background: COLORS.bg2, borderBottom: `1px solid ${COLORS.border}`, display: 'flex', alignItems: 'center', padding: '0 1.4rem', gap: '0.85rem' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.97rem', fontWeight: 700 }}>{currentPage === 'overview' ? 'Overview' : currentPage === 'registrasi' ? 'Pendaftaran Masuk' : 'Semua Klien'}</div>
            <div style={{ fontSize: '0.72rem', color: COLORS.text3 }}>{new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</div>
          </div>
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: COLORS.text2, fontSize: '1.2rem' }}>{sidebarCollapsed ? '→' : '←'}</button>
        </div>

        {/* CONTENT */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.4rem', maxWidth: '1600px' }}>
          {currentPage === 'overview' && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.85rem', marginBottom: '1.25rem' }}>
                {[
                  { val: CLIENTS.filter(c => c.status === 'active').length, lbl: 'Klien Aktif', icon: '👥' },
                  { val: REGISTRATIONS.filter(r => r.reg_status === 'open').length, lbl: 'Open', icon: '📥' },
                  { val: REGISTRATIONS.filter(r => r.reg_status === 'review').length, lbl: 'Review', icon: '🔍' },
                  { val: REGISTRATIONS.length, lbl: 'Total Reg', icon: '📋' },
                  { val: CLIENTS.length, lbl: 'Total Klien', icon: '👨‍💼' },
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
                      {CLIENTS.map((c, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid rgba(255,255,255,.03)` }}>
                          <td style={{ padding: '0.7rem 1rem', fontSize: '0.82rem' }}><div style={{ fontWeight: 600 }}>{c.company}</div><div style={{ fontSize: '0.7rem', color: COLORS.text3 }}>{c.city}</div></td>
                          <td style={{ padding: '0.7rem 1rem', fontSize: '0.82rem', color: COLORS.text2 }}>{c.package}</td>
                          <td style={{ padding: '0.7rem 1rem', fontSize: '0.82rem', color: COLORS.text3 }}>{c.golive}</td>
                          <td style={{ padding: '0.7rem 1rem', fontSize: '0.82rem', color: COLORS.text3 }}>{c.expired}</td>
                          <td style={{ padding: '0.7rem 1rem' }}>
                            <button onClick={() => { setSelectedClient(c); setDrawerOpen(true) }} style={{ background: COLORS.surface2, border: `1px solid ${COLORS.border2}`, borderRadius: '8px', padding: '0.38rem 0.75rem', fontSize: '0.77rem', fontWeight: 600, color: COLORS.text2, cursor: 'pointer' }}>Detail</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div style={{ fontSize: '0.75rem', color: COLORS.text3, padding: '0.9rem 1.15rem', borderTop: `1px solid ${COLORS.border}` }}>{CLIENTS.length} klien</div>
              </div>
            </>
          )}

          {currentPage === 'registrasi' && (
            <>
              <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                {['open', 'review', 'release', 'rejected'].map(tab => (
                  <button key={tab} onClick={() => setCurrentRegTab(tab)} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', padding: '0.45rem 0.9rem', borderRadius: '9px', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 700, border: `1.5px solid ${currentRegTab === tab ? COLORS.cyan : COLORS.border}`, background: currentRegTab === tab ? COLORS.cyanDim : COLORS.surface, color: currentRegTab === tab ? COLORS.cyan : COLORS.text3 }}>
                    <span>{tab === 'open' ? '📥' : tab === 'review' ? '🔍' : tab === 'release' ? '✅' : '❌'} {tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
                    <span style={{ fontSize: '0.65rem', fontWeight: 800, padding: '0.08rem 0.38rem', borderRadius: '100px', background: 'rgba(255,255,255,.08)' }}>{REGISTRATIONS.filter(r => r.reg_status === tab).length}</span>
                  </button>
                ))}
              </div>

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
                      </tr>
                    </thead>
                    <tbody>
                      {REGISTRATIONS.filter(r => r.reg_status === currentRegTab).map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid rgba(255,255,255,.03)` }}>
                          <td style={{ padding: '0.7rem 1rem', fontSize: '0.82rem', color: COLORS.text3, fontFamily: 'monospace' }}>{r.reg_no}</td>
                          <td style={{ padding: '0.7rem 1rem', fontSize: '0.82rem', fontWeight: 600 }}>{r.company}</td>
                          <td style={{ padding: '0.7rem 1rem', fontSize: '0.82rem' }}>{r.pic}</td>
                          <td style={{ padding: '0.7rem 1rem', fontSize: '0.82rem', color: COLORS.cyan }}>{r.package}</td>
                          <td style={{ padding: '0.7rem 1rem', fontSize: '0.82rem', color: COLORS.text3 }}>{r.city}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div style={{ fontSize: '0.75rem', color: COLORS.text3, padding: '0.9rem 1.15rem', borderTop: `1px solid ${COLORS.border}` }}>{REGISTRATIONS.filter(r => r.reg_status === currentRegTab).length} pendaftaran</div>
              </div>
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
                    {CLIENTS.map((c, i) => (
                      <tr key={i} style={{ borderBottom: `1px solid rgba(255,255,255,.03)` }}>
                        <td style={{ padding: '0.7rem 1rem', fontSize: '0.82rem' }}><div style={{ fontWeight: 600 }}>{c.company}</div><div style={{ fontSize: '0.7rem', color: COLORS.text3 }}>{c.city}</div></td>
                        <td style={{ padding: '0.7rem 1rem', fontSize: '0.82rem', color: COLORS.text2 }}>{c.package}</td>
                        <td style={{ padding: '0.7rem 1rem', fontSize: '0.82rem', color: COLORS.text3 }}>{c.golive}</td>
                        <td style={{ padding: '0.7rem 1rem', fontSize: '0.82rem', color: COLORS.text3 }}>{c.expired}</td>
                        <td style={{ padding: '0.7rem 1rem' }}>
                          <button onClick={() => { setSelectedClient(c); setDrawerOpen(true) }} style={{ background: COLORS.surface2, border: `1px solid ${COLORS.border2}`, borderRadius: '8px', padding: '0.38rem 0.75rem', fontSize: '0.77rem', fontWeight: 600, color: COLORS.text2, cursor: 'pointer' }}>Detail</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{ fontSize: '0.75rem', color: COLORS.text3, padding: '0.9rem 1.15rem', borderTop: `1px solid ${COLORS.border}` }}>{CLIENTS.length} klien</div>
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
                {[{ label: 'Nama', value: selectedClient.pic }, { label: 'Jabatan', value: selectedClient.pic_title }, { label: 'Email', value: selectedClient.email }, { label: 'WhatsApp', value: selectedClient.wa }].map((row, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: i < 3 ? `1px solid rgba(255,255,255,.03)` : 'none', fontSize: '0.82rem' }}>
                    <span style={{ color: COLORS.text3 }}>{row.label}</span>
                    <span style={{ fontWeight: 600 }}>{row.value}</span>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', color: COLORS.text3, marginBottom: '0.7rem', paddingBottom: '0.5rem', borderBottom: `1px solid ${COLORS.border}` }}>Paket & Kontrak</div>
                {[{ label: 'Paket', value: selectedClient.package }, { label: 'Status', value: selectedClient.status }, { label: 'Go-Live', value: selectedClient.golive }, { label: 'Expired', value: selectedClient.expired }, { label: 'Pembayaran', value: selectedClient.payment }].map((row, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: i < 4 ? `1px solid rgba(255,255,255,.03)` : 'none', fontSize: '0.82rem' }}>
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
