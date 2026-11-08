export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  provider?: 'local' | 'google';
  dateOfBirth?: string | null;
  profilePicture?: string | null;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AnonymousMessage {
  _id: string;
  receiverId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface IdentityRequest {
  _id: string;
  messageId: {
    _id: string;
    content: string;
    createdAt: string;
    receiverId?: string;
  } | string;
  receiverId: {
    _id: string;
    name: string;
    email: string;
  } | string;
  senderId?: string;
  status: 'pending' | 'accepted' | 'rejected';
  sender?: {
    _id: string;
    name: string;
    email: string;
  } | null;
  createdAt: string;
  updatedAt: string;
}

export interface ConversationParticipant {
  _id: string;
  name: string;
  email: string;
}

export interface Conversation {
  _id: string;
  originalMessageId: {
    _id: string;
    content: string;
    createdAt: string;
  };
  participants: ConversationParticipant[];
  createdAt: string;
  updatedAt: string;
}

export interface ConversationMessage {
  _id: string;
  conversationId: string;
  senderId: ConversationParticipant | string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ConversationMessagesResponse {
  messages: ConversationMessage[];
  pagination: Pagination;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  code?: string;
  errors?: Array<{ field: string; message: string }>;
}
