import { apiClient } from './client';
import type { ApiResponse, Conversation, ConversationMessage, ConversationMessagesResponse } from '../types';

export interface SendConversationMessagePayload {
  content: string;
}

export interface GetConversationMessagesQuery {
  page?: number;
  limit?: number;
}

export const conversationsApi = {
  async getConversations(): Promise<ApiResponse<{ conversations: Conversation[] }>> {
    const response = await apiClient.get<ApiResponse<{ conversations: Conversation[] }>>('/conversations');
    return response.data;
  },

  async sendConversationMessage(
    conversationId: string,
    payload: SendConversationMessagePayload,
  ): Promise<ApiResponse<{ message: ConversationMessage }>> {
    const response = await apiClient.post<ApiResponse<{ message: ConversationMessage }>>(
      `/conversations/${conversationId}/messages`,
      payload,
    );
    return response.data;
  },

  async getConversationMessages(
    conversationId: string,
    query?: GetConversationMessagesQuery,
  ): Promise<ApiResponse<ConversationMessagesResponse>> {
    const response = await apiClient.get<ApiResponse<ConversationMessagesResponse>>(
      `/conversations/${conversationId}/messages`,
      { params: query },
    );
    return response.data;
  },
};
