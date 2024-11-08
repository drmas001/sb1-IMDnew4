import React from 'react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'medium', className = '' }) => {
  const dimensions = {
    small: 'h-8 w-8',
    medium: 'h-12 w-12',
    large: 'h-16 w-16'
  };

  return (
    <img
      src="/logo.png"
      alt="IMD-Care Logo"
      className={`${dimensions[size]} ${className}`}
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.style.display = 'none';
        
        // Create fallback div with same dimensions
        const fallback = document.createElement('div');
        fallback.className = `${dimensions[size]} bg-current rounded-lg`;
        target.parentElement?.appendChild(fallback);
      }}
    />
  );
};

export default Logo;