import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getClientPromise } from "@/lib/mongodb";
import mongoose from "mongoose";
import { User } from "@/lib/models/User";
import bcrypt from "bcryptjs";
import crypto from "crypto";

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

        await getClientPromise();
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

        const sessionId = crypto.randomUUID();
        user.currentSessionId = sessionId;
        await user.save();

        return {
          id: user._id.toString(),
          email: user.email,
          role: user.role,
          sessionId: sessionId
        };
      }
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 dias
  },
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === "production" ? "__Secure-next-auth.session-token" : "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "strict",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role || "usuario";
        token.sessionId = (user as any).sessionId;
      }
      
      // Controle de Dispositivo (Sessão Única): Verificação no BD
      if (token.sessionId && token.sub) {
        await getClientPromise();
        if (mongoose.connection.readyState !== 1) {
          await mongoose.connect(process.env.MONGODB_URI as string);
        }
        const dbUser = await User.findById(token.sub).select("currentSessionId").lean();
        // Se o sessionId armazenado divergir do token atual, derruba o acesso local
        if (!dbUser || dbUser.currentSessionId !== token.sessionId) {
          // Retornar null força o NextAuth a tratar como sessão inválida
          return null as any;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role as string;
        (session.user as any).id = token.sub;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
    // Não definimos 'error' aqui: o middleware já cuida de redirecionar
    // usuários autenticados sem permissão para o próprio painel.
    // Manter '/acesso-negado' aqui causava o bug de exibir a tela de erro.
  },
  secret: process.env.NEXTAUTH_SECRET,
};
