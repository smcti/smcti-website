'use client'

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, ArrowRight, Layers, Trophy, Calendar, X, Globe } from "lucide-react";

interface Graduada {
  id: number;
  name: string;
  logo: string;
  description: string;
  segmento: string;
  graduatedDate: string; 
  link?: string;
  fullDescription?: string;
}

const graduadasData: Graduada[] = [
  { 
    id: 1,
    name: "Atlas", 
    logo: "/assets/images/LogosIncubadas/SafeEduca.png", 
    description: "Referência nacional em tecnologia para eletrodomésticos e soluções industriais.",
    graduatedDate: "15/08/2020",
    segmento: "Indústria 4.0",
    link: "https://www.atlas.ind.br/",
    fullDescription: "A Atlas iniciou sua jornada na incubadora e hoje é uma gigante do setor, exportando tecnologia e inovação a partir de Pato Branco para o mundo."
  },
  { 
    id: 2,
    name: "Viasoft", 
    logo: "/assets/images/LogosIncubadas/RockJobs.png",
    description: "Uma das maiores fornecedoras de soluções em software de gestão do Brasil.",
    graduatedDate: "10/02/2018",
    segmento: "SaaS / ERP",
    link: "https://viasoft.com.br/",
    fullDescription: "Nascida com o propósito de facilitar a gestão empresarial, a Viasoft cresceu exponencialmente e hoje é referência em ERP para agronegócio e varejo."
  },
  { 
    id: 3,
    name: "Ampernet", 
    logo: "/assets/images/LogosIncubadas/PhBot.png", 
    description: "Provedor de internet e soluções de telecomunicações de alta performance.",
    graduatedDate: "22/11/2019",
    segmento: "Telecom",
    link: "https://ampernet.com.br/",
    fullDescription: "Começando como um pequeno provedor, a Ampernet expandiu sua rede de fibra óptica e hoje conecta milhares de pessoas e empresas no sudoeste do Paraná."
  },
];

export default function GraduadosSection() {
  const [selectedCompany, setSelectedCompany] = useState<Graduada | null>(null);

  return (
    <section className="py-16 animate-fade animate-delay-200 overflow-hidden bg-gray-50">
       <div className="section-default flex flex-col gap-8 mb-16 px-4 max-w-7xl mx-auto">
          <div className="text-center flex flex-col items-center gap-2">
              <span className="bg-blue-100 text-blue-600 px-4 py-1.5 rounded-full font-bold tracking-widest uppercase text-xs border border-blue-200">
                Cases de Sucesso
              </span>
              <div className="flex items-center justify-center gap-3">
                 <div className="p-2 bg-yellow-100 rounded-xl text-yellow-600">
                    <Trophy size={32} strokeWidth={2.5} />
                 </div>
                 <h2 className="text-4xl md:text-5xl font-black text-gray-800 tracking-tight">
                    Empresas Graduadas
                 </h2>
              </div>
          </div>
       </div>
       <div className="section-default px-4 max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-8">
             {graduadasData.map((item) => (
                <div 
                  key={item.id}
                  className="w-full md:w-[calc(50%-2rem)] lg:w-[calc(23%)] bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group flex flex-col overflow-hidden hover:-translate-y-2"
                >
                    <div className="h-40 bg-gray-50 flex items-center justify-center p-6 border-b border-gray-100 relative group-hover:bg-yellow-50 transition-colors">
                        <div className="relative w-full h-full">
                            <Image 
                              src={item.logo} 
                              alt={item.name} 
                              fill 
                              className="object-contain drop-shadow-sm"
                            />
                        </div>
                        <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-md text-[10px] font-bold text-blue-600 shadow-sm border border-blue-100 flex items-center gap-1">
                           <Layers size={10} /> {item.segmento}
                        </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow justify-between">
                       <div>
                          <h4 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                            {item.name}
                          </h4>
                          <p className="text-justify text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3">
                            {item.description}
                          </p>
                       </div>

                       <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                          <div className="flex items-center gap-1">
                             <MapPin size={14} /> Pato Branco - PR
                          </div>
                          
                          <button 
                            onClick={() => setSelectedCompany(item)}
                            className="text-blue-500 font-semibold hover:underline flex items-center gap-1 cursor-pointer bg-transparent border-none"
                          >
                             Ver mais <ArrowRight size={14} />
                          </button>
                       </div>
                    </div>
                </div>
             ))}
          </div>
       </div>
       {selectedCompany && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
           <div 
             className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
             onClick={() => setSelectedCompany(null)}
           ></div>

           <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-up animate-duration-300 flex flex-col max-h-[90vh]">
              
              <div className="bg-gray-50 p-6 flex justify-between items-start border-b border-gray-100">
                  <div className="flex gap-4 items-center">
                      <div className="w-16 h-16 relative bg-white rounded-lg border border-gray-200 p-2">
                        <Image 
                            src={selectedCompany.logo} 
                            alt={selectedCompany.name} 
                            fill 
                            className="object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800">{selectedCompany.name}</h3>
                        <span className="text-sm text-blue-500 font-medium bg-blue-50 px-2 py-1 rounded-md border border-blue-100">
                          {selectedCompany.segmento}
                        </span>
                      </div>
                  </div>
                  <button 
                    onClick={() => setSelectedCompany(null)}
                    className="p-2 bg-white rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors border border-gray-200"
                  >
                    <X size={20} />
                  </button>
              </div>
              <div className="p-8 overflow-y-auto">

                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 bg-yellow-50 p-3 rounded-lg w-fit border border-yellow-100">
                    <Trophy size={16} className="text-yellow-600"/>
                    <span>Graduada em: <strong className="text-gray-700">{selectedCompany.graduatedDate}</strong></span>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-lg font-bold text-gray-800 mb-2">História de Sucesso</h4>
                    <p className="text-gray-600 leading-relaxed text-justify">
                      {selectedCompany.fullDescription || selectedCompany.description}
                    </p>
                  </div>

                  {selectedCompany.link && (
                    <Link 
                      href={selectedCompany.link} 
                      target="_blank"
                      className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
                    >
                      <Globe size={18} /> Visitar Site
                    </Link>
                  )}
              </div>

           </div>
         </div>
       )}

    </section>
  );
}