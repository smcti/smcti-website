import { getClientPromise } from "@/lib/mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AdminClient from "./adminclient";

export const dynamic = "force-dynamic";

export default async function PainelAdmin() {
  const session = await getServerSession(authOptions);

  // 1. Trava 1: Se não estiver logado, manda para o login
  if (!session) {
    redirect("/api/auth/signin");
  }

  // 2. Trava 2 (RBAC): Verifica a 'role' injetada pelo NextAuth.
  // Se não for 'admin', redireciona para a visão restrita das empresas
  if (session.user?.role !== "admin") {
    redirect("/painel");
  }

  // Pegamos o email para passar para o componente Client desenhar na tela
  const userEmail = session.user?.email || "";

  // Se passou pelas duas travas, o usuário é comprovadamente um admin. O código continua...
  const client = await getClientPromise();
  const db = client.db("banco_parque");

  const curriculosRaw = await db.collection("curriculos").find({}).sort({ dataEnvio: -1 }).toArray();

  const curriculos = curriculosRaw.map(doc => ({
    _id: doc._id.toString(),
    nome: doc.nome || "",
    email: doc.email || "",
    telefone: doc.telefone || "",
    categorias: Array.isArray(doc.categorias) ? doc.categorias : [],
    pdfFileId: doc.pdfFileId ? doc.pdfFileId.toString() : "",
    dataEnvio: doc.dataEnvio ? doc.dataEnvio.toISOString() : new Date().toISOString(),
    status: doc.status || "disponivel",
    empresaFinal: doc.empresaFinal || ""
  }));

  return <AdminClient initialData={curriculos} userEmail={userEmail} />;
}