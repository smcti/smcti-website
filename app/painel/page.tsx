import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import PainelClient from "./painelclient";

// 1. FORÇA O NEXT.JS A NUNCA USAR CACHE NESTA PÁGINA
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function PainelEmpresa() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  const client = await clientPromise;
  const db = client.db("banco_parque");
  
  const curriculosRaw = await db.collection("curriculos").find({}).sort({ dataEnvio: -1 }).toArray();

  // 2. O MAPEAMENTO CORRIGIDO DA PONTE (DB -> FRONTEND)
  const curriculos = curriculosRaw.map(doc => ({
    _id: doc._id.toString(),
    nome: doc.nome || "",
    email: doc.email || "",
    telefone: doc.telefone || "",
    categorias: Array.isArray(doc.categorias) ? doc.categorias : [],
    formacao: doc.formacao || "",
    objetivo: doc.objetivo || "",
    pdfFileId: doc.pdfFileId ? doc.pdfFileId.toString() : "",
    dataEnvio: doc.dataEnvio ? doc.dataEnvio.toISOString() : new Date().toISOString(),
    
    // 👇👇👇 AQUI ESTAVA O SEU PROBLEMA 👇👇👇
    // Se você não mapear esses três campos aqui, o PainelClient fica "cego" e reseta as abas
    status: doc.status || "disponivel",
    interessados: Array.isArray(doc.interessados) ? doc.interessados : [],
    empresaFinal: doc.empresaFinal || ""
  }));

  return <PainelClient initialData={curriculos} userEmail={session.user?.email || ""} />;
}