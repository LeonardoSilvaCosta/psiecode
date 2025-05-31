import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { showError, showSuccess, showLoading, dismissToast } from "@/utils/toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    const toastId = showLoading("Enviando link de reset...");

    try {
      // IMPORTANTE: Você precisa configurar a URL de redirecionamento no painel do Supabase!
      // Vá em Authentication -> Settings -> URL Configuration -> Redirect URLs
      // Adicione a URL completa da sua página de reset de senha, por exemplo:
      // http://localhost:8080/reset-password (para desenvolvimento local)
      // https://seu-app.com/reset-password (para produção)
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`, // Redireciona para a página de reset
      });

      dismissToast(toastId);

      if (error) {
        console.error("Erro ao solicitar reset de senha:", error);
        showError(error.message || "Erro ao enviar link de reset. Verifique o e-mail e tente novamente.");
      } else {
        showSuccess("Link de reset enviado!");
        setMessage("Se o e-mail estiver cadastrado, um link para resetar sua senha foi enviado para ele. Verifique sua caixa de entrada (e spam).");
        setEmail(""); // Limpa o campo após o envio
      }
    } catch (err: any) {
      dismissToast(toastId);
      console.error("Erro inesperado ao solicitar reset:", err);
      showError(err.message || "Ocorreu um erro inesperado. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-psiecode-dark-blue">
            Esqueceu sua senha?
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Insira seu e-mail para receber um link de reset.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email-address-forgot">E-mail</Label>
            <Input
              id="email-address-forgot"
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
          
          {message && (
            <div className="text-sm text-green-600 text-center">
              {message}
            </div>
          )}

          <div>
            <Button 
              type="submit" 
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-psiecode-light-blue hover:bg-psiecode-medium-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-psiecode-cyan"
              disabled={isLoading}
            >
              {isLoading ? "Enviando..." : "Enviar Link de Reset"}
            </Button>
          </div>
        </form>
        <p className="mt-2 text-center text-sm text-gray-600">
          Lembrou da senha?{' '}
          <Link to="/login" className="font-medium text-psiecode-light-blue hover:text-psiecode-cyan">
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
};
export default ForgotPassword;