export const mockModules = [
  { id: 'inventory', label: 'Manajemen Inventori' },
  { id: 'finance', label: 'Akuntansi & Keuangan' },
  { id: 'sales', label: 'Penjualan & POS' },
  { id: 'purchase', label: 'Pembelian & Supplier' },
  { id: 'hr', label: 'HR & Payroll' },
  { id: 'production', label: 'Produksi' },
]

export const mockPackages = {
  starter: {
    name: 'Paket Starter',
    price: 12000000,
    modules: ['inventory', 'sales'],
    features: [
      'Setup sistem dan konfigurasi',
      'Training untuk 5 user',
      'Support email & chat 9-5',
    ],
  },
  professional: {
    name: 'Paket Professional',
    price: 25000000,
    modules: ['inventory', 'finance', 'sales', 'purchase'],
    features: [
      'Setup sistem lengkap',
      'Training untuk 15 user',
      'Support 24/7',
      'Custom report builder',
    ],
  },
  enterprise: {
    name: 'Paket Enterprise',
    price: 50000000,
    modules: ['inventory', 'finance', 'sales', 'purchase', 'hr', 'production'],
    features: [
      'Setup & konfigurasi penuh',
      'Training unlimited',
      'Support dedicated',
      'Custom development',
      'API integration',
    ],
  },
}

export const mockRegistration = {
  company: 'PT. Maju Jaya Indonesia',
  industry: 'Manufaktur',
  address: 'Jl. Industri No. 42, Surabaya',
  pic: 'Budi Santoso',
  picTitle: 'Direktur Operasional',
  modules: ['inventory', 'sales', 'finance'],
  package: 'professional',
  notes: 'Butuh integrasi dengan sistem legacy',
  startDate: '2026-04-01',
  price: 25000000,
}
