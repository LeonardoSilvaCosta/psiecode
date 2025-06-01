"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Calendar,
  MessagesSquare,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Pacientes", href: "/pacientes", icon: Users },
  { name: "Agendamento", href: "/agendamento", icon: Calendar },
  { name: "Comunidade", href: "/comunidade", icon: MessagesSquare },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const { signOut } = useAuth();

  return (
    <div className="flex flex-col w-64 bg-white border-r border-gray-200">
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex items-center h-16 flex-shrink-0 px-4 border-b border-gray-200">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <img src="/logo.svg" alt="Psiecode" className="h-8 w-auto" />
            <span className="text-xl font-semibold text-psiecode-dark-blue">
              Psiecode
            </span>
          </Link>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive
                    ? "bg-psiecode-light-blue/10 text-psiecode-dark-blue"
                    : "text-gray-600 hover:bg-gray-50 hover:text-psiecode-dark-blue"
                )}
              >
                <item.icon
                  className={cn(
                    "mr-3 h-5 w-5 flex-shrink-0",
                    isActive
                      ? "text-psiecode-dark-blue"
                      : "text-gray-400 group-hover:text-psiecode-dark-blue"
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
        <button
          onClick={() => signOut()}
          className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-red-600 group transition-colors"
        >
          <LogOut
            className="mr-3 h-5 w-5 text-gray-400 group-hover:text-red-600"
            aria-hidden="true"
          />
          Sair
        </button>
      </div>
    </div>
  );
};
