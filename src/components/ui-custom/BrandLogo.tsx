
import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: number;
}

const BrandLogo: React.FC<BrandLogoProps> = ({ className = "", size = 250 }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 250 250" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="125" cy="125" r="120" stroke="#F97316" strokeWidth="10" fill="white"/>
      <path d="M95 65 L115 185" stroke="#0D7C39" strokeWidth="5" strokeLinecap="round"/>
      <path d="M95 65 L85 85 L95 95 L105 85 L95 65" fill="#0D7C39" stroke="#0D7C39" strokeWidth="2"/>
      <path d="M95 95 L85 105 L95 115 L105 105 L95 95" fill="#0D7C39" stroke="#0D7C39" strokeWidth="2"/>
      <path d="M155 65 L135 185" stroke="#0D7C39" strokeWidth="5" strokeLinecap="round"/>
      <path d="M145 105 C155 95, 165 75, 155 65" stroke="#0D7C39" strokeWidth="5" fill="none" strokeLinecap="round"/>
      <rect x="105" y="185" width="40" height="30" rx="5" fill="#F97316"/>
      <rect x="115" y="175" width="20" height="10" rx="2" fill="#F97316"/>
    </svg>
  );
};

export default BrandLogo;
