import React from 'react';
import { Loader2 } from 'lucide-react';

export interface LoadingStateProps {
  message?: string;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading data...',
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-12 text-slate-500 gap-3 ${className}`}>
      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
        <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
      </div>
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
};
