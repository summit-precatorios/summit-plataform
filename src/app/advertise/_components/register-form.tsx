"use client";

import { useAdvertise } from "@/app/advertise/_components/use-advertise";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputCurrency } from "@/components/ui/input-currency";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { cnpjMask, cpfMask, currencyFormatter, pixKeysMask } from "@/lib/utils";
import { createAnnouncementRequest } from "@/services/announcement.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import {
  Calculator,
  CircleHelp,
  CreditCard,
  DollarSign,
  FileText,
  Info,
  Landmark,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

function handleSalePriceChange(value: string | number): string {
  if (!value) return "";

  const valueStr = String(value);
  const numericValue = parseFloat(
    valueStr.replace(/[^\d,-]/g, "").replace(",", "."),
  );

  if (!isNaN(numericValue)) {
    const calculatedBalance = (numericValue * 0.95).toFixed(2); // 95% do valor de venda
    const formattedBalance = currencyFormatter
      .format(Number(calculatedBalance))
      .replace(/^R\$/, "")
      .trim();

    return formattedBalance;
  }

  return "";
}

export function RegisterForm(props: {
  title: string;
  description: string;
  show: boolean;
  announcementType: "RPV" | "PRECATORIO";
}) {
  const [salePrice, setSalePrice] = useState("0,00");
  const [documentBankAccount, setDocumentBankAccount] = useState("");
  const [selectedOption, setSelectedOption] = useState<"PIX" | "TRANSFER_BANK">(
    "PIX",
  );
  const [formattedPrice, setFormattedPrice] = useState("0,00");
  const { createAnnouncementSchema } = useAdvertise();

  type CreateAnnouncementSchema = z.infer<typeof createAnnouncementSchema>;

  const form = useForm<CreateAnnouncementSchema>({
    resolver: zodResolver(createAnnouncementSchema),
    defaultValues: {
      paymentOption: "PIX",
    },
  });

  const handlePaymentReceivingOption = (option: "PIX" | "TRANSFER_BANK") => {
    setSelectedOption(option);
    form.setValue("paymentOption", option);
  };

  const { toast } = useToast();
  const router = useRouter();

  async function onSubmit(data: z.infer<typeof createAnnouncementSchema>) {
    try {
      const response = await createAnnouncementRequest(data);

      if (!response) {
        toast({
          variant: "destructive",
          title: "Erro interno",
          description: "Não foi possível processar a sua requisição",
        });
        return;
      }

      if (response && (response.statusCode === 201 || !response.statusCode)) {
        toast({
          variant: "default",
          title: `Seu ${props.title} foi registrado com sucesso!`,
          description:
            "Encaminhamos para o seu email os detalhes sobre o seu anúncio",
        });

        form.reset();
        router.push("/dashboard");
      } else {
        toast({
          variant: "destructive",
          title: "Erro ao criar anúncio",
          description:
            response?.message || "Não foi possível processar a sua requisição",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro interno",
        description: "Não foi possível processar a sua requisição",
      });
    }
  }

  const calculatedBalance = handleSalePriceChange(form.watch("salePrice"));

  useEffect(() => {
    form.setValue("liquidBalance", calculatedBalance);
  }, [calculatedBalance, form]);

  useEffect(() => {
    const newCalculatedBalance = handleSalePriceChange(salePrice);
    form.setValue("liquidBalance", newCalculatedBalance);
  }, [salePrice, form]);

  useEffect(() => {
    form.setValue("type", props.announcementType);
  }, [props.announcementType, form]);

  if (!props.show) {
    return null;
  }

  return (
    <div className="w-full space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Section 1: Dados do Proprietário */}
          <Card className="border-2 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">
                    Dados do Proprietário
                  </CardTitle>
                  <CardDescription>
                    Informações sobre o proprietário do precatório
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="grid gap-6 pt-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="ownerFullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-500" />
                        Nome Completo
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="h-12 text-base"
                          placeholder="Ex: João da Silva"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ownerDocument"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-500" />
                        CPF
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="h-12 text-base"
                          placeholder="000.000.000-00"
                          {...field}
                          onChange={(e) =>
                            field.onChange(cpfMask(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Informações do Precatório */}
          <Card className="border-2 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-100">
                  <FileText className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">
                    Informações do {props.title}
                  </CardTitle>
                  <CardDescription>
                    Detalhes sobre o processo judicial
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="grid gap-6 pt-6">
              <div className="grid gap-4 sm:grid-cols-3">
                <FormField
                  control={form.control}
                  name="lawSuit"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-2">
                      <FormLabel className="text-base font-medium">
                        Número do Processo
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="h-12 text-base"
                          placeholder={`Informe o número do seu ${props.title === "RPV" ? "RPV" : "precatório"}`}
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.value.replace(/\D/g, ""))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="origin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">
                        Origem
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12 text-base">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="federal">Federal</SelectItem>
                          <SelectItem value="estadual">Estadual</SelectItem>
                          <SelectItem value="municipal">Municipal</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="court"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">
                        Tribunal
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12 text-base">
                            <SelectValue placeholder="Selecione o tribunal" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="federal">TRF-1</SelectItem>
                          <SelectItem value="estadual">TRF-4</SelectItem>
                          <SelectItem value="estadual">TRF-5</SelectItem>
                          <SelectItem value="estadual">TJSP</SelectItem>
                          <SelectItem value="estadual">TJMG</SelectItem>
                          <SelectItem value="estadual">TJRS</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Valores */}
          <Card className="border-2 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-100">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">Valores</CardTitle>
                  <CardDescription>
                    Informe os valores do seu {props.title}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="grid gap-6 pt-6">
              <div className="grid gap-4 sm:grid-cols-3">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium flex items-center gap-2">
                        Valor Nominal
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <CircleHelp className="h-4 w-4 text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Valor original do {props.title}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </FormLabel>
                      <FormControl>
                        <InputCurrency
                          className="h-12 text-base"
                          {...field}
                          value={formattedPrice}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "");
                            setFormattedPrice(
                              currencyFormatter
                                .format(Number(value) / 100)
                                .replace(/^R\$/, "")
                                .trim(),
                            );
                            field.onChange(
                              currencyFormatter
                                .format(Number(value) / 100)
                                .replace(/^R\$/, "")
                                .trim(),
                            );
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="salePrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium flex items-center gap-2">
                        Valor de Venda
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <CircleHelp className="h-4 w-4 text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Valor que você deseja receber pela venda</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </FormLabel>
                      <FormControl>
                        <InputCurrency
                          className="h-12 text-base"
                          {...field}
                          value={salePrice}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "");
                            setSalePrice(
                              currencyFormatter
                                .format(Number(value) / 100)
                                .replace(/^R\$/, "")
                                .trim(),
                            );
                            field.onChange(
                              currencyFormatter
                                .format(Number(value) / 100)
                                .replace(/^R\$/, "")
                                .trim(),
                            );
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="liquidBalance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium flex items-center gap-2">
                        <Calculator className="h-4 w-4 text-gray-500" />
                        Saldo Líquido
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <CircleHelp className="h-4 w-4 text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                              <p>
                                Valor líquido após a taxa de 5%. Calculado
                                automaticamente como 95% do valor de venda.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            className="h-12 text-base bg-gray-50 border-2 border-gray-200"
                            disabled
                            value={`R$ ${field.value || "0,00"}`}
                            readOnly
                          />
                          <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <Info className="h-5 w-5 text-gray-400" />
                          </div>
                        </div>
                      </FormControl>
                      <FormDescription className="flex items-center gap-1 text-sm text-gray-600">
                        <Info className="h-3 w-3" />
                        Calculado automaticamente (95% do valor de venda)
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Section 4: Dados para Recebimento */}
          <Card className="border-2 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#EAAC2E]/10">
                  <CreditCard className="h-5 w-5 text-[#EAAC2E]" />
                </div>
                <div>
                  <CardTitle className="text-xl">
                    Dados para Recebimento
                  </CardTitle>
                  <CardDescription>
                    Informe como deseja receber o pagamento
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="grid gap-6 pt-6">
              <RadioGroup
                value={selectedOption}
                onValueChange={(value: "PIX" | "TRANSFER_BANK") =>
                  handlePaymentReceivingOption(value)
                }
                className="grid gap-4 sm:grid-cols-2"
              >
                <div>
                  <RadioGroupItem
                    value="PIX"
                    id="pix"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="pix"
                    className={`flex flex-col items-center justify-center rounded-lg border-2 p-6 cursor-pointer transition-all duration-200 ${
                      selectedOption === "PIX"
                        ? "border-[#EAAC2E] bg-[#EAAC2E]/5 shadow-md"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="p-3 rounded-full bg-blue-100 mb-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 48 48"
                      >
                        <path
                          fill="#37c6d0"
                          d="M19.262,44.037l-8.04-8.04L11,35l-1.777-1.003l-5.26-5.26c-2.617-2.617-2.617-6.859,0-9.475	l5.26-5.26L11,13l0.223-0.997l8.04-8.04c2.617-2.617,6.859-2.617,9.475,0l8.04,8.04L37,13l1.777,1.003l5.26,5.26	c2.617,2.617,2.617,6.859,0,9.475l-5.26,5.26L37,35l-0.223,0.997l-8.04,8.04C26.121,46.653,21.879,46.653,19.262,44.037z"
                        />
                        <path
                          fill="#fff"
                          d="M38.78,14H36.1c-1.07,0-2.07,0.42-2.83,1.17l-6.8,6.78c-0.68,0.68-1.58,1.02-2.47,1.02	s-1.79-0.34-2.47-1.02l-6.8-6.78C13.97,14.42,12.97,14,11.9,14H9.22l2-2h0.68c1.6,0,3.11,0.62,4.24,1.76l6.8,6.77	c0.59,0.59,1.53,0.59,2.12,0l6.8-6.77C32.99,12.62,34.5,12,36.1,12h0.68L38.78,14z M36.1,34c-1.07,0-2.07-0.42-2.83-1.17l-6.8-6.78	c-1.36-1.36-3.58-1.36-4.94,0l-6.8,6.78C13.97,33.58,12.97,34,11.9,34H9.22l2,2h0.68c1.6,0,3.11-0.62,4.24-1.76l6.8-6.77	c0.59-0.59,1.53-0.59,2.12,0l6.8,6.77C32.99,35.38,34.5,36,36.1,36h0.68l2-2H36.1z"
                        />
                      </svg>
                    </div>
                    <span className="font-semibold text-base">PIX</span>
                    <span className="text-sm text-gray-600 mt-1">
                      Recebimento instantâneo
                    </span>
                  </Label>
                </div>

                <div>
                  <RadioGroupItem
                    value="TRANSFER_BANK"
                    id="transfer_bank"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="transfer_bank"
                    className={`flex flex-col items-center justify-center rounded-lg border-2 p-6 cursor-pointer transition-all duration-200 ${
                      selectedOption === "TRANSFER_BANK"
                        ? "border-[#EAAC2E] bg-[#EAAC2E]/5 shadow-md"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="p-3 rounded-full bg-green-100 mb-3">
                      <Landmark className="h-8 w-8 text-green-600" />
                    </div>
                    <span className="font-semibold text-base">
                      Transferência Bancária
                    </span>
                    <span className="text-sm text-gray-600 mt-1">
                      DADOS bancários
                    </span>
                  </Label>
                </div>
              </RadioGroup>

              {selectedOption === "PIX" ? (
                <div className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="pixKey"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium">
                          Chave PIX
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            className="h-12 text-base"
                            placeholder="Digite ou cole a sua chave PIX"
                            {...field}
                            onChange={(e) => {
                              const maskedValue = pixKeysMask(e.target.value);
                              field.onChange(maskedValue);
                            }}
                          />
                        </FormControl>
                        <FormDescription>
                          CPF, e-mail, telefone, chave aleatória ou CNPJ
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="ownerBankAccount"
                    render={({ field }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel className="text-base font-medium">
                          Titular da Conta
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="h-12 text-base"
                            placeholder="Nome completo do favorecido"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="documentBankAccount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium">
                          CPF/CNPJ
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="h-12 text-base"
                            placeholder="000.000.000-00"
                            value={documentBankAccount}
                            onChange={(e) => {
                              const clearValue = e.target.value.replace(
                                /\D/g,
                                "",
                              );
                              if (clearValue.length <= 11) {
                                setDocumentBankAccount(cpfMask(clearValue));
                              } else {
                                setDocumentBankAccount(cnpjMask(clearValue));
                              }
                              field.onChange(clearValue);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bankAccount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium">
                          Conta
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="h-12 text-base"
                            placeholder="Número da conta"
                            {...field}
                            onChange={(e) =>
                              field.onChange(e.target.value.replace(/\D/g, ""))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="agencyBankAccount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium">
                          Agência
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="h-12 text-base"
                            placeholder="Sem dígito verificador"
                            {...field}
                            onChange={(e) =>
                              field.onChange(e.target.value.replace(/\D/g, ""))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-4">
            <div className="text-sm text-gray-600 flex items-center gap-2">
              <Info className="h-4 w-4" />
              <span>
                Ao enviar, você concorda com nossos{" "}
                <a href="/terms" className="text-[#EAAC2E] hover:underline">
                  Termos de Serviço
                </a>{" "}
                e{" "}
                <a href="/privacy" className="text-[#EAAC2E] hover:underline">
                  Política de Privacidade
                </a>
              </span>
            </div>
            <Button
              type="submit"
              className="w-full sm:w-auto min-w-[200px] h-12 text-base font-semibold"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Registrando...
                </>
              ) : (
                "Registrar Anúncio"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
