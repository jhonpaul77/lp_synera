import { useState, useRef, useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useRegistrationStore } from '@/store/registrationStore'
import { registrationService } from '@/api/registrationService'

const COLORS = {
  bg: '#09090b',
  bg2: '#111114',
  surface: '#18181b',
  surface2: '#1f1f23',
  border: '#2a2a30',
  border2: '#3a3a42',
  text: '#f4f4f5',
  text2: '#a1a1aa',
  text3: '#71717a',
  cyan: '#06b6d4',
  cyanDim: 'rgba(6,182,212,.1)',
  cyanGlow: 'rgba(6,182,212,.25)',
  green: '#22c55e',
  greenDim: 'rgba(34,197,94,.1)',
}

const INDUSTRIES = [
  { value: 'retail', label: 'Retail' },
  { value: 'distribusi', label: 'Distribusi' },
  { value: 'manufaktur', label: 'Manufaktur' },
  { value: 'jasa', label: 'Jasa' },
  { value: 'pertanian', label: 'Pertanian' },
  { value: 'pariwisata', label: 'Pariwisata' },
  { value: 'pendidikan', label: 'Pendidikan' },
  { value: 'kesehatan', label: 'Kesehatan' },
  { value: 'keuangan', label: 'Keuangan' },
  { value: 'teknologi', label: 'Teknologi' },
  { value: 'lainnya', label: 'Lainnya' }
]

const JOB_TITLES = [
  { value: 'direktur', label: 'Direktur' },
  { value: 'direktur_utama', label: 'Direktur Utama' },
  { value: 'manager_general', label: 'General Manager' },
  { value: 'manager_operasional', label: 'Manager Operasional' },
  { value: 'manager_keuangan', label: 'Manager Keuangan' },
  { value: 'owner', label: 'Owner' },
  { value: 'pemilik', label: 'Pemilik' },
  { value: 'kepala_operasional', label: 'Kepala Operasional' },
  { value: 'kepala_keuangan', label: 'Kepala Keuangan' },
  { value: 'supervisor', label: 'Supervisor' },
  { value: 'staff', label: 'Staff' }
]

export default function RegistrasiPage() {
  const navigate = useNavigate()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [drawing, setDrawing] = useState(false)
  const [hasSig, setHasSig] = useState(false)
  const { updateData } = useRegistrationStore()
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Form state
  const [formData, setFormData] = useState({
    company: '',
    brand: '',
    industry: '',
    city: '',
    address: '',
    website: '',
    pic_name: '',
    pic_title: '',
    phone: '',
    email: '',
    employees: '',
    users: '',
    current_sys: [] as string[],
    modules: [] as string[],
    package: '',
    start: '',
    notes: '',
    signer_name: '',
    signer_title: '',
    signer_city: '',
    signature: ''
  })

  // Canvas setup
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (rect) {
        canvas.width = rect.width
        canvas.height = rect.height
      }
    }
  }, [])

  const getCanvasPos = (e: any) => {
    if (!canvasRef.current) return { x: 0, y: 0 }
    const rect = canvasRef.current.getBoundingClientRect()
    if (e.touches) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top }
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  const handleCanvasMouseDown = (e: any) => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext('2d')
    const pos = getCanvasPos(e)
    ctx?.beginPath()
    ctx?.moveTo(pos.x, pos.y)
    setDrawing(true)
    setHasSig(true)
  }

  const handleCanvasMouseMove = (e: any) => {
    if (!drawing || !canvasRef.current) return
    const ctx = canvasRef.current.getContext('2d')
    const pos = getCanvasPos(e)
    ctx!.strokeStyle = '#06b6d4'
    ctx!.lineWidth = 2
    ctx!.lineCap = 'round'
    ctx!.lineJoin = 'round'
    ctx?.lineTo(pos.x, pos.y)
    ctx?.stroke()
  }

  const handleCanvasMouseUp = () => setDrawing(false)
  const handleCanvasMouseLeave = () => setDrawing(false)

  const clearSignature = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d')
      ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    }
    setHasSig(false)
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    
    if (!formData.company || !formData.industry || !formData.city || !formData.pic_name || !formData.pic_title || !formData.phone || !formData.email) {
      setError('Mohon lengkapi semua field yang wajib diisi')
      return
    }

    if (!hasSig) {
      setError('Mohon tandatangani form')
      return
    }

    setLoading(true)
    setError('')
    
    try {
      const sigData = canvasRef.current?.toDataURL() || ''
      const regData = {
        company: formData.company,
        brand: formData.brand,
        industry: formData.industry,
        city: formData.city,
        address: formData.address,
        website: formData.website,
        pic_name: formData.pic_name,
        pic_title: formData.pic_title,
        phone: formData.phone,
        email: formData.email,
        employees: formData.employees,
        users: formData.users,
        current_sys: formData.current_sys,
        modules: formData.modules,
        package: formData.package,
        start: formData.start,
        notes: formData.notes,
        signer_name: formData.signer_name,
        signer_title: formData.signer_title,
        signer_city: formData.signer_city,
        signature: sigData
      }

      const response = await registrationService.createRegistration(regData)
      
      if (response.success) {
        // Store data for reference
        const dataToStore = {
          ...formData,
          signature: sigData,
          date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
          regNo: response.data.reg_no,
          registrationId: response.data.id
        }
        updateData(dataToStore)
        setSubmitted(true)
        
        // Redirect to agreement with registration ID
        setTimeout(() => {
          navigate({ to: `/agreement?regId=${response.data.id}` })
        }, 2000)
      }
    } catch (err: any) {
      console.error('Submission error:', err)
      setError(err.message || 'Gagal mengirim registrasi. Silakan coba lagi.')
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div style={{ backgroundColor: COLORS.bg, minHeight: '100vh' }} className="flex items-center justify-center px-6 py-20">
        <div className="text-center">
          <div style={{ borderColor: COLORS.green + '4d', backgroundColor: COLORS.greenDim }} className="w-20 h-20 rounded-full border-2 flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl" style={{ color: COLORS.green }}>✓</span>
          </div>
          <h2 className="text-3xl font-black mb-3" style={{ color: COLORS.text }}>Registrasi Berhasil Dikirim!</h2>
          <p className="text-lg mb-4" style={{ color: COLORS.text2 }}>Terima kasih. Tim SYNERA akan menghubungi Anda dalam 1×24 jam untuk melanjutkan proses penawaran dan implementasi.</p>
          <p style={{ color: COLORS.text3 }} className="text-sm">Redirecting ke halaman agreement...</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: COLORS.bg, color: COLORS.text }} className="min-h-screen pt-20 pb-20 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Form Header */}
        <div style={{ background: 'linear-gradient(135deg, #0d1a1a 0%, #0a0a0f 100%)', borderColor: 'rgba(6,182,212,.2)' }} className="border rounded-3xl p-8 mb-6 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full" style={{ background: 'radial-gradient(circle, rgba(6,182,212,.2), transparent 70%)', pointerEvents: 'none' }}></div>
          
          <div className="relative z-10">
            {/* Header Top: Logo + Badge */}
            <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
              <div className="flex items-center gap-3">
                <div style={{ background: 'linear-gradient(135deg, #06b6d4, #0891b2)', color: '#fff' }} className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-black">SY</div>
                <span className="text-xl font-black" style={{ color: '#fff' }}>SYNERA</span>
              </div>
              <div style={{ backgroundColor: COLORS.cyanDim, borderColor: 'rgba(6,182,212,.25)', color: COLORS.cyan, letterSpacing: '0.1em', textTransform: 'uppercase' }} className="border rounded text-xs font-bold px-3 py-1.5">Formulir Registrasi</div>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-black mb-2" style={{ color: '#fff', letterSpacing: '-0.025em', lineHeight: '1.2' }}>Form Registrasi Implementasi<br />Sistem Bisnis</h1>
            
            {/* Description */}
            <p className="text-sm mb-5" style={{ color: COLORS.text2, lineHeight: '1.6' }}>Lengkapi form ini untuk memulai proses penawaran dan implementasi SYNERA. Pengisian membutuhkan sekitar 3–5 menit.</p>
            
            {/* Meta Info */}
            <div className="flex gap-6 text-xs pt-5 flex-wrap" style={{ color: COLORS.text3, borderTop: `1px solid rgba(255,255,255,.07)` }}>
              <div>Nomer Reg <span style={{ color: COLORS.cyan }} className="font-semibold">{`SYN-${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}${String(Math.floor(Math.random() * 9000) + 1000)}`}</span></div>
              <div>Tanggal <span style={{ color: COLORS.cyan }} className="font-semibold">{new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span></div>
              <div>Produk <span style={{ color: COLORS.cyan }} className="font-semibold">SYNERA ERP</span></div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Company Data */}
          <div style={{ backgroundColor: COLORS.surface, borderColor: COLORS.border }} className="border rounded-2xl overflow-hidden">
            <div style={{ backgroundColor: COLORS.surface2, borderColor: COLORS.border }} className="flex items-center gap-3 p-4 border-b">
              <div style={{ backgroundColor: COLORS.cyan, color: COLORS.bg }} className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black">1</div>
              <div>
                <h3 className="font-bold" style={{ color: COLORS.text }}>Data Perusahaan</h3>
                <p className="text-xs" style={{ color: COLORS.text3 }}>Informasi legal dan profil bisnis</p>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label style={{ color: COLORS.text2 }} className="text-xs font-semibold block mb-2">Nama Perusahaan <span style={{ color: COLORS.cyan }}>*</span></label>
                  <input type="text" placeholder="PT / CV / UD / Nama usaha" required
                    value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})}
                    style={{ backgroundColor: COLORS.bg2, borderColor: COLORS.border2, color: COLORS.text }} 
                    className="w-full rounded-lg px-3 py-2 text-sm placeholder-gray-600 focus:border-cyan-500 focus:outline-none focus:ring-2" />
                </div>
                <div>
                  <label style={{ color: COLORS.text2 }} className="text-xs font-semibold block mb-2">Nama Brand / Toko <span style={{ color: COLORS.text3 }} className="font-normal">(opsional)</span></label>
                  <input type="text" placeholder="Jika berbeda dari nama perusahaan"
                    value={formData.brand} onChange={(e) => setFormData({...formData, brand: e.target.value})}
                    style={{ backgroundColor: COLORS.bg2, borderColor: COLORS.border2, color: COLORS.text }} 
                    className="w-full rounded-lg px-3 py-2 text-sm placeholder-gray-600 focus:outline-none focus:ring-2" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label style={{ color: COLORS.text2 }} className="text-xs font-semibold block mb-2">Bidang Usaha <span style={{ color: COLORS.cyan }}>*</span></label>
                  <select required
                    value={formData.industry} onChange={(e) => setFormData({...formData, industry: e.target.value})}
                    style={{ backgroundColor: COLORS.bg2, borderColor: COLORS.border2, color: COLORS.text }} 
                    className="w-full rounded-lg px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none focus:ring-2">
                    <option value="">-- Pilih Bidang Usaha --</option>
                    {INDUSTRIES.map(ind => <option key={ind.value} value={ind.label}>{ind.label}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ color: COLORS.text2 }} className="text-xs font-semibold block mb-2">Kota <span style={{ color: COLORS.cyan }}>*</span></label>
                  <input type="text" placeholder="Kota domisili perusahaan" required
                    value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})}
                    style={{ backgroundColor: COLORS.bg2, borderColor: COLORS.border2, color: COLORS.text }} 
                    className="w-full rounded-lg px-3 py-2 text-sm placeholder-gray-600 focus:outline-none focus:ring-2" />
                </div>
              </div>
              <div>
                <label style={{ color: COLORS.text2 }} className="text-xs font-semibold block mb-2">Alamat Perusahaan</label>
                <input type="text" placeholder="Jalan, nomor, kelurahan, kecamatan"
                  value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})}
                  style={{ backgroundColor: COLORS.bg2, borderColor: COLORS.border2, color: COLORS.text }} 
                  className="w-full rounded-lg px-3 py-2 text-sm placeholder-gray-600 focus:outline-none focus:ring-2" />
              </div>
              <div>
                <label style={{ color: COLORS.text2 }} className="text-xs font-semibold block mb-2">Website / Marketplace <span style={{ color: COLORS.text3 }} className="font-normal">(opsional)</span></label>
                <input type="text" placeholder="Contoh: tokopedia.com/namatoko atau www.website.com"
                  value={formData.website} onChange={(e) => setFormData({...formData, website: e.target.value})}
                  style={{ backgroundColor: COLORS.bg2, borderColor: COLORS.border2, color: COLORS.text }} 
                  className="w-full rounded-lg px-3 py-2 text-sm placeholder-gray-600 focus:outline-none focus:ring-2" />
              </div>
            </div>
          </div>

          {/* Section 2: PIC */}
          <div style={{ backgroundColor: COLORS.surface, borderColor: COLORS.border }} className="border rounded-2xl overflow-hidden">
            <div style={{ backgroundColor: COLORS.surface2, borderColor: COLORS.border }} className="flex items-center gap-3 p-4 border-b">
              <div style={{ backgroundColor: COLORS.cyan, color: COLORS.bg }} className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black">2</div>
              <div>
                <h3 className="font-bold" style={{ color: COLORS.text }}>Kontak PIC (Penanggung Jawab)</h3>
                <p className="text-xs" style={{ color: COLORS.text3 }}>Orang yang bisa dihubungi untuk proses implementasi</p>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label style={{ color: COLORS.text2 }} className="text-xs font-semibold block mb-2">Nama PIC <span style={{ color: COLORS.cyan }}>*</span></label>
                  <input type="text" placeholder="Nama lengkap" required
                    value={formData.pic_name} onChange={(e) => setFormData({...formData, pic_name: e.target.value})}
                    style={{ backgroundColor: COLORS.bg2, borderColor: COLORS.border2, color: COLORS.text }} 
                    className="w-full rounded-lg px-3 py-2 text-sm placeholder-gray-600 focus:outline-none focus:ring-2" />
                </div>
                <div>
                  <label style={{ color: COLORS.text2 }} className="text-xs font-semibold block mb-2">Jabatan <span style={{ color: COLORS.cyan }}>*</span></label>
                  <select required
                    value={formData.pic_title} onChange={(e) => setFormData({...formData, pic_title: e.target.value})}
                    style={{ backgroundColor: COLORS.bg2, borderColor: COLORS.border2, color: COLORS.text }} 
                    className="w-full rounded-lg px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none focus:ring-2">
                    <option value="">-- Pilih Jabatan --</option>
                    {JOB_TITLES.map(job => <option key={job.value} value={job.label}>{job.label}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label style={{ color: COLORS.text2 }} className="text-xs font-semibold block mb-2">Nomor WhatsApp <span style={{ color: COLORS.cyan }}>*</span></label>
                  <input type="tel" placeholder="08xx-xxxx-xxxx" required
                    value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    style={{ backgroundColor: COLORS.bg2, borderColor: COLORS.border2, color: COLORS.text }} 
                    className="w-full rounded-lg px-3 py-2 text-sm placeholder-gray-600 focus:outline-none focus:ring-2" />
                </div>
                <div>
                  <label style={{ color: COLORS.text2 }} className="text-xs font-semibold block mb-2">Email <span style={{ color: COLORS.cyan }}>*</span></label>
                  <input type="email" placeholder="email@perusahaan.com" required
                    value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                    style={{ backgroundColor: COLORS.bg2, borderColor: COLORS.border2, color: COLORS.text }} 
                    className="w-full rounded-lg px-3 py-2 text-sm placeholder-gray-600 focus:outline-none focus:ring-2" />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Operational Info */}
          <div style={{ backgroundColor: COLORS.surface, borderColor: COLORS.border }} className="border rounded-2xl overflow-hidden">
            <div style={{ backgroundColor: COLORS.surface2, borderColor: COLORS.border }} className="flex items-center gap-3 p-4 border-b">
              <div style={{ backgroundColor: COLORS.cyan, color: COLORS.bg }} className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black">3</div>
              <div>
                <h3 className="font-bold" style={{ color: COLORS.text }}>Informasi Operasional</h3>
                <p className="text-xs" style={{ color: COLORS.text3 }}>Membantu kami menyiapkan konfigurasi yang tepat</p>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label style={{ color: COLORS.text2 }} className="text-xs font-semibold block mb-3">Jumlah Karyawan</label>
                <div className="grid grid-cols-4 gap-2">
                  {['1–5', '6–20', '21–50', '>50'].map((range, i) => (
                    <label key={i} style={{ backgroundColor: formData.employees === range ? COLORS.cyanDim : COLORS.bg2, borderColor: formData.employees === range ? COLORS.cyan : COLORS.border, color: formData.employees === range ? COLORS.text : COLORS.text2 }} className="p-3 rounded-lg border text-center cursor-pointer text-sm font-semibold transition">
                      <input type="radio" name="employees" value={range} checked={formData.employees === range} onChange={(e) => setFormData({...formData, employees: e.target.value})} className="hidden" />
                      {range}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label style={{ color: COLORS.text2 }} className="text-xs font-semibold block mb-2">Jumlah User Sistem</label>
                <input type="number" placeholder="Estimasi jumlah pengguna sistem" min="1"
                  value={formData.users} onChange={(e) => setFormData({...formData, users: e.target.value})}
                  style={{ backgroundColor: COLORS.bg2, borderColor: COLORS.border2, color: COLORS.text }} 
                  className="w-full rounded-lg px-3 py-2 text-sm placeholder-gray-600 focus:outline-none focus:ring-2" />
              </div>
              <div>
                <label style={{ color: COLORS.text2 }} className="text-xs font-semibold block mb-3">Sistem yang Digunakan Saat Ini</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: 'excel', label: 'Excel / Google Sheet' },
                    { value: 'software', label: 'Software lain' },
                    { value: 'manual', label: 'Manual / Belum ada' },
                    { value: 'erp', label: 'ERP sebelumnya' }
                  ].map((sys) => (
                    <label key={sys.value} style={{ backgroundColor: formData.current_sys.includes(sys.value) ? COLORS.cyanDim : COLORS.bg2, borderColor: formData.current_sys.includes(sys.value) ? COLORS.cyan : COLORS.border, color: formData.current_sys.includes(sys.value) ? COLORS.text : COLORS.text2 }} className="p-3 rounded-lg border cursor-pointer text-sm font-semibold transition">
                      <input type="checkbox" value={sys.value} checked={formData.current_sys.includes(sys.value)} onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({...formData, current_sys: [...formData.current_sys, sys.value]})
                        } else {
                          setFormData({...formData, current_sys: formData.current_sys.filter(s => s !== sys.value)})
                        }
                      }} className="hidden" />
                      {sys.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Modules */}
          <div style={{ backgroundColor: COLORS.surface, borderColor: COLORS.border }} className="border rounded-2xl overflow-hidden">
            <div style={{ backgroundColor: COLORS.surface2, borderColor: COLORS.border }} className="flex items-center gap-3 p-4 border-b">
              <div style={{ backgroundColor: COLORS.cyan, color: COLORS.bg }} className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black">4</div>
              <div>
                <h3 className="font-bold" style={{ color: COLORS.text }}>Modul yang Akan Digunakan</h3>
                <p className="text-xs" style={{ color: COLORS.text3 }}>Pilih semua modul yang dibutuhkan</p>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-2">
                {['Sales', 'CRM', 'Inventory', 'Purchase', 'Accounting', 'Project Management', 'Marketplace Integration', 'Expenses'].map((mod) => (
                  <label key={mod} style={{ backgroundColor: formData.modules.includes(mod) ? COLORS.cyanDim : COLORS.bg2, borderColor: formData.modules.includes(mod) ? COLORS.cyan : COLORS.border, color: formData.modules.includes(mod) ? COLORS.text : COLORS.text2 }} className="p-3 rounded-lg border cursor-pointer text-sm font-semibold transition">
                    <input type="checkbox" value={mod} checked={formData.modules.includes(mod)} onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({...formData, modules: [...formData.modules, mod]})
                      } else {
                        setFormData({...formData, modules: formData.modules.filter(m => m !== mod)})
                      }
                    }} className="hidden" />
                    {mod}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Section 5: Package Selection */}
          <div style={{ backgroundColor: COLORS.surface, borderColor: COLORS.border }} className="border rounded-2xl overflow-hidden">
            <div style={{ backgroundColor: COLORS.surface2, borderColor: COLORS.border }} className="flex items-center gap-3 p-4 border-b">
              <div style={{ backgroundColor: COLORS.cyan, color: COLORS.bg }} className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black">5</div>
              <div>
                <h3 className="font-bold" style={{ color: COLORS.text }}>Paket Layanan</h3>
                <p className="text-xs" style={{ color: COLORS.text3 }}>Pilih paket yang sesuai</p>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'basic', icon: '🚀', name: 'SYNERA Basic', price: 'Rp 2,25 jt', desc: 'Training 3 hari · Support 2× / bulan' },
                  { id: 'growth', icon: '⭐', name: 'SYNERA Growth', price: 'Rp 3 jt', desc: 'Training 4 hari · Custom 10 jam · Onsite' },
                  { id: 'pro', icon: '💎', name: 'SYNERA Pro', price: 'Rp 4 jt', desc: 'Full managed · Custom 30 jam' }
                ].map((pkg) => (
                  <label key={pkg.id} style={{ backgroundColor: formData.package === pkg.id ? COLORS.cyanDim : COLORS.bg2, borderColor: formData.package === pkg.id ? COLORS.cyan : COLORS.border }} className="p-4 rounded-xl border cursor-pointer transition">
                    <input type="radio" name="package" value={pkg.id} checked={formData.package === pkg.id} onChange={(e) => setFormData({...formData, package: e.target.value})} className="hidden" />
                    <div className="text-2xl mb-1">{pkg.icon}</div>
                    <div className="text-sm font-bold" style={{ color: COLORS.text }}>{pkg.name}</div>
                    <div className="text-sm font-semibold" style={{ color: COLORS.cyan }}>{pkg.price}</div>
                    <div className="text-xs mt-1" style={{ color: COLORS.text3 }}>{pkg.desc}</div>
                  </label>
                ))}
              </div>
              <div>
                <label style={{ color: COLORS.text2 }} className="text-xs font-semibold block mb-3">Estimasi Mulai Implementasi</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: 'segera', label: 'Segera (minggu ini)' },
                    { value: '1bulan', label: 'Dalam 1 bulan' },
                    { value: '3bulan', label: 'Dalam 3 bulan' },
                    { value: 'survey', label: 'Masih perlu diskusi' }
                  ].map((opt) => (
                    <label key={opt.value} style={{ backgroundColor: formData.start === opt.value ? COLORS.cyanDim : COLORS.bg2, borderColor: formData.start === opt.value ? COLORS.cyan : COLORS.border, color: formData.start === opt.value ? COLORS.text : COLORS.text2 }} className="p-3 rounded-lg border cursor-pointer text-sm font-semibold transition">
                      <input type="radio" name="start" value={opt.value} checked={formData.start === opt.value} onChange={(e) => setFormData({...formData, start: e.target.value})} className="hidden" />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 6: Notes */}
          <div style={{ backgroundColor: COLORS.surface, borderColor: COLORS.border }} className="border rounded-2xl overflow-hidden">
            <div style={{ backgroundColor: COLORS.surface2, borderColor: COLORS.border }} className="flex items-center gap-3 p-4 border-b">
              <div style={{ backgroundColor: COLORS.cyan, color: COLORS.bg }} className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black">6</div>
              <div>
                <h3 className="font-bold" style={{ color: COLORS.text }}>Catatan Kebutuhan Khusus</h3>
                <p className="text-xs" style={{ color: COLORS.text3 }}>Opsional — bantu kami memahami bisnis Anda</p>
              </div>
            </div>
            <div className="p-6">
              <textarea placeholder="Contoh: integrasi marketplace Shopee, laporan per cabang, manajemen multi gudang, proses produksi, dll."
                value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})}
                style={{ backgroundColor: COLORS.bg2, borderColor: COLORS.border2, color: COLORS.text }} 
                className="w-full rounded-lg px-3 py-2 text-sm placeholder-gray-600 focus:outline-none focus:ring-2 resize-none h-24" />
            </div>
          </div>

          {/* Section 7: Signature */}
          <div style={{ backgroundColor: COLORS.surface, borderColor: COLORS.border }} className="border rounded-2xl overflow-hidden">
            <div style={{ backgroundColor: COLORS.surface2, borderColor: COLORS.border }} className="flex items-center gap-3 p-4 border-b">
              <div style={{ backgroundColor: COLORS.cyan, color: COLORS.bg }} className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black">7</div>
              <div>
                <h3 className="font-bold" style={{ color: COLORS.text }}>Persetujuan Registrasi</h3>
                <p className="text-xs" style={{ color: COLORS.text3 }}>Konfirmasi komitmen untuk memulai implementasi</p>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div style={{ backgroundColor: COLORS.bg2, borderColor: COLORS.border }} className="border rounded-lg p-4 text-sm space-y-2">
                <p><strong style={{ color: COLORS.text }}>Dengan mengisi dan menandatangani form ini, perusahaan kami menyatakan:</strong></p>
                <p style={{ color: COLORS.text2 }}>1. <strong style={{ color: COLORS.text }}>Minat dan komitmen</strong> untuk menggunakan sistem SYNERA sesuai paket yang dipilih.</p>
                <p style={{ color: COLORS.text2 }}>2. <strong style={{ color: COLORS.text }}>Bersedia melanjutkan</strong> proses penyusunan penawaran, perjanjian, dan invoice.</p>
                <p style={{ color: COLORS.text2 }}>3. Data yang diisi adalah <strong style={{ color: COLORS.text }}>benar dan dapat dipertanggungjawabkan</strong>.</p>
                <p style={{ color: COLORS.text2 }}>4. Informasi ini akan digunakan untuk keperluan <strong style={{ color: COLORS.text }}>implementasi dan administrasi SYNERA</strong> semata.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label style={{ color: COLORS.text2 }} className="text-xs font-semibold block mb-2">Nama Penandatangan <span style={{ color: COLORS.cyan }}>*</span></label>
                  <input type="text" placeholder="Nama lengkap" required
                    value={formData.signer_name} onChange={(e) => setFormData({...formData, signer_name: e.target.value})}
                    style={{ backgroundColor: COLORS.bg2, borderColor: COLORS.border2, color: COLORS.text }} 
                    className="w-full rounded-lg px-3 py-2 text-sm placeholder-gray-600 focus:outline-none focus:ring-2" />
                </div>
                <div>
                  <label style={{ color: COLORS.text2 }} className="text-xs font-semibold block mb-2">Jabatan <span style={{ color: COLORS.cyan }}>*</span></label>
                  <input type="text" placeholder="Otomatis dari Jabatan PIC di atas" required disabled
                    value={formData.signer_title || formData.pic_title} 
                    style={{ backgroundColor: COLORS.bg2, borderColor: COLORS.border2, color: COLORS.text, opacity: 0.7 }} 
                    className="w-full rounded-lg px-3 py-2 text-sm placeholder-gray-600 focus:outline-none" />
                  <p style={{ color: COLORS.text3 }} className="text-xs mt-1">Jabatan akan otomatis diambil dari Jabatan PIC di atas</p>
                </div>
              </div>

              {/* Signature Pad */}
              <div>
                <label style={{ color: COLORS.text2 }} className="text-xs font-semibold block mb-2">Tanda Tangan Digital</label>
                <div style={{ borderColor: COLORS.border2, backgroundColor: COLORS.bg2, height: '120px' }} className="relative border-2 border-dashed rounded-lg overflow-hidden">
                  <canvas 
                    ref={canvasRef}
                    onMouseDown={handleCanvasMouseDown}
                    onMouseMove={handleCanvasMouseMove}
                    onMouseUp={handleCanvasMouseUp}
                    onMouseLeave={handleCanvasMouseLeave}
                    onTouchStart={handleCanvasMouseDown}
                    onTouchMove={handleCanvasMouseMove}
                    onTouchEnd={handleCanvasMouseUp}
                    className="w-full h-full cursor-crosshair"
                  />
                  {!hasSig && (
                    <div style={{ color: COLORS.text3 }} className="absolute inset-0 flex items-center justify-center pointer-events-none text-sm">
                      Klik & geser untuk tanda tangan
                    </div>
                  )}
                </div>
                <button type="button" onClick={clearSignature} style={{ color: COLORS.text3 }} className="text-xs mt-2 underline">
                  Hapus tanda tangan
                </button>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex flex-col items-center gap-4">
            {error && (
              <div style={{ backgroundColor: 'rgba(248,113,113,.1)', borderColor: 'rgba(248,113,113,.3)', color: '#f87171' }} className="w-full border rounded-lg p-3 text-sm">
                {error}
              </div>
            )}
            <button type="submit" disabled={loading} style={{ backgroundColor: loading ? '#52525b' : COLORS.cyan, color: COLORS.bg, opacity: loading ? 0.6 : 1 }} className="w-full max-w-sm font-bold py-3 rounded-xl transition transform hover:translate-y-[-2px] hover:shadow-[0_12px_32px_rgba(6,182,212,0.3)] disabled:cursor-not-allowed">
              {loading ? '⏳ Mengirim...' : '✓ Kirim Registrasi'}
            </button>
            <p className="text-xs text-center" style={{ color: COLORS.text3 }}>
              Data Anda aman dan hanya digunakan untuk keperluan implementasi SYNERA.
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
