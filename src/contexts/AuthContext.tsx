"use client";

import { useToast } from "@/components/ui/use-toast";
import { handleApiError } from "@/lib/error-handler";
import { signInRequest } from "@/services/auth.service";
import { User } from "@/types";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { ReactNode, createContext, useEffect, useState } from "react";

interface AuthContextProps {
  children: ReactNode;
}

export type SignInData = {
  document: string;
  password: string;
};
type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (data: SignInData) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthContextProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  async function signIn({ document, password }: SignInData) {
    try {
      const response = await signInRequest({ document, password });

      if (!response) {
        toast({
          variant: "destructive",
          title: "Erro interno",
          description: "Não foi possível processar a sua requisição",
        });

        return;
      }

      // Verifica se a resposta contém um erro
      if ("statusCode" in response && response.statusCode >= 400) {
        const errorToast = handleApiError({
          statusCode: response.statusCode,
          message: response.message || response.error,
        });
        toast(errorToast);
        return;
      }

      const { accessToken: token } = response;

      if (!token) {
        toast({
          variant: "destructive",
          title: "Credenciais inválidas",
          description:
            "O CPF ou senha informados estão incorretos. Verifique suas credenciais e tente novamente.",
        });

        return;
      }

      setCookie(undefined, "summit.token", token, {
        maxAge: 60 * 60 * 1, // expires in 1 hour
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const tokenDecoded: { payload: any; roles: string[] } = jwtDecode(
        token as string,
      );

      const { payload, roles } = tokenDecoded;

      const data: User = {
        ...payload,
        roles,
      };

      setUser(data);

      // Aguarda um pequeno delay para garantir que o cookie seja setado
      // e o estado seja atualizado antes do redirecionamento
      setTimeout(() => {
        router.replace("/dashboard");
      }, 100);
    } catch (error) {
      // Trata erros com statusCode quando disponível
      const errorToast = handleApiError(
        error && typeof error === "object" && "statusCode" in error
          ? (error as { statusCode?: number; message?: string })
          : error,
      );
      toast(errorToast);
    }
  }

  async function logout() {
    destroyCookie(null, "summit.token");

    setUser(null);

    router.push("/sign-in");
  }

  useEffect(() => {
    const { "summit.token": token } = parseCookies();

    if (token && !user) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const tokenDecoded: { payload: any; roles: string[] } = jwtDecode(
          token as string,
        );

        const { payload, roles } = tokenDecoded;

        const data: User = {
          ...payload,
          roles,
        };

        setUser(data);

        router.push("/dashboard");
      } catch (error) {
        console.error("error_decoding_token", error);
        destroyCookie(null, "summit.token");
      }
    }
  }, [user, router]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, user, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
