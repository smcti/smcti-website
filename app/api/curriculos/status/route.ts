import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, acao, empresa } = body;

    if (!id || !acao || !empresa) {
      return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("banco_parque");
    const objectId = new ObjectId(id);

    if (acao === "interesse") {
      // Grava definitivamente no MongoDB
      await db.collection("curriculos").updateOne(
        { _id: objectId },
        { 
          $addToSet: { interessados: empresa },
          $set: { status: "selecionado" } 
        }
      );
    } else if (acao === "contratar") {
      // Grava definitivamente no MongoDB
      await db.collection("curriculos").updateOne(
        { _id: objectId },
        { 
          $set: { 
            status: "contratado", 
            empresaFinal: empresa,
            dataContratacao: new Date() 
          } 
        }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao atualizar status:", error);
    return NextResponse.json({ error: "Erro interno no servidor." }, { status: 500 });
  }
}