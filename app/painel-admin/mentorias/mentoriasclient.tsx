"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Loader2,
  ArrowLeft,
  CalendarCheck,
  Users,
  Filter,
  MessageSquare,
  RotateCcw,
} from "lucide-react";

interface MentorshipRequest {
  _id: string;
  mentorName: string;
  incubadoName: string;
  incubadoEmail: string;
  status: "Pendente" | "Aprovado" | "Rejeitado";
  mesReferencia: string;
  motivoRejeicao?: string;
  solicitadoEm: string;
  resolvidoEm?: string;
}

export default function MentoriasClient({ userEmail, userRole }: { userEmail: string; userRole: string }) {
  const [requests, setRequests] = useState<MentorshipRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"Pendente" | "Aprovado" | "Rejeitado">("Pendente");
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [rejectModal, setRejectModal] = useState<{ requestId: string; mentorName: string } | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [resetting, setResetting] = useState(false);
  const [resetFeedback, setResetFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Busca as solicitações da API
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch("/api/mentores/admin");
        if (res.ok) {
          const data = await res.json();
          setRequests(data.requests || []);
        }
      } catch (error) {
        console.error("Erro ao buscar solicitações:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  // Filtro por status
  const filteredRequests = useMemo(
    () => requests.filter((r) => r.status === activeTab),
    [requests, activeTab]
  );

  // Contadores
  const counts = useMemo(
    () => ({
      Pendente: requests.filter((r) => r.status === "Pendente").length,
      Aprovado: requests.filter((r) => r.status === "Aprovado").length,
      Rejeitado: requests.filter((r) => r.status === "Rejeitado").length,
    }),
    [requests]
  );

  // Aprovar solicitação
  const handleAprovar = async (requestId: string) => {
    const confirm = window.confirm("Confirma a APROVAÇÃO desta mentoria? As vagas do mentor serão decrementadas.");
    if (!confirm) return;

    setProcessingId(requestId);
    try {
      const res = await fetch("/api/mentores/admin", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId, action: "aprovar" }),
      });

      if (res.ok) {
        setRequests((prev) =>
          prev.map((r) =>
            r._id === requestId
              ? { ...r, status: "Aprovado" as const, resolvidoEm: new Date().toISOString() }
              : r
          )
        );
      } else {
        const err = await res.json();
        alert(`Erro: ${err.error}`);
      }
    } catch {
      alert("Erro de conexão.");
    } finally {
      setProcessingId(null);
    }
  };

  // Rejeitar solicitação
  const handleRejeitar = async () => {
    if (!rejectModal) return;

    setProcessingId(rejectModal.requestId);
    try {
      const res = await fetch("/api/mentores/admin", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestId: rejectModal.requestId,
          action: "rejeitar",
          motivoRejeicao: rejectReason,
        }),
      });

      if (res.ok) {
        setRequests((prev) =>
          prev.map((r) =>
            r._id === rejectModal.requestId
              ? {
                  ...r,
                  status: "Rejeitado" as const,
                  motivoRejeicao: rejectReason,
                  resolvidoEm: new Date().toISOString(),
                }
              : r
          )
        );
        setRejectModal(null);
        setRejectReason("");
      } else {
        const err = await res.json();
        alert(`Erro: ${err.error}`);
      }
    } catch {
      alert("Erro de conexão.");
    } finally {
      setProcessingId(null);
    }
  };

  const statusConfig = {
    Pendente: { color: "bg-yellow-100 text-yellow-700 border-yellow-200", icon: Clock },
    Aprovado: { color: "bg-green-100 text-green-700 border-green-200", icon: CheckCircle2 },
    Rejeitado: { color: "bg-red-100 text-red-700 border-red-200", icon: XCircle },
  };

  // Reset manual de vagas (apenas admin)
  const handleResetSlots = async () => {
    if (!window.confirm("Tem certeza que deseja resetar as vagas de TODOS os mentores para o valor total? Esta ação não pode ser desfeita.")) return;
    setResetting(true);
    setResetFeedback(null);
    try {
      const res = await fetch("/api/mentores/reset-slots", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setResetFeedback({ type: "success", message: `✅ Vagas resetadas! ${data.modifiedCount} mentor(es) atualizados.` });
      } else {
        setResetFeedback({ type: "error", message: data.error || "Erro ao resetar vagas." });
      }
    } catch {
      setResetFeedback({ type: "error", message: "Erro de conexão." });
    } finally {
      setResetting(false);
      setTimeout(() => setResetFeedback(null), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <header className="bg-slate-900 text-white pt-12 pb-12 px-6 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <span className="bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 inline-block">
              Triagem de Mentorias
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Painel de Mentorias
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Aprovação e gerenciamento de solicitações de mentoria do ITECPB.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 bg-slate-800 p-3 rounded-2xl border border-slate-700">
            <div className="text-right">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                {userRole === "admin" ? "Administrador" : "Gestor de Mentorias"}
              </p>
              <p className="text-xs font-bold text-slate-200">{userEmail}</p>
            </div>

            {/* Botão Reset apenas para admins */}
            {userRole === "admin" && (
              <button
                onClick={handleResetSlots}
                disabled={resetting}
                title="Reseta as vagas de todos os mentores para o valor total (uso mensal)"
                className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 disabled:opacity-60"
              >
                {resetting ? <Loader2 size={12} className="animate-spin" /> : <RotateCcw size={12} />}
                Reset de Vagas
              </button>
            )}

            <Link
              href="/painel-admin/mentores"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1"
            >
              Gestão de Mentores
            </Link>

            {userRole === "admin" && (
              <Link
                href="/painel-admin"
                className="bg-slate-700 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1"
              >
                <ArrowLeft size={12} /> Voltar
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Feedback do Reset de Vagas */}
        {resetFeedback && (
          <div className={`mb-6 flex items-center gap-3 p-4 rounded-2xl text-sm font-medium border ${
            resetFeedback.type === "success"
              ? "bg-green-50 text-green-700 border-green-200"
              : "bg-red-50 text-red-700 border-red-200"
          }`}>
            {resetFeedback.message}
          </div>
        )}
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {(["Pendente", "Aprovado", "Rejeitado"] as const).map((status) => {
            const config = statusConfig[status];
            const Icon = config.icon;
            const isActive = activeTab === status;
            return (
              <button
                key={status}
                onClick={() => setActiveTab(status)}
                className={`flex items-center gap-4 p-6 rounded-2xl border transition-all text-left ${
                  isActive
                    ? "bg-white shadow-lg border-blue-200 ring-2 ring-blue-100"
                    : "bg-white border-slate-100 hover:border-blue-100 hover:shadow-md"
                }`}
              >
                <div className={`p-3 rounded-xl ${config.color} border`}>
                  <Icon size={24} />
                </div>
                <div>
                  <p className="text-3xl font-black text-slate-800">{counts[status]}</p>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{status}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center py-20 gap-3">
            <Loader2 size={24} className="animate-spin text-blue-500" />
            <p className="text-slate-400 font-medium">Carregando solicitações...</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100/50 border-b border-slate-200 text-[10px] uppercase tracking-widest text-slate-500">
                    <th className="p-4 font-black">Data</th>
                    <th className="p-4 font-black">Incubado</th>
                    <th className="p-4 font-black">Mentor</th>
                    <th className="p-4 font-black">Mês Ref.</th>
                    <th className="p-4 font-black">Status</th>
                    <th className="p-4 font-black text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {filteredRequests.map((req) => {
                    const statusConf = statusConfig[req.status];
                    const StatusIcon = statusConf.icon;
                    return (
                      <tr
                        key={req._id}
                        className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                      >
                        <td className="p-4 text-slate-500 font-medium whitespace-nowrap">
                          {new Date(req.solicitadoEm).toLocaleDateString("pt-BR")}
                        </td>
                        <td className="p-4">
                          <p className="font-bold text-slate-800">{req.incubadoName}</p>
                          <p className="text-xs text-slate-400">{req.incubadoEmail}</p>
                        </td>
                        <td className="p-4">
                          <p className="font-bold text-slate-700">{req.mentorName}</p>
                        </td>
                        <td className="p-4">
                          <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-[10px] font-bold border border-blue-100">
                            {req.mesReferencia}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${statusConf.color}`}>
                            <StatusIcon size={12} />
                            {req.status}
                          </span>
                          {req.status === "Rejeitado" && req.motivoRejeicao && (
                            <p className="text-[10px] text-red-500 mt-1 max-w-[200px] truncate" title={req.motivoRejeicao}>
                              {req.motivoRejeicao}
                            </p>
                          )}
                        </td>
                        <td className="p-4 text-right space-x-2 whitespace-nowrap">
                          {req.status === "Pendente" && (
                            <>
                              <button
                                onClick={() => handleAprovar(req._id)}
                                disabled={processingId === req._id}
                                className="inline-flex items-center gap-1 px-3 py-2 bg-green-50 hover:bg-green-500 text-green-600 hover:text-white rounded-lg text-xs font-bold transition-colors"
                              >
                                {processingId === req._id ? (
                                  <Loader2 size={12} className="animate-spin" />
                                ) : (
                                  <CheckCircle2 size={12} />
                                )}
                                Aprovar
                              </button>
                              <button
                                onClick={() =>
                                  setRejectModal({
                                    requestId: req._id,
                                    mentorName: req.mentorName,
                                  })
                                }
                                disabled={processingId === req._id}
                                className="inline-flex items-center gap-1 px-3 py-2 bg-red-50 hover:bg-red-500 text-red-600 hover:text-white rounded-lg text-xs font-bold transition-colors"
                              >
                                <XCircle size={12} /> Rejeitar
                              </button>
                            </>
                          )}
                          {req.status !== "Pendente" && req.resolvidoEm && (
                            <span className="text-[10px] text-slate-400">
                              {new Date(req.resolvidoEm).toLocaleDateString("pt-BR")}
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}

                  {filteredRequests.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-slate-400 font-medium">
                        Nenhuma solicitação com status "{activeTab}" encontrada.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Modal de Rejeição */}
      {rejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => {
              setRejectModal(null);
              setRejectReason("");
            }}
          ></div>
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 animate-fade-up">
            <h3 className="text-xl font-black text-slate-800 mb-2 flex items-center gap-2">
              <MessageSquare size={20} className="text-red-500" />
              Motivo da Rejeição
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              Informe o motivo da rejeição para <strong>{rejectModal.mentorName}</strong>. O incubado receberá por e-mail.
            </p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Ex: Agenda do mentor indisponível para este mês..."
              className="w-full border border-slate-200 rounded-xl p-4 text-sm text-slate-700 focus:ring-2 focus:ring-red-200 focus:border-red-300 outline-none resize-none h-28 mb-6"
            />
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setRejectModal(null);
                  setRejectReason("");
                }}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl text-sm transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleRejeitar}
                disabled={processingId === rejectModal.requestId}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
              >
                {processingId === rejectModal.requestId ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <XCircle size={14} />
                )}
                Confirmar Rejeição
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
