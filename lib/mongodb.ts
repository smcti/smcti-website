// lib/mongodb.ts
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  // Durante o build do Docker, MONGODB_URI pode não existir ainda.
  // O erro real será lançado somente quando uma rota de API for chamada.
  if (process.env.NODE_ENV === "production") {
    console.warn("⚠️  MONGODB_URI não definida — conexão será tentada quando necessário.");
  }
}

// Usa uma variável global para reutilizar a conexão entre reloads (dev)
// e entre invocações do mesmo container (prod).
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
      // Limpa o cache para forçar nova tentativa na próxima requisição
      global._mongoClientPromise = undefined;
      console.error("❌ Falha na conexão com o MongoDB:", error.message);
      throw error; // Propaga o erro — não engole mais silenciosamente
    });
}

// Em desenvolvimento, preserva a conexão entre reloads do HMR.
// Em produção, reutiliza a conexão dentro do mesmo container.
if (!global._mongoClientPromise) {
  global._mongoClientPromise = createClientPromise();
}

const clientPromise: Promise<MongoClient> = global._mongoClientPromise;

export default clientPromise;