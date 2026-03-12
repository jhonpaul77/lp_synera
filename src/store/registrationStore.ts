import { create } from 'zustand'

export interface RegistrationData {
  // Section 1: Company Data
  company: string
  brand: string
  industry: string
  city: string
  address: string
  website: string
  
  // Section 2: PIC
  pic_name: string
  pic_title: string
  phone: string
  email: string
  
  // Section 3: Operational
  employees: string
  users: string
  current_sys: string[]
  
  // Section 4: Modules
  modules: string[]
  
  // Section 5: Package
  package: string
  start: string
  
  // Section 6: Notes
  notes: string
  
  // Section 7: Signature
  signer_name: string
  signer_title: string
  signer_city: string
  signature: string
  
  // Metadata
  date?: string
  regNo?: string
}

interface Store {
  data: Partial<RegistrationData>
  setData: (data: Partial<RegistrationData>) => void
  updateData: (updates: Partial<RegistrationData>) => void
  reset: () => void
}

const emptyData: Partial<RegistrationData> = {
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
}

export const useRegistrationStore = create<Store>((set) => ({
  data: emptyData,
  setData: (data) => set({ data }),
  updateData: (updates) => set((state) => ({ data: { ...state.data, ...updates } })),
  reset: () => set({ data: emptyData })
}))
