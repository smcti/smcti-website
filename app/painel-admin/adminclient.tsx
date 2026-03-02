"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function AdminClient({ initialData = [], userEmail }: { initialData: any[], userEmail: string }) {
  const [data, setData] = useState(initialData);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  // Função CRUD: Exclusão Completa (Documento + Arquivo GridFS)
  const handleDelete = async (id: string, pdfFileId: string, nome: string) => {
    const confirmacao = window.confirm(`ATENÇÃO: Você está prestes a apagar permanentemente o currículo de ${nome}. Esta ação não pode ser desfeita. Confirmar?`);
    
    if (!confirmacao) return;

    setIsDeleting(id);

    try {
      // CORREÇÃO CRÍTICA AQUI: O fetch agora passa os parâmetros na URL, e não no body.
      const res = await fetch(`/api/curriculos/admin?id=${id}&pdfFileId=${pdfFileId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        // Remove o item da tabela instantaneamente sem precisar dar F5
        setData(prev => prev.filter(c => c._id !== id));
      } else {
        const erro = await res.json();
        alert(`Erro ao excluir: ${erro.error}`);
      }
    } catch (error) {
      alert("Erro de conexão ao tentar excluir.");
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header Admin */}
      <header className="bg-slate-900 text-white pt-12 pb-12 px-6 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <span className="bg-red-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 inline-block">
              Acesso Restrito SMCTI
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight">Gerenciador de Banco de Dados</h1>
            <p className="text-slate-400 text-sm mt-1">Controle de registros e limpeza de currículos do Parque Tecnológico.</p>
          </div>
          
          <div className="flex items-center gap-4 bg-slate-800 p-3 rounded-2xl border border-slate-700">
            <div className="text-right">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Administrador</p>
              <p className="text-xs font-bold text-slate-200">{userEmail}</p>
            </div>
            <Link href="/painel" className="bg-slate-700 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all">
              Ir para Visão Empresa
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        
        {/* Tabela de Dados */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100/50 border-b border-slate-200 text-[10px] uppercase tracking-widest text-slate-500">
                  <th className="p-4 font-black">Data de Envio</th>
                  <th className="p-4 font-black">Candidato</th>
                  <th className="p-4 font-black">Contato</th>
                  <th className="p-4 font-black">Status Atual</th>
                  <th className="p-4 font-black text-right">Ações de Banco</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {data.map((c) => (
                  <tr key={c._id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    
                    <td className="p-4 text-slate-500 font-medium whitespace-nowrap">
                      {new Date(c.dataEnvio).toLocaleDateString('pt-BR')}
                    </td>
                    
                    <td className="p-4">
                      <p className="font-bold text-slate-800 uppercase">{c.nome}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                         {c.categorias.map((cat: string, i: number) => (
                           <span key={i} className="text-[8px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">{cat}</span>
                         ))}
                      </div>
                    </td>
                    
                    <td className="p-4 text-slate-600">
                      <p className="truncate max-w-[150px]" title={c.email}>{c.email}</p>
                      <p className="text-xs text-slate-400">{c.telefone}</p>
                    </td>

                    <td className="p-4">
                      {c.status === "contratado" ? (
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest">
                          Contratado ({c.empresaFinal})
                        </span>
                      ) : (
                        <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest">
                          {c.status || "Disponível"}
                        </span>
                      )}
                    </td>

                    <td className="p-4 text-right space-x-2 whitespace-nowrap">
                      <Link 
                        href={`/api/curriculos/pdf/${c.pdfFileId}`} 
                        target="_blank"
                        className="inline-block px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-xs font-bold transition-colors"
                      >
                        PDF
                      </Link>
                      
                      <button 
                        onClick={() => handleDelete(c._id, c.pdfFileId, c.nome)}
                        disabled={isDeleting === c._id}
                        className={`inline-block px-3 py-2 rounded-lg text-xs font-bold transition-colors ${
                          isDeleting === c._id 
                            ? 'bg-red-100 text-red-300 cursor-not-allowed' 
                            : 'bg-red-50 hover:bg-red-500 text-red-600 hover:text-white'
                        }`}
                      >
                        {isDeleting === c._id ? 'Deletando...' : 'Excluir'}
                      </button>
                    </td>
                  </tr>
                ))}

                {data.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-400 font-medium">
                      O banco de dados está vazio no momento.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}