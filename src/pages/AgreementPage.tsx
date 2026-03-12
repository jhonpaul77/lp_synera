import { useRegistrationStore } from '@/store/registrationStore'

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

const packageDetails: any = {
  basic: {
    name: 'SYNERA Basic',
    price: 'Rp 27.000.000',
    details: ['Training 3 hari onsite + go-live', 'Setup & konfigurasi awal sistem', 'Online meeting 2× per bulan', 'Group WhatsApp support', 'Update sistem rutin']
  },
  growth: {
    name: 'SYNERA Growth',
    price: 'Rp 36.000.000',
    details: ['Training 4 hari onsite', 'Online meeting 4× per bulan', '1× kunjungan onsite per kuartal', 'Free minor custom 10 jam/tahun', 'Prioritas support', 'Review laporan keuangan & operasional']
  },
  pro: {
    name: 'SYNERA Pro',
    price: 'Rp 48.000.000',
    details: ['Training 5 hari onsite', 'Support meeting 1× per minggu', 'Kunjungan onsite tiap bulan', 'Free custom 30 jam/tahun', 'Exclusive management dashboard', 'Assistance closing laporan bulanan', 'Prioritas bug fix']
  }
}

export default function AgreementPage() {
  const { data } = useRegistrationStore()
  
  const pkgInfo = packageDetails[(data.package || 'basic') as keyof typeof packageDetails]
  const modules = data.modules && data.modules.length > 0 ? data.modules : ['Sesuai kebutuhan klien']
  
  // Calculate payment
  const priceMap: Record<string, number> = {
    'basic': 27000000,
    'growth': 36000000,
    'pro': 48000000
  }
  const packageKey = (data.package as string) || 'basic'
  const totalPrice = priceMap[packageKey] || 0
  const dpAmount = Math.round(totalPrice / 2)
  const pelunasanAmount = totalPrice - dpAmount

  const formatRupiah = (num: number) => {
    return 'Rp ' + num.toLocaleString('id-ID')
  }

  return (
    <div style={{ backgroundColor: COLORS.bg, color: COLORS.text }} className="min-h-screen pt-16">
      {/* Action Bar */}
      <div style={{ backgroundColor: COLORS.surface2 + 'e6', borderColor: COLORS.border }} className="sticky top-0 z-50 backdrop-blur border-b px-6 py-3 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div style={{ background: 'linear-gradient(135deg, #06b6d4, #0891b2)', color: '#fff' }} className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black">SY</div>
          <span className="font-bold" style={{ color: COLORS.text }}>SYNERA</span>
          <div style={{ backgroundColor: COLORS.greenDim, borderColor: COLORS.green + '4d', color: COLORS.green }} className="text-xs font-bold px-3 py-1 rounded-full border">Agreement Siap</div>
        </div>
        <div className="flex gap-3">
          <button onClick={() => window.print()} style={{ backgroundColor: COLORS.surface2, borderColor: COLORS.border, color: COLORS.text2 }} className="border text-xs font-semibold px-4 py-2 rounded-lg transition hover:opacity-75">
            🖨 Print / PDF
          </button>
          <button onClick={() => window.close()} style={{ backgroundColor: COLORS.cyan, color: COLORS.bg }} className="text-xs font-bold px-4 py-2 rounded-lg transition hover:opacity-90">
            ✓ Selesai
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-6 py-8 pb-16">
        {/* Letterhead */}
        <div style={{ background: 'linear-gradient(135deg, rgba(6,182,212,.04) 0%, rgba(10,10,15,.5) 100%)', borderColor: 'rgba(6,182,212,.2)' }} className="border rounded-3xl p-8 mb-8 relative overflow-hidden">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gradient-radial from-cyan-500/15 to-transparent pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="flex items-start justify-between gap-6 mb-6">
              <div className="flex items-center gap-3">
                <div style={{ background: 'linear-gradient(135deg, #06b6d4, #0891b2)', color: '#fff' }} className="w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-black">SY</div>
                <div>
                  <div className="text-2xl font-black" style={{ color: COLORS.text }}>SYNERA</div>
                  <div className="text-xs" style={{ color: COLORS.text3 }}>Integrated Business Management System</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: COLORS.text3 }}>Nomor Dokumen</div>
                <div className="text-lg font-black" style={{ color: COLORS.cyan }}>{data.regNo || 'SYN-' + new Date().getFullYear() + '-0000'}</div>
                <div className="text-xs mt-1" style={{ color: COLORS.text3 }}>{data.date || new Date().toLocaleDateString('id-ID', {day:'numeric',month:'long',year:'numeric'})}</div>
              </div>
            </div>
            
            <div style={{ borderColor: 'rgba(6,182,212,.2)' }} className="border-b pb-6 mb-6">
              <h1 className="text-3xl font-black mb-2" style={{ color: COLORS.text }}>
                Agreement Implementasi dan<br />Langganan Sistem Bisnis
              </h1>
              <p className="text-sm" style={{ color: COLORS.text2 }}>
                Perjanjian kerja sama implementasi dan penggunaan sistem SYNERA antara penyedia sistem dan klien.
              </p>
            </div>

            {/* Parties */}
            <div className="text-center text-xs font-bold uppercase tracking-widest mb-8" style={{ color: COLORS.text3 }}>Para Pihak yang Bersepakat</div>
            <div className="grid grid-cols-2 gap-6 mb-8">
              {/* Party 1 */}
              <div style={{ backgroundColor: COLORS.bg2, borderColor: COLORS.border }} className="border rounded-2xl p-5">
                <div style={{ backgroundColor: COLORS.cyanDim, borderColor: COLORS.cyan + '4d', color: COLORS.cyan }} className="text-xs font-bold px-3 py-1 rounded-lg inline-block mb-4 border">Pihak Pertama — Penyedia</div>
                <h3 className="font-black mb-4" style={{ color: COLORS.text }}>PT. Pintar Bisnis Indonesia</h3>
                <div className="space-y-2 text-sm">
                  <div><span style={{ color: COLORS.text3 }} className="font-semibold min-w-24 inline-block">Produk</span><span style={{ color: COLORS.text2 }}>SYNERA ERP</span></div>
                  <div><span style={{ color: COLORS.text3 }} className="font-semibold min-w-24 inline-block">Alamat</span><span style={{ color: COLORS.text2 }}>Jl. Contoh No. 1, Jakarta</span></div>
                  <div><span style={{ color: COLORS.text3 }} className="font-semibold min-w-24 inline-block">Diwakili</span><span style={{ color: COLORS.text2 }}>[Nama Direktur]</span></div>
                  <div><span style={{ color: COLORS.text3 }} className="font-semibold min-w-24 inline-block">Jabatan</span><span style={{ color: COLORS.text2 }}>Direktur Utama</span></div>
                </div>
                <div style={{ borderColor: COLORS.border, color: COLORS.text3 }} className="border-t mt-4 pt-3 text-xs italic">
                  Selanjutnya disebut <span style={{ color: COLORS.cyan }} className="font-semibold">Pihak Pertama</span>
                </div>
              </div>

              {/* Party 2 */}
              <div style={{ backgroundColor: COLORS.bg2, borderColor: COLORS.border }} className="border rounded-2xl p-5">
                <div style={{ backgroundColor: 'rgba(168,85,247,.1)', borderColor: 'rgba(168,85,247,.3)', color: '#a855f7' }} className="text-xs font-bold px-3 py-1 rounded-lg inline-block mb-4 border">Pihak Kedua — Klien</div>
                <h3 className="font-black mb-4" style={{ color: COLORS.text }}>{data.company || '—'}</h3>
                <div className="space-y-2 text-sm">
                  <div><span style={{ color: COLORS.text3 }} className="font-semibold min-w-24 inline-block">Bidang</span><span style={{ color: COLORS.text2 }}>{data.industry || '—'}</span></div>
                  <div><span style={{ color: COLORS.text3 }} className="font-semibold min-w-24 inline-block">Alamat</span><span style={{ color: COLORS.text2 }}>{data.address ? data.address + ', ' + data.city : data.city || '—'}</span></div>
                  <div><span style={{ color: COLORS.text3 }} className="font-semibold min-w-24 inline-block">Diwakili</span><span style={{ color: COLORS.text2 }}>{data.pic_name || '—'}</span></div>
                  <div><span style={{ color: COLORS.text3 }} className="font-semibold min-w-24 inline-block">Jabatan</span><span style={{ color: COLORS.text2 }}>{data.pic_title || '—'}</span></div>
                </div>
                <div style={{ borderColor: COLORS.border, color: COLORS.text3 }} className="border-t mt-4 pt-3 text-xs italic">
                  Selanjutnya disebut <span style={{ color: '#a855f7' }} className="font-semibold">Pihak Kedua</span>
                </div>
              </div>
            </div>

            <p className="text-sm leading-relaxed mb-8" style={{ color: COLORS.text2 }}>
              Kedua belah pihak sepakat untuk melakukan kerja sama implementasi dan penggunaan sistem bisnis dengan ketentuan sebagai berikut.
            </p>
          </div>
        </div>

        {/* Articles */}
        <div className="space-y-6">
          {/* Article 1 */}
          <div style={{ backgroundColor: COLORS.surface, borderColor: COLORS.border }} className="border rounded-2xl overflow-hidden">
            <div style={{ backgroundColor: COLORS.surface2, borderColor: COLORS.border }} className="flex items-center gap-3 p-4 border-b">
              <div style={{ backgroundColor: COLORS.cyan, color: COLORS.bg }} className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black">1</div>
              <h3 className="font-bold" style={{ color: COLORS.text }}>Ruang Lingkup Layanan</h3>
            </div>
            <div style={{ color: COLORS.text2 }} className="p-6 text-sm leading-relaxed space-y-3">
              <p>Pihak Pertama menyediakan sistem bisnis berbasis ERP (SYNERA) yang dapat digunakan oleh Pihak Kedua untuk mendukung operasional perusahaan.</p>
              <div>
                <p className="mb-2">Sistem yang disediakan mencakup modul berikut:</p>
                <ul className="list-disc list-inside space-y-1">
                  {modules.map((mod: any, i: number) => (
                    <li key={i}>{mod}</li>
                  ))}
                </ul>
              </div>
              <p>Sistem disediakan dalam bentuk paket implementasi standar sesuai paket layanan yang dipilih oleh Pihak Kedua.</p>
            </div>
          </div>

          {/* Article 2 */}
          <div style={{ backgroundColor: COLORS.surface, borderColor: COLORS.border }} className="border rounded-2xl overflow-hidden">
            <div style={{ backgroundColor: COLORS.surface2, borderColor: COLORS.border }} className="flex items-center gap-3 p-4 border-b">
              <div style={{ backgroundColor: COLORS.cyan, color: COLORS.bg }} className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black">2</div>
              <h3 className="font-bold" style={{ color: COLORS.text }}>Paket Layanan</h3>
            </div>
            <div style={{ color: COLORS.text2 }} className="p-6 text-sm leading-relaxed space-y-3">
              <p>Pihak Kedua memilih paket layanan sebagai berikut:</p>
              <div style={{ backgroundColor: COLORS.cyanDim, borderColor: COLORS.cyan + '4d' }} className="border rounded-lg p-4">
                <div style={{ color: COLORS.cyan }} className="text-xs font-bold uppercase tracking-widest mb-2">Paket Dipilih</div>
                <div className="font-bold" style={{ color: COLORS.text }}>{pkgInfo.name}</div>
              </div>
              <div>
                <p className="mb-2">Layanan dalam paket meliputi:</p>
                <ul className="list-disc list-inside space-y-1">
                  {pkgInfo.details.map((detail: any, i: number) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
              </div>
              <p>Layanan yang tidak termasuk dalam paket akan dianggap sebagai layanan tambahan dan dapat dikenakan biaya terpisah.</p>
            </div>
          </div>

          {/* Article 3 */}
          <div style={{ backgroundColor: COLORS.surface, borderColor: COLORS.border }} className="border rounded-2xl overflow-hidden">
            <div style={{ backgroundColor: COLORS.surface2, borderColor: COLORS.border }} className="flex items-center gap-3 p-4 border-b">
              <div style={{ backgroundColor: COLORS.cyan, color: COLORS.bg }} className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black">3</div>
              <h3 className="font-bold" style={{ color: COLORS.text }}>Jadwal Implementasi</h3>
            </div>
            <div style={{ color: COLORS.text2 }} className="p-6 text-sm leading-relaxed space-y-3">
              <p>Proses implementasi sistem akan dilakukan dengan tahapan sebagai berikut:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Setup sistem dan konfigurasi awal</li>
                <li>Training pengguna (sesuai paket)</li>
                <li>Persiapan operasional dan migrasi data</li>
                <li>Go-Live sistem</li>
              </ul>
              <p>Estimasi waktu implementasi adalah <strong style={{ color: COLORS.text }}>2 sampai 3 minggu</strong> sejak pembayaran Down Payment diterima dan data awal dari Pihak Kedua telah diberikan.</p>
              <div style={{ backgroundColor: COLORS.cyanDim, borderColor: COLORS.cyan + '4d' }} className="border rounded-lg p-4">
                <div style={{ color: COLORS.cyan }} className="text-xs font-bold uppercase tracking-widest mb-2">Estimasi Mulai</div>
                <div className="font-bold" style={{ color: COLORS.text }}>{data.start || '—'}</div>
              </div>
            </div>
          </div>

          {/* Article 4 */}
          <div style={{ backgroundColor: COLORS.surface, borderColor: COLORS.border }} className="border rounded-2xl overflow-hidden">
            <div style={{ backgroundColor: COLORS.surface2, borderColor: COLORS.border }} className="flex items-center gap-3 p-4 border-b">
              <div style={{ backgroundColor: COLORS.cyan, color: COLORS.bg }} className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black">4</div>
              <h3 className="font-bold" style={{ color: COLORS.text }}>Biaya Layanan</h3>
            </div>
            <div style={{ color: COLORS.text2 }} className="p-6 text-sm leading-relaxed space-y-3">
              <div style={{ backgroundColor: COLORS.cyanDim, borderColor: COLORS.cyan + '4d' }} className="border rounded-lg p-4">
                <div style={{ color: COLORS.cyan }} className="text-xs font-bold uppercase tracking-widest mb-2">Total Biaya Layanan (per tahun)</div>
                <div className="text-white font-bold text-lg">{formatRupiah(totalPrice)}</div>
              </div>
              <p>Biaya tersebut sudah termasuk: penggunaan sistem ERP, implementasi standar, training pengguna, dan support sistem sesuai paket.</p>
              <p>Biaya <strong style={{ color: COLORS.text }}>tidak termasuk</strong>: custom development, integrasi tambahan di luar paket, dan layanan konsultasi di luar cakupan paket.</p>
              {data.notes && data.notes !== '-' && (
                <p><strong style={{ color: COLORS.text }}>Catatan kebutuhan khusus:</strong> {data.notes}</p>
              )}
            </div>
          </div>

          {/* Article 5 */}
          <div style={{ backgroundColor: COLORS.surface, borderColor: COLORS.border }} className="border rounded-2xl overflow-hidden">
            <div style={{ backgroundColor: COLORS.surface2, borderColor: COLORS.border }} className="flex items-center gap-3 p-4 border-b">
              <div style={{ backgroundColor: COLORS.cyan, color: COLORS.bg }} className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black">5</div>
              <h3 className="font-bold" style={{ color: COLORS.text }}>Skema Pembayaran</h3>
            </div>
            <div style={{ color: COLORS.text2 }} className="p-6 text-sm leading-relaxed space-y-3">
              <p>Pembayaran dilakukan dengan skema sebagai berikut:</p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr style={{ borderColor: COLORS.border }}>
                      <th className="text-left py-2 px-3 font-semibold" style={{ color: COLORS.text3 }}>Tahap</th>
                      <th className="text-center py-2 px-3 font-semibold" style={{ color: COLORS.text3 }}>Persentase</th>
                      <th className="text-right py-2 px-3 font-semibold" style={{ color: COLORS.text3 }}>Nominal</th>
                      <th className="text-left py-2 px-3 font-semibold" style={{ color: COLORS.text3 }}>Waktu</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderColor: COLORS.border }}>
                      <td className="py-2 px-3">Down Payment (DP)</td>
                      <td className="text-center py-2 px-3">50%</td>
                      <td className="text-right py-2 px-3 font-bold" style={{ color: COLORS.cyan }}>{formatRupiah(dpAmount)}</td>
                      <td className="py-2 px-3">Setelah penandatanganan agreement</td>
                    </tr>
                    <tr style={{ borderColor: COLORS.border }}>
                      <td className="py-2 px-3">Pelunasan</td>
                      <td className="text-center py-2 px-3">50%</td>
                      <td className="text-right py-2 px-3 font-bold" style={{ color: COLORS.cyan }}>{formatRupiah(pelunasanAmount)}</td>
                      <td className="py-2 px-3">Sebelum sistem Go-Live</td>
                    </tr>
                    <tr style={{ backgroundColor: COLORS.surface2 }}>
                      <td colSpan={2} className="py-2 px-3 font-bold" style={{ color: COLORS.text }}>Total</td>
                      <td className="text-right py-2 px-3 font-bold" style={{ color: COLORS.cyan }}>{formatRupiah(totalPrice)}</td>
                      <td className="py-2 px-3">—</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>Pembayaran dilakukan melalui transfer bank ke rekening Pihak Pertama yang akan dicantumkan pada invoice resmi.</p>
            </div>
          </div>

          {/* Articles 6-12 - Summary */}
          {[
            {num: 6, title: 'Masa Layanan dan Langganan Tahunan', content: 'Layanan sistem ERP diberikan dalam bentuk langganan (subscription) tahunan dengan masa berlaku 12 (dua belas) bulan sejak sistem dinyatakan Go-Live. Setelah masa layanan berakhir, Pihak Kedua dapat melanjutkan penggunaan sistem dengan melakukan perpanjangan langganan tahunan.'},
            {num: 7, title: 'Custom Development', content: 'Permintaan perubahan sistem atau pengembangan fitur tambahan yang tidak termasuk dalam paket layanan akan dianggap sebagai custom development dan akan didiskusikan terlebih dahulu.'},
            {num: 8, title: 'Tanggung Jawab Pihak Pertama', content: 'Pihak Pertama berkewajiban untuk: menyediakan sistem ERP sesuai paket, melakukan setup dan konfigurasi, memberikan training, dan memberikan support sistem selama masa kontrak.'},
            {num: 9, title: 'Tanggung Jawab Pihak Kedua', content: 'Pihak Kedua berkewajiban untuk: menyediakan data implementasi, menunjuk PIC, mengikuti training, dan melakukan pembayaran sesuai jadwal.'},
            {num: 10, title: 'Support dan Maintenance', content: 'Pihak Pertama menyediakan layanan support selama masa kontrak berlangsung sesuai paket layanan yang dipilih melalui grup komunikasi, online meeting, dan kunjungan onsite.'},
            {num: 11, title: 'Kerahasiaan Data', content: 'Pihak Pertama berkewajiban menjaga kerahasiaan data milik Pihak Kedua dan tidak akan menggunakannya untuk kepentingan lain tanpa persetujuan.'},
            {num: 12, title: 'Penutup', content: 'Perjanjian ini dibuat dengan itikad baik dan disetujui oleh kedua belah pihak serta berlaku sejak tanggal ditandatangani oleh kedua belah pihak.'}
          ].map((article) => (
            <div key={article.num} style={{ backgroundColor: COLORS.surface, borderColor: COLORS.border }} className="border rounded-2xl overflow-hidden">
              <div style={{ backgroundColor: COLORS.surface2, borderColor: COLORS.border }} className="flex items-center gap-3 p-4 border-b">
                <div style={{ backgroundColor: COLORS.cyan, color: COLORS.bg }} className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black">{article.num}</div>
                <h3 className="font-bold" style={{ color: COLORS.text }}>{article.title}</h3>
              </div>
              <div style={{ color: COLORS.text2 }} className="p-6 text-sm leading-relaxed">
                {article.content}
              </div>
            </div>
          ))}
        </div>

        {/* Signature Section */}
        <div style={{ backgroundColor: COLORS.surface, borderColor: COLORS.border }} className="border rounded-2xl p-8 mt-8">
          <div className="text-center mb-8">
            <div style={{ color: COLORS.text3 }} className="text-xs font-bold uppercase tracking-widest mb-2">Penandatanganan</div>
            <p className="text-sm" style={{ color: COLORS.text2 }}>
              Dengan menandatangani dokumen ini, kedua belah pihak menyatakan <strong style={{ color: COLORS.text }}>telah membaca, memahami, dan menyetujui</strong> seluruh ketentuan dalam perjanjian ini.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {/* Party 1 Sig */}
            <div className="text-center">
              <div style={{ color: COLORS.cyan }} className="text-xs font-bold uppercase tracking-widest mb-3">Pihak Pertama</div>
              <div className="font-semibold mb-6" style={{ color: COLORS.text }}>PT. Pintar Bisnis Indonesia</div>
              <div style={{ borderColor: COLORS.border, backgroundColor: COLORS.bg2 }} className="border-2 border-dashed rounded-lg h-24 mb-4 flex items-center justify-center">
                <span style={{ color: COLORS.text3 }} className="text-sm">Tanda tangan</span>
              </div>
              <div className="font-semibold" style={{ color: COLORS.text }}>[Nama Direktur]</div>
              <div className="text-xs" style={{ color: COLORS.text3 }}>Direktur Utama</div>
              <div className="text-xs mt-2" style={{ color: COLORS.text3 }}>{data.date || '—'}</div>
            </div>

            {/* Party 2 Sig */}
            <div className="text-center">
              <div style={{ color: '#a855f7' }} className="text-xs font-bold uppercase tracking-widest mb-3">Pihak Kedua</div>
              <div className="font-semibold mb-6" style={{ color: COLORS.text }}>{data.company || '—'}</div>
              <div style={{ borderColor: COLORS.border, backgroundColor: COLORS.bg2 }} className="border-2 border-dashed rounded-lg h-24 mb-4 flex items-center justify-center overflow-hidden">
                {data.signature && data.signature !== 'data:,' ? (
                  <img src={data.signature} alt="signature" className="max-w-full max-h-full object-contain" />
                ) : (
                  <span style={{ color: COLORS.text3 }} className="text-sm">Dari registrasi</span>
                )}
              </div>
              <div className="font-semibold" style={{ color: COLORS.text }}>{data.signer_name || data.pic_name || '—'}</div>
              <div className="text-xs mt-1" style={{ color: COLORS.text3 }}>{data.signer_title || data.pic_title || '—'}</div>
              <div className="text-xs mt-2" style={{ color: COLORS.text3 }}>{data.date || '—'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
