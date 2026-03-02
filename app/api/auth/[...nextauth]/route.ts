import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "@/lib/mongodb";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    // Forçamos o uso de JWT, pois precisamos dele para transportar o "role"
    strategy: "jwt", 
  },
  callbacks: {
    // 1. SIGN IN: Barreira de entrada (Whitelist)
    async signIn({ user }) {
      try {
        const client = await clientPromise;
        const db = client.db("banco_parque");
        
        const isAuthorized = await db.collection("users").findOne({ email: user.email });
        
        if (isAuthorized) {
          return true;
        } else {
          return "/acesso-negado";
        }
      } catch (error) {
        console.error("Erro ao verificar o usuário no MongoDB:", error);
        return false;
      }
    },
    
    // 2. JWT: Busca o cargo no banco e coloca dentro do token criptografado
    async jwt({ token, user }) {
      // A variável 'user' só vem preenchida na hora exata do login. 
      // Nos acessos subsequentes, usamos apenas o token já montado para não sobrecarregar o banco.
      if (user) {
        const client = await clientPromise;
        const db = client.db("banco_parque");
        const dbUser = await db.collection("users").findOne({ email: user.email });
        
        // Se o usuário não tiver o campo "role" gravado no banco, assume que é "empresa"
        token.role = dbUser?.role || "empresa";
      }
      return token;
    },

    // 3. SESSION: Pega o cargo escondido no token e expõe para o Next.js (front-end e back-end)
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
      }
      return session;
    }
  },
  pages: {
    error: '/acesso-negado',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };