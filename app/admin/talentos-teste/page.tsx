import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getRedirectPathByRole } from "@/lib/auth/redirectByRole";
import TalentosTesteClient from "./TalentosTesteClient";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Teste Interno - Banco de Talentos',
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default async function TalentosTestePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  // Apenas admins podem acessar a página de teste
  const role = session.user?.role;
  if (role !== "admin") {
    redirect(getRedirectPathByRole(role));
  }

  return <TalentosTesteClient />;
}
