import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50',
          {
            'bg-brand-red text-white hover:bg-red-700 focus:ring-brand-red': variant === 'primary',
            'border-2 border-brand-gold hover:bg-brand-gold hover:text-brand-black': variant === 'secondary',
            'border border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800': variant === 'outline',
            'hover:bg-gray-100 dark:hover:bg-gray-800': variant === 'ghost',
            'rounded-xl px-3 py-1.5 text-sm': size === 'sm',
            'rounded-2xl px-6 py-3 text-sm': size === 'md',
            'rounded-2xl px-8 py-4 text-base': size === 'lg',
          },
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
