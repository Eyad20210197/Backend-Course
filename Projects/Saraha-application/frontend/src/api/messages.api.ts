import { apiClient } from './client';
import type { ApiResponse, AnonymousMessage } from '../types';

export interface SendMessagePayload {
  receiverId: string;
  content: string;
}

export const messagesApi = {
  async sendMessage(payload: SendMessagePayload): Promise<ApiResponse<{ message: AnonymousMessage }>> {
    const response = await apiClient.post<ApiResponse<{ message: AnonymousMessage }>>('/messages', payload);
    return response.data;
  },

  async getReceivedMessages(): Promise<ApiResponse<{ messages: AnonymousMessage[] }>> {
    const response = await apiClient.get<ApiResponse<{ messages: AnonymousMessage[] }>>('/messages');
    return response.data;
  },
};
