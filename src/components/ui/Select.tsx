import React, { SelectHTMLAttributes, forwardRef, useId } from 'react';
import { cn } from '../../lib/utils';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, options, error, helperText, id: customId, ...props }, ref) => {
    const generatedId = useId();
    const selectId = customId || generatedId;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-xs font-bold text-[#5C5852] tracking-wider uppercase"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              'w-full appearance-none bg-[#FFFFFF] border border-[#D8D0C2] rounded-xl px-3.5 pr-10 text-[#252525] text-sm transition-all duration-150 focus:outline-none focus:border-[#2B4C3F] focus:ring-1 focus:ring-[#2B4C3F] h-10.5',
              error ? 'border-[#E9826E]' : '',
              className
            )}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-white text-[#252525]">
                {opt.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#8C867D]">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
        {error && <p className="text-xs text-[#8C301E]">{error}</p>}
        {!error && helperText && <p className="text-xs text-[#5C5852]">{helperText}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
