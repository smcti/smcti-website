// app/api/mentores/route.ts
// GET: Lista todos os mentores com suas vagas disponíveis
// LGPD — Data Masking: o campo email do mentor é mascarado para o público
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Mentor from "@/lib/models/Mentor";

export const dynamic = "force-dynamic";

// Mascara o email: ne***@patobranco.tec.br
function maskEmail(email: string): string {
  if (!email) return "";
  const [local, domain] = email.split("@");
  if (!local || !domain) return email;
  return `${local.slice(0, 2)}***@${domain}`;
}

export async function GET() {
  try {
    await dbConnect();

    const mentors = await Mentor.find({})
      .select("name role photo description category email phone totalSlots availableSlots")
      .sort({ category: 1, name: 1 })
      .lean();

    // LGPD — Minimização: remover email real da resposta pública e retornar versão mascarada
    const sanitizedMentors = mentors.map((m) => ({
      _id: m._id,
      name: m.name,
      role: m.role,
      photo: m.photo,
      description: m.description,
      category: m.category,
      emailMasked: maskEmail(m.email as string), // exibe mascarado ao público
      // email real NÃO é retornado nesta rota pública
      phone: m.phone,
      totalSlots: m.totalSlots,
      availableSlots: m.availableSlots,
    }));

    return NextResponse.json({ mentors: sanitizedMentors }, { status: 200 });
  } catch (error: any) {
    console.error("Erro ao listar mentores:", error.message);
    return NextResponse.json(
      { error: "Erro interno ao buscar mentores." },
      { status: 500 }
    );
  }
}
