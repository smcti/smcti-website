import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { GridFSBucket, ObjectId } from "mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // 1. Proteção de Rota: Verifica se o usuário (empresa) está logado
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse("Acesso Negado", { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("banco_parque");
    const bucket = new GridFSBucket(db, { bucketName: "curriculos_pdfs" });

    // 2. Validação do ID: Verifica se o ID enviado é um ObjectId válido do Mongo
    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "ID de arquivo inválido" }, { status: 400 });
    }

    const fileId = new ObjectId(params.id);

    // 3. Verificação de existência: Busca os metadados antes de tentar o stream
    const fileMetadata = await db
      .collection("curriculos_pdfs.files")
      .findOne({ _id: fileId });

    if (!fileMetadata) {
      return NextResponse.json({ error: "PDF não encontrado" }, { status: 404 });
    }

    // 4. Criação do Stream de Download
    const downloadStream = bucket.openDownloadStream(fileId);

    // 5. Conversão: Node.js Stream -> Web ReadableStream
    // Esta estrutura garante que os 'chunks' de dados sejam passados corretamente ao navegador
    const webReadableStream = new ReadableStream({
      start(controller) {
        downloadStream.on("data", (chunk) => {
          controller.enqueue(new Uint8Array(chunk));
        });
        downloadStream.on("end", () => {
          controller.close();
        });
        downloadStream.on("error", (error) => {
          controller.error(error);
        });
      },
      cancel() {
        downloadStream.destroy();
      },
    });

    // 6. Retorno da Resposta com os headers corretos
    return new NextResponse(webReadableStream, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline", // Abre no navegador
        "Content-Length": fileMetadata.length.toString(), // Ajuda o navegador a saber o progresso
        "Cache-Control": "no-store, must-revalidate",
      },
    });
  } catch (error) {
    console.error("Erro ao carregar o PDF:", error);
    return NextResponse.json(
      { error: "Erro interno ao processar o arquivo." },
      { status: 500 }
    );
  }
}