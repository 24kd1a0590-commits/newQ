import React from 'react';
import { cn } from '../../lib/utils';
import { Inbox } from 'lucide-react';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className,
}) => {
  return (
    <div
      className={cn(
        'mediq-card rounded-2xl p-10 flex flex-col items-center justify-center text-center border-dashed border-[#D8D0C2]',
        className
      )}
    >
      <div className="p-3.5 bg-[#F3EFE6] rounded-2xl text-[#2B4C3F] mb-4 border border-[#E8E2D5]">
        {icon || <Inbox className="w-7 h-7 text-[#2B4C3F]" aria-hidden="true" />}
      </div>
      <h3 className="text-base font-bold text-[#252525] mb-1">{title}</h3>
      <p className="text-xs text-[#5C5852] max-w-md mb-6 leading-relaxed">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
};
