import React from 'react';

export const EmptyRequestsIllustration: React.FC<{ className?: string }> = ({ className = 'w-48 h-48' }) => {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="100" cy="100" r="80" fill="#FFFBEB" />
      <circle cx="100" cy="100" r="60" fill="#FFFFFF" stroke="#FDE047" strokeWidth="2" strokeDasharray="4 4" />
      
      {/* Identity Shield badge */}
      <path
        d="M100 55L135 70V105C135 128 120 145 100 152C80 145 65 128 65 105V70L100 55Z"
        fill="#0052FF"
      />
      
      {/* Keyhole / User silhouette */}
      <circle cx="100" cy="95" r="12" fill="#FFF899" />
      <path d="M86 128C86 116 92 112 100 112C108 112 114 116 114 128H86Z" fill="#FFF899" />
      
      {/* Floating sparkles */}
      <circle cx="45" cy="80" r="4" fill="#0052FF" fillOpacity="0.4" />
      <circle cx="155" cy="130" r="5" fill="#FACC15" />
      <circle cx="145" cy="65" r="3" fill="#0052FF" />
    </svg>
  );
};
