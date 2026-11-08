import React from 'react';

export const EmptyInboxIllustration: React.FC<{ className?: string }> = ({ className = 'w-48 h-48' }) => {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="100" cy="100" r="80" fill="#EAF1FF" />
      <circle cx="100" cy="100" r="60" fill="#FFFFFF" stroke="#0052FF" strokeWidth="2" strokeDasharray="4 4" />
      
      {/* Mail Envelope */}
      <rect x="60" y="70" width="80" height="56" rx="8" fill="#0052FF" />
      <path d="M60 76L100 102L140 76" stroke="#FFF899" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      
      {/* Privacy lock */}
      <g transform="translate(85, 110)">
        <rect x="5" y="10" width="20" height="16" rx="4" fill="#FFF899" stroke="#CA8A04" strokeWidth="1.5" />
        <path d="M10 10V6A5 5 0 0 1 20 6V10" stroke="#CA8A04" strokeWidth="2" strokeLinecap="round" />
        <circle cx="15" cy="18" r="2" fill="#854D0E" />
      </g>
      
      {/* Decorative dots */}
      <circle cx="45" cy="65" r="4" fill="#0052FF" fillOpacity="0.4" />
      <circle cx="155" cy="140" r="5" fill="#FFF899" />
      <circle cx="160" cy="60" r="3" fill="#0052FF" fillOpacity="0.3" />
    </svg>
  );
};
