import axios, { AxiosError } from 'axios';
import type { ApiResponse } from '../types';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '';

export const apiClient = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface ErrorDetails {
  message: string;
  code?: string;
  statusCode?: number;
  errors?: Array<{ field: string; message: string }>;
}

export function parseApiError(error: unknown): ErrorDetails {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiResponse>;
    const responseData = axiosError.response?.data;
    const statusCode = axiosError.response?.status;

    if (responseData) {
      return {
        message: responseData.message || 'An error occurred.',
        code: responseData.code,
        statusCode,
        errors: responseData.errors,
      };
    }

    if (axiosError.code === 'ERR_NETWORK') {
      return {
        message: 'Network error. Please check your internet connection or backend server.',
        code: 'NETWORK_ERROR',
        statusCode: 0,
      };
    }

    return {
      message: axiosError.message || 'Request failed.',
      statusCode,
    };
  }

  if (error instanceof Error) {
    return { message: error.message };
  }

  return { message: 'An unexpected error occurred.' };
}
