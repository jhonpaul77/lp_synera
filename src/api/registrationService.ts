import axiosInstance from './axiosConfig'

export interface Registration {
  id: string
  reg_no: string
  company_id: string
  company: string
  brand?: string
  industry: string
  city: string
  address?: string
  website?: string
  pic: string
  pic_title: string
  phone: string
  email: string
  employees?: string
  users?: string
  current_sys?: string[]
  modules?: string[]
  package: string
  start_date?: string
  notes?: string
  signer_name?: string
  signer_title?: string
  signer_city?: string
  signature?: string
  reg_status: string
  approval_status: string
  created_at: string
  updated_at: string
}

export interface GetRegistrationsResponse {
  success: boolean
  data: Registration[]
}

export const registrationService = {
  getRegistrations: async (filters?: {
    status?: string
    approval_status?: string
  }): Promise<GetRegistrationsResponse> => {
    try {
      const params = new URLSearchParams()
      if (filters?.status) params.append('status', filters.status)
      if (filters?.approval_status) params.append('approval_status', filters.approval_status)

      const queryString = params.toString()
      const url = queryString ? `/registrations?${queryString}` : '/registrations'

      const response = await axiosInstance.get<GetRegistrationsResponse>(url)
      return response.data
    } catch (error: any) {
      if (error.response?.data) {
        throw error.response.data
      }
      throw error
    }
  },

  getRegistrationById: async (id: string): Promise<{ success: boolean; data: Registration }> => {
    try {
      const response = await axiosInstance.get<{ success: boolean; data: Registration }>(`/registrations/${id}`)
      return response.data
    } catch (error: any) {
      if (error.response?.data) {
        throw error.response.data
      }
      throw error
    }
  },

  updateApprovalStatus: async (id: string, status: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await axiosInstance.patch<{ success: boolean; message: string }>(
        `/registrations/${id}/approval`,
        { approval_status: status }
      )
      return response.data
    } catch (error: any) {
      if (error.response?.data) {
        throw error.response.data
      }
      throw error
    }
  },

  createRegistration: async (data: any): Promise<{ success: boolean; message: string; data: { id: string; reg_no: string; company: string; status: string } }> => {
    try {
      const response = await axiosInstance.post<{ success: boolean; message: string; data: { id: string; reg_no: string; company: string; status: string } }>
        ('/registrations', data)
      return response.data
    } catch (error: any) {
      if (error.response?.data) {
        throw error.response.data
      }
      throw error
    }
  },

  deleteRegistration: async (id: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await axiosInstance.delete<{ success: boolean; message: string }>(
        `/registrations/${id}`
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
