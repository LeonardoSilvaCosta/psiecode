"use client";

import { redirect } from "next/navigation";

export default function DashboardRootPage() {
  // Redireciona para a página principal do dashboard
  redirect("/dashboard");
}
