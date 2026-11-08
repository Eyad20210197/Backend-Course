import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { TsgLogo } from '../components/brand/TsgLogo';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { parseApiError } from '../api';
import { useToast } from '../components/ui/Toast';

export const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const { showSuccess } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (name.trim().length < 3) {
      setErrorMessage('Name must be at least 3 characters long.');
      return;
    }

    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    try {
      await register({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        provider: 'local',
      });
      showSuccess('Account created! Please enter the 6-digit code sent to your email.');
      navigate(`/verify-email?email=${encodeURIComponent(email.trim().toLowerCase())}`);
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
          Create Your Account
        </h2>
        <p className="text-sm font-medium text-slate-500 mt-2 m-0">
          Set up your profile to receive constructive anonymous feedback.
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

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Eyad Aboelftoh"
              leftIcon={<User className="w-4 h-4" />}
              required
              minLength={3}
              maxLength={30}
            />

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
              placeholder="At least 8 characters"
              leftIcon={<Lock className="w-4 h-4" />}
              required
              minLength={8}
              helperText="Must be between 8 and 128 characters."
              autoComplete="new-password"
            />

            <Input
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              leftIcon={<Lock className="w-4 h-4" />}
              required
              autoComplete="new-password"
            />

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                className="w-full py-3"
                isLoading={isLoading}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Create Account
              </Button>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-600 m-0">
              Already registered?{' '}
              <Link to="/login" className="font-bold text-blue-600 hover:text-blue-700 underline">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
