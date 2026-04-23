// app/painel-admin/mentores/page.tsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import MentoresClient from "./mentoresclient";

export const dynamic = "force-dynamic";

export default async function MentoresAdmin() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  // Acesso restrito: admins ou gestores de mentoria
  const role = session.user?.role;
  if (role !== "admin" && role !== "gestor_mentorias") {
    redirect("/acesso-negado");
  }

  const userEmail = session.user?.email || "";
  return <MentoresClient userEmail={userEmail} userRole={role} />;
}
