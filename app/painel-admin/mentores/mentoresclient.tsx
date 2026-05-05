"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  UserPlus,
  Trash2,
  Edit2,
  Loader2,
  ArrowLeft,
  Briefcase,
  CheckCircle2,
  AlertCircle,
  Users,
} from "lucide-react";

interface Mentor {
  _id: string;
  name: string;
  role: string;
  email: string;
  phone?: string;
  category: "mercado" | "comercial" | "gestao";
  description: string;
  totalSlots: number;
  availableSlots: number;
}

export default function MentoresClient({ userEmail, userRole }: { userEmail: string; userRole: string }) {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<Partial<Mentor>>({
    name: "",
    role: "",
    email: "",
    phone: "",
    category: "gestao",
    description: "",
    totalSlots: 3,
  });
  const [formLoading, setFormLoading] = useState(false);

  const fetchMentors = async () => {
    try {
      const res = await fetch("/api/admin/mentores");
      if (res.ok) {
        const data = await res.json();
        setMentors(data.mentors || []);
      }
    } catch {
      console.error("Erro ao buscar mentores.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMentors();
  }, []);

  const showFeedback = (type: "success" | "error", message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      const method = isEditing ? "PUT" : "POST";
      const payload = isEditing ? { ...form, id: form._id } : form;

      const res = await fetch("/api/admin/mentores", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (res.ok) {
        showFeedback("success", `Mentor ${isEditing ? "atualizado" : "criado"} com sucesso!`);
        resetForm();
        fetchMentors();
      } else {
        showFeedback("error", data.error || "Erro ao processar.");
      }
    } catch {
      showFeedback("error", "Erro de conexão.");
    } finally {
      setFormLoading(false);
    }
  };

  const handleEditClick = (mentor: Mentor) => {
    setIsEditing(true);
    setForm(mentor);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setIsEditing(false);
    setForm({
      name: "",
      role: "",
      email: "",
      phone: "",
      category: "gestao",
      description: "",
      totalSlots: 3,
    });
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Tem certeza que deseja remover o mentor "${name}"? Esta ação é irreversível.`)) return;
    setDeleting(id);

    try {
      const res = await fetch(`/api/admin/mentores?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok) {
        showFeedback("success", "Mentor removido com sucesso.");
        setMentors((prev) => prev.filter((m) => m._id !== id));
      } else {
        showFeedback("error", data.error || "Erro ao remover mentor.");
      }
    } catch {
      showFeedback("error", "Erro de conexão.");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <header className="bg-slate-900 text-white pt-12 pb-12 px-6 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <span className="bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 inline-block">
              Gestão
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-3">
              <Briefcase size={28} className="text-blue-400" />
              Gestão de Mentores
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Cadastre e gerencie os mentores ativos no ecossistema do ITECPB.
            </p>
          </div>
          <div className="flex items-center gap-4 bg-slate-800 p-3 rounded-2xl border border-slate-700">
            <div className="text-right">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                {userRole === "admin" ? "Administrador" : "Gestor"}
              </p>
              <p className="text-xs font-bold text-slate-200">{userEmail}</p>
            </div>
            {userRole === "admin" ? (
                <Link
                  href="/painel-admin"
                  className="bg-slate-700 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1"
                >
                  <ArrowLeft size={12} /> Voltar Admin
                </Link>
            ) : (
                <Link
                  href="/painel-admin/mentorias"
                  className="bg-slate-700 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1"
                >
                  <ArrowLeft size={12} /> Voltar Triagem
                </Link>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 flex flex-col gap-10">
        {/* Feedback */}
        {feedback && (
          <div
            className={`flex items-center gap-3 p-4 rounded-2xl text-sm font-medium border ${
              feedback.type === "success"
                ? "bg-green-50 text-green-700 border-green-200"
                : "bg-red-50 text-red-700 border-red-200"
            }`}
          >
            {feedback.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            {feedback.message}
          </div>
        )}

        {/* Formulário */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
                {isEditing ? <Edit2 size={22} /> : <UserPlus size={22} />}
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-800">
                  {isEditing ? "Editar Mentor" : "Cadastrar Novo Mentor"}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Preencha os dados do especialista.
                </p>
              </div>
            </div>
            {isEditing && (
              <button
                onClick={resetForm}
                className="text-sm font-bold text-slate-500 hover:text-slate-700"
              >
                Cancelar Edição
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nome *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none transition"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cargo/Role *</label>
              <input
                type="text"
                required
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none transition"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">E-mail *</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none transition"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Telefone</label>
              <input
                type="text"
                placeholder="(46) 99999-9999"
                value={form.phone || ""}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none transition"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Categoria *</label>
              <select
                required
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                className="border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none transition bg-white"
              >
                <option value="gestao">Gestão</option>
                <option value="mercado">Mercado</option>
                <option value="comercial">Comercial</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total de Vagas Mensais *</label>
              <input
                type="number"
                min="0"
                required
                value={form.totalSlots}
                onChange={(e) => setForm({ ...form, totalSlots: parseInt(e.target.value) || 0 })}
                className="border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none transition"
              />
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Descrição Curta *</label>
              <textarea
                required
                rows={2}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none transition resize-none"
              />
            </div>

            <div className="md:col-span-2 mt-2">
              <button
                type="submit"
                disabled={formLoading}
                className="w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 disabled:bg-blue-400"
              >
                {formLoading ? <Loader2 size={16} className="animate-spin" /> : (isEditing ? <Edit2 size={16} /> : <UserPlus size={16} />)}
                {formLoading ? "Processando..." : (isEditing ? "Salvar Alterações" : "Cadastrar Mentor")}
              </button>
            </div>
          </form>
        </div>

        {/* Lista de Mentores */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex items-center gap-3 p-6 border-b border-slate-100">
            <div className="p-2 bg-slate-50 rounded-xl text-slate-600">
              <Users size={22} />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-800">Mentores Cadastrados</h2>
              <p className="text-xs text-slate-400">
                Lista de todos os mentores ativos para as startups incubadas.
              </p>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16 gap-3">
              <Loader2 size={24} className="animate-spin text-blue-500" />
              <p className="text-slate-400 font-medium">Carregando mentores...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100/50 border-b border-slate-200 text-[10px] uppercase tracking-widest text-slate-500">
                    <th className="p-4 font-black">Nome / Contato</th>
                    <th className="p-4 font-black">Categoria</th>
                    <th className="p-4 font-black">Vagas (Disponíveis/Total)</th>
                    <th className="p-4 font-black text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {mentors.map((m) => (
                    <tr key={m._id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="p-4">
                        <p className="font-bold text-slate-800">{m.name}</p>
                        <p className="text-xs text-slate-500">{m.role}</p>
                        <p className="text-[10px] text-slate-400 mt-1">{m.email} {m.phone ? `• ${m.phone}` : ""}</p>
                      </td>
                      <td className="p-4">
                        <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border bg-slate-100 text-slate-600 border-slate-200">
                          {m.category}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden w-24">
                            <div 
                              className={`h-full ${m.availableSlots > 0 ? "bg-emerald-500" : "bg-red-500"}`} 
                              style={{ width: `${(m.availableSlots / Math.max(m.totalSlots, 1)) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs font-bold text-slate-600">
                            {m.availableSlots} / {m.totalSlots}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-right whitespace-nowrap">
                        <button
                          onClick={() => handleEditClick(m)}
                          className="inline-flex items-center gap-1 px-3 py-2 bg-blue-50 hover:bg-blue-500 text-blue-600 hover:text-white rounded-lg text-xs font-bold transition-colors mr-2"
                        >
                          <Edit2 size={12} /> Editar
                        </button>
                        <button
                          onClick={() => handleDelete(m._id, m.name)}
                          disabled={deleting === m._id}
                          className="inline-flex items-center gap-1 px-3 py-2 bg-red-50 hover:bg-red-500 text-red-600 hover:text-white rounded-lg text-xs font-bold transition-colors disabled:opacity-50"
                        >
                          {deleting === m._id ? (
                            <Loader2 size={12} className="animate-spin" />
                          ) : (
                            <Trash2 size={12} />
                          )}
                          Remover
                        </button>
                      </td>
                    </tr>
                  ))}

                  {mentors.length === 0 && (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-slate-400 font-medium">
                        Nenhum mentor cadastrado.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
