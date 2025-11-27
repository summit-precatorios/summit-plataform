'use client'

import { cn } from '@/lib/utils'
import * as React from 'react'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string
}

const InputCurrency = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="w-full relative">
        <input
          type={type}
          className={cn(
            'flex h-12 w-full rounded-md border border-input bg-transparent px-10 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          ref={ref}
          {...props}
        />
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-700/70">
          R$
        </span>
      </div>
    )
  },
)

InputCurrency.displayName = 'InputCurrency'

export { InputCurrency }
