import React from 'react';
import { CrowdLevel } from '../../types/crowd';
import { CROWD_CONFIG } from '../../constants/crowd';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface CrowdBadgeProps {
  level: CrowdLevel;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  showDot?: boolean;
  showDescription?: boolean;
  className?: string;
}

export const CrowdBadge: React.FC<CrowdBadgeProps> = ({
  level,
  size = 'md',
  showIcon = true,
  showDot = true,
  showDescription = false,
  className,
}) => {
  const config = CROWD_CONFIG[level] || CROWD_CONFIG.LOW;

  const renderIcon = () => {
    switch (level) {
      case 'LOW':
        return <CheckCircle2 className="w-3.5 h-3.5 text-[#2A543B] shrink-0" aria-hidden="true" />;
      case 'MODERATE':
        return <Clock className="w-3.5 h-3.5 text-[#705008] shrink-0" aria-hidden="true" />;
      case 'HIGH':
        return <AlertCircle className="w-3.5 h-3.5 text-[#8C301E] shrink-0" aria-hidden="true" />;
    }
  };

  const sizeClasses = {
    sm: 'px-2.5 py-1 text-xs gap-1.5 font-medium',
    md: 'px-3.5 py-1.5 text-xs font-semibold gap-2',
    lg: 'px-4 py-2 text-sm font-semibold gap-2.5 rounded-xl',
  };

  return (
    <div className="inline-flex flex-col">
      <span
        role="status"
        aria-label={config.ariaLabel}
        className={cn(
          'inline-flex items-center rounded-full border transition-colors select-none',
          config.badgeBg,
          config.badgeText,
          config.badgeBorder,
          sizeClasses[size],
          className
        )}
      >
        {showDot && (
          <span className="relative flex h-2 w-2">
            <span
              className={cn(
                'animate-ping absolute inline-flex h-full w-full rounded-full opacity-60',
                config.dotColor
              )}
            />
            <span className={cn('relative inline-flex rounded-full h-2 w-2', config.dotColor)} />
          </span>
        )}
        {showIcon && renderIcon()}
        <span className="tracking-wide font-medium">{config.statusTitle}</span>
      </span>

      {showDescription && (
        <p className="text-xs text-[#5C5852] mt-1.5 leading-relaxed max-w-xs">
          {config.description}
        </p>
      )}
    </div>
  );
};
