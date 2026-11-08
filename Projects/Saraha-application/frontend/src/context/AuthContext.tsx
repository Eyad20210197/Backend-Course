import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  authApi,
  usersApi,
  type LoginPayload,
  type RegisterPayload,
  type VerifyEmailPayload,
  type UpdateProfilePayload,
  type ChangePasswordPayload,
} from '../api';
import type { User } from '../types';

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginPayload) => Promise<User>;
  register: (payload: RegisterPayload) => Promise<User>;
  verifyEmail: (payload: VerifyEmailPayload) => Promise<User>;
  resendVerification: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<User | null>;
  updateProfile: (payload: UpdateProfilePayload) => Promise<User>;
  changePassword: (payload: ChangePasswordPayload) => Promise<void>;
  deleteAccount: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refreshProfile = useCallback(async (): Promise<User | null> => {
    try {
      const response = await usersApi.getMyProfile();
      if (response.success && response.data?.user) {
        setUser(response.data.user);
        return response.data.user;
      }
      setUser(null);
      return null;
    } catch {
      setUser(null);
      return null;
    }
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      await refreshProfile();
      setIsLoading(false);
    };
    initAuth();
  }, [refreshProfile]);

  const login = async (credentials: LoginPayload): Promise<User> => {
    const response = await authApi.login(credentials);
    if (response.data?.user) {
      setUser(response.data.user);
      return response.data.user;
    }
    throw new Error(response.message || 'Login failed.');
  };

  const register = async (payload: RegisterPayload): Promise<User> => {
    const response = await authApi.register({
      ...payload,
      provider: 'local',
    });
    if (response.data?.user) {
      return response.data.user;
    }
    throw new Error(response.message || 'Registration failed.');
  };

  const verifyEmail = async (payload: VerifyEmailPayload): Promise<User> => {
    const response = await authApi.verifyEmail(payload);
    if (response.data?.user) {
      setUser(response.data.user);
      return response.data.user;
    }
    throw new Error(response.message || 'Email verification failed.');
  };

  const resendVerification = async (email: string): Promise<void> => {
    await authApi.resendVerification({ email });
  };

  const logout = async (): Promise<void> => {
    try {
      await authApi.logout();
    } finally {
      setUser(null);
    }
  };

  const updateProfile = async (payload: UpdateProfilePayload): Promise<User> => {
    const response = await usersApi.updateMyProfile(payload);
    if (response.data?.user) {
      setUser(response.data.user);
      return response.data.user;
    }
    throw new Error(response.message || 'Profile update failed.');
  };

  const changePassword = async (payload: ChangePasswordPayload): Promise<void> => {
    await usersApi.changeMyPassword(payload);
  };

  const deleteAccount = async (): Promise<void> => {
    await usersApi.deleteMyAccount();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        verifyEmail,
        resendVerification,
        logout,
        refreshProfile,
        updateProfile,
        changePassword,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
