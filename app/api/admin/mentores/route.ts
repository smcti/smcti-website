// app/api/admin/mentores/route.ts
// Gestão de Mentores (CRUD)
// Restrito a admin e gestor_mentorias

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongoose";
import Mentor from "@/lib/models/Mentor";
import { AuditLog } from "@/lib/models/AuditLog";

export const dynamic = "force-dynamic";

// Helper: verifica se o usuário é admin ou gestor_mentorias
async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session) return { ok: false, error: "Não autenticado.", status: 401, session: null };
  const role = session.user?.role;
  if (role !== "admin" && role !== "gestor_mentorias") {
    return { ok: false, error: "Acesso negado.", status: 403, session: null };
  }
  return { ok: true, error: null, status: 200, session };
}

function getIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

// GET: Lista todos os mentores
export async function GET(req: NextRequest) {
  const auth = await requireAuth();
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  try {
    await dbConnect();
    const mentors = await Mentor.find({}).sort({ name: 1 }).lean();
    return NextResponse.json({ mentors }, { status: 200 });
  } catch (error: any) {
    console.error("Erro ao listar mentores:", error.message);
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}

// POST: Cria um novo mentor
export async function POST(req: NextRequest) {
  const auth = await requireAuth();
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  try {
    await dbConnect();
    const body = await req.json();
    const { name, role, email, phone, category, description, totalSlots, photo } = body;

    if (!name || !role || !email || !category || !description) {
      return NextResponse.json({ error: "Campos obrigatórios faltando." }, { status: 400 });
    }

    const newMentor = new Mentor({
      name,
      role,
      email,
      phone,
      category,
      description,
      totalSlots: totalSlots || 3,
      availableSlots: totalSlots || 3, // Inicia com as vagas completas
      photo: photo || "/assets/images/avatar.png",
    });

    await newMentor.save();

    await AuditLog.create({
      action: "CREATE_MENTOR" as any, // Podemos ignorar o tipo estrito do enum do AuditLog aqui ou expandi-lo depois
      performedBy: auth.session!.user?.email || "unknown",
      targetEmail: email,
      details: `Mentor ${name} criado.`,
      ip: getIp(req),
    });

    return NextResponse.json({ message: "Mentor criado com sucesso", mentor: newMentor }, { status: 201 });
  } catch (error: any) {
    console.error("Erro ao criar mentor:", error.message);
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}

// PUT: Atualiza um mentor existente
export async function PUT(req: NextRequest) {
  const auth = await requireAuth();
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  try {
    await dbConnect();
    const body = await req.json();
    const { id, name, role, email, phone, category, description, totalSlots, photo } = body;

    if (!id) return NextResponse.json({ error: "ID obrigatório." }, { status: 400 });

    const mentor = await Mentor.findById(id);
    if (!mentor) return NextResponse.json({ error: "Mentor não encontrado." }, { status: 404 });

    // Se o total de vagas aumentou, aumenta as disponíveis
    if (totalSlots !== undefined && totalSlots > mentor.totalSlots) {
      const diff = totalSlots - mentor.totalSlots;
      mentor.availableSlots += diff;
    }
    
    // Se diminuiu, ajusta (garantindo que não fique negativo)
    if (totalSlots !== undefined && totalSlots < mentor.totalSlots) {
      const diff = mentor.totalSlots - totalSlots;
      mentor.availableSlots = Math.max(0, mentor.availableSlots - diff);
    }

    mentor.name = name || mentor.name;
    mentor.role = role || mentor.role;
    mentor.email = email || mentor.email;
    if (phone !== undefined) mentor.phone = phone;
    mentor.category = category || mentor.category;
    mentor.description = description || mentor.description;
    if (totalSlots !== undefined) mentor.totalSlots = totalSlots;
    if (photo !== undefined) mentor.photo = photo;

    await mentor.save();

    await AuditLog.create({
      action: "UPDATE_MENTOR" as any,
      performedBy: auth.session!.user?.email || "unknown",
      targetEmail: mentor.email,
      details: `Mentor ${mentor.name} atualizado.`,
      ip: getIp(req),
    });

    return NextResponse.json({ message: "Mentor atualizado com sucesso", mentor }, { status: 200 });
  } catch (error: any) {
    console.error("Erro ao atualizar mentor:", error.message);
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}

// DELETE: Remove um mentor
export async function DELETE(req: NextRequest) {
  const auth = await requireAuth();
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "ID obrigatório." }, { status: 400 });

    const mentor = await Mentor.findById(id);
    if (!mentor) return NextResponse.json({ error: "Mentor não encontrado." }, { status: 404 });

    const mentorEmail = mentor.email;
    const mentorName = mentor.name;

    await mentor.deleteOne();

    await AuditLog.create({
      action: "DELETE_MENTOR" as any,
      performedBy: auth.session!.user?.email || "unknown",
      targetEmail: mentorEmail,
      details: `Mentor ${mentorName} excluído.`,
      ip: getIp(req),
    });

    return NextResponse.json({ message: "Mentor removido com sucesso." }, { status: 200 });
  } catch (error: any) {
    console.error("Erro ao remover mentor:", error.message);
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}
