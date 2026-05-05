// app/api/mentores/admin/route.ts
// GET: Lista solicitações (filtráveis por status)
// PATCH: Aprova ou rejeita uma solicitação
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongoose";
import Mentor from "@/lib/models/Mentor";
import MentorshipRequest from "@/lib/models/MentorshipRequest";
import { sendApprovalEmail, sendRejectionEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

// Middleware: verifica se o usuário é admin ou gestor_mentorias
async function checkAdmin() {
  const session = await getServerSession(authOptions);
  if (!session) return { authorized: false, error: "Não autenticado.", status: 401 };
  const role = session.user?.role;
  if (role !== "admin" && role !== "gestor_mentorias") {
    return { authorized: false, error: "Acesso negado. Apenas administradores e gestores.", status: 403 };
  }
  return { authorized: true, session };
}

/**
 * GET /api/mentores/admin?status=Pendente
 * Lista todas as solicitações, opcionalmente filtradas por status
 */
export async function GET(req: NextRequest) {
  const auth = await checkAdmin();
  if (!auth.authorized) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const statusFilter = searchParams.get("status");

    const filter: any = {};
    if (statusFilter && ["Pendente", "Aprovado", "Rejeitado"].includes(statusFilter)) {
      filter.status = statusFilter;
    }

    const requests = await MentorshipRequest.find(filter)
      .sort({ solicitadoEm: -1 })
      .lean();

    return NextResponse.json({ requests }, { status: 200 });
  } catch (error: any) {
    console.error("Erro ao listar solicitações:", error.message);
    return NextResponse.json(
      { error: "Erro interno ao buscar solicitações." },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/mentores/admin
 * Body: { requestId, action: "aprovar" | "rejeitar", motivoRejeicao?: string }
 */
export async function PATCH(req: NextRequest) {
  const auth = await checkAdmin();
  if (!auth.authorized) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    await dbConnect();

    const body = await req.json();
    const { requestId, action, motivoRejeicao } = body;

    if (!requestId || !action) {
      return NextResponse.json(
        { error: "Campos obrigatórios: requestId, action (aprovar/rejeitar)." },
        { status: 400 }
      );
    }

    if (!["aprovar", "rejeitar"].includes(action)) {
      return NextResponse.json(
        { error: "Ação inválida. Use 'aprovar' ou 'rejeitar'." },
        { status: 400 }
      );
    }

    // Busca a solicitação
    const request = await MentorshipRequest.findById(requestId);
    if (!request) {
      return NextResponse.json(
        { error: "Solicitação não encontrada." },
        { status: 404 }
      );
    }

    if (request.status !== "Pendente") {
      return NextResponse.json(
        { error: `Esta solicitação já foi ${request.status.toLowerCase()}.` },
        { status: 409 }
      );
    }

    if (action === "aprovar") {
      // 1. Busca o mentor e decrementa as vagas
      const mentor = await Mentor.findById(request.mentorId);
      if (!mentor) {
        return NextResponse.json(
          { error: "Mentor associado não encontrado." },
          { status: 404 }
        );
      }

      if (mentor.availableSlots <= 0) {
        return NextResponse.json(
          { error: "O mentor não possui mais vagas disponíveis." },
          { status: 409 }
        );
      }

      // Decrementa atomicamente as vagas
      await Mentor.findByIdAndUpdate(request.mentorId, {
        $inc: { availableSlots: -1 },
      });

      // 2. Atualiza o status da solicitação
      request.status = "Aprovado";
      request.resolvidoEm = new Date();
      await request.save();

      // 3. Envia e-mail de confirmação (async, não bloqueia a resposta)
      sendApprovalEmail(
        request.incubadoEmail,
        request.incubadoName,
        request.mentorName,
        request.mesReferencia
      );

      return NextResponse.json(
        { message: "Solicitação aprovada com sucesso!", request },
        { status: 200 }
      );
    }

    if (action === "rejeitar") {
      // Atualiza o status sem tocar nas vagas do mentor
      request.status = "Rejeitado";
      request.motivoRejeicao = motivoRejeicao || "";
      request.resolvidoEm = new Date();
      await request.save();

      // Envia e-mail de notificação (async)
      sendRejectionEmail(
        request.incubadoEmail,
        request.incubadoName,
        request.mentorName,
        request.mesReferencia,
        motivoRejeicao || "Motivo não especificado pela administração."
      );

      return NextResponse.json(
        { message: "Solicitação rejeitada.", request },
        { status: 200 }
      );
    }
  } catch (error: any) {
    console.error("Erro na triagem de mentoria:", error.message);
    return NextResponse.json(
      { error: "Erro interno ao processar a ação." },
      { status: 500 }
    );
  }
}
