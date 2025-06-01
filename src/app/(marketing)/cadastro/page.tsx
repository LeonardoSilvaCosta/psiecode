"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { showError, showSuccess, showInfo } from "@/utils/toast";

const Cadastro = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    showInfo("Realizando cadastro...");

    if (password !== confirmPassword) {
      showError("As senhas não coincidem.");
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            full_name: fullName,
          },
          // emailRedirectTo: `${window.location.origin}/alguma-pagina-de-boas-vindas`,
        },
      });

      if (error) {
        console.error("Erro no cadastro:", error);
        showError(
          error.message || "Erro ao realizar cadastro. Tente novamente."
        );
      } else if (data.user) {
        showSuccess(
          "Cadastro quase concluído! Por favor, verifique seu e-mail para confirmar sua conta."
        );
        // router.push("/login");
        (e.target as HTMLFormElement).reset();
        setFullName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        showError("Ocorreu um problema no cadastro. Tente novamente.");
      }
    } catch (err: unknown) {
      let errorMessage = "Ocorreu um erro inesperado. Tente novamente.";
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      console.error("Erro inesperado no cadastro:", err);
      showError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-psiecode-dark-blue">
            Crie sua conta Psiecode
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="full-name">Nome Completo</Label>
            <Input
              id="full-name"
              name="fullName"
              type="text"
              required
              placeholder="Seu nome completo"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={isLoading}
              className="border-gray-300 focus:border-psiecode-cyan focus:ring-psiecode-cyan"
            />
          </div>
          <div>
            <Label htmlFor="email-address-cadastro">E-mail</Label>
            <Input
              id="email-address-cadastro"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="border-gray-300 focus:border-psiecode-cyan focus:ring-psiecode-cyan"
            />
          </div>
          <div>
            <Label htmlFor="password-cadastro">Senha</Label>
            <Input
              id="password-cadastro"
              name="password"
              type="password"
              required
              placeholder="Crie uma senha forte (mín. 6 caracteres)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="border-gray-300 focus:border-psiecode-cyan focus:ring-psiecode-cyan"
            />
          </div>
          <div>
            <Label htmlFor="confirm-password">Confirme a Senha</Label>
            <Input
              id="confirm-password"
              name="confirmPassword"
              type="password"
              required
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
              className="border-gray-300 focus:border-psiecode-cyan focus:ring-psiecode-cyan"
            />
          </div>
          <div>
            <Button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-psiecode-light-blue hover:bg-psiecode-medium-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-psiecode-cyan"
              disabled={isLoading}
            >
              {isLoading ? "Criando conta..." : "Criar Conta"}
            </Button>
          </div>
        </form>
        <p className="mt-2 text-center text-sm text-gray-600">
          Já tem uma conta?{" "}
          <Link
            href="/login"
            className="font-medium text-psiecode-light-blue hover:text-psiecode-cyan"
          >
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Cadastro;
