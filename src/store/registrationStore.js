import { create } from 'zustand';
const emptyData = {
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
};
export const useRegistrationStore = create((set) => ({
    data: emptyData,
    setData: (data) => set({ data }),
    updateData: (updates) => set((state) => ({ data: { ...state.data, ...updates } })),
    reset: () => set({ data: emptyData })
}));
//# sourceMappingURL=registrationStore.js.map