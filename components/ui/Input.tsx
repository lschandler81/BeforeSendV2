import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from './Button';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200 ml-1">
            {label}
          </label>
        )}
        <div className="relative group">
          <input
            ref={ref}
            className={cn(
              'flex h-12 w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-brand-teal/50 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200',
              'hover:border-brand-teal/50',
              className
            )}
            {...props}
          />
          <div className="absolute bottom-0 left-2 right-2 h-[1px] bg-gradient-to-r from-transparent via-brand-teal/0 to-transparent group-focus-within:via-brand-teal transition-all duration-500" />
        </div>
        {error && (
          <p className="text-sm text-rose-500 ml-1">{error}</p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
