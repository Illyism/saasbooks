import * as React from 'react';

import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-10 w-full min-w-0 rounded-lg border bg-gray-50/50 px-4 py-2 text-base shadow-sm outline-none backdrop-blur-sm transition-all file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-gray-400 focus-visible:bg-white focus-visible:ring-0 focus-visible:ring-offset-0',
        'aria-invalid:border-red-400 aria-invalid:bg-red-50/30',
        className
      )}
      {...props}
    />
  );
}

export { Input };
