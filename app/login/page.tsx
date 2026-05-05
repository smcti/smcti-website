import { Suspense } from "react";
import LoginPage from "./loginclient";

export default function Page() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Carregando...</div>}>
            <LoginPage />
        </Suspense>
    );
}