import React, { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from 'lucide-react';

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  onClose?: () => void;
}

export const Alert: React.FC<AlertProps> = ({
  className,
  variant = 'info',
  title,
  children,
  onClose,
  ...props
}) => {
  const styles = {
    info: 'bg-[#F0EDF7] border-[#D3CBEA] text-[#45376B]',
    success: 'bg-[#EAF2EC] border-[#C8DDD0] text-[#2A543B]',
    warning: 'bg-[#FDF7E7] border-[#F5E3B3] text-[#705008]',
    error: 'bg-[#FAECE8] border-[#F2C4BA] text-[#8C301E]',
  };

  const icons = {
    info: <Info className="w-5 h-5 text-[#8574B3] shrink-0 mt-0.5" aria-hidden="true" />,
    success: <CheckCircle2 className="w-5 h-5 text-[#4A7C59] shrink-0 mt-0.5" aria-hidden="true" />,
    warning: <AlertTriangle className="w-5 h-5 text-[#D9A436] shrink-0 mt-0.5" aria-hidden="true" />,
    error: <AlertCircle className="w-5 h-5 text-[#E9826E] shrink-0 mt-0.5" aria-hidden="true" />,
  };

  return (
    <div
      role="alert"
      className={cn(
        'flex items-start gap-3.5 p-4 rounded-2xl border transition-all',
        styles[variant],
        className
      )}
      {...props}
    >
      {icons[variant]}
      <div className="flex-1 text-xs">
        {title && <h4 className="font-bold text-sm mb-1">{title}</h4>}
        <div className="leading-relaxed opacity-90">{children}</div>
      </div>
    </div>
  );
};
