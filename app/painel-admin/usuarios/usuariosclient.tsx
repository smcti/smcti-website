"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  UserPlus,
  Trash2,
  Loader2,
  ArrowLeft,
  Shield,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Users,
} from "lucide-react";

interface Usuario {
  _id: string;
  email: string;
  emailMasked: string;
  role: string;
  createdAt: string;
}

const ROLE_LABELS: Record<string, { label: string; color: string }> = {
  admin: { label: "Admin", color: "bg-red-100 text-red-700 border-red-200" },
  gestor_mentorias: { label: "Gestor de Mentorias", color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  empresario: { label: "Empresário", color: "bg-blue-100 text-blue-700 border-blue-200" },
  usuario: { label: "Usuário", color: "bg-gray-100 text-gray-600 border-gray-200" },
};

export default function UsuariosClient({ adminEmail }: { adminEmail: string }) {
  const [users, setUsers] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Form state — minimização de dados (LGPD)
  const [form, setForm] = useState({ email: "", password: "", role: "gestor_mentorias" });
  const [formLoading, setFormLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/usuarios");
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users || []);
      }
    } catch {
      console.error("Erro ao buscar usuários.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const showFeedback = (type: "success" | "error", message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      const res = await fetch("/api/admin/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        showFeedback("success", `Usuário ${form.email} criado com sucesso!`);
        setForm({ email: "", password: "", role: "gestor_mentorias" });
        fetchUsers(); // recarrega a lista
      } else {
        showFeedback("error", data.error || "Erro ao criar usuário.");
      }
    } catch {
      showFeedback("error", "Erro de conexão.");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: string, email: string) => {
    if (!window.confirm(`Tem certeza que deseja remover o usuário "${email}"? Esta ação é irreversível.`)) return;
    setDeleting(id);

    try {
      const res = await fetch(`/api/admin/usuarios?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok) {
        showFeedback("success", "Usuário removido com sucesso.");
        setUsers((prev) => prev.filter((u) => u._id !== id));
      } else {
        showFeedback("error", data.error || "Erro ao remover usuário.");
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
            <span className="bg-red-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 inline-block">
              Acesso Restrito — Admin
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-3">
              <Shield size={28} className="text-red-400" />
              Gestão de Usuários
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Criação e gerenciamento de acessos. Dados protegidos conforme LGPD.
            </p>
          </div>
          <div className="flex items-center gap-4 bg-slate-800 p-3 rounded-2xl border border-slate-700">
            <div className="text-right">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Administrador</p>
              <p className="text-xs font-bold text-slate-200">{adminEmail}</p>
            </div>
            <Link
              href="/painel-admin"
              className="bg-slate-700 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1"
            >
              <ArrowLeft size={12} /> Voltar
            </Link>
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

        {/* Formulário de Criação */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
              <UserPlus size={22} />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-800">Criar Novo Usuário</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Apenas os campos necessários para acesso ao sistema (LGPD — minimização de dados).
              </p>
            </div>
          </div>

          <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">E-mail *</label>
              <input
                type="email"
                required
                placeholder="usuario@patobranco.tec.br"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none transition"
              />
            </div>

            {/* Senha */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Senha * (mín. 8 caracteres)</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={8}
                  placeholder="Senha temporária segura"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 pr-10 text-sm text-slate-700 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Role */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Perfil de Acesso *</label>
              <select
                required
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none transition bg-white"
              >
                <option value="gestor_mentorias">Gestor de Mentorias</option>
                <option value="empresario">Empresário</option>
                <option value="usuario">Usuário</option>
                <option value="admin">Admin (cuidado!)</option>
              </select>
            </div>

            <div className="md:col-span-3">
              <button
                type="submit"
                disabled={formLoading}
                className="w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all flex items-center gap-2 disabled:bg-blue-400"
              >
                {formLoading ? <Loader2 size={14} className="animate-spin" /> : <UserPlus size={14} />}
                {formLoading ? "Criando..." : "Criar Usuário"}
              </button>
            </div>
          </form>
        </div>

        {/* Lista de Usuários */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex items-center gap-3 p-6 border-b border-slate-100">
            <div className="p-2 bg-slate-50 rounded-xl text-slate-600">
              <Users size={22} />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-800">Usuários do Sistema</h2>
              <p className="text-xs text-slate-400">
                E-mails parcialmente mascarados (LGPD — Data Masking). Senhas nunca são exibidas.
              </p>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16 gap-3">
              <Loader2 size={24} className="animate-spin text-blue-500" />
              <p className="text-slate-400 font-medium">Carregando usuários...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100/50 border-b border-slate-200 text-[10px] uppercase tracking-widest text-slate-500">
                    <th className="p-4 font-black">E-mail (mascarado)</th>
                    <th className="p-4 font-black">Perfil</th>
                    <th className="p-4 font-black">Criado em</th>
                    <th className="p-4 font-black text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {users.map((u) => {
                    const roleConfig = ROLE_LABELS[u.role] || { label: u.role, color: "bg-gray-100 text-gray-600 border-gray-200" };
                    return (
                      <tr key={u._id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                        <td className="p-4">
                          <p className="font-bold text-slate-800">{u.emailMasked}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">ID: {u._id.slice(-8)}</p>
                        </td>
                        <td className="p-4">
                          <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${roleConfig.color}`}>
                            {roleConfig.label}
                          </span>
                        </td>
                        <td className="p-4 text-slate-500 font-medium whitespace-nowrap">
                          {new Date(u.createdAt).toLocaleDateString("pt-BR")}
                        </td>
                        <td className="p-4 text-right">
                          {u.email !== adminEmail ? (
                            <button
                              onClick={() => handleDelete(u._id, u.emailMasked)}
                              disabled={deleting === u._id}
                              className="inline-flex items-center gap-1 px-3 py-2 bg-red-50 hover:bg-red-500 text-red-600 hover:text-white rounded-lg text-xs font-bold transition-colors disabled:opacity-50"
                            >
                              {deleting === u._id ? (
                                <Loader2 size={12} className="animate-spin" />
                              ) : (
                                <Trash2 size={12} />
                              )}
                              Remover
                            </button>
                          ) : (
                            <span className="text-[10px] text-slate-400 font-medium">Sua conta</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}

                  {users.length === 0 && (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-slate-400 font-medium">
                        Nenhum usuário cadastrado.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Nota LGPD */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex gap-3">
          <Shield size={20} className="text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-amber-800">Conformidade LGPD</p>
            <p className="text-xs text-amber-700 mt-1 leading-relaxed">
              Todas as ações de criação e remoção de usuários são registradas em log de auditoria com o e-mail do administrador responsável e o IP da requisição. 
              Senhas são armazenadas exclusivamente como hash bcrypt (salt 12) e nunca são exibidas ou retornadas pela API. 
              E-mails são mascarados na exibição para minimização de dados expostos.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
