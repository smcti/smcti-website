import { Suspense } from "react";
import LoginClient from "./loginclient";

export const dynamic = "force-dynamic";  // ← adiciona essa linha

export default function Page() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Carregando...</div>}>
            <LoginClient />
        </Suspense>
    );
}