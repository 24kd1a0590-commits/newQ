import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

export const Spinner: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({
  size = 'md',
  className,
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-10 h-10',
  };
  return <Loader2 className={cn('animate-spin text-[#2B4C3F]', sizes[size], className)} />;
};

export const Skeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('animate-pulse bg-[#EFEBE1] rounded-xl', className)} />
);

export interface LoadingStateProps {
  message?: string;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Retrieving live hospital crowd telemetry...',
  className,
}) => {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 text-center', className)}>
      <div className="relative flex items-center justify-center p-4 bg-[#EAF2EC] rounded-full border border-[#C8DDD0] mb-4">
        <Spinner size="lg" />
      </div>
      <p className="text-sm text-[#252525] font-semibold">{message}</p>
      <p className="text-xs text-[#5C5852] mt-1">Connecting to MEDIQ crowd intelligence node</p>
    </div>
  );
};
