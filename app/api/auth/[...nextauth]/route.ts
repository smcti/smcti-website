export const dynamic = "force-dynamic";

import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getClientPromise } from "@/lib/mongodb";
import mongoose from "mongoose";
import { User } from "@/lib/models/User";
import bcrypt from "bcryptjs";

// Safety net: detecta se NEXTAUTH_URL está faltando ou apontando para localhost em produção
if (process.env.NODE_ENV === "production") {
  const authUrl = process.env.NEXTAUTH_URL;
  if (!authUrl) {
    console.error("🚨 CRITICAL: NEXTAUTH_URL não está definida em produção! Sessões locais podem falhar.");
    console.error("🚨 Verifique se a variável no Cloud Run se chama NEXTAUTH_URL.");
  } else if (authUrl.includes("localhost")) {
    console.error(`🚨 CRITICAL: NEXTAUTH_URL está apontando para localhost em produção: ${authUrl}`);
  }
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credenciais Internas",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email e senha são obrigatórios.");
        }

        const client = await getClientPromise();
        // Assegura conexão mongoose ativa
        if (mongoose.connection.readyState !== 1) {
          await mongoose.connect(process.env.MONGODB_URI as string);
        }

        const user = await User.findOne({ email: credentials.email });

        if (!user || !user.password) {
          throw new Error("Usuário não encontrado ou credenciais inválidas.");
        }

        const isPasswordMatch = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordMatch) {
          throw new Error("Credenciais inválidas.");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          role: user.role
        };
      }
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // 'user' aqui é o objeto retornado pelo authorize
        token.role = (user as any).role || "usuario";
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',      // Nova página de login
    error: '/acesso-negado',
  },
  secret: process.env.NEXTAUTH_SECRET || "segredo_falso_do_nextauth",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };