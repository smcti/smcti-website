// app/painel-admin/usuarios/page.tsx
// Server Component: verifica sessão e role antes de renderizar
// Acesso exclusivo para role "admin"

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import UsuariosClient from "./usuariosclient";

export const dynamic = "force-dynamic";

export default async function UsuariosAdmin() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  // Acesso restrito: somente admins
  if (session.user?.role !== "admin") {
    redirect("/acesso-negado");
  }

  const adminEmail = session.user?.email || "";
  return <UsuariosClient adminEmail={adminEmail} />;
}
