// lib/mongodb.ts
import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
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
  // Em produção, é seguro não usar a variável global.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Exporta uma Promise com o MongoClient conectado para usar em toda a aplicação
export default clientPromise;