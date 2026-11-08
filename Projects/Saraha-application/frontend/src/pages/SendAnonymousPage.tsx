import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Send, Shield, AlertCircle, CheckCircle2, Inbox } from 'lucide-react';
import { messagesApi, parseApiError } from '../api';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useToast } from '../components/ui/Toast';

export const SendAnonymousPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { showSuccess } = useToast();

  const [receiverId, setReceiverId] = useState(
    () => searchParams.get('to')?.trim() || searchParams.get('receiverId')?.trim() || '',
  );
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isValidObjectId = (id: string) => /^[0-9a-fA-F]{24}$/.test(id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanReceiverId = receiverId.trim();
    const cleanContent = content.trim();

    if (!cleanReceiverId) {
      setErrorMessage('Please enter the Recipient User ID.');
      return;
    }

    if (!isValidObjectId(cleanReceiverId)) {
      setErrorMessage('Recipient ID must be a valid 24-character hex ID.');
      return;
    }

    if (!cleanContent) {
      setErrorMessage('Please write a message before sending.');
      return;
    }

    if (cleanContent.length > 1000) {
      setErrorMessage('Message cannot exceed 1000 characters.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await messagesApi.sendMessage({
        receiverId: cleanReceiverId,
        content: cleanContent,
      });

      if (response.success) {
        showSuccess('Anonymous message sent successfully!');
        setIsSuccess(true);
        setContent('');
      }
    } catch (err) {
      const parsed = parseApiError(err);
      if (parsed.code === 'CANNOT_MESSAGE_SELF') {
        setErrorMessage('You cannot send an anonymous message to yourself.');
      } else if (parsed.code === 'RECEIVER_NOT_FOUND') {
        setErrorMessage('The recipient user does not exist.');
      } else {
        setErrorMessage(parsed.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setContent('');
    setErrorMessage(null);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <PageHeader
        title="Send Anonymous Message"
        subtitle="Write a constructive, honest message. Your identity will remain 100% confidential."
      />

      {isSuccess ? (
        <div className="p-8 sm:p-12 rounded-2xl bg-white border border-slate-200/90 text-center shadow-xs space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200 shadow-xs">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight m-0">
              Message Sent Secretly!
            </h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto m-0">
              Your message has been delivered to the recipient's inbox. Your identity is hidden until you choose to disclose it upon request.
            </p>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <Button variant="primary" onClick={handleReset} leftIcon={<Send className="w-4 h-4" />}>
              Send Another Note
            </Button>
            <Button variant="secondary" onClick={() => navigate('/inbox')} leftIcon={<Inbox className="w-4 h-4" />}>
              View Your Inbox
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-500" />
              <div className="text-sm font-semibold">{errorMessage}</div>
            </div>
          )}

          {/* Privacy Notice Pill */}
          <div className="mb-6 p-3.5 rounded-xl bg-blue-50/70 border border-blue-100 flex items-center gap-3 text-xs text-blue-900">
            <Shield className="w-4 h-4 text-blue-600 shrink-0" />
            <span>
              <strong>Zero-Identity Leak Guarantee:</strong> The recipient cannot see your name, email, or account ID.
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Recipient User ID"
              type="text"
              value={receiverId}
              onChange={(e) => setReceiverId(e.target.value)}
              placeholder="e.g. 64b8f1c8e9b21f0012345678"
              helperText="Paste the 24-character user ID of the person you want to message."
              required
              className="font-mono text-xs sm:text-sm"
            />

            <div className="space-y-1.5 text-left">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Message Content
                </label>
                <span
                  className={`text-xs font-mono font-medium ${
                    content.length > 900 ? 'text-amber-600 font-bold' : 'text-slate-400'
                  }`}
                >
                  {content.length} / 1000
                </span>
              </div>
              <textarea
                rows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your honest thoughts, feedback, or encouraging message..."
                maxLength={1000}
                required
                className="w-full bg-white border border-slate-200 hover:border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 rounded-xl p-3.5 text-sm text-slate-900 placeholder:text-slate-400 transition-all outline-none resize-y leading-relaxed"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full py-3"
              isLoading={isLoading}
              leftIcon={<Send className="w-4 h-4" />}
            >
              Send Anonymous Message
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};
