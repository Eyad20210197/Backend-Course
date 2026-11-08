import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UserCheck,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  Shield,
  Search,
  Lock,
} from 'lucide-react';
import { identityRequestsApi, parseApiError } from '../api';
import type { IdentityRequest } from '../types';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { EmptyState } from '../components/ui/EmptyState';
import { LoadingState } from '../components/ui/LoadingState';
import { EmptyRequestsIllustration } from '../components/illustrations/EmptyRequestsIllustration';
import { useToast } from '../components/ui/Toast';

export const IdentityRequestsPage: React.FC = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();

  const [requests, setRequests] = useState<IdentityRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'incoming' | 'lookup'>('incoming');

  // Accept/Reject action state
  const [selectedRequest, setSelectedRequest] = useState<IdentityRequest | null>(null);
  const [actionType, setActionType] = useState<'accepted' | 'rejected' | null>(null);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [isSubmittingAction, setIsSubmittingAction] = useState(false);

  // Inspect Request by ID state (GET /identity-requests/:id)
  const [lookupId, setLookupId] = useState('');
  const [inspectedRequest, setInspectedRequest] = useState<IdentityRequest | null>(null);
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [lookupError, setLookupError] = useState<string | null>(null);

  const fetchRequests = useCallback(async (quiet = false) => {
    if (!quiet) setIsLoading(true);
    else setIsRefreshing(true);

    try {
      const response = await identityRequestsApi.getSenderIdentityRequests();
      if (response.success && response.data?.requests) {
        setRequests(response.data.requests);
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
    fetchRequests();
  }, [fetchRequests]);

  const handleOpenActionModal = (req: IdentityRequest, type: 'accepted' | 'rejected') => {
    setSelectedRequest(req);
    setActionType(type);
    setIsActionModalOpen(true);
  };

  const handleConfirmAction = async () => {
    if (!selectedRequest || !actionType) return;

    setIsSubmittingAction(true);
    try {
      const response = await identityRequestsApi.respondToIdentityRequest(
        selectedRequest._id,
        { status: actionType },
      );

      if (response.success) {
        showSuccess(
          actionType === 'accepted'
            ? 'Identity revealed and conversation unlocked!'
            : 'Identity request declined.',
        );

        setIsActionModalOpen(false);
        // Refresh requests list
        await fetchRequests(true);

        if (actionType === 'accepted' && response.data?.conversation) {
          navigate('/conversations');
        }
      }
    } catch (err) {
      const parsed = parseApiError(err);
      showError(parsed.message);
    } finally {
      setIsSubmittingAction(false);
    }
  };

  // Inspect request by ID (integrating GET /identity-requests/:id)
  const handleLookupRequest = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanId = lookupId.trim();
    if (!/^[0-9a-fA-F]{24}$/.test(cleanId)) {
      setLookupError('Please enter a valid 24-character Request ID.');
      return;
    }

    setLookupError(null);
    setIsLookingUp(true);
    setInspectedRequest(null);
    try {
      const response = await identityRequestsApi.getIdentityRequestDetails(cleanId);
      if (response.success && response.data?.request) {
        setInspectedRequest(response.data.request);
        showSuccess('Identity request details loaded.');
      }
    } catch (err) {
      const parsed = parseApiError(err);
      setLookupError(parsed.message);
    } finally {
      setIsLookingUp(false);
    }
  };

  const pendingCount = requests.filter((r) => r.status === 'pending').length;

  const formatDate = (isoString?: string) => {
    if (!isoString) return '';
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
        title="Identity Requests"
        subtitle="Review disclosure requests from receivers of your anonymous messages."
        badge={
          pendingCount > 0 ? (
            <Badge variant="yellow" size="md">
              {pendingCount} Pending
            </Badge>
          ) : (
            <Badge variant="gray" size="md">
              {requests.length} Total
            </Badge>
          )
        }
        actions={
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchRequests(true)}
            isLoading={isRefreshing}
            leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
          >
            Refresh
          </Button>
        }
      />

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab('incoming')}
          className={`py-3 px-5 text-sm font-bold border-b-2 cursor-pointer transition-colors flex items-center gap-2 ${
            activeTab === 'incoming'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>Incoming Requests</span>
          {pendingCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-yellow-300 text-yellow-950 text-[10px] font-black flex items-center justify-center">
              {pendingCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('lookup')}
          className={`py-3 px-5 text-sm font-bold border-b-2 cursor-pointer transition-colors flex items-center gap-2 ${
            activeTab === 'lookup'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Search className="w-4 h-4" />
          <span>Inspect Disclosure by ID</span>
        </button>
      </div>

      {activeTab === 'incoming' ? (
        isLoading ? (
          <LoadingState message="Fetching identity requests..." />
        ) : requests.length === 0 ? (
          <EmptyState
            illustration={<EmptyRequestsIllustration />}
            title="No Identity Requests"
            description="When someone who received an anonymous message from you wants to know who you are, their request will appear here."
            actionText="Send an Anonymous Message"
            onAction={() => navigate('/send')}
          />
        ) : (
          <div className="space-y-4">
            {requests.map((req) => {
              const receiverName =
                typeof req.receiverId === 'object' && req.receiverId?.name
                  ? req.receiverId.name
                  : 'Recipient';
              const receiverEmail =
                typeof req.receiverId === 'object' && req.receiverId?.email
                  ? req.receiverId.email
                  : '';
              const messageContent =
                typeof req.messageId === 'object' && req.messageId?.content
                  ? req.messageId.content
                  : 'Message attached';

              return (
                <div
                  key={req._id}
                  className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-blue-200 transition-all"
                >
                  <div className="space-y-3 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">
                          {receiverName.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <span className="text-sm font-bold text-slate-900">
                            {receiverName}
                          </span>
                          {receiverEmail && (
                            <span className="text-xs text-slate-400 ml-2">
                              ({receiverEmail})
                            </span>
                          )}
                        </div>
                      </div>

                      <span className="text-slate-300">•</span>

                      {req.status === 'pending' && (
                        <Badge variant="yellow" size="sm" icon={<Clock className="w-3 h-3" />}>
                          Pending Response
                        </Badge>
                      )}
                      {req.status === 'accepted' && (
                        <Badge variant="green" size="sm" icon={<CheckCircle2 className="w-3 h-3" />}>
                          Disclosed & Connected
                        </Badge>
                      )}
                      {req.status === 'rejected' && (
                        <Badge variant="red" size="sm" icon={<XCircle className="w-3 h-3" />}>
                          Declined
                        </Badge>
                      )}

                      <span className="text-xs text-slate-400 ml-auto font-mono">
                        {formatDate(req.createdAt)}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                        Your Original Anonymous Note
                      </span>
                      <p className="text-sm text-slate-700 italic line-clamp-2 m-0">
                        "{messageContent}"
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                    {req.status === 'pending' ? (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenActionModal(req, 'rejected')}
                          className="text-slate-600 hover:text-red-600 hover:bg-red-50"
                        >
                          Decline
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleOpenActionModal(req, 'accepted')}
                          leftIcon={<UserCheck className="w-4 h-4" />}
                        >
                          Accept & Disclose
                        </Button>
                      </>
                    ) : req.status === 'accepted' ? (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => navigate('/conversations')}
                        rightIcon={<ArrowRight className="w-4 h-4" />}
                      >
                        Open Conversation
                      </Button>
                    ) : (
                      <span className="text-xs text-slate-400 italic font-medium">
                        Identity was kept hidden
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )
      ) : (
        /* Lookup Tab (GET /identity-requests/:id) */
        <div className="max-w-xl mx-auto space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-5">
            <div>
              <h3 className="text-lg font-bold text-slate-900 m-0">
                Inspect Identity Disclosure
              </h3>
              <p className="text-xs text-slate-500 mt-1 m-0">
                Verify authorization rules and view disclosed sender profile for any request ID.
              </p>
            </div>

            <form onSubmit={handleLookupRequest} className="space-y-4">
              <Input
                label="Identity Request ID"
                placeholder="Paste 24-character hex ID..."
                value={lookupId}
                onChange={(e) => setLookupId(e.target.value)}
                error={lookupError || undefined}
                required
              />
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                isLoading={isLookingUp}
                leftIcon={<Search className="w-4 h-4" />}
              >
                Inspect Request Details
              </Button>
            </form>
          </div>

          {inspectedRequest && (
            <div className="bg-white rounded-2xl border border-blue-200 p-6 shadow-md space-y-5 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <span className="text-xs font-mono font-bold text-slate-500">
                  ID: {inspectedRequest._id}
                </span>
                {inspectedRequest.status === 'accepted' && (
                  <Badge variant="green" size="md">
                    Accepted & Disclosed
                  </Badge>
                )}
                {inspectedRequest.status === 'pending' && (
                  <Badge variant="yellow" size="md">
                    Pending Acceptance
                  </Badge>
                )}
                {inspectedRequest.status === 'rejected' && (
                  <Badge variant="red" size="md">
                    Rejected
                  </Badge>
                )}
              </div>

              {/* Authorized Disclosed Sender Card */}
              {inspectedRequest.status === 'accepted' && inspectedRequest.sender ? (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                      Disclosed Sender Identity
                    </span>
                  </div>
                  <div className="pl-7">
                    <p className="text-base font-extrabold text-slate-900 m-0">
                      {inspectedRequest.sender.name}
                    </p>
                    <p className="text-xs text-slate-600 m-0">
                      {inspectedRequest.sender.email}
                    </p>
                  </div>
                </div>
              ) : inspectedRequest.status === 'accepted' && !inspectedRequest.sender ? (
                <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-800">
                  You are the sender of this request. The receiver has unlocked your identity.
                </div>
              ) : inspectedRequest.status === 'pending' ? (
                <div className="p-4 rounded-xl bg-yellow-50 border border-yellow-200 text-xs text-yellow-900 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-yellow-700 shrink-0" />
                  <span>Sender identity is protected and will only disclose if accepted.</span>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-slate-500 shrink-0" />
                  <span>Request declined. Sender remains permanently anonymous.</span>
                </div>
              )}

              {inspectedRequest.status === 'accepted' && (
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => navigate('/conversations')}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Go to Conversations
                </Button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Confirmation Modal */}
      <Modal
        isOpen={isActionModalOpen}
        onClose={() => setIsActionModalOpen(false)}
        title={actionType === 'accepted' ? 'Accept & Disclose Identity?' : 'Decline Request?'}
        description={
          actionType === 'accepted'
            ? 'Your name and email will be shared with the recipient and a private conversation channel will open.'
            : 'You will remain completely anonymous. The recipient will not be able to identify you.'
        }
        footer={
          <>
            <Button
              variant="ghost"
              onClick={() => setIsActionModalOpen(false)}
              disabled={isSubmittingAction}
            >
              Cancel
            </Button>
            <Button
              variant={actionType === 'accepted' ? 'primary' : 'danger'}
              onClick={handleConfirmAction}
              isLoading={isSubmittingAction}
            >
              {actionType === 'accepted' ? 'Confirm & Disclose' : 'Decline Request'}
            </Button>
          </>
        }
      >
        <p className="text-sm text-slate-600 m-0">
          {actionType === 'accepted'
            ? 'Once accepted, an end-to-end conversation thread is created for both of you.'
            : 'This action cannot be undone once rejected.'}
        </p>
      </Modal>
    </div>
  );
};
