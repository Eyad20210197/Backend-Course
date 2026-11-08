import { apiClient } from './client';
import type { ApiResponse, User } from '../types';

export interface UpdateProfilePayload {
  name?: string;
  dateOfBirth?: string | null;
  profilePicture?: string | null;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export const usersApi = {
  async getMyProfile(): Promise<ApiResponse<{ user: User }>> {
    const response = await apiClient.get<ApiResponse<{ user: User }>>('/users/me');
    return response.data;
  },

  async updateMyProfile(payload: UpdateProfilePayload): Promise<ApiResponse<{ user: User }>> {
    const response = await apiClient.patch<ApiResponse<{ user: User }>>('/users/me', payload);
    return response.data;
  },

  async deleteMyAccount(): Promise<ApiResponse<undefined>> {
    const response = await apiClient.delete<ApiResponse<undefined>>('/users/me');
    return response.data;
  },

  async changeMyPassword(payload: ChangePasswordPayload): Promise<ApiResponse<undefined>> {
    const response = await apiClient.patch<ApiResponse<undefined>>('/users/me/password', payload);
    return response.data;
  },
};
