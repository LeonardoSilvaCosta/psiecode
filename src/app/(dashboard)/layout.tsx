"use client";

import { Sidebar } from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <Sidebar />
      <main className="md:pl-64 pt-16 md:pt-0">{children}</main>
    </div>
  );
}
