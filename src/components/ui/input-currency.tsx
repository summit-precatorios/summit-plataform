'use client'
import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string
}

// Brazilian currency config
const currencyFormatter = Intl.NumberFormat('pt-BR', {
  currency: 'BRL',
  currencyDisplay: 'symbol',
  currencySign: 'standard',
  style: 'currency',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const InputCurrency = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const initialValue = props.value
      ? currencyFormatter.format(Number(props.value))
      : 'R$ 0.00'

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [value, setValue] = React.useReducer((_: any, next: string) => {
      const digits = next.replace(/\D/g, '')
      return currencyFormatter.format(Number(digits) / 100)
    }, initialValue)

    function handleChange(formattedValue: string) {
      const digits = formattedValue.replace(/\D/g, '')
      const realValue = Number(digits) / 100

      setValue(realValue.toString())
    }

    return (
      <div className="w-full relative">
        <input
          type="text"
          className={cn(
            'flex h-12 w-full rounded-md border border-input bg-transparent px-10 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          ref={ref}
          {...props}
          value={value}
          onChange={(event) => handleChange(event.target.value)}
        />
        {/* <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-700/70">
          R$
        </span> */}
      </div>
    )
  },
)

InputCurrency.displayName = 'InputCurrency'

export { InputCurrency }

// export default function MoneyInput(props: TextInputProps) {
//   const initialValue = props.form.getValues()[props.name]
//     ? moneyFormatter.format(props.form.getValues()[props.name])
//     : ''

//   const [value, setValue] = useReducer((_: any, next: string) => {
//     const digits = next.replace(/\D/g, '')
//     return moneyFormatter.format(Number(digits) / 100)
//   }, initialValue)

//   function handleChange(realChangeFn: Function, formattedValue: string) {
//     const digits = formattedValue.replace(/\D/g, '')
//     const realValue = Number(digits) / 100
//     realChangeFn(realValue)
//   }

//   return (
//     <FormField
//       control={props.form.control}
//       name={props.name}
//       render={({ field }) => {
//         field.value = value
//         const _change = field.onChange

//         return (
//           <FormItem>
//             <FormLabel>{props.label}</FormLabel>
//             <FormControl>
//               <Input
//                 placeholder={props.placeholder}
//                 type="text"
//                 {...field}
//                 onChange={(ev) => {
//                   setValue(ev.target.value)
//                   handleChange(_change, ev.target.value)
//                 }}
//                 value={value}
//               />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )
//       }}
//     />
//   )
// }
