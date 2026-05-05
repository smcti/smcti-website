import { NextRequest, NextResponse } from "next/server";
import { getClientPromise } from "@/lib/mongodb";
import { ObjectId, GridFSBucket } from "mongodb";

// Note que mudamos de Request para NextRequest
export async function DELETE(request: NextRequest) {
  try {
    // Pegamos os IDs direto da URL (?id=...&pdfFileId=...)
    const id = request.nextUrl.searchParams.get("id");
    const pdfFileId = request.nextUrl.searchParams.get("pdfFileId");

    if (!id) {
      return NextResponse.json({ error: "ID do currículo ausente" }, { status: 400 });
    }

    const client = await getClientPromise();
    const db = client.db("banco_parque");

    if (pdfFileId && pdfFileId.length === 24) {
      try {
        const bucket = new GridFSBucket(db, { bucketName: "curriculos_pdfs" });
        await bucket.delete(new ObjectId(pdfFileId));
      } catch (err) {
        console.warn("PDF não encontrado no GridFS, ignorando.");
      }
    }

    const result = await db.collection("curriculos").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Candidato não encontrado no banco de dados." }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Excluído com sucesso" });

  } catch (error) {
    console.error("Erro Crítico no DELETE:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}