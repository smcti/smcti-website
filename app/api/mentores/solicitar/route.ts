// app/api/mentores/solicitar/route.ts
// POST: Cria uma nova solicitação de mentoria
// Exige autenticação e role "empresa" ou "admin"
// Os dados de nome e email da empresa vêm da sessão do usuário logado
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongoose";
import Mentor from "@/lib/models/Mentor";
import MentorshipRequest from "@/lib/models/MentorshipRequest";
import { User } from "@/lib/models/User";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    // 1. Autenticação obrigatória
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: "Não autorizado. Faça login primeiro." },
        { status: 401 }
      );
    }

    // 2. Verificação de role — apenas "empresa" ou "admin"
    const role = session.user?.role;
    if (role !== "empresa" && role !== "admin") {
      return NextResponse.json(
        { error: "Apenas empresas cadastradas podem solicitar mentoria." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { mentorId } = body;

    if (!mentorId) {
      return NextResponse.json(
        { error: "Campo obrigatório: mentorId." },
        { status: 400 }
      );
    }

    await dbConnect();

    // 3. Busca dados do usuário logado no banco para obter nome da empresa e email
    const userDoc = await User.findOne({ email: session.user.email }).lean();
    const incubadoEmail = session.user.email;
    // Para admin, usa o email como nome se não houver nomeEmpresa
    const incubadoName =
      (userDoc as any)?.nomeEmpresa || session.user.email;

    // 4. Verifica se o mentor existe e tem vagas
    const mentor = await Mentor.findById(mentorId);
    if (!mentor) {
      return NextResponse.json(
        { error: "Mentor não encontrado." },
        { status: 404 }
      );
    }

    if (mentor.availableSlots <= 0) {
      return NextResponse.json(
        { error: "Este mentor não possui vagas disponíveis no momento." },
        { status: 409 }
      );
    }

    // 5. Calcula o mês de referência atual (formato "YYYY-MM")
    const now = new Date();
    const mesReferencia = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

    // 6. Verifica se já existe solicitação para o mesmo mentor/empresa/mês
    const existingRequest = await MentorshipRequest.findOne({
      mentorId,
      incubadoEmail,
      mesReferencia,
    });

    if (existingRequest) {
      return NextResponse.json(
        { error: `Você já possui uma solicitação para ${mentor.name} neste mês.` },
        { status: 409 }
      );
    }

    // 7. Cria a solicitação com status "Pendente"
    const newRequest = await MentorshipRequest.create({
      mentorId,
      mentorName: mentor.name,
      incubadoName,
      incubadoEmail,
      status: "Pendente",
      mesReferencia,
      solicitadoEm: new Date(),
    });

    return NextResponse.json(
      {
        message: "Solicitação enviada com sucesso! Aguarde a aprovação da administração.",
        request: newRequest,
      },
      { status: 201 }
    );
  } catch (error: any) {
    // Erro de duplicata pelo índice único
    if (error.code === 11000) {
      return NextResponse.json(
        { error: "Solicitação duplicada: você já solicitou mentoria com este mentor neste mês." },
        { status: 409 }
      );
    }

    console.error("Erro ao criar solicitação de mentoria:", error.message);
    return NextResponse.json(
      { error: "Erro interno ao processar a solicitação." },
      { status: 500 }
    );
  }
}
