'use client'

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DynamicCarousel from "@/components/common/dynamiccarousel"; 
import { 
  MapPin, 
  ArrowRight, 
  Layers, 
  Rocket, 
  Calendar, 
  X, 
  Globe, 
  User, 
  Phone, 
  Package,
  Mail,
  ExternalLink
} from "lucide-react";

interface Incubada {
  id: number;
  name: string;
  logo: string;
  description: string;
  segmento: string;
  startDate: string;
  link?: string;
  fullDescription?: string;
  founder: string;
  email: string;
  phone: string;
  products: string[];
}

const incubadasData: Incubada[] = [
  { 
    id: 1,
    name: "Safe Educa", 
    logo: "/assets/images/logosincubadas/safe.png",
    description: "Educar financeiramente é investir no futuro de todas as gerações.",
    startDate: "26/09/2024",
    segmento: "EdTech",
    link: "https://www.safeeduca.com.br/",
    fullDescription: "Safe Educação Financeira é uma escola de educação financeira com foco em ensinar, crianças, adolescentes e jovens sobre o universo das finanças de maneira lúdica e prática.",
    founder: "Pedro Henrique Baldin Coelho",
    email: "pedrocoelho@safeeduca.com.br",
    phone: "(46) 93300-5265",
    products: ["Educação Financeira Kids", "Finanças em Foco", "Workshop e Oficinas", "Palestras ", "Plataforma de Ed. Financeira para Escolas"]
  },
  { 
    id: 2,
    name: "Rock Jobs", 
    logo: "/assets/images/logosincubadas/rock.png",
    description: "Conectamos empresas e candidatos através do emprego.",
    startDate: "25/11/2022",
    segmento: "RH Tech",
    link: "https://rockjobs.com.br/",
    fullDescription: "Somos a ROCK JOBS, uma assessoria de RH especializada em Recrutamento e Seleção, conectamos empresas e candidatos através do emprego, atendemos micro, pequenas e médias empresas de TI, comércios, e-commerces, prestadoras de serviços e pequenas indústrias. Além do serviço de assessoria oferecidos nos estados do Paraná, Santa Catarina, Rio Grande do Sul e Bahia, estamos desenvolvimento ferramenta de tecnologia para o setor de RH, a plataforma Aurhi, que fará a gestão completa de vagas e candidaturas.",
    founder: "Vanessa Pelissaro",
    email: "contato@rockjobs.com.br",
    phone: "(46) 99936-5171",
    products: ["Recrutamento", "Seleção", "Assessoria ao RH"]
  },
  { 
    id: 3,
    name: "PhBot", 
    logo: "/assets/images/logosincubadas/phbot.png",
    description: "O que voce faz pela água hoje o planeta devolvera amanhã!",
    startDate: "16/01/2026",
    segmento: "Automação IoT",
    fullDescription: "A pHbot é uma empresa de tecnologia voltada para o monitoramento inteligente da qualidade da água em piscinas, aquários e sistemas de abastecimento. Com soluções baseadas em sensores de alta precisão, automação e Internet das Coisas (IoT), a pHbot oferece produtos inovadores que medem e ajustam os níveis de pH, cloro e outros parâmetros em tempo real.",
    founder: "João Carlos Patella Claveiro Fagundez",
    email: "phbotpbpr@gmail.com",
    phone: "(46) 99106-9195",
    products: ["pH01", "EcoTank", "Aquashield"]
  },
  { 
    id: 4,
    name: "Cash Local", 
    logo: "/assets/images/logosincubadas/cash.png",
    description: "Sorriso no rosto e dinheiro no bolso, todo mundo gosta!",
    startDate: "23/02/2023",
    segmento: "Fintech / Fidelização",
    link: "https://www.cashlocal.com.br/",
    fullDescription: "A Cash Local possui diferentes produtos, focados em fidelização, marketing e impacto. Nascemos como um programa de fidelidade, e expandimos para campanhas promocionais, automações de WhatsApp e integrações de sistemas.",
    founder: "Bruna Jochem do Prado",
    email: "bru-jochem@gmail.com",
    phone: "(46) 99108-1520",
    products: ["CashLocal APP", "Sorteza", "Separa", "Xati"]
  },
  { 
    id: 5,
    name: "LEFTECH", 
    logo: "/assets/images/logosincubadas/leftech.png",
    description: "LEFTECH soluções eletrônicas.",
    startDate: "24/09/2024",
    segmento: "Hardware & Mobilidade",
    link: "https://leftechsolucoes.com.br/",
    fullDescription: "LefTech Soluções Eletrônicas é uma empresa fundada em 2020 em Pato Branco – PR, especializada no desenvolvimento de projetos eletrônicos e na montagem de placas eletrônicas (SMT e PTH). Fundada por um profissional com mais de 15 anos de experiência na área, a LefTech oferece soluções completas em hardware, desde o protótipo até a produção em escala.",
    founder: "Bruno Lefchak",
    email: "lefchak@gmail.com",
    phone: "(46) 99932-1270",
    products: ["Montagem de Placas (SMT/PTH)", "Projetos Eletrônicos", "Prototipagem Rápida", "Automação"]
  },
  { 
    id: 6,
    name: "Askme Solutions", 
    logo: "/assets/images/logosincubadas/askme.png",
    description: "Fique bem, Fique Seguro, Fique com Askme Solutions",
    startDate: "22/02/2023",
    segmento: "Logística & Segurança",
    link: "https://askmesolutions.com.br/",
    fullDescription: "Empresa especializada em rastreamento de baixo custo, tanto de frota, como bens móveis.",
    founder: "Luciano Cesar Ascari",
    email: "comercial@askmesolutions.com.br",
    phone: "(46) 9911-9424",
    products: ["Plataforma de Rastreamento", "Gestão de Frotas"]
  },
  { 
    id: 7,
    name: "Consegsys", 
    logo: "/assets/images/logosincubadas/consegsys.png",
    description: "Tecnologia que organiza, conecta e faz crescer",
    startDate: "26/01/2026",
    segmento: "Software",
    link: "https://www.consegsys.com.br",
    fullDescription: "Criamos soluções em software e automação para empresas que precisam ganhar eficiência, reduzir custos e ter mais controle sobre seus processos.",
    founder: "Alex Carpenedo",
    email: "Comercial@consegsys.com.br",
    phone: "(46) 99900-2829",
    products: ["CRM para o agronegócio", "Chatbot", "Aplicativos e sistemas sob demanda"]
  },
  { 
    id: 8,
    name: "Flumia Flow", 
    logo: "/assets/images/logosincubadas/flumia.png",
    description: "A flum.ia é a ponte entre o atendimento humano e a automação inteligente",
    startDate: "26/01/2026",
    segmento: "Software",
    link: "https://www.flumia.com.br",
    fullDescription: "O Flumia Flow é um vendedor digital automatizado para WhatsApp. Ele atende clientes, gera orçamentos, fecha pedidos e integra tudo ao seu ERP, funcionando 24 horas por dia.",
    founder: "Luiz Felipe Beatrici",
    email: "flumiaflow@gmail.com",
    phone: "(46) 99933-5308",
    products: ["Solução via Whatsapp para vendas e consulta de preços"]
  },
  { 
    id: 9,
    name: "E-Dialoga Sistemas", 
    logo: "/assets/images/logosincubadas/edialoga.png",
    description: "Feito de empresa para empresas",
    startDate: "26/01/2026",
    segmento: "Software",
    link: "https://www.edialoga.com.br",
    fullDescription: "Todos os seus canais de comunicação em um único local! O software E-Dialoga combina multiatendimento eficiente e envio em massa, centralizando todos os canais de comunicação (WhatsApp, Facebook Messenger, Instagram Direct, Telegram e Email) em um único lugar. Tenha um robô de atendimento projetado para interagir com usuários e responder perguntas sem a necessidade de intervenção humana.",
    founder: "Paulo Henrique Silvestre",
    email: "paulo@edialoga.com.br",
    phone: "(46) 99121-5132",
    products: ["Chat Omnichannel para Whatsapp", "Instagram", "Facebook", "Telegram", "Email"]
  },
  { 
    id: 10,
    name: "Flatland Lab", 
    logo: "/assets/images/logosincubadas/flatland.png",
    description: "Specialty crops require specialty automation",
    startDate: "26/01/2026",
    segmento: "Hardware, Software, IA",
    link: "https://www.flatland-lab.com",
    fullDescription: "A Flatland Lab desenvolve tecnologias de automação, sensoriamento e IA de nível comercial para culturas especiais. Fornecemos sistemas prontos para uso em campo que ajudam produtores, melhoristas e pesquisadores a coletar dados mais precisos e tomar melhores decisões. Nossas soluções abrangem veículos autônomos, sensores personalizados, modelos de visão computacional e infraestrutura de fenotipagem.",
    founder: "Bruno Leme",
    email: "bruno@flatland-lab.com",
    phone: "(61) 99146-9102",
    products: ["GPS de precisão", "Sistemas para colheita de frutas"]
  },
  { 
    id: 11,
    name: "NU.RA Biological Intelligence", 
    logo: "/assets/images/logosincubadas/nura.png",
    description: "Nutrição inteligente, cuidado contínuo.",
    startDate: "26/01/2026",
    segmento: "Healthtech / Biotecnologia",
    fullDescription: "A NURA é uma startup de nutrição avançada que desenvolve soluções baseadas em inteligência biológica para promover equilíbrio, saúde e performance no dia a dia. Unindo ciência, tecnologia e cuidado contínuo, cria produtos pensados para atuar de forma progressiva e sustentável no organismo, respeitando o ritmo natural do corpo.",
    founder: "Elielma Colla",
    email: "nuralabs.br@gmail.com",
    phone: "(46) 99980-2671",
    products: ["NURA Flow (Suporte Biológico de Rotina)"]
  }
];

export default function IncubadosSection() {
  const [selectedCompany, setSelectedCompany] = useState<Incubada | null>(null);

  const carouselList = incubadasData.map(item => ({
    name: item.name,
    logo: item.logo
  }));

  return (
    <section className="py-16 overflow-hidden relative min-h-screen">
       <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-blue-50/60 via-white to-white -z-10 pointer-events-none"></div>
       <div className="section-default flex flex-col gap-8 mb-12 px-4 max-w-7xl mx-auto relative z-10">
          <div className="text-center flex flex-col items-center gap-4">
              <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full font-bold tracking-widest uppercase text-xs border border-blue-100 shadow-sm animate-fade-down">
                <Rocket size={14} className="animate-pulse" /> Nosso Ecossistema
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight animate-fade-up">
                Empresas <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Incubadas</span>
              </h2>
              <p className="text-gray-500 max-w-2xl text-lg animate-fade-up animate-delay-100">
                  Conheça as startups que estão desenvolvendo o futuro da tecnologia e inovação em Pato Branco.
              </p>
          </div>
       </div>
       <div className="w-full py-8 mb-12 bg-white/50 backdrop-blur-sm border-y border-gray-100 animate-fade animate-delay-200">
          <div className="max-w-7xl mx-auto px-4">
              <div className="hover:opacity-100 transition-opacity duration-300 opacity-80">
                <DynamicCarousel companies={carouselList} direction="forward" />
              </div>
          </div>
       </div>
       <div className="section-default px-4 max-w-7xl mx-auto pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
             {incubadasData.map((item, idx) => (
                <div 
                  key={item.id}
                  className="bg-white rounded-[1.5rem] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-2xl hover:shadow-blue-100/50 transition-all duration-300 border border-gray-100 group flex flex-col overflow-hidden hover:-translate-y-2 h-full animate-fade-up"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                    <div className="h-44 bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-8 border-b border-gray-50 relative group-hover:from-blue-50/50 group-hover:to-white transition-colors duration-500">
                        <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-500">
                            <Image 
                              src={item.logo} 
                              alt={item.name} 
                              fill
                              unoptimized
                              className="object-contain drop-shadow-sm"
                            />
                        </div>
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2.5 py-1 rounded-lg text-[10px] font-bold text-gray-600 shadow-sm border border-gray-100 flex items-center gap-1.5 group-hover:text-blue-600 group-hover:border-blue-100 transition-colors">
                           <Layers size={10} /> {item.segmento}
                        </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow justify-between relative">
                       <div className="absolute left-0 top-6 bottom-6 w-1 bg-gradient-to-b from-blue-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-r-full"></div>

                       <div>
                          <h4 className="text-xl font-black text-gray-800 mb-2 group-hover:text-blue-700 transition-colors line-clamp-1">
                            {item.name}
                          </h4>
                          <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3 font-medium">
                            {item.description}
                          </p>
                       </div>

                       <div className="pt-4 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400 mt-auto">
                          <div className="flex items-center gap-1.5 font-semibold">
                             <MapPin size={14} className="text-gray-300 group-hover:text-blue-400 transition-colors" /> Pato Branco
                          </div>

                          <button 
                            onClick={() => setSelectedCompany(item)}
                            className="text-blue-600 font-bold bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                          >
                             Ver mais <ArrowRight size={12} />
                          </button>
                       </div>
                    </div>
                </div>
             ))}
          </div>
       </div>
       {selectedCompany && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div 
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-md transition-opacity animate-fade-in"
              onClick={() => setSelectedCompany(null)}
            ></div>
            <div className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-3xl overflow-hidden animate-fade-up animate-duration-300 flex flex-col max-h-[90vh] ring-1 ring-white/20">
              <div className="bg-gradient-to-r from-gray-50 to-white p-6 md:p-8 flex justify-between items-start border-b border-gray-100 relative">
                  <div className="flex gap-6 items-center">
                      <div className="w-24 h-24 relative bg-white rounded-2xl border border-gray-100 p-3 shadow-md">
                        <Image 
                            src={selectedCompany.logo} 
                            alt={selectedCompany.name} 
                            fill 
                            unoptimized
                            className="object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="text-3xl font-black text-gray-900 tracking-tight">{selectedCompany.name}</h3>
                        <div className="flex flex-wrap gap-2 mt-3">
                            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-md border border-blue-100 flex items-center gap-1.5">
                                <Layers size={12}/> {selectedCompany.segmento}
                            </span>
                            <span className="text-xs font-bold text-gray-600 bg-white px-3 py-1 rounded-md border border-gray-200 flex items-center gap-1.5 shadow-sm">
                                <User size={12}/> {selectedCompany.founder}
                            </span>
                        </div>
                      </div>
                  </div>
                  <button 
                    onClick={() => setSelectedCompany(null)}
                    className="p-2.5 bg-white rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors border border-gray-200 shadow-sm"
                  >
                    <X size={20} />
                  </button>
              </div>
              <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        <div className="bg-blue-50/40 p-5 rounded-2xl border border-blue-100 flex items-start gap-4">
                            <div className="bg-white p-2 rounded-full text-blue-500 shadow-sm shrink-0"><Calendar size={18}/></div>
                            <div>
                                <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Início</h5>
                                <p className="text-gray-900 font-bold text-lg">{selectedCompany.startDate}</p>
                            </div>
                        </div>
                        <div className="bg-green-50/40 p-5 rounded-2xl border border-green-100 flex items-start gap-4">
                            <div className="bg-white p-2 rounded-full text-green-600 shadow-sm shrink-0"><Mail size={18}/></div>
                            <div className="overflow-hidden">
                                <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Contato</h5>
                                <p className="text-gray-900 font-bold text-sm truncate">{selectedCompany.email}</p>
                                <p className="text-gray-500 text-xs font-medium mt-0.5">{selectedCompany.phone}</p>
                            </div>
                        </div>
                  </div>
                  <div className="mb-8">
                    <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                        Sobre a Empresa
                        <span className="h-px flex-grow bg-gray-100"></span>
                    </h4>
                    <p className="text-gray-600 leading-relaxed text-justify bg-gray-50/50 p-5 rounded-2xl border border-gray-100">
                      {selectedCompany.fullDescription || selectedCompany.description}
                    </p>
                  </div>
                  <div className="mb-8">
                    <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Package size={20} className="text-blue-500"/> Produtos & Serviços
                    </h4>
                    <div className="flex flex-wrap gap-2.5">
                        {selectedCompany.products.map((prod, idx) => (
                            <span key={idx} className="bg-white text-gray-700 px-4 py-2 rounded-xl text-sm font-bold border border-gray-200 shadow-sm flex items-center gap-2 hover:border-blue-300 hover:text-blue-600 transition-colors cursor-default">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                                {prod}
                            </span>
                        ))}
                    </div>
                  </div>
                  {selectedCompany.link && (
                    <Link 
                      href={selectedCompany.link} 
                      target="_blank"
                      className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-blue-600 hover:scale-[1.01] transition-all shadow-xl shadow-gray-200"
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