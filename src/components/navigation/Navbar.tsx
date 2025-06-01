"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Logo } from "@/components/ui/Logo";

export function Navbar() {
  const { user, isLoading } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Logo variant="primary" size="lg" href="/" />

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/servicos"
              className="text-psiecode-dark-blue hover:text-psiecode-light-blue"
            >
              Serviços
            </Link>
            <Link
              href="/precos"
              className="text-psiecode-dark-blue hover:text-psiecode-light-blue"
            >
              Preços
            </Link>
            <Link
              href="/sobre"
              className="text-psiecode-dark-blue hover:text-psiecode-light-blue"
            >
              Sobre
            </Link>
            <Link
              href="/contato"
              className="text-psiecode-dark-blue hover:text-psiecode-light-blue"
            >
              Contato
            </Link>
            <Link
              href="/blog"
              className="text-psiecode-dark-blue hover:text-psiecode-light-blue"
            >
              Blog
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {!isLoading && !user ? (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button
                  className="bg-psiecode-light-blue hover:bg-psiecode-medium-blue"
                  asChild
                >
                  <Link href="/cadastro">Cadastre-se</Link>
                </Button>
              </>
            ) : (
              <Button
                className="bg-psiecode-light-blue hover:bg-psiecode-medium-blue"
                asChild
              >
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
