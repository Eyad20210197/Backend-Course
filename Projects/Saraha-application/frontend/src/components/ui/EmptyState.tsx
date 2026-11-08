import React from 'react';
import { Button } from './Button';

export interface EmptyStateProps {
  illustration?: React.ReactNode;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  actionIcon?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  illustration,
  title,
  description,
  actionText,
  onAction,
  actionIcon,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl bg-white border border-slate-200/80 shadow-xs ${className}`}>
      {illustration && <div className="mb-6">{illustration}</div>}
      <h3 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm mt-1.5 mb-6">{description}</p>
      {actionText && onAction && (
        <Button variant="primary" onClick={onAction} leftIcon={actionIcon}>
          {actionText}
        </Button>
      )}
    </div>
  );
};
