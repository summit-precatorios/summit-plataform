'use client';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const InputPassword = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [show, setShow] = React.useState(false);
    return (
      <div className='w-full relative'>
        <input
          type={!show ? type : 'text'}
          autoComplete="new-password"
          className={cn(
            'flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          {...props}
        />
        <button
          onClick={() => setShow((prev) => !prev)}
          className='absolute right-3 top-1/2 transform -translate-y-1/2'
          type='button'
        >
          {show ? (
            <Eye className='stroke-slate-700/70' size={18} />
          ) : (
            <EyeOff className='stroke-slate-700/70' size={18} />
          )}
        </button>
      </div>
    );
  }
);
InputPassword.displayName = 'InputPassword';

export { InputPassword };
