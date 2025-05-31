"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, Brain, LogOut, LayoutDashboard, Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { showSuccess } from "@/utils/toast";

const navLinks = [
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
        <Link href="/" className="flex items-center space-x-2">
          <Brain className="h-8 w-8 text-psiecode-light-blue" />
          <span className="font-bold text-2xl text-psiecode-dark-blue">
            Psiecode
          </span>
        </Link>

        {/* Desktop Navigation */}
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
          {effectiveUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 text-psiecode-medium-blue hover:text-psiecode-dark-blue px-2"
                >
                  <Avatar className="h-7 w-7">
                    <AvatarImage
                      src={userAvatarUrl || undefined}
                      alt={userDisplayName}
                    />
                    <AvatarFallback>{userFallbackName}</AvatarFallback>
                  </Avatar>
                  Olá, {userDisplayName}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="truncate">
                  {effectiveUser.email}
                </DropdownMenuLabel>
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
                  onClick={handleSignOut}
                  className="text-red-600 hover:!text-red-600 hover:!bg-red-100 cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" /> Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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

        {/* Mobile Navigation */}
        <div className="md:hidden">
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
            <SheetContent
              side="right"
              className="w-full max-w-xs bg-background"
            >
              <div className="flex flex-col space-y-2 p-4">
                <SheetClose asChild>
                  <Link href="/" className="flex items-center space-x-2 mb-4">
                    <Brain className="h-8 w-8 text-psiecode-light-blue" />
                    <span className="font-bold text-2xl text-psiecode-dark-blue">
                      Psiecode
                    </span>
                  </Link>
                </SheetClose>

                {effectiveUser && (
                  <>
                    <div className="flex items-center space-x-3 px-2 py-1.5 border-b mb-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={userAvatarUrl || undefined}
                          alt={userDisplayName}
                        />
                        <AvatarFallback>{userFallbackName}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold truncate">
                          {effectiveUser.user_metadata?.full_name ||
                            effectiveUser.email}
                        </span>
                        <span className="text-xs text-gray-500 truncate">
                          {effectiveUser.email}
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
                  {effectiveUser ? (
                    <SheetClose asChild>
                      <Button
                        variant="ghost"
                        onClick={handleSignOut}
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
        </div>
      </div>
    </header>
  );
};

export default Navbar;
