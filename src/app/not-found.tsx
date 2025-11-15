"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { AlertTriangle, ArrowLeft, Home, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-[#EAAC2E] opacity-20 select-none">
            404
          </h1>
        </div>

        {/* Main Content */}
        <Card className="border-2 shadow-xl">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="p-4 rounded-full bg-yellow-100">
                <AlertTriangle className="h-12 w-12 text-yellow-600" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900">
              Página não encontrada
            </CardTitle>
            <CardDescription className="text-lg mt-2">
              Desculpe, não conseguimos encontrar a página que você está
              procurando.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
              <div className="flex items-start gap-3 text-left">
                <Search className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-blue-900 mb-1">
                    O que pode ter acontecido?
                  </p>
                  <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                    <li>A URL pode ter sido digitada incorretamente</li>
                    <li>A página pode ter sido movida ou removida</li>
                    <li>O link que você seguiu pode estar quebrado</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Button
                onClick={() => router.back()}
                variant="outline"
                className="w-full sm:w-auto"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
              <Button
                asChild
                className="w-full sm:w-auto bg-[#EAAC2E] hover:bg-[#ffc947]"
              >
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Ir para Home
                </Link>
              </Button>
            </div>

            {/* Quick Links */}
            <div className="pt-6 border-t">
              <p className="text-sm font-medium text-gray-700 mb-4">
                Ou você pode:
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button variant="ghost" asChild size="sm">
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button variant="ghost" asChild size="sm">
                  <Link href="/advertise">Criar Anúncio</Link>
                </Button>
                <Button variant="ghost" asChild size="sm">
                  <Link href="/about">Sobre</Link>
                </Button>
                <Button variant="ghost" asChild size="sm">
                  <Link href="/contact">Contato</Link>
                </Button>
                <Button variant="ghost" asChild size="sm">
                  <Link href="/faq">FAQ</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer Info */}
        <p className="mt-8 text-sm text-gray-500">
          Se você acredita que isso é um erro, por favor{" "}
          <Link
            href="/contact"
            className="text-[#EAAC2E] hover:underline font-medium"
          >
            entre em contato conosco
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
