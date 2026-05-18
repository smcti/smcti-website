// app/api/admin/talentos/route.ts
// Rota protegida — busca/listagem de talentos com filtro server-side para a página de teste
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getClientPromise } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  // 1. Autenticação — somente admins
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }
  const role = (session.user as any)?.role;
  if (role !== "admin") {
    return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
  }

  // 2. Parâmetros de busca vindos da URL
  const { searchParams } = req.nextUrl;
  const q = (searchParams.get("q") ?? "").trim();
  const categoria = (searchParams.get("categoria") ?? "").trim();
  const status = (searchParams.get("status") ?? "").trim();

  try {
    const client = await getClientPromise();
    const db = client.db("banco_parque");

    // 3. Filtro construído no backend
    const filter: Record<string, any> = {};

    if (q) {
      filter.$or = [
        { nome: { $regex: q, $options: "i" } },
        { formacao: { $regex: q, $options: "i" } },
        { objetivo: { $regex: q, $options: "i" } },
        { categorias: { $regex: q, $options: "i" } },
      ];
    }

    if (categoria && categoria !== "Todas") {
      filter.categorias = { $in: [categoria] };
    }

    if (status && status !== "todos") {
      filter.status = status;
    }

    const docs = await db
      .collection("curriculos")
      .find(filter)
      .sort({ dataEnvio: -1 })
      .toArray();

    // 4. Serializar — expor apenas campos necessários, sem dados internos
    const talentos = docs.map((d) => ({
      _id: d._id.toString(),
      nome: d.nome || "",
      categorias: Array.isArray(d.categorias) ? d.categorias : [],
      formacao: d.formacao || "",
      objetivo: d.objetivo || "",
      email: d.email || "",
      telefone: d.telefone || "",
      pdfFileId: d.pdfFileId ? d.pdfFileId.toString() : "",
      status: d.status || "disponivel",
      interessados: Array.isArray(d.interessados) ? d.interessados : [],
      empresaFinal: d.empresaFinal || "",
      dataEnvio: d.dataEnvio ? d.dataEnvio.toISOString() : new Date().toISOString(),
    }));

    return NextResponse.json({ talentos, total: talentos.length });
  } catch (err) {
    console.error("[/api/admin/talentos] Erro:", err);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
