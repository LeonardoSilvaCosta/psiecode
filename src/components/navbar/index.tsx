"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { showSuccess } from "@/utils/toast";
import { Logo } from "./Logo";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import { NavLink } from "./types";

const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/sobre", label: "Sobre" },
  { href: "/servicos", label: "Serviços" },
  { href: "/precos", label: "Preços" },
  { href: "/blog", label: "Blog" },
  { href: "/contato", label: "Contato" },
];

const Navbar = () => {
  const { user, signOut, isLoading } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    showSuccess("Você foi desconectado com sucesso!");
    router.push("/");
  };

  const effectiveUser = isLoading ? null : user;
  const userDisplayName =
    effectiveUser?.user_metadata?.full_name?.split(" ")[0] ||
    effectiveUser?.email?.split("@")[0] ||
    "Usuário";
  const userAvatarUrl = effectiveUser?.user_metadata?.avatar_url;
  const userFallbackName = userDisplayName[0]?.toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <Logo />

        <DesktopNav
          user={effectiveUser}
          userDisplayName={userDisplayName}
          userAvatarUrl={userAvatarUrl}
          userFallbackName={userFallbackName}
          navLinks={navLinks}
          onSignOut={handleSignOut}
        />

        <div className="md:hidden">
          <MobileNav
            user={effectiveUser}
            userDisplayName={userDisplayName}
            userAvatarUrl={userAvatarUrl}
            userFallbackName={userFallbackName}
            navLinks={navLinks}
            onSignOut={handleSignOut}
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
