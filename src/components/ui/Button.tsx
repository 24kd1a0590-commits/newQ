import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2B4C3F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8F5EF] disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] select-none';

    const variants = {
      primary:
        'bg-[#2B4C3F] hover:bg-[#1E372D] text-[#F8F5EF] shadow-sm border border-[#2B4C3F]',
      secondary:
        'bg-[#EFEBE1] hover:bg-[#E2DDD0] text-[#252525] border border-[#D8D0C2]',
      outline:
        'bg-transparent hover:bg-[#F3EFE6] text-[#252525] border border-[#D8D0C2]',
      ghost:
        'bg-transparent hover:bg-[#EFEBE1] text-[#5C5852] hover:text-[#252525]',
      danger:
        'bg-[#E9826E] hover:bg-[#D96B52] text-white shadow-sm border border-[#D96B52]',
      accent:
        'bg-[#6F9F82] hover:bg-[#5A876C] text-white shadow-sm border border-[#5A876C]',
    };

    const sizes = {
      sm: 'h-9 px-3.5 text-xs gap-1.5',
      md: 'h-10 px-4 text-sm gap-2',
      lg: 'h-12 px-6 text-base gap-2.5 rounded-2xl',
    };

    return (
      <button
        ref={ref}
        type={type}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
        {!isLoading && leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
