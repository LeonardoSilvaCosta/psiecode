"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Menu, LayoutDashboard, Settings, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { User } from "@supabase/supabase-js";
import { Logo } from "./Logo";
import { NavLink } from "./types";

interface MobileNavProps {
  user: User | null;
  userDisplayName: string;
  userAvatarUrl?: string;
  userFallbackName: string;
  navLinks: NavLink[];
  onSignOut: () => void;
}

export const MobileNav = ({
  user,
  userDisplayName,
  userAvatarUrl,
  userFallbackName,
  navLinks,
  onSignOut,
}: MobileNavProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="border-psiecode-light-blue text-psiecode-light-blue"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-xs bg-background">
        <div className="flex flex-col space-y-2 p-4">
          <SheetClose asChild>
            <div className="mb-4">
              <Logo />
            </div>
          </SheetClose>

          {user && (
            <>
              <div className="flex items-center space-x-3 px-2 py-1.5 border-b mb-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={userAvatarUrl} alt={userDisplayName} />
                  <AvatarFallback>{userFallbackName}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold truncate">
                    {user.user_metadata?.full_name || user.email}
                  </span>
                  <span className="text-xs text-gray-500 truncate">
                    {user.email}
                  </span>
                </div>
              </div>
              <SheetClose asChild>
                <Link
                  href="/dashboard"
                  className="flex items-center text-md font-medium text-psiecode-medium-blue hover:text-psiecode-dark-blue transition-colors py-2 pl-2"
                >
                  <LayoutDashboard className="mr-3 h-5 w-5" /> Meu Painel
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  href="/perfil"
                  className="flex items-center text-md font-medium text-psiecode-medium-blue hover:text-psiecode-dark-blue transition-colors py-2 pl-2"
                >
                  <Settings className="mr-3 h-5 w-5" /> Editar Perfil
                </Link>
              </SheetClose>
              <DropdownMenuSeparator className="my-2" />
            </>
          )}

          {navLinks.map((link) => (
            <SheetClose asChild key={link.label}>
              <Link
                href={link.href}
                className="block px-2 py-1 text-lg font-medium text-psiecode-medium-blue hover:text-psiecode-dark-blue transition-colors"
              >
                {link.label}
              </Link>
            </SheetClose>
          ))}

          <div className="pt-4 mt-auto border-t border-gray-200">
            {user ? (
              <SheetClose asChild>
                <Button
                  variant="ghost"
                  onClick={onSignOut}
                  className="w-full justify-start text-lg font-medium text-red-500 hover:text-red-600 py-2"
                >
                  <LogOut className="mr-3 h-5 w-5" /> Sair
                </Button>
              </SheetClose>
            ) : (
              <>
                <SheetClose asChild>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full mb-2 border-psiecode-light-blue text-psiecode-light-blue hover:bg-psiecode-light-blue hover:text-white"
                  >
                    <Link href="/login">Login</Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button
                    asChild
                    className="w-full bg-psiecode-light-blue text-white hover:bg-psiecode-medium-blue"
                  >
                    <Link href="/cadastro">Cadastre-se</Link>
                  </Button>
                </SheetClose>
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
