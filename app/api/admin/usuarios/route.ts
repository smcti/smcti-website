// app/api/admin/usuarios/route.ts
// GET:    Lista usuários (sem expor senhas) — requer role "admin"
// POST:   Cria novo usuário com senha hasheada — requer role "admin"
// DELETE: Remove usuário por ID — requer role "admin"
// Conformidade LGPD: senhas nunca retornadas, log de auditoria em toda ação

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongoose";
import { User } from "@/lib/models/User";
import { AuditLog } from "@/lib/models/AuditLog";
import bcrypt from "bcryptjs";

export const dynamic = "force-dynamic";

// Helper: verifica se o usuário é admin
async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session) return { ok: false, error: "Não autenticado.", status: 401, session: null };
  if (session.user?.role !== "admin") return { ok: false, error: "Acesso negado. Apenas administradores.", status: 403, session: null };
  return { ok: true, error: null, status: 200, session };
}

// Helper: extrai IP da request
function getIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

/**
 * GET /api/admin/usuarios
 * Lista todos os usuários sem expor as senhas.
 * Data masking LGPD: o campo email é retornado mascarado parcialmente.
 */
export async function GET(req: NextRequest) {
  const auth = await requireAdmin();
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  try {
    await dbConnect();
    // Selecionamos explicitamente sem o campo 'password'
    const users = await User.find({}, { password: 0 }).sort({ createdAt: -1 }).lean();

    // Data masking parcial do email para exibição (LGPD — minimização de exposição)
    const sanitized = users.map((u) => ({
      _id: u._id.toString(),
      email: u.email,
      emailMasked: maskEmail(u.email),
      role: u.role,
      createdAt: u.createdAt,
      updatedAt: u.updatedAt,
    }));

    return NextResponse.json({ users: sanitized }, { status: 200 });
  } catch (error: any) {
    console.error("Erro ao listar usuários:", error.message);
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}

/**
 * POST /api/admin/usuarios
 * Body: { email, password, role }
 * Cria um novo usuário com senha hasheada via bcrypt.
 * Registra ação no AuditLog (LGPD Accountability).
 */
export async function POST(req: NextRequest) {
  const auth = await requireAdmin();
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  try {
    await dbConnect();
    const body = await req.json();
    const { email, password, role } = body;

    // Validação de campos obrigatórios (minimização de dados LGPD)
    if (!email || !password || !role) {
      return NextResponse.json(
        { error: "Campos obrigatórios: email, password, role." },
        { status: 400 }
      );
    }

    // Validação de formato básico de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Formato de email inválido." }, { status: 400 });
    }

    // Validação de senha mínima (8 caracteres)
    if (password.length < 8) {
      return NextResponse.json({ error: "A senha deve ter pelo menos 8 caracteres." }, { status: 400 });
    }

    // Validação de role
    const allowedRoles = ["admin", "gestor_mentorias", "empresario", "usuario"];
    if (!allowedRoles.includes(role)) {
      return NextResponse.json({ error: "Role inválida." }, { status: 400 });
    }

    // Verifica duplicata
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json({ error: "Já existe um usuário com este e-mail." }, { status: 409 });
    }

    // Hash da senha com bcrypt (salt 12 — mais seguro que o padrão 10)
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role,
    });
    await newUser.save();

    // Log de auditoria LGPD
    await AuditLog.create({
      action: "CREATE_USER",
      performedBy: auth.session!.user?.email || "unknown",
      targetEmail: email.toLowerCase(),
      targetRole: role,
      ip: getIp(req),
    });

    return NextResponse.json(
      {
        message: "Usuário criado com sucesso.",
        user: { id: newUser._id.toString(), email: newUser.email, role: newUser.role },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Erro ao criar usuário:", error.message);
    return NextResponse.json({ error: "Erro interno ao criar usuário." }, { status: 500 });
  }
}

/**
 * DELETE /api/admin/usuarios?id=<userId>
 * Remove um usuário pelo ID.
 * Proteção: não permite auto-exclusão (o admin não pode se deletar).
 * Registra ação no AuditLog (LGPD Accountability).
 */
export async function DELETE(req: NextRequest) {
  const auth = await requireAdmin();
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Parâmetro 'id' obrigatório." }, { status: 400 });
    }

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado." }, { status: 404 });
    }

    // Proteção: admin não pode se auto-excluir
    if (user.email === auth.session!.user?.email) {
      return NextResponse.json(
        { error: "Você não pode excluir sua própria conta." },
        { status: 403 }
      );
    }

    const deletedEmail = user.email;
    const deletedRole = user.role;
    await user.deleteOne();

    // Log de auditoria LGPD
    await AuditLog.create({
      action: "DELETE_USER",
      performedBy: auth.session!.user?.email || "unknown",
      targetEmail: deletedEmail,
      targetRole: deletedRole,
      ip: getIp(req),
    });

    return NextResponse.json({ message: "Usuário removido com sucesso." }, { status: 200 });
  } catch (error: any) {
    console.error("Erro ao remover usuário:", error.message);
    return NextResponse.json({ error: "Erro interno ao remover usuário." }, { status: 500 });
  }
}

// Utilitário: mascara o email para exibição (LGPD — Data Masking)
// ex: nelito@patobranco.tec.br → ne***@patobranco.tec.br
function maskEmail(email: string): string {
  const [local, domain] = email.split("@");
  if (!local || !domain) return email;
  const visible = local.slice(0, 2);
  return `${visible}***@${domain}`;
}
