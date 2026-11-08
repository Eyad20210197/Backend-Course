import React from 'react';

export const HeroIllustration: React.FC<{ className?: string }> = ({ className = 'w-full max-w-md h-auto' }) => {
  return (
    <svg
      viewBox="0 0 500 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Decorative gradient glow */}
      <defs>
        <radialGradient id="heroGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0052FF" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#0052FF" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0052FF" />
          <stop offset="100%" stopColor="#0038B8" />
        </linearGradient>
      </defs>

      <circle cx="250" cy="200" r="180" fill="url(#heroGlow)" />

      {/* TSG Circuit lines in background */}
      <path d="M 60 120 H 160 L 200 160 H 340 L 380 120 H 440" stroke="#0052FF" strokeWidth="2" strokeOpacity="0.25" strokeDasharray="4 4" />
      <path d="M 80 280 H 180 L 220 240 H 320 L 360 280 H 420" stroke="#FFF899" strokeWidth="2" strokeOpacity="0.6" strokeDasharray="4 4" />
      <circle cx="60" cy="120" r="4" fill="#0052FF" />
      <circle cx="440" cy="120" r="4" fill="#0052FF" />
      <circle cx="80" cy="280" r="4" fill="#FEF08A" />
      <circle cx="420" cy="280" r="4" fill="#FEF08A" />

      {/* Central Envelope Card (Anonymous) */}
      <rect x="130" y="100" width="240" height="150" rx="16" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" filter="drop-shadow(0 20px 25px rgba(0, 82, 255, 0.1))" />
      
      {/* Anonymous header badge */}
      <rect x="155" y="125" width="80" height="24" rx="12" fill="#FFF899" />
      <text x="195" y="141" fill="#854D0E" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">ANONYMOUS</text>
      
      {/* Content lines */}
      <rect x="155" y="165" width="190" height="10" rx="5" fill="#E2E8F0" />
      <rect x="155" y="185" width="150" height="10" rx="5" fill="#E2E8F0" />
      <rect x="155" y="205" width="100" height="10" rx="5" fill="#0052FF" fillOpacity="0.2" />

      {/* Identity Request Badge pill */}
      <g transform="translate(180, 270)">
        <rect width="180" height="48" rx="24" fill="url(#blueGradient)" filter="drop-shadow(0 10px 15px rgba(0, 82, 255, 0.25))" />
        <circle cx="28" cy="24" r="14" fill="#FFF899" />
        <path d="M 28 17 V 21 M 28 27 H 28.01" stroke="#854D0E" strokeWidth="2.5" strokeLinecap="round" />
        <text x="96" y="29" fill="#FFFFFF" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Request Identity</text>
      </g>

      {/* Revealed Conversation Bubble (Floating) */}
      <g transform="translate(290, 70)">
        <rect width="140" height="50" rx="12" fill="#0F172A" />
        <circle cx="24" cy="25" r="10" fill="#22C55E" />
        <text x="80" y="30" fill="#FFFFFF" fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="sans-serif">Identity Revealed</text>
      </g>
    </svg>
  );
};
