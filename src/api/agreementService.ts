import axiosInstance from './axiosConfig'

export interface SubmitAgreementRequest {
  status: 'agreed' | 'rejected'
  signer_name: string
}

export interface SubmitAgreementResponse {
  success: boolean
  message: string
  data: {
    id: string
    reg_no: string
    company: string
    agreement_status: string
    agreed_at: string
    agreed_by: string
  }
}

export const agreementService = {
  submitAgreement: async (
    registrationId: string,
    request: SubmitAgreementRequest
  ): Promise<SubmitAgreementResponse> => {
    try {
      const response = await axiosInstance.patch<SubmitAgreementResponse>(
        `/registrations/${registrationId}/agreement`,
        request
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
