import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { getClientPromise } from '@/lib/mongodb';
import mongoose from 'mongoose';
import { User } from '@/lib/models/User';

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    
    // Se há token, o usuário está logado. Limpa o BD.
    if (token && token.sub) {
      await getClientPromise();
      if (mongoose.connection.readyState !== 1) {
        await mongoose.connect(process.env.MONGODB_URI as string);
      }
      
      // Limpa o currentSessionId
      await User.findByIdAndUpdate(token.sub, { $unset: { currentSessionId: 1 } });
    }

    // Retorna resposta de sucesso e apaga os cookies nativos do NextAuth
    const response = NextResponse.json({ success: true });
    
    // Nomes de cookie possíveis dependendo se está rodando local ou em prod HTTPS
    const isSecure = process.env.NODE_ENV === "production";
    const cookieName = isSecure ? "__Secure-next-auth.session-token" : "next-auth.session-token";
    const callbackCookie = isSecure ? "__Secure-next-auth.callback-url" : "next-auth.callback-url";
    const csrfCookie = "next-auth.csrf-token";

    response.cookies.set(cookieName, '', { maxAge: 0, path: '/' });
    response.cookies.set(callbackCookie, '', { maxAge: 0, path: '/' });
    response.cookies.set(csrfCookie, '', { maxAge: 0, path: '/' });

    return response;
  } catch (error) {
    return NextResponse.json({ success: false, error: "Logout failed" }, { status: 500 });
  }
}
