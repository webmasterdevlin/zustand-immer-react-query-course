import React from 'react';
import { Button as ShadcnButton } from './ui/button';
import { cn } from '../utils/style';

type Props = {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  size?: 'default' | 'sm' | 'lg' | 'icon';
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
};

/* Simplified Button wrapper using shadcn/ui Button component directly */

export default function Button({ variant = 'default', className, size, ...rest }: Props) {
  return (
    <ShadcnButton variant={variant} size={size} className={cn('mb-2 mr-2 capitalize', className)} {...rest}>
      {rest.children}
    </ShadcnButton>
  );
}
