import React from 'react';

interface TsgLogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  theme?: 'dark' | 'light' | 'blue';
}

export const TsgLogo: React.FC<TsgLogoProps> = ({
  className = '',
  showText = true,
  size = 'md',
  theme = 'light',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const textColor =
    theme === 'blue'
      ? 'text-white'
      : theme === 'dark'
      ? 'text-white'
      : 'text-slate-900';

  const subColor =
    theme === 'blue'
      ? 'text-yellow-200'
      : 'text-blue-600';

  return (
    <div className={`flex items-center gap-2.5 font-bold tracking-tight select-none ${className}`}>
      {/* TSG Circuit Icon */}
      <div
        className={`${iconSizes[size]} relative flex items-center justify-center rounded-xl ${
          theme === 'blue'
            ? 'bg-white/10 ring-1 ring-white/20'
            : 'bg-blue-600 shadow-md shadow-blue-500/20'
        }`}
      >
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full p-1.5"
        >
          {/* Circuit connection lines */}
          <path
            d="M8 12H15L19 18H28"
            stroke={theme === 'blue' ? '#FFF899' : '#FFF899'}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 24H14L18 18H28"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Circuit nodes */}
          <circle cx="8" cy="12" r="2.5" fill={theme === 'blue' ? '#FFF899' : '#FFF899'} />
          <circle cx="28" cy="18" r="2.5" fill="#FFFFFF" />
          <circle cx="8" cy="24" r="2.5" fill="#FFFFFF" />
          <circle cx="18.5" cy="18" r="2" fill={theme === 'blue' ? '#FFF899' : '#FFF899'} />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`font-extrabold tracking-tight ${textSizes[size]} ${textColor}`}>
            Eyad Aboelftoh
          </span>
          <span className={`text-[10px] uppercase font-semibold tracking-widest ${subColor}`}>
            Saraha Platform
          </span>
        </div>
      )}
    </div>
  );
};
