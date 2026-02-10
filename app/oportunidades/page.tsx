'use client'

import { useState } from "react";
import Image from "next/image";
import { 
  Search, 
  FileDown, 
  Building2, 
  ArrowRight, 
  Mail, 
  Phone, 
  MessageSquare,
  X,
  UserCircle2
} from "lucide-react";

interface Opportunity {
  id: number;
  companyName: string;
  companyLogo: string;
  title: string;
  description: string;
  pdfLink: string;
  tags: string[];
}

const opportunitiesData: Opportunity[] = [
  {
    id: 1,
    companyName: "AgroForte S.A.",
    companyLogo: "/assets/images/mentors/avatar-placeholder.png",
    title: "Monitoramento de Pragas via Drone Autônomo",
    description: "Buscamos soluções de visão computacional para identificar pragas em plantações de soja em tempo real, sem necessidade de operador humano constante.",
    pdfLink: "/assets/docs/desafio-agroforte.pdf",
    tags: ["AgroTech", "Drones", "IA"]
  },
  {
    id: 2,
    companyName: "Varejo Mix",
    companyLogo: "/assets/images/mentors/avatar-placeholder.png",
    title: "Otimização de Estoque Preditiva",
    description: "Precisamos de um algoritmo que cruze dados meteorológicos e históricos de vendas para prever a demanda de produtos sazonais.",
    pdfLink: "/assets/docs/desafio-varejo.pdf",
    tags: ["Retail", "Big Data"]
  },
  {
    id: 3,
    companyName: "Indústria Metal",
    companyLogo: "/assets/images/mentors/avatar-placeholder.png",
    title: "Eficiência Energética em Fornos",
    description: "Desafio voltado para IoT e automação para reduzir o consumo de gás em fornos industriais através de monitoramento inteligente.",
    pdfLink: "/assets/docs/desafio-metal.pdf",
    tags: ["Indústria 4.0", "IoT"]
  },
  {
    id: 4,
    companyName: "Health Plus",
    companyLogo: "/assets/images/mentors/avatar-placeholder.png",
    title: "Triagem de Pacientes via Chatbot",
    description: "Solução para pré-atendimento hospitalar utilizando NLP para classificar a urgência dos pacientes antes da chegada ao hospital.",
    pdfLink: "/assets/docs/desafio-health.pdf",
    tags: ["HealthTech", "Chatbot"]
  },
  {
    id: 5,
    companyName: "Logística Express",
    companyLogo: "/assets/images/mentors/avatar-placeholder.png",
    title: "Roteirização de Última Milha",
    description: "Software para otimizar rotas de entrega em cidades pequenas com base em tráfego em tempo real.",
    pdfLink: "/assets/docs/desafio-logistica.pdf",
    tags: ["Logística", "SaaS"]
  },
];

export default function BancoOportunidadesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const filteredOpps = opportunitiesData.filter(op => 
    op.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    op.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    op.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex flex-col gap-20 pb-20 bg-slate-50 min-h-screen">
      
      <section className="pt-12 animate-fade-up">
        <div className="section-default text-center flex flex-col items-center gap-6">
            <span className="bg-blue-100 text-blue-600 px-4 py-1.5 rounded-full font-bold tracking-widest uppercase text-xs border border-blue-200">
                Inovação Aberta
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-gray-800 tracking-tight">
                Banco de Oportunidades
            </h1>
            <p className="text-gray-500 max-w-3xl text-lg leading-relaxed">
                Conectamos dores reais do mercado a soluções inovadoras. 
                Empresas lançam seus desafios e startups apresentam suas tecnologias para resolvê-los.
            </p>

            <div className="relative w-full max-w-lg mt-4 group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                </div>
                <input 
                    type="text" 
                    placeholder="Busque por tecnologias, empresas ou problemas..." 
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 shadow-sm focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none bg-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>
      </section>

      <section className="animate-fade-up animate-delay-200">
         <div className="section-default">
            
            <div className="flex items-center gap-3 mb-10">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg text-white shadow-lg shadow-blue-200">
                    <Building2 size={24} />
                </div>
                <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-cyan-500">
                    Desafios em Aberto
                </h2>
            </div>

            {filteredOpps.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredOpps.map((item) => (
                        <div 
                            key={item.id}
                            className="bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 border border-blue-50 hover:border-blue-200 group flex flex-col overflow-hidden hover:-translate-y-2 h-full"
                        >
                            <div className="h-32 bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-6 relative border-b border-slate-100">
                                <div className="relative w-24 h-24 bg-white rounded-full p-2 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform duration-500 flex items-center justify-center">
                                    <div className="relative w-full h-full">
                                        <Image 
                                            src={item.companyLogo} 
                                            alt={item.companyName} 
                                            fill 
                                            className="object-contain rounded-full"
                                        />
                                    </div>
                                </div>
                                <div className="absolute top-3 right-3 flex gap-1">
                                    {item.tags.slice(0, 1).map((tag, i) => (
                                        <span key={i} className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md border border-blue-100">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-grow">
                                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                                    {item.companyName}
                                </span>
                                <h3 className="text-lg font-bold text-gray-800 leading-tight mb-3 group-hover:text-blue-600 transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-4 text-justify">
                                    {item.description}
                                </p>

                                <div className="mt-auto pt-4 border-t border-gray-100">
                                    <a 
                                        href={item.pdfLink} 
                                        download
                                        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-blue-50 text-blue-600 font-bold text-sm hover:bg-blue-600 hover:text-white transition-all duration-300 group/btn"
                                    >
                                        <FileDown size={18} className="group-hover/btn:animate-bounce" />
                                        Baixar Detalhes
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                    <p className="text-gray-400">Nenhum desafio encontrado para "{searchTerm}"</p>
                </div>
            )}

         </div>
      </section>

      <section className="animate-fade-up animate-delay-300">
         <div className="section-default max-w-3xl mx-auto">
             
             <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-blue-100 flex flex-col items-center text-center gap-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
                
                <h2 className="text-2xl font-black text-gray-800">
                    Tem a solução para um desses problemas?
                </h2>
                <p className="text-gray-500 -mt-4">
                    Entre em contato com nosso responsável técnico para apresentar sua proposta.
                </p>

                <div className="flex flex-col items-center gap-4 group cursor-pointer" onClick={() => setIsContactModalOpen(true)}>
                    <div className="relative w-32 h-32 rounded-full p-1.5 border-2 border-dashed border-blue-200 group-hover:border-blue-500 transition-colors duration-300">
                         <div className="relative w-full h-full rounded-full overflow-hidden shadow-md">
                             <Image 
                                src="/assets/images/nelito.png" 
                                alt="Nelito"
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                             />
                         </div>
                         <div className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full border-4 border-white shadow-sm">
                             <MessageSquare size={16} />
                         </div>
                    </div>
                    
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">Nelito</h3>
                        <span className="text-sm font-medium text-gray-400 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                            Responsável Técnico
                        </span>
                    </div>

                    <button className="mt-2 text-sm font-bold text-blue-500 flex items-center gap-1 hover:underline">
                        Ver Informações de Contato <ArrowRight size={14}/>
                    </button>
                </div>

             </div>
         </div>
      </section>

      {isContactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={() => setIsContactModalOpen(false)}
            ></div>

            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-up animate-duration-300 flex flex-col">
                <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-6 flex justify-between items-start text-white">
                    <div>
                        <h3 className="text-2xl font-black">Entre em Contato</h3>
                        <p className="text-blue-100 text-sm mt-1">Fale diretamente com o Nelito</p>
                    </div>
                    <button 
                        onClick={() => setIsContactModalOpen(false)}
                        className="p-2 bg-white/20 hover:bg-white/40 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-8 flex flex-col gap-6">
                    
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                                <Mail size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 font-bold uppercase">E-mail</p>
                                <a href="mailto:nelito@itecpb.com.br" className="text-gray-800 font-semibold hover:text-blue-600">
                                    nelito@itecpb.com.br
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <div className="bg-green-100 p-3 rounded-full text-green-600">
                                <Phone size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 font-bold uppercase">Telefone / WhatsApp</p>
                                <a href="tel:+554691153505" className="text-gray-800 font-semibold hover:text-green-600">
                                    (46) 9115-3505
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-xl">
                        <h4 className="text-sm font-bold text-yellow-700 mb-2 flex items-center gap-2">
                            💡 Dica para a mensagem:
                        </h4>
                        <p className="text-sm text-yellow-800 italic leading-relaxed">
                            "Olá Nelito, me chamo [Seu Nome]. Represento a startup [Sua Startup] e gostaria de apresentar uma solução para o problema <strong>[Nome do Problema]</strong> da empresa <strong>[Nome da Empresa]</strong>. Em anexo segue nosso pitch."
                        </p>
                    </div>

                    <button 
                        onClick={() => setIsContactModalOpen(false)}
                        className="w-full py-3 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-colors"
                    >
                        Fechar
                    </button>
                </div>
            </div>
        </div>
      )}

    </div>
  );
}