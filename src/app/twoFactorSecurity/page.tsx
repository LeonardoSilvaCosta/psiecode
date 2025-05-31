import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { showError, showSuccess, showLoading, dismissToast } from "@/utils/toast";
import QRCode from "react-qr-code"; // Importando QRCode do novo pacote
import { useNavigate } from "react-router-dom";

const TwoFactorSetup = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [otpUrl, setOtpUrl] = useState<string | null>(null);
  const [secret, setSecret] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchOtpSetup = async () => {
      setIsLoading(true);
      try {
        // Verifica se 2FA já está habilitado
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;
        if (userData.user?.mfa_enabled) {
          setIsEnabled(true);
          setIsLoading(false);
          return; // Sai se já estiver habilitado
        }

        // Se não estiver habilitado, gera o segredo e o QR code
        const { data: secretData, error: secretError } = await supabase.rpc('auth.mfa_generate_secret');
        if (secretError) throw secretError;
        if (!secretData) throw new Error("Não foi possível gerar o segredo 2FA.");

        const secretValue = (secretData as any).secret;
        setSecret(secretValue);

        const { data: otpData, error: otpError } = await supabase.rpc('auth.mfa_generate_totp', { secret: secretValue });
        if (otpError) throw otpError;
        if (!otpData) throw new Error("Não foi possível gerar o QR code 2FA.");

        const otpUrlValue = (otpData as any).otp_url;
        setOtpUrl(otpUrlValue);

      } catch (error: any) {
        showError(error.message || "Erro ao carregar configuração 2FA.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOtpSetup();
  }, [user]);

  const handleConfirm = async () => {
    if (!code || code.length !== 6) {
      showError("Por favor, insira um código válido de 6 dígitos.");
      return;
    }
    if (!secret) {
       showError("Segredo 2FA não gerado. Tente recarregar a página.");
       return;
    }

    setIsLoading(true);
    const toastId = showLoading("Confirmando código 2FA...");
    try {
      const { data, error } = await supabase.rpc('auth.mfa_totp_enable', { code, secret });
      if (error) throw error;
      showSuccess("Autenticação de dois fatores ativada com sucesso!");
      setIsEnabled(true);
      setCode("");
      // O ideal seria recarregar o usuário no AuthContext ou navegar para o perfil
      navigate("/perfil");
    } catch (error: any) {
      showError(error.message || "Código inválido. Tente novamente.");
    } finally {
      dismissToast(toastId);
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto py-12 px-6 text-center">
        <p>Você precisa estar logado para configurar a autenticação de dois fatores.</p>
        <Button onClick={() => navigate("/login")} className="mt-4">
          Fazer Login
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-6 max-w-md">
      <h1 className="text-3xl font-bold text-psiecode-dark-blue mb-6">Configurar Autenticação de Dois Fatores (2FA)</h1>

      {isLoading ? (
         <p className="text-center text-psiecode-medium-blue">Carregando configuração 2FA...</p>
      ) : isEnabled ? (
        <p className="text-green-600 font-semibold mb-4 text-center">2FA já está ativado na sua conta.</p>
      ) : (
        <>
          <p className="mb-4 text-psiecode-medium-blue">
            Escaneie o QR code abaixo com seu aplicativo autenticador (Google Authenticator, Authy, etc) ou insira a chave secreta manualmente.
          </p>

          {otpUrl ? (
            <div className="flex justify-center mb-4 p-4 bg-white rounded-md shadow">
              <QRCode value={otpUrl} size={180} />
            </div>
          ) : (
            <p className="text-center text-gray-500">Gerando QR code...</p>
          )}

          {secret && (
            <div className="mb-6">
              <Label>Chave secreta (para digitar manualmente):</Label>
              <Input value={secret} readOnly className="select-all bg-gray-100" />
            </div>
          )}

          <div className="mb-6">
            <Label htmlFor="code">Código do aplicativo autenticador</Label>
            <Input
              id="code"
              type="text"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              placeholder="Digite o código de 6 dígitos"
              disabled={isLoading}
            />
          </div>

          <Button onClick={handleConfirm} disabled={isLoading || code.length !== 6 || !secret} className="w-full bg-psiecode-light-blue hover:bg-psiecode-medium-blue text-white">
            {isLoading ? "Confirmando..." : "Ativar 2FA"}
          </Button>
        </>
      )}
    </div>
  );
};

export default TwoFactorSetup;