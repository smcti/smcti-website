// app/api/auth/cadastro-empresa/route.ts
// POST: Cadastra uma nova empresa com role "empresa"
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongoose";
import { User } from "@/lib/models/User";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      nomeEmpresa,
      nomeResponsavel,
      areaAtuacao,
      descricaoAtividades,
      email,
      confirmarEmail,
      senha,
    } = body;

    // 1. Validações básicas
    if (!nomeEmpresa || !nomeResponsavel || !areaAtuacao || !email || !confirmarEmail || !senha) {
      return NextResponse.json(
        { error: "Preencha todos os campos obrigatórios." },
        { status: 400 }
      );
    }

    if (email.toLowerCase() !== confirmarEmail.toLowerCase()) {
      return NextResponse.json(
        { error: "Os e-mails informados não coincidem." },
        { status: 400 }
      );
    }

    if (senha.length < 8) {
      return NextResponse.json(
        { error: "A senha deve ter no mínimo 8 caracteres." },
        { status: 400 }
      );
    }

    await dbConnect();

    // 2. Verifica se email já está cadastrado
    const existente = await User.findOne({ email: email.toLowerCase() });
    if (existente) {
      return NextResponse.json(
        { error: "Este e-mail já está cadastrado no sistema." },
        { status: 409 }
      );
    }

    // 3. Hash da senha
    const hashedPassword = await bcrypt.hash(senha, 12);

    // 4. Cria o usuário com role "empresa"
    await User.create({
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: "empresa",
      nomeEmpresa: nomeEmpresa.trim(),
      nomeResponsavel: nomeResponsavel.trim(),
      areaAtuacao: areaAtuacao.trim(),
      descricaoAtividades: descricaoAtividades?.trim() || "",
    });

    return NextResponse.json(
      { message: "Empresa cadastrada com sucesso! Faça login para continuar." },
      { status: 201 }
    );
  } catch (error: any) {
    // Erro de duplicata pelo índice único do MongoDB
    if (error.code === 11000) {
      return NextResponse.json(
        { error: "Este e-mail já está cadastrado no sistema." },
        { status: 409 }
      );
    }
    console.error("Erro ao cadastrar empresa:", error.message);
    return NextResponse.json(
      { error: "Erro interno ao processar o cadastro. Tente novamente." },
      { status: 500 }
    );
  }
}
