import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    id="Layer_2" 
    data-name="Layer 2" 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 672 672"
    className={className}
  >
    <defs>
      <linearGradient id="linear-gradient" x1="0" y1="336" x2="672" y2="336" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#e100ff"/>
        <stop offset="1" stopColor="#921fde"/>
      </linearGradient>
      <linearGradient id="linear-gradient-2" x1="192.64" y1="336" x2="672" y2="336" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#e100ff"/>
        <stop offset="1" stopColor="#921fde"/>
      </linearGradient>
      <linearGradient id="linear-gradient-3" x1="192.64" x2="479.36" xlinkHref="#linear-gradient"/>
    </defs>
    <g id="Layout">
      <g>
        <path fill="url(#linear-gradient)" d="M336,672C150.73,672,0,521.27,0,336S150.73,0,336,0s336,150.73,336,336-150.73,336-336,336ZM336,76.16c-143.28,0-259.84,116.56-259.84,259.84s116.56,259.84,259.84,259.84,259.84-116.56,259.84-259.84S479.28,76.16,336,76.16Z"/>
        <path fill="url(#linear-gradient-2)" d="M432.32,575.68c-132.16,0-239.68-107.52-239.68-239.68s107.52-239.68,239.68-239.68,239.68,107.52,239.68,239.68-107.52,239.68-239.68,239.68ZM432.32,172.48c-90.16,0-163.52,73.36-163.52,163.52s73.36,163.52,163.52,163.52,163.52-73.36,163.52-163.52-73.36-163.52-163.52-163.52Z"/>
        <path fill="url(#linear-gradient-3)" d="M336,479.36c-79.05,0-143.36-64.31-143.36-143.36s64.31-143.36,143.36-143.36,143.36,64.31,143.36,143.36-64.31,143.36-143.36,143.36ZM336,268.8c-37.05,0-67.2,30.15-67.2,67.2s30.15,67.2,67.2,67.2,67.2-30.15,67.2-67.2-30.15-67.2-67.2-67.2Z"/>
      </g>
    </g>
  </svg>
);

export default Logo;