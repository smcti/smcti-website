// app/api/mentores/reset-slots/route.ts
// POST: Reseta as vagas dos mentores para o valor total (totalSlots)
// Aceita dois modos de autenticação:
//   1. CRON: via header Authorization: Bearer <CRON_SECRET> (Cloud Scheduler)
//   2. ADMIN: via sessão NextAuth com role "admin" (reset manual pelo painel)
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongoose";
import Mentor from "@/lib/models/Mentor";
import { AuditLog } from "@/lib/models/AuditLog";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    let performedBy = "cron";

    // Modo 1: Autenticação via CRON_SECRET (Cloud Scheduler)
    const authHeader = req.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    const isCronAuth = cronSecret && authHeader === `Bearer ${cronSecret}`;

    // Modo 2: Autenticação via sessão NextAuth (admin manual)
    const session = await getServerSession(authOptions);
    const isAdminAuth = session?.user?.role === "admin";

    if (!isCronAuth && !isAdminAuth) {
      return NextResponse.json(
        { error: "Não autorizado. Use o CRON_SECRET ou esteja logado como admin." },
        { status: 401 }
      );
    }

    if (isAdminAuth) {
      performedBy = session!.user?.email || "admin";
    }

    // Conecta ao banco e reseta todas as vagas para totalSlots
    await dbConnect();

    const result = await Mentor.updateMany(
      {},
      [{ $set: { availableSlots: "$totalSlots" } }]
    );

    const now = new Date();
    console.log(
      `🔄 Reset de vagas executado em ${now.toISOString()} por ${performedBy}. ` +
      `${result.modifiedCount} mentor(es) resetado(s).`
    );

    // Log de auditoria LGPD
    await AuditLog.create({
      action: "RESET_SLOTS",
      performedBy,
      details: `${result.modifiedCount} mentor(es) tiveram as vagas resetadas para totalSlots.`,
    });

    return NextResponse.json(
      {
        message: "Vagas dos mentores resetadas com sucesso.",
        modifiedCount: result.modifiedCount,
        executedAt: now.toISOString(),
        performedBy,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Erro ao resetar vagas dos mentores:", error.message);
    return NextResponse.json(
      { error: "Erro interno ao resetar vagas." },
      { status: 500 }
    );
  }
}
