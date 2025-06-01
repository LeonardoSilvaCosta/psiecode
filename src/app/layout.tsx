import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { Sidebar } from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Psiecode - Gestão de Consultório",
  description: "Sistema de gestão para profissionais de psicologia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen bg-gray-50/50">
            <Sidebar />
            <main className="md:pl-64 pt-16 md:pt-0">{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
