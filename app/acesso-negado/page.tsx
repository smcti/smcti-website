import Link from "next/link";

export default function AcessoNegado() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Acesso Negado</h1>
      <p className="text-gray-700 mb-6">Você não tem permissão para acessar o painel de empresas.</p>
      <Link href="/" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Voltar ao Início
      </Link>
    </div>
  );
}