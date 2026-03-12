export interface RegistrationData {
    company: string;
    brand: string;
    industry: string;
    city: string;
    address: string;
    website: string;
    pic_name: string;
    pic_title: string;
    phone: string;
    email: string;
    employees: string;
    users: string;
    current_sys: string[];
    modules: string[];
    package: string;
    start: string;
    notes: string;
    signer_name: string;
    signer_title: string;
    signer_city: string;
    signature: string;
    date?: string;
    regNo?: string;
}
interface Store {
    data: Partial<RegistrationData>;
    setData: (data: Partial<RegistrationData>) => void;
    updateData: (updates: Partial<RegistrationData>) => void;
    reset: () => void;
}
export declare const useRegistrationStore: import("zustand").UseBoundStore<import("zustand").StoreApi<Store>>;
export {};
//# sourceMappingURL=registrationStore.d.ts.map