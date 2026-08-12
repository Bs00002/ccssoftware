import React from 'react';

interface KpiCardProps {
  label: string;
  value: string | number;
  unit?: string;
  subtext?: string;
  icon?: string;
  trend?: 'up' | 'down' | 'neutral';
  accentBorder?: 'red' | 'green' | 'blue' | 'yellow' | 'none';
  onClick?: () => void;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  label,
  value,
  unit,
  subtext,
  icon,
  trend,
  accentBorder = 'none',
  onClick,
}) => {
  const getBorderClass = () => {
    switch (accentBorder) {
      case 'red':
        return 'border-l-4 border-l-[#da1e28]';
      case 'green':
        return 'border-l-4 border-l-[#198038]';
      case 'blue':
        return 'border-l-4 border-l-[#0f62fe]';
      case 'yellow':
        return 'border-l-4 border-l-[#f1c21b]';
      default:
        return 'border border-[#e0e0e0]';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white p-4 ${getBorderClass()} border-t border-r border-b border-[#e0e0e0] flex flex-col justify-between shadow-xs ${
        onClick ? 'cursor-pointer hover:bg-[#f4f4f4]/80 transition-colors' : ''
      }`}
    >
      <div className="flex justify-between items-start">
        <span className="text-[11px] text-[#525252] font-semibold uppercase tracking-wider">
          {label}
        </span>
        {icon && (
          <span
            className={`material-symbols-outlined text-[20px] ${
              trend === 'up'
                ? 'text-[#198038]'
                : accentBorder === 'red'
                ? 'text-[#da1e28]'
                : 'text-[#525252]'
            }`}
          >
            {icon}
          </span>
        )}
      </div>

      <div className="mt-3 flex items-baseline">
        <span className="text-2xl font-light text-[#161616] tracking-tight">{value}</span>
        {unit && <span className="text-sm font-normal text-[#525252] ml-1">{unit}</span>}
      </div>

      {subtext && <div className="text-[10px] text-[#525252] mt-1 font-medium">{subtext}</div>}
    </div>
  );
};
