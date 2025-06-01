"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import { showError, showSuccess } from "@/utils/toast";
import { ArrowLeft, UploadCloud, ShieldCheck, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Error {
  message: string;
}

const ProfileEdit = () => {
  const {
    user,
    userSubscription,
    isLoading: isLoadingAuth,
    isLoadingSubscription,
    signOut,
  } = useAuth();
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [isSubmittingProfile, setIsSubmittingProfile] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [isDeleteAccountAlertOpen, setIsDeleteAccountAlertOpen] =
    useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      setFullName(user.user_metadata?.full_name || "");
      setEmail(user.email || "");
      setAvatarUrl(user.user_metadata?.avatar_url || null);
    }
  }, [user]);

  const handleFullNameSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user || !fullName.trim()) {
      showError("Nome completo não pode ficar em branco.");
      return;
    }
    setIsSubmittingProfile(true);

    try {
      const { error } = await supabase.auth.updateUser({
        data: { full_name: fullName.trim() },
      });

      if (error) throw error;
      showSuccess("Nome atualizado com sucesso!");
    } catch (error: unknown) {
      const err = error as Error;
      showError(err.message || "Erro ao atualizar nome.");
    } finally {
      setIsSubmittingProfile(false);
    }
  };

  const handleAvatarUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!user) return;
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const filePath = `${user.id}/${file.name}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      const publicUrl = urlData?.publicUrl;

      if (!publicUrl) {
        throw new Error("Não foi possível obter a URL pública do avatar.");
      }

      const { error: updateUserError } = await supabase.auth.updateUser({
        data: {
          avatar_url: publicUrl,
          avatar_path: filePath,
        },
      });

      if (updateUserError) throw updateUserError;

      showSuccess("Avatar atualizado com sucesso!");
      setAvatarUrl(publicUrl);
    } catch (error: unknown) {
      const err = error as Error;
      showError(err.message || "Erro ao enviar avatar.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const confirmDeleteAccount = () => {
    setIsDeleteAccountAlertOpen(true);
  };

  const handleDeleteAccount = async () => {
    if (!user) return;

    setIsDeleteAccountAlertOpen(false);
    setIsDeletingAccount(true);

    try {
      await signOut();
      showSuccess(
        "Sua conta foi marcada para exclusão. Todos os seus dados serão removidos permanentemente em breve."
      );
      router.push("/");
    } catch (error: unknown) {
      const err = error as Error;
      console.error("Erro ao iniciar exclusão da conta:", err);
      showError(err.message || "Ocorreu um erro ao tentar excluir sua conta.");
    } finally {
      setIsDeletingAccount(false);
    }
  };

  if (isLoadingAuth) {
    return (
      <div className="container mx-auto py-12 px-6 text-center">
        Carregando dados do usuário...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto py-12 px-6 text-center">
        Usuário não encontrado. <Link href="/login">Faça login</Link>.
      </div>
    );
  }

  const initials = fullName
    ? fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase()
    : email[0]?.toUpperCase() || "P";

  return (
    <div className="container mx-auto max-w-2xl py-12 px-6">
      <Button variant="outline" onClick={() => router.back()} className="mb-6">
        <ArrowLeft size={18} className="mr-2" /> Voltar
      </Button>

      <div className="grid gap-8 md:grid-cols-1">
        {/* Card de Edição de Perfil */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Editar Perfil</CardTitle>
            <CardDescription>
              Atualize suas informações pessoais e avatar.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={avatarUrl || undefined}
                  alt={fullName || user.email || "Avatar"}
                />
                <AvatarFallback className="text-3xl bg-psiecode-light-blue text-white">
                  {uploading ? (
                    <UploadCloud className="animate-pulse h-10 w-10" />
                  ) : (
                    initials
                  )}
                </AvatarFallback>
              </Avatar>
              <Input
                id="avatarFile"
                type="file"
                accept="image/png, image/jpeg, image/webp"
                onChange={handleAvatarUpload}
                disabled={uploading || isSubmittingProfile}
                ref={fileInputRef}
                className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-psiecode-light-blue/20 file:text-psiecode-dark-blue hover:file:bg-psiecode-light-blue/30"
              />
              {uploading && (
                <p className="text-xs text-psiecode-medium-blue">Enviando...</p>
              )}
            </div>
            <hr />
            <form onSubmit={handleFullNameSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email-profile">E-mail</Label>
                <Input
                  id="email-profile"
                  type="email"
                  value={email}
                  disabled
                  className="bg-gray-100 mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  O e-mail não pode ser alterado por aqui.
                </p>
              </div>
              <div>
                <Label htmlFor="fullName-profile">Nome Completo</Label>
                <Input
                  id="fullName-profile"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Seu nome completo"
                  disabled={isSubmittingProfile || uploading}
                  className="mt-1"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-psiecode-light-blue hover:bg-psiecode-medium-blue"
                disabled={isSubmittingProfile || uploading}
              >
                {isSubmittingProfile ? "Salvando nome..." : "Salvar Nome"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Card de Dados da Inscrição */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Minha Inscrição</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoadingSubscription && <p>Carregando dados da inscrição...</p>}
            {!isLoadingSubscription && userSubscription && (
              <div className="space-y-2">
                <p>
                  <strong>Plano Atual:</strong>{" "}
                  <span className="capitalize">{userSubscription.plan_id}</span>
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className="capitalize">{userSubscription.status}</span>
                </p>
                {userSubscription.current_period_end_at && (
                  <p>
                    <strong>Válido até:</strong>{" "}
                    {new Date(
                      userSubscription.current_period_end_at
                    ).toLocaleDateString("pt-BR")}
                  </p>
                )}
              </div>
            )}
            {!isLoadingSubscription && !userSubscription && (
              <p>
                Você não possui uma inscrição ativa ou os dados não puderam ser
                carregados.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Card para configurar 2FA */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center space-x-2">
              <ShieldCheck size={20} />
              <span>Autenticação de Dois Fatores (2FA)</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-psiecode-medium-blue mb-4">
              Aumente a segurança da sua conta ativando a autenticação de dois
              fatores.
            </p>
            <Button
              asChild
              className="bg-psiecode-light-blue hover:bg-psiecode-medium-blue w-full"
            >
              <Link href="/twoFactorSecurity">Configurar 2FA</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Card para Excluir Conta */}
        <Card className="border-red-500">
          <CardHeader>
            <CardTitle className="text-xl flex items-center space-x-2 text-red-600">
              <Trash2 size={20} />
              <span>Excluir Conta</span>
            </CardTitle>
            <CardDescription className="text-red-500">
              Esta ação é irreversível. Todos os seus dados serão removidos
              permanentemente.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Ao solicitar a exclusão da sua conta, você será imediatamente
              desconectado. Seus dados (pacientes, prontuários, agendamentos)
              serão removidos permanentemente do nosso sistema em um processo
              seguro.
            </p>
            <Button
              onClick={confirmDeleteAccount}
              variant="destructive"
              className="w-full"
              disabled={isDeletingAccount}
            >
              {isDeletingAccount
                ? "Processando Exclusão..."
                : "Solicitar Exclusão da Conta"}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* AlertDialog para Confirmação de Exclusão de Conta */}
      <AlertDialog
        open={isDeleteAccountAlertOpen}
        onOpenChange={setIsDeleteAccountAlertOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza absoluta?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso excluirá permanentemente sua
              conta e todos os dados associados (pacientes, prontuários,
              agendamentos).
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAccount}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Sim, excluir minha conta
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProfileEdit;
