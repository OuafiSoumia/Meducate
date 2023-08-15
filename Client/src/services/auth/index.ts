import apiClient from 'src/axios/client'
import { LoginParams } from 'src/context/types'
import { PersonalInfo, ProfessionalInfo } from 'src/types/apps/register'

class AuthService {
  static async registerUser(user: Partial<PersonalInfo & ProfessionalInfo>) {
    try {
      const response = await apiClient.post('/auth/sign-up', user)

      return response.data
    } catch (err: any) {
      throw err
    }
  }

  static async verifyEmail(token: string) {
    try {
      const response = await apiClient.get(`/user/verification/${token}`)

      return response.data
    } catch (err: any) {
      throw err
    }
  }

  static async requestVerificationEmail(email: string) {
    try {
      const response = await apiClient.post('/user/verification/request', { email })

      return response.data
    } catch (err: any) {
      throw err
    }
  }

  static async login(params: LoginParams) {
    try {
      const response = await apiClient.post('/auth/sign-in', params)

      return response.data
    } catch (err: any) {
      throw err
    }
  }

  static async me() {
    try {
      const response = await apiClient.get('/me')

      return response.data
    } catch (err: any) {
      throw err
    }
  }
}

export default AuthService
