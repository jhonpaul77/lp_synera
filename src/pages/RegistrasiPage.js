import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegistrationStore } from '@/store/registrationStore';
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
};
export default function RegistrasiPage() {
    const navigate = useNavigate();
    const canvasRef = useRef(null);
    const [drawing, setDrawing] = useState(false);
    const [hasSig, setHasSig] = useState(false);
    const { updateData } = useRegistrationStore();
    const [submitted, setSubmitted] = useState(false);
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
        current_sys: [],
        modules: [],
        package: '',
        start: '',
        notes: '',
        signer_name: '',
        signer_title: '',
        signer_city: '',
        signature: ''
    });
    // Canvas setup
    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const rect = canvas.parentElement?.getBoundingClientRect();
            if (rect) {
                canvas.width = rect.width;
                canvas.height = rect.height;
            }
        }
    }, []);
    const getCanvasPos = (e) => {
        if (!canvasRef.current)
            return { x: 0, y: 0 };
        const rect = canvasRef.current.getBoundingClientRect();
        if (e.touches) {
            return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
        }
        return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleCanvasMouseDown = (e) => {
        if (!canvasRef.current)
            return;
        const ctx = canvasRef.current.getContext('2d');
        const pos = getCanvasPos(e);
        ctx?.beginPath();
        ctx?.moveTo(pos.x, pos.y);
        setDrawing(true);
        setHasSig(true);
    };
    const handleCanvasMouseMove = (e) => {
        if (!drawing || !canvasRef.current)
            return;
        const ctx = canvasRef.current.getContext('2d');
        const pos = getCanvasPos(e);
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx?.lineTo(pos.x, pos.y);
        ctx?.stroke();
    };
    const handleCanvasMouseUp = () => setDrawing(false);
    const handleCanvasMouseLeave = () => setDrawing(false);
    const clearSignature = () => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
        setHasSig(false);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.company || !formData.industry || !formData.city || !formData.pic_name || !formData.pic_title || !formData.phone || !formData.email) {
            alert('Mohon lengkapi semua field yang wajib diisi');
            return;
        }
        if (!hasSig) {
            alert('Mohon tandatangani form');
            return;
        }
        const sigData = canvasRef.current?.toDataURL() || '';
        const dataToStore = {
            ...formData,
            signature: sigData,
            date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
            regNo: `SYN-${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}${String(Math.floor(Math.random() * 9000) + 1000)}`
        };
        updateData(dataToStore);
        setSubmitted(true);
        setTimeout(() => {
            navigate('/agreement');
        }, 2000);
    };
    if (submitted) {
        return (_jsx("div", { style: { backgroundColor: COLORS.bg, minHeight: '100vh' }, className: "flex items-center justify-center px-6 py-20", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { style: { borderColor: COLORS.green + '4d', backgroundColor: COLORS.greenDim }, className: "w-20 h-20 rounded-full border-2 flex items-center justify-center mx-auto mb-6", children: _jsx("span", { className: "text-4xl", style: { color: COLORS.green }, children: "\u2713" }) }), _jsx("h2", { className: "text-3xl font-black mb-3", style: { color: COLORS.text }, children: "Registrasi Berhasil Dikirim!" }), _jsx("p", { className: "text-lg mb-4", style: { color: COLORS.text2 }, children: "Terima kasih. Tim SYNERA akan menghubungi Anda dalam 1\u00D724 jam untuk melanjutkan proses penawaran dan implementasi." }), _jsx("p", { style: { color: COLORS.text3 }, className: "text-sm", children: "Redirecting ke halaman agreement..." })] }) }));
    }
    return (_jsx("div", { style: { backgroundColor: COLORS.bg, color: COLORS.text }, className: "min-h-screen pt-20 pb-20 px-6", children: _jsxs("div", { className: "max-w-2xl mx-auto", children: [_jsxs("div", { style: { background: 'linear-gradient(135deg, rgba(6,182,212,.04) 0%, rgba(10,10,15,.5) 100%)', borderColor: 'rgba(6,182,212,.2)' }, className: "border rounded-3xl p-8 mb-6 relative overflow-hidden", children: [_jsx("div", { className: "absolute -top-20 -right-20 w-48 h-48 rounded-full bg-gradient-radial from-cyan-500/20 to-transparent pointer-events-none" }), _jsxs("div", { className: "relative z-10", children: [_jsxs("div", { className: "flex items-center gap-3 mb-4", children: [_jsx("div", { style: { background: 'linear-gradient(135deg, #06b6d4, #0891b2)', color: '#fff' }, className: "w-9 h-9 rounded-lg flex items-center justify-center text-xs font-black", children: "SY" }), _jsx("span", { className: "text-xl font-black", style: { color: COLORS.text }, children: "SYNERA" })] }), _jsxs("h1", { className: "text-3xl font-black mb-2", style: { color: COLORS.text }, children: ["Form Registrasi Implementasi", _jsx("br", {}), "Sistem Bisnis"] }), _jsx("p", { className: "text-sm mb-5", style: { color: COLORS.text2 }, children: "Lengkapi form ini untuk memulai proses penawaran dan implementasi SYNERA. Pengisian membutuhkan sekitar 3\u20135 menit." }), _jsxs("div", { className: "flex gap-4 text-xs pt-4", style: { color: COLORS.text3, borderTop: `1px solid ${COLORS.border}` }, children: [_jsxs("div", { children: ["Tanggal ", _jsx("span", { style: { color: COLORS.cyan }, className: "font-semibold", children: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) })] }), _jsxs("div", { children: ["Produk ", _jsx("span", { style: { color: COLORS.cyan }, className: "font-semibold", children: "SYNERA ERP" })] })] })] })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsxs("div", { style: { backgroundColor: COLORS.surface, borderColor: COLORS.border }, className: "border rounded-2xl overflow-hidden", children: [_jsxs("div", { style: { backgroundColor: COLORS.surface2, borderColor: COLORS.border }, className: "flex items-center gap-3 p-4 border-b", children: [_jsx("div", { style: { backgroundColor: COLORS.cyan, color: COLORS.bg }, className: "w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black", children: "1" }), _jsxs("div", { children: [_jsx("h3", { className: "font-bold", style: { color: COLORS.text }, children: "Data Perusahaan" }), _jsx("p", { className: "text-xs", style: { color: COLORS.text3 }, children: "Informasi legal dan profil bisnis" })] })] }), _jsxs("div", { className: "p-6 space-y-4", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsxs("label", { style: { color: COLORS.text2 }, className: "text-xs font-semibold block mb-2", children: ["Nama Perusahaan ", _jsx("span", { style: { color: COLORS.cyan }, children: "*" })] }), _jsx("input", { type: "text", placeholder: "PT / CV / UD / Nama usaha", required: true, value: formData.company, onChange: (e) => setFormData({ ...formData, company: e.target.value }), style: { backgroundColor: COLORS.bg2, borderColor: COLORS.border2, color: COLORS.text }, className: "w-full rounded-lg px-3 py-2 text-sm placeholder-gray-600 focus:border-cyan-500 focus:outline-none focus:ring-2" })] }), _jsxs("div", { children: [_jsxs("label", { style: { color: COLORS.text2 }, className: "text-xs font-semibold block mb-2", children: ["Nama Brand / Toko ", _jsx("span", { style: { color: COLORS.text3 }, className: "font-normal", children: "(opsional)" })] }), _jsx("input", { type: "text", placeholder: "Jika berbeda dari nama perusahaan", value: formData.brand, onChange: (e) => setFormData({ ...formData, brand: e.target.value }), style: { backgroundColor: COLORS.bg2, borderColor: COLORS.border2, color: COLORS.text }, className: "w-full rounded-lg px-3 py-2 text-sm placeholder-gray-600 focus:outline-none focus:ring-2" })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsxs("label", { style: { color: COLORS.text2 }, className: "text-xs font-semibold block mb-2", children: ["Bidang Usaha ", _jsx("span", { style: { color: COLORS.cyan }, children: "*" })] }), _jsx("input", { type: "text", placeholder: "Contoh: Retail, Distribusi, Manufaktur", required: true, value: formData.industry, onChange: (e) => setFormData({ ...formData, industry: e.target.value }), style: { backgroundColor: COLORS.bg2, borderColor: COLORS.border2, color: COLORS.text }, className: "w-full rounded-lg px-3 py-2 text-sm placeholder-gray-600 focus:outline-none focus:ring-2" })] }), _jsxs("div", { children: [_jsxs("label", { style: { color: COLORS.text2 }, className: "text-xs font-semibold block mb-2", children: ["Kota ", _jsx("span", { style: { color: COLORS.cyan }, children: "*" })] }), _jsx("input", { type: "text", placeholder: "Kota domisili perusahaan", required: true, value: formData.city, onChange: (e) => setFormData({ ...formData, city: e.target.value }), style: { backgroundColor: COLORS.bg2, borderColor: COLORS.border2, color: COLORS.text }, className: "w-full rounded-lg px-3 py-2 text-sm placeholder-gray-600 focus:outline-none focus:ring-2" })] })] }), _jsxs("div", { children: [_jsx("label", { style: { color: COLORS.text2 }, className: "text-xs font-semibold block mb-2", children: "Alamat Perusahaan" }), _jsx("input", { type: "text", placeholder: "Jalan, nomor, kelurahan, kecamatan", value: formData.address, onChange: (e) => setFormData({ ...formData, address: e.target.value }), style: { backgroundColor: COLORS.bg2, borderColor: COLORS.border2, color: COLORS.text }, className: "w-full rounded-lg px-3 py-2 text-sm placeholder-gray-600 focus:outline-none focus:ring-2" })] }), _jsxs("div", { children: [_jsxs("label", { style: { color: COLORS.text2 }, className: "text-xs font-semibold block mb-2", children: ["Website / Marketplace ", _jsx("span", { style: { color: COLORS.text3 }, className: "font-normal", children: "(opsional)" })] }), _jsx("input", { type: "text", placeholder: "Contoh: tokopedia.com/namatoko atau www.website.com", value: formData.website, onChange: (e) => setFormData({ ...formData, website: e.target.value }), style: { backgroundColor: COLORS.bg2, borderColor: COLORS.border2, color: COLORS.text }, className: "w-full rounded-lg px-3 py-2 text-sm placeholder-gray-600 focus:outline-none focus:ring-2" })] })] })] }), _jsxs("div", { style: { backgroundColor: COLORS.surface, borderColor: COLORS.border }, className: "border rounded-2xl overflow-hidden", children: [_jsxs("div", { style: { backgroundColor: COLORS.surface2, borderColor: COLORS.border }, className: "flex items-center gap-3 p-4 border-b", children: [_jsx("div", { style: { backgroundColor: COLORS.cyan, color: COLORS.bg }, className: "w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black", children: "2" }), _jsxs("div", { children: [_jsx("h3", { className: "font-bold", style: { color: COLORS.text }, children: "Kontak PIC (Penanggung Jawab)" }), _jsx("p", { className: "text-xs", style: { color: COLORS.text3 }, children: "Orang yang bisa dihubungi untuk proses implementasi" })] })] }), _jsxs("div", { className: "p-6 space-y-4", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsxs("label", { style: { color: COLORS.text2 }, className: "text-xs font-semibold block mb-2", children: ["Nama PIC ", _jsx("span", { style: { color: COLORS.cyan }, children: "*" })] }), _jsx("input", { type: "text", placeholder: "Nama lengkap", required: true, value: formData.pic_name, onChange: (e) => setFormData({ ...formData, pic_name: e.target.value }), style: { backgroundColor: COLORS.bg2, borderColor: COLORS.border2, color: COLORS.text }, className: "w-full rounded-lg px-3 py-2 text-sm placeholder-gray-600 focus:outline-none focus:ring-2" })] }), _jsxs("div", { children: [_jsxs("label", { style: { color: COLORS.text2 }, className: "text-xs font-semibold block mb-2", children: ["Jabatan ", _jsx("span", { style: { color: COLORS.cyan }, children: "*" })] }), _jsx("input", { type: "text", placeholder: "Contoh: Direktur, Manajer, Owner", required: true, value: formData.pic_title, onChange: (e) => setFormData({ ...formData, pic_title: e.target.value }), style: { backgroundColor: COLORS.bg2, borderColor: COLORS.border2, color: COLORS.text }, className: "w-full rounded-lg px-3 py-2 text-sm placeholder-gray-600 focus:outline-none focus:ring-2" })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsxs("label", { style: { color: COLORS.text2 }, className: "text-xs font-semibold block mb-2", children: ["Nomor WhatsApp ", _jsx("span", { style: { color: COLORS.cyan }, children: "*" })] }), _jsx("input", { type: "tel", placeholder: "08xx-xxxx-xxxx", required: true, value: formData.phone, onChange: (e) => setFormData({ ...formData, phone: e.target.value }), style: { backgroundColor: COLORS.bg2, borderColor: COLORS.border2, color: COLORS.text }, className: "w-full rounded-lg px-3 py-2 text-sm placeholder-gray-600 focus:outline-none focus:ring-2" })] }), _jsxs("div", { children: [_jsxs("label", { style: { color: COLORS.text2 }, className: "text-xs font-semibold block mb-2", children: ["Email ", _jsx("span", { style: { color: COLORS.cyan }, children: "*" })] }), _jsx("input", { type: "email", placeholder: "email@perusahaan.com", required: true, value: formData.email, onChange: (e) => setFormData({ ...formData, email: e.target.value }), style: { backgroundColor: COLORS.bg2, borderColor: COLORS.border2, color: COLORS.text }, className: "w-full rounded-lg px-3 py-2 text-sm placeholder-gray-600 focus:outline-none focus:ring-2" })] })] })] })] }), _jsxs("div", { style: { backgroundColor: COLORS.surface, borderColor: COLORS.border }, className: "border rounded-2xl overflow-hidden", children: [_jsxs("div", { style: { backgroundColor: COLORS.surface2, borderColor: COLORS.border }, className: "flex items-center gap-3 p-4 border-b", children: [_jsx("div", { style: { backgroundColor: COLORS.cyan, color: COLORS.bg }, className: "w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black", children: "3" }), _jsxs("div", { children: [_jsx("h3", { className: "font-bold", style: { color: COLORS.text }, children: "Informasi Operasional" }), _jsx("p", { className: "text-xs", style: { color: COLORS.text3 }, children: "Membantu kami menyiapkan konfigurasi yang tepat" })] })] }), _jsxs("div", { className: "p-6 space-y-4", children: [_jsxs("div", { children: [_jsx("label", { style: { color: COLORS.text2 }, className: "text-xs font-semibold block mb-3", children: "Jumlah Karyawan" }), _jsx("div", { className: "grid grid-cols-4 gap-2", children: ['1–5', '6–20', '21–50', '>50'].map((range, i) => (_jsxs("label", { style: { backgroundColor: formData.employees === range ? COLORS.cyanDim : COLORS.bg2, borderColor: formData.employees === range ? COLORS.cyan : COLORS.border, color: formData.employees === range ? COLORS.text : COLORS.text2 }, className: "p-3 rounded-lg border text-center cursor-pointer text-sm font-semibold transition", children: [_jsx("input", { type: "radio", name: "employees", value: range, checked: formData.employees === range, onChange: (e) => setFormData({ ...formData, employees: e.target.value }), className: "hidden" }), range] }, i))) })] }), _jsxs("div", { children: [_jsx("label", { style: { color: COLORS.text2 }, className: "text-xs font-semibold block mb-2", children: "Jumlah User Sistem" }), _jsx("input", { type: "number", placeholder: "Estimasi jumlah pengguna sistem", min: "1", value: formData.users, onChange: (e) => setFormData({ ...formData, users: e.target.value }), style: { backgroundColor: COLORS.bg2, borderColor: COLORS.border2, color: COLORS.text }, className: "w-full rounded-lg px-3 py-2 text-sm placeholder-gray-600 focus:outline-none focus:ring-2" })] }), _jsxs("div", { children: [_jsx("label", { style: { color: COLORS.text2 }, className: "text-xs font-semibold block mb-3", children: "Sistem yang Digunakan Saat Ini" }), _jsx("div", { className: "grid grid-cols-2 gap-2", children: [
                                                        { value: 'excel', label: 'Excel / Google Sheet' },
                                                        { value: 'software', label: 'Software lain' },
                                                        { value: 'manual', label: 'Manual / Belum ada' },
                                                        { value: 'erp', label: 'ERP sebelumnya' }
                                                    ].map((sys) => (_jsxs("label", { style: { backgroundColor: formData.current_sys.includes(sys.value) ? COLORS.cyanDim : COLORS.bg2, borderColor: formData.current_sys.includes(sys.value) ? COLORS.cyan : COLORS.border, color: formData.current_sys.includes(sys.value) ? COLORS.text : COLORS.text2 }, className: "p-3 rounded-lg border cursor-pointer text-sm font-semibold transition", children: [_jsx("input", { type: "checkbox", value: sys.value, checked: formData.current_sys.includes(sys.value), onChange: (e) => {
                                                                    if (e.target.checked) {
                                                                        setFormData({ ...formData, current_sys: [...formData.current_sys, sys.value] });
                                                                    }
                                                                    else {
                                                                        setFormData({ ...formData, current_sys: formData.current_sys.filter(s => s !== sys.value) });
                                                                    }
                                                                }, className: "hidden" }), sys.label] }, sys.value))) })] })] })] }), _jsxs("div", { style: { backgroundColor: COLORS.surface, borderColor: COLORS.border }, className: "border rounded-2xl overflow-hidden", children: [_jsxs("div", { style: { backgroundColor: COLORS.surface2, borderColor: COLORS.border }, className: "flex items-center gap-3 p-4 border-b", children: [_jsx("div", { style: { backgroundColor: COLORS.cyan, color: COLORS.bg }, className: "w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black", children: "4" }), _jsxs("div", { children: [_jsx("h3", { className: "font-bold", style: { color: COLORS.text }, children: "Modul yang Akan Digunakan" }), _jsx("p", { className: "text-xs", style: { color: COLORS.text3 }, children: "Pilih semua modul yang dibutuhkan" })] })] }), _jsx("div", { className: "p-6", children: _jsx("div", { className: "grid grid-cols-2 gap-2", children: ['Sales', 'CRM', 'Inventory', 'Purchase', 'Accounting', 'Project Management', 'Marketplace Integration', 'Expenses'].map((mod) => (_jsxs("label", { style: { backgroundColor: formData.modules.includes(mod) ? COLORS.cyanDim : COLORS.bg2, borderColor: formData.modules.includes(mod) ? COLORS.cyan : COLORS.border, color: formData.modules.includes(mod) ? COLORS.text : COLORS.text2 }, className: "p-3 rounded-lg border cursor-pointer text-sm font-semibold transition", children: [_jsx("input", { type: "checkbox", value: mod, checked: formData.modules.includes(mod), onChange: (e) => {
                                                        if (e.target.checked) {
                                                            setFormData({ ...formData, modules: [...formData.modules, mod] });
                                                        }
                                                        else {
                                                            setFormData({ ...formData, modules: formData.modules.filter(m => m !== mod) });
                                                        }
                                                    }, className: "hidden" }), mod] }, mod))) }) })] }), _jsxs("div", { style: { backgroundColor: COLORS.surface, borderColor: COLORS.border }, className: "border rounded-2xl overflow-hidden", children: [_jsxs("div", { style: { backgroundColor: COLORS.surface2, borderColor: COLORS.border }, className: "flex items-center gap-3 p-4 border-b", children: [_jsx("div", { style: { backgroundColor: COLORS.cyan, color: COLORS.bg }, className: "w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black", children: "5" }), _jsxs("div", { children: [_jsx("h3", { className: "font-bold", style: { color: COLORS.text }, children: "Paket Layanan" }), _jsx("p", { className: "text-xs", style: { color: COLORS.text3 }, children: "Pilih paket yang sesuai" })] })] }), _jsxs("div", { className: "p-6 space-y-4", children: [_jsx("div", { className: "grid grid-cols-3 gap-3", children: [
                                                { id: 'basic', icon: '🚀', name: 'SYNERA Basic', price: 'Rp 2,25 jt', desc: 'Training 3 hari · Support 2× / bulan' },
                                                { id: 'growth', icon: '⭐', name: 'SYNERA Growth', price: 'Rp 3 jt', desc: 'Training 4 hari · Custom 10 jam · Onsite' },
                                                { id: 'pro', icon: '💎', name: 'SYNERA Pro', price: 'Rp 4 jt', desc: 'Full managed · Custom 30 jam' }
                                            ].map((pkg) => (_jsxs("label", { style: { backgroundColor: formData.package === pkg.id ? COLORS.cyanDim : COLORS.bg2, borderColor: formData.package === pkg.id ? COLORS.cyan : COLORS.border }, className: "p-4 rounded-xl border cursor-pointer transition", children: [_jsx("input", { type: "radio", name: "package", value: pkg.id, checked: formData.package === pkg.id, onChange: (e) => setFormData({ ...formData, package: e.target.value }), className: "hidden" }), _jsx("div", { className: "text-2xl mb-1", children: pkg.icon }), _jsx("div", { className: "text-sm font-bold", style: { color: COLORS.text }, children: pkg.name }), _jsx("div", { className: "text-sm font-semibold", style: { color: COLORS.cyan }, children: pkg.price }), _jsx("div", { className: "text-xs mt-1", style: { color: COLORS.text3 }, children: pkg.desc })] }, pkg.id))) }), _jsxs("div", { children: [_jsx("label", { style: { color: COLORS.text2 }, className: "text-xs font-semibold block mb-3", children: "Estimasi Mulai Implementasi" }), _jsx("div", { className: "grid grid-cols-2 gap-2", children: [
                                                        { value: 'segera', label: 'Segera (minggu ini)' },
                                                        { value: '1bulan', label: 'Dalam 1 bulan' },
                                                        { value: '3bulan', label: 'Dalam 3 bulan' },
                                                        { value: 'survey', label: 'Masih perlu diskusi' }
                                                    ].map((opt) => (_jsxs("label", { style: { backgroundColor: formData.start === opt.value ? COLORS.cyanDim : COLORS.bg2, borderColor: formData.start === opt.value ? COLORS.cyan : COLORS.border, color: formData.start === opt.value ? COLORS.text : COLORS.text2 }, className: "p-3 rounded-lg border cursor-pointer text-sm font-semibold transition", children: [_jsx("input", { type: "radio", name: "start", value: opt.value, checked: formData.start === opt.value, onChange: (e) => setFormData({ ...formData, start: e.target.value }), className: "hidden" }), opt.label] }, opt.value))) })] })] })] }), _jsxs("div", { style: { backgroundColor: COLORS.surface, borderColor: COLORS.border }, className: "border rounded-2xl overflow-hidden", children: [_jsxs("div", { style: { backgroundColor: COLORS.surface2, borderColor: COLORS.border }, className: "flex items-center gap-3 p-4 border-b", children: [_jsx("div", { style: { backgroundColor: COLORS.cyan, color: COLORS.bg }, className: "w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black", children: "6" }), _jsxs("div", { children: [_jsx("h3", { className: "font-bold", style: { color: COLORS.text }, children: "Catatan Kebutuhan Khusus" }), _jsx("p", { className: "text-xs", style: { color: COLORS.text3 }, children: "Opsional \u2014 bantu kami memahami bisnis Anda" })] })] }), _jsx("div", { className: "p-6", children: _jsx("textarea", { placeholder: "Contoh: integrasi marketplace Shopee, laporan per cabang, manajemen multi gudang, proses produksi, dll.", value: formData.notes, onChange: (e) => setFormData({ ...formData, notes: e.target.value }), style: { backgroundColor: COLORS.bg2, borderColor: COLORS.border2, color: COLORS.text }, className: "w-full rounded-lg px-3 py-2 text-sm placeholder-gray-600 focus:outline-none focus:ring-2 resize-none h-24" }) })] }), _jsxs("div", { style: { backgroundColor: COLORS.surface, borderColor: COLORS.border }, className: "border rounded-2xl overflow-hidden", children: [_jsxs("div", { style: { backgroundColor: COLORS.surface2, borderColor: COLORS.border }, className: "flex items-center gap-3 p-4 border-b", children: [_jsx("div", { style: { backgroundColor: COLORS.cyan, color: COLORS.bg }, className: "w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black", children: "7" }), _jsxs("div", { children: [_jsx("h3", { className: "font-bold", style: { color: COLORS.text }, children: "Persetujuan Registrasi" }), _jsx("p", { className: "text-xs", style: { color: COLORS.text3 }, children: "Konfirmasi komitmen untuk memulai implementasi" })] })] }), _jsxs("div", { className: "p-6 space-y-4", children: [_jsxs("div", { style: { backgroundColor: COLORS.bg2, borderColor: COLORS.border }, className: "border rounded-lg p-4 text-sm space-y-2", children: [_jsx("p", { children: _jsx("strong", { style: { color: COLORS.text }, children: "Dengan mengisi dan menandatangani form ini, perusahaan kami menyatakan:" }) }), _jsxs("p", { style: { color: COLORS.text2 }, children: ["1. ", _jsx("strong", { style: { color: COLORS.text }, children: "Minat dan komitmen" }), " untuk menggunakan sistem SYNERA sesuai paket yang dipilih."] }), _jsxs("p", { style: { color: COLORS.text2 }, children: ["2. ", _jsx("strong", { style: { color: COLORS.text }, children: "Bersedia melanjutkan" }), " proses penyusunan penawaran, perjanjian, dan invoice."] }), _jsxs("p", { style: { color: COLORS.text2 }, children: ["3. Data yang diisi adalah ", _jsx("strong", { style: { color: COLORS.text }, children: "benar dan dapat dipertanggungjawabkan" }), "."] }), _jsxs("p", { style: { color: COLORS.text2 }, children: ["4. Informasi ini akan digunakan untuk keperluan ", _jsx("strong", { style: { color: COLORS.text }, children: "implementasi dan administrasi SYNERA" }), " semata."] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsxs("label", { style: { color: COLORS.text2 }, className: "text-xs font-semibold block mb-2", children: ["Nama Penandatangan ", _jsx("span", { style: { color: COLORS.cyan }, children: "*" })] }), _jsx("input", { type: "text", placeholder: "Nama lengkap", required: true, value: formData.signer_name, onChange: (e) => setFormData({ ...formData, signer_name: e.target.value }), style: { backgroundColor: COLORS.bg2, borderColor: COLORS.border2, color: COLORS.text }, className: "w-full rounded-lg px-3 py-2 text-sm placeholder-gray-600 focus:outline-none focus:ring-2" })] }), _jsxs("div", { children: [_jsxs("label", { style: { color: COLORS.text2 }, className: "text-xs font-semibold block mb-2", children: ["Jabatan ", _jsx("span", { style: { color: COLORS.cyan }, children: "*" })] }), _jsx("input", { type: "text", placeholder: "Jabatan resmi", required: true, value: formData.signer_title, onChange: (e) => setFormData({ ...formData, signer_title: e.target.value }), style: { backgroundColor: COLORS.bg2, borderColor: COLORS.border2, color: COLORS.text }, className: "w-full rounded-lg px-3 py-2 text-sm placeholder-gray-600 focus:outline-none focus:ring-2" })] })] }), _jsxs("div", { children: [_jsx("label", { style: { color: COLORS.text2 }, className: "text-xs font-semibold block mb-2", children: "Tanda Tangan Digital" }), _jsxs("div", { style: { borderColor: COLORS.border2, backgroundColor: COLORS.bg2, height: '120px' }, className: "relative border-2 border-dashed rounded-lg overflow-hidden", children: [_jsx("canvas", { ref: canvasRef, onMouseDown: handleCanvasMouseDown, onMouseMove: handleCanvasMouseMove, onMouseUp: handleCanvasMouseUp, onMouseLeave: handleCanvasMouseLeave, onTouchStart: handleCanvasMouseDown, onTouchMove: handleCanvasMouseMove, onTouchEnd: handleCanvasMouseUp, className: "w-full h-full cursor-crosshair" }), !hasSig && (_jsx("div", { style: { color: COLORS.text3 }, className: "absolute inset-0 flex items-center justify-center pointer-events-none text-sm", children: "Klik & geser untuk tanda tangan" }))] }), _jsx("button", { type: "button", onClick: clearSignature, style: { color: COLORS.text3 }, className: "text-xs mt-2 underline", children: "Hapus tanda tangan" })] })] })] }), _jsxs("div", { className: "flex flex-col items-center gap-4", children: [_jsx("button", { type: "submit", style: { backgroundColor: COLORS.cyan, color: COLORS.bg }, className: "w-full max-w-sm font-bold py-3 rounded-xl transition transform hover:translate-y-[-2px] hover:shadow-[0_12px_32px_rgba(6,182,212,0.3)]", children: "\u2713 Kirim Registrasi" }), _jsx("p", { className: "text-xs text-center", style: { color: COLORS.text3 }, children: "Data Anda aman dan hanya digunakan untuk keperluan implementasi SYNERA." })] })] })] }) }));
}
//# sourceMappingURL=RegistrasiPage.js.map