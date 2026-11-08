import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  MessageSquare,
  Send,
  RefreshCw,
  ArrowLeft,
  Shield,
  ChevronUp,
} from 'lucide-react';
import { conversationsApi, parseApiError } from '../api';
import type { Conversation, ConversationMessage, Pagination } from '../types';
import { useAuth } from '../context/AuthContext';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { EmptyState } from '../components/ui/EmptyState';
import { LoadingState } from '../components/ui/LoadingState';
import { EmptyConversationsIllustration } from '../components/illustrations/EmptyConversationsIllustration';
import { useToast } from '../components/ui/Toast';

export const ConversationsPage: React.FC = () => {
  const { user } = useAuth();
  const { showError } = useToast();

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);

  const [isLoadingList, setIsLoadingList] = useState(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [inputContent, setInputContent] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const activeConvIdRef = useRef<string | null>(null);

  // Fetch all conversations
  const fetchConversations = useCallback(async (quiet = false) => {
    if (!quiet) setIsLoadingList(true);
    try {
      const response = await conversationsApi.getConversations();
      if (response.success && response.data?.conversations) {
        setConversations(response.data.conversations);
        // If no conversation currently selected and we have list, select first
        if (!activeConvIdRef.current && response.data.conversations.length > 0) {
          const first = response.data.conversations[0];
          setSelectedConversation(first);
          activeConvIdRef.current = first._id;
        }
      }
    } catch (err) {
      const parsed = parseApiError(err);
      if (!quiet) showError(parsed.message);
    } finally {
      setIsLoadingList(false);
    }
  }, [showError]);

  // Fetch messages for active conversation
  const fetchMessages = useCallback(
    async (convId: string, page = 1, append = false, quiet = false) => {
      if (!append && !quiet) setIsLoadingMessages(true);
      if (append) setIsLoadingMore(true);

      try {
        const response = await conversationsApi.getConversationMessages(convId, {
          page,
          limit: 30,
        });

        if (response.success && response.data) {
          const newMessages = response.data.messages || [];
          setPagination(response.data.pagination);

          if (append) {
            // Prepend earlier messages
            setMessages((prev) => [...newMessages, ...prev]);
          } else {
            setMessages(newMessages);
          }
        }
      } catch (err) {
        const parsed = parseApiError(err);
        if (!quiet) showError(parsed.message);
      } finally {
        setIsLoadingMessages(false);
        setIsLoadingMore(false);
      }
    },
    [showError],
  );

  // Initial load
  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  // When selected conversation changes
  useEffect(() => {
    if (selectedConversation) {
      activeConvIdRef.current = selectedConversation._id;
      fetchMessages(selectedConversation._id, 1, false, false);
    }
  }, [selectedConversation, fetchMessages]);

  // Auto-scroll to bottom when new messages arrive (only if on page 1)
  useEffect(() => {
    if (!isLoadingMore) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages.length, isLoadingMore]);

  // Periodic polling for incoming messages
  useEffect(() => {
    const interval = setInterval(() => {
      if (activeConvIdRef.current) {
        fetchMessages(activeConvIdRef.current, 1, false, true);
      }
      fetchConversations(true);
    }, 4500);

    return () => clearInterval(interval);
  }, [fetchMessages, fetchConversations]);

  const handleSelectConversation = (conv: Conversation) => {
    setSelectedConversation(conv);
    activeConvIdRef.current = conv._id;
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!selectedConversation) return;

    const clean = inputContent.trim();
    if (!clean || isSending) return;

    setIsSending(true);
    try {
      const response = await conversationsApi.sendConversationMessage(selectedConversation._id, {
        content: clean,
      });

      if (response.success && response.data?.message) {
        setMessages((prev) => [...prev, response.data!.message]);
        setInputContent('');
        // Smooth scroll
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      }
    } catch (err) {
      const parsed = parseApiError(err);
      showError(parsed.message);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleLoadEarlier = () => {
    if (!selectedConversation || !pagination || pagination.page >= pagination.totalPages) return;
    fetchMessages(selectedConversation._id, pagination.page + 1, true, false);
  };

  // Helper to get the other participant
  const getOtherParticipant = (conv: Conversation) => {
    return conv.participants.find((p) => p._id !== user?._id) || conv.participants[0];
  };

  const formatMessageTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  };

  return (
    <div className="space-y-4">
      <PageHeader
        title="Conversations"
        subtitle="End-to-end disclosed conversations unlocked through mutual agreement."
        badge={
          <Badge variant="blue" size="md">
            {conversations.length} Active
          </Badge>
        }
        actions={
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              fetchConversations(true);
              if (selectedConversation) fetchMessages(selectedConversation._id, 1, false, true);
            }}
            leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
          >
            Refresh
          </Button>
        }
      />

      {isLoadingList ? (
        <LoadingState message="Loading conversations..." />
      ) : conversations.length === 0 ? (
        <EmptyState
          illustration={<EmptyConversationsIllustration />}
          title="No Active Conversations"
          description="When you or someone else accepts an identity request, a private conversation thread will appear here."
        />
      ) : (
        /* Split view: Conversations list (left) & Chat history (right) */
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col md:flex-row h-[720px] max-h-[82vh]">
          {/* Left: Conversations sidebar list */}
          <div
            className={`w-full md:w-80 lg:w-96 border-r border-slate-200/80 flex flex-col shrink-0 bg-slate-50/50 ${
              selectedConversation ? 'hidden md:flex' : 'flex'
            }`}
          >
            <div className="p-4 border-b border-slate-200/80 bg-white flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Direct Messages ({conversations.length})
              </span>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-2 space-y-1">
              {conversations.map((conv) => {
                const other = getOtherParticipant(conv);
                const isSelected = selectedConversation?._id === conv._id;

                return (
                  <button
                    key={conv._id}
                    onClick={() => handleSelectConversation(conv)}
                    className={`w-full text-left p-3.5 rounded-xl transition-all cursor-pointer flex items-start gap-3 ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-white hover:bg-slate-100 text-slate-800'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs uppercase shrink-0 border ${
                        isSelected
                          ? 'bg-yellow-200 text-yellow-950 border-yellow-300'
                          : 'bg-blue-100 text-blue-700 border-blue-200'
                      }`}
                    >
                      {other?.name ? other.name.slice(0, 2) : 'U'}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span
                          className={`text-sm font-bold truncate ${
                            isSelected ? 'text-white' : 'text-slate-900'
                          }`}
                        >
                          {other?.name || 'User'}
                        </span>
                        <span
                          className={`text-[10px] shrink-0 ${
                            isSelected ? 'text-blue-100' : 'text-slate-400'
                          }`}
                        >
                          {new Date(conv.updatedAt || conv.createdAt).toLocaleDateString([], {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>

                      <p
                        className={`text-xs truncate mt-1 ${
                          isSelected ? 'text-blue-100' : 'text-slate-500'
                        }`}
                      >
                        {other?.email}
                      </p>

                      {conv.originalMessageId?.content && (
                        <p
                          className={`text-[11px] truncate italic mt-1.5 ${
                            isSelected ? 'text-yellow-200 font-medium' : 'text-slate-400'
                          }`}
                        >
                          "{conv.originalMessageId.content}"
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Active Chat Area */}
          <div
            className={`flex-1 flex flex-col min-w-0 bg-white ${
              !selectedConversation ? 'hidden md:flex' : 'flex'
            }`}
          >
            {selectedConversation ? (
              <>
                {/* Chat Top Header */}
                <div className="px-5 py-3.5 border-b border-slate-200/80 bg-white flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSelectedConversation(null)}
                      className="md:hidden p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 cursor-pointer"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>

                    <div className="w-10 h-10 rounded-full bg-blue-600 text-yellow-200 font-bold text-xs flex items-center justify-center uppercase shrink-0">
                      {getOtherParticipant(selectedConversation)?.name?.slice(0, 2) || 'TS'}
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-slate-900 leading-tight m-0">
                        {getOtherParticipant(selectedConversation)?.name || 'Participant'}
                      </h3>
                      <p className="text-xs text-slate-500 m-0 leading-tight">
                        {getOtherParticipant(selectedConversation)?.email}
                      </p>
                    </div>
                  </div>

                  <Badge variant="green" size="sm">
                    Verified Match
                  </Badge>
                </div>

                {/* Original Message Banner (Pinned Context) */}
                {selectedConversation.originalMessageId?.content && (
                  <div className="px-5 py-2.5 bg-yellow-50/70 border-b border-yellow-200/60 flex items-center justify-between gap-3 text-xs text-yellow-950 shrink-0">
                    <div className="flex items-center gap-2 truncate">
                      <Shield className="w-3.5 h-3.5 text-yellow-700 shrink-0" />
                      <span className="font-bold shrink-0">Original Message:</span>
                      <span className="truncate italic">
                        "{selectedConversation.originalMessageId.content}"
                      </span>
                    </div>
                    <span className="text-[10px] text-yellow-800 shrink-0 font-medium">
                      Unlocked on disclosure
                    </span>
                  </div>
                )}

                {/* Messages Feed */}
                <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/30">
                  {/* Load earlier messages button */}
                  {pagination && pagination.page < pagination.totalPages && (
                    <div className="text-center pb-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleLoadEarlier}
                        isLoading={isLoadingMore}
                        leftIcon={<ChevronUp className="w-3.5 h-3.5" />}
                        className="text-xs text-blue-600 font-bold"
                      >
                        Load Earlier Messages ({pagination.total - messages.length} remaining)
                      </Button>
                    </div>
                  )}

                  {isLoadingMessages ? (
                    <LoadingState message="Loading messages..." />
                  ) : messages.length === 0 ? (
                    <div className="text-center py-12 text-slate-400 text-xs">
                      No conversation messages yet. Be the first to say hello!
                    </div>
                  ) : (
                    messages.map((msg) => {
                      const senderIdStr =
                        typeof msg.senderId === 'object' && msg.senderId?._id
                          ? msg.senderId._id
                          : typeof msg.senderId === 'string'
                          ? msg.senderId
                          : '';

                      const isMine = senderIdStr === user?._id;
                      const senderName =
                        typeof msg.senderId === 'object' && msg.senderId?.name
                          ? msg.senderId.name
                          : isMine
                          ? 'You'
                          : 'Participant';

                      return (
                        <div
                          key={msg._id}
                          className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}
                        >
                          <span className="text-[10px] font-semibold text-slate-400 mb-1 px-1">
                            {isMine ? 'You' : senderName}
                          </span>
                          <div
                            className={`max-w-[85%] sm:max-w-[70%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed break-words shadow-xs ${
                              isMine
                                ? 'bg-blue-600 text-white rounded-br-xs'
                                : 'bg-white border border-slate-200/90 text-slate-900 rounded-bl-xs'
                            }`}
                          >
                            <p className="m-0 whitespace-pre-wrap">{msg.content}</p>
                            <span
                              className={`block text-[10px] text-right mt-1 font-mono ${
                                isMine ? 'text-blue-200' : 'text-slate-400'
                              }`}
                            >
                              {formatMessageTime(msg.createdAt)}
                            </span>
                          </div>
                        </div>
                      );
                    })
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input Composer */}
                <div className="p-3 sm:p-4 border-t border-slate-200/80 bg-white shrink-0">
                  <form onSubmit={handleSendMessage} className="flex items-end gap-2.5">
                    <div className="flex-1 relative">
                      <textarea
                        rows={2}
                        value={inputContent}
                        onChange={(e) => setInputContent(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type your message... (Press Enter to send)"
                        maxLength={2000}
                        className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-all outline-none resize-none leading-relaxed"
                      />
                      <span className="absolute bottom-2 right-2 text-[10px] font-mono text-slate-400 pointer-events-none">
                        {inputContent.length} / 2000
                      </span>
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      isLoading={isSending}
                      disabled={!inputContent.trim()}
                      className="h-11 px-4 rounded-xl shrink-0"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400">
                <MessageSquare className="w-12 h-12 text-slate-300 mb-3" />
                <p className="text-sm font-semibold text-slate-600">Select a conversation to start chatting</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
