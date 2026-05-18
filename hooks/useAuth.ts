"use client";

import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export function useAuth() {
  const { data: session, status } = useSession();

  return {
    authenticated: status === "authenticated",
    user: session?.user ?? null,
    loading: status === "loading",
  };
}

export function useInactivityLogout(timeoutMs: number = 600000) {
  const { authenticated } = useAuth();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Only monitor if authenticated
    if (!authenticated) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      return;
    }

    const logout = async () => {
      try {
        await fetch("/api/auth/logout", { method: "POST" });
        await signOut({ redirect: false }); // Limpa o estado local do NextAuth
        router.push("/login?timeout=true");
      } catch (err) {
        console.error("Erro no logout por inatividade");
      }
    };

    const resetTimer = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(logout, timeoutMs);
    };

    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
    const handleActivity = () => resetTimer();

    resetTimer();

    events.forEach((evt) => window.addEventListener(evt, handleActivity));

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      events.forEach((evt) => window.removeEventListener(evt, handleActivity));
    };
  }, [authenticated, timeoutMs, router]);
}
