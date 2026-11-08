import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Inbox,
  UserCheck,
  MessageSquare,
  Send,
  User as UserIcon,
  LogOut,
  Copy,
  Check,
  Menu,
  X,
  Share2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { TsgLogo } from '../brand/TsgLogo';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { useToast } from '../ui/Toast';

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { showSuccess } = useToast();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const personalLink = user?._id
    ? `${window.location.origin}/send?to=${user._id}`
    : '';

  const handleCopyLink = () => {
    if (!personalLink) return;
    navigator.clipboard.writeText(personalLink);
    setCopiedLink(true);
    showSuccess('Your personal anonymous link copied to clipboard!');
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleLogout = async () => {
    await logout();
    setIsLogoutModalOpen(false);
    navigate('/login');
  };

  const navItems = [
    { label: 'Inbox', path: '/inbox', icon: <Inbox className="w-5 h-5" /> },
    { label: 'Identity Requests', path: '/requests', icon: <UserCheck className="w-5 h-5" /> },
    { label: 'Conversations', path: '/conversations', icon: <MessageSquare className="w-5 h-5" /> },
    { label: 'Send Message', path: '/send', icon: <Send className="w-5 h-5" /> },
    { label: 'Profile & Settings', path: '/profile', icon: <UserIcon className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-900">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 lg:w-72 bg-white border-r border-slate-200/80 shrink-0 sticky top-0 h-screen select-none">
        {/* Brand Logo Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <NavLink to="/inbox" className="no-underline">
            <TsgLogo size="md" />
          </NavLink>
        </div>

        {/* Share Personal Link Box */}
        {user && (
          <div className="mx-4 mt-4 p-3.5 bg-blue-50/70 border border-blue-100 rounded-2xl flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5 text-blue-600" /> Share My Link
              </span>
              <span className="text-[10px] px-2 py-0.5 font-bold rounded-full bg-yellow-200 text-yellow-900 border border-yellow-300">
                ACTIVE
              </span>
            </div>
            <p className="text-xs text-slate-600 line-clamp-1 break-all font-mono bg-white/80 p-1.5 rounded-lg border border-blue-100">
              {personalLink}
            </p>
            <Button
              size="sm"
              variant="outline"
              onClick={handleCopyLink}
              leftIcon={copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              className="w-full text-xs py-1.5 justify-center bg-white"
            >
              {copiedLink ? 'Copied Link!' : 'Copy Anonymous Link'}
            </Button>
          </div>
        )}

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-bold transition-all no-underline ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span className={isActive ? 'text-yellow-200' : 'text-slate-400'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* User Card & Logout at Bottom */}
        {user && (
          <div className="p-4 border-t border-slate-100 bg-white">
            <div className="flex items-center justify-between gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-yellow-200 font-extrabold flex items-center justify-center shrink-0 uppercase text-sm border-2 border-white shadow-xs">
                  {user.name.slice(0, 2)}
                </div>
                <div className="truncate">
                  <p className="text-sm font-bold text-slate-900 truncate leading-tight">
                    {user.name}
                  </p>
                  <p className="text-xs text-slate-500 truncate mt-0.5">
                    {user.email}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsLogoutModalOpen(true)}
                title="Log out"
                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer shrink-0"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </aside>

      {/* Mobile Top Header */}
      <header className="md:hidden sticky top-0 z-40 bg-white border-b border-slate-200/80 px-4 py-3 flex items-center justify-between">
        <NavLink to="/inbox" className="no-underline">
          <TsgLogo size="sm" />
        </NavLink>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="accent"
            onClick={() => navigate('/send')}
            leftIcon={<Send className="w-3.5 h-3.5" />}
          >
            Send
          </Button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Dropdown Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[57px] bottom-0 z-40 bg-slate-900/40 backdrop-blur-xs flex flex-col">
          <div className="bg-white border-b border-slate-200 p-4 space-y-2 shadow-xl animate-in slide-in-from-top-4 duration-200">
            {user && (
              <div className="p-3 bg-blue-50 rounded-xl mb-3 flex items-center justify-between">
                <div className="truncate">
                  <p className="text-sm font-bold text-blue-950 truncate">{user.name}</p>
                  <p className="text-xs text-blue-700 truncate">{user.email}</p>
                </div>
                <Button size="sm" variant="outline" onClick={handleCopyLink} className="shrink-0 bg-white">
                  {copiedLink ? 'Copied' : 'Share Link'}
                </Button>
              </div>
            )}
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold no-underline ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className={isActive ? 'text-yellow-200' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
            {user && (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsLogoutModalOpen(true);
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Log out</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Main Page Content Area */}
      <main className="flex-1 flex flex-col min-w-0 pb-20 md:pb-8">
        <div className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-white border-t border-slate-200/80 px-2 py-1.5 flex items-center justify-around shadow-lg">
        {navItems.slice(0, 4).map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center py-1 px-3 rounded-lg text-[10px] font-bold no-underline transition-colors ${
                isActive ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <div className={`p-1 rounded-md ${isActive ? 'bg-blue-50 text-blue-600' : ''}`}>
                {item.icon}
              </div>
              <span>{item.label.split(' ')[0]}</span>
            </NavLink>
          );
        })}
        <NavLink
          to="/profile"
          className={`flex flex-col items-center py-1 px-3 rounded-lg text-[10px] font-bold no-underline transition-colors ${
            location.pathname === '/profile' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <div className={`p-1 rounded-md ${location.pathname === '/profile' ? 'bg-blue-50 text-blue-600' : ''}`}>
            <UserIcon className="w-5 h-5" />
          </div>
          <span>Profile</span>
        </NavLink>
      </nav>

      {/* Logout Confirmation Modal */}
      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        title="Sign Out"
        description="Are you sure you want to end your session?"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsLogoutModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleLogout}>
              Sign Out
            </Button>
          </>
        }
      >
        <p className="text-sm text-slate-600">
          You will need to sign in again with your email and password to access your messages and conversations.
        </p>
      </Modal>
    </div>
  );
};
