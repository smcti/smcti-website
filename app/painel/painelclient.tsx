"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

const CATEGORIAS_OFICIAIS = ["Todas", "Desenvolvimento", "Design/UX", "Administração", "Engenharia", "Marketing", "Suporte TI", "Vendas", "Gestão de Projetos"];

export default function PainelClient({ initialData = [], userEmail }: { initialData: any[], userEmail: string }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("disponiveis");
  const [categoriaFiltro, setCategoriaFiltro] = useState("Todas");
  const [data, setData] = useState(initialData);

  // A CORREÇÃO MESTRA: Sincroniza o estado do React com o servidor sempre que houver mudança.
  // Isso impede que os currículos voltem para 'Disponíveis' quando a página for revalidada.
  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  // AÇÃO AUTOMÁTICA: Pega a empresa do e-mail logado, sem prompt!
  const handleAcao = async (id: string, acao: "interesse" | "contratar") => {
    // Para evitar clique acidental na contratação final
    if (acao === "contratar") {
      const confirmacao = window.confirm(`Você confirma a contratação oficial deste talento pela empresa ${userEmail}?`);
      if (!confirmacao) return;
    }

    const empresa = userEmail;

    try {
      const res = await fetch("/api/curriculos/status", {
        method: "POST",
        body: JSON.stringify({ id, acao, empresa }),
        headers: { "Content-Type": "application/json" }
      });

      if (res.ok) {
        // Atualiza a tela instantaneamente
        setData(prev => prev.map(c => {
          if (c._id === id) {
            if (acao === "interesse") {
              const lista = [...(c.interessados || []), empresa];
              // Adiciona o status='selecionado' aqui também, forçando o visual
              return { ...c, status: "selecionado", interessados: [...new Set(lista)] };
            }
            return { ...c, status: "contratado", empresaFinal: empresa };
          }
          return c;
        }));
      } else {
        const errorData = await res.json();
        alert(`Erro ao atualizar banco: ${errorData.error}`);
      }
    } catch (error) {
      alert("Erro crítico de conexão com a API.");
    }
  };

  // Filtros Avançados: Busca + Categoria + Abas
  const filteredCurriculos = useMemo(() => {
    const search = searchTerm.toLowerCase();
    return data.filter((c) => {
      const catArray = c.categorias || [];
      
      // Checa se o nome ou alguma das categorias bate com a busca escrita
      const matchesSearch = c.nome.toLowerCase().includes(search) || 
                            catArray.some((cat: string) => cat.toLowerCase().includes(search));
      
      // Checa o filtro dos botões redondos
      const matchesCat = categoriaFiltro === "Todas" || catArray.includes(categoriaFiltro);

      const currentStatus = c.status || "disponivel";
      const isContratado = currentStatus === "contratado";
      const temInteresse = Array.isArray(c.interessados) && c.interessados.length > 0;

      if (activeTab === "disponiveis") return matchesSearch && matchesCat && !isContratado;
      if (activeTab === "selecionados") return matchesSearch && matchesCat && temInteresse && !isContratado;
      return matchesSearch && matchesCat && isContratado;
    });
  }, [searchTerm, data, activeTab, categoriaFiltro]);

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans text-slate-900 antialiased">
      {/* Header */}
      <div className="relative bg-gradient-to-b from-blue-50/50 to-white pt-20 pb-24 px-6 border-b border-slate-100 text-center">
        <h1 className="text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Banco de <span className="text-blue-600">Talentos</span></h1>
        <p className="text-slate-500 max-w-xl mx-auto text-lg font-medium leading-relaxed">Conectando profissionais qualificados às empresas do Parque Tecnológico de Pato Branco.</p>
      </div>

      <main className="max-w-6xl mx-auto px-6">
        {/* Barra de Busca e Login */}
        <div className="relative -mt-10 mb-8 z-10">
          <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(59,130,246,0.05)] border border-slate-100 p-2 flex items-center gap-4">
            <div className="relative flex-grow flex items-center">
              <div className="absolute left-5 text-blue-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <input 
                type="text" 
                placeholder="Pesquisar candidatos..." 
                className="w-full pl-14 pr-4 py-4 bg-transparent border-none outline-none focus:ring-0 text-slate-600 font-medium" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
              />
            </div>
            
            <div className="hidden md:block h-10 w-[1px] bg-slate-100"></div>

            <div className="hidden lg:flex flex-col items-start px-4 min-w-[220px]">
              <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest text-left w-full">Acesso Autorizado</p>
              <p className="text-[11px] font-bold text-slate-600 lowercase truncate w-full text-left">{userEmail}</p>
            </div>

            <button 
              onClick={() => signOut({ callbackUrl: '/' })} 
              className="p-3 text-slate-300 hover:text-red-500 transition-colors cursor-pointer"
              title="Sair do sistema"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            </button>
          </div>
        </div>

        {/* Filtros RÁPIDOS de Categoria */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORIAS_OFICIAIS.map(cat => (
            <button 
              key={cat} 
              onClick={() => setCategoriaFiltro(cat)}
              className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border ${
                categoriaFiltro === cat 
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200' 
                  : 'bg-white text-slate-400 border-slate-200 hover:border-blue-300 hover:text-blue-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Abas */}
        <div className="flex justify-center gap-8 mb-12 border-b border-slate-100 overflow-x-auto">
          {["disponiveis", "selecionados", "contratados"].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-4 px-2 text-[11px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap ${activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-300 hover:text-blue-400'}`}>
              {tab === "disponiveis" ? "Disponíveis" : tab === "selecionados" ? "Com Interesse" : "Contratados"}
            </button>
          ))}
        </div>

        {/* Grade de Talentos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-24">
          {filteredCurriculos.map((c) => (
            <div key={c._id} className="group relative bg-white rounded-[2.5rem] border border-blue-50 p-8 shadow-sm hover:shadow-[0_40px_80px_rgba(59,130,246,0.08)] hover:border-blue-200 transition-all duration-500 flex flex-col">
              
              <div className="flex justify-between items-start mb-6">
                <span className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-full shadow-md shadow-blue-100 ${c.status === 'contratado' ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'}`}>
                  {c.status === 'contratado' ? 'Contratado' : 'Disponível'}
                </span>
                <span className="text-[10px] text-blue-300 font-bold">{new Date(c.dataEnvio).toLocaleDateString('pt-BR')}</span>
              </div>

              {/* Múltiplas Categorias do Candidato */}
              <div className="flex flex-wrap gap-1 mb-4">
                 {(c.categorias || []).map((cat: string, idx: number) => (
                    <span key={idx} className="bg-slate-50 text-slate-400 border border-slate-100 text-[8px] font-bold uppercase tracking-widest px-2 py-1 rounded-md">
                      {cat}
                    </span>
                 ))}
              </div>

              <div className="flex-grow">
                <h2 className="text-2xl font-bold text-slate-800 mb-1 tracking-tight uppercase">{c.nome}</h2>
                <p className="text-blue-400 text-[11px] font-bold uppercase tracking-widest mb-6">{c.formacao}</p>

                {/* Empresas Interessadas */}
                {activeTab === "selecionados" && c.interessados?.length > 0 && (
                  <div className="mb-6 p-4 bg-blue-50/50 rounded-2xl border border-blue-100 text-left">
                    <p className="text-[9px] text-blue-500 font-black uppercase mb-2 tracking-widest">Empresas Interessadas</p>
                    <div className="flex flex-wrap gap-2">
                      {c.interessados.map((emp: string, i: number) => (
                        <span key={i} className="text-[10px] font-bold text-slate-600 bg-white px-2 py-1 rounded-md border border-blue-100 lowercase">{emp}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Empresa Final */}
                {activeTab === "contratados" && (
                  <div className="mb-6 p-4 bg-green-50 rounded-2xl border border-green-100 text-left">
                    <p className="text-[9px] text-green-600 font-black uppercase mb-1 tracking-widest">Contratado oficialmente por</p>
                    <p className="text-xs font-bold text-slate-700 lowercase">{c.empresaFinal}</p>
                  </div>
                )}

                {/* Contato */}
                <div className="mt-2 text-left">
                  <p className="text-[9px] text-blue-300 font-black uppercase mb-3 tracking-widest text-left">Contato</p>
                  <div className="bg-blue-50/30 p-5 rounded-[1.5rem] border border-blue-50 mb-6 text-slate-600 text-sm">
                    <p className="mb-2 font-semibold">Email: <span className="font-medium text-slate-500 block truncate">{c.email}</span></p>
                    <p className="font-semibold">Telefone: <span className="font-medium text-slate-500 block">{c.telefone}</span></p>
                  </div>
                </div>
              </div>

              {/* Ações */}
              <div className="flex flex-col gap-3">
                <Link href={`/api/curriculos/pdf/${c.pdfFileId}`} target="_blank" className="flex items-center justify-between w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-lg text-[11px] uppercase tracking-widest">
                  <span>Ver Currículo PDF</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </Link>

                {activeTab === "disponiveis" && (
                  <button onClick={() => handleAcao(c._id, "interesse")} className="w-full border border-blue-100 hover:bg-blue-50 text-blue-600 font-bold py-3 rounded-2xl transition-all text-[10px] uppercase tracking-widest">
                    Demonstrar Interesse
                  </button>
                )}

                {activeTab === "selecionados" && (
                  <button onClick={() => handleAcao(c._id, "contratar")} className="w-full bg-[#111827] hover:bg-green-600 text-white font-bold py-4 rounded-2xl transition-all text-[10px] uppercase tracking-widest">
                    Finalizar Contratação
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {filteredCurriculos.length === 0 && (
          <div className="text-center py-20">
             <p className="text-slate-400 font-medium">Nenhum talento encontrado com os filtros atuais.</p>
          </div>
        )}
      </main>
    </div>
  );
}