import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { TsgLogo } from '../components/brand/TsgLogo';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { parseApiError } from '../api';
import { useToast } from '../components/ui/Toast';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { showSuccess } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/inbox';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email || !password) {
      setErrorMessage('Please provide both email and password.');
      return;
    }

    setIsLoading(true);
    try {
      await login({ email, password });
      showSuccess('Welcome back!');
      navigate(from, { replace: true });
    } catch (err) {
      const parsed = parseApiError(err);
      setErrorMessage(parsed.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8">
        <Link to="/" className="inline-block no-underline mb-6">
          <TsgLogo size="lg" />
        </Link>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight m-0">
          Sign In to Saraha
        </h2>
        <p className="text-sm font-medium text-slate-500 mt-2 m-0">
          Enter your credentials to access your anonymous inbox.
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-2xl border border-slate-200/80 shadow-sm">
          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-500" />
              <div className="text-sm">
                <p className="font-semibold m-0">{errorMessage}</p>
                {errorMessage.toLowerCase().includes('verif') && (
                  <Link
                    to={`/verify-email?email=${encodeURIComponent(email)}`}
                    className="inline-block mt-2 font-bold text-red-800 underline text-xs"
                  >
                    Click here to enter your verification code
                  </Link>
                )}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              leftIcon={<Mail className="w-4 h-4" />}
              required
              autoComplete="email"
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              leftIcon={<Lock className="w-4 h-4" />}
              required
              autoComplete="current-password"
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full py-3"
              isLoading={isLoading}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Sign In
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col items-center gap-3 text-center">
            <p className="text-sm text-slate-600 m-0">
              Don't have an account yet?{' '}
              <Link to="/register" className="font-bold text-blue-600 hover:text-blue-700 underline">
                Create one now
              </Link>
            </p>
            <p className="text-xs text-slate-500 m-0">
              Need to verify your email?{' '}
              <Link to="/verify-email" className="font-semibold text-slate-700 hover:underline">
                Enter code
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
