import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface SFSymbolProps {
  icon: LucideIcon;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'filled' | 'outline';
  color?: 'black' | 'blue' | 'purple' | 'green' | 'red' | 'gray';
  className?: string;
}

export function SFSymbol({
  icon: Icon,
  size = 'md',
  variant = 'filled',
  color = 'black',
  className,
}: SFSymbolProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-10 w-10',
  };

  const containerSizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };

  const colorClasses = {
    black: {
      filled: 'bg-black text-white',
      outline: 'bg-white text-black border border-black',
    },
    blue: {
      filled: 'bg-blue-600 text-white',
      outline: 'bg-blue-50 text-blue-600 border border-blue-200',
    },
    purple: {
      filled: 'bg-purple-600 text-white',
      outline: 'bg-purple-50 text-purple-600 border border-purple-200',
    },
    green: {
      filled: 'bg-green-600 text-white',
      outline: 'bg-green-50 text-green-600 border border-green-200',
    },
    red: {
      filled: 'bg-red-600 text-white',
      outline: 'bg-red-50 text-red-600 border border-red-200',
    },
    gray: {
      filled: 'bg-gray-800 text-white',
      outline: 'bg-gray-100 text-gray-800 border border-gray-200',
    },
  };

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full',
        containerSizeClasses[size],
        colorClasses[color][variant],
        className
      )}
    >
      <Icon className={sizeClasses[size]} />
    </div>
  );
}
