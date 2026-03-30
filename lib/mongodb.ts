// lib/mongodb.ts
import { MongoClient } from "mongodb";

// Removemos o throw new Error e colocamos um fallback temporário.
// Se a variável não existir (no momento do build), ele usa essa string genérica
// para o MongoClient não quebrar reclamando de URL inválida.
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
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // Em produção (e durante o build), instanciamos o cliente normalmente.
  client = new MongoClient(uri, options);
  
  // Capturamos eventuais erros de conexão durante o build para não quebrar o processo
  clientPromise = client.connect().catch((error) => {
    console.warn("Conexão com o banco ignorada durante o build:", error.message);
    return null as unknown as MongoClient;
  });
}

// Exporta uma Promise com o MongoClient conectado para usar em toda a aplicação
export default clientPromise;