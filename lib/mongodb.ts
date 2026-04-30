// lib/mongodb.ts
import { MongoClient } from "mongodb";

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function createClientPromise(): Promise<MongoClient> {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    return Promise.reject(
      new Error("❌ MONGODB_URI não está definida nas variáveis de ambiente.")
    );
  }

  const client = new MongoClient(mongoUri);

  return client
    .connect()
    .then((c) => {
      console.log("✅ MongoDB conectado com sucesso:", c.db().databaseName);
      return c;
    })
    .catch((error) => {
      global._mongoClientPromise = undefined;
      console.error("❌ Falha na conexão com o MongoDB:", error.message);
      throw error;
    });
}

export function getClientPromise(): Promise<MongoClient> {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = createClientPromise();
  }
  return global._mongoClientPromise;
}