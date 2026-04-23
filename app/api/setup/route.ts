import { NextResponse } from "next/server";
import { User } from "@/lib/models/User";
import Mentor from "@/lib/models/Mentor";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongoose";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    await dbConnect();

    const adminEmail = "admin@patobranco.tec.br";
    const nelitoEmail = "nelito@patobranco.tec.br";

    const results: any[] = [];

    // ───── Usuários (tabela auth) ─────

    const existingAdmin = await User.findOne({ email: adminEmail });
    const existingNelito = await User.findOne({ email: nelitoEmail });

    if (!existingAdmin) {
      const plainPasswordAdmin = "admin";
      const hashedPasswordAdmin = await bcrypt.hash(plainPasswordAdmin, 12);
      const newAdmin = new User({ email: adminEmail, password: hashedPasswordAdmin, role: "admin" });
      await newAdmin.save();
      results.push({ type: "user", email: adminEmail, password: plainPasswordAdmin, role: "admin" });
    }

    if (!existingNelito) {
      const plainPasswordNelito = "nelito";
      const hashedPasswordNelito = await bcrypt.hash(plainPasswordNelito, 12);
      const newNelito = new User({ email: nelitoEmail, password: hashedPasswordNelito, role: "gestor_mentorias" });
      await newNelito.save();
      results.push({ type: "user", email: nelitoEmail, password: plainPasswordNelito, role: "gestor_mentorias" });
    }

    // ───── Mentores (tabela mentors) ─────
    // Cadastra Ana e Nelito como mentores ativos no sistema de mentoria (atualiza se já existirem)

    const nelitoMentorEmail = "itecpb@patobranco.tec.br";
    const anaEmail = "diretora.itecpb@patobranco.tec.br";

    const upsertNelito = await Mentor.findOneAndUpdate(
      { email: nelitoMentorEmail },
      {
        name: "Nelito Antônio Zanmaria",
        role: "Assistente de Gestão",
        photo: "/assets/images/nelito.png",
        description:
          "Assistente de Gestão da ITECPB com experiência em processos internos, atendimento às startups incubadas e apoio ao desenvolvimento institucional do Parque Tecnológico de Pato Branco.",
        category: "gestao",
        email: nelitoMentorEmail,
        phone: "(46) 9115-3505",
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    results.push({ type: "mentor", name: upsertNelito.name, category: "gestao", action: "upserted" });

    const upsertAna = await Mentor.findOneAndUpdate(
      { email: anaEmail },
      {
        name: "Ana Claudia Marques",
        role: "Assessora do Departamento de Incubadora",
        photo: "/assets/images/ana.png",
        description:
          "Assessora do Departamento de Incubadora da ITECPB, com atuação direta no suporte estratégico às empresas incubadas, gestão de processos e articulação com parceiros institucionais.",
        category: "gestao",
        email: anaEmail,
        phone: "(46) 9937-2377",
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    results.push({ type: "mentor", name: upsertAna.name, category: "gestao", action: "upserted" });

    if (results.length === 0) {
      return NextResponse.json(
        { message: "Todos os usuários e mentores já estão cadastrados." },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        message: "Setup concluído com sucesso!",
        created: results,
        alert:
          "⚠️ Por segurança, altere as senhas padrão imediatamente e desative esta rota em produção.",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Erro no setup:", error);
    return NextResponse.json(
      { message: "Erro ao executar setup", error: error.message },
      { status: 500 }
    );
  }
}
