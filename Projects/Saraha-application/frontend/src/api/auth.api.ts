import { apiClient } from './client';
import type { ApiResponse, User } from '../types';

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  provider?: 'local' | 'google';
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface VerifyEmailPayload {
  email: string;
  code: string;
}

export interface ResendVerificationPayload {
  email: string;
}

export const authApi = {
  async register(payload: RegisterPayload): Promise<ApiResponse<{ user: User }>> {
    const response = await apiClient.post<ApiResponse<{ user: User }>>('/auth/register', {
      ...payload,
      provider: payload.provider || 'local',
    });
    return response.data;
  },

  async login(payload: LoginPayload): Promise<ApiResponse<{ user: User }>> {
    const response = await apiClient.post<ApiResponse<{ user: User }>>('/auth/login', payload);
    return response.data;
  },

  async logout(): Promise<ApiResponse<undefined>> {
    const response = await apiClient.post<ApiResponse<undefined>>('/auth/logout');
    return response.data;
  },

  async verifyEmail(payload: VerifyEmailPayload): Promise<ApiResponse<{ user: User }>> {
    const response = await apiClient.post<ApiResponse<{ user: User }>>('/auth/verify-email', payload);
    return response.data;
  },

  async resendVerification(payload: ResendVerificationPayload): Promise<ApiResponse<undefined>> {
    const response = await apiClient.post<ApiResponse<undefined>>('/auth/resend-verification', payload);
    return response.data;
  },
};
