import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Lock,
  Calendar,
  Image,
  Copy,
  Check,
  ShieldCheck,
  AlertTriangle,
  Save,
  Trash2,
  Share2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { parseApiError } from '../api';
import { useToast } from '../components/ui/Toast';

export const ProfileSettingsPage: React.FC = () => {
  const { user, updateProfile, changePassword, deleteAccount } = useAuth();
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();

  // Profile Edit State
  const [name, setName] = useState(user?.name || '');
  const [dateOfBirth, setDateOfBirth] = useState(
    user?.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : '',
  );
  const [profilePicture, setProfilePicture] = useState(user?.profilePicture || '');
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  // Change Password State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Delete Account Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

  // Link copy state
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  const personalLink = user?._id
    ? `${window.location.origin}/send?to=${user._id}`
    : '';

  const handleCopyLink = () => {
    if (!personalLink) return;
    navigator.clipboard.writeText(personalLink);
    setCopiedLink(true);
    showSuccess('Public anonymous link copied!');
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyId = () => {
    if (!user?._id) return;
    navigator.clipboard.writeText(user._id);
    setCopiedId(true);
    showSuccess('User ID copied!');
    setTimeout(() => setCopiedId(false), 2500);
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingProfile(true);

    try {
      await updateProfile({
        name: name.trim() || undefined,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth).toISOString() : null,
        profilePicture: profilePicture.trim() || null,
      });
      showSuccess('Profile updated successfully.');
    } catch (err) {
      const parsed = parseApiError(err);
      showError(parsed.message);
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword || !newPassword) {
      showError('Please fill in both current and new passwords.');
      return;
    }

    if (newPassword.length < 8) {
      showError('New password must be at least 8 characters long.');
      return;
    }

    if (newPassword === currentPassword) {
      showError('New password must be different from current password.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      showError('New passwords do not match.');
      return;
    }

    setIsChangingPassword(true);
    try {
      await changePassword({
        currentPassword,
        newPassword,
      });
      showSuccess('Password changed successfully.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (err) {
      const parsed = parseApiError(err);
      showError(parsed.message);
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleConfirmDeleteAccount = async () => {
    setIsDeletingAccount(true);
    try {
      await deleteAccount();
      showSuccess('Your account has been deleted.');
      setIsDeleteModalOpen(false);
      navigate('/login');
    } catch (err) {
      const parsed = parseApiError(err);
      showError(parsed.message);
    } finally {
      setIsDeletingAccount(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <PageHeader
        title="Account & Settings"
        subtitle="Manage your profile information, credentials, and public link."
        badge={
          user?.isEmailVerified ? (
            <Badge variant="green" size="md" icon={<ShieldCheck className="w-3.5 h-3.5" />}>
              Verified User
            </Badge>
          ) : (
            <Badge variant="yellow" size="md">
              Unverified
            </Badge>
          )
        }
      />

      {/* User Identity & Link Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 text-yellow-200 font-extrabold text-xl flex items-center justify-center uppercase shadow-md shadow-blue-500/20 shrink-0">
            {user?.name?.slice(0, 2) || 'US'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900 m-0">{user?.name}</h2>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                {user?.role || 'user'}
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1 m-0">{user?.email}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs font-mono text-slate-400">ID: {user?._id}</span>
              <button
                onClick={handleCopyId}
                className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-medium cursor-pointer"
              >
                {copiedId ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                {copiedId ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
        </div>

        <div className="w-full md:w-auto p-4 rounded-xl bg-blue-50/70 border border-blue-100 flex flex-col gap-2 shrink-0">
          <span className="text-[11px] font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
            <Share2 className="w-3.5 h-3.5 text-blue-600" /> Your Anonymous Link
          </span>
          <p className="text-xs font-mono text-slate-600 break-all select-all bg-white p-2 rounded-lg border border-blue-100">
            {personalLink}
          </p>
          <Button
            size="sm"
            variant="accent"
            onClick={handleCopyLink}
            leftIcon={copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-800" /> : <Copy className="w-3.5 h-3.5" />}
            className="w-full justify-center"
          >
            {copiedLink ? 'Copied to Clipboard' : 'Copy Public Link'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile Info Form (PATCH /users/me) */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="pb-4 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 m-0">Edit Profile</h3>
            <p className="text-xs text-slate-500 mt-1 m-0">
              Update your display name and optional personal details.
            </p>
          </div>

          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <Input
              label="Display Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              leftIcon={<User className="w-4 h-4" />}
              minLength={2}
              maxLength={100}
              required
            />

            <Input
              label="Date of Birth"
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              leftIcon={<Calendar className="w-4 h-4" />}
              helperText="Optional."
            />

            <Input
              label="Profile Picture URL"
              type="url"
              value={profilePicture}
              onChange={(e) => setProfilePicture(e.target.value)}
              placeholder="https://example.com/photo.jpg"
              leftIcon={<Image className="w-4 h-4" />}
              helperText="Direct image link (optional)."
            />

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                isLoading={isUpdatingProfile}
                leftIcon={<Save className="w-4 h-4" />}
              >
                Save Profile Changes
              </Button>
            </div>
          </form>
        </div>

        {/* Change Password Form (PATCH /users/me/password) */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="pb-4 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 m-0">Change Password</h3>
            <p className="text-xs text-slate-500 mt-1 m-0">
              Ensure your account remains safe with a strong password.
            </p>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-4">
            <Input
              label="Current Password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
              leftIcon={<Lock className="w-4 h-4" />}
              required
            />

            <Input
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="At least 8 characters"
              leftIcon={<Lock className="w-4 h-4" />}
              minLength={8}
              required
            />

            <Input
              label="Confirm New Password"
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              placeholder="Re-enter new password"
              leftIcon={<Lock className="w-4 h-4" />}
              minLength={8}
              required
            />

            <div className="pt-2">
              <Button
                type="submit"
                variant="secondary"
                className="w-full"
                isLoading={isChangingPassword}
                leftIcon={<Lock className="w-4 h-4 text-blue-600" />}
              >
                Update Password
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Danger Zone (DELETE /users/me) */}
      <div className="bg-red-50/50 rounded-2xl border border-red-200/80 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-red-900 m-0 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" /> Danger Zone: Delete Account
            </h3>
            <p className="text-xs text-red-700 m-0 max-w-xl">
              Permanently deactivate your Saraha account. All pending identity requests and message links will be invalidated.
            </p>
          </div>
          <Button
            variant="danger"
            size="sm"
            onClick={() => setIsDeleteModalOpen(true)}
            leftIcon={<Trash2 className="w-4 h-4" />}
            className="shrink-0"
          >
            Delete Account
          </Button>
        </div>
      </div>

      {/* Delete Account Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Your Account?"
        description="This action will deactivate your Saraha account."
        footer={
          <>
            <Button
              variant="ghost"
              onClick={() => setIsDeleteModalOpen(false)}
              disabled={isDeletingAccount}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleConfirmDeleteAccount}
              isLoading={isDeletingAccount}
            >
              Yes, Delete My Account
            </Button>
          </>
        }
      >
        <p className="text-sm text-slate-600 m-0 leading-relaxed">
          Are you sure you want to proceed? You will be immediately logged out and your profile will be disabled.
        </p>
      </Modal>
    </div>
  );
};
