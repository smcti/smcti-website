// app/painel-admin/usuarios/page.tsx
// Server Component: verifica sessão e role antes de renderizar
// Acesso exclusivo para role "admin"

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getRedirectPathByRole } from "@/lib/auth/redirectByRole";
import UsuariosClient from "./usuariosclient";

export const dynamic = "force-dynamic";

export default async function UsuariosAdmin() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  // Acesso restrito: somente admins
  if (session.user?.role !== "admin") {
    redirect(getRedirectPathByRole(session.user?.role));
  }

  const adminEmail = session.user?.email || "";
  return <UsuariosClient adminEmail={adminEmail} />;
}
