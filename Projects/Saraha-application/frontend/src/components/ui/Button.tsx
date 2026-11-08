import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'danger' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  className = '',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-150 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-600/20 focus-visible:ring-blue-600',
    secondary:
      'bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 shadow-sm focus-visible:ring-slate-400',
    accent:
      'bg-yellow-200 hover:bg-yellow-300 text-yellow-950 font-bold border border-yellow-300 shadow-sm focus-visible:ring-yellow-400',
    danger:
      'bg-red-600 hover:bg-red-700 text-white shadow-sm shadow-red-600/20 focus-visible:ring-red-600',
    outline:
      'bg-transparent hover:bg-blue-50 text-blue-600 border border-blue-600/30 focus-visible:ring-blue-600',
    ghost:
      'bg-transparent hover:bg-slate-100 text-slate-700 focus-visible:ring-slate-400',
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Loading...</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};
