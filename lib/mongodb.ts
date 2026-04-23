// lib/mongodb.ts
import { MongoClient } from "mongodb";

// Validação de variável de ambiente em produção
if (process.env.NODE_ENV === "production" && !process.env.MONGODB_URI) {
  console.error("❌ MONGODB_URI não está definida nas variáveis de ambiente de produção!");
}

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/build_temporario";
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // Em modo de desenvolvimento, usa uma variável global para preservar o valor
  // através das recargas de módulo causadas pelo Hot Module Replacement (HMR).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect().then((c) => {
      console.log("✅ MongoDB conectado com sucesso (dev):", c.db().databaseName);
      return c;
    }).catch((error) => {
      console.error("❌ Falha na conexão MongoDB (dev):", error.message);
      throw error;
    });
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // Em produção (e durante o build), instanciamos o cliente normalmente.
  client = new MongoClient(uri, options);
  
  // Capturamos eventuais erros de conexão durante o build para não quebrar o processo
  clientPromise = client.connect().then((c) => {
    console.log("✅ MongoDB conectado com sucesso (prod):", c.db().databaseName);
    return c;
  }).catch((error) => {
    console.warn("❌ Conexão com o banco ignorada durante o build:", error.message);
    return null as unknown as MongoClient;
  });
}

// Exporta uma Promise com o MongoClient conectado para usar em toda a aplicação
export default clientPromise;