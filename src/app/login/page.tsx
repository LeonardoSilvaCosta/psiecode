"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { showError, showSuccess, showInfo } from "@/utils/toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    showInfo("Entrando...");

    try {
      const { data: signInData, error: signInError } =
        await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });

      if (signInError) {
        console.error("Erro no login:", signInError);
        showError(
          signInError.message || "E-mail ou senha inválidos. Tente novamente."
        );
        setIsLoading(false);
        return;
      }

      if (!signInData.user || !signInData.session) {
        showError(
          "Ocorreu um problema ao tentar fazer login. Tente novamente."
        );
        setIsLoading(false);
        return;
      }

      // Login bem sucedido
      showSuccess("Login realizado com sucesso!");

      // Redireciona após um breve delay
      setTimeout(() => {
        const redirectTo = searchParams.get("redirectTo") || "/dashboard";
        router.push(redirectTo);
        router.refresh();
      }, 500);
    } catch (err: unknown) {
      let errorMessage = "Ocorreu um erro inesperado. Tente novamente.";
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      console.error("Erro inesperado no login:", err);
      showError(errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-psiecode-dark-blue">
            Acesse sua conta
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email-address-login">E-mail</Label>
            <Input
              id="email-address-login"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-psiecode-cyan focus:border-psiecode-cyan sm:text-sm"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div>
            <Label htmlFor="password-login">Senha</Label>
            <Input
              id="password-login"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-psiecode-cyan focus:border-psiecode-cyan sm:text-sm"
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                href="/forgot-password"
                className="font-medium text-psiecode-light-blue hover:text-psiecode-cyan"
              >
                Esqueceu sua senha?
              </Link>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-psiecode-light-blue hover:bg-psiecode-medium-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-psiecode-cyan"
              disabled={isLoading}
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </div>
        </form>
        <p className="mt-2 text-center text-sm text-gray-600">
          Não tem uma conta?{" "}
          <Link
            href="/cadastro"
            className="font-medium text-psiecode-light-blue hover:text-psiecode-cyan"
          >
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
