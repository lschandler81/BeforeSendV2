import { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-teal/50 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]',
          {
            'bg-brand-teal text-brand-navy hover:bg-brand-teal/90 shadow-lg shadow-brand-teal/20': variant === 'primary',
            'bg-transparent border border-brand-navy/20 dark:border-slate-200/20 text-brand-navy dark:text-slate-200 hover:bg-brand-navy/5 dark:hover:bg-slate-200/10': variant === 'secondary',
            'bg-transparent text-brand-navy dark:text-slate-200 hover:text-brand-teal hover:bg-brand-teal/10': variant === 'ghost',
            'bg-transparent border border-brand-navy text-brand-navy dark:border-slate-200 dark:text-slate-200 hover:bg-brand-navy/5 dark:hover:bg-slate-200/5': variant === 'outline',
            'h-9 px-4 text-sm': size === 'sm',
            'h-11 px-6 text-base': size === 'md',
            'h-14 px-8 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, cn };
