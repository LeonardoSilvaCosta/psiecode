import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { showError, showSuccess, showLoading, dismissToast } from "@/utils/toast";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSessionValid, setIsSessionValid] = useState(false); // Para verificar se a sessão do reset é válida
  const navigate = useNavigate();

  useEffect(() => {
    // O Supabase lida com a validação do token no URL automaticamente
    // quando a página carrega e a URL contém os parâmetros de reset.
    // Se a sessão for atualizada com sucesso (indicando um token válido),
    // o AuthContext irá refletir isso.
    // Podemos verificar se há um usuário logado (temporariamente pela sessão de reset)
    // ou se a URL contém os parâmetros de reset para mostrar o formulário.
    const checkSession = async () => {
       const { data: { session } } = await supabase.auth.getSession();
       // Se houver uma sessão, ou se a URL contiver os parâmetros de reset (handled by Supabase client),
       // consideramos a sessão válida para mostrar o formulário.
       // Uma forma simples é verificar se há um usuário na sessão.
       if (session?.user) {
         setIsSessionValid(true);
       } else {
         // Se não houver sessão, pode ser que o link expirou ou é inválido.
         // O cliente Supabase pode já ter lidado com isso, mas podemos adicionar um feedback.
         // No entanto, o erro de token inválido/expirado geralmente é tratado pelo Supabase
         // e pode não resultar em um erro aqui, apenas na falta de sessão.
         // Para simplificar, vamos apenas mostrar o formulário se houver sessão.
         // Se não houver, o usuário verá a mensagem de erro padrão ou será redirecionado.
         // Uma abordagem mais robusta envolveria verificar os parâmetros da URL.
         // Por enquanto, vamos confiar na sessão.
         showError("Link de reset inválido ou expirado. Por favor, solicite um novo.");
         navigate('/forgot-password'); // Redireciona para solicitar um novo link
       }
    };
    checkSession();
  }, [navigate]);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showError("As senhas não coincidem.");
      return;
    }
    if (password.length < 6) {
        showError("A senha deve ter pelo menos 6 caracteres.");
        return;
    }

    setIsLoading(true);
    const toastId = showLoading("Redefinindo senha...");

    try {
      // O updateUser funciona aqui porque o Supabase já validou o token do URL
      // e atualizou a sessão do usuário temporariamente.
      const { data, error } = await supabase.auth.updateUser({
        password: password,
      });

      dismissToast(toastId);

      if (error) {
        console.error("Erro ao redefinir senha:", error);
        showError(error.message || "Erro ao redefinir senha. Tente novamente.");
      } else if (data.user) {
        showSuccess("Senha redefinida com sucesso!");
        navigate("/login"); // Redireciona para a página de login
      } else {
         // Caso inesperado, talvez a sessão tenha expirado entre o load e o submit
         showError("Ocorreu um problema ao redefinir senha. Tente solicitar um novo link.");
         navigate('/forgot-password');
      }
    } catch (err: any) {
      dismissToast(toastId);
      console.error("Erro inesperado ao redefinir senha:", err);
      showError(err.message || "Ocorreu um erro inesperado. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  // Só mostra o formulário se a sessão for considerada válida para reset
  if (!isSessionValid) {
      return (
        <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-md w-full space-y-4 text-center bg-white p-10 rounded-xl shadow-lg">
                <h2 className="text-2xl font-extrabold text-psiecode-dark-blue">Verificando link...</h2>
                <p className="text-gray-600">Aguarde enquanto validamos seu link de reset de senha.</p>
            </div>
        </div>
      );
  }


  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-psiecode-dark-blue">
            Defina sua nova senha
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Insira e confirme sua nova senha.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="new-password">Nova Senha</Label>
            <Input
              id="new-password"
              name="password"
              type="password"
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-psiecode-cyan focus:border-psiecode-cyan sm:text-sm"
              placeholder="Crie sua nova senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div>
            <Label htmlFor="confirm-new-password">Confirme a Nova Senha</Label>
            <Input
              id="confirm-new-password"
              name="confirmPassword"
              type="password"
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-psiecode-cyan focus:border-psiecode-cyan sm:text-sm"
              placeholder="Confirme sua nova senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
          
          <div>
            <Button 
              type="submit" 
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-psiecode-light-blue hover:bg-psiecode-medium-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-psiecode-cyan"
              disabled={isLoading}
            >
              {isLoading ? "Redefinindo..." : "Redefinir Senha"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ResetPassword;