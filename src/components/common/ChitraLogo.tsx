import React from 'react';

interface ChitraLogoProps {
  variant?: 'full' | 'icon' | 'horizontal';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showTagline?: boolean;
}

export const ChitraLogo: React.FC<ChitraLogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  className = '',
}) => {
  const iconSizes = {
    sm: 'h-7 max-w-[110px]',
    md: 'h-9 max-w-[150px]',
    lg: 'h-14 max-w-[210px]',
    xl: 'h-20 max-w-[300px]',
  };

  const logoGraphic = (
    <img
      src="/logo.png"
      alt="Chitra Crop Science"
      className={`${iconSizes[size]} object-contain shrink-0`}
    />
  );

  if (variant === 'icon') {
    return <div className={`inline-flex items-center ${className}`}>{logoGraphic}</div>;
  }

  if (variant === 'full') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        {logoGraphic}
      </div>
    );
  }

  // Horizontal layout
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {logoGraphic}
    </div>
  );
};
