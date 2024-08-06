'use client'
import * as React from 'react'

import { cn, currencyFormatter } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onValueChange?: any
}

const InputCurrency = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const initialFormattedValue = props.value
      ? currencyFormatter.format(Number(props.value))
      : '0,00'

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [formattedValue, dispatch] = React.useReducer(
      (_: string, next: string) => {
        const digits = next.replace(/\D/g, '')
        const newValue = Number(digits) / 100

        return currencyFormatter.format(newValue).replace(/^R\$/, '').trim()
      },
      initialFormattedValue,
    )

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      const inputValue = event.target.value

      console.log(inputValue)

      const digits = inputValue.replace(/\D/g, '')
      const numericValue = Number(digits) / 100

      dispatch(
        currencyFormatter.format(numericValue).replace(/^R\$/, '').trim(),
      )

      if (props.onValueChange)
        props.onValueChange(
          currencyFormatter.format(numericValue).replace(/^R\$/, '').trim(),
        )
    }

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
          value={formattedValue}
          onChange={handleChange}
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
