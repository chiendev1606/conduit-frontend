import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  // Base styles
  'rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center justify-center transition-colors cursor-pointer',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-white hover:bg-blue-700 focus:ring-blue-500',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500',
        outline: 'bg-transparent border border-primary text-primary hover:bg-blue-50 focus:ring-blue-500',
        text: 'bg-transparent text-primary hover:bg-blue-50 focus:ring-blue-500',
      },
      size: {
        sm: 'text-sm py-1 px-3',
        md: 'text-base py-2 px-4',
        lg: 'text-lg py-3 px-6',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
      isDisabled: {
        true: 'opacity-70 !cursor-not-allowed hover:bg-primary',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
      isDisabled: false,
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, variant, size, fullWidth, isLoading = false, disabled, className = '', type = 'button', ...props },
    ref,
  ) => {
    // Determine if button is disabled (either through disabled prop or loading state)
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={buttonVariants({
          variant,
          size,
          fullWidth,
          isDisabled,
          className,
        })}
        {...props}
      >
        {isLoading && (
          <svg
            className="mr-2 -ml-1 h-4 w-4 animate-spin text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
