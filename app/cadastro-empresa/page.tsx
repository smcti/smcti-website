"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  User,
  Briefcase,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
} from "lucide-react";

const AREAS_ATUACAO = [
  "Tecnologia da Informação",
  "Biotecnologia",
  "Agronegócio",
  "Saúde e Bem-Estar",
  "Educação",
  "Energia e Sustentabilidade",
  "Indústria e Manufatura",
  "Comércio e Varejo",
  "Serviços Financeiros",
  "Comunicação e Marketing",
  "Alimentação",
  "Logística e Transporte",
  "Outro",
];

export default function CadastroEmpresaPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    nomeEmpresa: "",
    nomeResponsavel: "",
    areaAtuacao: "",
    descricaoAtividades: "",
    email: "",
    confirmarEmail: "",
    senha: "",
  });

  const [showSenha, setShowSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    // Validação local de emails
    if (form.email.toLowerCase() !== form.confirmarEmail.toLowerCase()) {
      setFeedback({ type: "error", message: "Os e-mails informados não coincidem." });
      return;
    }
    if (form.senha.length < 8) {
      setFeedback({ type: "error", message: "A senha deve ter no mínimo 8 caracteres." });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/cadastro-empresa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setFeedback({ type: "success", message: data.message });
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setFeedback({ type: "error", message: data.error });
      }
    } catch {
      setFeedback({
        type: "error",
        message: "Erro de conexão. Verifique sua internet e tente novamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl shadow-lg mb-5">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-2">
            Cadastro de Empresa
          </h1>
          <p className="text-gray-500 text-base max-w-md mx-auto">
            Preencha os dados abaixo para cadastrar sua empresa no Parque
            Tecnológico de Pato Branco.
          </p>
        </div>

        {/* Card do Formulário */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-blue-600 to-cyan-500" />

          <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-6">

            {/* Dados da Empresa */}
            <div>
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Building2 className="w-4 h-4" /> Dados da Empresa
              </h2>
              <div className="flex flex-col gap-4">
                {/* Nome da empresa */}
                <div>
                  <label htmlFor="nomeEmpresa" className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Nome da empresa <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="nomeEmpresa"
                    name="nomeEmpresa"
                    type="text"
                    required
                    placeholder="Ex: TechSolutions Ltda."
                    value={form.nomeEmpresa}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Área de atuação */}
                <div>
                  <label htmlFor="areaAtuacao" className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Área de atuação <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="areaAtuacao"
                    name="areaAtuacao"
                    required
                    value={form.areaAtuacao}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                  >
                    <option value="" disabled>
                      Selecione uma área...
                    </option>
                    {AREAS_ATUACAO.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Descrição */}
                <div>
                  <label htmlFor="descricaoAtividades" className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Descrição das atividades
                  </label>
                  <textarea
                    id="descricaoAtividades"
                    name="descricaoAtividades"
                    rows={3}
                    placeholder="Descreva brevemente as atividades desenvolvidas pela empresa..."
                    value={form.descricaoAtividades}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  />
                </div>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Dados do Responsável */}
            <div>
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <User className="w-4 h-4" /> Dados do Responsável
              </h2>
              <div className="flex flex-col gap-4">
                {/* Nome do responsável */}
                <div>
                  <label htmlFor="nomeResponsavel" className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Nome do responsável <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="nomeResponsavel"
                    name="nomeResponsavel"
                    type="text"
                    required
                    placeholder="Ex: João da Silva"
                    value={form.nomeResponsavel}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">
                    E-mail <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="empresa@exemplo.com"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Confirmar email */}
                <div>
                  <label htmlFor="confirmarEmail" className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Confirmar e-mail <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      id="confirmarEmail"
                      name="confirmarEmail"
                      type="email"
                      required
                      placeholder="Repita o e-mail"
                      value={form.confirmarEmail}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Senha */}
                <div>
                  <label htmlFor="senha" className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Senha <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      id="senha"
                      name="senha"
                      type={showSenha ? "text" : "password"}
                      required
                      placeholder="Mínimo 8 caracteres"
                      value={form.senha}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl pl-10 pr-12 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSenha((p) => !p)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showSenha ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-1.5">Mínimo de 8 caracteres.</p>
                </div>
              </div>
            </div>

            {/* Feedback */}
            {feedback && (
              <div
                className={`flex items-center gap-3 p-4 rounded-xl text-sm font-medium ${
                  feedback.type === "success"
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {feedback.type === "success" ? (
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 shrink-0" />
                )}
                {feedback.message}
              </div>
            )}

            {/* Botão */}
            <button
              type="submit"
              disabled={loading || feedback?.type === "success"}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-200 hover:shadow-xl"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Cadastrando...
                </>
              ) : feedback?.type === "success" ? (
                <>
                  <CheckCircle2 className="w-4 h-4" /> Redirecionando para o login...
                </>
              ) : (
                <>
                  Cadastrar Empresa <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>

            <p className="text-center text-sm text-gray-400">
              Já tem cadastro?{" "}
              <a href="/login" className="text-blue-600 font-semibold hover:underline">
                Faça login aqui
              </a>
            </p>
          </form>
        </div>

        {/* Rodapé */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Parque Tecnológico de Pato Branco — SMCTI
        </p>
      </div>
    </div>
  );
}
