import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import MentoriasClient from "./mentoriasclient";

export const dynamic = "force-dynamic";

export default async function MentoriasAdmin() {
  const session = await getServerSession(authOptions);

  // Trava 1: Se não estiver logado, manda para o login
  if (!session) {
    redirect("/login");
  }

  // Trava 2 (RBAC): Aceita admin E gestor_mentorias (role do Nelito)
  // ANTES estava só "admin", causando o "Acesso Negado" para o Nelito
  const role = session.user?.role;
  if (role !== "admin" && role !== "gestor_mentorias") {
    redirect("/acesso-negado");
  }

  const userEmail = session.user?.email || "";

  return <MentoriasClient userEmail={userEmail} userRole={role} />;
}
