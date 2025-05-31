"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export interface UserSubscription {
  plan_id: string;
  status: string;
  current_period_end_at?: string | null;
}

interface AuthContextType {
  session: Session | null;
  user: User | null;
  userSubscription: UserSubscription | null;
  isLoading: boolean;
  isLoadingSubscription: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userSubscription, setUserSubscription] =
    useState<UserSubscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingSubscription, setIsLoadingSubscription] = useState(true);
  const router = useRouter();

  // Efeito para lidar com a sessão e o usuário
  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        // Pega a sessão inicial
        const {
          data: { session: initialSession },
        } = await supabase.auth.getSession();

        if (mounted) {
          setSession(initialSession);
          setUser(initialSession?.user ?? null);
          setIsLoading(false);
        }

        // Configura o listener de mudanças na autenticação
        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange(async (_event, currentSession) => {
          if (mounted) {
            setSession(currentSession);
            setUser(currentSession?.user ?? null);
            setIsLoading(false);
          }
        });

        return () => {
          mounted = false;
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error("Erro ao inicializar autenticação:", error);
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    initializeAuth();
  }, []);

  // Efeito para lidar com a assinatura
  useEffect(() => {
    let mounted = true;

    const fetchSubscription = async () => {
      if (!user) {
        setUserSubscription(null);
        setIsLoadingSubscription(false);
        return;
      }

      try {
        setIsLoadingSubscription(true);
        const { data: subscriptionData, error: subscriptionError } =
          await supabase
            .from("tb_user_subscriptions")
            .select("plan_id, status, current_period_end_at")
            .eq("user_id", user.id)
            .single();

        if (mounted) {
          if (subscriptionError && subscriptionError.code !== "PGRST116") {
            console.error("Erro ao buscar assinatura:", subscriptionError);
            setUserSubscription(null);
          } else {
            setUserSubscription(subscriptionData as UserSubscription | null);
          }
          setIsLoadingSubscription(false);
        }
      } catch (error) {
        console.error("Erro ao buscar assinatura:", error);
        if (mounted) {
          setUserSubscription(null);
          setIsLoadingSubscription(false);
        }
      }
    };

    fetchSubscription();

    return () => {
      mounted = false;
    };
  }, [user]);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const value = {
    session,
    user,
    userSubscription,
    isLoading,
    isLoadingSubscription,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
