import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logo_gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#d900ff" />
        <stop offset="100%" stopColor="#8b00ff" />
      </linearGradient>
    </defs>
    {/* Base Purple Circle */}
    <circle cx="60" cy="60" r="60" fill="url(#logo_gradient)" />
    
    {/* White Cutout - Shifted Right to create Left Crescent thickness */}
    <circle cx="68" cy="60" r="42" fill="white" />
    
    {/* Inner Purple - Shifted Right to create White Crescent thickness on Left */}
    <circle cx="72" cy="60" r="26" fill="url(#logo_gradient)" />
    
    {/* Center White Dot */}
    <circle cx="72" cy="60" r="10" fill="white" />
  </svg>
);

export default Logo;