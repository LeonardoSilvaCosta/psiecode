"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LayoutDashboard, Settings, LogOut } from "lucide-react";
import { User } from "@supabase/supabase-js";

interface UserMenuProps {
  user: User;
  userDisplayName: string;
  userAvatarUrl?: string;
  userFallbackName: string;
  onSignOut: () => void;
}

export const UserMenu = ({
  user,
  userDisplayName,
  userAvatarUrl,
  userFallbackName,
  onSignOut,
}: UserMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-psiecode-medium-blue hover:text-psiecode-dark-blue px-2"
        >
          <Avatar className="h-7 w-7">
            <AvatarImage src={userAvatarUrl} alt={userDisplayName} />
            <AvatarFallback>{userFallbackName}</AvatarFallback>
          </Avatar>
          Olá, {userDisplayName}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="truncate">{user.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="flex items-center">
            <LayoutDashboard className="mr-2 h-4 w-4" /> Meu Painel
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/perfil" className="flex items-center">
            <Settings className="mr-2 h-4 w-4" /> Editar Perfil
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={onSignOut}
          className="text-red-600 hover:!text-red-600 hover:!bg-red-100 cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" /> Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
