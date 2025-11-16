"use client";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MapPin, MessageSquare, Phone, Send, User } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Insira um e-mail válido"),
  phone: z.string().optional(),
  subject: z.string().min(5, "Assunto deve ter pelo menos 5 caracteres"),
  message: z
    .string()
    .min(10, "Mensagem deve ter pelo menos 10 caracteres")
    .max(1000, "Mensagem deve ter no máximo 1000 caracteres"),
});

export default function ContactPage() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    // Aqui você pode integrar com uma API de envio de e-mail
    console.log("Form data:", data);

    toast({
      variant: "default",
      title: "Mensagem enviada!",
      description: "Recebemos sua mensagem e entraremos em contato em breve.",
    });

    form.reset();
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "E-mail",
      description: "Entre em contato por e-mail",
      value: "contato@summit.com.br",
    },
    {
      icon: Phone,
      title: "Telefone",
      description: "Ligue para nós",
      value: "(61) 3000-0000",
    },
    {
      icon: MapPin,
      title: "Endereço",
      description: "Nossa localização",
      value: "Brasília, DF - Brasil",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Entre em Contato
          </h1>
          <p className="mt-6 text-xl leading-8 text-gray-600">
            Estamos aqui para ajudar. Entre em contato conosco e responderemos o
            mais breve possível.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                    Fale conosco
                  </h2>
                  <p className="mt-4 text-lg text-gray-600">
                    Escolha a melhor forma de entrar em contato. Estamos prontos
                    para ajudar você.
                  </p>
                </div>

                <div className="space-y-4">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon;
                    return (
                      <Card key={index} className="border-2">
                        <CardHeader>
                          <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-[#EAAC2E]/10 p-2">
                              <Icon className="h-5 w-5 text-[#EAAC2E]" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">
                                {info.title}
                              </CardTitle>
                              <CardDescription>
                                {info.description}
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="font-medium text-gray-900">
                            {info.value}
                          </p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-2 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl">Envie sua mensagem</CardTitle>
                  <CardDescription>
                    Preencha o formulário abaixo e entraremos em contato
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      <div className="grid gap-6 sm:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base font-medium">
                                Nome completo
                              </FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                    <User className="h-5 w-5" />
                                  </div>
                                  <Input
                                    placeholder="Seu nome"
                                    className="pl-10 h-12"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base font-medium">
                                E-mail
                              </FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                    <Mail className="h-5 w-5" />
                                  </div>
                                  <Input
                                    type="email"
                                    placeholder="seu@email.com"
                                    className="pl-10 h-12"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">
                              Telefone (opcional)
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                  <Phone className="h-5 w-5" />
                                </div>
                                <Input
                                  type="tel"
                                  placeholder="(11) 99999-9999"
                                  className="pl-10 h-12"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">
                              Assunto
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Qual o assunto da sua mensagem?"
                                className="h-12"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">
                              Mensagem
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <div className="absolute left-3 top-3 text-gray-400">
                                  <MessageSquare className="h-5 w-5" />
                                </div>
                                <Textarea
                                  placeholder="Descreva sua dúvida ou solicitação..."
                                  className="pl-10 min-h-[150px]"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        className="w-full h-12 text-base font-semibold"
                        disabled={form.formState.isSubmitting}
                      >
                        {form.formState.isSubmitting ? (
                          "Enviando..."
                        ) : (
                          <>
                            <Send className="mr-2 h-5 w-5" />
                            Enviar mensagem
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
