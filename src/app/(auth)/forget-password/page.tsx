// // import * as z from 'zod'

// import {
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form'
// import { Input } from '@/components/ui/input'
// import { zodResolver } from '@hookform/resolvers/zod'

// import { Form, useForm } from 'react-hook-form'
// import { z } from 'zod'

// // TODO handleSubmit function

// // ! Magic link for recovery your account

// const formSchema = z.object({
//   email: z.string().email('Insira um endereço de e-mail válido.'),
// })

// export default function ForgetPassword() {
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       email: '',
//     },
//   })

//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   async function onSubmit(data: z.infer<typeof formSchema>) {
//     console.log(navigator.userAgent)
//   }

//   return (
//     <div className="w-96 m-auto">
//       <h1 className="text-3xl font-semibold mb-4">Recuperar conta</h1>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//           <FormField
//             control={form.control}
//             name="email"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>CPF</FormLabel>
//                 <FormControl>
//                   <Input placeholder="exemplo@gmail.com" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </form>
//       </Form>
//     </div>
//   )
// }
