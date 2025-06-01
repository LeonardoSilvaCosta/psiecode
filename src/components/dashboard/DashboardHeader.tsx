"use client";

import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { showSuccess } from "@/utils/toast";
import { UserMenu } from "@/components/navbar/UserMenu";

interface DashboardHeaderProps {
  user: User | null;
}

export const DashboardHeader = ({ user }: DashboardHeaderProps) => {
  const router = useRouter();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    showSuccess("Você foi desconectado com sucesso!");
    router.push("/");
  };

  if (!user) return null;

  const userDisplayName =
    user.user_metadata?.full_name?.split(" ")[0] ||
    user.email?.split("@")[0] ||
    "Usuário";
  const userAvatarUrl = user.user_metadata?.avatar_url;
  const userFallbackName = userDisplayName[0]?.toUpperCase() || "U";

  return (
    <div className="mb-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-psiecode-dark-blue">
            Bem-vindo(a), {user.user_metadata?.full_name || user.email}!
          </h1>
          <p className="text-sm sm:text-base text-psiecode-medium-blue mt-2">
            Confira o resumo das suas atividades
          </p>
        </div>

        <UserMenu
          user={user}
          userDisplayName={userDisplayName}
          userAvatarUrl={userAvatarUrl}
          userFallbackName={userFallbackName}
          onSignOut={handleSignOut}
        />
      </div>
    </div>
  );
};
