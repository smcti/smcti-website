"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Loader2, Trash2, Search, PlusCircle, CheckCircle2, AlertCircle } from "lucide-react";

const CATEGORIAS = ["Desenvolvimento", "Design/UX", "Administração", "Engenharia", "Marketing", "Suporte TI", "Vendas", "Gestão de Projetos"];

export default function TalentosTesteClient() {
  const [talentos, setTalentos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [categoria, setCategoria] = useState("Todas");
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Form State
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    objetivo: "",
    formacao: "",
    categorias: [] as string[],
    pdf: null as File | null,
  });
  const [formLoading, setFormLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const showFeedback = (type: "success" | "error", message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 5000);
  };

  const fetchTalentos = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (q) params.append("q", q);
      if (categoria !== "Todas") params.append("categoria", categoria);
      
      const res = await fetch(`/api/admin/talentos?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setTalentos(data.talentos || []);
      } else {
        console.error("Erro ao carregar talentos");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTalentos();
  }, [categoria]); // Busca na mudança de categoria. A busca por texto será num form/botão.

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTalentos();
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      const formData = new FormData();
      formData.append("nome", form.nome);
      formData.append("email", form.email);
      formData.append("telefone", form.telefone);
      formData.append("objetivo", form.objetivo);
      formData.append("formacao", form.formacao);
      formData.append("categorias", JSON.stringify(form.categorias));
      if (form.pdf) {
        formData.append("pdf", form.pdf);
      }

      const res = await fetch("/api/curriculos", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        showFeedback("success", "Talento cadastrado com sucesso para teste!");
        setForm({
          nome: "",
          email: "",
          telefone: "",
          objetivo: "",
          formacao: "",
          categorias: [],
          pdf: null,
        });
        // Reseta o file input (gambiarra simples pra teste)
        const fileInput = document.getElementById("pdf") as HTMLInputElement;
        if (fileInput) fileInput.value = "";
        fetchTalentos();
      } else {
        showFeedback("error", data.error || "Erro ao cadastrar talento");
      }
    } catch (err) {
      showFeedback("error", "Erro de conexão ao enviar o formulário");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: string, pdfFileId: string) => {
    if (!window.confirm("Confirmar exclusão deste talento de teste?")) return;
    setDeletingId(id);

    try {
      const res = await fetch(`/api/curriculos/admin?id=${id}&pdfFileId=${pdfFileId}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (res.ok) {
        showFeedback("success", "Talento excluído com sucesso.");
        setTalentos((prev) => prev.filter((t) => t._id !== id));
      } else {
        showFeedback("error", data.error || "Erro ao excluir talento");
      }
    } catch (err) {
      showFeedback("error", "Erro de conexão ao excluir");
    } finally {
      setDeletingId(null);
    }
  };

  const toggleCategoria = (cat: string) => {
    setForm(prev => {
      if (prev.categorias.includes(cat)) {
        return { ...prev, categorias: prev.categorias.filter(c => c !== cat) };
      }
      if (prev.categorias.length >= 3) {
        alert("Máximo de 3 categorias");
        return prev;
      }
      return { ...prev, categorias: [...prev.categorias, cat] };
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans p-6 text-slate-800">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="bg-slate-900 text-white p-6 rounded-2xl">
          <span className="bg-red-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full inline-block mb-3">
            Ambiente de Teste Isolado
          </span>
          <h1 className="text-2xl font-bold">Banco de Talentos - Teste Interno</h1>
          <p className="text-sm text-slate-400 mt-2">
            Página oculta (noindex) restrita para validação das APIs de cadastro, busca e exclusão de currículos.
            Nenhum dado real/sensível trafega de forma desprotegida.
          </p>
          <div className="mt-4">
             <Link href="/painel-admin" className="text-xs bg-slate-700 hover:bg-slate-600 px-3 py-2 rounded-lg text-white font-bold transition">
               Voltar ao Admin
             </Link>
          </div>
        </header>

        {feedback && (
          <div className={`p-4 rounded-xl flex items-center gap-3 text-sm font-bold ${feedback.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {feedback.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            {feedback.message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulário de Teste de Cadastro */}
          <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2 border-b pb-2">
              <PlusCircle size={18} className="text-blue-500" />
              Simular Cadastro
            </h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Nome Completo</label>
                <input required type="text" value={form.nome} onChange={e => setForm({...form, nome: e.target.value})} className="w-full text-sm p-2 border rounded-lg outline-none focus:border-blue-400" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Email</label>
                <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full text-sm p-2 border rounded-lg outline-none focus:border-blue-400" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Telefone</label>
                <input required type="text" value={form.telefone} onChange={e => setForm({...form, telefone: e.target.value})} className="w-full text-sm p-2 border rounded-lg outline-none focus:border-blue-400" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Formação Acadêmica</label>
                <input required type="text" value={form.formacao} onChange={e => setForm({...form, formacao: e.target.value})} className="w-full text-sm p-2 border rounded-lg outline-none focus:border-blue-400" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Objetivo / Resumo</label>
                <textarea required value={form.objetivo} onChange={e => setForm({...form, objetivo: e.target.value})} className="w-full text-sm p-2 border rounded-lg outline-none focus:border-blue-400 h-20 resize-none"></textarea>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2">Categorias (Máx 3)</label>
                <div className="flex flex-wrap gap-1.5">
                  {CATEGORIAS.map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => toggleCategoria(cat)}
                      className={`text-[10px] px-2 py-1 rounded font-bold border ${form.categorias.includes(cat) ? 'bg-blue-500 text-white border-blue-600' : 'bg-slate-50 text-slate-500 border-slate-200'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Currículo PDF</label>
                <input required id="pdf" type="file" accept=".pdf" onChange={e => setForm({...form, pdf: e.target.files?.[0] || null})} className="w-full text-xs p-2 border rounded-lg" />
              </div>
              
              <button disabled={formLoading} type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-blue-700 disabled:opacity-50">
                {formLoading && <Loader2 size={16} className="animate-spin" />}
                Cadastrar Talento (POST Backend)
              </button>
            </form>
          </div>

          {/* Listagem e Filtros */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <form onSubmit={handleSearchSubmit} className="flex gap-2 mb-4">
                <input 
                  type="text" 
                  placeholder="Buscar no backend por nome, resumo..." 
                  value={q} 
                  onChange={e => setQ(e.target.value)} 
                  className="flex-1 p-2 border rounded-lg text-sm outline-none focus:border-blue-400"
                />
                <button type="submit" className="bg-slate-800 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-slate-700">
                  <Search size={16} /> Buscar
                </button>
              </form>
              <div className="flex gap-2 overflow-x-auto pb-2">
                <button onClick={() => setCategoria("Todas")} className={`whitespace-nowrap px-3 py-1.5 text-[11px] font-bold rounded-lg border ${categoria === "Todas" ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-white text-slate-500 border-slate-200'}`}>Todas</button>
                {CATEGORIAS.map(cat => (
                  <button key={cat} onClick={() => setCategoria(cat)} className={`whitespace-nowrap px-3 py-1.5 text-[11px] font-bold rounded-lg border ${categoria === cat ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-white text-slate-500 border-slate-200'}`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b bg-slate-50">
                <h3 className="font-bold text-sm text-slate-700">Resultados da API</h3>
              </div>
              
              {loading ? (
                <div className="p-10 flex justify-center text-slate-400"><Loader2 className="animate-spin" /></div>
              ) : talentos.length === 0 ? (
                <div className="p-10 text-center text-slate-400 text-sm font-medium">Nenhum talento encontrado.</div>
              ) : (
                <ul className="divide-y divide-slate-100">
                  {talentos.map(t => (
                    <li key={t._id} className="p-4 hover:bg-slate-50 flex items-start justify-between gap-4">
                      <div>
                        <p className="font-bold text-slate-800 uppercase text-sm">{t.nome}</p>
                        <p className="text-xs text-slate-500">{t.email} • {t.telefone}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {t.categorias.map((cat: string) => (
                            <span key={cat} className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-bold uppercase">{cat}</span>
                          ))}
                        </div>
                        <p className="text-xs mt-2 text-slate-600 font-medium">Status: {t.status}</p>
                      </div>
                      <div className="flex flex-col gap-2 shrink-0">
                        {t.pdfFileId && (
                           <Link href={`/api/curriculos/pdf/${t.pdfFileId}`} target="_blank" className="text-[10px] bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1.5 rounded font-bold text-center">
                             Ver PDF
                           </Link>
                        )}
                        <button 
                          onClick={() => handleDelete(t._id, t.pdfFileId)}
                          disabled={deletingId === t._id}
                          className="text-[10px] bg-red-50 text-red-600 hover:bg-red-500 hover:text-white px-3 py-1.5 rounded font-bold flex items-center gap-1 justify-center transition"
                        >
                          {deletingId === t._id ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
                          Excluir
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
