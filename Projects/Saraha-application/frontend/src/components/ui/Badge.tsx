import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'blue' | 'yellow' | 'green' | 'red' | 'gray';
  size?: 'sm' | 'md';
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'blue',
  size = 'md',
  className = '',
  icon,
}) => {
  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
  };

  const variantStyles = {
    blue: 'bg-blue-50 text-blue-700 border border-blue-200/80',
    yellow: 'bg-yellow-100 text-yellow-900 border border-yellow-300 font-semibold',
    green: 'bg-emerald-50 text-emerald-700 border border-emerald-200/80 font-medium',
    red: 'bg-red-50 text-red-700 border border-red-200/80 font-medium',
    gray: 'bg-slate-100 text-slate-700 border border-slate-200 font-medium',
  };

  return (
    <span
      className={`inline-flex items-center font-bold tracking-wide rounded-full uppercase select-none ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      {children}
    </span>
  );
};
