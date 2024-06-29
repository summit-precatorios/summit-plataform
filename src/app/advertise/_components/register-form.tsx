import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { InputPassword } from '@/components/ui/input-password'
import { InputCurrency } from '@/components/ui/input-currency'
import { Label } from '@/components/ui/label'
import { cpfMask } from '@/lib/utils'
import { validate } from '@/lib/validate'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  fullName: z
    .string()
    .min(3, 'Deve contar pelo menos 3 caracteres')
    .max(200, 'Deve conter no máximo 200 caracteres'),
  document: z
    .string()
    .refine((value) => validate(value), {
      message: 'CPF inválido',
    })
    .transform((value) => value.replace(/\D/g, '')),
  processNumber: z.string().transform((value) => value.replace(/\D/g, '')),
})

export function RegisterForm(props: {
  title: string
  description: string
  show: boolean
}) {
  // const [processNumber, setProcessNumber] = useState('')
  const [document, setDocument] = useState('')
  const [processNumber, setProcessNumber] = useState('')

  const form = useForm<z.infer<typeof formSchema>>({})

  // // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // function handleInputChange(event: any) {
  //   const { value } = event.target

  //   setDocument(cpfMask(value))
  // }

  return (
    <Card className={`mt-16 ${props.show ? 'block' : 'hidden'}`}>
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {/* <Form> */}
        <div className="grid grid-cols-5 gap-4">
          <div className="grid gap-2 col-span-3">
            <Label htmlFor="fullName">Nome Completo</Label>
            <Input
              className="h-9"
              id="fullName"
              type="text"
              placeholder="ex: João da Silva"
            />
          </div>
          <div className="grid gap-2 col-span-2 ">
            <Label htmlFor="document">CPF</Label>
            <Input
              className="h-9"
              id="document"
              type="text"
              placeholder="Informe o seu CPF"
              value={document}
              onChange={(e) => setDocument(cpfMask(e.target.value))}
            />
          </div>
        </div>

        <div className="grid grid-cols-5 gap-4">
          <div className="grid gap-2 col-span-3">
            <Label htmlFor="processNumber">Número do Processo</Label>
            <Input
              type="text"
              className="h-9"
              id="processNumber"
              placeholder={`Informe o número do seu ${props.title === 'RPV' ? 'RPV' : 'precatório'}`}
              value={processNumber}
              onChange={(e) =>
                setProcessNumber(e.target.value.replace(/\D/g, ''))
              }
            />
          </div>

          <div className="grid gap-2 col-span-2">
            <Label htmlFor="price">Valor do Precatório</Label>

            <InputCurrency type="text" id="price" min={0} className="h-9" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2 col-span2 bg-fuchsia-400">
            Valor do Precatório
          </div>
          <div className="grid gap-2 col-span2 bg-fuchsia-400">
            Valor de Venda
          </div>
        </div>

        {/* <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2 col-span-2">
            <Label htmlFor="subject">Nome completo</Label>
            <Input
              id="fullName"
              type="text"
              // placeholder={`Informe o número do seu ${props.title === 'RPV' ? 'RPV' : 'precatório'}`}
              placeholder="ex: João da Silva"
              className="h-9"
            />
          </div>

          <div className="grid gap-2 col-span-2">
            <Label htmlFor="subject">Nome completo</Label>
            <Input
              id="fullName"
              type="text"
              // placeholder={`Informe o número do seu ${props.title === 'RPV' ? 'RPV' : 'precatório'}`}
              placeholder="ex: João da Silva"
              className="h-9"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2 col-span-2">
            <Label htmlFor="price">Valor Nominal do Título</Label>
            <Input
              id="price"
              placeholder="R$"
              // value={processNumber}
              onChange={handleInputChange}
              className="h-9"
            />
          </div>
          <div className="grid gap-2 col-span-2">
            <Label htmlFor="price">Valor de Venda</Label>
            <Input
              id="price"
              placeholder="R$"
              // value={processNumber}
              onChange={handleInputChange}
              className="h-9"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4"></div> */}
        {/* </Form> */}
      </CardContent>
      <CardFooter className="justify-between space-x-2">
        <Button variant="ghost">Cancelar</Button>
        <Button>Enviar</Button>
      </CardFooter>
    </Card>
  )
}
