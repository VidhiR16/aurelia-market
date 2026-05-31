import React from 'react';
import { cn } from '../../utils/cn';

export const Button = React.forwardRef(({ className, variant = 'primary', size = 'md', ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:pointer-events-none disabled:opacity-50",
        {
          'bg-primary-600 text-white hover:bg-primary-700': variant === 'primary',
          'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700': variant === 'secondary',
          'border border-gray-200 bg-white hover:bg-gray-100 dark:border-gray-800 dark:bg-dark-card dark:hover:bg-gray-800': variant === 'outline',
          'hover:bg-gray-100 dark:hover:bg-gray-800': variant === 'ghost',
          'h-9 px-4 py-2': size === 'md',
          'h-8 px-3 text-xs': size === 'sm',
          'h-11 px-8 text-lg': size === 'lg',
          'h-10 w-10': size === 'icon',
        },
        className
      )}
      {...props}
    />
  );
});
Button.displayName = "Button";
