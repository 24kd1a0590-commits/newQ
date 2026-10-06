import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from './Button';
import { cn } from '../../lib/utils';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Unable to Load Telemetry Data',
  message = 'A network connection or database query error occurred while retrieving crowd telemetry.',
  onRetry,
  className,
}) => {
  return (
    <div
      className={cn(
        'mediq-card rounded-2xl p-8 flex flex-col items-center justify-center text-center border-[#F2C4BA] bg-[#FAECE8]',
        className
      )}
    >
      <div className="p-3 bg-[#F2C4BA]/50 rounded-2xl text-[#8C301E] mb-4">
        <AlertTriangle className="w-8 h-8" aria-hidden="true" />
      </div>
      <h3 className="text-base font-bold text-[#8C301E] mb-1">{title}</h3>
      <p className="text-xs text-[#5C5852] max-w-md mb-6 leading-relaxed">{message}</p>
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry} leftIcon={<RefreshCw className="w-3.5 h-3.5" />}>
          Try Again
        </Button>
      )}
    </div>
  );
};
