'use client'

import { useState } from "react";
import Image from "next/image";
import { MapPin, Trophy, Layers, X, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";

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

// =========================================================
// 📋 DADOS CENTRALIZADOS — Atualize nomes e logos aqui!
// =========================================================
const graduados: Graduada[] = [
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

export default function Graduados() {
  const [selectedCompany, setSelectedCompany] = useState<Graduada | null>(null);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50" id="graduados">
      <div className="section-default flex flex-col gap-10 px-4 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-3">
          <span className="bg-yellow-100 text-yellow-700 px-4 py-1.5 rounded-full font-bold tracking-widest uppercase text-xs border border-yellow-200 inline-flex items-center gap-2">
            <Trophy size={14} /> Cases de Sucesso
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-800 tracking-tight">
            Empresas <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">Graduadas</span>
          </h2>
          <p className="text-gray-500 max-w-2xl text-lg">
            Conheça as empresas que passaram pela nossa incubadora e hoje são referências no mercado.
          </p>
        </div>

        {/* Grid — grid-cols-2 md:grid-cols-4 lg:grid-cols-5 */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center">
          {graduados.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedCompany(item)}
              className="group w-full bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-yellow-100/50 hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col"
            >
              {/* Logo Area */}
              <div className="h-32 bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-6 border-b border-gray-50 relative group-hover:from-yellow-50/50 group-hover:to-white transition-colors duration-500">
                <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-500">
                  <Image
                    src={item.logo}
                    alt={item.name}
                    fill
                    unoptimized
                    className="object-contain drop-shadow-sm"
                  />
                </div>
              </div>

              {/* Info */}
              <div className="p-4 flex flex-col flex-grow">
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="bg-yellow-50 text-yellow-700 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-yellow-100 flex items-center gap-1">
                    <Layers size={8} /> {item.segmento}
                  </span>
                </div>
                <h4 className="text-lg font-black text-gray-800 mb-1 group-hover:text-yellow-700 transition-colors line-clamp-1">
                  {item.name}
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-3 flex-grow">
                  {item.description}
                </p>
                <div className="flex items-center justify-between text-[10px] text-gray-400 pt-3 border-t border-gray-50">
                  <div className="flex items-center gap-1">
                    <MapPin size={10} /> Pato Branco
                  </div>
                  <span className="text-yellow-600 font-bold flex items-center gap-1 group-hover:text-yellow-700">
                    Ver mais <ArrowRight size={10} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Link para página completa */}
        <div className="text-center">
          <Link
            href="/graduados"
            className="inline-flex items-center gap-2 text-sm font-bold text-yellow-700 bg-yellow-50 px-6 py-3 rounded-xl hover:bg-yellow-100 transition-all border border-yellow-200"
          >
            Ver todas as empresas graduadas <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Modal */}
      {selectedCompany && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedCompany(null)}
          ></div>

          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-up animate-duration-300 flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="bg-gradient-to-r from-yellow-50 to-white p-6 flex justify-between items-start border-b border-gray-100">
              <div className="flex gap-4 items-center">
                <div className="w-16 h-16 relative bg-white rounded-xl border border-gray-200 p-2 shadow-sm">
                  <Image
                    src={selectedCompany.logo}
                    alt={selectedCompany.name}
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-gray-800">{selectedCompany.name}</h3>
                  <span className="text-xs font-bold text-yellow-700 bg-yellow-50 px-2 py-1 rounded-md border border-yellow-100 inline-flex items-center gap-1 mt-1">
                    <Layers size={10} /> {selectedCompany.segmento}
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

            {/* Body */}
            <div className="p-8 overflow-y-auto">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 bg-yellow-50 p-3 rounded-lg w-fit border border-yellow-100">
                <Trophy size={16} className="text-yellow-600" />
                <span>
                  Graduada em: <strong className="text-gray-700">{selectedCompany.graduatedDate}</strong>
                </span>
              </div>

              <div className="mb-8">
                <h4 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  História de Sucesso
                  <span className="h-px flex-grow bg-gray-100"></span>
                </h4>
                <p className="text-gray-600 leading-relaxed text-justify bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                  {selectedCompany.fullDescription || selectedCompany.description}
                </p>
              </div>

              {selectedCompany.link && (
                <Link
                  href={selectedCompany.link}
                  target="_blank"
                  className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-yellow-600 transition-all shadow-xl"
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
