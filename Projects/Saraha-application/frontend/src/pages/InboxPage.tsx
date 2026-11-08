import React, { useState, useEffect, useCallback } from 'react';
import {
  RefreshCw,
  Search,
  UserCheck,
  Copy,
  Check,
  Shield,
  HelpCircle,
  Clock,
} from 'lucide-react';
import { messagesApi, identityRequestsApi, parseApiError } from '../api';
import type { AnonymousMessage } from '../types';
import { useAuth } from '../context/AuthContext';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { EmptyState } from '../components/ui/EmptyState';
import { LoadingState } from '../components/ui/LoadingState';
import { EmptyInboxIllustration } from '../components/illustrations/EmptyInboxIllustration';
import { useToast } from '../components/ui/Toast';

export const InboxPage: React.FC = () => {
  const { user } = useAuth();
  const { showSuccess, showError, showInfo } = useToast();

  const [messages, setMessages] = useState<AnonymousMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  // Identity Request Dialog State
  const [selectedMessage, setSelectedMessage] = useState<AnonymousMessage | null>(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);
  const [requestedMessageIds, setRequestedMessageIds] = useState<Set<string>>(new Set());

  const personalLink = user?._id
    ? `${window.location.origin}/send?to=${user._id}`
    : '';

  const fetchMessages = useCallback(async (quiet = false) => {
    if (!quiet) setIsLoading(true);
    else setIsRefreshing(true);

    try {
      const response = await messagesApi.getReceivedMessages();
      if (response.success && response.data?.messages) {
        setMessages(response.data.messages);
      }
    } catch (err) {
      const parsed = parseApiError(err);
      showError(parsed.message);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [showError]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const handleCopyLink = () => {
    if (!personalLink) return;
    navigator.clipboard.writeText(personalLink);
    setCopiedLink(true);
    showSuccess('Your personal anonymous link copied to clipboard!');
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleOpenRequestModal = (msg: AnonymousMessage) => {
    setSelectedMessage(msg);
    setIsRequestModalOpen(true);
  };

  const handleConfirmIdentityRequest = async () => {
    if (!selectedMessage) return;

    setIsSubmittingRequest(true);
    try {
      const response = await identityRequestsApi.createIdentityRequest({
        messageId: selectedMessage._id,
      });

      if (response.success) {
        setRequestedMessageIds((prev) => new Set(prev).add(selectedMessage._id));
        showSuccess('Identity disclosure request submitted to sender!');
        setIsRequestModalOpen(false);
      }
    } catch (err) {
      const parsed = parseApiError(err);
      if (parsed.code === 'REQUEST_ALREADY_EXISTS') {
        setRequestedMessageIds((prev) => new Set(prev).add(selectedMessage._id));
        showInfo('An identity request already exists for this message.');
        setIsRequestModalOpen(false);
      } else {
        showError(parsed.message);
      }
    } finally {
      setIsSubmittingRequest(false);
    }
  };

  const filteredMessages = messages.filter((msg) =>
    msg.content.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Anonymous Messages"
        subtitle="Read candid feedback and notes received on your anonymous link."
        badge={
          <Badge variant="blue" size="md">
            {messages.length} {messages.length === 1 ? 'Message' : 'Messages'}
          </Badge>
        }
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => fetchMessages(true)}
              isLoading={isRefreshing}
              leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
            >
              Refresh
            </Button>
            <Button
              variant="accent"
              size="sm"
              onClick={handleCopyLink}
              leftIcon={copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
            >
              {copiedLink ? 'Copied' : 'Share My Link'}
            </Button>
          </div>
        }
      />

      {/* Personal Link Banner Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-yellow-200 text-yellow-950 font-extrabold text-[10px] tracking-wider uppercase">
              Your Public Link
            </span>
            <span className="text-xs text-blue-200">Anyone can send you anonymous feedback</span>
          </div>
          <p className="font-mono text-xs sm:text-sm text-yellow-100 break-all select-all">
            {personalLink}
          </p>
        </div>
        <Button
          size="sm"
          variant="accent"
          onClick={handleCopyLink}
          leftIcon={copiedLink ? <Check className="w-4 h-4 text-emerald-800" /> : <Copy className="w-4 h-4" />}
          className="shrink-0"
        >
          {copiedLink ? 'Copied Link' : 'Copy Link'}
        </Button>
      </div>

      {/* Search Bar */}
      {messages.length > 0 && (
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search messages by keyword..."
            className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>
      )}

      {/* Messages Feed */}
      {isLoading ? (
        <LoadingState message="Loading your anonymous inbox..." />
      ) : messages.length === 0 ? (
        <EmptyState
          illustration={<EmptyInboxIllustration />}
          title="Your Inbox is Empty"
          description="You haven't received any anonymous messages yet. Share your personal link with your friends, team, or audience to start getting feedback!"
          actionText="Copy Personal Link"
          onAction={handleCopyLink}
          actionIcon={<Copy className="w-4 h-4" />}
        />
      ) : filteredMessages.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
          <p className="text-sm font-semibold text-slate-700">No messages match "{searchQuery}"</p>
          <Button variant="ghost" size="sm" onClick={() => setSearchQuery('')} className="mt-2 text-blue-600">
            Clear search
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMessages.map((msg) => {
            const hasRequested = requestedMessageIds.has(msg._id);

            return (
              <div
                key={msg._id}
                className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:border-blue-200 hover:shadow-md transition-all flex flex-col justify-between gap-4 group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-yellow-400" />
                      <span className="text-[11px] font-bold tracking-wider uppercase text-slate-500 flex items-center gap-1">
                        <Shield className="w-3 h-3 text-blue-600" /> Anonymous Sender
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
                      <Clock className="w-3 h-3" />
                      {formatDate(msg.createdAt)}
                    </span>
                  </div>

                  <p className="mt-3.5 text-sm sm:text-base text-slate-800 font-normal leading-relaxed whitespace-pre-wrap break-words">
                    {msg.content}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  {hasRequested ? (
                    <Badge variant="yellow" size="sm" icon={<Clock className="w-3 h-3" />}>
                      Identity Requested
                    </Badge>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenRequestModal(msg)}
                      leftIcon={<UserCheck className="w-3.5 h-3.5" />}
                      className="text-xs py-1.5 font-bold"
                    >
                      Request Identity
                    </Button>
                  )}

                  <span className="text-[11px] font-mono text-slate-300 group-hover:text-slate-400 transition-colors">
                    ID: {msg._id.slice(-6)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Identity Request Confirmation Dialog */}
      <Modal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        title="Request Sender Identity"
        description="Ask the author of this message to reveal who they are."
        footer={
          <>
            <Button
              variant="ghost"
              onClick={() => setIsRequestModalOpen(false)}
              disabled={isSubmittingRequest}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleConfirmIdentityRequest}
              isLoading={isSubmittingRequest}
              leftIcon={<UserCheck className="w-4 h-4" />}
            >
              Send Disclosure Request
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Message Context
            </span>
            <p className="text-xs text-slate-700 italic line-clamp-3">
              "{selectedMessage?.content}"
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-100 flex items-start gap-3">
            <HelpCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <p className="text-xs text-blue-800 m-0 leading-relaxed">
              The sender will receive an identity request notification. If they accept, their name and email will be disclosed to you and a conversation channel will open. If they decline, their identity remains completely hidden.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};
