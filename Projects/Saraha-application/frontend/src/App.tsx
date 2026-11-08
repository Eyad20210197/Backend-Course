import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './components/ui/Toast';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { PublicRoute } from './components/layout/PublicRoute';
import { AppShell } from './components/layout/AppShell';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { VerifyEmailPage } from './pages/VerifyEmailPage';
import { InboxPage } from './pages/InboxPage';
import { SendAnonymousPage } from './pages/SendAnonymousPage';
import { IdentityRequestsPage } from './pages/IdentityRequestsPage';
import { ConversationsPage } from './pages/ConversationsPage';
import { ProfileSettingsPage } from './pages/ProfileSettingsPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <Routes>
            {/* Public landing */}
            <Route path="/" element={<LandingPage />} />

            {/* Authentication routes */}
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <RegisterPage />
                </PublicRoute>
              }
            />
            <Route
              path="/verify-email"
              element={
                <PublicRoute>
                  <VerifyEmailPage />
                </PublicRoute>
              }
            />

            {/* Public or authenticated Send message */}
            <Route
              path="/send"
              element={
                <ProtectedRoute>
                  <AppShell>
                    <SendAnonymousPage />
                  </AppShell>
                </ProtectedRoute>
              }
            />

            {/* Authenticated Application Shell routes */}
            <Route
              path="/inbox"
              element={
                <ProtectedRoute>
                  <AppShell>
                    <InboxPage />
                  </AppShell>
                </ProtectedRoute>
              }
            />
            <Route
              path="/requests"
              element={
                <ProtectedRoute>
                  <AppShell>
                    <IdentityRequestsPage />
                  </AppShell>
                </ProtectedRoute>
              }
            />
            <Route
              path="/conversations"
              element={
                <ProtectedRoute>
                  <AppShell>
                    <ConversationsPage />
                  </AppShell>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <AppShell>
                    <ProfileSettingsPage />
                  </AppShell>
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
};

export default App;
