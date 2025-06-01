"use client";

import { redirect } from "next/navigation";

export default function RootPage() {
  // Redireciona para a homepage no marketing group
  redirect("/home");
}
