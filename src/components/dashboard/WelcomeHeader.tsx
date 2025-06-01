import { User } from "@supabase/supabase-js";

interface WelcomeHeaderProps {
  user: User | null;
}

export const WelcomeHeader = ({ user }: WelcomeHeaderProps) => {
  return (
    <div className="mb-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-psiecode-dark-blue">
        Bem-vindo(a), {user?.user_metadata?.full_name || user?.email}!
      </h1>
      <p className="text-sm sm:text-base text-psiecode-medium-blue mt-2">
        Confira o resumo das suas atividades
      </p>
    </div>
  );
};
