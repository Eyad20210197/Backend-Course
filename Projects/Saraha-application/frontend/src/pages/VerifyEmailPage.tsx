import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, KeyRound, ArrowRight, AlertCircle, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { TsgLogo } from '../components/brand/TsgLogo';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { parseApiError } from '../api';
import { useToast } from '../components/ui/Toast';

export const VerifyEmailPage: React.FC = () => {
  const { verifyEmail, resendVerification } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { showSuccess } = useToast();

  const [email, setEmail] = useState(() => searchParams.get('email') || '');
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanCode = code.trim();
    if (!/^\d{6}$/.test(cleanCode)) {
      setErrorMessage('Verification code must be exactly 6 digits.');
      return;
    }

    setIsLoading(true);
    try {
      await verifyEmail({
        email: email.trim().toLowerCase(),
        code: cleanCode,
      });
      showSuccess('Email verified successfully! Welcome to Saraha.');
      navigate('/inbox', { replace: true });
    } catch (err) {
      const parsed = parseApiError(err);
      setErrorMessage(parsed.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      setErrorMessage('Please enter your email address to resend code.');
      return;
    }

    setErrorMessage(null);
    setIsResending(true);
    try {
      await resendVerification(email.trim().toLowerCase());
      showSuccess('New verification code sent to your email.');
      setResendCooldown(60); // 60s cooldown
    } catch (err) {
      const parsed = parseApiError(err);
      setErrorMessage(parsed.message);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8">
        <Link to="/" className="inline-block no-underline mb-6">
          <TsgLogo size="lg" />
        </Link>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight m-0">
          Verify Your Email
        </h2>
        <p className="text-sm font-medium text-slate-500 mt-2 m-0">
          We sent a 6-digit verification code to your email address.
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-2xl border border-slate-200/80 shadow-sm">
          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-500" />
              <div className="text-sm">
                <p className="font-semibold m-0">{errorMessage}</p>
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
              label="6-Digit Verification Code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="123456"
              leftIcon={<KeyRound className="w-4 h-4" />}
              required
              maxLength={6}
              helperText="Expires in 10 minutes."
              className="text-center font-mono tracking-widest text-lg font-bold"
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full py-3"
              isLoading={isLoading}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Verify & Enter Inbox
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col items-center gap-3 text-center">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleResend}
              isLoading={isResending}
              disabled={resendCooldown > 0}
              leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
              className="text-xs text-blue-600 font-semibold"
            >
              {resendCooldown > 0
                ? `Resend code in ${resendCooldown}s`
                : "Didn't receive code? Resend"}
            </Button>

            <p className="text-xs text-slate-500 m-0">
              Back to{' '}
              <Link to="/login" className="font-semibold text-slate-700 hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
