'use client'

import { useAdvertise } from '@/app/advertise/_components/use-advertise'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { InputCurrency } from '@/components/ui/input-currency'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import { cnpjMask, cpfMask, currencyFormatter, pixKeysMask } from '@/lib/utils'
import { createAnnouncementRequest } from '@/services/announcement.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group'

import { CircleHelp, Landmark } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

function handleSalePriceChange(value: string | number): string {
  if (!value) return ''

  // Garantir que o valor seja uma string
  const valueStr = String(value)

  const numericValue = parseFloat(
    valueStr.replace(/[^\d,-]/g, '').replace(',', '.'),
  )

  if (!isNaN(numericValue)) {
    const calculatedBalance = (numericValue * 0.95).toFixed(2) // 95% do valor de venda

    const formattedBalance = currencyFormatter
      .format(Number(calculatedBalance))
      .replace(/^R\$/, '')
      .trim()

    return formattedBalance
  }

  return ''
}

export function RegisterForm(props: {
  title: string
  description: string
  show: boolean
  announcementType: 'RPV' | 'PRECATORIO'
}) {
  const [salePrice, setSalePrice] = useState('0,00')
  const [documentBankAccount, setDocumentBankAccount] = useState('')
  const [selectedOption, setSelectedOption] = useState<'PIX' | 'TRANSFER_BANK'>(
    'PIX',
  )

  const [formattedPrice, setFormattedPrice] = useState('0,00')
  const { createAnnouncementSchema } = useAdvertise()

  type CreateAnnouncementSchema = z.infer<typeof createAnnouncementSchema>

  const form = useForm<CreateAnnouncementSchema>({
    resolver: zodResolver(createAnnouncementSchema),
    defaultValues: {
      paymentOption: 'PIX',
    },
  })
  const handlePaymentReceivingOption = (option: 'PIX' | 'TRANSFER_BANK') => {
    setSelectedOption(option)

    form.setValue('paymentOption', option)
  }

  const { toast } = useToast()
  const router = useRouter()
  // ! definir formState baseado no  schema do formulário

  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  async function onSubmit(data: z.infer<typeof createAnnouncementSchema>) {
    try {
      const response = await createAnnouncementRequest(data)

      if (!response) {
        toast({
          variant: 'destructive',
          title: 'Erro interno',
          description: 'Não foi possível processar a sua requisição',
        })
      }

      if (response.statusCode === 201) {
        toast({
          variant: 'default',
          title: `Seu ${props.title} foi registrado com sucesso!`,
          description:
            'Encaminhamos para o seu email os detalhes sobre o seu anúncio',
        })

        form.reset()
        router.push('/dashboard')
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro interno',
        description: 'Não foi possível processar a sua requisição',
      })
    }
  }

  // const salePricee = handleSalePriceChange(form.watch('salePrice'))
  const calculatedBalance = handleSalePriceChange(form.watch('salePrice'))

  useEffect(() => {
    form.setValue('liquidBalance', calculatedBalance)
  }, [calculatedBalance, form])

  // Ensure salePrice is updated correctly
  useEffect(() => {
    const newCalculatedBalance = handleSalePriceChange(salePrice)
    form.setValue('liquidBalance', newCalculatedBalance)
  }, [salePrice, form])

  useEffect(() => {
    // Atualiza o valor do input oculto quando props.title mudar
    form.setValue('type', props.announcementType)
  }, [props.announcementType, form])

  return (
    <div className="w-full space-x-3 flex-col">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-5 space-x-3 w-full"
        >
          <input type="hidden" {...form.register('type')} value={props.title} />

          <Card
            className={`mt-16 ${props.show ? 'block' : 'hidden'} col-span-3`}
          >
            <CardHeader>
              <CardTitle>{props.title}</CardTitle>
              <CardDescription>{props.description}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid grid-cols-5 gap-4">
                <div className="grid gap-2 col-span-3">
                  <FormField
                    control={form.control}
                    name="ownerFullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome Completo</FormLabel>
                        <FormControl>
                          <Input
                            className="h-9"
                            placeholder="ex: João da Silva"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2 col-span-2">
                  <FormField
                    control={form.control}
                    name="ownerDocument"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CPF</FormLabel>
                        <FormControl>
                          <Input
                            className="h-9"
                            {...field}
                            placeholder="Informe o seu CPF"
                            onChange={(e) =>
                              field.onChange(cpfMask(e.target.value))
                            }
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="grid grid-cols-7 gap-4">
                <div className="ggrid gap-2 col-span-3">
                  <FormField
                    control={form.control}
                    name="lawSuit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número do Processo</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="h-9"
                            placeholder={`Informe o número do seu ${props.title === 'RPV' ? 'RPV' : 'precatório'}`}
                            onChange={(e) =>
                              field.onChange(e.target.value.replace(/\D/g, ''))
                            }
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2 col-span-2">
                  <FormField
                    control={form.control}
                    name="origin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Origem</FormLabel>

                        <Select
                          {...field}
                          defaultValue={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="default">Selecione</SelectItem>
                            <SelectItem value="federal">Federal</SelectItem>
                            <SelectItem value="estadual">Estadual</SelectItem>
                            <SelectItem value="municipal">Municipal</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-2 col-span-2">
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="court"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tribunal</FormLabel>

                          <Select
                            defaultValue={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="default">Selecione</SelectItem>
                              <SelectItem value="federal">TRF-1</SelectItem>
                              <SelectItem value="estadual">TRF-4</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2 col-span-1">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex justify-start items-center m-0.5">
                          Valor Nominal do {props.title}
                        </FormLabel>
                        <FormControl>
                          <InputCurrency
                            className="h-9"
                            {...field}
                            value={formattedPrice}
                            onChange={(e) => {
                              field.onChange(() => {
                                const value = e.target.value.replace(/\D/g, '')
                                setFormattedPrice(
                                  currencyFormatter
                                    .format(Number(value) / 100)
                                    .replace(/^R\$/, '')
                                    .trim(),
                                )

                                field.onChange(
                                  currencyFormatter
                                    .format(Number(value) / 100)
                                    .replace(/^R\$/, '')
                                    .trim(),
                                )
                              })
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2 col-span-1">
                  <FormField
                    control={form.control}
                    name="salePrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex justify-start items-center">
                          Valor de Venda
                          <span>
                            <CircleHelp
                              size={16}
                              className="text-red-400 ml-1 cursor-pointer"
                              onClick={() => {
                                toast({
                                  title: 'Dúvidas',
                                  description: `Informe o valor que gostaria de vender o seu ${props.title}`,
                                })
                              }}
                            />
                          </span>
                        </FormLabel>

                        <FormControl>
                          <InputCurrency
                            min={0}
                            className="h-9"
                            {...field}
                            value={salePrice}
                            onChange={(e) => {
                              field.onChange(() => {
                                const value = e.target.value.replace(/\D/g, '')
                                setSalePrice(
                                  currencyFormatter
                                    .format(Number(value) / 100)
                                    .replace(/^R\$/, '')
                                    .trim(),
                                )

                                field.onChange(
                                  currencyFormatter
                                    .format(Number(value) / 100)
                                    .replace(/^R\$/, '')
                                    .trim(),
                                )
                              })
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2 col-span-1">
                  <FormField
                    control={form.control}
                    name="liquidBalance"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex justify-start items-center">
                          Saldo Líquido
                          <span>
                            <CircleHelp
                              size={16}
                              className="text-red-400 ml-1 cursor-pointer"
                              onClick={() => {
                                toast({
                                  title: 'Taxa de Manutenção',
                                  description: 'Explicação do valor líquido',
                                })
                              }}
                            />
                          </span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            min={0}
                            className="h-9"
                            {...field}
                            disabled
                            value={`R$ ${field.value}`}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className={`mt-16 ${props.show ? 'block' : 'hidden'} col-span-2`}
          >
            <CardHeader>
              <CardTitle>Dados para Recebimento</CardTitle>
              <CardDescription>
                Para receber o valor do {props.title} vendido após uma
                negociação bem-sucedida, por favor, informe o método de
                recebimento desejado.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <RadioGroup
                value={selectedOption}
                onValueChange={(value: 'PIX' | 'TRANSFER_BANK') =>
                  handlePaymentReceivingOption(value)
                }
                className="grid grid-cols-2 gap-4 shad"
              >
                <div>
                  <RadioGroupItem
                    value="PIX"
                    id="pix"
                    className="peer sr-only"
                    aria-label="Card"
                  />
                  <Label
                    htmlFor="pix"
                    className={`flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked] [&:has([data-state=checked])] cursor-pointer ${selectedOption === 'PIX' ? 'bg-gray-100' : ''}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="100"
                      height="100"
                      viewBox="0 0 48 48"
                      className="mb-3 h-8 w-8"
                    >
                      <path
                        fill="#37c6d0"
                        d="M19.262,44.037l-8.04-8.04L11,35l-1.777-1.003l-5.26-5.26c-2.617-2.617-2.617-6.859,0-9.475	l5.26-5.26L11,13l0.223-0.997l8.04-8.04c2.617-2.617,6.859-2.617,9.475,0l8.04,8.04L37,13l1.777,1.003l5.26,5.26	c2.617,2.617,2.617,6.859,0,9.475l-5.26,5.26L37,35l-0.223,0.997l-8.04,8.04C26.121,46.653,21.879,46.653,19.262,44.037z"
                      ></path>
                      <path
                        d="M35.79,11.01c-1.76,0.07-3.4,0.79-4.63,2.04l-6.81,6.77c-0.09,0.1-0.22,0.15-0.35,0.15	s-0.25-0.05-0.35-0.15l-6.8-6.76c-1.24-1.26-2.88-1.98-4.64-2.05L8.22,15h3.68c0.8,0,1.55,0.31,2.12,0.88l6.8,6.78	c0.85,0.84,1.98,1.31,3.18,1.31s2.33-0.47,3.18-1.31l6.79-6.78C34.55,15.31,35.3,15,36.1,15h3.68L35.79,11.01z M36.1,33	c-0.8,0-1.55-0.31-2.12-0.88l-6.8-6.78c-0.85-0.84-1.98-1.31-3.18-1.31s-2.33,0.47-3.18,1.31l-6.79,6.78	C13.45,32.69,12.7,33,11.9,33H8.22l3.99,3.99c1.76-0.07,3.4-0.79,4.63-2.04l6.81-6.77c0.09-0.1,0.22-0.15,0.35-0.15	s0.25,0.05,0.35,0.15l6.8,6.76c1.24,1.26,2.88,1.98,4.64,2.05L39.78,33H36.1z"
                        opacity=".05"
                      ></path>
                      <path
                        d="M36.28,11.5H36.1c-1.74,0-3.38,0.68-4.59,1.91l-6.8,6.77c-0.19,0.19-0.45,0.29-0.71,0.29	s-0.52-0.1-0.71-0.29l-6.79-6.77c-1.22-1.23-2.86-1.91-4.6-1.91h-0.18l-3,3h3.18c0.93,0,1.81,0.36,2.48,1.02l6.8,6.78	c0.75,0.76,1.75,1.17,2.82,1.17s2.07-0.41,2.82-1.17l6.8-6.77c0.67-0.67,1.55-1.03,2.48-1.03h3.18L36.28,11.5z M36.1,33.5	c-0.93,0-1.81-0.36-2.48-1.02l-6.8-6.78c-0.75-0.76-1.75-1.17-2.82-1.17s-2.07,0.41-2.82,1.17l-6.8,6.77	c-0.67,0.67-1.55,1.03-2.48,1.03H8.72l3,3h0.18c1.74,0,3.38-0.68,4.59-1.91l6.8-6.77c0.19-0.19,0.45-0.29,0.71-0.29	s0.52,0.1,0.71,0.29l6.79,6.77c1.22,1.23,2.86,1.91,4.6,1.91h0.18l3-3H36.1z"
                        opacity=".07"
                      ></path>
                      <path
                        fill="#fff"
                        d="M38.78,14H36.1c-1.07,0-2.07,0.42-2.83,1.17l-6.8,6.78c-0.68,0.68-1.58,1.02-2.47,1.02	s-1.79-0.34-2.47-1.02l-6.8-6.78C13.97,14.42,12.97,14,11.9,14H9.22l2-2h0.68c1.6,0,3.11,0.62,4.24,1.76l6.8,6.77	c0.59,0.59,1.53,0.59,2.12,0l6.8-6.77C32.99,12.62,34.5,12,36.1,12h0.68L38.78,14z M36.1,34c-1.07,0-2.07-0.42-2.83-1.17l-6.8-6.78	c-1.36-1.36-3.58-1.36-4.94,0l-6.8,6.78C13.97,33.58,12.97,34,11.9,34H9.22l2,2h0.68c1.6,0,3.11-0.62,4.24-1.76l6.8-6.77	c0.59-0.59,1.53-0.59,2.12,0l6.8,6.77C32.99,35.38,34.5,36,36.1,36h0.68l2-2H36.1z"
                      ></path>
                    </svg>
                    Pix
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value="TRANSFER_BANK"
                    id="transfer_bank"
                    className="peer sr-only"
                    aria-label="Card"
                  />
                  <Label
                    htmlFor="transfer_bank"
                    className={`flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked] [&:has([data-state=checked])] cursor-pointer ${selectedOption === 'TRANSFER_BANK' ? 'bg-gray-100' : ''}`}
                  >
                    <Landmark className="mb-3 h-8 w-8" />
                    Transferência Bancária
                  </Label>
                </div>
              </RadioGroup>

              {selectedOption === 'PIX' ? (
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="pixKey"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Chave pix</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Digite ou cole a sua chave"
                            className="h-9"
                            {...field}
                            onChange={(e) => {
                              field.onChange(pixKeysMask(e.target.value))
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              ) : selectedOption === 'TRANSFER_BANK' ? (
                <div className="grid grid-cols-4 gap-4">
                  <div className="grid gap-2 col-span-2">
                    <FormField
                      control={form.control}
                      name="ownerBankAccount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Titular da Conta</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Nome do favorecido"
                              className="h-9"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2 col-span-2">
                    <FormField
                      control={form.control}
                      name="documentBankAccount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CPF/CNPJ</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="h-9"
                              value={documentBankAccount}
                              onChange={(e) => {
                                field.onChange(
                                  (() => {
                                    const clearValue = e.target.value.replace(
                                      /\D/g,
                                      '',
                                    )

                                    if (clearValue.length <= 11) {
                                      setDocumentBankAccount(
                                        cpfMask(clearValue),
                                      )
                                    } else {
                                      setDocumentBankAccount(
                                        cnpjMask(clearValue),
                                      )
                                    }

                                    return clearValue
                                  })(),
                                )
                              }}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-2 col-span-2">
                    <FormField
                      control={form.control}
                      name="bankAccount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Conta</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="h-9"
                              onChange={(e) =>
                                field.onChange(
                                  e.target.value.replace(/\D/g, ''),
                                )
                              }
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2 col-span-2">
                    <FormField
                      control={form.control}
                      name="agencyBankAccount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Agência</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="h-9"
                              placeholder="Sem dígito verificador"
                              onChange={(e) =>
                                field.onChange(
                                  e.target.value.replace(/\D/g, ''),
                                )
                              }
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>
          <Button type="submit" className="w-full h-12 mt-4">
            {form.formState.isSubmitting ? 'Registrando...' : 'Registrar'}
          </Button>
        </form>
      </Form>
    </div>
  )
}

/**
 * Dados para Transferência Bancária
 * - CPF/CNPF
 * - Titular da Conta
 * - Agência
 * - Conta
 * - Tipo de Conta: Conta Corrente | Conta Poupança | Conta Pagamento
 */
