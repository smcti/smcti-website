"use client";

import { useState, useRef } from "react";

// Categorias padronizadas
const CATEGORIAS_OFICIAIS = [
  "Desenvolvimento", "Design/UX", "Administração", "Engenharia", 
  "Marketing", "Suporte TI", "Vendas", "Gestão de Projetos"
];

export default function CurriculoForm() {
  const [categorias, setCategorias] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Lógica para limitar a 3 categorias
  const toggleCategoria = (cat: string) => {
    if (categorias.includes(cat)) {
      setCategorias(prev => prev.filter(c => c !== cat));
    } else {
      if (categorias.length >= 3) {
        alert("Você pode selecionar no máximo 3 áreas de atuação.");
        return;
      }
      setCategorias(prev => [...prev, cat]);
    }
  };

  // Intercepta o envio do formulário para abrir o Pop-up LGPD
  const prepararEnvio = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (categorias.length === 0) {
      alert("Por favor, selecione pelo menos uma área de atuação.");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const pdfFile = formData.get("pdf") as File;
    
    // Validação de tamanho (Ex: Limite de 2MB para proteger o banco)
    if (pdfFile && pdfFile.size > 2 * 1024 * 1024) {
      alert("O currículo deve ter no máximo 2MB.");
      return;
    }

    setShowModal(true); // Abre o modal em vez de enviar
  };

  // Função que realmente envia os dados para a API
  const confirmarEnvio = async () => {
    if (!formRef.current) return;
    
    setIsSubmitting(true);
    const formData = new FormData(formRef.current);
    
    // Anexa as categorias como uma string JSON
    formData.append("categorias", JSON.stringify(categorias));

    try {
      const res = await fetch("/api/curriculos", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (res.ok) {
        alert("Sucesso! Seu currículo foi cadastrado no Banco de Talentos.");
        formRef.current.reset();
        setCategorias([]);
        setShowModal(false);
      } else {
        alert(`Erro: ${result.error}`);
        setShowModal(false);
      }
    } catch (error) {
      alert("Erro ao conectar com o servidor.");
      setShowModal(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
      <form ref={formRef} onSubmit={prepararEnvio} className="space-y-6">
        
        {/* Dados Básicos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Nome Completo</label>
            <input type="text" name="nome" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" placeholder="João da Silva" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">E-mail</label>
            <input type="email" name="email" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" placeholder="joao@email.com" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Telefone / WhatsApp</label>
            <input type="tel" name="telefone" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" placeholder="(46) 99999-9999" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Formação Acadêmica</label>
            <input type="text" name="formacao" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" placeholder="Ex: Engenharia de Computação - UTFPR" />
          </div>
        </div>

        {/* Seleção de Categorias (Máx 3) */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Área de Atuação (Selecione até 3)</label>
          <div className="flex flex-wrap gap-2">
            {CATEGORIAS_OFICIAIS.map(cat => (
              <button
                type="button"
                key={cat}
                onClick={() => toggleCategoria(cat)}
                className={`px-4 py-2 text-xs rounded-full border font-bold transition-all ${
                  categorias.includes(cat) 
                    ? 'bg-blue-600 text-white border-blue-600' 
                    : 'bg-white text-gray-500 border-gray-300 hover:border-blue-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Objetivo */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Resumo Profissional / Objetivo</label>
          <textarea name="objetivo" required rows={3} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none resize-none" placeholder="Conte-nos um pouco sobre suas habilidades e o que busca..." />
        </div>

        {/* Upload de PDF */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Anexar Currículo (PDF, máx 2MB)</label>
          <input type="file" name="pdf" accept="application/pdf" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
        </div>

        <button type="submit" className="w-full bg-slate-900 hover:bg-blue-600 text-white font-bold py-4 rounded-xl transition-colors">
          Enviar para o Banco de Talentos
        </button>
      </form>

      {/* MODAL LGPD E AVISO DE 6 MESES */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-3xl max-w-lg w-full shadow-2xl">
            <h3 className="text-2xl font-black text-slate-900 mb-4">Termos de Privacidade</h3>
            
            <div className="text-sm text-slate-600 mb-8 space-y-4">
              <p>
                Ao clicar em confirmar, você autoriza que os dados fornecidos e o currículo em anexo sejam visualizados por empresas do Parque Tecnológico e parceiros do ecossistema de inovação de Pato Branco.
              </p>
              <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl text-blue-800">
                <p className="font-bold flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  Retenção de Dados: 6 Meses
                </p>
                <p className="mt-1 text-xs">
                  Para manter nosso banco sempre atualizado e em conformidade com as leis de proteção de dados, seu currículo será <strong>removido automaticamente após 6 meses</strong>. Caso ainda esteja buscando oportunidades após este período, será necessário realizar um novo envio.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setShowModal(false)} 
                disabled={isSubmitting}
                className="flex-1 py-3.5 text-slate-500 font-bold hover:bg-slate-50 rounded-xl transition-colors border border-transparent hover:border-slate-200"
              >
                Cancelar
              </button>
              <button 
                onClick={confirmarEnvio} 
                disabled={isSubmitting}
                className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-colors flex justify-center items-center"
              >
                {isSubmitting ? "Enviando..." : "Aceitar e Enviar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}