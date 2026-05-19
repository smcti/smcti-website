"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function AdminClient({ initialData = [], userEmail }: { initialData: any[], userEmail: string }) {
  const [data, setData] = useState(initialData);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<any | null>(null);

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
            <Link href="/painel-admin/mentorias" className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all">
              Triagem de Mentorias
            </Link>
            <Link href="/painel-admin/mentores" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all">
              Gestão de Mentores
            </Link>
            <Link href="/painel-admin/usuarios" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1">
              Gestão de Usuários
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="bg-slate-600 hover:bg-slate-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all"
              title="Encerrar sessão"
            >
              Sair
            </button>
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
                      <div className="flex items-start gap-3">
                        {/* Avatar */}
                        {c.foto ? (
                          <img src={c.foto} alt={c.nome} className="w-10 h-10 rounded-full object-cover shrink-0" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold shrink-0">
                            {c.nome.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-slate-800 uppercase">{c.nome}</p>
                          {c.formacao && (
                            <p className="text-xs text-blue-600 font-medium mt-0.5">{c.formacao}</p>
                          )}
                          {c.objetivo && (
                            <p className="text-xs text-slate-500 mt-1 line-clamp-2">{c.objetivo}</p>
                          )}
                          <div className="flex flex-wrap gap-1 mt-2">
                             {c.categorias?.map((cat: string, i: number) => (
                               <span key={i} className="text-[8px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">{cat}</span>
                             ))}
                          </div>
                        </div>
                      </div>
                    </td>
                    
                    <td className="p-4 text-slate-600">
                      <p title={c.email}>{c.email}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{c.telefone}</p>
                    </td>

                    <td className="p-4">
                      {c.status?.toLowerCase() === "contratado" ? (
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest">
                          CONTRATADO {c.empresaFinal ? `(${c.empresaFinal})` : ''}
                        </span>
                      ) : c.status?.toLowerCase() === "inativo" ? (
                        <span className="bg-slate-100 text-slate-500 px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest">
                          INATIVO
                        </span>
                      ) : (
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest">
                          DISPONÍVEL
                        </span>
                      )}
                    </td>

                    <td className="p-4 text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => setSelectedCandidate(c)}
                        className="inline-block px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-colors"
                      >
                        Ver detalhes
                      </button>
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

        {/* Modal de Detalhes do Candidato */}
        {selectedCandidate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
              <div className="p-6 border-b border-slate-100 flex justify-between items-start">
                <div className="flex items-center gap-4">
                  {selectedCandidate.foto ? (
                    <img src={selectedCandidate.foto} alt={selectedCandidate.nome} className="w-16 h-16 rounded-full object-cover" />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xl font-bold">
                      {selectedCandidate.nome.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <h2 className="text-xl font-bold text-slate-800 uppercase">{selectedCandidate.nome}</h2>
                    {selectedCandidate.formacao && (
                      <p className="text-sm text-blue-600 font-medium">{selectedCandidate.formacao}</p>
                    )}
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedCandidate(null)}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Contato</h3>
                    <p className="text-slate-700"><strong>Email:</strong> {selectedCandidate.email}</p>
                    <p className="text-slate-700"><strong>Telefone:</strong> {selectedCandidate.telefone}</p>
                  </div>
                  
                  {selectedCandidate.objetivo && (
                    <div>
                      <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Objetivo / Resumo Profissional</h3>
                      <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">{selectedCandidate.objetivo}</p>
                    </div>
                  )}

                  <div>
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Categorias de Interesse</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCandidate.categorias?.map((cat: string, i: number) => (
                        <span key={i} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded font-bold uppercase tracking-wider">{cat}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                <button 
                  onClick={() => setSelectedCandidate(null)}
                  className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-slate-800 transition-colors"
                >
                  Fechar
                </button>
                <Link 
                  href={`/api/curriculos/pdf/${selectedCandidate.pdfFileId}`} 
                  target="_blank"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-all"
                >
                  Abrir Currículo (PDF)
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}