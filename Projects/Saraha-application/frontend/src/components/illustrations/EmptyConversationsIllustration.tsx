import React from 'react';

export const EmptyConversationsIllustration: React.FC<{ className?: string }> = ({ className = 'w-48 h-48' }) => {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="100" cy="100" r="80" fill="#EAF1FF" />
      
      {/* Primary chat bubble */}
      <path
        d="M60 70C60 61.1634 67.1634 54 76 54H124C132.837 54 140 61.1634 140 70V100C140 108.837 132.837 116 124 116H90L68 132V116H76C67.1634 116 60 108.837 60 100V70Z"
        fill="#0052FF"
      />
      
      {/* Secondary chat bubble */}
      <path
        d="M100 100C100 93.3726 105.373 88 112 88H148C154.627 88 160 93.3726 160 100V124C160 130.627 154.627 136 148 136H142V148L126 136H112C105.373 136 100 130.627 100 124V100Z"
        fill="#FFF899"
        stroke="#EAB308"
        strokeWidth="1.5"
      />
      
      {/* Chat lines */}
      <rect x="75" y="75" width="40" height="4" rx="2" fill="#FFFFFF" />
      <rect x="75" y="85" width="25" height="4" rx="2" fill="#FFFFFF" fillOpacity="0.7" />
      
      <rect x="115" y="105" width="30" height="3" rx="1.5" fill="#854D0E" />
      <rect x="115" y="113" width="18" height="3" rx="1.5" fill="#854D0E" fillOpacity="0.7" />
    </svg>
  );
};
