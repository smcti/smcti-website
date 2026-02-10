"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useSession } from "next-auth/react";

interface ProblemaInputs {
  titulo: string;
  descricao: string;
  nomeEmpresa: string;
  emailContato: string;
  arquivoDetalhesUrl: string;
}

export default function ProblemaForm() {
  const { data: session } = useSession();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProblemaInputs>({
    defaultValues: {
      nomeEmpresa: session?.user?.name || "", 
      emailContato: session?.user?.email || ""
    }
  });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  const onSubmit = async (data: ProblemaInputs) => {
    setLoading(true);
    try {
      const res = await fetch("/api/problemas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setFeedback("✅ Desafio cadastrado com sucesso!");
        reset();
      } else {
        setFeedback("❌ Erro ao cadastrar.");
      }
    } catch (error) {
      setFeedback("❌ Erro de conexão.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 rounded-lg shadow-md border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800">Cadastrar Desafio da Empresa</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Título do Problema</label>
        <input {...register("titulo", { required: true })} className="w-full border p-2 rounded mt-1" placeholder="Ex: Otimização de Logística" />
        {errors.titulo && <span className="text-red-500 text-xs">Obrigatório</span>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Nome da Empresa</label>
        <input {...register("nomeEmpresa", { required: true })} className="w-full border p-2 rounded mt-1" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email de Contato</label>
        <input {...register("emailContato", { required: true })} className="w-full border p-2 rounded mt-1" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Descrição Detalhada</label>
        <textarea {...register("descricao", { required: true })} rows={4} className="w-full border p-2 rounded mt-1" placeholder="Descreva a dor que precisa ser solucionada..." />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Link com Mais Detalhes (PDF/Drive)</label>
        <input {...register("arquivoDetalhesUrl", { required: true })} className="w-full border p-2 rounded mt-1" placeholder="https://..." />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 transition font-medium"
      >
        {loading ? "Cadastrando..." : "Registrar Desafio"}
      </button>
      
      {feedback && <p className="text-center mt-2 font-medium text-sm">{feedback}</p>}
    </form>
  );
}