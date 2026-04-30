import { NextResponse } from "next/server";
import { getClientPromise } from "@/lib/mongodb";
import { GridFSBucket } from "mongodb";
import { Readable } from "stream";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Sanitização básica: remove espaços em branco extras e padroniza o email
    const nome = (formData.get("nome") as string || "").trim();
    const email = (formData.get("email") as string || "").trim().toLowerCase();
    const telefone = (formData.get("telefone") as string || "").trim();
    const objetivo = (formData.get("objetivo") as string || "").trim();
    const formacao = (formData.get("formacao") as string || "").trim();
    const pdfFile = formData.get("pdf") as File | null;

    // Tratamento seguro do array de categorias (Evita crash se vier um dado inválido)
    let categorias: string[] = [];
    try {
      const categoriasRaw = formData.get("categorias") as string;
      if (categoriasRaw) {
        categorias = JSON.parse(categoriasRaw);
      }
    } catch (e) {
      return NextResponse.json({ error: "Formato de categorias inválido." }, { status: 400 });
    }

    // 1. Validações Rigorosas
    if (!pdfFile || pdfFile.type !== "application/pdf") {
      return NextResponse.json({ error: "O arquivo é obrigatório e deve ser um PDF válido." }, { status: 400 });
    }

    if (!Array.isArray(categorias) || categorias.length === 0 || categorias.length > 3) {
      return NextResponse.json({ error: "Selecione entre 1 e 3 áreas de atuação." }, { status: 400 });
    }

    if (!nome || !email || !telefone) {
      return NextResponse.json({ error: "Preencha todos os campos obrigatórios." }, { status: 400 });
    }

    const client = await getClientPromise();
    const db = client.db("banco_parque");

    // 2. Bloqueio de Duplicatas (Apenas por Email)
    // Nota: É mais seguro bloquear apenas pelo email. Bloquear pelo nome pode barrar pessoas com o mesmo nome (homônimos).
    const existente = await db.collection("curriculos").findOne({ email: email });

    if (existente) {
      return NextResponse.json({ error: "Este e-mail já possui um currículo ativo no banco de talentos." }, { status: 400 });
    }

    // 3. Upload do PDF para o GridFS
    const bucket = new GridFSBucket(db, { bucketName: "curriculos_pdfs" });
    const arrayBuffer = await pdfFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const readableStream = Readable.from(buffer);

    const uploadStream = bucket.openUploadStream(pdfFile.name, {
      metadata: { contentType: pdfFile.type },
    });

    const fileId = await new Promise((resolve, reject) => {
      readableStream
        .pipe(uploadStream)
        .on("error", (error) => reject(error))
        .on("finish", () => resolve(uploadStream.id));
    });

    // 4. Inserção no Banco de Dados com os Status Iniciais
    await db.collection("curriculos").insertOne({
      nome,
      email,
      telefone,
      objetivo,
      categorias,
      formacao,
      pdfFileId: fileId,
      status: "disponivel", // Garante que caia na aba correta do painel
      interessados: [],     // Array vazio para começar
      dataEnvio: new Date(),
    });

    // 5. Criação do Índice TTL para exclusão em 6 meses (180 dias)
    // Removi o 'await' para que o banco faça isso em background, respondendo mais rápido ao usuário.
    db.collection("curriculos").createIndex(
      { "dataEnvio": 1 },
      { expireAfterSeconds: 15552000 }
    ).catch(console.error);

    return NextResponse.json({ success: true, message: "Currículo salvo com sucesso!" });

  } catch (error) {
    console.error("Erro ao salvar currículo:", error);
    return NextResponse.json({ error: "Erro interno no servidor ao processar o currículo." }, { status: 500 });
  }
}