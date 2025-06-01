import Link from "next/link";
import { Button } from "@/components/ui/button";
import { User } from "@supabase/supabase-js";
import { NavLink } from "./types";
import { UserMenu } from "./UserMenu";

interface DesktopNavProps {
  user: User | null;
  userDisplayName: string;
  userAvatarUrl?: string;
  userFallbackName: string;
  navLinks: NavLink[];
  onSignOut: () => void;
}

export const DesktopNav = ({
  user,
  userDisplayName,
  userAvatarUrl,
  userFallbackName,
  navLinks,
  onSignOut,
}: DesktopNavProps) => {
  return (
    <nav className="hidden md:flex gap-4 items-center">
      {navLinks.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className="text-sm font-medium text-psiecode-medium-blue hover:text-psiecode-dark-blue transition-colors"
        >
          {link.label}
        </Link>
      ))}
      {user ? (
        <UserMenu
          user={user}
          userDisplayName={userDisplayName}
          userAvatarUrl={userAvatarUrl}
          userFallbackName={userFallbackName}
          onSignOut={onSignOut}
        />
      ) : (
        <>
          <Button
            asChild
            variant="outline"
            className="border-psiecode-light-blue text-psiecode-light-blue hover:bg-psiecode-light-blue hover:text-white"
          >
            <Link href="/login">Login</Link>
          </Button>
          <Button
            asChild
            className="bg-psiecode-light-blue text-white hover:bg-psiecode-medium-blue"
          >
            <Link href="/cadastro">Cadastre-se</Link>
          </Button>
        </>
      )}
    </nav>
  );
};
