import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
export default function IndexPage() {
    const navigate = useNavigate();
    const [openFaq, setOpenFaq] = useState(null);
    const [showCompare, setShowCompare] = useState(false);
    const faqItems = [
        { q: 'Apakah bisa bayar bulanan?', a: 'Sistem kami ditagih secara tahunan untuk memberikan harga terbaik kepada klien. Namun kami membuka opsi pembayaran dengan cicilan — silakan hubungi tim kami untuk membahas lebih lanjut.' },
        { q: 'Bisa upgrade paket di tengah periode?', a: 'Bisa. Upgrade bisa dilakukan kapan saja. Data, konfigurasi, dan riwayat transaksi Anda tidak akan hilang. Anda hanya membayar selisih harga untuk sisa periode berjalan.' },
        { q: 'Berapa lama proses implementasi?', a: 'Paket Basic dirancang untuk go-live dalam 3 hari training onsite. Growth dan Pro memiliki proses onboarding yang lebih mendalam, disesuaikan dengan kompleksitas kebutuhan bisnis Anda.' },
        { q: 'Apakah data perusahaan kami aman?', a: 'Keamanan data adalah prioritas utama kami. Semua data dienkripsi dengan standar industri dan disimpan di cloud dengan backup otomatis harian. Infrastruktur kami beroperasi dengan SLA uptime 99.9%.' },
        { q: 'Jam custom habis, bisa tambah?', a: 'Tentu. Jam custom tambahan tersedia dengan biaya terpisah yang kompetitif. Tim kami akan memberikan estimasi scope dan biaya sebelum pengerjaan dimulai — tidak ada kejutan di akhir.' },
        { q: 'Apakah SYNERA cocok untuk bisnis dengan banyak cabang?', a: 'Ya. SYNERA dirancang untuk skalabilitas — dari satu lokasi hingga jaringan multi-cabang. Semua data terpusat dan bisa diakses sesuai hak akses masing-masing pengguna.' }
    ];
    return (_jsxs("div", { className: "bg-[#09090b] text-[#f4f4f5] min-h-screen overflow-x-hidden", style: { position: 'relative' }, children: [_jsx("style", { children: `
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .hero-grid-animate {
          animation: fadeIn 0.8s 0.2s both;
        }
      ` }), _jsx("div", { style: {
                    position: 'fixed',
                    inset: 0,
                    pointerEvents: 'none',
                    zIndex: 0,
                    opacity: 0.03,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
                } }), _jsxs("div", { style: { position: 'relative', zIndex: 1 }, children: [_jsxs("section", { className: "relative min-h-screen flex flex-col items-center justify-center text-center py-20 px-6 overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 opacity-[0.03] pointer-events-none z-0 hero-grid-animate", style: {
                                    backgroundImage: 'linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)',
                                    backgroundSize: '60px 60px',
                                    maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 100%)',
                                } }), _jsx("div", { className: "absolute top-[20%] left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none z-0", style: {
                                    background: 'radial-gradient(ellipse, rgba(6,182,212,.18) 0%, transparent 70%)',
                                } }), _jsxs("div", { className: "relative z-10", children: [_jsxs("div", { className: "inline-flex items-center gap-2 rounded-full px-4 py-2 mb-7", style: {
                                            background: 'rgba(6,182,212,.12)',
                                            border: '1px solid rgba(6,182,212,.25)',
                                            color: '#06b6d4',
                                            fontSize: '0.75rem',
                                            fontWeight: '700',
                                            letterSpacing: '0.1em',
                                            textTransform: 'uppercase'
                                        }, children: [_jsx("span", { className: "w-1.5 h-1.5 rounded-full", style: { background: '#06b6d4', animation: 'pulse 2s infinite' } }), "Integrated Business Management System"] }), _jsxs("h1", { className: "text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-6 max-w-3xl mx-auto leading-tight", children: ["Satu Platform.", ' ', _jsx("span", { style: {
                                                    background: 'linear-gradient(135deg, #06b6d4 0%, #818cf8 100%)',
                                                    backgroundClip: 'text',
                                                    WebkitBackgroundClip: 'text',
                                                    WebkitTextFillColor: 'transparent',
                                                    color: 'transparent'
                                                }, children: "Semua Terkendali." })] }), _jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-medium", children: "SYNERA menyatukan operasional bisnis Anda \u2014 dari sales, inventory, keuangan, hingga CRM \u2014 dalam satu sistem yang terhubung penuh, dari kantor hingga lapangan." }), _jsxs("div", { className: "flex gap-3 justify-center mb-10 flex-wrap", children: [_jsx("button", { onClick: () => navigate('/registrasi'), className: "font-bold px-8 py-3 rounded-xl transition transform", style: {
                                                    background: '#06b6d4',
                                                    color: '#09090b',
                                                    boxShadow: 'none'
                                                }, onMouseEnter: (e) => {
                                                    e.currentTarget.style.background = '#22d3ee';
                                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(6,182,212,0.3)';
                                                }, onMouseLeave: (e) => {
                                                    e.currentTarget.style.background = '#06b6d4';
                                                    e.currentTarget.style.transform = 'translateY(0)';
                                                    e.currentTarget.style.boxShadow = 'none';
                                                }, children: "Lihat Paket & Harga" }), _jsx("a", { href: "https://wa.me/62", className: "font-semibold px-8 py-3 rounded-xl transition", style: {
                                                    color: '#a1a1aa',
                                                    border: '1px solid #333340',
                                                    textDecoration: 'none',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem'
                                                }, onMouseEnter: (e) => {
                                                    e.currentTarget.style.color = '#ffffff';
                                                    e.currentTarget.style.borderColor = '#71717a';
                                                }, onMouseLeave: (e) => {
                                                    e.currentTarget.style.color = '#d4d4d8';
                                                    e.currentTarget.style.borderColor = '#52525b';
                                                }, children: "\uD83D\uDCAC Konsultasi Gratis" })] }), _jsxs("div", { className: "inline-flex items-center gap-3 px-5 py-3 rounded-2xl text-sm", style: {
                                            background: '#18181b',
                                            border: '1px solid #3a3a42',
                                            color: '#a1a1aa'
                                        }, children: ["Mulai dari ", _jsx("span", { style: { color: '#22c55e', fontWeight: '700' }, children: "Rp 2,25 jt/bulan" }), _jsx("span", { style: { color: '#71717a' }, children: "\u00B7" }), "Sudah termasuk training & support"] })] })] }), _jsx("div", { style: {
                            display: 'flex',
                            justifyContent: 'center',
                            borderTop: '1px solid #2a2a30',
                            borderBottom: '1px solid #2a2a30',
                            background: '#18181b',
                            padding: '1.25rem 2rem',
                            gap: 0,
                            flexWrap: 'wrap'
                        }, children: [
                            { num: '50', unit: '+', label: 'Perusahaan aktif' },
                            { num: '8', unit: '', label: 'Modul terintegrasi' },
                            { num: '3', unit: '', label: 'Hari langsung go-live' },
                            { num: '99.9', unit: '%', label: 'Uptime sistem' },
                            { num: '24/7', unit: '', label: 'Support tersedia' }
                        ].map((stat, i) => (_jsxs("div", { style: {
                                flex: 1,
                                minWidth: '140px',
                                textAlign: 'center',
                                padding: '0.75rem 1rem',
                                borderRight: i < 4 ? '1px solid #2a2a30' : 'none'
                            }, children: [_jsxs("div", { style: {
                                        fontSize: '1.65rem',
                                        fontWeight: '800',
                                        color: '#ffffff',
                                        letterSpacing: '-0.03em',
                                        display: 'block',
                                        lineHeight: '1',
                                        marginBottom: '0.3rem'
                                    }, children: [stat.num, stat.unit && _jsx("span", { style: { fontSize: '1rem', color: '#06b6d4' }, children: stat.unit })] }), _jsx("div", { style: {
                                        fontSize: '0.75rem',
                                        color: '#71717a',
                                        marginTop: '0',
                                        fontWeight: '500'
                                    }, children: stat.label })] }, i))) }), _jsx("section", { className: "py-20 px-6", style: { background: '#111114' }, children: _jsxs("div", { className: "max-w-5xl mx-auto", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("div", { className: "text-xs font-black tracking-widest uppercase mb-3", style: { color: '#06b6d4', letterSpacing: '0.1em' }, children: "Mengapa SYNERA" }), _jsxs("h2", { className: "text-4xl md:text-5xl font-black mb-4 leading-tight max-w-3xl mx-auto", style: { color: '#ffffff', letterSpacing: '-0.03em' }, children: ["Dibangun untuk Bisnis", _jsx("br", {}), "yang Ingin Bergerak Cepat"] }), _jsx("p", { style: { color: '#a1a1aa', fontSize: '0.95rem', lineHeight: '1.7', maxWidth: '500px', margin: '0 auto' }, children: "Bukan sekadar software \u2014 SYNERA adalah sistem manajemen bisnis yang dirancang agar tim Anda bisa fokus pada pertumbuhan, bukan administrasi." })] }), _jsx("div", { style: {
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(3, 1fr)',
                                        gap: '1px',
                                        background: '#2a2a30',
                                        border: '1px solid #2a2a30',
                                        borderRadius: '16px',
                                        overflow: 'hidden'
                                    }, children: [
                                        { icon: '📊', num: '01', title: 'Laporan Keuangan Otomatis', desc: 'Laba rugi, neraca, dan arus kas tersedia real-time tanpa perlu input manual. Keputusan finansial jadi lebih cepat dan akurat.' },
                                        { icon: '🛒', num: '02', title: 'Integrasi Marketplace', desc: 'Terhubung otomatis ke Tokopedia, Shopee, dan kanal penjualan lainnya. Pesanan, stok, dan omzet tersinkronisasi dalam satu dasbor.' },
                                        { icon: '📦', num: '03', title: 'Inventory Real-Time', desc: 'Stok selalu akurat di semua lokasi. Tidak ada lagi selisih antara fisik dan sistem — didukung peringatan otomatis saat stok menipis.' },
                                        { icon: '☁️', num: '04', title: 'Cloud, Tanpa Server', desc: 'Akses dari browser atau HP di mana saja. Tidak perlu investasi infrastruktur — kami yang urus semuanya di belakang layar.' },
                                        { icon: '📈', num: '05', title: 'Skalabel Tanpa Batas', desc: 'Mulai dari satu kantor, berkembang ke banyak cabang. SYNERA tumbuh bersama bisnis Anda — tidak perlu ganti sistem.' },
                                        { icon: '🤝', num: '06', title: 'Didampingi Tim Ahli', desc: 'Setiap klien didampingi tim berpengalaman — dari onboarding hingga pengembangan lanjutan. Anda tidak sendirian.' }
                                    ].map((card, i) => (_jsxs("div", { style: {
                                            background: '#111114',
                                            padding: '2rem 1.75rem',
                                            transition: 'background .2s',
                                            cursor: 'pointer'
                                        }, onMouseEnter: (e) => e.currentTarget.style.background = '#18181b', onMouseLeave: (e) => e.currentTarget.style.background = '#111114', children: [_jsx("div", { style: { fontSize: '2rem', fontWeight: '800', color: '#333340', marginBottom: '1rem' }, children: card.num }), _jsx("div", { style: { fontSize: '1.1rem', marginBottom: '1rem' }, children: card.icon }), _jsx("h3", { style: { fontSize: '1rem', fontWeight: '700', color: '#ffffff', marginBottom: '0.5rem' }, children: card.title }), _jsx("p", { style: { fontSize: '0.85rem', color: '#a1a1aa', lineHeight: '1.65' }, children: card.desc })] }, i))) })] }) }), _jsx("section", { className: "py-20 px-6", style: { background: '#09090b' }, children: _jsxs("div", { className: "max-w-3xl mx-auto text-center", children: [_jsx("div", { className: "text-xs font-black tracking-widest uppercase mb-3", style: { color: '#06b6d4', letterSpacing: '0.1em' }, children: "Modul Sistem" }), _jsxs("h2", { className: "text-4xl md:text-5xl font-black mb-4", style: { color: '#ffffff', letterSpacing: '-0.03em' }, children: ["8 Modul Terintegrasi", _jsx("br", {}), "dalam Satu Platform"] }), _jsx("p", { style: { color: '#a1a1aa', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '2.5rem' }, children: "Semua paket sudah mencakup delapan modul berikut \u2014 tidak ada biaya tambahan per modul." }), _jsx("div", { className: "flex flex-wrap justify-center gap-3", children: [
                                        'Project Management',
                                        'Marketplace Integration',
                                        'Inventory Management',
                                        'Purchase Management',
                                        'Accounting & Financial Report',
                                        'Sales Management',
                                        'CRM',
                                        'Expense Management'
                                    ].map((mod, i) => (_jsxs("div", { className: "flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition cursor-default", style: {
                                            background: '#18181b',
                                            border: '1px solid #3a3a42',
                                            color: '#f4f4f5'
                                        }, onMouseEnter: (e) => {
                                            e.currentTarget.style.borderColor = '#06b6d4';
                                            e.currentTarget.style.color = '#06b6d4';
                                        }, onMouseLeave: (e) => {
                                            e.currentTarget.style.borderColor = '#3a3a42';
                                            e.currentTarget.style.color = '#f4f4f5';
                                        }, children: [_jsx("span", { className: "w-1.5 h-1.5 rounded-full", style: { background: '#06b6d4' } }), mod] }, i))) })] }) }), _jsx("section", { className: "py-20 px-6", style: { background: '#111114' }, children: _jsxs("div", { className: "max-w-full mx-auto", children: [_jsxs("div", { className: "text-center mb-16", children: [_jsx("div", { className: "text-xs font-black tracking-widest uppercase mb-3", style: { color: '#06b6d4', letterSpacing: '0.1em' }, children: "Harga & Paket" }), _jsx("h2", { className: "text-4xl md:text-5xl font-black mb-3", style: { color: '#ffffff', letterSpacing: '-0.03em' }, children: "Transparan. Fleksibel." }), _jsx("p", { className: "mb-8 max-w-2xl mx-auto", style: { color: '#a1a1aa' }, children: "Pilih paket yang sesuai dengan kebutuhan bisnis Anda sekarang. Upgrade kapan saja." }), _jsxs("div", { className: "inline-flex items-center gap-3 px-6 py-3 rounded-full text-sm", style: { background: '#18181b', border: '1px solid #3a3a42', color: '#a1a1aa' }, children: [_jsx("span", { children: "Tagihan tahunan \u00A0" }), _jsx("span", { className: "px-3 py-1 rounded-full text-xs font-bold", style: { background: 'rgba(34,197,94,.12)', border: '1px solid rgba(34,197,94,.2)', color: '#22c55e', letterSpacing: '0.04em' }, children: "Hemat hingga 10%" })] })] }), _jsx("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem', alignItems: 'start', maxWidth: '1200px', margin: '0 auto', marginBottom: '2rem' }, children: [
                                        {
                                            tier: 'Starter',
                                            name: 'SYNERA Basic',
                                            price: 'Rp 2,25',
                                            unit: 'jt/bln',
                                            tagline: 'Untuk bisnis yang ingin memulai digitalisasi operasional dengan cepat dan langsung go-live.',
                                            yearly: 'Ditagih tahunan · Rp 27 juta/tahun',
                                            sections: [
                                                {
                                                    title: 'Onboarding',
                                                    features: [
                                                        { name: 'Training 3 hari onsite + go-live', included: true },
                                                        { name: 'Setup & konfigurasi awal sistem', included: true }
                                                    ]
                                                },
                                                {
                                                    title: 'Support',
                                                    features: [
                                                        { name: 'Online meeting 2× per bulan', included: true },
                                                        { name: 'Group WhatsApp support', included: true },
                                                        { name: 'Update sistem rutin', included: true },
                                                        { name: 'Kunjungan onsite rutin', included: false },
                                                        { name: 'Custom development', included: false }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            tier: 'Most Popular',
                                            name: 'SYNERA Growth',
                                            price: 'Rp 3',
                                            unit: 'jt/bln',
                                            tagline: 'Untuk bisnis yang berkembang dan membutuhkan pendampingan lebih intensif serta fleksibilitas custom.',
                                            yearly: 'Ditagih tahunan · Rp 36 juta/tahun',
                                            featured: true,
                                            sections: [
                                                {
                                                    title: 'Semua di Basic, ditambah:',
                                                    features: [
                                                        { name: 'Training 4 hari onsite', included: true },
                                                        { name: 'Online meeting 4× per bulan', included: true },
                                                        { name: '1× kunjungan onsite per kuartal', included: true },
                                                        { name: 'Free minor custom 10 jam/tahun', included: true },
                                                        { name: 'Prioritas support', included: true },
                                                        { name: 'Review laporan keuangan & operasional', included: true }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            tier: 'Managed ERP',
                                            name: 'SYNERA Pro',
                                            price: 'Rp 4',
                                            unit: 'jt/bln',
                                            tagline: 'ERP yang benar-benar dikelola tim ahli kami. Seperti punya tim IT internal — tanpa perlu merekrut.',
                                            yearly: 'Ditagih tahunan · Rp 48 juta/tahun',
                                            sections: [
                                                {
                                                    title: 'Semua di Growth, ditambah:',
                                                    features: [
                                                        { name: 'Training 5 hari onsite', included: true },
                                                        { name: 'Support meeting 1× per minggu', included: true },
                                                        { name: 'Kunjungan onsite tiap bulan', included: true },
                                                        { name: 'Free custom 30 jam/tahun', included: true },
                                                        { name: 'Exclusive management dashboard', included: true },
                                                        { name: 'Assistance closing laporan bulanan', included: true },
                                                        { name: 'Prioritas bug fix', included: true }
                                                    ]
                                                }
                                            ]
                                        }
                                    ].map((plan, i) => (_jsxs("div", { style: {
                                            background: plan.featured ? 'linear-gradient(160deg, #0e1a2b 0%, #0d1f1f 100%)' : '#18181b',
                                            border: `1px solid ${plan.featured ? 'rgba(6,182,212,.4)' : '#2a2a30'}`,
                                            borderRadius: '20px',
                                            padding: '2rem',
                                            position: 'relative',
                                            transition: 'all .25s',
                                            transform: plan.featured ? 'translateY(-10px)' : 'translateY(0)',
                                            boxShadow: plan.featured ? '0 0 0 1px rgba(6,182,212,.15), 0 24px 64px rgba(0,0,0,.5)' : 'none',
                                            cursor: 'pointer'
                                        }, onMouseEnter: (e) => {
                                            if (!plan.featured) {
                                                e.currentTarget.style.borderColor = '#333340';
                                                e.currentTarget.style.transform = 'translateY(-3px)';
                                                e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,.4)';
                                            }
                                            else {
                                                e.currentTarget.style.transform = 'translateY(-14px)';
                                            }
                                        }, onMouseLeave: (e) => {
                                            if (!plan.featured) {
                                                e.currentTarget.style.borderColor = '#2a2a30';
                                                e.currentTarget.style.transform = 'translateY(0)';
                                                e.currentTarget.style.boxShadow = 'none';
                                            }
                                            else {
                                                e.currentTarget.style.transform = 'translateY(-10px)';
                                            }
                                        }, children: [plan.featured && (_jsx("div", { style: {
                                                    position: 'absolute',
                                                    top: '-14px',
                                                    left: '50%',
                                                    transform: 'translateX(-50%)',
                                                    background: '#06b6d4',
                                                    color: '#09090b',
                                                    fontSize: '0.68rem',
                                                    fontWeight: '800',
                                                    letterSpacing: '0.1em',
                                                    textTransform: 'uppercase',
                                                    padding: '0.32rem 0.9rem',
                                                    borderRadius: '100px',
                                                    whiteSpace: 'nowrap'
                                                }, children: "\u2B50 Paling Banyak Dipilih" })), _jsx("div", { style: {
                                                    fontSize: '0.68rem',
                                                    fontWeight: '700',
                                                    letterSpacing: '0.14em',
                                                    textTransform: 'uppercase',
                                                    color: plan.featured ? '#06b6d4' : '#71717a',
                                                    marginBottom: '0.5rem'
                                                }, children: plan.tier }), _jsx("h3", { style: {
                                                    fontSize: '1.25rem',
                                                    fontWeight: '800',
                                                    color: '#f4f4f5',
                                                    letterSpacing: '-0.02em',
                                                    marginBottom: '0.3rem'
                                                }, children: plan.name }), _jsx("p", { style: {
                                                    fontSize: '0.82rem',
                                                    color: '#a1a1aa',
                                                    lineHeight: '1.5',
                                                    paddingBottom: '1.25rem',
                                                    borderBottom: `1px solid ${plan.featured ? 'rgba(6,182,212,.15)' : '#2a2a30'}`,
                                                    marginBottom: '1.25rem'
                                                }, children: plan.tagline }), _jsxs("div", { style: {
                                                    fontSize: '2.75rem',
                                                    fontWeight: '800',
                                                    color: plan.featured ? '#06b6d4' : '#f4f4f5',
                                                    letterSpacing: '-0.04em',
                                                    lineHeight: '1',
                                                    marginBottom: '0.3rem'
                                                }, children: [_jsx("span", { style: { fontSize: '1.1rem', fontWeight: '700', color: '#a1a1aa' }, children: "Rp" }), plan.price, _jsxs("span", { style: { fontSize: '0.85rem', fontWeight: '500', color: '#71717a' }, children: [" ", plan.unit] })] }), _jsx("div", { style: {
                                                    fontSize: '0.78rem',
                                                    color: '#71717a',
                                                    marginBottom: '1.1rem'
                                                }, children: plan.yearly }), plan.sections.map((section, si) => (_jsxs("div", { style: { marginBottom: '1.1rem' }, children: [_jsx("div", { style: {
                                                            fontSize: '0.68rem',
                                                            fontWeight: '700',
                                                            letterSpacing: '0.12em',
                                                            textTransform: 'uppercase',
                                                            color: plan.featured ? 'rgba(6,182,212,.5)' : '#71717a',
                                                            marginBottom: '0.6rem'
                                                        }, children: section.title }), _jsx("ul", { style: { listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }, children: section.features.map((feat, fi) => (_jsxs("li", { style: {
                                                                fontSize: '0.83rem',
                                                                color: plan.featured ? 'rgba(255,255,255,.75)' : '#a1a1aa',
                                                                display: 'flex',
                                                                alignItems: 'flex-start',
                                                                gap: '0.55rem',
                                                                lineHeight: '1.45'
                                                            }, children: [_jsx("span", { style: {
                                                                        width: '16px',
                                                                        height: '16px',
                                                                        borderRadius: '50%',
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                        flexShrink: 0,
                                                                        marginTop: '0.15rem',
                                                                        background: feat.included
                                                                            ? (plan.featured ? 'rgba(6,182,212,.15)' : 'rgba(34,197,94,.12)')
                                                                            : 'rgba(239,68,68,.08)',
                                                                        fontSize: '0.5rem',
                                                                        fontWeight: '800',
                                                                        color: feat.included
                                                                            ? (plan.featured ? '#06b6d4' : '#22c55e')
                                                                            : '#ef4444'
                                                                    }, children: feat.included ? '✓' : '✕' }), feat.name] }, fi))) })] }, si))), _jsxs("button", { onClick: () => navigate('/registrasi'), style: {
                                                    display: 'block',
                                                    width: '100%',
                                                    textAlign: 'center',
                                                    padding: '0.8rem',
                                                    borderRadius: '10px',
                                                    fontSize: '0.88rem',
                                                    fontWeight: '700',
                                                    textDecoration: 'none',
                                                    cursor: 'pointer',
                                                    border: plan.featured ? 'none' : `1px solid #333340`,
                                                    marginTop: '1.75rem',
                                                    background: plan.featured ? '#06b6d4' : 'transparent',
                                                    color: plan.featured ? '#09090b' : '#f4f4f5',
                                                    transition: 'all .2s'
                                                }, onMouseEnter: (e) => {
                                                    if (plan.featured) {
                                                        e.currentTarget.style.background = '#22d3ee';
                                                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(6,182,212,.3)';
                                                        e.currentTarget.style.transform = 'translateY(-1px)';
                                                    }
                                                    else {
                                                        e.currentTarget.style.background = '#18181b';
                                                        e.currentTarget.style.borderColor = '#555';
                                                    }
                                                }, onMouseLeave: (e) => {
                                                    if (plan.featured) {
                                                        e.currentTarget.style.background = '#06b6d4';
                                                        e.currentTarget.style.boxShadow = 'none';
                                                        e.currentTarget.style.transform = 'translateY(0)';
                                                    }
                                                    else {
                                                        e.currentTarget.style.background = 'transparent';
                                                        e.currentTarget.style.borderColor = '#333340';
                                                    }
                                                }, children: ["Mulai dengan ", plan.name.split(' ')[1], " \u2192"] })] }, i))) }), _jsx("div", { style: { textAlign: 'center', marginBottom: showCompare ? '2rem' : 0 }, children: _jsx("button", { onClick: () => setShowCompare(!showCompare), style: {
                                            background: 'transparent',
                                            border: '1px solid #333340',
                                            color: '#a1a1aa',
                                            fontSize: '0.82rem',
                                            fontWeight: '600',
                                            padding: '0.5rem 1.25rem',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            fontFamily: 'inherit',
                                            transition: 'all .2s'
                                        }, onMouseEnter: (e) => {
                                            e.currentTarget.style.color = '#06b6d4';
                                            e.currentTarget.style.borderColor = '#06b6d4';
                                        }, onMouseLeave: (e) => {
                                            e.currentTarget.style.color = '#a1a1aa';
                                            e.currentTarget.style.borderColor = '#333340';
                                        }, children: showCompare ? '- Sembunyikan Perbandingan' : '+ Lihat Perbandingan Lengkap' }) }), showCompare && (_jsx("div", { style: { background: '#09090b', padding: '4rem 1.5rem', borderRadius: '12px', marginTop: '2rem', border: '1px solid #2a2a30' }, children: _jsx("div", { style: { maxWidth: '900px', margin: '0 auto' }, children: _jsxs("table", { style: {
                                                width: '100%',
                                                borderCollapse: 'collapse',
                                                fontSize: '0.875rem'
                                            }, children: [_jsx("thead", { children: _jsxs("tr", { style: { borderBottom: '1px solid #2a2a30' }, children: [_jsx("th", { style: { width: '40%', textAlign: 'left', padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#71717a' }, children: "Fitur" }), _jsx("th", { style: { textAlign: 'center', padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#71717a' }, children: "Basic" }), _jsx("th", { style: { textAlign: 'center', padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#06b6d4' }, children: "Growth" }), _jsx("th", { style: { textAlign: 'center', padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#71717a' }, children: "Pro" })] }) }), _jsx("tbody", { children: [
                                                        ['8 Modul sistem', '✓', '✓', '✓', 'check'],
                                                        ['Setup & konfigurasi awal', '✓', '✓', '✓', 'check'],
                                                        ['Update sistem', '✓', '✓', '✓', 'check'],
                                                        ['Group WhatsApp support', '✓', '✓', '✓', 'check'],
                                                        ['Training onsite', '3 hari', '4 hari', '5 hari', 'value'],
                                                        ['Online meeting/bulan', '2×', '4×', '4× + weekly', 'value'],
                                                        ['Kunjungan onsite', '—', 'Per kuartal', 'Tiap bulan', 'mixed'],
                                                        ['Free custom (jam/tahun)', '—', '10 jam', '30 jam', 'mixed'],
                                                        ['Prioritas support', '—', '✓', '✓', 'mixed'],
                                                        ['Review laporan keuangan', '—', '✓', '✓', 'mixed'],
                                                        ['Management dashboard', '—', '—', '✓', 'mixed'],
                                                        ['Assistance closing bulanan', '—', '—', '✓', 'mixed'],
                                                        ['Prioritas bug fix', '—', '—', '✓', 'mixed']
                                                    ].map((row, i) => (_jsxs("tr", { style: { borderBottom: '1px solid #2a2a30' }, onMouseEnter: (e) => e.currentTarget.style.background = '#18181b', onMouseLeave: (e) => e.currentTarget.style.background = 'transparent', children: [_jsx("td", { style: { padding: '0.7rem 1rem', textAlign: 'left', color: '#a1a1aa' }, children: row[0] }), _jsx("td", { style: { padding: '0.7rem 1rem', textAlign: 'center', color: row[4] === 'check' ? '#22c55e' : row[4] === 'value' ? '#06b6d4' : row[1] === '—' ? '#555' : '#06b6d4', fontWeight: row[4] === 'value' ? '600' : '400', fontSize: row[4] === 'check' ? '1rem' : '0.83rem' }, children: row[1] }), _jsx("td", { style: { padding: '0.7rem 1rem', textAlign: 'center', color: row[4] === 'check' ? '#22c55e' : row[4] === 'value' ? '#06b6d4' : row[2] === '—' ? '#555' : '#06b6d4', fontWeight: row[4] === 'value' ? '600' : '400', fontSize: row[4] === 'check' ? '1rem' : '0.83rem' }, children: row[2] }), _jsx("td", { style: { padding: '0.7rem 1rem', textAlign: 'center', color: row[4] === 'check' ? '#22c55e' : row[4] === 'value' ? '#06b6d4' : row[3] === '—' ? '#555' : '#06b6d4', fontWeight: row[4] === 'value' ? '600' : '400', fontSize: row[4] === 'check' ? '1rem' : '0.83rem' }, children: row[3] })] }, i))) })] }) }) }))] }) }), _jsx("section", { className: "py-20 px-6", style: { background: '#111114' }, children: _jsxs("div", { className: "max-w-2xl mx-auto", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("div", { className: "text-xs font-black tracking-widest uppercase mb-3", style: { color: '#06b6d4', letterSpacing: '0.1em' }, children: "FAQ" }), _jsx("h2", { className: "text-4xl font-black", style: { color: '#ffffff', letterSpacing: '-0.03em' }, children: "Pertanyaan yang Sering Ditanyakan" })] }), _jsx("div", { className: "space-y-3", children: faqItems.map((item, i) => (_jsxs("div", { className: "rounded-lg overflow-hidden", style: { border: '1px solid #2a2a30' }, children: [_jsxs("button", { onClick: () => setOpenFaq(openFaq === i ? null : i), className: "w-full flex items-center justify-between gap-4 p-5 transition text-left", style: { background: '#18181b', color: '#f4f4f5' }, onMouseEnter: (e) => e.currentTarget.style.background = '#1f1f23', onMouseLeave: (e) => e.currentTarget.style.background = '#18181b', children: [_jsx("span", { className: "font-semibold", children: item.q }), _jsx("div", { className: `w-6 h-6 rounded-full border flex items-center justify-center text-xs flex-shrink-0 transition`, style: {
                                                            background: openFaq === i ? 'rgba(6,182,212,.15)' : '#0a0a0a',
                                                            border: openFaq === i ? '1px solid rgba(6,182,212,.3)' : '1px solid #2a2a30',
                                                            color: openFaq === i ? '#06b6d4' : '#71717a',
                                                            transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0deg)'
                                                        }, children: "+" })] }), openFaq === i && (_jsx("div", { className: "p-5 border-t", style: { background: '#111114', borderColor: '#2a2a30', color: '#a1a1aa', fontSize: '0.875rem', lineHeight: '1.5' }, children: item.a }))] }, i))) })] }) }), _jsxs("section", { className: "relative py-20 px-6 text-center overflow-hidden", style: { background: '#09090b', borderTop: '1px solid #2a2a30' }, children: [_jsx("div", { className: "absolute inset-0 pointer-events-none", children: _jsx("div", { className: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-48 pointer-events-none", style: {
                                        background: 'radial-gradient(ellipse, rgba(6,182,212,.12) 0%, transparent 70%)',
                                    } }) }), _jsxs("div", { className: "relative z-10 max-w-3xl mx-auto", children: [_jsxs("h2", { className: "text-4xl md:text-5xl font-black mb-4 leading-tight", style: { color: '#ffffff', letterSpacing: '-0.03em' }, children: ["Siap Menjalankan Bisnis", _jsx("br", {}), "dengan ", _jsx("span", { style: { color: '#06b6d4' }, children: "SYNERA" }), "?"] }), _jsx("p", { className: "mb-8 text-lg", style: { color: '#a1a1aa' }, children: "Konsultasi gratis bersama tim kami. Kami bantu analisis kebutuhan dan rekomendasikan paket yang paling sesuai." }), _jsxs("div", { className: "flex gap-4 justify-center flex-wrap", children: [_jsx("a", { href: "https://wa.me/62", className: "font-bold px-8 py-3 rounded-xl transition transform hover:translate-y-[-2px]", style: { background: '#06b6d4', color: '#09090b', boxShadow: 'none' }, onMouseEnter: (e) => e.currentTarget.style.background = '#22d3ee', onMouseLeave: (e) => e.currentTarget.style.background = '#06b6d4', children: "\uD83D\uDCAC Chat WhatsApp Sekarang" }), _jsx("button", { onClick: () => navigate('/registrasi'), className: "font-semibold px-7 py-3 rounded-xl transition", style: { color: '#a1a1aa', border: '1px solid #3a3a42' }, onMouseEnter: (e) => e.currentTarget.style.color = '#ffffff', onMouseLeave: (e) => e.currentTarget.style.color = '#a1a1aa', children: "Bandingkan Paket" })] })] })] })] }), _jsxs("footer", { style: {
                    background: '#111114',
                    borderTop: '1px solid #2a2a30',
                    padding: '1.25rem 2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '0.5rem'
                }, children: [_jsxs("div", { style: {
                            fontSize: '0.9rem',
                            fontWeight: '800',
                            letterSpacing: '-0.01em',
                            color: '#a1a1aa'
                        }, children: ["SY", _jsx("span", { style: { color: '#06b6d4' }, children: "NERA" })] }), _jsx("p", { style: { fontSize: '0.75rem', color: '#71717a' }, children: "\u00A9 2026 SYNERA \u00B7 Integrated Business Management System \u00B7 Powered by pintarbisnis.id" })] })] }));
}
//# sourceMappingURL=IndexPage.js.map