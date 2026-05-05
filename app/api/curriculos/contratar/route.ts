import { NextResponse } from "next/server";
import { getClientPromise } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(request: Request) {
  try {
    const { id, empresa } = await request.json();
    const client = await getClientPromise();
    const db = client.db("banco_parque");

    await db.collection("curriculos").updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: "selecionado", empresaContratante: empresa, dataContratacao: new Date() } }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao processar" }, { status: 500 });
  }
}