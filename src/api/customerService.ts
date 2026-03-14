import axiosInstance from './axiosConfig'

export interface Customer {
  id: string
  company_id: string
  company: string
  industry?: string
  city?: string
  address?: string
  created_at?: string
  updated_at?: string
}

export interface GetCustomersResponse {
  success: boolean
  data: Customer[]
}

export const customerService = {
  getCustomers: async (): Promise<GetCustomersResponse> => {
    try {
      const response = await axiosInstance.get<GetCustomersResponse>('/customers')
      return response.data
    } catch (error: any) {
      if (error.response?.data) {
        throw error.response.data
      }
      throw error
    }
  },

  getCustomerById: async (id: string): Promise<{ success: boolean; data: Customer }> => {
    try {
      const response = await axiosInstance.get<{ success: boolean; data: Customer }>(
        `/customers/${id}`
      )
      return response.data
    } catch (error: any) {
      if (error.response?.data) {
        throw error.response.data
      }
      throw error
    }
  },
}
