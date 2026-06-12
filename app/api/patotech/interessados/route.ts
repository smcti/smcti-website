import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type IncomingInterest = {
  nome?: unknown;
  name?: unknown;
  email?: unknown;
  interesse?: unknown;
  interest?: unknown;
};

type InterestRecord = {
  id: string;
  nome: string;
  email: string;
  interesse: string;
  criadoEm: string;
};

const interessadosFilePath = path.join(
  process.cwd(),
  "app",
  "patotech",
  "interessados",
  "interessados.json"
);

const getString = (value: unknown) => (typeof value === "string" ? value.trim() : "");

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const readInterestRecords = async (): Promise<InterestRecord[]> => {
  try {
    const fileContent = await fs.readFile(interessadosFilePath, "utf8");
    const parsedContent = JSON.parse(fileContent);

    return Array.isArray(parsedContent) ? parsedContent : [];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }

    throw error;
  }
};

export async function POST(request: Request) {
  let body: IncomingInterest;

  try {
    body = (await request.json()) as IncomingInterest;
  } catch {
    return NextResponse.json({ message: "Dados enviados em formato invalido." }, { status: 400 });
  }

  const nome = getString(body.nome ?? body.name);
  const email = getString(body.email).toLowerCase();
  const interesse = getString(body.interesse ?? body.interest) || "Novidades do PatoTech";

  if (!nome || !email) {
    return NextResponse.json({ message: "Informe nome e e-mail." }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ message: "Informe um e-mail valido." }, { status: 400 });
  }

  try {
    const interestRecords = await readInterestRecords();

    interestRecords.push({
      id: randomUUID(),
      nome,
      email,
      interesse,
      criadoEm: new Date().toISOString(),
    });

    await fs.mkdir(path.dirname(interessadosFilePath), { recursive: true });
    await fs.writeFile(
      interessadosFilePath,
      `${JSON.stringify(interestRecords, null, 2)}\n`,
      "utf8"
    );

    return NextResponse.json({ message: "Interesse registrado com sucesso." }, { status: 201 });
  } catch (error) {
    console.error("Erro ao registrar interessado do PatoTech:", error);

    return NextResponse.json(
      { message: "Nao foi possivel registrar o interesse agora." },
      { status: 500 }
    );
  }
}
