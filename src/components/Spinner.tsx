import { Loader2 } from 'lucide-react';
import { cn } from '../utils/style';

interface SpinnerProps {
  show?: boolean;
  wait?: `delay-${number}`;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Spinner = ({ show = true, wait = 'delay-300', size = 'md', className }: SpinnerProps) => {
  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-6 w-6',
  };

  return (
    <Loader2
      className={cn(
        'animate-spin',
        sizeClasses[size],
        show ? `opacity-100 duration-500 ${wait}` : 'opacity-0 delay-0 duration-500',
        className
      )}
      role="status"
      aria-label="Loading"
    />
  );
};

export default Spinner;
