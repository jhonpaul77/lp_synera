import { useRegistrationStore } from '@/store/registrationStore'

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
    <div className="bg-[#09090b] text-[#f4f4f5] min-h-screen pt-16">
      {/* Action Bar */}
      <div className="sticky top-0 z-50 bg-gray-900/90 backdrop-blur border-b border-gray-800 px-6 py-3 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-700 flex items-center justify-center text-xs font-black text-white">SY</div>
          <span className="font-bold text-white">SYNERA</span>
          <div className="bg-green-500/15 border border-green-500/30 text-green-400 text-xs font-bold px-3 py-1 rounded-full">Agreement Siap</div>
        </div>
        <div className="flex gap-3">
          <button onClick={() => window.print()} className="bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 text-xs font-semibold px-4 py-2 rounded-lg transition">
            🖨 Print / PDF
          </button>
          <button onClick={() => window.close()} className="bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold px-4 py-2 rounded-lg transition">
            ✓ Selesai
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-6 py-8 pb-16">
        {/* Letterhead */}
        <div className="bg-gradient-to-b from-cyan-950/40 to-gray-950 border border-cyan-500/20 rounded-3xl p-8 mb-8 relative overflow-hidden">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gradient-radial from-cyan-500/15 to-transparent pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="flex items-start justify-between gap-6 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-cyan-700 flex items-center justify-center text-sm font-black text-white">SY</div>
                <div>
                  <div className="text-2xl font-black text-white">SYNERA</div>
                  <div className="text-xs text-gray-500">Integrated Business Management System</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-1">Nomor Dokumen</div>
                <div className="text-lg font-black text-cyan-400">{data.regNo || 'SYN-' + new Date().getFullYear() + '-0000'}</div>
                <div className="text-xs text-gray-500 mt-1">{data.date || new Date().toLocaleDateString('id-ID', {day:'numeric',month:'long',year:'numeric'})}</div>
              </div>
            </div>
            
            <div className="border-b border-cyan-500/20 pb-6 mb-6">
              <h1 className="text-3xl font-black text-white mb-2">
                Agreement Implementasi dan<br />Langganan Sistem Bisnis
              </h1>
              <p className="text-gray-400 text-sm">
                Perjanjian kerja sama implementasi dan penggunaan sistem SYNERA antara penyedia sistem dan klien.
              </p>
            </div>

            {/* Parties */}
            <div className="text-center text-xs font-bold text-gray-500 uppercase tracking-widest mb-8">Para Pihak yang Bersepakat</div>
            <div className="grid grid-cols-2 gap-6 mb-8">
              {/* Party 1 */}
              <div className="bg-gray-900/50 border border-cyan-500/20 rounded-2xl p-5">
                <div className="bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-xs font-bold px-3 py-1 rounded-lg inline-block mb-4">Pihak Pertama — Penyedia</div>
                <h3 className="text-white font-black mb-4">PT. Pintar Bisnis Indonesia</h3>
                <div className="space-y-2 text-sm">
                  <div><span className="text-gray-500 font-semibold min-w-24 inline-block">Produk</span><span className="text-gray-200">SYNERA ERP</span></div>
                  <div><span className="text-gray-500 font-semibold min-w-24 inline-block">Alamat</span><span className="text-gray-200">Jl. Contoh No. 1, Jakarta</span></div>
                  <div><span className="text-gray-500 font-semibold min-w-24 inline-block">Diwakili</span><span className="text-gray-200">[Nama Direktur]</span></div>
                  <div><span className="text-gray-500 font-semibold min-w-24 inline-block">Jabatan</span><span className="text-gray-200">Direktur Utama</span></div>
                </div>
                <div className="border-t border-gray-700 mt-4 pt-3 text-xs text-gray-400 italic">
                  Selanjutnya disebut <span className="text-cyan-400 font-semibold">Pihak Pertama</span>
                </div>
              </div>

              {/* Party 2 */}
              <div className="bg-gray-900/50 border border-purple-500/20 rounded-2xl p-5">
                <div className="bg-purple-500/15 border border-purple-500/30 text-purple-400 text-xs font-bold px-3 py-1 rounded-lg inline-block mb-4">Pihak Kedua — Klien</div>
                <h3 className="text-white font-black mb-4">{data.company || '—'}</h3>
                <div className="space-y-2 text-sm">
                  <div><span className="text-gray-500 font-semibold min-w-24 inline-block">Bidang</span><span className="text-gray-200">{data.industry || '—'}</span></div>
                  <div><span className="text-gray-500 font-semibold min-w-24 inline-block">Alamat</span><span className="text-gray-200">{data.address ? data.address + ', ' + data.city : data.city || '—'}</span></div>
                  <div><span className="text-gray-500 font-semibold min-w-24 inline-block">Diwakili</span><span className="text-gray-200">{data.pic_name || '—'}</span></div>
                  <div><span className="text-gray-500 font-semibold min-w-24 inline-block">Jabatan</span><span className="text-gray-200">{data.pic_title || '—'}</span></div>
                </div>
                <div className="border-t border-gray-700 mt-4 pt-3 text-xs text-gray-400 italic">
                  Selanjutnya disebut <span className="text-purple-400 font-semibold">Pihak Kedua</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed mb-8">
              Kedua belah pihak sepakat untuk melakukan kerja sama implementasi dan penggunaan sistem bisnis dengan ketentuan sebagai berikut.
            </p>
          </div>
        </div>

        {/* Articles */}
        <div className="space-y-6">
          {/* Article 1 */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
            <div className="flex items-center gap-3 bg-gray-800 p-4 border-b border-gray-800">
              <div className="w-7 h-7 rounded-lg bg-cyan-500 flex items-center justify-center text-xs font-black text-gray-950">1</div>
              <h3 className="font-bold text-white">Ruang Lingkup Layanan</h3>
            </div>
            <div className="p-6 text-sm text-gray-400 leading-relaxed space-y-3">
              <p>Pihak Pertama menyediakan sistem bisnis berbasis ERP (SYNERA) yang dapat digunakan oleh Pihak Kedua untuk mendukung operasional perusahaan.</p>
              <div>
                <p className="mb-2">Sistem yang disediakan mencakup modul berikut:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-400">
                  {modules.map((mod: any, i: number) => (
                    <li key={i}>{mod}</li>
                  ))}
                </ul>
              </div>
              <p>Sistem disediakan dalam bentuk paket implementasi standar sesuai paket layanan yang dipilih oleh Pihak Kedua.</p>
            </div>
          </div>

          {/* Article 2 */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
            <div className="flex items-center gap-3 bg-gray-800 p-4 border-b border-gray-800">
              <div className="w-7 h-7 rounded-lg bg-cyan-500 flex items-center justify-center text-xs font-black text-gray-950">2</div>
              <h3 className="font-bold text-white">Paket Layanan</h3>
            </div>
            <div className="p-6 text-sm text-gray-400 leading-relaxed space-y-3">
              <p>Pihak Kedua memilih paket layanan sebagai berikut:</p>
              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
                <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-2">Paket Dipilih</div>
                <div className="text-white font-bold">{pkgInfo.name}</div>
              </div>
              <div>
                <p className="mb-2">Layanan dalam paket meliputi:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-400">
                  {pkgInfo.details.map((detail: any, i: number) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
              </div>
              <p>Layanan yang tidak termasuk dalam paket akan dianggap sebagai layanan tambahan dan dapat dikenakan biaya terpisah.</p>
            </div>
          </div>

          {/* Article 3 */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
            <div className="flex items-center gap-3 bg-gray-800 p-4 border-b border-gray-800">
              <div className="w-7 h-7 rounded-lg bg-cyan-500 flex items-center justify-center text-xs font-black text-gray-950">3</div>
              <h3 className="font-bold text-white">Jadwal Implementasi</h3>
            </div>
            <div className="p-6 text-sm text-gray-400 leading-relaxed space-y-3">
              <p>Proses implementasi sistem akan dilakukan dengan tahapan sebagai berikut:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Setup sistem dan konfigurasi awal</li>
                <li>Training pengguna (sesuai paket)</li>
                <li>Persiapan operasional dan migrasi data</li>
                <li>Go-Live sistem</li>
              </ul>
              <p>Estimasi waktu implementasi adalah <strong className="text-white">2 sampai 3 minggu</strong> sejak pembayaran Down Payment diterima dan data awal dari Pihak Kedua telah diberikan.</p>
              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
                <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-2">Estimasi Mulai</div>
                <div className="text-white font-bold">{data.start || '—'}</div>
              </div>
            </div>
          </div>

          {/* Article 4 */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
            <div className="flex items-center gap-3 bg-gray-800 p-4 border-b border-gray-800">
              <div className="w-7 h-7 rounded-lg bg-cyan-500 flex items-center justify-center text-xs font-black text-gray-950">4</div>
              <h3 className="font-bold text-white">Biaya Layanan</h3>
            </div>
            <div className="p-6 text-sm text-gray-400 leading-relaxed space-y-3">
              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
                <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-2">Total Biaya Layanan (per tahun)</div>
                <div className="text-white font-bold text-lg">{formatRupiah(totalPrice)}</div>
              </div>
              <p>Biaya tersebut sudah termasuk: penggunaan sistem ERP, implementasi standar, training pengguna, dan support sistem sesuai paket.</p>
              <p>Biaya <strong className="text-white">tidak termasuk</strong>: custom development, integrasi tambahan di luar paket, dan layanan konsultasi di luar cakupan paket.</p>
              {data.notes && data.notes !== '-' && (
                <p><strong className="text-white">Catatan kebutuhan khusus:</strong> {data.notes}</p>
              )}
            </div>
          </div>

          {/* Article 5 */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
            <div className="flex items-center gap-3 bg-gray-800 p-4 border-b border-gray-800">
              <div className="w-7 h-7 rounded-lg bg-cyan-500 flex items-center justify-center text-xs font-black text-gray-950">5</div>
              <h3 className="font-bold text-white">Skema Pembayaran</h3>
            </div>
            <div className="p-6 text-sm text-gray-400 leading-relaxed space-y-3">
              <p>Pembayaran dilakukan dengan skema sebagai berikut:</p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-2 px-3 text-gray-400 font-semibold">Tahap</th>
                      <th className="text-center py-2 px-3 text-gray-400 font-semibold">Persentase</th>
                      <th className="text-right py-2 px-3 text-gray-400 font-semibold">Nominal</th>
                      <th className="text-left py-2 px-3 text-gray-400 font-semibold">Waktu</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-700">
                      <td className="py-2 px-3">Down Payment (DP)</td>
                      <td className="text-center py-2 px-3">50%</td>
                      <td className="text-right py-2 px-3 text-cyan-400 font-bold">{formatRupiah(dpAmount)}</td>
                      <td className="py-2 px-3">Setelah penandatanganan agreement</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2 px-3">Pelunasan</td>
                      <td className="text-center py-2 px-3">50%</td>
                      <td className="text-right py-2 px-3 text-cyan-400 font-bold">{formatRupiah(pelunasanAmount)}</td>
                      <td className="py-2 px-3">Sebelum sistem Go-Live</td>
                    </tr>
                    <tr className="bg-gray-800">
                      <td colSpan={2} className="py-2 px-3 font-bold text-white">Total</td>
                      <td className="text-right py-2 px-3 text-cyan-400 font-bold">{formatRupiah(totalPrice)}</td>
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
            <div key={article.num} className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
              <div className="flex items-center gap-3 bg-gray-800 p-4 border-b border-gray-800">
                <div className="w-7 h-7 rounded-lg bg-cyan-500 flex items-center justify-center text-xs font-black text-gray-950">{article.num}</div>
                <h3 className="font-bold text-white">{article.title}</h3>
              </div>
              <div className="p-6 text-sm text-gray-400 leading-relaxed">
                {article.content}
              </div>
            </div>
          ))}
        </div>

        {/* Signature Section */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mt-8">
          <div className="text-center mb-8">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Penandatanganan</div>
            <p className="text-sm text-gray-400">
              Dengan menandatangani dokumen ini, kedua belah pihak menyatakan <strong className="text-white">telah membaca, memahami, dan menyetujui</strong> seluruh ketentuan dalam perjanjian ini.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {/* Party 1 Sig */}
            <div className="text-center">
              <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-3">Pihak Pertama</div>
              <div className="font-semibold text-white mb-6">PT. Pintar Bisnis Indonesia</div>
              <div className="border-2 border-dashed border-gray-700 rounded-lg h-24 mb-4 flex items-center justify-center bg-gray-950">
                <span className="text-gray-600 text-sm">Tanda tangan</span>
              </div>
              <div className="font-semibold text-white">[Nama Direktur]</div>
              <div className="text-xs text-gray-500 mt-1">Direktur Utama</div>
              <div className="text-xs text-gray-600 mt-2">{data.date || '—'}</div>
            </div>

            {/* Party 2 Sig */}
            <div className="text-center">
              <div className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-3">Pihak Kedua</div>
              <div className="font-semibold text-white mb-6">{data.company || '—'}</div>
              <div className="border-2 border-dashed border-gray-700 rounded-lg h-24 mb-4 flex items-center justify-center bg-gray-950 overflow-hidden">
                {data.signature && data.signature !== 'data:,' ? (
                  <img src={data.signature} alt="signature" className="max-w-full max-h-full object-contain" />
                ) : (
                  <span className="text-gray-600 text-sm">Dari registrasi</span>
                )}
              </div>
              <div className="font-semibold text-white">{data.signer_name || data.pic_name || '—'}</div>
              <div className="text-xs text-gray-500 mt-1">{data.signer_title || data.pic_title || '—'}</div>
              <div className="text-xs text-gray-600 mt-2">{data.date || '—'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
