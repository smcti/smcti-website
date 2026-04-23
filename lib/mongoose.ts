// lib/mongoose.ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/build_temporario";

if (process.env.NODE_ENV === "production" && !process.env.MONGODB_URI) {
  console.error("❌ MONGODB_URI não está definida para o Mongoose em produção!");
}

// Cache global para evitar múltiplas conexões Mongoose (similar ao padrão do MongoClient)
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      console.log("✅ Mongoose conectado com sucesso:", mongooseInstance.connection.db?.databaseName);
      return mongooseInstance;
    }).catch((error) => {
      console.error("❌ Falha na conexão Mongoose:", error.message);
      cached.promise = null;
      throw error;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
