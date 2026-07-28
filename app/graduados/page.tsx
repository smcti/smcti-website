'use client'

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, ArrowRight, Layers, Trophy, Calendar, X, Globe, User, Mail, Package, ExternalLink } from "lucide-react";

interface Graduada {
  id: number;
  name: string;
  logo: string;
  description: string;
  segmento: string;
  founder: string;
  email: string;
  phone: string;
  products: string[];
  graduatedDate: string;
  link?: string;
  fullDescription?: string;
}
const graduadasData: Graduada[] = [
  {
    id: 1,
    name: "DataOn Sistemas",
    logo: "/assets/images/logosgraduadas/DataOnSistemas.jpg",
    description: "Desenvolvimento de soluções de gestão para pequenas e médias empresas.",
    graduatedDate: "15/08/2020",
    segmento: "Software",
    link: "http://www.dataon.com.br",
    fullDescription: "Empresa nasceu em 2017, incubou na ITECPB em 2019 para validar o MVP, validando o produto e ganhando mercado, saindo da incubadora em 2023. Hoje atuamos em 13 estados brasileiros, com uma carteira de 1000 usuários ativos e 200 empresas atendidas.",
    founder: "Rafael Marques",
    email: "contato@dataon.com.br",
    phone: "(46) 2604-0470",
    products: ["Varejo", "Serviços", "Clínicas Veterinárias", "Pet-shops"]
  },
  {
    id: 2,
    name: "Mogo",
    logo: "/assets/images/logosgraduadas/mogo.png",
    description: "A Mogo simplifica operações no Food Service com tecnologia, automação e inteligência.",
    graduatedDate: "10/02/2018",
    segmento: "Software",
    link: "http://mogo.com.br",
    fullDescription: "A Mogo é uma empresa de tecnologia que transforma bares e restaurantes em operações eficientes, organizadas e lucrativas.\n\nPor meio de uma plataforma completa, conecta atendimento, gestão e finanças, trazendo controle total e decisões mais inteligentes para o dia a dia do negócio.",
    founder: "Flávio César de Medeira",
    email: "contato@mogo.com.br",
    phone: "(46)3225-9196",
    products: ["Alimentação"]
  },
  {
    id: 3,
    name: "Mercattum",
    logo: "/assets/images/logosgraduadas/mercattum.png",
    description: "Programa de Fidelidade com cashback para supermercados e Força de Vendas para atacados e distribuidoras.",
    graduatedDate: "22/11/2019",
    segmento: "Software",
    link: "https://mercattum.com/",
    fullDescription: "A Mercattum deseja fornecer para varejistas de pequeno e médio porte uma única plataforma que leve tecnologia, inovação e gestão, com preço justo. Ofertando dados, gestão de vendas e de relacionamento e novos benefícios para lojistas e consumidores.",
    founder: "Lucas Messias",
    email: "contato@mercattum.com",
    phone: "(46)2604-0527",
    products: ["Varejo", "Atacado"]
  },
  {
    id: 4,
    name: "Widesys Softwares",
    logo: "/assets/images/logosgraduadas/widesys.png",
    description: "A Widesys automatiza processos imobiliários para aumentar a produtividade de imobiliárias e corretores.",
    graduatedDate: "05/03/2021",
    segmento: "Software",
    link: "https://widesys.com.br/",
    fullDescription: "A Inovatech desenvolveu plataformas inovadoras de gestão agrícola e hoje atende produtores em todo o Brasil, com soluções integradas de campo e escritório.",
    founder: "Evandromar Machado",
    email: "widesys@widesys.com.br",
    phone: "(46)3040-0385",
    products: ["Mercado Imobiliário"]
  },
  {
    id: 5,
    name: "Átrio Softwares",
    logo: "/assets/images/logosgraduadas/atrio.png",
    description: "Softwares de gestão para clínicas multidisciplinares.",
    graduatedDate: "18/07/2022",
    segmento: "Software",
    link: "http://atriosoftwares.com.br",
    fullDescription: "A Átrio é uma plataforma SaaS especializada na gestão de clínicas multidisciplinares, com mais de 6 anos de mercado e 300+ clínicas ativas em todo o Brasil. Oferece soluções integradas de agendamento, prontuário eletrônico, faturamento, gestão financeira e módulos clínicos avançados — incluindo suporte às principais metodologias do segmento. A plataforma é composta pelos produtos Plataforma Átrio, Átrio Med e Átrio Multi, atendendo desde clínicas de médio porte até grandes centros multidisciplinares, com infraestrutura em nuvem e aplicativo mobile próprio.",
    founder: "Rafael Fernando Dal Bosco",
    email: "financeiro@agendetecnologias.com",
    phone: "(46)99131-0173",
    products: ["Saúde"]
  },
  {
    id: 6,
    name: "Terris Tecnologias",
    logo: "/assets/images/logosgraduadas/terris.png",
    description: "Equipamentos para agricultura de precisão.",
    graduatedDate: "30/04/2023",
    segmento: "Hardware e Software",
    link: "https://terris.com.br",
    fullDescription: "A Terris é uma indústria de tecnologia para agricultura de precisão com sede na cidade de Pato Branco – Paraná, que desde 2015 desenvolve soluções tecnológicas que visam uma maior produtividade, diminuição de perdas e economia de insumos.",
    founder: "Josimar Tumelero, Sidney Gaspari",
    email: "terristecnologia@gmail.com",
    phone: "(46)99121-2913",
    products: ["Agro"]
  },
];

export default function GraduadosSection() {
  const [selectedGraduada, setSelectedGraduada] = useState<Graduada | null>(null);

  return (
    <section className="py-16 overflow-hidden relative min-h-screen z-0">
      {/* ===== SEÇÃO: EMPRESAS GRADUADAS ===== */}
      <div className="w-full border-t border-gray-100 relative">
        <div className="section-default flex flex-col gap-8 mb-12 px-4 max-w-7xl mx-auto relative z-10 mt-6">
          <div className="text-center flex flex-col items-center gap-4">
            <span className="inline-flex items-center gap-2 bg-yellow-50 text-yellow-600 px-4 py-1.5 rounded-full font-bold tracking-widest uppercase text-xs border border-yellow-200 shadow-sm animate-fade-down">
              <Trophy size={14} className="animate-pulse" /> Cases de Sucesso
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight animate-fade-up">
              Empresas <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-400">Graduadas</span>
            </h2>
            <p className="text-gray-500 max-w-2xl text-lg animate-fade-up animate-delay-100">
              Conheça as empresas que passaram pela nossa incubadora e hoje são referências de sucesso e inovação.
            </p>
          </div>
        </div>
        <div className="section-default px-4 max-w-7xl mx-auto pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {graduadasData.map((item, idx) => (
              <div
                key={item.id}
                className="bg-white rounded-[1.5rem] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-2xl hover:shadow-yellow-100/50 transition-all duration-300 border border-gray-100 group flex flex-col overflow-hidden hover:-translate-y-2 h-full animate-fade-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="h-44 bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-8 border-b border-gray-50 relative group-hover:from-yellow-50/50 group-hover:to-white transition-colors duration-500">
                  <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-500">
                    <Image
                      src={item.logo}
                      alt={item.name}
                      fill
                      unoptimized
                      className="object-contain drop-shadow-sm"
                    />
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2.5 py-1 rounded-lg text-[10px] font-bold text-gray-600 shadow-sm border border-gray-100 flex items-center gap-1.5 group-hover:text-yellow-600 group-hover:border-yellow-100 transition-colors">
                    <Layers size={10} /> {item.segmento}
                  </div>
                  <div className="absolute top-4 left-4 bg-yellow-400/90 backdrop-blur px-2.5 py-1 rounded-lg text-[10px] font-bold text-white shadow-sm flex items-center gap-1">
                    <Trophy size={10} /> Graduada
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow justify-between relative">
                  <div className="absolute left-0 top-6 bottom-6 w-1 bg-gradient-to-b from-yellow-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-r-full"></div>
                  <div>
                    <h4 className="text-xl font-black text-gray-800 mb-2 group-hover:text-yellow-600 transition-colors line-clamp-1">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-4 font-medium">
                      {item.description}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400 mt-auto">
                    <div className="flex items-center gap-1.5 font-semibold">
                      <MapPin size={14} className="text-gray-300 group-hover:text-yellow-400 transition-colors" /> Pato Branco
                    </div>
                    <button
                      onClick={() => setSelectedGraduada(item)}
                      className="text-yellow-600 font-bold bg-yellow-50 px-3 py-1.5 rounded-lg hover:bg-yellow-500 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      Ver mais <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Modal das Graduadas */}
      {selectedGraduada && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-md transition-opacity animate-fade-in"
            onClick={() => setSelectedGraduada(null)}
          ></div>
          <div className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-3xl overflow-hidden animate-fade-up animate-duration-300 flex flex-col max-h-[90vh] ring-1 ring-white/20">
            <div className="bg-gradient-to-r from-yellow-50 to-white p-6 md:p-8 flex justify-between items-start border-b border-yellow-100 relative">
              <div className="flex gap-6 items-center">
                <div className="w-24 h-24 relative bg-white rounded-2xl border border-gray-100 p-3 shadow-md">
                  <Image
                    src={selectedGraduada.logo}
                    alt={selectedGraduada.name}
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-gray-900 tracking-tight">{selectedGraduada.name}</h3>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="text-xs font-bold text-yellow-700 bg-yellow-50 px-3 py-1 rounded-md border border-yellow-100 flex items-center gap-1.5">
                      <Layers size={12} /> {selectedGraduada.segmento}
                    </span>
                    <span className="text-xs font-bold text-gray-600 bg-white px-3 py-1 rounded-md border border-gray-200 flex items-center gap-1.5 shadow-sm">
                      <User size={12} /> {selectedGraduada.founder}
                    </span>
                    <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-md border border-amber-100 flex items-center gap-1.5">
                      <Trophy size={12} /> Graduada
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedGraduada(null)}
                className="p-2.5 bg-white rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors border border-gray-200 shadow-sm"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
              <div className="mb-8">
                <div className="bg-green-50/40 p-5 rounded-2xl border border-green-100 flex items-center justify-center gap-4">
                  <div className="bg-white p-2 rounded-full text-green-600 shadow-sm shrink-0"><Mail size={18} /></div>
                  <div className="text-center">
                    <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Contato</h5>
                    <p className="text-gray-900 font-bold text-sm">{selectedGraduada.email}</p>
                    <p className="text-gray-500 text-xs font-medium mt-0.5">{selectedGraduada.phone}</p>
                  </div>
                </div>
              </div>
              <div className="mb-8">
                <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  História de Sucesso
                  <span className="h-px flex-grow bg-gray-100"></span>
                </h4>
                <p className="text-gray-600 leading-relaxed text-justify bg-gray-50/50 p-5 rounded-2xl border border-gray-100">
                  {selectedGraduada.fullDescription || selectedGraduada.description}
                </p>
              </div>
              <div className="mb-8">
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Package size={20} className="text-yellow-500" /> Produtos & Serviços
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {selectedGraduada.products.map((prod, idx) => (
                    <span key={idx} className="bg-white text-gray-700 px-4 py-2 rounded-xl text-sm font-bold border border-gray-200 shadow-sm flex items-center gap-2 hover:border-yellow-300 hover:text-yellow-600 transition-colors cursor-default">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                      {prod}
                    </span>
                  ))}
                </div>
              </div>
              {selectedGraduada.link && (
                <Link
                  href={selectedGraduada.link}
                  target="_blank"
                  className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-yellow-500 hover:scale-[1.01] transition-all shadow-xl shadow-gray-200"
                >
                  Acessar Website <ExternalLink size={18} />
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
