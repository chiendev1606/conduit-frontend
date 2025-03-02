import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const iconVariants = cva(
  'inline-flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-full p-2 transition-colors',
  {
    variants: {
      size: {
        xs: 'w-8 h-8',
        sm: 'w-10 h-10',
        md: 'w-12 h-12',
        lg: 'w-14 h-14',
        xl: 'w-16 h-16',
      },
      color: {
        primary: 'text-primary',
        secondary: 'text-gray-600',
        white: 'text-white',
        success: 'text-green-500',
        warning: 'text-yellow-500',
        error: 'text-red-500',
        info: 'text-blue-400',
        muted: 'text-gray-400',
      },
      weight: {
        light: 'stroke-1',
        regular: 'stroke-2',
        bold: 'stroke-3',
      },
      align: {
        top: 'align-top',
        middle: 'align-middle',
        bottom: 'align-bottom',
        textTop: 'align-text-top',
        textBottom: 'align-text-bottom',
      },
    },
    defaultVariants: {
      size: 'md',
      color: 'secondary',
      weight: 'regular',
      align: 'middle',
    },
  },
);

export interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    VariantProps<typeof iconVariants> {
  icon: React.ReactNode;
}

export const IconButton: React.FC<IconButtonProps> = ({ icon, size, color, weight, align, className, ...props }) => {
  return (
    <button
      className={iconVariants({ size, color, weight, align, className })}
      {...props}
    >
      {icon}
    </button>
  );
};
IconButton.displayName = 'IconButton';
