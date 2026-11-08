import { apiClient } from './client';
import type { ApiResponse, IdentityRequest, Conversation } from '../types';

export interface CreateIdentityRequestPayload {
  messageId: string;
}

export interface RespondToRequestPayload {
  status: 'accepted' | 'rejected';
}

export interface RespondToRequestResponse {
  request: IdentityRequest;
  conversation?: Conversation | null;
}

export const identityRequestsApi = {
  async createIdentityRequest(payload: CreateIdentityRequestPayload): Promise<ApiResponse<{ request: IdentityRequest }>> {
    const response = await apiClient.post<ApiResponse<{ request: IdentityRequest }>>('/identity-requests', payload);
    return response.data;
  },

  async getSenderIdentityRequests(): Promise<ApiResponse<{ requests: IdentityRequest[] }>> {
    const response = await apiClient.get<ApiResponse<{ requests: IdentityRequest[] }>>('/identity-requests');
    return response.data;
  },

  async getIdentityRequestDetails(requestId: string): Promise<ApiResponse<{ request: IdentityRequest }>> {
    const response = await apiClient.get<ApiResponse<{ request: IdentityRequest }>>(`/identity-requests/${requestId}`);
    return response.data;
  },

  async respondToIdentityRequest(requestId: string, payload: RespondToRequestPayload): Promise<ApiResponse<RespondToRequestResponse>> {
    const response = await apiClient.patch<ApiResponse<RespondToRequestResponse>>(`/identity-requests/${requestId}`, payload);
    return response.data;
  },
};
